import {test,expect} from "vitest";
import {FQA_SUBJECT as ID,academicProgressFor,prepareFqaAcademicState,mergeFqaHistory,normalizeFqaProgress,stampFqaResult,verifiedFqaAcademicResult,restoreFqaResultView} from "../../app/lib/fqaAcademicIntegrity.js";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {gradePhysicsChemistryResponse,buildAdaptivePhysicsChemistryMission} from "../../app/lib/physicsChemistryEngine.js";
import {subjectProgressFor,advanceSubjectSession,beginSubjectSession,recordSubjectSession,resetSubjectProgress} from "../../app/lib/subjectProgress.js";
import {studentStateForCloud,mergeStudentCloudState} from "../../app/lib/cloud.js";
import {safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
import {saveLocalState,loadLocalStateStatus} from "../../app/lib/persistence.js";
const item=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="multiple-choice");
const grade=gradePhysicsChemistryResponse(item,item.answerIndex);
const position=()=>({sessionId:"synthetic-p1-pause",kind:"mission",itemIds:[item.id],results:[],current:0,currentAnswer:1,startedAt:100,updatedAt:200});
const state=p=>({xp:234,streak:7,subjectProgress:{[ID]:{version:4,sessions:[],missionHistory:[],competence:{},errorPatterns:{},lastPosition:null,...p}}});
const session=(result,index=0)=>({sessionId:"synthetic-event-"+index,kind:"mission",itemIds:[item.id],results:[result],completedAt:1750000000000+index});
function inMemoryStorage(run){const keys=["localStorage","sessionStorage","window"],previous=keys.map(k=>Object.getOwnPropertyDescriptor(globalThis,k));const memory=()=>{const m=new Map();return {getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};try{globalThis.localStorage=memory();globalThis.sessionStorage=memory();globalThis.window={localStorage,sessionStorage};return run()}finally{keys.forEach((k,i)=>{if(previous[i])Object.defineProperty(globalThis,k,previous[i]);else delete globalThis[k]})}}

test.each(["updatedAt","lastActivityAt","_savedAt"])("administrative %s changes do not conflict in either merge order",field=>{
 const a=state({lastPosition:position(),lastActivityAt:200}),b=structuredClone(a);b.subjectProgress[ID].lastPosition[field]=999;b.subjectProgress[ID].lastActivityAt=999;
 for(const [left,right] of [[a,b],[b,a]]){
  const merged=safeCloudMerge(left,right);expect(merged.subjectProgress[ID].integrityPendingConflict).toBe(false);
  const advanced=advanceSubjectSession(merged,ID,{sessionId:position().sessionId,current:0,results:[],currentAnswer:1,updatedAt:1000});expect(advanced).not.toBe(merged);expect(advanced.subjectProgress[ID].lastPosition.startedAt).toBe(100);
 }
});

test("privacy omissions are explicit; local text survives newer cloud timestamps",()=>{
 const p=position();p.currentAnswer="synthetic pending text";p.results=[{status:"final",responseText:"synthetic submitted text"}];
 const a=state({lastPosition:p,lastActivityAt:200}),remote=studentStateForCloud(a);remote.subjectProgress[ID].lastPosition.updatedAt=400;remote.subjectProgress[ID].lastActivityAt=400;
 expect(JSON.stringify(remote)).not.toContain("synthetic pending text");expect(JSON.stringify(remote)).not.toContain("synthetic submitted text");
 for(const next of [mergeStudentCloudState(a,remote),safeCloudMerge(a,remote)]){
  expect(next.subjectProgress[ID].integrityPendingConflict).toBe(false);expect(next.subjectProgress[ID].lastPosition.currentAnswer).toBe(p.currentAnswer);expect(next.subjectProgress[ID].lastPosition.results[0].responseText).toBe(p.results[0].responseText);
 }
});

test("legacy cloud schema without omission markers is interpreted only at cloud ingress",()=>{
 const a=state({lastPosition:position(),lastActivityAt:200}),remote=JSON.parse(JSON.stringify(a));remote.schema="aplus-student-state-v1";delete remote.subjectProgress[ID].lastPosition.currentAnswer;
 expect(mergeStudentCloudState(a,remote).subjectProgress[ID].integrityPendingConflict).toBe(false);
 const localUnknown=structuredClone(remote);delete localUnknown.schema;expect(safeCloudMerge(a,localUnknown).subjectProgress[ID].integrityPendingConflict).toBe(true);
});

test.each(["currentAnswer","current","sessionId","startedAt","kind","itemIds","results"])("real divergence in %s stays blocked and both sources remain",field=>{
 const a=state({lastPosition:position(),lastActivityAt:200}),b=structuredClone(a);const alternatives={currentAnswer:2,current:1,sessionId:"another-synthetic",startedAt:101,kind:"training",itemIds:["another-item"],results:[{status:"final",responseText:"different synthetic"}]};b.subjectProgress[ID].lastPosition[field]=alternatives[field];
 for(const [left,right] of [[a,b],[b,a]]){
  const next=safeCloudMerge(left,right);expect(next.subjectProgress[ID].integrityPendingConflict||next.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);expect(advanceSubjectSession(next,ID,{results:[]})).toBe(next);expect(beginSubjectSession(next,{subjectId:ID,kind:"mission",items:[item]})).toBe(next);expect(resetSubjectProgress(next,ID)).toBe(next);
  expect(next.subjectProgress[ID].integrityHistory.length).toBeGreaterThan(0);
 }
});

test("redaction cannot clear a real pending conflict",()=>{
 const a=state({lastPosition:position()}),b=state({lastPosition:{...position(),currentAnswer:2}});const merged=safeCloudMerge(a,b);const cloud=studentStateForCloud(merged);const roundtrip=safeCloudMerge(cloud,studentStateForCloud(a));expect(roundtrip.subjectProgress[ID].integrityPendingConflict).toBe(true);expect(roundtrip.subjectProgress[ID].integrityPendingConflictKind).toBe("semantic-v1");
});

test("legacy flags are cleared only when complete originals prove an administrative false conflict",()=>{
 const original=position(),later={...original,updatedAt:300};const legacy={...state({lastPosition:later}).subjectProgress[ID],integrityPendingConflict:true,integrityPendingVariants:[original,later]};
 expect(mergeFqaHistory(legacy,legacy).integrityPendingConflict).toBe(false);
 const cloud=studentStateForCloud(state(legacy));const next=safeCloudMerge(cloud,cloud);expect(next.subjectProgress[ID].integrityPendingConflict).toBe(true);expect(next.subjectProgress[ID].integrityPendingConflictKind).toBe("legacy-unresolved");
});

const metadataMutations=[
 ["errorDiagnosis",r=>({...r,errorDiagnosis:{code:"conceptual_error",message:"UNTRUSTED synthetic diagnosis"}})],
 ["feedbackSummary",r=>({...r,feedbackSummary:{errorDiagnosis:{code:"conceptual_error",message:"UNTRUSTED"}}})],
 ["diagnosticCard",r=>({...r,diagnosticCard:{errorDiagnosis:{code:"conceptual_error",message:"UNTRUSTED"}}})],
 ["criteria",r=>({...r,criteria:[{id:"conceptual",status:"not-observed",message:"UNTRUSTED"}]})],
 ["stepResults",r=>({...r,stepResults:[{status:"incorrect",errorType:"conceptual_error",message:"UNTRUSTED"}]})],
 ["reviewRequired",r=>({...r,reviewRequired:true,autoAssessmentConfidence:100,scoreExplainability:{awardedPoints:999}})]
];
test.each(metadataMutations)("unverified %s cannot change memory, competence, parent inputs or mission ordering",(_,mutate)=>{
 const base=state({sessions:[0,1,2].map(i=>session(grade,i))}),tainted=state({sessions:[0,1,2].map(i=>session(mutate(grade),i))});
 const before=academicProgressFor(base,ID),after=academicProgressFor(tainted,ID);expect(after.errorPatterns).toEqual(before.errorPatterns);expect(after.competence).toEqual(before.competence);expect(JSON.stringify(after.errorPatterns)).not.toContain("UNTRUSTED");
 const pool=PHYSICS_CHEMISTRY_A_ITEMS.slice(0,30);expect(buildAdaptivePhysicsChemistryMission(pool,{progress:after}).items.map(x=>x.id)).toEqual(buildAdaptivePhysicsChemistryMission(pool,{progress:before}).items.map(x=>x.id));
 const completed=recordSubjectSession(state({}),{subjectId:ID,kind:"mission",items:[item],results:[mutate(grade)],sessionId:"synthetic-new",completedAt:1750000000000});expect(completed.subjectProgress[ID].errorPatterns).toEqual({});
});

test("only bound step error types survive; free-form step messages and criteria are excluded",()=>{
 const stepItem=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="stepwise");
 const raw={status:"provisional-review",final:false,points:null,correct:null,gradingMode:"structured-provisional",requiresReview:false,provisionalPoints:0,maxPoints:stepItem.maxPoints,steps:stepItem.steps.map(s=>({id:s.id,status:"incorrect",points:0,maxPoints:s.points,errorType:"units"}))};const stamped=stampFqaResult(stepItem,raw);
 const tainted={...stamped,steps:stamped.steps.map(s=>({...s,reason:"conceptual_error",message:"UNTRUSTED",label:"UNTRUSTED",lossReason:"UNTRUSTED",note:"UNTRUSTED"}))};
 expect(verifiedFqaAcademicResult(stepItem,tainted)).toEqual(verifiedFqaAcademicResult(stepItem,stamped));
 const changed={...stamped,steps:stamped.steps.map(s=>({...s,errorType:"conceptual_error"}))};expect(verifiedFqaAcademicResult(stepItem,changed)).toBeNull();
});

