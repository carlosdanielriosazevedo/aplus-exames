import {assertCloudSnapshot,snapshotError,CLOUD_FIELDS} from "./cloudSnapshotValidation.js";

export function stableSnapshotJson(value){
  if(value instanceof Date)return JSON.stringify(value.toISOString());
  if(Array.isArray(value))return "["+value.map(stableSnapshotJson).join(",")+"]";
  if(value&&typeof value==="object")return "{"+Object.keys(value).sort().filter(k=>value[k]!==undefined).map(k=>JSON.stringify(k)+":"+stableSnapshotJson(value[k])).join(",")+"}";
  return JSON.stringify(value);
}

// Reconcile complementary copies of the same immutable record (the wire copy
// omits private answers). Conflicting values require review; neither wins.
function mergeConsistent(left,right){
  if(left===undefined)return right;
  if(right===undefined||stableSnapshotJson(left)===stableSnapshotJson(right))return left;
  if(Array.isArray(left)&&Array.isArray(right)&&left.length===right.length)return left.map((value,i)=>mergeConsistent(value,right[i]));
  if(left&&right&&typeof left==="object"&&typeof right==="object"&&!Array.isArray(left)&&!Array.isArray(right)){
    const out={};for(const key of new Set([...Object.keys(left),...Object.keys(right)]))out[key]=mergeConsistent(left[key],right[key]);return out;
  }
  throw snapshotError("CLOUD_MERGE_REVIEW_REQUIRED");
}

function mergeByStableId(local=[],remote=[],idFn=x=>x?.id){
  const map=new Map();
  for(const item of [...(remote||[]),...(local||[])]){
    const id=idFn(item);
    const raw=stableSnapshotJson(item);
    const key=id===null||id===undefined||id===""?"record:"+raw:"id:"+String(id);
    const prev=map.get(key);
    const reconciled=prev?mergeConsistent(prev,item):item;
    map.set(key,JSON.parse(stableSnapshotJson(reconciled)));
  }
  const time=value=>value?.at||value?.completedAt||value?.updatedAt||value?.lastAt||value?.resolvedAt||0;
  return [...map.entries()].sort(([a,left],[b,right])=>time(left)-time(right)||(a<b?-1:a>b?1:0)).map(([,value])=>value);
}

function mergeMapsWithoutDiscard(local={},remote={}){
  const out={...remote};
  for(const [key,value] of Object.entries(local)){
    out[key]=key in out?mergeConsistent(out[key],value):value;
  }
  return out;
}
function mergeSubjectProgressMaps(local={},remote={},positions=[]){
  const out={...remote};
  for(const [id,l] of Object.entries(local||{})){
    const r=out[id];
    if(!r){out[id]={...l,subjectId:id};continue}
    const localAt=+l.lastActivityAt||0,remoteAt=+r.lastActivityAt||0,newest=localAt>=remoteAt?l:r;
    const sessions=mergeByStableId(l.sessions,r.sessions,row=>row?.sessionId);
    let lastPosition=newest?.lastPosition||null;
    if(lastPosition?.sessionId&&sessions.some(row=>row?.completedAt&&row.sessionId===lastPosition.sessionId))lastPosition=null;
    for(const pending of [l.lastPosition,r.lastPosition])if(pending&&stableSnapshotJson(pending)!==stableSnapshotJson(lastPosition))
      positions.push({subjectId:id,kind:"pending-position",data:pending});
    out[id]={...r,...l,...newest,subjectId:id,
      diagnosticDone:!!(l.diagnosticDone||r.diagnosticDone),
      diagnosticCompletedAt:Math.max(+l.diagnosticCompletedAt||0,+r.diagnosticCompletedAt||0)||null,
      sessions,missionHistory:mergeByStableId(l.missionHistory,r.missionHistory,row=>row?.sessionId),
      completedSessionIds:[...new Set([...(l.completedSessionIds||[]),...(r.completedSessionIds||[])])].sort(),
      interruptedTechnicalSessions:mergeByStableId(l.interruptedTechnicalSessions,r.interruptedTechnicalSessions,row=>row?.sessionId),
      competence:mergeMapsWithoutDiscard(l.competence,r.competence),
      errorPatterns:mergeMapsWithoutDiscard(l.errorPatterns,r.errorPatterns),
      lastPosition,lastActivityAt:Math.max(localAt,remoteAt)||null,
      version:Math.max(+l.version||0,+r.version||0,4)};
  }
  return out;
}

