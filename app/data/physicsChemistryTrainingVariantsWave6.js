import {PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE5} from "./physicsChemistryTrainingVariantsWave5.js";

function slug(value){
  return String(value||"").toUpperCase().replace(/[^A-Z0-9]+/g,"-").replace(/^-|-$/g,"");
}
function rotate(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:(4-(shift%4))%4};
}
function base(source,id,prompt,correct,distractors,shift,competencyId,templateId,difficultyTarget=3){
  return {
    id,
    year:source.year,
    domain:source.domain,
    subtopicId:source.subtopicId,
    competencyId:competencyId||source.competencyId||"fqa-problems",
    prompt,
    ...rotate(correct,distractors,shift),
    explanation:correct,
    responseType:"multiple-choice",
    gradingMode:"deterministic",
    sourceOrigin:"original",
    reviewStatus:"prototype",
    difficultyTarget,
    maxPoints:10,
    generated:true,
    practiceVariant:true,
    templateId
  };
}
function modelVariant(source,index,subtopicIndex){
  const foundation=String(source.explanation||"A resolução depende de escolher a relação científica adequada.");
  return base(
    source,
    `FQA-V6-${slug(source.subtopicId)}-M${String(index+1).padStart(2,"0")}`,
    `Perante esta situação, qual decisão deve ser tomada antes de começar os cálculos? ${source.prompt}`,
    `Identificar o modelo que é compatível com os dados e com este fundamento: ${foundation}`,
    [
      "Escolher a fórmula com mais símbolos, mesmo sem confirmar as condições de aplicação.",
      "Substituir todos os números imediatamente e decidir o modelo apenas pelo valor obtido.",
      "Ignorar a natureza física ou química da situação e procurar apenas uma expressão com as mesmas unidades."
    ],
    (subtopicIndex+index)%4,
    source.competencyId||"fqa-problems",
    `fqa-model-v6-${source.templateId||source.id}`
  );
}
function transferVariant(source,index,subtopicIndex){
  const foundation=String(source.explanation||"O raciocínio deve manter-se coerente quando o contexto muda.");
  return base(
    source,
    `FQA-V6-${slug(source.subtopicId)}-T${String(index+1).padStart(2,"0")}`,
    `Se o contexto desta questão mudar mas o mesmo princípio científico continuar válido, o que deve permanecer na resolução? ${source.prompt}`,
    `A relação causal ou matemática expressa neste fundamento: ${foundation}`,
    [
      "Os valores numéricos originais, mesmo que deixem de corresponder ao novo contexto.",
      "A conclusão original, sem voltar a verificar dados, unidades ou condições.",
      "A ordem exata das frases da resolução, independentemente das novas grandezas."
    ],
    (subtopicIndex+index+1)%4,
    source.competencyId||"fqa-concepts",
    `fqa-transfer-v6-${source.templateId||source.id}`
  );
}
function anomalyVariant(source,index,subtopicIndex){
  const foundation=String(source.explanation||"A conclusão deve ser confrontada com o comportamento científico esperado.");
  return base(
    source,
    `FQA-V6-${slug(source.subtopicId)}-A${String(index+1).padStart(2,"0")}`,
    `Um resultado obtido para esta situação parece incompatível com o esperado. Qual é a verificação mais útil? ${source.prompt}`,
    `Rever dados, unidades e pressupostos e comparar o resultado com este fundamento: ${foundation}`,
    [
      "Manter o resultado porque foi obtido por calculadora.",
      "Alterar o arredondamento até o valor parecer mais plausível.",
      "Escolher outra opção de resposta sem rever o raciocínio."
    ],
    (subtopicIndex+index+2)%4,
    source.competencyId||"fqa-data",
    `fqa-anomaly-v6-${source.templateId||source.id}`
  );
}

const groups=new Map();
for(const item of PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE5){
  const rows=groups.get(item.subtopicId)||[];
  rows.push(item);
  groups.set(item.subtopicId,rows);
}

const rows=[];
[...groups.entries()].sort(([a],[b])=>a.localeCompare(b)).forEach(([subtopicId,items],subtopicIndex)=>{
  const sourceRows=items.slice(0,6);
  if(sourceRows.length<6)throw new Error(`${subtopicId}: wave 6 needs six source variants.`);
  sourceRows.forEach((item,index)=>{
    rows.push(modelVariant(item,index,subtopicIndex));
    rows.push(transferVariant(item,index,subtopicIndex));
    rows.push(anomalyVariant(item,index,subtopicIndex));
  });
});

export const PHYSICS_CHEMISTRY_A_TRAINING_VARIANTS_WAVE6=rows;
