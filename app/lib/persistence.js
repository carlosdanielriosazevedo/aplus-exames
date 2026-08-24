export const STORAGE_KEY="a25";
export const FRIENDS_STORAGE_KEY="a25-friends-beta";
export const APP_STATE_VERSION=29;

export function loadLocalState(initial,emptyScores,storageKey=STORAGE_KEY){
  try{
    const raw=localStorage.getItem(storageKey);
    if(!raw)return null;
    const x=JSON.parse(raw);
    const scores=emptyScores();
    Object.keys(scores).forEach(id=>{
      if(x.scores?.[id])scores[id]={...scores[id],...x.scores[id]};
    });
    return {...initial,...x,scores,_stateVersion:APP_STATE_VERSION};
  }catch{
    return null;
  }
}

export function saveLocalState(state,storageKey=null){
  try{
    const key=storageKey||(state?.betaMode==="friends_beta"?FRIENDS_STORAGE_KEY:STORAGE_KEY);
    localStorage.setItem(key,JSON.stringify({...state,_stateVersion:APP_STATE_VERSION}));
    return true;
  }catch{
    return false;
  }
}

export function clearLocalState(storageKey=STORAGE_KEY){
  try{localStorage.removeItem(storageKey)}catch{}
}

export function buildSyncEnvelope(state){
  return {
    schema:"aplus-sync-v1",
    appVersion:"5.5.0",
    exportedAt:new Date().toISOString(),
    identity:{
      mode:state.identity?.mode||"demo",
      activeRole:state.identity?.activeRole||"student",
      authUserId:state.identity?.authUserId||null
    },
    participant:{
      code:state.betaParticipant?.code||null,
      cohort:state.betaParticipant?.cohort||null,
      schoolYear:state.profile?.schoolYear||null,
      goal:state.goal??null
    },
    beta:{
      mode:state.betaMode||"internal",
      sessions:state.betaSessions||[],
      events:state.betaEvents||[],
      feedback:state.betaFeedback||[],
      testerMeta:state.betaTesterMeta||null,
      productAnalytics:state.productAnalytics||null,
      productAnalyticsVersion:state.productAnalyticsVersion||1
    },
    contentReports:state.contentReports||[],
    examHistory:state.examHistory||[],
    missionHistory:state.missionHistory||[],
    engagement:state.engagement||null,
    engagementModelVersion:state.engagementModelVersion||1,
    competition:state.competition||null,
    competitionModelVersion:state.competitionModelVersion||1,
    dailyMission:state.dailyMission||null,
    dailyMissionModelVersion:state.dailyMissionModelVersion||1,
    learningHypotheses:state.learningHypotheses||[],
    pedagogicalMemoryVersion:state.pedagogicalMemoryVersion||2,
    cloudSync:{
      modelVersion:state.cloudSyncModelVersion||1,
      baseRevision:state.cloudSync?.baseRevision??0,
      lastRemoteRevision:state.cloudSync?.lastRemoteRevision??null,
      pendingCount:state.cloudSync?.pendingCount??0
    },
    editorial:{
      overrides:state.editorialOverrides||{},
      batches:state.reviewBatches||[],
      imports:state.reviewImports||[]
    }
  };
}

export async function backendHealth(){
  try{
    const r=await fetch("/api/health",{cache:"no-store"});
    if(!r.ok)return {ok:false,configured:false};
    return await r.json();
  }catch{
    return {ok:false,configured:false};
  }
}

export async function syncStateToBackend(state){
  const payload=buildSyncEnvelope(state);
  try{
    const r=await fetch("/api/beta/sync",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(payload)
    });
    let body={};
    try{body=await r.json()}catch{}
    return {ok:r.ok,status:r.status,...body};
  }catch(error){
    return {ok:false,status:0,error:String(error)};
  }
}
