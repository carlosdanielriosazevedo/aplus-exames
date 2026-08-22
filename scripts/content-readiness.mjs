
import fs from "node:fs";
import {betaContentReadiness,reviewPackRows} from "../app/lib/quality.js";

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
fs.writeFileSync("docs/REVISAO_PROFESSOR_PRIORIDADES_v3.6.csv","\ufeff"+csv);
console.log(`Professor review pack: ${rows.length} items`);