test.each([undefined,1,2,3,4])("missing historical fields (version %s) normalize without invented academic evidence",version=>{
 const next=normalizeFqaProgress({version});expect(next.sessions).toEqual([]);expect(next.missionHistory).toEqual([]);expect(next.competence).toEqual({});expect(next.integrityRecoveryBlocked).toBe(false);expect(normalizeFqaProgress(next)).toEqual(next);expect(academicProgressFor(state({version}),ID).academicProjection.insufficient).toBe(true);
});

test.each([null,"unexpected",17,false,{},[null],["unexpected"]])("invalid sessions %j stay recoverable and cannot start or complete attempts",sessions=>inMemoryStorage(()=>{
 const original=state({sessions});localStorage.setItem("a25",JSON.stringify(original));const loaded=loadLocalStateStatus({},()=>({}));expect(loaded.error).toBe(false);const p=subjectProgressFor(loaded.state,ID);expect(Array.isArray(p.sessions)).toBe(true);expect(p.integrityRecoveryBlocked).toBe(true);expect(p.integrityRecoveryFields.sessions).toEqual(sessions);expect(prepareFqaAcademicState(loaded.state)).toEqual(loaded.state);
 expect(beginSubjectSession(loaded.state,{subjectId:ID,kind:"mission",items:[item]})).toBe(loaded.state);expect(recordSubjectSession(loaded.state,{subjectId:ID,kind:"mission",items:[item],results:[grade]})).toBe(loaded.state);
 expect(saveLocalState(loaded.state)).toBe(true);const reloaded=loadLocalStateStatus({},()=>({})).state;expect(reloaded.subjectProgress[ID].integrityRecoveryFields.sessions).toEqual(sessions);expect(reloaded.xp).toBe(234);
}));

