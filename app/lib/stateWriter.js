// P1-A — Um único separador escreve o progresso de cada área (conta ou global).
//
// 1. Exclusão: Web Locks. O separador que detém o lock exclusivo
//    `approva-state-writer-v1:<área>` é o único escritor. O browser liberta o
//    lock quando o separador fecha, falha ou recarrega. Nunca usamos `steal`.
//
// 2. Prova de leitura atual (sem esperas fixas). O lock não está ordenado em
//    relação à propagação do localStorage entre processos: quem obtém o lock pode
//    ainda não ver a última escrita do anterior. Mas as alterações do localStorage
//    de uma mesma origem feitas por um separador chegam aos outros pela ordem em
//    que foram feitas. Por isso:
//    - cada gravação do estado leva um carimbo `_writer:{tab,epoch,seq}` dentro
//      do próprio valor (mesmo setItem, atómico);
//    - ao deixar de escrever de forma limpa (passagem de controlo, pagehide,
//      separador escondido) o escritor grava por último um selo final com
//      {tab,epoch,seq,digest} e não volta a escrever nesse mandato;
//    - o novo detentor do lock só lê e grava quando vê, para o último mandato
//      registado, o selo final correspondente. Ver o selo implica ter
//      visto todas as escritas anteriores desse separador. Até lá não grava;
//      reavalia a cada evento `storage`. O tempo só muda a mensagem mostrada.
//    - registo autoritativo do mandato (IndexedDB, sem cache por processo):
//      cada escritor regista {tab,epoch} e espera pela confirmação ANTES da sua
//      primeira gravação. Quem obtém o lock lê o registo e sabe qual mandato
//      tem de ver selado — mesmo que nenhuma escrita desse mandato lhe tenha
//      ainda chegado. Cada retoma começa um mandato novo (selos antigos nunca
//      servem de prova para escritas posteriores).
//    - sem selo (o separador anterior terminou de forma abrupta) não há prova:
//      o novo separador não grava, preserva uma cópia de recuperação e só
//      continua por decisão explícita do aluno (adoptAfterUncleanEnd).
//
// 3. Sem Web Locks não existe exclusão fiável: modo só de consulta (nada grava).
//
// Em todos os modos, um separador que não é escritor não grava (accountWorkspace.js).
// Mesmo formato de accountWorkspace.accountStorageKey (sem importar: evita ciclo).
const accountStorageKey=(key,subject)=>subject?`a25-account-v1:${encodeURIComponent(subject)}:${key}`:key;

export const STATE_WRITER_EVENT="approva:state-writer";
export const STATE_CONFLICT_PREFIX="a25-state-conflict-v1:";
// Cópias de separador gravadas pela versão experimental anterior (concessão).
// Já não são criadas; as existentes continuam a ser reconciliadas.
export const STATE_TAB_COPY_PREFIX="a25-state-tabcopy-v1:";
export const STATE_SEAL_KEY="a25-state-writer-seal-v1";
const LOCK_PREFIX="approva-state-writer-v1:";
const SIGNAL_KEY="a25-state-writer-signal-v1";
const CHANNEL="approva-state-writer-v1";
const WATCHED_STATE_KEYS=["a25","a25-friends-beta"];
// Todas as chaves académicas da área (mesma lista que accountWorkspace usa para
// o legado): a cópia de recuperação guarda-as byte a byte antes de continuar.
const ACADEMIC_KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1",
  "applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715",
  "a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
function academicSnapshot(){
  const result={};
  for(const name of ["localStorage","sessionStorage"]){
    let store=null;try{store=globalThis[name]}catch{}
    if(!store)continue;
    const rows={};
    for(const key of ACADEMIC_KEYS)try{const raw=store.getItem(scopedKey(key));if(raw!==null&&raw!==undefined)rows[scopedKey(key)]=raw;}catch{}
    result[name]=rows;
  }
  return result;
}

export const STATE_WRITER_TIMING={
  reloadWaitMs:1_500,     // um reload liberta o lock antes de o novo documento pedir
  requestTimeoutMs:8_000, // espera por uma passagem de controlo pedida
  holdNoticeMs:3_000      // só para a mensagem: depois disto explica a retenção
};

