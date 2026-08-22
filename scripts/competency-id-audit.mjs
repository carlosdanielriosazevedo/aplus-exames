
import assert from "node:assert/strict";
import {
  TAXONOMY,QUESTION_BANK,MICROCOMPETENCIES,MICRO_PREREQUISITES,
  microcompetencyFor,microcompetencyId,microcompetencyLabel
} from "../app/data/content.js";
import {
  emptyScores,focusScore,migratePedagogicalIds,dailyMissionPlan
} from "../app/lib/engine.js";

const ids=MICROCOMPETENCIES.map(x=>x.id);
assert.equal(new Set(ids).size,ids.length,"IDs de microcompetência duplicados.");
assert.ok(ids.length>=60,"Registo de microcompetências inesperadamente pequeno.");

for(const t of TAXONOMY){
  assert.ok(Array.isArray(t.microcompetencies) && t.microcompetencies.length===t.focus.length);
  t.microcompetencies.forEach((mc,i)=>{
    assert.equal(mc.themeId,undefined); // defs are theme-local; flattened registry carries themeId
    assert.equal(mc.label,t.focus[i]);
    assert.equal(microcompetencyId(t.id,mc.label),mc.id);
    assert.equal(microcompetencyFor(t.id,mc.id)?.label,mc.label);
    assert.equal(microcompetencyLabel(mc.id),mc.label);
    // First label is retained as a permanent alias for future copy changes.
    assert.ok((mc.aliases||[]).includes(mc.label));
  });
}

for(const q of QUESTION_BANK){
  assert.ok(q.microcompetencyId,`Questão sem microcompetencyId: ${q.id}`);
  const mc=MICROCOMPETENCIES.find(x=>x.id===q.microcompetencyId);
  assert.ok(mc,`ID desconhecido em ${q.id}: ${q.microcompetencyId}`);
  assert.equal(mc.themeId,q.themeId,`Microcompetência de outro tema em ${q.id}`);
}

for(const [target,deps] of Object.entries(MICRO_PREREQUISITES)){
  assert.ok(ids.includes(target),`Target de pré-requisito inválido: ${target}`);
  for(const dep of deps){
    if(dep.microcompetencyId)assert.ok(ids.includes(dep.microcompetencyId),`Pré-requisito inválido: ${dep.microcompetencyId}`);
  }
}

// Migração de um estado legado: evidência e hipótese só tinham labels.
const sample=QUESTION_BANK.find(q=>q.focus && q.microcompetencyId);
assert.ok(sample);
const scores=emptyScores();
scores[sample.themeId]={
  domain:72,conf:55,
  evidence:[{
    itemId:sample.id,themeId:sample.themeId,focus:sample.focus,
    correct:true,difficulty:sample.difficulty,cognitive:sample.cognitive,
    signature:sample.signature,source:"mission",at:Date.now(),signal:76,strength:1
  }]
};

const legacy={
  scores,
  missionHistory:[{themeId:sample.themeId,focus:sample.focus,at:Date.now()}],
  lastMission:{themeId:sample.themeId,focus:sample.focus},
  freeTrainingSignals:[{themeId:sample.themeId,focus:sample.focus,ratio:.8,at:Date.now(),confirmed:false}],
  learningHypotheses:[{
    key:`${sample.themeId}|${sample.focus}|${sample.themeId}|${sample.focus}`,
    targetThemeId:sample.themeId,targetFocus:sample.focus,
    prerequisiteThemeId:sample.themeId,prerequisiteFocus:sample.focus,
    supportsPrerequisite:1,supportsTarget:0,observations:1,status:"hipótese"
  }]
};

const migrated=migratePedagogicalIds(legacy);
assert.equal(migrated.pedagogicalIdVersion,1);
assert.equal(migrated.scores[sample.themeId].evidence[0].microcompetencyId,sample.microcompetencyId);
assert.equal(migrated.missionHistory[0].microcompetencyId,sample.microcompetencyId);
assert.equal(migrated.freeTrainingSignals[0].microcompetencyId,sample.microcompetencyId);
assert.equal(migrated.learningHypotheses[0].targetMicrocompetencyId,sample.microcompetencyId);

// Stable ID remains authoritative even if an old display label is wrong.
const altered={
  ...migrated,
  scores:{
    ...migrated.scores,
    [sample.themeId]:{
      ...migrated.scores[sample.themeId],
      evidence:migrated.scores[sample.themeId].evidence.map(e=>({...e,focus:"LABEL ANTIGO/ALTERADO"}))
    }
  }
};
const byId=focusScore(altered,sample.themeId,sample.microcompetencyId);
assert.equal(byId.evidence.length,1,"Stable ID deixou de recuperar evidência após mudança de label.");

// A generated mission plan with a specific focus must expose the stable ID too.
const planState={
  goal:17,
  scores:migrated.scores,
  missionHistory:[],
  freeTrainingSignals:[],
  learningHypotheses:[],
  editorialOverrides:{},
  betaMode:"internal",
  profile:{schoolYear:"12.º",examTiming:"thisYear"}
};
const plan=dailyMissionPlan(planState);
if(plan.focus){
  assert.equal(plan.microcompetencyId,microcompetencyId(plan.themeId,plan.focus));
}

console.log(`✓ competency IDs: ${MICROCOMPETENCIES.length} IDs estáveis, ${QUESTION_BANK.length} questões mapeadas e migração legacy validada`);
