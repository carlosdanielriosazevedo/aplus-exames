import {test,expect} from "vitest";
import {FQA_SUBJECT as ID,academicProgressFor,fqaResultEligibility,fqaResultContractEligibility,mergeFqaHistory,prepareFqaAcademicState,projectFqaAcademicProgress,stampFqaResult} from "../../app/lib/fqaAcademicIntegrity.js";
import {recordedFqaSession} from "../helpers/fqaRuntimeEvidence.js";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../../app/data/physicsChemistryExamBlueprint.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {advanceSubjectSession,beginSubjectSession,recordSubjectSession,migrateSubjectProgress,resetSubjectProgress,quarantineUnrecoverableSubjectSession} from "../../app/lib/subjectProgress.js";
import {safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
import {mergeStudentCloudState,studentStateForCloud} from "../../app/lib/cloud.js";
import {loadLocalStateStatus,saveLocalState} from "../../app/lib/persistence.js";
import {queueCloudSave,listPendingCloudSaves,saveLocalSnapshot,listLocalSnapshots} from "../../app/lib/cloudReliability.js";
import {savePhysicsChemistryExamDraft,loadPhysicsChemistryExamDraft} from "../../app/lib/physicsChemistryExamDraft.js";
const objective=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="multiple-choice");
const science=PHYSICS_CHEMISTRY_A_ITEMS.filter(x=>x.responseType==="restricted-response");
const result=gradePhysicsChemistryResponse(objective,objective.answerIndex);
const session=(id="s",item=objective,r=result)=>({sessionId:id,kind:"mission",itemIds:[item.id],results:[r],completedAt:100});
const liveSession=(sessionId="s",items=[objective],kind="mission")=>recordedFqaSession({sessionId,items,kind,completedAt:100});
const state=progress=>({xp:234,streak:7,engagement:{days:{synthetic:{xp:234}}},competition:{points:20},subjectProgress:{[ID]:{sessions:[],missionHistory:[],competence:{},errorPatterns:{},...progress}}});
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};
function withStorage(run){const before={localStorage:globalThis.localStorage,sessionStorage:globalThis.sessionStorage,window:globalThis.window};try{globalThis.localStorage=store();globalThis.sessionStorage=store();globalThis.window={localStorage:globalThis.localStorage};return run()}finally{for(const [k,v] of Object.entries(before))if(v===undefined)delete globalThis[k];else globalThis[k]=v}}

test.each(science)("$id cannot be promoted by invented validation claims",item=>{
 for(const points of [0,item.maxPoints]){
  const raw={status:"final",final:true,correct:true,points,provisionalPoints:points,maxPoints:item.maxPoints,rubricCompleted:true,gradingMode:"deterministic",validated:true,provenance:{reviewer:"teacher",verified:true},responseText:"Resposta exclusivamente sintética",revisionHistory:[{responseText:"Primeira versão sintética"}]};
  const input=state({sessions:[session("open",item,raw)],competence:{[item.competencyId]:{rubricObserved:100,rubricNeedsReview:100}},errorPatterns:{bad:{count:9,status:"recurring"}}});
  const copy=structuredClone(input),p=academicProgressFor(input,ID);
  expect(p.competence).toEqual({});expect(p.errorPatterns).toEqual({});expect(p.academicProjection.insufficient).toBe(true);expect(input).toEqual(copy);expect(fqaResultEligibility(item,raw).eligible).toBe(false);
 }
});

test("objective retained events survive opaque legacy totals without speculative subtraction",()=>{
 const raw=state({sessions:[liveSession()],competence:{mixed:{correct:999,attempts:1000,rubricObserved:500}}});
 const p=academicProgressFor(raw,ID);expect(p.competence[objective.competencyId].correct).toBe(1);expect(p.competence.mixed).toBeUndefined();expect(p.academicProjection.provenance[0]).toMatchObject({sessionId:"s",itemId:objective.id,lane:"recorded-objective"});
 expect(academicProgressFor(state({competence:{unknown:{correct:100}}}),ID).academicProjection.insufficient).toBe(true);
});

test.each([undefined,1,2,3,4])("subject model %s and app versions 29/31 remain intact and idempotent",version=>{
 for(const appVersion of [29,31]){
  const original=state({version,sessions:[session()],unknownLegacy:{answer:"sintética"}});original._stateVersion=appVersion;
  const once=prepareFqaAcademicState(original);expect(prepareFqaAcademicState(once)).toEqual(once);expect(once.subjectProgress[ID]).toMatchObject(original.subjectProgress[ID]);expect(once.xp).toBe(234);
 }
});

