import assert from "node:assert/strict";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {gradePhysicsChemistryStepwise} from "../app/lib/physicsChemistryStepwiseGrader.js";
import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";

function ratio(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return result.provisionalPoints/result.maxPoints;
  return 0;
}
function diagnosis(result){return result?.feedbackSummary?.errorDiagnosis||null}

const failures=[];
function check(condition,message){if(!condition)failures.push(message)}

// 1) Pequenos erros ortográficos não devem destruir uma resposta semanticamente correta.
const typoCases=[
  {
    subject:"portuguese",id:"PT639-FND-315",
    clean:"«Esta iniciativa» retoma a horta e «por isso» introduz consequência, garantindo coesão.",
    typo:"«Esta iniciativa» retoma a horta e «por isso» introduz consequencia, garantindo coesao."
  },
  {
    subject:"portuguese",id:"PT639-FND-317",
    clean:"O pronome retoma o relatório, evita repetição e mantém o referente.",
    typo:"O pronome retoma o relatro, evita repeticao e mantem o referente."
  },
  {
    subject:"physics-chemistry-a",id:"FQA-R-ELEM-01",
    clean:"As riscas resultam de transições entre níveis eletrónicos e os fotões têm energias específicas.",
    typo:"As riscas resultam de transicoes entre niveis eletroncos e os fotoes têm energias especificas."
  },
  {
    subject:"physics-chemistry-a",id:"FQA-R-MEC-01",
    clean:"O declive dá a aceleração e a área algébrica dá o deslocamento.",
    typo:"O declve dá a aceleracao e a area algebrca dá o deslocamento."
  }
];

for(const row of typoCases){
  const item=row.subject==="portuguese"?portugueseCalibrationItemById(row.id):physicsChemistryConstructedItemById(row.id);
  const clean=row.subject==="portuguese"?gradePortugueseResponse(item,row.clean):gradePhysicsChemistryResponse(item,row.clean);
  const typo=row.subject==="portuguese"?gradePortugueseResponse(item,row.typo):gradePhysicsChemistryResponse(item,row.typo);
  const delta=Math.abs(ratio(clean)-ratio(typo));
  check(delta<=.12,`${row.subject}/${row.id}: one-letter spelling noise changed score by ${Math.round(delta*100)}pp`);
}

// 2) Ambiguidade genuína deve pedir revisão e produzir diagnóstico próprio.
const pt=portugueseCalibrationItemById("PT639-FND-315");
const ptAmbiguous=gradePortugueseResponse(pt,
  "A expressão «por isso» pode ser consequência ou talvez contraste; não sei qual das duas relações é a correta.");
check(ptAmbiguous.requiresReview===true,"Português: ambiguous alternative should require review");
check(diagnosis(ptAmbiguous)?.code==="ambiguous_answer","Português: ambiguous alternative should be diagnosed as ambiguous_answer");
check(/Escolhe uma única conclusão/u.test(ptAmbiguous.feedbackSummary?.nextAction||""),"Português: ambiguous answer should receive a targeted next action");

const fq=physicsChemistryConstructedItemById("FQA-R-EQ-01");
const fqAmbiguous=gradePhysicsChemistryResponse(fq,
  "Acho que o catalisador pode aumentar Kc ou talvez não alterar Kc; acelera as reações nos dois sentidos.");
check(fqAmbiguous.requiresReview===true,"FQ A: ambiguous Kc alternative should require review");
check(["ambiguous_answer","conceptual_contradiction"].includes(diagnosis(fqAmbiguous)?.code),"FQ A: ambiguous Kc alternative should not receive a confident normal diagnosis");

// 3) Unidades equivalentes devem ser aceites; unidade final em falta não.
const dilution=physicsChemistryConstructedItemById("FQA-C-MAT-01");
const dilutionMl=gradePhysicsChemistryStepwise(dilution,{steps:{
  n:{work:"n=cV",result:"0,0200",unit:"mol"},
  V:{work:"V=n/c",result:"40,0",unit:"mL"}
}});
check(dilutionMl.requiresReview===false,"FQ A stepwise: accepted mL conversion should not require review");
check(dilutionMl.steps.find(row=>row.id==="V")?.status==="correct","FQ A stepwise: 40,0 mL should be equivalent to 0,0400 dm3");

const dilutionNoUnit=gradePhysicsChemistryStepwise(dilution,{steps:{
  n:{work:"n=cV",result:"0,0200",unit:"mol"},
  V:{work:"V=n/c",result:"0,0400",unit:""}
}});
check(dilutionNoUnit.steps.find(row=>row.id==="V")?.status==="unit-error","FQ A stepwise: missing final unit should remain an explicit unit error");
check((dilutionNoUnit.type2Count||0)>=1,"FQ A stepwise: missing final unit should count as a type-2 presentation error");

// 4) Método alternativo plausível mas não reconhecido deve ser revisto, não marcado errado.
const alternative=gradePhysicsChemistryStepwise(dilution,{steps:{
  n:{work:"quantidade de soluto pela concentração e volume",result:"0,0200",unit:"mol"},
  V:{work:"faço a conservação do soluto por proporção",result:"40,0",unit:"mL"}
}});
check(alternative.requiresReview===true,"FQ A stepwise: unknown plausible method should require review");
check(alternative.steps.some(row=>row.status==="alternative-method-review"),"FQ A stepwise: alternative method should be labelled for review");


// 5) Matemática: formas equivalentes pouco convencionais devem manter o crédito quando são matematicamente equivalentes.
const slopeItem=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-10GA-STEPS-1");
if(!slopeItem)throw new Error("Missing Mathematics slope fixture");
const slopeEquivalent=gradeMathResponse(slopeItem,{steps:{
  deltaY:"2,0",
  deltaX:"4,00",
  slope:"4/8",
  conclusion:"O declive é a variação de y dividida pela variação de x."
}});
check(slopeEquivalent.correct===true||slopeEquivalent.status==="correct","Matemática: equivalent unsimplified fraction and decimal-comma inputs should be accepted");

const derivativeItem=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-11CD-STEPS-1");
if(!derivativeItem)throw new Error("Missing Mathematics derivative fixture");
const derivativeEquivalent=gradeMathResponse(derivativeItem,{steps:{
  derivative:"-2+3x^2",
  substitution:"3(2)^2-2",
  value:"10,0"
}});
check(derivativeEquivalent.correct===true||derivativeEquivalent.status==="correct","Matemática: algebraically equivalent reordered polynomial should be accepted");

console.log("=== RESPONSE ANALYSIS CALIBRATION V7 · TOLERANCE + PRUDENCE ===");
console.log("✓ spelling-noise resilience checked in Portuguese and FQ A");
console.log("✓ genuine ambiguity routes to review");
console.log("✓ equivalent units accepted and missing final unit penalized");
console.log("✓ alternative scientific method routes to review instead of automatic rejection");
console.log("✓ unconventional but equivalent Mathematics forms preserve credit");

if(failures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V7 FAILED ("+failures.length+" issues)");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V7 PASSED");
