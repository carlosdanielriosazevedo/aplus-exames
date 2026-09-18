import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {portugueseObservationGuidance} from "../app/lib/portugueseObservationGuidance.js";

// Carrega os JSON como dados, sem depender de import assertions de JSON do runtime ESM.
// Isto mantém o audit executável em Node 20, a mesma versão usada no CI.
const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const packs=packFiles.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const rawItems=packs.flatMap(pack=>pack.items);
const PORTUGUESE_ITEMS=applyPortugueseRubricObservations(rawItems);
const expectedTotal=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||PORTUGUESE_ITEMS.length;

assert.equal(PORTUGUESE_ITEMS.length,expectedTotal,`o audit deve cobrir o banco completo: esperado ${expectedTotal}, encontrado ${PORTUGUESE_ITEMS.length}`);

const openItems=PORTUGUESE_ITEMS.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
let observations=0;
let specific=0;
let contentObservations=0;
let specificContent=0;
const missingCritical=[];

for(const item of openItems){
  for(const criterion of item.rubric?.criteria||[]){
    for(const observation of criterion.observations||[]){
      observations++;
      const guidance=portugueseObservationGuidance(item,criterion,observation);
      if(guidance.specific)specific++;
      if(criterion.id==="conteudo"){
        contentObservations++;
        if(guidance.specific)specificContent++;
        else missingCritical.push(`${item.id}/${observation.id}`);
      }
      assert.ok(guidance.counts&&guidance.counts.length>=30,`${item.id}/${observation.id}: orientação positiva demasiado vaga`);
      assert.ok(guidance.notEnough&&guidance.notEnough.length>=30,`${item.id}/${observation.id}: contraexemplo demasiado vago`);
      assert.notEqual(guidance.counts,guidance.notEnough,`${item.id}/${observation.id}: orientação positiva e negativa não podem coincidir`);
      assert.doesNotMatch(guidance.counts,/nota|pontos|classifica/i,`${item.id}/${observation.id}: orientação não deve sugerir classificação automática`);
      assert.doesNotMatch(guidance.notEnough,/nota|pontos|classifica/i,`${item.id}/${observation.id}: orientação não deve sugerir classificação automática`);
    }
  }
}

assert.equal(openItems.length,24,`a sexta vaga é determinística; esperadas 24 perguntas abertas já calibradas, encontradas ${openItems.length}`);
assert.ok(observations>=100,`cobertura insuficiente de observações: ${observations}`);
assert.equal(missingCritical.length,0,`todas as observações de conteúdo devem ter microexemplos específicos: ${missingCritical.join(", ")}`);
assert.equal(specificContent,contentObservations,"cobertura específica de conteúdo deve ser total");
assert.ok(specific>=40,`esperados pelo menos 40 microexemplos específicos; encontrados ${specific}`);

const syntaxItem=PORTUGUESE_ITEMS.find(item=>item.id==="PT639-FND-042");
assert.ok(syntaxItem,"PT639-FND-042 deve existir no banco");
const syntaxCriterion=syntaxItem.rubric.criteria.find(criterion=>criterion.id==="funcao");
assert.ok(syntaxCriterion,"PT639-FND-042 deve manter o critério funcao");
const syntaxObservation=syntaxCriterion.observations[0];
const syntaxGuidance=portugueseObservationGuidance(syntaxItem,syntaxCriterion,syntaxObservation);
assert.equal(syntaxGuidance.specific,true,"o caso sintático deve usar orientação específica");
assert.match(syntaxGuidance.counts,/predicativo do sujeito/i,"o caso sintático deve mostrar a evidência concreta esperada");
assert.match(syntaxGuidance.notEnough,/complemento oblíquo/i,"o caso sintático deve explicitar uma confusão plausível que não conta");

const writingItem=PORTUGUESE_ITEMS.find(item=>item.id==="PT639-FND-012");
assert.ok(writingItem,"PT639-FND-012 deve existir no banco");
for(const criterion of writingItem.rubric.criteria){
  for(const observation of criterion.observations){
    const guidance=portugueseObservationGuidance(writingItem,criterion,observation);
    assert.equal(guidance.specific,true,`PT639-FND-012/${observation.id}: escrita extensa deve ter microexemplo específico`);
  }
}

console.log(`✓ orientação das grelhas de Português: ${packFiles.length} pacotes · ${PORTUGUESE_ITEMS.length} itens · ${openItems.length} perguntas abertas · ${observations} observações · ${specific} microexemplos específicos · conteúdo crítico 100% coberto · zero classificação automática`);
