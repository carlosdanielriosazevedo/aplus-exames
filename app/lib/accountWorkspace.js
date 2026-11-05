import {accountSubject,assertAccountContext,accountError} from "./cloudAccountSession.js";
import {stateWritesAllowed,stateWriterCoordinated} from "./stateWriter.js";

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
// P1-A: com a coordenação de escritor ativa, um separador que não é o escritor
// não grava progresso (estado, rascunhos, registo de conclusões). A escrita
// falha como um armazenamento bloqueado: os chamadores já falham fechados.
function writeBlocked(){
  return Object.assign(new Error("Outro separador está a guardar o progresso."),{name:"StateWriterBlocked",code:"STATE_WRITER_BLOCKED"});
}
export function accountStorage(store,subject=selected){
  if(!store||(!subject&&!stateWriterCoordinated()))return store;
  const guard=()=>{if(!stateWritesAllowed())throw writeBlocked();};
  return {
    source:store,
    getItem:key=>store.getItem(accountStorageKey(key,subject)),
    setItem:(key,value)=>{guard();return store.setItem(accountStorageKey(key,subject),value);},
    removeItem:key=>{guard();return store.removeItem(accountStorageKey(key,subject));}
  };
}
export function scopedLocalStorage(){
  try{return accountStorage(globalThis.localStorage||globalThis.window?.localStorage);}catch{return null;}
}
// P1-C: chaves académicas gravadas antes do isolamento por conta (F5), fora de
// qualquer área de conta. Só se verifica a existência: o conteúdo nunca é lido,
// interpretado, migrado nem atribuído à sessão atual.
export const LEGACY_WORKSPACE_KEYS=Object.freeze([
  "a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1",
  "applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715",
  "a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"
]);
export function legacyWorkspacePresent(){
  for(const name of ["localStorage","sessionStorage"])try{
    const store=globalThis[name];
    if(LEGACY_WORKSPACE_KEYS.some(key=>{try{return store?.getItem(key)!==null&&store?.getItem(key)!==undefined}catch{return false}}))return true;
  }catch{}
  return false;
}
