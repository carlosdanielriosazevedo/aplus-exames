export const STORAGE_KEY="a25";
export const APP_STATE_VERSION=4;

export function loadLocalState(initial,emptyScores){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
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

export function saveLocalState(state){
  try{
    localStorage.setItem(STORAGE_KEY,JSON.stringify({...state,_stateVersion:APP_STATE_VERSION}));
    return true;
  }catch{
    return false;
  }
}

export function clearLocalState(){
  try{localStorage.removeItem(STORAGE_KEY)}catch{}
}

export function buildSyncEnvelope(state){
  return {
    schema:"aplus-sync-v1",
    appVersion:"2.5.0",
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
      feedback:state.betaFeedback||[]
    },
    contentReports:state.contentReports||[],
    examHistory:state.examHistory||[],
    missionHistory:state.missionHistory||[],
    editorial:{
      overrides:state.editorialOverrides||{},
      batches:state.reviewBatches||[]
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
