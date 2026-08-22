// A+ v2.1 — instrumentação local de beta
// Em produção estes eventos devem ser enviados para backend com regras de privacidade.

export function betaEvent(type,payload={}){
  return {
    id:`evt-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    type,
    at:Date.now(),
    payload
  };
}

export function addBetaEvent(state,type,payload={}){
  return {
    ...state,
    betaEvents:[...(state.betaEvents||[]),betaEvent(type,payload)]
  };
}

export function sessionStart(kind,meta={}){
  return {
    id:`ses-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    kind,
    startedAt:Date.now(),
    finishedAt:null,
    meta
  };
}

export function sessionFinish(session,meta={}){
  return {
    ...session,
    finishedAt:Date.now(),
    durationSeconds:Math.max(1,Math.round((Date.now()-session.startedAt)/1000)),
    meta:{...(session.meta||{}),...meta}
  };
}

export function betaSummary(state){
  const sessions=state.betaSessions||[];
  const finished=sessions.filter(s=>s.finishedAt);
  const byKind={};
  finished.forEach(s=>{
    if(!byKind[s.kind])byKind[s.kind]={count:0,totalSeconds:0};
    byKind[s.kind].count++;
    byKind[s.kind].totalSeconds+=s.durationSeconds||0;
  });

  const feedback=state.betaFeedback||[];
  const avg=(key)=>{
    const vals=feedback.map(f=>Number(f[key])).filter(x=>Number.isFinite(x));
    return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*10)/10:null;
  };

  const starts=(state.betaEvents||[]).filter(e=>e.type.endsWith("_started")).length;
  const finishes=(state.betaEvents||[]).filter(e=>e.type.endsWith("_finished")).length;

  return {
    sessions:finished.length,
    started:starts,
    finished:finishes,
    completionRate:starts?Math.round(finishes/starts*100):0,
    byKind,
    feedbackCount:feedback.length,
    avgClarity:avg("clarity"),
    avgDifficultyFit:avg("difficultyFit"),
    avgUsefulness:avg("usefulness"),
    reports:(state.contentReports||[]).length
  };
}

export function exportBetaPayload(state){
  return {
    schema:"aplus-beta-v1",
    exportedAt:new Date().toISOString(),
    participant:{
      code:state.betaParticipant?.code||null,
      cohort:state.betaParticipant?.cohort||null,
      schoolYear:state.profile?.schoolYear||null,
      goal:state.goal||null
    },
    sessions:state.betaSessions||[],
    events:state.betaEvents||[],
    feedback:state.betaFeedback||[],
    contentReports:state.contentReports||[],
    examHistory:state.examHistory||[],
    missionHistory:state.missionHistory||[]
  };
}
