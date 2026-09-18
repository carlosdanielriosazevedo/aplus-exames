import {spawnSync} from "node:child_process";

const checks=[
  ["Syntax/JSX","npm",["run","syntax:audit"]],
  ["Disciplinas do secundário","npm",["run","subjects:audit"]],
  ["Fundação de Português 639","npm",["run","portuguese-foundation:audit"]],
  ["Motor de Português 639","npm",["run","portuguese-engine:audit"]],
  ["Quarta vaga de Português","npm",["run","portuguese-wave4:audit"]],
  ["Quinta vaga de Português","npm",["run","portuguese-wave5:audit"]],
  ["Qualidade global do banco de Português","npm",["run","portuguese-bank-quality:audit"]],
  ["Forma pedagógica do banco de Português","npm",["run","portuguese-bank-shape:audit"]],
  ["Grelhas observáveis de Português","npm",["run","portuguese-rubric:audit"]],
  ["Cenários adversariais das grelhas de Português","npm",["run","portuguese-rubric-scenarios:audit"]],
  ["Calibração textual das grelhas de Português","npm",["run","portuguese-rubric-text-calibration:audit"]],
  ["Microexemplos específicos por observação em Português","npm",["run","portuguese-observation-guidance:audit"]],
  ["Casos-limite de extensão e conteúdo em Português","npm",["run","portuguese-boundary-cases:audit"]],
  ["Feedback visual do limite de palavras em Português","npm",["run","portuguese-word-limit-ui:audit"]],
  ["Dificuldade editorial de Português","npm",["run","portuguese-difficulty:audit"]],
  ["Progresso isolado por disciplina","npm",["run","subject-progress:audit"]],
  ["Cobertura de Português 639","npm",["run","portuguese-coverage:audit"]],
  ["IDs pedagógicos","npm",["run","competency-id:audit"]],
  ["Validação matemática","npm",["run","math-validation:audit"]],
  ["Revisão editorial Matemática","npm",["run","math-editorial:audit"]],
  ["Qualidade pedagógica transversal Matemática","npm",["run","math-pedagogical:audit"]],
  ["Qualidade das resoluções Matemática","npm",["run","math-solutions:audit"]],
  ["Autenticidade estilo exame Matemática","npm",["run","math-exam:audit"]],
  ["Prontidão piloto alunos reais","npm",["run","student-pilot:audit"]],
  ["Engagement diário","npm",["run","engagement:audit"]],
  ["Rankings e divisões","npm",["run","competition:audit"]],
  ["Missão de Hoje","npm",["run","daily-mission:audit"]],
  ["Scope curricular por ano","npm",["run","curriculum-scope:audit"]],
  ["Banco vNext estrutural","npm",["run","vnext-content:audit"]],
  ["Independência contextual vNext","npm",["run","vnext-context:audit"]],
  ["Piloto vNext isolado","npm",["run","vnext-pilot:audit"]],
  ["Diagnóstico vNext completo","npm",["run","vnext-diagnostic:audit"]],
  ["Missões vNext 3–5 minutos","npm",["run","vnext-mission:audit"]],
  ["Mini-exames vNext completos","npm",["run","vnext-exam:audit"]],
  ["Mobile e legibilidade","npm",["run","mobile:audit"]],
  ["Experiência do aluno","npm",["run","student-experience:audit"]],
  ["Identidade APProva+ e Apronso","npm",["run","apronso-brand:audit"]],
  ["Resposta construída v2","npm",["run","constructed-response:audit"]],
  ["Resposta construída adversarial","npm",["run","constructed-response:adversarial-audit"]],
  ["Cobertura de resposta construída","npm",["run","math-constructed:coverage-audit"]],
  ["Primeira vaga de resposta construída","npm",["run","math-constructed:wave1-audit"]],
  ["Segunda vaga de resposta construída","npm",["run","math-constructed:wave2-audit"]],
  ["Terceira vaga de resposta construída","npm",["run","math-constructed:wave3-audit"]],
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
  ["Política de source sem patches textuais","npm",["run","source-rewrite:audit"]],
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
