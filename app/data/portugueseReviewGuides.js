const DOMAIN_STUDY_GUIDES={
  "educacao-literaria":{
    label:"Como estudar a obra",
    studySteps:[
      "Situa primeiro o texto na obra, no autor e no período literário sem transformar o contexto numa lista para decorar.",
      "Identifica temas, conflitos, vozes, personagens ou símbolos e liga cada ideia a elementos concretos do texto.",
      "Revê os recursos expressivos apenas quando conseguires explicar o efeito que produzem no sentido."
    ],
    pitfalls:[
      "Resumir o enredo ou o poema sem interpretar o que os elementos significam.",
      "Usar etiquetas como «Romantismo», «ironia» ou «símbolo» sem mostrar como aparecem no texto.",
      "Memorizar uma interpretação única e ignorar a necessidade de a sustentar com evidência textual."
    ],
    memoryTip:"Fecha o texto e tenta explicar em três frases: o que está em causa, como é construído e porque é importante."
  },
  leitura:{
    label:"Como estudar leitura",
    studySteps:[
      "Começa por distinguir assunto, ideia central e intenção comunicativa.",
      "Segue a organização do texto: introdução do tema, desenvolvimento das ideias e conclusão ou efeito final.",
      "Separa informação explícita de inferências e confirma cada inferência com pistas concretas."
    ],
    pitfalls:[
      "Interpretar pelo conhecimento geral do tema em vez de pelo que o texto permite concluir.",
      "Confundir exemplo com argumento, ou opinião com facto.",
      "Ignorar conectores, títulos, imagens ou outros elementos que orientam a interpretação."
    ],
    memoryTip:"Ao terminar um texto, resume-o numa frase e aponta duas pistas que justificam essa leitura."
  },
  escrita:{
    label:"Como estudar escrita",
    studySteps:[
      "Identifica primeiro o género, o destinatário, o objetivo e o foco pedido.",
      "Planeia a progressão antes de escrever: ideia central, desenvolvimento e fecho.",
      "Revê o texto em duas passagens: primeiro coerência e conteúdo; depois linguagem, pontuação e correção."
    ],
    pitfalls:[
      "Começar a escrever sem definir uma ideia central clara.",
      "Acumular exemplos ou argumentos sem explicar a ligação entre eles.",
      "Fazer uma revisão apenas ortográfica e deixar problemas de estrutura por corrigir."
    ],
    memoryTip:"Antes de dar um texto por terminado, confirma: respondi ao tema, organizei as ideias e eliminei ambiguidades?"
  },
  gramatica:{
    label:"Como estudar gramática",
    studySteps:[
      "Analisa sempre a palavra ou expressão dentro da frase completa.",
      "Procura propriedades observáveis: posição, substituição, relação com o verbo, conectores e valor semântico.",
      "Justifica a classificação com um teste ou uma propriedade, não apenas com o nome da categoria."
    ],
    pitfalls:[
      "Classificar uma palavra isolada sem considerar a função que desempenha na frase.",
      "Confundir classe de palavra com função sintática.",
      "Decorar listas de conjunções ou valores sem verificar o sentido produzido no contexto."
    ],
    memoryTip:"Para cada conceito, guarda um exemplo teu e um teste simples que te ajude a reconhecê-lo."
  }
};

const SPECIAL_FOCUS={
  "pt10-trovadoresca":["Voz e destinatário","Paralelismo e refrão","Ironia e crítica social"],
  "pt10-fernao-lopes":["Narrador histórico","Caracterização coletiva","Dinamismo narrativo"],
  "pt10-gil-vicente":["Mecanismos de cómico","Tipos sociais","Crítica de costumes"],
  "pt10-camoes-rimas":["Amor e mudança","Relação entre forma e pensamento","Recursos expressivos"],
  "pt10-lusiadas":["Narração e reflexão","Valores épicos","Crítica e experiência humana"],
  "pt11-vieira":["Tese e argumentação","Alegoria dos peixes","Retórica persuasiva"],
  "pt11-frei-luis":["Conflito trágico","Identidade e destino","Espaço e tempo simbólicos"],
  "pt11-romantismo-opcao":["Personagem e conflito","Marcas do Romantismo","Contexto e crítica social"],
  "pt11-eca":["Representação social","Ironia","Narrador e focalização"],
  "pt11-antero":["Conflito interior","Progressão do pensamento","Forma do soneto"],
  "pt11-cesario":["Deambulação urbana","Contrastes sociais","Imagética e sensação"],
  "pt12-pessoa-ortonimo":["Fingimento artístico","Sentir e pensar","Consciência e identidade"],
  "pt12-pessoa-heteronimos":["Poéticas distintas","Relação com sensação e tempo","Comparação sustentada por marcas textuais"],
  "pt12-mensagem":["Mito e História","Símbolos","Projeto de renovação"],
  "pt12-conto":["Narrador e focalização","Conflito","Símbolos e desfecho"],
  "pt12-poesia-contemporanea":["Voz poética","Imagem e forma","Comparação entre textos"],
  "pt12-saramago":["História e ficção","Narrador e ironia","Personagens e símbolos"]
};

export function portugueseReviewGuide(unit){
  if(!unit)return null;
  const base=DOMAIN_STUDY_GUIDES[unit.domain];
  if(!base)return null;
  return {
    ...base,
    focus:SPECIAL_FOCUS[unit.id]||unit.keyPoints.slice(0,3)
  };
}

export {DOMAIN_STUDY_GUIDES,SPECIAL_FOCUS};
