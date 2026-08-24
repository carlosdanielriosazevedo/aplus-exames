
import assert from "node:assert/strict";
import {
  emptyProductAnalytics,recordAppOpen,recordMilestone,retentionSummary,
  funnelSummary,activationSummary,productAnalyticsExport,migrateProductAnalytics
} from "../app/lib/productAnalytics.js";
import {aggregateFriendsBetaReports} from "../app/lib/friendsBeta.js";

const at=(y,m,d,h=12)=>new Date(y,m-1,d,h,0,0,0).getTime();

let s={productAnalytics:emptyProductAnalytics()};

// App opens on the same calendar day do not create extra active days.
s=recordAppOpen(s,{at:at(2026,8,20,9),source:"initial_load"});
s=recordAppOpen(s,{at:at(2026,8,20,18),source:"visibility"});
assert.equal(s.productAnalytics.activeDays.length,1);
assert.equal(s.productAnalytics.appOpenCount,2);
assert.equal(s.productAnalytics.firstSeenDay,"2026-08-20");

// D1 is not eligible before a full calendar day has passed.
let r=retentionSummary(s,{now:at(2026,8,20,22)});
assert.equal(r.d1.eligible,false);
assert.equal(r.d1.retained,null);

// Exact D1 return.
s=recordAppOpen(s,{at:at(2026,8,21,16),source:"initial_load"});
r=retentionSummary(s,{now:at(2026,8,21,20)});
assert.equal(r.d1.eligible,true);
assert.equal(r.d1.retained,true);

// No D3 open means a real D3 miss once eligible.
r=retentionSummary(s,{now:at(2026,8,23,20)});
assert.equal(r.d3.eligible,true);
assert.equal(r.d3.retained,false);

// D7 can later be retained independently.
s=recordAppOpen(s,{at:at(2026,8,27,10),source:"initial_load"});
r=retentionSummary(s,{now:at(2026,8,27,20)});
assert.equal(r.d7.eligible,true);
assert.equal(r.d7.retained,true);

// Funnel milestones are once-only and preserve first occurrence.
const firstOnboarding=at(2026,8,20,9,30);
s=recordMilestone(s,"onboarding_started",{source:"welcome"},{at:firstOnboarding});
s=recordMilestone(s,"onboarding_started",{source:"duplicate"},{at:firstOnboarding+10000});
assert.equal(s.productAnalytics.milestones.onboarding_started.at,firstOnboarding);

for(const [type,time] of [
  ["profile_completed",at(2026,8,20,9,31)],
  ["goal_completed",at(2026,8,20,9,32)],
  ["diagnostic_started",at(2026,8,20,9,33)],
  ["diagnostic_completed",at(2026,8,20,9,45)],
  ["first_plan_viewed",at(2026,8,20,9,46)],
  ["first_mission_started",at(2026,8,20,9,47)],
  ["first_mission_completed",at(2026,8,20,9,57)]
]){
  s=recordMilestone(s,type,{}, {at:time});
}

const funnel=funnelSummary(s);
assert.equal(funnel.length,9);
assert.ok(funnel.every(x=>x.reached));
assert.ok(funnel.every(x=>x.validOrder));

const activation=activationSummary(s);
assert.equal(activation.activated,true);
assert.ok(activation.minutesToActivation>=0);

// Export contains pseudonymous behavioural metrics only.
const exported=productAnalyticsExport(s,{now:at(2026,8,27,20)});
assert.equal(exported.schema,"aplus-product-analytics-v1");
assert.equal(exported.retention.d1.retained,true);
assert.equal(exported.retention.d3.retained,false);
assert.equal(exported.retention.d7.retained,true);
assert.equal(exported.activation.activated,true);
assert.ok(!JSON.stringify(exported).toLowerCase().includes("email"));
assert.ok(!JSON.stringify(exported).toLowerCase().includes("password"));

// Aggregate denominator excludes testers who have not yet reached the checkpoint.
function report(code,targetFit,analytics){
  return {
    schema:"aplus-friends-beta-v3",
    participant:{code},
    testerMeta:{targetFit},
    productAnalytics:analytics,
    feedback:[],
    sessions:[],
    summary:{started:0,finished:0},
    contentReports:[]
  };
}

let a={productAnalytics:emptyProductAnalytics()};
a=recordAppOpen(a,{at:at(2026,8,20)});
a=recordAppOpen(a,{at:at(2026,8,21)});
const ar=productAnalyticsExport(a,{now:at(2026,8,22)});

let b={productAnalytics:emptyProductAnalytics()};
b=recordAppOpen(b,{at:at(2026,8,20)});
const br=productAnalyticsExport(b,{now:at(2026,8,22)});

let c={productAnalytics:emptyProductAnalytics()};
c=recordAppOpen(c,{at:at(2026,8,22)});
const cr=productAnalyticsExport(c,{now:at(2026,8,22)});

const agg=aggregateFriendsBetaReports([
  report("A","target",ar),
  report("B","target",br),
  report("C","target",cr)
]);
assert.equal(agg.byFit.target.testers,3);
assert.equal(agg.byFit.target.d1.eligible,2);
assert.equal(agg.byFit.target.d1.retained,1);
assert.equal(agg.byFit.target.d1.rate,50);

// Legacy states migrate to an empty valid analytics model.
const migrated=migrateProductAnalytics({goal:17});
assert.equal(migrated.productAnalytics.version,1);
assert.deepEqual(migrated.productAnalytics.activeDays,[]);

console.log("✓ retention funnel: active days, activation, exact D1/D3/D7 and eligible denominators validated");