test.each(["missionHistory","competence","errorPatterns","lastPosition","interruptedTechnicalSessions","completedSessionIds"])("malformed %s is preserved behind a safe recovery boundary",field=>{
 const original=state({[field]:"synthetic malformed value"});const next=prepareFqaAcademicState(original);const p=subjectProgressFor(next,ID);expect(p.integrityRecoveryBlocked).toBe(true);expect(p.integrityRecoveryFields[field]).toBe("synthetic malformed value");expect(prepareFqaAcademicState(next)).toEqual(next);expect(academicProgressFor(next,ID).competence).toEqual({});
});

test.each([null,[],"synthetic-root",42])("malformed progress root %j stays local and does not leak through cloud recovery metadata",root=>{
 const next=prepareFqaAcademicState({subjectProgress:{[ID]:root}});expect(next.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);expect(next.subjectProgress[ID].integrityHistory.some(row=>JSON.stringify(row.integrityMalformedRoot)===JSON.stringify(root))).toBe(true);expect(JSON.stringify(studentStateForCloud(next))).not.toContain("synthetic-root");
});

test("partially malformed step results are rejected without throwing",()=>{
 const stepItem=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="stepwise");const result=stampFqaResult(stepItem,{status:"provisional-review",gradingMode:"structured-provisional",requiresReview:false,provisionalPoints:0,maxPoints:stepItem.maxPoints,steps:stepItem.steps.map(()=>null)});
 expect(()=>verifiedFqaAcademicResult(stepItem,result)).not.toThrow();expect(verifiedFqaAcademicResult(stepItem,result)).toBeNull();
});

