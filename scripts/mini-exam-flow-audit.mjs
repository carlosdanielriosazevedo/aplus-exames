import assert from "node:assert/strict";
import {TAXONOMY} from "../app/data/content.js";
import {
  CONSTRUCTED_RESPONSE_BANK,COMPLETION_RESPONSE_BANK,
  gradeResponse,isConstructedResponse,isResponseAnswered,
  miniExamPointSummary,examScoreLabel
} from "../app/lib/constructedResponse.js";
import {applyMiniExam,buildMiniExam,emptyScores} from "../app/lib/engine.js";
import {draftScreen,loadSessionDraftStatus,saveSessionDraft} from "../app/lib/sessionDraft.js";
import {claimSessionCompletion,clearCompletionRegistry,wasSessionCompleted} from "../app/lib/reliability.js";

const stored=new Map();
globalThis.localStorage={
  getItem:key=>stored.has(key)?stored.get(key):null,
  setItem:(key,value)=>stored.set(key,String(value)),
  removeItem:key=>stored.delete(key)
};

const state={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{
    schoolYear:"12.º",
    optionalTopics:[],
    taughtSubtopicIds:[
      "12-fcont-limites-continuidade",
      "12-int-integral-definido"
    ]
  }
};

function answerFor(question){
  if(question.response?.type==="choice")return question.a;
  if(question.response?.type==="completion")return Object.fromEntries(question.response.blanks.map(blank=>[blank.id,blank.correct]));
  if(question.response?.type==="stepwise")return question.response.steps.map(step=>step.expected).join("\n");
  if(question.response?.type==="numeric")return String(question.response.value);
  if(question.response?.type==="fraction")return `${question.response.numerator}/${question.response.denominator}`;
  return null;
}

const exam=buildMiniExam(state,12);
assert.equal(exam.length,12,"O Mini-exame deve ter 12 questões elegíveis.");
assert.equal(new Set(exam.map(question=>question.id)).size,12,"Não pode repetir a mesma questão na mesma prova.");
assert.ok(exam.every(question=>TAXONOMY.some(theme=>theme.id===question.themeId)),"Todas as questões devem pertencer à taxonomia de Matemática A.");

const constructed=exam.filter(isConstructedResponse);
const selection=exam.filter(question=>!isConstructedResponse(question));
assert.equal(constructed.length,2,"O Mini-exame deve conter 2 respostas construídas.");
assert.equal(selection.length,10,"O Mini-exame deve conter 10 itens de seleção/completamento.");
assert.equal(constructed.reduce((sum,question)=>sum+question.points,0),70,"As respostas construídas devem valer 70% da cotação.");
assert.equal(selection.reduce((sum,question)=>sum+question.points,0),30,"A seleção/completamento deve valer 30% da cotação.");
assert.equal(exam.reduce((sum,question)=>sum+question.points,0),100,"A prova deve totalizar 100 pontos.");

const completion=COMPLETION_RESPONSE_BANK[0];
if(exam.some(question=>question.id===completion.id)){
  assert.equal(isConstructedResponse(completion),false,"Completamento pertence ao bloco de seleção para a ponderação 30/70.");
  assert.equal(isResponseAnswered(completion,{}),false);
  assert.equal(isResponseAnswered(completion,{a:completion.response.blanks[0].correct}),true);
}

const answers=exam.map(answerFor);
const perfect=miniExamPointSummary(exam,answers);
assert.equal(perfect.maxPoints,100);
assert.equal(perfect.earnedPoints,100);
assert.equal(perfect.score20,20);
assert.equal(perfect.reviewRequired,false);
assert.equal(examScoreLabel(perfect),"20/20");

const blankAnswers=Array(exam.length).fill(null);
const blank=miniExamPointSummary(exam,blankAnswers);
assert.equal(blank.earnedPoints,0);
assert.equal(blank.score20,0);
assert.ok(blank.results.every(result=>result.status==="unanswered"));

const stepwise=CONSTRUCTED_RESPONSE_BANK.find(question=>question.response.steps.some(step=>step.type==="text"));
assert.ok(stepwise,"É necessário pelo menos um item com justificação escrita.");
const uncertain=gradeResponse(stepwise,"Uma resolução escrita que o corretor não consegue certificar automaticamente.");
assert.equal(uncertain.reviewRequired,true,"Texto não verificável automaticamente deve ficar como avaliação incompleta.");
assert.equal(uncertain.status,"needs_review");

const afterUncertain=applyMiniExam(state,[stepwise],["Uma resolução escrita que o corretor não consegue certificar automaticamente."],60);
assert.deepEqual(afterUncertain.scores,state.scores,"Uma resposta não verificada não pode alterar o Domínio do aluno.");
assert.equal(afterUncertain.lastExam.reviewRequired,true);
assert.equal(examScoreLabel(afterUncertain.lastExam),"Avaliação incompleta");

const firstChoiceIndex=exam.findIndex(question=>question.response?.type==="choice");
assert.ok(firstChoiceIndex>=0,"A prova deve conter escolha múltipla.");
const wrong=[...answers];
const choice=exam[firstChoiceIndex];
wrong[firstChoiceIndex]=(choice.a+1)%choice.o.length;
const wrongSummary=miniExamPointSummary(exam,wrong);
assert.equal(wrongSummary.results[firstChoiceIndex].status,"incorrect");
assert.equal(wrongSummary.earnedPoints,97,"Uma escolha múltipla errada deve retirar apenas a respetiva cotação de 3 pontos.");

const sessionId="mini-exam-flow-audit";
const draft={
  kind:"mini_exam",betaMode:"friends_beta",sessionId,screen:"miniExamRun",
  questions:exam,answers:[answers[0],answers[1],answers[2],...Array(9).fill(null)],
  current:3,startedAt:Date.now()-120_000
};
assert.equal(saveSessionDraft(draft),true,"A sessão em curso deve ser guardada.");
const recovered=loadSessionDraftStatus("friends_beta");
assert.equal(recovered.error,false);
assert.equal(recovered.draft.sessionId,sessionId);
assert.equal(recovered.draft.current,3,"A recuperação deve retomar na quarta questão.");
assert.deepEqual(recovered.draft.answers.slice(0,3),answers.slice(0,3),"As respostas anteriores devem sobreviver à recarga.");
assert.equal(draftScreen(recovered.draft),"miniExamRun");

clearCompletionRegistry();
assert.equal(claimSessionCompletion(sessionId),true,"A primeira entrega deve ser aceite.");
assert.equal(wasSessionCompleted(sessionId),true);
assert.equal(claimSessionCompletion(sessionId),false,"Uma segunda entrega da mesma sessão deve ser rejeitada.");

console.log("✓ mini-exam: 12 questões, ponderação 30/70, recuperação, entrega idempotente, revisão final e segurança pedagógica validadas");
