import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";

const mocked=vi.hoisted(()=>({
  authSession:vi.fn(),
  dataClient:vi.fn(),
  authFactory:vi.fn()
}));
vi.mock("@neondatabase/neon-js",()=>({
  createClient:mocked.dataClient
}));
vi.mock("@neondatabase/neon-js/auth",()=>({
  createInternalNeonAuth:mocked.authFactory
}));
vi.mock("@neondatabase/neon-js/auth/react/adapters",()=>({
  BetterAuthReactAdapter:()=>({})
}));

import {loadStudentCloudState,saveStudentCloudState,overwriteStudentCloudState}
  from "../../app/lib/cloud.js";

const remote={state_json:{schema:"aplus-student-state-v8",xp:7},
  revision:7,updated_at:"2026-11-02T00:00:00Z",last_device_id:"a"};
let network;
beforeEach(()=>{
  vi.stubEnv("NEXT_PUBLIC_NEON_AUTH_URL","https://synthetic-auth.example.invalid");
  vi.stubEnv("NEXT_PUBLIC_NEON_DATA_API_URL","https://synthetic-data.example.invalid");
  mocked.authSession.mockResolvedValue({data:{user:{id:"synthetic-auth-a"}}});
  mocked.authFactory.mockReturnValue({adapter:{getSession:mocked.authSession}});
  network=vi.fn(async(url,options={})=>{
    if(url==="/api/auth/session")return {ok:true,status:200,json:async()=>({ok:true})};
    if(url==="/api/cloud/state"){
      if(options.method==="GET")return {ok:true,status:200,
        json:async()=>({ok:true,data:remote})};
      if(options.method==="POST")return {ok:true,status:200,
        json:async()=>({ok:true,conflict:false,data:{revision:8}})};
    }
    throw Error("Unexpected mock URL: "+url);
  });
  vi.stubGlobal("fetch",network);
});
afterEach(()=>{
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});
const student={xp:8,profile:{year:12},subjectProgress:{}};

describe("cloud browser transport after server CAS transition",()=>{
  it("loads own state through server route, not a direct Data API call",async()=>{
    const data=await loadStudentCloudState();
    expect(data.revision).toBe(7);
    expect(network.mock.calls.some(([path])=>path==="/api/cloud/state")).toBe(true);
    expect(mocked.dataClient).not.toHaveBeenCalled();
  });

  it("uses initial non-overwriting insert and preserves response contract",async()=>{
    const outcome=await saveStudentCloudState(student,{expectedRevision:0,deviceId:"one"});
    expect(outcome).toEqual({ok:true,conflict:false,data:{revision:8}});
    const [,settings]=network.mock.calls.find(([path])=>path==="/api/cloud/state");
    expect(settings.method).toBe("POST");
    expect(settings.credentials).toBe("include");
    expect(JSON.parse(settings.body)).toMatchObject({
      operation:"insert",expectedRevision:0,deviceId:"one"
    });
    expect(JSON.parse(settings.body).state.schema).toBe("aplus-student-state-v8");
  });

  it("requires an explicit compare-and-swap revision on overwrites",async()=>{
    await overwriteStudentCloudState(student,{remoteRevision:7,deviceId:"second"});
    const [,settings]=network.mock.calls.find(([path])=>path==="/api/cloud/state");
    expect(JSON.parse(settings.body)).toMatchObject({
      operation:"update",expectedRevision:7,deviceId:"second"
    });
  });

  it("preserves stale-write remote for the existing conflict UI",async()=>{
    network.mockImplementation(async(url,options={})=>{
      if(url==="/api/auth/session")return {ok:true,status:200,json:async()=>({ok:true})};
      if(url==="/api/cloud/state"&&options.method==="POST")
        return {ok:false,status:409,json:async()=>({
          ok:false,conflict:true,remote
        })};
      throw Error("Unexpected request");
    });
    const result=await saveStudentCloudState(student,{expectedRevision:3,knownRemote:true});
    expect(result.conflict).toBe(true);
    expect(result.remote.revision).toBe(7);
  });
});
