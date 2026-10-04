import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../app/data/physicsChemistryConstructed.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

const openItems=PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.filter(item=>item.responseType==="restricted-response");
assert.equal(openItems.length,7,"A tranche de fundação deve continuar a cobrir sete respostas científicas abertas.");
for(const item of openItems){
  assert.ok(Array.isArray(item.criteria)&&item.criteria.length>=2,item.id+": deve manter pelo menos dois critérios científicos observáveis.");
  const result=gradePhysicsChemistryResponse(item,item.referenceAnswer||item.explanation||item.criteria.join(" "));
  assert.equal(result.final,false,item.id+": uma resposta aberta não pode ser apresentada como classificação final determinística.");
  assert.ok(Number.isFinite(result.provisionalPoints),item.id+": o corretor deve produzir pontuação provisória automática.");
  assert.ok(Array.isArray(result.criteria)&&result.criteria.length>=2,item.id+": o resultado deve explicar a avaliação critério a critério.");
  assert.ok(Number.isFinite(result.autoAssessmentConfidence),item.id+": a correção automática deve expor confiança.");
}

const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const progress=readFileSync(new URL("../app/lib/subjectProgress.js",import.meta.url),"utf8");

for(const [label,source] of [["Treino/Missão",subject],["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/gradePhysicsChemistryResponse/u,label+": deve usar o motor automático específico de FQ A.");
  assert.doesNotMatch(source,/PhysicsChemistryRubricReview/u,label+": não deve pedir ao aluno a antiga grelha manual de autoavaliação.");
}
assert.match(subject,/feedbackSummary/u,"Treino/Missão deve devolver feedback pedagógico automático nas respostas abertas.");
assert.match(mini,/result\.criteria/u,"Mini-exame deve explicar a avaliação automática por critérios.");
assert.match(full,/result\.criteria/u,"Exame Completo deve explicar a avaliação automática por critérios.");
assert.match(mini,/autoAssessmentConfidence/u,"Mini-exame deve mostrar confiança da avaliação.");
assert.match(full,/autoAssessmentConfidence/u,"Exame Completo deve mostrar confiança da avaliação.");
assert.match(progress,/requiresReview/u,"o progresso deve preservar sinalização de resultados que exigem revisão/confiança reduzida.");

console.log("✓ FQ A automatic criteria: pontuação provisória · confiança · critérios explicados · sem autoavaliação manual");
