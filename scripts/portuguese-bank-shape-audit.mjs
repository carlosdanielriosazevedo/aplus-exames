import {readFileSync} from "node:fs";
import {join} from "node:path";

const root="content/vnext/portuguese/foundation";
const files=[
  "portuguese-639-pilot.json",
  "portuguese-639-wave1.json",
  "portuguese-639-wave2.json",
  "portuguese-639-wave3.json",
  "portuguese-639-wave4.json",
  "portuguese-639-wave5.json"
];
const packs=files.map(name=>JSON.parse(readFileSync(join(root,name),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const difficulty=JSON.parse(readFileSync(join(root,"portuguese-639-difficulty.json"),"utf8"));
const fail=[];
const assert=(condition,message)=>{if(!condition)fail.push(message);};
const countBy=fn=>items.reduce((acc,item)=>{const key=fn(item);acc[key]=(acc[key]||0)+1;return acc;},{});
const pct=(n,d=items.length)=>d?Math.round((n/d)*1000)/10:0;
const ratio=(n,d=items.length)=>d?n/d:0;
const expectedSize=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||items.length;
const minimumPerCompetency=Math.floor(items.length/16);

assert(items.length===expectedSize,`O último pacote declara ${expectedSize} itens, mas o banco contém ${items.length}.`);

const years=countBy(item=>item.year);
const domains=countBy(item=>item.domain);
const competencies=countBy(item=>item.competencyId);
const responseTypes=countBy(item=>item.responseType);
const cognitive=countBy(item=>item.cognitive);

for(const year of ["10.º","11.º","12.º"]){
  const n=years[year]||0;
  assert(ratio(n)>=0.28&&ratio(n)<=0.38,`${year}: distribuição desequilibrada (${n}/${items.length}; ${pct(n)}%).`);
}
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  const n=domains[domain]||0;
  assert(ratio(n)>=0.20&&ratio(n)<=0.30,`${domain}: distribuição desequilibrada (${n}/${items.length}; ${pct(n)}%).`);
}
assert(Object.keys(competencies).length===16,`Esperadas 16 competências escritas; encontradas ${Object.keys(competencies).length}.`);
for(const [id,n] of Object.entries(competencies)) assert(n>=minimumPerCompetency,`${id}: profundidade insuficiente (${n} itens; mínimo dinâmico ${minimumPerCompetency}).`);

const deterministic=(responseTypes["multiple-choice"]||0)+(responseTypes["short-answer"]||0);
const open=(responseTypes["restricted-response"]||0)+(responseTypes["extended-writing"]||0);
assert(ratio(deterministic)>=0.70,`Formatos determinísticos insuficientes (${deterministic}/${items.length}; ${pct(deterministic)}%).`);
assert(ratio(open)>=0.18,`Respostas abertas demasiado diluídas (${open}/${items.length}; ${pct(open)}%).`);
assert(ratio(responseTypes["short-answer"]||0)>=0.15,`Resposta curta sub-representada (${responseTypes["short-answer"]||0}/${items.length}; ${pct(responseTypes["short-answer"]||0)}%).`);
assert(ratio(responseTypes["multiple-choice"]||0)<=0.65,`Escolha múltipla excessiva (${responseTypes["multiple-choice"]||0}/${items.length}; ${pct(responseTypes["multiple-choice"]||0)}%).`);

for(const label of ["reconhecer","interpretar","raciocinar","criar"]){
  const n=cognitive[label]||0;
  assert(ratio(n)>=0.05,`Operação cognitiva ${label} sub-representada (${n}/${items.length}; ${pct(n)}%).`);
}
const dominantCognitive=Math.max(...Object.values(cognitive));
assert(ratio(dominantCognitive)<=0.65,`Uma operação cognitiva domina excessivamente o banco (${dominantCognitive}/${items.length}; ${pct(dominantCognitive)}%).`);

assert(difficulty.calibrated===false,"A matriz de dificuldade não pode declarar calibração real sem dados de alunos.");
assert(difficulty.status==="editorial-provisional","A dificuldade deve manter estado editorial-provisional.");
assert(Array.isArray(difficulty.items)&&difficulty.items.length===items.length,`Matriz de dificuldade deve cobrir ${items.length} itens; cobre ${difficulty.items?.length||0}.`);
const difficultyCounts=(difficulty.items||[]).reduce((acc,item)=>{acc[item.level]=(acc[item.level]||0)+1;return acc;},{});
for(const level of [1,2,3,4]){
  const n=difficultyCounts[level]||0;
  assert(ratio(n,difficulty.items.length)>=0.10,`Nível de dificuldade ${level} sub-representado (${n}/${difficulty.items.length}; ${pct(n,difficulty.items.length)}%).`);
}
assert(ratio(Math.max(...Object.values(difficultyCounts)),difficulty.items.length)<=0.50,`Um nível de dificuldade concentra mais de metade do banco (${JSON.stringify(difficultyCounts)}).`);

console.log("Forma pedagógica do banco de Português");
console.log(`- banco: ${items.length} itens · mínimo dinâmico por competência=${minimumPerCompetency}`);
console.log(`- anos: ${Object.entries(years).map(([k,v])=>`${k}=${v} (${pct(v)}%)`).join(" · ")}`);
console.log(`- domínios: ${Object.entries(domains).map(([k,v])=>`${k}=${v} (${pct(v)}%)`).join(" · ")}`);
console.log(`- respostas: ${Object.entries(responseTypes).map(([k,v])=>`${k}=${v} (${pct(v)}%)`).join(" · ")}`);
console.log(`- operações cognitivas: ${Object.entries(cognitive).map(([k,v])=>`${k}=${v} (${pct(v)}%)`).join(" · ")}`);
console.log(`- dificuldade editorial: ${Object.entries(difficultyCounts).map(([k,v])=>`nível ${k}=${v} (${pct(v,difficulty.items.length)}%)`).join(" · ")}`);
console.log(`- competências: min=${Math.min(...Object.values(competencies))} · max=${Math.max(...Object.values(competencies))}`);

if(fail.length){
  console.error(`\nPortuguese bank shape audit: FAIL (${fail.length})`);
  for(const message of fail) console.error(`- ${message}`);
  process.exit(1);
}
console.log("Portuguese bank shape audit: PASS");
