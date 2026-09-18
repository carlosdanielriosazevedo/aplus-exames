import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {
  PORTUGUESE_RUBRIC_EVIDENCE,assessPortugueseRubricCriterion,assessPortugueseRubricObservation,buildAdaptivePortugueseMission,buildPortugueseDiagnostic,gradePortugueseResponse,normalizePortugueseAnswer,
  portugueseCompetencePriorities,portugueseCoverage,portugueseMissionPool,portugueseRubricGuidance,portugueseStructuralChallenge,portugueseWordCount,restorePortugueseRubricEvidence,rubricEvidenceSnapshot,rubricObservationEvidenceSnapshot
} from "../app/lib/portugueseEngine.js";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";

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
const expectedTotal=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||rawItems.length;
const items=applyPortugueseRubricObservations(rawItems);
const byId=id=>items.find(item=>item.id===id);

assert.equal(items.length,expectedTotal,"o motor deve receber o banco completo declarado pela vaga mais recente");
assert.equal(normalizePortugueseAnswer("  ORAÇÃO «completiva». "),"oracao completiva");
assert.equal(portugueseWordCount("Uma resposta com cinco palavras."),5);

const multipleChoice=gradePortugueseResponse(byId("PT639-FND-001"),2);
assert.deepEqual({status:multipleChoice.status,final:multipleChoice.final,points:multipleChoice.points},{status:"final",final:true,points:13});
assert.equal(gradePortugueseResponse(byId("PT639-FND-001"),0).points,0);
assert.equal(gradePortugueseResponse(byId("PT639-FND-001"),"").status,"unanswered");

const equivalent=gradePortugueseResponse(byId("PT639-FND-008"),"Oração completiva.");
assert.equal(equivalent.correct,true,"equivalentes declarados devem ser aceites após normalização conservadora");
assert.equal(gradePortugueseResponse(byId("PT639-FND-008"),"oração subordinada adjetiva relativa").points,0);

const restricted=gradePortugueseResponse(byId("PT639-FND-005"),"A fotografia guarda uma memória e confronta a identidade atual com uma identidade passada.");
assert.equal(restricted.final,false,"respostas abertas nunca recebem classificação final automática");
assert.equal(restricted.points,null);
assert.equal(restricted.status,"awaiting-rubric");
assert.ok(restricted.criteria.every(criterion=>criterion.status==="pending"));
assert.ok(restricted.criteria.every(criterion=>criterion.observable===true));
assert.ok(restricted.criteria.flatMap(criterion=>criterion.observations).every(observation=>observation.status==="pending"));
assert.equal(PORTUGUESE_RUBRIC_EVIDENCE.length,4);
let guided=restricted;
for(const criterion of restricted.criteria){
  for(const observation of criterion.observations)guided=assessPortugueseRubricObservation(guided,criterion.id,observation.id,criterion.id==="conteudo"?"observed":"unsure");
}
assert.equal(guided.status,"self-assessed-awaiting-review");
assert.equal(guided.rubricCompleted,true);
assert.equal(guided.final,false);
assert.equal(guided.points,null,"a autoavaliação nunca pode produzir uma classificação final");
const restored=restorePortugueseRubricEvidence(items.find(item=>item.id==="PT639-FND-005"),{rubricId:guided.rubricId,rubricEvidence:rubricEvidenceSnapshot(guided),rubricObservationEvidence:rubricObservationEvidenceSnapshot(guided)});
assert.deepEqual(rubricObservationEvidenceSnapshot(restored),rubricObservationEvidenceSnapshot(guided),"a evidência por observação deve sobreviver à retoma");
const legacy=restorePortugueseRubricEvidence(items.find(item=>item.id==="PT639-FND-005"),{rubricId:guided.rubricId,rubricEvidence:rubricEvidenceSnapshot(guided)});
assert.deepEqual(rubricEvidenceSnapshot(legacy),rubricEvidenceSnapshot(guided),"sessões antigas com evidência apenas por critério devem continuar recuperáveis");
assert.equal(restorePortugueseRubricEvidence(byId("PT639-FND-005"),{rubricId:"stale",rubricEvidence:[]}),null,"uma grelha editorial alterada invalida a evidência antiga");
const guidance=portugueseRubricGuidance(guided);
assert.equal(guidance.complete,true);
assert.equal(guidance.finalScore,null,"a orientação nunca pode ser convertida numa nota");
assert.equal(guidance.observed.length,1);
assert.equal(guidance.uncertain.length,2);
assert.equal(guidance.reviewObservations.length,5,"a orientação deve enumerar observações concretas por rever");
assert.match(guidance.nextAction,/resposta de referência/);
assert.throws(()=>assessPortugueseRubricCriterion(restricted,"inexistente","observed"));
assert.throws(()=>assessPortugueseRubricObservation(restricted,"conteudo","inexistente","observed"));
assert.throws(()=>assessPortugueseRubricCriterion(restricted,"conteudo","automatic-score"));

