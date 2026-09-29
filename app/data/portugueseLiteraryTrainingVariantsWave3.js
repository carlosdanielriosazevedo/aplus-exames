import {PORTUGUESE_LITERARY_WORKS} from "./portugueseLiteraryWorks.js";

function rotateCorrect(correct,distractors,shift){
  const values=[correct,...distractors.slice(0,3)];
  const options=values.map((_,index)=>values[(index+shift)%4]);
  return {options,answerIndex:options.indexOf(correct)};
}

function makeItem({work,index,competencyId,prompt,correct,distractors,explanation,cognitive="interpretar"}){
  const p=rotateCorrect(correct,distractors,index%4);
  return {
    id:`PT639-LIT-V3-${work.id.toUpperCase().replace(/[^A-Z0-9]+/g,"-")}-${String(index).padStart(2,"0")}`,
    year:work.year,
    domain:"educacao-literaria",
    literaryWorkId:work.id,
    competencyId,
    sourceOrigin:"original",
    reviewStatus:"prototype",
    responseType:"multiple-choice",
    cognitive,
    stimulus:`${work.title} · ${work.author}. Treino de leitura literária centrado em relações entre temas, estrutura, voz e recursos, sem reproduzir excertos protegidos.`,
    prompt,
    options:p.options,
    answerIndex:p.answerIndex,
    explanation,
    gradingMode:"deterministic",
    maxPoints:13,
    generated:true,
    practiceVariant:true,
    templateId:`pt-lit-depth-v3-${index}`
  };
}

function buildForWork(work){
  const [f0="tema central",f1="personagens e voz",f2="estrutura e progressão",f3="recursos expressivos"]=work.focus||[];
  const comps=work.readyCompetencyIds||["pt-literatura-temas","pt-literatura-forma"];
  const c0=comps[0]||"pt-literatura-temas";
  const c1=comps[1]||c0;
  const cLast=comps.at(-1)||c0;
  return [
    makeItem({
      work,index:1,competencyId:c0,
      prompt:`Ao rever ${work.title}, que relação de leitura deve ser sustentada por evidência textual e não apenas enunciada?`,
      correct:`${f0} em articulação com ${f1}`,
      distractors:["uma data biográfica isolada","uma classificação gramatical sem relação com o sentido","uma opinião pessoal sem apoio textual"],
      explanation:`A leitura literária desta obra deve articular eixos como «${f0}» e «${f1}» com evidência do texto.`
    }),
    makeItem({
      work,index:2,competencyId:c1,
      prompt:`Se uma pergunta sobre ${work.title} pedir a progressão do sentido, qual eixo é o ponto de partida mais adequado?`,
      correct:f2,
      distractors:[f0,f1,"contexto editorial sem ligação à organização interna"],
      explanation:`O eixo «${f2}» é o mais diretamente associado à organização e desenvolvimento do sentido.`
    }),
    makeItem({
      work,index:3,competencyId:cLast,
      prompt:`Numa resposta sobre efeitos expressivos em ${work.title}, o aluno deve sobretudo relacionar:`,
      correct:`${f3} com o efeito produzido e o sentido construído`,
      distractors:[`${f3} apenas com uma definição memorizada`,"a biografia do autor com qualquer passagem","o número de linhas com a qualidade literária"],
      explanation:"Identificar um recurso só é suficiente quando se explica a sua função no contexto da obra.",
      cognitive:"analisar"
    }),
    makeItem({
      work,index:4,competencyId:c0,
      prompt:`Qual formulação mostra uma interpretação mais completa de ${work.title}?`,
      correct:`uma ideia sobre ${f0}, apoiada numa evidência e ligada a ${f1}`,
      distractors:["um resumo do enredo sem interpretação","uma lista de recursos sem explicar efeitos","uma opinião sobre a obra sem evidência"],
      explanation:"Uma resposta forte formula a interpretação, seleciona evidência e explica a ligação entre ambas.",
      cognitive:"analisar"
    }),
    makeItem({
      work,index:5,competencyId:c1,
      prompt:`Ao comparar dois momentos ou passagens de ${work.title}, que procedimento é mais rigoroso?`,
      correct:`comparar como ${f2} altera ou desenvolve ${f0}`,
      distractors:["contar palavras e concluir apenas pela extensão","comparar só a pontuação sem contexto","repetir o mesmo resumo para ambos os momentos"],
      explanation:"A comparação deve incidir numa relação interpretativa observável, articulando estrutura e tema.",
      cognitive:"analisar"
    }),
    makeItem({
      work,index:6,competencyId:cLast,
      prompt:`Perante uma pergunta de justificação sobre ${work.title}, qual resposta cumpre melhor o que se espera no exame?`,
      correct:"afirma a ideia, seleciona uma marca pertinente e explica como ela sustenta a interpretação",
      distractors:["copia uma passagem sem a comentar","apresenta apenas a conclusão sem evidência","enumera conteúdos estudados sem responder ao pedido"],
      explanation:"A justificação deve tornar explícita a ligação entre interpretação e evidência textual.",
      cognitive:"analisar"
    })
  ];
}

export const PORTUGUESE_LITERARY_TRAINING_VARIANTS_WAVE3=PORTUGUESE_LITERARY_WORKS.flatMap(buildForWork);
