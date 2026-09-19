export const PORTUGUESE_ASSESSMENT_POLICY={
  subjectId:"portuguese",
  examCode:"639",
  authority:"IAVE",
  finalAutoGradeForOpenResponses:false,
  principles:[
    "A resposta é avaliada pelo que demonstra, não por palavras-chave isoladas.",
    "Critérios de conteúdo e de correção linguística são observados separadamente quando a tipologia o exige.",
    "Formulações semanticamente equivalentes devem ser aceites quando satisfazem o critério.",
    "Contradições relevantes, informação ilegível ou respostas que não respondem ao solicitado devem ser sinalizadas para revisão.",
    "A aplicação apresenta evidência por critério e uma indicação provisória; não inventa uma classificação final quando o juízo humano é necessário."
  ],
  selfAssessmentStates:[
    {id:"observed",label:"Encontro claramente",description:"Consigo localizar evidência clara desta observação na minha resposta."},
    {id:"partial",label:"Encontro em parte",description:"Há evidência, mas está incompleta ou pouco clara."},
    {id:"not-observed",label:"Não encontro",description:"Não há evidência suficiente desta observação na minha resposta."},
    {id:"unsure",label:"Não tenho a certeza",description:"O aluno pede ajuda para verificar este critério."}
  ],
  evidencePolicy:{
    requireQuoteOrParaphraseWhenTextDependent:true,
    preserveStudentEvidence:true,
    allowMultipleEvidenceFragments:true,
    evidenceDoesNotEqualFinalScore:true
  }
};

export function buildPortugueseCriterionEvidence(item){
  if(!item?.rubric?.criteria)return [];
  return item.rubric.criteria.map(criterion=>({
    criterionId:criterion.id,
    label:criterion.label,
    maxPoints:criterion.points,
    observations:(criterion.observations||[]).map(observation=>({
      observationId:observation.id,
      label:observation.label,
      selfAssessment:"unsure",
      evidence:[]
    })),
    provisional:true
  }));
}

export function summarizePortugueseCriterionEvidence(criteria=[]){
  const observations=criteria.flatMap(criterion=>criterion.observations||[]);
  const counts={met:0,partial:0,"not-met":0,unsure:0};
  for(const observation of observations){
    if(Object.hasOwn(counts,observation.selfAssessment))counts[observation.selfAssessment]+=1;
  }
  return {observations:observations.length,counts,finalGrade:null,provisional:true};
}