const tabId=`writer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
let status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
let options={flush:()=>true,snapshot:()=>null};
let releaseLock=null,channel=null,listening=false,starting=null,releaseTimer=null,holdTimer=null;
let epoch=null,seq=0,lastStamp=null,hadMandate=false,expectedMandate=undefined,mandateLocal=null;

// ---------------------------------------------------------------- registo do mandato
const REGISTER_DB="approva-state-writer-v1",REGISTER_STORE="mandates";
function idbRequest(request){return new Promise((resolve,reject)=>{request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
const indexedDbRegister={
  async open(){
    const factory=(()=>{try{return globalThis.indexedDB||null}catch{return null}})();
    if(!factory)throw new Error("indexedDB unavailable");
    const request=factory.open(REGISTER_DB,1);
    request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains(REGISTER_STORE))request.result.createObjectStore(REGISTER_STORE);};
    return idbRequest(request);
  },
  async read(key){
    const db=await this.open();
    try{return (await idbRequest(db.transaction(REGISTER_STORE,"readonly").objectStore(REGISTER_STORE).get(key)))??null}finally{db.close();}
  },
  async write(key,value){
    const db=await this.open();
    try{
      await new Promise((resolve,reject)=>{
        const tx=db.transaction(REGISTER_STORE,"readwrite");
        tx.objectStore(REGISTER_STORE).put(value,key);
        tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error("aborted"));
      });
    }finally{db.close();}
  }
};
let mandateRegister=indexedDbRegister;
// Apenas para testes unitários (registo partilhado e autoritativo simulado).
export function setMandateRegisterForTests(adapter){mandateRegister=adapter||indexedDbRegister;}
const registerKey=()=>`mandate:${status.scope||"global"}`;

const hasWindow=()=>typeof window!=="undefined";
function locks(){try{return hasWindow()&&globalThis.navigator?.locks?.request?globalThis.navigator.locks:null}catch{return null}}
function rawLocal(){try{return globalThis.localStorage||null}catch{return null}}
const scopedKey=key=>accountStorageKey(key,status.scope&&status.scope!=="global"?status.scope:null);
const newEpoch=()=>`e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;

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

// ---------------------------------------------------------------- carimbos e selo
// Chamado por stateIntegrity imediatamente antes de gravar o estado.
export function stampStateWrite(state){
  if(status.mode!=="writer"||!state||typeof state!=="object")return state;
  seq+=1;lastStamp={tab:tabId,epoch,seq};
  return {...state,_writer:lastStamp};
}
function viewOfState(store=rawLocal()){
  if(!store)return "[]";
  try{return JSON.stringify(WATCHED_STATE_KEYS.map(key=>store.getItem(scopedKey(key))))}catch{return null}
}
export function stateDigest(view=viewOfState()){
  if(view===null)return null;
  let h=2166136261;for(let i=0;i<view.length;i++){h^=view.charCodeAt(i);h=Math.imul(h,16777619);}
  return `sd1-${(h>>>0).toString(16)}-${view.length}`;
}
function readJson(raw){try{return JSON.parse(raw)}catch{return undefined}}
// Escreve o selo final deste mandato. Depois disto este separador não grava
// mais nada até voltar a obter (e provar) o lock.
function writeSeal(stamp=lastStamp){
  const store=rawLocal();if(!store||!stamp)return false;
  const seal={tab:stamp.tab,epoch:stamp.epoch,seq:stamp.seq,digest:stateDigest(viewOfState(store)),final:true,at:Date.now()};
  try{store.setItem(scopedKey(STATE_SEAL_KEY),JSON.stringify(seal));return true}catch{return false}
}
// "proven": a vista local inclui todas as gravações do último mandato
// registado (o selo final desse mandato está visível e coincide com a vista).
export function evaluateStateView(expected=expectedMandate){
  const store=rawLocal();if(!store)return {verdict:"proven"};
  if(expected===undefined)return {verdict:"pending",reason:"register_unread"};
  if(expected===null)return {verdict:"proven"}; // nunca houve escritor coordenado
  if(expected.tab===tabId&&lastStamp&&expected.epoch===lastStamp.epoch)return {verdict:"proven",own:true};
  // Um mandato sem acesso ao localStorage só gravou no sessionStorage do seu
  // separador: não pode haver escritas partilhadas suas ainda a caminho.
  if(expected.local===false)return {verdict:"proven",reason:"previous_mandate_without_shared_storage"};
  const view=viewOfState(store);if(view===null)return {verdict:"pending",reason:"unreadable_view"};
  const seal=readJson(store.getItem(scopedKey(STATE_SEAL_KEY)))||null;
  if(!seal||seal.tab!==expected.tab||seal.epoch!==expected.epoch||seal.final!==true)return {verdict:"pending",reason:"no_seal"};
  // O selo é a última escrita do mandato e as alterações de um separador chegam
  // por ordem: vê-lo prova que todas as escritas desse mandato já foram vistas.
  // Um digest diferente significa apenas bytes alterados depois por alguém fora
  // do protocolo — estão visíveis e são lidos, não sobrescritos às cegas; se esse
  // escritor continuar ativo, a deteção de escrita alheia para este separador.
  return {verdict:"proven",changedAfterSeal:seal.digest!==stateDigest(view)};
}

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
  if(message.type==="handoff-request")handleHandoffRequest();
  else if(message.type==="flush-request"&&status.mode==="writer"){try{options.flush()}catch{}}
}

