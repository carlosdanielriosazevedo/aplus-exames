"use client";

import {createClient} from "@neondatabase/neon-js";

let singleton=null;

export function cloudConfiguration(){
  const authUrl=process.env.NEXT_PUBLIC_NEON_AUTH_URL;
  const dataApiUrl=process.env.NEXT_PUBLIC_NEON_DATA_API_URL;
  return {
    configured:!!authUrl && !!dataApiUrl,
    authUrl:authUrl||null,
    dataApiUrl:dataApiUrl||null
  };
}

export function getCloudClient(){
  const cfg=cloudConfiguration();
  if(!cfg.configured)return null;
  if(singleton)return singleton;
  singleton=createClient({
    auth:{url:cfg.authUrl},
    dataApi:{url:cfg.dataApiUrl}
  });
  return singleton;
}

function unwrap(result){
  if(!result)return null;
  if(result.data!==undefined)return result.data;
  return result;
}

export async function getCloudSession(){
  const client=getCloudClient();
  if(!client)return {configured:false,user:null,error:null};
  try{
    const raw=await client.auth.getSession();
    const data=unwrap(raw);
    const user=data?.user || raw?.data?.user || null;
    return {configured:true,user,error:raw?.error||null,raw};
  }catch(error){
    return {configured:true,user:null,error:String(error?.message||error)};
  }
}

export async function cloudSignIn({email,password}){
  const client=getCloudClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const result=await client.auth.signIn.email({email,password});
  if(result?.error)throw new Error(result.error.message||"Não foi possível iniciar sessão.");
  return result;
}

export async function cloudSignUp({name,email,password}){
  const client=getCloudClient();
  if(!client)throw new Error("Neon Auth ainda não está configurado.");
  const result=await client.auth.signUp.email({name,email,password});
  if(result?.error)throw new Error(result.error.message||"Não foi possível criar a conta.");
  return result;
}

export async function cloudSignOut(){
  const client=getCloudClient();
  if(!client)return;
  return client.auth.signOut();
}

export function studentStateForCloud(s){
  return {
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
    evidenceModelVersion:2,
    pedagogicalIdVersion:s.pedagogicalIdVersion||1,
    pedagogicalMemoryVersion:s.pedagogicalMemoryVersion||2
  };
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

export async function loadStudentCloudState(){
  const client=getCloudClient();
  if(!client)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");

  const result=await client
    .from("student_cloud_state")
    .select("state_json,updated_at,revision,last_device_id")
    .eq("auth_user_id",session.user.id)
    .maybeSingle();

  if(result?.error){
    if(cloudSchemaOutdated(result.error))throw outdatedSchemaError();
    throw new Error(result.error.message||"Erro ao carregar progresso.");
  }
  if(!result?.data)return null;
  return {
    ...result.data,
    revision:Number(result.data.revision)||0,
    last_device_id:result.data.last_device_id||null
  };
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

export async function saveStudentCloudState(s,{expectedRevision=0,deviceId=null,knownRemote=false}={}){
  const client=getCloudClient();
  if(!client)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");

  const nextRevision=Math.max(0,Number(expectedRevision)||0)+1;
  const row={
    auth_user_id:session.user.id,
    state_json:studentStateForCloud(s),
    revision:nextRevision,
    last_device_id:deviceId||null,
    updated_at:new Date().toISOString()
  };

  // Revisão 0 pode significar duas coisas:
  // (a) este dispositivo nunca viu qualquer linha -> INSERT seguro;
  // (b) carregou uma linha legacy/migrada que ainda está na revisão 0 -> UPDATE CAS.
  if((Number(expectedRevision)||0)===0 && !knownRemote){
    const existing=await currentRemoteRow(client,session.user.id);
    if(existing){
      return {ok:false,conflict:true,remote:existing};
    }

    const inserted=await client
      .from("student_cloud_state")
      .insert(row)
      .select("updated_at,revision,last_device_id")
      .single();

    if(inserted?.error){
      if(cloudSchemaOutdated(inserted.error))throw outdatedSchemaError();
      const remote=await currentRemoteRow(client,session.user.id);
      if(remote)return {ok:false,conflict:true,remote};
      throw new Error(inserted.error.message||"Erro ao guardar progresso.");
    }
    return {ok:true,conflict:false,data:inserted?.data||row};
  }

  // Compare-and-swap: só atualiza se a revisão remota ainda for exatamente a
  // versão que este dispositivo tinha carregado/guardado, incluindo revision=0.
  const updated=await client
    .from("student_cloud_state")
    .update(row)
    .eq("auth_user_id",session.user.id)
    .eq("revision",Number(expectedRevision)||0)
    .select("updated_at,revision,last_device_id")
    .maybeSingle();

  if(updated?.error){
    if(cloudSchemaOutdated(updated.error))throw outdatedSchemaError();
    throw new Error(updated.error.message||"Erro ao guardar progresso.");
  }

  if(!updated?.data){
    const remote=await currentRemoteRow(client,session.user.id);
    return {ok:false,conflict:true,remote};
  }

  return {ok:true,conflict:false,data:updated.data};
}

export async function overwriteStudentCloudState(s,{remoteRevision,deviceId=null}={}){
  return saveStudentCloudState(s,{
    expectedRevision:Number(remoteRevision)||0,
    deviceId,
    knownRemote:true
  });
}
