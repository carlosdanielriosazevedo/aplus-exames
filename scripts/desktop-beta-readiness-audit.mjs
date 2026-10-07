import {spawnSync} from "node:child_process";

const audits=[
  ["Experiência desktop geral","scripts/desktop-experience-audit.mjs"],
  ["Desktop 1080p/1440p","scripts/desktop-1440-audit.mjs"],
  ["Provas e revisão em desktop","scripts/desktop-exam-review-audit.mjs"],
  ["Consistência desktop final","scripts/desktop-final-consistency-audit.mjs"]
];

console.log("=== DESKTOP BETA READINESS ===");

for(const [label,script] of audits){
  console.log(`\n--- ${label} ---`);
  const result=spawnSync(process.execPath,[script],{
    cwd:process.cwd(),
    stdio:"inherit"
  });

  if(result.error){
    console.error(`✗ ${label}: não foi possível executar ${script}`);
    console.error(result.error);
    process.exit(1);
  }

  if(result.status!==0){
    console.error(`✗ DESKTOP BETA READINESS: NO-GO em ${label}`);
    process.exit(result.status||1);
  }
}

console.log("\n✓ DESKTOP BETA READINESS: GO · layout geral · 1080p/1440p · provas/revisão · resultados/estados/menus");
