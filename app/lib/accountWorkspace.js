import {accountSubject,assertAccountContext,accountError} from "./cloudAccountSession.js";
import {stateWritesAllowed,stateWriterNamespaceActive,stateWriterReadsLegacy,confirmAcademicWrite,noteAcademicWrite} from "./stateWriter.js";
import {ACADEMIC_KEYS,isAcademicKey,canonicalKey,legacyKey} from "./academicKeys.js";

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
// P1-A v2: com a coordenação de escritor ativa (a app no browser), as chaves
// académicas vivem no espaço canónico próprio (academicKeys.js); as chaves
// legadas ficam só de leitura para esta versão. Sem coordenação (servidor,
// harness do contrato #385) o formato é o anterior.
export function accountStorageKey(key,subject=selected){
  if(isAcademicKey(key)&&stateWriterNamespaceActive()&&!stateWriterReadsLegacy(subject||"global"))return canonicalKey(key,subject||"global");
  return legacyKey(key,subject);
}
// P1-A: com a coordenação de escritor ativa, um separador que não é o escritor
// não grava progresso (estado, rascunhos, registo de conclusões). A escrita
// falha como um armazenamento bloqueado: os chamadores já falham fechados.
function writeBlocked(){
  return Object.assign(new Error("Outro separador está a guardar o progresso."),{name:"StateWriterBlocked",code:"STATE_WRITER_BLOCKED"});
}
function foreignBytes(){
  return Object.assign(new Error("O progresso foi alterado noutro separador."),{name:"StateWriterBlocked",code:"STATE_WRITER_FOREIGN"});
}
function isDurable(store){try{return !!store&&store===globalThis.localStorage}catch{return false}}
export function accountStorage(store,subject=selected){
  if(!store||(!subject&&!stateWriterNamespaceActive()))return store;
  const guard=()=>{if(!stateWritesAllowed())throw writeBlocked();};
  // P1-A v2: antes de cada escrita académica em armazenamento partilhado, os
  // bytes atuais têm de ser os últimos que este separador viu ou escreveu.
  const confirm=key=>{
    if(!isAcademicKey(key)||!isDurable(store))return null;
    const full=accountStorageKey(key,subject);
    if(!confirmAcademicWrite(full,store))throw foreignBytes();
    return full;
  };
  return {
    source:store,
    getItem:key=>store.getItem(accountStorageKey(key,subject)),
    setItem:(key,value)=>{guard();const full=confirm(key);const result=store.setItem(accountStorageKey(key,subject),value);if(full)noteAcademicWrite(full,String(value));return result;},
    removeItem:key=>{guard();const full=confirm(key);const result=store.removeItem(accountStorageKey(key,subject));if(full)noteAcademicWrite(full,null);return result;}
  };
}
export function scopedLocalStorage(){
  try{return accountStorage(globalThis.localStorage||globalThis.window?.localStorage);}catch{return null;}
}
// P1-C: chaves académicas gravadas antes do isolamento por conta (F5), fora de
// qualquer área de conta. Só se verifica a existência: o conteúdo nunca é lido,
// interpretado, migrado nem atribuído à sessão atual.
export const LEGACY_WORKSPACE_KEYS=ACADEMIC_KEYS;
export function legacyWorkspacePresent(){
  for(const name of ["localStorage","sessionStorage"])try{
    const store=globalThis[name];
    const present=key=>{try{return store?.getItem(key)!==null&&store?.getItem(key)!==undefined}catch{return false}};
    if(LEGACY_WORKSPACE_KEYS.some(present))return true;
    // P1-A v2: progresso gravado sem conta pela nova versão (espaço canónico
    // global) também não tem dono comprovado: nunca é atribuído, mas é assinalado.
    if(LEGACY_WORKSPACE_KEYS.some(key=>present(canonicalKey(key,"global"))))return true;
  }catch{}
  return false;
}
