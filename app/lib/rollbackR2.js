// P1-A v2 — Candidata R2 (LABORATÓRIO): consulta e exportação, compatível com
// os formatos legado (main, F5 #459/#461) e v2. NÃO é uma build de rollback:
// este módulo não está ligado a nenhuma rota nem ao arranque da app. Existe para
// provar, com dados sintéticos, que uma build R2 consegue mostrar e exportar o
// progresso v2 sem alterar nenhum byte (ver docs/security/p1a-v2-rollback-r2.md).
//
// Regras deste módulo (verificadas por tests/unit/p1V2RollbackR2Lab.test.mjs):
//   - só chama getItem/key/length do armazenamento recebido; nunca setItem,
//     removeItem nem clear;
//   - não usa IndexedDB, Web Locks, BroadcastChannel nem o escritor (stateWriter):
//     não cria mandato, selo, marcador nem diário;
//   - não interpreta nem atribui dados sem dono a uma conta: só os lista.
import {ACADEMIC_KEYS,STATE_KEYS,CANONICAL_PREFIX,fingerprint} from "./academicKeys.js";

export const R2_EXPORT_FORMAT="aplus-r2-export-v1";
const LEGACY_ACCOUNT_PREFIX="a25-account-v1:";
const json=raw=>{try{return JSON.parse(raw)}catch{return undefined}};

function keysOf(store){const out=[];try{const n=store?.length||0;for(let i=0;i<n;i++){const k=store.key(i);if(typeof k==="string")out.push(k);}}catch{}return out;}
function read(store,key){try{return store?.getItem(key)??null}catch{return null}}

// Classificação de todas as chaves de um armazenamento, por área.
// Área: "global" (sem conta) ou "acct:<id codificado>".
export function r2Inventory(store){
  const areas=new Map(),other=[];
  const area=tag=>{if(!areas.has(tag))areas.set(tag,{tag,canonical:{},legacy:{},workspace:{},copies:[],v1Copies:[]});return areas.get(tag);};
  for(const key of keysOf(store)){
    if(key.startsWith(CANONICAL_PREFIX)){
      const rest=key.slice(CANONICAL_PREFIX.length);
      const tag=rest.startsWith("acct:")?rest.slice(0,rest.indexOf(":",5)):"global";
      const name=rest.slice(tag.length+1);
      if(name.startsWith("~recovery:"))area(tag).copies.push(key);
      else if(name.startsWith("~"))area(tag).workspace[name.slice(1)]=key;
      else if(ACADEMIC_KEYS.includes(name))area(tag).canonical[name]=key;
      else other.push(key);
      continue;
    }
    if(key.startsWith(LEGACY_ACCOUNT_PREFIX)){
      const rest=key.slice(LEGACY_ACCOUNT_PREFIX.length),cut=rest.indexOf(":");
      const tag=`acct:${rest.slice(0,cut)}`,name=rest.slice(cut+1);
      if(ACADEMIC_KEYS.includes(name))area(tag).legacy[name]=key;
      else if(name.startsWith("a25-state-conflict-v1:")||name.startsWith("a25-state-tabcopy-v1:"))area(tag).v1Copies.push(key);
      else other.push(key);
      continue;
    }
    if(ACADEMIC_KEYS.includes(key)){area("global").legacy[key]=key;continue;}
    if(key.startsWith("a25-state-conflict-v1:")||key.startsWith("a25-state-tabcopy-v1:")){area("global").v1Copies.push(key);continue;}
    other.push(key);
  }
  return {areas:[...areas.values()],other};
}

function setFrom(store,map){return Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,map[k]?read(store,map[k]):null]));}
function summarize(set){
  const state=json(set?.a25??"null")||json(set?.["a25-friends-beta"]??"null");
  const count=v=>Array.isArray(v)?v.length:0;
  if(!state||typeof state!=="object")return {readable:false,xp:null,completed:null};
  return {readable:true,xp:Number.isFinite(Number(state.xp))?Number(state.xp):0,
    completed:count(state.missionHistory)+count(state.examHistory)+Object.values(state.subjectProgress||{}).reduce((n,p)=>n+count(p?.sessions),0)};
}

// Vista de consulta de uma área: qual o conjunto vigente e porquê.
// v2 vigente se a importação terminou (ou há dados canónicos); caso contrário o
// legado. Diário de restauro pendente é assinalado (nunca resolvido aqui).
export function r2AreaView(store,tag){
  const inv=r2Inventory(store).areas.find(a=>a.tag===tag);
  if(!inv)return {tag,source:"none",current:summarize(null),legacy:summarize(null),journalPending:false,copies:0};
  const canonical=setFrom(store,inv.canonical),legacy=setFrom(store,inv.legacy);
  const marker=json(inv.workspace["legacy-import"]?read(store,inv.workspace["legacy-import"]):"null");
  const hasCanonical=ACADEMIC_KEYS.some(k=>canonical[k]!==null);
  const source=marker?.status==="done"||hasCanonical?"v2":(ACADEMIC_KEYS.some(k=>legacy[k]!==null)?"legacy":"none");
  return {tag,source,current:summarize(source==="v2"?canonical:legacy),legacy:summarize(legacy),
    journalPending:!!inv.workspace["restore-journal"],copies:inv.copies.length+inv.v1Copies.length,
    legacyChangedSinceImport:!!marker&&ACADEMIC_KEYS.some(k=>(marker.fp?.[k]??null)!==fingerprint(legacy[k]))};
}

// Exportação integral de uma área: bytes exatos (não normalizados) do canónico,
// do legado, das cópias e das chaves internas, com impressões digitais.
export function r2Export(store,tag,{now=Date.now()}={}){
  const inv=r2Inventory(store).areas.find(a=>a.tag===tag);
  if(!inv)return null;
  const canonical=setFrom(store,inv.canonical),legacy=setFrom(store,inv.legacy);
  const bytes=keys=>Object.fromEntries(keys.map(k=>[k,read(store,k)]));
  return JSON.stringify({format:R2_EXPORT_FORMAT,exportedAt:new Date(now).toISOString(),area:tag,
    canonical,legacy,fingerprints:{canonical:Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,fingerprint(canonical[k])])),legacy:Object.fromEntries(ACADEMIC_KEYS.map(k=>[k,fingerprint(legacy[k])]))},
    workspace:Object.fromEntries(Object.entries(inv.workspace).map(([name,key])=>[name,read(store,key)])),
    copies:bytes(inv.copies),v1Copies:bytes(inv.v1Copies),stateKeys:STATE_KEYS},null,2);
}
