import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";

const wave4=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-wave4.json",import.meta.url),"utf8"));
const items=wave4.items||[];
const allowedCompetencies=new Set(PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam).map(row=>row.id));

assert.equal(wave4.wave,4);
assert.equal(wave4.bankSizeAfterWave,80);
assert.equal(wave4.sourcePolicy,"original-only");
assert.equal(wave4.productionEligible,false);
assert.equal(items.length,20,"a quarta vaga deve acrescentar 20 itens");
assert.equal(new Set(items.map(item=>item.id)).size,20,"IDs da quarta vaga devem ser únicos");
assert.deepEqual(items.map(item=>item.id),Array.from({length:20},(_,index)=>`PT639-FND-${String(index+61).padStart(3,"0")}`));

for(const item of items){
  assert.ok(["10.º","11.º","12.º"].includes(item.year),`${item.id}: ano inválido`);
  assert.ok(["leitura","educacao-literaria","escrita","gramatica"].includes(item.domain),`${item.id}: domínio inválido`);
  assert.ok(allowedCompetencies.has(item.competencyId),`${item.id}: competência fora do exame escrito`);
  assert.equal(item.sourceOrigin,"original",`${item.id}: conteúdo deve ser original`);
  assert.equal(item.reviewStatus,"prototype",`${item.id}: estado editorial deve continuar em protótipo`);
  assert.ok(["multiple-choice","short-answer"].includes(item.responseType),`${item.id}: esta vaga é deliberadamente determinística`);
  assert.equal(item.maxPoints,13,`${item.id}: pontuação estrutural inesperada`);
  assert.ok(String(item.stimulus||"").trim().length>20,`${item.id}: estímulo demasiado curto`);
  assert.ok(String(item.prompt||"").trim().length>10,`${item.id}: instrução demasiado curta`);
  if(item.responseType==="multiple-choice"){
    assert.equal(item.options?.length,4,`${item.id}: escolha múltipla deve ter quatro opções`);
    assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${item.id}: answerIndex inválido`);
    assert.equal(item.gradingMode,"deterministic");
  }else{
    assert.ok(item.acceptedAnswers?.length>=2,`${item.id}: resposta curta deve aceitar equivalentes explícitos`);
    assert.equal(item.gradingMode,"deterministic-with-equivalents");
  }
}

const byDomain=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
assert.deepEqual(byDomain,{leitura:5,"educacao-literaria":5,escrita:5,gramatica:5},"a quarta vaga deve acrescentar cinco itens por domínio");
assert.equal(items.filter(item=>item.domain==="escrita").every(item=>item.competencyId==="pt-escrita-revisao"),true,"a expansão determinística de Escrita deve focar revisão e aperfeiçoamento");
assert.ok(new Set(items.map(item=>item.year)).size===3,"a vaga deve cobrir os três anos do secundário");

console.log("✓ Portuguese wave 4: 20 itens originais · 5 por domínio · 100% determinísticos · banco total 80");
