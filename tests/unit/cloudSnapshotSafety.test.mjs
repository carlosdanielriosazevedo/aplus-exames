import {afterEach,beforeEach,describe,it,expect,vi} from "vitest";
import {validateCloudSnapshot,SNAPSHOT_LIMITS} from "../../app/lib/cloudSnapshotValidation.js";
import {validateCloudWrite} from "../../app/lib/server/cloud-state-validation.js";
import {safeCloudMerge,stableSnapshotJson} from "../../app/lib/cloudStateMerge.js";
import {preserveCloudOriginals,listCloudOriginals,assertLocalRecoveryCopy} from "../../app/lib/cloudRecovery.js";
import {loadLocalStateStatus} from "../../app/lib/persistence.js";

const snapshot=(extra={})=>({schema:"aplus-student-state-v8",xp:37,profile:{schoolYear:"12.º",optionalTopics:[]},
  scores:{t1:{domain:50,conf:20,evidence:[{itemId:"synthetic-item",at:1,source:"mission",correct:true}]}},
  missionHistory:[{completionId:"old-mission",at:1,themeId:"t1"}],examHistory:[{id:"old-exam",at:2,score20:14}],
  subjectProgress:{portuguese:{version:4,sessions:[{sessionId:"old-session",results:[null,{correct:null,status:"unanswered"}],completedAt:2}],competence:{},errorPatterns:{},lastPosition:null}},...extra});
const write=state=>validateCloudWrite({operation:"insert",expectedRevision:0,state});
function storage(){const data=new Map();return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};}
let local,session;
beforeEach(()=>{local=storage();session=storage();vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);});
afterEach(()=>{vi.unstubAllGlobals();});

describe("F7 structural contract and preservation",()=>{
  it.each([{},null,"history",42,true])("rejects malformed history %j without changing input",value=>{
    for(const key of ["missionHistory","examHistory"]){const state=snapshot({[key]:value}),before=JSON.stringify(state);
      expect(write(state).ok).toBe(false);expect(()=>safeCloudMerge(snapshot(),state)).toThrow(expect.objectContaining({code:"CLOUD_SNAPSHOT_RECOVERY_REQUIRED"}));expect(JSON.stringify(state)).toBe(before);}
  });
  it.each([
    {scores:{t1:{evidence:{}}}},{scores:{t1:null}},{scores:[]},{scores:{t1:{evidence:[null]}}},
    {subjectProgress:{portuguese:null}},{subjectProgress:{portuguese:{sessions:{}}}},
    {subjectProgress:{portuguese:{sessions:[null]}}},{subjectProgress:{portuguese:{competence:{x:null}}}},
    {subjectProgress:{portuguese:{errorPatterns:{x:{itemIds:{}}}}}},
    {subjectProgress:{portuguese:{lastPosition:{results:{}}}}},
    {subjectProgress:{portuguese:{lastPosition:{currentResult:{criteria:{}}}}}},
    {learningHypotheses:[{history:{}}]},{learningHypotheses:[{targetFocus:{}}]},
    {learningHypotheses:[{observations:[]}]},{lastExam:{score20:200}},{betaParticipant:{code:{}}},
    {lastExam:{itemResults:{}}},
    {dailyMission:{assignment:{plan:{reason:{}}}}},{dailyMission:{assignment:{plan:{reasons:[{detail:{}}]}}}},
    {dailyMission:{assignment:{plan:{unlocks:{}}}}},{lastMission:{signal:3}},
    {lastMission:{planReason:{}}},{lastExam:{answers:"invalid"}},{lastExam:{changes:[{before:{domain:{}},after:{}}]}},{lastExam:{changes:[{before:null,after:{}}]}},
    {profile:{optionalTopics:{}}},{competition:{weeks:{x:{activities:{}}}}},
    {engagement:{days:{x:{activityIds:{}}}}},{dailyMission:{assignment:{plan:null}}},
    {xp:"37"},{xp:-1},{xp:1.5},{xp:Number.MAX_VALUE},{xp:NaN},{xp:Infinity},
    {goal:200},{scores:{t1:{domain:101}}},{subjectProgressModelVersion:99},
    {subjectProgress:{portuguese:{version:99}}},{schema:"aplus-student-state-v9"}
  ])("rejects incompatible nested structure %#",extra=>{
    const state=snapshot(extra);expect(write(state).ok).toBe(false);
    expect(()=>safeCloudMerge(snapshot(),state)).toThrow(expect.objectContaining({code:"CLOUD_SNAPSHOT_RECOVERY_REQUIRED"}));
  });
  it("bounds arrays, all primitive nodes, depth, key counts and strings",()=>{
    const deep={};let at=deep;for(let i=0;i<SNAPSHOT_LIMITS.depth+1;i++){at.next={};at=at.next;}
    const samples=[{missionHistory:Array.from({length:SNAPSHOT_LIMITS.array+1},()=>({}))},
      {profile:{notes:"x".repeat(SNAPSHOT_LIMITS.string+1)}},{profile:deep},
      {scores:Object.fromEntries(Array.from({length:SNAPSHOT_LIMITS.keys+1},(_,i)=>["t"+i,{}]))},
      {profile:{a:Array(9000).fill(0),b:Array(9000).fill(0),c:Array(9000).fill(0)}},
      {profile:{segments:Array(40).fill("é".repeat(60000))}}];
    for(const extra of samples)expect(write(snapshot(extra)).ok).toBe(false);
  });
  it("rejects cycles, non-JSON values, sparse arrays and poison keys",()=>{
    const cycle={};cycle.next=cycle;
    const sparse=[];sparse.length=1;sparse.extra={};
    for(const extra of [{profile:cycle},{profile:new Date()},{missionHistory:sparse},
      {profile:JSON.parse('{"__proto__":{"polluted":true}}')},{profile:{fn(){}}}])expect(write(snapshot(extra)).ok).toBe(false);
    expect({}.polluted).toBeUndefined();
  });
  it.each([1,2,3,4,5,6,7,8])("reads legitimate v%s without coercing or mutating it",version=>{
    const original={schema:"aplus-student-state-v"+version,xp:12,scores:{},missionHistory:[{at:1,type:"legacy"}],examHistory:[]};
    const before=JSON.stringify(original);
    expect(validateCloudSnapshot(original,{legacy:true,privateFields:false}).ok).toBe(true);
    expect(safeCloudMerge(snapshot(),original).xp).toBe(37);
    expect(JSON.stringify(original)).toBe(before);
    if(version!==8)expect(write(original).ok).toBe(false);
  });
  it.each(["answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"])("continues to reject private assessment field %s on writes",key=>{
    expect(write(snapshot({lastExam:{nested:{[key]:"synthetic private answer"}}})).code).toBe("RESPONSE_TEXT_NOT_ALLOWED");
  });
  it.each(["verifiedXp","verifiedRewards","verifiedCompletionReceipts","officialXp","officialRankingXp","rewardReceipt","rewardReceipts","serverVerifiedXp","rewardAuthority","verifiedReceiptCount"])("never imports official authority %s",key=>{
    const remote=snapshot({lastExam:{nested:{[key]:99999}}});
    expect(write(remote).code).toBe("FORGED_REWARD_AUTHORITY");
    expect(()=>safeCloudMerge(snapshot(),remote)).toThrow();
  });
  it("does not adopt authority through a schema-less internal merge",()=>{
    expect(()=>safeCloudMerge(snapshot(),{xp:1,verifiedXp:999})).toThrow();
  });
});

