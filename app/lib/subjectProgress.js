import {canonicalSubjectId} from "./subjectWorkspace.js";

const MODEL_VERSION=3;
const MAX_SESSIONS=100;

function normalizeCompetenceRow(row){
  const source=row&&typeof row==="object"?row:{};
  return {
    domainId:source.domainId||source.domain||null,
    label:source.label||null,
    attempts:Number.isFinite(source.attempts)?source.attempts:0,
    correct:Number.isFinite(source.correct)?source.correct:0,
    deterministicAttempts:Number.isFinite(source.deterministicAttempts)?source.deterministicAttempts:0,
    points:Number.isFinite(source.points)?source.points:0,
    maxPoints:Number.isFinite(source.maxPoints)?source.maxPoints:0,
    pendingRubrics:Number.isFinite(source.pendingRubrics)?source.pendingRubrics:0,
    rubricReviews:Number.isFinite(source.rubricReviews)?source.rubricReviews:0,
    rubricNeedsReview:Number.isFinite(source.rubricNeedsReview)?source.rubricNeedsReview:0,
    rubricObserved:Number.isFinite(source.rubricObserved)?source.rubricObserved:0,
    rubricEvidenceByObservation:source.rubricEvidenceByObservation&&typeof source.rubricEvidenceByObservation==="object"?source.rubricEvidenceByObservation:{},
    lastAnsweredAt:source.lastAnsweredAt||null
  };
}

export function emptySubjectProgress(subjectId){
  return {subjectId,version:MODEL_VERSION,diagnosticDone:false,diagnosticCompletedAt:null,sessions:[],missionHistory:[],competence:{},lastPosition:null,lastActivityAt:null};
}

function rowKey(row){
  return [row?.kind,row?.label,row?.completedAt,(row?.itemIds||[]).join(",")].join("|");
}

function mergeUniqueRows(left=[],right=[]){
  const rows=new Map();
  [...left,...right].forEach(row=>rows.set(rowKey(row),row));
  return [...rows.values()].sort((a,b)=>(a?.completedAt||0)-(b?.completedAt||0)).slice(-MAX_SESSIONS);
}

function mergeCompetenceRows(left={},right={}){
  const merged={...left};
  for(const [id,row] of Object.entries(right)){
    const a=normalizeCompetenceRow(merged[id]);
    const b=normalizeCompetenceRow(row);
    merged[id]={
      ...a,
      domainId:b.domainId||a.domainId,
      label:b.label||a.label,
      attempts:Math.max(a.attempts,b.attempts),
      correct:Math.max(a.correct,b.correct),
      deterministicAttempts:Math.max(a.deterministicAttempts,b.deterministicAttempts),
      points:Math.max(a.points,b.points),
      maxPoints:Math.max(a.maxPoints,b.maxPoints),
      pendingRubrics:Math.max(a.pendingRubrics,b.pendingRubrics),
      rubricReviews:Math.max(a.rubricReviews,b.rubricReviews),
      rubricNeedsReview:Math.max(a.rubricNeedsReview,b.rubricNeedsReview),
      rubricObserved:Math.max(a.rubricObserved,b.rubricObserved),
      rubricEvidenceByObservation:{...a.rubricEvidenceByObservation,...b.rubricEvidenceByObservation},
      lastAnsweredAt:Math.max(a.lastAnsweredAt||0,b.lastAnsweredAt||0)||null
    };
  }
  return merged;
}

function mergeProgress(left,right,subjectId){
  if(!left)return normalizeProgress(right,subjectId);
  const a=normalizeProgress(left,subjectId),b=normalizeProgress(right,subjectId);
  const newest=(a.lastActivityAt||0)>=(b.lastActivityAt||0)?a:b;
  return normalizeProgress({
    ...newest,
    diagnosticDone:a.diagnosticDone||b.diagnosticDone,
    diagnosticCompletedAt:Math.max(a.diagnosticCompletedAt||0,b.diagnosticCompletedAt||0)||null,
    sessions:mergeUniqueRows(a.sessions,b.sessions),
    missionHistory:mergeUniqueRows(a.missionHistory,b.missionHistory),
    competence:mergeCompetenceRows(a.competence,b.competence),
    lastPosition:newest.lastPosition||a.lastPosition||b.lastPosition||null,
    lastActivityAt:Math.max(a.lastActivityAt||0,b.lastActivityAt||0)||null
  },subjectId);
}

function normalizeProgress(progress,subjectId){
  const empty=emptySubjectProgress(subjectId);
  const competence=Object.fromEntries(Object.entries(progress?.competence&&typeof progress.competence==="object"?progress.competence:{}).map(([id,row])=>[id,normalizeCompetenceRow(row)]));
  return {...empty,...(progress||{}),subjectId,version:MODEL_VERSION,sessions:Array.isArray(progress?.sessions)?progress.sessions.slice(-MAX_SESSIONS):[],missionHistory:Array.isArray(progress?.missionHistory)?progress.missionHistory.slice(-MAX_SESSIONS):[],competence,lastPosition:progress?.lastPosition||null};
}

export function migrateSubjectProgress(state){
  const rows=state?.subjectProgress&&typeof state.subjectProgress==="object"?state.subjectProgress:{};
  const normalized={};
  for(const [storedId,progress] of Object.entries(rows)){
    const id=canonicalSubjectId(storedId);
    normalized[id]=mergeProgress(normalized[id],progress,id);
  }
  return {...state,subjectProgress:normalized,subjectProgressModelVersion:MODEL_VERSION};
}

