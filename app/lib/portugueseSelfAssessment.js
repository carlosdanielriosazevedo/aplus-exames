export const PORTUGUESE_CRITERION_LEVELS=[
  {id:"met",label:"Cumprido",tone:"positive"},
  {id:"partial",label:"Parcial",tone:"warning"},
  {id:"not-yet",label:"Não demonstrado",tone:"attention"}
];

// Compatibility alias while persisted v1/v2 Portuguese drafts still use the historic field names.
// Runtime authority is automatic: these levels describe the app's criterion assessment, not student self-scoring.
export const PORTUGUESE_SELF_ASSESSMENT_LEVELS=PORTUGUESE_CRITERION_LEVELS;

const STATUS_RANK={"not-yet":0,partial:1,met:2};
const STATUS_LABEL={"not-yet":"Não demonstrado",partial:"Parcial",met:"Cumprido"};

export function criterionFeedback({criterion,status,evidence}){
  const label=String(criterion?.label||"").trim();
  const text=String(evidence||"").trim();
  if(!status)return {kind:"pending",title:"Ainda por confirmar",message:`O Apronso ainda não conseguiu confirmar este critério${label?`: ${label}`:""}. Revê a resposta de referência e verifica que elemento precisa de ficar explícito.`};
  if(status==="met")return {kind:"positive",title:"Critério cumprido",message:text?"A tua resposta contém evidência clara para este critério.":"O corretor identificou este critério como cumprido na resposta submetida."};
  if(status==="partial")return {kind:"warning",title:"Critério parcialmente cumprido",message:text?"Há evidência relevante na tua resposta, mas falta completar, tornar mais explícito ou fundamentar melhor este ponto.":"A resposta contém parte do que o critério exige, mas ainda não o demonstra integralmente."};
  return {kind:"attention",title:"Critério não demonstrado",message:"A resposta submetida não contém evidência suficiente para este critério. Compara-a com a resposta de referência e identifica concretamente o elemento em falta."};
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
