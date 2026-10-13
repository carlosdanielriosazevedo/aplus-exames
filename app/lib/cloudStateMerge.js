function mergeByStableId(local=[],remote=[],idFn=x=>x?.id){
  const map=new Map();
  for(const item of [...(remote||[]),...(local||[])]){
    const id=idFn(item);
    if(id===null||id===undefined)continue;
    const prev=map.get(id);
    const itemTs=Number(item?.at||item?.updatedAt||item?.lastAt||item?.resolvedAt||0);
    const prevTs=Number(prev?.at||prev?.updatedAt||prev?.lastAt||prev?.resolvedAt||0);
    if(!prev || itemTs>=prevTs)map.set(id,item);
  }
  return [...map.values()];
}

function mergeSubjectProgressMaps(local={},remote={}){
  const out={...remote};
  for(const [id,l] of Object.entries(local||{})){
    const r=out[id];
    if(!r){out[id]={...l,subjectId:id};continue}
    const localAt=+l.lastActivityAt||0,remoteAt=+r.lastActivityAt||0,newest=localAt>=remoteAt?l:r,oldest=newest===l?r:l;
    const sessions=mergeByStableId(l.sessions,r.sessions,row=>row?.sessionId);
    let lastPosition=newest?.lastPosition||null;
    if(lastPosition?.sessionId&&sessions.some(row=>row?.completedAt&&row.sessionId===lastPosition.sessionId))lastPosition=null;
    out[id]={...r,...l,...newest,subjectId:id,
      diagnosticDone:!!(l.diagnosticDone||r.diagnosticDone),
      diagnosticCompletedAt:Math.max(+l.diagnosticCompletedAt||0,+r.diagnosticCompletedAt||0)||null,
      sessions,missionHistory:mergeByStableId(l.missionHistory,r.missionHistory,row=>row?.sessionId),
      competence:{...(oldest.competence||{}),...(newest.competence||{})},
      errorPatterns:{...(oldest.errorPatterns||{}),...(newest.errorPatterns||{})},
      lastPosition,lastActivityAt:Math.max(localAt,remoteAt)||null,
      version:Math.max(+l.version||0,+r.version||0,4)};
  }
  return out;
}

export function safeCloudMerge(local,remote){
  if(!remote)return local;
  const localEvidence=local?.scores||{};
  const remoteEvidence=remote?.scores||{};
  const scoreIds=new Set([...Object.keys(localEvidence),...Object.keys(remoteEvidence)]);
  const scores={};
  for(const id of scoreIds){
    const l=localEvidence[id]||{},r=remoteEvidence[id]||{};
    scores[id]={...r,...l,
      evidence:mergeByStableId(l.evidence||[],r.evidence||[],e=>e?.completionId||`${e?.itemId||""}|${e?.at||0}|${e?.source||""}`),
      domain:null,conf:0};
  }
  return {
    ...remote,...local,scores,
    subjectProgress:mergeSubjectProgressMaps(local?.subjectProgress,remote?.subjectProgress),
    subjectProgressModelVersion:Math.max(Number(local?.subjectProgressModelVersion)||0,Number(remote?.subjectProgressModelVersion)||0),
    xp:Math.max(Number(local?.xp)||0,Number(remote?.xp)||0),
    diagnosticDone:!!(local?.diagnosticDone||remote?.diagnosticDone),
    diagnosticAnswers:Math.max(Number(local?.diagnosticAnswers)||0,Number(remote?.diagnosticAnswers)||0),
    missionHistory:mergeByStableId(local?.missionHistory,remote?.missionHistory,x=>x?.completionId||`${x?.themeId}|${x?.at}`),
    examHistory:mergeByStableId(local?.examHistory,remote?.examHistory,x=>x?.completionId||x?.id),
    freeTrainingSignals:mergeByStableId(local?.freeTrainingSignals,remote?.freeTrainingSignals,x=>x?.originSessionId||`${x?.themeId}|${x?.focus}|${x?.at}`),
    learningHypotheses:mergeByStableId(local?.learningHypotheses,remote?.learningHypotheses,x=>x?.key),
    goal:local?.goal??remote?.goal,
    profile:local?.profile??remote?.profile,
    dailyMission:local?.dailyMission??remote?.dailyMission,
    identity:local?.identity,
    cloudMeta:local?.cloudMeta,
    cloudSync:local?.cloudSync
  };
}
