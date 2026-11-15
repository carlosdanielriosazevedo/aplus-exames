import {beforeEach,describe,expect,it,vi} from "vitest";
const mocks=vi.hoisted(()=>({requireSession:vi.fn(),getSql:vi.fn(),insert:vi.fn()}));
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200,headers:o.headers||{}})}}));
vi.mock("../../app/lib/server/identity.js",()=>({requireSession:mocks.requireSession,authErrorResponse:e=>({status:e.status||401,body:{ok:false,error:e.code||"UNAUTHORIZED"}})}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:mocks.getSql,databaseConfigured:()=>true}));
vi.mock("../../app/lib/server/content-reports.js",async original=>{const real=await original();return {...real,insertContentReport:mocks.insert}});
import {POST} from "../../app/api/content-reports/route.js";
import {validateContentReport,reportRateAllowed,resetReportRateLimit} from "../../app/lib/server/content-reports.js";

const origin="https://approva.test";
const post=(body,headers={origin})=>new Request(origin+"/api/content-reports",{method:"POST",headers:{"Content-Type":"application/json",...headers},body:typeof body==="string"?body:JSON.stringify(body)});
const good={itemId:"VN11PE-AN-016",subjectId:"math-a",category:"wrong"};
beforeEach(()=>{vi.clearAllMocks();resetReportRateLimit();mocks.requireSession.mockResolvedValue({authUserId:"user-1"});mocks.getSql.mockReturnValue({});mocks.insert.mockResolvedValue()});

describe("reportes de problemas em perguntas",()=>{
  it("grava só pergunta, disciplina e categoria (sem conta, email ou texto)",async()=>{
    const r=await POST(post(good));
    expect(r.status).toBe(201);
    const stored=mocks.insert.mock.calls[0][1];
    expect(stored).toEqual({ok:true,itemId:"VN11PE-AN-016",subjectId:"math-a",category:"wrong"});
    expect(JSON.stringify(mocks.insert.mock.calls[0])).not.toContain("user-1");
  });
  it("exige mesma origem e sessão",async()=>{
    expect((await POST(post(good,{origin:"https://evil.test"}))).status).toBe(403);
    mocks.requireSession.mockRejectedValue(Object.assign(new Error("x"),{status:401,code:"UNAUTHORIZED"}));
    expect((await POST(post(good))).status).toBe(401);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("recusa campos extra (incluindo texto livre ou identificação)",async()=>{
    for(const extra of [{comment:"x"},{email:"a@b.c"},{authUserId:"u"}]){
      const r=await POST(post({...good,...extra}));
      expect(r.status).toBe(400);expect(r.body.code).toBe("UNKNOWN_REPORT_FIELD");
    }
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("valida categoria, disciplina e identificador da pergunta",()=>{
    expect(validateContentReport({...good,category:"spam"}).code).toBe("INVALID_CATEGORY");
    expect(validateContentReport({...good,subjectId:"biologia"}).code).toBe("INVALID_SUBJECT");
    expect(validateContentReport({...good,itemId:"<script>"}).code).toBe("INVALID_ITEM_ID");
    expect(validateContentReport({...good,itemId:"x".repeat(161)}).code).toBe("INVALID_ITEM_ID");
    expect(validateContentReport({itemId:"FQA-W1-LIM-01",category:"typo"})).toEqual({ok:true,itemId:"FQA-W1-LIM-01",subjectId:"unknown",category:"typo"});
  });
  it("limita abuso por conta (30 por hora)",async()=>{
    for(let i=0;i<30;i++)expect((await POST(post(good))).status).toBe(201);
    expect((await POST(post(good))).status).toBe(429);
    mocks.requireSession.mockResolvedValue({authUserId:"user-2"});
    expect((await POST(post(good))).status).toBe(201);
    expect(reportRateAllowed("user-3",0)).toBe(true);
  });
  it("pedido grande ou JSON inválido é recusado; erro SQL não é exposto",async()=>{
    expect((await POST(post("x".repeat(3000)))).status).toBe(413);
    expect((await POST(post("{nope"))).status).toBe(400);
    mocks.insert.mockRejectedValue(new Error("connection to ep-secret failed for neondb_owner"));
    const r=await POST(post(good));
    expect(r.status).toBe(503);expect(JSON.stringify(r.body)).not.toMatch(/ep-secret|neondb_owner/);
  });
});
