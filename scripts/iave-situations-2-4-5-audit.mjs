import assert from "node:assert/strict";
import {gradeResponse} from "../app/lib/constructedResponse.js";

// Situação 2: só é automática quando o critério específico do item declara
// exatamente a forma que prova a violação e quais as etapas que dela dependem.
const instructionQuestion={
  id:"AUDIT-IAVE-2",points:30,
  response:{type:"stepwise",steps:[
    {id:"method",label:"1. Método",type:"expression",points:10,expected:"x=4",accepted:["x=4"],instructionViolationAccepted:[
      {value:"x=4",dependentStepIds:["dependent"]}
    ]},
    {id:"dependent",label:"2. Etapa dependente",type:"numeric",points:10,value:8,tolerance:0,expected:"y=8"},
    {id:"independent",label:"3. Etapa independente",type:"numeric",points:10,value:3,tolerance:0,expected:"z=3"}
  ]}
};
const instructionResult=gradeResponse(instructionQuestion,{steps:{method:"x=4",dependent:"y=8",independent:"z=3"}});
const violated=instructionResult.stepResults.find(row=>row.stepId==="method");
const dependentZero=instructionResult.stepResults.find(row=>row.stepId==="dependent");
const independent=instructionResult.stepResults.find(row=>row.stepId==="independent");
assert.equal(violated?.reason,"instruction_violation");
assert.equal(violated?.iaveSituation,"Situação 2");
assert.equal(violated?.classificationConfidence,"high");
assert.equal(violated?.points,0);
assert.equal(dependentZero?.reason,"dependent_zero_due_to_iave");
assert.equal(dependentZero?.points,0,"Situação 2: apenas as etapas declaradas como dependentes ficam a zero.");
assert.equal(independent?.points,10,"Uma etapa independente posterior não deve ser anulada.");
assert.equal(instructionResult.points,10);

// Situação 4: se o critério específico exige trabalho/justificação e declara que
// uma determinada resposta corresponde à sua omissão, essa etapa vale zero.
const missingWorkQuestion={
  id:"AUDIT-IAVE-4",points:20,
  response:{type:"stepwise",steps:[
    {id:"work",label:"1. Cálculos exigidos",type:"expression",points:10,expected:"x=4",accepted:["x=4"],missingRequiredWorkAccepted:["x=4"]},
    {id:"check",label:"2. Verificação",type:"numeric",points:10,value:4,tolerance:0,expected:"y=4"}
  ]}
};
const missingWork=gradeResponse(missingWorkQuestion,{steps:{work:"x=4",check:"y=4"}});
const missingWorkStep=missingWork.stepResults.find(row=>row.stepId==="work");
assert.equal(missingWorkStep?.reason,"missing_required_work");
assert.equal(missingWorkStep?.iaveSituation,"Situação 4");
assert.equal(missingWorkStep?.classificationConfidence,"high");
assert.equal(missingWorkStep?.points,0);
assert.equal(missingWork.points,10);

// Situação 5: uma etapa não de cálculo/justificação omitida recebe a cotação se
// uma evidência posterior, previamente declarada no critério, provar inequivocamente
// que a etapa foi percorrida. Sem essa prova, a etapa e as dependentes declaradas ficam a zero.
const implicitQuestion={
  id:"AUDIT-IAVE-5",points:25,
  response:{type:"stepwise",steps:[
    {id:"condition",label:"1. Condição",type:"expression",points:5,expected:"x≠3",accepted:["x≠3"],implicitNonCalculation:{
      evidence:[{from:"evidence",accepted:["x≠3 considerado"]}],dependentStepIds:["result"]
    }},
    {id:"evidence",label:"2. Evidência posterior",type:"expression",points:10,expected:"x≠3 considerado",accepted:["x≠3 considerado"]},
    {id:"result",label:"3. Resultado dependente",type:"numeric",points:10,value:6,tolerance:0,expected:"y=6"}
  ]}
};
const implicitProved=gradeResponse(implicitQuestion,{steps:{evidence:"x≠3 considerado",result:"y=6"}});
const implicitStep=implicitProved.stepResults.find(row=>row.stepId==="condition");
assert.equal(implicitStep?.reason,"implicit_non_calculation_step");
assert.equal(implicitStep?.iaveSituation,"Situação 5");
assert.equal(implicitStep?.implicitTraversal,true);
assert.equal(implicitStep?.points,5);
assert.equal(implicitProved.points,25);

const implicitNotProved=gradeResponse(implicitQuestion,{steps:{result:"y=6"}});
const omittedStep=implicitNotProved.stepResults.find(row=>row.stepId==="condition");
const zeroDependent=implicitNotProved.stepResults.find(row=>row.stepId==="result");
assert.equal(omittedStep?.reason,"implicit_non_calculation_step");
assert.equal(omittedStep?.implicitTraversal,false);
assert.equal(omittedStep?.points,0);
assert.equal(zeroDependent?.reason,"dependent_zero_due_to_iave");
assert.equal(zeroDependent?.points,0);

console.log("✓ IAVE 2026 situations 2, 4 and 5: explicit instruction violations, required work and implicit-step dependencies validated");
