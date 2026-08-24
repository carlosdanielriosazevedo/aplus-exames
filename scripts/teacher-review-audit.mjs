
import assert from "node:assert/strict";
import {
  buildTeacherReviewPack,buildTeacherReviewBatches,teacherReviewOperationsSummary,
  serializeSemicolonCsv,parseSemicolonCsv,validateTeacherReviewImport,
  applyTeacherReviewImport,teacherReviewQcQueue,TEACHER_REVIEW_SCHEMA
} from "../app/lib/teacherReview.js";
import {
  betaContentReadiness,effectiveReviewStatus,editorialReviewIntegrity,
  contentRevisionFingerprint
} from "../app/lib/quality.js";
import {QUESTION_BANK} from "../app/data/content.js";

const rows=buildTeacherReviewPack({},[],{roadmapOnly:true,reviewer:"Prof. Teste"});
assert.ok(rows.length>0);
assert.equal(rows.length,64,"O caminho mínimo v5.2 esperado deve ter 64 questões.");
assert.equal(new Set(rows.map(x=>x.id)).size,rows.length);
assert.ok(rows.every(x=>x.schema===TEACHER_REVIEW_SCHEMA));
assert.ok(rows.every(x=>x.schema==="teacher-review-v2"));
assert.ok(rows.every(x=>x.pack_id));
assert.ok(rows.every(x=>x.batch_id));
assert.ok(rows.every(x=>x.content_fingerprint?.startsWith("cr1-")));

// O mesmo conteúdo deve produzir o mesmo pack ID.
const rowsAgain=buildTeacherReviewPack({},[],{roadmapOnly:true,reviewer:"Outro Professor"});
assert.equal(rows[0].pack_id,rowsAgain[0].pack_id);

// O roteiro operacional é dividido em 8 lotes de 8 e o último projeta GO.
const ops=buildTeacherReviewBatches({},[],{batchSize:8,reviewer:"Prof. Teste"});
assert.equal(ops.approvalsNeeded,64);
assert.equal(ops.batches.length,8);
assert.ok(ops.batches.every(x=>x.count===8));
assert.equal(ops.batches.at(-1).projected.canClosedBeta,true);
assert.equal(ops.batches.at(-1).projected.readinessScore>=80,true);
assert.equal(new Set(ops.batches.flatMap(x=>x.itemIds)).size,64);
assert.ok(ops.batches.every(x=>x.packId===ops.packId));
assert.ok(ops.batches.every(x=>x.rows.every(r=>r.pack_id===ops.packId && r.batch_id===x.id)));

const summary=teacherReviewOperationsSummary({},[]);
assert.equal(summary.remainingBatches,8);
assert.equal(summary.staleApprovals,0);

// CSV round trip.
const csv=serializeSemicolonCsv(rows);
const parsed=parseSemicolonCsv(csv);
assert.equal(parsed.length,rows.length);
assert.equal(parsed[0].id,rows[0].id);
assert.equal(parsed[0].content_fingerprint,rows[0].content_fingerprint);

// Empty decisions are ignored, not invalid.
let v=validateTeacherReviewImport(parsed,{});
assert.equal(v.invalid.length,0);
assert.equal(v.conflicts.length,0);
assert.equal(v.valid.length,0);
assert.equal(v.ignored.length,rows.length);

// Approval missing checklist is rejected.
const bad=structuredClone(parsed);
bad[0].decision="APROVAR";
bad[0].reviewer="Prof. Teste";
v=validateTeacherReviewImport(bad,{});
assert.equal(v.invalid.length,1);
assert.match(v.invalid[0].reason,/checklist/i);

// Stale manual version is rejected.
const staleVersion=structuredClone(parsed);
staleVersion[0].decision="BLOQUEAR";
staleVersion[0].reviewer="Prof. Teste";
staleVersion[0].version="999";
v=validateTeacherReviewImport(staleVersion,{});
assert.equal(v.invalid.length,1);
assert.match(v.invalid[0].reason,/Versão desatualizada/i);

// More importantly, changed content is rejected even if version number was not bumped.
const staleFingerprint=structuredClone(parsed);
staleFingerprint[0].decision="BLOQUEAR";
staleFingerprint[0].reviewer="Prof. Teste";
staleFingerprint[0].content_fingerprint="cr1-deadbeef";
v=validateTeacherReviewImport(staleFingerprint,{});
assert.equal(v.invalid.length,1);
assert.match(v.invalid[0].reason,/fingerprint|Conteúdo alterado/i);

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
assert.equal(v.conflicts.length,0);
assert.equal(v.valid.length,complete.length);
assert.equal(v.canApply,true);

const result=applyTeacherReviewImport({},v,{importId:"test-import"});
assert.equal(result.rejected,false);
assert.equal(result.applied.length,complete.length);
assert.equal(result.overrides[complete[0].id].status,"reviewed");
assert.equal(result.overrides[complete[0].id].reviewSource,"external_csv");
assert.equal(result.overrides[complete[0].id].importId,"test-import");
assert.equal(
  result.overrides[complete[0].id].reviewedFingerprint,
  complete[0].content_fingerprint
);

// The exact exported roadmap unlocks the beta gate.
const readiness=betaContentReadiness(result.overrides,[]);
assert.equal(readiness.canClosedBeta,true);

// A content edit after approval invalidates it automatically even when version stays 1.
const original=QUESTION_BANK.find(q=>q.id===complete[0].id);
const changed={...original,q:`${original.q} `+"[alteração editorial]"};
const integrity=editorialReviewIntegrity(changed,result.overrides);
assert.equal(integrity.stale,true);
assert.equal(effectiveReviewStatus(changed,result.overrides),"pending");
assert.notEqual(contentRevisionFingerprint(changed),result.overrides[complete[0].id].reviewedFingerprint);

// A contradictory second decision never silently overwrites an approved item.
const contradiction=[structuredClone(complete[0])];
contradiction[0].decision="BLOQUEAR";
contradiction[0].reviewer="Prof. Segunda";
v=validateTeacherReviewImport(contradiction,result.overrides);
assert.equal(v.conflicts.length,1);
assert.equal(v.canApply,false);
const rejected=applyTeacherReviewImport(result.overrides,v,{importId:"conflict"});
assert.equal(rejected.rejected,true);
assert.equal(rejected.overrides[complete[0].id].status,"reviewed");

// A second independent APPROVE on the same fingerprint is treated as quality control.
const qcRows=[structuredClone(complete[0])];
qcRows[0].reviewer="Prof. Segunda";
v=validateTeacherReviewImport(qcRows,result.overrides);
assert.equal(v.invalid.length,0);
assert.equal(v.conflicts.length,0);
assert.equal(v.valid.length,1);
assert.equal(v.valid[0].qualityControl,true);
const qcResult=applyTeacherReviewImport(result.overrides,v,{importId:"qc-confirm"});
assert.equal(qcResult.rejected,false);
assert.equal(qcResult.overrides[complete[0].id].status,"reviewed");
assert.equal(qcResult.overrides[complete[0].id].qualityControlCount,1);

// Deterministic QC queue samples only approved/integrity-valid items.
const qcQueue=teacherReviewQcQueue(result.overrides,{rate:0.10,limit:30});
assert.ok(qcQueue.length>=1);
assert.ok(qcQueue.length<=30);
assert.ok(qcQueue.every(x=>x.integrity.valid));
assert.ok(qcQueue.every(x=>effectiveReviewStatus(x.item,result.overrides)==="reviewed"));

console.log(`✓ teacher review ops: ${complete.length} approvals · 8 batches · fingerprints · stale invalidation · conflict lock · QC validated`);
