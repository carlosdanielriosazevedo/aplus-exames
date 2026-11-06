// Correções residuais da auditoria independente (X1, X2, X3, X4, X7) e mutantes sobreviventes A1–A15.
// Harness copiado de p1V2RestoreInterruption (propagação atrasada entre separadores),
// com quota em bytes (quotaBytes) e contas A/B. Dados exclusivamente sintéticos.
// P1-A v2 — provas sobre os bytes persistidos: espaço canónico, legado, duas testemunhas,
// todas as chaves académicas e recuperação. Harness de propagação atrasada (p1AuditStoragePropagation).
// sem Web Locks. A prova não é "existe uma cópia": é que o estado guardado
// mantém o progresso concluído, ou que nenhum separador escreve.
// Modelo de localStorage do Chromium: cada processo tem a sua cópia da área e
// as escritas de outros processos chegam mais tarde (propagação assíncrona);
// o valor final é o da última escrita a chegar ao processo do browser.
// Mensagens (BroadcastChannel) podem chegar antes ou depois dos bytes.
// Dados exclusivamente sintéticos.
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
import {AsyncLocalStorage} from "node:async_hooks";

// Cada separador tem o seu localStorage/sessionStorage/janela. Os módulos leem
// globalThis no momento da chamada; com AsyncLocalStorage, as continuações
// assíncronas (promessas, temporizadores, concessões de lock) de cada separador
// continuam a ler o armazenamento desse separador e nunca o de outro.
const als=new AsyncLocalStorage();
const activeTab=()=>als.getStore()||current;
const GLOBALS={localStorage:t=>t?.local,sessionStorage:t=>t?.session,window:t=>t?.win,document:t=>t?.doc};
const saved={};
beforeEach(()=>{for(const [name,get] of Object.entries(GLOBALS)){saved[name]=Object.getOwnPropertyDescriptor(globalThis,name);Object.defineProperty(globalThis,name,{configurable:true,get:()=>get(activeTab())});}});
afterEach(()=>{for(const name of Object.keys(GLOBALS)){if(saved[name])Object.defineProperty(globalThis,name,saved[name]);else delete globalThis[name];}});
const inTab=(t,fn)=>als.run(t,fn);

const ACCOUNT="synthetic-A";
// P1-A v2: a semente do estado anterior fica na chave legada (importada pelo
// primeiro escritor provado); as leituras do progresso usam a chave canónica.
const LEGACY_STATE_KEY=`a25-account-v1:${ACCOUNT}:a25`;
const STATE_KEY=`a25-ws-v2:acct:${ACCOUNT}:a25`;
const copyBodies=()=>[...canonical.entries()].filter(([k])=>k.includes(":~recovery:")).map(([,v])=>JSON.parse(v));
let canonical,tabs,pendingBytes,pendingMessages,channels;

