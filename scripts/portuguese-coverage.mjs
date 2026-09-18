import assert from "node:assert/strict";
import {readFileSync,readdirSync,writeFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES,PORTUGUESE_DOMAINS} from "../app/data/portugueseFoundation.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const packs=packFiles.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const latestDeclared=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||items.length;
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

assert.equal(packs[0]?.productionEligible,false);
assert.equal(packs[0]?.sourcePolicy,"original-only");
assert.equal(items.length,latestDeclared,"o tamanho agregado deve coincidir com bankSizeAfterWave da vaga mais recente");
assert.equal([...counts.keys()].every(id=>written.some(row=>row.id===id)),true,"Existem itens fora das competências escritas mapeadas.");

if(process.argv.includes("--write")){
  writeFileSync(outputUrl,report,"utf8");
  console.log("✓ matriz escrita em docs/PORTUGUESE_639_COVERAGE.md");
}else{
  assert.equal(readFileSync(outputUrl,"utf8"),report,"A matriz de Português está desatualizada; execute npm run portuguese-coverage.");
  console.log(`✓ Portuguese 639 coverage: ${items.length} itens · ${covered.length}/${written.length} competências escritas · release bloqueado`);
}
