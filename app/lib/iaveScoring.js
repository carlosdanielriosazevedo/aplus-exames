// Matriz normativa de apoio à classificação de itens de construção por etapas.
// Referência: Matemática A 635, 1.ª Fase 2026, Critérios Gerais de Classificação (IAVE).
// Esta camada NÃO inventa critérios específicos: aplica apenas as regras gerais quando
// o corretor/item consegue identificar inequivocamente a situação ocorrida.

const halfFloor=points=>Math.floor(Math.max(0,Number(points)||0)/2);
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

export const IAVE_GENERAL_CRITERIA_2026={
  alternativeProcess:1,
  instructionViolation:2,
  finalResultOnly:3,
  missingRequiredWork:4,
  implicitNonCalculationStep:5,
  copiedDataError:6,
  copiedNumberOrSignError:7,
  occasionalCalculationError:8,
  conceptualError:9,
  incompleteStep:10,
  intermediateRounding:11,
  wrongFinalForm:12,
  approximateInsteadOfExact:13,
  approximateUsedInsteadOfExact:14,
  wrongFinalRounding:15,
  omittedFinalUnit:16,
  excessElements:17,
  formalNotationError:18
};

export function iaveStepCap(points,reason,{difficultyReduced=false,missingOnlyFinalPassage=false}={}){
  const max=Math.max(0,Number(points)||0);
  if(reason==="instruction_violation"||reason==="missing_required_work")return 0;
  if(reason==="copied_number_or_sign_error")return difficultyReduced?halfFloor(max):max;
  if(reason==="conceptual_error")return halfFloor(max);
  if(reason==="incomplete_step")return missingOnlyFinalPassage?Math.max(0,max-1):halfFloor(max);
  if(reason==="approximate_used_instead_of_exact")return halfFloor(max);
  return max;
}

export function iaveStepPenalty(reason,{difficultyReduced=false}={}){
  if(reason==="copied_number_or_sign_error"&&!difficultyReduced)return 1;
  if(reason==="occasional_calculation_error")return 1;
  if(reason==="wrong_final_form")return 1;
  if(reason==="approximate_instead_of_exact")return 1;
  if(reason==="wrong_final_rounding")return 1;
  return 0;
}

export function scoreIaveStep({maxPoints,basePoints=maxPoints,reason=null,difficultyReduced=false,missingOnlyFinalPassage=false}={}){
  const max=Math.max(0,Number(maxPoints)||0);
  if(!reason)return clamp(Number(basePoints)||0,0,max);
  if(reason==="omitted_final_unit")return clamp(Number(basePoints)||0,0,max);
  const cap=iaveStepCap(max,reason,{difficultyReduced,missingOnlyFinalPassage});
  const penalty=iaveStepPenalty(reason,{difficultyReduced});
  return clamp(Math.min(Number(basePoints)||0,cap)-penalty,0,max);
}

export function iaveGlobalPenalty(reason,{difficultyReduced=false,affectsPerformance=false,onlyZeroPointSteps=false}={}){
  if(reason==="copied_data_error"&&!difficultyReduced)return 1;
  if(reason==="intermediate_rounding")return 1;
  if(reason==="excess_elements"&&affectsPerformance)return 2;
  if(reason==="formal_notation_error"&&!onlyZeroPointSteps)return 1;
  return 0;
}

export function dependentStepCap(points,{upstreamDifficultyReduced=false}={}){
  const max=Math.max(0,Number(points)||0);
  return upstreamDifficultyReduced?halfFloor(max):max;
}

export function applyIaveGlobalPenalties(points,reasons=[]){
  const start=Math.max(0,Number(points)||0);
  const penalty=reasons.reduce((sum,item)=>sum+iaveGlobalPenalty(item.reason,item),0);
  return Math.max(0,start-penalty);
}

export function iaveSituationLabel(reason){
  const labels={
    instruction_violation:"Situação 2",
    final_result_only:"Situação 3",
    missing_required_work:"Situação 4",
    implicit_non_calculation_step:"Situação 5",
    copied_data_error:"Situação 6",
    copied_number_or_sign_error:"Situação 7",
    occasional_calculation_error:"Situação 8",
    conceptual_error:"Situação 9",
    incomplete_step:"Situação 10",
    intermediate_rounding:"Situação 11",
    wrong_final_form:"Situação 12",
    approximate_instead_of_exact:"Situação 13",
    approximate_used_instead_of_exact:"Situação 14",
    wrong_final_rounding:"Situação 15",
    omitted_final_unit:"Situação 16",
    excess_elements:"Situação 17",
    formal_notation_error:"Situação 18"
  };
  return labels[reason]||null;
}
