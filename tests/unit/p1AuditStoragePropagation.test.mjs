// P1-A: propagação assíncrona do localStorage entre processos (Chromium), com e
// sem Web Locks. A prova não é "existe uma cópia": é que o estado guardado
// mantém o progresso concluído, ou que nenhum separador escreve.
// Modelo de localStorage do Chromium: cada processo tem a sua cópia da área e
// as escritas de outros processos chegam mais tarde (propagação assíncrona);
// o valor final é o da última escrita a chegar ao processo do browser.
// Mensagens (BroadcastChannel) podem chegar antes ou depois dos bytes.
// Dados exclusivamente sintéticos.
import {afterEach,describe,expect,it,vi} from "vitest";

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
    use(t);const e=new Event("storage");Object.assign(e,{key:m.k,oldValue:m.old,newValue:m.v});t.win.dispatchEvent(e);
  }
}
class LaggyChannel{
  constructor(name){this.name=name;this.tab=current;this.onmessage=null;channels.add(this);}
  postMessage(data){for(const c of channels)if(c!==this&&!c.tab.closed){
    const deliver=()=>{use(c.tab);c.onmessage?.({data:structuredClone(data)});};
    if(lagMessages)pendingMessages.push(deliver);else setTimeout(deliver,0);
  }}
  close(){channels.delete(this);}
}
let current=null,lagMessages=false;
function deliverMessages(){for(const fn of pendingMessages.splice(0))fn();}
function plain(){const data=new Map();return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}}
function use(t){current=t;vi.stubGlobal("window",t.win);vi.stubGlobal("document",t.doc);vi.stubGlobal("sessionStorage",t.session);vi.stubGlobal("localStorage",t.local);}
let locksApi=null;
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
  t.local=view(t,canonical);t.win.location={reload(){}};t.doc.visibilityState="visible";tabs.push(t);return t;
}
async function boot(t){
  use(t);vi.resetModules();
  vi.stubGlobal("navigator",locksApi?{locks:locksApi}:{});vi.stubGlobal("BroadcastChannel",LaggyChannel);
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:ACCOUNT}})));
  const accounts=await import("../../app/lib/cloudAccountSession.js");
  t.ws=await import("../../app/lib/accountWorkspace.js");
  t.i=await import("../../app/lib/stateIntegrity.js");
  t.w=await import("../../app/lib/stateWriter.js");
  use(t);t.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());
  Object.assign(t.w.STATE_WRITER_TIMING,{reloadWaitMs:30,requestTimeoutMs:600,fenceMessageWaitMs:150,settleStepMs:20,settleStableSteps:2,settleMaxMs:300});
  use(t);await t.w.startStateWriter({scope:ACCOUNT,flush:()=>true,snapshot:()=>t.mem});use(t);
  return t;
}
const mode=t=>t.w.stateWriterStatus().mode;
function hydrate(t){use(t);const loaded=t.i.guardedLoadLocalStateStatus({},()=>({}));t.mem=loaded.state;return t.i.reconcileTabCopiesAtHydration("a25");}
function saveDurably(t,next){use(t);t.mem=next;return t.i.saveLocalStateDurably(next).ok;}
function save(t,next){use(t);t.mem=next;return t.i.guardedSaveLocalState(next);}
const stored=()=>JSON.parse(canonical.get(STATE_KEY));
const conflictCopies=()=>[...canonical.keys()].filter(k=>k.includes("a25-state-conflict-v1:")).map(k=>{
  const body=JSON.parse(canonical.get(k));return body.state?.xp??JSON.parse(body.raw).xp;
});
const seed={schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:ACCOUNT},xp:100,missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:1};

