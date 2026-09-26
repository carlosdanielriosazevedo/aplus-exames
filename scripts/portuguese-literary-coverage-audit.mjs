import assert from "node:assert/strict";
import {PORTUGUESE_LITERARY_WORKS} from "../app/data/portugueseLiteraryWorks.js";
import {PORTUGUESE_LITERARY_ITEMS} from "../app/data/portugueseLiteraryQuestions.js";

const workById=new Map(PORTUGUESE_LITERARY_WORKS.map(work=>[work.id,work]));
const counts={};
const answerPositions=[0,0,0,0];

assert.ok(PORTUGUESE_LITERARY_WORKS.length>=20,"o catálogo literário deve manter amplitude suficiente");
assert.equal(new Set(PORTUGUESE_LITERARY_WORKS.map(work=>work.id)).size,PORTUGUESE_LITERARY_WORKS.length,"IDs de obras duplicados");

for(const item of PORTUGUESE_LITERARY_ITEMS){
  const work=workById.get(item.literaryWorkId);
  assert.ok(work,`${item.id}: obra literária desconhecida ${item.literaryWorkId}`);
  assert.equal(item.year,work.year,`${item.id}: ano não coincide com o catálogo da obra`);
  assert.equal(item.domain,"educacao-literaria",`${item.id}: item literário fora de Educação Literária`);
  assert.equal(item.responseType,"multiple-choice",`${item.id}: banco literário específico deve manter seleção determinística nesta fase`);
  assert.equal(item.options?.length,4,`${item.id}: escolha múltipla precisa de quatro opções`);
  assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${item.id}: answerIndex inválido`);
  counts[item.literaryWorkId]=(counts[item.literaryWorkId]||0)+1;
  answerPositions[item.answerIndex]++;
}

for(const work of PORTUGUESE_LITERARY_WORKS){
  const items=PORTUGUESE_LITERARY_ITEMS.filter(item=>item.literaryWorkId===work.id);
  assert.ok(items.length>=7,`${work.id}: precisa de pelo menos 7 itens para permitir treino livre por obra`);
  const represented=new Set(items.map(item=>item.competencyId));
  for(const competencyId of work.readyCompetencyIds||[]){
    assert.ok(represented.has(competencyId),`${work.id}: falta a competência declarada ${competencyId}`);
  }
  const positions=[0,0,0,0];
  for(const item of items)positions[item.answerIndex]++;
  assert.ok(Math.max(...positions)/items.length<=0.60,`${work.id}: resposta correta demasiado previsível (${positions.join("/")})`);
}

const total=answerPositions.reduce((sum,count)=>sum+count,0);
for(const count of answerPositions)assert.ok(count/total>=0.15,`posição correta sub-representada no banco literário: ${answerPositions.join("/")}`);
assert.ok(Math.max(...answerPositions)/total<=0.35,`posição correta demasiado concentrada no banco literário: ${answerPositions.join("/")}`);

const byYear=Object.fromEntries(["10.º","11.º","12.º"].map(year=>[year,PORTUGUESE_LITERARY_ITEMS.filter(item=>item.year===year).length]));
console.log(`✓ cobertura literária de Português: ${PORTUGUESE_LITERARY_WORKS.length} obras · ${PORTUGUESE_LITERARY_ITEMS.length} itens · anos ${Object.entries(byYear).map(([year,count])=>year+"="+count).join(" · ")} · respostas A/B/C/D ${answerPositions.join("/")}`);
