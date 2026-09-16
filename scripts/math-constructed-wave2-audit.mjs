import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id===id);
  assert.ok(question,`${id}: item da segunda vaga em falta.`);
  return question;
};

const modulus=byId("CRV2-10FUN-MOD-STEPS-1");
const modulusGrade=gradeResponse(modulus,{steps:{vertex:"V=(2,-1)",equation:"|x-2|=1",branches:"x-2=1 ou x-2=-1",zeros:"Z={1,3}"}});
assert.equal(modulusGrade.points,35);
assert.equal(modulusGrade.correct,true);

const tangent=byId("CRV2-11CD-TAN-STEPS-1");
const tangentEquivalent=gradeResponse(tangent,{steps:{point:"P(1,1)",derivative:"f'(x)=2x",slope:"2",line:"y-1=2(x-1)"}});
assert.equal(tangentEquivalent.points,35);
assert.equal(tangentEquivalent.correct,true);

const complex=byId("CRV2-12CPLX-TRIG-STEPS-1");
const complexGrade=gradeResponse(complex,{steps:{modulus:"|z|=2",quadrant:"Segundo quadrante.",argument:"2pi/3",trig:"z=2(cos(2pi/3)+i sin(2pi/3))"}});
assert.equal(complexGrade.points,35);
assert.equal(complexGrade.correct,true);

const logarithm=byId("CRV2-12EXPL-LOG-STEPS-1");
const logarithmGrade=gradeResponse(logarithm,{steps:{domain:"x>1",exponential:"x-1=2^3",solution:"x=9",check:"S={9}, pois 9>1."}});
assert.equal(logarithmGrade.points,35);
assert.equal(logarithmGrade.correct,true);

const missingDomain=gradeResponse(logarithm,{steps:{domain:"",exponential:"x-1=2^3",solution:"x=9",check:"S={9}, pois 9>1."}});
assert.equal(missingDomain.correct,false);
assert.equal(missingDomain.stepResults.find(row=>row.stepId==="domain")?.points,0);
assert.equal(missingDomain.points,27);

console.log("✓ second constructed wave: módulo, tangente, complexos e logaritmos validados com equivalências e condição de existência");
