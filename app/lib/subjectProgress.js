import {canonicalSubjectId} from "./subjectWorkspace.js";
import {missionCompletedToday,recordStudyActivity} from "./engagement.js";
import {recordCompetitiveActivity} from "./competition.js";

const MODEL_VERSION=4;
const MAX_SESSIONS=100;

function normalizeErrorPatterns(patterns={}){
  if(!patterns||typeof patterns!=="object"||Array.isArray(patterns))return {};
  return Object.fromEntries(Object.entries(patterns).map(([key,row])=>[key,{
    ...row,
    key,
    code:row?.code||key.split("|").at(-1),
    scope:row?.scope||key.split("|")[0]||"general",
    label:row?.label||"Aspeto a melhorar",
    message:row?.message||"Este aspeto tem aparecido mais do que uma vez.",
    count:Number(row?.count)||0,
    firstAt:row?.firstAt||null,
    lastAt:row?.lastAt||null,
    itemIds:[...new Set(Array.isArray(row?.itemIds)?row.itemIds.filter(Boolean):[])].slice(-12),
    recoveryEvidence:Number(row?.recoveryEvidence)||0,
    status:row?.status||"observed"
  }]));
}

function recordErrorPatternEvidence(patterns,item,result,at){
  const recorder=globalThis.__aplusRecordErrorPatternEvidence;
  return typeof recorder==="function"?recorder(patterns,item,result,at):normalizeErrorPatterns(patterns);
}

