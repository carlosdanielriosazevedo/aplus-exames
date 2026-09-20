import {PORTUGUESE_DOMAINS,PORTUGUESE_RELEASE_POLICY} from "../data/portugueseFoundation.js";

const WRITTEN_DOMAIN_IDS=PORTUGUESE_DOMAINS.filter(domain=>domain.writtenExam).map(domain=>domain.id);
const RESPONSE_PRIORITY={"multiple-choice":0,"short-answer":1,"restricted-response":2,"extended-writing":3};
const STRUCTURAL_CHALLENGE={reconhecer:1,interpretar:2,raciocinar:3,criar:4};

export const PORTUGUESE_RUBRIC_EVIDENCE=[
  {id:"observed",label:"Encontro claramente",description:"Consigo localizar este elemento na minha resposta."},
  {id:"partial",label:"Encontro em parte",description:"O elemento aparece, mas está incompleto ou pouco claro."},
  {id:"not-observed",label:"Não encontro",description:"Este elemento não aparece na minha resposta."},
  {id:"unsure",label:"Não tenho a certeza",description:"Preciso de revisão para decidir com segurança."}
];
const RUBRIC_EVIDENCE_IDS=new Set(PORTUGUESE_RUBRIC_EVIDENCE.map(option=>option.id));

function criterionStatus(observations=[]){
  const statuses=observations.map(observation=>observation.status);
  if(!statuses.length||statuses.some(status=>!RUBRIC_EVIDENCE_IDS.has(status)))return "pending";
  if(statuses.every(status=>status==="observed"))return "observed";
  if(statuses.every(status=>status==="not-observed"))return "not-observed";
  if(statuses.some(status=>status==="unsure"))return "unsure";
  return "partial";
}

function withRubricCompletion(result,criteria){
  const rubricCompleted=criteria.length>0&&criteria.every(criterion=>criterion.observations?.length>0&&criterion.observations.every(observation=>RUBRIC_EVIDENCE_IDS.has(observation.status)));
  return {...result,criteria,rubricCompleted,status:rubricCompleted?"self-assessed-awaiting-review":"awaiting-rubric",finalScore:null};
}

function rubricIdFor(item){
  const signature=(item.rubric?.criteria||[]).map(criterion=>`${criterion.id}:${criterion.points}:${criterion.label}:${(criterion.observations||[]).map(observation=>`${observation.id}=${observation.label}`).join(";")}`).join("|");
  let fingerprint=2166136261;
  for(let index=0;index<signature.length;index++)fingerprint=Math.imul(fingerprint^signature.charCodeAt(index),16777619);
  return `${item.id}:rubric-v1:${(fingerprint>>>0).toString(36)}`;
}

export function assessPortugueseRubricCriterion(result,criterionId,evidence){
  if(!result||result.final||result.status==="unanswered")return result;
  if(!RUBRIC_EVIDENCE_IDS.has(evidence))throw new Error(`Unsupported rubric evidence: ${evidence}`);
  if(!result.criteria?.some(criterion=>criterion.id===criterionId))throw new Error(`Unknown rubric criterion: ${criterionId}`);
  const criteria=result.criteria.map(criterion=>criterion.id===criterionId?{...criterion,status:evidence,observations:(criterion.observations||[]).map(observation=>({...observation,status:evidence,studentEvidence:evidence==="observed"||evidence==="partial"?[String(result.responseText||"")].filter(Boolean):[]}))}:criterion);
  return withRubricCompletion(result,criteria);
}

export function assessPortugueseRubricObservation(result,criterionId,observationId,evidence){
  if(!result||result.final||result.status==="unanswered")return result;
  if(!RUBRIC_EVIDENCE_IDS.has(evidence))throw new Error(`Unsupported rubric evidence: ${evidence}`);
  const criterion=result.criteria?.find(row=>row.id===criterionId);
  if(!criterion)throw new Error(`Unknown rubric criterion: ${criterionId}`);
  if(!criterion.observations?.some(observation=>observation.id===observationId))throw new Error(`Unknown rubric observation: ${criterionId}/${observationId}`);
  const criteria=result.criteria.map(row=>{
    if(row.id!==criterionId)return row;
    const observations=row.observations.map(observation=>observation.id===observationId?{...observation,status:evidence,studentEvidence:evidence==="observed"||evidence==="partial"?[String(result.responseText||"")].filter(Boolean):[]}:observation);
    return {...row,observations,status:criterionStatus(observations)};
  });
  return withRubricCompletion(result,criteria);
}

