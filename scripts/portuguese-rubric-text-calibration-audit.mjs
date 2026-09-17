import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {PORTUGUESE_RUBRIC_CALIBRATION} from "../app/data/portugueseRubricCalibration.js";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {assessPortugueseRubricObservation,gradePortugueseResponse,portugueseRubricGuidance,portugueseWordCount} from "../app/lib/portugueseEngine.js";

const directory=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const items=applyPortugueseRubricObservations(readdirSync(directory)
  .filter(file=>/^portuguese-639-(pilot|wave\d+)\.json$/.test(file))
  .flatMap(file=>JSON.parse(readFileSync(new URL(file,directory),"utf8")).items))
  .filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
const itemIds=new Set(items.map(item=>item.id));
const seenResponses=new Set();

assert.deepEqual(new Set(Object.keys(PORTUGUESE_RUBRIC_CALIBRATION)),itemIds,"o corpus textual deve cobrir exatamente as respostas abertas atuais");

for(const item of items){
  const calibration=PORTUGUESE_RUBRIC_CALIBRATION[item.id];
  assert.deepEqual(Object.keys(calibration).sort(),["fluentWrong","partial"],`${item.id}: exige casos parcial e fluentemente errado`);
  const criterionIds=item.rubric.criteria.map(criterion=>criterion.id).sort();

  for(const [caseId,scenario] of Object.entries(calibration)){
    const words=portugueseWordCount(scenario.response);
    assert.ok(words>=10,`${item.id}/${caseId}: resposta demasiado curta para testar uma grelha`);
    assert.ok(!seenResponses.has(scenario.response),`${item.id}/${caseId}: resposta de calibração repetida`);
    seenResponses.add(scenario.response);
    assert.deepEqual(Object.keys(scenario.expected).sort(),criterionIds,`${item.id}/${caseId}: resultado esperado não cobre todos os critérios`);

    let result=gradePortugueseResponse(item,scenario.response);
    assert.equal(result.final,false,`${item.id}/${caseId}: um texto de calibração recebeu decisão automática`);
    assert.equal(result.points,null,`${item.id}/${caseId}: um texto de calibração recebeu pontos automáticos`);
    for(const criterion of result.criteria){
      const evidence=scenario.expected[criterion.id];
      assert.ok(["observed","partial","not-observed","unsure"].includes(evidence),`${item.id}/${caseId}/${criterion.id}: evidência inválida`);
      for(const observation of criterion.observations){
        result=assessPortugueseRubricObservation(result,criterion.id,observation.id,evidence);
      }
    }
    assert.equal(result.rubricCompleted,true,`${item.id}/${caseId}: cenário não concluiu a grelha`);
    for(const criterion of result.criteria)assert.equal(criterion.status,scenario.expected[criterion.id],`${item.id}/${caseId}/${criterion.id}: síntese diferente da decisão editorial`);
    assert.equal(result.points,null,`${item.id}/${caseId}: a autoavaliação criou pontuação`);

    const statuses=Object.values(scenario.expected);
    if(caseId==="partial"){
      assert.ok(statuses.includes("observed"),`${item.id}: caso parcial não preserva nenhum elemento válido`);
      assert.ok(statuses.some(status=>status!=="observed"),`${item.id}: caso parcial é indistinguível da resposta forte`);
      assert.ok(portugueseRubricGuidance(result).needsReview.length>0,`${item.id}: caso parcial não produz revisão acionável`);
    }else{
      const languageId=criterionIds.find(id=>/lingua|linguistica/i.test(id));
      if(languageId)assert.equal(scenario.expected[languageId],"observed",`${item.id}: caso fluentemente errado deve isolar correção linguística de conteúdo`);
      assert.ok(criterionIds.filter(id=>id!==languageId).every(id=>scenario.expected[id]!=="observed"),`${item.id}: caso fluentemente errado foi aceite num critério substantivo`);
    }
  }
}

console.log(`✓ calibração textual de Português: ${items.length} perguntas · ${seenResponses.size} respostas de fronteira únicas · conteúdo separado de fluência · zero classificação automática`);
