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

export function guardedSaveLocalState(state,storageKey=null){
  const key=stateKey(state,storageKey);
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

export function resetStateIntegrityCache(){trusted.clear();lastBlock=null}