function view(tab,snapshot){
  const data=new Map(snapshot);
  return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>{if(tab.getFault?.(k)==="throw")throw new DOMException("synthetic","SecurityError");return data.has(k)?data.get(k):null},
    setItem:(k,v)=>{if(tab.quotaFull&&k.includes("tabcopy"))throw new DOMException("synthetic quota","QuotaExceededError");
      if(quotaBytes!==null&&usedBytes()-((canonical.get(k)??"").length+(canonical.has(k)?k.length:0))+k.length+String(v).length>quotaBytes)throw new DOMException("synthetic quota","QuotaExceededError");
      if(tab.getFault?.(k)==="drop")return;
      const old=data.get(k)??null;data.set(k,String(v));canonical.set(k,String(v));pendingBytes.push({from:tab,k,old,v:String(v)});},
    removeItem:k=>{if(tab.getFault?.(k)==="noremove")return;const old=data.get(k)??null;data.delete(k);canonical.delete(k);pendingBytes.push({from:tab,k,old,v:null});}};
}
function deliverBytes(){
  for(const m of pendingBytes.splice(0))for(const t of tabs)if(t!==m.from&&!t.closed){
    if(m.v===null)t.local.data.delete(m.k);else t.local.data.set(m.k,m.v);
    inTab(t,()=>{const e=new Event("storage");Object.assign(e,{key:m.k,oldValue:m.old,newValue:m.v});t.win.dispatchEvent(e);});
  }
}
class LaggyChannel{
  constructor(name){this.name=name;this.tab=current;this.onmessage=null;channels.add(this);}
  postMessage(data){for(const c of channels)if(c!==this&&!c.tab.closed){
    const deliver=()=>inTab(c.tab,()=>c.onmessage?.({data:structuredClone(data)}));
    if(lagMessages)pendingMessages.push(deliver);else setTimeout(deliver,0);
  }}
  close(){channels.delete(this);}
}
let current=null,lagMessages=false,quotaBytes=null;
const usedBytes=()=>[...canonical.entries()].reduce((n,[k,v])=>n+k.length+v.length,0);
function deliverMessages(){for(const fn of pendingMessages.splice(0))fn();}
function plain(){const data=new Map();return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}}
function use(t){current=t;als.enterWith(t);}
let locksApi=null,register=null;
// Registo autoritativo (IndexedDB): sem cache por processo; leituras veem o que foi confirmado.
function makeRegister(){const map=new Map();return {map,async read(k){await Promise.resolve();return map.has(k)?structuredClone(map.get(k)):null},async write(k,v){await Promise.resolve();map.set(k,structuredClone(v))}}}
function lockManager(){
  const held=new Map(),queues=new Map();const queue=n=>queues.get(n)||queues.set(n,[]).get(n);
  function run(n,r){held.set(n,r);Promise.resolve().then(()=>r.cb({name:n})).then(r.resolve,r.reject).finally(()=>{held.delete(n);const x=queue(n).shift();if(x)run(n,x);});}
  return {request(n,o,cb){return new Promise((resolve,reject)=>{const r={cb,resolve,reject};
    if(o.ifAvailable){if(held.has(n)||queue(n).length){Promise.resolve().then(()=>cb(null)).then(resolve,reject);return;}run(n,r);return;}
    if(o.signal){o.signal.addEventListener("abort",()=>{const q=queue(n),i=q.indexOf(r);if(i>=0){q.splice(i,1);reject(new DOMException("a","AbortError"));}});}
    if(!held.has(n)&&!queue(n).length){run(n,r);return;}queue(n).push(r);});},
    // O browser liberta os locks de um separador terminado (sem esperar pela sua promessa).
    crash(){for(const n of [...held.keys()]){held.delete(n);const x=queue(n).shift();if(x)run(n,x);}}};
}
function makeTab(name){
  const t={name,win:new EventTarget(),doc:new EventTarget(),session:plain(),closed:false,mem:null};
  t.local=view(t,canonical);t.win.location={reload:vi.fn()};t.doc.visibilityState="visible";tabs.push(t);return t;
}
async function boot(t){return inTab(t,()=>bootInTab(t));}
async function bootInTab(t){
  use(t);vi.resetModules();
  vi.stubGlobal("navigator",locksApi?{locks:locksApi}:{});vi.stubGlobal("BroadcastChannel",LaggyChannel);
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:t.account||ACCOUNT}})));
  const accounts=await import("../../app/lib/cloudAccountSession.js");
  t.ws=await import("../../app/lib/accountWorkspace.js");
  t.i=await import("../../app/lib/stateIntegrity.js");
  t.w=await import("../../app/lib/stateWriter.js");
  t.drafts=await import("../../app/lib/sessionDraft.js");
  t.rec=await import("../../app/lib/stateRecovery.js");t.copies=await import("../../app/lib/recoveryCopies.js");t.r=await import("../../app/lib/reliability.js");t.pwm=await import("../../app/lib/portugueseWritingMemory.js");
  if(t.account!=="global"){use(t);t.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());}
  Object.assign(t.w.STATE_WRITER_TIMING,{reloadWaitMs:30,requestTimeoutMs:600,holdNoticeMs:50});t.w.setMandateRegisterForTests(register);
  use(t);await t.w.startStateWriter({scope:t.account||ACCOUNT,flush:()=>true,snapshot:()=>t.mem});use(t);
  return t;
}
const mode=t=>t.w.stateWriterStatus().mode;
function hydrate(t){return inTab(t,()=>{use(t);const loaded=t.i.guardedLoadLocalStateStatus({},()=>({}));t.mem=loaded.state;return t.i.reconcileTabCopiesAtHydration("a25");});}
function saveDurably(t,next){return inTab(t,()=>{t.mem=next;return t.i.saveLocalStateDurably(next).ok;});}
function save(t,next){return inTab(t,()=>{t.mem=next;return t.i.guardedSaveLocalState(next);});}
const stored=()=>JSON.parse(canonical.get(STATE_KEY));
const conflictCopies=()=>copyBodies().map(body=>JSON.parse(body.keys.a25||"null")?.xp);
const seed={schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:ACCOUNT},xp:100,missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:1};

