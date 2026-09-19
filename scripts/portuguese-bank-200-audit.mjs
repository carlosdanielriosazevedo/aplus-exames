import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES,PORTUGUESE_DOMAINS,PORTUGUESE_RESPONSE_TYPES} from "../app/data/portugueseFoundation.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const files=readdirSync(contentDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name)).sort((a,b)=>{
  if(a.includes("pilot"))return -1;
  if(b.includes("pilot"))return 1;
  return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
});
const packs=files.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const writtenCompetencies=new Map(PORTUGUESE_COMPETENCIES.filter(item=>item.writtenExam).map(item=>[item.id,item]));
const responseTypes=new Set(PORTUGUESE_RESPONSE_TYPES.map(type=>type.id));

assert.equal(files.length,11,"Português deve agregar piloto + waves 1-10.");
assert.equal(packs.at(-1)?.wave,12);
assert.equal(packs.at(-1)?.bankSizeAfterWave,250);
assert.equal(items.length,250,"O banco foundation deve conter exatamente 200 itens.");
assert.equal(new Set(items.map(item=>item.id)).size,250,"IDs duplicados no banco de Português.");
assert.equal(new Set(items.map(item=>item.stimulus)).size,250,"Existem estímulos repetidos.");

const counts={};
for(const item of items){
  assert.match(item.id,/^PT639-FND-\d{3}$/u);
  assert.ok(["10.º","11.º","12.º"].includes(item.year),`${item.id}: ano inválido.`);
  const competency=writtenCompetencies.get(item.competencyId);
  assert.ok(competency,`${item.id}: competência não pertence ao referencial escrito 639.`);
  assert.equal(item.domain,competency.domain,`${item.id}: domínio e competência não coincidem.`);
  assert.ok(PORTUGUESE_DOMAINS.some(domain=>domain.id===item.domain&&domain.writtenExam),`${item.id}: domínio não elegível para exame escrito.`);
  assert.equal(item.sourceOrigin,"original",`${item.id}: conteúdo foundation deve ser original.`);
  assert.equal(item.reviewStatus,"prototype",`${item.id}: conteúdo novo permanece em revisão editorial.`);
  assert.ok(responseTypes.has(item.responseType),`${item.id}: tipo de resposta desconhecido.`);
  assert.ok(item.prompt?.length>=20,`${item.id}: enunciado insuficiente.`);
  assert.ok(item.stimulus?.length>=40,`${item.id}: estímulo insuficiente.`);
  assert.ok(item.explanation?.length>=30||item.rubric,`${item.id}: falta explicação/grelha.`);
  assert.ok(Number.isInteger(item.maxPoints)&&item.maxPoints>0,`${item.id}: pontuação inválida.`);
  counts[item.competencyId]=(counts[item.competencyId]||0)+1;
}

assert.equal(Object.keys(counts).length,16,"As 16 competências escritas devem estar representadas.");
for(const [id,count] of Object.entries(counts)) assert.ok(count>=7,`${id}: profundidade insuficiente (${count}).`);

const runtime=readFileSync(new URL("../app/data/portugueseContent.js",import.meta.url),"utf8");
for(let wave=1;wave<=12;wave++) assert.match(runtime,new RegExp(`portuguese-639-wave${wave}\\.json`),`wave${wave} não está ligada ao runtime.`);
assert.equal((runtime.match(/portuguese-639-(?:pilot|wave\d+)\.json/g)||[]).length,13,"Runtime deve carregar os 11 pacotes foundation.");

console.log(`✓ Portuguese 639: ${items.length} itens · 16 competências escritas cobertas · waves 1-12 ligadas ao runtime · original-only · sem IDs/estímulos duplicados`);
