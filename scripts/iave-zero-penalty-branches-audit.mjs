import assert from "node:assert/strict";
import {gradeResponse} from "../app/lib/constructedResponse.js";

const copiedDataReduced={
  id:"AUDIT-IAVE-6-REDUCED",points:20,
  response:{type:"stepwise",steps:[
    {id:"copy",label:"1. Dado copiado",type:"expression",points:10,expected:"2x=8",copiedDataAccepted:[
      {value:"2x=6",difficultyReduced:true}
    ]},
    {id:"next",label:"2. Etapa dependente",type:"numeric",points:10,value:4,tolerance:0,expected:"x=4",errorEffects:[
      {from:"copy",reasons:["copied_data_error"],accepted:["x=3"],difficultyReduced:true}
    ]}
  ]}
};
const copiedReduced=gradeResponse(copiedDataReduced,{steps:{copy:"2x=6",next:"x=3"}});
const copiedReducedStep=copiedReduced.stepResults.find(row=>row.stepId==="copy");
const copiedDependent=copiedReduced.stepResults.find(row=>row.stepId==="next");
assert.equal(copiedReducedStep?.reason,"copied_data_error");
assert.equal(copiedReducedStep?.difficultyReduced,true);
assert.equal(copiedReduced.globalPenalties.some(row=>row.reason==="copied_data_error"),false,"Situação 6 com redução de dificuldade não leva -1 global.");
assert.equal(copiedDependent?.reason,"upstream_error_effect");
assert.equal(copiedDependent?.difficultyReduced,true);
assert.equal(copiedDependent?.points,5,"A redução de dificuldade é tratada na etapa dependente pela Nota 2.");
assert.equal(copiedReduced.points,15);

const neutralExcess={
  id:"AUDIT-IAVE-17-NEUTRAL",points:20,
  response:{type:"stepwise",steps:[
    {id:"set",label:"1. Resposta",type:"expression",points:10,expected:"{1,2}",excessElementsAccepted:[
      {value:"{1,2}; nota auxiliar",affectsPerformance:false}
    ]},
    {id:"finish",label:"2. Confirmação",type:"numeric",points:10,value:2,tolerance:0,expected:"n=2"}
  ]}
};
const neutralExcessResult=gradeResponse(neutralExcess,{steps:{set:"{1,2}; nota auxiliar",finish:"n=2"}});
const neutralExcessStep=neutralExcessResult.stepResults.find(row=>row.stepId==="set");
assert.equal(neutralExcessStep?.reason,"excess_elements");
assert.equal(neutralExcessStep?.affectsPerformance,false);
assert.equal(neutralExcessResult.globalPenalty,0,"Situação 17 sem efeito no desempenho não desvaloriza.");
assert.equal(neutralExcessResult.points,20);

const zeroPointNotation={
  id:"AUDIT-IAVE-18-ZERO",points:20,
  response:{type:"stepwise",steps:[
    {id:"notation",label:"1. Notação auxiliar",type:"expression",points:10,expected:"x∈[0,1]",formalNotationAccepted:[
      {value:"x=[0,1]",onlyZeroPointSteps:true}
    ]},
    {id:"finish",label:"2. Resultado",type:"numeric",points:10,value:1,tolerance:0,expected:"b=1"}
  ]}
};
const zeroNotationResult=gradeResponse(zeroPointNotation,{steps:{notation:"x=[0,1]",finish:"b=1"}});
const zeroNotationStep=zeroNotationResult.stepResults.find(row=>row.stepId==="notation");
assert.equal(zeroNotationStep?.reason,"formal_notation_error");
assert.equal(zeroNotationStep?.onlyZeroPointSteps,true);
assert.equal(zeroNotationResult.globalPenalty,0,"Situação 18 não desvaloriza quando a incorreção ocorre apenas em elementos sem cotação própria.");
assert.equal(zeroNotationResult.points,20);

console.log("✓ IAVE zero-penalty branches: situações 6, 17 e 18 preservam cotação quando os critérios oficiais assim determinam");
