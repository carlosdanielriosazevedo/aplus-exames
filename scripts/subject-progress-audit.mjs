import assert from "node:assert/strict";
import {
  advanceSubjectSession,beginSubjectSession,migrateSubjectProgress,
  recordSubjectSession,resetSubjectProgress,subjectProgressFor
} from "../app/lib/subjectProgress.js";

const mathScores={functions:{mastery:.72}};
const legacy={scores:mathScores,diagnosticDone:false,missionHistory:[{id:"math-mission"}]};
let state=migrateSubjectProgress(legacy);
assert.deepEqual(state.scores,mathScores,"A migração não pode alterar resultados de Matemática A.");
assert.equal(state.diagnosticDone,false,"O diagnóstico global legado deve ser preservado.");

const items=[
  {id:"pt-1",domain:"leitura",competencyId:"pt-leitura-informacao"},
  {id:"pt-2",domain:"escrita",competencyId:"pt-escrita-argumentacao"}
];
state=beginSubjectSession(state,{subjectId:"portuguese",kind:"diagnostic",label:"Diagnóstico",items,startedAt:100});
state=advanceSubjectSession(state,"portuguese",{current:1,results:[{status:"final",final:true,correct:true,points:13,maxPoints:13,gradingMode:"deterministic"}],currentResult:{status:"awaiting-rubric",final:false,points:null,maxPoints:13,gradingMode:"rubric-assisted-provisional",rubricId:"pt-2:rubric-v1:test",criteria:[{id:"argumentacao",status:"partial",observations:[{id:"argumentacao-1",status:"observed",studentEvidence:["evidência observada no texto"]},{id:"argumentacao-2",status:"not-observed",studentEvidence:[]}]},{id:"lingua",status:"pending",observations:[{id:"lingua-1",status:"pending"}]}]},currentAnswer:"resposta em curso",updatedAt:110});
assert.equal(subjectProgressFor(state,"portuguese").lastPosition.current,1,"A posição de retoma deve avançar.");
assert.equal(subjectProgressFor(state,"portuguese").lastPosition.currentAnswer,"resposta em curso","A resposta da pergunta atual deve sobreviver a uma interrupção até a sessão terminar.");
assert.deepEqual(subjectProgressFor(state,"portuguese").lastPosition.currentResult.rubricEvidence,[{criterionId:"argumentacao",evidence:"partial"},{criterionId:"lingua",evidence:"pending"}],"A retoma deve preservar a síntese por critério sem guardar a resposta.");
assert.deepEqual(subjectProgressFor(state,"portuguese").lastPosition.currentResult.rubricObservationEvidence,[{criterionId:"argumentacao",observationId:"argumentacao-1",evidence:"observed",studentEvidence:["evidência observada no texto"]},{criterionId:"argumentacao",observationId:"argumentacao-2",evidence:"not-observed",studentEvidence:[]},{criterionId:"lingua",observationId:"lingua-1",evidence:"pending",studentEvidence:[]}],"A retoma deve preservar a evidência atómica e a studentEvidence.");
assert.equal("response" in subjectProgressFor(state,"portuguese").lastPosition.currentResult,false);

state=recordSubjectSession(state,{
  subjectId:"portuguese",kind:"diagnostic",label:"Diagnóstico",items,completedAt:120,
  results:[
    {status:"final",final:true,correct:true,points:13,maxPoints:13,gradingMode:"deterministic"},
    {status:"self-assessed-awaiting-review",final:false,correct:null,points:null,maxPoints:20,gradingMode:"rubric-assisted-provisional",rubricId:"pt-2:rubric-v1:test",rubricCompleted:true,criteria:[{id:"argumentacao",status:"observed",observations:[{id:"argumentacao-1",status:"observed"}]},{id:"lingua",status:"unsure",observations:[{id:"lingua-1",status:"unsure"}]}]}
  ]
});
const portuguese=subjectProgressFor(state,"portuguese");
assert.equal(portuguese.diagnosticDone,true,"O diagnóstico de Português deve ficar concluído.");
assert.equal(portuguese.lastPosition,null,"Uma sessão concluída não deve ficar disponível para retoma.");
assert.equal(portuguese.competence["pt-leitura-informacao"].correct,1);
assert.equal(portuguese.competence["pt-escrita-argumentacao"].pendingRubrics,0,"Uma resposta aberta concluída na autoavaliação deixa de estar pendente.");
assert.equal(portuguese.competence["pt-escrita-argumentacao"].rubricReviews,1,"Uma autoavaliação concluída deve contar como revisão rubricada.");
assert.equal(portuguese.competence["pt-escrita-argumentacao"].rubricNeedsReview,1,"A evidência parcial/duvidosa deve alimentar a necessidade de revisão.");
assert.equal(portuguese.competence["pt-escrita-argumentacao"].points,0,"Respostas abertas não podem receber pontos automáticos.");
assert.equal(state.diagnosticDone,false,"Português não pode concluir o diagnóstico de Matemática A.");
assert.deepEqual(state.scores,mathScores,"Português não pode alterar domínio de Matemática A.");
assert.deepEqual(state.missionHistory,[{id:"math-mission"}],"O histórico global legado de Matemática A deve permanecer intacto.");
assert.equal("response" in portuguese.sessions[0].results[1],false,"O histórico não deve guardar texto livre do aluno.");
assert.deepEqual(portuguese.sessions[0].results[1].rubricEvidence,[{criterionId:"argumentacao",evidence:"observed"},{criterionId:"lingua",evidence:"unsure"}],"A evidência estruturada deve persistir por critério.");
assert.deepEqual(portuguese.sessions[0].results[1].rubricObservationEvidence,[{criterionId:"argumentacao",observationId:"argumentacao-1",evidence:"observed",studentEvidence:[]},{criterionId:"lingua",observationId:"lingua-1",evidence:"unsure",studentEvidence:[]}],"A evidência estruturada deve persistir por observação e a studentEvidence.");
assert.equal(portuguese.sessions[0].results[1].points,null,"A autoavaliação não pode criar pontuação.");

const competenceBeforeTraining=structuredClone(portuguese.competence);
state=recordSubjectSession(state,{
  subjectId:"portuguese",kind:"training",label:"Treino Livre",items:[items[0]],completedAt:130,
  results:[{status:"final",final:true,correct:true,points:13,maxPoints:13,gradingMode:"deterministic"}]
});
assert.deepEqual(subjectProgressFor(state,"portuguese").competence,competenceBeforeTraining,"O Treino Livre deve ficar no histórico sem alterar a evidência académica.");
assert.equal(subjectProgressFor(state,"portuguese").sessions.at(-1).kind,"training");

state={...state,subjectProgress:{...state.subjectProgress,"math-a":{subjectId:"math-a",sessions:[{id:"keep"}]}}};
state=resetSubjectProgress(state,"portuguese");
assert.equal(state.subjectProgress.portuguese,undefined,"A reposição deve apagar apenas Português.");
assert.equal(state.subjectProgress["math-a"].sessions[0].id,"keep","A reposição de Português não pode apagar Matemática A.");
assert.deepEqual(state.scores,mathScores);

console.log("✓ progresso académico isolado por disciplina");
console.log("✓ diagnóstico, competências, retoma e histórico de Português persistem sem texto livre");
console.log("✓ reposição de Português preserva integralmente Matemática A");
