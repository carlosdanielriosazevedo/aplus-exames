
import {spawnSync} from "node:child_process";

const checks=[
  ["Syntax/JSX","npm",["run","syntax:audit"]],
  ["IDs pedagógicos","npm",["run","competency-id:audit"]],
  ["Validação matemática","npm",["run","math-validation:audit"]],
  ["Engagement diário","npm",["run","engagement:audit"]],
  ["Rankings e divisões","npm",["run","competition:audit"]],
  ["Missão de Hoje","npm",["run","daily-mission:audit"]],
  ["Memória pedagógica","npm",["run","pedagogical-memory:audit"]],
  ["Cloud reliability","npm",["run","cloud-reliability:audit"]],
  ["Funil e retenção","npm",["run","retention:audit"]],
  ["Cobertura de conteúdo","npm",["run","content-coverage:audit"]],
  ["Beta de amigos","npm",["run","friends-beta:audit"]],
  ["Motor adaptativo","npm",["run","engine:audit"]],
  ["Fiabilidade","npm",["run","reliability:audit"]],
  ["Recovery do diagnóstico","npm",["run","diagnostic-recovery:audit"]],
  ["Roadmap de revisão","npm",["run","review:roadmap"]],
  ["Ponte professor","npm",["run","teacher-review:audit"]],
  ["Revisões editoriais","npm",["run","editorial-revisions:audit"]],
  ["Pré-revisão QA","npm",["run","pre-review-qa:audit"]],
  ["Validação híbrida","npm",["run","hybrid-validation:audit"]],
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
