import "./fqa-beta-diagnosis.mjs";
import fs from "node:fs";

const page=fs.readFileSync("app/page.js","utf8");
const parent=fs.readFileSync("app/components/SecondaryScreens.js","utf8");
const css=fs.readFileSync("app/globals.css","utf8");
const diagnostic=fs.readFileSync("app/data/vnextDiagnostic.js","utf8");

const checks=[
  ["subject selection starts empty",page.includes("const [selected,setSelected]=useState([])")],
  ["zero-selection state is explicit",page.includes('"Nenhuma disciplina selecionada"')],
  ["availability note is secondary",page.includes('className="subjectAvailabilityNote"')],
  ["continue is blocked with zero subjects",page.includes('disabled={!selected.length} onClick={save}')],
  ["diagnostic typography has no missing-space regression",!diagnostic.includes("esquerda em0")],
  ["parent screen is wired into the app",page.includes('const Parent=dynamic(()=>import("./components/SecondaryScreens").then(module=>module.Parent)')],
  ["parent has two clear entry choices",parent.includes("Associar um aluno")&&parent.includes("Criar perfil do aluno")],
  ["parent dashboard is per subject",parent.includes("Estado por disciplina")&&parent.includes("parentSubjectGrid")],
  ["parent dashboard includes weekly activity",parent.includes("dias com estudo esta semana")&&parent.includes("weeklyXp")],
  ["parent dashboard includes four-week consistency trend",parent.includes("Regularidade de estudo nas últimas 4 semanas")&&parent.includes("parentTrendChart")],
  ["parent dashboard includes recent assessment context",parent.includes("Resultados recentes em contexto de prova")&&parent.includes("assessmentRows")],
  ["parent assessments avoid false grades for open responses",parent.includes("não inventamos uma nota")&&parent.includes("Não são uma previsão da classificação no Exame Nacional")],
  ["privacy boundary is explicit",parent.includes("Não vê cada resposta individual")],
  ["parent dashboard styles exist",css.includes("/* APProva+ — área parental v1 */")&&css.includes(".parentDashboardHero")&&css.includes(".parentTrendChart")&&css.includes(".parentAssessmentList")]
];

const failed=checks.filter(([,ok])=>!ok);
for(const [label,ok] of checks)console.log(`${ok?"✓":"✗"} ${label}`);
if(failed.length){
  console.error(`\nParent experience audit failed: ${failed.map(([label])=>label).join(", ")}`);
  process.exit(1);
}
console.log("\nParent experience audit passed.");