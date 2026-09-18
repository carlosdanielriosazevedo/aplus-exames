import assert from "node:assert/strict";
import fs from "node:fs";

const required=[
  "app/lib/portugueseWritingCycle.js",
  "app/components/PortugueseWritingCycleSummary.js",
  "app/portuguese-writing-cycle.css",
  "app/lib/portugueseWritingCycleScenarios.js",
  "scripts/portuguese-writing-cycle-audit.mjs",
  "scripts/portuguese-writing-cycle-ui-audit.mjs",
  "scripts/portuguese-writing-cycle-contract-audit.mjs",
  "scripts/portuguese-writing-cycle-scenarios-audit.mjs",
  "scripts/portuguese-writing-cycle-boundary-audit.mjs"
];
for(const path of required)assert.ok(fs.existsSync(new URL(`../${path}`,import.meta.url)),`em falta: ${path}`);

const engine=fs.readFileSync(new URL("../app/lib/portugueseWritingCycle.js",import.meta.url),"utf8");
assert.match(engine,/writingRevisionNextStep/u);
assert.match(engine,/writingCycleSummary/u);
assert.doesNotMatch(engine,/score\s*[:=]|grade\s*[:=]|percentage\s*[:=]/iu);
console.log(`Portuguese writing cycle readiness: OK (${required.length} artefactos)`);
