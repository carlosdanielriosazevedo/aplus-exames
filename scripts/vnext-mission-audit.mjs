import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {TAXONOMY} from "../app/data/content.js";
import {CURRICULUM_SUBTOPICS,curriculumSubtopicForItem} from "../app/data/curriculumVnext.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";
import {VNEXT_MISSION_QUESTIONS} from "../app/data/vnextMission.js";
import {
  DAILY_MISSION_MIN_INTERACTIONS,DAILY_MISSION_MAX_INTERACTIONS,
  DAILY_MISSION_MIN_SECONDS,DAILY_MISSION_MAX_SECONDS,
  eligibleQuestions,emptyScores,estimateMissionSeconds,missionStopDecision,selectQuestionForPlan
} from "../app/lib/engine.js";

const generated=spawnSync(process.execPath,["scripts/generate-vnext-mission.mjs","--check"],{encoding:"utf8"});
assert.equal(generated.status,0,generated.stderr||generated.stdout);
assert.equal(DAILY_MISSION_MIN_INTERACTIONS,5);
assert.equal(DAILY_MISSION_MAX_INTERACTIONS,10);
assert.equal(DAILY_MISSION_MIN_SECONDS,180);
assert.equal(DAILY_MISSION_MAX_SECONDS,300);
assert.equal(VNEXT_MISSION_QUESTIONS.length,CURRICULUM_SUBTOPICS.length*7);
assert.equal(new Set(VNEXT_MISSION_QUESTIONS.map(q=>q.id)).size,VNEXT_MISSION_QUESTIONS.length);

const diagnosticSources=new Set(VNEXT_DIAGNOSTIC_QUESTIONS.map(q=>q.sourceQuestionId));
for(const subtopic of CURRICULUM_SUBTOPICS){
  const rows=VNEXT_MISSION_QUESTIONS.filter(q=>q.subtopicId===subtopic.id);
  assert.equal(rows.length,7,subtopic.id);
  assert.equal(new Set(rows.map(q=>q.signature)).size,7,subtopic.id);
  assert.ok(rows.every(q=>!diagnosticSources.has(q.sourceQuestionId)),`${subtopic.id}: repetição do diagnóstico`);
  for(const q of rows){
    assert.equal(q.themeId,subtopic.themeId,q.id);
    assert.equal(curriculumSubtopicForItem(q),subtopic.id,q.id);
    assert.deepEqual(q.contexts,["mission"],q.id);
    assert.equal(q.reviewStatus,"prototype",q.id);
    assert.equal(q.productionEligible,false,q.id);
    assert.ok(estimateMissionSeconds(q)>=22&&estimateMissionSeconds(q)<=90,q.id);
  }

  const theme=TAXONOMY.find(row=>row.id===subtopic.themeId);
  const profile={
    schoolYear:subtopic.year.startsWith("12.º")?"12.º":subtopic.year,
    optionalTopics:theme.optionalTrack?[theme.optionalTrack]:[],
    taughtSubtopicIds:[subtopic.id]
  };
  const state={profile,goal:16,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores()};
  assert.ok(eligibleQuestions(state,subtopic.themeId,"mission").filter(q=>curriculumSubtopicForItem(q)===subtopic.id).length>=7,subtopic.id);

  const plan={type:"calibration",themeId:subtopic.themeId,focus:subtopic.label};
  const usedIds=[],usedSignatures=[],items=[];let seconds=0,decision=null;
  for(let count=1;count<=DAILY_MISSION_MAX_INTERACTIONS;count++){
    const item=selectQuestionForPlan(state,plan,usedIds,usedSignatures);
    assert.ok(item,`${subtopic.id}: conteúdo esgotado na pergunta ${count}`);
    usedIds.push(item.id);usedSignatures.push(item.signature);items.push(item);seconds+=estimateMissionSeconds(item);
    decision=missionStopDecision({missionType:"calibration",targetCount:count,totalCount:count,beforeConf:0,currentScore:{conf:20},sessionTargetItems:items,estimatedSeconds:seconds});
    if(count<DAILY_MISSION_MIN_INTERACTIONS)assert.equal(decision.stop,false,`${subtopic.id}: terminou com ${count}`);
    if(decision.stop){assert.ok(count>=5&&count<=10,subtopic.id);break}
  }
  assert.equal(decision?.stop,true,`${subtopic.id}: não terminou dentro do limite`);
}

console.log(`✓ Missões vNext: 113 submatérias · 7 perguntas independentes cada · nunca menos de 5 · orçamento de 3–5 min`);
