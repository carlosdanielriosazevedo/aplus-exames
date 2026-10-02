import assert from "node:assert/strict";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";

function diagnosis(result){
  return result?.feedbackSummary?.errorDiagnosis||result?.errorDiagnosis||null;
}
function card(result){return result?.feedbackSummary?.diagnosticCard||null}
function assertDifferent(a,b,label){
  assert.ok(a&&b,label+": missing diagnosis");
  assert.notEqual(a.code,b.code,label+": minimal pair received the same diagnosis "+a.code);
}
function assertFocused(result,label){
  const d=diagnosis(result);
  assert.ok(d?.code,label+": missing diagnosis code");
  const c=card(result);
  if(c){
    assert.ok(c.fixNext,label+": missing next action");
    assert.ok(typeof c.preserveCorrectWork==="boolean",label+": missing preserveCorrectWork");
  }else{
    assert.ok(result.errorDiagnosis?.nextAction,label+": missing Mathematics next action");
  }
}

// FQ A — muda apenas a afirmação sobre a distância.
const mec=physicsChemistryConstructedItemById("FQA-R-MEC-01");
const mecIncomplete=gradePhysicsChemistryResponse(mec,
  "O declive do gráfico velocidade-tempo dá a aceleração e a área algébrica dá o deslocamento.");
const mecContradiction=gradePhysicsChemistryResponse(mec,
  "O declive do gráfico velocidade-tempo dá a aceleração e a área algébrica dá o deslocamento. Essa área algébrica representa também a distância total.");
assert.notEqual(diagnosis(mecIncomplete)?.code,"conceptual_contradiction","FQ A mechanics: incomplete answer was mislabeled contradiction");
assert.equal(diagnosis(mecContradiction)?.code,"conceptual_contradiction","FQ A mechanics: semantic contradiction was not diagnosed");
assertDifferent(diagnosis(mecIncomplete),diagnosis(mecContradiction),"FQ A mechanics");
assertFocused(mecIncomplete,"FQ A mechanics incomplete");
assertFocused(mecContradiction,"FQ A mechanics contradiction");

// FQ A — catalisador correto vs. mesma frase com Kc errado.
const eq=physicsChemistryConstructedItemById("FQA-R-EQ-01");
const eqIncomplete=gradePhysicsChemistryResponse(eq,
  "O catalisador acelera os dois sentidos sem alterar Kc nem a composição de equilíbrio.");
const eqContradiction=gradePhysicsChemistryResponse(eq,
  "O catalisador acelera os dois sentidos mas aumenta Kc e altera a composição de equilíbrio.");
assert.notEqual(diagnosis(eqIncomplete)?.code,"conceptual_contradiction","FQ A equilibrium: correct catalyst statement was mislabeled contradiction");
assert.equal(diagnosis(eqContradiction)?.code,"conceptual_contradiction","FQ A equilibrium: wrong Kc statement was not diagnosed");
assertDifferent(diagnosis(eqIncomplete),diagnosis(eqContradiction),"FQ A equilibrium");

// Português — consequência correta vs. troca mínima por contraste.
const pt=portugueseCalibrationItemById("PT639-FND-315");
const ptPartial=gradePortugueseResponse(pt,
  "«Esta iniciativa» retoma a criação da horta e «por isso» introduz uma consequência, ligando as frases.");
const ptContradiction=gradePortugueseResponse(pt,
  "«Esta iniciativa» retoma a criação da horta e «por isso» introduz um contraste, ligando as frases.");
assert.notEqual(diagnosis(ptPartial)?.code,"conceptual_contradiction","Português: resposta semanticamente correta foi marcada como contradição");
assert.equal(diagnosis(ptContradiction)?.code,"conceptual_contradiction","Português: troca consequência→contraste não alterou o diagnóstico");
assertDifferent(diagnosis(ptPartial),diagnosis(ptContradiction),"Português coesão");
assertFocused(ptPartial,"Português parcial");
assertFocused(ptContradiction,"Português contradição");

// Matemática — o mesmo item deve separar domínio conceptual, cálculo e ausência de desenvolvimento.
const derivative=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-11CD-STEPS-1");
if(!derivative)throw new Error("Missing derivative calibration fixture");
const mathCorrect=gradeMathResponse(derivative,{steps:{derivative:"3x^2-2",substitution:"3*2^2-2",value:"10"}});
const mathConcept=gradeMathResponse(derivative,{steps:{derivative:"3x^2",substitution:"3*2^2",value:"12"}});
const mathCalculation=gradeMathResponse(derivative,{steps:{derivative:"3x^2-2",substitution:"3*2^2-2",value:"11"}});
const mathResultOnly=gradeMathResponse(derivative,"10");
assert.equal(diagnosis(mathCorrect)?.code,"correct_or_near_correct","Matemática: resolução correta sem diagnóstico positivo");
assert.equal(diagnosis(mathConcept)?.code,"conceptual_error","Matemática: erro conceptual não identificado");
assert.equal(diagnosis(mathCalculation)?.code,"calculation_error","Matemática: erro apenas no cálculo final não foi distinguido do conceptual");
assert.equal(diagnosis(mathResultOnly)?.code,"result_only","Matemática: resultado isolado não identificado");
assert.equal(new Set([diagnosis(mathConcept).code,diagnosis(mathCalculation).code,diagnosis(mathResultOnly).code]).size,3,
  "Matemática: causas diferentes colapsaram no mesmo diagnóstico");
assertFocused(mathConcept,"Matemática conceptual");
assertFocused(mathCalculation,"Matemática cálculo");
assertFocused(mathResultOnly,"Matemática resultado isolado");

// Matemática — valor exato vs. decimal matematicamente equivalente.
const integral=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-12INT-STEPS-1");
if(!integral)throw new Error("Missing integral calibration fixture");
const exactIntegral=gradeMathResponse(integral,{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"1/2"}});
const decimalIntegral=gradeMathResponse(integral,{steps:{primitive:"x^2/2",barrow:"1/2-0",value:"0.5"}});
assert.equal(diagnosis(exactIntegral)?.code,"correct_or_near_correct","Matemática: forma exata correta mal diagnosticada");
assert.equal(diagnosis(decimalIntegral)?.code,"presentation_error","Matemática: decimal equivalente não foi diagnosticado como problema de forma final");
assertDifferent(diagnosis(exactIntegral),diagnosis(decimalIntegral),"Matemática forma exata");

console.log("=== DIAGNOSTIC MINIMAL-PAIR CALIBRATION ===");
console.log("✓ FQ A: incompleto vs contradição em Mecânica");
console.log("✓ FQ A: catalisador correto vs Kc/composição errados");
console.log("✓ Português: consequência vs contraste");
console.log("✓ Matemática: correto vs conceptual vs cálculo vs resultado isolado");
console.log("✓ Matemática: valor exato vs forma decimal equivalente");
console.log("DIAGNOSTIC MINIMAL-PAIR CALIBRATION PASSED");
