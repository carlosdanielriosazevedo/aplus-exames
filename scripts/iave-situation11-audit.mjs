import assert from "node:assert/strict";
import {gradeResponse} from "../app/lib/constructedResponse.js";

// IAVE Matemática A 635, 1.ª Fase 2026 — Situação 11.
// A aplicação automática é deliberadamente conservadora: o item tem de declarar
// explicitamente as variantes que correspondem a arredondamento/casas decimais
// incorretos num cálculo intermédio.
const question={
  id:"AUDIT-IAVE-11",points:20,
  response:{type:"stepwise",steps:[
    {
      id:"intermediate",
      label:"1. Cálculo intermédio",
      type:"numeric",
      points:10,
      value:1.2345,
      tolerance:0,
      expected:"x=1,2345",
      intermediateRoundingAccepted:["x=1,23"]
    },
    {
      id:"final",
      label:"2. Resultado final",
      type:"numeric",
      points:10,
      value:2.469,
      tolerance:0,
      expected:"y=2,469"
    }
  ]}
};

const classified=gradeResponse(question,{steps:{intermediate:"x=1,23",final:"y=2,469"}});
const intermediate=classified.stepResults.find(row=>row.stepId==="intermediate");
assert.equal(intermediate?.reason,"intermediate_rounding");
assert.equal(intermediate?.iaveSituation,"Situação 11");
assert.equal(intermediate?.classificationConfidence,"high");
assert.equal(intermediate?.points,10,"A Situação 11 não retira o ponto dentro da etapa; a penalização é global.");
assert.equal(classified.globalPenalty,1,"A Situação 11 retira um ponto à soma das pontuações atribuídas.");
assert.equal(classified.globalPenalties?.length,1);
assert.equal(classified.globalPenalties?.[0]?.iaveSituation,"Situação 11");
assert.equal(classified.points,19);
assert.equal(classified.reviewRequired,false);

const undeclared=gradeResponse(question,{steps:{intermediate:"x=1,22",final:"y=2,469"}});
const undeclaredIntermediate=undeclared.stepResults.find(row=>row.stepId==="intermediate");
assert.notEqual(undeclaredIntermediate?.reason,"intermediate_rounding","Um valor não declarado não pode ser promovido automaticamente a Situação 11.");
assert.notEqual(undeclaredIntermediate?.classificationConfidence,"high");
assert.equal(undeclared.globalPenalty,0);

// Mesmo que o critério específico reconheça mais do que uma ocorrência na mesma resposta,
// a regra geral é representada uma única vez como penalização à soma da resposta.
const twoOccurrences={
  id:"AUDIT-IAVE-11-TWICE",points:30,
  response:{type:"stepwise",steps:[
    {id:"a",label:"1. Intermédio A",type:"numeric",points:10,value:1.2345,tolerance:0,expected:"a=1,2345",intermediateRoundingAccepted:["a=1,23"]},
    {id:"b",label:"2. Intermédio B",type:"numeric",points:10,value:4.5678,tolerance:0,expected:"b=4,5678",intermediateRoundingAccepted:["b=4,57"]},
    {id:"c",label:"3. Final",type:"numeric",points:10,value:5.8023,tolerance:0,expected:"c=5,8023"}
  ]}
};
const twice=gradeResponse(twoOccurrences,{steps:{a:"a=1,23",b:"b=4,57",c:"c=5,8023"}});
assert.equal(twice.stepResults.filter(row=>row.reason==="intermediate_rounding").length,2);
assert.equal(twice.globalPenalty,1);
assert.equal(twice.points,29);

console.log("✓ IAVE 2026 situação 11: arredondamento intermédio aplica penalização global de 1 ponto apenas quando explicitamente declarado");
