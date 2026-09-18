import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {buildPortugueseExamBlocks,buildPortuguesePassagePrototypeExam,materializePortuguesePassageItems,portugueseExamReadingLoad,validatePortugueseSharedPassages} from "../app/lib/portuguesePassages.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";

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
  assert.equal(passage.items?.length,3,`${passage.passageId}: deve ter exatamente três itens completos nesta primeira vaga`);
  assert.ok(new Set(passage.items.map(item=>item.competencyId)).size>=2,`${passage.passageId}: o grupo deve mobilizar mais de uma competência`);
  assert.ok(passage.items.some(item=>item.responseType==="multiple-choice"),`${passage.passageId}: falta item de seleção`);
  assert.ok(passage.items.some(item=>item.responseType==="restricted-response"),`${passage.passageId}: falta item de construção`);
  assert.ok(passage.items.every(item=>item.responseType!=="extended-writing"),`${passage.passageId}: escrita extensa não deve ficar presa a um texto-base desta camada`);
}

const materialized=materializePortuguesePassageItems(prototype);
assert.equal(materialized.length,6,"a primeira vaga deve materializar seis itens completos");
assert.equal(new Set(materialized.map(item=>item.id)).size,6,"IDs dos seis itens devem ser únicos");
assert.ok(materialized.every(item=>item.passageId&&item.passageText&&item.stimulus===null),"cada item deve herdar o texto partilhado sem duplicá-lo como stimulus");

const blocks=buildPortugueseExamBlocks(materialized);
assert.equal(blocks.length,2,"seis itens devem renderizar como dois blocos de texto");
assert.ok(blocks.every(block=>block.type==="shared-passage"&&block.items.length===3),"cada texto deve aparecer uma vez e servir três perguntas");
assert.equal(portugueseExamReadingLoad(materialized),prototype.passages.reduce((sum,passage)=>sum+words(passage.text),0),"carga de leitura deve contar cada texto uma única vez");

const exam=buildPortuguesePassagePrototypeExam(prototype);
assert.equal(exam.itemCount,6,"o protótipo de mini-exame deve ter seis itens");
assert.equal(exam.blocks.length,2,"o protótipo deve apresentar dois blocos de texto");
assert.equal(exam.maxPoints,78,"seis itens de 13 pontos devem totalizar 78 pontos nesta unidade protótipo");
assert.deepEqual(exam.responseTypes,{"multiple-choice":4,"restricted-response":2},"mistura de formatos inesperada");
assert.ok(exam.readingWords>=360&&exam.readingWords<=640,"carga de leitura do protótipo fora do intervalo previsto para dois textos");

const multipleChoice=materialized.filter(item=>item.responseType==="multiple-choice");
const restricted=materialized.filter(item=>item.responseType==="restricted-response");
assert.equal(multipleChoice.length,4,"a primeira vaga deve ter quatro itens de escolha múltipla");
assert.equal(restricted.length,2,"a primeira vaga deve ter duas respostas restritas");
for(const item of multipleChoice){
  assert.equal(item.options?.length,4,`${item.id}: escolha múltipla deve ter quatro opções`);
  assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${item.id}: answerIndex inválido`);
  assert.ok(item.explanation?.length>=40,`${item.id}: explicação demasiado curta`);
  const result=gradePortugueseResponse(item,item.answerIndex);
  assert.equal(result.final,true,`${item.id}: escolha múltipla deve ter correção determinística final`);
  assert.equal(result.correct,true,`${item.id}: answerIndex deve ser reconhecido como correto`);
}
for(const item of restricted){
  const referenceWords=words(item.referenceAnswer);
  assert.ok(referenceWords>=item.wordLimit.min&&referenceWords<=item.wordLimit.max,`${item.id}: resposta de referência fora do intervalo`);
  assert.equal(item.rubric.criteria.reduce((sum,criterion)=>sum+criterion.points,0),item.maxPoints,`${item.id}: pesos da grelha incoerentes`);
  const result=gradePortugueseResponse(item,item.referenceAnswer);
  assert.equal(result.final,false,`${item.id}: resposta aberta não pode receber classificação final automática`);
  assert.equal(result.points,null,`${item.id}: resposta aberta não pode receber pontos automáticos`);
}

const sharedText="Texto suficientemente longo para testar que o mesmo estímulo é apresentado uma única vez num bloco de exame, apesar de servir várias perguntas.";
const fixture=[
  {id:"A",passageId:"P1",passageTitle:"Texto 1",passageText:sharedText,stimulus:"não deve contar duas vezes"},
  {id:"B",passageId:"P1",passageTitle:"Texto 1",passageText:sharedText,stimulus:"não deve contar duas vezes"},
  {id:"C",stimulus:"Estímulo autónomo com algumas palavras."}
];
const fixtureBlocks=buildPortugueseExamBlocks(fixture);
assert.equal(fixtureBlocks.length,2,"duas perguntas sobre o mesmo texto devem formar um único bloco mais um item autónomo");
assert.equal(fixtureBlocks[0].type,"shared-passage");
assert.deepEqual(fixtureBlocks[0].itemIds,["A","B"]);
assert.equal(fixtureBlocks[1].type,"single-item");
assert.equal(portugueseExamReadingLoad(fixture),words(sharedText)+words(fixture[2].stimulus),"carga de leitura não pode duplicar texto partilhado");

assert.throws(()=>validatePortugueseSharedPassages([
  {id:"A",passageId:"P",passageText:"texto um"},
  {id:"B",passageId:"P",passageText:"texto dois"}
]),/passageText diferente/u,"um passageId não pode apontar para textos diferentes");

assert.throws(()=>validatePortugueseSharedPassages([{id:"A",passageId:"P"}]),/exige passageText/u,"passageId sem texto deve falhar");
assert.throws(()=>buildPortuguesePassagePrototypeExam({...prototype,status:"live"}),/prototype-not-live/u,"construtor de protótipo não deve aceitar conteúdo live por acidente");

console.log(`✓ grupos de texto Português: ${prototype.passages.length} textos originais · ${materialized.length} itens completos · mini-exame 78 pontos · 4 seleção + 2 construção · renderização sem duplicação validada`);
