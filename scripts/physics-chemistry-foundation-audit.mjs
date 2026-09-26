import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  PHYSICS_CHEMISTRY_A_DOMAINS,
  PHYSICS_CHEMISTRY_A_ITEMS,
  PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES
} from "../app/data/physicsChemistryFoundation.js";
import {physicsChemistryCoverage,buildPhysicsChemistryDiagnostic,buildAdaptivePhysicsChemistryMission} from "../app/lib/physicsChemistryEngine.js";
import {AVAILABLE_SUBJECT_IDS,SECONDARY_EXAM_SUBJECTS} from "../app/data/subjects.js";
import {PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY,PHYSICS_CHEMISTRY_A_CURRICULUM_POLICY,PHYSICS_CHEMISTRY_A_DGE_ASSESSMENT_DOMAINS} from "../app/data/physicsChemistryAssessmentPolicy.js";

const years=new Set(PHYSICS_CHEMISTRY_A_DOMAINS.map(row=>row.year));
assert.deepEqual([...years].sort(),["10.º","11.º"],"FQ A deve cobrir 10.º e 11.º anos.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.length,7,"A fundação deve modelar os 7 grandes domínios curriculares de FQ A.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Física").length,3,"Devem existir três grandes domínios de Física.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Química").length,4,"Devem existir quatro grandes domínios de Química.");
assert.ok(PHYSICS_CHEMISTRY_A_DOMAINS.every(row=>row.subtopics.length>=5),"Cada domínio deve expor subtemas concretos.");

const authorities=new Set(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.map(row=>row.authority));
assert.ok(authorities.has("DGE")&&authorities.has("IAVE"),"A fundação deve distinguir currículo DGE de referência IAVE.");
assert.ok(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.filter(row=>row.authority==="DGE").every(row=>row.status==="in-force"),"As fontes curriculares DGE devem estar marcadas como vigentes.");

assert.equal(PHYSICS_CHEMISTRY_A_ITEMS.length,70,"A fundação atual deve ter 70 itens originais: 56 de seleção e 14 de construção.");
assert.equal(new Set(PHYSICS_CHEMISTRY_A_ITEMS.map(item=>item.id)).size,PHYSICS_CHEMISTRY_A_ITEMS.length,"IDs de FQ A devem ser únicos.");
for(const item of PHYSICS_CHEMISTRY_A_ITEMS){
  const domain=PHYSICS_CHEMISTRY_A_DOMAINS.find(row=>row.id===item.domain);
  assert.ok(domain,item.id+": domínio desconhecido.");
  assert.equal(item.year,domain.year,item.id+": ano incoerente com o domínio.");
  assert.equal(item.sourceOrigin,"original",item.id+": conteúdo deve permanecer original-only.");
  assert.ok(["multiple-choice","stepwise","restricted-response"].includes(item.responseType),item.id+": tipo de resposta não suportado.");
  if(item.responseType==="multiple-choice"){
    assert.equal(item.gradingMode,"deterministic",item.id+": escolha múltipla deve ter correção determinística.");
    assert.equal(item.options?.length,4,item.id+": escolha múltipla deve ter quatro opções.");
    assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,item.id+": answerIndex inválido.");
  }
  if(item.responseType==="stepwise"){
    assert.equal(item.gradingMode,"structured-provisional",item.id+": problemas por etapas devem ser provisórios.");
    assert.ok(item.steps?.length>=2,item.id+": problema por etapas precisa de pelo menos duas etapas.");
    assert.equal(item.steps.reduce((sum,step)=>sum+step.points,0),item.maxPoints,item.id+": pontos das etapas devem somar a cotação.");
  }
  if(item.responseType==="restricted-response"){
    assert.equal(item.gradingMode,"rubric-review",item.id+": resposta científica aberta deve usar revisão por critérios.");
    assert.ok(item.criteria?.length>=3,item.id+": resposta aberta deve ter critérios observáveis.");
  }
  assert.ok(Number.isInteger(item.difficultyTarget)&&item.difficultyTarget>=1&&item.difficultyTarget<=4,item.id+": dificuldade editorial inválida.");
}

const coverage=physicsChemistryCoverage(PHYSICS_CHEMISTRY_A_ITEMS);
assert.equal(coverage.total,70);
assert.equal(coverage.missionReady,true,"Todos os grandes domínios devem suportar uma missão de pelo menos 7 perguntas.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS)assert.equal(coverage.byDomain[domain.id],10,domain.id+": cada grande domínio deve ter 8 itens de seleção + 2 de construção.");
const diagnostic=buildPhysicsChemistryDiagnostic(PHYSICS_CHEMISTRY_A_ITEMS);
assert.equal(diagnostic.length,8,"O diagnóstico inicial deve ter 8 perguntas.");
assert.equal(new Set(diagnostic.map(item=>item.id)).size,8,"O diagnóstico não deve repetir perguntas.");
assert.ok(diagnostic.some(item=>item.year==="10.º")&&diagnostic.some(item=>item.year==="11.º"),"O diagnóstico deve representar os dois anos.");
assert.ok(diagnostic.some(item=>item.domain.startsWith("f"))&&diagnostic.some(item=>item.domain.startsWith("q")),"O diagnóstico deve representar Física e Química.");
assert.ok(diagnostic.every(item=>item.responseType==="multiple-choice"),"O diagnóstico curto deve manter correção determinística.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  const mission=buildAdaptivePhysicsChemistryMission(PHYSICS_CHEMISTRY_A_ITEMS,{domain:domain.id,size:7});
  assert.equal(mission.items.length,7,domain.id+": missão deve ter 7 itens.");
  assert.ok(mission.items.every(item=>item.domain===domain.id),domain.id+": missão específica não pode misturar domínios.");
}


assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.examYear,2026);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.totalPoints,200);
assert.deepEqual(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.itemSelectionPolicy,{mandatoryItems:15,optionalItems:8,optionalCounted:4,mandatorySubtotal:160,optionalCountedSubtotal:40});
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.durationMinutes,120);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.toleranceMinutes,30);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.officialPrinciples.errorType1Penalty,1);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.officialPrinciples.oneErrorType2Penalty,2);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.officialPrinciples.multipleErrorType2Penalty,4);
assert.equal(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.appPolicy.openScientificTextFinalAutoGrade,false);
assert.equal(PHYSICS_CHEMISTRY_A_CURRICULUM_POLICY.version,"AE-marco-2026");
assert.deepEqual(PHYSICS_CHEMISTRY_A_DGE_ASSESSMENT_DOMAINS.map(row=>row.label),["Conhecimento Científico","Trabalho Prático","Resolução de Problemas","Comunicação Científica"]);
assert.equal(PHYSICS_CHEMISTRY_A_CURRICULUM_POLICY.practicalExperimentalIsCore,true);

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
assert.match(component,/Resposta construída por etapas/u,"FQ A deve suportar problemas por etapas.");
assert.match(component,/Resposta científica/u,"FQ A deve suportar respostas científicas abertas.");
assert.match(component,/Correção provisória/u,"A pontuação automática das etapas não pode ser apresentada como nota oficial.");
assert.match(component,/Uma formulação diferente pode estar correta/u,"Respostas abertas devem aceitar formulações cientificamente equivalentes.");
assert.match(learn,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria deve ser estudo passivo.");
assert.doesNotMatch(learn,/Responder|buildAdaptivePhysicsChemistryMission/u,"Rever matéria não deve iniciar treino.");

console.log("✓ FQ A: AE março 2026 · Prova 715/2026 · 7 domínios · 70 itens originais · seleção + etapas + resposta científica · critérios oficiais protegidos");
