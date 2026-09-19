export const PORTUGUESE_REFERENCE_SOURCES=[
  {id:"ae-10",authority:"DGE",status:"in-force",legalBasis:"Despacho n.º 8476-A/2018, de 31 de agosto",label:"Aprendizagens Essenciais de Português — 10.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/10_portugues.pdf"},
  {id:"ae-11",authority:"DGE",status:"in-force",legalBasis:"Despacho n.º 8476-A/2018, de 31 de agosto",label:"Aprendizagens Essenciais de Português — 11.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/11_portugues.pdf"},
  {id:"ae-12",authority:"DGE",status:"in-force",legalBasis:"Despacho n.º 8476-A/2018, de 31 de agosto",label:"Aprendizagens Essenciais de Português — 12.º ano",url:"https://www.dge.mec.pt/sites/default/files/Curriculo/Aprendizagens_Essenciais/12_portugues.pdf"},
  {id:"ae-revision-2026",authority:"EduQA",status:"consultation",label:"Revisão e atualização das Aprendizagens Essenciais — enquadramento",url:"https://eduqa.pt/documento-de-enquadramento/"},
  {id:"ip-2026",authority:"IAVE",status:"in-force",label:"Informação-Prova Geral 2025/2026",url:"https://iave.pt/wp-content/uploads/2025/12/IP-Geral-2026_29nov.pdf"}
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

export const PORTUGUESE_COMPETENCY_ALIASES={
  "pt-leitura-intencao":"pt-leitura-organizacao",
  "pt-leitura-argumentacao":"pt-leitura-inferencia",
  "pt-literatura-espaco":"pt-literatura-forma",
  "pt-literatura-personagem":"pt-literatura-voz",
  "pt-literatura-tempo":"pt-literatura-forma",
  "pt-escrita-planificacao":"pt-escrita-revisao",
  "pt-escrita-coesao":"pt-escrita-revisao",
  "pt-escrita-registo":"pt-escrita-revisao",
  "pt-escrita-coerencia":"pt-escrita-revisao",
  "pt-escrita-pontuacao":"pt-escrita-revisao",
  "pt-gramatica-classes":"pt-gramatica-morfologia-semantica",
  "pt-gramatica-funcoes":"pt-gramatica-sintaxe",
  "pt-gramatica-semantica":"pt-gramatica-morfologia-semantica",
  "pt-gramatica-modalidade":"pt-gramatica-morfologia-semantica"
};

export function resolvePortugueseCompetencyId(id){
  return PORTUGUESE_COMPETENCY_ALIASES[id]||id;
}

export const PORTUGUESE_YEAR_FOCUS=[
  {
    year:"10.º",
    sourceId:"ae-10",
    curriculumStatus:"in-force",
    readingGenres:["relato de viagem","exposição sobre um tema","apreciação crítica","cartoon"],
    literaturePeriod:"Textos portugueses dos séculos XII a XVI",
    literatureCorpus:[
      "Poesia trovadoresca (seleção prescrita)",
      "Fernão Lopes — Crónica de D. João I (excertos prescritos)",
      "Gil Vicente — Farsa de Inês Pereira ou Auto da Feira (leitura integral)",
      "Luís de Camões — Rimas (seleção prescrita)",
      "Luís de Camões — Os Lusíadas (três reflexões do Poeta entre as prescritas)"
    ],
    writingGenres:["síntese","exposição sobre um tema","apreciação crítica"],
    grammarFocus:["origem, evolução e distribuição geográfica do português","processos fonológicos","constituintes, funções sintáticas e classificação de orações","etimologia e formação regular de palavras","modalidade","anáfora, registos e atos de fala"]
  },
  {
    year:"11.º",
    sourceId:"ae-11",
    curriculumStatus:"in-force",
    readingGenres:["discurso político","artigo de opinião","apreciação crítica"],
    literaturePeriod:"Textos portugueses dos séculos XVII a XIX",
    literatureCorpus:[
      "Padre António Vieira — Sermão de Santo António (partes prescritas)",
      "Almeida Garrett — Frei Luís de Sousa (leitura integral)",
      "Garrett, Herculano ou Camilo — uma das opções prescritas",
      "Eça de Queirós — Os Maias ou A Ilustre Casa de Ramires (leitura integral)",
      "Antero de Quental — dois sonetos",
      "Cesário Verde — O Sentimento dum Ocidental (leitura integral)"
    ],
    writingGenres:["texto de opinião","apreciação crítica","exposição sobre um tema"],
    grammarFocus:["constituintes e funções sintáticas","articulação entre constituintes e frases","etimologia e valores semânticos","coesão gramatical e lexical","anáfora e dêixis","discurso direto, indireto e indireto livre"]
  },
  {
    year:"12.º",
    sourceId:"ae-12",
    curriculumStatus:"in-force",
    readingGenres:["artigo de opinião","apreciação crítica"],
    literaturePeriod:"Textos portugueses do século XX",
    literatureCorpus:[
      "Fernando Pessoa — ortónimo e heterónimos (seleção prescrita)",
      "Fernando Pessoa — Mensagem (seis poemas)",
      "Um conto entre as três opções prescritas",
      "Poetas portugueses contemporâneos (três autores, dois poemas por autor)",
      "José Saramago — Memorial do Convento ou O Ano da Morte de Ricardo Reis"
    ],
    writingGenres:["texto de opinião","apreciação crítica","exposição sobre um tema"],
    grammarFocus:["processos irregulares de formação de palavras","funções sintáticas em grupos e na frase","articulação entre constituintes, orações e frases","valores aspetuais","cadeias referenciais e anáfora","coerência, coesão e reprodução do discurso"]
  }
];

export const PORTUGUESE_CURRICULUM_GOVERNANCE={
  verifiedOn:"2026-09-16",
  activeFramework:"Aprendizagens Essenciais homologadas em 2018",
  pendingFramework:"Revisão das Aprendizagens Essenciais publicada para consulta em 2026",
  rule:"Conteúdo em consulta ou piloto não substitui o referencial homologado sem publicação oficial de entrada em vigor.",
  schoolAutonomy:"As escolas e os docentes escolhem estratégias, recursos, sequenciação e projetos; essa margem não altera o núcleo nacional das Aprendizagens Essenciais nem as escolhas prescritas no respetivo anexo."
};

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
