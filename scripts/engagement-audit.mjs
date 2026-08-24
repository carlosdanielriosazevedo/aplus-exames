
import assert from "node:assert/strict";
import {
  emptyEngagement,recordStudyActivity,engagementSummary,effectiveStreak,
  localDayKey,dayGap,migrateEngagement
} from "../app/lib/engagement.js";

const at=(y,m,d,h=12)=>new Date(y,m-1,d,h,0,0,0).getTime();

const base={xp:0,streak:0,engagement:emptyEngagement()};

// First completed study session starts, but does not inflate, the streak.
let s=recordStudyActivity(base,{
  kind:"training",xpEarned:20,sessionId:"train-1",at:at(2026,8,20)
});
let sum=engagementSummary(s,at(2026,8,20,18));
assert.equal(sum.streak,1);
assert.equal(sum.xpToday,20);
assert.equal(sum.dailyGoalComplete,false);
assert.equal(s.xp,0,"Engagement must not mutate total XP.");
assert.equal(sum.activeDays,1);

// Same day activity does not increment streak.
s=recordStudyActivity(s,{
  kind:"training",xpEarned:40,sessionId:"train-2",at:at(2026,8,20,18)
});
sum=engagementSummary(s,at(2026,8,20,20));
assert.equal(sum.streak,1);
assert.equal(sum.xpToday,60);
assert.equal(sum.dailyGoalComplete,true);
assert.equal(sum.goalDays,1);

// Idempotent by session/activity ID.
const before=JSON.stringify(s.engagement);
s=recordStudyActivity(s,{
  kind:"training",xpEarned:40,sessionId:"train-2",at:at(2026,8,20,18)
});
assert.equal(JSON.stringify(s.engagement),before);

// Next calendar day increments exactly once even with 0 XP: streak rewards study habit, not correctness.
s=recordStudyActivity(s,{
  kind:"training",xpEarned:0,sessionId:"train-3",at:at(2026,8,21)
});
sum=engagementSummary(s,at(2026,8,21,18));
assert.equal(sum.streak,2);
assert.equal(sum.dailyGoalComplete,false);
assert.equal(sum.activeDays,2);

// Mission completion immediately completes the daily goal, independently of question count/score.
s=recordStudyActivity(s,{
  kind:"mission",xpEarned:25,sessionId:"mission-1",at:at(2026,8,21,19)
});
sum=engagementSummary(s,at(2026,8,21,20));
assert.equal(sum.streak,2);
assert.equal(sum.dailyGoalComplete,true);
assert.equal(sum.goalDays,2);

// Missing a full calendar day resets the next active streak.
s=recordStudyActivity(s,{
  kind:"mini_exam",xpEarned:54,sessionId:"exam-1",at:at(2026,8,23)
});
sum=engagementSummary(s,at(2026,8,23,18));
assert.equal(sum.streak,1);
assert.equal(sum.longestStreak,2);
assert.equal(sum.dailyGoalComplete,true);

// Opening the app after >1 inactive day shows an expired streak before another session is done.
assert.equal(effectiveStreak(s,at(2026,8,25,12)),0);

// Diagnostic is meaningful study and completes the daily objective.
let d={xp:0,streak:0,engagement:emptyEngagement()};
d=recordStudyActivity(d,{
  kind:"diagnostic",xpEarned:0,sessionId:"diag-1",at:at(2026,8,20)
});
assert.equal(engagementSummary(d,at(2026,8,20)).dailyGoalComplete,true);

// Calendar day helper is robust to time within a day.
assert.equal(localDayKey(at(2026,8,20,1)),localDayKey(at(2026,8,20,23)));
assert.equal(dayGap("2026-08-20","2026-08-21"),1);
assert.equal(dayGap("2026-08-20","2026-08-23"),3);

// Legacy mission-count streak is deliberately not treated as a valid daily streak.
const migrated=migrateEngagement({xp:500,streak:9});
assert.equal(migrated.streak,0);
assert.equal(migrated.engagement.legacyMissionStreak,9);
assert.equal(migrated.engagementModelVersion,1);

console.log("✓ engagement: daily streak, XP goal, mission goal, idempotency, reset and legacy migration validated");
