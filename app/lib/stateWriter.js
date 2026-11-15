// P1-A — Um único separador escreve o progresso de cada área (conta ou global).
//
// v2 (correção do NO-GO da #461):
// 0. Armazenamento canónico próprio (academicKeys.js). Separadores de versões
//    anteriores escrevem nas chaves legadas e nunca tocam no canónico. O legado é
//    importado uma vez, dentro de um mandato provado; alterações posteriores
//    ficam numa cópia restaurável (recoveryCopies.js / stateRecovery.js).
//
// 1. Exclusão: Web Locks (`approva-state-writer-v2:<área>`). Nunca usamos `steal`.
//
// 2. Prova de leitura atual, sem esperas fixas:
//    - cada gravação do estado leva um carimbo `_writer:{tab,epoch,seq}`;
//    - ao deixar de escrever de forma limpa, o escritor grava por último o
//      marcador do mandato e o selo final {tab,epoch,seq}; as alterações do
//      localStorage de um separador chegam aos outros pela ordem em que foram feitas;
//    - DUAS testemunhas do mandato: o registo autoritativo (IndexedDB) e o
//      marcador no localStorage, gravado depois de o registo ser confirmado e
//      antes da primeira escrita. O novo detentor do lock só escreve quando:
//        a) há registo, o selo desse mandato (tab+epoch) está visível e o
//           marcador coincide com o registo; ou
//        b) não há registo, nem marcador, nem dados canónicos (primeira utilização).
//      Registo ausente com dados/marcador presentes ("register_missing") ou
//      marcador diferente do registo ("register_mismatch") = sem prova: retenção.
//    - sem prova: não grava; só continua por decisão explícita do aluno, depois
//      de guardar uma cópia durável do conjunto académico (adoptAfterUncleanEnd).
//
// 3. Todas as chaves académicas são vigiadas (evento `storage`) e cada escrita
//    académica confirma que os bytes atuais são os últimos que este separador
//    viu (confirmAcademicWrite). Diferença = outro escritor: para e guarda os
//    dois conjuntos (o deste separador e o recebido), ambos restauráveis.
//
// 4. Sem Web Locks não existe exclusão fiável: modo só de consulta.
import {ACADEMIC_KEYS,STATE_KEYS,canonicalKey,workspaceKey,legacyKey,fingerprint} from "./academicKeys.js";
import {writeRecoveryCopy,canonicalSet,legacySet,setIsEmpty,setFingerprints,sameSet,resolveRestoreJournal,restoreJournalState} from "./recoveryCopies.js";

export const STATE_WRITER_EVENT="approva:state-writer";
// Prefixos das cópias da versão experimental anterior (só listadas, nunca escritas).
export const STATE_CONFLICT_PREFIX="a25-state-conflict-v1:";
export const STATE_TAB_COPY_PREFIX="a25-state-tabcopy-v1:";
export const STATE_SEAL_KEY="writer-seal";
const MANDATE_MARKER="writer-mandate";
const IMPORT_MARKER="legacy-import";
const SIGNAL_NAME="writer-signal";
const LOCK_PREFIX="approva-state-writer-v2:";
const CHANNEL="approva-state-writer-v2";

export const STATE_WRITER_TIMING={
  reloadWaitMs:1_500,     // um reload liberta o lock antes de o novo documento pedir
  requestTimeoutMs:8_000, // espera por uma passagem de controlo pedida
  holdNoticeMs:3_000      // só para a mensagem: depois disto explica a retenção
};

