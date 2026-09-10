import assert from "node:assert/strict";
import {canonicalPolynomial,equivalentPolynomial} from "../app/lib/polynomial.js";
import {insertMathText} from "../app/lib/mathInput.js";
import {
  CONSTRUCTED_RESPONSE_BANK,COMPLETION_RESPONSE_BANK,gradeResponse,isConstructedResponse,
  isResponseAnswered,miniExamPointSummary,examScoreLabel,stepFeedback
} from "../app/lib/constructedResponse.js";
import {applyMiniExam,buildMiniExam,emptyScores,trainingQuestions,constructedPracticeQuestion} from "../app/lib/engine.js";

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

assert.equal(CONSTRUCTED_RESPONSE_BANK.length,14);
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.type==="stepwise"));
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.steps.length>=3));
assert.ok(CONSTRUCTED_RESPONSE_BANK.every(q=>q.response.steps.reduce((sum,row)=>sum+row.points,0)===q.points));
assert.ok(CONSTRUCTED_RESPONSE_BANK.some(q=>q.response.steps.some(row=>row.type==="text")),"O piloto deve avaliar justificação escrita.");
assert.ok(CONSTRUCTED_RESPONSE_BANK.some(q=>q.response.steps.some(row=>row.type==="expression")),"O piloto deve avaliar expressões intermédias.");
assert.equal(new Set(CONSTRUCTED_RESPONSE_BANK.map(q=>q.focus)).size,14,"Cada pergunta construída deve alargar a cobertura a um foco distinto.");

function answerFor(question){
  if(question.response.type==="completion")return Object.fromEntries(question.response.blanks.map(b=>[b.id,b.correct]));
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

const derivative=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id==="CRV2-11CD-STEPS-1");
const writtenDerivative="f'(x)=3x^2-2\n3*2^2-2\n10";
const writtenGrade=gradeResponse(derivative,writtenDerivative);
assert.equal(equivalentPolynomial("3*x*x-2","-2+3x²"),true);
assert.equal(equivalentPolynomial("(x-3)(x+3)","x²-9"),true);
assert.equal(equivalentPolynomial("x²/2","0,5*x*x"),true);
assert.equal(equivalentPolynomial("-x^2","(-x)^2"),false);
for(const invalid of ["x/x","1/0","x^999","process.exit()","sqrt(x)","2**3","x^2^3"]){assert.equal(canonicalPolynomial(invalid),null);}
assert.deepEqual(insertMathText("f(x)=x",5,6,"x²"),{value:"f(x)=x²",cursor:7});
assert.deepEqual(insertMathText("abc",1,1,"π"),{value:"aπbc",cursor:2});
const equivalentAnswer=gradeResponse(derivative,"f'(x)=-2+3*x*x\n3*2^2-2\nf'(2)=10");
assert.equal(equivalentAnswer.correct,true);
assert.equal(gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3*2²-2=10").correct,true);
const wrongQuantity=gradeResponse(derivative,"f(2)=10");
assert.equal(wrongQuantity.points,0,"f(2) não é f'(2)");
assert.equal(wrongQuantity.reviewRequired,true);
const ambiguous=gradeResponse(stepwise,"3x-12=0\nx=4\nO zero não é 4.");
assert.equal(ambiguous.points,25,"Uma negação não ganha pontos por conter palavras-chave");
assert.equal(ambiguous.pendingPoints,10);
assert.equal(ambiguous.status,"needs_review");
assert.equal(isResponseAnswered(derivative,writtenDerivative),true);
assert.equal(writtenGrade.correct,true,"Uma resolução numa caixa ampla deve ser corrigida por etapas.");
assert.equal(writtenGrade.points,35);

const state={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{schoolYear:"12.º",optionalTopics:[],taughtSubtopicIds:["12-fcont-limites-continuidade","12-int-integral-definido"]}
};
const exam=buildMiniExam(state,8);
const completion=COMPLETION_RESPONSE_BANK[0];
assert.ok(exam.some(q=>q.id===completion.id),"O Mini-exame deve incluir o completamento quando a matéria é elegível.");
assert.equal(isConstructedResponse(completion),false);
assert.equal(gradeResponse(completion,{}).status,"unanswered");
assert.equal(gradeResponse(completion,{a:99}).status,"unanswered");
assert.equal(gradeResponse(completion,{a:1}).points,1.25);
assert.equal(gradeResponse(completion,{a:1,b:0,c:2}).status,"partial");
assert.equal(gradeResponse(completion,answerFor(completion)).points,5);
assert.deepEqual(gradeResponse(completion,JSON.parse(JSON.stringify(answerFor(completion)))),gradeResponse(completion,answerFor(completion)));
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
const uncertainState=applyMiniExam(state,[derivative],["f(2)=10"],60);
assert.deepEqual(uncertainState.scores,state.scores,"Uma correção incerta não altera o domínio");
assert.equal(uncertainState.lastExam.reviewRequired,true);
assert.equal(uncertainState.lastExam.score20Upper,20);
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

const slopeQuestion=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id==="CRV2-10GA-STEPS-1");
const randomGrade=gradeResponse(slopeQuestion,"−†×−³");
assert.equal(randomGrade.points,0);
assert.ok(randomGrade.stepResults.every(row=>row.reason==="no_recognizable_work"));
assert.ok(stepFeedback(randomGrade.stepResults[0]).includes("Não identificámos"));
const arithmetic=gradeResponse(slopeQuestion,"Δy=4−2=2\nΔx=5−1=4\nm=2/4=0,5");
assert.equal(arithmetic.points,28);
const wrongFinal=gradeResponse(derivative,"f'(x)=3x^2-2\nf'(2)=3*2^2-2=11");
assert.equal(wrongFinal.points,23);
assert.equal(wrongFinal.stepResults[2].reason,"calculation_error");
const conflicting=gradeResponse(derivative,"f'(2)=10\nf'(2)=11");
assert.equal(conflicting.stepResults[2].reason,"conflicting_results");
assert.equal(conflicting.stepResults[2].points,0);
assert.equal(examScoreLabel({score20:3.3,score20Upper:17.3,reviewRequired:true}),"Avaliação incompleta");
assert.equal(examScoreLabel({score20:15.5}),"15,5/20");
assert.equal(gradeResponse(slopeQuestion,"").status,"unanswered");
console.log("✓ recognition feedback, explicit arithmetic errors, conflicting results and incomplete score labels");

