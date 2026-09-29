import {PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE3} from "./portugueseLiteraryTrainingVariantsWave3.js";
import {PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE4} from "./portugueseLiteraryTrainingVariantsWave4.js";

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}
function evidenceItem(source,index,workIndex){
  const correct="Escolher uma evidência da obra que seja diretamente relevante e explicar como essa evidência sustenta a interpretação.";
  const distractors=[
    "Apresentar uma informação biográfica sobre o autor, mesmo que não responda ao pedido.",
    "Resumir a obra de forma geral sem selecionar uma marca que sustente a interpretação.",
    "Identificar um recurso expressivo e parar aí, sem explicar o efeito produzido no contexto."
  ];
  const shifted=rotate(correct,distractors,(workIndex+index)%4);
  return {
    id:`PT639-LIT-V5-${slug(source.literaryWorkId)}-E${String(index+1).padStart(2,"0")}`,
    year:source.year,
    domain:"educacao-literaria",
    literaryWorkId:source.literaryWorkId,
    competencyId:source.competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive:"analisar",
    stimulus:`${source.literaryWorkId}. Variante de treino centrada na seleção de evidência, sem reprodução de excertos protegidos.`,
    prompt:`Para responder com rigor à questão seguinte, qual procedimento de evidência é mais adequado? ${source.prompt}`,
    ...shifted,
    explanation:`Uma resposta literária forte não fica pela conclusão: seleciona evidência pertinente e explica a ligação com a interpretação. ${source.explanation||""}`,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId:`pt-lit-evidence-v5-${source.templateId||source.id}`
  };
}
function revisionItem(source,index,workIndex){
  const correct="Retirar afirmações vagas e manter apenas ideias que respondam ao pedido e possam ser sustentadas por elementos concretos da obra.";
  const distractors=[
    "Acrescentar mais resumo de enredo, mesmo que não contribua para a resposta.",
    "Substituir a explicação por uma lista de conceitos memorizados sem os relacionar com a obra.",
    "Eliminar a justificação e deixar apenas uma opinião pessoal sobre a qualidade do texto."
  ];
  const shifted=rotate(correct,distractors,(workIndex+index+2)%4);
  return {
    id:`PT639-LIT-V5-${slug(source.literaryWorkId)}-R${String(index+1).padStart(2,"0")}`,
    year:source.year,
    domain:"educacao-literaria",
    literaryWorkId:source.literaryWorkId,
    competencyId:source.competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive:"avaliar",
    stimulus:`${source.literaryWorkId}. Variante de treino de revisão de resposta, sem reprodução de excertos protegidos.`,
    prompt:`Ao rever uma resposta à questão seguinte, qual alteração melhora mais a precisão literária? ${source.prompt}`,
    ...shifted,
    explanation:`A revisão deve aumentar a relevância e a sustentação da resposta, não apenas o comprimento. ${source.explanation||""}`,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId:`pt-lit-revision-v5-${source.templateId||source.id}`
  };
}

const v3Groups=new Map();
for(const item of PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE3){
  const rows=v3Groups.get(item.literaryWorkId)||[];
  rows.push(item);
  v3Groups.set(item.literaryWorkId,rows);
}
const v4Groups=new Map();
for(const item of PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE4){
  const rows=v4Groups.get(item.literaryWorkId)||[];
  rows.push(item);
  v4Groups.set(item.literaryWorkId,rows);
}

const rows=[];
[...v3Groups.keys()].sort().forEach((workId,workIndex)=>{
  const evidenceSources=(v3Groups.get(workId)||[]).slice(0,5);
  const revisionSources=(v4Groups.get(workId)||[]).slice(0,5);
  if(evidenceSources.length<5||revisionSources.length<5)throw new Error(`${workId}: wave 5 needs five sources of each family.`);
  evidenceSources.forEach((item,index)=>rows.push(evidenceItem(item,index,workIndex)));
  revisionSources.forEach((item,index)=>rows.push(revisionItem(item,index,workIndex)));
});

export const PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE5=rows;
