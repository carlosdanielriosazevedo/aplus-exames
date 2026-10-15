import {physicsChemistryElements10DeepReviewFor} from "./physicsChemistryDeepReviewElements10";

const REVIEW_PROVIDERS=[
  physicsChemistryElements10DeepReviewFor
];

export function physicsChemistryDeepReviewContentFor(domainId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(domainId);
    if(content)return content;
  }
  return null;
}

export const PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS=["q10-elements"];