export function rubricEvidenceSnapshot(result){
  if(!result||result.final)return [];
  return (result.criteria||[]).map(criterion=>({criterionId:criterion.id,evidence:RUBRIC_EVIDENCE_IDS.has(criterion.status)?criterion.status:"pending"}));
}

export function rubricObservationEvidenceSnapshot(result){
  if(!result||result.final)return [];
  return (result.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,evidence:RUBRIC_EVIDENCE_IDS.has(observation.status)?observation.status:"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})));
}

export function restorePortugueseRubricEvidence(item,snapshot){
  if(!snapshot||snapshot.rubricId!==rubricIdFor(item))return null;
  const responseText=snapshot.responseText||"resposta submetida";
  let result=gradePortugueseResponse(item,responseText);
  if(!result.final){
    result={...result,
      revisionCount:Number.isFinite(snapshot.revisionCount)?snapshot.revisionCount:0,
      previousResponseText:String(snapshot.previousResponseText||""),
      revisionHistory:Array.isArray(snapshot.revisionHistory)?snapshot.revisionHistory.map(row=>({revision:Number.isFinite(row?.revision)?row.revision:0,responseText:String(row?.responseText||""),rubricCompleted:!!row?.rubricCompleted,rubricObservationEvidence:Array.isArray(row?.rubricObservationEvidence)?row.rubricObservationEvidence.map(observation=>({criterionId:observation.criterionId,observationId:observation.observationId,evidence:observation.evidence||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):[]})):[]})):[]
    };
  }
  if(Array.isArray(snapshot.rubricObservationEvidence)){
    for(const row of snapshot.rubricObservationEvidence){
      const criterion=result.criteria.find(candidate=>candidate.id===row.criterionId);
      if(RUBRIC_EVIDENCE_IDS.has(row.evidence)&&criterion?.observations.some(observation=>observation.id===row.observationId)){
        result=assessPortugueseRubricObservation(result,row.criterionId,row.observationId,row.evidence);
        if(Array.isArray(row.studentEvidence)) result={...result,criteria:result.criteria.map(candidate=>candidate.id===row.criterionId?{...candidate,observations:candidate.observations.map(observation=>observation.id===row.observationId?{...observation,studentEvidence:row.studentEvidence.slice(0,3)}:observation)}:candidate)};
      }
    }
  }else{
    for(const row of snapshot.rubricEvidence||[]){
      if(RUBRIC_EVIDENCE_IDS.has(row.evidence)&&result.criteria.some(criterion=>criterion.id===row.criterionId)){
        result=assessPortugueseRubricCriterion(result,row.criterionId,row.evidence);
      }
    }
  }
  return result;
}

export function portugueseRevisionCompare(previous,current){
  const before=String(previous||"").trim();
  const after=String(current||"").trim();
  const beforeWords=before?before.split(/\s+/u).filter(Boolean):[];
  const afterWords=after?after.split(/\s+/u).filter(Boolean):[];
  const beforeSet=new Set(beforeWords.map(word=>word.toLocaleLowerCase("pt-PT")));
  const afterSet=new Set(afterWords.map(word=>word.toLocaleLowerCase("pt-PT")));
  const added=afterWords.filter(word=>!beforeSet.has(word.toLocaleLowerCase("pt-PT"))).length;
  const removed=beforeWords.filter(word=>!afterSet.has(word.toLocaleLowerCase("pt-PT"))).length;
  return {beforeWords:beforeWords.length,afterWords:afterWords.length,addedWords:added,removedWords:removed,changed:before!==after};
}

