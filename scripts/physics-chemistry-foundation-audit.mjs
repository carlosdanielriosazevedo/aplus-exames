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
import {PHYSICS_CHEMISTRY_A_SUBTOPICS} from "../app/data/physicsChemistryTaxonomy.js";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT,physicsChemistryExamScore} from "../app/data/physicsChemistryExamBlueprint.js";
import {PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES} from "../app/data/physicsChemistryPracticalActivities.js";

const years=new Set(PHYSICS_CHEMISTRY_A_DOMAINS.map(row=>row.year));
assert.deepEqual([...years].sort(),["10.º","11.º"],"FQ A deve cobrir 10.º e 11.º anos.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.length,7,"A fundação deve modelar os 7 grandes domínios curriculares de FQ A.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Física").length,3,"Devem existir três grandes domínios de Física.");
assert.equal(PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.area==="Química").length,4,"Devem existir quatro grandes domínios de Química.");
assert.ok(PHYSICS_CHEMISTRY_A_DOMAINS.every(row=>row.subtopics.length>=5),"Cada domínio deve expor subtemas concretos.");

const authorities=new Set(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.map(row=>row.authority));
assert.ok(authorities.has("DGE")&&authorities.has("IAVE"),"A fundação deve distinguir currículo DGE de referência IAVE.");
assert.ok(PHYSICS_CHEMISTRY_A_REFERENCE_SOURCES.filter(row=>row.authority==="DGE").every(row=>row.status==="in-force"),"As fontes curriculares DGE devem estar marcadas como vigentes.");

assert.equal(PHYSICS_CHEMISTRY_A_ITEMS.length,304,"O banco atual deve ter 304 itens originais após a segunda vaga de profundidade.");
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
assert.equal(coverage.total,304);
assert.equal(coverage.missionReady,true,"Todos os grandes domínios devem suportar uma missão de pelo menos 7 perguntas.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS)assert.ok(coverage.byDomain[domain.id]>=11,domain.id+": cada grande domínio deve ter pelo menos 11 itens após a vaga de dados.");
assert.equal(PHYSICS_CHEMISTRY_A_SUBTOPICS.length,43,"A taxonomia deve representar 43 submatérias curriculares.");
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS){
  assert.ok((coverage.bySubtopic[subtopic.id]||0)>=7,subtopic.id+": cada submatéria deve ter pelo menos sete itens, permitindo treino específico de 7–10 perguntas.");
}
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="table").length>=8,"FQ A deve conter pelo menos oito itens com tabelas/dados nesta tranche.");
const choiceItems=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.responseType==="multiple-choice");
assert.equal(new Set(choiceItems.map(item=>item.prompt.trim().toLowerCase())).size,choiceItems.length,"Perguntas de escolha múltipla não devem repetir o mesmo enunciado.");
for(const item of choiceItems)assert.equal(new Set(item.options).size,4,item.id+": as quatro opções devem ser distintas.");
const answerPositions=[0,0,0,0];
choiceItems.forEach(item=>answerPositions[item.answerIndex]++);
assert.ok(Math.max(...answerPositions)/choiceItems.length<0.35,"A resposta correta não pode concentrar-se em demasia numa única posição: "+answerPositions.join("/"));
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  const positions=[0,0,0,0];
  choiceItems.filter(item=>item.domain===domain.id).forEach(item=>positions[item.answerIndex]++);
  const total=positions.reduce((sum,count)=>sum+count,0);
  assert.ok(Math.max(...positions)/total<0.42,domain.id+": posição correta demasiado previsível ("+positions.join("/")+")");
}
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS){
  const mission=buildAdaptivePhysicsChemistryMission(PHYSICS_CHEMISTRY_A_ITEMS,{subtopicId:subtopic.id,size:7});
  assert.equal(mission.items.length,7,subtopic.id+": cada submatéria deve gerar uma sessão específica de 7 perguntas.");
  assert.ok(mission.items.every(item=>item.subtopicId===subtopic.id),subtopic.id+": treino específico não pode misturar outras submatérias.");
}
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
assert.deepEqual(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.historicalComparison.years,[2024,2025,2026]);
assert.ok(PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY.historicalComparison.stablePatterns.length>=4,"A política deve comparar padrões recorrentes dos três exames mais recentes.");
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



