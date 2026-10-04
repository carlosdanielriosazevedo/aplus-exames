import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {spawnSync} from "node:child_process";

const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const privacy=readFileSync(new URL("../app/privacidade/page.js",import.meta.url),"utf8");
const terms=readFileSync(new URL("../app/termos/page.js",import.meta.url),"utf8");

assert.match(welcome,/href="\/privacidade"/u,"A entrada pública deve expor Privacidade.");
assert.match(welcome,/href="\/termos"/u,"A entrada pública deve expor Termos de utilização.");
assert.match(privacy,/Beta e analytics/u,"Privacidade deve explicar analytics da beta.");
assert.match(privacy,/Armazenamento local e cloud/u,"Privacidade deve explicar armazenamento local e cloud.");
assert.match(privacy,/Utilizadores mais novos/u,"Privacidade deve tratar explicitamente o público escolar.");
assert.match(terms,/Não é uma plataforma oficial do IAVE/u,"Termos devem deixar claro que a APProva+ não é oficial.");
assert.match(terms,/Não substituem a classificação oficial/u,"Termos devem distinguir feedback da classificação oficial.");
assert.match(terms,/não constituem a versão jurídica final/u,"A beta não deve fingir revisão jurídica final.");

const checks=[
  ["Primeira experiência e percurso do aluno","npm",["run","student-experience:audit"]],
  ["Onboarding e reteste","npm",["run","onboarding-retest:audit"]],
  ["Mobile e legibilidade","npm",["run","mobile:audit"]],
  ["Retoma e conflitos entre dispositivos","npm",["run","cloud-reliability:audit"]],
  ["Persistência de feedback e analytics","node",["scripts/beta-feedback-analytics-audit.mjs"]]
];

let failed=0;
for(const [label,cmd,args] of checks){
  console.log(`\n=== ${label} ===`);
  const result=spawnSync(cmd,args,{stdio:"inherit",shell:process.platform==="win32"});
  if(result.status!==0){
    failed++;
    console.error(`✗ ${label}`);
  }else{
    console.log(`✓ ${label}`);
  }
}

if(failed){
  console.error(`PUBLIC BETA READINESS: NO-GO (${failed} check(s) falharam)`);
  process.exit(1);
}
console.log("✓ PUBLIC BETA READINESS: GO — UX inicial, mobile, cloud, analytics e transparência protegidos");