test("two valid positions at different question indices remain a real conflict",()=>{
 const first=position();first.itemIds=[item.id,item.id];const second={...first,current:1};const merged=mergeFqaHistory(state({lastPosition:first}).subjectProgress[ID],state({lastPosition:second}).subjectProgress[ID]);expect(merged.integrityPendingConflict).toBe(true);expect(merged.integrityPendingConflictKind).toBe("semantic-v1");
});

test("a partially malformed cloud schema does not throw during a protected merge",()=>{
 const local=state({sessions:[]}),remote={...state({sessions:null}),schema:{unexpected:true}};expect(()=>safeCloudMerge(local,remote)).not.toThrow();expect(safeCloudMerge(local,remote).subjectProgress[ID].integrityRecoveryBlocked).toBe(true);
});

test("an existing policy marker cannot bypass shape validation after legacy corruption",()=>{
 const original=state({subjectId:ID,academicIntegrityPolicy:1,integrityConflictedSessionIds:[],sessions:null});const next=prepareFqaAcademicState(original);expect(next).not.toBe(original);expect(next.subjectProgress[ID].sessions).toEqual([]);expect(next.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);expect(next.subjectProgress[ID].integrityRecoveryFields.sessions).toBeNull();expect(prepareFqaAcademicState(next)).toEqual(next);
});

test("a misassigned subject identity is archived and blocked rather than relabelled as verified FQA",()=>{
 const next=prepareFqaAcademicState(state({subjectId:"portuguese",sessions:[]}));expect(next.subjectProgress[ID].subjectId).toBe(ID);expect(next.subjectProgress[ID].integrityRecoveryFields.subjectId).toBe("portuguese");expect(next.subjectProgress[ID].integrityRecoveryBlocked).toBe(true);
});


test("resumed assessments cannot replay unsigned feedback or certify an unknown historical grade",()=>{
 const original={...grade,note:"UNTRUSTED",feedbackSummary:{nextAction:"UNTRUSTED",errorDiagnosis:{code:"conceptual_error"}},diagnosticCard:{errorDiagnosis:{code:"units"}}};
 const safe=restoreFqaResultView(item,original);expect(safe.historicalAssessmentUnverified).toBe(false);expect(safe.correct).toBe(original.correct);expect(safe.points).toBe(original.points);expect(JSON.stringify(safe)).not.toContain("UNTRUSTED");
 const {academicProvenance,...legacy}=original;const unknown=restoreFqaResultView(item,legacy);expect(unknown.historicalAssessmentUnverified).toBe(true);expect(unknown.final).toBe(legacy.final);expect(unknown.correct).toBe(legacy.correct);expect(JSON.stringify(unknown)).not.toContain("UNTRUSTED");expect(original.feedbackSummary.nextAction).toBe("UNTRUSTED");
});

test("verified resumed steps use catalog references, never stored free-form references",()=>{
 const stepItem=PHYSICS_CHEMISTRY_A_ITEMS.find(x=>x.responseType==="stepwise");const result=stampFqaResult(stepItem,{status:"provisional-review",gradingMode:"structured-provisional",requiresReview:false,provisionalPoints:0,maxPoints:stepItem.maxPoints,steps:stepItem.steps.map(s=>({id:s.id,status:"incorrect",points:0,maxPoints:s.points,errorType:"units"}))});
 const tainted={...result,steps:result.steps.map(s=>({...s,expected:"UNTRUSTED",note:"UNTRUSTED"}))};const restored=restoreFqaResultView(stepItem,tainted);expect(restored.historicalAssessmentUnverified).toBe(false);expect(restored.steps.map(s=>s.expected)).toEqual(stepItem.steps.map(s=>s.expected));expect(JSON.stringify(restored)).not.toContain("UNTRUSTED");
});
