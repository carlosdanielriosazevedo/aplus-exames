import assert from "node:assert/strict";
import {gradeResponse} from "../app/lib/constructedResponse.js";

// Regression gate for automatic IAVE classification.
// The grader may only assign these classifications when the item itself declares
// enough specific metadata to make the classification objective.

const incompleteFinalPassage={
  id:"AUDIT-IAVE-10-FINAL",points:10,
  response:{type:"stepwise",steps:[
    {id:"solve",label:"1. Resolver",type:"expression",points:8,expected:"x=4",incompleteAccepted:[
      {value:"x+1=5",missingOnlyFinalPassage:true}
    ]},
    {id:"check",label:"2. Verificação",type:"numeric",points:2,value:4,tolerance:0,expected:"x=4"}
  ]}
};
const incompleteFinal=gradeResponse(incompleteFinalPassage,{steps:{solve:"x+1=5",check:"x=4"}});
const incompleteFinalStep=incompleteFinal.stepResults.find(row=>row.stepId==="solve");
assert.equal(incompleteFinalStep?.reason,"incomplete_step");
assert.equal(incompleteFinalStep?.iaveSituation,"Situação 10");
assert.equal(incompleteFinalStep?.classificationConfidence,"high");
assert.equal(incompleteFinalStep?.missingOnlyFinalPassage,true);
assert.equal(incompleteFinalStep?.points,7,"Situação 10: se falta apenas a passagem final, retira 1 ponto.");
assert.equal(incompleteFinal.points,9);

const incompleteSubstantial={
  id:"AUDIT-IAVE-10-HALF",points:12,
  response:{type:"stepwise",steps:[
    {id:"factor",label:"1. Fatorizar",type:"expression",points:9,expected:"(x-2)(x+2)",incompleteAccepted:[
      {value:"x^2-4",missingOnlyFinalPassage:false}
    ]},
    {id:"finish",label:"2. Concluir",type:"numeric",points:3,value:2,tolerance:0,expected:"x=2"}
  ]}
};
const incompleteHalf=gradeResponse(incompleteSubstantial,{steps:{factor:"x^2-4",finish:"x=2"}});
const incompleteHalfStep=incompleteHalf.stepResults.find(row=>row.stepId==="factor");
assert.equal(incompleteHalfStep?.reason,"incomplete_step");
assert.equal(incompleteHalfStep?.iaveSituation,"Situação 10");
assert.equal(incompleteHalfStep?.points,4,"Situação 10: restante resolução incompleta fica limitada à parte inteira de metade da etapa.");

const noDeclaredIncomplete={
  id:"AUDIT-IAVE-10-NEGATIVE",points:10,
  response:{type:"stepwise",steps:[
    {id:"solve",label:"1. Resolver",type:"expression",points:8,expected:"x=4"},
    {id:"check",label:"2. Verificação",type:"numeric",points:2,value:4,tolerance:0,expected:"x=4"}
  ]}
};
const undeclaredIncomplete=gradeResponse(noDeclaredIncomplete,{steps:{solve:"x+1=5",check:"x=4"}});
const undeclaredIncompleteStep=undeclaredIncomplete.stepResults.find(row=>row.stepId==="solve");
assert.notEqual(undeclaredIncompleteStep?.reason,"incomplete_step","Sem metadados específicos, o motor não inventa Situação 10.");
assert.notEqual(undeclaredIncompleteStep?.classificationConfidence,"high");

const intermediateRounding={
  id:"AUDIT-IAVE-11",points:20,
  response:{type:"stepwise",steps:[
    {id:"a",label:"1. Primeiro cálculo",type:"numeric",points:10,value:1.23,tolerance:0,expected:"a=1,23",intermediateRoundingAccepted:["a=1,2"]},
    {id:"b",label:"2. Segundo cálculo",type:"numeric",points:10,value:2.35,tolerance:0,expected:"b=2,35",intermediateRoundingAccepted:["b=2,4"]}
  ]}
};
const oneRounding=gradeResponse(intermediateRounding,{steps:{a:"a=1,2",b:"b=2,35"}});
assert.equal(oneRounding.stepResults.find(row=>row.stepId==="a")?.reason,"intermediate_rounding");
assert.equal(oneRounding.stepResults.find(row=>row.stepId==="a")?.iaveSituation,"Situação 11");
assert.equal(oneRounding.globalPenalty,1);
assert.equal(oneRounding.points,19,"Situação 11: a penalização é aplicada à soma das pontuações da resposta.");

