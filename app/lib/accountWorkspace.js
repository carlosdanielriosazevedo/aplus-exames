import {accountSubject,assertAccountContext,accountError} from "./cloudAccountSession.js";

// A tab selects its namespace before hydration and never changes it in place.
// Switching account requires a reload, so late saves retain their original keys.
let selected=null;
export function workspaceAccountId(){return selected;}
export function selectAccountWorkspace(context){
  assertAccountContext(context);
  const subject=accountSubject(context);
  if(selected&&selected!==subject)throw accountError();
  selected=subject;
}
export function accountStorageKey(key,subject=selected){
  return subject?`a25-account-v1:${encodeURIComponent(subject)}:${key}`:key;
}
export function accountStorage(store,subject=selected){
  if(!store||!subject)return store;
  return {
    source:store,
    getItem:key=>store.getItem(accountStorageKey(key,subject)),
    setItem:(key,value)=>store.setItem(accountStorageKey(key,subject),value),
    removeItem:key=>store.removeItem(accountStorageKey(key,subject))
  };
}
export function scopedLocalStorage(){
  try{return accountStorage(globalThis.localStorage||globalThis.window?.localStorage);}catch{return null;}
}
export function legacyWorkspacePresent(){
  for(const name of ["localStorage","sessionStorage"])try{
    const store=globalThis[name];
    if(store?.getItem("a25")||store?.getItem("a25-friends-beta")||store?.getItem("a25-active-session-v1"))return true;
  }catch{}
  return false;
}
