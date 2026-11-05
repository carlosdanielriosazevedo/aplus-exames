// P1-A (auditoria independente da #459): perda de progresso entre separadores.
// Cada "separador" tem a sua instância de módulos, o seu sessionStorage e a sua
// janela; o localStorage é partilhado e propaga eventos `storage` como no
// browser. Web Locks e BroadcastChannel são simulados com a semântica do
// browser (fila, ifAvailable, signal, libertação). Dados exclusivamente
// sintéticos. Sem o módulo stateWriter (SHA original) os cenários reproduzem a
// perda; com ele, têm de passar.
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";

const ACCOUNT="synthetic-A";
const STATE_KEY=`a25-account-v1:${ACCOUNT}:a25`;
const DRAFT_KEY=`a25-account-v1:${ACCOUNT}:a25-active-session-v1`;
const REGISTRY_KEY=`a25-account-v1:${ACCOUNT}:a25-completed-sessions-v1`;

let local,tabs,current,channels,lockApi;
function storage({shared=false}={}){
  const data=new Map();
  const notify=(key,oldValue,newValue)=>{
    if(!shared)return;
    for(const tab of tabs)if(tab!==current&&!tab.closed&&!tab.suspended)setTimeout(()=>{
      const event=new Event("storage");Object.assign(event,{key,oldValue,newValue});tab.win.dispatchEvent(event);
    },0);
  };
  return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,
    setItem:(k,v)=>{if(local?.blocked&&shared)throw new DOMException("synthetic","SecurityError");const old=data.get(k)??null;data.set(k,String(v));notify(k,old,String(v));},
    removeItem:k=>{const old=data.get(k)??null;data.delete(k);notify(k,old,null);},clear:()=>data.clear()};
}
function lockManager(){
  const held=new Map(),queues=new Map();
  const queue=name=>queues.get(name)||queues.set(name,[]).get(name);
  function run(name,req){
    held.set(name,req);
    Promise.resolve().then(()=>req.cb({name,mode:"exclusive"})).then(req.resolve,req.reject).finally(()=>{held.delete(name);const next=queue(name).shift();if(next)run(name,next);});
  }
  return {held,request(name,options,cb){return new Promise((resolve,reject)=>{
    const req={cb,resolve,reject};
    if(options.ifAvailable){
      if(held.has(name)||queue(name).length){Promise.resolve().then(()=>cb(null)).then(resolve,reject);return;}
      run(name,req);return;
    }
    if(options.signal){
      if(options.signal.aborted){reject(new DOMException("aborted","AbortError"));return;}
      options.signal.addEventListener("abort",()=>{const q=queue(name),i=q.indexOf(req);if(i>=0){q.splice(i,1);reject(new DOMException("aborted","AbortError"));}});
    }
    if(!held.has(name)&&!queue(name).length){run(name,req);return;}
    queue(name).push(req);
  });}};
}
class FakeChannel{
  constructor(name){this.name=name;this.tab=current;this.onmessage=null;channels.add(this);}
  postMessage(data){for(const c of channels)if(c!==this&&c.name===this.name&&!c.tab.closed&&!c.tab.suspended)setTimeout(()=>c.onmessage?.({data:structuredClone(data)}),0);}
  close(){channels.delete(this);}
}
function use(tab){
  current=tab;
  vi.stubGlobal("window",tab.win);vi.stubGlobal("document",tab.doc);vi.stubGlobal("sessionStorage",tab.session);
}
const settle=(ms=0)=>new Promise(resolve=>setTimeout(resolve,ms));
const fast={reloadWaitMs:60,requestTimeoutMs:400,fenceMessageWaitMs:150,settleStepMs:10,settleStableSteps:2,settleMaxMs:400};

