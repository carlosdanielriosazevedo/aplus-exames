"use client";
import {browserStores} from "./browserStorage.js";
import {snapshotError} from "./cloudSnapshotValidation.js";
import {stableSnapshotJson} from "./cloudStateMerge.js";
import {workspaceAccountId,accountStorageKey} from "./accountWorkspace.js";
import {accountOwner} from "./cloudAccountSession.js";
import {beginRecoveryAccess,assertRecoveryAccess,revalidateRecoveryAccess,assertRecoveryState,recoveryHeaders} from "./recoveryAccess.js";
export {assertLocalRecoveryCopy} from "./cloudSnapshotPreservation.js";

const PREFIX="a25-cloud-recovery-v2:";
const LEGACY="a25-cloud-recovery-v1:";
const handles=new WeakMap();
const KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1",
  "applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715"];
function seal(access,value,source=null){
  const owner=assertRecoveryAccess(access),raw=JSON.stringify(value),copy=JSON.parse(raw);
  handles.set(copy,{access,owner,raw,source});return copy;
}
function owned(value,access){
  const owner=assertRecoveryAccess(access),handle=handles.get(value);
  if(handle){assertRecoveryAccess(handle.access);if(handle.owner!==owner)throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");return;}
  assertRecoveryState(value,access);
}
async function digest(value){
  const bytes=new TextEncoder().encode(stableSnapshotJson(value));
  return [...new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))].map(x=>x.toString(16).padStart(2,"0")).join("");
}
function localRows(){
  const records=[];
  for(const store of browserStores())for(const key of KEYS){const raw=store.getItem(key);if(raw)records.push({key,raw});}
  return records;
}
export async function readLocalRecoveryOriginals(storageKey="a25"){
  const access=await beginRecoveryAccess(),owner=assertRecoveryAccess(access);
  // Authorization precedes even the storage reads. Unbound global data is not
  // selected or attributed to whichever person signs in next.
  const records=localRows(),primary=records.filter(row=>row.key===storageKey);
  if(!primary.length)throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");
  for(const record of records.filter(row=>row.key==="a25"||row.key==="a25-friends-beta")){
    let state;try{state=JSON.parse(record.raw);}catch{throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");}
    if(accountOwner(state)!==owner)throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");
  }
  const value={format:"aplus-local-progress-recovery-v2",accountId:owner,storageKey,records,digest:await digest(records)};
  await revalidateRecoveryAccess(access);return seal(access,value);
}
export function assertLocalRecoveryUnchanged(bundle,access){
  const owner=assertRecoveryAccess(access),metadata=handles.get(bundle);
  if(!metadata||metadata.owner!==owner)throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");
  assertRecoveryAccess(metadata.access);
  if(stableSnapshotJson(localRows())!==stableSnapshotJson(bundle.records))throw snapshotError("CLOUD_RECOVERY_SOURCE_CHANGED");
}
function recordOriginMatches(entry,owner){
  if(entry?.remote?.accountId&&entry.remote.accountId!==owner||entry?.remote?.original?.accountId&&entry.remote.original.accountId!==owner)return false;
  const local=entry?.local;
  if(accountOwner(local)===owner)return !entry.remote?.accountId||entry.remote.accountId===owner;
  if(local?.format!=="aplus-local-progress-recovery-v2"||local.accountId!==owner||!Array.isArray(local.records))return false;
  const states=local.records.filter(row=>row.key==="a25"||row.key==="a25-friends-beta");
  return states.length>0&&states.every(row=>{try{return accountOwner(JSON.parse(row.raw))===owner;}catch{return false;}});
}
export async function preserveCloudOriginals({local,remote,label="Recuperação cloud"}){
  const access=await beginRecoveryAccess(),owner=assertRecoveryAccess(access);owned(local,access);
  if(remote?.accountId&&remote.accountId!==owner||remote?.original?.accountId&&remote.original.accountId!==owner)throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");
  const id=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`;
  const key=PREFIX+id,entry={format:"aplus-local-cloud-recovery-v2",accountId:owner,key,label,createdAt:Date.now(),local,remote};
  let raw;try{raw=JSON.stringify(entry);}catch{throw snapshotError("CLOUD_RECOVERY_STORAGE_UNAVAILABLE");}
  await revalidateRecoveryAccess(access);
  for(const store of browserStores())try{
    if((store.source||store)!==globalThis.localStorage)continue;
    if(store.getItem(key)!==null)continue;
    store.setItem(key,raw);if(store.getItem(key)!==raw)continue;
    return seal(access,{id:key,label,createdAt:entry.createdAt},{key,raw});
  }catch{}
  throw snapshotError("CLOUD_RECOVERY_STORAGE_UNAVAILABLE");
}
export function listCloudOriginals(){return readAuthorizedOriginals();}
async function readAuthorizedOriginals(){
  const access=await beginRecoveryAccess(),owner=assertRecoveryAccess(access),entries=new Map();
  const prefix=accountStorageKey(PREFIX,owner),legacyPrefix=accountStorageKey(LEGACY,owner);
  for(const store of browserStores()){
    const source=store.source||store;
    for(let i=0;i<source.length;i++){
      const rawKey=source.key(i);
      if(typeof rawKey!=="string")continue;
      if(rawKey.startsWith(legacyPrefix)){
        // Metadata only. No payload read, inferred owner or automatic migration.
        entries.set(rawKey,{id:rawKey,quarantined:true});continue;
      }
      if(!rawKey.startsWith(prefix))continue;
      const key=rawKey.slice(accountStorageKey("",owner).length),raw=store.getItem(key);
      let entry;try{entry=JSON.parse(raw);}catch{entries.set(key,{id:key,quarantined:true});continue;}
      if(entry?.format!=="aplus-local-cloud-recovery-v2"||entry.accountId!==owner||entry.key!==key||!recordOriginMatches(entry,owner)){entries.set(key,{id:key,quarantined:true});continue;}
      entries.set(key,seal(access,{id:key,label:typeof entry.label==="string"?entry.label:"Original com metadados incompatíveis",createdAt:typeof entry.createdAt==="number"&&Number.isFinite(entry.createdAt)?entry.createdAt:0},{key,raw}));
    }
  }
  await revalidateRecoveryAccess(access);return [...entries.values()].sort((a,b)=>(b.createdAt||0)-(a.createdAt||0)||a.id.localeCompare(b.id));
}
export async function readCloudOriginal(handle){
  const metadata=handles.get(handle);if(!metadata?.source)throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");
  assertRecoveryAccess(metadata.access);
  const access=await beginRecoveryAccess({expected:metadata.owner});
  let raw=null;for(const store of browserStores())if(store.getItem(metadata.source.key)===metadata.source.raw){raw=metadata.source.raw;break;}
  if(!raw)throw snapshotError("CLOUD_RECOVERY_SOURCE_CHANGED");
  const entry=JSON.parse(raw);if(entry.accountId!==assertRecoveryAccess(access)||!recordOriginMatches(entry,metadata.owner))throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");
  await revalidateRecoveryAccess(access);return seal(access,entry);
}
export async function readServerRecoveryOriginal(expected){
  const access=await beginRecoveryAccess({expected}),owner=assertRecoveryAccess(access);
  const response=await fetch("/api/cloud/state?recovery=original&account="+encodeURIComponent(owner),{credentials:"include",cache:"no-store",headers:recoveryHeaders(access)});
  if(!response.ok)throw snapshotError("CLOUD_RECOVERY_EXPORT_FAILED");
  let value;try{value=await response.json();}catch{throw snapshotError("CLOUD_RECOVERY_EXPORT_FAILED");}
  if(value?.format!=="aplus-cloud-recovery-v1"||!value.data||value.accountId!==owner)throw snapshotError("CLOUD_RECOVERY_EXPORT_FAILED");
  await revalidateRecoveryAccess(access);return seal(access,value);
}
export async function downloadRecoveryJson(value,name="approva-progresso-original.json"){
  let metadata=handles.get(value);if(!metadata)throw snapshotError("CLOUD_RECOVERY_ORIGIN_UNPROVEN");
  assertRecoveryAccess(metadata.access);
  if(metadata.source){value=await readCloudOriginal(value);metadata=handles.get(value);}
  const access=await beginRecoveryAccess({expected:metadata.owner});
  await revalidateRecoveryAccess(access);assertRecoveryAccess(metadata.access);
  // No await between the final authorization and releasing the local bytes.
  const url=URL.createObjectURL(new Blob([metadata.raw],{type:metadata.mime||"application/json"}));
  try{const link=document.createElement("a");link.href=url;link.download=name;link.click();}
  finally{URL.revokeObjectURL(url);}
}
export async function downloadOwnedState(state,name,project=value=>value){
  const access=await beginRecoveryAccess();assertRecoveryState(state,access);
  const value=project(JSON.parse(JSON.stringify(state)));
  await revalidateRecoveryAccess(access);return downloadRecoveryJson(seal(access,value),name);
}
export async function downloadWorkspaceJson(read,name){
  const access=await beginRecoveryAccess({select:true});
  const value=await read();await revalidateRecoveryAccess(access);
  return downloadRecoveryJson(seal(access,value),name);
}
export async function downloadOwnedText(state,read,name,mime="text/plain;charset=utf-8"){
  const access=await beginRecoveryAccess();assertRecoveryState(state,access);
  const raw=String(await read());await revalidateRecoveryAccess(access);
  const handle=Object.freeze({});handles.set(handle,{access,owner:assertRecoveryAccess(access),raw,mime});
  return downloadRecoveryJson(handle,name);
}
