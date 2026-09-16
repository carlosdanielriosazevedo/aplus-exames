import assert from "node:assert/strict";
import {CONSTRUCTED_RESPONSE_BANK,gradeResponse} from "../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id===id);
  assert.ok(question,`Pergunta ${id} tem de existir`);
  return question;
};

// Referência normativa: Critérios de Classificação da Prova 635, 1.ª Fase, 2026.
// Este audit cobre regras gerais objetivas que o corretor automático consegue aplicar sem inventar critério específico.

const derivative=byId("CRV2-11CD-STEPS-1");
const finalOnly=gradeResponse(derivative,"f'(2)=10");
assert.equal(finalOnly.points,0,"IAVE situação 3: apenas o resultado final num item por etapas vale zero pontos.");
assert.equal(finalOnly.reason,"final_result_only");
assert.equal(finalOnly.iaveSituation,"Situação 3");
assert.equal(finalOnly.classificationConfidence,"high");

const worked=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10");
assert.equal(worked.points,35,"Uma resolução completa e cientificamente correta mantém a cotação prevista.");
assert.equal(worked.correct,true);

const transcriptionSlip=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10=11");
const transcriptionValue=transcriptionSlip.stepResults.find(row=>row.stepId==="value");
assert.equal(transcriptionValue?.reason,"copied_number_or_sign_error");
assert.equal(transcriptionValue?.iaveSituation,"Situação 7");
assert.equal(transcriptionValue?.classificationConfidence,"high");
assert.equal(transcriptionValue?.points,11);
assert.equal(transcriptionSlip.points,34);
assert.equal(transcriptionSlip.reviewRequired,false);

const signTranscription=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10=-10");
const signValue=signTranscription.stepResults.find(row=>row.stepId==="value");
assert.equal(signValue?.reason,"copied_number_or_sign_error");
assert.equal(signValue?.iaveSituation,"Situação 7");
assert.equal(signValue?.classificationConfidence,"high");

const arithmeticSlip=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=11");
const arithmeticValue=arithmeticSlip.stepResults.find(row=>row.stepId==="value");
assert.equal(arithmeticValue?.reason,"occasional_calculation_error");
assert.equal(arithmeticValue?.iaveSituation,"Situação 8");
assert.equal(arithmeticValue?.classificationConfidence,"high");
assert.equal(arithmeticValue?.points,11);
assert.equal(arithmeticSlip.points,34);
assert.equal(arithmeticSlip.reviewRequired,false);

const ambiguousCalculation=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=11");
const ambiguousValue=ambiguousCalculation.stepResults.find(row=>row.stepId==="value");
assert.notEqual(ambiguousValue?.reason,"copied_number_or_sign_error");
assert.notEqual(ambiguousValue?.reason,"occasional_calculation_error");
assert.notEqual(ambiguousValue?.classificationConfidence,"high");

// Situação 10: a aplicação automática exige variantes de incompletude declaradas pelo item.
const incompleteQuestion={
  id:"AUDIT-IAVE-10",points:20,
  response:{type:"stepwise",steps:[
    {id:"work",label:"1. Resolução",type:"expression",points:10,expected:"x=4",accepted:["x=4"],incompleteAccepted:[
      {value:"2x=8",missingOnlyFinalPassage:true},
      {value:"2x",missingOnlyFinalPassage:false}
    ]},
    {id:"check",label:"2. Verificação",type:"numeric",points:10,value:4,tolerance:0,expected:"y=4"}
  ]}
};
const missingOnlyFinalPassage=gradeResponse(incompleteQuestion,{steps:{work:"2x=8",check:"y=4"}});
const missingFinalWork=missingOnlyFinalPassage.stepResults.find(row=>row.stepId==="work");
assert.equal(missingFinalWork?.reason,"incomplete_step");
assert.equal(missingFinalWork?.iaveSituation,"Situação 10");
assert.equal(missingFinalWork?.classificationConfidence,"high");
assert.equal(missingFinalWork?.missingOnlyFinalPassage,true);
assert.equal(missingFinalWork?.points,9,"Situação 10: se falta apenas a passagem final, retira 1 ponto.");
assert.equal(missingOnlyFinalPassage.points,19);

