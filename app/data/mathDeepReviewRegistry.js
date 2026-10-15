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
import {mathStatistics10ReviewContentFor} from "./mathDeepReviewStatistics10";
import {mathSyntheticGeometry10ReviewContentFor} from "./mathDeepReviewSyntheticGeometry10";
import {mathFunctions10ReviewContentFor} from "./mathDeepReviewFunctions10";
import {mathAnalyticGeometry10ReviewContentFor} from "./mathDeepReviewAnalyticGeometry10";
import {mathInferentialStatistics12ReviewContentFor} from "./mathDeepReviewInferentialStatistics12";
import {mathPrimitivesIntegrals12ReviewContentFor} from "./mathDeepReviewPrimitivesIntegrals12";
import {mathMatrices12ReviewContentFor} from "./mathDeepReviewMatrices12";

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
  mathFinance10ReviewContentFor,
  mathStatistics10ReviewContentFor,
  mathSyntheticGeometry10ReviewContentFor,
  mathFunctions10ReviewContentFor,
  mathAnalyticGeometry10ReviewContentFor,
  mathInferentialStatistics12ReviewContentFor,
  mathPrimitivesIntegrals12ReviewContentFor,
  mathMatrices12ReviewContentFor
];

export function mathDeepReviewContentFor(themeId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(themeId);
    if(content)return content;
  }
  return null;
}

export const MATH_DEEP_REVIEW_THEME_IDS=["12-cplx","12-prob","12-expl","12-fcd","12-fcont","12-rae","11-trig","11-pe","11-cont","11-suc","11-fun","11-cd","10-ele","10-fin","10-est","10-gs","10-fun","10-ga","12-ie","12-int","12-mat"];