async function openTab(name,{coordinated=true,session=null}={}){
  const tab={name,win:new EventTarget(),doc:new EventTarget(),session:session||storage(),closed:false,suspended:false,mem:null};
  tab.win.location={reload:vi.fn()};tab.win.localStorage=local;tab.win.sessionStorage=tab.session;
  tab.doc.visibilityState="visible";
  tabs.push(tab);use(tab);
  vi.resetModules();
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id:ACCOUNT}})));
  const accounts=await import("../../app/lib/cloudAccountSession.js");
  tab.ws=await import("../../app/lib/accountWorkspace.js");
  tab.i=await import("../../app/lib/stateIntegrity.js");
  tab.drafts=await import("../../app/lib/sessionDraft.js");
  tab.r=await import("../../app/lib/reliability.js");
  tab.w=await import("../../app/lib/stateWriter.js").catch(()=>null);
  use(tab);
  tab.ws.selectAccountWorkspace(await accounts.openVerifiedAccount());
  if(tab.w)Object.assign(tab.w.STATE_WRITER_TIMING,fast);
  if(coordinated&&tab.w){
    use(tab);
    tab.status=await tab.w.startStateWriter({scope:ACCOUNT,flush:()=>{use(tab);return !tab.mem||tab.i.guardedSaveLocalState(tab.mem);},snapshot:()=>tab.mem});
  }
  use(tab);
  return tab;
}
function hydrate(tab){use(tab);const loaded=tab.i.guardedLoadLocalStateStatus({},()=>({}));if(loaded.state)tab.mem=loaded.state;return loaded;}
function save(tab,next){use(tab);tab.mem=next;return tab.i.guardedSaveLocalState(next);}
const stored=()=>JSON.parse(local.getItem(STATE_KEY)||"null");
const mode=tab=>tab.w?tab.w.stateWriterStatus().mode:"absent";
const seed={schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:ACCOUNT},xp:100,missionHistory:[],examHistory:[],profile:{schoolYear:"12.º"},scores:{},diagnosticDone:true};

beforeEach(()=>{
  tabs=[];channels=new Set();local=storage({shared:true});lockApi=lockManager();
  vi.stubGlobal("localStorage",local);
  vi.stubGlobal("navigator",{locks:lockApi});
  vi.stubGlobal("BroadcastChannel",FakeChannel);
});
afterEach(()=>{for(const tab of tabs){try{use(tab);tab.w?.resetStateWriterForTests()}catch{}}vi.unstubAllGlobals();});

async function seedStored(){
  const writer=await openTab("seed",{coordinated:false});
  writer.i.saveLocalStateDurably(seed);
  writer.closed=true;
}

describe("P1-A · cenário auditado: missão concluída em A não pode ser apagada por B desatualizado",()=>{
  it("duas abas carregam o mesmo estado; A conclui; B reativa e tenta gravar",async()=>{
    await seedStored();
    const a=await openTab("A"),b=await openTab("B");
    hydrate(a);hydrate(b);
    b.mem=b.mem||structuredClone(seed); // no SHA original, B também hidratou
    use(a);expect(a.i.saveLocalStateDurably({...a.mem,xp:150,missionHistory:[{id:"synthetic-mission-1",xp:50}]}).ok).toBe(true);
    a.mem={...a.mem,xp:150,missionHistory:[{id:"synthetic-mission-1",xp:50}]};
    await settle(5);
    // B volta a ficar ativo: recordAppOpen sobre o estado antigo e gravação.
    save(b,{...b.mem,productAnalytics:{appOpenCount:2}});
    await settle(5);
    expect(stored().xp,"XP da missão de A").toBe(150);
    expect(stored().missionHistory).toEqual([{id:"synthetic-mission-1",xp:50}]);
    expect(mode(a)).toBe("writer");expect(mode(b)).toBe("observer");
  });
});

