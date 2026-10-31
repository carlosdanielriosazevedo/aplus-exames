import {afterEach,beforeEach,expect,test,vi} from "vitest";
const fixture=vi.hoisted(()=>({remote:null,writes:[]}));
vi.mock("@neondatabase/neon-js",()=>({createClient:()=>({from:table=>{
 const query={where:{},payload:null,select(){return this},eq(k,v){this.where[k]=v;return this},update(row){this.payload=row;return this},async maybeSingle(){
  if(table!=="student_cloud_state"||this.where.auth_user_id!=="synthetic-user")throw Error("Synthetic ownership boundary missing");
  if(this.payload){if(this.where.revision!==fixture.remote.revision)return {data:null};fixture.writes.push(this.payload);fixture.remote=this.payload;return {data:this.payload}}
  return {data:fixture.remote};
 }};return query;
}})}));
vi.mock("@neondatabase/neon-js/auth",()=>({createInternalNeonAuth:()=>({adapter:{getSession:async()=>({data:{user:{id:"synthetic-user"}}})}})}));
vi.mock("@neondatabase/neon-js/auth/react/adapters",()=>({BetterAuthReactAdapter:()=>({})}));
import {saveStudentCloudState,mergeStudentCloudState,studentStateForCloud} from "../../app/lib/cloud.js";
import {safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
import {academicProgressFor,FQA_SUBJECT as id} from "../../app/lib/fqaAcademicIntegrity.js";
const state=text=>({xp:234,subjectProgress:{[id]:{version:4,lastActivityAt:100,sessions:[{sessionId:"synthetic-completed",kind:"mission",completedAt:100,itemIds:["FQA-R-MEC-01"],results:[{responseText:text,provisionalPoints:9,maxPoints:10,rubricCompleted:true}]}],competence:{"fqa-data":{rubricObserved:900}},errorPatterns:{bad:{count:9}}}}});
beforeEach(()=>{fixture.writes=[];fixture.remote={revision:1,state_json:studentStateForCloud(state("Remote synthetic"))};vi.stubEnv("NEXT_PUBLIC_NEON_AUTH_URL","https://synthetic.invalid");vi.stubEnv("NEXT_PUBLIC_NEON_DATA_API_URL","https://synthetic.invalid");vi.stubGlobal("fetch",vi.fn(async()=>({ok:true,json:async()=>({ok:true})})));});
afterEach(()=>{vi.unstubAllEnvs();vi.unstubAllGlobals()});

test("queued legacy state is serialized through the policy and privacy filter with CAS ownership intact",async()=>{
 const legacy=state("Private synthetic queued answer");const copy=structuredClone(legacy);
 const response=await saveStudentCloudState(legacy,{expectedRevision:1,knownRemote:true,deviceId:"synthetic-device"});
 expect(response.ok).toBe(true);expect(fixture.remote.revision).toBe(2);expect(fixture.writes).toHaveLength(1);
 expect(fixture.remote.auth_user_id).toBe("synthetic-user");expect(fixture.remote.state_json.subjectProgress[id].academicIntegrityPolicy).toBe(1);
 expect(JSON.stringify(fixture.remote.state_json)).not.toContain("Private synthetic queued answer");expect(legacy).toEqual(copy);
 expect(academicProgressFor(fixture.remote.state_json,id).academicProjection.insufficient).toBe(true);
});

test("stale device cannot overwrite a newer revision and merge preserves response variants",async()=>{
 const local=state("A synthetic"),other=state("B synthetic");
 const first=await saveStudentCloudState(local,{expectedRevision:1,knownRemote:true,deviceId:"device-A"});expect(first.ok).toBe(true);
 const stale=await saveStudentCloudState(other,{expectedRevision:1,knownRemote:true,deviceId:"device-B"});expect(stale.conflict).toBe(true);expect(fixture.writes).toHaveLength(1);
 const combined=safeCloudMerge(local,other);const loaded=mergeStudentCloudState(combined,fixture.remote.state_json);
 expect(JSON.stringify(loaded)).toContain("A synthetic");expect(JSON.stringify(loaded)).toContain("B synthetic");expect(academicProgressFor(loaded,id).academicProjection.conflicts).toBe(1);
 const resolved=await saveStudentCloudState(loaded,{expectedRevision:2,knownRemote:true,deviceId:"device-A"});expect(resolved.ok).toBe(true);expect(fixture.remote.revision).toBe(3);expect(academicProgressFor(fixture.remote.state_json,id).competence).toEqual({});
});
