
import {localDayKey,dayGap} from "./engagement.js";

export const FUNNEL_STEPS=[
  {id:"app_opened",label:"Abriu a app"},
  {id:"onboarding_started",label:"Começou onboarding"},
  {id:"profile_completed",label:"Perfil inicial"},
  {id:"goal_completed",label:"Objetivo definido"},
  {id:"diagnostic_started",label:"Começou diagnóstico"},
  {id:"diagnostic_completed",label:"Terminou diagnóstico"},
  {id:"first_plan_viewed",label:"Viu primeiro plano"},
  {id:"first_mission_started",label:"Começou 1.ª Missão"},
  {id:"first_mission_completed",label:"Terminou 1.ª Missão"}
];

const MAX_EVENTS=250;

export function emptyProductAnalytics(){
  return {
    version:1,
    firstSeenAt:null,
    firstSeenDay:null,
    lastSeenAt:null,
    activeDays:[],
    appOpenCount:0,
    milestones:{},
    events:[]
  };
}

export function normalizeProductAnalytics(state){
  const raw=state?.productAnalytics;
  if(raw?.version===1){
    return {
      ...emptyProductAnalytics(),
      ...raw,
      activeDays:[...new Set(raw.activeDays||[])].sort(),
      milestones:raw.milestones||{},
      events:raw.events||[]
    };
  }
  return emptyProductAnalytics();
}

function eventRow(type,payload={},at=Date.now()){
  return {
    id:`pa-${at}-${Math.random().toString(16).slice(2)}`,
    type,
    at,
    day:localDayKey(at),
    payload
  };
}

function withAnalytics(state,analytics){
  return {
    ...state,
    productAnalytics:analytics,
    productAnalyticsVersion:1
  };
}

export function recordAppOpen(state,{at=Date.now(),source="app"}={}){
  const a=normalizeProductAnalytics(state);
  const day=localDayKey(at);
  const alreadyDay=a.activeDays.includes(day);

  const next={
    ...a,
    firstSeenAt:a.firstSeenAt||at,
    firstSeenDay:a.firstSeenDay||day,
    lastSeenAt:at,
    activeDays:alreadyDay?a.activeDays:[...a.activeDays,day].sort(),
    appOpenCount:(a.appOpenCount||0)+1,
    events:alreadyDay
      ?a.events
      :[...a.events,eventRow("app_opened",{source},at)].slice(-MAX_EVENTS)
  };

  const withOpen=withAnalytics(state,next);
  return recordMilestone(withOpen,"app_opened",{source},{at,once:true});
}

export function recordMilestone(state,type,payload={},{
  at=Date.now(),
  once=true
}={}){
  const a=normalizeProductAnalytics(state);
  if(once&&a.milestones?.[type])return withAnalytics(state,a);

  const milestones={
    ...a.milestones,
    [type]:a.milestones?.[type]||{at,day:localDayKey(at),payload}
  };
  const next={
    ...a,
    milestones,
    events:[...a.events,eventRow(type,payload,at)].slice(-MAX_EVENTS)
  };
  return withAnalytics(state,next);
}

export function recordProductEvent(state,type,payload={},at=Date.now()){
  const a=normalizeProductAnalytics(state);
  return withAnalytics(state,{
    ...a,
    events:[...a.events,eventRow(type,payload,at)].slice(-MAX_EVENTS)
  });
}

function dayAtOffset(firstDay,offset){
  const d=new Date(`${firstDay}T12:00:00`);
  d.setDate(d.getDate()+offset);
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

export function retentionCheckpoint(state,offset,{now=Date.now()}={}){
  const a=normalizeProductAnalytics(state);
  if(!a.firstSeenDay)return {
    offset,eligible:false,retained:null,targetDay:null
  };

  const today=localDayKey(now);
  const observedDays=dayGap(a.firstSeenDay,today);
  const targetDay=dayAtOffset(a.firstSeenDay,offset);
  const eligible=observedDays>=offset;
  const retained=eligible?a.activeDays.includes(targetDay):null;

  return {offset,eligible,retained,targetDay,observedDays};
}

export function retentionSummary(state,{now=Date.now()}={}){
  const a=normalizeProductAnalytics(state);
  const d1=retentionCheckpoint(state,1,{now});
  const d3=retentionCheckpoint(state,3,{now});
  const d7=retentionCheckpoint(state,7,{now});
  const first7Targets=a.firstSeenDay
    ?Array.from({length:7},(_,i)=>dayAtOffset(a.firstSeenDay,i+1))
    :[];
  const returnsFirst7=first7Targets.filter(d=>a.activeDays.includes(d)).length;

  return {
    firstSeenAt:a.firstSeenAt,
    firstSeenDay:a.firstSeenDay,
    lastSeenAt:a.lastSeenAt,
    activeDays:a.activeDays.length,
    appOpenCount:a.appOpenCount||0,
    d1,d3,d7,
    returnsFirst7,
    milestones:a.milestones
  };
}

export function funnelSummary(state){
  const a=normalizeProductAnalytics(state);
  let previousReached=true;
  return FUNNEL_STEPS.map((step,index)=>{
    const m=a.milestones?.[step.id]||null;
    const reached=!!m;
    const validOrder=index===0?reached:(reached&&previousReached);
    previousReached=previousReached&&reached;
    return {
      ...step,
      reached,
      validOrder,
      at:m?.at||null,
      day:m?.day||null
    };
  });
}

export function activationSummary(state){
  const a=normalizeProductAnalytics(state);
  const m=a.milestones||{};
  const diagnostic=!!m.diagnostic_completed;
  const missionStarted=!!m.first_mission_started;
  const missionCompleted=!!m.first_mission_completed;
  const activated=diagnostic&&missionCompleted;
  const minutesToActivation=activated&&a.firstSeenAt
    ?Math.max(0,Math.round((m.first_mission_completed.at-a.firstSeenAt)/60000))
    :null;

  return {
    diagnostic,
    missionStarted,
    missionCompleted,
    activated,
    minutesToActivation
  };
}

export function productAnalyticsExport(state,{now=Date.now()}={}){
  const a=normalizeProductAnalytics(state);
  return {
    schema:"aplus-product-analytics-v1",
    exportedAt:new Date(now).toISOString(),
    firstSeenAt:a.firstSeenAt,
    firstSeenDay:a.firstSeenDay,
    lastSeenAt:a.lastSeenAt,
    activeDays:a.activeDays,
    appOpenCount:a.appOpenCount,
    milestones:a.milestones,
    funnel:funnelSummary(state),
    retention:retentionSummary(state,{now}),
    activation:activationSummary(state)
  };
}

export function migrateProductAnalytics(state){
  if(!state)return state;
  return withAnalytics(state,normalizeProductAnalytics(state));
}