const deeperIncomplete=gradeResponse(incompleteQuestion,{steps:{work:"2x",check:"y=4"}});
const deeperWork=deeperIncomplete.stepResults.find(row=>row.stepId==="work");
assert.equal(deeperWork?.reason,"incomplete_step");
assert.equal(deeperWork?.missingOnlyFinalPassage,false);
assert.equal(deeperWork?.points,5,"Situação 10: nas restantes resoluções incompletas, a etapa fica limitada a metade.");
assert.equal(deeperIncomplete.points,15);

const undeclaredIncomplete=gradeResponse(incompleteQuestion,{steps:{work:"x=5",check:"y=4"}});
const undeclaredWork=undeclaredIncomplete.stepResults.find(row=>row.stepId==="work");
assert.notEqual(undeclaredWork?.reason,"incomplete_step","Uma resposta não declarada não pode ser rotulada automaticamente como resolução incompleta.");
assert.notEqual(undeclaredWork?.classificationConfidence,"high");

// Situação 10 materializada em perguntas reais do Mini-exame. O inventário é
// deliberadamente curto: só entram variantes cuja incompletude é inequívoca.
const realIncompleteCases=[
  {
    question:"CRV2-10ELE-DHONDT-STEPS-1",step:"ranking",
    final:"4800(A)>2800(B)>2400(A)",finalPoints:11,
    deeper:"4800(A)>2800(B)",deeperPoints:6
  },
  {
    question:"CRV2-12RAE-STEPS-1",step:"comparison",
    final:"1,9881<2<1,42²",finalPoints:7,
    deeper:"1,9881<2",deeperPoints:4
  },
  {
    question:"CRV2-11FUN-RUFFINI-STEPS-1",step:"factorization",
    final:"P(x)=(x−2)(x²−2x−3)",finalPoints:12,
    deeper:"P(x)=(x−2)Q(x)",deeperPoints:6
  }
];
for(const testCase of realIncompleteCases){
  const question=byId(testCase.question);
  const finalResult=gradeResponse(question,{steps:{[testCase.step]:testCase.final}}).stepResults.find(row=>row.stepId===testCase.step);
  assert.equal(finalResult?.reason,"incomplete_step",`${testCase.question}: a omissão da passagem final deve ativar a Situação 10.`);
  assert.equal(finalResult?.missingOnlyFinalPassage,true);
  assert.equal(finalResult?.points,testCase.finalPoints);
  assert.equal(finalResult?.classificationConfidence,"high");

  const deeperResult=gradeResponse(question,{steps:{[testCase.step]:testCase.deeper}}).stepResults.find(row=>row.stepId===testCase.step);
  assert.equal(deeperResult?.reason,"incomplete_step",`${testCase.question}: a resolução declarada como mais incompleta deve ativar a Situação 10.`);
  assert.equal(deeperResult?.missingOnlyFinalPassage,false);
  assert.equal(deeperResult?.points,testCase.deeperPoints);
  assert.equal(deeperResult?.classificationConfidence,"high");
}

const materializedIncomplete=CONSTRUCTED_RESPONSE_BANK.flatMap(question=>question.response?.steps||[]).filter(step=>Array.isArray(step.incompleteAccepted));
assert.equal(materializedIncomplete.length,3,"O inventário conservador da Situação 10 deve permanecer explícito e auditável.");
assert.equal(materializedIncomplete.reduce((sum,step)=>sum+step.incompleteAccepted.length,0),6);

const integral=byId("CRV2-12INT-STEPS-1");
const wrongFinalForm=gradeResponse(integral,{steps:{primitive:"x²/2",barrow:"1²/2−0²/2",value:"0,5"}});
const finalFormValue=wrongFinalForm.stepResults.find(row=>row.stepId==="value");
assert.equal(finalFormValue?.reason,"wrong_final_form");
assert.equal(finalFormValue?.iaveSituation,"Situação 12");
assert.equal(finalFormValue?.classificationConfidence,"high");
assert.equal(finalFormValue?.points,9);
assert.equal(wrongFinalForm.points,34);
assert.equal(wrongFinalForm.reviewRequired,false);

