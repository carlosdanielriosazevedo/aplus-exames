// NO-GO #462 — regressões adversariais r1–r6 e mutantes M2/M4/M5/M10/M13/M15.
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

describe("NO-GO #462 · r1 — diário que não se consegue apagar",()=>{
  it("nada é gravado enquanto o diário subsistir; depois de apagado, o progresso novo nunca é substituído",async()=>{
    const {a,target,copyId}=await prepareWith();
    failJournalRemoval(a);
    use(a);const r=a.rec.restoreRecoveryCopy(copyId,{reload:false});
    expect(r.ok).toBe(false);expect(r.reason).toBe("journal_not_cleared");expect(r.applied).toBe(true);
    expect(mode(a),"o separador para de gravar").toBe("released");
    expect(same(setNow(),target)).toBe(true);
    deliverBytes();a.closed=true;
    // Falha persistente: a abertura seguinte não consegue provar a remoção → só consulta.
    const b=await open("B",{fault:k=>k===W("restore-journal")?"noremove":null});
    expect(mode(b)).toBe("readonly");
    expect(b.w.stateWriterStatus().restore?.reason).toBe("journal_not_cleared");
    expect(tryEveryWrite(b),"nenhuma gravação académica com o diário presente").toEqual([false,false,false,false]);
    expect(same(setNow(),target)).toBe(true);
    closeClean(b);
    // Armazenamento recuperado: o diário é resolvido e apagado; o aluno estuda.
    const c=await open("C");
    expect(mode(c)).toBe("writer");expect(c.w.stateWriterStatus().restore?.status).toBe("completed");
    expect(journalRaw()).toBe(null);
    study(c,{xp:500,exam:"e-novo"});
    closeClean(c);
    const d=await open("D");
    expect(mode(d)).toBe("writer");
    expect(xpNow(),"XP do estudo novo").toBe(500);
    expect(examsNow()).toContain("e-novo");
    expect(receiptsNow()).toContain("e-novo:committed");
    expect(JSON.parse(canonical.get(C("a25-active-session-v1"))).sessionId).toBe("draft-e-novo");
  });

  it("diário antigo (resíduo do SHA vulnerável) com progresso mais recente: nada é substituído; o aluno decide",async()=>{
    const {a,copyId}=await prepareWith();
    use(a);const r=a.rec.restoreRecoveryCopy(copyId,{reload:false});expect(r.ok).toBe(true);
    const stale=JSON.stringify({phase:"writing",target:r.target,backup:r.backup,source:copyId,at:1});
    closeClean(a);
    const b=await open("B");study(b,{xp:500,exam:"e-novo"});closeClean(b);
    const progress=setNow();
    setEverywhere(W("restore-journal"),stale); // o diário que o SHA vulnerável não apagou
    const c=await open("C");
    expect(mode(c)).toBe("readonly");
    expect(c.w.stateWriterStatus().restore?.reason).toBe("stale_journal");
    expect(tryEveryWrite(c)).toEqual([false,false,false,false]);
    expect(same(setNow(),progress),"progresso mais recente intacto nas 9 chaves").toBe(true);
    expect(xpNow()).toBe(500);
    use(c);const keep=c.rec.keepCurrentAndDiscardJournal(ACCOUNT);
    expect(keep.ok).toBe(true);expect(journalRaw()).toBe(null);
    expect(copiesWith(progress).length,"cópia durável do progresso mantido").toBeGreaterThan(0);
    closeClean(c);
    const d=await open("D");expect(mode(d)).toBe("writer");
    expect(same(setNow(),progress)).toBe(true);expect(xpNow()).toBe(500);expect(receiptsNow()).toContain("e-novo:committed");
  });

  it("M2: um restauro concluído apaga sempre o diário (provado por releitura)",async()=>{
    const {a,target,copyId}=await prepareWith();
    use(a);const r=a.rec.restoreRecoveryCopy(copyId,{reload:false});
    expect(r.ok).toBe(true);expect(journalRaw()).toBe(null);expect(same(setNow(),target)).toBe(true);
    expect(r.target,"alvo é uma cópia própria, não a escolhida").not.toBe(copyId);
  });
});