describe("P1-A · exclusão, passagem de controlo e recuperação",()=>{
  it("observador não grava estado, rascunho nem registo de conclusões",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    use(a);expect(a.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"synthetic-A",responses:[{id:"q1"}]})).toBe(true);
    const draftBefore=local.getItem(DRAFT_KEY),registryBefore=local.getItem(REGISTRY_KEY),stateBefore=local.getItem(STATE_KEY);
    const b=await openTab("B");
    expect(mode(b)).toBe("observer");
    expect(save(b,{...seed,xp:1})).toBe(false);
    use(b);expect(b.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"synthetic-A",responses:[]})).toBe(false);
    use(b);b.drafts.clearSessionDraft("internal");
    use(b);expect(b.r.reserveSessionCompletion("synthetic-A").status).not.toBe("reserved");
    expect(local.getItem(DRAFT_KEY)).toBe(draftBefore);
    expect(local.getItem(REGISTRY_KEY)).toBe(registryBefore);
    expect(local.getItem(STATE_KEY)).toBe(stateBefore);
  });

  it("passagem cooperativa: A grava o estado atual, liberta e B lê o progresso de A",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    a.mem={...a.mem,xp:180,missionHistory:[{id:"synthetic-mission-2",xp:80}]}; // ainda não gravado
    const b=await openTab("B");expect(mode(b)).toBe("observer");
    use(b);const request=b.w.requestStateWriter();
    await settle(20);
    expect(mode(a)).toBe("releasing");
    use(a);expect(a.i.guardedSaveLocalState({...a.mem,xp:1})).toBe(false); // nada grava durante a passagem
    a.w.completeStateWriterRelease();
    expect(a.win.location.reload).toHaveBeenCalled();
    const result=await request;
    expect(result.mode).toBe("writer");
    hydrate(b);
    expect(b.mem.xp).toBe(180);
    expect(b.mem.missionHistory).toEqual([{id:"synthetic-mission-2",xp:80}]);
    expect(save(b,{...b.mem,xp:181})).toBe(true);
    expect(stored().xp).toBe(181);
  });

  it("três abas: só uma escreve; a que pede passa a escrever; a terceira continua bloqueada",async()=>{
    await seedStored();
    const a=await openTab("A"),b=await openTab("B"),c=await openTab("C");
    hydrate(a);
    expect([mode(a),mode(b),mode(c)]).toEqual(["writer","observer","observer"]);
    use(c);const request=c.w.requestStateWriter();
    await settle(20);use(a);a.w.completeStateWriterRelease();
    expect((await request).mode).toBe("writer");
    expect(mode(b)).toBe("observer");
    expect(save(b,{...seed,xp:2})).toBe(false);
    hydrate(c);expect(save(c,{...c.mem,xp:103})).toBe(true);
    expect(stored().xp).toBe(103);
  });

  it("fecho abrupto do escritor: o browser liberta o lock e o observador continua sem perder nada",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);save(a,{...a.mem,xp:120});
    const b=await openTab("B");expect(mode(b)).toBe("observer");
    use(a);a.closed=true;a.w.resetStateWriterForTests(); // separador terminado: lock libertado sem passagem
    use(b);expect((await b.w.requestStateWriter()).mode).toBe("writer");
    hydrate(b);expect(b.mem.xp).toBe(120);
  });

  it("reload do único separador: volta a ser escritor",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    use(a);a.closed=true;const release=a.w.resetStateWriterForTests;
    setTimeout(release,10); // o documento antigo termina pouco depois do novo pedir
    const reloaded=await openTab("A-reload");
    expect(mode(reloaded)).toBe("writer");
  });

  it("separador duplicado (sessionStorage copiado) é observador e não altera dados",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);save(a,{...a.mem,xp:130});
    const copied=storage();for(const [k,v] of a.session.data)copied.data.set(k,v);
    const dup=await openTab("A-duplicado",{session:copied});
    expect(mode(dup)).toBe("observer");
    expect(save(dup,{...seed,xp:5})).toBe(false);
    expect(stored().xp).toBe(130);
  });

  it("escritor suspenso não responde: o pedido expira e nada é forçado com Web Locks",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    const b=await openTab("B");
    a.suspended=true;
    use(b);const result=await b.w.requestStateWriter();
    expect(result.mode).toBe("observer");expect(result.reason).toBe("no_answer");
    a.suspended=false;
    expect(mode(a)).toBe("writer");
    expect(save(a,{...a.mem,xp:140})).toBe(true);
    expect(stored().xp).toBe(140);
  });

  it("escrita alheia (separador de versão anterior sem coordenação) bloqueia o escritor e preserva a sua cópia",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);a.mem={...a.mem,xp:160};
    const old=await openTab("versao-antiga",{coordinated:false});
    use(old);old.i.guardedSaveLocalState({...seed,xp:90,missionHistory:[{id:"synthetic-old"}]});
    await settle(5);
    expect(mode(a)).toBe("conflict");
    expect(save(a,{...a.mem,xp:161})).toBe(false);
    expect(stored().xp).toBe(90); // nada foi substituído
    const copy=a.w.stateWriterStatus().conflictCopy;
    expect(copy?.durable).toBe(true);
    expect(JSON.parse(local.getItem(copy.key)).state.xp).toBe(160); // e nada se perdeu
  });

  it("bytes alheios sem evento (corrida) também bloqueiam antes de gravar",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    local.data.set(STATE_KEY,JSON.stringify({...seed,xp:77,_stateVersion:31,_savedAt:Date.now()})); // sem evento
    expect(save(a,{...a.mem,xp:170})).toBe(false);
    expect(stored().xp).toBe(77);
    expect(mode(a)).toBe("conflict");
    expect(JSON.parse(local.getItem(a.w.stateWriterStatus().conflictCopy.key)).state.xp).toBe(170);
  });
});

