"use client";
// Entrar com Google ou Microsoft (decisão do product owner, 2026-11-21).
//
// - Os botões só aparecem para os fornecedores listados em
//   NEXT_PUBLIC_APPROVA_SOCIAL_PROVIDERS (ex.: "google,microsoft"), depois de
//   configurados no Neon Auth. Sem a variável, nada muda.
// - Consentimento: o aluno confirma 13+ e aceita termos/privacidade ANTES de ir
//   para o Google/Microsoft. Como o email só é conhecido no regresso, a
//   confirmação fica pendente neste dispositivo e é registada (hash do email)
//   na primeira sessão, pelo mesmo caminho do registo por email.
// - No regresso, aplica-se a mesma separação por conta do login por email
//   (irmãos no mesmo dispositivo nunca se misturam).
import {queueSignupConsent,flushPendingConsent} from "./consentClient.js";
import {switchDeviceToAccount} from "./accountDeviceStorage.js";

export const SOCIAL_PENDING_KEY="approva-social-signin-v1";
export const SOCIAL_PROVIDERS=Object.freeze({
  google:{id:"google",label:"Continuar com Google"},
  microsoft:{id:"microsoft",label:"Continuar com Microsoft"}
});

export function enabledSocialProviders(raw=process.env.NEXT_PUBLIC_APPROVA_SOCIAL_PROVIDERS){
  return String(raw||"").split(",").map(v=>v.trim().toLowerCase()).filter((v,i,all)=>SOCIAL_PROVIDERS[v]&&all.indexOf(v)===i).map(v=>SOCIAL_PROVIDERS[v]);
}

export function markSocialSignInPending(provider,{storage=globalThis.localStorage,now=Date.now()}={}){
  try{storage?.setItem(SOCIAL_PENDING_KEY,JSON.stringify({provider,ageConfirmed:true,termsAccepted:true,at:now}))}catch{}
}

function readPending(storage){
  try{const v=JSON.parse(storage?.getItem(SOCIAL_PENDING_KEY)||"null");return v&&typeof v==="object"?v:null}catch{return null}
}

// Chamado quando há sessão verificada. Devolve {handled, reload}.
export async function completeSocialSignIn(user,{storage=globalThis.localStorage,now=Date.now(),switchDevice=switchDeviceToAccount,queue=queueSignupConsent,flush=flushPendingConsent}={}){
  const pending=readPending(storage);
  if(!pending||!user?.id)return {handled:false,reload:false};
  try{storage?.removeItem(SOCIAL_PENDING_KEY)}catch{}
  // Pedidos antigos (ex.: o aluno desistiu a meio) não valem como consentimento.
  if(!(pending.ageConfirmed&&pending.termsAccepted)||now-Number(pending.at||0)>60*60*1000)return {handled:false,reload:false};
  if(user.email){await queue(user.email,{storage});await flush({storage}).catch(()=>"kept")}
  const switched=switchDevice(String(user.id));
  return {handled:true,reload:!!switched?.reload};
}