describe("NO-GO #462 · r2 — cópias necessárias a um restauro pendente",()=>{
  it("não podem ser apagadas nem substituídas; a cópia escolhida pode, e o restauro conclui igual",async()=>{
    const {a,target,copyId}=await prepareWith();
    const f=inject(a,4,"quota-persistent");
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("restore_incomplete");
    f.restore();deliverBytes();a.closed=true;
    const journal=JSON.parse(journalRaw());
    const b=makeTab("B");const bf=inject(b,0,"quota-persistent");await boot(b);await wait(10);
    expect(mode(b)).toBe("readonly");
    use(b);expect(b.rec.deleteRecoveryCopy(journal.target,{exported:true}).reason).toBe("copy_in_use");
    use(b);expect(b.rec.deleteRecoveryCopy(journal.backup,{exported:true}).reason).toBe("copy_in_use");
    const prefix=W("recovery:");
    use(b);expect(b.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"x",keys:{a25:"{}"},id:journal.target.slice(prefix.length)}),"substituição recusada").toBe(null);
    expect(canonical.get(journal.target)).toBeTruthy();expect(canonical.get(journal.backup)).toBeTruthy();
    use(b);expect(b.rec.deleteRecoveryCopy(copyId,{exported:true}).ok,"a cópia escolhida não sustenta o diário").toBe(true);
    use(b);expect(b.rec.keepCurrentAndDiscardJournal(ACCOUNT).reason,"restauro resolúvel não é abandonado").toBe("resolvable");
    bf.restore();closeClean(b);
    const c=await open("C");expect(mode(c)).toBe("writer");
    expect(journalRaw()).toBe(null);expect(same(setNow(),target)).toBe(true);
  });
});

describe("NO-GO #462 · r4 — quota cheia em retenção",()=>{
  it("em retenção, sem ser escritor, o aluno descarrega e apaga uma cópia antiga; depois continua sem perder nada",async()=>{
    const {a,before,copyId}=await prepareWith();
    a.closed=true;locksApi.crash(); // fecho abrupto: sem selo
    const copySize=JSON.stringify(before).length;
    quotaBytes=usedBytes()+Math.floor(copySize/3);
    const b=await open("B");
    expect(mode(b)).toBe("verifying");
    use(b);expect(b.w.adoptAfterUncleanEnd().reason,"sem espaço para a cópia prévia: retenção").toBe("recovery_hold");
    expect(tryEveryWrite(b)).toEqual([false,false,false,false]);
    use(b);const view=b.rec.recoveryCopiesForView(ACCOUNT);
    expect(view.copies.map(c=>c.id)).toContain(copyId);
    use(b);const exported=JSON.parse(b.rec.exportRecoveryCopy(copyId,ACCOUNT));
    expect(JSON.parse(exported.keys.a25).xp).toBe(77);
    use(b);expect(b.rec.deleteRecoveryCopy(copyId,{exported:false},ACCOUNT).reason).toBe("export_first");
    use(b);expect(b.rec.deleteRecoveryCopy(copyId,{exported:true},ACCOUNT).ok).toBe(true);
    use(b);b.w.adoptAfterUncleanEnd();await wait(10);
    expect(mode(b)).toBe("writer");
    expect(same(setNow(),before),"XP, histórico, rascunhos e recibos intactos").toBe(true);
    expect(copiesWith(before).length,"cópia prévia da adoção").toBeGreaterThan(0);
  });
});

describe("NO-GO #462 · r5 — fail-closed nas 9 chaves académicas (M4)",()=>{
  it("leitura falhada, chave fora da linha de base ou diário presente: nenhuma das 9 chaves é gravada",async()=>{
    const {a}=await prepareWith();
    for(const k of KEYS){
      const bytes=canonical.get(C(k))??null;
      a.getFault=key=>key===C(k)?"throw":null;
      use(a);expect(()=>a.ws.scopedLocalStorage().setItem(k,"synthetic"),`leitura falhada: ${k}`).toThrow();
      a.getFault=null;
      expect(canonical.get(C(k))??null,`bytes de ${k}`).toBe(bytes);
      expect(mode(a)).toBe("writer");
    }
    use(a);expect(()=>a.ws.accountStorage(a.local,"synthetic-other").setItem("a25","{}"),"outra área sem lock").toThrow();
    expect(canonical.has("a25-ws-v2:acct:synthetic-other:a25")).toBe(false);
    setEverywhere(W("restore-journal"),JSON.stringify({id:"j-x",target:"none",backup:"none"}));
    const snapshot=setNow();
    for(const k of KEYS){use(a);expect(()=>a.ws.scopedLocalStorage().setItem(k,"synthetic"),`diário presente: ${k}`).toThrow();}
    expect(setNow()).toEqual(snapshot);
    expect(mode(a)).toBe("readonly");
  });
});

