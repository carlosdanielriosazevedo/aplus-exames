export const PORTUGUESE_WRITING_MEMORY_KEY="approva.portuguese-writing-memory.v1";
export const PORTUGUESE_WRITING_MEMORY_LIMIT=40;

const STATUS_RANK={"not-yet":0,partial:1,met:2};

function cleanText(value){return String(value||"").trim();}
function cleanAssessment(assessment={}){
  return Object.fromEntries(Object.entries(assessment).map(([id,entry])=>[id,{status:entry?.status||null,evidence:cleanText(entry?.evidence)}]));
}

export function normalizePortugueseWritingMemory(memory){
  const rows=Array.isArray(memory)?memory:[];
  return rows.filter(row=>row&&row.attemptId&&row.itemId&&row.domain&&row.assessment).map(row=>({
    attemptId:String(row.attemptId),itemId:String(row.itemId),domain:String(row.domain),competencyId:row.competencyId?String(row.competencyId):null,
    at:Number(row.at)||0,assessment:cleanAssessment(row.assessment)
  })).sort((a,b)=>a.at-b.at).slice(-PORTUGUESE_WRITING_MEMORY_LIMIT);
}

export function recordPortugueseWritingMemory(memory,{attemptId,item,assessment,at=Date.now()}={}){
  if(!attemptId||!item?.id||!item?.domain)return normalizePortugueseWritingMemory(memory);
  const row={attemptId:String(attemptId),itemId:String(item.id),domain:String(item.domain),competencyId:item.competencyId?String(item.competencyId):null,at,assessment:cleanAssessment(assessment)};
  const current=normalizePortugueseWritingMemory(memory).filter(existing=>!(existing.attemptId===row.attemptId&&existing.itemId===row.itemId));
  return [...current,row].sort((a,b)=>a.at-b.at).slice(-PORTUGUESE_WRITING_MEMORY_LIMIT);
}

export function writingMemoryInsight(memory,item,{excludeAttemptId=null,minObservations=2}={}){
  const criteria=item?.rubric?.criteria||[];
  const rows=normalizePortugueseWritingMemory(memory).filter(row=>row.domain===item?.domain&&row.attemptId!==excludeAttemptId);
  const insights=[];
  for(const criterion of criteria){
    const observations=rows.map(row=>row.assessment?.[criterion.id]).filter(entry=>entry?.status);
    if(observations.length<minObservations)continue;
    const counts={met:0,partial:0,"not-yet":0,withEvidence:0};
    for(const entry of observations){
      if(Object.prototype.hasOwnProperty.call(counts,entry.status))counts[entry.status]+=1;
      if(cleanText(entry.evidence))counts.withEvidence+=1;
    }
    const needsWork=counts.partial+counts["not-yet"];
    let tone="neutral";
    let message=`Nas tuas ${observations.length} autoavaliações anteriores deste tipo de critério, marcaste “Cumpri” ${counts.met} vez(es), “Parcial” ${counts.partial} e “Ainda não” ${counts["not-yet"]}.`;
    if(needsWork>=2&&needsWork>counts.met){
      tone="attention";
      message=`Nas autoavaliações anteriores, este critério ficou em “Parcial” ou “Ainda não” ${needsWork} de ${observations.length} vezes. Nesta resposta, confirma cedo se o demonstraste de forma explícita.`;
    }else if(counts.met>=2&&counts.met>needsWork){
      tone="positive";
      message=`Nas autoavaliações anteriores, marcaste este critério como “Cumpri” ${counts.met} de ${observations.length} vezes. Mantém a atenção à evidência concreta em vez de assumires que está demonstrado.`;
    }
    insights.push({criterionId:criterion.id,label:criterion.label,observations:observations.length,counts,tone,message});
  }
  return {available:insights.length>0,rows:insights,observationCount:rows.length};
}

export function assessmentMovement(previous={},current={}){
  const ids=[...new Set([...Object.keys(previous||{}),...Object.keys(current||{})])];
  return ids.map(id=>{
    const before=previous?.[id]?.status||null;
    const after=current?.[id]?.status||null;
    const beforeRank=Object.prototype.hasOwnProperty.call(STATUS_RANK,before)?STATUS_RANK[before]:null;
    const afterRank=Object.prototype.hasOwnProperty.call(STATUS_RANK,after)?STATUS_RANK[after]:null;
    return {criterionId:id,before,after,direction:beforeRank===null||afterRank===null?"unknown":afterRank>beforeRank?"up":afterRank<beforeRank?"down":"same"};
  });
}

export function loadPortugueseWritingMemory(storage=typeof window!=="undefined"?window.localStorage:null){
  if(!storage)return [];
  try{return normalizePortugueseWritingMemory(JSON.parse(storage.getItem(PORTUGUESE_WRITING_MEMORY_KEY)||"[]"));}catch{return []}
}

export function savePortugueseWritingMemory(memory,storage=typeof window!=="undefined"?window.localStorage:null){
  if(!storage)return false;
  try{storage.setItem(PORTUGUESE_WRITING_MEMORY_KEY,JSON.stringify(normalizePortugueseWritingMemory(memory)));return true}catch{return false}
}
