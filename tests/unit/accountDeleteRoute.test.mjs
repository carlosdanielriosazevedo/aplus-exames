import {beforeEach,describe,expect,it,vi} from "vitest";

// Auditoria externa 2026-11-23 (L-01): a eliminação na app tem de funcionar também
// para contas criadas só com Google/Microsoft, que não têm palavra-passe.
const mocks=vi.hoisted(()=>({
  requireSession:vi.fn(),
  getSql:vi.fn(),
  deleteAccountData:vi.fn(),
  verifyAccountPassword:vi.fn()
}));

vi.mock("next/server",()=>({
  NextResponse:{
    json:(body,options={})=>{
      const cookies=[];
      return {body,status:options.status??200,headers:options.headers||{},cookies:{set:(...args)=>cookies.push(args),list:cookies}};
    }
  }
}));
vi.mock("../../app/lib/server/identity.js",()=>({
  requireSession:mocks.requireSession,
  authErrorResponse:error=>({status:error.status||401,body:{ok:false,code:error.code||"UNAUTHORIZED"}})
}));
vi.mock("../../app/lib/server/db.js",()=>({getSql:mocks.getSql,databaseConfigured:()=>true}));
vi.mock("../../app/lib/server/auth.js",()=>({authBaseUrl:()=>"https://auth.invalid/"}));
vi.mock("../../app/lib/server/account-deletion.js",async importOriginal=>({
  ...(await importOriginal()),
  deleteAccountData:mocks.deleteAccountData,
  verifyAccountPassword:mocks.verifyAccountPassword
}));

import {GET,POST} from "../../app/api/account/delete/route.js";

const origin="https://approva-isolated.test";
function post(body){
  return new Request(origin+"/api/account/delete",{method:"POST",headers:{origin,"content-type":"application/json"},body:JSON.stringify(body)});
}
function fakeSql({providers}){
  return async(strings,...values)=>{
    const text=strings.join("?");
    if(text.includes("to_regclass"))return [{present:true}];
    if(text.includes('neon_auth."account"'))return providers.map(provider=>({provider}));
    return [];
  };
}
const minutesAgo=minutes=>new Date(Date.now()-minutes*60_000).toISOString();

beforeEach(()=>{
  vi.clearAllMocks();
  mocks.deleteAccountData.mockResolvedValue({ok:true,tables:5});
  mocks.verifyAccountPassword.mockResolvedValue({ok:true});
});

describe("POST /api/account/delete",()=>{
  it("conta Google com sessão recente: elimina sem palavra-passe",async()=>{
    mocks.getSql.mockReturnValue(fakeSql({providers:["google"]}));
    mocks.requireSession.mockResolvedValue({authUserId:"u-google",user:{email:"g@example.invalid"},session:{id:"s",createdAt:minutesAgo(2)}});
    const response=await POST(post({confirmation:"ELIMINAR"}));
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ok:true,deleted:true});
    expect(mocks.verifyAccountPassword).not.toHaveBeenCalled();
    expect(mocks.deleteAccountData).toHaveBeenCalledWith(expect.anything(),"u-google");
    // L-02: comprovativo curto para a página pública de conclusão.
    expect(response.cookies.list).toContainEqual(["approva_account_deleted","1",expect.objectContaining({path:"/eliminar-conta",httpOnly:true,maxAge:600})]);
  });

  it("conta Google com sessão antiga: pede para voltar a entrar e não apaga nada",async()=>{
    mocks.getSql.mockReturnValue(fakeSql({providers:["google"]}));
    mocks.requireSession.mockResolvedValue({authUserId:"u-google",user:{},session:{id:"s",createdAt:minutesAgo(45)}});
    const response=await POST(post({confirmation:"ELIMINAR"}));
    expect(response.status).toBe(401);
    expect(response.body.code).toBe("RECENT_LOGIN_REQUIRED");
    expect(mocks.deleteAccountData).not.toHaveBeenCalled();
  });

  it("conta de email continua a exigir a palavra-passe, mesmo com sessão recente",async()=>{
    mocks.getSql.mockReturnValue(fakeSql({providers:["credential"]}));
    mocks.requireSession.mockResolvedValue({authUserId:"u-mail",user:{email:"m@example.invalid"},session:{id:"s",createdAt:minutesAgo(1)}});
    const missing=await POST(post({confirmation:"ELIMINAR"}));
    expect(missing.status).toBe(400);
    expect(missing.body.code).toBe("PASSWORD_REQUIRED");
    expect(mocks.deleteAccountData).not.toHaveBeenCalled();

    mocks.verifyAccountPassword.mockResolvedValueOnce({ok:false,code:"INVALID_PASSWORD"});
    const wrong=await POST(post({password:"errada",confirmation:"ELIMINAR"}));
    expect(wrong.status).toBe(401);
    expect(mocks.deleteAccountData).not.toHaveBeenCalled();

    const right=await POST(post({password:"certa",confirmation:"ELIMINAR"}));
    expect(right.status).toBe(200);
    expect(mocks.deleteAccountData).toHaveBeenCalledWith(expect.anything(),"u-mail");
  });
});

describe("GET /api/account/delete",()=>{
  it("indica o método de confirmação sem expor dados da conta",async()=>{
    mocks.getSql.mockReturnValue(fakeSql({providers:["google"]}));
    mocks.requireSession.mockResolvedValue({authUserId:"u-google",user:{email:"g@example.invalid"},session:{id:"s",createdAt:minutesAgo(30)}});
    const response=await GET();
    expect(response.body).toEqual({ok:true,method:"recent-login",provider:"google",recentLogin:false,recentLoginMinutes:10});
  });

  it("sem sessão responde 401",async()=>{
    mocks.requireSession.mockRejectedValue(Object.assign(new Error("Unauthorized"),{status:401,code:"UNAUTHORIZED"}));
    const response=await GET();
    expect(response.status).toBe(401);
  });
});
