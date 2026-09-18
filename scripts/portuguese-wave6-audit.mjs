import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";

const wave6=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave6.json",import.meta.url),"utf8"));
const items=wave6.items;

assert.equal(wave6.wave,6);
assert.equal(wave6.bankSizeAfterWave,120);
assert.equal(wave6.sourcePolicy,"original-only");
assert.equal(wave6.editorialStatus,"prototype");
assert.equal(wave6.productionEligible,false);
assert.equal(items.length,20);
assert.deepEqual(items.map(item=>item.id),Array.from({length:20},(_,i)=>`PT639-FND-${String(101+i).padStart(3,"0")}`));
assert.equal(new Set(items.map(item=>item.id)).size,20);

const written=new Map(PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam).map(row=>[row.id,row]));
for(const item of items){
  assert.ok(["10.º","11.º","12.º"].includes(item.year),`${item.id}: ano inválido`);
  assert.ok(written.has(item.competencyId),`${item.id}: competência inválida`);
  assert.equal(written.get(item.competencyId).domain,item.domain,`${item.id}: competência/domínio incoerentes`);
  assert.equal(item.sourceOrigin,"original",`${item.id}: fonte deve ser original`);
  assert.equal(item.reviewStatus,"prototype",`${item.id}: deve permanecer protótipo`);
  assert.ok(["multiple-choice","short-answer"].includes(item.responseType),`${item.id}: vaga 6 deve ser determinística`);
  assert.ok(["reconhecer","interpretar","raciocinar"].includes(item.cognitive),`${item.id}: operação cognitiva inadequada ao formato determinístico desta vaga`);
  assert.equal(item.maxPoints,13,`${item.id}: cotação estrutural inesperada`);
  assert.ok(item.stimulus.length>=40,`${item.id}: estímulo demasiado curto`);
  assert.ok(item.prompt.length>=20,`${item.id}: enunciado demasiado curto`);
  assert.ok(item.explanation?.length>=30,`${item.id}: explicação pedagógica insuficiente`);

  if(item.responseType==="multiple-choice"){
    assert.equal(item.gradingMode,"deterministic");
    assert.equal(item.options.length,4);
    assert.ok([0,1,2,3].includes(item.answerIndex));
    assert.equal(new Set(item.options.map(option=>option.trim().toLocaleLowerCase("pt-PT"))).size,4);
  }else{
    assert.equal(item.gradingMode,"deterministic-with-equivalents");
    assert.ok(item.acceptedAnswers.length>=2);
    const normalized=item.acceptedAnswers.map(value=>value.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim());
    assert.equal(new Set(normalized).size,normalized.length,`${item.id}: equivalentes aceites duplicados após normalização`);
  }
}

const byDomain=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
assert.deepEqual(byDomain,{leitura:6,"educacao-literaria":6,escrita:2,gramatica:6});
const byType={
  multipleChoice:items.filter(item=>item.responseType==="multiple-choice").length,
  shortAnswer:items.filter(item=>item.responseType==="short-answer").length
};
assert.deepEqual(byType,{multipleChoice:12,shortAnswer:8});
const byYear=Object.fromEntries(["10.º","11.º","12.º"].map(year=>[year,items.filter(item=>item.year===year).length]));
assert.ok(Math.max(...Object.values(byYear))-Math.min(...Object.values(byYear))<=1,`anos desequilibrados: ${JSON.stringify(byYear)}`);

const expectedCompetencyAdds={
  "pt-leitura-informacao":2,
  "pt-leitura-inferencia":2,
  "pt-leitura-coesao":1,
  "pt-leitura-organizacao":1,
  "pt-literatura-recursos":2,
  "pt-literatura-temas":2,
  "pt-literatura-voz":1,
  "pt-literatura-forma":1,
  "pt-escrita-exposicao":1,
  "pt-escrita-argumentacao":1,
  "pt-gramatica-sintaxe":2,
  "pt-gramatica-oracoes":2,
  "pt-gramatica-coesao":1,
  "pt-gramatica-morfologia-semantica":1
};
for(const [id,expected] of Object.entries(expectedCompetencyAdds))assert.equal(items.filter(item=>item.competencyId===id).length,expected,`${id}: reforço inesperado`);

const answerPositions=items.filter(item=>item.responseType==="multiple-choice").reduce((counts,item)=>{counts[item.answerIndex]++;return counts;},[0,0,0,0]);
assert.ok(answerPositions.every(count=>count>=2),`todas as posições A/B/C/D devem aparecer pelo menos duas vezes: ${answerPositions.join("/")}`);
assert.ok(Math.max(...answerPositions)-Math.min(...answerPositions)<=2,`posições corretas demasiado desequilibradas: ${answerPositions.join("/")}`);

console.log(`✓ sexta vaga de Português: 20 itens determinísticos · domínios 6/6/2/6 · formatos 12 MC + 8 curtas · posições A/B/C/D ${answerPositions.join("/")} · banco final 120`);
