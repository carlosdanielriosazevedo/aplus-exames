const object=value=>value&&typeof value==="object"&&!Array.isArray(value)?value:{};
const at=row=>Number(row?.lastActivityAt)||0;
const key=row=>row?.sessionId||[row?.kind,row?.label,row?.completedAt,(row?.itemIds||[]).join(",")].join("|");

function rows(local=[],remote=[]){
  const map=new Map();
  for(const row of [...(remote||[]),...(local||[])])if(key(row))map.set(key(row),row);
  return [...map.values()].sort((a,b)=>Number(a?.completedAt||0)-Number(b?.completedAt||0)).slice(-100);
}

function records(local={},remote={}){
  const out={...object(remote)};
  for(const [id,row] of Object.entries(object(local))){
    const old=object(out[id]),next={...old,...row};
    for(const field of new Set([...Object.keys(old),...Object.keys(row||{})])){
      if(typeof old[field]==="number"&&typeof row?.[field]==="number")next[field]=Math.max(old[field],row[field]);
    }
    if(old.rubricEvidenceByObservation||row?.rubricEvidenceByObservation)next.rubricEvidenceByObservation={...object(old.rubricEvidenceByObservation),...object(row?.rubricEvidenceByObservation)};
    if(old.itemIds||row?.itemIds)next.itemIds=[...new Set([...(old.itemIds||[]),...(row?.itemIds||[])])].slice(-12);
    out[id]=next;
  }
  return out;
}

function one(local,remote,id){
  if(!local)return remote?{...remote,subjectId:id}:null;
  if(!remote)return {...local,subjectId:id};
  const localAt=at(local),remoteAt=at(remote),newest=localAt>=remoteAt?local:remote;
  const sessions=rows(local.sessions,remote.sessions),completedIds=new Set(sessions.map(row=>row?.sessionId).filter(Boolean));
  let lastPosition=newest?.lastPosition||null;
  if(lastPosition?.sessionId&&completedIds.has(lastPosition.sessionId))lastPosition=null;
  return {
    ...remote,...local,...newest,subjectId:id,
    diagnosticDone:!!(local.diagnosticDone||remote.diagnosticDone),
    diagnosticCompletedAt:Math.max(Number(local.diagnosticCompletedAt)||0,Number(remote.diagnosticCompletedAt)||0)||null,
    sessions,missionHistory:rows(local.missionHistory,remote.missionHistory),
    competence:records(local.competence,remote.competence),errorPatterns:records(local.errorPatterns,remote.errorPatterns),
    lastPosition,lastActivityAt:Math.max(localAt,remoteAt)||null,
    version:Math.max(Number(local.version)||0,Number(remote.version)||0,4)
  };
}

export function mergeSubjectProgressMaps(local,remote){
  const a=object(local),b=object(remote),ids=new Set([...Object.keys(a),...Object.keys(b)]);
  return Object.fromEntries([...ids].map(id=>[id,one(a[id],b[id],id)]).filter(([,row])=>row));
}
