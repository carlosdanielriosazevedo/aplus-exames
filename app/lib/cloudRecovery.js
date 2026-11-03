"use client";
import {browserStores} from "./browserStorage.js";
import {snapshotError} from "./cloudSnapshotValidation.js";
export {assertLocalRecoveryCopy} from "./cloudSnapshotPreservation.js";

const PREFIX="a25-cloud-recovery-v1:";
const known=new Set();
export function preserveCloudOriginals({local,remote,label="Recuperação cloud"}){
  const id=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random()}`;
  const key=PREFIX+id;
  const entry={format:"aplus-local-cloud-recovery-v1",key,label,createdAt:Date.now(),local,remote};
  let raw;
  try{raw=JSON.stringify(entry);}catch{throw snapshotError("CLOUD_RECOVERY_STORAGE_UNAVAILABLE");}
  // Capture wrappers now. F5's immutable per-tab namespace is respected when
  // this module is combined with #454; no account module is copied or changed.
  for(const store of browserStores())try{
    if((store.source||store)!==globalThis.localStorage)continue;
    if(store.getItem(key)!==null)continue;
    store.setItem(key,raw);
    if(store.getItem(key)!==raw)continue;
    known.add(key);return key;
  }catch{}
  throw snapshotError("CLOUD_RECOVERY_STORAGE_UNAVAILABLE");
}
export function listCloudOriginals(){
  const entries=new Map();
  for(const store of browserStores()){
    const keys=new Set(known),source=store.source||store;
    try{for(let i=0;i<source.length;i++){
      const key=source.key(i),start=key?.lastIndexOf(PREFIX);
      if(start>=0)keys.add(key.slice(start));
    }}catch{}
    for(const key of keys)try{
      // Read through the wrapper, never through another account's raw key.
      const raw=store.getItem(key);if(!raw)continue;
      const entry=JSON.parse(raw);
      if(entry.key===key&&entry.format==="aplus-local-cloud-recovery-v1")entries.set(key,entry);
    }catch{}
  }
  return [...entries.values()].sort((a,b)=>b.createdAt-a.createdAt||(a.key<b.key?-1:1));
}
export function downloadRecoveryJson(value,name="approva-progresso-original.json"){
  const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:"application/json"}));
  try{const link=document.createElement("a");link.href=url;link.download=name;link.click();}
  finally{URL.revokeObjectURL(url);}
}
