import {portugueseTrovadoresca10DeepReviewFor} from "./portugueseDeepReviewTrovadoresca10";
import {portugueseFernaoLopes10DeepReviewFor} from "./portugueseDeepReviewFernaoLopes10";

const REVIEW_PROVIDERS=[
  portugueseTrovadoresca10DeepReviewFor,
  portugueseFernaoLopes10DeepReviewFor
];

export function portugueseDeepReviewContentFor(unitId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(unitId);
    if(content)return content;
  }
  return null;
}

export const PORTUGUESE_DEEP_REVIEW_UNIT_IDS=["pt10-trovadoresca","pt10-fernao-lopes"];
