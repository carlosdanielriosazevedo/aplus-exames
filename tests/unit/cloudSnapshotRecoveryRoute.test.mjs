import {beforeEach,describe,it,expect,vi} from "vitest";
const fixture=vi.hoisted(()=>({user:"A",row:null,history:[],queries:[],fail:false,barrier:null}));
vi.mock("next/server",()=>({NextResponse:{json:(...args)=>Response.json(...args)}}));
vi.mock("../../app/lib/server/identity.js",()=>({requireSession:async()=>({authUserId:fixture.user}),authErrorResponse:()=>({status:401,body:{ok:false,error:"UNAUTHORIZED"}})}));
vi.mock("../../app/lib/server/db.js",()=>({databaseConfigured:()=>true,getSql:()=>async(strings,...values)=>{
  const sql=strings.join("?");fixture.queries.push({sql,values});
  if(sql.includes("select state_json"))return fixture.row?[structuredClone(fixture.row)]:[];
  if(fixture.barrier)await fixture.barrier();
  if(fixture.fail)throw Error("synthetic storage failure");
  if(sql.includes("update public.student_cloud_state")){
    const [json,device,owner,revision]=values;
    if(owner!==fixture.user||fixture.row?.revision!==revision)return [];
    fixture.history.push(structuredClone(fixture.row));fixture.row={state_json:JSON.parse(json),revision:revision+1,last_device_id:device};return [structuredClone(fixture.row)];
  }
  if(sql.includes("insert into public.student_cloud_state")){
    if(fixture.row)return [];
    fixture.row={state_json:JSON.parse(values[1]),revision:1};return [structuredClone(fixture.row)];
  }
  throw Error("Unexpected synthetic SQL");
}}));
import {GET,POST} from "../../app/api/cloud/state/route.js";
const origin="https://isolated.example.invalid";
const valid=()=>({schema:"aplus-student-state-v8",xp:37,missionHistory:[{id:"retained"}],examHistory:[{id:"old-exam",score20:14}],scores:{},lastExam:{}});
const post=body=>new Request(origin+"/api/cloud/state",{method:"POST",headers:{origin,"content-type":"application/json"},body:JSON.stringify(body)});
const payload=(state=valid(),extra={})=>({operation:"update",expectedRevision:2,state,...extra});
const exportRequest=(account="A")=>new Request(origin+"/api/cloud/state?recovery=original&account="+account);
beforeEach(()=>{fixture.user="A";fixture.row={revision:2,state_json:{...valid(),missionHistory:{},lastExam:{answers:["synthetic old answer"]}}};fixture.history=[];fixture.queries=[];fixture.fail=false;fixture.barrier=null;});
async function confirmation(){const bundle=await(await GET(exportRequest())).json();return {confirmed:true,revision:bundle.revision,digest:bundle.digest,accountId:"A"};}

