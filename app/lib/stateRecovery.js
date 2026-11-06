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
import {listRecoveryCopies,findRecoveryCopy,writeRecoveryCopy,canonicalSet,summarizeSet,sameSet,writeSetExact,restoreJournalKey,clearRestoreJournal,restoreJournalState,copyInUse,readCopyKeys,RECOVERY_FORMAT} from "./recoveryCopies.js";
import {stateWriterStatus,releaseAfterRestore,releaseAfterIncompleteRestore,noteRestoredWrites} from "./stateWriter.js";
import {classifyStoredState} from "./stateIntegrity.js";
import {recordedCompletionIds} from "./reliability.js";

function local(){try{return globalThis.localStorage||null}catch{return null}}
const scopeNow=()=>stateWriterStatus().scope||"global";

export function recoveryCopiesForView(scope=scopeNow()){
  const current=summarizeSet(canonicalSet(scope));
  return {current,copies:listRecoveryCopies(scope).map(({keys,...copy})=>({...copy,keyCount:ACADEMIC_KEYS.filter(k=>keys?.[k]!==null&&keys?.[k]!==undefined).length}))};
}

// D3: um conjunto só é restaurável se cada recibo "committed" corresponder a uma
// avaliação presente num dos estados do mesmo conjunto. Caso contrário o aluno
// ficaria com avaliações "concluídas" sem resultado (não as pode refazer).
export function completionConsistency(set){
  let rows=[];
  const raw=set?.["a25-completed-sessions-v1"];
  if(raw!==null&&raw!==undefined){
    try{rows=JSON.parse(raw)}catch{return {ok:false,reason:"d3_registry_unreadable"}}
    if(!Array.isArray(rows))return {ok:false,reason:"d3_registry_unreadable"};
  }
  const ids=new Set();
  for(const key of STATE_KEYS){
    const value=set?.[key];if(value===null||value===undefined)continue;
    let state;try{state=JSON.parse(value)}catch{continue}
    for(const id of recordedCompletionIds(state))ids.add(id);
  }
  const orphans=rows.filter(row=>row&&row.status==="committed"&&typeof row.id==="string"&&!ids.has(row.id)).map(row=>row.id);
  return orphans.length?{ok:false,reason:"d3_orphan_receipts",orphans}:{ok:true};
}

export function validateCopyForRestore(copy){
  if(!copy)return {ok:false,reason:"copy_not_found"};
  // Cópias parciais (v1, só estado) nunca são misturadas com o conjunto atual:
  // ficam disponíveis para consulta e descarga, não para restauro.
  if(copy.partial)return {ok:false,reason:"partial_copy"};
  for(const key of STATE_KEYS){
    const raw=copy.keys?.[key];
    if(raw===null||raw===undefined)continue;
    const verdict=classifyStoredState(raw);
    if(!verdict.ok)return {ok:false,reason:verdict.reason};
  }
  if(ACADEMIC_KEYS.every(k=>copy.keys?.[k]===null||copy.keys?.[k]===undefined))return {ok:false,reason:"copy_empty"};
  const d3=completionConsistency(copy.keys);
  if(!d3.ok)return d3;
  return {ok:true};
}