describe("P1-A · sem Web Locks: só leitura, nenhuma gravação académica",()=>{
  beforeEach(()=>vi.stubGlobal("navigator",{}));
  const everything=()=>JSON.stringify([...local.data.entries()].filter(([k])=>!k.includes("auth-epoch")).sort());

  it("duas abas: ambas só leitura; nenhuma grava estado, rascunho ou conclusão; bytes intactos",async()=>{
    await seedStored();
    const a=await openTab("A"),b=await openTab("B");
    expect([mode(a),mode(b)]).toEqual(["readonly","readonly"]);
    expect(a.w.stateWriterStatus().reason).toBe("no_web_locks");
    const before=everything();
    hydrate(a);hydrate(b);
    expect(a.mem.xp).toBe(100); // a consulta lê o progresso
    expect(save(a,{...a.mem,xp:150,missionHistory:[{id:"synthetic-A-mission"}]})).toBe(false);
    use(a);expect(a.i.saveLocalStateDurably({...a.mem,xp:150}).ok).toBe(false);
    expect(save(b,{...b.mem,productAnalytics:{appOpenCount:2}})).toBe(false);
    use(a);expect(a.drafts.saveSessionDraft({kind:"mission",betaMode:"internal",sessionId:"synthetic-ro",responses:[]})).toBe(false);
    use(a);expect(a.r.reserveSessionCompletion("synthetic-ro").status).not.toBe("reserved");
    await settle(5);
    expect(everything(),"nenhum byte alterado").toBe(before);
  });

  it("alterações simultâneas em três abas não alteram nada",async()=>{
    await seedStored();
    const tabsRO=[await openTab("A"),await openTab("B"),await openTab("C")];
    const before=everything();
    tabsRO.forEach(hydrate);
    const results=tabsRO.map((t,i)=>save(t,{...t.mem,xp:200+i}));
    expect(results).toEqual([false,false,false]);
    await settle(5);
    expect(everything()).toBe(before);
    expect(tabsRO.map(mode)).toEqual(["readonly","readonly","readonly"]);
  });

  it("uma única aba também fica só leitura (não há forma fiável de provar que está sozinha)",async()=>{
    await seedStored();
    const a=await openTab("A");
    const before=everything();hydrate(a);
    expect(mode(a)).toBe("readonly");
    expect(save(a,{...a.mem,xp:300})).toBe(false);
    expect(everything()).toBe(before);
  });

  it("Web Locks expostos mas recusados pelo browser: só leitura",async()=>{
    vi.stubGlobal("navigator",{locks:{request:()=>Promise.reject(new DOMException("synthetic","SecurityError"))}});
    await seedStored();
    const a=await openTab("A");
    expect(mode(a)).toBe("readonly");
    expect(a.w.stateWriterStatus().reason).toBe("locks_unavailable");
    expect(save(a,{...seed,xp:5})).toBe(false);
  });

  it("sem localStorage acessível nem Web Locks: cada aba isolada grava só no seu sessionStorage",async()=>{
    const descriptor=Object.getOwnPropertyDescriptor(globalThis,"localStorage");
    const a=await openTab("A");
    use(a);a.w.resetStateWriterForTests();
    Object.defineProperty(globalThis,"localStorage",{configurable:true,get(){throw new DOMException("synthetic","SecurityError")}});
    try{
      use2(a);
      const status=await a.w.startStateWriter({scope:ACCOUNT});
      expect(status.method).toBe("isolated");expect(status.mode).toBe("writer");
      expect(a.i.guardedSaveLocalState({...seed,xp:7})).toBe(true);
      expect(local.getItem(STATE_KEY)).toBe(null); // nada no armazenamento partilhado
      expect(JSON.parse(a.session.getItem(STATE_KEY)).xp).toBe(7);
    }finally{
      if(descriptor)Object.defineProperty(globalThis,"localStorage",descriptor);else delete globalThis.localStorage;
    }
  });
});

// use() sem voltar a definir localStorage (o teste acima torna-o inacessível).
function use2(tab){current=tab;vi.stubGlobal("window",tab.win);vi.stubGlobal("document",tab.doc);vi.stubGlobal("sessionStorage",tab.session);}

describe("P1-A · páginas piloto/definições",()=>{
  it("limpeza da telemetria é adiada para o escritor quando a app está aberta",async()=>{
    await seedStored();
    const a=await openTab("A");hydrate(a);
    const page=await openTab("definicoes",{coordinated:false});
    use(page);
    const before=local.getItem(STATE_KEY);
    const result=await page.i.coordinatedClearLocalPilotTelemetry(ACCOUNT);
    expect(result.deferred).toBe(true);
    expect(local.getItem(STATE_KEY)).toBe(before);
    await settle(5);
    expect(mode(a)).toBe("writer");
    use(a);a.w.resetStateWriterForTests();await settle(5); // libertação do lock é assíncrona
    use(page);expect((await page.i.coordinatedClearLocalPilotTelemetry(ACCOUNT)).ok).toBe(true);
  });
});
