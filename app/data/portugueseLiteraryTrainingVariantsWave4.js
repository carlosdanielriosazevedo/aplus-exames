import {PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE3} from "./portugueseLiteraryTrainingVariantsWave3.js";

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}
function build(item,index,workIndex){
  const correct=String(item.explanation||"A leitura correta articula o eixo literário pedido com evidência relevante da obra.");
  const distractors=[
    "Porque basta identificar o autor e a época, mesmo sem relacionar esses dados com o sentido da obra.",
    "Porque uma resposta literária pode limitar-se a resumir o enredo, sem explicar a função dos elementos selecionados.",
    "Porque qualquer recurso expressivo tem o mesmo efeito em todas as obras, independentemente do contexto."
  ];
  const shifted=rotate(correct,distractors,(workIndex+index)%4);
  return {
    id:`PT639-LIT-V4-${slug(item.literaryWorkId)}-R${String(index+1).padStart(2,"0")}`,
    year:item.year,
    domain:"educacao-literaria",
    literaryWorkId:item.literaryWorkId,
    competencyId:item.competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive:"analisar",
    stimulus:`${item.literaryWorkId}. Variante de treino de justificação literária sem reprodução de excertos protegidos.`,
    prompt:`Qual justificação sustenta melhor a resposta correta à questão seguinte? ${item.prompt}`,
    ...shifted,
    explanation:correct,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId:`pt-lit-reasoning-v4-${item.templateId||item.id}`
  };
}

const groups=new Map();
for(const item of PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE3){
  const rows=groups.get(item.literaryWorkId)||[];
  rows.push(item);
  groups.set(item.literaryWorkId,rows);
}
const rows=[];
[...groups.entries()].sort(([a],[b])=>a.localeCompare(b)).forEach(([workId,items],workIndex)=>{
  const sourceRows=items.slice(0,6);
  if(sourceRows.length<6)throw new Error(`${workId}: wave 4 needs six source literary variants.`);
  sourceRows.forEach((item,index)=>rows.push(build(item,index,workIndex)));
});

export const PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE4=rows;
