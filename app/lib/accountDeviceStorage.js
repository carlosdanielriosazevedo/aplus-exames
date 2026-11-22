// Separação por conta dos dados académicos guardados neste dispositivo.
//
// Num computador partilhado, o progresso do aluno A não pode aparecer ao aluno B.
// Ao terminar sessão (ou ao entrar com outra conta), todas as chaves académicas
// são copiadas byte a byte para um arquivo da conta que as possuía, a cópia é
// confirmada por releitura e só depois a área ativa é limpa. Quando a mesma
// conta volta a entrar neste dispositivo, o arquivo é reposto exatamente.
// Se a cópia falhar (por exemplo, falta de espaço), nada é apagado.

export const ACCOUNT_ARCHIVE_PREFIX="approva-account-archive-v1:";
const ARCHIVE_FORMAT="approva-account-archive-v1";

// Chaves com dados académicos ou tentativas do aluno (inclui rascunhos).
export const ACADEMIC_KEYS=Object.freeze([
  "a25",
  "a25-active-session-v1",
  "a25-active-exam-session-v1",
  "a25-completed-sessions-v1",
  "a25-cloud-snapshots-v1",
  "a25-cloud-pending-v1",
  "approva.portuguese-writing-memory.v1",
  "applus:portuguese-prototype-draft:v1",
  "aplus-pilot-consent-active-v1"
]);
export const ACADEMIC_KEY_PREFIXES=Object.freeze(["applus:fqa-exam-draft:v1:"]);

function stores(){
  const list=[];
  for(const name of ["localStorage","sessionStorage"])try{
    const store=globalThis[name];
    if(store)list.push([name,store]);
  }catch{}
  return list;
}

function keysOf(store){
  const keys=[];
  try{for(let i=0;i<store.length;i++){const key=store.key(i);if(key!==null)keys.push(key)}}catch{}
  return keys;
}

function isAcademicKey(key){
  return ACADEMIC_KEYS.includes(key)||ACADEMIC_KEY_PREFIXES.some(prefix=>key.startsWith(prefix));
}

export function archiveKey(accountId){
  return ACCOUNT_ARCHIVE_PREFIX+String(accountId);
}

// Recolhe os valores atuais (exatos) das chaves académicas em cada armazenamento.
export function collectAcademicEntries(){
  const entries={};
  for(const [name,store] of stores()){
    for(const key of keysOf(store)){
      if(!isAcademicKey(key))continue;
      try{const value=store.getItem(key);if(value!==null)(entries[name]||={})[key]=value}catch{}
    }
  }
  return entries;
}

export function hasAcademicData(){
  return Object.values(collectAcademicEntries()).some(group=>Object.keys(group).length>0);
}

// Arquiva os dados ativos na conta indicada e limpa a área ativa.
export function archiveActiveAccount(accountId,{now=Date.now()}={}){
  if(!accountId)return {ok:false,code:"ACCOUNT_REQUIRED"};
  const local=globalThis.localStorage;
  if(!local)return {ok:false,code:"STORAGE_UNAVAILABLE"};
  const entries=collectAcademicEntries();
  const count=Object.values(entries).reduce((n,group)=>n+Object.keys(group).length,0);
  if(!count)return {ok:true,archived:0};
  const key=archiveKey(accountId);
  let previous=null;
  try{previous=local.getItem(key)}catch{}
  const payload=JSON.stringify({format:ARCHIVE_FORMAT,accountId:String(accountId),archivedAt:now,entries});
  try{local.setItem(key,payload)}catch{return {ok:false,code:"ARCHIVE_WRITE_FAILED"}}
  let confirmed=false;
  try{confirmed=local.getItem(key)===payload}catch{}
  if(!confirmed){
    try{previous===null?local.removeItem(key):local.setItem(key,previous)}catch{}
    return {ok:false,code:"ARCHIVE_NOT_CONFIRMED"};
  }
  for(const [name,group] of Object.entries(entries)){
    const store=stores().find(([storeName])=>storeName===name)?.[1];
    for(const entryKey of Object.keys(group))try{store?.removeItem(entryKey)}catch{}
  }
  return {ok:true,archived:count};
}

