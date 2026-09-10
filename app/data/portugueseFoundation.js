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
