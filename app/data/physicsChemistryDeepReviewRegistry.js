import {physicsChemistryElements10DeepReviewFor} from "./physicsChemistryDeepReviewElements10";
import {physicsChemistryMatter10DeepReviewFor} from "./physicsChemistryDeepReviewMatter10";
import {physicsChemistryEnergy10DeepReviewFor} from "./physicsChemistryDeepReviewEnergy10";
import {physicsChemistryMechanics11DeepReviewFor} from "./physicsChemistryDeepReviewMechanics11";
import {physicsChemistryWaves11DeepReviewFor} from "./physicsChemistryDeepReviewWaves11";

const REVIEW_PROVIDERS=[
  physicsChemistryElements10DeepReviewFor,
  physicsChemistryMatter10DeepReviewFor,
  physicsChemistryEnergy10DeepReviewFor,
  physicsChemistryMechanics11DeepReviewFor,
  physicsChemistryWaves11DeepReviewFor
];

export function physicsChemistryDeepReviewContentFor(domainId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(domainId);
    if(content)return content;
  }
  return null;
}

export const PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS=["q10-elements","q10-matter","f10-energy","f11-mechanics","f11-waves"];
