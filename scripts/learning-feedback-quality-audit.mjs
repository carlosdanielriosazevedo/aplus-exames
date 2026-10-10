import fs from "node:fs";
import assert from "node:assert/strict";
import "../app/lib/recurringErrorRuntime.js";
import {automaticFeedbackForCriteria} from "../app/lib/automaticEvidenceGrader.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {recordErrorPatternEvidence,recurringErrorPatterns,extractErrorSignals} from "../app/lib/recurringErrorMemory.js";
import {recordSubjectSession,subjectProgressFor} from "../app/lib/subjectProgress.js";

const partialOpen=automaticFeedbackForCriteria([
  {
    id:"conceito",
    label:"Relação conceptual",
    status:"observed",
    confidence:.91,
    contradictionDetected:false,
    observations:[{studentEvidence:["A área algébrica do gráfico v(t) dá o deslocamento."]}]
  },
  {
    id:"distincao",
    label:"Distinção entre deslocamento e distância",
    status:"not-observed",
    confidence:.76,
    contradictionDetected:false,
    observations:[{studentEvidence:[]}]
  }
],"A área algébrica do gráfico v(t) dá o deslocamento.");

assert.equal(partialOpen.errorDiagnosis.code,"incomplete_answer");
assert.equal(partialOpen.diagnosticCard.preserveCorrectWork,true);
assert.equal(partialOpen.diagnosticCard.whatYouKnow,"Relação conceptual");
assert.equal(partialOpen.diagnosticCard.focus,"Distinção entre deslocamento e distância");
assert.match(partialOpen.nextAction,/Mantém/i);
assert.ok(partialOpen.diagnosticCard.evidence.includes("área algébrica"));

const contradictionOpen=automaticFeedbackForCriteria([
  {
    id:"kc",
    label:"Efeito do catalisador em Kc",
    status:"partial",
    confidence:.88,
    contradictionDetected:true,
    observations:[{studentEvidence:["O catalisador acelera a reação, mas aumenta Kc."]}]
  },
  {
    id:"velocidade",
    label:"Velocidade dos dois sentidos",
    status:"observed",
    confidence:.9,
    contradictionDetected:false,
    observations:[{studentEvidence:["Acelera os sentidos direto e inverso."]}]
  }
],"O catalisador acelera os sentidos direto e inverso, mas aumenta Kc.");

assert.equal(contradictionOpen.errorDiagnosis.code,"conceptual_contradiction");
assert.equal(contradictionOpen.diagnosticCard.preserveCorrectWork,true);
assert.equal(contradictionOpen.diagnosticCard.focus,"Efeito do catalisador em Kc");
assert.match(contradictionOpen.gaps[0].message,/não precisas de reescrever o resto/i);

const mathItem=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-11CD-STEPS-1");
if(!mathItem)throw new Error("Missing Mathematics feedback fixture");
const mathSlip=gradeMathResponse(mathItem,{steps:{derivative:"f'(x)=3x^2-2",substitution:"3*2^2-2",value:"11"}});
assert.ok(["calculation_error","calculation_slip","mixed_error"].includes(mathSlip.errorDiagnosis?.code));
assert.equal(mathSlip.errorDiagnosis?.preserveCorrectWork,true);
assert.ok((mathSlip.errorDiagnosis?.whatWasCorrect||[]).length>=1);
assert.ok(mathSlip.errorDiagnosis?.whereItFailed);
assert.match(mathSlip.errorDiagnosis?.nextAction||"",/Mantém/i);

const uiFiles=[
  "app/components/PortugueseSubject.js",
  "app/components/PhysicsChemistrySubject.js",
  "app/components/PortuguesePassageMiniExam.js",
  "app/components/PhysicsChemistryMiniExam.js",
  "app/components/PhysicsChemistryExam.js"
];
for(const file of uiFiles){
  const source=fs.readFileSync(file,"utf8");
  assert.ok(source.includes("errorDiagnosis"),file+": diagnosis is not rendered");
  assert.ok(source.includes("diagnosticCard"),file+": focused feedback is not rendered");
  assert.ok(!source.includes("&&feedbackSummary.errorDiagnosis"),file+": stale undefined feedbackSummary reference remains");
}

// Recurring-error memory belongs to the same learning-feedback contract. Keep it
// here rather than growing another one-off audit script.
const now=Date.now();
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

console.log("✓ learning feedback: focused feedback, first-error diagnosis and recurring-error memory validated");
