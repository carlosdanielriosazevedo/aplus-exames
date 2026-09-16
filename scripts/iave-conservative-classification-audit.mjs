import assert from "node:assert/strict";
import {gradeResponse} from "../app/lib/constructedResponse.js";

// Regression gate for automatic IAVE classification.
// The grader may only assign these classifications when the item itself declares
// enough specific metadata to make the classification objective.

const incompleteFinalPassage={
  id:"AUDIT-IAVE-10-FINAL",points:10,
  response:{type:"stepwise",steps:[
    {id:"solve",label:"1. Resolver",type:"expression",points:8,expected:"x=4",incompleteAccepted:[
      {value:"2x=8",missingOnlyFinalPassage:true}
    ]},
    {id:"check",label:"2. Verificação",type:"numeric",points:2,value:4,tolerance:0,expected:"x=4"}
  ]}
};
const incompleteFinal=gradeResponse(incompleteFinalPassage,{steps:{solve:"2x=8",check:"x=4"}});
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
    {id:"solve",label:"1. Resolver",type:"expression",points:9,expected:"x=4",incompleteAccepted:[
      {value:"2x",missingOnlyFinalPassage:false}
    ]},
    {id:"finish",label:"2. Concluir",type:"numeric",points:3,value:4,tolerance:0,expected:"x=4"}
  ]}
};
const incompleteHalf=gradeResponse(incompleteSubstantial,{steps:{solve:"2x",finish:"x=4"}});
const incompleteHalfStep=incompleteHalf.stepResults.find(row=>row.stepId==="solve");
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
const undeclaredIncomplete=gradeResponse(noDeclaredIncomplete,{steps:{solve:"2x",check:"x=4"}});
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

const copiedDataQuestion={
  id:"AUDIT-IAVE-6",points:20,
  response:{type:"stepwise",steps:[
    {id:"copy",label:"1. Aplicação com dado copiado",type:"expression",points:10,expected:"2x=8",copiedDataAccepted:[
      {value:"2x=6",difficultyReduced:false}
    ]},
    {id:"finish",label:"2. Resultado independente",type:"numeric",points:10,value:4,tolerance:0,expected:"x=4"}
  ]}
};
const copiedData=gradeResponse(copiedDataQuestion,{steps:{copy:"2x=6",finish:"x=4"}});
const copiedDataStep=copiedData.stepResults.find(row=>row.stepId==="copy");
assert.equal(copiedDataStep?.reason,"copied_data_error");
assert.equal(copiedDataStep?.iaveSituation,"Situação 6");
assert.equal(copiedDataStep?.classificationConfidence,"high");
assert.equal(copiedDataStep?.difficultyReduced,false);
assert.equal(copiedData.globalPenalty,1,"Situação 6: erro de cópia sem redução de dificuldade retira 1 ponto global.");
assert.equal(copiedData.points,19);

const undeclaredCopiedData={
  ...copiedDataQuestion,
  id:"AUDIT-IAVE-6-NEGATIVE",
  response:{...copiedDataQuestion.response,steps:[{...copiedDataQuestion.response.steps[0],copiedDataAccepted:undefined},copiedDataQuestion.response.steps[1]]}
};
const noCopiedDataMetadata=gradeResponse(undeclaredCopiedData,{steps:{copy:"2x=6",finish:"x=4"}});
assert.notEqual(noCopiedDataMetadata.stepResults.find(row=>row.stepId==="copy")?.reason,"copied_data_error");

const conceptualQuestion={
  id:"AUDIT-IAVE-9",points:12,
  response:{type:"stepwise",steps:[
    {id:"concept",label:"1. Conceito",type:"expression",points:9,expected:"x^2",conceptualErrorAccepted:["2x"]},
    {id:"finish",label:"2. Conclusão",type:"numeric",points:3,value:1,tolerance:0,expected:"y=1"}
  ]}
};
const conceptual=gradeResponse(conceptualQuestion,{steps:{concept:"2x",finish:"y=1"}});
const conceptualStep=conceptual.stepResults.find(row=>row.stepId==="concept");
assert.equal(conceptualStep?.reason,"conceptual_error");
assert.equal(conceptualStep?.iaveSituation,"Situação 9");
assert.equal(conceptualStep?.classificationConfidence,"high");
assert.equal(conceptualStep?.points,4,"Situação 9: erro conceptual limita a etapa à parte inteira de metade da cotação.");

const excessQuestion={
  id:"AUDIT-IAVE-17",points:20,
  response:{type:"stepwise",steps:[
    {id:"set",label:"1. Conjunto pedido",type:"expression",points:10,expected:"{1,2}",excessElementsAccepted:[
      {value:"{1,2,3}",affectsPerformance:true}
    ]},
    {id:"finish",label:"2. Confirmação",type:"numeric",points:10,value:2,tolerance:0,expected:"n=2"}
  ]}
};
const excess=gradeResponse(excessQuestion,{steps:{set:"{1,2,3}",finish:"n=2"}});
const excessStep=excess.stepResults.find(row=>row.stepId==="set");
assert.equal(excessStep?.reason,"excess_elements");
assert.equal(excessStep?.iaveSituation,"Situação 17");
assert.equal(excessStep?.affectsPerformance,true);
assert.equal(excess.globalPenalty,2,"Situação 17: elementos em excesso que afetam o desempenho retiram 2 pontos globais.");
assert.equal(excess.points,18);

const notationQuestion={
  id:"AUDIT-IAVE-18",points:20,
  response:{type:"stepwise",steps:[
    {id:"notation",label:"1. Notação formal",type:"expression",points:10,expected:"x∈[0,1]",formalNotationAccepted:[
      {value:"x=[0,1]",onlyZeroPointSteps:false}
    ]},
    {id:"finish",label:"2. Confirmação",type:"numeric",points:10,value:1,tolerance:0,expected:"b=1"}
  ]}
};
const notation=gradeResponse(notationQuestion,{steps:{notation:"x=[0,1]",finish:"b=1"}});
const notationStep=notation.stepResults.find(row=>row.stepId==="notation");
assert.equal(notationStep?.reason,"formal_notation_error");
assert.equal(notationStep?.iaveSituation,"Situação 18");
assert.equal(notationStep?.onlyZeroPointSteps,false);
assert.equal(notation.globalPenalty,1,"Situação 18: simbologia formal incorreta em etapa pontuada retira 1 ponto global.");
assert.equal(notation.points,19);

console.log("✓ conservative IAVE classification audit: situações 6, 9, 10, 11, 17, 18 e Nota 2 exigem evidência declarada e não são inferidas por aproximação");
