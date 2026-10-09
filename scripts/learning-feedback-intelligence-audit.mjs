import assert from "node:assert/strict";
import "../app/lib/recurringErrorRuntime.js";
import {buildScoreExplainability,SCORE_EXPLAINABILITY_SCHEMA} from "../app/lib/scoreExplainability.js";
import {recordErrorPatternEvidence,recurringErrorPatterns,extractErrorSignals} from "../app/lib/recurringErrorMemory.js";
import {recordSubjectSession,subjectProgressFor} from "../app/lib/subjectProgress.js";

const now=Date.now();

const explain=buildScoreExplainability({
  awardedPoints:3,
  maxPoints:5,
  criteria:[
    {id:"idea",label:"Ideia principal",points:2,awardedPoints:2,status:"observed"},
    {id:"justify",label:"Justificação",points:3,awardedPoints:1,status:"partial",lossReason:"A relação causal ficou incompleta."}
  ]
});
assert.equal(SCORE_EXPLAINABILITY_SCHEMA,"aplus-score-explainability-v2");
assert.equal(explain.lostPoints,2);
assert.equal(explain.studentSummary.strengths[0].label,"Ideia principal");
assert.match(explain.studentSummary.fullCreditMessage,/Justificação/i);
assert.equal(explain.studentSummary.missingForFullCredit[0].lostPoints,2);

const inconsistent=buildScoreExplainability({
  awardedPoints:4,maxPoints:5,
  criteria:[{id:"all",label:"Tudo",points:5,awardedPoints:5,status:"observed"}]
});
assert.equal(inconsistent.requiresReview,true);
assert.equal(inconsistent.consistencyError,"ALL_CRITERIA_SOLID_BUT_SCORE_BELOW_MAX");
assert.match(inconsistent.studentSummary.fullCreditMessage,/revista/i);

const item1={id:"fqa-1",domain:"waves",competencyId:"wave-speed"};
const item2={id:"fqa-2",domain:"waves",competencyId:"wave-speed"};
const unitError={status:"partial",provisionalPoints:2,maxPoints:4,steps:[{id:"unit",label:"Unidade",status:"partial",points:0,maxPoints:1,errorType:"unit_error"}]};
let patterns={};
patterns=recordErrorPatternEvidence(patterns,item1,unitError,now-2000);
assert.equal(recurringErrorPatterns(patterns,now).length,0,"one observation must not become a recurring error");
patterns=recordErrorPatternEvidence(patterns,item2,unitError,now-1000);
let active=recurringErrorPatterns(patterns,now);
assert.equal(active.length,1);
assert.equal(active[0].code,"units");
assert.equal(active[0].itemIds.length,2);

const success={status:"correct",correct:true,points:4,maxPoints:4,final:true};
patterns=recordErrorPatternEvidence(patterns,item1,success,now+1000);
patterns=recordErrorPatternEvidence(patterns,item2,success,now+2000);
active=recurringErrorPatterns(patterns,now+2000);
assert.equal(active[0].status,"improving");
patterns=recordErrorPatternEvidence(patterns,{...item1,id:"fqa-3"},success,now+3000);
assert.equal(recurringErrorPatterns(patterns,now+3000).length,0,"three strong recoveries must resolve the pattern");

const criterionA=extractErrorSignals({id:"pt-1",domain:"leitura",competencyId:"pt-inferencia"},{criteria:[{id:"evidence",label:"Justificação pelo texto",status:"not-observed",points:2,awardedPoints:0}]});
const criterionB=extractErrorSignals({id:"pt-2",domain:"gramatica",competencyId:"pt-sintaxe"},{criteria:[{id:"evidence",label:"Justificação pelo texto",status:"not-observed",points:2,awardedPoints:0}]});
assert.notEqual(criterionA[0].key,criterionB[0].key,"criterion patterns must stay scoped to the competency/domain");

const staleTime=now-50*24*60*60*1000;
let stale={};
stale=recordErrorPatternEvidence(stale,item1,unitError,staleTime-1000);
stale=recordErrorPatternEvidence(stale,item2,unitError,staleTime);
assert.equal(recurringErrorPatterns(stale,now).length,0,"stale patterns must not be surfaced");

let state={subjectProgress:{},engagement:null,competition:null,xp:0};
state=recordSubjectSession(state,{
  subjectId:"physics-chemistry-a",kind:"training",label:"Treino",domain:"waves",
  items:[item1,item2],results:[unitError,unitError],sessionId:"test-session",completedAt:now
});
const progress=subjectProgressFor(state,"physics-chemistry-a");
assert.equal(recurringErrorPatterns(progress.errorPatterns,now).length,1,"training should feed recurring-error memory");
assert.equal(Object.keys(progress.competence).length,0,"training must still not create academic competence evidence");

console.log("Learning feedback intelligence audit: OK");
