"use client";
import {accountOwner,accountSubject,accountContextCurrent,assertAccountContext} from "./cloudAccountSession.js";

import {safeLocalStorage} from "./safeStorage.js";

export {safeCloudMerge} from "./cloudStateMerge.js";

const DEVICE_KEY="a25-device-id-v1";
const SNAPSHOT_KEY="a25-cloud-snapshots-v1";
const PENDING_KEY="a25-cloud-pending-v1";
const SNAPSHOT_V2="a25-cloud-snapshot-v2:";
const PENDING_V2="a25-cloud-pending-v2:";
const knownKeys=new Set();

function stores(){
  const result=[];
  for(const key of ["localStorage","sessionStorage"])try{if(globalThis[key])result.push(globalThis[key]);}catch{}
  return result;
}
function origin(state,context){
  try{const subject=accountSubject(context);return accountOwner(state)===subject?subject:null;}catch{return null;}
}
function persistEntry(prefix,item){
  const key=prefix+item.id;
  knownKeys.add(key);
  const raw=JSON.stringify(item);
  for(const store of stores())try{
    if(store.getItem(key)!==null)continue;
    store.setItem(key,raw);return true;
  }catch{}
  return false;
}
function entries(prefix){
  const result=new Map();
  for(const store of stores()){
    const keys=new Set(knownKeys);
    try{for(let i=0;i<store.length;i++)keys.add(store.key(i));}catch{}
    for(const key of keys)if(typeof key==="string"&&key.startsWith(prefix))try{
      const raw=store.getItem(key);
      if(raw){const item=JSON.parse(raw);if(item?.id)result.set(item.id,item);}
    }catch{}
  }
  return [...result.values()].sort((a,b)=>b.at-a.at);
}
function legacyEntries(key){
  for(const store of stores())try{
    const raw=store.getItem(key);
    if(raw){const list=JSON.parse(raw);return Array.isArray(list)?list.map((_,i)=>({id:`legacy-${key}-${i}`,quarantined:true})): [{id:`legacy-${key}`,quarantined:true}];}
  }catch{return [{id:`legacy-${key}-unreadable`,quarantined:true}];}
  return [];
}
function visible(item,context){
  if(accountContextCurrent(context)&&item.accountId===context.subject&&accountOwner(item.state)===context.subject)return item;
  // Never expose another account's academic snapshot to the current account UI.
  return {id:item.id,quarantined:true};
}

function randomId(prefix="id"){
  const cryptoObj=typeof crypto!=="undefined"?crypto:null;
  if(cryptoObj?.randomUUID)return `${prefix}-${cryptoObj.randomUUID()}`;
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
}

export function getOrCreateDeviceId(){
  const store=safeLocalStorage();if(!store)return "device-server";
  try{
    const existing=store.getItem(DEVICE_KEY);
    if(existing)return existing;
    const next=randomId("device");
    store.setItem(DEVICE_KEY,next);
    return next;
  }catch{
    return "device-unavailable";
  }
}

export function shortDeviceId(id){
  const value=String(id||"");
  if(!value)return "—";
  return value.length<=12?value:`${value.slice(0,7)}…${value.slice(-4)}`;
}

function stable(value){
  if(Array.isArray(value))return value.map(stable);
  if(value&&typeof value==="object"){
    return Object.fromEntries(Object.keys(value).sort().map(k=>[k,stable(value[k])]));
  }
  return value;
}

