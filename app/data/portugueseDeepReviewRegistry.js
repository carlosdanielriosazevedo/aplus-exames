import {portugueseTrovadoresca10DeepReviewFor} from "./portugueseDeepReviewTrovadoresca10";
import {portugueseFernaoLopes10DeepReviewFor} from "./portugueseDeepReviewFernaoLopes10";
import {portugueseGilVicente10DeepReviewFor} from "./portugueseDeepReviewGilVicente10";
import {portugueseCamoesRimas10DeepReviewFor} from "./portugueseDeepReviewCamoesRimas10";
import {portugueseLusiadas10DeepReviewFor} from "./portugueseDeepReviewLusiadas10";
import {portugueseLeitura10DeepReviewFor} from "./portugueseDeepReviewLeitura10";
import {portugueseEscrita10DeepReviewFor} from "./portugueseDeepReviewEscrita10";
import {portugueseGramatica10DeepReviewFor} from "./portugueseDeepReviewGramatica10";
import {portugueseVieira11DeepReviewFor} from "./portugueseDeepReviewVieira11";
import {portugueseFreiLuis11DeepReviewFor} from "./portugueseDeepReviewFreiLuis11";
import {portugueseRomantismoOpcao11DeepReviewFor} from "./portugueseDeepReviewRomantismoOpcao11";
import {portugueseEca11DeepReviewFor} from "./portugueseDeepReviewEca11";
import {portugueseAntero11DeepReviewFor} from "./portugueseDeepReviewAntero11";
import {portugueseCesario11DeepReviewFor} from "./portugueseDeepReviewCesario11";
import {portugueseLeitura11DeepReviewFor} from "./portugueseDeepReviewLeitura11";
import {portugueseEscrita11DeepReviewFor} from "./portugueseDeepReviewEscrita11";
import {portugueseGramatica11DeepReviewFor} from "./portugueseDeepReviewGramatica11";
import {portuguesePessoaOrtonimo12DeepReviewFor} from "./portugueseDeepReviewPessoaOrtonimo12";
import {portuguesePessoaHeteronimos12DeepReviewFor} from "./portugueseDeepReviewPessoaHeteronimos12";
import {portugueseMensagem12DeepReviewFor} from "./portugueseDeepReviewMensagem12";
import {portugueseGeorge12DeepReviewFor} from "./portugueseDeepReviewGeorge12";
import {portuguesePoesiaContemporanea12DeepReviewFor} from "./portugueseDeepReviewPoesiaContemporanea12";
import {portugueseRomance12DeepReviewFor} from "./portugueseDeepReviewRomance12";

const REVIEW_PROVIDERS=[
  portugueseTrovadoresca10DeepReviewFor,
  portugueseFernaoLopes10DeepReviewFor,
  portugueseGilVicente10DeepReviewFor,
  portugueseCamoesRimas10DeepReviewFor,
  portugueseLusiadas10DeepReviewFor,
  portugueseLeitura10DeepReviewFor,
  portugueseEscrita10DeepReviewFor,
  portugueseGramatica10DeepReviewFor,
  portugueseVieira11DeepReviewFor,
  portugueseFreiLuis11DeepReviewFor,
  portugueseRomantismoOpcao11DeepReviewFor,
  portugueseEca11DeepReviewFor,
  portugueseAntero11DeepReviewFor,
  portugueseCesario11DeepReviewFor,
  portugueseLeitura11DeepReviewFor,
  portugueseEscrita11DeepReviewFor,
  portugueseGramatica11DeepReviewFor,
  portuguesePessoaOrtonimo12DeepReviewFor,
  portuguesePessoaHeteronimos12DeepReviewFor,
  portugueseMensagem12DeepReviewFor,
  portugueseGeorge12DeepReviewFor,
  portuguesePoesiaContemporanea12DeepReviewFor,
  portugueseRomance12DeepReviewFor
];

export function portugueseDeepReviewContentFor(unitId){
  for(const provider of REVIEW_PROVIDERS){
    const content=provider(unitId);
    if(content)return content;
  }
  return null;
}

export const PORTUGUESE_DEEP_REVIEW_UNIT_IDS=["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita","pt10-gramatica","pt11-vieira","pt11-frei-luis","pt11-romantismo-opcao","pt11-eca","pt11-antero","pt11-cesario","pt11-leitura","pt11-escrita","pt11-gramatica","pt12-pessoa-ortonimo","pt12-pessoa-heteronimos","pt12-mensagem","pt12-conto","pt12-poesia-contemporanea","pt12-saramago"];
