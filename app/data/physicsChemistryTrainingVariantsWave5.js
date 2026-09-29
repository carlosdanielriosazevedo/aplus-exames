import {PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE4} from "./physicsChemistryTrainingVariantsWave4.js";

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}
function verificationVariant(source,index,subtopicIndex){
  const explanation=String(source.explanation||"A conclusão deve ser compatível com o modelo científico e com os dados do problema.");
  const correct=`Verificar se a conclusão continua coerente com esta relação: ${explanation}`;
  const distractors=[
    "Confirmar apenas se a opção escolhida é a mais longa, sem voltar ao modelo científico.",
    "Ignorar unidades, condições experimentais e relações entre grandezas desde que o valor pareça plausível.",
    "Trocar a relação usada por outra fórmula do mesmo tema sem verificar se se aplica à situação."
  ];
  const shifted=rotate(correct,distractors,(subtopicIndex+index)%4);
  return {
    id:`FQA-V5-${slug(source.subtopicId)}-E${String(index+1).padStart(2,"0")}`,
    year:source.year,
    domain:source.domain,
    subtopicId:source.subtopicId,
    competencyId:source.competencyId||"fqa-data",
    prompt:`Depois de responder à situação seguinte, qual verificação torna a conclusão mais robusta? ${source.prompt}`,
    ...shifted,
    explanation:correct,
    responseType:"multiple-choice",
    gradingMode:"deterministic",
    sourceOrigin:"original",
    reviewStatus:"prototype",
    difficultyTarget:Math.max(2,source.difficultyTarget||2),
    maxPoints:10,
    generated:true,
    practiceVariant:true,
    templateId:`fqa-evidence-v5-${source.templateId||source.id}`
  };
}
function errorVariant(source,index,subtopicIndex){
  const explanation=String(source.explanation||"A resposta correta depende de aplicar o modelo científico adequado.");
  const correct=`Aceitar uma conclusão que contradiga o seguinte fundamento: ${explanation}`;
  const distractors=[
    "Escrever explicitamente as unidades e confirmar a ordem de grandeza do resultado.",
    "Distinguir os dados fornecidos das grandezas que ainda precisam de ser calculadas.",
    "Comparar a conclusão obtida com o comportamento previsto pelo modelo físico ou químico."
  ];
  const shifted=rotate(correct,distractors,(subtopicIndex+index+2)%4);
  return {
    id:`FQA-V5-${slug(source.subtopicId)}-X${String(index+1).padStart(2,"0")}`,
    year:source.year,
    domain:source.domain,
    subtopicId:source.subtopicId,
    competencyId:source.competencyId||"fqa-problems",
    prompt:`Na resolução da situação seguinte, qual erro de raciocínio deve ser evitado? ${source.prompt}`,
    ...shifted,
    explanation:`O erro é aceitar uma conclusão incompatível com o fundamento científico da resolução: ${explanation}`,
    responseType:"multiple-choice",
    gradingMode:"deterministic",
    sourceOrigin:"original",
    reviewStatus:"prototype",
    difficultyTarget:Math.max(2,source.difficultyTarget||2),
    maxPoints:10,
    generated:true,
    practiceVariant:true,
    templateId:`fqa-error-v5-${source.templateId||source.id}`
  };
}

const groups=new Map();
for(const item of PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE4){
  const rows=groups.get(item.subtopicId)||[];
  rows.push(item);
  groups.set(item.subtopicId,rows);
}

const rows=[];
[...groups.entries()].sort(([a],[b])=>a.localeCompare(b)).forEach(([subtopicId,items],subtopicIndex)=>{
  const sourceRows=items.slice(0,6);
  if(sourceRows.length<6)throw new Error(`${subtopicId}: wave 5 needs six source variants.`);
  sourceRows.forEach((item,index)=>{
    rows.push(verificationVariant(item,index,subtopicIndex));
    rows.push(errorVariant(item,index,subtopicIndex));
  });
});

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE5=rows;