export function safeCloudMerge(local,remote){
  if(!remote)return local;
  assertCloudSnapshot(local,{local:true,privateFields:false});
  assertCloudSnapshot(remote.schema?remote:{...remote,schema:"aplus-student-state-v8"},{legacy:true,privateFields:false});
  const clone=state=>({...state,...JSON.parse(JSON.stringify(Object.fromEntries(Object.entries(state).filter(([key])=>CLOUD_FIELDS.has(key)))))});
  local=clone(local);remote=clone(remote);
  const localEvidence=local?.scores||{};
  const remoteEvidence=remote?.scores||{};
  const scoreIds=new Set([...Object.keys(localEvidence),...Object.keys(remoteEvidence)]);
  const scores={};
  for(const id of scoreIds){
    const l=localEvidence[id]||{},r=remoteEvidence[id]||{};
    scores[id]={...r,...l,
      evidence:mergeByStableId(l.evidence||[],r.evidence||[],e=>e?.itemId?`${e.completionId||""}|${e.itemId}|${e.at||0}|${e.source||""}`:null),
      domain:null,conf:0};
  }
  const positions=[];
  for(const field of ["goal","profile","dailyMission","engagement","competition","streak","lastMission","lastExam"]){
    if(local[field]!==null&&local[field]!==undefined&&remote[field]!==null&&remote[field]!==undefined
      &&stableSnapshotJson(local[field])!==stableSnapshotJson(remote[field]))positions.push({kind:"snapshot-field",field,data:remote[field]});
  }
  const subjectProgress=mergeSubjectProgressMaps(local?.subjectProgress,remote?.subjectProgress,positions);
  const archive=mergeByStableId(local?.cloudRecoveryArchive?.entries||[],positions,()=>null);
  const combined={
    ...remote,...local,scores,
    subjectProgress,
    ...(archive.length?{cloudRecoveryArchive:{version:1,entries:archive}}:{}),
    subjectProgressModelVersion:Math.max(Number(local?.subjectProgressModelVersion)||0,Number(remote?.subjectProgressModelVersion)||0,4),
    xp:Math.max(Number(local?.xp)||0,Number(remote?.xp)||0),
    diagnosticDone:!!(local?.diagnosticDone||remote?.diagnosticDone),
    diagnosticAnswers:Math.max(Number(local?.diagnosticAnswers)||0,Number(remote?.diagnosticAnswers)||0),
    lastMission:local?.lastMission??remote?.lastMission,
    lastExam:local?.lastExam??remote?.lastExam,
    missionHistory:mergeByStableId(local?.missionHistory,remote?.missionHistory,x=>x?.completionId||(x?.themeId&&x?.at?`${x.themeId}|${x.at}`:null)),
    examHistory:mergeByStableId(local?.examHistory,remote?.examHistory,x=>x?.completionId||x?.id),
    freeTrainingSignals:mergeByStableId(local?.freeTrainingSignals,remote?.freeTrainingSignals,x=>x?.originSessionId||(x?.themeId&&x?.at?`${x.themeId}|${x.focus||""}|${x.at}`:null)),
    learningHypotheses:mergeByStableId(local?.learningHypotheses,remote?.learningHypotheses,x=>x?.key),
    goal:local?.goal??remote?.goal,
    profile:local?.profile??remote?.profile,
    dailyMission:local?.dailyMission??remote?.dailyMission,
    engagement:local?.engagement??remote?.engagement,
    competition:local?.competition??remote?.competition,
    streak:local?.streak??remote?.streak,
    identity:local?.identity,
    cloudMeta:local?.cloudMeta,
    cloudSync:local?.cloudSync
  };
  assertCloudSnapshot(combined,{local:true,privateFields:false});
  return combined;
}