const tabId=`writer-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`;
const blankStatus=()=>({mode:"inactive",scope:null,method:null,reason:null,conflictCopy:null,receivedCopy:null,legacy:null,unsaved:null});
let status=blankStatus();
let options={flush:()=>true,snapshot:()=>null};
let releaseLock=null,channel=null,listening=false,starting=null,releaseTimer=null,holdTimer=null;
let epoch=null,seq=0,lastStamp=null,hadMandate=false,expectedMandate=undefined,mandateLocal=null;
let exclusiveDepth=0;
// Últimos bytes de cada chave académica canónica vistos/escritos por este escritor.
const lastKnown=new Map();
// Conjunto deste separador no momento em que parou de gravar por falha de leitura
// (inclui a gravação que falhou). Fica em memória para poder ser descarregado
// mesmo que nenhuma cópia caiba no armazenamento.
let unsavedSet=null;

// ---------------------------------------------------------------- registo do mandato
const REGISTER_DB="approva-state-writer-v2",REGISTER_STORE="mandates";
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
        // "strict": o registo é a prova; não aceitar uma confirmação só em memória.
        let tx;try{tx=db.transaction(REGISTER_STORE,"readwrite",{durability:"strict"})}catch{tx=db.transaction(REGISTER_STORE,"readwrite")}
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
const scope=()=>status.scope||"global";
const wsKey=name=>workspaceKey(name,scope());
const newEpoch=()=>`e-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
function readJson(raw){try{return JSON.parse(raw)}catch{return undefined}}

function emit(){
  if(!hasWindow())return;
  try{window.dispatchEvent(new CustomEvent(STATE_WRITER_EVENT,{detail:stateWriterStatus()}))}catch{}
}
function set(next){status={...status,...next};emit();}

export function stateWriterStatus(){return {...status,tabId}}
export function stateWritesAllowed(){return status.mode==="inactive"||status.mode==="writer"}
export function stateWriterCoordinated(){return status.mode!=="inactive"}
export function stateWriterReadOnly(){return status.mode==="readonly"}
// Espaço canónico ativo: coordenação ativa ou escrita exclusiva de outra página.
export function stateWriterNamespaceActive(){return status.mode!=="inactive"||exclusiveDepth>0}
// Só consulta (sem Web Locks, página sem escritor): enquanto o espaço canónico
// deste âmbito nunca tiver sido inicializado, mostrar o progresso legado.
// Nada é gravado neste modo, por isso ler o legado não cria divergência.
export function stateWriterReadsLegacy(area=status.scope||"global"){
  if(status.mode!=="readonly")return false;
  // Importação nunca concluída (ausente ou interrompida): o canónico pode estar parcial.
  try{return readJson(rawLocal()?.getItem(workspaceKey(IMPORT_MARKER,area))??"null")?.status!=="done"}catch{return true}
}

// ---------------------------------------------------------------- linha de base académica
function canonicalFullKeys(){return ACADEMIC_KEYS.map(key=>canonicalKey(key,scope()));}
function resetBaseline(store=rawLocal()){
  lastKnown.clear();
  if(!store)return;
  for(const full of canonicalFullKeys()){let raw=null;try{raw=store.getItem(full)}catch{}lastKnown.set(full,raw??null);}
}
// Chamado por accountWorkspace antes de cada escrita académica em localStorage.
// Fail-closed (auditoria da #462, P2-1): só devolve true quando a leitura provou
// que (1) não há diário de restauro pendente e (2) os bytes atuais são os últimos
// que este escritor viu. Leitura impossível, chave fora da linha de base ou
// diário presente/ilegível = recusa.
// next: bytes que o chamador vai gravar (null = remoção; undefined = desconhecido).
export function confirmAcademicWrite(full,store=rawLocal(),next=undefined){
  // Sem coordenação e fora do espaço canónico (servidor, harness #385): formato anterior.
  if(status.mode==="inactive"&&exclusiveDepth===0)return true;
  if(status.mode!=="writer"&&status.mode!=="inactive")return false;
  const journal=restoreJournalState(scope(),store);
  if(journal.state!=="none"){
    if(status.mode==="writer"){
      // Diário ilegível = falha de leitura, não um restauro (a mensagem não pode dizer que houve um).
      const readFailure=journal.reason==="journal_unreadable"||journal.reason==="storage_unavailable";
      haltWriting({reason:readFailure?"storage_read_failed":"restore_incomplete",restore:{status:"blocked",reason:journal.reason||"journal_pending"},full,next});
    }
    return false;
  }
  // Escrita exclusiva de outra página: com o lock e a vista provada (withExclusiveStateWrite).
  if(status.mode==="inactive")return true;
  if(!lastKnown.has(full))return false;
  let current=null;try{current=store.getItem(full)}catch{haltWriting({reason:"storage_read_failed",full,next});return false}
  if((current??null)!==lastKnown.get(full)){lose("foreign_write");return false;}
  return true;
}
// Parar de gravar por falha de leitura ou diário detetado a meio da sessão, sem
// perder em silêncio o que ainda não foi gravado (auditoria, X7): o conjunto deste
// separador (últimos bytes vistos + estado em memória + a gravação que falhou) é
// guardado numa cópia — durável se couber, senão só neste separador — e fica
// descarregável a partir da memória. O separador sela (o próximo prova a vista sem
// retenção) e passa a só consulta. unsaved.tier:
//   "saved"   o guardado já é igual ao deste separador (nada por gravar);
//   "durable" a diferença ficou numa cópia de recuperação neste dispositivo;
//   "tab"     só numa cópia temporária deste separador (perde-se ao fechar);
//   "failed"  não coube em lado nenhum: só em memória, descarregável.
function haltWriting({reason,restore=null,full=null,next=undefined}){
  if(status.mode!=="writer")return;
  const keys=knownSet();
  const short=full?ACADEMIC_KEYS.find(key=>canonicalKey(key,scope())===full):null;
  if(short&&next!==undefined)keys[short]=next===null?null:String(next);
  unsavedSet=keys;
  let stored=null;try{stored=canonicalSet(scope(),rawLocal())}catch{stored=null}
  let copy=null,tier="saved";
  if(!stored||!sameSet(stored,keys)){
    copy=writeRecoveryCopy({scope:scope(),reason:`write_halted:${reason}`,keys,tab:tabId,dedupe:"reason"});
    tier=copy?(copy.durable?"durable":"tab"):"failed";
  }
  writeSeal();releaseHeldLock();
  set({mode:"readonly",reason,restore,unsaved:{tier,copy:copy?.key||null,key:short||null,at:Date.now()}});
}
// Descarregar o conjunto deste separador depois de uma paragem (mesmo sem cópia).
export function exportUnsavedTabSet(){
  if(!unsavedSet)return null;
  return JSON.stringify({format:"aplus-state-recovery-copy-v2",exportedAt:new Date().toISOString(),id:null,reason:"unsaved_tab_export",at:Date.now(),scope:scope(),keys:unsavedSet},null,2);
}
export function noteAcademicWrite(full,raw){if(status.mode==="writer"&&lastKnown.has(full))lastKnown.set(full,raw??null);}
// Conjunto "deste separador": os últimos bytes que viu/escreveu, com o estado
// em memória (pode incluir a última alteração ainda não gravada).
function knownSet(){
  const set={};for(const key of ACADEMIC_KEYS)set[key]=lastKnown.get(canonicalKey(key,scope()))??null;
  const snap=safeSnapshot();
  if(snap&&typeof snap==="object")try{
    const key=snap.betaMode==="friends_beta"?"a25-friends-beta":"a25";
    const previous=readJson(set[key]||"null");
    set[key]=JSON.stringify({...snap,_stateVersion:previous?._stateVersion??snap._stateVersion,_savedAt:Date.now()});
  }catch{}
  return set;
}

// ---------------------------------------------------------------- carimbos, marcador e selo
export function stampStateWrite(state){
  if(status.mode!=="writer"||!state||typeof state!=="object")return state;
  seq+=1;lastStamp={tab:tabId,epoch,seq};
  return {...state,_writer:lastStamp};
}
function viewOfState(store=rawLocal()){
  if(!store)return "[]";
  try{return JSON.stringify(STATE_KEYS.map(key=>store.getItem(canonicalKey(key,scope()))))}catch{return null}
}
export function stateDigest(view=viewOfState()){
  if(view===null)return null;
  return fingerprint(view);
}
function writeMarker(mandate,store=rawLocal()){
  if(!store)return false;
  const raw=JSON.stringify({tab:mandate.tab,epoch:mandate.epoch});
  try{store.setItem(wsKey(MANDATE_MARKER),raw);return store.getItem(wsKey(MANDATE_MARKER))===raw}catch{return false}
}
// Marcador e selo final deste mandato (por esta ordem: o selo é a última escrita).
function writeSeal(stamp=lastStamp){
  const store=rawLocal();if(!store||!stamp)return false;
  if(!writeMarker(stamp,store))return false;
  const seal={tab:stamp.tab,epoch:stamp.epoch,seq:stamp.seq,digest:stateDigest(viewOfState(store)),final:true,at:Date.now()};
  try{store.setItem(wsKey(STATE_SEAL_KEY),JSON.stringify(seal));return true}catch{return false}
}
function canonicalPresent(store){
  try{
    if(store.getItem(wsKey(MANDATE_MARKER))!==null||store.getItem(wsKey(IMPORT_MARKER))!==null)return true;
    return canonicalFullKeys().some(full=>store.getItem(full)!==null);
  }catch{return true}
}
// "proven": a vista local inclui todas as gravações do último mandato registado.
export function evaluateStateView(expected=expectedMandate){
  const store=rawLocal();if(!store)return {verdict:"proven"};
  if(expected===undefined)return {verdict:"pending",reason:"register_unread"};
  if(expected===null){
    // Sem registo: só é primeira utilização se também não houver marcador nem dados.
    if(canonicalPresent(store))return {verdict:"pending",reason:"register_missing"};
    return {verdict:"proven",reason:"fresh"};
  }
  if(expected.tab===tabId&&lastStamp&&expected.epoch===lastStamp.epoch)return {verdict:"proven",own:true};
  if(expected.local===false)return {verdict:"proven",reason:"previous_mandate_without_shared_storage"};
  const view=viewOfState(store);if(view===null)return {verdict:"pending",reason:"unreadable_view"};
  const seal=readJson(store.getItem(wsKey(STATE_SEAL_KEY)))||null;
  if(!seal||seal.tab!==expected.tab||seal.epoch!==expected.epoch||seal.final!==true)return {verdict:"pending",reason:"no_seal"};
  // O marcador é escrito antes do selo: com o selo visível, tem de coincidir.
  const marker=readJson(store.getItem(wsKey(MANDATE_MARKER)))||null;
  if(!marker||marker.tab!==expected.tab||marker.epoch!==expected.epoch)return {verdict:"pending",reason:"register_mismatch"};
  return {verdict:"proven",changedAfterSeal:seal.digest!==stateDigest(view)};
}

// ---------------------------------------------------------------- legado (versões anteriores)
// Importação única para o espaço canónico, ou deteção de escrita de uma versão anterior.
// Só corre como escritor provado (ou depois de recuperação explícita).
// sessionStorage (só deste separador): importar as chaves legadas do separador
// uma vez, para o progresso guardado só no separador (armazenamento bloqueado ou
// cheio) não desaparecer. Melhor esforço: nunca sobrescreve chaves canónicas.
function importSessionLegacy(){
  let ss=null;try{ss=globalThis.sessionStorage||null}catch{ss=null}
  if(!ss)return;
  try{
    const marker=wsKey(IMPORT_MARKER);
    if(ss.getItem(marker)!==null)return;
    const legacy=legacySet(scope(),ss);
    if(setIsEmpty(canonicalSet(scope(),ss)))for(const key of ACADEMIC_KEYS)if(legacy[key]!==null)ss.setItem(canonicalKey(key,scope()),legacy[key]);
    ss.setItem(marker,JSON.stringify({status:"done",at:Date.now(),tier:"tab"}));
  }catch{}
}
function syncLegacy(){
  importSessionLegacy();
  const store=rawLocal();if(!store)return {status:"no_shared_storage"};
  const markerKey=wsKey(IMPORT_MARKER),marker=readJson(store.getItem(markerKey));
  const legacy=legacySet(scope(),store),fps=setFingerprints(legacy);
  const writeMarkerRaw=value=>{const raw=JSON.stringify(value);store.setItem(markerKey,raw);if(store.getItem(markerKey)!==raw)throw new Error("marker");};
  if(!marker||marker.status!=="done"){
    const canonical=canonicalSet(scope(),store);
    if(!marker&&!setIsEmpty(canonical)){
      // Dados canónicos sem marcador (marcador apagado à parte): nunca importar por cima.
      const copy=setIsEmpty(legacy)?null:writeRecoveryCopy({scope:scope(),reason:"legacy_version_write",keys:legacy,tab:tabId,id:"legacy-latest",extra:{rolling:true}});
      writeMarkerRaw({status:"done",at:Date.now(),fp:fps,adopted:true});
      return {status:setIsEmpty(legacy)?"current":"changed",copy:copy||null};
    }
    writeMarkerRaw({status:"importing",at:Date.now(),fp:fps});
    let count=0;
    for(const key of ACADEMIC_KEYS){
      const full=canonicalKey(key,scope()),raw=legacy[key];
      if(raw===null)store.removeItem(full);else{store.setItem(full,raw);count++;}
      if((store.getItem(full)??null)!==raw)throw new Error("import");
      lastKnown.set(full,raw);
    }
    writeMarkerRaw({status:"done",at:Date.now(),fp:fps,imported:count});
    return {status:count?"imported":"empty",count};
  }
  const changed=ACADEMIC_KEYS.filter(key=>(marker.fp?.[key]??null)!==fps[key]);
  if(!changed.length)return {status:"current"};
  // Uma versão anterior gravou no legado. O canónico não é tocado; guarda-se o
  // conjunto legado como cópia restaurável (rotativa: os bytes continuam também
  // nas próprias chaves legadas, que esta versão nunca altera).
  const copy=writeRecoveryCopy({scope:scope(),reason:"legacy_version_write",keys:legacy,tab:tabId,id:"legacy-latest",extra:{rolling:true,changed}});
  if(!copy||!copy.durable)return {status:"changed",copy:copy||null,changed};
  writeMarkerRaw({...marker,fp:fps,lastChangeAt:Date.now(),noticePending:true});
  return {status:"changed",copy,changed};
}
// O aviso de escrita de uma versão anterior fica pendente até o aluno o ver num
// separador escritor (pode ter sido detetado num separador bloqueado ou fechado).
function pendingLegacyNotice(store=rawLocal()){
  const marker=readJson(store?.getItem(wsKey(IMPORT_MARKER))??"null");
  if(!marker?.noticePending)return null;
  return {status:"changed",pending:true,copy:{key:workspaceKey("recovery:legacy-latest",scope()),durable:true}};
}
export function acknowledgeLegacyNotice(){
  if(status.mode!=="writer")return false;
  const store=rawLocal(),key=wsKey(IMPORT_MARKER),marker=readJson(store?.getItem(key)??"null");
  if(!marker?.noticePending)return true;
  try{const {noticePending,...rest}=marker;store.setItem(key,JSON.stringify({...rest,noticeAcknowledgedAt:Date.now()}));set({legacy:{status:"current"}});return true}catch{return false}
}

// ---------------------------------------------------------------- mensagens
function post(message){
  const body={...message,scope:status.scope,from:tabId,at:Date.now(),nonce:Math.random().toString(36).slice(2)};
  try{if(channel){channel.postMessage(body);return;}}catch{}
  try{rawLocal()?.setItem(wsKey(SIGNAL_NAME),JSON.stringify(body))}catch{}
}
function onMessage(message){
  if(!message||message.scope!==status.scope||message.from===tabId)return;
  if(Date.now()-Number(message.at||0)>STATE_WRITER_TIMING.requestTimeoutMs*0.75)return;
  if(message.type==="handoff-request")handleHandoffRequest();
  else if(message.type==="flush-request"&&status.mode==="writer"){try{options.flush()}catch{}}
}

// ---------------------------------------------------------------- Web Locks
function lockName(){return LOCK_PREFIX+encodeURIComponent(status.scope||"global")}
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

async function verifyMandate(){
  if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}
  if(status.mode!=="verifying"){
    set({mode:"verifying",reason:"waiting_proof"});
    try{expectedMandate=await mandateRegister.read(registerKey());}
    catch{releaseHeldLock();set({mode:"readonly",reason:"register_unavailable"});return false;}
    if(status.mode!=="verifying")return false;
  }
  const result=evaluateStateView();
  if(result.verdict==="proven"){await startMandate();return status.mode==="writer";}
  const proof=result.reason;
  // Registo perdido ou divergente não se resolve sozinho: mostrar logo a retenção.
  const immediate=proof==="register_missing"||proof==="register_mismatch";
  if(immediate)set({reason:"recovery_hold",proof});
  else{set({proof});holdTimer=setTimeout(()=>{if(status.mode==="verifying")set({reason:"recovery_hold"});},STATE_WRITER_TIMING.holdNoticeMs);}
  return false;
}
async function startMandate(){
  if(holdTimer){clearTimeout(holdTimer);holdTimer=null;}
  const ownLast=expectedMandate&&lastStamp&&expectedMandate.tab===tabId&&expectedMandate.epoch===lastStamp.epoch;
  if(hadMandate&&!ownLast){
    releaseHeldLock();set({mode:"released",reason:"stale_memory"});
    try{window.location.reload()}catch{}
    return;
  }
  const next=newEpoch();
  const store=rawLocal(),local=!!store;
  try{await mandateRegister.write(registerKey(),{tab:tabId,epoch:next,at:Date.now(),local});}
  catch{releaseHeldLock();set({mode:"readonly",reason:"register_unavailable"});return;}
  if(status.mode!=="verifying")return;
  // Segunda testemunha, antes de qualquer escrita deste mandato.
  if(local&&!writeMarker({tab:tabId,epoch:next},store)){releaseHeldLock();set({mode:"readonly",reason:"shared_storage_full"});return;}
  epoch=next;seq=0;lastStamp={tab:tabId,epoch,seq:0};expectedMandate={tab:tabId,epoch,local};mandateLocal=local;
  hadMandate=true;
  // Restauro interrompido (fecho abrupto, quota, erro): resolver ANTES de qualquer
  // leitura para hidratação. Sem resolução possível, não se grava por cima.
  let restore={status:"none"};
  if(store){
    try{restore=resolveRestoreJournal(scope(),store);}catch{restore={status:"blocked"};}
    if(restore.status==="blocked"){resetBaseline(store);writeSeal();releaseHeldLock();set({mode:"readonly",reason:"restore_incomplete",restore:{status:"blocked",reason:restore.reason||null,foreign:restore.foreign||null}});return;}
  }
  resetBaseline(store);
  let legacy=null;
  try{legacy=syncLegacy();}
  catch{
    // Importação incompleta: selar (para o próximo poder provar) e só consultar.
    writeSeal();releaseHeldLock();set({mode:"readonly",reason:"legacy_import_failed"});return;
  }
  if(legacy?.status==="current")legacy=pendingLegacyNotice(store)||legacy;
  set({mode:"writer",reason:null,proof:null,legacy,restore:restore.status==="none"?null:{status:restore.status,found:restore.found||null}});
}

// Decisão explícita do aluno quando não há prova (fim abrupto, registo perdido
// ou divergente). Antes de continuar guarda-se uma cópia durável do conjunto
// académico canónico; qualquer escrita tardia que chegue depois é detetada em
// todas as chaves académicas, e os dois conjuntos são guardados.
export function adoptAfterUncleanEnd(){
  if(status.mode!=="verifying")return stateWriterStatus();
  const store=rawLocal();
  let copy=null;
  if(store){
    const session=(()=>{try{return canonicalSet(scope(),globalThis.sessionStorage)}catch{return null}})();
    copy=writeRecoveryCopy({scope:scope(),reason:`unclean_end_adoption:${status.proof||"no_seal"}`,keys:canonicalSet(scope(),store),tab:tabId,dedupe:true,extra:{session}});
    if(!copy||!copy.durable){set({reason:"recovery_hold",conflictCopy:copy||null});return stateWriterStatus();}
  }
  set({conflictCopy:copy});
  void startMandate();
  return stateWriterStatus();
}

// ---------------------------------------------------------------- conflito
function lose(reason){
  if(status.mode==="conflict")return;
  const store=rawLocal();
  const mine=knownSet(),received=store?canonicalSet(scope(),store):null;
  const copy=writeRecoveryCopy({scope:scope(),reason:`${reason}:this_tab`,keys:mine,tab:tabId,dedupe:true});
  const receivedCopy=received&&!sameSet(mine,received)?writeRecoveryCopy({scope:scope(),reason:`${reason}:received`,keys:received,tab:tabId,dedupe:true}):null;
  releaseHeldLock();
  set({mode:"conflict",reason,conflictCopy:copy,receivedCopy});
}
function safeSnapshot(){try{return options.snapshot()}catch{return null}}

export function confirmStateWriter(state){
  if(status.mode==="inactive")return true;
  if(status.mode!=="writer")return false;
  if(mandateLocal===false&&rawLocal()){lose("shared_storage_appeared");return false;}
  return true;
}
// v2: as cópias de separador da versão anterior ficam onde estão (legado, nunca
// escrito) e aparecem na lista de recuperação. Nada a reconciliar aqui.
export function reconcileStateTabCopies(){return [];}

export function reportForeignStateWrite(state,reason="foreign_write"){
  if(status.mode==="writer")lose(reason);
}

const isCanonicalAcademic=key=>canonicalFullKeys().includes(key);
const isLegacyAcademic=key=>ACADEMIC_KEYS.some(k=>legacyKey(k,scope())===key);
function onStorage(event){
  if(!event||typeof event.key!=="string")return;
  if(event.key===wsKey(SIGNAL_NAME)){try{onMessage(JSON.parse(event.newValue||"null"))}catch{}return;}
  if(status.mode==="verifying"){
    if(event.key===wsKey(STATE_SEAL_KEY)||event.key===wsKey(MANDATE_MARKER)||isCanonicalAcademic(event.key))void verifyMandate();
    return;
  }
  if(status.mode!=="writer")return;
  if(isCanonicalAcademic(event.key)){lose("foreign_write");return;}
  if(isLegacyAcademic(event.key)){
    // Uma versão anterior está a gravar no legado: guardar e avisar, sem parar.
    let legacy=null;try{legacy=syncLegacy()}catch{legacy={status:"changed",copy:null}}
    if(legacy.status==="changed")set({legacy});
  }
}
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
  set({method:"none"});
  return "readonly";
}

export function startStateWriter({scope:area="global",flush,snapshot}={}){
  if(typeof flush==="function")options.flush=flush;
  if(typeof snapshot==="function")options.snapshot=snapshot;
  if(!hasWindow())return Promise.resolve(stateWriterStatus());
  if(status.scope&&status.scope!==area)return Promise.resolve(stateWriterStatus());
  if(["writer","observer","conflict","releasing","readonly","verifying","paused"].includes(status.mode))return Promise.resolve(stateWriterStatus());
  if(starting)return starting;
  status={...status,scope:area,mode:"acquiring",reason:null};
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
  const result=await lockAcquire(status.mode==="paused"||status.reason==="hidden"?STATE_WRITER_TIMING.reloadWaitMs:0);
  if(result===true){expectedMandate=undefined;await verifyMandate();}
  else{
    if(status.mode==="paused")set({mode:"observer",reason:"other_tab"});
    else if(!quiet)set({reason:"other_tab"});
  }
  return stateWriterStatus();
}

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
  releaseTimer=setTimeout(completeStateWriterRelease,1_000);
}

export function completeStateWriterRelease(){
  if(status.mode!=="releasing")return;
  if(releaseTimer){clearTimeout(releaseTimer);releaseTimer=null;}
  writeSeal();
  post({type:"handoff-released"});
  releaseHeldLock();
  set({mode:"released"});
  try{window.location.reload()}catch{}
}

// Depois de uma restauração (stateRecovery.js): a memória da app está
// desatualizada. Selar, libertar e recarregar sem voltar a gravar nada.
export function releaseAfterRestore(){
  if(status.mode!=="writer")return false;
  resetBaseline();
  writeSeal();releaseHeldLock();set({mode:"released",reason:"restored"});
  try{window.location.reload()}catch{}
  return true;
}
// Restauro que não pôde ser concluído nem desfeito: parar de gravar já; o
// diário é resolvido na próxima abertura (stateWriter.startMandate).
export function releaseAfterIncompleteRestore({reload=true}={}){
  if(status.mode!=="writer")return false;
  resetBaseline();
  writeSeal();releaseHeldLock();set({mode:"released",reason:"restore_incomplete"});
  if(reload)try{window.location.reload()}catch{}
  return true;
}
// Restauração escreve diretamente no canónico: manter a linha de base coerente.
export function noteRestoredWrites(){if(status.mode==="writer")resetBaseline();}

// Outras páginas (piloto/definições) só alteram o estado com o lock e com a
// vista provada; caso contrário pedem ao escritor que volte a gravar.
// v2: nunca escrevem sem o lock por causa de um erro (sem recurso "cego").
export async function withExclusiveStateWrite(area,write){
  if(!hasWindow())return {ok:false,deferred:false};
  const previous=status.scope;
  if(status.mode==="inactive")status.scope=area||"global";
  else if(status.scope!==(area||"global"))return {ok:false,deferred:true};
  exclusiveDepth++;
  try{
    const api=locks();
    // Sem Web Locks não há exclusão: a app não grava (só consulta), e esta página também não.
    if(!api)return {ok:false,deferred:false,reason:"no_web_locks"};
    let result={ok:false,deferred:true};
    try{
      await api.request(lockName(),{mode:"exclusive",ifAvailable:true},async lock=>{
        if(!lock)return;
        let mandate=null;
        try{mandate=await mandateRegister.read(registerKey());}catch{return;}
        if(evaluateStateView(mandate).verdict!=="proven")return;
        let value;
        try{value=write();}catch{result={ok:false,deferred:false,error:true};return;}
        if(mandate){
          const store=rawLocal(),stamp=store&&STATE_KEYS.map(key=>readJson(store.getItem(canonicalKey(key,scope())))?._writer).find(w=>w&&w.tab===mandate.tab&&w.epoch===mandate.epoch);
          writeSeal({tab:mandate.tab,epoch:mandate.epoch,seq:stamp?.seq||0});
        }
        result={ok:true,deferred:false,value};
      });
    }catch{return {ok:false,deferred:true};}
    if(result.deferred)post({type:"flush-request"});
    return result;
  }finally{exclusiveDepth--;if(status.mode==="inactive")status.scope=previous;}
}

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
  status=blankStatus();
  options={flush:()=>true,snapshot:()=>null};
  epoch=null;seq=0;lastStamp=null;hadMandate=false;expectedMandate=undefined;mandateLocal=null;exclusiveDepth=0;lastKnown.clear();unsavedSet=null;
}
