import assert from "node:assert/strict";
import {spawnSync} from "node:child_process";
import {TAXONOMY} from "../app/data/content.js";
import {CURRICULUM_SUBTOPICS,curriculumSubtopicForItem} from "../app/data/curriculumVnext.js";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";
import {diagnosticAnchor,diagnosticProbe,emptyScores} from "../app/lib/engine.js";
import {diagnosticBlueprintForProfile,currentYearSubtopicIds} from "../app/lib/curriculumScope.js";

const generated=spawnSync(process.execPath,["scripts/generate-vnext-diagnostic.mjs","--check"],{encoding:"utf8"});
assert.equal(generated.status,0,generated.stderr||generated.stdout);

assert.equal(VNEXT_DIAGNOSTIC_QUESTIONS.length,CURRICULUM_SUBTOPICS.length*2);
assert.equal(new Set(VNEXT_DIAGNOSTIC_QUESTIONS.map(q=>q.id)).size,VNEXT_DIAGNOSTIC_QUESTIONS.length);

for(const subtopic of CURRICULUM_SUBTOPICS){
  const pair=VNEXT_DIAGNOSTIC_QUESTIONS.filter(q=>q.subtopicId===subtopic.id);
  assert.equal(pair.length,2,subtopic.id);
  assert.deepEqual(new Set(pair.map(q=>q.role)),new Set(["anchor","probe"]),subtopic.id);
  assert.equal(new Set(pair.map(q=>q.signature)).size,2,subtopic.id);
  for(const q of pair){
    assert.equal(q.themeId,subtopic.themeId,q.id);
    assert.deepEqual(q.contexts,["diagnostic"],q.id);
    assert.equal(q.reviewStatus,"prototype",q.id);
    assert.equal(q.productionEligible,false,q.id);
    assert.equal(curriculumSubtopicForItem(q),subtopic.id,q.id);
    assert.ok(q.q&&q.sol&&q.hyp&&q.cognitive&&q.signature,q.id);
    assert.equal(q.o.length,4,q.id);
    assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<q.o.length,q.id);
  }

  const theme=TAXONOMY.find(row=>row.id===subtopic.themeId);
  const schoolYear=subtopic.year.startsWith("12.º")?"12.º":subtopic.year;
  const profile={
    schoolYear,
    optionalTopics:theme.optionalTrack?[theme.optionalTrack]:[],
    taughtSubtopicIds:[subtopic.id]
  };
  const blueprint=diagnosticBlueprintForProfile(profile);
  assert.ok(blueprint.includes(subtopic.id),`${subtopic.id} não entrou no blueprint`);
  const state={profile,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores()};
  assert.equal(diagnosticAnchor(subtopic.id,2,state)?.subtopicId,subtopic.id,`${subtopic.id}: âncora`);
  assert.equal(diagnosticProbe(subtopic.id,state)?.subtopicId,subtopic.id,`${subtopic.id}: probe`);
  assert.equal(diagnosticAnchor(subtopic.id,2,{...state,betaMode:"closed_beta"}),null,`${subtopic.id}: gate humano`);
}

for(const schoolYear of ["10.º","11.º","12.º","Já terminei o secundário"]){
  const profile={schoolYear,optionalTopics:schoolYear==="12.º"?["inferencia"]:[],taughtSubtopicIds:[]};
  profile.taughtSubtopicIds=currentYearSubtopicIds(profile);
  const blueprint=diagnosticBlueprintForProfile(profile);
  assert.ok(blueprint.length>0&&blueprint.length<=7,schoolYear);
  const state={profile,betaMode:"friends_beta",editorialOverrides:{},scores:emptyScores()};
  for(const ref of blueprint){
    assert.ok(diagnosticAnchor(ref,2,state),`${schoolYear}: ${ref} sem âncora`);
    assert.ok(diagnosticProbe(ref,state),`${schoolYear}: ${ref} sem probe`);
  }
}

console.log(`✓ diagnóstico vNext: ${CURRICULUM_SUBTOPICS.length} submatérias cobertas por âncora + aprofundamento; blueprints curtos sem becos sem saída`);
