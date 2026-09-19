import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {
  assessPortugueseRubricObservation,gradePortugueseResponse,portugueseRubricGuidance,
  restorePortugueseRubricEvidence,rubricObservationEvidenceSnapshot
} from "../app/lib/portugueseEngine.js";

const directory=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const sourceItems=readdirSync(directory)
  .filter(file=>/^portuguese-639-(pilot|wave\d+)\.json$/.test(file))
  .flatMap(file=>JSON.parse(readFileSync(new URL(file,directory),"utf8")).items);
const items=applyPortugueseRubricObservations(sourceItems)
  .filter(item=>["restricted-response","extended-writing"].includes(item.responseType));

function assessScenario(item,evidenceFor){
  let result=gradePortugueseResponse(item,item.referenceAnswer);
  for(const criterion of result.criteria){
    for(const observation of criterion.observations){
      result=assessPortugueseRubricObservation(result,criterion.id,observation.id,evidenceFor(criterion,observation));
    }
  }
  return result;
}

for(const item of items){
  const submitted=gradePortugueseResponse(item,item.referenceAnswer);
  assert.equal(submitted.final,false,`${item.id}: nem a resposta-modelo pode ser classificada automaticamente`);
  assert.equal(submitted.points,null,`${item.id}: a grelha assistida não pode produzir pontos`);
  assert.ok(submitted.criteria.flatMap(criterion=>criterion.observations).length>=submitted.criteria.length,`${item.id}: faltam observações testáveis`);

  const strong=assessScenario(item,()=>"observed");
  assert.equal(strong.rubricCompleted,true,`${item.id}: cenário forte não concluiu a grelha`);
  assert.ok(strong.criteria.every(criterion=>criterion.status==="observed"),`${item.id}: cenário forte não consolidou todos os critérios`);
  assert.equal(portugueseRubricGuidance(strong).needsReview.length,0);

  let observationIndex=0;
  const partial=assessScenario(item,()=>observationIndex++%2===0?"observed":"not-observed");
  assert.equal(partial.rubricCompleted,true,`${item.id}: cenário parcial não concluiu a grelha`);
  assert.ok(partial.criteria.some(criterion=>criterion.status!=="observed"),`${item.id}: cenário parcial foi confundido com resposta forte`);
  assert.ok(portugueseRubricGuidance(partial).needsReview.length>0,`${item.id}: cenário parcial não gerou orientação de revisão`);

  const missing=assessScenario(item,()=>"not-observed");
  assert.ok(missing.criteria.every(criterion=>criterion.status==="not-observed"),`${item.id}: ausência total não foi reconhecida`);
  assert.match(portugueseRubricGuidance(missing).nextAction,/Acrescenta/,`${item.id}: ausência total não gerou ação concreta`);

  const uncertain=assessScenario(item,()=>"unsure");
  assert.ok(uncertain.criteria.every(criterion=>criterion.status==="unsure"),`${item.id}: dúvida não foi preservada`);
  assert.match(portugueseRubricGuidance(uncertain).nextAction,/referência/,`${item.id}: dúvida não remeteu para comparação`);

  const snapshot={rubricId:partial.rubricId,responseText:partial.responseText,rubricObservationEvidence:rubricObservationEvidenceSnapshot(partial)};
  const restored=restorePortugueseRubricEvidence(item,snapshot);
  assert.equal(restored.responseText,snapshot.responseText,`${item.id}: o texto da resposta perdeu-se na retoma`);
  assert.deepEqual(rubricObservationEvidenceSnapshot(restored),snapshot.rubricObservationEvidence,`${item.id}: a evidência atómica perdeu-se na retoma`);
  assert.ok(rubricObservationEvidenceSnapshot(partial).some(row=>row.studentEvidence.length>0),`${item.id}: não foi preservada evidência do aluno`);
  assert.equal(restored.points,null,`${item.id}: retomar uma autoavaliação não pode criar classificação`);
}

console.log(`✓ cenários adversariais de Português: ${items.length} grelhas · forte, parcial, ausente e incerto · persistência atómica · zero classificação automática`);
