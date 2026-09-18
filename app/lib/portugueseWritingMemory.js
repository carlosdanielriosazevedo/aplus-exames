export const PORTUGUESE_WRITING_MEMORY_KEY="approva.portuguese-writing-memory.v1";
export const PORTUGUESE_WRITING_MEMORY_LIMIT=40;
export const PORTUGUESE_WRITING_PROFILE_MIN_ATTEMPTS=3;

const STATUS_RANK={"not-yet":0,partial:1,met:2};

function cleanText(value){return String(value||"").trim();}
function cleanAssessment(assessment={}){
  return Object.fromEntries(Object.entries(assessment).map(([id,entry])=>[id,{status:entry?.status||null,evidence:cleanText(entry?.evidence)}]));
}
function cleanCriterionLabels(labels={}){
  return Object.fromEntries(Object.entries(labels||{}).filter(([,label])=>cleanText(label)).map(([id,label])=>[String(id),cleanText(label)]));
}
function itemCriterionLabels(item){
  return Object.fromEntries((item?.rubric?.criteria||[]).map(criterion=>[criterion.id,criterion.label]));
}
function fallbackCriterionLabel(id){
  return ({conteudo:"Conteúdo e desenvolvimento",fundamentacao:"Fundamentação e evidência"})[id]||String(id||"").replaceAll("-"," ");
}

export function normalizePortugueseWritingMemory(memory){
  const rows=Array.isArray(memory)?memory:[];
  return rows.filter(row=>row&&row.attemptId&&row.itemId&&row.domain&&row.assessment).map(row=>({
    attemptId:String(row.attemptId),itemId:String(row.itemId),domain:String(row.domain),competencyId:row.competencyId?String(row.competencyId):null,
    at:Number(row.at)||0,assessment:cleanAssessment(row.assessment),criterionLabels:cleanCriterionLabels(row.criterionLabels)
  })).sort((a,b)=>a.at-b.at).slice(-PORTUGUESE_WRITING_MEMORY_LIMIT);
}

