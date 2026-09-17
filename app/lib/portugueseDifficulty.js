const COGNITIVE_WEIGHT={reconhecer:1,interpretar:2,raciocinar:3,criar:4};
const RESPONSE_WEIGHT={"multiple-choice":0,"short-answer":.15,"restricted-response":.35,"extended-writing":.6};

function wordCount(value){return String(value||"").trim().split(/\s+/u).filter(Boolean).length}

export function portugueseDifficultyLevel(score){
  if(score<=1.45)return 1;
  if(score<=2.45)return 2;
  if(score<=3.55)return 3;
  return 4;
}

export function portugueseDifficultyProfile(item){
  const stimulusWords=wordCount(item.stimulus);
  const promptWords=wordCount(item.prompt);
  const cognitive=COGNITIVE_WEIGHT[item.cognitive]||2;
  const response=RESPONSE_WEIGHT[item.responseType]??.2;
  const stimulus=stimulusWords>80?.2:stimulusWords>40?.1:0;
  const prompt=promptWords>30?.15:promptWords>15?.08:0;
  const rubric=(item.rubric?.criteria?.length||0)>=5?.1:0;
  const wordLimit=(item.wordLimit?.max||0)>=180?.2:(item.wordLimit?.max||0)>=100?.1:0;
  const score=Number((cognitive+response+stimulus+prompt+rubric+wordLimit).toFixed(2));
  return {
    level:portugueseDifficultyLevel(score),score,status:"editorial-provisional",calibrated:false,
    signals:{cognitive,response,stimulus,prompt,rubric,wordLimit,stimulusWords,promptWords},
    rationale:[
      `operação cognitiva: ${item.cognitive}`,
      `formato: ${item.responseType}`,
      `estímulo: ${stimulusWords} palavras`,
      `instrução: ${promptWords} palavras`
    ]
  };
}

export function applyPortugueseDifficulty(items,matrix){
  const byId=new Map((matrix?.items||[]).map(row=>[row.id,row]));
  return items.map(item=>({...item,difficulty:byId.get(item.id)||portugueseDifficultyProfile(item)}));
}
