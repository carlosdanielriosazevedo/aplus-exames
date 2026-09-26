import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_MINI_EXAMS} from "../app/data/physicsChemistryMiniExams.js";

assert.equal(PHYSICS_CHEMISTRY_A_MINI_EXAMS.length,2,"FQ A deve ter pelo menos dois mini-exames fixos para beta.");
for(const exam of PHYSICS_CHEMISTRY_A_MINI_EXAMS){
  assert.equal(exam.itemCount,12,exam.id+": mini-exame deve ter 12 itens.");
  assert.equal(exam.durationMinutes,45,exam.id+": duração editorial deve ser 45 min.");
  assert.equal(new Set(exam.items.map(item=>item.id)).size,12,exam.id+": não pode repetir itens.");
  assert.equal(exam.items.filter(item=>item.year==="10.º").length,6,exam.id+": deve equilibrar 10.º e 11.º.");
  assert.equal(exam.items.filter(item=>item.year==="11.º").length,6,exam.id+": deve equilibrar 10.º e 11.º.");
  assert.ok(new Set(exam.items.map(item=>item.domain)).size>=6,exam.id+": deve abranger pelo menos seis grandes domínios.");
  assert.ok(exam.items.some(item=>item.responseType==="stepwise"),exam.id+": deve conter problema por etapas.");
  assert.ok(exam.items.some(item=>item.responseType==="restricted-response"),exam.id+": deve conter resposta científica aberta.");
  assert.ok(exam.items.some(item=>["line-chart","diagram","table"].includes(item.stimulus?.type)),exam.id+": deve usar suporte científico visual.");
}

const component=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");

assert.match(page,/physicsChemistryMini1/u);
assert.match(page,/physicsChemistryMini2/u);
assert.match(subject,/Mini-exame · Modelo 1/u);
assert.match(subject,/Mini-exame · Modelo 2/u);
assert.doesNotMatch(subject,/startMiniExam/u,"o hub não deve gerar mini-exames aleatórios através do fluxo de treino.");
assert.match(component,/>Responder</u,"o mini-exame deve manter confirmação explícita da resposta.");
assert.match(component,/não mostra a correção durante o mini-exame/u,"Responder não deve revelar feedback durante a prova.");
assert.match(component,/Rever o mini-exame/u,"a correção deve aparecer numa fase de revisão posterior.");
assert.match(component,/Sem nota automática final/u,"respostas construídas não podem gerar nota final automática.");
assert.match(component,/PhysicsChemistryStimulus/u,"mini-exame deve reutilizar gráficos, diagramas e tabelas.");
assert.match(component,/recordSubjectSession/u,"mini-exame deve alimentar o progresso partilhado.");
assert.doesNotMatch(component,/useState\(null\).*feedback/u,"mini-exame não deve reutilizar o padrão de feedback imediato do treino.");

console.log("✓ FQ A mini-exams: 2 modelos · 12 itens · 6+6 anos · 45 min · sem feedback imediato · revisão final");
