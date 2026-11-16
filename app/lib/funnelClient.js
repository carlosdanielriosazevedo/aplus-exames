"use client";
import {FUNNEL_SENT_KEY,pendingFunnelSteps} from "./funnel.js";

let inFlight=false;
function readSent(storage){try{const v=JSON.parse(storage?.getItem(FUNNEL_SENT_KEY)||"[]");return Array.isArray(v)?v:[]}catch{return []}}

// Envia os passos ainda não contados deste dispositivo. Falhas ficam para depois.
export async function flushFunnel(s,{storage=globalThis.localStorage,fetchImpl=globalThis.fetch}={}){
  if(inFlight||!storage||!fetchImpl)return 0;
  inFlight=true;
  let sentNow=0;
  try{
    const sent=readSent(storage);
    for(const step of pendingFunnelSteps(s,sent)){
      let ok=false;
      try{
        const response=await fetchImpl("/api/funnel",{method:"POST",cache:"no-store",keepalive:true,
          headers:{"Content-Type":"application/json"},body:JSON.stringify({step})});
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
