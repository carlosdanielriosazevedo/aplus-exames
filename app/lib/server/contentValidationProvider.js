
/**
 * v5.5 provider-neutral contract for a future independent second validator.
 *
 * This file intentionally performs NO network call and contains NO credentials.
 * A real provider may later be Wolfram/API, a symbolic service or an independent
 * LLM/math checker, subject to cost/licensing/privacy review.
 */
export const CONTENT_VALIDATION_PROVIDER_VERSION=1;

export function contentValidationRequest(item){
  return {
    version:CONTENT_VALIDATION_PROVIDER_VERSION,
    itemId:item?.id||null,
    question:item?.q||"",
    options:item?.o||[],
    selectedCorrectIndex:item?.a,
    proposedSolution:item?.sol||"",
    requestedChecks:[
      "correct_answer",
      "solution_consistency",
      "unique_answer"
    ]
  };
}

export function reconcileSecondValidator(localPassport,externalResult){
  if(!externalResult){
    return {
      status:"not_configured",
      closedBetaEligible:!!localPassport?.closedBetaEligible,
      productionEligible:false,
      note:"Segundo validador externo ainda não configurado."
    };
  }

  if(externalResult.status==="unavailable"){
    return {
      status:"unavailable",
      closedBetaEligible:!!localPassport?.closedBetaEligible,
      productionEligible:false
    };
  }

  const agrees=externalResult.correctAnswerAgrees===true
    &&externalResult.solutionConsistent===true
    &&externalResult.uniqueAnswer!==false;

  return {
    status:agrees?"agrees":"conflict",
    closedBetaEligible:agrees&&!!localPassport?.closedBetaEligible,
    productionEligible:false,
    conflict:!agrees,
    provider:externalResult.provider||null
  };
}
