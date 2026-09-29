import {PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS} from "./physicsChemistryTrainingVariants.js";
import {PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE2} from "./physicsChemistryTrainingVariantsWave2.js";
import {PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE3} from "./physicsChemistryTrainingVariantsWave3.js";

const SOURCE=[
  ...PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS,
  ...PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE2,
  ...PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE3
];

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}
function reasoningVariant(source,index,subtopicIndex){
  const correct=String(source.explanation||"A opção indicada resulta diretamente do modelo científico aplicável e dos dados apresentados.");
  const wrongBase=(source.options||[]).filter((_,i)=>i!==source.answerIndex);
  const distractors=[
    `Porque «${wrongBase[0]||"a primeira alternativa"}» é válida sem ser necessário verificar as condições do problema.`,
    `Porque «${wrongBase[1]||"a segunda alternativa"}» substitui a relação física ou química usada na resolução.`,
    `Porque «${wrongBase[2]||"a terceira alternativa"}» permite ignorar unidades, grandezas e coerência científica.`
  ];
  const shifted=rotate(correct,distractors,(subtopicIndex+index)%4);
  return {
    id:`FQA-V4-${slug(source.subtopicId)}-R${String(index+1).padStart(2,"0")}`,
    year:source.year,
    domain:source.domain,
    subtopicId:source.subtopicId,
    competencyId:source.competencyId||"fqa-concepts",
    prompt:`Qual justificação explica melhor por que razão a resposta «${source.options?.[source.answerIndex]}» é adequada nesta situação: ${source.prompt}`,
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
    templateId:`fqa-reasoning-v4-${source.templateId||source.id}`
  };
}

const bySubtopic=new Map();
for(const item of SOURCE){
  if(!item.subtopicId)continue;
  const rows=bySubtopic.get(item.subtopicId)||[];
  rows.push(item);
  bySubtopic.set(item.subtopicId,rows);
}

const rows=[];
[...bySubtopic.entries()].sort(([a],[b])=>a.localeCompare(b)).forEach(([subtopicId,items],subtopicIndex)=>{
  const sourceRows=items.slice(0,6);
  if(sourceRows.length<6)throw new Error(`${subtopicId}: wave 4 needs six source variants.`);
  sourceRows.forEach((item,index)=>rows.push(reasoningVariant(item,index,subtopicIndex)));
});

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE4=rows;
