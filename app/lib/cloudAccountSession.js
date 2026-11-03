// Account identity comes only from the server-verified session endpoint.
// Persisted identity labels and unverified JWT payloads are never login proofs.
export const ACCOUNT_HEADER="x-approva-account";
const EPOCH_KEY="a25-cloud-auth-epoch-v1";
const proofs=new WeakSet();
const listeners=new Set();
const controllers=new Set();
let memoryRecord={epoch:"initial",subject:null,changing:false};
let listening=false;
let generation=0;
let latestProof=null;

export function accountError(code="CLOUD_ACCOUNT_CHANGED"){
  return Object.assign(new Error(code==="CLOUD_ACCOUNT_UNPROVEN"
    ?"Este progresso foi preservado separadamente porque a conta de origem não está confirmada."
    :"A conta mudou. O progresso foi preservado; confirma a sessão antes de sincronizar."),{code});
}
function nonce(){return globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`;}
function record(){
  try{
    const value=JSON.parse(globalThis.localStorage?.getItem(EPOCH_KEY)||"null");
    return value&&typeof value.epoch==="string"?value:memoryRecord;
  }catch{return memoryRecord;}
}
function changed(){
  generation++;
  for(const c of controllers)c.abort();
  controllers.clear();
  for(const notify of listeners)notify();
}
function publish(subject,changing=false){
  memoryRecord={epoch:nonce(),subject,changing};
  try{globalThis.localStorage?.setItem(EPOCH_KEY,JSON.stringify(memoryRecord));}catch{}
  changed();
  return memoryRecord;
}
function listen(){
  if(listening||typeof window==="undefined")return;
  window.addEventListener?.("storage",event=>{if(event.key===EPOCH_KEY)changed();});
  listening=true;
}
export function subscribeAccountChanges(listener){listen();listeners.add(listener);return ()=>listeners.delete(listener);}
export function beginAccountMutation(){listen();return publish(null,true).epoch;}
export function endAccountMutation(epoch){if(record().epoch===epoch)publish(null,false);}
export function accountSubject(context){
  if(!context||!proofs.has(context))throw accountError("CLOUD_ACCOUNT_UNPROVEN");
  return context.subject;
}
export function accountContextCurrent(context){
  if(!context||!proofs.has(context))return false;
  const current=record();
  return context.generation===generation&&!current.changing&&current.epoch===context.epoch&&current.subject===context.subject;
}
export function assertAccountContext(context){if(!accountContextCurrent(context))throw accountError();return context;}
export function currentVerifiedAccount(){return accountContextCurrent(latestProof)?latestProof:null;}
export function accountOwner(state){
  const value=state?.cloudAccount;
  return value?.version===1&&typeof value.accountId==="string"&&value.accountId?value.accountId:null;
}
export function assertAccountState(state,context){
  assertAccountContext(context);
  const owner=accountOwner(state);
  if(!owner)throw accountError("CLOUD_ACCOUNT_UNPROVEN");
  if(owner!==context.subject)throw accountError();
  return true;
}
export function newAccountState(initial,context){
  assertAccountContext(context);
  if(accountOwner(initial))throw accountError();
  return {...JSON.parse(JSON.stringify(initial)),cloudAccount:{version:1,accountId:context.subject}};
}
export function accountRequestHeaders(context,headers={}){
  assertAccountContext(context);
  const result=new Headers(headers);
  result.set(ACCOUNT_HEADER,encodeURIComponent(context.subject));
  return result;
}

export async function openVerifiedAccount({expectedAccountId=null}={}){
  listen();
  const before=record();
  const beforeGeneration=generation;
  if(before.changing)throw accountError();
  const headers=new Headers();
  if(expectedAccountId)headers.set(ACCOUNT_HEADER,encodeURIComponent(expectedAccountId));
  const response=await fetch("/api/auth/session",{credentials:"include",cache:"no-store",headers});
  const body=await response.json().catch(()=>null);
  if(generation!==beforeGeneration||record().epoch!==before.epoch||record().changing)throw accountError();
  if(!response.ok||!body?.ok||typeof body.user?.id!=="string"||!body.user.id)
    throw Object.assign(accountError("CLOUD_ACCOUNT_UNPROVEN"),{status:response.status});
  const subject=body.user.id;
  if(expectedAccountId&&expectedAccountId!==subject)throw accountError();
  const current=before.subject===subject?before:publish(subject);
  const context=Object.freeze({subject,epoch:current.epoch,user:Object.freeze({...body.user}),generation});
  proofs.add(context);
  latestProof=context;
  return context;
}
export async function verifyAccountContext(context){
  assertAccountContext(context);
  await openVerifiedAccount({expectedAccountId:context.subject});
  return assertAccountContext(context);
}
export async function accountFetch(context,url,options={}){
  assertAccountContext(context);
  const controller=new AbortController();
  controllers.add(controller);
  try{
    const response=await fetch(url,{...options,credentials:"include",cache:"no-store",
      headers:accountRequestHeaders(context,options.headers),signal:controller.signal});
    assertAccountContext(context);
    return response;
  }finally{controllers.delete(controller);}
}
