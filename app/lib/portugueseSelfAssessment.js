export const PORTUGUESE_SELF_ASSESSMENT_LEVELS=[
  {id:"met",label:"Cumpri",tone:"positive"},
  {id:"partial",label:"Parcial",tone:"warning"},
  {id:"not-yet",label:"Ainda não",tone:"attention"}
];

const STATUS_RANK={"not-yet":0,partial:1,met:2};
const STATUS_LABEL={"not-yet":"Ainda não",partial:"Parcial",met:"Cumpri"};

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

export function snapshotSelfAssessment(criteria=[],assessment={}){
  return Object.fromEntries(criteria.map(criterion=>{
    const entry=assessment?.[criterion.id]||{};
    return [criterion.id,{status:entry.status||null,evidence:String(entry.evidence||"").trim()}];
  }));
}

export function selfAssessmentProgress(criteria=[],before={},after={}){
  const upgraded=[];
  const reconsidered=[];
  const newlyAssessed=[];
  const evidenceAdded=[];
  const evidenceChanged=[];
  const stillNeedsWork=[];

  for(const criterion of criteria){
    const previous=before?.[criterion.id]||{};
    const current=after?.[criterion.id]||{};
    const previousStatus=previous.status||null;
    const currentStatus=current.status||null;
    const previousEvidence=String(previous.evidence||"").trim();
    const currentEvidence=String(current.evidence||"").trim();
    const base={id:criterion.id,label:criterion.label};

    if(!previousStatus&&currentStatus)newlyAssessed.push({...base,to:STATUS_LABEL[currentStatus]||currentStatus});
    if(previousStatus&&currentStatus&&STATUS_RANK[currentStatus]>STATUS_RANK[previousStatus])upgraded.push({...base,from:STATUS_LABEL[previousStatus]||previousStatus,to:STATUS_LABEL[currentStatus]||currentStatus});
    if(previousStatus&&currentStatus&&STATUS_RANK[currentStatus]<STATUS_RANK[previousStatus])reconsidered.push({...base,from:STATUS_LABEL[previousStatus]||previousStatus,to:STATUS_LABEL[currentStatus]||currentStatus});
    if(!previousEvidence&&currentEvidence)evidenceAdded.push(base);
    else if(previousEvidence&&currentEvidence&&previousEvidence!==currentEvidence)evidenceChanged.push(base);
    if(["partial","not-yet"].includes(currentStatus))stillNeedsWork.push({...base,status:STATUS_LABEL[currentStatus]||currentStatus});
  }

  return {
    upgraded,reconsidered,newlyAssessed,evidenceAdded,evidenceChanged,stillNeedsWork,
    changed:upgraded.length+reconsidered.length+newlyAssessed.length+evidenceAdded.length+evidenceChanged.length>0
  };
}
