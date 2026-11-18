import {createHash} from "node:crypto";
import {FUNNEL_SERVER_STEPS,FUNNEL_SOURCES} from "../funnel.js";

const STEPS=new Set(FUNNEL_SERVER_STEPS);
export function validateFunnelStep(payload){
  if(!payload||typeof payload!=="object"||Array.isArray(payload))return {ok:false,code:"INVALID_FUNNEL"};
  if(Object.keys(payload).some(key=>key!=="step"&&key!=="source"))return {ok:false,code:"UNKNOWN_FUNNEL_FIELD"};
  if(!STEPS.has(payload.step))return {ok:false,code:"INVALID_FUNNEL_STEP"};
  // Clientes antigos não enviam origem → "direto". Valores fora da lista fechada são recusados.
  const source=payload.source===undefined?"direto":payload.source;
  if(!FUNNEL_SOURCES.includes(source))return {ok:false,code:"INVALID_FUNNEL_SOURCE"};
  return {ok:true,step:payload.step,source};
}

// Limite anti-abuso em memória da instância; o IP é usado só como chave efémera
// com hash e nunca é guardado.
const WINDOW_MS=60*60*1000,LIMIT=60,buckets=new Map();
export function funnelRateAllowed(ip,now=Date.now()){
  const key=createHash("sha256").update(String(ip||"unknown")).digest("hex").slice(0,24);
  const row=buckets.get(key);
  if(!row||now-row.startedAt>=WINDOW_MS)buckets.set(key,{startedAt:now,count:1});else row.count++;
  if(buckets.size>5000)for(const [k,r] of buckets)if(now-r.startedAt>=WINDOW_MS)buckets.delete(k);
  return buckets.get(key).count<=LIMIT;
}
export function resetFunnelRateLimit(){buckets.clear()}

export async function incrementFunnel(sql,step,source="direto"){
  await sql`
    insert into public.funnel_daily(day,step,source,count)
    values ((now() at time zone 'Europe/Lisbon')::date,${step},${source},1)
    on conflict (day,step,source) do update set count=public.funnel_daily.count+1
  `;
}
