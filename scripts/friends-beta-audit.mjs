
import assert from "node:assert/strict";
import {
  activateFriendsBeta,markFriendsBetaConsent,isFriendsBeta,friendsBetaReport,
  testerSegmentInfo,isTargetStudentTester,aggregateFriendsBetaReports
} from "../app/lib/friendsBeta.js";
import {
  emptyScores,buildMiniExam,trainingQuestions,eligibleCount
} from "../app/lib/engine.js";
import {QUESTION_BANK} from "../app/data/content.js";
import {betaContentReadiness} from "../app/lib/quality.js";
import {
  STORAGE_KEY,FRIENDS_STORAGE_KEY,saveLocalState,loadLocalState,clearLocalState
} from "../app/lib/persistence.js";
import {
  saveSessionDraft,loadSessionDraft,clearSessionDraft
} from "../app/lib/sessionDraft.js";

const memory=new Map();
global.localStorage={
  getItem:k=>memory.has(k)?memory.get(k):null,
  setItem:(k,v)=>memory.set(k,String(v)),
  removeItem:k=>memory.delete(k)
};

const base={
  goal:17,
  xp:0,streak:0,
  scores:emptyScores(),
  diagnosticDone:false,diagnosticAnswers:0,
  missionHistory:[],freeTrainingSignals:[],examHistory:[],
  contentReports:[],editorialOverrides:{},
  betaEvents:[],betaSessions:[],betaFeedback:[],
  betaMode:"internal",
  betaParticipant:{code:null,cohort:"Piloto Matemática A"},
  profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear"},
  learningHypotheses:[]
};

const friend=activateFriendsBeta(base,1000);
assert.equal(friend.betaMode,"friends_beta");
assert.match(friend.betaParticipant.code,/^AMG-[A-Z0-9]{6}$/);
assert.equal(friend.betaTesterMeta.contentStatus,"unreviewed_provisional");
assert.equal(activateFriendsBeta(friend,2000).betaParticipant.code,friend.betaParticipant.code);

const consent=markFriendsBetaConsent(friend,{segment:"student",now:3000});
assert.equal(consent.betaTesterMeta.consentAt,3000);
assert.equal(consent.betaTesterMeta.segment,"student");
assert.equal(testerSegmentInfo("student").group,"target");
assert.equal(isTargetStudentTester(consent),true);
assert.equal(isFriendsBeta(consent),true);

const adult=markFriendsBetaConsent(
  {...base,profile:{...base.profile,schoolYear:"Já terminei o secundário"}},
  {segment:"observer",now:3000}
);
assert.equal(isTargetStudentTester(adult),false);

// Friend beta deliberately exposes curated prototype content while formal closed beta remains gated.
for(const ctx of ["diagnostic","mission","training","exam"]){
  assert.ok(eligibleCount(consent,ctx)>0,`Sem conteúdo em ${ctx}`);
}
assert.equal(betaContentReadiness({},[]).canClosedBeta,false);

// Mini-exam can exercise the UX before teacher review.
const exam=buildMiniExam(consent,8);
assert.equal(exam.length,8);
assert.ok(exam.every(q=>!q.generated),"Beta de amigos não deve usar variantes geradas.");

// Treino also stays on curated questions only.
const trainingSeed=QUESTION_BANK.find(q=>q.contexts?.includes("training"));
assert.ok(trainingSeed);
const training=trainingQuestions(consent,{
  themeId:trainingSeed.themeId,
  focus:trainingSeed.focus,
  level:"auto"
},4);
assert.ok(training.length>0);
assert.ok(training.every(q=>!q.generated),"Treino da beta de amigos gerou conteúdo automaticamente.");

// Reports are pseudonymous and carry tester segmentation.
const targetReport=friendsBetaReport({
  ...consent,
  identity:{displayName:"NOME QUE NÃO PODE SAIR",email:"teste@example.com"},
  betaEvents:[
    {type:"mission_started",at:1},
    {type:"mission_finished",at:2}
  ],
  betaSessions:[{id:"s1",kind:"mission",finishedAt:2,durationSeconds:20}],
  betaFeedback:[{
    id:"f1",clarity:4,difficultyFit:4,usefulness:5,
    personalization:4,returnIntent:5,testerSegment:"student"
  }]
});
const reportText=JSON.stringify(targetReport);
assert.equal(targetReport.schema,"aplus-friends-beta-v3");
assert.equal(targetReport.testerMeta.targetFit,"target");
assert.equal(targetReport.testerMeta.schoolYear,"12.º");
assert.ok(!reportText.includes("teste@example.com"));
assert.ok(!reportText.includes("NOME QUE NÃO PODE SAIR"));

const observerReport=friendsBetaReport({
  ...adult,
  betaParticipant:{...adult.betaParticipant,code:"AMG-OBS001"},
  betaEvents:[
    {type:"diagnostic_started",at:1},
    {type:"diagnostic_finished",at:2}
  ],
  betaSessions:[{id:"s2",kind:"diagnostic",finishedAt:2,durationSeconds:30}],
  betaFeedback:[{
    id:"f2",clarity:5,difficultyFit:3,usefulness:4,
    personalization:3,returnIntent:4,testerSegment:"observer"
  }]
});

const aggregate=aggregateFriendsBetaReports([targetReport,observerReport,{schema:"invalid"}]);
assert.equal(aggregate.validReports,2);
assert.equal(aggregate.rejectedReports,1);
assert.equal(aggregate.byFit.target.testers,1);
assert.equal(aggregate.byFit.observer.testers,1);
assert.equal(aggregate.byFit.target.returnIntent,5);
assert.equal(aggregate.byFit.observer.returnIntent,4);

// Local state is isolated from the developer/student state.
saveLocalState({...base,betaMode:"internal"});
saveLocalState(consent);
assert.ok(memory.has(STORAGE_KEY));
assert.ok(memory.has(FRIENDS_STORAGE_KEY));
assert.notEqual(memory.get(STORAGE_KEY),memory.get(FRIENDS_STORAGE_KEY));

const loadedFriend=loadLocalState(base,emptyScores,FRIENDS_STORAGE_KEY);
assert.equal(loadedFriend.betaMode,"friends_beta");
assert.equal(loadedFriend.betaParticipant.code,consent.betaParticipant.code);

// Active-session drafts are isolated too.
saveSessionDraft({kind:"mission",betaMode:"internal",marker:"normal"});
saveSessionDraft({kind:"mission",betaMode:"friends_beta",marker:"friend"});
assert.equal(loadSessionDraft("internal").marker,"normal");
assert.equal(loadSessionDraft("friends_beta").marker,"friend");
clearSessionDraft("friends_beta");
assert.equal(loadSessionDraft("friends_beta"),null);
assert.equal(loadSessionDraft("internal").marker,"normal");

clearLocalState(FRIENDS_STORAGE_KEY);
assert.equal(memory.has(FRIENDS_STORAGE_KEY),false);
assert.equal(memory.has(STORAGE_KEY),true);

console.log(`✓ friends beta: target/observer segmentation, ${exam.length}-question mini-exam, aggregate reporting and isolated storage validated`);
