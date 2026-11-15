import {beforeEach,afterEach,describe,it,expect,vi} from "vitest";
import {syntheticPostgresUrl} from "../helpers/syntheticPostgresUrl.mjs";
const mocks=vi.hoisted(()=>({getSession:vi.fn(),handler:vi.fn(),getServerAuth:vi.fn()}));
vi.mock("../../app/lib/server/auth.js",()=>({
  serverAuthConfigured:()=>true,
  getServerAuth:()=>mocks.getServerAuth()
}));
vi.mock("next/headers",()=>({headers:async()=>new Headers()}));
vi.mock("next/server",()=>({
  NextResponse:{json:(body,options={})=>({
    body,status:options.status??200
  })}
}));
import {requireSession,authErrorResponse} from "../../app/lib/server/identity.js";
import {GET as authGET,POST as authPOST} from "../../app/api/auth/[...path]/route.js";

let errorSpy;
beforeEach(()=>{
  mocks.getSession.mockReset();
  mocks.handler.mockReset();
  mocks.getServerAuth.mockReset();
  mocks.getServerAuth.mockImplementation(()=>({getSession:mocks.getSession,handler:mocks.handler}));
  errorSpy=vi.spyOn(console,"error").mockImplementation(()=>{});
});
afterEach(()=>errorSpy.mockRestore());

describe("provider exception handling",()=>{
  it("does not log cookie/DSN material when getSession fails",async()=>{
    mocks.getSession.mockRejectedValue(new Error(
      `invalid session SECRET_NEON_COOKIE and ${syntheticPostgresUrl("postgresql://database.example.invalid/neondb",{password:"SECRET_DB"})}`
    ));
    await expect(requireSession()).rejects.toMatchObject({
      status:401,code:"UNAUTHORIZED"
    });
    expect(errorSpy).toHaveBeenCalled();
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("SECRET_NEON_COOKIE");
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("SECRET_DB");
  });
  it("fails closed when the provider cannot be constructed",async()=>{
    mocks.getServerAuth.mockImplementation(()=>{
      throw new Error("SECRET_NEON_PROVIDER_CONFIG");
    });
    await expect(requireSession()).rejects.toMatchObject({
      status:503,code:"AUTH_PROVIDER_UNAVAILABLE"
    });
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("SECRET_NEON_PROVIDER_CONFIG");
  });
  it("never reflects arbitrary database or provider codes via authErrorResponse",()=>{
    expect(authErrorResponse({code:"SECRET_DB",status:418})).toEqual({
      status:500,body:{ok:false,error:"INTERNAL_ERROR"}
    });
    expect(authErrorResponse({code:"UNAUTHORIZED",status:599})).toEqual({
      status:401,body:{ok:false,error:"UNAUTHORIZED"}
    });
    expect(authErrorResponse({code:"DATABASE_NOT_CONFIGURED",status:599})).toEqual({
      status:503,body:{ok:false,error:"DATABASE_NOT_CONFIGURED"}
    });
  });
  it("uses only the session subject for successful verified lookups",async()=>{
    mocks.getSession.mockResolvedValue({data:{user:{id:"synthetic-a"},session:{id:"synthetic-session",userId:"synthetic-a",expiresAt:new Date(Date.now()+60_000).toISOString()}}});
    const auth=await requireSession();
    expect(auth.authUserId).toBe("synthetic-a");
  });
  it("never reflects thrown provider codes, status, or secrets in auth handlers",async()=>{
    mocks.handler.mockImplementation(()=>{
      throw Object.assign(new Error("SECRET_NEON_COOKIE"),{
        code:"SECRET_DB",status:418
      });
    });
    for(const handle of [authGET,authPOST]){
      const result=await handle(new Request("https://isolated.example.invalid/api/auth/token"),{params:Promise.resolve({path:["token"]})});
      expect(result.status).toBe(503);
      expect(result.body).toEqual({
        ok:false,error:"AUTH_HANDLER_UNAVAILABLE"
      });
      expect(JSON.stringify(result)).not.toContain("SECRET_DB");
    }
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("SECRET_NEON_COOKIE");
    mocks.handler.mockImplementation(()=>{
      throw Object.assign(new Error("bad config"),{code:"AUTH_SERVER_NOT_CONFIGURED"});
    });
    const known=await authGET(new Request("https://isolated.example.invalid/api/auth/token"),{params:Promise.resolve({path:["token"]})});
    expect(known.status).toBe(503);
    expect(known.body.error).toBe("AUTH_SERVER_NOT_CONFIGURED");
  });
});