const practiceCfg={themeId:"10-fun",focus:"Domínio e zeros",level:"auto"};
const guided=constructedPracticeQuestion(state,practiceCfg,"mission");
assert.ok(guided?.practiceOnly);
assert.equal(guided.themeId,practiceCfg.themeId);
assert.equal(constructedPracticeQuestion(state,{...practiceCfg,focus:"Inexistente"},"mission"),null);
assert.equal(constructedPracticeQuestion(state,{...practiceCfg,level:"basic"}),null);
const blockedPractice={...state,editorialOverrides:{[guided.id]:{status:"blocked"}}};
assert.equal(constructedPracticeQuestion(blockedPractice,practiceCfg),null);
assert.equal(constructedPracticeQuestion({...state,betaMode:"closed_beta"},practiceCfg),null);
const mixedTraining=trainingQuestions(state,practiceCfg,8);
assert.equal(mixedTraining.length,8);
assert.equal(mixedTraining.filter(q=>q.practiceOnly).length,1);
assert.deepEqual(state.scores,emptyScores(),"Selection of practice never changes mastery");
console.log("✓ mixed training, guided mission selection, focus, difficulty and editorial gates");

assert.equal(gradeResponse(slopeQuestion,{steps:{deltaY:"Δy=2",deltaX:"Δx=4",slope:"m=1/2"}}).points,28);

for(const question of CONSTRUCTED_RESPONSE_BANK){
  const grade=gradeResponse(question,answerFor(question));
  assert.equal(grade.correct,true,`${question.id} deve aceitar a resposta de referência completa`);
  assert.equal(grade.points,35,`${question.id} deve totalizar 35 pontos`);
}
const finance=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id==="CRV2-10FIN-STEPS-1");
assert.equal(gradeResponse(finance,{steps:{interest:"J=50",capital:"C=1050",conclusion:"Ao fim de um ano, o capital é 1050 €."}}).correct,true);
const probability=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id==="CRV2-12PROB-STEPS-1");
assert.equal(gradeResponse(probability,{steps:{favourable:"3",possible:"5",probability:"6/10",conclusion:probability.response.steps[3].accepted[1]}}).correct,true);
console.log("✓ second-wave reference answers and accepted equivalent formulations");
