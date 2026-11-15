"use client";

import {createInternalNeonAuth} from "@neondatabase/neon-js/auth";
import {BetterAuthReactAdapter} from "@neondatabase/neon-js/auth/react/adapters";

let authInternalSingleton=null;

export function cloudConfiguration(){
  // O progresso já não usa a Neon Data API a partir do browser: basta a
  // autenticação. As leituras/escritas passam por /api/cloud/state.
  const authUrl=process.env.NEXT_PUBLIC_NEON_AUTH_URL;
  return {
    configured:!!authUrl,
    authUrl:authUrl||null
  };
}

function browserAuthUrl(fallback){
  if(typeof window==="undefined")return fallback;
  return `${window.location.origin}/api/auth`;
}

function getInternalAuth(){
  const cfg=cloudConfiguration();
  if(!cfg.configured)return null;
  if(authInternalSingleton)return authInternalSingleton;
  authInternalSingleton=createInternalNeonAuth(browserAuthUrl(cfg.authUrl),{
    adapter:BetterAuthReactAdapter()
  });
  return authInternalSingleton;
}

export function getCloudAuthClient(){
  return getInternalAuth()?.adapter||null;
}

function unwrap(result){
  if(!result)return null;
  if(result.data!==undefined)return result.data;
  return result;
}

async function provisionServerIdentity(){
  try{
    const response=await fetch("/api/auth/session",{
      method:"GET",
      credentials:"include",
      cache:"no-store"
    });
    if(!response.ok){
      const body=await response.json().catch(()=>null);
      return {ok:false,status:response.status,error:body?.error||"IDENTITY_PROVISION_FAILED"};
    }
    return await response.json();
  }catch(error){
    return {ok:false,status:0,error:String(error?.message||error)};
  }
}

export async function getCloudSession(){
  const client=getCloudAuthClient();
  if(!client)return {configured:false,user:null,error:null};
  try{
    const raw=await client.getSession();
    const data=unwrap(raw);
    const user=data?.user || raw?.data?.user || null;
    const identity=user ? await provisionServerIdentity() : null;
    return {configured:true,user,error:raw?.error||null,raw,identity};
  }catch(error){
    return {configured:true,user:null,error:String(error?.message||error)};
  }
}

export async function cloudSignIn({email,password}){
  const client=getCloudAuthClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const result=await client.signIn.email({email,password});
  if(result?.error)throw new Error(result.error.message||"Não foi possível iniciar sessão.");
  await provisionServerIdentity();
  return result;
}

export async function cloudSignUp({name,email,password}){
  const client=getCloudAuthClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const result=await client.signUp.email({name,email,password});
  if(result?.error)throw new Error(result.error.message||"Não foi possível criar a conta.");
  await provisionServerIdentity();
  return result;
}

export async function cloudSignOut(){
  const client=getCloudAuthClient();
  if(!client)return;
  return client.signOut();
}

const STUDENT_RESPONSE_TEXT_KEYS=new Set([
  "answers","answer","currentAnswer","responseText","previousResponseText","studentEvidence"
]);

function stripStudentResponseText(value){
  if(Array.isArray(value))return value.map(stripStudentResponseText);
  if(!value||typeof value!=="object")return value;
  return Object.fromEntries(Object.entries(value)
    .filter(([key])=>!STUDENT_RESPONSE_TEXT_KEYS.has(key))
    .map(([key,nested])=>[key,stripStudentResponseText(nested)]));
}

export function studentStateForCloud(s){
  return stripStudentResponseText({
    schema:"aplus-student-state-v8",
    goal:s.goal,
    profile:s.profile,
    scores:s.scores,
    xp:s.xp,
    streak:s.streak,
    engagement:s.engagement||null,
    engagementModelVersion:s.engagementModelVersion||1,
    competition:s.competition||null,
    competitionModelVersion:s.competitionModelVersion||1,
    dailyMission:s.dailyMission||null,
    dailyMissionModelVersion:s.dailyMissionModelVersion||1,
    diagnosticDone:s.diagnosticDone,
    diagnosticAnswers:s.diagnosticAnswers,
    missionHistory:s.missionHistory||[],
    freeTrainingSignals:s.freeTrainingSignals||[],
    examHistory:s.examHistory||[],
    lastMission:s.lastMission||null,
    lastExam:s.lastExam||null,
    betaParticipant:s.betaParticipant||null,
    learningHypotheses:s.learningHypotheses||[],
    subjectProgress:s.subjectProgress||{},
    subjectProgressModelVersion:s.subjectProgressModelVersion||4,
    evidenceModelVersion:2,
    pedagogicalIdVersion:s.pedagogicalIdVersion||1,
    pedagogicalMemoryVersion:s.pedagogicalMemoryVersion||2
  });
}

