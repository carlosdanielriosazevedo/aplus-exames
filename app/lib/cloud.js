"use client";

import {createClient} from "@neondatabase/neon-js";
import {createInternalNeonAuth} from "@neondatabase/neon-js/auth";
import {BetterAuthReactAdapter} from "@neondatabase/neon-js/auth/react/adapters";
import {assertCloudSnapshot,snapshotError} from "./cloudSnapshotValidation.js";

let authInternalSingleton=null;
let dataSingleton=null;

export function cloudConfiguration(){
  const authUrl=process.env.NEXT_PUBLIC_NEON_AUTH_URL;
  const dataApiUrl=process.env.NEXT_PUBLIC_NEON_DATA_API_URL;
  return {
    configured:!!authUrl && !!dataApiUrl,
    authUrl:authUrl||null,
    dataApiUrl:dataApiUrl||null
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

async function currentDataApiJwt(){
  if(typeof window==="undefined")return null;
  try{
    const response=await fetch("/api/auth/token",{
      method:"GET",
      credentials:"include",
      cache:"no-store"
    });
    if(!response.ok)return null;
    const body=await response.json().catch(()=>null);
    const token=body?.token||body?.data?.token||null;
    return typeof token==="string" && token.split(".").length===3 ? token : null;
  }catch{
    return null;
  }
}

export function getCloudClient(){
  const cfg=cloudConfiguration();
  if(!cfg.configured)return null;
  if(dataSingleton)return dataSingleton;
  dataSingleton=createClient({
    dataApi:{
      url:cfg.dataApiUrl,
      getToken:currentDataApiJwt
    }
  });
  return dataSingleton;
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
  assertCloudSnapshot(s,{local:true,privateFields:false});
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
  if(!remote)return local;
  assertCloudSnapshot(local,{local:true,privateFields:false});
  assertCloudSnapshot(remote,{legacy:true,privateFields:false});
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

// The client never sends direct Data API INSERT/UPDATE/DELETE for cloud state.
// The server authenticates the cookie and supplies the row owner from the session.
async function callCloudStateApi(method,payload=null){
  const response=await fetch("/api/cloud/state",{
    method,
    credentials:"include",
    cache:"no-store",
    ...(payload?{
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(payload)
    }:{})
  });
  const result=await response.json().catch(()=>null);
  if(response.status===409&&result?.conflict)return result;
  if(!response.ok||!result?.ok){
    if(result?.code==="CLOUD_SNAPSHOT_RECOVERY_REQUIRED")throw snapshotError();
    throw new Error("Não foi possível sincronizar o progresso. Verifica a sessão e tenta novamente.");
  }
  return result;
}

export async function loadStudentCloudState(){
  if(!cloudConfiguration().configured)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");
  const result=await callCloudStateApi("GET");
  if(!result.data)return null;
  assertCloudSnapshot(result.data.state_json,{legacy:true,privateFields:false});
  return {
    ...result.data,
    revision:Number(result.data.revision)||0,
    last_device_id:result.data.last_device_id||null
  };
}

export async function saveStudentCloudState(s,{expectedRevision=0,deviceId=null,knownRemote=false,recovery=null}={}){
  if(!cloudConfiguration().configured)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");
  const revision=Number(expectedRevision);
  // Only the server decides the owner and increments revision atomically.
  return callCloudStateApi("POST",{
    operation:revision===0&&!knownRemote?"insert":"update",
    expectedRevision:revision,
    state:studentStateForCloud(s),
    deviceId,...(recovery?{recovery}:{})
  });
}

export async function verifyRecoveryAccount(accountId){
  const response=await fetch("/api/auth/session",{credentials:"include",cache:"no-store"});
  const session=await response.json().catch(()=>null);
  if(!response.ok||!session?.ok||!accountId||session.user?.id!==accountId)throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");
}
export async function exportStudentCloudOriginal(accountId){
  await verifyRecoveryAccount(accountId);
  const response=await fetch("/api/cloud/state?recovery=original&account="+encodeURIComponent(accountId),{credentials:"include",cache:"no-store"});
  if(!response.ok)throw snapshotError("CLOUD_RECOVERY_EXPORT_FAILED");
  const original=await response.json();
  if(original?.format!=="aplus-cloud-recovery-v1"||!original.data||original.accountId!==accountId)throw snapshotError("CLOUD_RECOVERY_EXPORT_FAILED");
  await verifyRecoveryAccount(accountId);
  return original;
}

export async function overwriteStudentCloudState(s,{remoteRevision,deviceId=null}={}){
  return saveStudentCloudState(s,{
    expectedRevision:Number(remoteRevision)||0,
    deviceId,
    knownRemote:true
  });
}