const exactThird={
  id:"AUDIT-EXACT-THIRD",points:10,
  response:{type:"stepwise",steps:[
    {id:"setup",label:"1. Valor exato intermédio",type:"fraction",points:5,numerator:1,denominator:3,expected:"1/3"},
    {id:"final",label:"2. Valor exato final",type:"fraction",points:5,numerator:1,denominator:3,expected:"1/3"}
  ]}
};
const approximateExact=gradeResponse(exactThird,{steps:{setup:"1/3",final:"0,33"}});
const approximateFinal=approximateExact.stepResults.find(row=>row.stepId==="final");
assert.equal(approximateFinal?.reason,"approximate_instead_of_exact");
assert.equal(approximateFinal?.iaveSituation,"Situação 13");
assert.equal(approximateFinal?.classificationConfidence,"high");
assert.equal(approximateFinal?.points,4);
assert.equal(approximateExact.points,9);

const notClearlyApproximation=gradeResponse(exactThird,{steps:{setup:"1/3",final:"0,34"}});
const unclearApproximation=notClearlyApproximation.stepResults.find(row=>row.stepId==="final");
assert.notEqual(unclearApproximation?.reason,"approximate_instead_of_exact");
assert.notEqual(unclearApproximation?.classificationConfidence,"high");

// Situação 14: só se aplica automaticamente quando o item declara qual a etapa exata
// de que depende e qual o resultado que decorre inequivocamente da aproximação usada.
const propagatedApproximationQuestion={
  id:"AUDIT-IAVE-14",points:20,
  response:{type:"stepwise",steps:[
    {id:"ratio",label:"1. Valor exato",type:"fraction",points:10,numerator:1,denominator:3,expected:"r=1/3"},
    {id:"double",label:"2. Dobro do valor exato",type:"fraction",points:10,numerator:2,denominator:3,expected:"s=2/3",approximationDependsOn:"ratio",propagatedApproximationValues:[0.66]}
  ]}
};
const propagatedApproximation=gradeResponse(propagatedApproximationQuestion,{steps:{ratio:"r=0,33",double:"s=0,66"}});
const propagatedRatio=propagatedApproximation.stepResults.find(row=>row.stepId==="ratio");
const propagatedDouble=propagatedApproximation.stepResults.find(row=>row.stepId==="double");
assert.equal(propagatedRatio?.reason,"approximate_instead_of_exact");
assert.equal(propagatedDouble?.reason,"approximate_used_instead_of_exact");
assert.equal(propagatedDouble?.iaveSituation,"Situação 14");
assert.equal(propagatedDouble?.classificationConfidence,"high");
assert.equal(propagatedDouble?.points,5,"Situação 14: a etapa fica limitada a metade da cotação quando usa a aproximação em vez do valor exato.");
assert.equal(propagatedApproximation.points,14);

const noDeclaredPropagation=gradeResponse(propagatedApproximationQuestion,{steps:{ratio:"r=0,33",double:"s=0,65"}});
const noPropagationDouble=noDeclaredPropagation.stepResults.find(row=>row.stepId==="double");
assert.notEqual(noPropagationDouble?.reason,"approximate_used_instead_of_exact");
assert.notEqual(noPropagationDouble?.classificationConfidence,"high");

// Situação 15: o arredondamento só é classificado automaticamente quando a cadeia
// contém explicitamente o valor não arredondado correto e o item declara as casas pedidas.
const finalRoundingQuestion={
  id:"AUDIT-IAVE-15",points:15,
  response:{type:"stepwise",steps:[
    {id:"source",label:"1. Valor antes de arredondar",type:"numeric",points:5,value:2.345,tolerance:0,expected:"x=2,345"},
    {id:"rounded",label:"2. Arredondamento às centésimas",type:"numeric",points:10,value:2.35,tolerance:0,expected:"y=2,35",rounding:{sourceValue:2.345,decimals:2}}
  ]}
};
const wrongFinalRounding=gradeResponse(finalRoundingQuestion,"x=2,345\ny=2,345=2,34");
const roundedStep=wrongFinalRounding.stepResults.find(row=>row.stepId==="rounded");
assert.equal(roundedStep?.reason,"wrong_final_rounding");
assert.equal(roundedStep?.iaveSituation,"Situação 15");
assert.equal(roundedStep?.classificationConfidence,"high");
assert.equal(roundedStep?.points,9,"Situação 15: arredondamento final incorreto retira 1 ponto.");
assert.equal(wrongFinalRounding.points,14);

