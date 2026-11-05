// P1-A — Um único separador escreve o progresso de cada área (conta ou global).
//
// localStorage não tem compare-and-swap atómico; comparar revisões e depois
// gravar deixa sempre uma janela em que dois separadores se sobrepõem. Por isso
// a exclusão é feita fora do armazenamento:
//
// 1. Web Locks: o separador que detém o lock exclusivo
//    `approva-state-writer-v1:<área>` é o único escritor. O browser liberta o
//    lock quando o separador fecha, falha ou recarrega (recuperação após fecho
//    abrupto). Nunca usamos `steal`: um escritor suspenso não perde o lock sem
//    saber e não pode gravar depois de outro ter começado.
// 2. Passagem de controlo cooperativa: o separador que quer escrever pede; o
//    escritor grava o estado atual, deixa de escrever, liberta o lock e
//    recarrega como observador. Se não responder, nada é forçado.
// 3. Sem Web Locks (ou com Web Locks indisponíveis) e com localStorage
//    partilhado entre separadores, NÃO existe mecanismo fiável de exclusão:
//    qualquer concessão em localStorage é apenas deteção, porque a propagação
//    entre processos é assíncrona. Falha segura: modo só de leitura. O
//    separador pode ler e mostrar o progresso, mas não grava estado, rascunhos
//    nem conclusões, e não abre avaliações.
// 4. Sem localStorage acessível, cada separador só tem o seu sessionStorage e a
//    sua memória: nada é partilhado, logo não há sobrescrita entre separadores.
//
// Em todos os modos, um separador que não é escritor não grava (accountWorkspace.js).
// Mesmo formato de accountWorkspace.accountStorageKey (sem importar: evita ciclo).
const accountStorageKey=(key,subject)=>subject?`a25-account-v1:${encodeURIComponent(subject)}:${key}`:key;

export const STATE_WRITER_EVENT="approva:state-writer";
export const STATE_CONFLICT_PREFIX="a25-state-conflict-v1:";
// Cópias de separador gravadas pela versão experimental anterior (concessão).
// Já não são criadas; as existentes continuam a ser reconciliadas, nunca apagadas às cegas.
export const STATE_TAB_COPY_PREFIX="a25-state-tabcopy-v1:";
const LOCK_PREFIX="approva-state-writer-v1:";
const SIGNAL_KEY="a25-state-writer-signal-v1";
const CHANNEL="approva-state-writer-v1";
const WATCHED_STATE_KEYS=["a25","a25-friends-beta"];

export const STATE_WRITER_TIMING={
  reloadWaitMs:1_500,     // um reload liberta o lock antes de o novo documento pedir
  requestTimeoutMs:8_000, // espera por uma passagem de controlo pedida
  // Barreira de escrita: o Chromium não ordena a concessão do lock em relação à
  // propagação do localStorage entre processos. Depois de obter o lock, o novo
  // escritor espera que a sua vista do estado coincida com a anunciada pelo
  // escritor anterior e fique estável; só então lê e grava.
  fenceMessageWaitMs:1_000,
  settleStepMs:100,
  settleStableSteps:2,
  settleMaxMs:2_500
};

