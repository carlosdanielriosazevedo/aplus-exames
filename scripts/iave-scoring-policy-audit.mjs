import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id===id);
  assert.ok(question,`Pergunta ${id} tem de existir`);
  return question;
};

// Referência normativa: Critérios de Classificação da Prova 635, 1.ª Fase, 2026.
// Este audit cobre regras gerais objetivas que o corretor automático consegue aplicar sem inventar critério específico.

const derivative=byId("CRV2-11CD-STEPS-1");
const finalOnly=gradeResponse(derivative,"f'(2)=10");
assert.equal(finalOnly.points,0,"IAVE situação 3: apenas o resultado final num item por etapas vale zero pontos.");
assert.equal(finalOnly.reason,"final_result_only");
assert.equal(finalOnly.iaveSituation,"Situação 3");
assert.equal(finalOnly.classificationConfidence,"high");

const worked=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10");
assert.equal(worked.points,35,"Uma resolução completa e cientificamente correta mantém a cotação prevista.");
assert.equal(worked.correct,true);

// Situação 7 só é inferida quando a própria cadeia já contém o valor correto e,
// imediatamente depois, surge uma única troca de algarismo ou sinal na sua transcrição.
const transcriptionSlip=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10=11");
const transcriptionValue=transcriptionSlip.stepResults.find(row=>row.stepId==="value");
assert.equal(transcriptionValue?.reason,"copied_number_or_sign_error");
assert.equal(transcriptionValue?.iaveSituation,"Situação 7");
assert.equal(transcriptionValue?.classificationConfidence,"high");
assert.equal(transcriptionValue?.points,11,"Situação 7: uma transcrição objetiva sem redução de dificuldade retira 1 ponto.");
assert.equal(transcriptionSlip.points,34);
assert.equal(transcriptionSlip.reviewRequired,false);

const signTranscription=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10=-10");
const signValue=signTranscription.stepResults.find(row=>row.stepId==="value");
assert.equal(signValue?.reason,"copied_number_or_sign_error");
assert.equal(signValue?.iaveSituation,"Situação 7");
assert.equal(signValue?.classificationConfidence,"high");

// Situação 8 só é inferida quando a própria cadeia torna o erro ocasional inequívoco:
// a expressão imediatamente anterior calcula corretamente 10, mas o aluno escreve 11 no fim.
const arithmeticSlip=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=11");
const arithmeticValue=arithmeticSlip.stepResults.find(row=>row.stepId==="value");
assert.equal(arithmeticValue?.reason,"occasional_calculation_error");
assert.equal(arithmeticValue?.iaveSituation,"Situação 8");
assert.equal(arithmeticValue?.classificationConfidence,"high");
assert.equal(arithmeticValue?.points,11,"Situação 8: uma falha ocasional de cálculo retira 1 ponto na etapa de 12 pontos.");
assert.equal(arithmeticSlip.points,34);
assert.equal(arithmeticSlip.reviewRequired,false);

// Um cálculo apenas errado, sem uma cadeia que prove a natureza ocasional da falha,
// NÃO pode ser automaticamente promovido a situação 7 ou 8.
const ambiguousCalculation=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=11");
const ambiguousValue=ambiguousCalculation.stepResults.find(row=>row.stepId==="value");
assert.notEqual(ambiguousValue?.reason,"copied_number_or_sign_error");
assert.notEqual(ambiguousValue?.reason,"occasional_calculation_error");
assert.notEqual(ambiguousValue?.classificationConfidence,"high");

// Situação 12: o valor é exatamente equivalente, mas não está na forma final pedida.
const integral=byId("CRV2-12INT-STEPS-1");
const wrongFinalForm=gradeResponse(integral,{steps:{primitive:"x²/2",barrow:"1²/2−0²/2",value:"0,5"}});
const finalFormValue=wrongFinalForm.stepResults.find(row=>row.stepId==="value");
assert.equal(finalFormValue?.reason,"wrong_final_form");
assert.equal(finalFormValue?.iaveSituation,"Situação 12");
assert.equal(finalFormValue?.classificationConfidence,"high");
assert.equal(finalFormValue?.points,9,"Situação 12: forma final incorreta retira 1 ponto.");
assert.equal(wrongFinalForm.points,34);
assert.equal(wrongFinalForm.reviewRequired,false);

// Situação 13: aproximação decimal apenas quando o valor exato pedido é uma fração
// e o decimal cabe inequivocamente no arredondamento indicado pelo próprio número de casas.
const exactThird={
  id:"AUDIT-EXACT-THIRD",points:10,
  response:{type:"stepwise",steps:[
    {id:"setup",label:"1. Valor exato intermédio",type:"fraction",points:5,numerator:1,denominator:3,expected:"1/3"},
    {id:"final",label:"2. Valor exato final",type:"fraction",points:5,numerator:1,denominator:3,expected:"1/3"}
  ]}
};
const approximateExact=gradeResponse(exactThird,{steps:{setup:"1/3",final:"0,33"}});
const approximateFinal=approximateExact.stepResults.find(row=>row.stepId==="final");
assert.equal(approximateFinal?.reason,"approximate_instead_of_exact");
assert.equal(approximateFinal?.iaveSituation,"Situação 13");
assert.equal(approximateFinal?.classificationConfidence,"high");
assert.equal(approximateFinal?.points,4,"Situação 13: usar aproximação em vez do valor exato retira 1 ponto.");
assert.equal(approximateExact.points,9);

// Um decimal próximo mas fora da margem de arredondamento não pode ser rotulado automaticamente como situação 13.
const notClearlyApproximation=gradeResponse(exactThird,{steps:{setup:"1/3",final:"0,34"}});
const unclearApproximation=notClearlyApproximation.stepResults.find(row=>row.stepId==="final");
assert.notEqual(unclearApproximation?.reason,"approximate_instead_of_exact");
assert.notEqual(unclearApproximation?.classificationConfidence,"high");

const alternative=gradeResponse(derivative,"Usei uma resolução cientificamente válida, mas escrita por um processo não reconhecido automaticamente.");
assert.equal(alternative.reviewRequired,true,"IAVE situação 1: um processo alternativo não deve ser automaticamente rejeitado; quando o motor não o certifica, fica por rever.");

const finance=byId("CRV2-10FIN-STEPS-1");
const noUnit=gradeResponse(finance,{steps:{
  interest:"J=50",
  capital:"C=1050",
  conclusion:"O capital ao fim de um ano é 1050"
}});
assert.equal(noUnit.points,35,"IAVE situação 16: omitir a unidade no resultado final não desvaloriza a etapa.");
assert.equal(noUnit.correct,true);

const wrongUnit=gradeResponse(finance,{steps:{
  interest:"J=50",
  capital:"C=1050",
  conclusion:"O capital ao fim de um ano é 1050 kg"
}});
assert.equal(wrongUnit.points,27,"Uma unidade errada não deve ser confundida com simples omissão da unidade.");
assert.equal(wrongUnit.reviewRequired,true);

console.log("✓ IAVE 2026 scoring policy audit: situações 3, 7, 8, 12, 13 e 16 + conservative ambiguity handling validated");
