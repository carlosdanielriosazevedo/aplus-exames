import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES} from "../app/data/portugueseFoundation.js";

const files=["portuguese-639-pilot.json","portuguese-639-wave1.json","portuguese-639-wave2.json","portuguese-639-wave3.json","portuguese-639-wave4.json","portuguese-639-wave5.json"];
const packs=files.map(name=>JSON.parse(readFileSync(new URL(`../content/vnext/portuguese/foundation/${name}`,import.meta.url),"utf8")));
const wave5=packs.at(-1);
const all=packs.flatMap(pack=>pack.items);

assert.equal(wave5.wave,5);
assert.equal(wave5.bankSizeAfterWave,100);
assert.equal(wave5.items.length,20,"a quinta vaga deve acrescentar exatamente 20 itens");
assert.equal(wave5.sourcePolicy,"original-only");
assert.equal(wave5.productionEligible,false);
assert.deepEqual([...new Set(wave5.items.map(item=>item.year))].sort(),["10.º","11.º","12.º"],"a vaga deve atravessar os três anos");

const domains=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,wave5.items.filter(item=>item.domain===domain).length]));
assert.deepEqual(domains,{leitura:4,"educacao-literaria":4,escrita:8,gramatica:4},"distribuição da quinta vaga inesperada");
assert.ok(wave5.items.every(item=>["multiple-choice","short-answer"].includes(item.responseType)),"a quinta vaga deve ser totalmente determinística");
assert.ok(wave5.items.every(item=>item.gradingMode==="deterministic"||item.gradingMode==="deterministic-with-equivalents"),"todos os itens devem ter correção determinística");
assert.ok(wave5.items.every(item=>item.sourceOrigin==="original"&&item.reviewStatus==="prototype"),"origem/revisão inválida");

const ids=all.map(item=>item.id);
assert.equal(new Set(ids).size,ids.length,"não podem existir IDs repetidos");
assert.equal(all.length,100,"o banco agregado deve atingir 100 itens");

for(const item of wave5.items){
  assert.ok(item.stimulus?.trim().length>=20,`${item.id}: estímulo demasiado curto`);
  assert.ok(item.prompt?.trim().length>=15,`${item.id}: instrução demasiado curta`);
  assert.ok(item.explanation?.trim().length>=30,`${item.id}: explicação insuficiente`);
  if(item.responseType==="multiple-choice"){
    assert.equal(item.options.length,4,`${item.id}: escolha múltipla deve ter quatro opções`);
    assert.equal(new Set(item.options).size,4,`${item.id}: opções repetidas`);
    assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${item.id}: answerIndex inválido`);
  }else{
    assert.ok(item.acceptedAnswers.length>=2,`${item.id}: resposta curta precisa de equivalentes explícitos`);
  }
}

const written=PORTUGUESE_COMPETENCIES.filter(row=>row.writtenExam);
const counts=new Map();
for(const item of all)counts.set(item.competencyId,(counts.get(item.competencyId)||0)+1);
for(const competency of written){
  assert.ok((counts.get(competency.id)||0)>=6,`${competency.id}: a quinta vaga deve elevar todas as competências escritas a pelo menos 6 itens`);
}
assert.ok((counts.get("pt-escrita-argumentacao")||0)>=7,"argumentação deve receber reforço adicional");
assert.ok((counts.get("pt-escrita-opiniao")||0)>=7,"opinião deve receber reforço adicional");

console.log("✓ quinta vaga de Português: 20 itens determinísticos · banco 100 · 16/16 competências com pelo menos 6 itens · release bloqueado");
