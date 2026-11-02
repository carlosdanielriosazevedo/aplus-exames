import {beforeEach,describe,expect,it,vi} from "vitest";

const mocks=vi.hoisted(()=>({
  requireSession:vi.fn(),
  getSql:vi.fn(),
  readCloudRow:vi.fn(),
  writeCloudRow:vi.fn()
}));

vi.mock("next/server",()=>({
  NextResponse:{
    json:(body,options={})=>({
      body,status:options.status??200,headers:options.headers||{}
    })
  }
}));
vi.mock("../../app/lib/server/identity.js",()=>({
  requireSession:mocks.requireSession,
  authErrorResponse:(error)=>({
    status:error.status||401,
    body:{ok:false,error:error.code||"UNAUTHORIZED"}
  })
}));
vi.mock("../../app/lib/server/db.js",()=>({
  getSql:mocks.getSql,
  databaseConfigured:()=>true
}));
vi.mock("../../app/lib/server/cloud-state-store.js",()=>({
  readCloudRow:mocks.readCloudRow,
  writeCloudRow:mocks.writeCloudRow
}));

import {GET,POST} from "../../app/api/cloud/state/route.js";

const origin="https://approva-isolated.test";
const state={schema:"aplus-student-state-v8",xp:1,subjectProgress:{}};
const payload={operation:"update",expectedRevision:2,state,deviceId:"device-test"};
function post(body,headers={origin}){
  return new Request(origin+"/api/cloud/state",{
    method:"POST",
    headers:{"Content-Type":"application/json",...headers},
    body:JSON.stringify(body)
  });
}

beforeEach(()=>{
  vi.clearAllMocks();
  mocks.requireSession.mockResolvedValue({authUserId:"verified-session-subject"});
  mocks.getSql.mockReturnValue({fakeSql:true});
  mocks.readCloudRow.mockResolvedValue(null);
  mocks.writeCloudRow.mockResolvedValue({
    ok:true,conflict:false,data:{revision:3,updated_at:"synthetic"}
  });
});

describe("trusted cloud-state HTTP boundary",()=>{
  it("rejects a cross-origin POST before touching any DB or session",async()=>{
    const result=await POST(post(payload,{origin:"https://attacker.test"}));
    expect(result.status).toBe(403);
    expect(mocks.requireSession).not.toHaveBeenCalled();
    expect(mocks.writeCloudRow).not.toHaveBeenCalled();
  });

  it("rejects an absent Origin header",async()=>{
    const result=await POST(new Request(origin+"/api/cloud/state",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    }));
    expect(result.status).toBe(403);
    expect(mocks.requireSession).not.toHaveBeenCalled();
  });

  it("rejects missing server session",async()=>{
    mocks.requireSession.mockRejectedValue(Object.assign(new Error("Unauthenticated"),{
      status:401,code:"UNAUTHORIZED"
    }));
    const result=await POST(post(payload));
    expect(result.status).toBe(401);
    expect(mocks.writeCloudRow).not.toHaveBeenCalled();
  });

  it("does not accept a caller-selected auth_user_id",async()=>{
    const result=await POST(post({
      ...payload,
      auth_user_id:"victim-subject",
      userId:"victim-id"
    }));
    expect(result.status).toBe(200);
    expect(mocks.writeCloudRow).toHaveBeenCalledTimes(1);
    expect(mocks.writeCloudRow.mock.calls[0][1]).toBe("verified-session-subject");
    expect(mocks.writeCloudRow.mock.calls[0][2].expectedRevision).toBe(2);
  });

  it("rejects tampered revision before writing",async()=>{
    const result=await POST(post({...payload,expectedRevision:-100}));
    expect(result.status).toBe(400);
    expect(mocks.writeCloudRow).not.toHaveBeenCalled();
  });

  it("returns HTTP 409 and current server snapshot for stale updates",async()=>{
    mocks.writeCloudRow.mockResolvedValue({
      ok:false,conflict:true,remote:{revision:9,state_json:state}
    });
    const result=await POST(post(payload));
    expect(result.status).toBe(409);
    expect(result.body.remote.revision).toBe(9);
    expect(result.headers["Cache-Control"]).toBe("no-store");
  });

  it("reads the logged-in subject only",async()=>{
    mocks.readCloudRow.mockResolvedValue({revision:4,state_json:state});
    const result=await GET();
    expect(result.status).toBe(200);
    expect(mocks.readCloudRow.mock.calls[0][1]).toBe("verified-session-subject");
    expect(result.body.data.revision).toBe(4);
  });
});
