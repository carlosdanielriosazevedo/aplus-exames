import assert from "node:assert/strict";
import {PORTUGUESE_ITEMS} from "../app/data/portugueseContent.js";
import {buildPortugueseBoundaryCases} from "../app/data/portugueseBoundaryCases.js";
import {gradePortugueseResponse,portugueseWordCount} from "../app/lib/portugueseEngine.js";
import {portugueseObservationGuidance} from "../app/lib/portugueseObservationGuidance.js";

const openItems=PORTUGUESE_ITEMS.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
const cases=buildPortugueseBoundaryCases(PORTUGUESE_ITEMS);
let guidedObservations=0;

assert.equal(cases.length,openItems.length,"todas as respostas abertas devem ter casos-limite");
assert.ok(cases.length>0,"devem existir casos-limite de Português");

for(const testCase of cases){
  const item=openItems.find(row=>row.id===testCase.itemId);
  assert.ok(item,`item em falta: ${testCase.itemId}`);

  const contradictoryText=testCase.contradictory.response.trim();
  assert.ok(contradictoryText.length>0,`${item.id}: caso contraditório vazio`);
  assert.ok(Object.values(testCase.contradictory.expected).some(status=>status==="not-observed"||status==="partial"),`${item.id}: caso contraditório sem falha editorial esperada`);

  const formal=testCase.formalContentFailure;
  const words=portugueseWordCount(formal.response);
  assert.equal(words,formal.wordCount,`${item.id}: contagem de palavras inconsistente`);
  assert.ok(words>=item.wordLimit.min&&words<=item.wordLimit.max,`${item.id}: resposta formal fora do limite ${item.wordLimit.min}-${item.wordLimit.max}`);
  assert.ok(Object.entries(formal.expected).some(([criterion,status])=>!["lingua","correcao-linguistica","estrutura","coerencia","discurso"].includes(criterion)&&status==="not-observed"),`${item.id}: falta um critério de conteúdo explicitamente não observado`);

  const result=gradePortugueseResponse(item,formal.response);
  assert.equal(result.final,false,`${item.id}: cumprir a extensão nunca pode produzir classificação final automática`);
  assert.equal(result.points,null,`${item.id}: cumprir a extensão nunca pode atribuir pontos automaticamente`);
  assert.equal(result.correct,null,`${item.id}: cumprir a extensão nunca pode marcar a resposta como correta`);
  assert.equal(result.wordLimit.within,true,`${item.id}: o motor deve reconhecer apenas a conformidade formal da extensão`);

  for(const criterion of item.rubric?.criteria||[]){
    for(const observation of criterion.observations||[]){
      guidedObservations++;
      const guidance=portugueseObservationGuidance(item,criterion,observation);
      assert.ok(guidance.counts?.length>=30,`${item.id}/${observation.id}: exemplo positivo demasiado vago`);
      assert.ok(guidance.notEnough?.length>=30,`${item.id}/${observation.id}: exemplo negativo demasiado vago`);
      assert.notEqual(guidance.counts,guidance.notEnough,`${item.id}/${observation.id}: exemplos positivo e negativo não podem coincidir`);
    }
  }
}

const uniqueFormal=new Set(cases.map(row=>row.formalContentFailure.response));
assert.ok(uniqueFormal.size>=1,"devem existir respostas formais de controlo");
assert.ok(guidedObservations>=100,`cobertura insuficiente de observações guiadas: ${guidedObservations}`);

const syntaxItem=PORTUGUESE_ITEMS.find(item=>item.id==="PT639-FND-042");
const syntaxCriterion=syntaxItem.rubric.criteria.find(criterion=>criterion.id==="funcao");
const syntaxGuidance=portugueseObservationGuidance(syntaxItem,syntaxCriterion,syntaxCriterion.observations[0]);
assert.match(syntaxGuidance.counts,/predicativo do sujeito/i);
assert.match(syntaxGuidance.notEnough,/complemento oblíquo/i);

console.log(`✓ casos-limite de Português: ${cases.length}/${openItems.length} perguntas abertas · ${guidedObservations} observações guiadas · extensão separada do conteúdo · zero nota automática`);
