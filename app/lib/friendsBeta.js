
import {betaSummary,exportBetaPayload} from "./beta.js";

export const FRIENDS_BETA_MODE="friends_beta";
export const FRIENDS_BETA_COHORT="Amigos · teste de experiência";

export const TESTER_SEGMENTS={
  student:{
    label:"Aluno do secundário",
    short:"Aluno",
    group:"target",
    description:"Estou atualmente no 10.º, 11.º ou 12.º ano."
  },
  recent_student:{
    label:"Terminei o secundário há pouco tempo",
    short:"Ex-aluno recente",
    group:"near_target",
    description:"Ainda tenho experiência recente com os Exames Nacionais."
  },
  parent:{
    label:"Pai / Mãe",
    short:"Pai/Mãe",
    group:"buyer",
    description:"Estou a avaliar a ideia sobretudo na perspetiva de quem acompanha um aluno."
  },
  observer:{
    label:"Observador adulto",
    short:"Observador",
    group:"observer",
    description:"Já fiz os exames há vários anos e estou sobretudo a testar o conceito e a experiência."
  }
};

export function friendsBetaRequested(search=""){
  try{
    return new URLSearchParams(String(search||"")).get("beta")==="friends";
  }catch{return false}
}

function randomPart(){
  return Math.random().toString(36).replace(/[^a-z0-9]/gi,"").slice(2,8).toUpperCase().padEnd(6,"X");
}

export function createFriendsBetaCode(){
  return `AMG-${randomPart()}`;
}

export function testerSegmentInfo(segment){
  return TESTER_SEGMENTS[segment]||{
    label:"Perfil não indicado",
    short:"Sem perfil",
    group:"unknown",
    description:""
  };
}

export function testerFit(segment){
  const info=testerSegmentInfo(segment);
  if(info.group==="target")return "target";
  if(info.group==="near_target")return "near_target";
  if(info.group==="buyer")return "buyer";
  return "observer";
}

export function activateFriendsBeta(state,now=Date.now()){
  const current=state?.betaParticipant?.code||"";
  const keepCode=state?.betaMode===FRIENDS_BETA_MODE && /^AMG-[A-Z0-9]{6}$/.test(current);
  const code=keepCode?current:createFriendsBetaCode();

  return {
    ...(state||{}),
    betaMode:FRIENDS_BETA_MODE,
    betaParticipant:{
      ...(state?.betaParticipant||{}),
      code,
      cohort:FRIENDS_BETA_COHORT
    },
    betaTesterMeta:{
      ...(state?.betaTesterMeta||{}),
      mode:FRIENDS_BETA_MODE,
      startedAt:state?.betaTesterMeta?.startedAt||now,
      purpose:"ux_experience",
      contentStatus:"unreviewed_provisional"
    }
  };
}

export function setFriendsBetaSegment(state,segment,now=Date.now()){
  const active=activateFriendsBeta(state,now);
  const safe=TESTER_SEGMENTS[segment]?segment:null;
  return {
    ...active,
    betaTesterMeta:{
      ...(active.betaTesterMeta||{}),
      segment:safe,
      segmentGroup:safe?testerSegmentInfo(safe).group:"unknown",
      targetFit:safe?testerFit(safe):"unknown"
    }
  };
}

export function markFriendsBetaConsent(state,{segment=null,now=Date.now()}={}){
  const active=segment?setFriendsBetaSegment(state,segment,now):activateFriendsBeta(state,now);
  return {
    ...active,
    betaTesterMeta:{
      ...(active.betaTesterMeta||{}),
      consentAt:active.betaTesterMeta?.consentAt||now
    }
  };
}

export function isFriendsBeta(state){
  return state?.betaMode===FRIENDS_BETA_MODE;
}

export function currentTesterSegment(state){
  return state?.betaTesterMeta?.segment||null;
}

export function effectiveTesterFit(state){
  const segment=currentTesterSegment(state);
  if(segment==="student"){
    return ["10.º","11.º","12.º"].includes(state?.profile?.schoolYear)?"target":"near_target";
  }
  return testerFit(segment);
}

