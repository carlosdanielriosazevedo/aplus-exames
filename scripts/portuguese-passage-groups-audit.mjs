import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildPortugueseExamBlocks,portugueseExamReadingLoad,validatePortugueseSharedPassages} from "../app/lib/portuguesePassages.js";

const prototype=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/portuguese-639-passage-prototypes.json",import.meta.url),"utf8"));
assert.equal(prototype.subjectId,"portuguese");
assert.equal(prototype.examCode,"639");
assert.equal(prototype.status,"prototype-not-live");
assert.equal(prototype.sourcePolicy,"original-only");
assert.ok(Array.isArray(prototype.passages)&&prototype.passages.length>=2,"devem existir pelo menos dois protótipos de texto partilhado");

const words=value=>String(value||"").trim().split(/\s+/u).filter(Boolean).length;
const ids=new Set();
for(const passage of prototype.passages){
  assert.match(passage.passageId,/^PT639-PASSAGE-/u);
  assert.ok(!ids.has(passage.passageId),`${passage.passageId}: passageId duplicado`);
  ids.add(passage.passageId);
  assert.equal(passage.sourceOrigin,"original",`${passage.passageId}: apenas texto original nesta fase`);
  assert.ok(["leitura","educacao-literaria"].includes(passage.domain),`${passage.passageId}: domínio inesperado`);
  const count=words(passage.text);
  assert.ok(count>=180&&count<=320,`${passage.passageId}: texto deve ter 180–320 palavras; tem ${count}`);
  assert.ok(Array.isArray(passage.plannedItems)&&passage.plannedItems.length>=3,`${passage.passageId}: exige pelo menos três itens associados`);
  assert.ok(new Set(passage.plannedItems.map(item=>item.competencyId)).size>=2,`${passage.passageId}: o grupo deve mobilizar mais de uma competência`);
  assert.ok(passage.plannedItems.some(item=>item.responseType==="multiple-choice"),`${passage.passageId}: falta item de seleção`);
  assert.ok(passage.plannedItems.some(item=>item.responseType==="restricted-response"),`${passage.passageId}: falta item de construção`);
  assert.ok(passage.plannedItems.every(item=>item.responseType!=="extended-writing"),`${passage.passageId}: escrita extensa não deve ficar presa a um texto-base desta camada`);
}

const sharedText="Texto suficientemente longo para testar que o mesmo estímulo é apresentado uma única vez num bloco de exame, apesar de servir várias perguntas.";
const fixture=[
  {id:"A",passageId:"P1",passageTitle:"Texto 1",passageText:sharedText,stimulus:"não deve contar duas vezes"},
  {id:"B",passageId:"P1",passageTitle:"Texto 1",passageText:sharedText,stimulus:"não deve contar duas vezes"},
  {id:"C",stimulus:"Estímulo autónomo com algumas palavras."}
];
const blocks=buildPortugueseExamBlocks(fixture);
assert.equal(blocks.length,2,"duas perguntas sobre o mesmo texto devem formar um único bloco mais um item autónomo");
assert.equal(blocks[0].type,"shared-passage");
assert.deepEqual(blocks[0].itemIds,["A","B"]);
assert.equal(blocks[1].type,"single-item");
assert.equal(portugueseExamReadingLoad(fixture),words(sharedText)+words(fixture[2].stimulus),"carga de leitura não pode duplicar texto partilhado");

assert.throws(()=>validatePortugueseSharedPassages([
  {id:"A",passageId:"P",passageText:"texto um"},
  {id:"B",passageId:"P",passageText:"texto dois"}
]),/passageText diferente/u,"um passageId não pode apontar para textos diferentes");

assert.throws(()=>validatePortugueseSharedPassages([{id:"A",passageId:"P"}]),/exige passageText/u,"passageId sem texto deve falhar");

console.log(`✓ grupos de texto Português: ${prototype.passages.length} protótipos originais · 180–320 palavras · seleção + construção · renderização sem duplicação validada`);