function reset(withLocks){canonical=new Map([[STATE_KEY,JSON.stringify(seed)]]);tabs=[];pendingBytes=[];pendingMessages=[];channels=new Set();lagMessages=false;locksApi=withLocks?lockManager():null;}
const later=(fn,ms)=>setTimeout(fn,ms);
const everything=()=>JSON.stringify([...canonical.entries()].filter(([k])=>!k.includes("auth-epoch")&&!k.includes("writer-signal")).sort());
afterEach(()=>{for(const t of tabs){try{use(t);t.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});


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

describe("P1-A · Web Locks com propagação lenta: barreira de escrita",()=>{
  async function handoff({deliverAfterMs}){
    reset(true);
    const a=makeTab("A");await boot(a);hydrate(a);deliverBytes();
    const b=makeTab("B");await boot(b);
    expect([mode(a),mode(b)]).toEqual(["writer","observer"]);
    const done={...a.mem,xp:150,missionHistory:[{id:"synthetic-A-mission"}]};
    use(a);a.mem=done;expect(a.i.saveLocalStateDurably(done).ok).toBe(true); // ainda não chegou a B
    use(b);const request=b.w.requestStateWriter();
    await new Promise(r=>setTimeout(r,5));deliverMessages();   // A recebe o pedido
    await new Promise(r=>setTimeout(r,5));
    use(a);a.w.completeStateWriterRelease();a.closed=true;      // anuncia o que gravou e liberta
    deliverMessages();                                          // B recebe o anúncio antes dos bytes
    if(deliverAfterMs!==null)later(deliverBytes,deliverAfterMs);
    return {a,b,result:await request};
  }

  it("B obtém o lock antes de os bytes de A chegarem: espera e lê o progresso de A",async()=>{
    const {b,result}=await handoff({deliverAfterMs:60});
    expect(result.mode).toBe("writer");
    hydrate(b);
    expect(b.mem.xp,"B tem de ver a conclusão de A antes de gravar").toBe(150);
    expect(save(b,{...b.mem,productAnalytics:{appOpenCount:2}})).toBe(true);
    expect(stored().xp).toBe(150);
    expect(stored().missionHistory).toEqual([{id:"synthetic-A-mission"}]);
  });

  it("os bytes de A não chegam a tempo: B não escreve e o progresso de A permanece",async()=>{
    const {b,result}=await handoff({deliverAfterMs:null});
    expect(result.mode).toBe("observer");expect(result.reason).toBe("sync_pending");
    use(b);expect(b.i.guardedSaveLocalState({...seed,xp:1})).toBe(false);
    expect(stored().xp).toBe(150); // valor canónico: o de A
    deliverBytes();
    use(b);expect((await b.w.requestStateWriter()).mode).toBe("writer");
    hydrate(b);expect(b.mem.xp).toBe(150);
  });

  it("fecho abrupto de A logo após gravar (sem anúncio): B espera a estabilização",async()=>{
    reset(true);
    const a=makeTab("A");await boot(a);hydrate(a);deliverBytes();
    const b=makeTab("B");await boot(b);
    use(a);a.i.saveLocalStateDurably({...a.mem,xp:150});
    a.closed=true;locksApi.crash();                             // separador terminado
    later(deliverBytes,15);
    use(b);const result=await b.w.requestStateWriter();
    expect(result.mode).toBe("writer");
    hydrate(b);expect(b.mem.xp).toBe(150);
    expect(save(b,{...b.mem,productAnalytics:{appOpenCount:2}})).toBe(true);
    expect(stored().xp).toBe(150);
  });

  it("três abas com propagação lenta: só uma escreve e ninguém regride o estado",async()=>{
    reset(true);
    const a=makeTab("A");await boot(a);hydrate(a);
    const b=makeTab("B"),c=makeTab("C");await boot(b);await boot(c);
    expect([mode(a),mode(b),mode(c)]).toEqual(["writer","observer","observer"]);
    expect(save(b,{...seed,xp:1})).toBe(false);expect(save(c,{...seed,xp:2})).toBe(false);
    saveDurably(a,{...a.mem,xp:170});deliverBytes();
    expect(stored().xp).toBe(170);
  });
});
