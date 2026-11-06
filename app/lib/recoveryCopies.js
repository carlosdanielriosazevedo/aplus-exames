// P1-A v2 — Cópias de recuperação: formato único, criação durável, listagem.
//
// Uma cópia é sempre um CONJUNTO completo das chaves académicas (estado,
// rascunhos, recibos D3, memória de escrita), por nome curto. Assim pode ser
// restaurada de uma vez, sem misturar estado e recibos de momentos diferentes.
// As cópias da versão experimental anterior (v1: conflito, separador) são
// listadas e normalizadas, nunca reescritas.
// Só importa academicKeys.js (sem ciclos com stateWriter/accountWorkspace).
import {ACADEMIC_KEYS,canonicalKey,legacyKey,workspaceKey,fingerprint} from "./academicKeys.js";

export const RECOVERY_FORMAT="aplus-state-recovery-copy-v2";
const PREFIX="recovery:";
export const recoveryPrefix=scope=>workspaceKey(PREFIX,scope);
const V1_CONFLICT="a25-state-conflict-v1:";
const V1_TABCOPY="a25-state-tabcopy-v1:";

function local(){try{return globalThis.localStorage||null}catch{return null}}
function session(){try{return globalThis.sessionStorage||null}catch{return null}}
function json(raw){try{return JSON.parse(raw)}catch{return undefined}}

// Conjunto {chave curta: bytes|null} lido de um armazenamento.
export function readSet(keyOf,store=local()){
  const set={};
  for(const key of ACADEMIC_KEYS){let raw=null;try{raw=store?store.getItem(keyOf(key)):null}catch{raw=null}set[key]=raw??null;}
  return set;
}
export const canonicalSet=(scope,store=local())=>readSet(key=>canonicalKey(key,scope),store);
export const legacySet=(scope,store=local())=>readSet(key=>legacyKey(key,scope),store);
export const setIsEmpty=set=>ACADEMIC_KEYS.every(key=>set?.[key]===null||set?.[key]===undefined);
export function sameSet(a,b){return ACADEMIC_KEYS.every(key=>(a?.[key]??null)===(b?.[key]??null));}
export function setFingerprints(set){return Object.fromEntries(ACADEMIC_KEYS.map(key=>[key,fingerprint(set?.[key]??null)]));}

function keysOf(store){const out=[];try{for(let i=0;i<store.length;i++){const k=store.key(i);if(typeof k==="string")out.push(k);}}catch{}return out;}

// Grava uma cópia. Primeiro em localStorage (durável); se não couber, em
// sessionStorage (não durável: o chamador decide se isso basta).
// dedupe: se a cópia v2 mais recente deste âmbito tem exatamente o mesmo
// conjunto, reutiliza-a (evita acumular cópias iguais).
// id fixo: substitui a cópia com esse id (usado só para "legado mais recente",
// cujos bytes continuam intactos nas próprias chaves legadas).
export function writeRecoveryCopy({scope,reason,keys,tab=null,dedupe=false,id=null,extra={}}){
  if(dedupe&&!id){
    // Nunca reutilizar a cópia rotativa "legado mais recente": é substituída.
    const same=listV2(scope).filter(c=>c.store===local()&&!c.body.rolling&&sameSet(c.body.keys,keys))[0];
    if(same)return {key:same.key,durable:true,reused:true};
  }
  const at=Date.now();
  const key=recoveryPrefix(scope)+(id||`${at.toString(36)}-${Math.random().toString(36).slice(2,8)}`);
  let raw;
  try{raw=JSON.stringify({format:RECOVERY_FORMAT,scope:scope||"global",reason,at,tab,keys:Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,keys?.[k]??null])),...extra})}catch{return null}
  for(const store of [local(),session()])try{
    if(!store)continue;
    store.setItem(key,raw);
    if(store.getItem(key)===raw)return {key,durable:store===local()};
  }catch{}
  return null;
}

function listV2(scope){
  const prefix=recoveryPrefix(scope),out=[];
  for(const store of [local(),session()]){
    if(!store)continue;
    for(const key of keysOf(store))if(key.startsWith(prefix)){
      const body=json(store.getItem(key));
      if(body&&body.format===RECOVERY_FORMAT&&body.keys&&typeof body.keys==="object")out.push({key,store,body});
    }
  }
  return out;
}

