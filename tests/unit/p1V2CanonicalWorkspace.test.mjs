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
  t.rec=await import("../../app/lib/stateRecovery.js");t.copies=await import("../../app/lib/recoveryCopies.js");t.r=await import("../../app/lib/reliability.js");t.pwm=await import("../../app/lib/portugueseWritingMemory.js");
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
const conflictCopies=()=>copyBodies().map(body=>JSON.parse(body.keys.a25||"null")?.xp);
const seed={schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:ACCOUNT},xp:100,missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:1};

function reset(withLocks){register=makeRegister();canonical=new Map([[LEGACY_STATE_KEY,JSON.stringify(seed)]]);tabs=[];pendingBytes=[];pendingMessages=[];channels=new Set();lagMessages=false;locksApi=withLocks?lockManager():null;}
const later=(fn,ms)=>setTimeout(fn,ms);
const everything=()=>JSON.stringify([...canonical.entries()].filter(([k])=>!k.includes("auth-epoch")&&!k.includes("writer-signal")).sort());
afterEach(()=>{for(const t of tabs){try{use(t);t.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});



const wait=ms=>new Promise(r=>setTimeout(r,ms));
const C=k=>`a25-ws-v2:acct:${ACCOUNT}:${k}`;
const L=k=>`a25-account-v1:${ACCOUNT}:${k}`;
const W=n=>`a25-ws-v2:acct:${ACCOUNT}:~${n}`;
const KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1","applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715","a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
const DRAFT="a25-active-session-v1",REGISTRY="a25-completed-sessions-v1",MEMORY="approva.portuguese-writing-memory.v1";
const setEverywhere=(k,v)=>{canonical.set(k,v);for(const t of tabs)t.local.data.set(k,v);};
const legacyBytes=()=>JSON.stringify(KEYS.map(k=>canonical.get(L(k))??null));
const canonBytes=()=>JSON.stringify(KEYS.map(k=>canonical.get(C(k))??null));
const v2copies=()=>[...canonical.entries()].filter(([k])=>k.startsWith(W("recovery:"))).map(([key,v])=>({key,...JSON.parse(v)}));
async function writerThenObserver(){
  const a=makeTab("A");await boot(a);expect(mode(a)).toBe("writer");hydrate(a);deliverBytes();
  const b=makeTab("B");await boot(b);expect(mode(b)).toBe("observer");return {a,b};
}
// Tenta escrever todas as chaves académicas por todos os caminhos da app.
function tryEveryWrite(t){
  use(t);const out=[];
  out.push(t.i.guardedSaveLocalState({...seed,xp:1}));
  out.push(t.i.saveLocalStateDurably({...seed,xp:2}).ok);
  use(t);out.push(t.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"syn-hold",responses:[]}));
  use(t);try{t.drafts.clearSessionDraft("internal")}catch{}
  use(t);out.push(t.r.reserveSessionCompletion("syn-hold").status==="reserved");
  use(t);out.push(t.pwm.savePortugueseWritingMemory([{attemptId:"syn",criterionId:"c1",status:"weak",at:1}]));
  use(t);try{t.ws.scopedLocalStorage().setItem("applus:fqa-exam-draft:v1:fqa-mini-1","{}");out.push(true)}catch{out.push(false)}
  return out;
}

