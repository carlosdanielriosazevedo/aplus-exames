
export const DEFAULT_DAILY_GOAL_XP=60;

export function localDayKey(at=Date.now()){
  const d=new Date(at);
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const day=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${day}`;
}

function utcDayNumber(dayKey){
  const [y,m,d]=String(dayKey||"").split("-").map(Number);
  if(!y||!m||!d)return null;
  return Math.floor(Date.UTC(y,m-1,d)/(24*60*60*1000));
}

export function dayGap(fromDay,toDay){
  const a=utcDayNumber(fromDay),b=utcDayNumber(toDay);
  if(a===null||b===null)return null;
  return b-a;
}

export function emptyEngagement(dailyGoalXp=DEFAULT_DAILY_GOAL_XP){
  return {
    version:1,
    dailyGoalXp,
    streak:0,
    longestStreak:0,
    lastActiveDay:null,
    activeDays:0,
    goalDays:0,
    days:{}
  };
}

export function normalizeEngagement(state){
  const raw=state?.engagement;
  if(raw?.version===1){
    return {
      ...emptyEngagement(raw.dailyGoalXp||DEFAULT_DAILY_GOAL_XP),
      ...raw,
      days:raw.days||{}
    };
  }

  // O streak antigo aumentava por Missão, não por dia. Não o transportamos
  // como sequência válida; guardamos apenas a referência para debug/migração.
  return {
    ...emptyEngagement(),
    legacyMissionStreak:Number(state?.streak)||0
  };
}

function activityKey(event){
  return event?.activityId || event?.sessionId || `${event?.kind||"study"}:${event?.at||Date.now()}`;
}

function completedDailyGoal(day,goalXp){
  return (day?.activities?.mission||0)>0
    ||(day?.activities?.mini_exam||0)>0
    ||(day?.activities?.diagnostic||0)>0
    ||(day?.xp||0)>=goalXp;
}

export function recordStudyActivity(state,event={}){
  const at=event.at||Date.now();
  const day=localDayKey(at);
  const engagement=normalizeEngagement(state);
  const key=activityKey(event);
  const previousDay=engagement.days?.[day]||{
    xp:0,
    activities:{},
    activityIds:[],
    firstAt:at,
    lastAt:at,
    goalComplete:false
  };

  if((previousDay.activityIds||[]).includes(key)){
    return {
      ...state,
      engagement,
      streak:engagement.streak
    };
  }

  const kind=event.kind||"study";
  const xpEarned=Math.max(0,Number(event.xpEarned)||0);
  const activities={
    ...(previousDay.activities||{}),
    [kind]:(previousDay.activities?.[kind]||0)+1
  };
  const nextDay={
    ...previousDay,
    xp:(previousDay.xp||0)+xpEarned,
    activities,
    activityIds:[...(previousDay.activityIds||[]),key].slice(-50),
    firstAt:Math.min(previousDay.firstAt||at,at),
    lastAt:Math.max(previousDay.lastAt||at,at)
  };
  nextDay.goalComplete=completedDailyGoal(nextDay,engagement.dailyGoalXp);

  const alreadyActive=engagement.lastActiveDay===day;
  let streak=engagement.streak||0;
  let activeDays=engagement.activeDays||0;
  let lastActiveDay=engagement.lastActiveDay;

  if(!alreadyActive){
    const gap=lastActiveDay?dayGap(lastActiveDay,day):null;
    if(gap===1)streak=Math.max(1,streak+1);
    else if(gap===0){}
    else streak=1;
    activeDays+=1;
    if(!lastActiveDay || (gap!==null && gap>=0))lastActiveDay=day;
  }

  const wasGoalComplete=previousDay.goalComplete===true;
  const goalDays=(engagement.goalDays||0)+(!wasGoalComplete&&nextDay.goalComplete?1:0);
  const nextEngagement={
    ...engagement,
    streak,
    longestStreak:Math.max(engagement.longestStreak||0,streak),
    lastActiveDay,
    activeDays,
    goalDays,
    days:{
      ...(engagement.days||{}),
      [day]:nextDay
    }
  };

  // Mantemos o campo top-level para compatibilidade de UI/cloud legada,
  // mas a autoridade passa a ser engagement.streak.
  return {
    ...state,
    engagement:nextEngagement,
    streak
  };
}

export function effectiveStreak(state,now=Date.now()){
  const e=normalizeEngagement(state);
  if(!e.lastActiveDay)return 0;
  const gap=dayGap(e.lastActiveDay,localDayKey(now));
  if(gap===null)return e.streak||0;
  if(gap<=1)return e.streak||0;
  return 0;
}


export function missionCompletedToday(state,now=Date.now()){
  const today=localDayKey(now);
  const historyHit=(state?.missionHistory||[]).some(m=>localDayKey(m?.at||0)===today);
  if(historyHit)return true;
  const e=normalizeEngagement(state);
  return (e.days?.[today]?.activities?.mission||0)>0;
}

export function todayMissionRecord(state,now=Date.now()){
  const today=localDayKey(now);
  return [...(state?.missionHistory||[])]
    .filter(m=>localDayKey(m?.at||0)===today)
    .sort((a,b)=>(b.at||0)-(a.at||0))[0]||null;
}

export function engagementSummary(state,now=Date.now()){
  const e=normalizeEngagement(state);
  const todayKey=localDayKey(now);
  const today=e.days?.[todayKey]||{xp:0,activities:{},goalComplete:false};
  const streak=effectiveStreak(state,now);
  const goalXp=e.dailyGoalXp||DEFAULT_DAILY_GOAL_XP;
  const xpRemaining=Math.max(0,goalXp-(today.xp||0));
  const missionDone=(today.activities?.mission||0)>0;
  const examDone=(today.activities?.mini_exam||0)>0;
  const diagnosticDone=(today.activities?.diagnostic||0)>0;
  const activeToday=(Object.values(today.activities||{}).reduce((a,b)=>a+b,0)>0);
  const dailyGoalComplete=completedDailyGoal(today,goalXp);

  let nudge;
  if(dailyGoalComplete){
    nudge={state:"complete",title:"Objetivo de hoje concluído",detail:"A sequência está protegida por hoje."};
  }else if(activeToday){
    nudge={
      state:"progress",
      title:"Já estudaste hoje",
      detail:missionDone||examDone||diagnosticDone
        ?"A atividade principal de hoje já está concluída."
        :`Faltam ${xpRemaining} XP ou uma Missão para completares o objetivo diário.`
    };
  }else if(streak>0){
    nudge={
      state:"at_risk",
      title:`🔥 ${streak} ${streak===1?"dia":"dias"} em sequência`,
      detail:"Faz uma sessão hoje para manter a sequência."
    };
  }else{
    nudge={state:"new",title:"Começa a sequência de hoje",detail:"Uma sessão concluída já conta como um dia de estudo."};
  }

  const last7=[];
  for(let offset=6;offset>=0;offset--){
    const d=new Date(now);
    d.setHours(12,0,0,0);
    d.setDate(d.getDate()-offset);
    const key=localDayKey(d.getTime());
    const row=e.days?.[key]||null;
    last7.push({
      key,
      active:!!row && Object.values(row.activities||{}).some(v=>v>0),
      goalComplete:!!row?.goalComplete,
      xp:row?.xp||0
    });
  }

  return {
    todayKey,
    today,
    streak,
    longestStreak:e.longestStreak||0,
    activeDays:e.activeDays||0,
    goalDays:e.goalDays||0,
    dailyGoalXp:goalXp,
    xpToday:today.xp||0,
    xpRemaining,
    dailyGoalComplete,
    activeToday,
    missionDone,
    nudge,
    last7
  };
}

export function migrateEngagement(state){
  if(!state)return state;
  const engagement=normalizeEngagement(state);
  return {
    ...state,
    engagement,
    streak:engagement.lastActiveDay?engagement.streak:0,
    engagementModelVersion:1
  };
}