describe("NO-GO #462 · r6 — consistência D3 do restauro",()=>{
  it("cópia v1 parcial recusada; cópia com recibos órfãos recusada; restauro válido sem recibos órfãos",async()=>{
    const {a,before,target,copyId}=await prepareWith();
    setEverywhere(`${L("a25-state-conflict-v1:")}old:1:ab`,JSON.stringify({format:"aplus-state-conflict-copy-v1",at:1,reason:"foreign_write",state:{...seed,xp:5,_stateVersion:31}}));
    use(a);const v1=a.rec.recoveryCopiesForView(ACCOUNT).copies.find(c=>c.format==="v1");
    use(a);expect(a.rec.restoreRecoveryCopy(v1.id,{reload:false}).reason).toBe("partial_copy");
    expect(same(setNow(),before)).toBe(true);
    const orphan={...target,"a25-completed-sessions-v1":JSON.stringify([{id:"e-copia",status:"committed",at:1},{id:"e-sem-resultado",status:"committed",at:2}])};
    use(a);const bad=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic-orphan",keys:orphan});
    use(a);const refused=a.rec.restoreRecoveryCopy(bad.key,{reload:false});
    expect(refused.reason).toBe("d3_orphan_receipts");expect(refused.orphans).toEqual(["e-sem-resultado"]);
    expect(same(setNow(),before)).toBe(true);
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).ok).toBe(true);
    expect(receiptsNow()).toEqual(["e-copia:committed"]);
    expect(examsNow()).toEqual(["e-copia"]);
    // A avaliação do conjunto anterior não ficou "concluída" sem resultado: pode ser refeita.
    use(a);expect(a.r.reserveSessionCompletion("e-atual",{isRecorded:()=>false}).status).toBe("reserved");
  });
});

describe("NO-GO #462 · M5 — resolução que repõe a segurança",()=>{
  it("restauro interrompido, alvo já não cabe: o conjunto anterior é reposto e o encontrado fica em cópia",async()=>{
    const big="x".repeat(25_000);
    const {a,before,copyId}=await prepareWith(t=>({...t,"applus:fqa-exam-draft:v1:fqa-full-715":JSON.stringify({itemIds:["q3"],answers:{q3:big},startedAt:1,index:0})}));
    inject(a,1,"crash");
    use(a);try{a.rec.restoreRecoveryCopy(copyId,{reload:false})}catch{}
    deliverBytes();a.closed=true;locksApi.crash();
    const mixed=setNow();
    expect(same(mixed,before)).toBe(false);
    quotaBytes=usedBytes()+10_000;
    const b=await reopen("B");
    expect(mode(b)).toBe("writer");
    expect(b.w.stateWriterStatus().restore?.status).toBe("rolled_back");
    expect(same(setNow(),before),"9 chaves = conjunto anterior").toBe(true);
    expect(xpNow()).toBe(150);expect(receiptsNow()).toEqual(["e-atual:committed"]);
    expect(copiesWith(mixed).length,"o encontrado ficou guardado").toBeGreaterThan(0);
    expect(journalRaw()).toBe(null);
  });
});

describe("NO-GO #462 · M10, M13, M15",()=>{
  it("M10: progresso v2 sem conta (canónico global) é assinalado e nunca atribuído",async()=>{
    reset(true);
    const a=await open("A");
    use(a);expect(a.ws.legacyWorkspacePresent()).toBe(false);
    setEverywhere("a25-ws-v2:global:a25",JSON.stringify({...seed,xp:42}));
    use(a);expect(a.ws.legacyWorkspacePresent()).toBe(true);
    expect(canonical.get(C("a25"))?JSON.parse(canonical.get(C("a25"))).xp:null,"não atribuído à conta").not.toBe(42);
  });

  it("M13: o aviso de escrita de versão anterior fica pendente até ser visto num escritor",async()=>{
    reset(true);
    const a=await open("A");expect(mode(a)).toBe("writer");
    const old=makeTab("main-antigo");
    inTab(old,()=>old.local.setItem(L("a25"),JSON.stringify({...seed,xp:90,_stateVersion:31})));
    deliverBytes();await wait(5);
    expect(a.w.stateWriterStatus().legacy?.status).toBe("changed");
    closeClean(a);old.closed=true;
    const b=await open("B");
    expect(b.w.stateWriterStatus().legacy?.pending,"pendente noutra abertura").toBe(true);
    use(b);expect(b.w.acknowledgeLegacyNotice()).toBe(true);
    closeClean(b);
    const c=await open("C");
    expect(c.w.stateWriterStatus().legacy?.pending).toBeFalsy();
  });

  it("M15: importação verificada por releitura; escrita perdida em silêncio → só consulta, legado intacto",async()=>{
    reset(true);
    const draft=JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"legacy-draft",responses:[{answer:"r"}]});
    canonical.set(L("a25-active-session-v1"),draft);
    const legacyBefore=JSON.stringify(KEYS.map(k=>canonical.get(L(k))??null));
    const a=await open("A",{fault:k=>k===C("a25-active-session-v1")?"drop":null});
    expect(mode(a)).toBe("readonly");
    expect(a.w.stateWriterStatus().reason).toBe("legacy_import_failed");
    expect(JSON.parse(canonical.get(W("legacy-import"))).status).not.toBe("done");
    expect(JSON.stringify(KEYS.map(k=>canonical.get(L(k))??null))).toBe(legacyBefore);
  });
});

