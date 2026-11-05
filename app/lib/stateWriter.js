// P1-A — Um único separador escreve o progresso de cada área (conta ou global).
//
// localStorage não tem compare-and-swap atómico; comparar revisões e depois
// gravar deixa sempre uma janela em que dois separadores se sobrepõem. Por isso
// a exclusão é feita fora do armazenamento:
//
// 1. Web Locks (principal): o separador que detém o lock exclusivo
//    `approva-state-writer-v1:<área>` é o único escritor. O browser liberta o
//    lock quando o separador fecha, falha ou recarrega (recuperação após fecho
//    abrupto). Nunca usamos `steal`: um escritor suspenso não perde o lock sem
//    saber e não pode gravar depois de outro ter começado.
// 2. Passagem de controlo cooperativa: o separador que quer escrever pede; o
//    escritor grava o estado atual, deixa de escrever, liberta o lock e
//    recarrega como observador. Se não responder, nada é forçado.
// 3. Sem Web Locks: concessão (lease) com batimento em localStorage. Não é
//    exclusão garantida, por isso cada gravação confirma primeiro a concessão,
//    e qualquer escrita alheia detetada (evento `storage` ou bytes inesperados)
//    bloqueia imediatamente este separador e guarda uma cópia do que tinha.
//
// Em todos os modos, um separador que não é escritor não grava: nem estado,
// nem rascunhos, nem registo de conclusões (ver accountWorkspace.js).
// Mesmo formato de accountWorkspace.accountStorageKey (sem importar: evita ciclo).
const accountStorageKey=(key,subject)=>subject?`a25-account-v1:${encodeURIComponent(subject)}:${key}`:key;

export const STATE_WRITER_EVENT="approva:state-writer";
export const STATE_CONFLICT_PREFIX="a25-state-conflict-v1:";
// Sem Web Locks: cópia durável dos bytes que cada separador gravou por último.
export const STATE_TAB_COPY_PREFIX="a25-state-tabcopy-v1:";
const LOCK_PREFIX="approva-state-writer-v1:";
const LEASE_KEY="a25-state-writer-lease-v1";
const SIGNAL_KEY="a25-state-writer-signal-v1";
const CHANNEL="approva-state-writer-v1";
const WATCHED_STATE_KEYS=["a25","a25-friends-beta"];

export const STATE_WRITER_TIMING={
  reloadWaitMs:1_500,     // um reload liberta o lock antes de o novo documento pedir
  requestTimeoutMs:8_000, // espera por uma passagem de controlo pedida
  leaseTtlMs:30_000,      // sem Web Locks: validade da concessão
  heartbeatMs:5_000,
  claimSettleMs:600,
  presenceWaitMs:400,     // sem Web Locks: espera por um escritor vivo antes de assumir
  noAnswerMs:3_000
};