describe("F7 stored snapshot quarantine and controlled CAS recovery",()=>{
  it("quarantines malformed saved rows without returning them to automatic consumers",async()=>{
    const before=structuredClone(fixture.row),response=await GET();
    expect(response.status).toBe(409);expect(await response.json()).toMatchObject({code:"CLOUD_SNAPSHOT_RECOVERY_REQUIRED",recoveryAvailable:true,revision:2});
    expect(fixture.row).toEqual(before);expect(fixture.history).toHaveLength(0);
  });
  it("exports the exact original, including old answers, privately and without a write",async()=>{
    const before=JSON.stringify(fixture.row),response=await GET(exportRequest()),bundle=await response.json();
    expect(response.status).toBe(200);expect(JSON.stringify(bundle.data)).toBe(before);expect(bundle.needsRepair).toBe(true);
    expect(bundle.digest).toMatch(/^[a-f0-9]{64}$/);expect(bundle.accountId).toBe("A");
    expect(response.headers.get("content-disposition")).toContain("attachment");expect(response.headers.get("cache-control")).toBe("no-store");
    expect(fixture.queries.every(x=>x.sql.includes("select state_json"))).toBe(true);
  });
  it("refuses an export for a different account before any SQL",async()=>{
    expect((await GET(exportRequest("B"))).status).toBe(403);expect(fixture.queries).toHaveLength(0);
  });
  it("blocks normal overwrites of a malformed existing snapshot",async()=>{
    const original=structuredClone(fixture.row);expect((await POST(post(payload()))).status).toBe(409);
    expect(fixture.row).toEqual(original);expect(fixture.history).toHaveLength(0);
  });
  it("rejects malformed uploads before any database operation",async()=>{
    for(const state of [{...valid(),missionHistory:{}},{...valid(),examHistory:null},{...valid(),scores:{t:{evidence:{}}}},
      {...valid(),subjectProgress:{portuguese:{sessions:{}}}}])expect((await POST(post(payload(state)))).status).toBe(400);
    expect(fixture.queries).toHaveLength(0);
  });
  it("requires account, digest, revision and explicit confirmation for repair",async()=>{
    const good=await confirmation(),before=structuredClone(fixture.row);
    for(const recovery of [{...good,confirmed:false},{...good,revision:1},{...good,digest:"bad"}])expect((await POST(post(payload(valid(),{recovery})))).status).toBe(400);
    expect((await POST(post(payload(valid(),{recovery:{...good,accountId:"B"}})))).status).toBe(403);
    expect((await POST(post(payload(valid(),{recovery:{...good,digest:"0".repeat(64)}})))).status).toBe(409);
    expect(fixture.row).toEqual(before);expect(fixture.history).toHaveLength(0);
  });
  it("preserves the entire OLD snapshot on an explicitly acknowledged correction",async()=>{
    const recovery=await confirmation(),old=structuredClone(fixture.row),response=await POST(post(payload(valid(),{recovery})));
    expect(response.status).toBe(200);expect(fixture.row.revision).toBe(3);expect(fixture.row.state_json.xp).toBe(37);
    expect(fixture.history).toEqual([old]);expect(fixture.history[0].state_json.lastExam.answers).toEqual(["synthetic old answer"]);
  });
  it("allows only one of two concurrent repairs and retains the original exactly once",async()=>{
    const recovery=await confirmation(),old=structuredClone(fixture.row);let entered=0,release;
    const barrier=new Promise(resolve=>{release=resolve;});fixture.barrier=async()=>{if(++entered===2)release();await barrier;};
    const results=await Promise.all([POST(post(payload({...valid(),xp:41},{recovery}))),POST(post(payload({...valid(),xp:42},{recovery})))]);
    expect(results.map(x=>x.status).sort()).toEqual([200,409]);expect(fixture.row.revision).toBe(3);expect(fixture.history).toEqual([old]);
  });
  it("blocks an acknowledged repair that discards readable XP or old grades",async()=>{
    const recovery=await confirmation(),old=structuredClone(fixture.row);
    for(const state of [{...valid(),xp:0},{...valid(),examHistory:[]}]){
      const response=await POST(post(payload(state,{recovery})));expect(response.status).toBe(409);
      expect((await response.json()).code).toBe("CLOUD_RECOVERY_REVIEW_REQUIRED");
    }
    expect(fixture.row).toEqual(old);expect(fixture.history).toHaveLength(0);
  });
  it("keeps ordinary valid-state CAS conflicts safe",async()=>{
    fixture.row.state_json=valid();const old=structuredClone(fixture.row);
    const responses=await Promise.all([POST(post(payload({...valid(),xp:41}))),POST(post(payload({...valid(),xp:42})))]);
    expect(responses.map(x=>x.status).sort()).toEqual([200,409]);expect(fixture.history).toEqual([old]);
  });
  it("keeps original data if storage fails during recovery",async()=>{
    const recovery=await confirmation(),old=structuredClone(fixture.row);fixture.fail=true;
    expect((await POST(post(payload(valid(),{recovery})))).status).toBe(503);
    expect(fixture.row).toEqual(old);expect(fixture.history).toHaveLength(0);
  });
  it("does not accept private answers or official rewards in a repaired copy",async()=>{
    const recovery=await confirmation();fixture.queries=[];
    for(const nested of [{answers:["new answer"]},{verifiedXp:9999},{officialRankingXp:9999}])
      expect((await POST(post(payload({...valid(),lastExam:nested},{recovery})))).status).toBe(400);
    expect(fixture.queries).toHaveLength(0);expect(fixture.history).toHaveLength(0);
  });
  it("reads legitimate older snapshots without changing their versions",async()=>{
    for(let version=1;version<=8;version++){
      const state={...valid(),schema:"aplus-student-state-v"+version};fixture.row={revision:2,state_json:state};
      const response=await GET();expect(response.status).toBe(200);expect((await response.json()).data.state_json).toEqual(state);
    }
  });
});
