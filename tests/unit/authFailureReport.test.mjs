import {afterEach,describe,expect,it,vi} from "vitest";
vi.mock("next/server",()=>({NextResponse:{json:(body,o={})=>({body,status:o.status??200})}}));
import {POST} from "../../app/api/client-errors/route.js";

const origin="https://approva.test";
const post=body=>new Request(origin+"/api/client-errors",{method:"POST",headers:{"content-type":"application/json",origin},body:JSON.stringify(body)});
afterEach(()=>vi.restoreAllMocks());

describe("registo anónimo de falhas de autenticação",()=>{
  it("regista falhas de conta como runtime com prefixo auth_failure (rota inalterada)",async()=>{
    const log=vi.spyOn(console,"error").mockImplementation(()=>{});
    const r=await POST(post({kind:"runtime",name:"auth_failure:signup:USER_ALREADY_EXISTS:422",screen:"account",path:"/",stack:[]}));
    expect(r.status).toBe(202);
    const [,event]=log.mock.calls[0];
    expect(event.kind).toBe("runtime");
    expect(event.name).toBe("auth_failure:signup:USER_ALREADY_EXISTS:422");
  });
  it("o cliente nunca envia o email nem a mensagem do serviço",async()=>{
    const src=(await import("node:fs")).readFileSync(new URL("../../app/lib/cloud.js",import.meta.url),"utf8");
    const fn=src.slice(src.indexOf("function reportAuthFailure"),src.indexOf("}",src.indexOf("auth_failure:${kind}"))+1);
    expect(fn).not.toContain("message");
    expect(fn).not.toContain("email");
    expect(fn).toMatch(/replace\(\/\[\^A-Z0-9_\]\/g,""\)/);
  });
});
