import assert from "node:assert/strict";
import {PORTUGUESE_ITEMS} from "../app/data/portugueseContent.js";
import {portugueseObservationGuidance} from "../app/lib/portugueseObservationGuidance.js";

const openItems=PORTUGUESE_ITEMS.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
let observations=0;

for(const item of openItems){
  for(const criterion of item.rubric?.criteria||[]){
    for(const observation of criterion.observations||[]){
      observations++;
      const guidance=portugueseObservationGuidance(item,criterion,observation);
      assert.ok(guidance.counts&&guidance.counts.length>=30,`${item.id}/${observation.id}: orientação positiva demasiado vaga`);
      assert.ok(guidance.notEnough&&guidance.notEnough.length>=30,`${item.id}/${observation.id}: contraexemplo demasiado vago`);
      assert.notEqual(guidance.counts,guidance.notEnough,`${item.id}/${observation.id}: orientação positiva e negativa não podem coincidir`);
      assert.doesNotMatch(guidance.counts,/nota|pontos|classifica/i,`${item.id}/${observation.id}: orientação não deve sugerir classificação automática`);
      assert.doesNotMatch(guidance.notEnough,/nota|pontos|classifica/i,`${item.id}/${observation.id}: orientação não deve sugerir classificação automática`);
    }
  }
}

assert.ok(openItems.length===24,`esperadas 24 perguntas abertas; encontradas ${openItems.length}`);
assert.ok(observations>=100,`cobertura insuficiente de observações: ${observations}`);

const syntaxItem=PORTUGUESE_ITEMS.find(item=>item.id==="PT639-FND-042");
const syntaxCriterion=syntaxItem.rubric.criteria.find(criterion=>criterion.id==="funcao");
const syntaxObservation=syntaxCriterion.observations[0];
const syntaxGuidance=portugueseObservationGuidance(syntaxItem,syntaxCriterion,syntaxObservation);
assert.match(syntaxGuidance.counts,/predicativo do sujeito/i,"o caso sintático deve mostrar a evidência concreta esperada");
assert.match(syntaxGuidance.notEnough,/complemento oblíquo/i,"o caso sintático deve explicitar uma confusão plausível que não conta");

console.log(`✓ orientação das grelhas de Português: ${openItems.length} perguntas abertas · ${observations} observações com exemplos positivos/negativos · zero classificação automática`);