const coverage=portugueseCoverage(items);
assert.equal(coverage.diagnosticReady,true,"o banco suporta um diagnóstico interno equilibrado");
assert.equal(coverage.total,expectedTotal);
assert.equal(coverage.missionReady,true,"cada domínio deve ter sete itens realmente elegíveis para missões");
assert.equal(coverage.pilotReady,true,"o banco deve manter o gate quantitativo de piloto");
assert.equal(coverage.productionEligible,false);

const diagnostic=buildPortugueseDiagnostic(items);
assert.equal(diagnostic.length,8);
assert.equal(new Set(diagnostic.map(item=>item.id)).size,8);
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  assert.equal(diagnostic.filter(item=>item.domain===domain).length,2,`${domain}: o diagnóstico exige dois itens`);
}
assert.ok(diagnostic.every(item=>item.responseType!=="extended-writing"),"o diagnóstico curto não deve incluir produção extensa");

for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  const mission=portugueseMissionPool(items,{domain});
  assert.equal(mission.ready,true,`${domain}: deve manter o mínimo estrutural de missão`);
  assert.equal(mission.required,7);
  assert.ok(mission.items.length>=7);
}

const adaptiveProgress={
  competence:{
    "pt-leitura-informacao":{deterministicAttempts:3,correct:3},
    "pt-leitura-inferencia":{deterministicAttempts:3,correct:0},
    "pt-gramatica-oracoes":{deterministicAttempts:2,correct:0}
  },
  missionHistory:[{itemIds:["PT639-FND-001","PT639-FND-002","PT639-FND-003"]}]
};
const priorities=portugueseCompetencePriorities(items,adaptiveProgress);
assert.ok(priorities.findIndex(row=>row.competencyId==="pt-leitura-inferencia")<priorities.findIndex(row=>row.competencyId==="pt-leitura-informacao"),"uma fragilidade confirmada deve preceder uma competência dominada");

const adaptive=buildAdaptivePortugueseMission(items,{progress:adaptiveProgress});
assert.equal(adaptive.items.length,7);
assert.equal(new Set(adaptive.items.map(item=>item.id)).size,7);
assert.ok(["structural-proxy","editorial-provisional"].includes(adaptive.challengeSource));
assert.ok(adaptive.targetCompetencyIds.includes("pt-leitura-inferencia"));
assert.ok(adaptive.items.filter(item=>item.responseType==="restricted-response").length<=2,"uma missão curta não deve acumular respostas abertas por corrigir");
for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  assert.ok(adaptive.items.filter(item=>item.domain===domain).length<=3,"a missão recomendada não deve ficar monopolizada por um domínio");
}
assert.ok(adaptive.recentItemsAvoided>=4,"o motor deve evitar repetição recente quando existe alternativa");
assert.equal(portugueseStructuralChallenge({cognitive:"reconhecer"}),1);
assert.equal(portugueseStructuralChallenge({cognitive:"criar"}),4);

const grammarMission=buildAdaptivePortugueseMission(items,{progress:adaptiveProgress,domain:"gramatica"});
assert.ok(grammarMission.items.every(item=>item.domain==="gramatica"));
assert.equal(grammarMission.items.length,7);

console.log(`✓ Portuguese engine: ${expectedTotal} items, deterministic answers, conservative open-response grading, balanced diagnostic, adaptive missions and release gates validated`);
