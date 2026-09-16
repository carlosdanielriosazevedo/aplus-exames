import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id===id);
  assert.ok(question,`${id}: item da primeira vaga em falta.`);
  return question;
};

const affine=byId("CRV2-10FUN-AFIM-STEPS-1");
const affineCorrect=gradeResponse(affine,{steps:{model:"C(x)=4+1,5x",substitution:"C(10)=4+1,5×10",value:"19"}});
assert.equal(affineCorrect.points,35);
assert.equal(affineCorrect.correct,true);
const affinePropagated=gradeResponse(affine,{steps:{model:"C(x)=4x+1,5",substitution:"C(10)=4×10+1,5",value:"41,5"}});
assert.equal(affinePropagated.stepResults.find(row=>row.stepId==="model")?.reason,"conceptual_error");
assert.equal(affinePropagated.stepResults.find(row=>row.stepId==="substitution")?.reason,"upstream_error_effect");
assert.equal(affinePropagated.stepResults.find(row=>row.stepId==="value")?.reason,"upstream_error_effect");

const distance=byId("CRV2-10GA-DIST-STEPS-1");
assert.equal(gradeResponse(distance,{steps:{dx:"4",dy:"3",formula:"√(4²+3²)",distance:"5"}}).points,35);

const velocity=byId("CRV2-11CD-TV-STEPS-1");
const reduced=gradeResponse(velocity,{steps:{derivative:"s'(t)=2t",substitution:"s'(2)=2×2",velocity:"4"}});
assert.equal(reduced.stepResults.find(row=>row.stepId==="derivative")?.reason,"conceptual_error");
for(const stepId of ["substitution","velocity"]){
  const row=reduced.stepResults.find(candidate=>candidate.stepId===stepId);
  assert.equal(row?.reason,"upstream_error_effect");
  assert.equal(row?.difficultyReduced,true);
  assert.equal(row?.points,Math.floor(row.maxPoints/2));
}

const exponential=byId("CRV2-12EXPL-MOD-STEPS-1");
const rounded=gradeResponse(exponential,{steps:{substitution:"P(5)=1000×1,07^5",raw:"1402,5517307",rounded:"1403"}});
assert.equal(rounded.points,35);
const wrongRounding=gradeResponse(exponential,"Resultado=1402,5517307=1402");
const final=wrongRounding.stepResults.find(row=>row.stepId==="rounded");
assert.equal(final?.reason,"wrong_final_rounding");
assert.equal(final?.points,12);
assert.equal(final?.classificationConfidence,"high");

console.log("✓ first constructed wave: função afim, distância, taxa de variação, propagação, redução de dificuldade e arredondamento validados");
