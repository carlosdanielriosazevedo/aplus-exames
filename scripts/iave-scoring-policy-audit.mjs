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
// NÃO pode ser automaticamente promovido a situação 8.
const ambiguousCalculation=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=11");
const ambiguousValue=ambiguousCalculation.stepResults.find(row=>row.stepId==="value");
assert.notEqual(ambiguousValue?.reason,"occasional_calculation_error");
assert.notEqual(ambiguousValue?.classificationConfidence,"high");

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

console.log("✓ IAVE 2026 scoring policy audit: final-only, high-confidence situation 8, conservative ambiguity handling, alternative process and unit omission validated");