// Repõe o arquivo da conta, se existir e se a área ativa estiver vazia.
export function restoreAccountArchive(accountId){
  const local=globalThis.localStorage;
  if(!local||!accountId)return {ok:false,code:"STORAGE_UNAVAILABLE"};
  const key=archiveKey(accountId);
  let raw=null;
  try{raw=local.getItem(key)}catch{return {ok:false,code:"ARCHIVE_READ_FAILED"}}
  if(!raw)return {ok:true,restored:0};
  if(hasAcademicData())return {ok:false,code:"ACTIVE_AREA_NOT_EMPTY"};
  let archive;
  try{archive=JSON.parse(raw)}catch{return {ok:false,code:"ARCHIVE_UNREADABLE"}}
  if(archive?.format!==ARCHIVE_FORMAT||archive.accountId!==String(accountId)||!archive.entries||typeof archive.entries!=="object")
    return {ok:false,code:"ARCHIVE_UNREADABLE"};
  const written=[];
  for(const [name,group] of Object.entries(archive.entries)){
    const store=stores().find(([storeName])=>storeName===name)?.[1]||local;
    for(const [entryKey,value] of Object.entries(group||{})){
      if(!isAcademicKey(entryKey)||typeof value!=="string")continue;
      try{store.setItem(entryKey,value);written.push([store,entryKey])}
      catch{
        // Reposição parcial nunca fica ativa: desfazer e manter o arquivo intacto.
        for(const [s,k] of written)try{s.removeItem(k)}catch{}
        return {ok:false,code:"RESTORE_WRITE_FAILED"};
      }
    }
  }
  try{local.removeItem(key)}catch{}
  return {ok:true,restored:written.length};
}

// Dono declarado do estado ativo (ligação feita pela sincronização automática).
export function activeStateAccount(){
  try{
    const raw=globalThis.localStorage?.getItem("a25");
    const id=raw?JSON.parse(raw)?.cloudSync?.accountId:null;
    return typeof id==="string"&&id?id:null;
  }catch{return null}
}

// Ao entrar com `accountId`: se a área ativa pertence a outra conta, arquiva-a;
// depois repõe o arquivo desta conta, se existir. Devolve se é preciso recarregar.
export function switchDeviceToAccount(accountId){
  const owner=activeStateAccount();
  let changed=false;
  if(owner&&owner!==String(accountId)){
    const archived=archiveActiveAccount(owner);
    if(!archived.ok)return {ok:false,code:archived.code,reload:false};
    changed=archived.archived>0;
  }
  if(!hasAcademicData()){
    const restored=restoreAccountArchive(accountId);
    if(!restored.ok)return {ok:false,code:restored.code,reload:changed};
    changed=changed||restored.restored>0;
  }
  return {ok:true,reload:changed};
}

// "Computador partilhado": apaga deste dispositivo o progresso ativo da conta e o
// respetivo arquivo. Só deve ser chamado depois de o progresso estar guardado na
// conta. Nunca apaga progresso que pertença a outra conta ou que seja anónimo.
export function purgeAccountFromDevice(accountId){
  if(!accountId)return {ok:false,code:"ACCOUNT_REQUIRED"};
  const local=globalThis.localStorage;
  if(!local)return {ok:false,code:"STORAGE_UNAVAILABLE"};
  let removed=0;
  if(activeStateAccount()===String(accountId)){
    for(const [,store] of stores()){
      for(const key of keysOf(store)){
        if(!isAcademicKey(key))continue;
        try{store.removeItem(key);removed++}catch{}
      }
    }
  }
  try{if(local.getItem(archiveKey(accountId))!==null){local.removeItem(archiveKey(accountId));removed++}}catch{}
  return {ok:true,removed};
}

// Eliminação da conta: apaga deste dispositivo os dados de estudo ativos (estejam
// ou não associados a esta conta) e o arquivo local da conta.
export function eraseAcademicDataFromDevice(accountId){
  const local=globalThis.localStorage;
  if(!local)return {ok:false,code:"STORAGE_UNAVAILABLE"};
  let removed=0;
  for(const [,store] of stores()){
    for(const key of keysOf(store)){
      if(!isAcademicKey(key))continue;
      try{store.removeItem(key);removed++}catch{}
    }
  }
  if(accountId){
    try{if(local.getItem(archiveKey(accountId))!==null){local.removeItem(archiveKey(accountId));removed++}}catch{}
  }
  return {ok:true,removed};
}

// Arquivo anónimo («Não é meu»): deixou de existir (decisão do product owner,
// 2026-11-22). Com conta obrigatória, progresso sem conta não pode continuar e,
// ao terminar sessão, o dispositivo fica limpo. Arquivos antigos são removidos.
export const ANONYMOUS_ARCHIVE_ID="anonimo-neste-dispositivo";
// Depois de entrar numa conta com progresso (dispositivo limpo e recarregado),
// abrir no menu e não no início do onboarding.
export const OPEN_HOME_AFTER_SIGNIN_KEY="approva-open-home-after-signin";
export function discardAnonymousArchive(){
  try{globalThis.localStorage?.removeItem(archiveKey(ANONYMOUS_ARCHIVE_ID))}catch{}
}

// «Começar de novo» no ecrã da conta obrigatória: o estudo feito sem conta neste
// dispositivo (por exemplo, um diagnóstico de quem não chegou a criar conta) é
// apagado. Progresso que pertença a uma conta nunca é apagado: vai para o arquivo
// dessa conta e volta quando ela entrar.
export function discardUnsavedDeviceProgress(){
  const owner=activeStateAccount();
  if(owner)return archiveActiveAccount(owner);
  return eraseAcademicDataFromDevice(null);
}
