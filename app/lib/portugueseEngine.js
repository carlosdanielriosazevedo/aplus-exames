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

function rubricIdFor(item){
  const signature=(item.rubric?.criteria||[]).map(criterion=>`${criterion.id}:${criterion.points}:${criterion.label}`).join("|");
  let fingerprint=2166136261;
  for(let index=0;index<signature.length;index++)fingerprint=Math.imul(fingerprint^signature.charCodeAt(index),16777619);
  return `${item.id}:rubric-v1:${(fingerprint>>>0).toString(36)}`;
}

export function assessPortugueseRubricCriterion(result,criterionId,evidence){
  if(!result||result.final||result.status==="unanswered")return result;
  if(!RUBRIC_EVIDENCE_IDS.has(evidence))throw new Error(`Unsupported rubric evidence: ${evidence}`);
  if(!result.criteria?.some(criterion=>criterion.id===criterionId))throw new Error(`Unknown rubric criterion: ${criterionId}`);
  const criteria=result.criteria.map(criterion=>criterion.id===criterionId?{...criterion,status:evidence}:criterion);
  const rubricCompleted=criteria.every(criterion=>RUBRIC_EVIDENCE_IDS.has(criterion.status));
  return {...result,criteria,rubricCompleted,status:rubricCompleted?"self-assessed-awaiting-review":"awaiting-rubric"};
}

export function rubricEvidenceSnapshot(result){
  if(!result||result.final)return [];
  return (result.criteria||[]).map(criterion=>({criterionId:criterion.id,evidence:RUBRIC_EVIDENCE_IDS.has(criterion.status)?criterion.status:"pending"}));
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
      correct:null,
      points:null,
      maxPoints:item.maxPoints,
      gradingMode:"rubric-assisted-provisional",
      rubricId:rubricIdFor(item),
      rubricCompleted:false,
      wordCount:words,
      wordLimit:{min,max,within:answered&&words>=min&&words<=max},
      criteria:(item.rubric?.criteria||[]).map(criterion=>({...criterion,status:"pending",observable:true}))
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
    const need=accuracy===null ? .7 : ((1-accuracy)*.8+evidenceGap*.2);
    return {competencyId:id,attempts,correct,accuracy,need,pendingRubrics:evidence.pendingRubrics||0};
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
    challengeSource:selected.every(item=>item.difficulty?.status==="editorial-provisional")?"editorial-provisional":"structural-proxy",
    recentItemsAvoided:selected.filter(item=>!recentIds.has(item.id)).length
  };
}