function reset(withLocks){register=makeRegister();canonical=new Map([[LEGACY_STATE_KEY,JSON.stringify(seed)]]);tabs=[];pendingBytes=[];pendingMessages=[];channels=new Set();lagMessages=false;locksApi=withLocks?lockManager():null;quotaBytes=null;}
const later=(fn,ms)=>setTimeout(fn,ms);
const everything=()=>JSON.stringify([...canonical.entries()].filter(([k])=>!k.includes("auth-epoch")&&!k.includes("writer-signal")).sort());
afterEach(()=>{for(const t of tabs){try{use(t);t.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});



const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=k=>`a25-ws-v2:acct:${ACCOUNT}:${k}`;
const W=n=>`a25-ws-v2:acct:${ACCOUNT}:~${n}`;
const KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1","applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715","a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
const setNow=()=>Object.fromEntries(KEYS.map(k=>[k,canonical.get(C(k))??null]));
const same=(a,b)=>KEYS.every(k=>(a[k]??null)===(b[k]??null));
const copiesWith=set=>[...canonical.entries()].filter(([k])=>k.startsWith(W("recovery:"))).map(([,v])=>JSON.parse(v)).filter(c=>same(c.keys,set));
function tryEveryWrite(t){
  use(t);const out=[];
  out.push(t.i.guardedSaveLocalState({...seed,xp:1}));
  use(t);out.push(t.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"syn-hold",responses:[]}));
  use(t);out.push(t.r.reserveSessionCompletion("syn-hold").status==="reserved");
  use(t);out.push(t.pwm.savePortugueseWritingMemory([{attemptId:"syn",criterionId:"c1",status:"weak",at:1}]));
  return out;
}
// Dois conjuntos completos e diferentes nas 9 chaves (estado com XP e histórico,
// rascunhos com respostas, recibos D3 e memória de escrita).
const make=(tag,xp)=>({
  "a25":JSON.stringify({...seed,xp,missionHistory:[{id:`m-${tag}`,xp}],examHistory:[{completionId:`e-${tag}`,score20:xp%20}],_stateVersion:31,_savedAt:xp}),
  "a25-friends-beta":JSON.stringify({...seed,betaMode:"friends_beta",xp:xp+1,_stateVersion:31}),
  "a25-active-session-v1":JSON.stringify({kind:"mission",betaMode:"internal",sessionId:`d-${tag}`,responses:[{answer:`resp-${tag}-1`},{answer:`resp-${tag}-2`}],savedAt:xp}),
  "a25-friends-active-session-v1":JSON.stringify({kind:"training",sessionId:`f-${tag}`,i:2}),
  "applus:fqa-exam-draft:v1:fqa-mini-1":JSON.stringify({itemIds:["q1"],answers:{q1:`fqa1-${tag}`},startedAt:1,index:0}),
  "applus:fqa-exam-draft:v1:fqa-mini-2":JSON.stringify({itemIds:["q2"],answers:{q2:`fqa2-${tag}`},startedAt:1,index:0}),
  "applus:fqa-exam-draft:v1:fqa-full-715":JSON.stringify({itemIds:["q3"],answers:{q3:`fqa3-${tag}`},startedAt:1,index:0}),
  "a25-completed-sessions-v1":JSON.stringify([{id:`e-${tag}`,status:"committed",at:xp,owner:"tab-x"}]),
  "approva.portuguese-writing-memory.v1":JSON.stringify([{attemptId:`pt-${tag}`,criterionId:"c1",status:"weak",at:xp}])
});
async function prepare(){
  reset(true);canonical.delete(LEGACY_STATE_KEY);
  const before=make("atual",150),target=make("copia",77);
  for(const k of KEYS)canonical.set(`a25-account-v1:${ACCOUNT}:${k}`,before[k]); // importado pelo 1.º escritor
  const a=makeTab("A");await boot(a);expect(mode(a)).toBe("writer");
  expect(same(setNow(),before)).toBe(true);
  use(a);const copy=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic-target",keys:target});
  deliverBytes();
  return {a,before,target,copyId:copy.key};
}
// Interrompe depois da n-ésima das 9 escritas académicas do restauro.
function inject(t,n,mode){
  const realSet=t.local.setItem,realRemove=t.local.removeItem;let academic=0,tripped=mode==="quota-persistent"&&n===0;
  const isAcademic=k=>KEYS.some(x=>C(x)===k);
  const isWorkspace=k=>k.startsWith(`a25-ws-v2:acct:${ACCOUNT}:`);
  const guard=(k,fn)=>{
    if(tripped&&(mode==="crash"||mode==="reload"))return;          // processo morto: nada mais chega ao armazenamento
    // quota real: as escritas grandes (conjuntos académicos) falham; marcador e selo cabem
    if(tripped&&mode==="quota-persistent"&&isAcademic(k))throw new DOMException("synthetic quota","QuotaExceededError");
    if(academic>=n&&!tripped&&isWorkspace(k)&&mode!=="crash"&&mode!=="reload"){tripped=true;throw mode==="error"?new DOMException("synthetic","UnknownError"):new DOMException("synthetic quota","QuotaExceededError");}
    fn();
    if(isAcademic(k)){academic++;if(academic===n&&(mode==="crash"||mode==="reload"))tripped=true;}
  };
  t.local.setItem=(k,v)=>guard(k,()=>realSet(k,v));
  t.local.removeItem=k=>guard(k,()=>realRemove(k));
  return {restore(){t.local.setItem=realSet;t.local.removeItem=realRemove;}};
}
async function reopen(name,{session=null}={}){
  const t=makeTab(name);if(session)for(const [k,v] of session.data)t.session.data.set(k,v);
  await boot(t);await wait(80);
  if(mode(t)==="verifying"){use(t);expect(tryEveryWrite(t),"retenção: nada escrito antes de resolver").toEqual([false,false,false,false]);use(t);t.w.adoptAfterUncleanEnd();await wait(5);}
  return t;
}
function expectConsistent(final,{before,target},label){
  const isTarget=same(final,target),isBefore=same(final,before);
  expect(isTarget||isBefore,`${label}: conjunto misto nas 9 chaves ${JSON.stringify(KEYS.filter(k=>final[k]!==target[k]&&final[k]!==before[k]))}`).toBe(true);
  expect(copiesWith(before).length,`${label}: conjunto anterior guardado`).toBeGreaterThan(0);
  expect(copiesWith(target).length,`${label}: conjunto da cópia guardado`).toBeGreaterThan(0);
  return isTarget?"target":"before";
}

