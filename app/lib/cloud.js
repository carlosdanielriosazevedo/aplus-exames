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
    schema:"aplus-student-state-v3",
    goal:s.goal,
    profile:s.profile,
    scores:s.scores,
    xp:s.xp,
    streak:s.streak,
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
    pedagogicalIdVersion:s.pedagogicalIdVersion||1
  };
}

export function mergeStudentCloudState(local,remote){
  if(!remote || !["aplus-student-state-v1","aplus-student-state-v2","aplus-student-state-v3"].includes(remote.schema))return local;
  return {
    ...local,
    goal:remote.goal??local.goal,
    profile:remote.profile??local.profile,
    scores:remote.scores??local.scores,
    xp:remote.xp??local.xp,
    streak:remote.streak??local.streak,
    diagnosticDone:remote.diagnosticDone??local.diagnosticDone,
    diagnosticAnswers:remote.diagnosticAnswers??local.diagnosticAnswers,
    missionHistory:remote.missionHistory??local.missionHistory,
    freeTrainingSignals:remote.freeTrainingSignals??local.freeTrainingSignals,
    examHistory:remote.examHistory??local.examHistory,
    lastMission:remote.lastMission??local.lastMission,
    lastExam:remote.lastExam??local.lastExam,
    betaParticipant:remote.betaParticipant??local.betaParticipant,
    learningHypotheses:remote.learningHypotheses??local.learningHypotheses,
    pedagogicalIdVersion:remote.pedagogicalIdVersion??local.pedagogicalIdVersion??1
  };
}

export async function loadStudentCloudState(){
  const client=getCloudClient();
  if(!client)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");

  const result=await client
    .from("student_cloud_state")
    .select("state_json,updated_at")
    .eq("auth_user_id",session.user.id)
    .maybeSingle();

  if(result?.error)throw new Error(result.error.message||"Erro ao carregar progresso.");
  return result?.data||null;
}

export async function saveStudentCloudState(s){
  const client=getCloudClient();
  if(!client)throw new Error("Cloud ainda não configurada.");
  const session=await getCloudSession();
  if(!session.user)throw new Error("É necessário iniciar sessão.");

  const row={
    auth_user_id:session.user.id,
    state_json:studentStateForCloud(s),
    updated_at:new Date().toISOString()
  };

  const result=await client
    .from("student_cloud_state")
    .upsert(row,{onConflict:"auth_user_id"})
    .select("updated_at")
    .single();

  if(result?.error)throw new Error(result.error.message||"Erro ao guardar progresso.");
  return result?.data||row;
}
