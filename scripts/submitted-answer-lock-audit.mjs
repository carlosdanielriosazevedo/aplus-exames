import fs from "node:fs";

const read=path=>fs.readFileSync(new URL("../"+path,import.meta.url),"utf8");

const math=read("app/page.js");
const pt=read("app/components/PortugueseSubject.js");
const ptExam=read("app/components/PortuguesePassageMiniExam.js");
const fq=read("app/components/PhysicsChemistrySubject.js");
const fqMini=read("app/components/PhysicsChemistryMiniExam.js");
const fqExam=read("app/components/PhysicsChemistryExam.js");

const forbidden=["Melhorar resposta","Reescrever a resposta","Guardar nova versão"];
const combined=pt+"\n"+ptExam+"\n"+fq+"\n"+fqMini+"\n"+fqExam;

const checks=[
  ["Matemática A locks multiple-choice after feedback",math.includes("function QuestionOptions({q,sel,fb,answer})")&&math.includes("disabled={!!fb}")],
  ["Matemática A locks constructed practice after feedback",math.includes('fieldset disabled={!!feedback} className="practiceFields"')],
  ["Matemática A only permits exam edits before delivery",math.includes("Podes voltar atrás e alterar respostas antes de entregar")],
  ["Português locks choices, short answers and open answers after feedback",(pt.match(/disabled=\{!!feedback\}/g)||[]).length>=3],
  ["Português no longer exposes response rewrite actions",!forbidden.some(label=>pt.includes(label))],
  ["Português exam review is explicitly read-only",ptExam.includes("Resposta submetida e fechada")&&ptExam.includes("Esta tentativa não pode ser alterada depois de veres a avaliação.")],
  ["Português exam review has no rewrite action",!forbidden.some(label=>ptExam.includes(label))],
  ["FQ A locks response editors after feedback",(fq.match(/disabled=\{!!feedback\}/g)||[]).length>=3],
  ["FQ A no longer exposes improve-response action",!fq.includes("reviseOpenResponse")&&!forbidden.some(label=>fq.includes(label))],
  ["No post-correction rewrite labels remain in Portuguese or FQ A",!forbidden.some(label=>combined.includes(label))]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error("\nSubmitted-answer lock audit failed: "+failed.map(([label])=>label).join(", "));
  process.exit(1);
}
console.log("\nSubmitted-answer lock audit passed across Matemática A, Português and FQ A.");
