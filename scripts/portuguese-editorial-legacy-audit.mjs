import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const dir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packs=[1,2,3,4,5].map(wave=>JSON.parse(readFileSync(new URL(`portuguese-639-wave${wave}.json`,dir),"utf8")));
const items=packs.flatMap(pack=>pack.items);
const byId=id=>{
  const item=items.find(row=>row.id===id);
  assert.ok(item,`${id}: item revisto em falta`);
  return item;
};

const revisedIds=[
  "PT639-FND-013","PT639-FND-014","PT639-FND-017","PT639-FND-018","PT639-FND-025","PT639-FND-028",
  "PT639-FND-032","PT639-FND-034","PT639-FND-041",
  "PT639-FND-046","PT639-FND-049","PT639-FND-052",
  "PT639-FND-061","PT639-FND-062","PT639-FND-064","PT639-FND-065","PT639-FND-066","PT639-FND-067","PT639-FND-068","PT639-FND-069","PT639-FND-076","PT639-FND-077","PT639-FND-078","PT639-FND-079",
  "PT639-FND-081","PT639-FND-083","PT639-FND-084","PT639-FND-085","PT639-FND-086","PT639-FND-087","PT639-FND-088","PT639-FND-089","PT639-FND-090","PT639-FND-091","PT639-FND-092","PT639-FND-093","PT639-FND-094","PT639-FND-095","PT639-FND-096"
];
assert.equal(new Set(revisedIds).size,revisedIds.length,"IDs revistos devem ser únicos");
assert.equal(revisedIds.length,39,"esta passagem deve proteger 39 itens revistos");

const longFormCompetencies=new Set([
  "pt-leitura-inferencia","pt-leitura-organizacao","pt-leitura-informacao","pt-leitura-coesao",
  "pt-literatura-voz","pt-literatura-temas","pt-literatura-forma",
  "pt-escrita-revisao","pt-escrita-exposicao","pt-escrita-argumentacao","pt-escrita-opiniao"
]);

for(const id of revisedIds){
  const item=byId(id);
  if(item.responseType==="multiple-choice"){
    assert.equal(item.options.length,4,`${id}: escolha múltipla deve manter quatro opções`);
    assert.equal(new Set(item.options.map(option=>option.trim().toLocaleLowerCase("pt-PT"))).size,4,`${id}: opções devem ser distintas`);
    assert.ok(Number.isInteger(item.answerIndex)&&item.answerIndex>=0&&item.answerIndex<4,`${id}: answerIndex inválido`);
    if(longFormCompetencies.has(item.competencyId)){
      const distractors=item.options.filter((_,index)=>index!==item.answerIndex);
      assert.ok(distractors.every(option=>option.split(/\s+/u).filter(Boolean).length>=4),`${id}: distrator discursivo demasiado curto/caricatural`);
    }
  }
}

assert.deepEqual(byId("PT639-FND-079").acceptedAnswers,[
  "ordenação temporal","sequência temporal","organização temporal","sequenciação temporal",
  "ordenação cronológica","sequência cronológica","organização cronológica","sequenciação cronológica"
],"PT639-FND-079 deve aceitar equivalentes temporais e cronológicos claros");

assert.equal(byId("PT639-FND-092").answerIndex,2);
assert.match(byId("PT639-FND-092").options[2],/risco rodoviário/u);
assert.equal(byId("PT639-FND-094").answerIndex,3);
assert.match(byId("PT639-FND-094").options[3],/Embora possam causar distração/u);
assert.equal(byId("PT639-FND-096").answerIndex,2);
assert.match(byId("PT639-FND-096").options[2],/Repete a mesma ideia/u);

console.log(`✓ revisão editorial legado Português: ${revisedIds.length} itens protegidos nas vagas 1–5; distratores discursivos e equivalentes cronológicos validados`);