describe("NO-GO #462 · isolamento A/B e logout",()=>{
  it("conta B não vê, não restaura nem apaga cópias de A; sem conta (logout) não lê nada de A; bytes de A intactos",async()=>{
    reset(true);
    const a=await open("A");study(a,{xp:321,exam:"e-a"});
    use(a);const copyA=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic-a",keys:setNow()});
    closeClean(a);
    const aBytes=JSON.stringify([...canonical.entries()].filter(([k])=>k.includes(ACCOUNT)).sort());
    const b=await open("B",{account:"synthetic-B"});
    expect(mode(b)).toBe("writer");
    use(b);expect(b.rec.recoveryCopiesForView("synthetic-B").copies.map(c=>c.id)).not.toContain(copyA.key);
    use(b);expect(b.rec.restoreRecoveryCopy(copyA.key,{reload:false}).reason).toBe("copy_not_found");
    use(b);expect(b.rec.deleteRecoveryCopy(copyA.key,{exported:true},"synthetic-B").reason).toBe("copy_not_found");
    use(b);b.ws.scopedLocalStorage().setItem("a25",JSON.stringify({...seed,xp:7,_stateVersion:31}));
    expect(JSON.parse(canonical.get("a25-ws-v2:acct:synthetic-B:a25")).xp).toBe(7);
    closeClean(b);
    const g=await open("G",{account:"global"});
    expect(mode(g)).toBe("writer");
    expect(KEYS.every(k=>canonical.get(`a25-ws-v2:global:${k}`)===undefined),"nada de A importado sem conta").toBe(true);
    use(g);expect(g.rec.recoveryCopiesForView("global").copies.map(c=>c.id)).not.toContain(copyA.key);
    use(g);expect(g.ws.legacyWorkspacePresent(),"dados de A não são 'sem dono'").toBe(false);
    expect(JSON.stringify([...canonical.entries()].filter(([k])=>k.includes(ACCOUNT)).sort()),"bytes de A intactos").toBe(aBytes);
  });
});

describe("NO-GO #462 · escrita exclusiva sem Web Locks",()=>{
  it("sem exclusão fiável, páginas como /piloto e /definicoes não gravam o estado",async()=>{
    reset(false);
    const a=await open("A");expect(mode(a)).toBe("readonly");
    const bytes=JSON.stringify([...canonical.entries()].sort());
    let called=false;
    use(a);const result=await a.w.withExclusiveStateWrite(ACCOUNT,()=>{called=true;return 1;});
    expect(result.ok).toBe(false);expect(called).toBe(false);
    expect(JSON.stringify([...canonical.entries()].sort())).toBe(bytes);
  });
});

describe("NO-GO #462 · resolução sem espaço para guardar o conjunto encontrado (N9)",()=>{
  it("não reescreve nada e fica só em consulta; com espaço, guarda o encontrado e conclui",async()=>{
    const {a,target,copyId}=await prepareWith();
    const f=inject(a,4,"quota-persistent");
    use(a);expect(a.rec.restoreRecoveryCopy(copyId,{reload:false}).reason).toBe("restore_incomplete");
    f.restore();deliverBytes();a.closed=true;
    const mixed=setNow();
    quotaBytes=usedBytes()+500; // cabem o marcador e o selo; não cabe uma cópia do conjunto
    const b=await open("B");
    expect(mode(b)).toBe("readonly");
    expect(b.w.stateWriterStatus().restore?.reason).toBe("no_space_for_found_copy");
    expect(setNow(),"conjunto encontrado intacto").toEqual(mixed);
    expect(tryEveryWrite(b)).toEqual([false,false,false,false]);
    closeClean(b);quotaBytes=null;
    const c=await open("C");
    expect(mode(c)).toBe("writer");expect(c.w.stateWriterStatus().restore?.status).toBe("completed_forward");
    expect(same(setNow(),target)).toBe(true);
    expect(copiesWith(mixed).length,"o encontrado ficou guardado antes de reescrever").toBeGreaterThan(0);
  });
});
