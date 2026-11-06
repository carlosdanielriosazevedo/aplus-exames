// P1-A v2 — Percurso de recuperação autorizado.
//
// Restaurar uma cópia:
//   1. só o separador escritor, com o mandato provado (lock + prova);
//   2. cada estado da cópia passa a verificação D2 (ilegível ou de versão
//      futura → recusado, nada é alterado);
//   3. o conjunto canónico atual é guardado primeiro como cópia "before_restore"
//      (durável; sem ela não se restaura) — restaurar é sempre reversível;
//   4. o conjunto inteiro é escrito (estado + recibos D3 + rascunhos + memória
//      de escrita juntos: nunca estado de um momento com recibos de outro);
//   5. cada chave é confirmada por releitura; qualquer falha repõe o conjunto
//      anterior;
//   6. o separador sela, liberta e recarrega sem gravar a memória antiga.
// Descarregar: JSON da cópia (dados do próprio aluno, neste dispositivo).
// Apagar: só cópias v2, só depois de descarregadas, por decisão explícita.
import {ACADEMIC_KEYS,STATE_KEYS,canonicalKey} from "./academicKeys.js";
import {listRecoveryCopies,findRecoveryCopy,writeRecoveryCopy,canonicalSet,summarizeSet,RECOVERY_FORMAT} from "./recoveryCopies.js";
import {stateWriterStatus,releaseAfterRestore,noteRestoredWrites} from "./stateWriter.js";
import {classifyStoredState} from "./stateIntegrity.js";

function local(){try{return globalThis.localStorage||null}catch{return null}}
const scopeNow=()=>stateWriterStatus().scope||"global";

export function recoveryCopiesForView(scope=scopeNow()){
  const current=summarizeSet(canonicalSet(scope));
  return {current,copies:listRecoveryCopies(scope).map(({keys,...copy})=>({...copy,keyCount:ACADEMIC_KEYS.filter(k=>keys?.[k]!==null&&keys?.[k]!==undefined).length}))};
}

export function validateCopyForRestore(copy){
  if(!copy)return {ok:false,reason:"copy_not_found"};
  for(const key of STATE_KEYS){
    const raw=copy.keys?.[key];
    if(raw===null||raw===undefined)continue;
    const verdict=classifyStoredState(raw);
    if(!verdict.ok)return {ok:false,reason:verdict.reason};
  }
  if(ACADEMIC_KEYS.every(k=>copy.keys?.[k]===null||copy.keys?.[k]===undefined))return {ok:false,reason:"copy_empty"};
  return {ok:true};
}

function writeSetExact(store,scope,set,keys){
  for(const key of keys){
    const full=canonicalKey(key,scope),raw=set?.[key]??null;
    if(raw===null)store.removeItem(full);else store.setItem(full,raw);
    if((store.getItem(full)??null)!==raw)throw new Error(`verify:${key}`);
  }
}

export function restoreRecoveryCopy(id,{reload=true}={}){
  const writer=stateWriterStatus();
  if(writer.mode!=="writer")return {ok:false,reason:"not_writer"};
  const scope=writer.scope||"global",store=local();
  if(!store)return {ok:false,reason:"storage_unavailable"};
  const copy=findRecoveryCopy(scope,id);
  const valid=validateCopyForRestore(copy);
  if(!valid.ok)return valid;
  // Cópias parciais (v1) só substituem as chaves que contêm.
  const keys=copy.partial?ACADEMIC_KEYS.filter(k=>k in copy.keys):ACADEMIC_KEYS;
  const before=canonicalSet(scope,store);
  const backup=writeRecoveryCopy({scope,reason:"before_restore",keys:before,tab:writer.tabId,dedupe:true,extra:{restoring:id}});
  if(!backup||!backup.durable)return {ok:false,reason:"no_space_for_backup"};
  try{writeSetExact(store,scope,copy.keys,keys);}
  catch(error){
    // Repor chave a chave: uma chave que falhe não impede as restantes.
    for(const key of ACADEMIC_KEYS)try{writeSetExact(store,scope,before,[key]);}catch{}
    noteRestoredWrites();
    return {ok:false,reason:"restore_write_failed",backup:backup.key};
  }
  noteRestoredWrites();
  if(reload)releaseAfterRestore();
  return {ok:true,backup:backup.key,restored:id};
}

export function exportRecoveryCopy(id,scope=scopeNow()){
  const copy=findRecoveryCopy(scope,id);
  if(!copy)return null;
  return JSON.stringify({format:RECOVERY_FORMAT,exportedAt:new Date().toISOString(),id:copy.id,reason:copy.reason,at:copy.at,scope,keys:copy.keys},null,2);
}

export function deleteRecoveryCopy(id,{exported=false}={},scope=scopeNow()){
  if(!exported)return {ok:false,reason:"export_first"};
  const copy=findRecoveryCopy(scope,id);
  if(!copy)return {ok:false,reason:"copy_not_found"};
  if(copy.format!==RECOVERY_FORMAT)return {ok:false,reason:"legacy_copy_kept"};
  const store=local();
  try{store.removeItem(id);return {ok:store.getItem(id)===null}}catch{return {ok:false,reason:"delete_failed"}}
}
