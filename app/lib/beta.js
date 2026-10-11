import {pilotTelemetryAllowed} from "./pilotConsentClient.js";

// APProva+ — telemetria mínima do piloto.
// Mantém nomes exportados antigos apenas para compatibilidade de chamadas existentes,
// mas deixa de acumular betaEvents/betaSessions localmente.

const ALLOWED_EVENTS=new Set([
  "app_session","diagnostic_completed","practice_completed","mission_completed",
  "mini_exam_completed","full_exam_completed","review_opened",
  "onboarding_started","onboarding_completed","onboarding_abandoned"
]);

const dateKey=at=>new Date(at||Date.now()).toISOString().slice(0,10);
const subjectOf=payload=>String(payload?.subject||payload?.subjectId||"all");

function upsertAggregate(state,type,{subject="all",seconds=0,at=Date.now()}={}){
  if(!pilotTelemetryAllowed()||!ALLOWED_EVENTS.has(type))return state;
  const date=dateKey(at);
  const rows=[...(state.pilotAggregates||[])];
  const index=rows.findIndex(row=>row.date===date&&row.type===type&&(row.subject||"all")===subject);
  if(index>=0){
    const current=rows[index];
    rows[index]={
      ...current,
      totalCount:(Number(current.totalCount)||0)+1,
      totalSeconds:(Number(current.totalSeconds)||0)+Math.max(0,Math.round(Number(seconds)||0))
    };
  }else{
    rows.push({date,type,subject,totalCount:1,totalSeconds:Math.max(0,Math.round(Number(seconds)||0))});
  }
  return {...state,pilotAggregates:rows,betaEvents:[]};
}

export function betaEvent(type,payload={}){
  return pilotTelemetryAllowed()?{type,at:Date.now(),payload}:null;
}

export function addBetaEvent(state,type,payload={}){
  const normalized=type==="onboarding_finished"?"onboarding_completed":type;
  return upsertAggregate(state,normalized,{subject:subjectOf(payload),seconds:payload?.seconds||0,at:Date.now()});
}

export function recordPilotItemResult(state,{itemId,outcome,seconds=0,date=null,subject="all",id=null}={}){
  if(!pilotTelemetryAllowed()||!itemId||!["correct","partial","incorrect","skipped"].includes(outcome))return state;
  const occurredOn=date||dateKey();
  const externalId=id||`item-${itemId}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return {
    ...state,
    pilotItemResults:[...(state.pilotItemResults||[]),{
      id:externalId,itemId:String(itemId),outcome,
      seconds:Math.max(0,Math.round(Number(seconds)||0)),date:occurredOn,subject:String(subject||"all")
    }]
  };
}

export function sessionStart(kind,meta={}){
  return {kind,startedAt:Date.now(),meta};
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
  const aggregates=state.pilotAggregates||[];
  const feedback=state.betaFeedback||[];
  const total=type=>aggregates.filter(row=>row.type===type).reduce((sum,row)=>sum+(Number(row.totalCount)||0),0);
  const avg=key=>{
    const vals=feedback.map(f=>Number(f[key])).filter(Number.isFinite);
    return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*10)/10:null;
  };
  const started=total("onboarding_started");
  const finished=total("onboarding_completed");
  return {
    sessions:total("app_session"),started,finished,
    completionRate:started?Math.round(finished/started*100):0,
    feedbackCount:feedback.length,
    avgClarity:avg("clarity"),avgDifficultyFit:avg("difficultyFit"),avgUsefulness:avg("usefulness"),
    itemResults:(state.pilotItemResults||[]).length
  };
}

export function exportBetaPayload(state){
  if(!pilotTelemetryAllowed())return {schema:"aplus-pilot-v1",aggregates:[],itemResults:[],feedback:[]};
  return {
    schema:"aplus-pilot-v1",
    aggregates:state.pilotAggregates||[],
    itemResults:state.pilotItemResults||[],
    feedback:state.betaFeedback||[]
  };
}
