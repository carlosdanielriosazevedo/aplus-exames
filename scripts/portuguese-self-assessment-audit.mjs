import assert from "node:assert/strict";
import {criterionFeedback,selfAssessmentSummary,snapshotSelfAssessment,selfAssessmentProgress,PORTUGUESE_CRITERION_LEVELS,PORTUGUESE_SELF_ASSESSMENT_LEVELS} from "../app/lib/portugueseSelfAssessment.js";

// Historic IDs remain stable so saved drafts can be resumed, but their runtime meaning is automatic criterion assessment.
assert.deepEqual(PORTUGUESE_CRITERION_LEVELS.map(level=>level.id),["met","partial","not-yet"],"os três estados internos devem permanecer estáveis para compatibilidade");
assert.equal(PORTUGUESE_SELF_ASSESSMENT_LEVELS,PORTUGUESE_CRITERION_LEVELS,"o nome histórico deve ser apenas um alias de compatibilidade");
assert.deepEqual(PORTUGUESE_CRITERION_LEVELS.map(level=>level.label),["Cumprido","Parcial","Não demonstrado"],"a UI deve usar linguagem de avaliação automática e não de autoatribuição do aluno");

const criterion={id:"conteudo",label:"Explica a progressão entre a situação inicial, a intervenção e a conclusão.",points:9};
const pending=criterionFeedback({criterion});
const metWithoutEvidence=criterionFeedback({criterion,status:"met",evidence:""});
const metWithEvidence=criterionFeedback({criterion,status:"met",evidence:"No segundo período explico a transformação da praça."});
const partial=criterionFeedback({criterion,status:"partial",evidence:"Identifiquei a intervenção, mas não liguei à conclusão."});
const missing=criterionFeedback({criterion,status:"not-yet",evidence:""});

assert.equal(pending.kind,"pending");
assert.match(pending.message,/Apronso ainda não conseguiu confirmar/u,"estado pendente deve ser assumido como incerteza do corretor");
assert.equal(metWithoutEvidence.kind,"positive");
assert.match(metWithoutEvidence.message,/corretor identificou este critério como cumprido/u,"critério cumprido deve ser atribuído pelo corretor");
assert.match(metWithEvidence.message,/evidência clara/u,"evidência encontrada deve ser valorizada sem pedir autoavaliação");
assert.equal(partial.kind,"warning");
assert.match(partial.message,/falta completar/u,"cumprimento parcial deve explicar que ainda falta conteúdo");
assert.equal(missing.kind,"attention");
assert.match(missing.message,/não contém evidência suficiente/u,"critério em falta deve apontar insuficiência de evidência");

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

// Progress helpers remain for historic writing-memory data and must continue to be deterministic.
const before=snapshotSelfAssessment(criteria,{
  conteudo:{status:"partial",evidence:"Identifiquei a intervenção."},
  fundamentacao:{status:"not-yet",evidence:""}
});
const after=snapshotSelfAssessment(criteria,{
  conteudo:{status:"met",evidence:"Liguei a intervenção à conclusão no segundo período."},
  fundamentacao:{status:"partial",evidence:"Acrescentei um elemento textual, falta o segundo."}
});
const progress=selfAssessmentProgress(criteria,before,after);
assert.equal(progress.changed,true,"alterações entre avaliações guardadas devem continuar rastreáveis");
assert.deepEqual(progress.upgraded.map(entry=>entry.id),["conteudo","fundamentacao"]);
assert.deepEqual(progress.evidenceAdded.map(entry=>entry.id),["fundamentacao"]);
assert.deepEqual(progress.evidenceChanged.map(entry=>entry.id),["conteudo"]);
assert.deepEqual(progress.stillNeedsWork.map(entry=>entry.id),["fundamentacao"]);

const stricter=selfAssessmentProgress(criteria,after,{
  conteudo:{status:"partial",evidence:"Liguei a intervenção à conclusão no segundo período."},
  fundamentacao:{status:"partial",evidence:"Acrescentei um elemento textual, falta o segundo."}
});
assert.equal(stricter.reconsidered.length,1,"uma avaliação posterior mais exigente deve continuar preservada no histórico");
assert.equal(stricter.reconsidered[0].id,"conteudo");

for(const feedback of [pending,metWithoutEvidence,metWithEvidence,partial,missing]){
  const text=`${feedback.title} ${feedback.message}`;
  assert.doesNotMatch(text,/autoavalia|assinalaste|marcaste|Cumpri|Ainda não/iu,"feedback atual não pode devolver a classificação ao aluno");
}

console.log("✓ avaliação automática Português: estados compatíveis · linguagem do corretor · evidência por critério · histórico determinístico · zero autoatribuição pelo aluno");
