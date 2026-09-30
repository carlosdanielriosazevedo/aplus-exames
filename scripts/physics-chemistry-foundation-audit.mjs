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

assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.length>=2145,"O banco deve manter pelo menos 2145 itens após seis vagas de profundidade de treino.");
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
assert.ok(coverage.total>=2145);
assert.equal(coverage.missionReady,true,"O banco global deve suportar uma missão de pelo menos 7 perguntas.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS)assert.ok(coverage.byDomain[domain.id]>=11,domain.id+": cada grande domínio deve ter pelo menos 11 itens após a vaga de dados.");
assert.equal(PHYSICS_CHEMISTRY_A_SUBTOPICS.length,43,"A taxonomia deve representar 43 submatérias curriculares.");
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS){
  assert.ok((coverage.bySubtopic[subtopic.id]||0)>=7,subtopic.id+": nenhuma submatéria pode recuar abaixo do mínimo operacional de sete itens.");
}
const depthWave=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V-"));
assert.equal(depthWave.length,90,"A primeira vaga de profundidade deve acrescentar 90 variantes fechadas e determinísticas.");
assert.equal(new Set(depthWave.map(item=>item.id)).size,depthWave.length,"As variantes de treino devem ter IDs únicos.");
const deepenedSubtopics=new Set(depthWave.map(item=>item.subtopicId));
assert.equal(deepenedSubtopics.size,15,"A primeira vaga deve aprofundar 15 submatérias quantitativas.");
for(const id of deepenedSubtopics)assert.ok((coverage.bySubtopic[id]||0)>=13,id+": submatérias aprofundadas devem oferecer pelo menos 13 itens antes de repetir.");
const depthWave2=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V2-"));
assert.equal(depthWave2.length,84,"A segunda vaga deve acrescentar 84 variantes fechadas e determinísticas.");
assert.equal(new Set(depthWave2.map(item=>item.id)).size,depthWave2.length,"As variantes da segunda vaga devem ter IDs únicos.");
const deepenedSubtopicsWave2=new Set(depthWave2.map(item=>item.subtopicId));
assert.equal(deepenedSubtopicsWave2.size,14,"A segunda vaga deve aprofundar 14 submatérias adicionais.");
for(const id of deepenedSubtopicsWave2)assert.ok((coverage.bySubtopic[id]||0)>=13,id+": submatérias da segunda vaga devem oferecer pelo menos 13 itens antes de repetir.");
const allDeepened=new Set([...deepenedSubtopics,...deepenedSubtopicsWave2]);
assert.equal(allDeepened.size,29,"As duas vagas devem aprofundar 29 submatérias distintas.");
const depthWave3=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V3-"));
assert.equal(depthWave3.length,84,"A terceira vaga deve acrescentar 84 variantes fechadas e determinísticas.");
assert.equal(new Set(depthWave3.map(item=>item.id)).size,depthWave3.length,"As variantes da terceira vaga devem ter IDs únicos.");
const deepenedSubtopicsWave3=new Set(depthWave3.map(item=>item.subtopicId));
assert.equal(deepenedSubtopicsWave3.size,14,"A terceira vaga deve aprofundar as 14 submatérias restantes.");
const allDeepenedAfterWave3=new Set([...allDeepened,...deepenedSubtopicsWave3]);
assert.equal(allDeepenedAfterWave3.size,43,"Depois da terceira vaga, as 43 submatérias devem ter profundidade reforçada.");
for(const id of allDeepenedAfterWave3)assert.ok((coverage.bySubtopic[id]||0)>=13,id+": todas as submatérias devem oferecer pelo menos 13 itens antes de repetir.");
const depthWave4=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V4-"));
assert.equal(depthWave4.length,258,"A quarta vaga deve acrescentar 258 variantes de raciocínio, seis por cada submatéria.");
assert.equal(new Set(depthWave4.map(item=>item.id)).size,depthWave4.length,"As variantes da quarta vaga devem ter IDs únicos.");
assert.equal(new Set(depthWave4.map(item=>item.subtopicId)).size,43,"A quarta vaga deve cobrir as 43 submatérias.");
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS)assert.ok((coverage.bySubtopic[subtopic.id]||0)>=19,subtopic.id+": todas as submatérias devem oferecer pelo menos 19 itens antes de repetir.");
const depthWave5=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V5-"));
assert.equal(depthWave5.length,516,"A quinta vaga deve acrescentar 516 variantes, doze por cada submatéria.");
assert.equal(new Set(depthWave5.map(item=>item.id)).size,depthWave5.length,"As variantes da quinta vaga devem ter IDs únicos.");
assert.equal(new Set(depthWave5.map(item=>item.subtopicId)).size,43,"A quinta vaga deve cobrir as 43 submatérias.");
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS)assert.ok((coverage.bySubtopic[subtopic.id]||0)>=31,subtopic.id+": todas as submatérias devem oferecer pelo menos 31 itens antes de repetir.");
const depthWave6=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.generated===true&&String(item.id).startsWith("FQA-V6-"));
assert.equal(depthWave6.length,774,"A sexta vaga deve acrescentar 774 variantes, dezoito por cada submatéria.");
assert.equal(new Set(depthWave6.map(item=>item.id)).size,depthWave6.length,"As variantes da sexta vaga devem ter IDs únicos.");
assert.equal(new Set(depthWave6.map(item=>item.subtopicId)).size,43,"A sexta vaga deve cobrir as 43 submatérias.");
assert.equal(new Set(depthWave6.map(item=>item.templateId)).size,depthWave6.length,"A sexta vaga deve preservar famílias/templateId distintos por fonte e tarefa cognitiva.");
for(const subtopic of PHYSICS_CHEMISTRY_A_SUBTOPICS)assert.ok((coverage.bySubtopic[subtopic.id]||0)>=49,subtopic.id+": todas as submatérias devem oferecer pelo menos 49 itens antes de repetir.");
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="table").length>=15,"FQ A deve conter pelo menos quinze itens com tabelas/dados.");
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.responseType==="stepwise").length>=14,"FQ A deve conter pelo menos catorze problemas por etapas.");
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.responseType==="restricted-response").length>=14,"FQ A deve conter pelo menos catorze respostas científicas/experimentais abertas.");
for(const domain of PHYSICS_CHEMISTRY_A_DOMAINS){
  assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.some(item=>item.domain===domain.id&&item.responseType==="stepwise"),domain.id+": deve existir pelo menos um problema por etapas.");
  assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.some(item=>item.domain===domain.id&&item.responseType==="restricted-response"),domain.id+": deve existir pelo menos uma resposta aberta.");
  assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.some(item=>item.domain===domain.id&&item.stimulus?.type==="table"),domain.id+": deve existir pelo menos um item de interpretação de dados.");
}
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="line-chart").length>=7,"FQ A deve conter gráficos quantitativos em todos os grandes domínios.");
assert.ok(PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.stimulus?.type==="diagram").length>=7,"FQ A deve conter diagramas científicos em todos os grandes domínios.");
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
  const scoped=PHYSICS_CHEMISTRY_A_ITEMS.filter(item=>item.subtopicId===subtopic.id);
  const scopedCoverage=physicsChemistryCoverage(scoped);
  const mission=buildAdaptivePhysicsChemistryMission(scoped,{subtopicId:subtopic.id,size:7});
  const scopedDiagnostic=buildPhysicsChemistryDiagnostic(scoped);
  assert.equal(mission.items.length,7,subtopic.id+": cada submatéria deve gerar uma sessão específica de 7 perguntas.");
  assert.ok(mission.items.every(item=>item.subtopicId===subtopic.id),subtopic.id+": treino específico não pode misturar outras submatérias.");
  assert.equal(scopedCoverage.missionReady,true,subtopic.id+": uma única submatéria com banco suficiente deve permitir Missão.");
  assert.equal(scopedCoverage.diagnosticReady,true,subtopic.id+": uma única submatéria com banco suficiente deve permitir diagnóstico.");
  assert.equal(scopedDiagnostic.length,8,subtopic.id+": o diagnóstico deve conseguir gerar 8 perguntas apenas nesta submatéria.");
  assert.ok(scopedDiagnostic.every(item=>item.subtopicId===subtopic.id&&item.responseType==="multiple-choice"),subtopic.id+": diagnóstico restrito deve respeitar a submatéria e manter correção determinística.");
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
const stepwise=readFileSync(new URL("../app/components/PhysicsChemistryStepwise.js",import.meta.url),"utf8");
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
assert.match(component,/physicsChemistrySubtopicsForDomain/u,"Treino Livre deve permitir escolher um foco/submatéria dentro do tema.");
assert.match(component,/3\. Em que queres focar-te\?/u,"FQ A deve usar a mesma etapa de foco de Matemática A.");
assert.match(component,/Misturar matéria/u,"O aluno deve poder treinar o domínio inteiro quando a submatéria ainda não tem banco suficiente.");
assert.match(component,/PhysicsChemistryStimulus/u,"A UI deve reutilizar o renderer de estímulos científicos.");
assert.match(component,/buildAdaptivePhysicsChemistryMission\(scopedItems,\{progress,domain,size:7\}\)/u,"Missão deve usar o contrato 7–10.");
assert.match(component,/Mini-exame · Modelo 1/u,"O mini-exame inicial deve continuar identificado como modelo próprio.");
assert.match(component,/Exame Completo · 715/u,"FQ A deve expor o Exame Completo depois de este estar implementado.");
assert.match(component,/PhysicsChemistryStepwiseEditor/u,"FQ A deve suportar problemas por etapas através do componente partilhado.");
assert.match(stepwise,/Resposta construída por etapas/u,"O editor partilhado deve explicar a resposta construída por etapas.");
assert.match(component,/Resposta científica/u,"FQ A deve suportar respostas científicas abertas.");
assert.match(stepwise,/Indicação provisória/u,"A pontuação automática das etapas não pode ser apresentada como nota oficial.");
assert.match(component,/Uma formulação diferente pode estar correta/u,"Respostas abertas devem aceitar formulações cientificamente equivalentes.");
assert.match(learn,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria deve ser estudo passivo.");
assert.match(learn,/Trabalho prático associado nas AE/u,"Rever Matéria deve tornar visível o trabalho prático previsto nas AE.");
assert.doesNotMatch(learn,/Responder|buildAdaptivePhysicsChemistryMission/u,"Rever matéria não deve iniciar treino.");

console.log("✓ FQ A: AE março 2026 · 21 atividades práticas · 43 submatérias · 2145+ itens · tabelas + gráficos + diagramas · ≥14 problemas por etapas · ≥14 respostas abertas · mínimo 7/submatéria · blueprint 715 15+8/4");