describe("P1-A v2 · separador de versão anterior (main escreve as chaves legadas)",()=>{
  it("o canónico não muda, o escritor continua, e o progresso da versão antiga é restaurável — e reversível",async()=>{
    reset(true);
    const {a}=await writerThenObserver();
    use(a);expect(a.i.saveLocalStateDurably({...a.mem,xp:150,missionHistory:[{id:"v2-mission"}]}).ok).toBe(true);
    use(a);a.ws.scopedLocalStorage().setItem(REGISTRY,JSON.stringify([{id:"v2-mission",status:"committed",at:1}]));
    deliverBytes();
    const canonBefore=canonBytes();
    // Separador do main: grava o estado inteiro da memória nas chaves legadas.
    const old=makeTab("main-antigo");
    const oldState=JSON.stringify({...seed,xp:90,missionHistory:[{id:"old-mission"}],_stateVersion:31,_savedAt:5});
    inTab(old,()=>{old.local.setItem(L("a25"),oldState);old.local.setItem(L(REGISTRY),JSON.stringify([{id:"old-mission",status:"committed",at:2}]));});
    deliverBytes();await wait(5);
    expect(mode(a),"o escritor não para").toBe("writer");
    expect(canonBytes(),"canónico intacto").toBe(canonBefore);
    const legacyCopy=v2copies().find(c=>c.reason==="legacy_version_write");
    expect(JSON.parse(legacyCopy.keys.a25).xp,"progresso da versão antiga preservado").toBe(90);
    expect(a.w.stateWriterStatus().legacy?.status).toBe("changed");
    const legacyAfter=legacyBytes();
    // Recuperação autorizada pelo aluno, no escritor.
    use(a);const view=a.rec.recoveryCopiesForView(ACCOUNT);
    expect(view.current.xp).toBe(150);
    const entry=view.copies.find(c=>c.id===legacyCopy.key);
    expect(entry.summary.xp).toBe(90);
    use(a);const result=a.rec.restoreRecoveryCopy(entry.id);
    expect(result.ok).toBe(true);
    expect(stored().xp,"restaurado").toBe(90);
    expect(canonical.get(C(REGISTRY)),"recibos restaurados com o estado").toBe(legacyCopy.keys[REGISTRY]);
    expect(mode(a)).toBe("released");expect(a.win.location.reload).toHaveBeenCalled();
    const backup=v2copies().find(c=>c.key===result.backup);
    expect(JSON.parse(backup.keys.a25).xp,"o atual ficou guardado antes de restaurar").toBe(150);
    expect(backup.keys[REGISTRY]).toBe(JSON.stringify([{id:"v2-mission",status:"committed",at:1}]));
    expect(legacyBytes(),"esta versão nunca escreve no legado").toBe(legacyAfter);
    // Reversível: o separador recarregado prova o mandato e restaura a cópia anterior.
    deliverBytes();a.closed=true;
    const a2=makeTab("A-recarregada");await boot(a2);expect(mode(a2)).toBe("writer");
    use(a2);expect(a2.rec.restoreRecoveryCopy(result.backup).ok).toBe(true);
    expect(stored().xp).toBe(150);expect(canonBytes()).toBe(canonBefore);
  });

  it("a importação copia byte a byte as 9 chaves; depois disso o legado nunca é escrito",async()=>{
    reset(true);
    canonical.delete(LEGACY_STATE_KEY);
    const legacy=Object.fromEntries(KEYS.map((k,i)=>[k,k==="a25"?JSON.stringify({...seed,xp:111,_stateVersion:31}):JSON.stringify({synthetic:k,i})]));
    for(const [k,v] of Object.entries(legacy))canonical.set(L(k),v);
    const before=legacyBytes();
    const a=makeTab("A");await boot(a);expect(mode(a)).toBe("writer");
    for(const k of KEYS)expect(canonical.get(C(k)),"importado: "+k).toBe(legacy[k]);
    expect(JSON.parse(canonical.get(W("legacy-import"))).status).toBe("done");
    hydrate(a);expect(a.mem.xp).toBe(111);
    for(let i=0;i<5;i++)save(a,{...a.mem,xp:112+i});
    use(a);a.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"syn",responses:[]});
    expect(legacyBytes()).toBe(before);
    expect(stored().xp).toBe(116);
  });
});

describe("P1-A v2 · importação sem espaço e progresso só no separador",()=>{
  it("sem espaço para importar: só consulta com o progresso legado; nada apagado; com espaço, importa",async()=>{
    reset(true);
    const big=JSON.stringify({...seed,xp:100,notes:"x".repeat(5000),_stateVersion:31});
    canonical.set(LEGACY_STATE_KEY,big);
    const legacyBefore=legacyBytes();
    const a=makeTab("A");a.quotaBig=true;
    const real=a.local.setItem;a.local.setItem=(k,v)=>{if(String(v).length>4000)throw new DOMException("synthetic quota","QuotaExceededError");return real(k,v);};
    await boot(a);
    expect(mode(a)).toBe("readonly");expect(a.w.stateWriterStatus().reason).toBe("legacy_import_failed");
    hydrate(a);expect(a.mem?.xp,"consulta mostra o progresso legado").toBe(100);
    expect(tryEveryWrite(a)).toEqual([false,false,false,false,false,false]);
    expect(legacyBytes(),"legado intacto").toBe(legacyBefore);
    a.local.setItem=real;a.closed=true;use(a);a.w.resetStateWriterForTests();
    const b=makeTab("B");await boot(b);
    expect(mode(b),"com espaço: importa e escreve").toBe("writer");
    expect(canonical.get(STATE_KEY)).toBe(big);
  });
});

