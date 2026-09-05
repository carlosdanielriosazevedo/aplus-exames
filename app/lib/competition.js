
import {localDayKey} from "./engagement.js";

export const LEAGUE_SIZE=20;
export const PROMOTION_COUNT=5;
export const DEMOTION_COUNT=3;
export const SCHOOL_MIN_PARTICIPANTS=10;
export const DISTRICT_MIN_PARTICIPANTS=20;

export const DIVISIONS=[
  {id:"bronze",label:"Bronze",icon:"🥉"},
  {id:"silver",label:"Prata",icon:"🥈"},
  {id:"gold",label:"Ouro",icon:"🥇"},
  {id:"platinum",label:"Platina",icon:"💠"},
  {id:"diamond",label:"Diamante",icon:"💎"}
];

export const PORTUGAL_REGIONS=[
  "Aveiro","Beja","Braga","Bragança","Castelo Branco","Coimbra","Évora","Faro",
  "Guarda","Leiria","Lisboa","Portalegre","Porto","Santarém","Setúbal",
  "Viana do Castelo","Vila Real","Viseu","Açores","Madeira"
];

const DEMO_NAMES=[
  "RaizQuadrada","Sigma17","CálculoZen","Integralista","PiRápido","DeltaX",
  "MatrizMestre","Limite99","FunçãoX","GeoNinja","Trigonometria","Expoente",
  "DerivaDor","Probabilista","ComplexoZ","VetorPro","LogNatural","Parábola",
  "Binómio","Assíntota","Secante","TangenteX","Omega12","NexoMath"
];

