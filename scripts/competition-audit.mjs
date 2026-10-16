
import assert from "node:assert/strict";
import {
  emptyCompetition,recordCompetitiveActivity,weeklyCompetitiveXp,weekKey,
  demoLeaderboard,leagueProjection,updateCompetitionProfile,scopeAvailability,
  publicRankingFields,applyLeagueOutcome,competitionSummary
} from "../app/lib/competition.js";
import {missionCompletedToday} from "../app/lib/engagement.js";

const at=(y,m,d,h=12)=>new Date(y,m-1,d,h,0,0,0).getTime();

let s={
  xp:999,
  streak:4,
  scores:{secret:{domain:91,conf:88}},
  goal:18,
  profile:{schoolYear:"12.º"},
  competition:emptyCompetition(),
  missionHistory:[]
};

// Week starts on Monday.
assert.equal(weekKey(at(2026,8,17)),"2026-08-17");
assert.equal(weekKey(at(2026,8,23)),"2026-08-17");
assert.equal(weekKey(at(2026,8,24)),"2026-08-24");

// Mission XP is fixed by meaningful completion, not correctness/grade.
s=recordCompetitiveActivity(s,{kind:"mission",subjectId:"math-a",sessionId:"m1",total:3,at:at(2026,8,17)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),50);
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17),"math-a"),50);
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17),"portuguese"),0);

// A second mission on the same day cannot farm ranked XP.
s=recordCompetitiveActivity(s,{kind:"mission",subjectId:"portuguese",sessionId:"m2",total:9,at:at(2026,8,17,18)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),50);
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17),"portuguese"),0);

// Idempotency by session ID.
const before=weeklyCompetitiveXp(s,at(2026,8,17));
s=recordCompetitiveActivity(s,{kind:"mission",subjectId:"math-a",sessionId:"m1",total:3,at:at(2026,8,17)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),before);

// Training rewards attempts/meaningful session, not correct answers.
s=recordCompetitiveActivity(s,{
  kind:"training",subjectId:"portuguese",sessionId:"t1",total:4,focusKey:"portuguese:mc-a",correct:0,at:at(2026,8,18)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),82); // +32
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18),"portuguese"),32);

// Repeating the exact focus loses ranked efficiency.
s=recordCompetitiveActivity(s,{
  kind:"training",subjectId:"portuguese",sessionId:"t2",total:4,focusKey:"portuguese:mc-a",correct:4,at:at(2026,8,18,13)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),104); // +22 (70%)

s=recordCompetitiveActivity(s,{
  kind:"training",subjectId:"portuguese",sessionId:"t3",total:4,focusKey:"portuguese:mc-a",correct:4,at:at(2026,8,18,14)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),117); // +13 (40%)

// A different focus returns to full competitive value.
s=recordCompetitiveActivity(s,{
  kind:"training",subjectId:"physics-chemistry-a",sessionId:"t4",total:4,focusKey:"physics-chemistry-a:mc-b",correct:0,at:at(2026,8,18,15)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),149); // +32
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18),"physics-chemistry-a"),32);

// Mini-exam rewards completion independent of mark and stays in its subject bucket.
s=recordCompetitiveActivity(s,{
  kind:"mini_exam",subjectId:"math-a",sessionId:"e1",total:8,score20:2,at:at(2026,8,19)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,19)),213); // +64
assert.equal(weeklyCompetitiveXp(s,at(2026,8,19),"math-a"),114); // mission 50 + mini 64

// Full Exam: up to 120 XP by answered share, never by mark.
let full={profile:{schoolYear:"12.º"},competition:emptyCompetition()};
full=recordCompetitiveActivity(full,{
  kind:"full_exam",subjectId:"physics-chemistry-a",sessionId:"full-fqa-half",total:20,answered:10,score20:0,at:at(2026,8,20)
});
assert.equal(weeklyCompetitiveXp(full,at(2026,8,20)),60);
assert.equal(weeklyCompetitiveXp(full,at(2026,8,20),"physics-chemistry-a"),60);

// Repeating a Full Exam in the same subject/day cannot farm ranked XP, even through the alias.
full=recordCompetitiveActivity(full,{
  kind:"practice_exam",subjectId:"physics-chemistry-a",sessionId:"full-fqa-repeat",total:20,answered:20,score20:20,at:at(2026,8,20,15)
});
assert.equal(weeklyCompetitiveXp(full,at(2026,8,20)),60);

// A different subject can earn its own Full Exam reward on the same day.
full=recordCompetitiveActivity(full,{
  kind:"practice_exam",subjectId:"portuguese",sessionId:"full-pt",total:20,answered:20,score20:1,at:at(2026,8,20,16)
});
assert.equal(weeklyCompetitiveXp(full,at(2026,8,20)),180);
assert.equal(weeklyCompetitiveXp(full,at(2026,8,20),"portuguese"),120);

// An unanswered Full Exam earns zero; a later meaningful attempt may still become the day's counted attempt.
full=recordCompetitiveActivity(full,{
  kind:"full_exam",subjectId:"math-a",sessionId:"full-math-empty",total:20,answered:0,at:at(2026,8,21)
});
assert.equal(weeklyCompetitiveXp(full,at(2026,8,21),"math-a"),0);
full=recordCompetitiveActivity(full,{
  kind:"full_exam",subjectId:"math-a",sessionId:"full-math-half",total:20,answered:10,at:at(2026,8,21,15)
});
assert.equal(weeklyCompetitiveXp(full,at(2026,8,21),"math-a"),60);

