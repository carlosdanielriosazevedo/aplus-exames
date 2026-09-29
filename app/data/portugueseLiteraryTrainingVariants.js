import {PORTUGUESE_LITERARY_WORKS} from "./portugueseLiteraryWorks.js";

const GENERIC_DISTRACTORS=[
  "descrição técnica sem relação com a construção literária",
  "memorização de datas sem interpretação do texto",
  "classificação gramatical isolada do sentido",
  "enumeração biográfica sem ligação à obra"
];

function item({work,index,prompt,options,answerIndex,explanation,competencyId}){
  return {
    id:`PT639-LIT-V2-${work.id.toUpperCase().replace(/[^A-Z0-9]+/g,"-")}-${String(index).padStart(2,"0")}`,
    year:work.year,
    domain:"educacao-literaria",
    literaryWorkId:work.id,
    competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive:index===4?"analisar":"interpretar",
    stimulus:`${work.title} · ${work.author}. Esta variante de treino trabalha um eixo curricular da obra sem reproduzir excertos protegidos.`,
    prompt,
    options,
    answerIndex,
    explanation,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId:`pt-lit-focus-v2-${index}`
  };
}

function rotateCorrect(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}

function buildForWork(work){
  const focus=work.focus||[];
  const f0=focus[0]||"tema central";
  const f1=focus[1]||"construção das personagens";
  const f2=focus[2]||"estrutura e progressão";
  const f3=focus[3]||"recursos expressivos";
  const rows=[];

  {
    const correct=`${f0} e ${f1}`;
    const p=rotateCorrect(correct,[
      `${f0} e ${GENERIC_DISTRACTORS[0]}`,
      `${GENERIC_DISTRACTORS[1]} e ${f1}`,
      `${GENERIC_DISTRACTORS[2]} e ${GENERIC_DISTRACTORS[3]}`
    ],1);
    rows.push(item({work,index:1,competencyId:work.readyCompetencyIds?.[0]||"pt-literatura-temas",
      prompt:"Qual combinação corresponde a dois eixos de leitura relevantes desta obra?",
      ...p,explanation:`O mapa curricular desta obra inclui explicitamente «${f0}» e «${f1}».`}));
  }

  {
    const correct=f2;
    const p=rotateCorrect(correct,[GENERIC_DISTRACTORS[0],GENERIC_DISTRACTORS[1],GENERIC_DISTRACTORS[2]],2);
    rows.push(item({work,index:2,competencyId:work.readyCompetencyIds?.[1]||"pt-literatura-forma",
      prompt:"Se o objetivo for compreender como a obra organiza e desenvolve o seu sentido, que eixo de revisão é o mais diretamente útil?",
      ...p,explanation:`«${f2}» orienta diretamente a leitura da organização e progressão de sentido na obra.`}));
  }

  {
    const correct=f3;
    const p=rotateCorrect(correct,[GENERIC_DISTRACTORS[1],GENERIC_DISTRACTORS[2],GENERIC_DISTRACTORS[3]],3);
    rows.push(item({work,index:3,competencyId:work.readyCompetencyIds?.at(-1)||"pt-literatura-recursos",
      prompt:"Que eixo de estudo ajuda melhor a relacionar escolhas expressivas com os efeitos produzidos no leitor?",
      ...p,explanation:`«${f3}» é o eixo do mapa desta obra mais diretamente ligado aos efeitos de construção e expressão.`}));
  }

  {
    const correct=GENERIC_DISTRACTORS[0];
    const p=rotateCorrect(correct,[f0,f1,f2],0);
    rows.push(item({work,index:4,competencyId:work.readyCompetencyIds?.[0]||"pt-literatura-temas",
      prompt:"Qual destas opções NÃO pertence ao mapa de leitura literária definido para esta obra?",
      ...p,explanation:`Os eixos «${f0}», «${f1}» e «${f2}» pertencem ao mapa de estudo da obra; a opção técnica indicada não pertence.`}));
  }
  return rows;
}

export const PORTUGUESE_LITERARY_TRAINING_VARIANTS=PORTUGUESE_LITERARY_WORKS.flatMap(buildForWork);
