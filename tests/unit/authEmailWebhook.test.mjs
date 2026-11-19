import crypto from "node:crypto";
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200,headers:o.headers||{}})}}));
import {POST} from "../../app/api/auth-email/route.js";
import {buildAuthEmail,verifyNeonWebhook,resetJwksCache} from "../../app/lib/server/auth-email.js";

const {publicKey,privateKey}=crypto.generateKeyPairSync("ed25519");
const kid="test-kid-1";
const jwk={...publicKey.export({format:"jwk"}),kid};
const AUTH_URL="https://ep-test.neonauth.example/neondb/auth";

function sign(rawBody,timestamp){
  const header=Buffer.from(JSON.stringify({alg:"EdDSA",typ:"JWS",kid})).toString("base64url");
  const payloadB64=Buffer.from(rawBody,"utf8").toString("base64url");
  const input=`${header}.${Buffer.from(`${timestamp}.${payloadB64}`,"utf8").toString("base64url")}`;
  return `${header}..${crypto.sign(null,Buffer.from(input),privateKey).toString("base64url")}`;
}
const otpPayload=(over={})=>({event_id:"evt-1",event_type:"send.otp",user:{email:"aluno@exemplo.pt",name:"Aluno"},event_data:{otp_code:"482913",otp_type:"forget-password",expires_at:new Date(Date.now()+10*60000).toISOString()},...over});
function request(payload,{timestamp=Date.now(),tamper=false,signature}={}){
  const raw=typeof payload==="string"?payload:JSON.stringify(payload);
  const sig=signature??sign(raw,String(timestamp));
  return new Request("https://approvamais.pt/api/auth-email",{method:"POST",headers:{"Content-Type":"application/json","x-neon-signature":sig,"x-neon-signature-kid":kid,"x-neon-timestamp":String(timestamp),"x-neon-event-id":"evt-1"},body:tamper?raw.replace("482913","000000"):raw});
}

let sent;
beforeEach(()=>{
  resetJwksCache();sent=[];
  process.env.NEON_AUTH_URL=AUTH_URL;process.env.RESEND_API_KEY="re_test_dummy";delete process.env.AUTH_EMAIL_FROM;
  vi.stubGlobal("fetch",vi.fn(async(url,init)=>{
    if(String(url)===`${AUTH_URL}/.well-known/jwks.json`)return new Response(JSON.stringify({keys:[jwk]}),{status:200});
    if(String(url)==="https://api.resend.com/emails"){sent.push({init,body:JSON.parse(init.body)});return new Response(JSON.stringify({id:"x"}),{status:200})}
    throw new Error("unexpected fetch "+url);
  }));
});
afterEach(()=>{vi.unstubAllGlobals();delete process.env.RESEND_API_KEY;delete process.env.NEON_AUTH_URL});

describe("email de recuperação em português (webhook do Neon Auth)",()=>{
  it("assinatura válida → envia email em português com o código, do domínio da APProva+",async()=>{
    const r=await POST(request(otpPayload()));
    expect(r.status).toBe(200);
    expect(sent).toHaveLength(1);
    const {body,init}=sent[0];
    expect(body.to).toEqual(["aluno@exemplo.pt"]);
    expect(body.from).toBe("APProva+ <nao-responder@approvamais.pt>");
    expect(body.subject).toMatch(/recuperar a palavra-passe/);
    expect(body.html).toContain("482913");expect(body.text).toContain("482913");
    expect(body.html).toContain('lang="pt-PT"');
    expect(body.text).toMatch(/válido durante 10 minutos/);
    expect(init.headers["Idempotency-Key"]).toBe("neon-auth-evt-1");
    expect(JSON.stringify(r.body)).not.toContain("aluno@exemplo.pt");
  });
  it("sem palavras em inglês no email",()=>{
    for(const t of ["forget-password","email-verification","sign-in"]){
      const e=buildAuthEmail(otpPayload({event_data:{otp_code:"123456",otp_type:t}}));
      expect(e.text).not.toMatch(/\b(your|code|password|verify|sign in)\b/i);
    }
  });
  it("assinatura inválida, corpo alterado ou pedido antigo → 401 sem enviar",async()=>{
    expect((await POST(request(otpPayload(),{tamper:true}))).status).toBe(401);
    expect((await POST(request(otpPayload(),{timestamp:Date.now()-10*60000}))).status).toBe(401);
    expect((await POST(request(otpPayload(),{signature:"abc"}))).status).toBe(401);
    const noHeaders=new Request("https://approvamais.pt/api/auth-email",{method:"POST",body:JSON.stringify(otpPayload())});
    expect((await POST(noHeaders)).status).toBe(401);
    expect(sent).toHaveLength(0);
  });
  it("sem RESEND_API_KEY → 503 (o Neon repete; nada é enviado)",async()=>{
    delete process.env.RESEND_API_KEY;
    expect((await POST(request(otpPayload()))).status).toBe(503);
  });
  it("falha temporária do Resend → 503 (repetível); erro permanente → 424 (não repetível)",async()=>{
    fetch.mockImplementation(async url=>String(url).includes("jwks")?new Response(JSON.stringify({keys:[jwk]})):new Response("{}",{status:500}));
    expect((await POST(request(otpPayload()))).status).toBe(503);
    fetch.mockImplementation(async url=>String(url).includes("jwks")?new Response(JSON.stringify({keys:[jwk]})):new Response("{}",{status:403}));
    expect((await POST(request(otpPayload()))).status).toBe(424);
  });
  it("ligação mágica: só https, botão em português",async()=>{
    const ok=buildAuthEmail({event_type:"send.magic_link",event_data:{link_type:"forget-password",link_url:"https://approvamais.pt/r?t=1"}});
    expect(ok.html).toContain("Escolher nova palavra-passe");
    expect(buildAuthEmail({event_type:"send.magic_link",event_data:{link_type:"sign-in",link_url:"javascript:alert(1)"}})).toBeNull();
  });
  it("tipos desconhecidos ou código suspeito → 422, sem HTML injetado",async()=>{
    expect((await POST(request(otpPayload({event_data:{otp_code:"<b>1</b>",otp_type:"forget-password"}})))).status).toBe(422);
    expect((await POST(request(otpPayload({event_type:"user.created"})))).status).toBe(422);
    expect(sent).toHaveLength(0);
  });
  it("chave rodada: recarrega o JWKS quando o kid não está em cache",async()=>{
    const raw=JSON.stringify(otpPayload());const ts=String(Date.now());
    const h=new Headers({"x-neon-signature":sign(raw,ts),"x-neon-signature-kid":kid,"x-neon-timestamp":ts});
    await expect(verifyNeonWebhook(raw,h,{env:{NEON_AUTH_URL:AUTH_URL}})).resolves.toMatchObject({event_type:"send.otp"});
  });
});