describe("P1-A v2 · escrita de outra página sem Web Locks (limpeza de telemetria)",()=>{
  it("sem Web Locks: apps em consulta, página limpa a telemetria — nenhum byte académico muda e o legado fica intacto",async()=>{
    reset(false);
    const withTelemetry=JSON.stringify({...seed,xp:100,pilotAggregates:[{n:1}],betaEvents:[{e:1}],_stateVersion:31,_savedAt:1});
    canonical.set(LEGACY_STATE_KEY,withTelemetry);
    const a=makeTab("A");await boot(a);expect(mode(a)).toBe("readonly");
    const legacyBefore=legacyBytes();
    const page=makeTab("definicoes");
    await inTab(page,async()=>{use(page);vi.resetModules();vi.stubGlobal("navigator",{});
      const accounts=await import("../../app/lib/cloudAccountSession.js");const ws=await import("../../app/lib/accountWorkspace.js");
      const integrity=await import("../../app/lib/stateIntegrity.js");const w=await import("../../app/lib/stateWriter.js");w.setMandateRegisterForTests(register);
      use(page);ws.selectAccountWorkspace(await accounts.openVerifiedAccount());
      use(page);page.result=await integrity.coordinatedClearLocalPilotTelemetry(ACCOUNT);});
    deliverBytes();
    expect(legacyBytes(),"a nova versão nunca escreve o legado").toBe(legacyBefore);
    expect([...canonical.keys()].filter(k=>k.includes(`:acct:${ACCOUNT}:`)&&!k.includes(":~")),"nenhum estado criado em nenhum espaço").toEqual([]);
    use(a);expect(tryEveryWrite(a)).toEqual([false,false,false,false,false,false]);
  });
});

describe("P1-A v2 · registo IndexedDB ausente, divergente ou com falha",()=>{
  it("registo perdido com dados canónicos: retenção imediata; nenhuma chave académica é escrita; recuperação só com cópia",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});deliverBytes();
    a.closed=true;locksApi.crash();register.map.clear();
    use(b);await b.w.requestStateWriter();await wait(5);
    const st=b.w.stateWriterStatus();
    expect(st.mode).toBe("verifying");expect(st.proof).toBe("register_missing");expect(st.reason).toBe("recovery_hold");
    const before=everything();
    expect(tryEveryWrite(b),"todas as escritas recusadas durante a retenção").toEqual([false,false,false,false,false,false]);
    expect(everything(),"nenhum byte alterado").toBe(before);
    use(b);const adopted=b.w.adoptAfterUncleanEnd();await wait(5);
    expect(adopted.conflictCopy?.durable).toBe(true);
    const copy=v2copies().find(c=>c.key===adopted.conflictCopy.key);
    for(const k of KEYS)expect(copy.keys[k]??null,"cópia: "+k).toBe(canonical.get(C(k))??null);
    expect(mode(b)).toBe("writer");hydrate(b);expect(b.mem.xp).toBe(150);
  });

  it("marcador do mandato diferente do registo (divergência IndexedDB/localStorage): retenção, nada escrito",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});
    a.win.dispatchEvent(new Event("pagehide"));a.closed=true;deliverBytes();
    const marker=JSON.parse(canonical.get(W("writer-mandate")));
    setEverywhere(W("writer-mandate"),JSON.stringify({...marker,epoch:"e-forjado"}));
    use(b);await b.w.requestStateWriter();await wait(5);
    expect(b.w.stateWriterStatus().proof).toBe("register_mismatch");
    const before=everything();
    expect(tryEveryWrite(b)).toEqual([false,false,false,false,false,false]);
    expect(everything()).toBe(before);
  });

  it("selo com epoch antiga (A retomou o próprio mandato e terminou de forma abrupta): sem prova",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    a.doc.visibilityState="hidden";use(a);a.doc.dispatchEvent(new Event("visibilitychange")); // selo da epoch 1
    a.doc.visibilityState="visible";use(a);a.doc.dispatchEvent(new Event("visibilitychange"));await wait(80);
    expect(mode(a)).toBe("writer");
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});deliverBytes();
    const seal=JSON.parse(canonical.get(W("writer-seal"))),reg=[...register.map.values()][0];
    expect(seal.epoch,"selo de um mandato anterior do mesmo separador").not.toBe(reg.epoch);
    expect(seal.tab).toBe(reg.tab);
    a.closed=true;locksApi.crash();
    use(b);await b.w.requestStateWriter();await wait(80);
    expect(b.w.stateWriterStatus().mode).toBe("verifying");
    expect(b.w.stateWriterStatus().reason).toBe("recovery_hold");
    const before=everything();
    expect(tryEveryWrite(b)).toEqual([false,false,false,false,false,false]);
    expect(everything()).toBe(before);
  });

  it("falha ao gravar o registo IndexedDB: só consulta; nada importado, nada escrito",async()=>{
    reset(true);
    const base=register;register={map:base.map,read:base.read,write:async()=>{throw new DOMException("synthetic","QuotaExceededError")}};
    const before=everything();
    const a=makeTab("A");await boot(a);
    expect(mode(a)).toBe("readonly");expect(a.w.stateWriterStatus().reason).toBe("register_unavailable");
    hydrate(a);expect(a.mem.xp,"consulta mostra o progresso legado").toBe(100);
    expect(tryEveryWrite(a)).toEqual([false,false,false,false,false,false]);
    expect(everything()).toBe(before);
  });

  it("IndexedDB indisponível na leitura: só consulta, nada escrito",async()=>{
    reset(true);register={map:new Map(),read:async()=>{throw new Error("idb")},write:async()=>{throw new Error("idb")}};
    const before=everything();
    const a=makeTab("A");await boot(a);
    expect(mode(a)).toBe("readonly");
    expect(tryEveryWrite(a)).toEqual([false,false,false,false,false,false]);
    expect(everything()).toBe(before);
  });
});

