import {PORTUGUESE_RUBRIC_CALIBRATION} from "./portugueseRubricCalibration.js";

const LANGUAGE_CRITERIA=new Set(["lingua","correcao-linguistica"]);
const STRUCTURE_CRITERIA=new Set(["estrutura","coerencia","discurso"]);
const FORMAL_FILLER="A formulação mantém-se correta e organizada, mas não acrescenta informação que responda ao pedido, não interpreta o excerto e não apresenta fundamento retirado do enunciado.";

function wordCount(value){
  const text=String(value??"").trim();
  return text?text.split(/\s+/u).filter(Boolean).length:0;
}

function fitWithinLimit(seed,{min,max}){
  let words=String(seed??"").trim().split(/\s+/u).filter(Boolean);
  const filler=FORMAL_FILLER.split(/\s+/u);
  let index=0;
  while(words.length<min){
    words.push(filler[index%filler.length]);
    index++;
  }
  if(words.length>max)words=words.slice(0,max);
  return words.join(" ").replace(/\s+([,.;:!?])/g,"$1");
}

function contentFailureExpected(item){
  return Object.fromEntries((item.rubric?.criteria||[]).map(criterion=>{
    if(LANGUAGE_CRITERIA.has(criterion.id))return [criterion.id,"observed"];
    if(STRUCTURE_CRITERIA.has(criterion.id))return [criterion.id,"partial"];
    return [criterion.id,"not-observed"];
  }));
}

export function buildPortugueseBoundaryCases(items=[]){
  return items
    .filter(item=>["restricted-response","extended-writing"].includes(item.responseType)&&item.wordLimit)
    .map(item=>{
      const calibration=PORTUGUESE_RUBRIC_CALIBRATION[item.id]||{fluentWrong:{response:"A resposta fala genericamente sobre o tema, mas não demonstra a relação pedida com o estímulo.",expected:contentFailureExpected(item)}};
      const formalSeed="Esta resposta cumpre apenas a extensão pedida e apresenta frases completas. Não responde, porém, ao problema colocado nem demonstra compreensão do conteúdo solicitado.";
      const formalResponse=fitWithinLimit(formalSeed,item.wordLimit);
      return {
        itemId:item.id,
        wordLimit:{...item.wordLimit},
        contradictory:{response:calibration.fluentWrong.response,expected:{...calibration.fluentWrong.expected}},
        formalContentFailure:{response:formalResponse,wordCount:wordCount(formalResponse),expected:contentFailureExpected(item)}
      };
    });
}