describe("F7 deterministic merging and durable originals",()=>{
  it("rejects reviewed local files that discard readable XP, grades, answers or account metadata",()=>{
    const original=snapshot({missionHistory:{},identity:{authUserId:"A"}}),corrected={...original,missionHistory:[]};
    expect(assertLocalRecoveryCopy(original,corrected)).toEqual(corrected);
    for(const bad of [{...corrected,xp:0},{...corrected,examHistory:[]},{...corrected,identity:{authUserId:"B"}}])expect(()=>assertLocalRecoveryCopy(original,bad)).toThrow();
    expect(()=>assertLocalRecoveryCopy({...original,missionHistory:{unrecognised:"synthetic old answer"}},corrected)).toThrow();
  });
  it("unions distinct histories, id-less records and shared-session evidence without dropping any",()=>{
    const a=snapshot({examHistory:[{score20:14,at:1}],missionHistory:[{at:1,label:"A"}],
      scores:{t1:{evidence:[{completionId:"same-session",itemId:"q1",at:1}]}}});
    const b=snapshot({examHistory:[{score20:15,at:2}],missionHistory:[{at:2,label:"B"}],
      scores:{t1:{evidence:[{completionId:"same-session",itemId:"q2",at:1}]}}});
    const originalA=JSON.stringify(a),originalB=JSON.stringify(b),merged=safeCloudMerge(a,b);
    expect(merged.examHistory).toHaveLength(2);expect(merged.missionHistory).toHaveLength(2);expect(merged.scores.t1.evidence).toHaveLength(2);
    expect(stableSnapshotJson(merged)).toBe(stableSnapshotJson(safeCloudMerge(a,b)));
    expect(stableSnapshotJson(merged)).toBe(stableSnapshotJson(safeCloudMerge({...a,scores:{...a.scores}},b)));
    merged.examHistory[0].score20=0;expect(JSON.stringify(a)).toBe(originalA);expect(JSON.stringify(b)).toBe(originalB);
  });
  it("blocks ambiguous same-id records instead of silently preferring one version",()=>{
    const a=snapshot(),b=snapshot({examHistory:[{id:"old-exam",at:2,score20:19}]});
    expect(()=>safeCloudMerge(a,b)).toThrow(expect.objectContaining({code:"CLOUD_MERGE_REVIEW_REQUIRED"}));
    expect(a.examHistory[0].score20).toBe(14);expect(b.examHistory[0].score20).toBe(19);
  });
  it("retains the full superseded pending attempt and its answer in a local archive",()=>{
    const pending={sessionId:"attempt",current:2,currentAnswer:"synthetic unfinished answer"};
    const a=snapshot({subjectProgress:{portuguese:{lastActivityAt:5,lastPosition:pending,sessions:[]}}});
    const b=snapshot({subjectProgress:{portuguese:{lastActivityAt:6,lastPosition:null,sessions:[{sessionId:"attempt",completedAt:6}]}}});
    const merged=safeCloudMerge(a,b);expect(merged.subjectProgress.portuguese.lastPosition).toBe(null);
    expect(merged.cloudRecoveryArchive.entries[0].data).toEqual(pending);expect(a.subjectProgress.portuguese.lastPosition).toEqual(pending);
  });
  it("keeps every original, including legacy queues and more than eight backups",()=>{
    const legacy=' [{"id":"old","state":{"xp":91,"answers":["old"]}}] ';
    local.setItem("a25-cloud-snapshots-v1",legacy);local.setItem("a25-cloud-pending-v1",legacy);
    const a=snapshot(),bad=snapshot({missionHistory:{},lastExam:{answers:["synthetic old answer"]}});
    for(let i=0;i<12;i++)preserveCloudOriginals({local:a,remote:bad,label:"copy "+i});
    expect(listCloudOriginals()).toHaveLength(12);
    expect(listCloudOriginals().every(x=>JSON.stringify(x.remote)===JSON.stringify(bad))).toBe(true);
    expect(local.getItem("a25-cloud-snapshots-v1")).toBe(legacy);expect(local.getItem("a25-cloud-pending-v1")).toBe(legacy);
  });
  it("fails closed if only volatile or session fallback storage is writable",()=>{
    vi.stubGlobal("window",{});local.setItem=()=>{throw Error("synthetic quota");};
    expect(()=>preserveCloudOriginals({local:snapshot(),remote:snapshot()})).toThrow(expect.objectContaining({code:"CLOUD_RECOVERY_STORAGE_UNAVAILABLE"}));
    expect(session.length).toBe(0);
  });
  it("preserves malformed persisted JSON and structurally incompatible local progress byte-for-byte",()=>{
    for(const raw of ["{broken",JSON.stringify(snapshot({missionHistory:{}}))]){
      local.setItem("a25",raw);expect(loadLocalStateStatus({},()=>({}))).toMatchObject({found:true,error:true,state:null});
      expect(local.getItem("a25")).toBe(raw);
    }
  });
  it("does not hide an unreadable local copy behind a readable fallback",()=>{
    local.setItem("a25","{invalid");session.setItem("a25",JSON.stringify(snapshot()));
    expect(loadLocalStateStatus({},()=>({}))).toMatchObject({error:true,state:null});
    expect(local.getItem("a25")).toBe("{invalid");
  });
  it("refuses a union exceeding the budget without truncating histories",()=>{
    const a=snapshot({missionHistory:Array.from({length:6000},(_,i)=>({id:"a"+i}))}),b=snapshot({missionHistory:Array.from({length:6000},(_,i)=>({id:"b"+i}))});
    expect(()=>safeCloudMerge(a,b)).toThrow();expect(a.missionHistory).toHaveLength(6000);expect(b.missionHistory).toHaveLength(6000);
  });
  it("is deterministic across repeated adversarial combinations and never mutates either input",()=>{
    for(let i=0;i<80;i++){
      const a=snapshot({xp:i,examHistory:[{id:"a-"+i,at:i,score20:i%21}]}),b=snapshot({xp:79-i,examHistory:[{id:"b-"+i,at:i,score20:(i+1)%21}]});
      const before=[JSON.stringify(a),JSON.stringify(b)],first=safeCloudMerge(a,b),second=safeCloudMerge(a,b);
      expect(stableSnapshotJson(first)).toBe(stableSnapshotJson(second));expect(first.xp).toBe(Math.max(i,79-i));
      expect([JSON.stringify(a),JSON.stringify(b)]).toEqual(before);
    }
  });
});
