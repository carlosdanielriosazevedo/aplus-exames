
import assert from "node:assert/strict";
import {
  emptyDailyMission,ensureDailyMissionAssignment,missionPlanForToday,
  markDailyMissionPromptShown,dismissDailyMissionPrompt,
  dailyMissionPromptDecision,migrateDailyMission
} from "../app/lib/dailyMission.js";
import {QUESTION_BANK} from "../app/data/content.js";
import {
  emptyScores,applyEvidence,missionStopDecision,isUsefulMissionInteraction,
  missionContentExhaustedDecision,canStartMissionDetour,
  DAILY_MISSION_MIN_INTERACTIONS,DAILY_MISSION_MAX_INTERACTIONS
} from "../app/lib/engine.js";
import {emptyEngagement,recordStudyActivity,localDayKey} from "../app/lib/engagement.js";
import {recordCompetitiveActivity,normalizeCompetition} from "../app/lib/competition.js";
import {saveSessionDraft,loadSessionDraft,clearSessionDraft,draftScreen} from "../app/lib/sessionDraft.js";

const at=(y,m,d,h=12)=>new Date(y,m-1,d,h,0,0,0).getTime();

const planA={type:"priority",themeId:"t1",focus:"Derivadas",reason:"A"};
const planB={type:"priority",themeId:"t2",focus:"Probabilidade",reason:"B"};

let s={
  diagnosticDone:true,
  engagement:emptyEngagement(),
  dailyMission:emptyDailyMission(),
  missionHistory:[]
};

// First Home of the day assigns and presents a mission.
let d=dailyMissionPromptDecision(s,{plan:planA,at:at(2026,8,23)});
assert.equal(d.show,true);
assert.equal(d.mode,"new");

s=ensureDailyMissionAssignment(s,planA,at(2026,8,23));
assert.deepEqual(missionPlanForToday(s,planB,at(2026,8,23)),planA);

// The assignment is frozen for the day even if the fallback engine changes.
s=ensureDailyMissionAssignment(s,planB,at(2026,8,23,18));
assert.deepEqual(missionPlanForToday(s,planB,at(2026,8,23,18)),planA);

// Once shown/dismissed, it doesn't auto-pop again that day.
s=markDailyMissionPromptShown(s,at(2026,8,23));
d=dailyMissionPromptDecision(s,{plan:planB,at:at(2026,8,23,18)});
assert.equal(d.show,false);
assert.equal(d.reason,"already_shown_today");

s=dismissDailyMissionPrompt(s,at(2026,8,23));
assert.equal(s.dailyMission.prompt.lastDismissedDay,"2026-08-23");

// Next day gets a fresh assignment and prompt.
s=ensureDailyMissionAssignment(s,planB,at(2026,8,24));
assert.deepEqual(missionPlanForToday(s,planA,at(2026,8,24)),planB);
d=dailyMissionPromptDecision(s,{plan:planB,at:at(2026,8,24)});
assert.equal(d.show,true);

// A paused Mission becomes a resume modal, not a second Mission.
const paused={kind:"mission",sessionId:"m1",plan:planB};
d=dailyMissionPromptDecision(s,{plan:planA,pausedDraft:paused,at:at(2026,8,24)});
assert.equal(d.show,true);
assert.equal(d.mode,"resume");
assert.equal(d.sessionId,"m1");
assert.deepEqual(d.plan,planB);

// Another paused activity suppresses the Mission popup until it is resolved.
d=dailyMissionPromptDecision(s,{
  plan:planB,
  pausedDraft:{kind:"mini_exam",sessionId:"e1"},
  at:at(2026,8,24)
});
assert.equal(d.show,false);
assert.equal(d.reason,"other_session_paused");

// Once today's Mission is completed, the popup is always suppressed.
let completed={
  ...s,
  missionHistory:[{at:at(2026,8,24,14),themeId:"t2",focus:"Probabilidade"}]
};
completed=recordStudyActivity(completed,{
  kind:"mission",sessionId:"m1",xpEarned:50,at:at(2026,8,24,14)
});
d=dailyMissionPromptDecision(completed,{plan:planB,at:at(2026,8,24,20)});
assert.equal(d.show,false);
assert.equal(d.reason,"mission_done");

// Before diagnostic there is no daily Mission popup.
d=dailyMissionPromptDecision({...s,diagnosticDone:false},{plan:planB,at:at(2026,8,25)});
assert.equal(d.show,false);
assert.equal(d.reason,"diagnostic_not_done");

// Blocked content is never promoted in a modal.
d=dailyMissionPromptDecision(s,{
  plan:{type:"blocked",themeId:null},
  at:at(2026,8,25)
});
assert.equal(d.show,false);

// Legacy state receives the new model safely.
const migrated=migrateDailyMission({diagnosticDone:true});
assert.equal(migrated.dailyMission.version,1);
assert.equal(migrated.dailyMissionModelVersion,1);

const targetItems=[
  {id:"q1",signature:"sig-1",cognitive:"interpret",difficulty:1},
  {id:"q2",signature:"sig-2",cognitive:"apply",difficulty:2},
  {id:"q3",signature:"sig-3",cognitive:"reason",difficulty:3}
];
const stop=(missionType,totalCount,targetCount=totalCount,items=targetItems.slice(0,targetCount))=>missionStopDecision({
  missionType,totalCount,targetCount,beforeConf:20,currentScore:{conf:60},sessionTargetItems:items
});