export function portugueseRevisionEvidenceCompare(previousSnapshot=[],currentResult){
  const previous=new Map((Array.isArray(previousSnapshot)?previousSnapshot:[]).map(row=>[
    `${row?.criterionId}::${row?.observationId}`,
    RUBRIC_EVIDENCE_IDS.has(row?.evidence)?row.evidence:"pending"
  ]));
  const current=new Map(rubricObservationEvidenceSnapshot(currentResult).map(row=>[
    `${row.criterionId}::${row.observationId}`,
    RUBRIC_EVIDENCE_IDS.has(row.evidence)?row.evidence:"pending"
  ]));
  const rank={pending:0,"not-observed":1,unsure:2,partial:3,observed:4};
  const labels=Object.fromEntries(PORTUGUESE_RUBRIC_EVIDENCE.map(option=>[option.id,option.label]));
  return [...new Set([...previous.keys(),...current.keys()])].map(key=>{
    const [criterionId,observationId]=key.split("::");
    const before=previous.get(key)||"pending";
    const after=current.get(key)||"pending";
    const direction=before===after?"same":rank[after]>rank[before]?"improved":"changed";
    return {criterionId,observationId,before,after,beforeLabel:labels[before]||"Ainda não assinalado",afterLabel:labels[after]||"Ainda não assinalado",direction};
  });
}
export function portugueseObservationAction(observation){
  const status=observation?.status;
  if(status==="not-observed")return {
    title:"Falta tornar este elemento visível",
    action:"Volta à tua resposta e acrescenta uma formulação que responda diretamente a este ponto.",
    hint:"Não precisas de copiar a resposta de referência: mostra, com as tuas palavras, onde este elemento fica demonstrado."
  };
  if(status==="partial")return {
    title:"Este elemento está incompleto",
    action:"Reescreve ou desenvolve a parte da resposta que corresponde a este ponto, tornando a ideia mais explícita.",
    hint:"Procura uma afirmação concreta e verifica se explicas o suficiente para o leitor perceber a relação."
  };
  if(status==="unsure")return {
    title:"Vale a pena confirmar",
    action:"Relê o enunciado e a tua resposta e procura uma frase que demonstre claramente este ponto.",
    hint:"Se continuares com dúvidas, compara depois com a resposta de referência e identifica a diferença."
  };
  return {
    title:"Elemento identificado",
    action:"Mantém esta parte da resposta e confirma que a formulação está suficientemente clara.",
    hint:"A evidência deve estar na tua própria resposta."
  };
}

export function revisePortugueseResponse(item,previousResult,response){
  if(!previousResult||previousResult.final)throw new Error("Only rubric-assisted responses can be revised.");
  const revised=gradePortugueseResponse(item,response);
  if(revised.final)return revised;
  const previousText=String(previousResult.responseText||"");
  const revisionCount=(previousResult.revisionCount||0)+1;
  const revisionHistory=[...(previousResult.revisionHistory||[])];
  if(previousText) revisionHistory.push({
    revision:revisionCount-1,
    responseText:previousText,
    rubricCompleted:!!previousResult.rubricCompleted,
    rubricObservationEvidence:rubricObservationEvidenceSnapshot(previousResult)
  });
  return {...revised,revisionCount,previousResponseText:previousText,revisionHistory};
}

export function portugueseRubricGuidance(result){
  const criteria=result?.criteria||[];
  const byStatus=status=>criteria.filter(criterion=>criterion.status===status).map(criterion=>({id:criterion.id,label:criterion.label}));
  const observed=byStatus("observed");
  const partial=byStatus("partial");
  const missing=byStatus("not-observed");
  const uncertain=byStatus("unsure");
  const needsReview=[...missing,...partial];
  const reviewObservations=criteria.flatMap(criterion=>(criterion.observations||[])
    .filter(observation=>observation.status!=="observed")
    .map(observation=>({criterionId:criterion.id,criterionLabel:criterion.label,id:observation.id,label:observation.label,status:observation.status,action:portugueseObservationAction(observation)})));
  const nextAction=missing.length
    ?"Acrescenta à resposta os elementos que não conseguiste localizar."
    :partial.length
      ?"Completa ou torna mais explícitos os elementos que encontraste apenas em parte."
      :uncertain.length
        ?"Compara as tuas dúvidas com a resposta de referência antes de rever o texto."
        :"Os critérios estão identificáveis. Confirma apenas se cada ideia está apoiada no texto ou no enunciado.";
  return {observed,partial,missing,uncertain,needsReview,reviewObservations,nextAction,complete:criteria.length>0&&criteria.every(criterion=>RUBRIC_EVIDENCE_IDS.has(criterion.status)),finalScore:null};
}

