// P1-A: propagação assíncrona do localStorage entre processos (Chromium), com e
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
const STATE_KEY=`a25-account-v1:${ACCOUNT}:a25`;
let canonical,tabs,pendingBytes,pendingMessages,channels;

function view(tab,snapshot){
  const data=new Map(snapshot);
  return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,
    setItem:(k,v)=>{if(tab.quotaFull&&k.includes("tabcopy"))throw new DOMException("synthetic quota","QuotaExceededError");
      const old=data.get(k)??null;data.set(k,String(v));canonical.set(k,String(v));pendingBytes.push({from:tab,k,old,v:String(v)});},
    removeItem:k=>{const old=data.get(k)??null;data.delete(k);canonical.delete(k);pendingBytes.push({from:tab,k,old,v:null});}};
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
let current=null,lagMessages=false;
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
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:ACCOUNT}})));
  const accounts=await import("../../app/lib/cloudAccountSession.js");
  t.ws=await import("../../app/lib/accountWorkspace.js");
  t.i=await import("../../app/lib/stateIntegrity.js");
  t.w=await import("../../app/lib/stateWriter.js");
  t.drafts=await import("../../app/lib/sessionDraft.js");
  use(t);t.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());
  Object.assign(t.w.STATE_WRITER_TIMING,{reloadWaitMs:30,requestTimeoutMs:600,holdNoticeMs:50});t.w.setMandateRegisterForTests(register);
  use(t);await t.w.startStateWriter({scope:ACCOUNT,flush:()=>true,snapshot:()=>t.mem});use(t);
  return t;
}
const mode=t=>t.w.stateWriterStatus().mode;
function hydrate(t){return inTab(t,()=>{use(t);const loaded=t.i.guardedLoadLocalStateStatus({},()=>({}));t.mem=loaded.state;return t.i.reconcileTabCopiesAtHydration("a25");});}
function saveDurably(t,next){return inTab(t,()=>{t.mem=next;return t.i.saveLocalStateDurably(next).ok;});}
function save(t,next){return inTab(t,()=>{t.mem=next;return t.i.guardedSaveLocalState(next);});}
const stored=()=>JSON.parse(canonical.get(STATE_KEY));
const conflictCopies=()=>[...canonical.keys()].filter(k=>k.includes("a25-state-conflict-v1:")).map(k=>{
  const body=JSON.parse(canonical.get(k));return body.state?.xp??JSON.parse(body.raw).xp;
});
const seed={schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:ACCOUNT},xp:100,missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:1};

function reset(withLocks){register=makeRegister();canonical=new Map([[STATE_KEY,JSON.stringify(seed)]]);tabs=[];pendingBytes=[];pendingMessages=[];channels=new Set();lagMessages=false;locksApi=withLocks?lockManager():null;}
const later=(fn,ms)=>setTimeout(fn,ms);
const everything=()=>JSON.stringify([...canonical.entries()].filter(([k])=>!k.includes("auth-epoch")&&!k.includes("writer-signal")).sort());
afterEach(()=>{for(const t of tabs){try{use(t);t.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});



const wait=ms=>new Promise(r=>setTimeout(r,ms));
const DELAYS=[250,500,2000];

describe("P1-A · sem Web Locks com propagação lenta: nenhuma gravação",()=>{
  it("duas abas com bytes e mensagens atrasados: estado guardado nunca muda",async()=>{
    reset(false);lagMessages=true;
    const a=makeTab("A"),b=makeTab("B");await boot(a);await boot(b);
    expect([mode(a),mode(b)]).toEqual(["readonly","readonly"]);
    const before=everything();
    hydrate(a);hydrate(b);
    expect(saveDurably(a,{...a.mem,xp:150})).toBe(false);
    expect(save(b,{...b.mem,xp:101})).toBe(false);
    deliverBytes();deliverMessages();
    expect(everything()).toBe(before);
    expect(stored().xp).toBe(100);
  });
});

async function writerThenObserver(){
  const a=makeTab("A");await boot(a);
  expect(mode(a)).toBe("writer");
  hydrate(a);deliverBytes();
  const b=makeTab("B");await boot(b);
  expect(mode(b)).toBe("observer");
  return {a,b};
}

describe("P1-A · Web Locks: passagem limpa com a escrita final ainda em trânsito",()=>{
  for(const delay of DELAYS)it(`atraso de ${delay} ms: B não lê nem grava até ver o selo; depois tem a conclusão de A`,async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);const done={...a.mem,xp:150,missionHistory:[{id:"synthetic-A-mission"}]};a.mem=done;
    expect(a.i.saveLocalStateDurably(done).ok).toBe(true);      // primeira escrita de A, ainda não chegou a B
    use(b);const request=b.w.requestStateWriter();
    await wait(5);deliverMessages();await wait(5);
    use(a);a.w.completeStateWriterRelease();a.closed=true;       // selo final e libertação
    const result=await request;
    expect(result.mode,"com o lock mas sem prova").toBe("verifying");
    use(b);expect(b.i.guardedSaveLocalState({...seed,xp:1})).toBe(false);
    expect(stored().xp).toBe(150);
    await wait(delay);
    expect(mode(b)).toBe("verifying");                          // nenhum atraso fixo autoriza a escrita
    deliverBytes();await wait(5);
    expect(mode(b)).toBe("writer");
    hydrate(b);expect(b.mem.xp).toBe(150);
    expect(save(b,{...b.mem,productAnalytics:{appOpenCount:2}})).toBe(true);
    expect(stored().xp).toBe(150);expect(stored().missionHistory).toEqual([{id:"synthetic-A-mission"}]);
  });

  it("a escrita final nunca chega: B nunca grava e o progresso de A permanece",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.mem={...a.mem,xp:150};a.i.saveLocalStateDurably(a.mem);
    use(b);const request=b.w.requestStateWriter();await wait(5);deliverMessages();await wait(5);
    use(a);a.w.completeStateWriterRelease();a.closed=true;
    await request;await wait(120);
    expect(mode(b)).toBe("verifying");expect(b.w.stateWriterStatus().reason).toBe("recovery_hold");
    use(b);expect(b.i.guardedSaveLocalState({...seed,xp:1})).toBe(false);
    expect(stored().xp).toBe(150);
  });
});