// ---------------------------------------------------------------- NO-GO #462
const L=k=>`a25-account-v1:${ACCOUNT}:${k}`;
const setEverywhere=(k,v)=>{canonical.set(k,v);for(const t of tabs)t.local.data.set(k,v);};
const journalRaw=()=>canonical.get(W("restore-journal"))??null;
const xpNow=()=>JSON.parse(canonical.get(C("a25"))).xp;
const examsNow=()=>JSON.parse(canonical.get(C("a25"))).examHistory.map(e=>e.completionId);
const receiptsNow=()=>JSON.parse(canonical.get(C("a25-completed-sessions-v1"))||"[]").map(r=>`${r.id}:${r.status}`);
const failJournalRemoval=t=>{t.getFault=k=>k===W("restore-journal")?"noremove":null;};
function closeClean(t){use(t);t.win.dispatchEvent(new Event("pagehide"));deliverBytes();t.closed=true;}
async function open(name,{account=null,fault=null}={}){const t=makeTab(name);if(account)t.account=account;if(fault)t.getFault=fault;await boot(t);await wait(20);return t;}
// Prepara um escritor com o conjunto "atual" e uma cópia-alvo (opcionalmente alterada).
async function prepareWith(patch=x=>x){
  reset(true);canonical.delete(LEGACY_STATE_KEY);
  const before=make("atual",150),target=patch(make("copia",77));
  for(const k of KEYS)canonical.set(L(k),before[k]);
  const a=makeTab("A");await boot(a);expect(mode(a)).toBe("writer");
  use(a);const copy=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic-target",keys:target});
  deliverBytes();
  return {a,before,target,copyId:copy.key};
}
// Estudar de verdade: XP, avaliação, recibo D3 e rascunho, gravados pelos percursos da app.
function study(t,{xp,exam}){
  hydrate(t);
  expect(saveDurably(t,{...t.mem,xp,examHistory:[...(t.mem.examHistory||[]),{completionId:exam,score20:12}]})).toBe(true);
  use(t);expect(t.r.reserveSessionCompletion(exam,{isRecorded:()=>true}).status).toBe("already_completed");
  use(t);t.drafts.clearSessionDraft("internal"); // a sessão anterior terminou
  use(t);expect(t.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:`draft-${exam}`,responses:[{answer:`resp-${exam}`}]})).toBeTruthy();
}

// ================================================================ correções residuais
// Provas pelos bytes persistidos: as 9 chaves (XP, avaliações, rascunhos, recibos D3,
// memória de escrita), as cópias de recuperação e o diário. Dados sintéticos.
const recoveryEntries=()=>[...canonical.entries()].filter(([k])=>k.startsWith(W("recovery:"))).map(([k,v])=>({id:k,...JSON.parse(v)}));
const byReason=r=>recoveryEntries().filter(c=>c.reason===r);
const sessionCopies=t=>[...t.session.data.entries()].filter(([k])=>k.startsWith(W("recovery:"))).map(([k,v])=>({id:k,...JSON.parse(v)}));
const del=(t,id)=>{use(t);return t.rec.deleteRecoveryCopy(id,{exported:true},ACCOUNT);};
const draftNow=()=>JSON.parse(canonical.get(C("a25-active-session-v1"))||"null")?.sessionId??null;
// Restauro concluído + estudo depois dele: há cópias restore_target/before_restore no histórico.
async function restoredAndStudied(){
  const p=await prepareWith();
  use(p.a);expect(p.a.rec.restoreRecoveryCopy(p.copyId,{reload:false}).ok).toBe(true);
  closeClean(p.a);
  const b=await open("B");expect(mode(b)).toBe("writer");study(b,{xp:500,exam:"e-novo"});closeClean(b);
  return {...p,progress:setNow()};
}
function expectProgress(progress,label){
  expect(same(setNow(),progress),`${label}: 9 chaves intactas`).toBe(true);
  expect(xpNow(),`${label}: XP`).toBe(500);
  expect(examsNow(),`${label}: avaliação`).toContain("e-novo");
  expect(receiptsNow(),`${label}: recibo D3`).toContain("e-novo:committed");
  expect(draftNow(),`${label}: rascunho`).toBe("draft-e-novo");
}
function noDoubleReward(t,id){
  hydrate(t);const xp=t.mem.xp;
  use(t);expect(t.r.reserveSessionCompletion(id,{isRecorded:()=>t.r.stateRecordsCompletion(t.mem,id)}).status,"sem recompensa duplicada").toBe("already_completed");
  expect(xpNow()).toBe(xp);
}

