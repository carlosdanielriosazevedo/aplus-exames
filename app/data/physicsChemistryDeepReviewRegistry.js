import {physicsChemistryElements10DeepReviewFor} from "./physicsChemistryDeepReviewElements10";
import {physicsChemistryMatter10DeepReviewFor} from "./physicsChemistryDeepReviewMatter10";
import {physicsChemistryEnergy10DeepReviewFor} from "./physicsChemistryDeepReviewEnergy10";

const REVIEW_PROVIDERS=[
  physicsChemistryElements10DeepReviewFor,
  physicsChemistryMatter10DeepReviewFor,
  physicsChemistryEnergy10DeepReviewFor
];

export function physicsChemistryDeepReviewContentFor(domainId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(domainId);
    if(content)return content;
  }
  return null;
}

export const PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS=["q10-elements","q10-matter","f10-energy"];