// ---------------------------------------------------------------- Web Locks
function lockName(){return LOCK_PREFIX+encodeURIComponent(status.scope||"global")}
// true (obtido), false (ocupado/expirado) ou "unavailable" (API recusada).
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
        if(settled){return undefined;}
        done(true);
        return new Promise(release=>{releaseLock=release;});
      });
    }catch{done("unavailable");return;}
    Promise.resolve(pending).catch(error=>done(error?.name==="AbortError"?false:"unavailable"));
  });
}
function releaseHeldLock(){const release=releaseLock;releaseLock=null;try{release?.()}catch{}}

// Lock obtido: ler o registo autoritativo e provar a leitura antes de escrever.
async function verifyMandate(){
  if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}
  if(status.mode!=="verifying"){
    set({mode:"verifying",reason:"waiting_proof"});
    try{expectedMandate=await mandateRegister.read(registerKey());}
    catch{
      // Sem registo autoritativo não há prova possível: só consulta.
      releaseHeldLock();set({mode:"readonly",reason:"register_unavailable"});return false;
    }
    if(status.mode!=="verifying")return false;
  }
  const result=evaluateStateView();
  if(result.verdict==="proven"){await startMandate();return status.mode==="writer";}
  holdTimer=setTimeout(()=>{if(status.mode==="verifying")set({reason:"recovery_hold"});},STATE_WRITER_TIMING.holdNoticeMs);
  return false;
}
async function startMandate(){
  if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}
  // Este documento já escreveu e o último mandato registado não é o seu:
  // a memória está desatualizada. Recarregar em vez de gravar o que tem.
  const ownLast=expectedMandate&&lastStamp&&expectedMandate.tab===tabId&&expectedMandate.epoch===lastStamp.epoch;
  if(hadMandate&&!ownLast){
    releaseHeldLock();set({mode:"released",reason:"stale_memory"});
    try{window.location.reload()}catch{}
    return;
  }
  // Mandato novo, registado e confirmado antes da primeira gravação.
  const next=newEpoch();
  const local=!!rawLocal();
  try{await mandateRegister.write(registerKey(),{tab:tabId,epoch:next,at:Date.now(),local});}
  catch{releaseHeldLock();set({mode:"readonly",reason:"register_unavailable"});return;}
  if(status.mode!=="verifying")return;
  epoch=next;seq=0;lastStamp={tab:tabId,epoch,seq:0};expectedMandate={tab:tabId,epoch,local};mandateLocal=local;
  hadMandate=true;
  set({mode:"writer",reason:null});
}

// Decisão explícita do aluno depois de um fim abrupto do separador anterior.
// Não há prova de que nenhuma escrita está ainda a caminho: antes de continuar
// guarda-se uma cópia durável dos bytes atuais; qualquer escrita tardia que
// chegue depois é detetada, este separador para e os bytes recebidos são guardados.
export function adoptAfterUncleanEnd(){
  if(status.mode!=="verifying")return stateWriterStatus();
  // Cópia byte a byte de todas as chaves académicas visíveis (estado, rascunhos,
  // registo de conclusões, memória de escrita) antes de qualquer gravação.
  const copy=preserveRaw("unclean_end_adoption",{academic:academicSnapshot()});
  // Sem cópia durável (localStorage disponível mas sem espaço, etc.) não se continua.
  if(!copy||(rawLocal()&&!copy.durable)){set({reason:"recovery_hold",conflictCopy:copy||null});return stateWriterStatus();}
  set({conflictCopy:copy});
  void startMandate();
  return stateWriterStatus();
}

