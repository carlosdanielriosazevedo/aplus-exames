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
const allExamItems=[...blueprint.mandatoryItems,...blueprint.optionalItems];
assert.ok(allExamItems.some(item=>item.stimulus?.type==="table"),"o Exame Completo deve conter pelo menos uma tabela.");
assert.ok(allExamItems.some(item=>item.stimulus?.type==="line-chart"),"o Exame Completo deve conter pelo menos um gráfico quantitativo.");
assert.ok(allExamItems.some(item=>item.stimulus?.type==="diagram"),"o Exame Completo deve conter pelo menos um diagrama científico.");
for(const domain of new Set(allExamItems.map(item=>item.domain))){
  assert.ok(allExamItems.filter(item=>item.domain===domain).length>=2,domain+": o Exame Completo deve representar cada grande domínio com pelo menos dois itens.");
}

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

assert.match(page,/screen==="physicsChemistryExam"/u,"o router deve expor o Exame Completo apenas dentro de FQ A");
assert.match(subject,/Exame Completo · 715/u,"o hub de exames deve disponibilizar o Exame Completo");
assert.match(subject,/23 itens · 200 pontos · 120 min \+ 30 min de tolerância/u,"o hub deve comunicar a estrutura atual");
assert.match(component,/Durante o Exame Completo não mostramos correções/u,"o exame não deve dar feedback questão a questão");
assert.match(component,/Podes voltar atrás e alterar respostas/u,"o aluno deve poder rever respostas antes de terminar");
assert.match(component,/Tolerância ·/u,"o Exame Completo deve distinguir visualmente os 30 minutos de tolerância.");
assert.match(component,/ao esgotar a tolerância, a prova termina automaticamente/u,"o fim da tolerância deve fechar automaticamente o Exame Completo.");
assert.match(component,/blueprint\.durationMinutes\*60/u,"o cronómetro deve usar a duração do blueprint.");
assert.match(component,/blueprint\.toleranceMinutes\*60/u,"o cronómetro deve usar a tolerância do blueprint.");
assert.match(component,/setInterval/u,"o cronómetro deve atualizar em tempo real.");
assert.match(component,/timeExpired/u,"o fluxo deve detetar o fim do tempo total.");
assert.match(component,/recordedRef/u,"o fim manual ou automático não pode gravar a sessão duas vezes.");
assert.match(component,/Terminar e rever/u,"o fluxo deve terminar em revisão");
assert.match(component,/Contam os 4 melhores/u,"a revisão deve explicar a regra dos opcionais");
assert.match(component,/Subtotal já corrigível/u,"respostas abertas não podem gerar uma falsa nota final");
assert.match(component,/não é apresentado como classificação oficial/u,"o subtotal automático deve ser explicitamente não oficial");
assert.match(component,/resposta\(s\) científica\(s\) aberta\(s\) continuam pendentes/u,"a revisão deve preservar correção humana/guiada das abertas");
assert.match(component,/gradePhysicsChemistryResponse/u,"o Exame Completo deve reutilizar o motor específico da disciplina");
assert.match(component,/recordSubjectSession/u,"o Exame Completo deve entrar no progresso partilhado");
assert.doesNotMatch(component,/Resposta certa:[\s\S]{0,120}Seguinte/u,"não deve haver correção imediata antes do fim");

console.log("✓ FQ A exam flow: 23 itens · 15+8/4 · tabela + gráficos + diagramas · 120+30 min · fim automático · revisão conservadora");