// Legacy activities without a subject stay in the global total and are never invented into a subject bucket.
const legacyAt=at(2026,8,22);
const legacy={
  competition:{...emptyCompetition(),weeks:{[weekKey(legacyAt)]:{xp:40,activities:[{key:"legacy",kind:"training",rankedXp:40,at:legacyAt,day:"2026-08-22"}]}}}
};
assert.equal(weeklyCompetitiveXp(legacy,legacyAt),40);
assert.equal(weeklyCompetitiveXp(legacy,legacyAt,"math-a"),0);
assert.equal(weeklyCompetitiveXp(legacy,legacyAt,"portuguese"),0);

// Subject-filtered leaderboards are deterministic and use only that subject's XP for self.
const fqaBoard1=demoLeaderboard(full,{scope:"league",at:at(2026,8,20),subjectId:"physics-chemistry-a"});
const fqaBoard2=demoLeaderboard(full,{scope:"league",at:at(2026,8,20),subjectId:"physics-chemistry-a"});
assert.deepEqual(fqaBoard1,fqaBoard2);
assert.equal(fqaBoard1.find(row=>row.self)?.xp,60);
const ptBoard=demoLeaderboard(full,{scope:"league",at:at(2026,8,20),subjectId:"portuguese"});
assert.equal(ptBoard.find(row=>row.self)?.xp,120);

// New Monday = new competitive week.
s=recordCompetitiveActivity(s,{
  kind:"training",subjectId:"math-a",sessionId:"t-new",total:4,focusKey:"math-a:mc-a",at:at(2026,8,24)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,24)),32);
assert.equal(weeklyCompetitiveXp(s,at(2026,8,23)),213);

// Mission daily guard is based on calendar day/history.
const withMissionHistory={
  ...s,
  missionHistory:[{at:at(2026,8,24),themeId:"x"}]
};
assert.equal(missionCompletedToday(withMissionHistory,at(2026,8,24,20)),true);
assert.equal(missionCompletedToday(withMissionHistory,at(2026,8,25,10)),false);

// Demo leaderboard is deterministic, contains exactly one self and keeps domain out.
const board1=demoLeaderboard(s,{scope:"league",at:at(2026,8,24)});
const board2=demoLeaderboard(s,{scope:"league",at:at(2026,8,24)});
assert.equal(board1.length,20);
assert.deepEqual(board1,board2);
assert.equal(board1.filter(x=>x.self).length,1);
assert.ok(board1.every(x=>!("domain" in x)&&!("score20" in x)));

// Promotion/demotion projection is deliberately based on global XP, never a subject filter.
const projection=leagueProjection(s,at(2026,8,24));
assert.ok(projection.position>=1&&projection.position<=20);
assert.equal(projection.rows.find(row=>row.self)?.xp,weeklyCompetitiveXp(s,at(2026,8,24)));

// Profile scopes are opt-in.
assert.equal(scopeAvailability(s,"district").available,false);
s=updateCompetitionProfile(s,{
  nickname:"Sigma17",
  region:"Aveiro",
  school:"Escola Demo",
  schoolId:"dgeec-demo",
  districtOptIn:true,
  schoolOptIn:true
});
assert.equal(scopeAvailability(s,"district").available,true);
assert.equal(scopeAvailability(s,"school").available,true);

// Public ranking contract excludes academic data.
const publicFields=publicRankingFields(s);
const publicText=JSON.stringify(publicFields);
assert.ok(!publicText.includes("91"));
assert.ok(!publicText.includes("88"));
assert.ok(!("goal" in publicFields));
assert.ok(!("scores" in publicFields));
assert.equal(publicFields.nickname,"Sigma17");
assert.equal(publicFields.schoolYear,"12.º");

// Public profile input is allowlisted and normalized before it can enter ranking state.
const hardenedProfile=updateCompetitionProfile(s,{
  nickname:"  Sigma17\n ",
  region:"Região inventada",
  school:"\u0000  Escola   Demo  ",
  districtOptIn:"yes",
  schoolOptIn:1,
  secretField:"must-not-survive"
});
assert.equal(hardenedProfile.competition.profile.nickname,"Sigma17");
assert.equal(hardenedProfile.competition.profile.region,null);
assert.equal(hardenedProfile.competition.profile.school,"Escola Demo");
assert.equal(hardenedProfile.competition.profile.districtOptIn,true);
assert.equal(hardenedProfile.competition.profile.schoolOptIn,true);
assert.equal("secretField" in hardenedProfile.competition.profile,false);

// League outcomes: top promotes, bottom demotes, same week idempotent.
let silver={...s,competition:{...s.competition,division:"silver",highestDivision:"silver",history:[]}};
silver=applyLeagueOutcome(silver,{week:"2026-08-17",position:3});
assert.equal(silver.competition.division,"gold");
assert.equal(silver.competition.history.at(-1).outcome,"promoted");

const once=JSON.stringify(silver.competition);
silver=applyLeagueOutcome(silver,{week:"2026-08-17",position:20});
assert.equal(JSON.stringify(silver.competition),once);

silver=applyLeagueOutcome(silver,{week:"2026-08-24",position:20});
assert.equal(silver.competition.division,"silver");
assert.equal(silver.competition.history.at(-1).outcome,"demoted");

// Summary stays explicit about weekly XP, not lifetime XP, and supports a subject view.
const sum=competitionSummary(s,at(2026,8,24));
assert.equal(sum.weekXp,32);
const mathSum=competitionSummary(s,at(2026,8,24),{subjectId:"math-a"});
assert.equal(mathSum.weekXp,32);
assert.equal(mathSum.subjectId,"math-a");
assert.equal(s.xp,999);

console.log("✓ competition: weekly reset, subject filters, Full Exam XP, anti-farming, privacy, leaderboards and global division outcomes validated");
