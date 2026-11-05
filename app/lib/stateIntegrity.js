// D2 — Proteção de versões futuras e de estado ilegível.
//
// Este módulo envolve persistence.js (congelado pelo contrato #385) sem o
// alterar. Antes de carregar, gravar ou limpar telemetria, inspeciona os bytes
// guardados. Se encontrar um estado ilegível, com versão inválida ou com versão
// superior à desta app, não carrega, não grava e não limpa nada: os bytes ficam
// exatamente como estavam e a app mostra o estado de recuperação.
import {
  APP_STATE_VERSION,STORAGE_KEY,FRIENDS_STORAGE_KEY,
  loadLocalStateStatus,saveLocalState,clearLocalPilotTelemetry
} from "./persistence.js";
import {browserStores,readStorageRows} from "./browserStorage.js";
import {safeLocalStorage} from "./safeStorage.js";
import {stateWriterCoordinated,stateWritesAllowed,confirmStateWriter,reportForeignStateWrite,withExclusiveStateWrite,reconcileStateTabCopies,stampStateWrite} from "./stateWriter.js";

export const STATE_INTEGRITY_EVENT="approva:state-integrity-blocked";
const PILOT_TELEMETRY_FIELDS=["pilotAggregates","pilotItemResults","betaFeedback","betaSessions","betaEvents"];

// Bytes já inspecionados (ou escritos por esta app) por chave: evita reanalisar
// o estado completo em cada gravação.
const trusted=new Map();
let lastBlock=null;

export function lastStateIntegrityBlock(){return lastBlock}

function announce(block){
  lastBlock=block;
  if(typeof window!=="undefined")try{
    window.dispatchEvent(new CustomEvent(STATE_INTEGRITY_EVENT,{detail:block}));
  }catch{}
}

export function classifyStoredState(raw){
  let value;
  try{value=JSON.parse(raw)}catch{return {ok:false,reason:"state_unreadable"}}
  if(!value||typeof value!=="object"||Array.isArray(value))return {ok:false,reason:"state_unreadable"};
  const version=value._stateVersion;
  if(version===undefined)return {ok:true,version:null};
  if(!Number.isInteger(version)||version<1)return {ok:false,reason:"state_version_invalid",version};
  if(version>APP_STATE_VERSION)return {ok:false,reason:"state_version_future",version};
  return {ok:true,version};
}

export function inspectStoredState(storageKey=STORAGE_KEY){
  const {rows,readable}=readStorageRows(storageKey);
  if(!readable)return {ok:false,reason:"state_storage_unavailable",key:storageKey};
  const known=trusted.get(storageKey);
  for(const [,raw] of rows){
    if(known&&known.has(raw))continue;
    const verdict=classifyStoredState(raw);
    if(!verdict.ok)return {...verdict,key:storageKey};
  }
  trusted.set(storageKey,new Set(rows.map(([,raw])=>raw)));
  return {ok:true,key:storageKey};
}

function stateKey(state,storageKey){
  return storageKey||(state?.betaMode==="friends_beta"?FRIENDS_STORAGE_KEY:STORAGE_KEY);
}

export function guardedLoadLocalStateStatus(initial,emptyScores,storageKey=STORAGE_KEY){
  const key=storageKey||STORAGE_KEY;
  const integrity=inspectStoredState(key);
  if(!integrity.ok){
    // Não chamar o carregador: no formato atual ele remove entradas ilegíveis.
    announce({...integrity,operation:"load"});
    return {state:null,found:true,error:true,reason:integrity.reason,version:integrity.version};
  }
  return loadLocalStateStatus(initial,emptyScores,storageKey);
}

// P1-A (defesa em profundidade): com coordenação ativa, bytes do estado que
// este separador não leu nem escreveu significam outro escritor (por exemplo,
// um separador de uma versão anterior sem lock). Não se grava por cima: o
// separador bloqueia e guarda uma cópia do que tinha (stateWriter.js).
function foreignStateRows(key){
  const known=trusted.get(key);
  if(!known)return false;
  const {rows}=readStorageRows(key);
  return rows.some(([,raw])=>!known.has(raw));
}

function rawGuardedSave(state,storageKey,key){
  if(stateWriterCoordinated()){
    if(!stateWritesAllowed())return false;
    if(foreignStateRows(key)){reportForeignStateWrite(state);return false;}
    if(!confirmStateWriter(state))return false;
    // Carimbo do escritor dentro do próprio valor (mesmo setItem): permite ao
    // próximo escritor provar que leu esta escrita (selo final, stateWriter.js).
    state=stampStateWrite(state);
  }
  const integrity=inspectStoredState(key);
  if(!integrity.ok){
    announce({...integrity,operation:"save"});
    return false;
  }
  const ok=saveLocalState(state,storageKey);
  if(ok){
    const {rows}=readStorageRows(key);
    trusted.set(key,new Set(rows.map(([,raw])=>raw)));
  }
  return ok;
}

// Todas as gravações normais indicam também o nível de armazenamento atingido.
export function guardedSaveLocalState(state,storageKey=null){
  return saveLocalStateWithTier(state,storageKey).ok;
}

