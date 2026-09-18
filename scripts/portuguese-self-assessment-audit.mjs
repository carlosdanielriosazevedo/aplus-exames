import assert from "node:assert/strict";
import {criterionFeedback,selfAssessmentSummary,PORTUGUESE_SELF_ASSESSMENT_LEVELS} from "../app/lib/portugueseSelfAssessment.js";

assert.deepEqual(PORTUGUESE_SELF_ASSESSMENT_LEVELS.map(level=>level.id),["met","partial","not-yet"],"os três estados de autoavaliação devem permanecer estáveis");

const criterion={id:"conteudo",label:"Explica a progressão entre a situação inicial, a intervenção e a conclusão.",points:9};
const pending=criterionFeedback({criterion});
const metWithoutEvidence=criterionFeedback({criterion,status:"met",evidence:""});
const metWithEvidence=criterionFeedback({criterion,status:"met",evidence:"No segundo período explico a transformação da praça."});
const partial=criterionFeedback({criterion,status:"partial",evidence:"Identifiquei a intervenção, mas não liguei à conclusão."});
const missing=criterionFeedback({criterion,status:"not-yet",evidence:""});

assert.equal(pending.kind,"pending");
assert.match(pending.message,/identifica uma passagem concreta/u);
assert.equal(metWithoutEvidence.kind,"positive");
assert.match(metWithoutEvidence.message,/frase ou ideia/u,"cumprimento sem evidência deve pedir prova textual");
assert.match(metWithEvidence.message,/torna a tua autoavaliação verificável/u,"evidência existente deve ser valorizada sem atribuir nota");
assert.equal(partial.kind,"warning");
assert.match(partial.message,/o que falta acrescentar/u,"cumprimento parcial deve orientar melhoria localizada");
assert.equal(missing.kind,"attention");
assert.match(missing.message,/corrige apenas a lacuna identificada/u,"critério em falta deve orientar revisão focada");

const criteria=[criterion,{id:"fundamentacao",label:"Mobiliza dois elementos pertinentes do texto.",points:4}];
let summary=selfAssessmentSummary(criteria,{});
assert.equal(summary.total,2);
assert.equal(summary.counts.pending,2);
assert.equal(summary.complete,false);
assert.equal(summary.nextCriterion.id,"conteudo");

summary=selfAssessmentSummary(criteria,{conteudo:{status:"partial",evidence:"um exemplo"},fundamentacao:{status:"not-yet",evidence:""}});
assert.equal(summary.counts.partial,1);
assert.equal(summary.counts["not-yet"],1);
assert.equal(summary.counts.withEvidence,1);
assert.equal(summary.complete,true);
assert.equal(summary.nextCriterion.id,"fundamentacao","deve priorizar primeiro um critério ainda não demonstrado");

for(const feedback of [pending,metWithoutEvidence,metWithEvidence,partial,missing]){
  const text=`${feedback.title} ${feedback.message}`.toLowerCase();
  assert.doesNotMatch(text,/\bnota\b|classifica(?:ção|r)|pontua(?:ção|r)|\b[0-9]+\s*(?:pts|pontos)\b/u,"o feedback pedagógico não deve transformar autoavaliação em classificação");
}

console.log("✓ autoavaliação Português: estados estáveis · feedback localizado por critério · evidência valorizada · próximo passo priorizado · zero nota automática");