function normalizeCompetenceRow(row){
  const source=row&&typeof row==="object"?row:{};
  return {
    domainId:source.domainId||source.domain||null,
    label:source.label||null,
    attempts:Number.isFinite(source.attempts)?source.attempts:0,
    correct:Number.isFinite(source.correct)?source.correct:0,
    deterministicAttempts:Number.isFinite(source.deterministicAttempts)?source.deterministicAttempts:0,
    structuredAttempts:Number.isFinite(source.structuredAttempts)?source.structuredAttempts:0,
    structuredScoredAttempts:Number.isFinite(source.structuredScoredAttempts)?source.structuredScoredAttempts:0,
    structuredNormalizedEarned:Number.isFinite(source.structuredNormalizedEarned)?source.structuredNormalizedEarned:0,
    structuredNeedsReview:Number.isFinite(source.structuredNeedsReview)?source.structuredNeedsReview:0,
    structuredType1:Number.isFinite(source.structuredType1)?source.structuredType1:0,
    structuredType2:Number.isFinite(source.structuredType2)?source.structuredType2:0,
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
  return {subjectId,version:MODEL_VERSION,diagnosticDone:false,diagnosticCompletedAt:null,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:null};
}

function rowKey(row){
  return row?.sessionId||[row?.kind,row?.label,row?.completedAt,(row?.itemIds||[]).join(",")].join("|");
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
      structuredAttempts:Math.max(a.structuredAttempts,b.structuredAttempts),
      structuredScoredAttempts:Math.max(a.structuredScoredAttempts,b.structuredScoredAttempts),
      structuredNormalizedEarned:Math.max(a.structuredNormalizedEarned,b.structuredNormalizedEarned),
      structuredNeedsReview:Math.max(a.structuredNeedsReview,b.structuredNeedsReview),
      structuredType1:Math.max(a.structuredType1,b.structuredType1),
      structuredType2:Math.max(a.structuredType2,b.structuredType2),
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

function mergeErrorPatterns(left={},right={}){
  const a=normalizeErrorPatterns(left),b=normalizeErrorPatterns(right),merged={...a};
  for(const [key,row] of Object.entries(b)){
    const previous=merged[key];
    if(!previous){merged[key]=row;continue}
    const newest=(row.lastAt||0)>=(previous.lastAt||0)?row:previous;
    merged[key]={
      ...previous,...newest,
      count:Math.max(previous.count||0,row.count||0),
      firstAt:Math.min(previous.firstAt||Infinity,row.firstAt||Infinity)===Infinity?null:Math.min(previous.firstAt||Infinity,row.firstAt||Infinity),
      lastAt:Math.max(previous.lastAt||0,row.lastAt||0)||null,
      itemIds:[...new Set([...(previous.itemIds||[]),...(row.itemIds||[])])].slice(-12),
      recoveryEvidence:Math.max(previous.recoveryEvidence||0,row.recoveryEvidence||0)
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
    completedSessionIds:[...new Set([...(a.completedSessionIds||[]),...(b.completedSessionIds||[])])],
    missionHistory:mergeUniqueRows(a.missionHistory,b.missionHistory),
    interruptedTechnicalSessions:mergeUniqueRows(a.interruptedTechnicalSessions,b.interruptedTechnicalSessions),
    competence:mergeCompetenceRows(a.competence,b.competence),
    errorPatterns:mergeErrorPatterns(a.errorPatterns,b.errorPatterns),
    errorMemoryVersion:1,
    lastPosition:(()=>{const archivedIds=new Set([...a.interruptedTechnicalSessions||[],...b.interruptedTechnicalSessions||[]].map(row=>row.sessionId));return [newest.lastPosition,a.lastPosition,b.lastPosition].find(row=>row&&!archivedIds.has(row.sessionId))||null})(),
    lastActivityAt:Math.max(a.lastActivityAt||0,b.lastActivityAt||0)||null
  },subjectId);
}

function normalizeProgress(progress,subjectId){
  const empty=emptySubjectProgress(subjectId);
  const competence=Object.fromEntries(Object.entries(progress?.competence&&typeof progress.competence==="object"?progress.competence:{}).map(([id,row])=>[id,normalizeCompetenceRow(row)]));
  return {...empty,...(progress||{}),subjectId,version:MODEL_VERSION,sessions:Array.isArray(progress?.sessions)?progress.sessions.slice(-MAX_SESSIONS):[],missionHistory:Array.isArray(progress?.missionHistory)?progress.missionHistory.slice(-MAX_SESSIONS):[],competence,errorPatterns:normalizeErrorPatterns(progress?.errorPatterns),errorMemoryVersion:1,lastPosition:progress?.lastPosition||null};
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
  const compact={status:result.status,final:!!result.final,correct:result.correct??null,points:Number.isFinite(result.points)?result.points:null,maxPoints:Number.isFinite(result.maxPoints)?result.maxPoints:null,provisionalPoints:Number.isFinite(result.provisionalPoints)?result.provisionalPoints:null,penalty:Number.isFinite(result.penalty)?result.penalty:0,type1Count:Number.isFinite(result.type1Count)?result.type1Count:0,type2Count:Number.isFinite(result.type2Count)?result.type2Count:0,requiresReview:!!result.requiresReview,automaticScoringSuspended:!!result.automaticScoringSuspended,gradingMode:result.gradingMode||null,classificationMode:result.classificationMode||null,countsForExamScore:typeof result.countsForExamScore==="boolean"?result.countsForExamScore:null,responseText:result.responseText||""};
  if(result.final)return compact;
  if(result.gradingMode==="structured-provisional")return {...compact,steps:Array.isArray(result.steps)?result.steps.map(step=>({id:step.id,status:step.status,points:Number.isFinite(step.points)?step.points:null,maxPoints:Number.isFinite(step.maxPoints)?step.maxPoints:null,errorType:step.errorType||null})):[]};
  return {...compact,rubricId:result.rubricId||null,rubricCompleted:!!result.rubricCompleted,revisionCount:Number.isFinite(result.revisionCount)?result.revisionCount:0,previousResponseText:result.previousResponseText||"",revisionHistory:Array.isArray(result.revisionHistory)?result.revisionHistory.map(row=>({revision:Number.isFinite(row?.revision)?row.revision:0,responseText:String(row?.responseText||""),rubricCompleted:!!row?.rubricCompleted,rubricObservationEvidence:Array.isArray(row?.rubricObservationEvidence)?row.rubricObservationEvidence.map(observation=>({criterionId:observation.criterionId,observationId:observation.observationId,evidence:observation.evidence||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})):[]})):[],rubricEvidence:(result.criteria||[]).map(criterion=>({criterionId:criterion.id,evidence:criterion.status||"pending"})),rubricObservationEvidence:(result.criteria||[]).flatMap(criterion=>(criterion.observations||[]).map(observation=>({criterionId:criterion.id,observationId:observation.id,evidence:observation.status||"pending",studentEvidence:Array.isArray(observation.studentEvidence)?observation.studentEvidence.slice(0,3):Array.isArray(observation.evidence)?observation.evidence.slice(0,3):[]})))};}

function isUngradedRubricResult(result){
  return result?.automaticScoringSuspended===true||
    result?.status==="ungraded-awaiting-validation"||
    result?.status==="human-review-required"||
    result?.gradingMode==="criterion-reference-ungraded";
}

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

export function createSubjectSessionId(subjectId,kind,at=Date.now()){
  return `ses-${subjectId}-${kind}-${at}-${Math.random().toString(16).slice(2)}`;
}

export function beginSubjectSession(state,{subjectId,kind,label,domain=null,items,sessionId=null,startedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  // Uma tentativa em curso não pode ser substituída, nem por chamadas diretas ao motor.
  if(progress.lastPosition||(subjectId==="portuguese"&&state.subjectSettings?.portuguese?.miniExamDraft))return state;
  const id=sessionId||createSubjectSessionId(subjectId,kind,startedAt);
  return putProgress(state,subjectId,{...progress,lastPosition:{sessionId:id,kind,label,domain,itemIds:items.map(item=>item.id),current:0,results:[],startedAt,updatedAt:startedAt},lastActivityAt:startedAt});
}

export function advanceSubjectSession(state,subjectId,{sessionId=null,current,results,currentResult=null,currentAnswer=null,updatedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  if(!progress.lastPosition||(sessionId&&sessionId!==progress.lastPosition.sessionId))return state;
  return putProgress(state,subjectId,{...progress,lastPosition:{...progress.lastPosition,current,results:results.map(compactResult),currentResult:compactResult(currentResult),currentAnswer,updatedAt},lastActivityAt:updatedAt});
}

function subjectSessionXp(kind,results=[]){
  const deterministicCorrect=results.filter(result=>result?.final&&result?.correct===true).length;
  if(kind==="mission")return results.length*25;
  if(kind==="training")return deterministicCorrect*10;
  if(kind==="mini_exam")return deterministicCorrect*18;
  return 0;
}

export function recordSubjectSession(state,{subjectId,kind,label,domain=null,items,results,sessionId=null,completedAt=Date.now()}){
  const progress=subjectProgressFor(state,subjectId);
  const completionId=sessionId||progress.lastPosition?.sessionId||null;
  // Sessões arquivadas por erro técnico nunca podem receber recompensa tardia.
  if(completionId&&(progress.interruptedTechnicalSessions||[]).some(row=>row.sessionId===completionId))return state;
  // Não atribuir XP nem evidência a uma conclusão concorrente com uma tentativa pendente.
  if(progress.lastPosition&&completionId!==progress.lastPosition.sessionId)return state;
  if(completionId&&((progress.completedSessionIds||[]).includes(completionId)||progress.sessions.some(row=>row.sessionId===completionId)))return state;
  const competence={...progress.competence};
  let errorPatterns=normalizeErrorPatterns(progress.errorPatterns);
  const recordsAcademicEvidence=kind!=="training";
  items.forEach((item,index)=>{
    const result=results[index];
    if(!result||result.status==="unanswered")return;
    // An abstention is not a wrong answer: do not feed ungraded prose to the
    // recurring-error memory, or it could invent weaknesses without evidence.
    const isUngraded=isUngradedRubricResult(result);
    if(!isUngraded)errorPatterns=recordErrorPatternEvidence(errorPatterns,item,result,completedAt);
    if(!recordsAcademicEvidence)return;
    const id=item.competencyId||`${item.domain}:general`;
    const previous=normalizeCompetenceRow(competence[id]);
    if(result.final){
      competence[id]={...previous,domainId:item.domain||previous.domainId,label:item.competencyLabel||previous.label,attempts:previous.attempts+1,correct:previous.correct+(result.correct?1:0),deterministicAttempts:previous.deterministicAttempts+1,points:previous.points+(Number.isFinite(result.points)?result.points:0),maxPoints:previous.maxPoints+(Number.isFinite(result.maxPoints)?result.maxPoints:0),lastAnsweredAt:completedAt};
      return;
    }
    if(result.gradingMode==="structured-provisional"){
      const scorable=Number.isFinite(result.provisionalPoints)&&Number(result.maxPoints)>0;
      competence[id]={
        ...previous,
        domainId:item.domain||previous.domainId,
        label:item.competencyLabel||previous.label,
        attempts:previous.attempts+1,
        structuredAttempts:previous.structuredAttempts+1,
        structuredScoredAttempts:previous.structuredScoredAttempts+(scorable?1:0),
        structuredNormalizedEarned:previous.structuredNormalizedEarned+(scorable?Math.max(0,Math.min(1,result.provisionalPoints/result.maxPoints)):0),
        structuredNeedsReview:previous.structuredNeedsReview+(result.requiresReview?1:0),
        structuredType1:previous.structuredType1+(result.type1Count||0),
        structuredType2:previous.structuredType2+(result.type2Count||0),
        lastAnsweredAt:completedAt
      };
      return;
    }
    // Preparing criteria is not the same as grading the student's response.
    // Never promote abstentions to reviewed competence, erase prior evidence with
    // "pending" observations or infer an incorrect answer from null points.
    const ungraded=isUngraded;
    const evidence=ungraded?{observed:0,needsReview:0,rubricEvidenceByObservation:previous.rubricEvidenceByObservation}:
      recordRubricEvidence(previous,result,completedAt);
    const trulyReviewed=!ungraded&&!!result.rubricCompleted;
    competence[id]={
      ...previous,
      domainId:item.domain||previous.domainId,
      label:item.competencyLabel||previous.label,
      attempts:previous.attempts+1,
      pendingRubrics:trulyReviewed?previous.pendingRubrics:previous.pendingRubrics+1,
      rubricReviews:previous.rubricReviews+(trulyReviewed?1:0),
      rubricNeedsReview:previous.rubricNeedsReview+evidence.needsReview+(ungraded&&result.requiresReview?1:0),
      rubricObserved:previous.rubricObserved+evidence.observed,
      rubricEvidenceByObservation:evidence.rubricEvidenceByObservation,
      lastAnsweredAt:completedAt
    };
  });
  const session={sessionId:completionId,kind,label,domain,itemIds:items.map(item=>item.id),results:results.map(compactResult),completedAt};
  let completed=putProgress(state,subjectId,{...progress,completedSessionIds:[...new Set([...(progress.completedSessionIds||[]),...progress.sessions.map(row=>row.sessionId).filter(Boolean),...(completionId?[completionId]:[])])],diagnosticDone:progress.diagnosticDone||kind==="diagnostic",diagnosticCompletedAt:kind==="diagnostic"?completedAt:progress.diagnosticCompletedAt,sessions:[...progress.sessions,session].slice(-MAX_SESSIONS),missionHistory:kind==="mission"?[...progress.missionHistory,session].slice(-MAX_SESSIONS):progress.missionHistory,competence,errorPatterns,errorMemoryVersion:1,lastPosition:null,lastActivityAt:completedAt});
  const alreadyCompletedMission=kind==="mission"&&missionCompletedToday(state,completedAt);
  const activityKind=alreadyCompletedMission?"training":kind;
  const xpEarned=subjectSessionXp(activityKind,results);
  const answered=results.filter(result=>result&&result.status!=="unanswered").length;
  completed={...completed,xp:(Number(completed.xp)||0)+xpEarned};
  completed=recordStudyActivity(completed,{kind:activityKind,xpEarned,sessionId:completionId,activityId:completionId||undefined,at:completedAt});
  completed=recordCompetitiveActivity(completed,{kind:activityKind,subjectId,total:items.length,answered,focusKey:`${subjectId}:${domain||label||"general"}`,sessionId:completionId,activityId:completionId||undefined,at:completedAt});
  return completed;
}


/**
 * Desbloqueio estritamente técnico: só quando faltam itens necessários à retoma.
 * Arquiva a tentativa sem pontuar, sem criar uma conclusão nem creditar XP.
 */
export function quarantineUnrecoverableSubjectSession(state,subjectId,availableItemIds,at=Date.now()){
  const progress=subjectProgressFor(state,subjectId);
  const pending=progress.lastPosition;
  if(!pending||!Array.isArray(pending.itemIds)||!pending.itemIds.length)return state;
  const available=new Set(availableItemIds);
  const missing=pending.itemIds.filter(id=>!available.has(id));
  if(!missing.length)return state;
  const archived={
    ...pending,
    status:"interrupted_technical",
    reason:"missing_content",
    missingItemIds:missing,
    archivedAt:at
  };
  return putProgress(state,subjectId,{
    ...progress,
    lastPosition:null,
    interruptedTechnicalSessions:[...(progress.interruptedTechnicalSessions||[]),archived].slice(-MAX_SESSIONS),
    lastActivityAt:at
  });
}

export function resetSubjectProgress(state,subjectId){
  if(subjectProgressFor(state,subjectId).lastPosition)return state;
  const subjectProgress={...(state.subjectProgress||{})};
  delete subjectProgress[subjectId];
  return {...state,subjectProgress,subjectProgressModelVersion:MODEL_VERSION};
}