export function mergeStudentCloudState(local,remote){
  if(!remote || !["aplus-student-state-v1","aplus-student-state-v2","aplus-student-state-v3","aplus-student-state-v4","aplus-student-state-v5","aplus-student-state-v6","aplus-student-state-v7","aplus-student-state-v8"].includes(remote.schema))return local;
  return {
    ...local,
    goal:remote.goal??local.goal,
    profile:remote.profile??local.profile,
    scores:remote.scores??local.scores,
    xp:remote.xp??local.xp,
    streak:remote.streak??local.streak,
    engagement:remote.engagement??local.engagement,
    engagementModelVersion:remote.engagementModelVersion??local.engagementModelVersion??1,
    competition:remote.competition??local.competition,
    competitionModelVersion:remote.competitionModelVersion??local.competitionModelVersion??1,
    dailyMission:remote.dailyMission??local.dailyMission,
    dailyMissionModelVersion:remote.dailyMissionModelVersion??local.dailyMissionModelVersion??1,
    diagnosticDone:remote.diagnosticDone??local.diagnosticDone,
    diagnosticAnswers:remote.diagnosticAnswers??local.diagnosticAnswers,
    missionHistory:remote.missionHistory??local.missionHistory,
    freeTrainingSignals:remote.freeTrainingSignals??local.freeTrainingSignals,
    examHistory:remote.examHistory??local.examHistory,
    lastMission:remote.lastMission??local.lastMission,
    lastExam:remote.lastExam??local.lastExam,
    betaParticipant:remote.betaParticipant??local.betaParticipant,
    learningHypotheses:remote.learningHypotheses??local.learningHypotheses,
    subjectProgress:remote.subjectProgress??local.subjectProgress,
    subjectProgressModelVersion:remote.subjectProgressModelVersion??local.subjectProgressModelVersion??4,
    pedagogicalIdVersion:remote.pedagogicalIdVersion??local.pedagogicalIdVersion??1,
    pedagogicalMemoryVersion:remote.pedagogicalMemoryVersion??local.pedagogicalMemoryVersion??2
  };
}

// O cliente nunca envia INSERT/UPDATE/DELETE diretos à base de dados. O servidor
// autentica o cookie, deriva o dono da linha da sessão e faz o CAS da revisão.
async function callCloudStateApi(method,payload=null){
  let response;
  try{
    response=await fetch("/api/cloud/state",{
      method,
      credentials:"include",
      cache:"no-store",
      ...(payload?{headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}:{})
    });
  }catch{
    throw Object.assign(new Error("Sem ligação. O progresso continua guardado neste dispositivo."),{code:"CLOUD_NETWORK_ERROR",retryable:true});
  }
  const result=await response.json().catch(()=>null);
  if(response.status===409&&result?.conflict)return result;
  if(!response.ok||!result?.ok){
    const code=result?.code||result?.error||"CLOUD_SYNC_FAILED";
    const retryable=response.status>=500||response.status===429;
    throw Object.assign(new Error(code==="CLOUD_SNAPSHOT_RECOVERY_REQUIRED"
      ?"O progresso guardado online precisa de revisão. Os dados originais foram preservados."
      :"Não foi possível sincronizar o progresso. Verifica a sessão e tenta novamente."),{code,status:response.status,retryable});
  }
  return result;
}

function normalizeRow(row){
  if(!row)return null;
  return {...row,revision:Number(row.revision)||0,last_device_id:row.last_device_id||null};
}

export async function loadStudentCloudState(){
  if(!cloudConfiguration().configured)throw new Error("Cloud ainda não configurada.");
  const result=await callCloudStateApi("GET");
  return normalizeRow(result.data);
}

export async function saveStudentCloudState(s,{expectedRevision=0,deviceId=null,knownRemote=false}={}){
  if(!cloudConfiguration().configured)throw new Error("Cloud ainda não configurada.");
  const revision=Math.max(0,Number(expectedRevision)||0);
  // Só o servidor decide o dono e incrementa a revisão de forma atómica.
  const result=await callCloudStateApi("POST",{
    operation:revision===0&&!knownRemote?"insert":"update",
    expectedRevision:revision,
    state:studentStateForCloud(s),
    deviceId:deviceId||null
  });
  if(result.conflict)return {ok:false,conflict:true,remote:normalizeRow(result.remote)};
  return {ok:true,conflict:false,data:result.data};
}

export async function overwriteStudentCloudState(s,{remoteRevision,deviceId=null}={}){
  return saveStudentCloudState(s,{
    expectedRevision:Number(remoteRevision)||0,
    deviceId,
    knownRemote:true
  });
}
