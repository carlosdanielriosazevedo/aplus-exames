"use client";
// Prova de consentimento do registo. O registo pode exigir confirmação de email
// (sem sessão logo a seguir), por isso o pedido fica pendente neste dispositivo
// e é enviado na primeira sessão com o MESMO email. Só se guarda o hash do email.
import {TERMS_VERSION,PRIVACY_VERSION} from "./legalVersions.js";

export const PENDING_CONSENT_KEY="approva-pending-consent-v1";

async function sha256Hex(text){
  const data=new TextEncoder().encode(String(text||"").trim().toLowerCase());
  const digest=await crypto.subtle.digest("SHA-256",data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

export async function queueSignupConsent(email,{storage=globalThis.localStorage}={}){
  const pending={termsVersion:TERMS_VERSION,privacyVersion:PRIVACY_VERSION,ageConfirmed:true,termsAccepted:true,emailHash:await sha256Hex(email)};
  try{storage?.setItem(PENDING_CONSENT_KEY,JSON.stringify(pending))}catch{}
  return pending;
}

// Devolve "sent", "none", "kept" (tentar mais tarde) ou "dropped" (recusado).
export async function flushPendingConsent({storage=globalThis.localStorage,fetchImpl=globalThis.fetch}={}){
  let pending=null;
  try{pending=JSON.parse(storage?.getItem(PENDING_CONSENT_KEY)||"null")}catch{}
  if(!pending)return "none";
  let response;
  try{
    response=await fetchImpl("/api/account/consent",{method:"POST",credentials:"include",cache:"no-store",
      headers:{"Content-Type":"application/json"},body:JSON.stringify(pending)});
  }catch{return "kept"}
  // 400: versão antiga, outro email ou pedido inválido → não insistir.
  if(response.ok||response.status===400){try{storage?.removeItem(PENDING_CONSENT_KEY)}catch{}return response.ok?"sent":"dropped"}
  return "kept";
}
