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

describe("P1-A v2 · restauro interrompido depois de cada uma das 9 escritas",()=>{
  for(let n=1;n<=9;n++){
    for(const fault of ["quota","error"])it(`${fault} depois da escrita ${n}: o separador repõe ou para; nunca fica misto`,async()=>{
      const ctx=await prepare();const {a,copyId}=ctx;
      const f=inject(a,n,fault);
      use(a);const result=a.rec.restoreRecoveryCopy(copyId,{reload:false});
      f.restore();
      if(n<9){expect(result.ok).toBe(false);expect(["restore_write_failed","restore_incomplete"]).toContain(result.reason);}
      deliverBytes();
      let final=setNow();
      if(result.reason==="restore_incomplete"||(result.ok&&canonical.has(W("restore-journal")))){
        a.closed=true;use(a);a.w.resetStateWriterForTests();
        const b=await reopen("B");expect(mode(b)).toBe("writer");final=setNow();
        expect(canonical.has(W("restore-journal")),"diário resolvido").toBe(false);
      }
      const side=expectConsistent(final,ctx,`${fault}@${n}`);
      if(n<9)expect(side,"falha pontual: conjunto anterior reposto").toBe("before");else expect(side).toBe("target");
    });
    for(const fault of ["crash","reload"])it(`${fault==="crash"?"fecho abrupto":"reload"} depois da escrita ${n}: a próxima abertura conclui o restauro antes de hidratar`,async()=>{
      const ctx=await prepare();const {a,copyId,target}=ctx;
      inject(a,n,fault);
      use(a);try{a.rec.restoreRecoveryCopy(copyId,{reload:false})}catch{}
      if(fault==="reload"){use(a);a.win.dispatchEvent(new Event("pagehide"));} // selo não chega: armazenamento "morto"
      deliverBytes();a.closed=true;locksApi.crash();
      expect(canonical.has(W("restore-journal")),"diário gravado antes da 1.ª escrita").toBe(true);
      const b=await reopen(fault==="reload"?"A-recarregada":"B",{session:fault==="reload"?a.session:null});
      expect(mode(b)).toBe("writer");
      expect(canonical.has(W("restore-journal"))).toBe(false);
      expect(expectConsistent(setNow(),ctx,`${fault}@${n}`)).toBe("target");
      hydrate(b);expect(b.mem.xp,"estado hidratado = conjunto restaurado").toBe(JSON.parse(target.a25).xp);
      expect(b.w.stateWriterStatus().restore?.status).toMatch(/^completed/);
    });
  }
  it("quota persistente: nem completar nem repor é possível → só consulta, nada escrito; com espaço, resolve",async()=>{
    const ctx=await prepare();const {a,copyId}=ctx;
    const f=inject(a,4,"quota-persistent");
    use(a);const result=a.rec.restoreRecoveryCopy(copyId,{reload:false});
    expect(result.reason).toBe("restore_incomplete");expect(mode(a)).toBe("released");
    deliverBytes();a.closed=true;
    const mixed=setNow();
    expect(same(mixed,ctx.before)||same(mixed,ctx.target),"enquanto bloqueado, o conjunto está misto").toBe(false);
    // Próxima abertura ainda sem espaço para escrever no espaço canónico.
    const b=makeTab("B");const bf=inject(b,0,"quota-persistent");
    await boot(b);await wait(10);
    expect(mode(b)).toBe("readonly");expect(b.w.stateWriterStatus().reason).toBe("restore_incomplete");
    expect(tryEveryWrite(b)).toEqual([false,false,false,false]);
    expect(setNow()).toEqual(mixed);
    bf.restore();b.closed=true;use(b);b.w.resetStateWriterForTests();
    const c=makeTab("C");await boot(c);await wait(10);
    expect(mode(c)).toBe("writer");
    expect(expectConsistent(setNow(),ctx,"quota persistente")).toBe("target");
  });
});
