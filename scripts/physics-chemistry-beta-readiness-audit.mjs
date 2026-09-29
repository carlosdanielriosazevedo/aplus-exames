import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_DOMAINS,PHYSICS_CHEMISTRY_A_ITEMS,PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES} from "../app/data/physicsChemistryFoundation.js";
import {PHYSICS_CHEMISTRY_A_SUBTOPICS} from "../app/data/physicsChemistryTaxonomy.js";
import {PHYSICS_CHEMISTRY_A_MINI_EXAMS} from "../app/data/physicsChemistryMiniExams.js";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../app/data/physicsChemistryExamBlueprint.js";
import {physicsChemistryCoverage} from "../app/lib/physicsChemistryEngine.js";

const coverage=physicsChemistryCoverage(PHYSICS_CHEMISTRY_A_ITEMS);
const allExamItems=[...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems,...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalItems];

assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.length,7,"FQ A deve manter os sete grandes domínios curriculares.");
assert.equal(PHYSICS_CHEMISTRY_A_SUBTOPICS.length,43,"FQ A deve manter as 43 submatérias curriculares modeladas.");
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.length>=2145,"O banco beta deve manter pelo menos 2145 itens após seis vagas de profundidade.");
assert.ok(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.some(row=>row.authority==="DGE"&&row.status==="in-force"),"A disciplina deve manter referência curricular DGE vigente.");
assert.ok(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.some(row=>row.authority==="IAVE"),"A disciplina deve manter referência explícita ao IAVE.");

for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS){
  assert.ok((coverage.bySubtopic[subtopic.id]||0)>=49,subtopic.id+": nenhuma submatéria pode entrar em beta com menos de 49 itens.");
}
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  const rows=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.domain===domain.id);
  assert.ok(rows.some(item=>item.responseType==="multiple-choice"),domain.id+": falta escolha múltipla.");
  assert.ok(rows.some(item=>item.responseType==="stepwise"),domain.id+": falta resposta por etapas.");
  assert.ok(rows.some(item=>item.responseType==="restricted-response"),domain.id+": falta resposta científica aberta.");
  assert.ok(rows.some(item=>["table","line-chart","diagram"].includes(item.stimulus?.type)),domain.id+": falta suporte científico visual.");
}

assert.equal(PHYSICS_CHEMISTRY_A_MINI_EXAMS.length,2,"O beta deve manter dois mini-exames fixos.");
for(const exam of PHYSICS_CHEMISTRY_A_MINI_EXAMS){
  assert.equal(exam.itemCount,12,exam.id+": mini-exame deve manter 12 itens.");
  assert.ok(exam.items.some(item=>item.responseType==="stepwise"),exam.id+": falta problema por etapas.");
  assert.ok(exam.items.some(item=>item.responseType==="restricted-response"),exam.id+": falta resposta aberta.");
  assert.ok(exam.items.some(item=>["table","line-chart","diagram"].includes(item.stimulus?.type)),exam.id+": falta suporte científico.");
}

assert.equal(allExamItems.length,23,"O Exame Completo 715 deve manter 23 itens.");
assert.equal(PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.length,15);
assert.equal(PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalItems.length,8);
assert.equal(PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalCounted,4);
assert.equal(new Set(allExamItems.map(item=>item.domain)).size,7,"O Exame Completo deve representar os sete grandes domínios.");
assert.ok(allExamItems.some(item=>item.responseType==="stepwise"),"O Exame Completo deve incluir resposta por etapas.");
assert.ok(allExamItems.some(item=>item.responseType==="restricted-response"),"O Exame Completo deve incluir resposta científica aberta.");

const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const learn=readFileSync(new URL("../app/components/PhysicsChemistryLearnPanel.js",import.meta.url),"utf8");
const stepwise=readFileSync(new URL("../app/components/PhysicsChemistryStepwise.js",import.meta.url),"utf8");
const rubric=readFileSync(new URL("../app/components/PhysicsChemistryRubricReview.js",import.meta.url),"utf8");

for(const [label,source] of [["Treino/Missão",subject],["Mini-exame",mini],["Exame Completo",full]]){
  assert.match(source,/PhysicsChemistryStepwiseEditor/u,label+": deve reutilizar o editor partilhado por etapas.");
  assert.match(source,/PhysicsChemistryRubricReview/u,label+": deve reutilizar a grelha partilhada de respostas abertas.");
}
assert.match(subject,/StudentTop/u,"FQ A deve permanecer no workspace comum.");
assert.match(subject,/StudentNav/u,"FQ A deve manter a navegação comum.");
assert.match(subject,/StudyModeHub/u,"FQ A deve reutilizar o hub comum de modos.");
assert.match(subject,/7 perguntas · Física e Química/u,"Missão deve preservar sessões de pelo menos 7 perguntas.");
assert.match(subject,/Começar treino/u,"Treino Livre deve estar operacional.");
assert.match(subject,/Atualizar matéria dada/u,"Progresso deve permitir atualizar matéria lecionada.");
assert.match(learn,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever Matéria deve permanecer estudo passivo.");
assert.match(stepwise,/Indicação provisória/u,"Problemas por etapas não podem apresentar a classificação como oficial.");
assert.match(rubric,/Não atribui nota automática/u,"Respostas científicas abertas não podem ser auto-classificadas como nota final.");
assert.match(mini,/não mostra a correção durante o mini-exame/u,"Mini-exame não deve revelar feedback imediato.");
assert.match(full,/Durante o Exame Completo não mostramos correções/u,"Exame Completo não deve revelar feedback imediato.");
assert.match(full,/Subtotal já corrigível/u,"Exame Completo deve distinguir subtotal automático de classificação final.");

console.log("✓ FQ A beta readiness: 7 domínios · 43 submatérias · 2145+ itens · 49+ por submatéria · 2 mini-exames · Exame Completo 715 · componentes partilhados · correção conservadora");