test("more than 100 retained sessions and unknown raw fields are never truncated",()=>{
 const raw=state({sessions:Array.from({length:130},(_,i)=>liveSession("s"+i)),competence:{old:{unknownField:"keep"}}});
 expect(migrateSubjectProgress(raw).subjectProgress[ID].sessions).toHaveLength(130);
 expect(academicProgressFor(raw,ID).competence[objective.competencyId].correct).toBe(130);
 const incomplete=state({completedSessionIds:["no-longer-retained"],sessions:[],competence:{old:{attempts:999}}});expect(academicProgressFor(incomplete,ID).academicProjection.insufficient).toBe(true);
});

test("training, paused, missing identity and malformed results never create academic signals",()=>{
 const s=session();const raw=state({sessions:[{...s,kind:"training"},{...s,sessionId:null},{...s,sessionId:"mismatch",results:[]}],lastPosition:{...s,current:0,startedAt:1}});
 expect(academicProgressFor(raw,ID).competence).toEqual({});expect(raw.subjectProgress[ID].lastPosition.startedAt).toBe(1);
});

test("both merge orders preserve divergent answers and exclude their marks",()=>{
 const a=state({sessions:[session()]});a.subjectProgress[ID].sessions[0].results[0]={...result,responseText:"Versão A sintética"};
 const b=structuredClone(a);b.subjectProgress[ID].sessions[0].results[0].responseText="Versão B sintética";b.subjectProgress[ID].lastActivityAt=999;
 for(const [l,r] of [[a,b],[b,a]]){
  let merged=safeCloudMerge(l,r);expect(JSON.stringify(merged)).toContain("Versão A sintética");expect(JSON.stringify(merged)).toContain("Versão B sintética");expect(academicProgressFor(merged,ID).academicProjection.conflicts).toBe(1);
  const projection=academicProgressFor(merged,ID);for(let i=0;i<3;i++)merged=safeCloudMerge(merged,r);expect(academicProgressFor(merged,ID)).toMatchObject({competence:projection.competence});
 }
});

test.each(["aplus-student-state-v1","aplus-student-state-v2","aplus-student-state-v3","aplus-student-state-v4","aplus-student-state-v5","aplus-student-state-v6","aplus-student-state-v7","aplus-student-state-v8"])("cloud %s cannot replace private answers or resurrect scientific aggregates",schema=>{
 const a=state({sessions:[session("science",science[0],{responseText:"Só local sintético",provisionalPoints:8,maxPoints:10})]});
 const remote=studentStateForCloud(a);remote.schema=schema;remote.subjectProgress[ID].competence={bad:{rubricObserved:9000}};
 const merged=mergeStudentCloudState(a,remote);expect(JSON.stringify(merged)).toContain("Só local sintético");expect(academicProgressFor(merged,ID).competence).toEqual({});
 const serialized=JSON.stringify(studentStateForCloud(merged));expect(serialized).not.toContain("Só local sintético");expect(serialized).not.toContain('"responseText"');expect(serialized).not.toContain('"studentEvidence"');
});

test("cloud copies missing private text do not create false conflicts",()=>{
 const observed=liveSession();observed.results[0].responseText="sintético";const a=state({sessions:[observed]});const merged=safeCloudMerge(a,studentStateForCloud(a));expect(academicProgressFor(merged,ID).academicProjection.conflicts).toBe(0);expect(academicProgressFor(merged,ID).competence[objective.competencyId].correct).toBe(1);
});

test("old queue and recovery snapshots preserve originals and use current policy on serialization",()=>withStorage(()=>{
 const a=state({sessions:[session("old",science[0],{responseText:"Sintético privado",provisionalPoints:9})]});
 queueCloudSave(a,{at:1});saveLocalSnapshot(a,{at:1});
 for(const raw of [listPendingCloudSaves()[0].state,listLocalSnapshots()[0].state]){
  expect(raw).toEqual(a);expect(academicProgressFor(raw,ID).academicProjection.insufficient).toBe(true);expect(JSON.stringify(studentStateForCloud(raw))).not.toContain("Sintético privado");
 }
}));