// ---------------------------------------------------------------- conflito
function preserveRaw(reason,payload){
  const key=scopedKey(`${STATE_CONFLICT_PREFIX}${tabId}:${Date.now()}:${Math.random().toString(36).slice(2,6)}`);
  let raw;try{raw=JSON.stringify({format:"aplus-state-conflict-copy-v1",tab:tabId,at:Date.now(),reason,...payload})}catch{return null}
  for(const store of [rawLocal(),(()=>{try{return globalThis.sessionStorage}catch{return null}})()])try{
    if(!store)continue;
    store.setItem(key,raw);
    if(store.getItem(key)===raw)return {key,durable:store===rawLocal()};
  }catch{}
  return null;
}
function lose(reason,state=null,foreign=null){
  if(status.mode==="conflict")return;
  // Guardar o que este separador tinha e, se conhecidos, os bytes alheios recebidos.
  const copy=preserveRaw(reason,{state:state||safeSnapshot()});
  if(foreign)preserveRaw(`${reason}:received`,{key:foreign.key,raw:foreign.raw});
  releaseHeldLock();
  set({mode:"conflict",reason,conflictCopy:copy});
}
function safeSnapshot(){try{return options.snapshot()}catch{return null}}

// Chamado por stateIntegrity antes de cada gravação do estado.
export function confirmStateWriter(state){
  if(status.mode==="inactive")return true;
  if(status.mode!=="writer")return false;
  // Mandato registado sem localStorage: se ele aparecer a meio, parar em vez de
  // gravar em armazenamento partilhado sem registo.
  if(mandateLocal===false&&rawLocal()){lose("shared_storage_appeared",state);return false;}
  return true;
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
  if(status.mode==="verifying"){
    if(event.key===scopedKey(STATE_SEAL_KEY)||WATCHED_STATE_KEYS.some(key=>event.key===scopedKey(key)))void verifyMandate();
    return;
  }
  if(status.mode!=="writer")return;
  if(WATCHED_STATE_KEYS.some(key=>event.key===scopedKey(key)))lose("foreign_write",null,{key:event.key,raw:event.newValue});
}
// Separador escondido (troca de separador/app, antes de descarte no telemóvel):
// selar e libertar. Ao voltar, o lock é pedido de novo e a leitura provada.
function onVisibility(){
  if(document.visibilityState==="hidden"){pauseMandate();return;}
  onResume();
}
function pauseMandate(){
  if(status.mode==="writer"){writeSeal();releaseHeldLock();set({mode:"paused",reason:"hidden"});}
  else if(status.mode==="verifying"){if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}releaseHeldLock();expectedMandate=undefined;set({mode:"observer",reason:"hidden"});}
}
function onResume(){if(document.visibilityState!=="hidden"&&(status.mode==="paused"||status.mode==="observer"))void tryBecomeWriter({quiet:true});}
function onPageHide(){
  if(status.mode==="writer"){writeSeal();set({mode:"released",reason:"pagehide"});}
  releaseHeldLock();
}
function onPageShow(event){
  // Documento restaurado da cache de navegação: recarregar repõe a arbitragem.
  if(event?.persisted&&status.mode!=="inactive")try{window.location.reload()}catch{}
}
function listen(){
  if(listening||!hasWindow())return;
  listening=true;
  try{if(typeof BroadcastChannel!=="undefined"){channel=new BroadcastChannel(CHANNEL);channel.onmessage=event=>onMessage(event.data);}}catch{channel=null}
  window.addEventListener("storage",onStorage);
  window.addEventListener("pageshow",onPageShow);
  window.addEventListener("pagehide",onPageHide);
  document.addEventListener("visibilitychange",onVisibility);
  document.addEventListener("freeze",pauseMandate);
  document.addEventListener("resume",onResume);
}

// ---------------------------------------------------------------- ciclo de vida
async function acquire({initial}){
  if(locks()){
    set({method:"locks"});
    const result=await lockAcquire(initial?STATE_WRITER_TIMING.reloadWaitMs:0);
    if(result!=="unavailable")return result;
  }
  // Sem Web Locks não há exclusão fiável, nem com localStorage nem só com
  // sessionStorage (este não é gravação durável): só consulta.
  set({method:"none"});
  return "readonly";
}

export function startStateWriter({scope="global",flush,snapshot}={}){
  if(typeof flush==="function")options.flush=flush;
  if(typeof snapshot==="function")options.snapshot=snapshot;
  if(!hasWindow())return Promise.resolve(stateWriterStatus());
  if(status.scope&&status.scope!==scope)return Promise.resolve(stateWriterStatus());
  if(["writer","observer","conflict","releasing","readonly","verifying","paused"].includes(status.mode))return Promise.resolve(stateWriterStatus());
  if(starting)return starting;
  status={...status,scope,mode:"acquiring",reason:null};
  listen();emit();
  starting=acquire({initial:true}).then(async result=>{
    if(result===true){expectedMandate=undefined;await verifyMandate();}
    else if(result==="readonly")set({mode:"readonly",reason:locks()?"locks_unavailable":"no_web_locks"});
    else set({mode:"observer",reason:"other_tab"});
    starting=null;
    return stateWriterStatus();
  });
  return starting;
}

