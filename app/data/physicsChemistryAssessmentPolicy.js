export const PHYSICS_CHEMISTRY_A_ASSESSMENT_POLICY={
  version:"2026.09-iave715-v1",
  examYear:2026,
  examCode:"715",
  durationMinutes:120,
  toleranceMinutes:30,
  totalPoints:200,
  itemSelectionPolicy:{
    mandatoryItems:15,
    optionalItems:8,
    optionalCounted:4,
    mandatorySubtotal:160,
    optionalCountedSubtotal:40
  },
  source:{
    information:"https://iave.pt/wp-content/uploads/2025/11/IP-EX-FQA715-2026.pdf",
    examPhase1:"https://iave.pt/wp-content/uploads/2026/06/EX-FQA715-F1-2026-V1_net.pdf",
    criteriaPhase1:"https://iave.pt/wp-content/uploads/2026/06/EX-FQA715-F1-2026-CC-VT_net.pdf",
    comparisonCriteria2025:"https://iave.pt/wp-content/uploads/2025/07/EX-FQA715-F1-2025-CC-VD_net.pdf",
    comparisonCriteria2024:"https://iave.pt/wp-content/uploads/2024/06/EX-FQA715-F1-2024-CC-VT_net.pdf",
    information2024:"https://iave.pt/wp-content/uploads/2023/10/IP-EX-FQA715-2024-1.pdf"
  },
  historicalComparison:{
    years:[2024,2025,2026],
    stablePatterns:["itens de seleção e de construção","construção por níveis de desempenho ou por etapas","mobilização da dimensão prático-experimental","uso de suportes como textos, tabelas, gráficos, esquemas e figuras"],
    note:"2026 é a referência operacional principal; 2024 e 2025 servem para confirmar padrões recorrentes de avaliação, não para substituir os critérios do ano atual."
  },
  responseFamilies:[
    {id:"selection",label:"Seleção",examples:["escolha múltipla","completamento por seleção"],scoring:"dicotómico ou por níveis, conforme o item"},
    {id:"stepwise",label:"Construção por etapas",examples:["cálculo","determinação quantitativa"],scoring:"soma das etapas, com tratamento explícito de erros"},
    {id:"performance-levels",label:"Construção por níveis",examples:["explicação científica","procedimento experimental","conclusão fundamentada"],scoring:"níveis de desempenho"}
  ],
  officialPrinciples:{
    alternativeValidMethods:true,
    finalAnswerOnlyCanBeZeroInStepwise:true,
    scientificLanguageMattersInLevelItems:true,
    contradictionsAreNotCredited:true,
    intermediateUnitsCanBeOmittedWithoutAutomaticPenalty:true,
    finalUnitRequiredWhenApplicable:true,
    intermediateRoundingUsuallyNoAutomaticPenalty:true,
    experimentalRoundingCanMatter:true,
    errorType1Penalty:1,
    oneErrorType2Penalty:2,
    multipleErrorType2Penalty:4,
    downstreamDependencyMatters:true
  },
  appPolicy:{
    constructedAutoGradeIsProvisional:true,
    openScientificTextFinalAutoGrade:false,
    acceptEquivalentScientificReasoning:true,
    preserveWorkByStep:true,
    showCriteriaAfterSubmission:true,
    neverPresentPracticeScoreAsOfficialExamPrediction:true
  }
};

export const PHYSICS_CHEMISTRY_A_DGE_ASSESSMENT_DOMAINS=[
  {id:"scientific-knowledge",label:"Conhecimento Científico"},
  {id:"practical-work",label:"Trabalho Prático"},
  {id:"problem-solving",label:"Resolução de Problemas"},
  {id:"scientific-communication",label:"Comunicação Científica"}
];

export const PHYSICS_CHEMISTRY_A_CURRICULUM_POLICY={
  version:"AE-marco-2026",
  sources:[
    {year:"10.º",url:"https://www.dge.mec.pt/sites/default/files/es_10_fisico-quimica_a.pdf"},
    {year:"11.º",url:"https://www.dge.mec.pt/sites/default/files/es_11_fisico-quimica_a.pdf"}
  ],
  referenceStatus:"in-force",
  deprecatedReference:"Programa e Metas Curriculares revogados pelo Despacho 6605-A/2021",
  practicalExperimentalIsCore:true,
  examUsesBothYears:true,
  examBalancesPhysicsChemistry:true
};
