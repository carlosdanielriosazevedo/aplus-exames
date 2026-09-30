import fs from "node:fs";

const grader=fs.readFileSync(new URL("../app/lib/automaticEvidenceGrader.js",import.meta.url),"utf8");
const pt=fs.readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fq=fs.readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const ptx=fs.readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const fqMini=fs.readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const fqExam=fs.readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");

const checks=[
  ["shared explanatory feedback helper exists",grader.includes("automaticFeedbackForCriteria")&&grader.includes("strengths")&&grader.includes("gaps")],
  ["Portuguese mission shows strengths and gaps",pt.includes("O que fizeste bem")&&pt.includes("O que falta melhorar")],
  ["FQ A mission shows strengths and gaps",fq.includes("O que fizeste bem")&&fq.includes("O que falta melhorar")],
  ["FQ A mission offers answer improvement",fq.includes("Melhorar resposta")&&fq.includes("reviseOpenResponse")],
  ["Portuguese exam review explains open answers",ptx.includes("automaticResult?.feedbackSummary")&&ptx.includes("O que faltou")],
  ["FQ A mini-exam review explains open answers",fqMini.includes("result.feedbackSummary")&&fqMini.includes("O que faltou")],
  ["FQ A full-exam review explains open answers",fqExam.includes("result.feedbackSummary")&&fqExam.includes("O que faltou")]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error("\nExplanatory feedback audit failed: "+failed.map(([label])=>label).join(", "));
  process.exit(1);
}
console.log("\nExplanatory feedback audit passed.");
