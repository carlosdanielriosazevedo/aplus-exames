
"use client";

const DEVICE_KEY="a25-device-id-v1";
const SNAPSHOT_KEY="a25-cloud-snapshots-v1";
const PENDING_KEY="a25-cloud-pending-v1";
const MAX_SNAPSHOTS=8;
const MAX_PENDING=20;

function randomId(prefix="id"){
  const cryptoObj=typeof crypto!=="undefined"?crypto:null;
  if(cryptoObj?.randomUUID)return `${prefix}-${cryptoObj.randomUUID()}`;
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
}

export function getOrCreateDeviceId(){
  if(typeof localStorage==="undefined")return "device-server";
  try{
    const existing=localStorage.getItem(DEVICE_KEY);
    if(existing)return existing;
    const next=randomId("device");
    localStorage.setItem(DEVICE_KEY,next);
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

export function conflictReason(state,remote){
  const current=cloudSyncMeta(state);
  const remoteRevision=Number(remote?.revision)||0;
  if(remoteRevision===current.baseRevision)return {conflict:false,reason:"same_revision"};
  if(remoteRevision>current.baseRevision){
    return {
      conflict:true,
      reason:"remote_advanced",
      detail:"A cloud foi alterada depois da última versão conhecida por este dispositivo."
    };
  }
  return {
    conflict:true,
    reason:"local_base_ahead",
    detail:"A revisão local conhecida é superior à revisão devolvida pela cloud; é necessária verificação."
  };
}

export function createLocalSnapshot(state,{label="snapshot",at=Date.now()}={}){
  return {
    id:randomId("snap"),
    label,
    at,
    fingerprint:stateFingerprint(state),
    state
  };
}

export function saveLocalSnapshot(state,{label="Antes de sincronizar",at=Date.now()}={}){
  const snapshot=createLocalSnapshot(state,{label,at});
  if(typeof localStorage==="undefined")return snapshot;
  try{
    const list=JSON.parse(localStorage.getItem(SNAPSHOT_KEY)||"[]");
    const next=[snapshot,...(Array.isArray(list)?list:[])].slice(0,MAX_SNAPSHOTS);
    localStorage.setItem(SNAPSHOT_KEY,JSON.stringify(next));
  }catch{}
  return snapshot;
}

export function listLocalSnapshots(){
  if(typeof localStorage==="undefined")return [];
  try{
    const list=JSON.parse(localStorage.getItem(SNAPSHOT_KEY)||"[]");
    return Array.isArray(list)?list:[];
  }catch{return []}
}

export function restoreLocalSnapshot(id){
  return listLocalSnapshots().find(x=>x.id===id)?.state||null;
}

export function queueCloudSave(state,{
  reason="network_failure",
  expectedRevision=null,
  at=Date.now()
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
    state
  };
  if(typeof localStorage==="undefined")return item;
  try{
    const list=JSON.parse(localStorage.getItem(PENDING_KEY)||"[]");
    const arr=Array.isArray(list)?list:[];
    const dedup=arr.filter(x=>x.fingerprint!==item.fingerprint);
    localStorage.setItem(PENDING_KEY,JSON.stringify([item,...dedup].slice(0,MAX_PENDING)));
  }catch{}
  return item;
}

export function listPendingCloudSaves(){
  if(typeof localStorage==="undefined")return [];
  try{
    const list=JSON.parse(localStorage.getItem(PENDING_KEY)||"[]");
    return Array.isArray(list)?list:[];
  }catch{return []}
}

export function removePendingCloudSave(id){
  if(typeof localStorage==="undefined")return;
  try{
    const next=listPendingCloudSaves().filter(x=>x.id!==id);
    localStorage.setItem(PENDING_KEY,JSON.stringify(next));
  }catch{}
}

export function clearPendingCloudSaves(){
  if(typeof localStorage==="undefined")return;
  try{localStorage.removeItem(PENDING_KEY)}catch{}
}

export function mergeByStableId(local=[],remote=[],idFn=x=>x?.id){
  const map=new Map();
  for(const item of [...(remote||[]),...(local||[])]){
    const id=idFn(item);
    if(id===null||id===undefined)continue;
    const prev=map.get(id);
    const itemTs=Number(item?.at||item?.updatedAt||item?.lastAt||item?.resolvedAt||0);
    const prevTs=Number(prev?.at||prev?.updatedAt||prev?.lastAt||prev?.resolvedAt||0);
    if(!prev || itemTs>=prevTs){
      map.set(id,item);
    }
  }
  return [...map.values()];
}

export function safeCloudMerge(local,remote){
  if(!remote)return local;
  const localEvidence=local?.scores||{};
  const remoteEvidence=remote?.scores||{};
  const scoreIds=new Set([...Object.keys(localEvidence),...Object.keys(remoteEvidence)]);
  const scores={};

  for(const id of scoreIds){
    const l=localEvidence[id]||{};
    const r=remoteEvidence[id]||{};
    const evidence=mergeByStableId(
      l.evidence||[],
      r.evidence||[],
      e=>e?.completionId||`${e?.itemId||""}|${e?.at||0}|${e?.source||""}`
    );
    scores[id]={
      ...(r||{}),
      ...(l||{}),
      evidence,
      domain:null,
      conf:0
    };
  }

  return {
    ...remote,
    ...local,
    scores,
    xp:Math.max(Number(local?.xp)||0,Number(remote?.xp)||0),
    diagnosticDone:!!(local?.diagnosticDone||remote?.diagnosticDone),
    diagnosticAnswers:Math.max(Number(local?.diagnosticAnswers)||0,Number(remote?.diagnosticAnswers)||0),
    missionHistory:mergeByStableId(local?.missionHistory,remote?.missionHistory,x=>x?.completionId||`${x?.themeId}|${x?.at}`),
    examHistory:mergeByStableId(local?.examHistory,remote?.examHistory,x=>x?.completionId||x?.id),
    freeTrainingSignals:mergeByStableId(local?.freeTrainingSignals,remote?.freeTrainingSignals,x=>x?.originSessionId||`${x?.themeId}|${x?.focus}|${x?.at}`),
    learningHypotheses:mergeByStableId(local?.learningHypotheses,remote?.learningHypotheses,x=>x?.key),
    // Elementos de intenção/UX do dispositivo atual permanecem locais.
    goal:local?.goal??remote?.goal,
    profile:local?.profile??remote?.profile,
    dailyMission:local?.dailyMission??remote?.dailyMission,
    identity:local?.identity,
    cloudMeta:local?.cloudMeta,
    cloudSync:local?.cloudSync
  };
}