test("reload preserves activity, raw results, timestamps and idempotence",()=>withStorage(()=>{
 const a=state({sessions:[session("old",science[0],{responseText:"Texto sintético",provisionalPoints:9})]});
 expect(saveLocalState(a)).toBe(true);const first=loadLocalStateStatus({},()=>({})).state;expect(saveLocalState(first)).toBe(true);const second=loadLocalStateStatus({},()=>({})).state;
 expect(second.subjectProgress).toEqual(first.subjectProgress);expect(second.xp).toBe(a.xp);expect(second.engagement).toEqual(a.engagement);expect(second.subjectProgress[ID].sessions).toEqual(a.subjectProgress[ID].sessions);
}));

test("quota failure does not remove the existing durable source",()=>withStorage(()=>{
 const original=JSON.stringify(state({sessions:[session()]}));localStorage.setItem("a25",original);localStorage.setItem=()=>{throw Error("quota")};sessionStorage.setItem=()=>{throw Error("quota")};
 saveLocalState(state({sessions:[session("new")]}));expect(localStorage.getItem("a25")).toBe(original);
}));

test("two pending variants block mutations; completed sessions cannot be rewarded again",()=>{
 const pending={sessionId:"pending",kind:"mission",itemIds:[objective.id],results:[],current:0,startedAt:1};
 const a=state({lastPosition:pending}),b=state({lastPosition:{...pending,currentAnswer:"different synthetic"}});const merged=safeCloudMerge(a,b);
 expect(merged.subjectProgress[ID].integrityPendingConflict).toBe(true);expect(beginSubjectSession(merged,{subjectId:ID,kind:"mission",items:[objective]})).toBe(merged);
 expect(advanceSubjectSession(merged,ID,{results:[]})).toBe(merged);
 expect(resetSubjectProgress(merged,ID)).toBe(merged);expect(quarantineUnrecoverableSubjectSession(merged,ID,[])).toBe(merged);
 const completed=state({sessions:[session()]});expect(recordSubjectSession(completed,{subjectId:ID,kind:"mission",items:[objective],results:[result],sessionId:"s"})).toBe(completed);
});

test("exam draft clock and text survive reload and later saves",()=>withStorage(()=>{
 savePhysicsChemistryExamDraft("synthetic",{itemIds:[science[0].id],index:0,answers:{[science[0].id]:"Texto sintético"},startedAt:100});
 savePhysicsChemistryExamDraft("synthetic",{itemIds:[science[0].id],index:0,answers:{[science[0].id]:"Texto sintético"},startedAt:900});
 const draft=loadPhysicsChemistryExamDraft("synthetic",[science[0].id]);expect(draft.startedAt).toBe(100);expect(draft.answers[science[0].id]).toBe("Texto sintético");
}));

test("Math and Portuguese are unchanged by the FQA policy",()=>{
 const a={xp:50,subjectProgress:{portuguese:{competence:{p:{attempts:3}},errorPatterns:{p:{count:2}}},"math-a":{custom:"unchanged"}}};expect(prepareFqaAcademicState(a)).toBe(a);expect(academicProgressFor(a,"portuguese")).toBe(a.subjectProgress.portuguese);
});

test("malformed local JSON is preserved and blocks automatic loading",()=>withStorage(()=>{
 localStorage.setItem("a25",'{"subjectProgress":{"physics-chemistry-a":');const original=localStorage.getItem("a25");expect(loadLocalStateStatus({},()=>({})).error).toBe(true);expect(localStorage.getItem("a25")).toBe(original);
}));

test("different local storage copies preserve both answers",()=>withStorage(()=>{
 const a=state({sessions:[session("same",science[0],{responseText:"Local sintético"})]});const b=state({sessions:[session("same",science[0],{responseText:"Separador sintético"})]});a._savedAt=2;b._savedAt=1;
 localStorage.setItem("a25",JSON.stringify(a));sessionStorage.setItem("a25",JSON.stringify(b));const loaded=loadLocalStateStatus({},()=>({})).state;
 expect(JSON.stringify(loaded)).toContain("Local sintético");expect(JSON.stringify(loaded)).toContain("Separador sintético");expect(academicProgressFor(loaded,ID).academicProjection.conflicts).toBe(1);
}));

