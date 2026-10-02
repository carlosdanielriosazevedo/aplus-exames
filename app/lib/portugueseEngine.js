import {PORTUGUESE_639_FOUNDATION,PORTUGUESE_639_FOUNDATION_RELEASE,portugueseItemById} from "../data/portugueseFoundation.js";
import {PORTUGUESE_639_OFFICIAL_SPEC} from "../data/portugueseOfficialSpec.js";
import {applyPortugueseRubricObservations} from "../data/portugueseRubrics.js";
import {assessEvidence,aggregateCriterionAssessment,automaticRubricSummary,automaticFeedbackForCriteria} from "./automaticEvidenceGrader.js";
import {portugueseObservationGuidance} from "./portugueseObservationGuidance.js";
import {gradePortugueseDeterministicResponse} from "./portugueseDeterministicResponse.js";

const OBSERVABLE_ITEMS=applyPortugueseRubricObservations(PORTUGUESE_639_FOUNDATION.items);

export function normalizePortugueseAnswer(value){
  return String(value??"").trim().toLocaleLowerCase("pt-PT").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ");
}

export function portugueseFoundationItems(){return OBSERVABLE_ITEMS}
export function portugueseFoundationItemById(id){return OBSERVABLE_ITEMS.find(item=>item.id===id)||null}
export function portugueseReleaseStatus(){return PORTUGUESE_639_FOUNDATION_RELEASE}
export function portugueseOfficialSpec(){return PORTUGUESE_639_OFFICIAL_SPEC}

export function rubricIdFor(item){return item?.rubric?.id||`${item?.id||"pt"}-rubric`}

export function emptyPortugueseRubricAssessment(item){
  return {
    rubricId:rubricIdFor(item),
    rubricCompleted:false,
    criteria:(item?.rubric?.criteria||[]).map(criterion=>({
      ...criterion,
      status:"pending",
      scoreRatio:0,
      confidence:null,
      contradictionDetected:false,
      observations:(criterion.observations||[]).map(observation=>({...observation,status:"pending",confidence:null,studentEvidence:[]}))
    }))
  };
}

export function assessPortugueseRubricObservation(result,criterionId,observationId,status,evidence=""){
  const allowed=new Set(["observed","partial","not-observed","pending"]);
  if(!allowed.has(status))throw new Error(`Invalid Portuguese rubric observation status: ${status}`);
  const criteria=(result?.criteria||[]).map(criterion=>criterion.id!==criterionId?criterion:{
    ...criterion,
    observations:(criterion.observations||[]).map(observation=>observation.id!==observationId?observation:{
      ...observation,status,studentEvidence:evidence?[String(evidence)]:observation.studentEvidence||[]
    })
  }).map(criterion=>{
    const aggregate=aggregateCriterionAssessment(criterion.observations||[]);
    return {...criterion,...aggregate};
  });
  const rubricCompleted=criteria.every(criterion=>(criterion.observations||[]).every(observation=>observation.status&&observation.status!=="pending"));
  return {...result,criteria,rubricCompleted,status:rubricCompleted?"self-assessed-awaiting-review":result.status};
}

export function rubricEvidenceSnapshot(result){
  return (result?.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,status:observation.status,evidence:(observation.studentEvidence||[])[0]||""})));
}