async function tryBecomeWriter({quiet=false}={}){
  if(status.mode!=="observer"&&status.mode!=="paused")return stateWriterStatus();
  // Ao voltar a ficar visível, o lock acabado de libertar (por este ou por
  // outro separador escondido) pode ainda não estar disponível: esperar um pouco.
  const result=await lockAcquire(status.mode==="paused"||status.reason==="hidden"?STATE_WRITER_TIMING.reloadWaitMs:0);
  if(result===true){expectedMandate=undefined;await verifyMandate();}
  else{
    if(status.mode==="paused")set({mode:"observer",reason:"other_tab"});
    else if(!quiet)set({reason:"other_tab"});
  }
  return stateWriterStatus();
}

// Ação explícita do aluno no separador observador: "Continuar neste separador".
export async function requestStateWriter(){
  if(status.mode==="verifying"){await verifyMandate();return stateWriterStatus();}
  if(status.mode!=="observer"&&status.mode!=="paused")return stateWriterStatus();
  const immediate=await tryBecomeWriter({quiet:true});
  if(immediate.mode==="writer"||immediate.mode==="verifying")return immediate;
  set({reason:"waiting"});
  post({type:"handoff-request"});
  const result=await lockAcquire(STATE_WRITER_TIMING.requestTimeoutMs);
  if(status.mode!=="observer")return stateWriterStatus();
  if(result===true){expectedMandate=undefined;await verifyMandate();}
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
  writeSeal(); // último: depois do flush e antes de libertar
  post({type:"handoff-released"});
  releaseHeldLock();
  set({mode:"released"});
  try{window.location.reload()}catch{}
}

// Outras páginas (piloto/definições) que precisam de alterar o estado só o
// fazem se nenhum separador da app for escritor; caso contrário pedem ao
// escritor que volte a gravar (aplica, por exemplo, a retirada de telemetria).
// Ao escrever com o lock, voltam a selar o valor para o próximo escritor o poder provar.
export async function withExclusiveStateWrite(scope,write){
  if(!hasWindow())return {ok:false,deferred:false};
  const previous=status.scope;status.scope=scope||"global";
  try{
    const api=locks();
    if(!api)return {ok:true,deferred:false,value:write()}; // sem Web Locks a app só consulta
    let result={ok:false,deferred:true};
    try{
      await api.request(lockName(),{mode:"exclusive",ifAvailable:true},async lock=>{
        if(!lock)return;
        // Com o lock: só escrever se a vista estiver provada para o último mandato;
        // depois de escrever, voltar a selar esse mandato com o novo digest.
        let mandate=null;
        try{mandate=await mandateRegister.read(registerKey());}catch{result={ok:false,deferred:true};return;}
        if(evaluateStateView(mandate).verdict!=="proven"){result={ok:false,deferred:true};return;}
        const value=write();
        if(mandate){
          const store=rawLocal(),stamp=store&&WATCHED_STATE_KEYS.map(key=>readJson(store.getItem(scopedKey(key)))?._writer).find(w=>w&&w.tab===mandate.tab&&w.epoch===mandate.epoch);
          writeSeal({tab:mandate.tab,epoch:mandate.epoch,seq:stamp?.seq||0});
        }
        result={ok:true,deferred:false,value};
      });
    }catch{return {ok:true,deferred:false,value:write()};}
    if(result.deferred)post({type:"flush-request"});
    return result;
  }finally{if(status.mode==="inactive")status.scope=previous;}
}

// Páginas sem coordenação de escritor (p. ex. o protótipo público de Português):
// bloquear todas as gravações académicas desta página (accountWorkspace recusa).
export function blockAcademicWritesOnThisPage(reason="page_without_writer"){
  if(status.mode!=="inactive")return stateWriterStatus();
  status={...status,mode:"readonly",method:"page",reason};
  return stateWriterStatus();
}

// Apenas para testes unitários.
export function resetStateWriterForTests(){
  releaseHeldLock();starting=null;
  if(releaseTimer){clearTimeout(releaseTimer);releaseTimer=null;}
  if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}
  status={mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null};
  options={flush:()=>true,snapshot:()=>null};
  epoch=null;seq=0;lastStamp=null;hadMandate=false;expectedMandate=undefined;mandateLocal=null;
}
