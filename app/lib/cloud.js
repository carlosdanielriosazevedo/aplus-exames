"use client";

import {createClient} from "@neondatabase/neon-js";
import {createInternalNeonAuth} from "@neondatabase/neon-js/auth";
import {BetterAuthReactAdapter} from "@neondatabase/neon-js/auth/react/adapters";
import {openVerifiedAccount,verifyAccountContext,assertAccountContext,assertAccountState,
  accountFetch,accountOwner,accountError,beginAccountMutation,endAccountMutation} from "./cloudAccountSession.js";

let authInternalSingleton=null;

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
  if(!cloudConfiguration().configured)return {configured:false,user:null,error:null};
  try{
    const accountContext=await openVerifiedAccount();
    return {configured:true,user:accountContext.user,accountContext,error:null};
  }catch(error){
    return {configured:true,user:null,error:String(error?.message||error)};
  }
}

export async function cloudSignIn({email,password}){
  const client=getCloudAuthClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const epoch=beginAccountMutation();
  let result;
  try{result=await client.signIn.email({email,password});}
  finally{endAccountMutation(epoch);}
  if(result?.error)throw new Error(result.error.message||"Não foi possível iniciar sessão.");
  await provisionServerIdentity();
  return result;
}

export async function cloudSignUp({name,email,password}){
  const client=getCloudAuthClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const epoch=beginAccountMutation();
  let result;
  try{result=await client.signUp.email({name,email,password});}
  finally{endAccountMutation(epoch);}
  if(result?.error)throw new Error(result.error.message||"Não foi possível criar a conta.");
  await provisionServerIdentity();
  return result;
}

export async function cloudSignOut(){
  const epoch=beginAccountMutation();
  const client=getCloudAuthClient();
  try{if(client)return await client.signOut();}
  finally{endAccountMutation(epoch);}
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

function cloudSchemaOutdated(error){
  const message=String(error?.message||error||"");
  return /revision|last_device_id/i.test(message) && /column|does not exist|schema/i.test(message);
}

function outdatedSchemaError(){
  const error=new Error("A cloud precisa da migration v4.9 antes de sincronizar com segurança.");
  error.code="CLOUD_SCHEMA_OUTDATED";
  return error;
}

async function operationAccount(accountContext,state=null){
  if(!cloudConfiguration().configured)throw new Error("Cloud ainda não configurada.");
  const owner=state?accountOwner(state):null;
  if(state&&!owner)throw accountError("CLOUD_ACCOUNT_UNPROVEN");
  const context=accountContext||await openVerifiedAccount({expectedAccountId:owner});
  if(state)assertAccountState(state,context);else assertAccountContext(context);
  await verifyAccountContext(context);
  return context;
}

// Main still uses Data API; #453 introduces this API. Only a genuine 404 may
// choose the legacy transport. An auth/network/schema error never falls back.
async function serverCloudRow(context){
  const response=await accountFetch(context,"/api/cloud/state",{method:"GET"});
  if(response.status===404)return {available:false};
  const body=await response.json().catch(()=>null);
  assertAccountContext(context);
  if(!response.ok||!body?.ok)throw accountError();
  return {available:true,data:body.data||null};
}
async function accountDataClient(context){
  const response=await accountFetch(context,"/api/auth/token",{method:"GET"});
  const body=await response.json().catch(()=>null);
  const token=body?.token||body?.data?.token;
  let subject;
  try{subject=JSON.parse(atob(token.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))).sub;}catch{}
  assertAccountContext(context);
  // This is an identity consistency check. Neon Data API verifies the JWT's
  // signature; decoding a payload does not authenticate it here.
  if(!response.ok||subject!==context.subject)throw accountError();
  // Freeze this token for this operation. A later session must never replace it.
  return createClient({dataApi:{url:cloudConfiguration().dataApiUrl,getToken:async()=>{
    assertAccountContext(context);return token;
  }}});
}
async function finishAccountOperation(context,result){
  await verifyAccountContext(context);
  return {...result,accountContext:context};
}
export async function loadStudentCloudState({accountContext=null}={}){
  const context=await operationAccount(accountContext);
  const api=await serverCloudRow(context);
  const row=api.available?api.data:await currentRemoteRow(await accountDataClient(context),context.subject);
  await verifyAccountContext(context);
  return row?{...row,accountContext:context}:null;
}