// Calibração e Missões normais não terminam normalmente após uma ou duas interações.
assert.equal(DAILY_MISSION_MIN_INTERACTIONS,3);
assert.equal(stop("calibration",1).stop,false);assert.equal(stop("calibration",2).stop,false);
assert.equal(stop("calibration",3).code,"calibration_session_complete");
for(const type of ["priority","confirmation","investigation"]){
  assert.equal(stop(type,1).stop,false);assert.equal(stop(type,2).stop,false);
}

// Três interações podem conter apenas duas evidências independentes do alvo (uma é detour).
const twoTargetItems=targetItems.slice(0,2);
const afterDetour=stop("priority",3,2,twoTargetItems);
assert.equal(new Set(twoTargetItems.map(x=>x.signature)).size,2);
assert.equal(afterDetour.stop,false);assert.equal(afterDetour.code,"continue");

// O detour afeta academicamente o pré-requisito, não o alvo errado por associação implícita.
const first=QUESTION_BANK[0],prereq=QUESTION_BANK.find(q=>q.themeId!==first.themeId);
let scores=emptyScores();const untouchedTarget=structuredClone(scores[first.themeId]);
scores={...scores,[prereq.themeId]:applyEvidence(scores[prereq.themeId],prereq,false,"mission")};
assert.deepEqual(scores[first.themeId],untouchedTarget);
assert.equal(scores[prereq.themeId].evidence.at(-1).themeId,prereq.themeId);

// Repetições/quase equivalentes não preenchem o mínimo e continuam com diminishing weight histórico.
const repeated={...first,id:first.id+"-variant"};
assert.equal(isUsefulMissionInteraction(repeated,[],[first.signature]),false);
assert.equal(isUsefulMissionInteraction(first,[first.id],[]),false);
let repeatedScore=applyEvidence(emptyScores()[first.themeId],first,true,"mission");
repeatedScore=applyEvidence(repeatedScore,repeated,true,"mission");
assert.ok(repeatedScore.evidence[1].strength<repeatedScore.evidence[0].strength);
assert.equal(repeatedScore.diagnostics.independentSignatures,1);

// Banco sem outra assinatura termina explicitamente, sem inventar uma interação.
const exhaustedCandidates=[repeated].filter(q=>isUsefulMissionInteraction(q,[],[first.signature]));
assert.equal(exhaustedCandidates.length,0);
assert.equal(missionContentExhaustedDecision().code,"content_exhausted");

// O cap mantém a sessão curta para todos os tipos.
assert.equal(DAILY_MISSION_MAX_INTERACTIONS,5);
for(const type of ["priority","calibration","confirmation","investigation"]){
  const capped=stop(type,DAILY_MISSION_MAX_INTERACTIONS,3,targetItems);
  assert.equal(capped.stop,true);assert.equal(capped.code,"session_cap");
}
assert.equal(canStartMissionDetour(DAILY_MISSION_MAX_INTERACTIONS-1),true);
assert.equal(canStartMissionDetour(DAILY_MISSION_MAX_INTERACTIONS),false);

// Recovery conserva a posição/interações sem criar uma segunda Missão.
const memory=new Map();
global.localStorage={getItem:k=>memory.get(k)??null,setItem:(k,v)=>memory.set(k,String(v)),removeItem:k=>memory.delete(k)};
const pausedMission={kind:"mission",betaMode:"internal",sessionId:"mission-reload",plan:planA,
  current:first,sel:null,fb:null,usedIds:["q1","q2"],usedSignatures:["sig-1","sig-2"],
  targetItems:twoTargetItems,targetCount:2,totalCount:2,pendingError:null,detour:null};
assert.equal(saveSessionDraft(pausedMission),true);
const recovered=loadSessionDraft("internal");
assert.equal(draftScreen(recovered),"mission");assert.equal(recovered.sessionId,"mission-reload");
assert.equal(recovered.totalCount,2);assert.deepEqual(recovered.usedSignatures,["sig-1","sig-2"]);
assert.equal(clearSessionDraft("internal"),true);

// XP, streak e XP competitivo permanecem idempotentes por sessionId.
const activityAt=at(2026,8,25,14),activity={kind:"mission",sessionId:"mission-idempotent",xpEarned:75,at:activityAt};
let activityState={engagement:emptyEngagement(),competition:null,streak:0};
activityState=recordStudyActivity(activityState,activity);activityState=recordStudyActivity(activityState,activity);
const activityDay=activityState.engagement.days[localDayKey(activityAt)];
assert.equal(activityDay.xp,75);assert.equal(activityDay.activities.mission,1);assert.equal(activityState.engagement.streak,1);
activityState=recordCompetitiveActivity(activityState,{kind:"mission",sessionId:"mission-idempotent",total:3,at:activityAt});
activityState=recordCompetitiveActivity(activityState,{kind:"mission",sessionId:"mission-idempotent",total:3,at:activityAt});
const competition=normalizeCompetition(activityState),week=Object.values(competition.weeks)[0];
assert.equal(week.activities.filter(x=>x.kind==="mission").length,1);assert.equal(week.xp,50);

console.log("✓ daily mission: assignment, 3–5 useful interactions, content exhaustion, detour, recovery and idempotency validated");