assert.equal(PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES.length,21,"As AE atuais devem ter um mapa explícito das atividades prático-experimentais prioritárias.");
for(const activity of PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES){
  assert.ok(PHYSICS_CHEMISTRY_A_DOMAINS.some(domain=>domain.id===activity.domain),activity.id+": domínio prático desconhecido.");
  assert.ok(PHYSICS_CHEMISTRY_A_SUBTOPICS.some(subtopic=>subtopic.id===activity.subtopicId),activity.id+": submatéria prática desconhecida.");
  assert.ok(activity.focus.length>=3,activity.id+": cada atividade prática deve explicitar pelo menos três focos.");
}
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  assert.ok(PHYSICS_CHEMISTRY_A_PRACTICAL_ACTIVITIES.some(activity=>activity.domain===domain.id),domain.id+": cada domínio deve ter trabalho prático mapeado.");
}

const blueprint=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT;
assert.equal(blueprint.mandatoryItems.length,15,"O simulado deve ter 15 itens obrigatórios.");
assert.equal(blueprint.optionalItems.length,8,"O simulado deve ter 8 itens opcionais.");
assert.equal(blueprint.optionalCounted,4,"Devem contar apenas os 4 melhores itens opcionais.");
assert.equal(blueprint.mandatoryItems.reduce((sum,item)=>sum+item.examPoints,0),160,"Os itens obrigatórios devem totalizar 160 pontos.");
assert.equal(blueprint.optionalItems.every(item=>item.examPoints===10),true,"Cada item opcional deve valer 10 pontos.");
assert.equal(blueprint.totalPoints,200);
assert.ok(blueprint.mandatoryItems.some(item=>item.responseType==="stepwise"),"O simulado deve conter construção por etapas.");
assert.ok(blueprint.mandatoryItems.some(item=>item.responseType==="restricted-response"),"O simulado deve conter resposta científica aberta.");
assert.ok(blueprint.mandatoryItems.some(item=>item.stimulus?.type==="table"),"O simulado deve conter interpretação de dados.");
assert.ok(new Set([...blueprint.mandatoryItems,...blueprint.optionalItems].map(item=>item.id)).size===23,"O simulado não deve repetir itens.");
const demoScore=physicsChemistryExamScore({
  mandatoryResults:blueprint.mandatoryItems.map(item=>({points:item.examPoints})),
  optionalResults:blueprint.optionalItems.map((item,index)=>({points:index<4?10:2}))
});
assert.equal(demoScore.total,200,"O algoritmo do simulado deve contar os 4 melhores opcionais e permitir 200 pontos.");

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
assert.match(component,/Começar treino/u,"Treino Livre deve usar o contrato 7–10.");
assert.match(component,/Submatéria/u,"Treino Livre deve permitir escolher submatéria.");
assert.match(component,/Misturar matéria/u,"O aluno deve poder treinar o domínio inteiro quando a submatéria ainda não tem banco suficiente.");
assert.match(component,/fqaStimulus/u,"A UI deve renderizar estímulos tabulares.");
assert.match(component,/7 perguntas · Física e Química/u,"Missão deve usar o contrato 7–10.");
assert.match(component,/Mini-exame · Modelo 1/u,"O mini-exame inicial deve continuar identificado como modelo próprio.");
assert.match(component,/Simulado completo · 715/u,"FQ A deve expor o simulado completo depois de este estar implementado.");
assert.match(component,/Resposta construída por etapas/u,"FQ A deve suportar problemas por etapas.");
assert.match(component,/Resposta científica/u,"FQ A deve suportar respostas científicas abertas.");
assert.match(component,/Correção provisória/u,"A pontuação automática das etapas não pode ser apresentada como nota oficial.");
assert.match(component,/Uma formulação diferente pode estar correta/u,"Respostas abertas devem aceitar formulações cientificamente equivalentes.");
assert.match(learn,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria deve ser estudo passivo.");
assert.match(learn,/Trabalho prático associado nas AE/u,"Rever Matéria deve tornar visível o trabalho prático previsto nas AE.");
assert.doesNotMatch(learn,/Responder|buildAdaptivePhysicsChemistryMission/u,"Rever matéria não deve iniciar treino.");

console.log("✓ FQ A: AE março 2026 · 21 atividades práticas · 43 submatérias · 304 itens · mínimo 7/submatéria · respostas A/B/C/D equilibradas · blueprint 715 15+8/4");
