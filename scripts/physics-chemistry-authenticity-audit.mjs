import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PHYSICS_CHEMISTRY_A_DOMAINS,PHYSICS_CHEMISTRY_A_ITEMS} from "../app/data/physicsChemistryFoundation.js";

const chartItems=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="line-chart");
const diagramItems=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="diagram");
assert.ok(chartItems.length>=7,"Devem existir pelo menos 7 itens com gráfico.");
assert.ok(diagramItems.length>=7,"Devem existir pelo menos 7 itens com diagrama.");

for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  assert.ok(chartItems.some(item=>item.domain===domain.id),domain.id+": deve ter pelo menos um gráfico.");
  assert.ok(diagramItems.some(item=>item.domain===domain.id),domain.id+": deve ter pelo menos um diagrama.");
}

for(const item of chartItems){
  assert.ok(item.stimulus.points?.length>=4,item.id+": gráfico precisa de pelo menos quatro pontos.");
  assert.ok(item.stimulus.xLabel&&item.stimulus.yLabel,item.id+": gráfico precisa de eixos identificados.");
  assert.ok(item.stimulus.caption,item.id+": gráfico precisa de legenda contextual.");
  assert.ok(item.competencyId==="fqa-data"||item.competencyId==="fqa-problems",item.id+": gráfico deve mobilizar dados ou resolução de problemas.");
}

for(const item of diagramItems){
  assert.ok(item.stimulus.nodes?.length>=3,item.id+": diagrama precisa de pelo menos três elementos.");
  assert.ok(item.stimulus.caption,item.id+": diagrama precisa de legenda contextual.");
}

const renderer=readFileSync(new URL("../app/components/PhysicsChemistryStimulus.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const exam=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(renderer,/line-chart/u);
assert.match(renderer,/diagram/u);
assert.match(renderer,/role="img"/u,"gráficos devem ter semântica de imagem acessível.");
assert.match(renderer,/aria-label/u,"gráficos devem expor descrição acessível.");
assert.match(subject,/PhysicsChemistryStimulus/u,"treino e mini-exame devem usar o renderer partilhado.");
assert.match(exam,/PhysicsChemistryStimulus/u,"simulado completo deve usar o mesmo renderer.");
assert.match(css,/\.fqaChartStimulus/u);
assert.match(css,/\.fqaDiagramStimulus/u);

console.log("✓ FQ A authenticity: gráficos e diagramas presentes nos 7 domínios e partilhados entre treino/exame");
