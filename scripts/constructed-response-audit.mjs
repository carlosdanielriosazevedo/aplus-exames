import assert from "node:assert/strict";
import {
  CONSTRUCTED_RESPONSE_BANK,gradeResponse,isConstructedResponse,
  isResponseAnswered,miniExamPointSummary
} from "../app/lib/constructedResponse.js";
import {applyMiniExam,buildMiniExam,emptyScores,trainingQuestions} from "../app/lib/engine.js";

const numeric={id:"test-num",points:35,response:{type:"numeric",value:2.5,tolerance:.01}};
const fraction={id:"test-frac",points:35,response:{type:"fraction",numerator:1,denominator:2}};
assert.equal(gradeResponse(numeric,"2,5").correct,true);
assert.equal(gradeResponse(numeric,"2.504").correct,true);
assert.equal(gradeResponse(numeric,"2,52").correct,false);
assert.equal(gradeResponse(numeric,"dois").reason,"invalid_numeric_format");
assert.equal(gradeResponse(fraction,"2/4").correct,true);
assert.equal(gradeResponse(fraction,"-2/-4").correct,true);
assert.equal(gradeResponse(fraction,"0,5").reason,"invalid_fraction_format");
assert.equal(gradeResponse(fraction,"1/0").correct,false);

assert.equal(CONSTRUCTED_RESPONSE_BANK.length,6);
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.type==="stepwise"));
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.steps.length>=3));
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.steps.reduce((sum,row)=>sum+row.points,0)===q.points));
assert.ok(CONSTRUCTED_RESPONSE_BANK.some(q=>q.response.steps.some(row=>row.type==="text")),"O piloto deve avaliar justificação escrita.");
assert.ok(CONSTRUCTED_RESPONSE_BANK.some(q=>q.response.steps.some(row=>row.type==="expression")),"O piloto deve avaliar expressões intermédias.");

function answerFor(question){
  return {steps:Object.fromEntries(question.response.steps.map(row=>[
    row.id,
    row.type==="numeric"?String(row.value)
      :row.type==="fraction"?`${row.numerator*2}/${row.denominator*2}`
      :row.type==="expression"?row.accepted[0]
      :row.expected
  ]))};
}

const stepwise=CONSTRUCTED_RESPONSE_BANK[0];
const fullStepwise=gradeResponse(stepwise,answerFor(stepwise));
assert.equal(fullStepwise.correct,true);
assert.equal(fullStepwise.points,35);
assert.equal(fullStepwise.stepResults.length,stepwise.response.steps.length);
const firstOnly={steps:{[stepwise.response.steps[0].id]:answerFor(stepwise).steps[stepwise.response.steps[0].id]}};
const partial=gradeResponse(stepwise,firstOnly);
assert.equal(partial.status,"partial");
assert.equal(partial.points,stepwise.response.steps[0].points);
assert.equal(isResponseAnswered(stepwise,{steps:{}}),false);

const state={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{schoolYear:"12.º",optionalTopics:[],taughtSubtopicIds:["12-fcont-limites-continuidade","12-int-integral-definido"]}
};
const exam=buildMiniExam(state,8);
assert.equal(exam.length,8);
assert.equal(exam.filter(isConstructedResponse).length,2);
assert.equal(exam.filter(q=>!isConstructedResponse(q)).length,6);
assert.equal(exam.filter(isConstructedResponse).reduce((sum,q)=>sum+q.points,0),70);
assert.equal(exam.filter(q=>!isConstructedResponse(q)).reduce((sum,q)=>sum+q.points,0),30);

const correctAnswers=exam.map(q=>q.response.type==="choice"?q.a:answerFor(q));
const perfect=miniExamPointSummary(exam,correctAnswers);
assert.deepEqual({earned:perfect.earnedPoints,max:perfect.maxPoints,score:perfect.score20},{earned:100,max:100,score:20});

const mixed=[...correctAnswers];
const partialIndex=exam.findIndex(isConstructedResponse);
const partialQuestion=exam[partialIndex];
mixed[partialIndex]={steps:{[partialQuestion.response.steps[0].id]:answerFor(partialQuestion).steps[partialQuestion.response.steps[0].id]}};
const result=applyMiniExam(state,exam,mixed,900).lastExam;
assert.equal(result.maxPoints,100);
assert.equal(result.earnedPoints,65+partialQuestion.response.steps[0].points);
assert.equal(result.itemResults[partialIndex].status,"partial");
assert.equal(result.elapsedSeconds,900);

const trainingState={...state,profile:{schoolYear:"10.º",optionalTopics:[],taughtSubtopicIds:["10-ele-majorias"]}};
const training=trainingQuestions(trainingState,{themeId:"10-ele",focus:"Métodos de votação",level:"auto"},8);
assert.equal(training.length,8,"O Treino Livre normal não pode terminar ao fim de uma pergunta.");
assert.ok(training.every(q=>q.themeId==="10-ele"));
assert.ok(training.every(q=>!q.generated),"A beta de amigos deve usar apenas perguntas curadas.");

console.log("✓ constructed response v2: 8-question training, one-pass multi-step work, deterministic checkpoints and partial credit validated");