describe("P1-A v2 · escritas tardias em todas as chaves académicas",()=>{
  for(const [label,key,mine,theirs] of [
    ["rascunho da sessão",DRAFT,JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"syn",responses:[{answer:"B1"}]}),JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"syn",responses:[{answer:"A1"},{answer:"A2"},{answer:"A3"}]})],
    ["recibo D3",REGISTRY,JSON.stringify([{id:"syn",status:"pending",at:3,owner:"tab-b"}]),JSON.stringify([{id:"syn",status:"committed",at:2,owner:"tab-a"}])],
    ["memória de escrita",MEMORY,JSON.stringify([{attemptId:"b",criterionId:"c1",status:"ok",at:3}]),JSON.stringify([{attemptId:"a",criterionId:"c1",status:"weak",at:2}])]
  ])it(`${label}: a escrita tardia de A depois da recuperação para B e os dois conjuntos ficam guardados`,async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.ws.scopedLocalStorage().setItem(key,theirs);   // ainda não chegou a B
    a.closed=true;locksApi.crash();
    use(b);await b.w.requestStateWriter();await wait(80);
    use(b);b.w.adoptAfterUncleanEnd();await wait(5);
    expect(mode(b)).toBe("writer");
    use(b);b.ws.scopedLocalStorage().setItem(key,mine);
    deliverBytes();await wait(5);
    expect(mode(b),"B para").toBe("conflict");
    const copies=v2copies();
    expect(copies.some(c=>c.keys[key]===theirs),"bytes de A guardados").toBe(true);
    expect(copies.some(c=>c.keys[key]===mine),"bytes de B guardados").toBe(true);
    const before=everything();
    expect(tryEveryWrite(b)).toEqual([false,false,false,false,false,false]);
    expect(everything()).toBe(before);
  });

  it("bytes alheios num rascunho sem evento: a escrita é recusada antes de os substituir",async()=>{
    reset(true);
    const {a}=await writerThenObserver();
    const foreign=JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"syn",responses:[{answer:"X"}]});
    for(const t of tabs)t.local.data.set(C(DRAFT),foreign);canonical.set(C(DRAFT),foreign); // sem evento
    use(a);expect(a.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"syn",responses:[]})).toBe(false);
    expect(canonical.get(C(DRAFT))).toBe(foreign);
    expect(mode(a)).toBe("conflict");
  });
});

