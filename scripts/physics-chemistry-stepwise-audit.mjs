import assert from "node:assert/strict";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../app/data/physicsChemistryConstructed.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {PHYSICS_CHEMISTRY_A_STEPWISE_RULES,PHYSICS_CHEMISTRY_A_STEPWISE_SOURCE,physicsChemistryStepwisePolicyFor} from "../app/data/physicsChemistryStepwisePolicy.js";

const byId=id=>PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.find(item=>item.id===id);

assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_SOURCE.authority,"IAVE");
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.type1Penalty,1);
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.oneType2Penalty,2);
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.multipleType2Penalty,4);
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.finalAnswerOnlyZero,true);
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.alternativeValidMethods,true);
assert.equal(PHYSICS_CHEMISTRY_A_STEPWISE_RULES.downstreamDependency,true);

for(const item of PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.filter(row=>row.responseType==="stepwise")){
  const policy=physicsChemistryStepwisePolicyFor(item);
  assert.equal(item.steps.every(step=>policy.steps?.[step.id]),true,item.id+": cada etapa deve ter política de reconhecimento.");
  assert.equal(item.steps.every(step=>policy.steps[step.id].acceptedRelations?.length>=1),true,item.id+": cada etapa deve reconhecer pelo menos uma relação/processo.");
}

const al=byId("FQA-C-ELEM-01");
const perfect=gradePhysicsChemistryResponse(al,{steps:{
  n:{work:"n=m/M",result:"0,200",unit:"mol"},
  N:{work:"N=n×NA",result:"1,204e23",unit:"átomos"}
}});
assert.equal(perfect.provisionalPoints,12);
assert.equal(perfect.penalty,0);

const carried=gradePhysicsChemistryResponse(al,{steps:{
  n:{work:"n=m/M",result:"0,210",unit:"mol"},
  N:{work:"N=n×NA",result:String(0.210*6.02e23),unit:"átomos"}
}});
assert.equal(carried.type1Count,1,"relação correta + erro numérico deve ser reconhecida provisoriamente como tipo 1.");
assert.equal(carried.steps[1].status,"follow-through","uma etapa dependente coerente deve manter crédito metodológico.");
assert.equal(carried.provisionalPoints,11,"um ou mais erros tipo 1 implicam desvalorização provisória de 1 ponto.");

const badUnit=gradePhysicsChemistryResponse(al,{steps:{
  n:{work:"n=m/M",result:"0,200",unit:"mol"},
  N:{work:"N=n×NA",result:"1,204e23",unit:"kg"}
}});
assert.equal(badUnit.type2Count,1);
assert.equal(badUnit.provisionalPoints,10,"um erro tipo 2 deve retirar provisoriamente 2 pontos.");

const finalOnly=gradePhysicsChemistryResponse(al,{steps:{
  N:{result:"1,204e23",unit:"átomos"}
}});
assert.equal(finalOnly.provisionalPoints,0,"apresentar só o resultado final não deve gerar crédito automático.");

const alternative=gradePhysicsChemistryResponse(al,{steps:{
  n:{work:"processo equivalente que a app ainda não reconhece",result:"0,200",unit:"mol"},
  N:{work:"N=n×NA",result:"1,204e23",unit:"átomos"}
}});
assert.equal(alternative.requiresReview,true);
assert.equal(alternative.provisionalPoints,null,"processo alternativo não reconhecido deve ser remetido para revisão, não marcado como errado.");

const dilution=byId("FQA-C-MAT-01");
const ml=gradePhysicsChemistryResponse(dilution,{steps:{
  n:{work:"n=cV",result:"0,0200",unit:"mol"},
  V:{work:"V=n/c",result:"40,0",unit:"mL"}
}});
assert.equal(ml.provisionalPoints,12,"uma unidade final equivalente deve ser convertida antes da comparação numérica.");

console.log("✓ FQ A stepwise: processo + resultado + unidade · tipo 1/2 · follow-through · processos alternativos em revisão · unidades equivalentes");
