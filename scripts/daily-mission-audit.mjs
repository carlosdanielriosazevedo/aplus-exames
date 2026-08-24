
import assert from "node:assert/strict";
import {
  emptyDailyMission,ensureDailyMissionAssignment,missionPlanForToday,
  markDailyMissionPromptShown,dismissDailyMissionPrompt,
  dailyMissionPromptDecision,migrateDailyMission
} from "../app/lib/dailyMission.js";
import {emptyEngagement,recordStudyActivity} from "../app/lib/engagement.js";

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

console.log("✓ daily mission: daily assignment, frozen plan, one prompt/day, resume, dismiss and completion suppression validated");