export function restoreRecoveryCopy(id,{reload=true}={}){
  const writer=stateWriterStatus();
  if(writer.mode!=="writer")return {ok:false,reason:"not_writer"};
  const scope=writer.scope||"global",store=local();
  if(!store)return {ok:false,reason:"storage_unavailable"};
  // Um restauro nunca começa por cima de outro diário (resolvido no início do mandato).
  if(restoreJournalState(scope,store).state!=="none")return {ok:false,reason:"restore_pending"};
  const copy=findRecoveryCopy(scope,id);
  const valid=validateCopyForRestore(copy);
  if(!valid.ok)return valid;
  const before=canonicalSet(scope,store);
  const target=Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,copy.keys[k]??null]));
  if(sameSet(target,before))return {ok:true,unchanged:true,restored:id};
  // Alvo e segurança: cópias próprias deste restauro (nunca reutilizadas), para
  // que nenhuma cópia escolhida ou apagável pelo aluno sustente o diário.
  const pinned=writeRecoveryCopy({scope,reason:"restore_target",keys:target,tab:writer.tabId,extra:{source:id}});
  if(!pinned||!pinned.durable)return {ok:false,reason:"no_space_for_backup"};
  const backup=writeRecoveryCopy({scope,reason:"before_restore",keys:before,tab:writer.tabId,extra:{restoring:id}});
  if(!backup||!backup.durable)return {ok:false,reason:"no_space_for_backup"};
  const journalId=`j-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const journalRaw=JSON.stringify({id:journalId,phase:"writing",target:pinned.key,backup:backup.key,source:id,at:Date.now()});
  try{store.setItem(restoreJournalKey(scope),journalRaw);if(store.getItem(restoreJournalKey(scope))!==journalRaw)throw new Error("journal");}
  catch{return {ok:false,reason:"no_space_for_backup"};}
  try{writeSetExact(store,scope,target);}
  catch{
    for(const key of ACADEMIC_KEYS)try{writeSetExact(store,scope,before,[key]);}catch{}
    noteRestoredWrites();
    // Só continua a gravar se o conjunto anterior estiver reposto E o diário apagado (provado).
    if(sameSet(canonicalSet(scope,store),before)&&clearRestoreJournal(scope,store))return {ok:false,reason:"restore_write_failed",backup:backup.key};
    releaseAfterIncompleteRestore({reload});
    return {ok:false,reason:"restore_incomplete",backup:backup.key,target:pinned.key};
  }
  noteRestoredWrites();
  // Diário que não se consegue apagar: parar de gravar já. A próxima abertura vê o
  // alvo aplicado; se continuar sem o conseguir apagar, fica só em consulta.
  if(!clearRestoreJournal(scope,store)){
    releaseAfterIncompleteRestore({reload});
    return {ok:false,reason:"journal_not_cleared",backup:backup.key,target:pinned.key,applied:true};
  }
  if(reload)releaseAfterRestore();
  return {ok:true,backup:backup.key,restored:id,target:pinned.key};
}

export function exportRecoveryCopy(id,scope=scopeNow()){
  const copy=findRecoveryCopy(scope,id);
  if(!copy)return null;
  return JSON.stringify({format:RECOVERY_FORMAT,exportedAt:new Date().toISOString(),id:copy.id,reason:copy.reason,at:copy.at,scope,keys:copy.keys},null,2);
}

// Apagar: só cópias v2, só depois de descarregadas, nunca uma cópia de que um
// restauro pendente dependa. Não exige ser o escritor (Fase 2: libertar espaço
// em retenção): uma cópia de recuperação não é uma chave académica.
export function deleteRecoveryCopy(id,{exported=false}={},scope=scopeNow()){
  if(!exported)return {ok:false,reason:"export_first"};
  const copy=findRecoveryCopy(scope,id);
  if(!copy)return {ok:false,reason:"copy_not_found"};
  if(copy.format!==RECOVERY_FORMAT)return {ok:false,reason:"legacy_copy_kept"};
  const store=local();
  if(!store)return {ok:false,reason:"storage_unavailable"};
  if(copyInUse(scope,id,store))return {ok:false,reason:"copy_in_use"};
  try{store.removeItem(id);return store.getItem(id)===null?{ok:true}:{ok:false,reason:"delete_failed"}}catch{return {ok:false,reason:"delete_failed"}}
}

// Decisão explícita do aluno perante um diário que não pode ser resolvido
// automaticamente (bytes mais recentes que o diário, ou cópias em falta):
// manter o progresso atual. Só depois de o conjunto atual ficar numa cópia
// durável; o alvo e a segurança do diário continuam guardados.
export function keepCurrentAndDiscardJournal(scope=scopeNow()){
  const store=local();
  if(!store)return {ok:false,reason:"storage_unavailable"};
  const read=restoreJournalState(scope,store);
  if(read.state==="none")return {ok:true,unchanged:true};
  // Um restauro a meio que ainda pode ser resolvido automaticamente não é abandonado.
  if(read.state==="pending"){
    const target=readCopyKeys(scope,read.journal.target,store),backup=readCopyKeys(scope,read.journal.backup,store),current=canonicalSet(scope,store);
    const foreign=ACADEMIC_KEYS.some(k=>{const v=current[k]??null;return !(target&&(target[k]??null)===v)&&!(backup&&(backup[k]??null)===v);});
    if(!foreign&&(target||backup))return {ok:false,reason:"resolvable"};
  }
  const keep=writeRecoveryCopy({scope,reason:"journal_discarded_current",keys:canonicalSet(scope,store),extra:{journal:read.journal?.id||null}});
  if(!keep||!keep.durable)return {ok:false,reason:"no_space_for_backup"};
  if(!clearRestoreJournal(scope,store))return {ok:false,reason:"journal_not_cleared",copy:keep.key};
  return {ok:true,copy:keep.key};
}
