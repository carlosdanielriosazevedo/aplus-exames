import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";

const wave=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave8.json",import.meta.url),"utf8"));
const items=wave.items;
const written=new Map(PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam).map(row=>[row.id,row]));

assert.equal(wave.wave,8);
assert.equal(wave.bankSizeAfterWave,160);
assert.equal(wave.sourcePolicy,"original-only");
assert.equal(wave.editorialStatus,"prototype");
assert.equal(wave.productionEligible,false);
assert.equal(items.length,20);
assert.deepEqual(items.map(item=>item.id),Array.from({length:20},(_,i)=>`PT639-FND-${String(141+i).padStart(3,"0")}`));
assert.equal(new Set(items.map(item=>item.id)).size,20);

for(const item of items){
  assert.ok(["10.º","11.º","12.º"].includes(item.year),`${item.id}: ano inválido`);
  assert.ok(written.has(item.competencyId),`${item.id}: competência inválida`);
  assert.equal(written.get(item.competencyId).domain,item.domain,`${item.id}: domínio incoerente`);
  assert.equal(item.sourceOrigin,"original",`${item.id}: fonte não original`);
  assert.equal(item.reviewStatus,"prototype",`${item.id}: estado editorial inesperado`);
  assert.ok(item.stimulus?.length>=40,`${item.id}: estímulo demasiado curto`);
  assert.ok(item.prompt?.length>=20,`${item.id}: enunciado demasiado curto`);
  assert.ok(["reconhecer","interpretar","raciocinar","criar"].includes(item.cognitive),`${item.id}: operação cognitiva inválida`);
  if(["multiple-choice","short-answer"].includes(item.responseType)){
    assert.ok(item.explanation?.length>=30,`${item.id}: explicação insuficiente`);
  }else{
    assert.ok(["restricted-response","extended-writing"].includes(item.responseType),`${item.id}: formato aberto inválido`);
    assert.equal(item.gradingMode,"rubric-assisted",`${item.id}: resposta aberta não deve ter classificação determinística`);
    assert.ok(item.answerReference?.length>=80,`${item.id}: referência de resposta insuficiente`);
  }
}

const byYear=Object.fromEntries(["10.º","11.º","12.º"].map(year=>[year,items.filter(item=>item.year===year).length]));
assert.ok(Math.max(...Object.values(byYear))-Math.min(...Object.values(byYear))<=1,`anos desequilibrados: ${JSON.stringify(byYear)}`);
const byDomain=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
assert.deepEqual(byDomain,{leitura:3,"educacao-literaria":4,escrita:6,gramatica:7});
const open=items.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
assert.equal(open.length,8,"wave 8 deve reforçar respostas abertas com oito itens");
assert.equal(items.filter(item=>item.responseType==="extended-writing").length,2,"wave 8 deve incluir duas produções extensas");
assert.ok(open.every(item=>item.gradingMode==="rubric-assisted"),"respostas abertas devem manter correção assistida");
assert.ok(items.filter(item=>item.cognitive==="criar").length>=4,"wave 8 deve reforçar operação criar");

const mc=items.filter(item=>item.responseType==="multiple-choice");
const positions=mc.reduce((acc,item)=>{assert.equal(item.options?.length,4,`${item.id}: escolha múltipla sem quatro opções`);assert.ok([0,1,2,3].includes(item.answerIndex),`${item.id}: índice correto inválido`);acc[item.answerIndex]++;return acc;},[0,0,0,0]);
assert.ok(positions[0]>=1&&positions[1]>=1,`posições corretas pouco variadas: ${positions.join("/")}`);

for(const item of items.filter(item=>item.responseType==="short-answer")){
  assert.equal(item.gradingMode,"deterministic-with-equivalents");
  assert.ok(item.acceptedAnswers?.length>=2,`${item.id}: equivalentes insuficientes`);
}

console.log(`✓ wave 8 Português: 20 itens · anos ${JSON.stringify(byYear)} · domínios ${JSON.stringify(byDomain)} · ${open.length} respostas abertas · posições MC ${positions.join("/")} · banco 160`);