// Limpeza de telemetria piloto após retirada de consentimento.
// Com estado íntegro em ambas as chaves, mantém exatamente o comportamento
// original. Se alguma chave estiver bloqueada, essa chave não é tocada e as
// restantes são limpas aqui, preservando a versão gravada.
export function guardedClearLocalPilotTelemetry(){
  if(typeof window==="undefined")return {ok:true,skipped:[]};
  const keys=[STORAGE_KEY,FRIENDS_STORAGE_KEY];
  const verdicts=keys.map(key=>[key,inspectStoredState(key)]);
  const blocked=verdicts.filter(([,v])=>!v.ok);
  if(!blocked.length){
    clearLocalPilotTelemetry();
    for(const key of keys)trusted.delete(key);
    return {ok:true,skipped:[]};
  }
  for(const [key,verdict] of verdicts){
    if(!verdict.ok)continue;
    for(const store of browserStores())try{
      const raw=store.getItem(key);
      if(!raw)continue;
      const value=JSON.parse(raw);
      const clean={...value};
      for(const field of PILOT_TELEMETRY_FIELDS)delete clean[field];
      store.setItem(key,JSON.stringify({...clean,_stateVersion:APP_STATE_VERSION,_savedAt:Date.now()}));
    }catch{}
    trusted.delete(key);
  }
  for(const [key,verdict] of blocked)announce({...verdict,key,operation:"clear_pilot_telemetry"});
  return {ok:false,skipped:blocked.map(([key,v])=>({key,reason:v.reason}))};
}

// P1-A: páginas fora da app (piloto/definições) só reescrevem o estado se
// nenhum separador da app for o escritor. Se houver escritor, este volta a
// gravar e, com o consentimento já retirado, grava sem telemetria piloto.
// P1-A: na hidratação, cópias de separador deixadas pela versão experimental
// anterior que não correspondem ao estado passam a cópias de conflito e são assinaladas.
export function reconcileTabCopiesAtHydration(storageKey=STORAGE_KEY){
  const {rows}=readStorageRows(storageKey);
  const local=safeLocalStorage(),durable=local&&rows.find(([store])=>(store?.source||store)===local);
  return reconcileStateTabCopies(storageKey,durable?durable[1]:null);
}

export async function coordinatedClearLocalPilotTelemetry(scope="global"){
  const result=await withExclusiveStateWrite(scope,()=>guardedClearLocalPilotTelemetry());
  return result.ok?result.value:{ok:false,deferred:true,skipped:[]};
}

export function resetStateIntegrityCache(){trusted.clear();lastBlock=null;lastTier=null}

// ---------------------------------------------------------------------------
// Durabilidade da gravação.
//
// writeStorageFallback (congelado pelo #385) grava no primeiro armazenamento que
// aceitar: localStorage → sessionStorage → memória, e devolve sempre sucesso.
// Aqui distinguimos onde a gravação ficou de facto:
//   "durable": localStorage (sobrevive a reload e ao fecho do separador);
//   "tab":     sessionStorage (sobrevive a reload; perde-se ao fechar o separador);
//   "memory":  só memória (perde-se no reload);
//   "failed":  nada foi gravado.
// Em "tab"/"memory", a cópia anterior em localStorage continua lá e reaparece
// quando o separador é fechado.
export const STORAGE_TIER_EVENT="approva:storage-tier";
let lastTier=null;
export function lastStorageTier(){return lastTier}

const baseStore=store=>store?.source||store;
function tierOf(store){
  const base=baseStore(store);
  try{if(base&&base===globalThis.localStorage)return "durable"}catch{}
  try{if(base&&base===globalThis.sessionStorage)return "tab"}catch{}
  return "memory";
}
function readAll(key){
  return browserStores().map(store=>{try{return store.getItem(key)}catch{return undefined}});
}
function announceTier(tier,key){
  lastTier=tier;
  if(typeof window!=="undefined")try{
    window.dispatchEvent(new CustomEvent(STORAGE_TIER_EVENT,{detail:{tier,key}}));
  }catch{}
}

// Grava e indica em que nível de armazenamento a gravação ficou.
export function saveLocalStateWithTier(state,storageKey=null){
  const key=stateKey(state,storageKey);
  const stores=browserStores();
  const before=readAll(key);
  if(!rawGuardedSave(state,storageKey,key))return {ok:false,tier:"failed",key,before,stores};
  const after=readAll(key);
  const index=after.findIndex((raw,i)=>raw!==null&&raw!==undefined&&raw!==before[i]);
  const tier=index<0?"failed":tierOf(stores[index]);
  announceTier(tier,key);
  return {ok:tier!=="failed",tier,key,before,stores};
}

export function durabilityFailureReason(tier){
  return tier==="tab"?"state_tab_only":tier==="memory"?"state_memory_only":"state_write_failed";
}

// Gravação exigida antes de confirmar uma avaliação ou apagar o seu rascunho.
// Se não ficar em localStorage, repõe exatamente o que havia nos níveis não
// duráveis (para que a conclusão não pareça feita após um reload) e falha.
export function saveLocalStateDurably(state,storageKey=null){
  const result=saveLocalStateWithTier(state,storageKey);
  if(result.tier==="durable")return {ok:true,tier:"durable"};
  if(result.tier!=="failed"){
    result.stores.forEach((store,i)=>{
      if(tierOf(store)==="durable")return;
      try{
        const previous=result.before[i];
        if(previous===null||previous===undefined)store.removeItem(result.key);
        else store.setItem(result.key,previous);
      }catch{}
    });
    const {rows}=readStorageRows(result.key);
    trusted.set(result.key,new Set(rows.map(([,raw])=>raw)));
  }
  return {ok:false,tier:result.tier};
}