const tabId=`writer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
let status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
let options={flush:()=>true,snapshot:()=>null};
let releaseLock=null,channel=null,listening=false,starting=null,releaseTimer=null,releaseFence=null;
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

const hasWindow=()=>typeof window!=="undefined";
function locks(){try{return hasWindow()&&globalThis.navigator?.locks?.request?globalThis.navigator.locks:null}catch{return null}}
function rawLocal(){try{return globalThis.localStorage||null}catch{return null}}
const scopedKey=key=>accountStorageKey(key,status.scope&&status.scope!=="global"?status.scope:null);

function emit(){
  if(!hasWindow())return;
  try{window.dispatchEvent(new CustomEvent(STATE_WRITER_EVENT,{detail:stateWriterStatus()}))}catch{}
}
function set(next){status={...status,...next};emit();}

export function stateWriterStatus(){return {...status,tabId}}
// Sem coordenação ativa (servidor, testes, outras páginas) a escrita segue o
// comportamento anterior. Com coordenação, só o escritor grava.
export function stateWritesAllowed(){return status.mode==="inactive"||status.mode==="writer"}
export function stateWriterCoordinated(){return status.mode!=="inactive"}
export function stateWriterReadOnly(){return status.mode==="readonly"}

// ---------------------------------------------------------------- mensagens
function post(message){
  const body={...message,scope:status.scope,from:tabId,at:Date.now(),nonce:Math.random().toString(36).slice(2)};
  try{if(channel){channel.postMessage(body);return;}}catch{}
  try{rawLocal()?.setItem(scopedKey(SIGNAL_KEY),JSON.stringify(body))}catch{}
}
function onMessage(message){
  if(!message||message.scope!==status.scope||message.from===tabId)return;
  // Um pedido que o requerente já está prestes a abandonar é ignorado: assim o
  // escritor nunca liberta quando já ninguém está à espera.
  if(Date.now()-Number(message.at||0)>STATE_WRITER_TIMING.requestTimeoutMs*0.75)return;
  if(message.type==="handoff-released"&&typeof message.digest==="string")releaseFence={digest:message.digest,at:Date.now()};
  else if(message.type==="handoff-request")handleHandoffRequest();
  else if(message.type==="flush-request"&&status.mode==="writer"){try{options.flush()}catch{}}
}

// ---------------------------------------------------------------- Web Locks
function lockName(){return LOCK_PREFIX+encodeURIComponent(status.scope||"global")}
// Devolve true (lock obtido), false (ocupado/expirado) ou "unavailable"
// (o browser expõe a API mas recusa-a, p. ex. contexto sem permissão).
function lockAcquire(wait){
  const api=locks();
  if(!api)return Promise.resolve("unavailable");
  return new Promise(resolve=>{
    let timer=null,controller=null,settled=false;
    const done=value=>{if(settled)return;settled=true;if(timer)clearTimeout(timer);resolve(value);};
    const request={mode:"exclusive"};
    if(wait>0&&typeof AbortController!=="undefined"){
      controller=new AbortController();request.signal=controller.signal;
      timer=setTimeout(()=>controller.abort(),wait);
    }else request.ifAvailable=true;
    let pending;
    try{
      pending=api.request(lockName(),request,lock=>{
        if(!lock){done(false);return undefined;}
        if(settled){return undefined;} // pedido expirou entretanto: devolver já
        done(true);
        return new Promise(release=>{releaseLock=release;});
      });
    }catch{done("unavailable");return;}
    Promise.resolve(pending).catch(error=>done(error?.name==="AbortError"?false:"unavailable"));
  });
}

// ---------------------------------------------------------------- barreira
function viewOfState(){
  const store=rawLocal();if(!store)return "[]";
  try{return JSON.stringify(WATCHED_STATE_KEYS.map(key=>store.getItem(scopedKey(key))))}catch{return null}
}
export function stateDigest(view=viewOfState()){
  if(view===null)return null;
  let h=2166136261;for(let i=0;i<view.length;i++){h^=view.charCodeAt(i);h=Math.imul(h,16777619);}
  return `sd1-${(h>>>0).toString(16)}-${view.length}`;
}
// true: a vista local do estado está alinhada (pronta para ler/gravar).
async function settleAfterAcquire({expectFence=false}={}){
  const T=STATE_WRITER_TIMING,deadline=Date.now()+T.settleMaxMs;
  if(expectFence){
    const until=Date.now()+T.fenceMessageWaitMs;
    while(!releaseFence&&Date.now()<until)await sleep(T.settleStepMs);
  }
  const fence=releaseFence&&Date.now()-releaseFence.at<T.settleMaxMs+T.requestTimeoutMs?releaseFence.digest:null;
  let previous=viewOfState(),stable=0;
  while(Date.now()<deadline){
    await sleep(T.settleStepMs);
    const current=viewOfState();
    stable=current!==null&&current===previous?stable+1:0;previous=current;
    if(stable>=T.settleStableSteps&&(!fence||stateDigest(current)===fence)){releaseFence=null;return true;}
  }
  return false;
}
async function becomeWriter(options={}){
  if(await settleAfterAcquire(options)){set({mode:"writer",reason:null});return true;}
  // A vista não convergiu: nunca ler/gravar sobre bytes possivelmente antigos.
  const release=releaseLock;releaseLock=null;try{release?.()}catch{}
  set({mode:"observer",reason:"sync_pending"});
  return false;
}

// ---------------------------------------------------------------- conflito
function preserveConflictCopy(state){
  if(!state||typeof state!=="object")return null;
  const key=scopedKey(`${STATE_CONFLICT_PREFIX}${tabId}:${Date.now()}`);
  let raw;try{raw=JSON.stringify({format:"aplus-state-conflict-copy-v1",tab:tabId,at:Date.now(),reason:status.reason,state})}catch{return null}
  for(const store of [rawLocal(),(()=>{try{return globalThis.sessionStorage}catch{return null}})()])try{
    if(!store)continue;
    store.setItem(key,raw);
    if(store.getItem(key)===raw)return {key,durable:store===rawLocal()};
  }catch{}
  return null;
}
function lose(reason,state=null){
  if(status.mode==="conflict")return;
  const copy=preserveConflictCopy(state||safeSnapshot());
  set({mode:"conflict",reason,conflictCopy:copy});
}
function safeSnapshot(){try{return options.snapshot()}catch{return null}}

// Chamado por stateIntegrity antes de cada gravação do estado.
export function confirmStateWriter(){
  if(status.mode==="inactive")return true;
  return status.mode==="writer";
}
// Na hidratação (já como escritor): cópias de separador da versão anterior
// iguais ao estado guardado são removidas; diferentes passam a cópias de
// conflito, nunca apagadas. Devolve as que ficaram preservadas.
export function reconcileStateTabCopies(storageKey,currentRaw){
  const store=rawLocal();if(!store)return [];
  const prefix=scopedKey(STATE_TAB_COPY_PREFIX),found=[],preserved=[];
  try{for(let i=0;i<store.length;i++){const key=store.key(i);if(typeof key==="string"&&key.startsWith(prefix))found.push(key);}}catch{return []}
  for(const key of found)try{
    const raw=store.getItem(key);let copy=null;try{copy=JSON.parse(raw)}catch{}
    if(copy&&copy.storageKey!==storageKey)continue;
    if(copy&&typeof copy.raw==="string"&&copy.raw===currentRaw){store.removeItem(key);continue;}
    const target=key.replace(prefix,scopedKey(STATE_CONFLICT_PREFIX))+`:${Date.now()}`;
    store.setItem(target,raw);
    if(store.getItem(target)===raw){store.removeItem(key);preserved.push(target);}
  }catch{}
  return preserved;
}

// Bytes do estado alterados por outro separador desde a última leitura/escrita.
export function reportForeignStateWrite(state,reason="foreign_write"){
  if(status.mode==="writer")lose(reason,state);
}

function onStorage(event){
  if(!event||typeof event.key!=="string")return;
  if(event.key===scopedKey(SIGNAL_KEY)){try{onMessage(JSON.parse(event.newValue||"null"))}catch{}return;}
  if(status.mode!=="writer")return;
  if(WATCHED_STATE_KEYS.some(key=>event.key===scopedKey(key)))lose("foreign_write");
}
function onVisible(){
  if(document.visibilityState==="visible"&&status.mode==="observer")void tryBecomeWriter({quiet:true});
}
function onPageShow(event){
  // Um documento restaurado da cache de navegação não volta a disputar o lock
  // sozinho: recarregar repõe a arbitragem.
  if(event?.persisted&&status.mode!=="inactive")try{window.location.reload()}catch{}
}
function listen(){
  if(listening||!hasWindow())return;
  listening=true;
  try{if(typeof BroadcastChannel!=="undefined"){channel=new BroadcastChannel(CHANNEL);channel.onmessage=event=>onMessage(event.data);}}catch{channel=null}
  window.addEventListener("storage",onStorage);
  window.addEventListener("pageshow",onPageShow);
  document.addEventListener("visibilitychange",onVisible);
}

// ---------------------------------------------------------------- ciclo de vida
async function acquire({initial}){
  if(locks()){
    set({method:"locks"});
    const result=await lockAcquire(initial?STATE_WRITER_TIMING.reloadWaitMs:0);
    if(result!=="unavailable")return result;
  }
  // Sem localStorage acessível nada é partilhado entre separadores.
  if(!rawLocal()){set({method:"isolated"});return true;}
  set({method:"none"});
  return "readonly";
}

export function startStateWriter({scope="global",flush,snapshot}={}){
  if(typeof flush==="function")options.flush=flush;
  if(typeof snapshot==="function")options.snapshot=snapshot;
  if(!hasWindow())return Promise.resolve(stateWriterStatus());
  if(status.scope&&status.scope!==scope)return Promise.resolve(stateWriterStatus());
  if(["writer","observer","conflict","releasing","readonly"].includes(status.mode))return Promise.resolve(stateWriterStatus());
  if(starting)return starting;
  status={...status,scope,mode:"acquiring",reason:null};
  listen();emit();
  starting=acquire({initial:true}).then(async result=>{
    if(result===true&&status.method==="locks")await becomeWriter();
    else if(result===true)set({mode:"writer",reason:null});
    else if(result==="readonly")set({mode:"readonly",reason:locks()?"locks_unavailable":"no_web_locks"});
    else set({mode:"observer",reason:"other_tab"});
    starting=null;
    return stateWriterStatus();
  });
  return starting;
}

async function tryBecomeWriter({quiet=false}={}){
  if(status.mode!=="observer")return stateWriterStatus();
  const result=await lockAcquire(0);
  if(result===true)await becomeWriter();
  else if(!quiet)set({reason:"other_tab"});
  return stateWriterStatus();
}

// Ação explícita do aluno no separador observador: "Continuar neste separador".
export async function requestStateWriter(){
  if(status.mode!=="observer")return stateWriterStatus();
  const immediate=await tryBecomeWriter({quiet:true});
  if(immediate.mode==="writer")return immediate;
  set({reason:"waiting"});
  post({type:"handoff-request"});
  const result=await lockAcquire(STATE_WRITER_TIMING.requestTimeoutMs);
  if(status.mode!=="observer")return stateWriterStatus();
  if(result===true)await becomeWriter({expectFence:true});
  else set({reason:"no_answer"});
  return stateWriterStatus();
}

function handleHandoffRequest(){
  if(status.mode!=="writer")return;
  let flushed=false;
  try{flushed=options.flush()!==false}catch{flushed=false}
  if(!flushed){post({type:"handoff-refused"});return;}
  set({mode:"releasing",reason:"handoff"});
  // A app desmonta a superfície de estudo e chama completeStateWriterRelease.
  releaseTimer=setTimeout(completeStateWriterRelease,1_000);
}

export function completeStateWriterRelease(){
  if(status.mode!=="releasing")return;
  if(releaseTimer){clearTimeout(releaseTimer);releaseTimer=null;}
  // Anunciar exatamente o que este separador gravou por último, antes de libertar.
  post({type:"handoff-released",digest:stateDigest()});
  const release=releaseLock;releaseLock=null;
  try{release?.()}catch{}
  set({mode:"released"});
  try{window.location.reload()}catch{}
}

// Outras páginas (piloto/definições) que precisam de alterar o estado só o
// fazem se nenhum separador da app for escritor; caso contrário pedem ao
// escritor que volte a gravar (aplica, por exemplo, a retirada de telemetria).
// Sem Web Locks nenhum separador da app escreve (só leitura), por isso a
// página pode aplicar a limpeza, que só remove telemetria.
export async function withExclusiveStateWrite(scope,write){
  if(!hasWindow())return {ok:false,deferred:false};
  const previous=status.scope;status.scope=scope||"global";
  try{
    const api=locks();
    if(api){
      let result={ok:false,deferred:true};
      try{
        await api.request(lockName(),{mode:"exclusive",ifAvailable:true},lock=>{
          if(lock)result={ok:true,deferred:false,value:write()};
        });
      }catch{return {ok:true,deferred:false,value:write()};}
      if(result.deferred)post({type:"flush-request"});
      return result;
    }
    return {ok:true,deferred:false,value:write()};
  }finally{if(status.mode==="inactive")status.scope=previous;}
}

// Apenas para testes unitários.
export function resetStateWriterForTests(){
  try{releaseLock?.()}catch{}
  releaseLock=null;starting=null;
  if(releaseTimer){clearTimeout(releaseTimer);releaseTimer=null;}
  status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
  options={flush:()=>true,snapshot:()=>null};
}