describe("Residual X1 — diário corrompido com a quota cheia",()=>{
  it("consulta e exportação sem gravar; só as cópias de restauro ficam protegidas; libertar espaço resolve (A1, A2, A13)",async()=>{
    const {copyId,progress}=await restoredAndStudied();
    setEverywhere(W("restore-journal"),"{corrupt");
    quotaBytes=usedBytes()+300;
    const c=await open("C");
    expect(mode(c),"só consulta logo no arranque").toBe("readonly");
    expect(c.w.stateWriterStatus().restore?.reason).toBe("journal_corrupt");
    expect(tryEveryWrite(c)).toEqual([false,false,false,false]);
    expectProgress(progress,"retenção");
    // exportar o progresso atual sem gravar
    use(c);const exp=JSON.parse(c.rec.exportCurrentSet(ACCOUNT));
    expect(KEYS.every(k=>(exp.keys[k]??null)===(progress[k]??null)),"exportação = bytes gravados").toBe(true);
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT).reason).toBe("no_space_for_backup");
    // as cópias que um restauro pode referenciar continuam protegidas
    for(const r of ["restore_target","before_restore"])for(const copy of byReason(r))expect(del(c,copy.id).reason,r).toBe("copy_in_use");
    // uma cópia que nenhum restauro referencia pode ser apagada (depois de descarregada)
    expect(del(c,copyId).ok).toBe(true);
    use(c);const keep=c.rec.keepCurrentAndDiscardJournal(ACCOUNT);
    expect(keep.ok).toBe(true);expect(journalRaw()).toBe(null);
    expect(byReason("journal_discarded_current").filter(x=>same(x.keys,progress)).length,"cópia durável do progresso mantido").toBe(1);
    expectProgress(progress,"depois de manter");
    closeClean(c);
    const d=await open("D");expect(mode(d)).toBe("writer");
    expectProgress(progress,"reabertura");noDoubleReward(d,"e-novo");
  });

  it("sem nenhuma cópia apagável: manter o atual só depois de exportar exatamente os bytes atuais",async()=>{
    const {copyId,progress}=await restoredAndStudied();
    {const t=await open("T");expect(del(t,copyId).ok).toBe(true);closeClean(t);}
    setEverywhere(W("restore-journal"),"{corrupt");
    quotaBytes=usedBytes()+300;
    const c=await open("C");expect(mode(c)).toBe("readonly");
    for(const copy of recoveryEntries())expect(del(c,copy.id).reason).toBe("copy_in_use");
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT).reason).toBe("no_space_for_backup");
    use(c);const exp=JSON.parse(c.rec.exportCurrentSet(ACCOUNT));
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT,{exportedFingerprints:{...exp.fingerprints,a25:"fp1-0-0"}}).reason,"exportação de outros bytes").toBe("export_mismatch");
    expect(journalRaw()).toBe("{corrupt");
    use(c);const keep=c.rec.keepCurrentAndDiscardJournal(ACCOUNT,{exportedFingerprints:exp.fingerprints});
    expect(keep.ok).toBe(true);expect(keep.copy).toBe(null);expect(keep.exportedOnly).toBe(true);
    expect(journalRaw()).toBe(null);
    expect(byReason("restore_target").length+byReason("before_restore").length,"cópias de restauro mantidas").toBeGreaterThanOrEqual(2);
    expectProgress(progress,"depois de manter");
    closeClean(c);
    const d=await open("D");expect(mode(d)).toBe("writer");expectProgress(progress,"reabertura");noDoubleReward(d,"e-novo");
  });

  it("ids citados nos bytes de um diário corrompido contam como necessários; diário ilegível protege as cópias de restauro",async()=>{
    const {copyId}=await restoredAndStudied();
    setEverywhere(W("restore-journal"),`{"target":"${copyId}",`);
    const c=await open("C");expect(mode(c)).toBe("readonly");
    expect(del(c,copyId).reason).toBe("copy_in_use");
    closeClean(c);
    canonical.delete(W("restore-journal"));
    const d=await open("D",{fault:k=>k===W("restore-journal")?"throw":null});
    expect(mode(d)).toBe("readonly");expect(d.w.stateWriterStatus().restore?.reason).toBe("journal_unreadable");
    for(const r of ["restore_target","before_restore"])for(const copy of byReason(r))expect(del(d,copy.id).reason).toBe("copy_in_use");
    expect(del(d,copyId).ok).toBe(true);
  });
});

