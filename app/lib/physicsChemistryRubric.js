import {assessEvidence,aggregateCriterionAssessment,automaticRubricSummary,automaticFeedbackForCriteria} from "./automaticEvidenceGrader.js";
import {buildScoreExplainability} from "./scoreExplainability.js";
export const PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS=[
  {id:"observed",label:"Cumpri"},
  {id:"partial",label:"Parcial"},
  {id:"not-observed",label:"Ainda não"}
];

const RUBRICS={
  "FQA-R-ELEM-01":[
    {id:"levels",label:"Explica a origem das riscas espectrais",observations:[
      {id:"levels-transition",label:"Relaciona cada risca com uma transição eletrónica entre níveis de energia."},
      {id:"levels-photon",label:"Relaciona a transição com emissão de um fotão de energia/frequência definida."}
    ]},
    {id:"specificity",label:"Justifica a identificação do elemento",observations:[
      {id:"specificity-levels",label:"Indica que os níveis de energia dependem do elemento."},
      {id:"specificity-pattern",label:"Conclui que o conjunto de riscas funciona como padrão característico."}
    ]}
  ],
  "FQA-R-MAT-01":[
    {id:"measure",label:"Mede corretamente a solução-mãe",observations:[
      {id:"measure-aliquot",label:"Seleciona e mede uma alíquota adequada."},
      {id:"measure-volumetric",label:"Refere material volumétrico apropriado, como pipeta volumétrica."}
    ]},
    {id:"prepare",label:"Executa corretamente a diluição",observations:[
      {id:"prepare-flask",label:"Transfere a alíquota para um balão volumétrico."},
      {id:"prepare-mark",label:"Completa com solvente até ao traço de referência."}
    ]},
    {id:"quality",label:"Controla a qualidade do procedimento",observations:[
      {id:"quality-meniscus",label:"Refere leitura correta do menisco ao nível dos olhos."},
      {id:"quality-mix",label:"Homogeneíza a solução final."}
    ]}
  ],
  "FQA-R-ENE-01":[
    {id:"variables",label:"Seleciona grandezas e medições",observations:[
      {id:"variables-mass",label:"Inclui a massa da esfera quando necessária ao cálculo energético."},
      {id:"variables-height",label:"Mede alturas relativamente a uma referência definida."},
      {id:"variables-speed",label:"Mede ou determina a velocidade nos pontos relevantes."}
    ]},
    {id:"energy",label:"Compara energia mecânica",observations:[
      {id:"energy-initial",label:"Determina a energia mecânica inicial com as grandezas medidas."},
      {id:"energy-final",label:"Determina a energia mecânica final com o mesmo referencial."}
    ]},
    {id:"uncertainty",label:"Interpreta o resultado experimental",observations:[
      {id:"uncertainty-compare",label:"Compara os valores considerando a incerteza experimental."},
      {id:"uncertainty-loss",label:"Distingue discrepância experimental de dissipação física possível."}
    ]}
  ],
  "FQA-R-MEC-01":[
    {id:"acceleration",label:"Obtém a aceleração",observations:[
      {id:"acceleration-slope",label:"Associa a aceleração ao declive do gráfico velocidade-tempo."},
      {id:"acceleration-sign",label:"Interpreta corretamente o sinal do declive."}
    ]},
    {id:"displacement",label:"Obtém o deslocamento",observations:[
      {id:"displacement-area",label:"Associa o deslocamento à área algébrica sob v(t)."},
      {id:"displacement-sign",label:"Considera áreas negativas quando a velocidade muda de sinal."}
    ]},
    {id:"distance",label:"Distingue deslocamento de distância",observations:[
      {id:"distance-absolute",label:"Reconhece que a distância soma os módulos dos percursos."}
    ]}
  ],
  "FQA-R-WAV-01":[
    {id:"distance",label:"Reduz a incerteza relativa temporal",observations:[
      {id:"distance-longer",label:"Usa uma distância maior de propagação."},
      {id:"distance-rationale",label:"O erro temporal tem menor peso relativo num tempo total maior."}
    ]},
    {id:"repeat",label:"Trata a variabilidade aleatória",observations:[
      {id:"repeat-many",label:"Repete o ensaio várias vezes."},
      {id:"repeat-analysis",label:"Compara resultados usando média e/ou dispersão."}
    ]},
    {id:"control",label:"Controla fontes sistemáticas",observations:[
      {id:"control-delay",label:"Estima ou considera atrasos dos sensores/equipamento."},
      {id:"control-medium",label:"Mantém controladas as condições ambientais do meio."}
    ]}
  ],
  "FQA-R-EQ-01":[
    {id:"temperature",label:"Interpreta o aumento de temperatura",observations:[
      {id:"temperature-endothermic",label:"Relaciona o aumento de temperatura com favorecimento do sentido endotérmico."},
      {id:"temperature-composition",label:"Indica que a composição de equilíbrio se altera."}
    ]},
    {id:"catalyst",label:"Distingue o efeito do catalisador",observations:[
      {id:"catalyst-rates",label:"Explica que o catalisador acelera os dois sentidos."},
      {id:"catalyst-equilibrium",label:"Indica que não altera Kc nem a composição de equilíbrio."}
    ]},
    {id:"contrast",label:"Compara corretamente os dois efeitos",observations:[
      {id:"contrast-speed-vs-position",label:"Distingue alteração da rapidez de chegada ao equilíbrio de alteração da posição de equilíbrio."}
    ]}
  ],
  "FQA-R-AQ-01":[
    {id:"equivalence",label:"Caracteriza o ponto de equivalência",observations:[
      {id:"equivalence-stoich",label:"Relaciona-o com a proporção estequiométrica entre titulante e titulado."}
    ]},
    {id:"detection",label:"Seleciona um método de deteção",observations:[
      {id:"detection-indicator",label:"Refere indicador adequado ou curva de pH."},
      {id:"detection-region",label:"Relaciona o método com a região próxima da equivalência."}
    ]},
    {id:"uncertainty",label:"Identifica uma fonte de incerteza",observations:[
      {id:"uncertainty-volume",label:"Refere leitura/adição de volume ou determinação do ponto final."},
      {id:"uncertainty-effect",label:"Explica de que forma essa fonte pode afetar o resultado."}
    ]}
  ]
};