describe("P1-A · Web Locks: fim abrupto (sem selo)",()=>{
  for(const delay of DELAYS)it(`atraso de ${delay} ms: B fica retido, não grava; nada é substituído`,async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});
    a.closed=true;locksApi.crash();                               // terminou sem pagehide nem selo
    later(deliverBytes,delay);
    use(b);await b.w.requestStateWriter();
    await wait(delay+60);
    expect(mode(b)).toBe("verifying");
    expect(b.w.stateWriterStatus().reason).toBe("recovery_hold");
    use(b);expect(b.i.guardedSaveLocalState({...seed,xp:1})).toBe(false);
    use(b);expect(b.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"x",responses:[]})).toBe(false);
    expect(stored().xp).toBe(150);
    // Recuperação explícita: cópia durável primeiro; depois lê o que existe (inclui A).
    use(b);const adopted=b.w.adoptAfterUncleanEnd();await wait(5);
    expect(adopted.conflictCopy?.durable).toBe(true);
    expect(mode(b)).toBe("writer");
    hydrate(b);expect(b.mem.xp).toBe(150);
    expect(JSON.parse(canonical.get(adopted.conflictCopy.key)).state??JSON.parse(canonical.get(adopted.conflictCopy.key))).toBeTruthy();
  });

  it("recuperação antes de a escrita tardia chegar: B para quando ela chega e guarda os bytes recebidos",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});
    a.closed=true;locksApi.crash();
    use(b);await b.w.requestStateWriter();await wait(80);
    use(b);b.w.adoptAfterUncleanEnd();await wait(5);hydrate(b);
    expect(b.mem.xp).toBe(100);                                   // A ainda não chegou
    expect(save(b,{...b.mem,xp:101})).toBe(true);                 // decisão explícita do aluno
    deliverBytes();                                               // escrita tardia de A
    expect(mode(b)).toBe("conflict");
    const received=[...canonical.entries()].filter(([k])=>k.includes("a25-state-conflict-v1:")).map(([,v])=>JSON.parse(v)).find(x=>x.reason==="foreign_write:received");
    expect(JSON.parse(received.raw).xp,"bytes de A preservados").toBe(150);
  });
});

describe("P1-A · Web Locks: suspensão e troca de separador",()=>{
  it("A escondida sela e liberta; B visível prova e escreve; A ao voltar recarrega (memória antiga)",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});
    a.doc.visibilityState="hidden";use(a);a.doc.dispatchEvent(new Event("visibilitychange"));
    expect(mode(a)).toBe("paused");
    use(b);await b.w.requestStateWriter();
    expect(mode(b)).toBe("verifying");                            // selo ainda em trânsito
    deliverBytes();await wait(5);
    expect(mode(b)).toBe("writer");hydrate(b);expect(b.mem.xp).toBe(150);
    save(b,{...b.mem,xp:160});
    b.doc.visibilityState="hidden";use(b);b.doc.dispatchEvent(new Event("visibilitychange"));
    deliverBytes();
    a.doc.visibilityState="visible";use(a);a.doc.dispatchEvent(new Event("visibilitychange"));await wait(10);
    expect(a.w.stateWriterStatus().reason).toBe("stale_memory");
    expect(a.win.location.reload).toHaveBeenCalled();
    expect(stored().xp).toBe(160);
  });

  it("retoma do próprio mandato: sem outro escritor, continua e começa um mandato novo",async()=>{
    reset(true);
    const a=makeTab("A");await boot(a);hydrate(a);save(a,{...a.mem,xp:120});
    const first=JSON.parse(canonical.get(STATE_KEY))._writer.epoch;
    a.doc.visibilityState="hidden";use(a);a.doc.dispatchEvent(new Event("visibilitychange"));
    a.doc.visibilityState="visible";use(a);a.doc.dispatchEvent(new Event("visibilitychange"));await wait(10);
    expect(mode(a)).toBe("writer");
    expect(save(a,{...a.mem,xp:121})).toBe(true);
    expect(JSON.parse(canonical.get(STATE_KEY))._writer.epoch).not.toBe(first);
  });

  it("escritor bloqueado não responde ao pedido: nada é forçado e B não escreve",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    a.closed=true; // não recebe mensagens (suspenso), mantém o lock
    use(b);const result=await b.w.requestStateWriter();
    expect(result.mode).toBe("observer");expect(result.reason).toBe("no_answer");
    a.closed=false;
    expect(save(a,{...a.mem,xp:130})).toBe(true);
  });
});

describe("P1-A · Web Locks: três abas com propagação lenta",()=>{
  it("só uma escreve; as outras não regridem o estado",async()=>{
    reset(true);
    const a=makeTab("A");await boot(a);hydrate(a);
    const b=makeTab("B"),c=makeTab("C");await boot(b);await boot(c);
    expect([mode(a),mode(b),mode(c)]).toEqual(["writer","observer","observer"]);
    expect(save(b,{...seed,xp:1})).toBe(false);expect(save(c,{...seed,xp:2})).toBe(false);
    saveDurably(a,{...a.mem,xp:170});deliverBytes();
    expect(stored().xp).toBe(170);
  });
});
