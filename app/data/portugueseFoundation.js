export const PORTUGUESE_REFERENCE_SOURCES=[
  {id:"ae-10",label:"Aprendizagens Essenciais de Português — 10.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/10_portugues.pdf"},
  {id:"ae-11",label:"Aprendizagens Essenciais de Português — 11.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/11_portugues.pdf"},
  {id:"ae-12",label:"Aprendizagens Essenciais de Português — 12.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/12_portugues.pdf"},
  {id:"ip-2026",label:"Informação-Prova Geral 2025/2026",url:"https://iave.pt/wp-content/uploads/2025/12/IP-Geral-2026_29nov.pdf"}
];

export const PORTUGUESE_DOMAINS=[
  {id:"oralidade",label:"Oralidade",curriculum:true,writtenExam:false},
  {id:"leitura",label:"Leitura",curriculum:true,writtenExam:true},
  {id:"educacao-literaria",label:"Educação Literária",curriculum:true,writtenExam:true},
  {id:"escrita",label:"Escrita",curriculum:true,writtenExam:true},
  {id:"gramatica",label:"Gramática",curriculum:true,writtenExam:true}
];

export const PORTUGUESE_RESPONSE_TYPES=[
  {id:"multiple-choice",label:"Escolha múltipla",gradingMode:"deterministic"},
  {id:"short-answer",label:"Resposta curta",gradingMode:"deterministic-with-equivalents"},
  {id:"restricted-response",label:"Resposta restrita",gradingMode:"rubric-assisted-provisional"},
  {id:"extended-writing",label:"Produção escrita extensa",gradingMode:"rubric-assisted-provisional"}
];

export const PORTUGUESE_COMPETENCIES=[
  {id:"pt-oral-compreensao",domain:"oralidade",label:"Compreensão de discursos orais",writtenExam:false},
  {id:"pt-oral-expressao",domain:"oralidade",label:"Expressão oral planificada",writtenExam:false},
  {id:"pt-oral-argumentacao",domain:"oralidade",label:"Argumentação e interação oral",writtenExam:false},
  {id:"pt-oral-escuta-critica",domain:"oralidade",label:"Escuta crítica e tomada de notas",writtenExam:false},
  {id:"pt-leitura-informacao",domain:"leitura",label:"Informação explícita e ideia central",writtenExam:true},
  {id:"pt-leitura-inferencia",domain:"leitura",label:"Inferência e interpretação",writtenExam:true},
  {id:"pt-leitura-coesao",domain:"leitura",label:"Coesão, referência e conectores",writtenExam:true},
  {id:"pt-leitura-organizacao",domain:"leitura",label:"Organização e intenção do texto",writtenExam:true},
  {id:"pt-literatura-recursos",domain:"educacao-literaria",label:"Recursos expressivos e efeitos de sentido",writtenExam:true},
  {id:"pt-literatura-temas",domain:"educacao-literaria",label:"Temas, símbolos e sentido global",writtenExam:true},
  {id:"pt-literatura-voz",domain:"educacao-literaria",label:"Voz, perspetiva e construção das personagens",writtenExam:true},
  {id:"pt-literatura-forma",domain:"educacao-literaria",label:"Relação entre forma, estrutura e conteúdo",writtenExam:true},
  {id:"pt-escrita-exposicao",domain:"escrita",label:"Exposição e explicação",writtenExam:true},
  {id:"pt-escrita-argumentacao",domain:"escrita",label:"Argumentação e fundamentação",writtenExam:true},
  {id:"pt-escrita-opiniao",domain:"escrita",label:"Texto de opinião extenso",writtenExam:true},
  {id:"pt-escrita-revisao",domain:"escrita",label:"Planificação, revisão e aperfeiçoamento",writtenExam:true},
  {id:"pt-gramatica-sintaxe",domain:"gramatica",label:"Funções sintáticas",writtenExam:true},
  {id:"pt-gramatica-oracoes",domain:"gramatica",label:"Coordenação e subordinação",writtenExam:true},
  {id:"pt-gramatica-coesao",domain:"gramatica",label:"Coesão referencial e valor de conectores",writtenExam:true},
  {id:"pt-gramatica-morfologia-semantica",domain:"gramatica",label:"Morfologia, modalidade e valores semânticos",writtenExam:true}
];

export const PORTUGUESE_YEAR_FOCUS=[
  {
    year:"10.º",
    readingGenres:["relato de viagem","exposição sobre um tema","apreciação crítica","cartoon"],
    literaturePeriod:"Textos portugueses dos séculos XII a XVI",
    writingGenres:["síntese","exposição sobre um tema","apreciação crítica"]
  },
  {
    year:"11.º",
    readingGenres:["discurso político","artigo de opinião","apreciação crítica"],
    literaturePeriod:"Textos portugueses dos séculos XVII a XIX",
    writingGenres:["texto expositivo","texto argumentativo"]
  },
  {
    year:"12.º",
    readingGenres:["artigo de opinião","apreciação crítica"],
    literaturePeriod:"Textos portugueses do século XX",
    writingGenres:["texto expositivo","texto argumentativo"]
  }
];

export const PORTUGUESE_RELEASE_POLICY={
  subjectId:"portuguese",
  examCode:"639",
  stage:"foundation",
  selectable:false,
  productionEligible:false,
  minimumPilotItems:60,
  minimumBetaItems:300,
  minimumDiagnosticItemsPerDomain:2,
  minimumMissionItemsPerDomain:7,
  extendedWritingFinalAutoGrade:false,
  reason:"A correção de respostas restritas e de produção escrita ainda necessita de critérios editoriais e validação humana."
};