export function recordPortugueseWritingMemory(memory,{attemptId,item,assessment,at=Date.now()}={}){
  if(!attemptId||!item?.id||!item?.domain)return normalizePortugueseWritingMemory(memory);
  const row={attemptId:String(attemptId),itemId:String(item.id),domain:String(item.domain),competencyId:item.competencyId?String(item.competencyId):null,at,assessment:cleanAssessment(assessment),criterionLabels:cleanCriterionLabels(itemCriterionLabels(item))};
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

export function writingMemoryPreAnswerFocus(memory,item,{excludeAttemptId=null,minObservations=2,maxRows=2}={}){
  if(item?.responseType!=="restricted-response")return {available:false,rows:[],observationCount:0};
  const insight=writingMemoryInsight(memory,item,{excludeAttemptId,minObservations});
  const rows=insight.rows
    .filter(row=>row.tone==="attention")
    .map(row=>({
      ...row,
      needsWork:row.counts.partial+row.counts["not-yet"],
      prompt:`Antes de terminares, confirma este ponto: ${row.label}`
    }))
    .sort((a,b)=>b.needsWork-a.needsWork||b.observations-a.observations||a.label.localeCompare(b.label,"pt"))
    .slice(0,Math.max(1,maxRows));
  return {available:rows.length>0,rows,observationCount:insight.observationCount};
}

function profileObservationForAttempt(rows,criterionId){
  const entries=rows.map(row=>({entry:row.assessment?.[criterionId],row})).filter(x=>x.entry?.status);
  if(!entries.length)return null;
  const ranked=entries.filter(x=>Object.prototype.hasOwnProperty.call(STATUS_RANK,x.entry.status));
  if(!ranked.length)return null;
  ranked.sort((a,b)=>STATUS_RANK[a.entry.status]-STATUS_RANK[b.entry.status]||b.row.at-a.row.at);
  const representative=ranked[0];
  return {
    status:representative.entry.status,
    evidence:entries.some(x=>cleanText(x.entry.evidence)),
    domains:[...new Set(entries.map(x=>x.row.domain))],
    label:[...entries].sort((a,b)=>b.row.at-a.row.at).map(x=>x.row.criterionLabels?.[criterionId]).find(Boolean)||fallbackCriterionLabel(criterionId)
  };
}

export function writingMemoryProfile(memory,{excludeAttemptId=null,minAttempts=PORTUGUESE_WRITING_PROFILE_MIN_ATTEMPTS}={}){
  const rows=normalizePortugueseWritingMemory(memory).filter(row=>row.attemptId!==excludeAttemptId);
  const attemptIds=[...new Set(rows.map(row=>row.attemptId))];
  const criterionIds=[...new Set(rows.flatMap(row=>Object.keys(row.assessment||{})))];
  const patterns=[];

  for(const criterionId of criterionIds){
    const observations=attemptIds.map(attemptId=>profileObservationForAttempt(rows.filter(row=>row.attemptId===attemptId),criterionId)).filter(Boolean);
    if(observations.length<minAttempts)continue;
    const counts={met:0,partial:0,"not-yet":0,withEvidence:0,withoutEvidence:0};
    const domains=new Set();
    for(const observation of observations){
      counts[observation.status]=(counts[observation.status]||0)+1;
      counts[observation.evidence?"withEvidence":"withoutEvidence"]+=1;
      observation.domains.forEach(domain=>domains.add(domain));
    }
    const needsWork=counts.partial+counts["not-yet"];
    const attempts=observations.length;
    const transversal=domains.size>=2;
    let kind="mixed";
    let headline="Padrão ainda misto";
    let message=`Nas últimas ${attempts} tentativas em que autoavaliaste este critério, o padrão ainda não é suficientemente consistente para o tratar como ponto forte ou atenção recorrente.`;
    if(needsWork>=Math.ceil(attempts*0.6)&&needsWork>counts.met){
      kind="attention";
      headline="Atenção recorrente";
      message=`Em ${needsWork} de ${attempts} tentativas, marcaste este critério como “Parcial” ou “Ainda não”. Usa-o como ponto de verificação antes de terminares a próxima resposta.`;
    }else if(counts.met>=Math.ceil(attempts*0.6)&&counts.met>needsWork){
      kind="strength";
      headline="Padrão consistente";
      message=`Em ${counts.met} de ${attempts} tentativas, marcaste este critério como “Cumpri”. Mantém esse cuidado, confirmando sempre a evidência concreta na resposta.`;
    }
    const evidenceAttention=counts.withoutEvidence>=Math.ceil(attempts*0.6)&&counts.withoutEvidence>counts.withEvidence;
    patterns.push({
      criterionId,label:observations.at(-1)?.label||fallbackCriterionLabel(criterionId),kind,headline,message,attempts,
      counts,domains:[...domains],transversal,evidenceAttention,
      evidenceMessage:evidenceAttention?`Em ${counts.withoutEvidence} de ${attempts} tentativas não ficou registada evidência textual para este critério. Na próxima, identifica a frase ou passagem que sustenta a tua autoavaliação.`:null
    });
  }

  const priority={attention:0,mixed:1,strength:2};
  patterns.sort((a,b)=>priority[a.kind]-priority[b.kind]||Number(b.transversal)-Number(a.transversal)||b.attempts-a.attempts||a.label.localeCompare(b.label,"pt"));
  return {
    available:patterns.length>0,
    attempts:attemptIds.length,
    domains:[...new Set(rows.map(row=>row.domain))],
    patterns,
    attention:patterns.filter(pattern=>pattern.kind==="attention"),
    strengths:patterns.filter(pattern=>pattern.kind==="strength"),
    mixed:patterns.filter(pattern=>pattern.kind==="mixed")
  };
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
