import {PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE5} from "./portugueseLiteraryTrainingVariantsWave5.js";

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}
function make(source,id,prompt,correct,distractors,explanation,shift,cognitive,templateId){
  return {
    id,
    year:source.year,
    domain:"educacao-literaria",
    literaryWorkId:source.literaryWorkId,
    competencyId:source.competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive,
    stimulus:`${source.literaryWorkId}. Treino literário original, sem reprodução de excertos protegidos.`,
    prompt,
    ...rotate(correct,distractors,shift),
    explanation,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId
  };
}
function transferItem(source,index,workIndex){
  const correct="Manter a interpretação central, mas voltar a selecionar evidência adequada ao novo momento, voz ou situação da obra.";
  return make(
    source,
    `PT639-LIT-V6-${slug(source.literaryWorkId)}-T${String(index+1).padStart(2,"0")}`,
    `Imagina que a mesma ideia literária tem de ser aplicada a outro momento da obra. Qual é o procedimento mais rigoroso? ${source.prompt}`,
    correct,
    [
      "Repetir exatamente a mesma evidência, mesmo que pertença a outro momento e deixe de responder ao pedido.",
      "Manter apenas a conclusão e eliminar qualquer referência concreta à obra.",
      "Trocar a interpretação por uma opinião geral sobre o autor, sem relação com o novo contexto."
    ],
    "Transferir uma interpretação exige preservar o princípio de leitura e renovar a evidência concreta que o sustenta.",
    (workIndex+index)%4,
    "analisar",
    `pt-lit-transfer-v6-${source.templateId||source.id}`
  );
}
function distractorItem(source,index,workIndex){
  const correct="A opção que parece plausível mas não liga a afirmação ao pedido nem a sustenta com elementos concretos da obra.";
  return make(
    source,
    `PT639-LIT-V6-${slug(source.literaryWorkId)}-D${String(index+1).padStart(2,"0")}`,
    `Ao analisar respostas possíveis para esta questão, que tipo de distrator deve ser rejeitado primeiro? ${source.prompt}`,
    correct,
    [
      "Uma resposta que interpreta, seleciona evidência pertinente e explica a ligação ao pedido.",
      "Uma resposta que compara dois momentos usando o mesmo critério de leitura.",
      "Uma resposta que identifica um recurso e explicita o efeito que produz no contexto."
    ],
    "O erro mais perigoso é a formulação aparentemente correta mas desligada do pedido ou sem sustentação textual.",
    (workIndex+index+2)%4,
    "avaliar",
    `pt-lit-distractor-v6-${source.templateId||source.id}`
  );
}

const groups=new Map();
for(const item of PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE5){
  const rows=groups.get(item.literaryWorkId)||[];
  rows.push(item);
  groups.set(item.literaryWorkId,rows);
}

const rows=[];
[...groups.entries()].sort(([a],[b])=>a.localeCompare(b)).forEach(([workId,items],workIndex)=>{
  const sources=items.slice(0,5);
  if(sources.length<5)throw new Error(`${workId}: wave 6 needs five source variants.`);
  sources.forEach((item,index)=>{
    rows.push(transferItem(item,index,workIndex));
    rows.push(distractorItem(item,index,workIndex));
  });
});

export const PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE6=rows;
