import {diagnoseOpenResponseError} from "../app/lib/automaticEvidenceGrader.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";

const failures=[];
function check(condition,message){if(!condition)failures.push(message)}

const contradiction=diagnoseOpenResponseError([
  {id:"c1",status:"partial",contradictionDetected:true},
  {id:"c2",status:"observed",contradictionDetected:false}
],"Resposta longa com uma ideia correta e outra contraditória.");
check(contradiction.code==="conceptual_contradiction","Open response: contradiction should diagnose conceptual_contradiction");

const nonresponsive=diagnoseOpenResponseError([
  {id:"c1",status:"not-observed",contradictionDetected:false},
  {id:"c2",status:"not-observed",contradictionDetected:false}
],"Esta resposta fala bastante sobre o tema geral mas não demonstra aquilo que foi pedido pela pergunta.");
check(nonresponsive.code==="related_but_nonresponsive","Open response: relevant non-answer should be diagnosed");

const incomplete=diagnoseOpenResponseError([
  {id:"c1",status:"observed",contradictionDetected:false},
  {id:"c2",status:"not-observed",contradictionDetected:false}
],"A resposta demonstra corretamente uma parte importante, mas deixa outra parte necessária por explicar.");
check(incomplete.code==="incomplete_answer","Open response: mixed observed/missing should diagnose incomplete_answer");

const insufficient=diagnoseOpenResponseError([
  {id:"c1",status:"partial",contradictionDetected:false}
],"A ideia aparece porque está ligada ao conceito, mas fica pouco justificada.");
check(insufficient.code==="insufficient_justification","Open response: partial evidence should diagnose insufficient_justification");

const fullItem=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-11CD-STEPS-1");
if(!fullItem)throw new Error("Missing Mathematics diagnostic fixture");

const correct=gradeMathResponse(fullItem,{steps:{derivative:"f'(x)=3x^2-2",substitution:"3*2^2-2",value:"10"}});
check(correct.errorDiagnosis?.code==="correct_or_near_correct","Mathematics: full correct response should have positive diagnosis");

const resultOnly=gradeMathResponse(fullItem,"10");
check(resultOnly.errorDiagnosis?.code==="result_only","Mathematics: result-only response should diagnose result_only");

const localSlip=gradeMathResponse(fullItem,{steps:{derivative:"f'(x)=3x^2-2",substitution:"3*2^2-2",value:"11"}});
check(["calculation_error","calculation_slip","mixed_error"].includes(localSlip.errorDiagnosis?.code),"Mathematics: local slip should expose a calculation diagnosis");

console.log("=== ERROR DIAGNOSIS AUDIT ===");
console.log("Open-response diagnosis taxonomy: 4 core cases checked");
console.log("Mathematics diagnosis taxonomy: correct, result-only and local-slip checked");

if(failures.length){
  console.error("\nERROR DIAGNOSIS AUDIT FAILED ("+failures.length+" issues)");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nERROR DIAGNOSIS AUDIT PASSED");