export function physicsChemistryRubricFor(item){
  const specific=RUBRICS[item?.id];
  if(specific)return specific;
  return (item?.criteria||[]).map((label,index)=>({
    id:"criterion-"+(index+1),
    label,
    observations:[{id:"criterion-"+(index+1)+"-evidence",label}]
  }));
}

function explicitPhysicsChemistryAmbiguity(normalizedText){
  return /\bacho que\b[\s\S]{0,100}\bou talvez\b/u.test(normalizedText);
}

function physicsChemistryKeywordSoupLike(text){
  const raw=String(text||"").trim();
  const normalized=raw.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-PT");
  const words=normalized.match(/[a-z0-9%+\-]+/gu)||[];
  if(words.length<6)return false;
  if(/[.!?;:]/u.test(raw)||/(?:->|→|=>|=)/u.test(raw))return false;
  const finiteRelation=/\b(?:reduz|aumenta|diminui|permite|resulta|corresponde|indica|mostra|favorece|altera|mantem|repete|mede|calcula|compara|transfere|completa|homogeneiza|soma|acelera|ocorre|estao|fica|faz|introduz|representa|depende|funciona)\b/u;
  return !finiteRelation.test(normalized);
}

function universalPh7Contradiction(item,criterionId,normalizedText){
  if(item?.id!=="FQA-R-AQ-01"||criterionId!=="equivalence")return false;
  const universal=/\b(?:sempre|necessariamente|obrigatoriamente)\b[\s\S]{0,45}\bph\s*7\b/u.test(normalizedText)
    ||/\bph\s*7\b[\s\S]{0,45}\b(?:sempre|necessariamente|obrigatoriamente)\b/u.test(normalizedText);
  const rejection=/\b(?:nao|nem)\b[\s\S]{0,25}\b(?:sempre|necessariamente|obrigatoriamente)\b[\s\S]{0,35}\bph\s*7\b/u.test(normalizedText);
  return universal&&!rejection;
}

