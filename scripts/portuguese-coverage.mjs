import assert from "node:assert/strict";
import {readFileSync,writeFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES,PORTUGUESE_DOMAINS} from "../app/data/portugueseFoundation.js";

const pilot=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8"));
const wave1=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave1.json",import.meta.url),"utf8"));
const wave2=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave2.json",import.meta.url),"utf8"));
const wave3=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave3.json",import.meta.url),"utf8"));
const items=[...pilot.items,...wave1.items,...wave2.items,...wave3.items];
const outputUrl=new URL("../docs/PORTUGUESE_639_COVERAGE.md",import.meta.url);

const counts=new Map();
for(const item of items)counts.set(item.competencyId,(counts.get(item.competencyId)||0)+1);
const written=PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam);
const covered=written.filter(row=>counts.has(row.id));
const missing=written.filter(row=>!counts.has(row.id));

const lines=[
  "# Cobertura de Português 639",
  "",
  "> Relatório estrutural gerado por `npm run portuguese-coverage`. Não representa validação humana nem autoriza publicação.",
  ">",
  "> As competências estão cruzadas com as Aprendizagens Essenciais em vigor. A conformidade fina com a informação-prova e os critérios IAVE continua a ser verificada separadamente.",
  "",
  "## Estado geral",
  "",
  `- **${items.length}** itens originais em protótipo.`,
  `- **${covered.length}/${written.length}** competências do exame escrito com pelo menos um item.`,
  `- **${missing.length}** competências do exame escrito ainda sem item.`,
  `- **${PORTUGUESE_COMPETENCIES.filter(row=>!row.writtenExam).length}** competências de oralidade mapeadas separadamente e excluídas do exame escrito.`,
  "- Produção escrita extensa mantém avaliação provisória por grelha; não existe nota final automática.",
  "",
  "## Matriz",
  "",
  "| Domínio | Competência | Itens | Estado |",
  "|---|---|---:|---|",
  ...written.map(row=>{
    const domain=PORTUGUESE_DOMAINS.find(candidate=>candidate.id===row.domain)?.label||row.domain;
    const total=counts.get(row.id)||0;
    return `| ${domain} | \`${row.id}\` — ${row.label} | ${total} | ${total?"iniciada":"lacuna"} |`;
  }),
  ""
];
const report=lines.join("\n");

assert.equal(pilot.productionEligible,false);
assert.equal(pilot.sourcePolicy,"original-only");
assert.equal([...counts.keys()].every(id=>written.some(row=>row.id===id)),true,"Existem itens fora das competências escritas mapeadas.");

if(process.argv.includes("--write")){
  writeFileSync(outputUrl,report,"utf8");
  console.log("✓ matriz escrita em docs/PORTUGUESE_639_COVERAGE.md");
}else{
  assert.equal(readFileSync(outputUrl,"utf8"),report,"A matriz de Português está desatualizada; execute npm run portuguese-coverage.");
  console.log(`✓ Portuguese 639 coverage: ${items.length} itens · ${covered.length}/${written.length} competências escritas · release bloqueado`);
}
