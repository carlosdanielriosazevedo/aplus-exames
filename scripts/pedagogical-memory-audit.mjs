
import assert from "node:assert/strict";
import {
  HYPOTHESIS_STATUS,HYPOTHESIS_STALE_AFTER_DAYS,
  legacyHypothesisStatus,hypothesisStatusLabel,hypothesisIsActive,
  hypothesisNeedsInvestigation,normalizeLearningHypothesis,
  applyHypothesisObservation,resolveHypothesisByMastery,hypothesisView
} from "../app/lib/pedagogicalMemory.js";
import {recordLearningHypothesis} from "../app/lib/engine.js";

const day=24*60*60*1000;
const baseAt=Date.UTC(2026,7,1,12,0,0);

let h={
  key:"target|pre",
  targetThemeId:"fake-target",
  targetFocus:"Alvo",
  prerequisiteThemeId:"fake-pre",
  prerequisiteFocus:"Base",
  supportsPrerequisite:0,
  supportsTarget:0,
  observations:0,
  lifecycleStatus:HYPOTHESIS_STATUS.open,
  openedAt:baseAt,
  lastAt:baseAt,
  history:[]
};

// One observation is a hypothesis, not a conclusion.
h=applyHypothesisObservation(h,"prerequisite_suspected",baseAt);
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.open);
assert.equal(h.recentPrerequisite,1);

// Two consistent independent observations make the prerequisite probable.
h=applyHypothesisObservation(h,"prerequisite_suspected",baseAt+2*day);
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.probablePrerequisite);
assert.equal(hypothesisStatusLabel(h.lifecycleStatus),"Base provável");
assert.equal(hypothesisNeedsInvestigation(h,baseAt+2*day),true);

// Contradictory evidence first weakens certainty, then can make cause ambiguous.
h=applyHypothesisObservation(h,"target_more_likely",baseAt+4*day);
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.probablePrerequisite);
h=applyHypothesisObservation(h,"target_more_likely",baseAt+6*day);
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.ambiguous);

// Strong later mastery can resolve an ambiguous causal hypothesis.
const targetScore={domain:82,conf:70,evidence:[{},{}]};
const prerequisiteScore={domain:78,conf:67,evidence:[{},{}]};
h=resolveHypothesisByMastery(h,{targetScore,prerequisiteScore,at:baseAt+8*day});
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.resolved);
assert.equal(hypothesisIsActive(h,baseAt+8*day),false);
assert.ok(h.resolvedAt);
assert.ok(h.resolutionReason);

// Fresh contradictory/relevant evidence reopens a resolved hypothesis.
const resolvedReopenCount=h.reopenCount||0;
h=applyHypothesisObservation(h,"prerequisite_suspected",baseAt+12*day);
assert.equal(h.lifecycleStatus,HYPOTHESIS_STATUS.open);
assert.equal(h.reopenCount,resolvedReopenCount+1);
assert.equal(h.recentObservations,1);

// An active hypothesis becomes stale after the inactivity horizon.
const staleAt=(h.lastAt||0)+(HYPOTHESIS_STALE_AFTER_DAYS+1)*day;
const stale=normalizeLearningHypothesis(h,staleAt);
assert.equal(stale.lifecycleStatus,HYPOTHESIS_STATUS.stale);
assert.equal(hypothesisIsActive(stale,staleAt),false);
assert.equal(hypothesisNeedsInvestigation(stale,staleAt),false);

// New evidence can reopen a stale hypothesis too.
const reopened=applyHypothesisObservation(stale,"target_more_likely",staleAt+day);
assert.equal(reopened.lifecycleStatus,HYPOTHESIS_STATUS.open);
assert.equal(reopened.recentTarget,1);
assert.ok(reopened.reopenCount>=1);

// Probable target needs target recovery, not prerequisite recovery, to close.
let targetHyp={
  ...h,
  lifecycleStatus:HYPOTHESIS_STATUS.probableTarget,
  status:HYPOTHESIS_STATUS.probableTarget,
  recentTarget:2,recentPrerequisite:0,recentObservations:2,
  lastAt:baseAt+14*day
};
targetHyp=resolveHypothesisByMastery(targetHyp,{
  targetScore:{domain:75,conf:60,evidence:[{},{}]},
  prerequisiteScore:{domain:30,conf:80,evidence:[{},{}]},
  at:baseAt+15*day
});
assert.equal(targetHyp.lifecycleStatus,HYPOTHESIS_STATUS.resolved);

// Weak/uncertain scores cannot magically resolve a hypothesis.
let unresolved={
  ...h,
  lifecycleStatus:HYPOTHESIS_STATUS.probablePrerequisite,
  status:HYPOTHESIS_STATUS.probablePrerequisite,
  lastAt:baseAt+16*day
};
unresolved=resolveHypothesisByMastery(unresolved,{
  targetScore:{domain:80,conf:20,evidence:[{}]},
  prerequisiteScore:{domain:90,conf:20,evidence:[{}]},
  at:baseAt+17*day
});
assert.equal(unresolved.lifecycleStatus,HYPOTHESIS_STATUS.probablePrerequisite);

// Legacy Portuguese statuses migrate without losing meaning.
assert.equal(legacyHypothesisStatus("hipótese"),HYPOTHESIS_STATUS.open);
assert.equal(legacyHypothesisStatus("dificuldade de base provável"),HYPOTHESIS_STATUS.probablePrerequisite);
assert.equal(legacyHypothesisStatus("dificuldade específica provável"),HYPOTHESIS_STATUS.probableTarget);
assert.equal(legacyHypothesisStatus("causa ainda ambígua"),HYPOTHESIS_STATUS.ambiguous);

// Engine integration: old record API now emits lifecycle v2 fields.
const event={
  targetThemeId:"11-fake",
  targetFocus:"Alvo",
  dependency:{themeId:"10-fake",focus:"Base"},
  verdict:{code:"prerequisite_suspected"}
};
let list=recordLearningHypothesis([],event);
assert.equal(list.length,1);
assert.equal(list[0].lifecycleStatus,HYPOTHESIS_STATUS.open);
list=recordLearningHypothesis(list,{...event,at:Date.now()+2*day});
assert.equal(list[0].lifecycleStatus,HYPOTHESIS_STATUS.probablePrerequisite);
assert.ok(Array.isArray(list[0].history));

// Presentation view is explicit about active/closed semantics.
const view=hypothesisView(list[0],Date.now()+2*day);
assert.equal(view.active,true);
assert.equal(view.investigatable,true);
assert.equal(view.label,"Base provável");

console.log("✓ pedagogical memory: open → probable → ambiguous → resolved/stale → reopen lifecycle validated");
