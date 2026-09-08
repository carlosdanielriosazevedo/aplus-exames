import assert from "node:assert/strict";
import {
  CONSTRUCTED_RESPONSE_BANK,gradeResponse,isConstructedResponse,
  isResponseAnswered,miniExamPointSummary
} from "../app/lib/constructedResponse.js";
import {applyMiniExam,buildMiniExam,emptyScores} from "../app/lib/engine.js";

const numeric=CONSTRUCTED_RESPONSE_BANK.find(q=>q.response.type==="numeric");
const fraction=CONSTRUCTED_RESPONSE_BANK.find(q=>q.response.type==="fraction");
assert.ok(numeric&&fraction,"O piloto deve incluir número e fração.");

assert.equal(gradeResponse(numeric,String(numeric.response.value)).correct,true);
assert.equal(gradeResponse({...numeric,response:{...numeric.response,value:2.5}},"2,5").correct,true);
assert.equal(gradeResponse({...numeric,response:{...numeric.response,value:2.5}},"2.5").correct,true);
assert.equal(gradeResponse({...numeric,response:{...numeric.response,value:2.5,tolerance:.01}},"2,504").correct,true);
assert.equal(gradeResponse({...numeric,response:{...numeric.response,value:2.5,tolerance:.01}},"2,52").correct,false);
assert.equal(gradeResponse(numeric,"quatro").reason,"invalid_numeric_format");
assert.equal(gradeResponse(fraction,"2/4").correct,true,"Frações equivalentes devem ser aceites.");
assert.equal(gradeResponse(fraction,"-2/-4").correct,true);
assert.equal(gradeResponse(fraction,"0,5").reason,"invalid_fraction_format","Uma resposta pedida como fração deve treinar a forma exata.");
assert.equal(gradeResponse(fraction,"1/0").correct,false);
assert.equal(isResponseAnswered(numeric,"  "),false);

const state={
  goal:17,xp:0,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores(),
  missionHistory:[],examHistory:[],
  profile:{
    schoolYear:"12.º",optionalTopics:[],
    taughtSubtopicIds:["12-fcont-limites-continuidade","12-int-integral-definido"]
  }
};
const exam=buildMiniExam(state,8);
assert.equal(exam.length,8);
assert.equal(exam.filter(isConstructedResponse).length,2);
assert.equal(exam.filter(q=>!isConstructedResponse(q)).length,6);
assert.equal(exam.filter(isConstructedResponse).reduce((sum,q)=>sum+q.points,0),70);
assert.equal(exam.filter(q=>!isConstructedResponse(q)).reduce((sum,q)=>sum+q.points,0),30);

const correctAnswers=exam.map(q=>q.response.type==="choice"
  ?q.a
  :q.response.type==="numeric"
    ?String(q.response.value).replace(".",",")
    :`${q.response.numerator*2}/${q.response.denominator*2}`
);
const perfect=miniExamPointSummary(exam,correctAnswers);
assert.deepEqual({earned:perfect.earnedPoints,max:perfect.maxPoints,score:perfect.score20},{earned:100,max:100,score:20});

const mixed=[...correctAnswers];
mixed[exam.findIndex(isConstructedResponse)]="";
const result=applyMiniExam(state,exam,mixed,900).lastExam;
assert.equal(result.maxPoints,100);
assert.equal(result.earnedPoints,65);
assert.equal(result.score20,13);
assert.equal(result.itemResults.some(row=>row.status==="unanswered"),true);
assert.equal(result.elapsedSeconds,900);

console.log("✓ constructed response v1: numeric and equivalent fractions, 30/70 weighting, points and legacy-safe result model validated");
