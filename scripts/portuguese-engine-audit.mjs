import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  buildPortugueseDiagnostic,gradePortugueseResponse,normalizePortugueseAnswer,
  portugueseCoverage,portugueseMissionPool,portugueseWordCount
} from "../app/lib/portugueseEngine.js";

const pilot=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8"));
const items=pilot.items;
const byId=id=>items.find(item=>item.id===id);

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

const coverage=portugueseCoverage(items);
assert.equal(coverage.diagnosticReady,true,"o piloto suporta um diagnóstico interno equilibrado");
assert.equal(coverage.missionReady,false,"12 itens não podem fingir profundidade suficiente para missões");
assert.equal(coverage.pilotReady,false,"a disciplina deve permanecer abaixo do gate de 60 itens");
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
  assert.equal(mission.ready,false,`${domain}: o piloto ainda não deve libertar missões`);
  assert.equal(mission.required,7);
}

console.log("✓ Portuguese engine: deterministic answers, conservative open-response grading, balanced diagnostic and release gates validated");
