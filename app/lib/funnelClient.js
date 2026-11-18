"use client";
import {FUNNEL_SENT_KEY,FUNNEL_SOURCE_KEY,normalizeFunnelSource,pendingFunnelSteps,sourceFromUrl} from "./funnel.js";

// Guarda a origem do primeiro contacto (ex.: ?utm_source=instagram). Só a
// primeira conta: visitas seguintes não a substituem.
export function captureFunnelSource({storage=globalThis.localStorage,href=globalThis.location?.href}={}){
  try{
    if(!storage||storage.getItem(FUNNEL_SOURCE_KEY))return;
    const source=sourceFromUrl(href);
    storage.setItem(FUNNEL_SOURCE_KEY,source||"direto");
  }catch{}
}
function readSource(storage){try{return normalizeFunnelSource(storage?.getItem(FUNNEL_SOURCE_KEY))}catch{return "direto"}}

let inFlight=false;
function readSent(storage){try{const v=JSON.parse(storage?.getItem(FUNNEL_SENT_KEY)||"[]");return Array.isArray(v)?v:[]}catch{return []}}

// Envia os passos ainda não contados deste dispositivo. Falhas ficam para depois.
export async function flushFunnel(s,{storage=globalThis.localStorage,fetchImpl=globalThis.fetch}={}){
  if(inFlight||!storage||!fetchImpl)return 0;
  // Sem rede: nem tentar (evita erros de rede na consola); fica para depois.
  if(globalThis.navigator&&globalThis.navigator.onLine===false)return 0;
  inFlight=true;
  let sentNow=0;
  try{
    captureFunnelSource({storage});
    const sent=readSent(storage);
    const source=readSource(storage);
    for(const step of pendingFunnelSteps(s,sent)){
      let ok=false;
      try{
        const response=await fetchImpl("/api/funnel",{method:"POST",cache:"no-store",keepalive:true,
          headers:{"Content-Type":"application/json"},body:JSON.stringify({step,source})});
        if(response.status===400)ok=true; // passo inválido: não insistir
        else if(response.ok){const body=await response.json().catch(()=>null);ok=body?.recorded!==false}
      }catch{ok=false}
      if(!ok)break;
      sent.push(step);sentNow++;
      try{storage.setItem(FUNNEL_SENT_KEY,JSON.stringify(sent))}catch{}
    }
  }finally{inFlight=false}
  return sentNow;
}
