import assert from "node:assert/strict";
import {automaticRubricSummary} from "../app/lib/automaticEvidenceGrader.js";
import {buildScoreExplainability} from "../app/lib/scoreExplainability.js";

const allSolid=[
  {id:"c1",label:"Identifica a crítica",points:5,status:"observed",scoreRatio:.82,confidence:.81},
  {id:"c2",label:"Relaciona com o texto",points:4,status:"observed",scoreRatio:.91,confidence:.82},
  {id:"c3",label:"Qualidade da expressão",points:4,status:"observed",scoreRatio:.74,confidence:.80}
];
const solidSummary=automaticRubricSummary(allSolid,13);
assert.equal(solidSummary.provisionalPoints,13,"todos os critérios sólidos têm de valer a cotação máxima, independentemente da confiança/score semântico");
assert.deepEqual(solidSummary.criterionPoints.map(row=>row.lostPoints),[0,0,0]);

const partial=[
  {id:"c1",label:"Identifica a crítica",points:5,status:"observed",scoreRatio:.8,confidence:.81},
  {id:"c2",label:"Relaciona com o texto",points:4,status:"observed",scoreRatio:.8,confidence:.81},
  {id:"c3",label:"Qualidade da expressão",points:4,status:"partial",scoreRatio:.575,confidence:.75}
];
const partialSummary=automaticRubricSummary(partial,13);
assert.ok(partialSummary.provisionalPoints<13);
const pointMap=new Map(partialSummary.criterionPoints.map(row=>[row.id,row]));
const scored=partial.map(row=>({...row,...pointMap.get(row.id)}));
const explained=buildScoreExplainability({awardedPoints:partialSummary.provisionalPoints,maxPoints:13,criteria:scored});
assert.equal(explained.explainable,true,"qualquer perda deve ficar atribuída a pelo menos um critério");
assert.equal(explained.consistencyError,null);
assert.equal(explained.reasons.length,1);
assert.equal(explained.reasons[0].id,"c3");
assert.ok(explained.reasons[0].lostPoints>0);

const impossible=buildScoreExplainability({
  awardedPoints:11.3,maxPoints:13,
  criteria:allSolid.map(row=>({...row,awardedPoints:row.points,lostPoints:0}))
});
assert.equal(impossible.consistencyError,"ALL_CRITERIA_SOLID_BUT_SCORE_BELOW_MAX","caso dos prints de Português tem de ser bloqueado como incoerência");
assert.equal(impossible.explainable,false);
assert.equal(impossible.requiresReview,true);

const math=buildScoreExplainability({
  awardedPoints:8,maxPoints:10,
  steps:[
    {stepId:"s1",label:"Método",status:"correct",points:6,maxPoints:6},
    {stepId:"s2",label:"Resultado final",status:"partial",points:2,maxPoints:4,reason:"wrong_final_rounding"}
  ]
});
assert.equal(math.explainable,true);
assert.equal(math.reasons[0].lostPoints,2);

console.log("SCORE EXPLAINABILITY: GO");