export function stateFingerprint(value){
  const text=JSON.stringify(stable(value??null));
  let h=2166136261;
  for(let i=0;i<text.length;i++){
    h^=text.charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return `sf1-${(h>>>0).toString(16).padStart(8,"0")}`;
}

export function cloudSyncMeta(state){
  const raw=state?.cloudSync||{};
  return {
    version:1,
    deviceId:raw.deviceId||null,
    baseRevision:Number.isInteger(raw.baseRevision)?raw.baseRevision:0,
    baseFingerprint:raw.baseFingerprint||null,
    lastRemoteRevision:Number.isInteger(raw.lastRemoteRevision)?raw.lastRemoteRevision:null,
    lastRemoteDeviceId:raw.lastRemoteDeviceId||null,
    lastSyncedAt:raw.lastSyncedAt||null,
    lastConflictAt:raw.lastConflictAt||null,
    lastConflict:raw.lastConflict||null,
    pendingCount:Number(raw.pendingCount)||0
  };
}

export function migrateCloudSync(state){
  if(!state)return state;
  const current=cloudSyncMeta(state);
  const deviceId=current.deviceId||getOrCreateDeviceId();
  return {
    ...state,
    cloudSync:{...current,deviceId},
    cloudSyncModelVersion:1
  };
}

export function markCloudLoaded(state,{
  revision=0,
  remoteDeviceId=null,
  remoteState=null,
  at=Date.now()
}={}){
  const current=cloudSyncMeta(state);
  return {
    ...state,
    cloudSync:{
      ...current,
      deviceId:current.deviceId||getOrCreateDeviceId(),
      baseRevision:revision,
      baseFingerprint:stateFingerprint(remoteState),
      lastRemoteRevision:revision,
      lastRemoteDeviceId:remoteDeviceId||null,
      lastSyncedAt:at,
      lastConflict:null
    }
  };
}

export function markCloudSaved(state,{
  revision,
  deviceId=null,
  savedState=null,
  at=Date.now()
}={}){
  const current=cloudSyncMeta(state);
  const nextRevision=Number.isInteger(revision)?revision:current.baseRevision;
  return {
    ...state,
    cloudSync:{
      ...current,
      deviceId:deviceId||current.deviceId||getOrCreateDeviceId(),
      baseRevision:nextRevision,
      baseFingerprint:stateFingerprint(savedState),
      lastRemoteRevision:nextRevision,
      lastRemoteDeviceId:deviceId||current.deviceId||null,
      lastSyncedAt:at,
      lastConflict:null
    }
  };
}

export function cloudConflict(state,{
  remoteRevision,
  remoteDeviceId=null,
  remoteUpdatedAt=null,
  remoteState=null,
  at=Date.now()
}={}){
  const current=cloudSyncMeta(state);
  const conflict={
    localBaseRevision:current.baseRevision,
    remoteRevision:Number.isInteger(remoteRevision)?remoteRevision:null,
    localDeviceId:current.deviceId||getOrCreateDeviceId(),
    remoteDeviceId:remoteDeviceId||null,
    remoteUpdatedAt:remoteUpdatedAt||null,
    remoteFingerprint:stateFingerprint(remoteState),
    at
  };
  return {
    ...state,
    cloudSync:{
      ...current,
      deviceId:current.deviceId||getOrCreateDeviceId(),
      lastRemoteRevision:conflict.remoteRevision,
      lastRemoteDeviceId:remoteDeviceId||null,
      lastConflictAt:at,
      lastConflict:conflict
    }
  };
}

function createLocalSnapshot(state,{label="snapshot",at=Date.now()}={}){
  return {
    id:randomId("snap"),
    label,
    at,
    fingerprint:stateFingerprint(state),
    state
  };
}

export function saveLocalSnapshot(state,{label="Antes de sincronizar",at=Date.now(),accountContext=null}={}){
  const snapshot={...createLocalSnapshot(JSON.parse(JSON.stringify(state)),{label,at}),accountId:origin(state,accountContext)};
  snapshot.persisted=persistEntry(SNAPSHOT_V2,snapshot);
  return snapshot;
}

export function listLocalSnapshots(accountContext=null){
  return [...entries(SNAPSHOT_V2).map(x=>visible(x,accountContext)),...legacyEntries(SNAPSHOT_KEY)];
}

export function queueCloudSave(state,{
  reason="network_failure",
  expectedRevision=null,
  at=Date.now(),
  accountContext=null
}={}){
  const meta=cloudSyncMeta(state);
  const item={
    id:randomId("pending"),
    at,
    reason,
    expectedRevision:Number.isInteger(expectedRevision)?expectedRevision:meta.baseRevision,
    knownRemote:!!meta.baseFingerprint,
    deviceId:meta.deviceId||getOrCreateDeviceId(),
    fingerprint:stateFingerprint(state),
    state:JSON.parse(JSON.stringify(state)),
    accountId:origin(state,accountContext)
  };
  // Immutable per-entry keys avoid cross-tab read/modify/write loss. No legacy
  // queue, old snapshot, or other account entry is trimmed or deduplicated away.
  item.persisted=persistEntry(PENDING_V2,item);
  return item;
}

export function listPendingCloudSaves(accountContext=null){
  return [...entries(PENDING_V2).map(x=>visible(x,accountContext)),...legacyEntries(PENDING_KEY)];
}

export function removePendingCloudSave(id,accountContext){
  assertAccountContext(accountContext);
  if(typeof id!=="string"||id.startsWith("legacy-"))return false;
  let removed=false;
  for(const store of stores())try{
    const key=PENDING_V2+id,raw=store.getItem(key),item=raw&&JSON.parse(raw);
    if(item?.accountId===accountContext.subject&&accountOwner(item.state)===accountContext.subject){store.removeItem(key);removed=true;}
  }catch{}
  return removed;
}