export function normalizePortugueseAnswer(value){
  return String(value??"")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLocaleLowerCase("pt-PT")
    .replace(/[«»“”„\"'’.,;:!?()[\]{}]/g," ")
    .replace(/\s+/g," ")
    .trim();
}

export function portugueseWordCount(value){
  const normalized=String(value??"").trim();
  return normalized?normalized.split(/\s+/u).filter(Boolean).length:0;
}

export function gradePortugueseResponse(item,response){
  if(!item)throw new Error("Portuguese item is required.");
  if(item.responseType==="multiple-choice"){
    const selected=Number.isInteger(response)?response:Number.parseInt(response,10);
    const answered=Number.isInteger(selected)&&selected>=0;
    const correct=answered&&selected===item.answerIndex;
    return {status:answered?"final":"unanswered",final:true,correct:answered?correct:null,points:answered?(correct?item.maxPoints:0):null,maxPoints:item.maxPoints,gradingMode:item.gradingMode};
  }
  if(item.responseType==="short-answer"){
    const answer=normalizePortugueseAnswer(response);
    const accepted=(item.acceptedAnswers||[]).map(normalizePortugueseAnswer);
    const answered=answer.length>0;
    const correct=answered&&accepted.includes(answer);
    return {status:answered?"final":"unanswered",final:true,correct:answered?correct:null,points:answered?(correct?item.maxPoints:0):null,maxPoints:item.maxPoints,gradingMode:item.gradingMode};
  }
  if(["restricted-response","extended-writing"].includes(item.responseType)){
    const words=portugueseWordCount(response);
    const answered=words>0;
    const min=item.wordLimit?.min??0;
    const max=item.wordLimit?.max??Number.POSITIVE_INFINITY;
    return {
      status:answered?"awaiting-rubric":"unanswered",
      final:false,
      responseText:String(response??""),
      correct:null,
      points:null,
      maxPoints:item.maxPoints,
      gradingMode:"rubric-assisted-provisional",
      rubricId:rubricIdFor(item),
      rubricCompleted:false,
      wordCount:words,
      wordLimit:{min,max,within:answered&&words>=min&&words<=max},
      criteria:(item.rubric?.criteria||[]).map(criterion=>({...criterion,status:"pending",observable:true,observations:(criterion.observations||[]).map(observation=>({...observation,status:"pending"}))}))
    };
  }
  throw new Error(`Unsupported Portuguese response type: ${item.responseType}`);
}

export function portugueseCoverage(items){
  const byDomain=Object.fromEntries(WRITTEN_DOMAIN_IDS.map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
  const missionEligibleByDomain=Object.fromEntries(WRITTEN_DOMAIN_IDS.map(domain=>[domain,items.filter(item=>item.domain===domain&&item.responseType!=="extended-writing").length]));
  return {
    total:items.length,
    byDomain,
    missionEligibleByDomain,
    diagnosticReady:WRITTEN_DOMAIN_IDS.every(domain=>byDomain[domain]>=PORTUGUESE_RELEASE_POLICY.minimumDiagnosticItemsPerDomain),
    missionReady:WRITTEN_DOMAIN_IDS.every(domain=>missionEligibleByDomain[domain]>=PORTUGUESE_RELEASE_POLICY.minimumMissionItemsPerDomain),
    pilotReady:items.length>=PORTUGUESE_RELEASE_POLICY.minimumPilotItems,
    productionEligible:false
  };
}

export function buildPortugueseDiagnostic(items,{years=["10.º","11.º","12.º"]}={}){
  const allowed=new Set(years);
  const eligible=items.filter(item=>allowed.has(item.year)&&WRITTEN_DOMAIN_IDS.includes(item.domain));
  const selected=[];
  for(const domain of WRITTEN_DOMAIN_IDS){
    const candidates=eligible
      .filter(item=>item.domain===domain&&item.responseType!=="extended-writing")
      .sort((a,b)=>(RESPONSE_PRIORITY[a.responseType]??9)-(RESPONSE_PRIORITY[b.responseType]??9)||a.id.localeCompare(b.id));
    const domainSelection=[];
    for(const item of candidates){
      if(domainSelection.length>=PORTUGUESE_RELEASE_POLICY.minimumDiagnosticItemsPerDomain)break;
      if(!domainSelection.some(selectedItem=>selectedItem.year===item.year))domainSelection.push(item);
    }
    for(const item of candidates){
      if(domainSelection.length>=PORTUGUESE_RELEASE_POLICY.minimumDiagnosticItemsPerDomain)break;
      if(!domainSelection.includes(item))domainSelection.push(item);
    }
    if(domainSelection.length<PORTUGUESE_RELEASE_POLICY.minimumDiagnosticItemsPerDomain)throw new Error(`Insufficient diagnostic coverage for ${domain}.`);
    selected.push(...domainSelection);
  }
  return selected;
}

export function portugueseMissionPool(items,{domain,years=["10.º","11.º","12.º"]}={}){
  if(!WRITTEN_DOMAIN_IDS.includes(domain))throw new Error(`Invalid written Portuguese domain: ${domain}`);
  const allowed=new Set(years);
  const pool=items.filter(item=>item.domain===domain&&allowed.has(item.year)&&item.responseType!=="extended-writing");
  return {domain,items:pool,ready:pool.length>=PORTUGUESE_RELEASE_POLICY.minimumMissionItemsPerDomain,required:PORTUGUESE_RELEASE_POLICY.minimumMissionItemsPerDomain};
}

export function portugueseCompetencePriorities(items,progress,{domain=null}={}){
  const competenceIds=[...new Set(items.filter(item=>!domain||item.domain===domain).map(item=>item.competencyId))];
  return competenceIds.map(id=>{
    const evidence=progress?.competence?.[id]||{};
    const attempts=evidence.deterministicAttempts||0;
    const correct=evidence.correct||0;
    const accuracy=attempts?correct/attempts:null;
    const evidenceGap=1-Math.min(attempts/3,1);
    const pendingRubrics=evidence.pendingRubrics||0;
    const rubricReviews=evidence.rubricReviews||0;
    const rubricNeedsReview=evidence.rubricNeedsReview||0;
    const reviewRate=rubricReviews?Math.min(rubricNeedsReview/(rubricReviews*4),1):0;
    const rubricNeed=Math.min(1,reviewRate*.75+(pendingRubrics>0?.25:0));
    const baseNeed=accuracy===null ? .7 : ((1-accuracy)*.8+evidenceGap*.2);
    const need=Math.min(1,baseNeed*.72+rubricNeed*.28);
    return {competencyId:id,attempts,correct,accuracy,need,pendingRubrics,rubricReviews,rubricNeedsReview,rubricNeed};
  }).sort((a,b)=>b.need-a.need||a.attempts-b.attempts||a.competencyId.localeCompare(b.competencyId));
}

export function portugueseStructuralChallenge(item){
  return item?.difficulty?.level||STRUCTURAL_CHALLENGE[item?.cognitive]||2;
}

export function buildAdaptivePortugueseMission(items,{progress,domain=null,years=["10.º","11.º","12.º"],size=7}={}){
  const allowedYears=new Set(years);
  const eligible=items.filter(item=>(!domain||item.domain===domain)&&allowedYears.has(item.year)&&item.responseType!=="extended-writing");
  if(eligible.length<size)throw new Error(`Insufficient adaptive Portuguese mission coverage${domain?` for ${domain}`:""}.`);
  const priorities=portugueseCompetencePriorities(eligible,progress,{domain});
  const needById=new Map(priorities.map(row=>[row.competencyId,row.need]));
  const recentIds=new Set((progress?.missionHistory||[]).slice(-3).flatMap(session=>session.itemIds||[]));
  const targetChallenges=[1,2,2,3,3,4,2];
  const selected=[];
  const domainCounts={};
  let openCount=0;

  for(let slot=0;slot<size;slot++){
    const target=targetChallenges[slot%targetChallenges.length];
    const candidates=eligible.filter(item=>!selected.includes(item)).filter(item=>{
      if(item.responseType==="restricted-response"&&openCount>=2)return false;
      if(!domain&&(domainCounts[item.domain]||0)>=3)return false;
      return true;
    });
    const pool=candidates.length?candidates:eligible.filter(item=>!selected.includes(item));
    pool.sort((a,b)=>{
      const score=item=>(needById.get(item.competencyId)||0)-Math.abs(portugueseStructuralChallenge(item)-target)*.12-(recentIds.has(item.id)?.65:0);
      return score(b)-score(a)||a.id.localeCompare(b.id);
    });
    const chosen=pool[0];
    if(!chosen)break;
    selected.push(chosen);
    domainCounts[chosen.domain]=(domainCounts[chosen.domain]||0)+1;
    if(chosen.responseType==="restricted-response")openCount++;
  }

  return {
    items:selected,
    priorities,
    targetCompetencyIds:priorities.slice(0,4).map(row=>row.competencyId),
    targetEvidenceCompetencyIds:priorities.filter(row=>row.rubricNeed>0).slice(0,3).map(row=>row.competencyId),
    challengeSource:selected.every(item=>item.difficulty?.status==="editorial-provisional")?"editorial-provisional":"structural-proxy",
    recentItemsAvoided:selected.filter(item=>!recentIds.has(item.id)).length
  };
}