const tabId=`writer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
let status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
let options={flush:()=>true,snapshot:()=>null};
let releaseLock=null,heartbeat=null,channel=null,listening=false,starting=null,releaseTimer=null,presence=null;

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const hasWindow=()=>typeof window!=="undefined";
function locks(){try{return hasWindow()&&globalThis.navigator?.locks?.request?globalThis.navigator.locks:null}catch{return null}}
function rawLocal(){try{return globalThis.localStorage||null}catch{return null}}
// localStorage pode existir e recusar escritas (bloqueado/modo privado antigo).
function localWritable(){
  const store=rawLocal();if(!store)return false;
  const probe=`a25-state-writer-probe-v1:${tabId}`;
  try{store.setItem(probe,"1");store.removeItem(probe);return true}catch{return false}
}
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
  if(message.type==="writer-ping"&&status.mode==="writer")post({type:"writer-pong"});
  else if(message.type==="writer-pong"&&presence)presence();
  else if(message.type==="handoff-request")handleHandoffRequest();
  else if(message.type==="flush-request"&&status.mode==="writer"){try{options.flush()}catch{}}
}

// ---------------------------------------------------------------- Web Locks
function lockName(){return LOCK_PREFIX+encodeURIComponent(status.scope||"global")}
function lockAcquire(wait){
  const api=locks();
  if(!api)return Promise.resolve(false);
  return new Promise(resolve=>{
    let timer=null,controller=null,settled=false;
    const done=value=>{if(settled)return;settled=true;if(timer)clearTimeout(timer);resolve(value);};
    const request={mode:"exclusive"};
    if(wait>0&&typeof AbortController!=="undefined"){
      controller=new AbortController();request.signal=controller.signal;
      timer=setTimeout(()=>controller.abort(),wait);
    }else request.ifAvailable=true;
    api.request(lockName(),request,lock=>{
      if(!lock){done(false);return undefined;}
      if(settled){return undefined;} // pedido expirou entretanto: devolver já
      done(true);
      return new Promise(release=>{releaseLock=release;});
    }).catch(()=>done(false));
  });
}

// ---------------------------------------------------------------- concessão
function readLease(){
  try{const value=JSON.parse(rawLocal()?.getItem(scopedKey(LEASE_KEY))||"null");return value&&typeof value.tab==="string"?value:null}
  catch{return null}
}
function writeLease(){
  try{rawLocal()?.setItem(scopedKey(LEASE_KEY),JSON.stringify({tab:tabId,exp:Date.now()+STATE_WRITER_TIMING.leaseTtlMs}));return true}
  catch{return false}
}
function leaseOwned(){return readLease()?.tab===tabId}
// Um escritor vivo responde ao ping. Reduz a janela de arranque simultâneo,
// mas não a fecha: a propagação entre processos pode atrasar mensagens e bytes.
function writerAnswers(){
  return new Promise(resolve=>{
    const timer=setTimeout(()=>{presence=null;resolve(false);},STATE_WRITER_TIMING.presenceWaitMs);
    presence=()=>{clearTimeout(timer);presence=null;resolve(true);};
    post({type:"writer-ping"});
  });
}
async function leaseAcquire({force=false}={}){
  let current=readLease();
  if(current&&current.tab!==tabId&&current.exp>Date.now()&&!force)return false;
  if(!force&&await writerAnswers())return false;
  current=readLease();
  if(current&&current.tab!==tabId&&current.exp>Date.now()&&!force)return false;
  if(!writeLease())return false;
  await sleep(STATE_WRITER_TIMING.claimSettleMs);
  return leaseOwned();
}
function startHeartbeat(){
  if(heartbeat||status.method!=="lease")return;
  heartbeat=setInterval(()=>{
    if(status.mode!=="writer")return;
    if(!leaseOwned()){lose("lease_lost");return;}
    writeLease();
  },STATE_WRITER_TIMING.heartbeatMs);
}

// ---------------------------------------------------------------- perda/conflito
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
  stopHeartbeat();
  set({mode:"conflict",reason,conflictCopy:copy});
}
function safeSnapshot(){try{return options.snapshot()}catch{return null}}
function stopHeartbeat(){if(heartbeat){clearInterval(heartbeat);heartbeat=null;}}

// Chamado por stateIntegrity antes de cada gravação do estado.
export function confirmStateWriter(state){
  if(status.mode==="inactive")return true;
  if(status.mode!=="writer")return false;
  if(status.method==="lease"){
    if(!leaseOwned()){lose("lease_lost",state);return false;}
    writeLease();
  }
  return true;
}
// Sem Web Locks a exclusão não é garantida. Para que uma sobrescrita por um
// segundo escritor nunca apague progresso sem cópia, cada gravação do estado
// neste modo guarda também os bytes exatos numa chave própria do separador.
// Se essa cópia não puder ser gravada, o separador deixa de escrever.
export function noteStateWritten(storageKey,raw,state){
  if(status.mode!=="writer"||status.method!=="lease"||typeof raw!=="string")return true;
  const key=scopedKey(`${STATE_TAB_COPY_PREFIX}${tabId}`);
  let body;try{body=JSON.stringify({format:"aplus-state-tab-copy-v1",tab:tabId,storageKey,at:Date.now(),raw})}catch{body=null}
  try{
    const store=rawLocal();
    if(body&&store){store.setItem(key,body);if(store.getItem(key)===body)return true;}
  }catch{}
  lose("tab_copy_failed",state);
  return false;
}
// Na hidratação (já como escritor): cópias de separadores iguais ao estado
// guardado foram substituídas de forma legítima e são removidas; cópias
// diferentes são progresso que pode ter sido sobrescrito e passam a cópias de
// conflito, nunca apagadas. Devolve as que ficaram preservadas.
export function reconcileStateTabCopies(storageKey,currentRaw){
  const store=rawLocal();if(!store)return [];
  const prefix=scopedKey(STATE_TAB_COPY_PREFIX),found=[],preserved=[];
  try{for(let i=0;i<store.length;i++){const key=store.key(i);if(typeof key==="string"&&key.startsWith(prefix))found.push(key);}}catch{return []}
  for(const key of found)try{
    const raw=store.getItem(key);let copy=null;try{copy=JSON.parse(raw)}catch{}
    if(copy&&copy.storageKey!==storageKey)continue;
    if(copy&&copy.tab===tabId)continue;
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
  if(status.method==="lease"&&event.key===scopedKey(LEASE_KEY)){
    let lease=null;try{lease=JSON.parse(event.newValue||"null")}catch{}
    if(lease?.tab!==tabId)lose("lease_taken");
    return;
  }
  if(WATCHED_STATE_KEYS.some(key=>event.key===scopedKey(key)))lose("foreign_write");
}
function onVisible(){
  if(document.visibilityState!=="visible")return;
  if(status.mode==="writer"&&status.method==="lease"&&!leaseOwned())lose("lease_lost");
  else if(status.mode==="observer")void tryBecomeWriter({quiet:true});
}
function onPageShow(event){
  // Um documento restaurado da cache de navegação não volta a disputar o lock
  // sozinho: recarregar repõe a arbitragem.
  if(event?.persisted&&status.mode!=="inactive")try{window.location.reload()}catch{}
}
// Sem Web Locks: um separador que fecha deixa de escrever e liberta a concessão
// (a cópia do separador fica, para a reconciliação da próxima abertura).
function onPageHide(){
  if(status.mode!=="writer"||status.method!=="lease"||!leaseOwned())return;
  stopHeartbeat();
  try{rawLocal()?.removeItem(scopedKey(LEASE_KEY))}catch{}
  status={...status,mode:"released",reason:"pagehide"};
}
function listen(){
  if(listening||!hasWindow())return;
  listening=true;
  try{if(typeof BroadcastChannel!=="undefined"){channel=new BroadcastChannel(CHANNEL);channel.onmessage=event=>onMessage(event.data);}}catch{channel=null}
  window.addEventListener("storage",onStorage);
  window.addEventListener("pageshow",onPageShow);
  window.addEventListener("pagehide",onPageHide);
  document.addEventListener("visibilitychange",onVisible);
}

// ---------------------------------------------------------------- ciclo de vida
async function acquire({initial}){
  const api=locks();
  if(api){
    set({method:"locks"});
    return lockAcquire(initial?STATE_WRITER_TIMING.reloadWaitMs:0);
  }
  // Sem localStorage nada é partilhado entre separadores (cada um grava no seu
  // sessionStorage/memória): não há escrita concorrente possível.
  if(!localWritable()){set({method:"isolated"});return true;}
  set({method:"lease"});
  return leaseAcquire();
}

export function startStateWriter({scope="global",flush,snapshot}={}){
  if(typeof flush==="function")options.flush=flush;
  if(typeof snapshot==="function")options.snapshot=snapshot;
  if(!hasWindow())return Promise.resolve(stateWriterStatus());
  if(status.scope&&status.scope!==scope)return Promise.resolve(stateWriterStatus());
  if(status.mode==="writer"||status.mode==="observer"||status.mode==="conflict"||status.mode==="releasing")return Promise.resolve(stateWriterStatus());
  if(starting)return starting;
  status={...status,scope,mode:"acquiring",reason:null};
  listen();emit();
  starting=acquire({initial:true}).then(ok=>{
    starting=null;
    if(ok){set({mode:"writer",reason:null});startHeartbeat();}
    else set({mode:"observer",reason:"other_tab"});
    return stateWriterStatus();
  });
  return starting;
}

async function tryBecomeWriter({quiet=false}={}){
  if(status.mode!=="observer")return stateWriterStatus();
  let ok=false;
  if(status.method==="locks")ok=await lockAcquire(0);
  else if(status.method==="lease")ok=await leaseAcquire();
  if(ok){set({mode:"writer",reason:null});startHeartbeat();}
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
  let ok=false;
  if(status.method==="locks"){
    ok=await lockAcquire(STATE_WRITER_TIMING.requestTimeoutMs);
  }else if(status.method==="lease"){
    const deadline=Date.now()+STATE_WRITER_TIMING.noAnswerMs;
    while(Date.now()<deadline&&readLease()&&!leaseOwned()&&readLease().exp>Date.now())await sleep(100);
    // Sem resposta: o escritor fechou de forma abrupta ou está suspenso. Ao
    // retomar, confirmStateWriter/visibilidade detetam a perda e bloqueiam-no.
    ok=await leaseAcquire({force:true});
  }
  if(status.mode!=="observer")return stateWriterStatus();
  if(ok){set({mode:"writer",reason:null});startHeartbeat();}
  else set({reason:"no_answer"});
  return stateWriterStatus();
}

function handleHandoffRequest(){
  if(status.mode!=="writer")return;
  if(status.method==="lease"&&!leaseOwned()){lose("lease_lost");return;}
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
  stopHeartbeat();
  if(status.method==="lease"&&leaseOwned())try{rawLocal()?.removeItem(scopedKey(LEASE_KEY))}catch{}
  post({type:"handoff-released"});
  const release=releaseLock;releaseLock=null;
  try{release?.()}catch{}
  set({mode:"released"});
  try{window.location.reload()}catch{}
}

// Outras páginas (piloto/definições) que precisam de alterar o estado só o
// fazem se nenhum separador da app for escritor; caso contrário pedem ao
// escritor que volte a gravar (aplica, por exemplo, a retirada de telemetria).
export async function withExclusiveStateWrite(scope,write){
  if(!hasWindow())return {ok:false,deferred:false};
  const previous=status.scope;status.scope=scope||"global";
  try{
    const api=locks();
    if(api){
      let result={ok:false,deferred:true};
      await api.request(lockName(),{mode:"exclusive",ifAvailable:true},lock=>{
        if(lock)result={ok:true,deferred:false,value:write()};
      });
      if(result.deferred)post({type:"flush-request"});
      return result;
    }
    const lease=readLease();
    if(rawLocal()&&lease&&lease.exp>Date.now()&&lease.tab!==tabId){post({type:"flush-request"});return {ok:false,deferred:true};}
    return {ok:true,deferred:false,value:write()};
  }finally{if(status.mode==="inactive")status.scope=previous;}
}

// Apenas para testes unitários.
export function resetStateWriterForTests(){
  stopHeartbeat();
  try{releaseLock?.()}catch{}
  releaseLock=null;starting=null;
  if(releaseTimer){clearTimeout(releaseTimer);releaseTimer=null;}
  status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
  options={flush:()=>true,snapshot:()=>null};
}
