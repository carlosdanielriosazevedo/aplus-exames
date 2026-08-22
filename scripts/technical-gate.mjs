
import {spawnSync} from "node:child_process";

const checks=[
  ["Syntax/JSX","npm",["run","syntax:audit"]],
  ["IDs pedagógicos","npm",["run","competency-id:audit"]],
  ["Beta de amigos","npm",["run","friends-beta:audit"]],
  ["Motor adaptativo","npm",["run","engine:audit"]],
  ["Fiabilidade","npm",["run","reliability:audit"]],
  ["Roadmap de revisão","npm",["run","review:roadmap"]],
  ["Ponte professor","npm",["run","teacher-review:audit"]],
  ["Higiene do source","npm",["run","source:hygiene"]]
];

let failed=0;
for(const [label,cmd,args] of checks){
  console.log(`\n=== ${label} ===`);
  const r=spawnSync(cmd,args,{stdio:"inherit",shell:process.platform==="win32"});
  if(r.status!==0){
    failed++;
    console.error(`✗ ${label} falhou`);
  }else{
    console.log(`✓ ${label}`);
  }
}

console.log("\n==============================");
if(failed){
  console.error(`TECHNICAL GATE: NO-GO (${failed} check(s) falharam)`);
  process.exit(1);
}
console.log("TECHNICAL GATE: GO");
