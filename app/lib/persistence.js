import {pilotTelemetryAllowed} from "./pilotConsentClient";

export const STORAGE_KEY="a25";
export const FRIENDS_STORAGE_KEY="a25-friends-beta";
export const APP_STATE_VERSION=31;

const PILOT_SYNC_DEBOUNCE_MS=4_000;
const PILOT_SYNC_RETRY_MS=60_000;
const PILOT_SUBJECTS=new Set(["all","math-a","portuguese","physics-chemistry-a"]);
let pilotSyncTimer=null;
let pilotSyncInFlight=false;
let pilotSyncLastSignature=null;
let pilotSyncRetryAfter=0;

function pilotSubject(value){
  const subject=String(value||"all");
  return PILOT_SUBJECTS.has(subject)?subject:"all";
}

function withoutLegacyBetaQueues(state){
  if(!state||typeof state!=="object")return state;
  const {betaSessions:_betaSessions,betaEvents:_betaEvents,...rest}=state;
  return rest;
}

function withoutPilotTelemetry(state){
  if(!state||typeof state!=="object")return state;
  const {
    pilotAggregates:_pilotAggregates,
    pilotItemResults:_pilotItemResults,
    betaFeedback:_betaFeedback,
    betaSessions:_betaSessions,
    betaEvents:_betaEvents,
    ...rest
  }=state;
  return rest;
}

export function clearLocalPilotTelemetry(){
  if(typeof window==="undefined")return;
  for(const key of [STORAGE_KEY,FRIENDS_STORAGE_KEY]){
    try{
      const raw=localStorage.getItem(key);
      if(!raw)continue;
      const parsed=JSON.parse(raw);
      localStorage.setItem(key,JSON.stringify({...withoutPilotTelemetry(parsed),_stateVersion:APP_STATE_VERSION}));
    }catch{}
  }
  pilotSyncLastSignature=null;
  pilotSyncRetryAfter=0;
  if(pilotSyncTimer){window.clearTimeout(pilotSyncTimer);pilotSyncTimer=null}
}

export function loadLocalStateStatus(initial,emptyScores,storageKey=STORAGE_KEY){
  try{
    const raw=localStorage.getItem(storageKey);
    if(!raw)return {state:null,found:false,error:false};
    const x=withoutLegacyBetaQueues(JSON.parse(raw));
    const scores=emptyScores();
    Object.keys(scores).forEach(id=>{
      if(x.scores?.[id])scores[id]={...scores[id],...x.scores[id]};
    });
    return {state:{...initial,...x,scores,betaSessions:[],betaEvents:[],_stateVersion:APP_STATE_VERSION},found:true,error:false};
  }catch{
    return {state:null,found:false,error:true};
  }
}

export function loadLocalState(initial,emptyScores,storageKey=STORAGE_KEY){
  return loadLocalStateStatus(initial,emptyScores,storageKey).state;
}

function pilotSyncSignature(state){
  const aggregates=state?.pilotAggregates||[];
  const itemResults=state?.pilotItemResults||[];
  const feedback=state?.betaFeedback||[];
  const lastAggregate=aggregates.at(-1)||null;
  const lastItem=itemResults.at(-1)||null;
  const lastFeedback=feedback.at(-1)||null;
  return [
    aggregates.length,lastAggregate?.date||"",lastAggregate?.type||"",lastAggregate?.totalCount??"",
    itemResults.length,lastItem?.id||"",
    feedback.length,lastFeedback?.id||""
  ].join("|");
}

function schedulePilotSync(state){
  if(typeof window==="undefined"||state?.betaMode!=="friends_beta"||!pilotTelemetryAllowed())return;
  const hasTelemetry=(state.pilotAggregates?.length||0)+(state.pilotItemResults?.length||0)+(state.betaFeedback?.length||0)>0;
  if(!hasTelemetry)return;

  if(pilotSyncTimer)window.clearTimeout(pilotSyncTimer);
  pilotSyncTimer=window.setTimeout(async()=>{
    pilotSyncTimer=null;
    if(pilotSyncInFlight||Date.now()<pilotSyncRetryAfter||!pilotTelemetryAllowed())return;
    const signature=pilotSyncSignature(state);
    if(signature===pilotSyncLastSignature)return;

    pilotSyncInFlight=true;
    try{
      const result=await syncStateToBackend(state);
      if(result.ok){
        pilotSyncLastSignature=signature;
        pilotSyncRetryAfter=0;
      }else{
        pilotSyncRetryAfter=Date.now()+PILOT_SYNC_RETRY_MS;
      }
    }catch{
      pilotSyncRetryAfter=Date.now()+PILOT_SYNC_RETRY_MS;
    }finally{
      pilotSyncInFlight=false;
    }
  },PILOT_SYNC_DEBOUNCE_MS);
}

export function saveLocalState(state,storageKey=null){
  try{
    const key=storageKey||(state?.betaMode==="friends_beta"?FRIENDS_STORAGE_KEY:STORAGE_KEY);
    const clean=withoutLegacyBetaQueues(state);
    const persisted=pilotTelemetryAllowed()?clean:withoutPilotTelemetry(clean);
    localStorage.setItem(key,JSON.stringify({...persisted,_stateVersion:APP_STATE_VERSION}));
    schedulePilotSync(persisted);
    return true;
  }catch{
    return false;
  }
}

export function clearLocalState(storageKey=STORAGE_KEY){
  try{localStorage.removeItem(storageKey)}catch{}
}

export function buildSyncEnvelope(state){
  if(!pilotTelemetryAllowed())return {schema:"aplus-pilot-v1",aggregates:[],itemResults:[],feedback:[]};
  return {
    schema:"aplus-pilot-v1",
    aggregates:(state.pilotAggregates||[]).map(row=>({
      date:row.date,
      type:row.type,
      subject:pilotSubject(row.subject),
      totalCount:Number(row.totalCount)||0,
      totalSeconds:Number(row.totalSeconds)||0
    })),
    itemResults:(state.pilotItemResults||[]).map(row=>({
      id:row.id,
      itemId:row.itemId,
      outcome:row.outcome,
      seconds:Number(row.seconds)||0,
      date:row.date,
      subject:pilotSubject(row.subject)
    })),
    feedback:(state.betaFeedback||[]).map(row=>({
      id:row.id,
      type:"general",
      subject:pilotSubject(row.subject),
      rating:row.rating??row.usefulness??null,
      comment:row.comment||null,
      at:row.at
    }))
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
  if(!pilotTelemetryAllowed())return {ok:false,status:403,code:"PILOT_CONSENT_REQUIRED"};
  const payload=buildSyncEnvelope(state);
  try{
    const r=await fetch("/api/pilot/sync",{
      method:"POST",
      credentials:"include",
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
