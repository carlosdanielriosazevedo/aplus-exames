import {beforeEach,describe,it,expect,vi} from "vitest";
const mocks=vi.hoisted(()=>({health:vi.fn(),getSql:vi.fn()}));
vi.mock("next/server",()=>({
  NextResponse:{json:(body,options={})=>({
    body,status:options.status??200,headers:options.headers||{}
  })}
}));
vi.mock("../../app/lib/server/db.js",()=>({
  databaseHealth:mocks.health,getSql:mocks.getSql
}));
import {GET} from "../../app/api/health/route.js";

beforeEach(()=>{
  vi.clearAllMocks();
  mocks.health.mockResolvedValue({
    configured:true,reachable:false,provider:"neon-postgres",
    error:"connection failed: postgresql://user:SECRET_DO_NOT_LOG@host/neondb",
    debugConnection:"SECRET_DO_NOT_LOG"
  });
});

describe("public health endpoint uses an explicit safe projection",()=>{
  it("never reflects raw database exceptions or unexpected driver properties",async()=>{
    const result=await GET();
    expect(result.status).toBe(200);
    expect(result.body.backendReachable).toBe(false);
    expect(result.body.database).toEqual({
      configured:true,reachable:false,provider:"neon-postgres"
    });
    expect(JSON.stringify(result.body)).not.toContain("SECRET_DO_NOT_LOG");
    expect(mocks.getSql).not.toHaveBeenCalled();
    expect(result.headers["Cache-Control"]).toBe("no-store");
  });
});