test("structured records require a catalog match and coherent step totals",()=>{
 const item=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="stepwise");
 const r=stampFqaResult(item,{gradingMode:"structured-provisional",maxPoints:item.maxPoints,provisionalPoints:item.maxPoints,requiresReview:false,steps:item.steps.map(x=>({id:x.id,points:x.points,maxPoints:x.points}))});expect(fqaResultContractEligibility(item,r).eligible).toBe(true);expect(fqaResultContractEligibility(item,{...r,provisionalPoints:1}).eligible).toBe(false);expect(fqaResultEligibility(item,r).eligible).toBe(false);
 const mixed=state({sessions:[liveSession("mixed",[objective,item,science[0]],"mini_exam")]});const p=academicProgressFor(mixed,ID);expect(p.academicProjection.provenance).toHaveLength(2);expect(p.academicProjection.excluded).toBe(1);
});

test("legacy objective totals without source provenance remain archived, not silently validated",()=>{
 const {academicProvenance,...legacy}=result;const raw=state({sessions:[session("legacy",objective,legacy)]});expect(academicProgressFor(raw,ID).academicProjection.insufficient).toBe(true);expect(raw.subjectProgress[ID].sessions[0].results[0]).toEqual(legacy);
 expect(fqaResultEligibility({...objective,prompt:objective.prompt+" changed"},result).eligible).toBe(false);
 expect(fqaResultEligibility(objective,{...result,points:0}).eligible).toBe(false);
});

test("privacy filtering cannot erase an unresolved answer conflict",()=>{
 const a=state({sessions:[session("same",objective,{...result,responseText:"A sintético"})]});const b=state({sessions:[session("same",objective,{...result,responseText:"B sintético"})]});
 const merged=safeCloudMerge(a,b);const remote=studentStateForCloud(merged);
 expect(remote.subjectProgress[ID].integrityConflictedSessionIds).toContain("same");expect(academicProgressFor(remote,ID).competence).toEqual({});expect(academicProgressFor(remote,ID).academicProjection.conflicts).toBe(1);
 const cycle=safeCloudMerge(remote,studentStateForCloud(a));expect(academicProgressFor(cycle,ID).academicProjection.conflicts).toBe(1);
});

test("retaking a legacy pause preserves every original result field in the archive",()=>{
 const legacy=state({lastPosition:{sessionId:"legacy-pause",kind:"mission",itemIds:[science[0].id],current:0,startedAt:100,results:[{responseText:"Histórico sintético",privateLegacyDetail:{keep:"all"}}]}});
 const prepared=prepareFqaAcademicState(legacy);const next=advanceSubjectSession(prepared,ID,{sessionId:"legacy-pause",current:0,results:[],currentAnswer:"Atual sintético",updatedAt:200});
 expect(next.subjectProgress[ID].integrityHistory[0].lastPosition).toEqual(legacy.subjectProgress[ID].lastPosition);expect(next.subjectProgress[ID].lastPosition.startedAt).toBe(100);
});

test("new scientific completion retains legitimate mission XP and leaves existing competence intact",()=>{
 const item=science[0],raw=state({competence:{historical:{rubricObserved:3}},errorPatterns:{historical:{count:3}}});
 const input={status:"auto-assessed-provisional",final:false,correct:null,provisionalPoints:9,maxPoints:item.maxPoints,responseText:"Resposta sintética",rubricCompleted:true,criteria:[{id:"x",observations:[{id:"x1",status:"observed"}]}]};
 const done=recordSubjectSession(raw,{subjectId:ID,kind:"mission",items:[item],results:[input],sessionId:"new-synthetic",completedAt:1750000000000});
 expect(done.xp).toBe(raw.xp+25);expect(done.subjectProgress[ID].competence).toEqual(raw.subjectProgress[ID].competence);expect(done.subjectProgress[ID].sessions.at(-1).results[0].responseText).toBe(input.responseText);
 expect(academicProgressFor(done,ID).competence).toEqual({});expect(recordSubjectSession(done,{subjectId:ID,kind:"mission",items:[item],results:[input],sessionId:"new-synthetic",completedAt:1750000000000})).toBe(done);
});


test("full exam operational wrappers preserve the catalog provenance of objective results",()=>{
 const items=[...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems,...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalItems].filter(x=>x.responseType==="multiple-choice");
 const raw=state({sessions:[liveSession("synthetic-full-exam",items,"full_exam")]});
 expect(academicProgressFor(raw,ID).academicProjection.provenance).toHaveLength(items.length);
});