describe("Residual X7 — leitura falhada a meio da sessão",()=>{
  it("diário ilegível por instantes: a alteração em memória fica numa cópia durável; nada gravado; sem retenção depois",async()=>{
    const {a,before}=await prepareWith();
    hydrate(a);
    let once=true;a.getFault=k=>{if(k===W("restore-journal")&&once){once=false;return "throw";}return null;};
    const ok=saveDurably(a,{...a.mem,xp:4321,examHistory:[...(a.mem.examHistory||[]),{completionId:"e-mem",score20:19}]});
    expect(ok).toBe(false);
    use(a);const st=a.w.stateWriterStatus();
    expect(st.mode).toBe("readonly");expect(st.reason,"não é um restauro").toBe("storage_read_failed");
    expect(st.unsaved?.tier).toBe("durable");
    const copy=JSON.parse(canonical.get(st.unsaved.copy));
    expect(JSON.parse(copy.keys.a25).xp).toBe(4321);
    expect(JSON.parse(copy.keys.a25).examHistory.map(e=>e.completionId)).toContain("e-mem");
    for(const k of KEYS.filter(k=>k!=="a25"))expect(copy.keys[k]??null,k).toBe(before[k]??null);
    expect(same(setNow(),before),"guardado intacto").toBe(true);
    use(a);expect(JSON.parse(a.w.exportUnsavedTabSet()).keys.a25).toBe(copy.keys.a25);
    closeClean(a);
    const b=await open("B");expect(mode(b),"selado: sem retenção").toBe("writer");
    use(b);expect(b.rec.restoreRecoveryCopy(st.unsaved.copy,{reload:false}).ok).toBe(true);
    closeClean(b);
    const c=await open("C");expect(xpNow()).toBe(4321);expect(examsNow()).toContain("e-mem");
    noDoubleReward(c,"e-mem");
  });

  it("leitura falhada da própria chave: a resposta por gravar fica guardada (temporária ou durável), com o nível indicado",async()=>{
    const {a,before}=await prepareWith();
    hydrate(a);
    const draft=JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"d-pendente",responses:[{answer:"resposta-por-gravar"}]});
    a.getFault=k=>k===C("a25-active-session-v1")?"throw":null;
    use(a);expect(()=>a.ws.scopedLocalStorage().setItem("a25-active-session-v1",draft)).toThrow();
    use(a);const st=a.w.stateWriterStatus();
    expect(st.mode).toBe("readonly");expect(st.reason).toBe("storage_read_failed");
    expect(st.unsaved.tier).toBe("durable");
    expect(JSON.parse(canonical.get(st.unsaved.copy)).keys["a25-active-session-v1"]).toBe(draft);
    expect(same(setNow(),before)).toBe(true);
    // sem espaço durável: cópia só no separador
    const p=await prepareWith();hydrate(p.a);
    quotaBytes=usedBytes()+50;
    p.a.getFault=k=>k===C("a25-active-session-v1")?"throw":null;
    use(p.a);expect(()=>p.a.ws.scopedLocalStorage().setItem("a25-active-session-v1",draft)).toThrow();
    use(p.a);const s2=p.a.w.stateWriterStatus();
    expect(s2.unsaved.tier).toBe("tab");
    expect(sessionCopies(p.a).some(c=>c.keys["a25-active-session-v1"]===draft)).toBe(true);
    // sem espaço nenhum: falhou, mas continua exportável a partir deste separador
    const q=await prepareWith();hydrate(q.a);
    quotaBytes=usedBytes()+50;q.a.session.setItem=()=>{throw new DOMException("q","QuotaExceededError")};
    q.a.getFault=k=>k===C("a25-active-session-v1")?"throw":null;
    use(q.a);expect(()=>q.a.ws.scopedLocalStorage().setItem("a25-active-session-v1",draft)).toThrow();
    use(q.a);expect(q.a.w.stateWriterStatus().unsaved.tier).toBe("failed");
    use(q.a);expect(JSON.parse(q.a.w.exportUnsavedTabSet()).keys["a25-active-session-v1"]).toBe(draft);
  });
});

