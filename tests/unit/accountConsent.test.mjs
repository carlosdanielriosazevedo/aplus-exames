import {beforeEach,describe,expect,it,vi} from "vitest";
import {createHash,webcrypto} from "node:crypto";
import {readFileSync} from "node:fs";
const mocks=vi.hoisted(()=>({requireSession:vi.fn(),getSql:vi.fn(),insert:vi.fn()}));
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200,headers:o.headers||{}})}}));
vi.mock("../../app/lib/server/identity.js",()=>({requireSession:mocks.requireSession,authErrorResponse:e=>({status:e.status||401,body:{ok:false,error:e.code||"UNAUTHORIZED"}})}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:mocks.getSql,databaseConfigured:()=>true}));
vi.mock("../../app/lib/server/account-consent.js",async original=>{const real=await original();return {...real,insertConsent:mocks.insert}});
import {POST} from "../../app/api/account/consent/route.js";
import {validateConsent} from "../../app/lib/server/account-consent.js";
import {TERMS_VERSION,PRIVACY_VERSION} from "../../app/lib/legalVersions.js";
import {queueSignupConsent,flushPendingConsent,PENDING_CONSENT_KEY} from "../../app/lib/consentClient.js";

if(!globalThis.crypto?.subtle)globalThis.crypto=webcrypto;
const hash=e=>createHash("sha256").update(e.trim().toLowerCase()).digest("hex");
const origin="https://approva.test";
const post=(body,headers={origin})=>new Request(origin+"/api/account/consent",{method:"POST",headers:{"Content-Type":"application/json",...headers},body:JSON.stringify(body)});
const good={termsVersion:TERMS_VERSION,privacyVersion:PRIVACY_VERSION,ageConfirmed:true,termsAccepted:true,emailHash:hash("aluno@exemplo.invalid")};
const memory=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};
beforeEach(()=>{vi.clearAllMocks();mocks.requireSession.mockResolvedValue({authUserId:"user-1",user:{id:"user-1",email:"Aluno@Exemplo.invalid "}});mocks.getSql.mockReturnValue({});mocks.insert.mockResolvedValue()});

describe("prova de consentimento no registo",()=>{
  it("grava conta, versões e data, sem email nem dados técnicos",async()=>{
    const r=await POST(post(good));
    expect(r.status).toBe(201);
    const [,user,stored]=mocks.insert.mock.calls[0];
    expect(user).toBe("user-1");
    expect(stored).toEqual({ok:true,termsVersion:TERMS_VERSION,privacyVersion:PRIVACY_VERSION});
    expect(JSON.stringify(mocks.insert.mock.calls[0])).not.toMatch(/exemplo|[0-9a-f]{64}/);
  });
  it("exige mesma origem e sessão",async()=>{
    expect((await POST(post(good,{origin:"https://evil.test"}))).status).toBe(403);
    mocks.requireSession.mockRejectedValue(Object.assign(new Error("x"),{status:401,code:"UNAUTHORIZED"}));
    expect((await POST(post(good))).status).toBe(401);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("recusa sem as duas confirmações, com versões antigas ou campos extra",()=>{
    const email="aluno@exemplo.invalid";
    expect(validateConsent({...good,ageConfirmed:false},email).code).toBe("CONSENT_NOT_GIVEN");
    expect(validateConsent({...good,termsAccepted:"yes"},email).code).toBe("CONSENT_NOT_GIVEN");
    expect(validateConsent({...good,termsVersion:"2020-01-01"},email).code).toBe("CONSENT_VERSION_OUTDATED");
    expect(validateConsent({...good,ip:"1.2.3.4"},email).code).toBe("UNKNOWN_CONSENT_FIELD");
  });
  it("nunca atribui o consentimento de outro registo à conta da sessão",async()=>{
    const r=await POST(post({...good,emailHash:hash("outra@exemplo.invalid")}));
    expect(r.status).toBe(409);expect(r.body.code).toBe("CONSENT_ACCOUNT_MISMATCH");
    expect(mocks.insert).not.toHaveBeenCalled();
  });
});

describe("pedido pendente no dispositivo",()=>{
  it("guarda só versões e hash do email; envia e limpa quando aceite",async()=>{
    const storage=memory();
    await queueSignupConsent(" Aluno@Exemplo.invalid",{storage});
    const pending=JSON.parse(storage.getItem(PENDING_CONSENT_KEY));
    expect(pending).toEqual(good);
    const fetchImpl=vi.fn().mockResolvedValue({ok:true,status:201});
    expect(await flushPendingConsent({storage,fetchImpl})).toBe("sent");
    expect(storage.getItem(PENDING_CONSENT_KEY)).toBeNull();
    expect(await flushPendingConsent({storage,fetchImpl})).toBe("none");
  });
  it("mantém o pedido sem rede, sem sessão ou com outra conta; descarta se inválido",async()=>{
    const storage=memory();await queueSignupConsent("a@exemplo.invalid",{storage});
    for(const fetchImpl of [vi.fn().mockRejectedValue(new Error("offline")),vi.fn().mockResolvedValue({ok:false,status:401}),vi.fn().mockResolvedValue({ok:false,status:409})]){
      expect(await flushPendingConsent({storage,fetchImpl})).toBe("kept");
      expect(storage.getItem(PENDING_CONSENT_KEY)).not.toBeNull();
    }
    expect(await flushPendingConsent({storage,fetchImpl:vi.fn().mockResolvedValue({ok:false,status:400})})).toBe("dropped");
    expect(storage.getItem(PENDING_CONSENT_KEY)).toBeNull();
  });
});

describe("versões dos textos legais",()=>{
  it("a data dos termos publicada coincide com a versão aceite no registo",()=>{
    const page=readFileSync("app/termos/page.js","utf8");
    const [year,month,day]=TERMS_VERSION.split("-").map(Number);
    const months=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
    expect(page).toContain(`Última atualização: ${day} de ${months[month-1]} de ${year}`);
  });
});
