import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_MINI_EXAMS} from "../app/data/physicsChemistryMiniExams.js";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../app/data/physicsChemistryExamBlueprint.js";
import {physicsChemistryOpenReviewProgress,physicsChemistryOpenReviewStatus} from "../app/lib/physicsChemistryReviewProgress.js";

const openItem=PHYSICS_CHEMISTRY_A_MINI_EXAMS.flatMap(exam=>exam.items).find(item=>item.responseType==="restricted-response");
assert.ok(openItem,"deve existir pelo menos uma resposta aberta num mini-exame.");

const empty=physicsChemistryOpenReviewStatus(openItem,"",{});
assert.equal(empty.answered,false);
assert.equal(empty.complete,true);
assert.equal(empty.label,"Sem resposta");

const pending=physicsChemistryOpenReviewStatus(openItem,"Resposta do aluno",{});
assert.equal(pending.answered,true);
assert.equal(pending.complete,false);
assert.equal(pending.label,"Por rever");

const rubricKeys=(await import("../app/lib/physicsChemistryRubric.js")).physicsChemistryRubricFor(openItem);
const completeAssessment=Object.fromEntries(rubricKeys.map(row=>[row.id,{status:"observed"}]));
const done=physicsChemistryOpenReviewStatus(openItem,"Resposta do aluno",completeAssessment);
assert.equal(done.complete,true);
assert.equal(done.label,"Revisão concluída");

const progress=physicsChemistryOpenReviewProgress([openItem],{[openItem.id]:"Resposta do aluno"},{[openItem.id]:completeAssessment});
assert.deepEqual({total:progress.total,complete:progress.complete,pending:progress.pending},{total:1,complete:1,pending:0});

const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const draft=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

for(const [label,source] of [["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/PhysicsChemistryReviewProgress/u,label+": deve mostrar o progresso global da revisão.");
  assert.match(source,/physicsChemistryOpenReviewStatus/u,label+": deve identificar cada resposta aberta como revista ou pendente.");
  assert.match(source,/Guardar com /u,label+": deve avisar quando o aluno termina com respostas por rever.");
  assert.match(source,/rubricAssessments/u,label+": deve preservar a grelha de revisão por resposta.");
  assert.match(source,/goToNextPendingReview/u,label+": deve permitir saltar diretamente para a próxima resposta por rever.");
  assert.match(source,/fqa-review-/u,label+": cada item da revisão deve ter âncora navegável.");
  assert.match(source,/openReviewProgress\.pending>0/u,label+": sair com pendências deve guardar a revisão sem a finalizar.");
}
assert.match(draft,/review:!!review/u,"o rascunho deve guardar se o aluno já entrou na revisão.");
assert.match(draft,/rubricAssessments/u,"o rascunho deve guardar o progresso da revisão por critérios.");
assert.match(draft,/review:!!review/u,"o rascunho deve persistir explicitamente a fase de revisão.");
assert.doesNotMatch(draft,/if\(!store\|\|review\)return/u,"entrar na revisão não pode deixar de guardar o rascunho.");
assert.match(css,/fqaReviewProgress/u,"a revisão deve ter resumo visual próprio.");
assert.match(css,/fqaReviewProgressActions/u,"o atalho de próxima revisão deve adaptar-se ao layout.");
assert.equal(PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.length,15);

console.log("✓ FQ A review progress: estado por resposta · progresso global · próxima por rever · revisão persistente · saída explícita com pendentes");
