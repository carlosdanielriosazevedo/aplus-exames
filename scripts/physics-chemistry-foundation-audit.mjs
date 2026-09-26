import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  PHYSICS_CHEMISTRY_A_DOMAINS,
  PHYSICS_CHEMISTRY_A_ITEMS,
  PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES
} from "../app/data/physicsChemistryFoundation.js";
import {physicsChemistryCoverage,buildPhysicsChemistryDiagnostic,buildAdaptivePhysicsChemistryMission} from "../app/lib/physicsChemistryEngine.js";
import {AVAILABLE_SUBJECT_IDS,SECONDARY_EXAM_SUBJECTS} from "../app/data/subjects.js";

const years=new Set(PHYSICS_CHEMISTRY_A_DOMAINS.map(row=>row.year));
assert.deepEqual([...years].sort(),["10.º","11.º"],"FQ A deve cobrir 10.º e 11.º anos.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.length,7,"A fundação deve modelar os 7 grandes domínios curriculares de FQ A.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Física").length,3,"Devem existir três grandes domínios de Física.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Química").length,4,"Devem existir quatro grandes domínios de Química.");
assert.ok(PHYSICS_CHEMISTRY_A_DOMAINS.every(row=>row.subtopics.length>=5),"Cada domínio deve expor subtemas concretos.");

const authorities=new Set(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.map(row=>row.authority));
assert.ok(authorities.has("DGE")&&authorities.has("IAVE"),"A fundação deve distinguir currículo DGE de referência IAVE.");
assert.ok(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.filter(row=>row.authority==="DGE").every(row=>row.status==="in-force"),"As fontes curriculares DGE devem estar marcadas como vigentes.");

assert.equal(PHYSICS_CHEMISTRY_A_ITEMS.length,56,"A primeira fundação deve ter 56 itens originais.");
assert.equal(new Set(PHYSICS_CHEMISTRY_A_ITEMS.map(item=>item.id)).size,PHYSICS_CHEMISTRY_A_ITEMS.length,"IDs de FQ A devem ser únicos.");
for(const item of PHYSICS_CHEMISTRY_A_ITEMS){
  const domain=PHYSICS_CHEMISTRY_A_DOMAINS.find(row=>row.id===item.domain);
  assert.ok(domain,item.id+": domínio desconhecido.");
  assert.equal(item.year,domain.year,item.id+": ano incoerente com o domínio.");
  assert.equal(item.sourceOrigin,"original",item.id+": conteúdo deve permanecer original-only.");
  assert.equal(item.responseType,"multiple-choice",item.id+": a tranche inicial deve declarar explicitamente o tipo de resposta.");
  assert.equal(item.gradingMode,"deterministic",item.id+": escolha múltipla deve ter correção determinística.");
  assert.equal(item.options?.length,4,item.id+": escolha múltipla deve ter quatro opções.");
  assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,item.id+": answerIndex inválido.");
  assert.ok(Number.isInteger(item.difficultyTarget)&&item.difficultyTarget>=1&&item.difficultyTarget<=4,item.id+": dificuldade editorial inválida.");
}

const coverage=physicsChemistryCoverage(PHYSICS_CHEMISTRY_A_ITEMS);
assert.equal(coverage.total,56);
assert.equal(coverage.missionReady,true,"Todos os grandes domínios devem suportar uma missão de pelo menos 7 perguntas.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS)assert.equal(coverage.byDomain[domain.id],8,domain.id+": a primeira fundação deve ter 8 itens.");
const diagnostic=buildPhysicsChemistryDiagnostic(PHYSICS_CHEMISTRY_A_ITEMS);
assert.equal(diagnostic.length,8,"O diagnóstico inicial deve ter 8 perguntas.");
assert.equal(new Set(diagnostic.map(item=>item.id)).size,8,"O diagnóstico não deve repetir perguntas.");
assert.ok(diagnostic.some(item=>item.year==="10.º")&&diagnostic.some(item=>item.year==="11.º"),"O diagnóstico deve representar os dois anos.");
assert.ok(diagnostic.some(item=>item.domain.startsWith("f"))&&diagnostic.some(item=>item.domain.startsWith("q")),"O diagnóstico deve representar Física e Química.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  const mission=buildAdaptivePhysicsChemistryMission(PHYSICS_CHEMISTRY_A_ITEMS,{domain:domain.id,size:7});
  assert.equal(mission.items.length,7,domain.id+": missão deve ter 7 itens.");
  assert.ok(mission.items.every(item=>item.domain===domain.id),domain.id+": missão específica não pode misturar domínios.");
}

const subject=SECONDARY_EXAM_SUBJECTS.find(row=>row.id==="physics-chemistry-a");
assert.ok(subject?.available,"Física e Química A deve estar selecionável.");
assert.equal(subject?.releaseStage,"foundation","Física e Química A deve continuar marcada como foundation.");
assert.ok(AVAILABLE_SUBJECT_IDS.includes("physics-chemistry-a"));

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const component=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const learn=readFileSync(new URL("../app/components/PhysicsChemistryLearnPanel.js",import.meta.url),"utf8");
assert.match(page,/PhysicsChemistrySubject/u,"o router principal deve integrar FQ A sem criar uma aplicação paralela.");
assert.match(page,/activeSubjectId==="physics-chemistry-a"/u,"o workspace comum deve reconhecer FQ A.");
assert.match(component,/StudentTop/u);
assert.match(component,/StudentNav/u);
assert.match(component,/StudyModeHub/u);
assert.match(component,/beginSubjectSession/u);
assert.match(component,/recordSubjectSession/u);
assert.match(component,/subjectProgressFor/u);
assert.match(component,/>Responder</u,"FQ A deve preservar a confirmação explícita da resposta.");
assert.match(component,/Começar treino · 8 perguntas/u,"Treino Livre deve usar o contrato 7–10.");
assert.match(component,/7 perguntas · Física e Química/u,"Missão deve usar o contrato 7–10.");
assert.match(component,/Primeiro modelo interno: 12 itens/u,"O mini-exame inicial deve ser explicitamente identificado como modelo interno.");
assert.match(component,/simulado completo será construído separadamente/u,"A fundação não deve fingir que já tem um simulado completo.");
assert.match(learn,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria deve ser estudo passivo.");
assert.doesNotMatch(learn,/Responder|buildAdaptivePhysicsChemistryMission/u,"Rever matéria não deve iniciar treino.");

console.log("✓ FQ A foundation: 7 domínios · 56 itens originais · diagnóstico 8 · missões 7 · treino 8 · workspace partilhado");