async function currentRemoteRow(client,authUserId){
  const result=await client
    .from("student_cloud_state")
    .select("state_json,updated_at,revision,last_device_id")
    .eq("auth_user_id",authUserId)
    .maybeSingle();

  if(result?.error){
    if(cloudSchemaOutdated(result.error))throw outdatedSchemaError();
    throw new Error(result.error.message||"Erro ao verificar revisão da cloud.");
  }
  return result?.data?{
    ...result.data,
    revision:Number(result.data.revision)||0,
    last_device_id:result.data.last_device_id||null
  }:null;
}

export async function saveStudentCloudState(s,{expectedRevision=0,deviceId=null,knownRemote=false,accountContext=null}={}){
  const snapshot=JSON.parse(JSON.stringify(s));
  const context=await operationAccount(accountContext,snapshot);
  const api=await serverCloudRow(context);
  if(api.available){
    const response=await accountFetch(context,"/api/cloud/state",{method:"POST",
      headers:{"Content-Type":"application/json"},body:JSON.stringify({
        operation:Number(expectedRevision)===0&&!knownRemote?"insert":"update",
        expectedRevision:Number(expectedRevision),state:studentStateForCloud(snapshot),deviceId
      })});
    const result=await response.json().catch(()=>null);
    if(!(response.status===409&&result?.conflict)&&(!response.ok||!result?.ok))throw accountError();
    return finishAccountOperation(context,result);
  }
  const client=await accountDataClient(context);

  const nextRevision=Math.max(0,Number(expectedRevision)||0)+1;
  const row={
    auth_user_id:context.subject,
    state_json:studentStateForCloud(snapshot),
    revision:nextRevision,
    last_device_id:deviceId||null,
    updated_at:new Date().toISOString()
  };

  if((Number(expectedRevision)||0)===0 && !knownRemote){
    const existing=await currentRemoteRow(client,context.subject);
    if(existing){
      return finishAccountOperation(context,{ok:false,conflict:true,remote:existing});
    }

    assertAccountContext(context);
    const inserted=await client
      .from("student_cloud_state")
      .insert(row)
      .select("updated_at,revision,last_device_id")
      .single();

    if(inserted?.error){
      if(cloudSchemaOutdated(inserted.error))throw outdatedSchemaError();
      const remote=await currentRemoteRow(client,context.subject);
      if(remote)return finishAccountOperation(context,{ok:false,conflict:true,remote});
      throw new Error(inserted.error.message||"Erro ao guardar progresso.");
    }
    return finishAccountOperation(context,{ok:true,conflict:false,data:inserted?.data||row});
  }

  assertAccountContext(context);
  const updated=await client
    .from("student_cloud_state")
    .update(row)
    .eq("auth_user_id",context.subject)
    .eq("revision",Number(expectedRevision)||0)
    .select("updated_at,revision,last_device_id")
    .maybeSingle();

  if(updated?.error){
    if(cloudSchemaOutdated(updated.error))throw outdatedSchemaError();
    throw new Error(updated.error.message||"Erro ao guardar progresso.");
  }

  if(!updated?.data){
    const remote=await currentRemoteRow(client,context.subject);
    return finishAccountOperation(context,{ok:false,conflict:true,remote});
  }

  return finishAccountOperation(context,{ok:true,conflict:false,data:updated.data});
}

export async function overwriteStudentCloudState(s,{remoteRevision,deviceId=null,accountContext=null}={}){
  return saveStudentCloudState(s,{
    expectedRevision:Number(remoteRevision)||0,
    deviceId,
    accountContext,
    knownRemote:true
  });
}
