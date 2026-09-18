import assert from "node:assert/strict";
import fs from "node:fs";
const status=JSON.parse(fs.readFileSync(new URL("../docs/portuguese-writing-cycle-status.json",import.meta.url),"utf8"));
assert.equal(status.studentLive,false);
assert.equal(status.automaticGrade,false);
assert.equal(status.integrationPending,true);
assert.ok(status.checks.includes("no-auto-grade-contract"));
console.log("Portuguese writing cycle status audit: OK");
