import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import {QUESTION_BANK} from "../app/data/content.js";
import {VNEXT_PILOT_META,VNEXT_PILOT_QUESTIONS} from "../app/data/vnextPilot.js";
import {curriculumSubtopicForItem} from "../app/data/curriculumVnext.js";
import {RUNTIME_QUESTION_BANK,eligibleQuestions,questionById} from "../app/lib/engine.js";
import {isEligibleForContext} from "../app/lib/quality.js";

const SPECS={
  "10-fun-dominio-imagem-zeros":{
    sourceFile:"content/vnext/math-a/10/10-fun-dominio-imagem-zeros.json",
    microcompetencyId:"mc-10-fun-dominio-e-zeros"
  },
  "10-ga-vetores":{
    sourceFile:"content/vnext/math-a/10/10-ga-vetores.json",
    microcompetencyId:"mc-10-ga-vetores"
  }
};

assert.deepEqual(VNEXT_PILOT_META.map(row=>row.subtopicId).sort(),Object.keys(SPECS).sort());
assert.equal(VNEXT_PILOT_QUESTIONS.length,100);
assert.equal(new Set(VNEXT_PILOT_QUESTIONS.map(q=>q.id)).size,100);
assert.equal(RUNTIME_QUESTION_BANK.length,QUESTION_BANK.length+100);

for(const meta of VNEXT_PILOT_META){
  const spec=SPECS[meta.subtopicId];
  assert.ok(spec);
  assert.equal(meta.sourceFile,spec.sourceFile);
  const raw=fs.readFileSync(spec.sourceFile,"utf8");
  assert.equal(crypto.createHash("sha256").update(raw).digest("hex"),meta.sourceSha256);
  const source=JSON.parse(raw);
  const pilot=VNEXT_PILOT_QUESTIONS.filter(q=>q.subtopicId===meta.subtopicId);
  assert.equal(source.questions.length,50);
  assert.equal(pilot.length,50);
  assert.deepEqual(pilot.map(q=>{
    const {microcompetencyId,pilotStatus,productionEligible,...original}=q;
    assert.equal(microcompetencyId,spec.microcompetencyId);
    assert.equal(pilotStatus,"machine_prechecked");
    assert.equal(productionEligible,false);
    return original;
  }),source.questions);
}

for(const q of VNEXT_PILOT_QUESTIONS){
  assert.equal(q.reviewStatus,"prototype");
  assert.equal(curriculumSubtopicForItem(q),q.subtopicId);
  assert.ok(!q.contexts.includes("diagnostic"));
  assert.equal(q.o.length,4);
  assert.equal(new Set(q.o).size,4);
  assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4);
  assert.ok(String(q.sol).trim().length>=5);
  assert.ok(!/\b(item|quest[aã]o|caso|problema) anterior\b/i.test(q.q));
  assert.equal(isEligibleForContext(q,"mission",{},"internal"),true);
  assert.equal(isEligibleForContext(q,"mission",{},"friends_beta"),true);
  assert.equal(isEligibleForContext(q,"mission",{},"closed_beta"),false);
  assert.equal(isEligibleForContext(q,"mission",{},"production"),false);
  assert.equal(questionById(q.id)?.id,q.id);
}

const profile={schoolYear:"10.º",optionalTopics:[],taughtSubtopicIds:["10-fun-dominio-imagem-zeros"]};
const friends={profile,betaMode:"friends_beta",editorialOverrides:{}};
const funMission=eligibleQuestions(friends,"10-fun","mission");
assert.ok(funMission.some(q=>q.id.startsWith("VN10FUN-DIZ-")));
assert.ok(funMission.every(q=>curriculumSubtopicForItem(q)==="10-fun-dominio-imagem-zeros"));
assert.equal(eligibleQuestions({...friends,profile:{...profile,taughtSubtopicIds:[]}},"10-fun","mission").length,0);
assert.equal(eligibleQuestions({...friends,betaMode:"production"},"10-fun","mission").some(q=>q.id.startsWith("VN10FUN-DIZ-")),false);

console.log("✓ vNext pilot: 100 itens sincronizados; scope fechado; protótipos só em modos interno/amigos; produção bloqueada");
