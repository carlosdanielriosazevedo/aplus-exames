import fs from "node:fs";
import assert from "node:assert/strict";
import {automaticFeedbackForCriteria} from "../app/lib/automaticEvidenceGrader.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";

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
console.log("✓ learning feedback: preserve-correct-work, focused gap, contradiction and Math first-error diagnosis validated");
