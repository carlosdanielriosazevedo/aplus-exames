import {spawnSync} from "node:child_process";

const checks=[
  ["Matemática A — validação curricular e técnica","npm",["run","math-validation:audit"]],
  ["Matemática A — qualidade pedagógica","npm",["run","math-pedagogical:audit"]],
  ["Matemática A — soluções e autenticidade de exame","npm",["run","math-solutions:audit"]],
  ["Matemática A — autenticidade de exame","npm",["run","math-exam:audit"]],
  ["Português — cobertura curricular","npm",["run","portuguese-coverage:audit"]],
  ["Português — qualidade global do banco","npm",["run","portuguese-bank-quality:audit"]],
  ["Português — autenticidade do exame 639","npm",["run","portuguese-exam-authenticity:audit"]],
  ["Português — mini-exame ponta a ponta","npm",["run","portuguese-mini-exam-flow:audit"]],
  ["Português — grelhas e correção","npm",["run","portuguese-rubric:audit"]],
  ["FQ A — prontidão beta","node",["scripts/physics-chemistry-beta-readiness-audit.mjs"]],
  ["FQ A — prontidão 11.º ano","node",["scripts/physics-chemistry-11-beta-audit.mjs"]],
  ["FQ A — candidato ponta a ponta","node",["scripts/fqa-beta-candidate-audit.mjs"]],
  ["Paridade transversal das três disciplinas","npm",["run","cross-subject-beta:audit"]],
  ["Progresso isolado por disciplina","npm",["run","subject-progress:audit"]],
  ["Experiência do aluno","npm",["run","student-experience:audit"]],
  ["Mobile e legibilidade","npm",["run","mobile:audit"]],
  ["Navegação antes do teste","npm",["run","pretest-navigation:audit"]],
  ["Comportamento do diagnóstico","npm",["run","pretest-behavior:audit"]],
  ["Resultado do diagnóstico","npm",["run","pretest-result:audit"]],
  ["Rever Matéria após diagnóstico","npm",["run","pretest-review-matter:audit"]],
  ["Resposta submetida fica fechada","npm",["run","submitted-answer-lock:audit"]],
  ["Identidade APProva+ e Apronso","npm",["run","apronso-brand:audit"]]
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

console.log("\n==============================");
if(failed){
  console.error(`THREE-SUBJECT BETA CANDIDATE: NO-GO (${failed} check(s) falharam)`);
  process.exit(1);
}
console.log("THREE-SUBJECT BETA CANDIDATE: GO");