const twoRoundings=gradeResponse(intermediateRounding,{steps:{a:"a=1,2",b:"b=2,4"}});
assert.equal(twoRoundings.globalPenalty,1,"Duas ocorrências declaradas da mesma situação 11 não duplicam automaticamente a penalização global.");
assert.equal(twoRoundings.points,19);

const noDeclaredRounding={
  id:"AUDIT-IAVE-11-NEGATIVE",points:20,
  response:{type:"stepwise",steps:[
    {id:"a",label:"1. Primeiro cálculo",type:"numeric",points:10,value:1.23,tolerance:0,expected:"a=1,23"},
    {id:"b",label:"2. Segundo cálculo",type:"numeric",points:10,value:2.35,tolerance:0,expected:"b=2,35"}
  ]}
};
const undeclaredRounding=gradeResponse(noDeclaredRounding,{steps:{a:"a=1,2",b:"b=2,35"}});
assert.equal(undeclaredRounding.globalPenalty,0,"Sem declaração específica, um valor errado não é rotulado automaticamente como arredondamento intermédio.");
assert.notEqual(undeclaredRounding.stepResults.find(row=>row.stepId==="a")?.reason,"intermediate_rounding");

const dependentError={
  id:"AUDIT-IAVE-NOTE2",points:20,
  response:{type:"stepwise",steps:[
    {id:"ratio",label:"1. Valor exato",type:"fraction",points:10,numerator:1,denominator:3,expected:"r=1/3"},
    {id:"next",label:"2. Cálculo dependente",type:"numeric",points:10,value:2/3,tolerance:0,expected:"s=2/3",errorEffects:[
      {from:"ratio",reasons:["approximate_instead_of_exact"],accepted:["s=0,66"],difficultyReduced:true}
    ]}
  ]}
};
const reducedDifficulty=gradeResponse(dependentError,{steps:{ratio:"r=0,33",next:"s=0,66"}});
const reducedStep=reducedDifficulty.stepResults.find(row=>row.stepId==="next");
assert.equal(reducedStep?.reason,"upstream_error_effect");
assert.equal(reducedStep?.classificationConfidence,"high");
assert.equal(reducedStep?.difficultyReduced,true);
assert.equal(reducedStep?.points,5,"Nota 2: se o erro anterior reduzir a dificuldade, a etapa dependente fica limitada a metade.");

const dependentNoReduction={
  ...dependentError,
  id:"AUDIT-IAVE-NOTE2-NO-REDUCTION",
  response:{...dependentError.response,steps:[
    dependentError.response.steps[0],
    {...dependentError.response.steps[1],errorEffects:[
      {from:"ratio",reasons:["approximate_instead_of_exact"],accepted:["s=0,66"],difficultyReduced:false}
    ]}
  ]}
};
const noReduction=gradeResponse(dependentNoReduction,{steps:{ratio:"r=0,33",next:"s=0,66"}});
const noReductionStep=noReduction.stepResults.find(row=>row.stepId==="next");
assert.equal(noReductionStep?.reason,"upstream_error_effect");
assert.equal(noReductionStep?.difficultyReduced,false);
assert.equal(noReductionStep?.points,10,"Nota 2: sem redução de dificuldade, o critério adaptado pode manter a cotação da etapa.");

const undeclaredPropagation={
  ...dependentError,
  id:"AUDIT-IAVE-NOTE2-NEGATIVE",
  response:{...dependentError.response,steps:[dependentError.response.steps[0],{...dependentError.response.steps[1],errorEffects:undefined}]}
};
const noEffectMetadata=gradeResponse(undeclaredPropagation,{steps:{ratio:"r=0,33",next:"s=0,66"}});
const noEffectStep=noEffectMetadata.stepResults.find(row=>row.stepId==="next");
assert.notEqual(noEffectStep?.reason,"upstream_error_effect","Sem metadados de dependência, o corretor não inventa propagação de erro.");
assert.notEqual(noEffectStep?.classificationConfidence,"high");

console.log("✓ conservative IAVE classification audit: situação 10, situação 11 e Nota 2 exigem evidência declarada e não são inferidas por aproximação");