// Converte uma cópia v1 (PR #461 e anteriores) para um conjunto por nome curto.
function v1Set(body,scope){
  const set={},legacyPrefix=legacyKey("",scope);
  const short=full=>{if(typeof full!=="string")return null;const k=full.startsWith(legacyPrefix)?full.slice(legacyPrefix.length):full;return ACADEMIC_KEYS.includes(k)?k:null;};
  const rows=body?.academic?.localStorage;
  if(rows&&typeof rows==="object")for(const [full,raw] of Object.entries(rows)){const k=short(full);if(k)set[k]=raw;}
  if(body?.state&&typeof body.state==="object")try{set.a25??=JSON.stringify(body.state)}catch{}
  if(typeof body?.raw==="string"){const k=short(body.key)||short(body.storageKey)||"a25";set[k]=body.raw;}
  return set;
}
function listV1(scope){
  const out=[];
  for(const store of [local(),session()]){
    if(!store)continue;
    for(const prefix of [legacyKey(V1_CONFLICT,scope),legacyKey(V1_TABCOPY,scope)])
      for(const key of keysOf(store))if(key.startsWith(prefix)){
        const raw=store.getItem(key),body=json(raw);
        const set=body?v1Set(body,scope):{a25:raw};
        out.push({key,store,body:{format:"v1",reason:body?.reason||(prefix.includes("tabcopy")?"tab_copy":"conflict"),at:body?.at||null,keys:set,partial:!ACADEMIC_KEYS.every(k=>k in set)}});
      }
  }
  return out;
}

export function summarizeSet(set){
  const state=json(set?.a25??"null")||json(set?.["a25-friends-beta"]??"null");
  const count=value=>Array.isArray(value)?value.length:0;
  if(!state||typeof state!=="object")return {readable:false,xp:null,completed:null,version:null};
  const completed=count(state.missionHistory)+count(state.examHistory)+Object.values(state.subjectProgress||{}).reduce((n,p)=>n+count(p?.sessions),0);
  return {readable:true,xp:Number.isFinite(Number(state.xp))?Number(state.xp):0,completed,version:state._stateVersion??null};
}

// Todas as cópias deste âmbito (v2 e v1), mais recentes primeiro.
export function listRecoveryCopies(scope){
  return [...listV2(scope),...listV1(scope)].map(({key,store,body})=>({
    id:key,format:body.format,reason:body.reason||null,at:body.at||null,durable:store===local(),
    partial:!!body.partial,keys:body.keys,summary:summarizeSet(body.keys)
  })).sort((a,b)=>(b.at||0)-(a.at||0));
}
export function findRecoveryCopy(scope,id){return listRecoveryCopies(scope).find(copy=>copy.id===id)||null;}

// ---------------------------------------------------------------- diário de restauro
// O localStorage não tem transações: um restauro são 9 escritas independentes e
// um fecho abrupto a meio deixaria estado de um conjunto com recibos D3 de outro.
// Garantia oferecida (não é atomicidade): antes da 1.ª escrita fica gravado um
// diário com o conjunto-alvo FIXADO (cópia imutável) e a cópia de segurança. No
// início de qualquer mandato, antes de qualquer leitura para hidratação, um
// diário pendente é resolvido: conjunto igual ao alvo ou à segurança → concluído;
// misto → completar para o alvo; se não for possível → repor a segurança; se
// nada for possível → o escritor fica só em consulta (nada é gravado por cima).
export const restoreJournalKey=scope=>workspaceKey("restore-journal",scope);
export function readCopyKeys(scope,key,store=local()){
  if(typeof key!=="string"||!key.startsWith(recoveryPrefix(scope)))return null;
  const body=json(store?.getItem(key)??"null");
  return body&&body.format===RECOVERY_FORMAT&&body.keys?Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,body.keys[k]??null])):null;
}
// Escreve o conjunto inteiro (9 chaves) e confirma cada uma por releitura.
export function writeSetExact(store,scope,set,keys=ACADEMIC_KEYS){
  for(const key of keys){
    const full=canonicalKey(key,scope),raw=set?.[key]??null;
    if(raw===null)store.removeItem(full);else store.setItem(full,raw);
    if((store.getItem(full)??null)!==raw)throw new Error(`verify:${key}`);
  }
}
export function readRestoreJournal(scope,store=local()){return json(store?.getItem(restoreJournalKey(scope))??"null")||null;}
export function clearRestoreJournal(scope,store=local()){try{store.removeItem(restoreJournalKey(scope));return store.getItem(restoreJournalKey(scope))===null}catch{return false}}
export function resolveRestoreJournal(scope,store=local()){
  if(!store)return {status:"none"};
  const journal=readRestoreJournal(scope,store);
  if(!journal)return {status:"none"};
  const target=readCopyKeys(scope,journal.target,store),backup=readCopyKeys(scope,journal.backup,store);
  const current=canonicalSet(scope,store);
  const finish=status=>{clearRestoreJournal(scope,store);return {status,journal};};
  if(target&&sameSet(current,target))return finish("completed");
  if(backup&&sameSet(current,backup))return finish("not_applied");
  for(const [set,status] of [[target,"completed_forward"],[backup,"rolled_back"]]){
    if(!set)continue;
    try{writeSetExact(store,scope,set);if(sameSet(canonicalSet(scope,store),set))return finish(status);}catch{}
  }
  return {status:"blocked",journal};
}
