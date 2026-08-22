
import assert from "node:assert/strict";
import {
  buildTeacherReviewPack,serializeSemicolonCsv,parseSemicolonCsv,
  validateTeacherReviewImport,applyTeacherReviewImport
} from "../app/lib/teacherReview.js";
import {betaContentReadiness} from "../app/lib/quality.js";

const rows=buildTeacherReviewPack({},[],{roadmapOnly:true,reviewer:"Prof. Teste"});
assert.ok(rows.length>0);
assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);

const csv=serializeSemicolonCsv(rows);
const parsed=parseSemicolonCsv(csv);
assert.equal(parsed.length,rows.length);
assert.equal(parsed[0].id,rows[0].id);

// Empty decisions are ignored, not invalid.
let v=validateTeacherReviewImport(parsed,{});
assert.equal(v.invalid.length,0);
assert.equal(v.valid.length,0);
assert.equal(v.ignored.length,rows.length);

// One approval missing checklist must be rejected.
const bad=structuredClone(parsed);
bad[0].decision="APROVAR";
bad[0].reviewer="Prof. Teste";
v=validateTeacherReviewImport(bad,{});
assert.equal(v.invalid.length,1);
assert.match(v.invalid[0].reason,/checklist/i);

// Stale version is rejected.
const stale=structuredClone(parsed);
stale[0].decision="BLOQUEAR";
stale[0].reviewer="Prof. Teste";
stale[0].version="999";
v=validateTeacherReviewImport(stale,{});
assert.equal(v.invalid.length,1);
assert.match(v.invalid[0].reason,/Versão desatualizada/i);

// Complete roadmap can be imported atomically.
const complete=structuredClone(parsed);
for(const row of complete){
  row.decision="APROVAR";
  row.reviewer="Prof. Teste";
  row.note="Revisão de teste automatizada";
  for(const key of [
    "check_math","check_clarity","check_unique","check_distractors",
    "check_solution","check_taxonomy","check_difficulty","check_hypothesis"
  ])row[key]="SIM";
}
v=validateTeacherReviewImport(complete,{});
assert.equal(v.invalid.length,0);
assert.equal(v.valid.length,complete.length);
assert.equal(v.canApply,true);

const result=applyTeacherReviewImport({},v,{importId:"test-import"});
assert.equal(result.rejected,false);
assert.equal(result.applied.length,complete.length);
assert.equal(result.overrides[complete[0].id].status,"reviewed");
assert.equal(result.overrides[complete[0].id].reviewSource,"external_csv");
assert.equal(result.overrides[complete[0].id].importId,"test-import");

// The exact exported roadmap is intended to unlock the beta gate.
const readiness=betaContentReadiness(result.overrides,[]);
assert.equal(readiness.canClosedBeta,true);

console.log(`✓ teacher review bridge: ${complete.length} roadmap decisions round-tripped and reached GO`);
