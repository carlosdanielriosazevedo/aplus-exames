import {mathDeepReviewContentFor as complexReviewFor} from "./mathDeepReviewContent";
import {mathProbabilityReviewContentFor} from "./mathDeepReviewProbability";
import {mathExpLogReviewContentFor} from "./mathDeepReviewExponentialLogarithmic";

const REVIEW_PROVIDERS=[
  complexReviewFor,
  mathProbabilityReviewContentFor,
  mathExpLogReviewContentFor
];

export function mathDeepReviewContentFor(themeId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(themeId);
    if(content)return content;
  }
  return null;
}

export const MATH_DEEP_REVIEW_THEME_IDS=["12-cplx","12-prob","12-expl"];
