import {portugueseTrovadoresca10DeepReviewFor} from "./portugueseDeepReviewTrovadoresca10";
import {portugueseFernaoLopes10DeepReviewFor} from "./portugueseDeepReviewFernaoLopes10";
import {portugueseGilVicente10DeepReviewFor} from "./portugueseDeepReviewGilVicente10";
import {portugueseCamoesRimas10DeepReviewFor} from "./portugueseDeepReviewCamoesRimas10";
import {portugueseLusiadas10DeepReviewFor} from "./portugueseDeepReviewLusiadas10";
import {portugueseLeitura10DeepReviewFor} from "./portugueseDeepReviewLeitura10";
import {portugueseEscrita10DeepReviewFor} from "./portugueseDeepReviewEscrita10";

const REVIEW_PROVIDERS=[
  portugueseTrovadoresca10DeepReviewFor,
  portugueseFernaoLopes10DeepReviewFor,
  portugueseGilVicente10DeepReviewFor,
  portugueseCamoesRimas10DeepReviewFor,
  portugueseLusiadas10DeepReviewFor,
  portugueseLeitura10DeepReviewFor,
  portugueseEscrita10DeepReviewFor
];

export function portugueseDeepReviewContentFor(unitId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(unitId);
    if(content)return content;
  }
  return null;
}

export const PORTUGUESE_DEEP_REVIEW_UNIT_IDS=["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita"];
