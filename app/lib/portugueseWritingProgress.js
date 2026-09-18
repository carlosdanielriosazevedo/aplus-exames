import {normalizePortugueseWritingMemory} from "./portugueseWritingMemory.js";

const STATUS_RANK={"not-yet":0,partial:1,met:2};

function cleanText(value){return String(value||"").trim();}

function representativeAttempt(rows,criterionId){
  const entries=rows
    .map(row=>({row,entry:row.assessment?.[criterionId]}))
    .filter(({entry})=>entry?.status&&Object.prototype.hasOwnProperty.call(STATUS_RANK,entry.status));
  if(!entries.length)return null;
  entries.sort((a,b)=>STATUS_RANK[a.entry.status]-STATUS_RANK[b.entry.status]||b.row.at-a.row.at);
  const representative=entries[0];
  return {
    attemptId:representative.row.attemptId,
    status:representative.entry.status,
    hasEvidence:entries.some(({entry})=>cleanText(entry.evidence)),
    domain:representative.row.domain,
    at:Math.max(...entries.map(({row})=>Number(row.at)||0)),
    label:entries.map(({row})=>row.criterionLabels?.[criterionId]).find(Boolean)||criterionId
  };
}

export function writingAttentionEvolution(memory,{criterionId,domain=null,excludeAttemptId=null,minAttentionAttempts=2,recentWindow=2}={}){
  if(!criterionId)return {available:false,resolved:false,criterionId:null,history:[],recent:[]};
  const rows=normalizePortugueseWritingMemory(memory)
    .filter(row=>row.attemptId!==excludeAttemptId&&(!domain||row.domain===domain));
  const attemptIds=[...new Set(rows.map(row=>row.attemptId))];
  const observations=attemptIds
    .map(attemptId=>representativeAttempt(rows.filter(row=>row.attemptId===attemptId),criterionId))
    .filter(Boolean)
    .sort((a,b)=>a.at-b.at);
  if(observations.length<minAttentionAttempts+recentWindow)return {available:false,resolved:false,criterionId,history:observations,recent:[]};

  const recent=observations.slice(-recentWindow);
  const history=observations.slice(0,-recentWindow);
  const priorNeedsWork=history.filter(row=>row.status==="partial"||row.status==="not-yet").length;
  const attentionWasRecurring=priorNeedsWork>=minAttentionAttempts&&priorNeedsWork>history.filter(row=>row.status==="met").length;
  const recentMet=recent.length===recentWindow&&recent.every(row=>row.status==="met");
  const recentEvidence=recent.length===recentWindow&&recent.every(row=>row.hasEvidence);
  const resolved=attentionWasRecurring&&recentMet&&recentEvidence;
  const label=observations.at(-1)?.label||criterionId;
  return {
    available:attentionWasRecurring,
    resolved,
    criterionId,
    label,
    history,
    recent,
    priorNeedsWork,
    recentWindow,
    message:resolved
      ?`Nas ${recentWindow} tentativas mais recentes em que autoavaliaste este critério, marcaste “Cumpri” e registaste evidência concreta. Este ponto deixou de aparecer como atenção recorrente por agora.`
      :attentionWasRecurring
        ?`Este critério teve atenção recorrente no histórico e ainda não reúne ${recentWindow} tentativas recentes consecutivas em “Cumpri” com evidência.`
        :null
  };
}

export function writingResolvedAttentions(memory,{domain=null,excludeAttemptId=null,minAttentionAttempts=2,recentWindow=2}={}){
  const rows=normalizePortugueseWritingMemory(memory)
    .filter(row=>row.attemptId!==excludeAttemptId&&(!domain||row.domain===domain));
  const criterionIds=[...new Set(rows.flatMap(row=>Object.keys(row.assessment||{})))];
  const rowsByCriterion=criterionIds
    .map(criterionId=>writingAttentionEvolution(rows,{criterionId,domain,excludeAttemptId,minAttentionAttempts,recentWindow}))
    .filter(result=>result.available);
  return {
    available:rowsByCriterion.length>0,
    rows:rowsByCriterion,
    resolved:rowsByCriterion.filter(result=>result.resolved),
    stillAttention:rowsByCriterion.filter(result=>!result.resolved)
  };
}