describe("Residual X3 — cópias órfãs de restauros falhados (A7, A8)",()=>{
  it("sem espaço para a segurança: nenhuma cópia restore_target fica para trás, nem durável nem temporária",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    const len=s=>W("recovery:").length+12+JSON.stringify({format:"aplus-state-recovery-copy-v2",scope:ACCOUNT,reason:"restore_target",at:Date.now(),tab:"writer-xxxxxxxx-xxxxxxxx",keys:s,source:copyId}).length;
    quotaBytes=usedBytes()+len(target)+300;
    const used=usedBytes();
    for(let i=0;i<3;i++){use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("no_space_for_backup");}
    expect(byReason("restore_target").length).toBe(0);expect(byReason("before_restore").length).toBe(0);
    expect(sessionCopies(a).length).toBe(0);
    expect(usedBytes(),"espaço devolvido").toBe(used);
    expect(journalRaw()).toBe(null);expect(same(setNow(),before)).toBe(true);
    expect(mode(a)).toBe("writer");
  });
  const copyLen=(s,extra={})=>W("recovery:").length+12+JSON.stringify({format:"aplus-state-recovery-copy-v2",scope:ACCOUNT,reason:"before_restore",at:Date.now(),tab:"writer-xxxxxxxx-xxxxxxxx",keys:s,...extra}).length;
  it("A7: o alvo não cabe (só no separador) mas a segurança caberia: recusado antes de qualquer diário",async()=>{
    const {a,before,target,copyId}=await prepareWith(t=>({...t,"approva.portuguese-writing-memory.v1":JSON.stringify([{attemptId:"pt-big",pad:"g".repeat(4000)}])}));
    const free=copyLen(before,{restoring:copyId})+600;
    expect(free<copyLen(target,{source:copyId}),"calibração: o alvo não cabe").toBe(true);
    quotaBytes=usedBytes()+free;const used=usedBytes();
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("no_space_for_backup");
    expect(journalRaw()).toBe(null);expect(same(setNow(),before)).toBe(true);
    expect(sessionCopies(a).length).toBe(0);expect(usedBytes()).toBe(used);
  });
  it("A8: o alvo cabe, a segurança só no separador: recusado e o alvo fixado apagado",async()=>{
    const big=t=>({...t,"approva.portuguese-writing-memory.v1":JSON.stringify([{attemptId:"pt-big",pad:"g".repeat(4000)}])});
    const {a,before,target,copyId}=await prepareWith();
    // o conjunto atual é grande; o alvo é pequeno
    const B2=big(before);for(const k of KEYS){if(B2[k]===null)canonical.delete(C(k));else setEverywhere(C(k),B2[k]);}
    use(a);a.w.noteRestoredWrites();
    const free=copyLen(target,{source:copyId})+800;
    expect(free<copyLen(target,{source:copyId})+copyLen(B2,{restoring:copyId}),"calibração: a segurança não cabe").toBe(true);
    quotaBytes=usedBytes()+free;const used=usedBytes();
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("no_space_for_backup");
    expect(journalRaw()).toBe(null);expect(same(setNow(),B2)).toBe(true);
    expect(byReason("restore_target").length).toBe(0);expect(sessionCopies(a).length).toBe(0);expect(usedBytes()).toBe(used);
  });
  it("alvo só cabe no separador: recusado e sem resto (A7)",async()=>{
    const {a,before,copyId}=await prepareWith();
    quotaBytes=usedBytes()+100;
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("no_space_for_backup");
    expect(sessionCopies(a).length).toBe(0);expect(journalRaw()).toBe(null);expect(same(setNow(),before)).toBe(true);
  });
  it("restauro que falha e é reposto: o alvo fixado (igual à cópia escolhida) é apagado; a segurança fica",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    const f=inject(a,4,"error");
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("restore_write_failed");
    f.restore();
    expect(same(setNow(),before)).toBe(true);expect(journalRaw()).toBe(null);
    expect(byReason("restore_target").length).toBe(0);
    expect(byReason("before_restore").length,"restaurar continua reversível").toBe(1);
    expect(copiesWith(target).length,"a cópia escolhida continua guardada").toBeGreaterThan(0);
    expect(mode(a)).toBe("writer");
  });
});

describe("Residual X4 — reaberturas repetidas em retenção",()=>{
  it("o mesmo conjunto encontrado é guardado uma só vez",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    use(a);const pinned=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"restore_target",keys:target});
    use(a);const backup=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"before_restore",keys:before});
    setEverywhere(W("restore-journal"),JSON.stringify({id:"j-x",phase:"writing",target:pinned.key,backup:backup.key,source:copyId,at:1}));
    setEverywhere(C("a25"),target.a25);
    const mixed=setNow();
    closeClean(a);
    for(let i=0;i<4;i++){
      const t=makeTab("R"+i);t.getFault=k=>KEYS.some(x=>C(x)===k)?"drop":null;
      await boot(t);await wait(20);
      expect(mode(t)).toBe("readonly");expect(t.w.stateWriterStatus().restore?.reason).toBe("unresolvable");
      closeClean(t);
    }
    expect(byReason("journal_resolution_found").length).toBe(1);
    expect(same(byReason("journal_resolution_found")[0].keys,mixed)).toBe(true);
    expect(copiesWith(before).length).toBeGreaterThan(0);expect(copiesWith(target).length).toBeGreaterThan(0);
  });
});

describe("Residual X2 — apagar cópias temporárias",()=>{
  it("a cópia temporária é mesmo apagada e o resultado diz que era temporária",async()=>{
    const {a}=await prepareWith();
    const id=W("recovery:sess-only");
    a.session.data.set(id,JSON.stringify({format:"aplus-state-recovery-copy-v2",scope:ACCOUNT,reason:"synthetic",at:5,keys:make("s",5)}));
    const localBefore=everything();
    const r=del(a,id);
    expect(r.ok).toBe(true);expect(r.temporary).toBe(true);
    use(a);expect(a.rec.recoveryCopiesForView(ACCOUNT).copies.some(c=>c.id===id)).toBe(false);
    expect(a.session.data.has(id)).toBe(false);expect(everything()).toBe(localBefore);
  });
});