export function automaticPhysicsChemistryRubricResult(item,responseText){
  const text=String(responseText||"").trim();
  if(!text)return {
    status:"unanswered",final:false,correct:null,points:null,maxPoints:item.maxPoints||10,
    gradingMode:"automatic-rubric-provisional",responseText:text,rubricCompleted:false,criteria:[]
  };
  const normalizedResponse=text.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-PT");
  const keywordSoupLike=physicsChemistryKeywordSoupLike(text);
  const criteria=physicsChemistryRubricFor(item).map((criterion,criterionIndex)=>{
    const criterionContradiction=universalPh7Contradiction(item,criterion.id,normalizedResponse);
    const observations=(criterion.observations||[]).map(observation=>{
      const assessed=assessEvidence(text,observation.label,criterion.label,item.criteria?.[criterionIndex]);
      const normalizedText=normalizedResponse;
      const explicitAmbiguity=!!assessed.ambiguityDetected||explicitPhysicsChemistryAmbiguity(normalizedText);
      const contradictionDetected=!!assessed.contradictionDetected||criterionContradiction;
      const unsafe=contradictionDetected||explicitAmbiguity||!!assessed.manipulationDetected||keywordSoupLike;
      const directDetection=!unsafe&&observation.id==="detection-indicator"&&(/\bindicador\b/u.test(normalizedText)||/curva\s+de\s+ph/u.test(normalizedText));
      let resolved=directDetection?{...assessed,status:"observed",scoreRatio:1,confidence:Math.max(.88,assessed.confidence||0)}:assessed;
      if(keywordSoupLike){
        resolved={
          ...resolved,
          status:resolved.status==="observed"?"partial":resolved.status,
          scoreRatio:Math.min(.35,Number.isFinite(resolved.scoreRatio)?resolved.scoreRatio:.35)
        };
      }
      if(criterionContradiction){
        resolved={
          ...resolved,
          status:resolved.status==="observed"?"partial":resolved.status,
          scoreRatio:Math.min(.35,Number.isFinite(resolved.scoreRatio)?resolved.scoreRatio:.35),
          contradictionDetected:true
        };
      }
      if(explicitAmbiguity){
        resolved={
          ...resolved,
          status:resolved.status==="observed"?"partial":resolved.status,
          scoreRatio:Math.min(.35,Number.isFinite(resolved.scoreRatio)?resolved.scoreRatio:.35),
          ambiguityDetected:true
        };
      }
      return {
        ...observation,
        status:resolved.status,
        confidence:resolved.confidence,
        scoreRatio:resolved.scoreRatio,
        semanticScore:resolved.semanticScore,
        contradictionDetected:!!resolved.contradictionDetected,
        ambiguityDetected:!!resolved.ambiguityDetected,
        manipulationDetected:!!resolved.manipulationDetected,
        studentEvidence:resolved.evidence?[resolved.evidence]:[],
        autoAssessed:true
      };
    });
    const aggregate=aggregateCriterionAssessment(observations);
    return {...criterion,...aggregate,observations,autoAssessed:true};
  });
  const summary=automaticRubricSummary(criteria,item.maxPoints||10);
  const pointMap=new Map(summary.criterionPoints.map(row=>[row.id,row]));
  const scoredCriteria=criteria.map(criterion=>({...criterion,...(pointMap.get(criterion.id)||{})}));
  const feedbackSummary=automaticFeedbackForCriteria(scoredCriteria,text);
  const scoreExplainability=buildScoreExplainability({awardedPoints:summary.provisionalPoints,maxPoints:item.maxPoints||10,criteria:scoredCriteria,requiresReview:summary.requiresReview});
  return {
    status:"auto-assessed-provisional",final:false,correct:null,points:null,
    provisionalPoints:summary.provisionalPoints,maxPoints:item.maxPoints||10,
    gradingMode:"automatic-rubric-provisional",responseText:text,rubricCompleted:true,
    requiresReview:summary.requiresReview,autoAssessmentConfidence:summary.confidence,criteria:scoredCriteria,feedbackSummary,scoreExplainability,
    note:"A app avaliou automaticamente a resposta científica por critérios. O resultado é provisório quando a interpretação não é totalmente determinística."
  };
}

export function physicsChemistryRubricResult(item,responseText,assessment={}){
  const criteria=physicsChemistryRubricFor(item).map(criterion=>({
    ...criterion,
    status:assessment[criterion.id]?.status||"pending",
    studentEvidence:String(assessment[criterion.id]?.evidence||"").trim()
      ?[String(assessment[criterion.id].evidence).trim()]
      :[],
    observations:(criterion.observations||[]).map(observation=>({
      ...observation,
      status:assessment[criterion.id]?.observations?.[observation.id]?.status||assessment[criterion.id]?.status||"pending",
      studentEvidence:String(assessment[criterion.id]?.observations?.[observation.id]?.evidence||"").trim()
        ?[String(assessment[criterion.id].observations[observation.id].evidence).trim()]
        :[]
    }))
  }));
  const completed=criteria.length>0&&criteria.every(criterion=>criterion.status!=="pending");
  return {
    status:String(responseText||"").trim()?"self-assessed-awaiting-review":"unanswered",
    final:false,correct:null,points:null,maxPoints:item.maxPoints||10,gradingMode:item.gradingMode,
    responseText:String(responseText||"").trim(),rubricCompleted:completed,criteria,
    note:"Autoavaliação guiada por critérios. Não corresponde a uma classificação automática da resposta."
  };
}

export function physicsChemistryAssessmentSummary(item,assessment={}){
  const criteria=physicsChemistryRubricFor(item);
  const counts={observed:0,partial:0,"not-observed":0,pending:0};
  criteria.forEach(criterion=>{
    const status=assessment[criterion.id]?.status||"pending";
    counts[status]=(counts[status]||0)+1;
  });
  return {counts,complete:criteria.length>0&&counts.pending===0,total:criteria.length};
}