function hashString(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){
    h^=str.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

function seeded(seed){
  let x=seed>>>0;
  return ()=>{
    x=(Math.imul(x,1664525)+1013904223)>>>0;
    return x/4294967296;
  };
}

export function weekKey(at=Date.now()){
  const d=new Date(at);
  d.setHours(12,0,0,0);
  const day=d.getDay();
  const diff=day===0?-6:1-day;
  d.setDate(d.getDate()+diff);
  const y=d.getFullYear();
  const m=String(d.getMonth()+1).padStart(2,"0");
  const dd=String(d.getDate()).padStart(2,"0");
  return `${y}-${m}-${dd}`;
}

export function weekEndsAt(at=Date.now()){
  const start=new Date(`${weekKey(at)}T00:00:00`);
  const end=new Date(start);
  end.setDate(end.getDate()+7);
  return end.getTime();
}

export function daysUntilWeekEnd(at=Date.now()){
  return Math.max(0,Math.ceil((weekEndsAt(at)-at)/(24*60*60*1000)));
}

export function emptyCompetition(){
  return {
    version:1,
    division:"bronze",
    highestDivision:"bronze",
    profile:{
      nickname:null,
      region:null,
      school:null,
      schoolOptIn:false,
      districtOptIn:false
    },
    weeks:{},
    history:[]
  };
}

export function normalizeCompetition(state){
  const raw=state?.competition;
  if(raw?.version===1){
    return {
      ...emptyCompetition(),
      ...raw,
      profile:{...emptyCompetition().profile,...(raw.profile||{})},
      weeks:raw.weeks||{},
      history:raw.history||[]
    };
  }
  return emptyCompetition();
}

export function divisionInfo(id){
  return DIVISIONS.find(x=>x.id===id)||DIVISIONS[0];
}

export function nextDivision(id){
  const i=DIVISIONS.findIndex(x=>x.id===id);
  return DIVISIONS[Math.min(DIVISIONS.length-1,Math.max(0,i+1))];
}

export function previousDivision(id){
  const i=DIVISIONS.findIndex(x=>x.id===id);
  return DIVISIONS[Math.max(0,i-1)];
}

function activityKey(event){
  return event?.activityId||event?.sessionId||`${event?.kind||"study"}:${event?.at||Date.now()}`;
}

function trainingMultiplier(previousSameFocus){
  if(previousSameFocus<=0)return 1;
  if(previousSameFocus===1)return .70;
  if(previousSameFocus===2)return .40;
  if(previousSameFocus===3)return .20;
  return .10;
}

export function competitiveAward(state,event={}){
  const kind=event.kind||"study";
  const competition=normalizeCompetition(state);
  const wk=weekKey(event.at||Date.now());
  const week=competition.weeks?.[wk]||{xp:0,activities:[]};
  const day=localDayKey(event.at||Date.now());

  if(kind==="mission"){
    const already=week.activities?.some(a=>a.kind==="mission"&&a.day===day);
    return {
      raw:50,
      multiplier:already?0:1,
      awarded:already?0:50,
      reason:already?"Só a primeira Missão do dia conta para o ranking.":"Missão diária concluída."
    };
  }

  if(kind==="training"){
    const total=Math.max(0,Number(event.total)||0);
    const raw=Math.min(40,total*8);
    const focusKey=event.focusKey||"training:any";
    const previousSameFocus=(week.activities||[]).filter(a=>
      a.kind==="training"&&a.day===day&&a.focusKey===focusKey
    ).length;
    const multiplier=trainingMultiplier(previousSameFocus);
    return {
      raw,
      multiplier,
      awarded:Math.round(raw*multiplier),
      reason:multiplier===1
        ?"Treino variado com XP competitivo completo."
        :`Repetição do mesmo foco: multiplicador competitivo ×${String(multiplier).replace(".",",")}.`
    };
  }

  if(kind==="mini_exam"){
    const total=Math.max(0,Number(event.total)||0);
    const raw=Math.min(80,Math.max(40,total*8));
    return {raw,multiplier:1,awarded:raw,reason:"Mini-exame concluído."};
  }

  if(kind==="diagnostic"){
    const already=Object.values(competition.weeks||{}).some(w=>
      (w.activities||[]).some(a=>a.kind==="diagnostic")
    );
    return {
      raw:30,
      multiplier:already?0:1,
      awarded:already?0:30,
      reason:already?"O diagnóstico só dá XP competitivo uma vez.":"Primeiro diagnóstico concluído."
    };
  }

  return {raw:0,multiplier:0,awarded:0,reason:"Atividade sem XP competitivo."};
}

export function recordCompetitiveActivity(state,event={}){
  const at=event.at||Date.now();
  const wk=weekKey(at);
  const day=localDayKey(at);
  const competition=normalizeCompetition(state);
  const week=competition.weeks?.[wk]||{
    xp:0,
    activities:[],
    startedAt:at,
    lastAt:at
  };
  const key=activityKey(event);

  if((week.activities||[]).some(a=>a.key===key)){
    return {...state,competition};
  }

  const award=competitiveAward({...state,competition},event);
  const activity={
    key,
    kind:event.kind||"study",
    at,
    day,
    focusKey:event.focusKey||null,
    total:Number(event.total)||0,
    rawXp:award.raw,
    multiplier:award.multiplier,
    rankedXp:award.awarded,
    reason:award.reason
  };
  const nextWeek={
    ...week,
    xp:(week.xp||0)+award.awarded,
    activities:[...(week.activities||[]),activity].slice(-300),
    lastAt:at
  };

  return {
    ...state,
    competition:{
      ...competition,
      weeks:{...(competition.weeks||{}),[wk]:nextWeek}
    }
  };
}

export function weeklyCompetitiveXp(state,at=Date.now()){
  const c=normalizeCompetition(state);
  return c.weeks?.[weekKey(at)]?.xp||0;
}


export function latestCompetitiveActivity(state,at=Date.now()){
  const c=normalizeCompetition(state);
  const rows=c.weeks?.[weekKey(at)]?.activities||[];
  return [...rows].sort((a,b)=>(b.at||0)-(a.at||0))[0]||null;
}

export function competitionSummary(state,at=Date.now()){
  const c=normalizeCompetition(state);
  const wk=weekKey(at);
  const week=c.weeks?.[wk]||{xp:0,activities:[]};
  const d=divisionInfo(c.division);
  return {
    weekKey:wk,
    weekXp:week.xp||0,
    division:d,
    daysRemaining:daysUntilWeekEnd(at),
    activities:week.activities||[],
    nickname:c.profile?.nickname||null,
    profile:c.profile
  };
}

function demoScoreBand(userXp,divisionId){
  const idx=Math.max(0,DIVISIONS.findIndex(x=>x.id===divisionId));
  const baseline=[180,300,480,720,1050][idx]||180;
  return Math.max(baseline,userXp+120);
}

export function demoLeaderboard(state,{scope="league",at=Date.now(),size=LEAGUE_SIZE}={}){
  const summary=competitionSummary(state,at);
  const c=normalizeCompetition(state);
  const userName=c.profile?.nickname||"Tu";
  const seed=hashString(`${summary.weekKey}|${summary.division.id}|${scope}|leaderboard-v1`);
  const rnd=seeded(seed);
  const high=demoScoreBand(summary.weekXp,summary.division.id);

  const rows=[];
  for(let i=0;i<size-1;i++){
    const curve=1-(i/(size-1))*.82;
    const jitter=.78+rnd()*.38;
    const xp=Math.max(20,Math.round(high*curve*jitter/10)*10);
    rows.push({
      id:`demo-${scope}-${i}`,
      nickname:DEMO_NAMES[(i+Math.floor(rnd()*DEMO_NAMES.length))%DEMO_NAMES.length]+(rnd()>.78?String(10+Math.floor(rnd()*89)):""),
      xp,
      self:false,
      demo:true
    });
  }
  rows.push({
    id:"self",
    nickname:userName,
    xp:summary.weekXp,
    self:true,
    demo:false
  });

  rows.sort((a,b)=>b.xp-a.xp||a.nickname.localeCompare(b.nickname));
  return rows.map((r,i)=>({...r,position:i+1}));
}

export function leaderboardAroundUser(rows,radius=3){
  const i=rows.findIndex(x=>x.self);
  if(i<0)return rows.slice(0,7);
  const start=Math.max(0,Math.min(rows.length-(radius*2+1),i-radius));
  return rows.slice(start,start+radius*2+1);
}

export function leagueProjection(state,at=Date.now()){
  const rows=demoLeaderboard(state,{scope:"league",at});
  const self=rows.find(x=>x.self);
  if(!self)return null;
  const position=self.position;
  const division=competitionSummary(state,at).division;
  const top=position<=PROMOTION_COUNT;
  const bottom=position>LEAGUE_SIZE-DEMOTION_COUNT;
  const canPromote=division.id!=="diamond";
  const canDemote=division.id!=="bronze";

  let zone="stay";
  let message="Zona de manutenção";
  if(top&&canPromote){zone="promote";message=`Zona de subida para ${nextDivision(division.id).label}`;}
  else if(bottom&&canDemote){zone="demote";message=`Zona de descida para ${previousDivision(division.id).label}`;}
  else if(top&&!canPromote){zone="top";message="Topo da divisão máxima";}

  return {position,zone,message,rows};
}


export function applyLeagueOutcome(state,{week,position}={}){
  const c=normalizeCompetition(state);
  if(!week||!Number.isInteger(position)||position<1||position>LEAGUE_SIZE)return state;
  if((c.history||[]).some(x=>x.week===week))return {...state,competition:c};

  const current=divisionInfo(c.division);
  let next=current;
  let outcome="stay";

  if(position<=PROMOTION_COUNT&&current.id!=="diamond"){
    next=nextDivision(current.id);
    outcome="promoted";
  }else if(position>LEAGUE_SIZE-DEMOTION_COUNT&&current.id!=="bronze"){
    next=previousDivision(current.id);
    outcome="demoted";
  }

  const nextIndex=DIVISIONS.findIndex(x=>x.id===next.id);
  const highestIndex=DIVISIONS.findIndex(x=>x.id===c.highestDivision);
  return {
    ...state,
    competition:{
      ...c,
      division:next.id,
      highestDivision:DIVISIONS[Math.max(highestIndex,nextIndex)]?.id||c.highestDivision,
      history:[...(c.history||[]),{
        week,
        position,
        from:current.id,
        to:next.id,
        outcome,
        at:Date.now()
      }].slice(-100)
    }
  };
}

export function updateCompetitionProfile(state,patch={}){
  const c=normalizeCompetition(state);
  const nickname=patch.nickname!==undefined
    ?String(patch.nickname||"").trim().replace(/\s+/g," ").slice(0,24)
    :c.profile.nickname;
  return {
    ...state,
    competition:{
      ...c,
      profile:{
        ...c.profile,
        ...patch,
        nickname:nickname||null
      }
    }
  };
}

export function scopeAvailability(state,scope){
  const c=normalizeCompetition(state);
  if(scope==="league"||scope==="general"||scope==="year")return {available:true};
  if(scope==="district"){
    return c.profile.region&&c.profile.districtOptIn
      ?{available:true}
      :{available:false,reason:"Adiciona o distrito/região e ativa a participação opcional."};
  }
  if(scope==="school"){
    const schoolYear=["10.º","11.º","12.º","Já terminei o secundário"].includes(state?.profile?.schoolYear);
    return c.profile.school&&c.profile.schoolOptIn&&schoolYear
      ?{available:true}
      :{available:false,reason:"Indica o ano, adiciona a escola e ativa a participação opcional."};
  }
  return {available:false,reason:"Ranking indisponível."};
}

export function publicRankingFields(state){
  const c=normalizeCompetition(state);
  return {
    nickname:c.profile.nickname||null,
    schoolYear:state?.profile?.schoolYear||null,
    region:c.profile.districtOptIn?c.profile.region:null,
    school:c.profile.schoolOptIn?c.profile.school:null,
    division:c.division,
    weeklyXp:weeklyCompetitiveXp(state)
  };
}

export function migrateCompetition(state){
  if(!state)return state;
  return {
    ...state,
    competition:normalizeCompetition(state),
    competitionModelVersion:1
  };
}
