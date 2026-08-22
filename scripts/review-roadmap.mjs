
import assert from "node:assert/strict";
import {minimumReviewRoadmap,reviewRoadmapProgress} from "../app/lib/quality.js";

const empty=minimumReviewRoadmap({},[]);
console.log(`Minimum review roadmap: ${empty.approvalsNeeded} approvals`);
console.log(`Diagnostic after roadmap: ${empty.status.diagnosticReady}/${empty.status.diagnosticTotal}`);
console.log(`Critical focuses after roadmap: ${empty.status.criticalReady}/${empty.status.criticalTarget}`);
console.log(`Exam after roadmap: ${empty.status.examItems}/8 items · ${empty.status.examThemes}/6 themes · ${empty.status.examCognitive}/3 cognitive`);
console.log(`Roadmap reaches GO: ${empty.ready?"yes":"no"}`);

assert.ok(empty.selected.length>0);
assert.equal(empty.selected.length,empty.approvalsNeeded);
assert.equal(new Set(empty.selected.map(x=>x.item.id)).size,empty.selected.length);

const p=reviewRoadmapProgress({},[]);
assert.equal(p.approvalsNeeded,empty.approvalsNeeded);
assert.ok(Number.isFinite(p.estimatedHours));
console.log("✓ review roadmap structural checks passed");