export function isTargetStudentTester(state){
  return effectiveTesterFit(state)==="target";
}

export function friendsFeedbackSummary(state){
  const rows=state?.betaFeedback||[];
  const avg=key=>{
    const vals=rows.map(x=>Number(x[key])).filter(Number.isFinite);
    return vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length*10)/10:null;
  };
  return {
    count:rows.length,
    clarity:avg("clarity"),
    difficultyFit:avg("difficultyFit"),
    usefulness:avg("usefulness"),
    personalization:avg("personalization"),
    returnIntent:avg("returnIntent")
  };
}


function average(values){
  const xs=(values||[]).map(Number).filter(Number.isFinite);
  return xs.length?Math.round(xs.reduce((a,b)=>a+b,0)/xs.length*10)/10:null;
}

export function aggregateFriendsBetaReports(reports=[]){
  const valid=(reports||[]).filter(r=>["aplus-friends-beta-v2","aplus-friends-beta-v3"].includes(r?.schema));
  const groups=["target","near_target","buyer","observer"];

  function retention(rows,key){
    const checkpoints=rows
      .map(r=>r?.productAnalytics?.retention?.[key])
      .filter(x=>x?.eligible===true);
    const retained=checkpoints.filter(x=>x.retained===true).length;
    return {
      eligible:checkpoints.length,
      retained,
      rate:checkpoints.length?Math.round(retained/checkpoints.length*100):null
    };
  }

  function summarize(rows){
    const feedback=rows.flatMap(r=>r.feedback||[]);
    const sessions=rows.flatMap(r=>r.sessions||[]);
    const finished=sessions.filter(x=>x.finishedAt);
    const starts=rows.reduce((n,r)=>n+(r.summary?.started||0),0);
    const finishes=rows.reduce((n,r)=>n+(r.summary?.finished||0),0);
    const analyticsRows=rows.filter(r=>r?.productAnalytics);
    const activated=analyticsRows.filter(r=>r.productAnalytics?.activation?.activated).length;
    return {
      testers:rows.length,
      sessions:finished.length,
      sessionsPerTester:rows.length?Math.round(finished.length/rows.length*10)/10:0,
      completionRate:starts?Math.round(finishes/starts*100):0,
      clarity:average(feedback.map(x=>x.clarity)),
      difficultyFit:average(feedback.map(x=>x.difficultyFit)),
      usefulness:average(feedback.map(x=>x.usefulness)),
      personalization:average(feedback.map(x=>x.personalization)),
      returnIntent:average(feedback.map(x=>x.returnIntent)),
      activation:{
        eligible:analyticsRows.length,
        activated,
        rate:analyticsRows.length?Math.round(activated/analyticsRows.length*100):null
      },
      d1:retention(rows,"d1"),
      d3:retention(rows,"d3"),
      d7:retention(rows,"d7"),
      reports:rows.reduce((n,r)=>n+(r.contentReports||[]).length,0)
    };
  }

  const byFit=Object.fromEntries(groups.map(group=>[
    group,
    summarize(valid.filter(r=>r?.testerMeta?.targetFit===group))
  ]));

  return {
    validReports:valid.length,
    rejectedReports:(reports||[]).length-valid.length,
    overall:summarize(valid),
    byFit
  };
}

export function friendsBetaReport(state){
  const payload=exportBetaPayload(state);
  const segment=currentTesterSegment(state);
  return {
    ...payload,
    schema:"aplus-friends-beta-v3",
    mode:FRIENDS_BETA_MODE,
    disclaimer:"Teste de experiência. Conteúdo ainda em revisão pedagógica; índices e níveis são provisórios.",
    summary:betaSummary(state),
    experienceSummary:friendsFeedbackSummary(state),
    testerMeta:{
      startedAt:state?.betaTesterMeta?.startedAt||null,
      consentAt:state?.betaTesterMeta?.consentAt||null,
      segment,
      segmentLabel:testerSegmentInfo(segment).label,
      segmentGroup:testerSegmentInfo(segment).group,
      targetFit:effectiveTesterFit(state),
      schoolYear:state?.profile?.schoolYear||null,
      appVersion:"5.5.0"
    }
  };
}