describe("Residual — mutantes sobreviventes da auditoria (A4, A5, A10, A14, A15)",()=>{
  it("A4: nunca começa um restauro por cima de um diário pendente",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    use(a);const pinned=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"restore_target",keys:target});
    use(a);const backup=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"before_restore",keys:before});
    const j=JSON.stringify({id:"j-a4",phase:"writing",target:pinned.key,backup:backup.key,at:1});
    setEverywhere(W("restore-journal"),j);
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("restore_pending");
    expect(journalRaw()).toBe(j);expect(same(setNow(),before)).toBe(true);
  });
  it("A5: reposto mas com o diário por apagar: o separador para de gravar",async()=>{
    const {a,before,copyId}=await prepareWith();
    failJournalRemoval(a);const f=inject(a,4,"error");
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("restore_incomplete");
    f.restore();
    expect(mode(a)).not.toBe("writer");expect(same(setNow(),before)).toBe(true);
    expect(tryEveryWrite(a)).toEqual([false,false,false,false]);
  });
  it("A10: manter o atual grava primeiro uma cópia durável dele, uma só vez mesmo com tentativas repetidas",async()=>{
    const {a,copyId}=await prepareWith();
    use(a);const r=a.rec.restoreRecoveryCopy(copyId,{reload:false});
    closeClean(a);
    const b=await open("B");study(b,{xp:500,exam:"e-novo"});closeClean(b);
    const progress=setNow();
    setEverywhere(W("restore-journal"),JSON.stringify({phase:"writing",target:r.target,backup:r.backup,at:1}));
    const c=await open("C");expect(c.w.stateWriterStatus().restore?.reason).toBe("stale_journal");
    failJournalRemoval(c);
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT).reason).toBe("journal_not_cleared");
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT).reason).toBe("journal_not_cleared");
    c.getFault=null;
    use(c);expect(c.rec.keepCurrentAndDiscardJournal(ACCOUNT).ok).toBe(true);
    expect(byReason("journal_discarded_current").length).toBe(1);
    expect(same(byReason("journal_discarded_current")[0].keys,progress)).toBe(true);
    expectProgress(progress,"mantido");
  });
  it("A14: cópia com registo D3 ilegível não é restaurável",async()=>{
    const {a,before,copyId}=await prepareWith(t=>({...t,"a25-completed-sessions-v1":"{ilegivel"}));
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("d3_registry_unreadable");
    expect(same(setNow(),before)).toBe(true);
  });
  it("A15: páginas com escrita exclusiva não gravam com diário presente",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    use(a);const pinned=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"restore_target",keys:target});
    use(a);const backup=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"before_restore",keys:before});
    closeClean(a);
    setEverywhere(W("restore-journal"),JSON.stringify({id:"j-a15",target:pinned.key,backup:backup.key,at:1}));
    // Página sem escritor (como /piloto): o mesmo arranque, sem startStateWriter.
    const page=async name=>{const p=makeTab(name);await inTab(p,async()=>{use(p);vi.resetModules();
      vi.stubGlobal("navigator",{locks:locksApi});vi.stubGlobal("BroadcastChannel",LaggyChannel);
      vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:ACCOUNT}})));
      const accounts=await import("../../app/lib/cloudAccountSession.js");
      p.ws=await import("../../app/lib/accountWorkspace.js");p.w=await import("../../app/lib/stateWriter.js");
      use(p);p.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());p.w.setMandateRegisterForTests(register);});return p;};
    const write=p=>()=>{use(p);p.ws.scopedLocalStorage().setItem("a25",JSON.stringify({...seed,xp:9999,_stateVersion:31}));return 1;};
    const bytes=everything();
    const p=await page("piloto");expect(p.w.stateWriterStatus().mode).toBe("inactive");
    use(p);const result=await p.w.withExclusiveStateWrite(ACCOUNT,write(p));
    expect(result.ok).toBe(false);expect(everything()).toBe(bytes);
    // controlo positivo: sem diário, a mesma página grava (o teste não é vácuo)
    canonical.delete(W("restore-journal"));for(const t of tabs)t.local.data.delete(W("restore-journal"));
    const q=await page("piloto-2");use(q);const ok=await q.w.withExclusiveStateWrite(ACCOUNT,write(q));
    expect(ok.ok).toBe(true);expect(xpNow()).toBe(9999);
  });
});

describe("Residual — isolamento A/B nas novas saídas",()=>{
  it("exportar, apagar e manter na conta B nunca tocam na conta A (com diário corrompido em A)",async()=>{
    const {copyId,progress}=await restoredAndStudied();
    setEverywhere(W("restore-journal"),`{"target":"${copyId}",`);
    const aBytes=JSON.stringify([...canonical.entries()].filter(([k])=>k.includes(ACCOUNT)).sort());
    const b=await open("Bacct",{account:"synthetic-B"});expect(mode(b)).toBe("writer");
    use(b);b.ws.scopedLocalStorage().setItem("a25",JSON.stringify({...seed,xp:7,_stateVersion:31}));
    use(b);const bCopy=b.copies.writeRecoveryCopy({scope:"synthetic-B",reason:"synthetic-b",keys:{a25:JSON.stringify({...seed,xp:7})}});
    use(b);const exp=b.rec.exportCurrentSet("synthetic-B");
    expect(exp.includes("e-novo")).toBe(false);expect(JSON.parse(JSON.parse(exp).keys.a25).xp).toBe(7);
    use(b);expect(b.rec.deleteRecoveryCopy(copyId,{exported:true}).reason).toBe("copy_not_found");
    use(b);expect(b.rec.deleteRecoveryCopy(bCopy.key,{exported:true}).ok,"diário de A não protege cópias de B").toBe(true);
    use(b);expect(b.rec.keepCurrentAndDiscardJournal().unchanged).toBe(true);
    expect(JSON.stringify([...canonical.entries()].filter(([k])=>k.includes(ACCOUNT)).sort()),"bytes de A intactos").toBe(aBytes);
  });
});
