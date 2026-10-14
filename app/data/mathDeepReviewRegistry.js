import {mathDeepReviewContentFor as complexReviewFor} from "./mathDeepReviewContent";
import {mathProbabilityReviewContentFor} from "./mathDeepReviewProbability";
import {mathExpLogReviewContentFor} from "./mathDeepReviewExponentialLogarithmic";
import {mathCompositeDerivativesReviewContentFor} from "./mathDeepReviewCompositeDerivatives";
import {mathContinuousDifferentiableReviewContentFor} from "./mathDeepReviewContinuousDifferentiable";
import {mathApproximateEquationsReviewContentFor} from "./mathDeepReviewApproximateEquations";
import {mathTrigonometryReviewContentFor} from "./mathDeepReviewTrigonometry";
import {mathDotProductReviewContentFor} from "./mathDeepReviewDotProduct";
import {mathCountingReviewContentFor} from "./mathDeepReviewCounting";
import {mathSequencesReviewContentFor} from "./mathDeepReviewSequences";
import {mathFunctions11ReviewContentFor} from "./mathDeepReviewFunctions11";
import {mathDifferentialCalculus11ReviewContentFor} from "./mathDeepReviewDifferentialCalculus11";
import {mathElectionsSharingReviewContentFor} from "./mathDeepReviewElectionsSharing";
import {mathFinance10ReviewContentFor} from "./mathDeepReviewFinance10";

const REVIEW_PROVIDERS=[
  complexReviewFor,
  mathProbabilityReviewContentFor,
  mathExpLogReviewContentFor,
  mathCompositeDerivativesReviewContentFor,
  mathContinuousDifferentiableReviewContentFor,
  mathApproximateEquationsReviewContentFor,
  mathTrigonometryReviewContentFor,
  mathDotProductReviewContentFor,
  mathCountingReviewContentFor,
  mathSequencesReviewContentFor,
  mathFunctions11ReviewContentFor,
  mathDifferentialCalculus11ReviewContentFor,
  mathElectionsSharingReviewContentFor,
  mathFinance10ReviewContentFor
];

export function mathDeepReviewContentFor(themeId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(themeId);
    if(content)return content;
  }
  return null;
}

export const MATH_DEEP_REVIEW_THEME_IDS=["12-cplx","12-prob","12-expl","12-fcd","12-fcont","12-rae","11-trig","11-pe","11-cont","11-suc","11-fun","11-cd","10-ele","10-fin"];
