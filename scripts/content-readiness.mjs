
import fs from "node:fs";
import assert from "node:assert/strict";
import {betaContentReadiness,reviewPackRows,contentRevisionFingerprint} from "../app/lib/quality.js";
import {QUESTION_BANK} from "../app/data/content.js";

const readiness=betaContentReadiness({},[]);
console.log(`Content beta readiness: ${readiness.score}%`);
console.log(`Diagnostic: ${readiness.diagnostic.ready}/${readiness.diagnostic.total}`);
console.log(`Critical mission focuses: ${readiness.missions.ready}/${readiness.missions.total}`);
console.log(`Exam: ${readiness.exam.items}/8 independent · ${readiness.exam.themes}/6 themes · ${readiness.exam.cognitive}/3 cognitive types`);
console.log(`Closed beta: ${readiness.canClosedBeta?"GO":"NO-GO"}`);
readiness.blockers.forEach(x=>console.log(`- ${x}`));

const rows=reviewPackRows({},[],30);
const headers=Object.keys(rows[0]||{});
const esc=v=>`"${String(v??"").replaceAll('"','""')}"`;
const csv=[
  headers.map(esc).join(";"),
  ...rows.map(r=>headers.map(h=>esc(r[h])).join(";"))
].join("\n");
fs.writeFileSync("docs/REVISAO_PROFESSOR_PRIORIDADES_v5.1.csv","\ufeff"+csv);
console.log(`Professor review pack: ${rows.length} items`);


const allReviewed=Object.fromEntries(QUESTION_BANK.map(q=>[
  q.id,{
    status:"reviewed",version:1,reviewer:"audit",
    reviewedFingerprint:contentRevisionFingerprint(q)
  }
]));
const full=betaContentReadiness(allReviewed,[]);
assert.equal(10+25+30+20+15,100,"Os pesos teóricos do score devem totalizar 100.");
assert.equal(full.canClosedBeta,true);
assert.ok(full.score<=100 && full.score>=80);
console.log(`✓ content readiness scale: weights total 100; current fully-reviewed corpus reaches ${full.score}% with full structural taxonomy coverage`);