export function gradePortugueseResponse(item,value){
  if(!item)return {status:"invalid",final:false,correct:null,points:null,maxPoints:null,reason:"missing-item"};
  const deterministic=gradePortugueseDeterministicResponse(item,value);
  if(deterministic)return deterministic;
  if(item.responseType!=="restricted-response"&&item.responseType!=="extended-writing"){
    return {status:"invalid",final:false,correct:null,points:null,maxPoints:item.maxPoints??item.points??null,reason:"unsupported-response-type"};
  }

  const responseText=String(value??"").trim();
  const words=responseText.split(/\s+/u).filter(Boolean).length;
  if(!responseText)return {
    status:"unanswered",final:false,responseText:"",correct:null,points:null,provisionalPoints:0,maxPoints:item.maxPoints,
    gradingMode:"automatic-rubric-provisional",rubricId:rubricIdFor(item),rubricCompleted:false,criteria:emptyPortugueseRubricAssessment(item).criteria,
    feedbackSummary:automaticFeedbackForCriteria([],"")
  };

  const min=item.wordLimit?.min;
  const structuralAssessment=criterion=>{
    const normalized=normalizePortugueseAnswer(responseText);
    const sentenceCount=(responseText.match(/[.!?]+/gu)||[]).length;
    const paragraphCount=responseText.split(/\n\s*\n/u).filter(row=>row.trim()).length;
    const connectors=["porque","por isso","além disso","alem disso","assim","contudo","porém","porem","logo","portanto","embora","consequentemente","em conclusão","em conclusao"];
    const connectorCount=connectors.filter(token=>normalized.includes(normalizePortugueseAnswer(token))).length;
    if(["lingua","correcao-linguistica"].includes(criterion.id)){
      const status=words>=Math.max(20,min*.55)?"observed":words>=10?"partial":"not-observed";
      return {status,scoreRatio:status==="observed"?1:status==="partial"?.5:0,confidence:.48,observations:(criterion.observations||[]).map(observation=>({...observation,status,confidence:.48,studentEvidence:[]}))};
    }
    if(["estrutura","coerencia"].includes(criterion.id)){
      const status=(sentenceCount>=3&&(connectorCount>=1||paragraphCount>=2))?"observed":sentenceCount>=2?"partial":"not-observed";
      return {status,scoreRatio:status==="observed"?1:status==="partial"?.5:0,confidence:.55,observations:(criterion.observations||[]).map(observation=>({...observation,status,confidence:.55,studentEvidence:[]}))};
    }
    return null;
  };

  const criteria=(item.rubric?.criteria||[]).map(criterion=>{
    const structural=structuralAssessment(criterion);
    if(structural)return {...criterion,...structural,observable:true,autoAssessed:true};
    const sourceObservations=(criterion.observations||[]).length
      ?criterion.observations
      :[{id:criterion.id+"-auto",label:criterion.label}];
    const observations=sourceObservations.map(observation=>{
      const guidance=portugueseObservationGuidance(item,criterion,observation);
      // Score each atomic observation against its own semantic contract. The full model answer is intentionally
      // excluded here so a correct paraphrase is not penalized for using different wording from the reference.
      const assessed=assessEvidence(responseText,observation.label,criterion.label,guidance.counts);
      return {...observation,status:assessed.status,confidence:assessed.confidence,scoreRatio:assessed.scoreRatio,semanticScore:assessed.semanticScore,contradictionDetected:!!assessed.contradictionDetected,ambiguityDetected:!!assessed.ambiguityDetected,studentEvidence:assessed.evidence?[assessed.evidence]:[],autoAssessed:true};
    });
    let aggregate=aggregateCriterionAssessment(observations);
    if(criterion.id==="conteudo"&&Number.isFinite(min)&&min>0&&words<min){
      const ratio=words/min;
      const cap=ratio<.45?.45:ratio<.7?.62:.78;
      aggregate={...aggregate,scoreRatio:Math.min(aggregate.scoreRatio,cap),status:aggregate.status==="observed"?"partial":aggregate.status};
    }
    return {...criterion,...aggregate,observations,observable:true,autoAssessed:true};
  });
  const summary=automaticRubricSummary(criteria,item.maxPoints||item.rubric?.maxPoints||0);
  const feedbackSummary=automaticFeedbackForCriteria(criteria,responseText);
  return {
    status:"auto-assessed-provisional",
    final:false,
    responseText,
    correct:null,
    points:null,
    provisionalPoints:summary.provisionalPoints,
    maxPoints:item.maxPoints,
    gradingMode:"automatic-rubric-provisional",
    rubricId:rubricIdFor(item),
    rubricCompleted:true,
    criteria,
    feedbackSummary,
    requiresReview:summary.requiresReview,
    contradictionDetected:summary.contradictionDetected,
    ambiguityDetected:summary.ambiguityDetected,
    confidence:summary.confidence,
    note:"Classificação automática provisória baseada em evidência observável. Não constitui classificação oficial."
  };
}

export function portugueseItem(id){return portugueseFoundationItemById(id)||portugueseItemById(id)}
