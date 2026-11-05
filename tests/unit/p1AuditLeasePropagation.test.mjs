// P1-A sem Web Locks (revisão antes da publicação, auditoria #459).
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
function makeTab(name){
  const t={name,win:new EventTarget(),doc:new EventTarget(),session:plain(),closed:false,mem:null};
  t.local=view(t,canonical);t.win.location={reload(){}};t.doc.visibilityState="visible";tabs.push(t);return t;
}
async function boot(t){
  use(t);vi.resetModules();
  vi.stubGlobal("navigator",{});vi.stubGlobal("BroadcastChannel",LaggyChannel);
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:ACCOUNT}})));
  const accounts=await import("../../app/lib/cloudAccountSession.js");
  t.ws=await import("../../app/lib/accountWorkspace.js");
  t.i=await import("../../app/lib/stateIntegrity.js");
  t.w=await import("../../app/lib/stateWriter.js");
  use(t);t.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());
  Object.assign(t.w.STATE_WRITER_TIMING,{claimSettleMs:20,presenceWaitMs:40,heartbeatMs:60_000,noAnswerMs:60});
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

function reset(){canonical=new Map([[STATE_KEY,JSON.stringify(seed)]]);tabs=[];pendingBytes=[];pendingMessages=[];channels=new Set();lagMessages=false;}
afterEach(()=>{for(const t of tabs){try{use(t);t.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});

describe("P1-A sem Web Locks · propagação lenta (bytes e mensagens)",()=>{
  it("dois escritores; A conclui e fecha; B desatualizado grava — o progresso de A fica preservado e é assinalado",async()=>{
    reset();lagMessages=true;
    const a=makeTab("A"),b=makeTab("B");
    await boot(a);await boot(b);
    expect([mode(a),mode(b)],"pré-condição: a exclusão não é garantida sem Web Locks").toEqual(["writer","writer"]);
    hydrate(a);hydrate(b);
    expect(saveDurably(a,{...a.mem,xp:150,missionHistory:[{id:"synthetic-A-mission"}]})).toBe(true);
    a.closed=true;
    expect(save(b,{...b.mem,productAnalytics:{appOpenCount:2}})).toBe(true); // sobrescrita real
    deliverBytes();deliverMessages();
    expect(stored().xp,"o estado guardado foi sobrescrito por B").toBe(100);
    expect(mode(b),"B deteta a escrita de A e para").toBe("conflict");
    // Próxima abertura: a cópia do separador A não corresponde ao estado → preservada e assinalada.
    const c=makeTab("C");await boot(c);
    const preserved=hydrate(c);
    expect(preserved.length).toBeGreaterThan(0);
    expect(conflictCopies(),"progresso de A não pode desaparecer sem cópia").toContain(150);
  });

  it("A continua aberta: ambos param e ambos ficam com cópia",async()=>{
    reset();lagMessages=true;
    const a=makeTab("A"),b=makeTab("B");await boot(a);await boot(b);
    hydrate(a);hydrate(b);
    saveDurably(a,{...a.mem,xp:150});
    save(b,{...b.mem,xp:101});
    deliverBytes();deliverMessages();
    expect([mode(a),mode(b)]).toEqual(["conflict","conflict"]);
    expect(conflictCopies()).toEqual(expect.arrayContaining([150,101]));
  });

  it("mensagens rápidas, bytes lentos: o ping de presença impede o segundo escritor",async()=>{
    reset();lagMessages=false;
    const a=makeTab("A"),b=makeTab("B");await boot(a);await boot(b);
    expect([mode(a),mode(b)]).toEqual(["writer","observer"]);
  });

  it("sequência legítima: A grava e fecha; C abre — sem aviso falso e a cópia de A é removida",async()=>{
    reset();
    const a=makeTab("A");await boot(a);hydrate(a);
    saveDurably(a,{...a.mem,xp:120});
    use(a);a.win.dispatchEvent(new Event("pagehide"));a.closed=true;deliverBytes();
    const c=makeTab("C");await boot(c);
    expect(mode(c)).toBe("writer");
    expect(hydrate(c)).toEqual([]);
    expect([...canonical.keys()].filter(k=>k.includes("tabcopy")&&!k.includes(c.w.stateWriterStatus().tabId))).toEqual([]);
    expect(conflictCopies()).toEqual([]);
    expect(c.mem.xp).toBe(120);
  });

  it("passagem forçada a um escritor suspenso: sem aviso falso; ao retomar, A não grava e guarda cópia",async()=>{
    reset();
    const a=makeTab("A");await boot(a);hydrate(a);saveDurably(a,{...a.mem,xp:130});deliverBytes();
    const b=makeTab("B");await boot(b);expect(mode(b)).toBe("observer");
    a.closed=true; // suspenso: não recebe mensagens nem bytes
    use(b);expect((await b.w.requestStateWriter()).mode).toBe("writer");
    expect(hydrate(b)).toEqual([]);
    save(b,{...b.mem,xp:140});
    a.closed=false;a.mem={...a.mem,xp:135};deliverBytes();
    expect(save(a,{...a.mem,xp:136})).toBe(false);
    expect(mode(a)).toBe("conflict");
    expect(stored().xp).toBe(140);
    expect(conflictCopies()).toContain(135);
  });

  it("fecho abrupto sem pagehide: concessão fica; a aba nova pede, assume e não mostra aviso falso",async()=>{
    reset();
    const a=makeTab("A");await boot(a);hydrate(a);saveDurably(a,{...a.mem,xp:125});
    a.closed=true;deliverBytes();
    const c=makeTab("C");await boot(c);expect(mode(c)).toBe("observer");
    use(c);expect((await c.w.requestStateWriter()).mode).toBe("writer");
    expect(hydrate(c)).toEqual([]);expect(c.mem.xp).toBe(125);
  });

  it("se a cópia do separador não puder ser gravada, o separador deixa de escrever",async()=>{
    reset();
    const a=makeTab("A");await boot(a);hydrate(a);
    a.quotaFull=true;
    expect(save(a,{...a.mem,xp:150})).toBe(false);
    expect(mode(a)).toBe("conflict");
    expect(save(a,{...a.mem,xp:151})).toBe(false);
  });
});