export function subjectProgressFor(state,subjectId){return normalizeProgress(state?.subjectProgress?.[subjectId],subjectId)}

function putProgress(state,subjectId,progress){
  return {...state,subjectProgress:{...(state.subjectProgress||{}),[subjectId]:normalizeProgress(progress,subjectId)},subjectProgressModelVersion:MODEL_VERSION};
}

function compactResult(result){
  if(!result)return null;
  const compact={status:result.status,final:!!result.final,correct:result.correct??null,points:Number.isFinite(result.points)?result.points:null,maxPoints:Number.isFinite(result.maxPoints)?result.maxPoints:null,gradingMode:result.gradingMode||null,responseText:result.responseText||""};
  if(result.final)return compact;
  return {...compact,rubricId:result.rubricId||null,rubricCompleted:!!result.rubricCompleted,revisionCount:Number.isFinite(result.revisionCount)?result.revisionCount:0,previousResponseText:result.previousResponseText||"",revisionHistory:Array.isArray(result.revisionHistory)?result.revisionHistory.map(row=>({revision:Number.isFinite(row?.revision)?row.revision:0,responseText:String(row?.responseText||""),rubricCompleted:!!row?.rubricCompleted,rubricObservationEvidence:Array.isArray(row?.rubricObservationEvidence)?row.rubricObservationEvidence.map(observation=>({criterionId:observation.criterionId,observationId:observation.observationId,evidence:observation.evidence||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})):[]})):[],rubricEvidence:(result.criteria||[]).map(criterion=>({criterionId:criterion.id,evidence:criterion.status||"pending"})),rubricObservationEvidence:(result.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,evidence:observation.status||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})))};}

function recordRubricEvidence(previous,result,completedAt){
  const observations=(result.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,status:observation.status||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):[]})));
  const nextMap={...(previous.rubricEvidenceByObservation||{})};
  let observed=0;
  let needsReview=0;
  observations.forEach(observation=>{
    if(observation.status==="observed")observed+=1;
    if(["partial","not-observed","unsure"].includes(observation.status))needsReview+=1;
    nextMap[observation.observationId]={criterionId:observation.criterionId,status:observation.status,studentEvidence:observation.studentEvidence,lastSeenAt:completedAt};
  });
  return {observed,needsReview,rubricEvidenceByObservation:nextMap};
}

export function beginSubjectSession(state,{subjectId,kind,label,domain=null,items,startedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  return putProgress(state,subjectId,{...progress,lastPosition:{kind,label,domain,itemIds:items.map(item=>item.id),current:0,results:[],startedAt,updatedAt:startedAt},lastActivityAt:startedAt});
}

export function advanceSubjectSession(state,subjectId,{current,results,currentResult=null,currentAnswer=null,updatedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  if(!progress.lastPosition)return state;
  return putProgress(state,subjectId,{...progress,lastPosition:{...progress.lastPosition,current,results:results.map(compactResult),currentResult:compactResult(currentResult),currentAnswer,updatedAt},lastActivityAt:updatedAt});
}

export function recordSubjectSession(state,{subjectId,kind,label,domain=null,items,results,completedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  const competence={...progress.competence};
  const recordsAcademicEvidence=kind!=="training";
  items.forEach((item,index)=>{
    if(!recordsAcademicEvidence)return;
    const result=results[index];
    if(!result||result.status==="unanswered")return;
    const id=item.competencyId||`${item.domain}:general`;
    const previous=normalizeCompetenceRow(competence[id]);
    if(result.final){
      competence[id]={...previous,domainId:item.domain||previous.domainId,label:item.competencyLabel||previous.label,attempts:previous.attempts+1,correct:previous.correct+(result.correct?1:0),deterministicAttempts:previous.deterministicAttempts+1,points:previous.points+(Number.isFinite(result.points)?result.points:0),maxPoints:previous.maxPoints+(Number.isFinite(result.maxPoints)?result.maxPoints:0),lastAnsweredAt:completedAt};
      return;
    }
    const evidence=recordRubricEvidence(previous,result,completedAt);
    competence[id]={
      ...previous,
      domainId:item.domain||previous.domainId,
      label:item.competencyLabel||previous.label,
      attempts:previous.attempts+1,
      pendingRubrics:result.rubricCompleted?previous.pendingRubrics:previous.pendingRubrics+1,
      rubricReviews:previous.rubricReviews+(result.rubricCompleted?1:0),
      rubricNeedsReview:previous.rubricNeedsReview+evidence.needsReview,
      rubricObserved:previous.rubricObserved+evidence.observed,
      rubricEvidenceByObservation:evidence.rubricEvidenceByObservation,
      lastAnsweredAt:completedAt
    };
  });
  const session={kind,label,domain,itemIds:items.map(item=>item.id),results:results.map(compactResult),completedAt};
  return putProgress(state,subjectId,{...progress,diagnosticDone:progress.diagnosticDone||kind==="diagnostic",diagnosticCompletedAt:kind==="diagnostic"?completedAt:progress.diagnosticCompletedAt,sessions:[...progress.sessions,session].slice(-MAX_SESSIONS),missionHistory:kind==="mission"?[...progress.missionHistory,session].slice(-MAX_SESSIONS):progress.missionHistory,competence,lastPosition:null,lastActivityAt:completedAt});
}

export function resetSubjectProgress(state,subjectId){
  const subjectProgress={...(state.subjectProgress||{})};
  delete subjectProgress[subjectId];
  return {...state,subjectProgress,subjectProgressModelVersion:MODEL_VERSION};
}