describe("P1-A v2 · recuperação: guardas e acumulação",()=>{
  it("recuperações repetidas sem alterações reutilizam a mesma cópia",async()=>{
    reset(true);
    let prev=makeTab("A0");await boot(prev);hydrate(prev);save(prev,{...prev.mem,xp:140});deliverBytes();
    for(let i=1;i<=3;i++){
      prev.closed=true;locksApi.crash();
      const t=makeTab("T"+i);await boot(t);await wait(80);
      use(t);expect(t.w.adoptAfterUncleanEnd().conflictCopy?.durable).toBe(true);await wait(5);deliverBytes();
      prev=t;
    }
    expect(v2copies().filter(c=>String(c.reason).startsWith("unclean_end_adoption")).length).toBe(1);
  });

  it("restaurar exige escritor; recusa versão futura; falha a meio repõe tudo",async()=>{
    reset(true);
    const {a,b}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});deliverBytes();
    const ok=JSON.stringify({...seed,xp:77,_stateVersion:31});
    use(a);const good=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic",keys:{a25:ok,[REGISTRY]:"[]"}});
    use(a);const future=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic-future",keys:{a25:JSON.stringify({...seed,_stateVersion:999})}});
    deliverBytes();
    const before=canonBytes();
    use(b);expect(b.rec.restoreRecoveryCopy(good.key).reason).toBe("not_writer");
    use(a);expect(a.rec.restoreRecoveryCopy(future.key).reason).toBe("state_version_future");
    expect(canonBytes()).toBe(before);
    const real=a.local.setItem;a.local.setItem=(k,v)=>{if(k===C(REGISTRY))throw new DOMException("synthetic quota","QuotaExceededError");return real(k,v);};
    use(a);const failed=a.rec.restoreRecoveryCopy(good.key,{reload:false});
    a.local.setItem=real;
    expect(failed.reason).toBe("restore_write_failed");
    expect(canonBytes(),"falha a meio: conjunto anterior reposto").toBe(before);
    expect(mode(a)).toBe("writer");
  });

  it("sem espaço para guardar o atual antes de restaurar: recusa e nada muda",async()=>{
    reset(true);
    const {a}=await writerThenObserver();
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});deliverBytes();
    use(a);const good=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic",keys:{a25:JSON.stringify({...seed,xp:77,_stateVersion:31})}});
    const before=canonBytes();
    expect(stored().xp,"pré-condição: o estado lido é o que a app escreveu").toBe(150);
    const all=everything();
    const real=a.local.setItem;a.local.setItem=(k,v)=>{if(k.includes(":~recovery:"))throw new DOMException("synthetic quota","QuotaExceededError");return real(k,v);};
    use(a);const result=a.rec.restoreRecoveryCopy(good.key,{reload:false});
    a.local.setItem=real;
    expect(result.reason).toBe("no_space_for_backup");
    expect(canonBytes()).toBe(before);
    expect(everything(),"nada muda em nenhuma chave").toBe(all);
  });

  it("cópias da #461 (v1) aparecem, são restauráveis e não podem ser apagadas; v2 só depois de descarregar",async()=>{
    reset(true);
    const {a}=await writerThenObserver();
    const v1=JSON.stringify({format:"aplus-state-conflict-copy-v1",tab:"old",at:5,reason:"unclean_end_adoption",academic:{localStorage:{[L("a25")]:JSON.stringify({...seed,xp:66,_stateVersion:31}),[L(REGISTRY)]:"[]"}}});
    setEverywhere(`a25-account-v1:${ACCOUNT}:a25-state-conflict-v1:old:5:ab`,v1);
    use(a);const view=a.rec.recoveryCopiesForView(ACCOUNT);
    const entry=view.copies.find(c=>c.format==="v1");
    expect(entry.summary.xp).toBe(66);
    use(a);expect(a.rec.deleteRecoveryCopy(entry.id,{exported:true}).reason).toBe("legacy_copy_kept");
    use(a);const v2=a.copies.writeRecoveryCopy({scope:ACCOUNT,reason:"synthetic",keys:{a25:"{}"}});
    use(a);expect(a.rec.deleteRecoveryCopy(v2.key).reason).toBe("export_first");
    use(a);expect(JSON.parse(a.rec.exportRecoveryCopy(v2.key)).keys.a25).toBe("{}");
    use(a);expect(a.rec.deleteRecoveryCopy(v2.key,{exported:true}).ok).toBe(true);
    use(a);expect(a.rec.restoreRecoveryCopy(entry.id,{reload:false}).ok).toBe(true);
    expect(stored().xp).toBe(66);
  });
});
