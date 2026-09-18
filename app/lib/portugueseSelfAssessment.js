export const PORTUGUESE_SELF_ASSESSMENT_LEVELS=[
  {id:"met",label:"Cumpri",tone:"positive"},
  {id:"partial",label:"Parcial",tone:"warning"},
  {id:"not-yet",label:"Ainda não",tone:"attention"}
];

export function criterionFeedback({criterion,status,evidence}){
  const label=String(criterion?.label||"").trim();
  const text=String(evidence||"").trim();
  if(!status)return {kind:"pending",title:"Ainda por rever",message:`Compara a tua resposta com este critério${label?`: ${label}`:""} e identifica uma passagem concreta que mostre o que fizeste.`};
  if(status==="met")return {kind:"positive",title:"Critério identificado como cumprido",message:text?"Mantém esta evidência: ela torna a tua autoavaliação verificável quando voltares à resposta.":"Assinalaste o critério como cumprido. Agora aponta a frase ou ideia da tua resposta que o demonstra."};
  if(status==="partial")return {kind:"warning",title:"Há base, mas falta completar",message:text?"Usa a evidência que assinalaste para decidir o que falta acrescentar, tornar mais explícito ou fundamentar melhor.":"Localiza primeiro o que já está certo na tua resposta e depois acrescenta o elemento que falta para cumprir integralmente o critério."};
  return {kind:"attention",title:"Critério ainda não demonstrado",message:"Volta ao enunciado e à resposta de referência e acrescenta conteúdo diretamente ligado a este critério. Evita reformular tudo: corrige apenas a lacuna identificada."};
}

export function selfAssessmentSummary(criteria=[],assessment={}){
  const rows=criteria.map(criterion=>({criterion,entry:assessment?.[criterion.id]||{}}));
  const counts={met:0,partial:0,"not-yet":0,pending:0,withEvidence:0};
  for(const {entry} of rows){
    if(entry.status&&Object.prototype.hasOwnProperty.call(counts,entry.status))counts[entry.status]+=1;
    else counts.pending+=1;
    if(String(entry.evidence||"").trim())counts.withEvidence+=1;
  }
  const next=rows.find(({entry})=>entry.status==="not-yet")||rows.find(({entry})=>entry.status==="partial")||rows.find(({entry})=>!entry.status)||null;
  return {counts,total:rows.length,nextCriterion:next?.criterion||null,complete:rows.length>0&&counts.pending===0};
}
