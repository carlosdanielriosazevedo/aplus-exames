import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../app/data/physicsChemistryConstructed.js";
import {PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS,physicsChemistryRubricFor,physicsChemistryRubricResult} from "../app/lib/physicsChemistryRubric.js";

assert.deepEqual(PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS.map(row=>row.label),["Cumpri","Parcial","Ainda não"]);

const openItems=PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.filter(item=>item.responseType==="restricted-response");
assert.equal(openItems.length,7,"A tranche atual deve cobrir as sete respostas científicas abertas de fundação.");
for(const item of openItems){
  const rubric=physicsChemistryRubricFor(item);
  assert.ok(rubric.length>=2,item.id+": deve ter pelo menos dois critérios observáveis.");
  assert.ok(rubric.every(criterion=>criterion.observations?.length>=1),item.id+": cada critério deve decompor-se em observações.");
  assert.equal(new Set(rubric.flatMap(criterion=>criterion.observations.map(row=>row.id))).size,rubric.flatMap(criterion=>criterion.observations).length,item.id+": IDs de observações devem ser únicos.");
  const assessment=Object.fromEntries(rubric.map(criterion=>[criterion.id,{
    status:"observed",
    evidence:"Trecho da minha resposta",
    observations:Object.fromEntries(criterion.observations.map(observation=>[observation.id,{status:"observed",evidence:"evidência"}]))
  }]));
  const result=physicsChemistryRubricResult(item,"Resposta científica do aluno.",assessment);
  assert.equal(result.final,false,item.id+": resposta aberta nunca deve produzir classificação final automática.");
  assert.equal(result.points,null,item.id+": autoavaliação não pode atribuir pontos automaticamente.");
  assert.equal(result.rubricCompleted,true,item.id+": grelha toda marcada deve ficar concluída.");
  assert.ok(result.criteria.every(criterion=>criterion.status==="observed"),item.id+": estado por critério deve persistir.");
  assert.ok(result.criteria.flatMap(criterion=>criterion.observations).every(observation=>observation.status==="observed"),item.id+": evidência por observação deve persistir.");
}

const review=readFileSync(new URL("../app/components/PhysicsChemistryRubricReview.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const progress=readFileSync(new URL("../app/lib/subjectProgress.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(review,/Cumpri/u);
assert.match(review,/Parcial/u);
assert.match(review,/Ainda não/u);
assert.match(review,/Onde está a evidência na tua resposta/u);
assert.match(review,/observations/u,"a UI deve mostrar observações atómicas por critério.");
assert.match(subject,/PhysicsChemistryRubricReview/u,"missões/treino devem usar a autoavaliação guiada.");
assert.match(subject,/Conhecimento científico/u);
assert.match(subject,/Trabalho prático/u);
assert.match(subject,/Resolução de problemas/u);
assert.match(subject,/Comunicação científica/u);
assert.match(subject,/Não é uma nota/u,"progresso por competências não deve ser apresentado como classificação.");
assert.match(mini,/PhysicsChemistryRubricReview/u,"mini-exame deve rever respostas abertas por critérios.");
assert.match(mini,/Guardar revisão e terminar/u,"mini-exame deve guardar a evidência depois da revisão.");
assert.match(full,/PhysicsChemistryRubricReview/u,"simulado completo deve rever respostas abertas por critérios.");
assert.match(full,/Guardar revisão e terminar/u,"simulado completo deve guardar a evidência depois da revisão.");
assert.match(progress,/rubricEvidenceByObservation/u,"o progresso partilhado deve persistir evidência por observação.");
assert.match(progress,/rubricObserved/u);
assert.match(progress,/rubricNeedsReview/u);
assert.match(review,/CRITÉRIO /u,"a grelha deve distinguir visualmente cada critério.");
assert.match(review,/Autoavaliação do critério/u,"os grupos de decisão devem ser identificáveis por tecnologia assistiva.");
assert.match(css,/grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/u,"em mobile, Cumpri/Parcial/Ainda não devem manter três alvos equilibrados.");

console.log("✓ FQ A rubric: Cumpri/Parcial/Ainda não · observações atómicas · evidência guardada · 4 dimensões no Progresso · sem nota automática");
