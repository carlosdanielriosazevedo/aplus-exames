import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const persistence=readFileSync(new URL("../app/lib/persistence.js",import.meta.url),"utf8");
const analytics=readFileSync(new URL("../app/lib/productAnalytics.js",import.meta.url),"utf8");
const ingest=readFileSync(new URL("../app/lib/server/beta-ingest.js",import.meta.url),"utf8");
const app=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");

assert.match(persistence,/productAnalytics:state\.productAnalytics\|\|null/u,"A sincronização deve incluir productAnalytics.");
assert.match(persistence,/feedback:state\.betaFeedback\|\|\[\]/u,"A sincronização deve incluir feedback da beta.");
assert.match(analytics,/diagnostic_completed/u,"O funil deve proteger a conclusão do diagnóstico.");
assert.match(analytics,/first_mission_completed/u,"O funil deve proteger a primeira missão concluída.");
assert.match(app,/function BetaSessionFeedback/u,"A app deve manter feedback contextual após sessões.");
assert.match(app,/betaFeedback:\[\.\.\.\(prev\.betaFeedback\|\|\[\]\),row\]/u,"O feedback submetido deve ficar persistido no estado local.");
assert.match(ingest,/product_analytics_snapshot/u,"O backend deve persistir snapshots de analytics da beta.");
assert.match(ingest,/counters=\{sessions:0,events:0,feedback:0,analytics:0/u,"Os imports devem contabilizar analytics persistidos.");
assert.match(ingest,/insert into beta_feedback/u,"O backend deve persistir feedback da beta.");

console.log("✓ beta feedback + analytics: recolha local, sincronização e persistência central protegidas");
