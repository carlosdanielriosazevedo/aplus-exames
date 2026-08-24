
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
s=recordCompetitiveActivity(s,{kind:"mission",sessionId:"m1",total:3,at:at(2026,8,17)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),50);

// A second mission on the same day cannot farm ranked XP.
s=recordCompetitiveActivity(s,{kind:"mission",sessionId:"m2",total:9,at:at(2026,8,17,18)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),50);

// Idempotency by session ID.
const before=weeklyCompetitiveXp(s,at(2026,8,17));
s=recordCompetitiveActivity(s,{kind:"mission",sessionId:"m1",total:3,at:at(2026,8,17)});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,17)),before);

// Training rewards attempts/meaningful session, not correct answers.
s=recordCompetitiveActivity(s,{
  kind:"training",sessionId:"t1",total:4,focusKey:"mc-a",correct:0,at:at(2026,8,18)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),82); // +32

// Repeating the exact focus loses ranked efficiency.
s=recordCompetitiveActivity(s,{
  kind:"training",sessionId:"t2",total:4,focusKey:"mc-a",correct:4,at:at(2026,8,18,13)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),104); // +22 (70%)

s=recordCompetitiveActivity(s,{
  kind:"training",sessionId:"t3",total:4,focusKey:"mc-a",correct:4,at:at(2026,8,18,14)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),117); // +13 (40%)

// A different focus returns to full competitive value.
s=recordCompetitiveActivity(s,{
  kind:"training",sessionId:"t4",total:4,focusKey:"mc-b",correct:0,at:at(2026,8,18,15)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,18)),149); // +32

// Mini-exam rewards completion independent of mark.
s=recordCompetitiveActivity(s,{
  kind:"mini_exam",sessionId:"e1",total:8,score20:2,at:at(2026,8,19)
});
assert.equal(weeklyCompetitiveXp(s,at(2026,8,19)),213); // +64

// New Monday = new competitive week.
s=recordCompetitiveActivity(s,{
  kind:"training",sessionId:"t-new",total:4,focusKey:"mc-a",at:at(2026,8,24)
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

const projection=leagueProjection(s,at(2026,8,24));
assert.ok(projection.position>=1&&projection.position<=20);

// Profile scopes are opt-in.
assert.equal(scopeAvailability(s,"district").available,false);
s=updateCompetitionProfile(s,{
  nickname:"Sigma17",
  region:"Aveiro",
  school:"Escola Demo",
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

// Summary stays explicit about weekly XP, not lifetime XP.
const sum=competitionSummary(s,at(2026,8,24));
assert.equal(sum.weekXp,32);
assert.equal(s.xp,999);

console.log("✓ competition: weekly reset, anti-farming, one mission/day, privacy, leaderboards and division outcomes validated");
