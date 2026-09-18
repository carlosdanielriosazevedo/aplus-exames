import assert from "node:assert/strict";
import {criterionFeedback,selfAssessmentSummary,snapshotSelfAssessment,selfAssessmentProgress,PORTUGUESE_SELF_ASSESSMENT_LEVELS} from "../app/lib/portugueseSelfAssessment.js";

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

const before=snapshotSelfAssessment(criteria,{
  conteudo:{status:"partial",evidence:"Identifiquei a intervenção."},
  fundamentacao:{status:"not-yet",evidence:""}
});
const after=snapshotSelfAssessment(criteria,{
  conteudo:{status:"met",evidence:"Liguei a intervenção à conclusão no segundo período."},
  fundamentacao:{status:"partial",evidence:"Acrescentei um elemento textual, falta o segundo."}
});
const progress=selfAssessmentProgress(criteria,before,after);
assert.equal(progress.changed,true,"uma revisão com alterações de estado/evidência deve ser reconhecida");
assert.deepEqual(progress.upgraded.map(entry=>entry.id),["conteudo","fundamentacao"],"a evolução deve refletir apenas mudanças declaradas pelo aluno");
assert.deepEqual(progress.evidenceAdded.map(entry=>entry.id),["fundamentacao"],"nova evidência deve ser distinguida de evidência reformulada");
assert.deepEqual(progress.evidenceChanged.map(entry=>entry.id),["conteudo"],"evidência já existente mas alterada deve ficar registada separadamente");
assert.deepEqual(progress.stillNeedsWork.map(entry=>entry.id),["fundamentacao"],"a síntese deve manter visível o critério ainda parcial");

const stricter=selfAssessmentProgress(criteria,after,{
  conteudo:{status:"partial",evidence:"Liguei a intervenção à conclusão no segundo período."},
  fundamentacao:{status:"partial",evidence:"Acrescentei um elemento textual, falta o segundo."}
});
assert.equal(stricter.reconsidered.length,1,"uma autoavaliação mais exigente não pode ser apresentada como melhoria automática");
assert.equal(stricter.reconsidered[0].id,"conteudo");

for(const feedback of [pending,metWithoutEvidence,metWithEvidence,partial,missing]){
  const text=`${feedback.title} ${feedback.message}`.toLowerCase();
  assert.doesNotMatch(text,/\bnota\b|classifica(?:ção|r)|pontua(?:ção|r)|\b[0-9]+\s*(?:pts|pontos)\b/u,"o feedback pedagógico não deve transformar autoavaliação em classificação");
}

console.log("✓ autoavaliação Português: estados estáveis · feedback localizado · evolução antes/depois rastreada · evidência nova/reformulada distinguida · reavaliações mais exigentes preservadas · zero nota automática");
