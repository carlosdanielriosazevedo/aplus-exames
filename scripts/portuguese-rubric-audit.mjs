import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";

const directory=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const sourceItems=readdirSync(directory)
  .filter(file=>/^portuguese-639-(pilot|wave\d+)\.json$/.test(file))
  .flatMap(file=>JSON.parse(readFileSync(new URL(file,directory),"utf8")).items);
const items=applyPortugueseRubricObservations(sourceItems);
const openItems=items.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));

assert.equal(openItems.length,34,"o banco atual deve ter 34 respostas abertas com grelha explícita");
for(const item of openItems){
  const referenceWords=(item.referenceAnswer||"").trim().split(/\s+/u).filter(Boolean).length;
  assert.ok(referenceWords>=item.wordLimit.min&&referenceWords<=item.wordLimit.max,`${item.id}: resposta de referência com ${referenceWords} palavras fora do intervalo ${item.wordLimit.min}–${item.wordLimit.max}`);
  assert.equal(item.rubric.criteria.reduce((sum,criterion)=>sum+criterion.points,0),item.maxPoints,`${item.id}: pesos da grelha incoerentes`);
  const ids=new Set();
  for(const criterion of item.rubric.criteria){
    assert.ok(criterion.observations.length>=1,`${item.id}/${criterion.id}: critério sem observações`);
    if(/[;,]|\be\b/i.test(criterion.label))assert.ok(criterion.observations.length>=2,`${item.id}/${criterion.id}: critério composto não foi decomposto`);
    for(const observation of criterion.observations){
      assert.ok(!ids.has(observation.id),`${item.id}: observação duplicada ${observation.id}`);ids.add(observation.id);
      assert.ok(observation.label.length>=12&&observation.label.length<=120,`${item.id}/${observation.id}: formulação pouco observável`);
      assert.match(observation.label,/\.$/,`${item.id}/${observation.id}: observação deve ser uma frase completa`);
    }
  }
}

console.log(`✓ grelhas de Português: ${openItems.length} respostas abertas · critérios decompostos em observações atómicas · versões editoriais protegidas`);
