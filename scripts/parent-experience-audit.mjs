import fs from "node:fs";

const page=fs.readFileSync("app/page.js","utf8");
const css=fs.readFileSync("app/globals.css","utf8");
const diagnostic=fs.readFileSync("app/data/vnextDiagnostic.js","utf8");

const checks=[
  ["subject selection starts empty",page.includes("const [selected,setSelected]=useState([])")],
  ["zero-selection state is explicit",page.includes('"Nenhuma disciplina selecionada"')],
  ["availability note is secondary",page.includes('className="subjectAvailabilityNote"')],
  ["continue is blocked with zero subjects",page.includes('disabled={!selected.length} onClick={save}')],
  ["diagnostic typography has spacing",diagnostic.includes('a derivada lateral esquerda no ponto 0 é...')&&!diagnostic.includes("esquerda em0")],
  ["parent has two clear entry choices",page.includes("Associar um aluno")&&page.includes("Criar perfil do aluno")],
  ["parent dashboard is per subject",page.includes("Estado por disciplina")&&page.includes("parentSubjectGrid")],
  ["parent dashboard includes weekly activity",page.includes("dias com estudo esta semana")&&page.includes("weeklyXp")],
  ["parent dashboard includes four-week consistency trend",page.includes("Regularidade de estudo nas últimas 4 semanas")&&page.includes("parentTrendChart")],
  ["parent dashboard includes recent assessment context",page.includes("Resultados recentes em contexto de prova")&&page.includes("assessmentRows")],
  ["parent assessments avoid false grades for open responses",page.includes("não inventamos uma nota")&&page.includes("Não são uma previsão da classificação no Exame Nacional")],
  ["privacy boundary is explicit",page.includes("Não vê cada resposta individual")],
  ["parent dashboard styles exist",css.includes("/* APProva+ — área parental v1 */")&&css.includes(".parentDashboardHero")&&css.includes(".parentTrendChart")&&css.includes(".parentAssessmentList")]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error(`\nParent experience audit failed: ${failed.map(([label])=>label).join(", ")}`);
  process.exit(1);
}
console.log("\nParent experience audit passed.");
