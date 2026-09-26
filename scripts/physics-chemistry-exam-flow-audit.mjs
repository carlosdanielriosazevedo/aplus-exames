import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT,physicsChemistryExamScore} from "../app/data/physicsChemistryExamBlueprint.js";

const blueprint=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT;
assert.equal(blueprint.mandatoryItems.length,15);
assert.equal(blueprint.optionalItems.length,8);
assert.equal(blueprint.optionalCounted,4);
assert.equal(blueprint.mandatoryItems.reduce((sum,item)=>sum+item.examPoints,0),160);
assert.equal(blueprint.optionalItems.reduce((sum,item)=>sum+item.examPoints,0),80);
assert.equal(blueprint.durationMinutes,120);
assert.equal(blueprint.toleranceMinutes,30);

const perfect=physicsChemistryExamScore({
  mandatoryResults:blueprint.mandatoryItems.map(item=>({points:item.examPoints})),
  optionalResults:blueprint.optionalItems.map(item=>({points:item.examPoints}))
});
assert.equal(perfect.total,200,"a classificação estrutural deve limitar o total a 200");

const selective=physicsChemistryExamScore({
  mandatoryResults:blueprint.mandatoryItems.map(()=>({points:0})),
  optionalResults:[10,9,8,7,6,5,4,3].map(points=>({points}))
});
assert.equal(selective.optionalScore,34,"devem contar exatamente os quatro melhores opcionais");

const component=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");

assert.match(page,/screen==="physicsChemistryExam"/u,"o router deve expor o simulado completo apenas dentro de FQ A");
assert.match(subject,/Simulado completo · 715/u,"o hub de exames deve disponibilizar o simulado completo");
assert.match(subject,/23 itens · 200 pontos · 120 min + 30 min de tolerância/u,"o hub deve comunicar a estrutura atual");
assert.match(component,/Durante o simulado não mostramos correções/u,"o exame não deve dar feedback questão a questão");
assert.match(component,/Podes voltar atrás e alterar respostas/u,"o aluno deve poder rever respostas antes de terminar");
assert.match(component,/Terminar e rever/u,"o fluxo deve terminar em revisão");
assert.match(component,/Contam os 4 melhores/u,"a revisão deve explicar a regra dos opcionais");
assert.match(component,/Subtotal já corrigível/u,"respostas abertas não podem gerar uma falsa nota final");
assert.match(component,/não é apresentado como classificação oficial/u,"o subtotal automático deve ser explicitamente não oficial");
assert.match(component,/resposta\(s\) científica\(s\) aberta\(s\) continuam pendentes/u,"a revisão deve preservar correção humana/guiada das abertas");
assert.match(component,/gradePhysicsChemistryResponse/u,"o simulado deve reutilizar o motor específico da disciplina");
assert.match(component,/recordSubjectSession/u,"o simulado deve entrar no progresso partilhado");
assert.doesNotMatch(component,/Resposta certa:[\s\S]{0,120}Seguinte/u,"não deve haver correção imediata antes do fim");

console.log("✓ FQ A exam flow: 23 itens · 15+8/4 · 200 pontos · sem feedback durante a prova · revisão conservadora");
