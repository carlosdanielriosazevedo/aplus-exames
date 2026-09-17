import {PORTUGUESE_DOMAINS,PORTUGUESE_RELEASE_POLICY} from "../data/portugueseFoundation.js";

const WRITTEN_DOMAIN_IDS=PORTUGUESE_DOMAINS.filter(domain=>domain.writtenExam).map(domain=>domain.id);
const RESPONSE_PRIORITY={"multiple-choice":0,"short-answer":1,"restricted-response":2,"extended-writing":3};

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
      wordCount:words,
      wordLimit:{min,max,within:answered&&words>=min&&words<=max},
      criteria:(item.rubric?.criteria||[]).map(criterion=>({...criterion,status:"pending"}))
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
