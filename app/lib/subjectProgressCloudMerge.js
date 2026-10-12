import {canonicalSubjectId} from "./subjectWorkspace.js";

const MAX_SESSIONS=100;

function asObject(value){return value&&typeof value==="object"&&!Array.isArray(value)?value:{}}
function activityAt(progress){return Number(progress?.lastActivityAt)||0}
function positionAt(position){return Number(position?.updatedAt||position?.startedAt)||0}
function rowKey(row){return row?.sessionId||[row?.kind,row?.label,row?.completedAt,(row?.itemIds||[]).join(",")].join("|")}

function mergeRows(local=[],remote=[]){
  const map=new Map();
  for(const row of [...(remote||[]),...(local||[])]){
    const key=rowKey(row);
    if(!key)continue;
    const previous=map.get(key);
    if(!previous||Number(row?.completedAt||row?.updatedAt||0)>=Number(previous?.completedAt||previous?.updatedAt||0))map.set(key,row);
  }
  return [...map.values()].sort((a,b)=>Number(a?.completedAt||0)-Number(b?.completedAt||0)).slice(-MAX_SESSIONS);
}

function mergeCompetence(local={},remote={}){
  const out={...asObject(remote)};
  for(const [id,row] of Object.entries(asObject(local))){
    const other=asObject(out[id]);
    const next={...other,...row};
    for(const key of ["attempts","correct","deterministicAttempts","structuredAttempts","structuredScoredAttempts","structuredNormalizedEarned","structuredNeedsReview","structuredType1","structuredType2","points","maxPoints","pendingRubrics","rubricReviews","rubricNeedsReview","rubricObserved"]){
      next[key]=Math.max(Number(other[key])||0,Number(row?.[key])||0);
    }
    next.lastAnsweredAt=Math.max(Number(other.lastAnsweredAt)||0,Number(row?.lastAnsweredAt)||0)||null;
    next.rubricEvidenceByObservation={...asObject(other.rubricEvidenceByObservation),...asObject(row?.rubricEvidenceByObservation)};
    out[id]=next;
  }
  return out;
}

function mergeErrorPatterns(local={},remote={}){
  const out={...asObject(remote)};
  for(const [key,row] of Object.entries(asObject(local))){
    const other=asObject(out[key]);
    if(!Object.keys(other).length){out[key]=row;continue}
    const newest=Number(row?.lastAt||0)>=Number(other.lastAt||0)?row:other;
    out[key]={
      ...other,...newest,
      count:Math.max(Number(other.count)||0,Number(row?.count)||0),
      firstAt:Math.min(Number(other.firstAt)||Infinity,Number(row?.firstAt)||Infinity),
      lastAt:Math.max(Number(other.lastAt)||0,Number(row?.lastAt)||0)||null,
      itemIds:[...new Set([...(other.itemIds||[]),...(row?.itemIds||[])])].slice(-12),
      recoveryEvidence:Math.max(Number(other.recoveryEvidence)||0,Number(row?.recoveryEvidence)||0)
    };
    if(!Number.isFinite(out[key].firstAt))out[key].firstAt=null;
  }
  return out;
}

function mergeOne(local,remote,subjectId){
  if(!local)return remote?{...remote,subjectId}:null;
  if(!remote)return {...local,subjectId};
  const localAt=activityAt(local),remoteAt=activityAt(remote);
  const newest=localAt>=remoteAt?local:remote;
  const sessions=mergeRows(local.sessions,remote.sessions);
  const missionHistory=mergeRows(local.missionHistory,remote.missionHistory);
  const completedIds=new Set(sessions.map(row=>row?.sessionId).filter(Boolean));
  let lastPosition=newest?.lastPosition||null;
  if(lastPosition?.sessionId&&completedIds.has(lastPosition.sessionId))lastPosition=null;
  if(lastPosition&&positionAt(lastPosition)>Math.max(localAt,remoteAt)){
    // A posição é a própria atividade mais recente; preserva-a. Esta condição torna explícito
    // que nunca escolhemos uma pausa antiga apenas porque o outro dispositivo a tinha.
  }
  return {
    ...remote,
    ...local,
    ...newest,
    subjectId,
    diagnosticDone:!!(local.diagnosticDone||remote.diagnosticDone),
    diagnosticCompletedAt:Math.max(Number(local.diagnosticCompletedAt)||0,Number(remote.diagnosticCompletedAt)||0)||null,
    sessions,
    missionHistory,
    competence:mergeCompetence(local.competence,remote.competence),
    errorPatterns:mergeErrorPatterns(local.errorPatterns,remote.errorPatterns),
    errorMemoryVersion:Math.max(Number(local.errorMemoryVersion)||0,Number(remote.errorMemoryVersion)||0,1),
    lastPosition,
    lastActivityAt:Math.max(localAt,remoteAt)||null,
    version:Math.max(Number(local.version)||0,Number(remote.version)||0,4)
  };
}

function canonicalMap(source){
  const out={};
  for(const [storedId,progress] of Object.entries(asObject(source))){
    const id=canonicalSubjectId(storedId);
    out[id]=out[id]?mergeOne(progress,out[id],id):{...progress,subjectId:id};
  }
  return out;
}

export function mergeSubjectProgressMaps(local,remote){
  const a=canonicalMap(local),b=canonicalMap(remote);
  const ids=new Set([...Object.keys(a),...Object.keys(b)]);
  return Object.fromEntries([...ids].map(id=>[id,mergeOne(a[id],b[id],id)]).filter(([,row])=>!!row));
}