const notClearlyRounding=gradeResponse(finalRoundingQuestion,"x=2,345\ny=2,345=2,33");
const unclearRounding=notClearlyRounding.stepResults.find(row=>row.stepId==="rounded");
assert.notEqual(unclearRounding?.reason,"wrong_final_rounding");
assert.notEqual(unclearRounding?.classificationConfidence,"high");

// Nota 2 dos critérios gerais: uma etapa posterior só recebe teto automático se o item
// declarar o efeito concreto do erro anterior e se esse efeito reduzir a dificuldade.
const dependentErrorQuestion={
  id:"AUDIT-IAVE-NOTE-2",points:19,
  response:{type:"stepwise",steps:[
    {id:"source",label:"1. Valor de q",type:"numeric",points:10,value:4,tolerance:0,expected:"q=4"},
    {id:"downstream",label:"2. Etapa dependente",type:"numeric",points:9,value:8,tolerance:0,expected:"r=8",errorEffects:[
      {from:"source",reasons:["copied_number_or_sign_error"],accepted:["r=10"],difficultyReduced:true}
    ]}
  ]}
};
const reducedDifficulty=gradeResponse(dependentErrorQuestion,{working:"q=2+2=4=5",steps:{downstream:"r=10"}});
const reducedSource=reducedDifficulty.stepResults.find(row=>row.stepId==="source");
const reducedDownstream=reducedDifficulty.stepResults.find(row=>row.stepId==="downstream");
assert.equal(reducedSource?.reason,"copied_number_or_sign_error");
assert.equal(reducedSource?.points,9);
assert.equal(reducedDownstream?.reason,"upstream_error_effect");
assert.equal(reducedDownstream?.iaveRule,"Nota 2");
assert.equal(reducedDownstream?.classificationConfidence,"high");
assert.equal(reducedDownstream?.difficultyReduced,true);
assert.equal(reducedDownstream?.points,4,"Nota 2: se o erro anterior reduz a dificuldade, a etapa dependente fica limitada à parte inteira de metade.");
assert.equal(reducedDifficulty.points,13);

const undeclaredDependentEffect=gradeResponse(dependentErrorQuestion,{working:"q=2+2=4=5",steps:{downstream:"r=9"}});
const undeclaredDownstream=undeclaredDependentEffect.stepResults.find(row=>row.stepId==="downstream");
assert.notEqual(undeclaredDownstream?.reason,"upstream_error_effect","Sem resultado propagado explicitamente declarado, o corretor não deve inventar uma relação causal entre os erros.");
assert.notEqual(undeclaredDownstream?.classificationConfidence,"high");

const alternative=gradeResponse(derivative,"Usei uma resolução cientificamente válida, mas escrita por um processo não reconhecido automaticamente.");
assert.equal(alternative.reviewRequired,true,"IAVE situação 1: um processo alternativo não deve ser automaticamente rejeitado; quando o motor não o certifica, fica por rever.");

const finance=byId("CRV2-10FIN-STEPS-1");
const noUnit=gradeResponse(finance,{steps:{interest:"J=50",capital:"C=1050",conclusion:"O capital ao fim de um ano é 1050"}});
assert.equal(noUnit.points,35,"IAVE situação 16: omitir a unidade no resultado final não desvaloriza a etapa.");
assert.equal(noUnit.correct,true);

const wrongUnit=gradeResponse(finance,{steps:{interest:"J=50",capital:"C=1050",conclusion:"O capital ao fim de um ano é 1050 kg"}});
assert.equal(wrongUnit.points,27,"Uma unidade errada não deve ser confundida com simples omissão da unidade.");
assert.equal(wrongUnit.reviewRequired,true);

console.log("✓ IAVE 2026 scoring policy audit: situações 3, 7, 8, 10, 12, 13, 14, 15 e 16 + Nota 2 dependente e ambiguidade conservadora validadas");
