import {spawnSync} from "node:child_process";

const checks=[
  ["FQ A 11.º beta","scripts/physics-chemistry-11-beta-audit.mjs"],
  ["FQ A Exame Completo","scripts/physics-chemistry-exam-flow-audit.mjs"],
  ["FQ A Mini-exame","scripts/physics-chemistry-mini-exam-audit.mjs"],
  ["FQ A correção","scripts/physics-chemistry-rubric-audit.mjs"],
  ["FQ A revisão/progresso","scripts/physics-chemistry-review-progress-audit.mjs"]
];
let failed=0;
for(const [label,path] of checks){
  console.log(`\n=== DIAGNÓSTICO TEMPORÁRIO · ${label} ===`);
  const result=spawnSync(process.execPath,[path],{stdio:"inherit"});
  if(result.status!==0){failed++;console.error(`DIAG_FAIL: ${label}`)}
  else console.log(`DIAG_PASS: ${label}`);
}
if(failed){
  console.error(`FQA_BETA_DIAGNOSIS_FAILED=${failed}`);
  process.exit(1);
}
console.log("FQA_BETA_DIAGNOSIS_GO");
