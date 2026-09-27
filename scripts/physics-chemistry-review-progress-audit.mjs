import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const helper=readFileSync(new URL("../app/lib/physicsChemistryReviewProgress.js",import.meta.url),"utf8");
const draft=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(helper,/Revisão concluída/u,"o helper deve distinguir uma resposta aberta já revista.");
assert.match(helper,/Por rever/u,"o helper deve distinguir uma resposta aberta ainda pendente.");
assert.match(helper,/Sem resposta/u,"o helper deve distinguir uma resposta aberta não respondida.");
assert.match(helper,/pendingQuestionNumbers/u,"o resumo deve expor os números das questões pendentes.");

for(const [label,source] of [["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/PhysicsChemistryReviewProgress/u,label+": deve mostrar o progresso global da revisão.");
  assert.match(source,/physicsChemistryOpenReviewStatus/u,label+": deve identificar o estado de cada resposta aberta.");
  assert.match(source,/goToNextPendingReview/u,label+": deve permitir saltar diretamente para a próxima resposta por rever.");
  assert.match(source,/Ir para a próxima por rever/u,label+": deve expor o atalho de revisão.");
  assert.match(source,/openReviewProgress\.pending>0/u,label+": sair com pendências deve usar o fluxo de guardar sem finalizar.");
  assert.match(source,/review:true,rubricAssessments/u,label+": a saída com pendências deve guardar a fase de revisão e a grelha.");
  assert.match(source,/fqa-review-/u,label+": cada item deve ter uma âncora navegável.");
}

assert.match(draft,/review:!!review/u,"o rascunho deve persistir explicitamente a fase de revisão.");
assert.match(draft,/rubricAssessments/u,"o rascunho deve guardar as grelhas já preenchidas.");
assert.doesNotMatch(draft,/if\(!store\|\|review\)return/u,"entrar na revisão não pode impedir a persistência.");
assert.match(css,/fqaReviewProgress/u,"a revisão deve ter resumo visual próprio.");
assert.match(css,/fqaReviewProgressActions/u,"o atalho de próxima revisão deve adaptar-se ao layout.");
assert.match(subject,/REVISÃO EM PAUSA/u,"a área de Exames deve tornar uma revisão guardada facilmente retomável.");
assert.match(subject,/loadPhysicsChemistryExamDraft/u,"o hub de Exames deve ler os rascunhos guardados.");

console.log("✓ FQ A review progress: estados claros · próxima por rever · revisão persistente · retoma visível");
