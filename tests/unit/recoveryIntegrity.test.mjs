// D1–D3: integridade da recuperação. Dados exclusivamente sintéticos.
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";

const REGISTRY="a25-completed-sessions-v1";

function memoryStorage(){
  const map=new Map();
  return {map,getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};
}

let local,session;
beforeEach(()=>{
  vi.resetModules();
  local=memoryStorage();session=memoryStorage();
  vi.stubGlobal("localStorage",local);
  vi.stubGlobal("sessionStorage",session);
  vi.stubGlobal("window",{localStorage:local,sessionStorage:session,dispatchEvent(){},setTimeout,clearTimeout});
  vi.stubGlobal("CustomEvent",class{constructor(type,init){this.type=type;this.detail=init?.detail}});
});
afterEach(()=>vi.unstubAllGlobals());

const reliability=()=>import("../../app/lib/reliability.js");
const integrity=()=>import("../../app/lib/stateIntegrity.js");

describe("D1 · registo de conclusões ilegível",()=>{
  for(const raw of ['{"truncated',"null","{}",'[{"id":""}]','[{"id":"a","status":"weird"}]',"",'[1,2]'])it(`preserva bytes e bloqueia: ${JSON.stringify(raw)}`,async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,raw);
    expect(r.reserveSessionCompletion("synthetic-a")).toEqual({status:"blocked",reason:"registry_corrupt"});
    expect(r.claimSessionCompletion("synthetic-a")).toBe(false);
    r.releaseSessionCompletion("synthetic-a");
    expect(r.commitSessionCompletion("synthetic-a")).toBe(false);
    expect(r.abandonSessionReservation("synthetic-a")).toBe(false);
    expect(r.wasSessionCompleted("synthetic-a")).toBe(false);
    expect(local.getItem(REGISTRY)).toBe(raw);
    expect(r.completionRegistryStatus()).toEqual({ok:false,reason:"registry_corrupt"});
    expect(r.lastCompletionBlockReason()?.reason).toBe("registry_corrupt");
  });

  it("registo válido (formato antigo e novo) funciona normalmente",async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,JSON.stringify([{id:"old",at:1},{id:"new",at:2,status:"committed"}]));
    expect(r.wasSessionCompleted("old")).toBe(true);
    expect(r.reserveSessionCompletion("new").status).toBe("already_completed");
    expect(r.reserveSessionCompletion("fresh").status).toBe("reserved");
    expect(r.commitSessionCompletion("fresh")).toBe(true);
    expect(r.reserveSessionCompletion("fresh").status).toBe("already_completed");
  });

  it("armazenamento indisponível bloqueia em vez de conceder",async()=>{
    const r=await reliability();
    vi.stubGlobal("localStorage",{getItem(){throw Error("denied")},setItem(){throw Error("denied")},removeItem(){}});
    expect(r.reserveSessionCompletion("x").status).toBe("blocked");
    expect(r.claimSessionCompletion("x")).toBe(false);
  });

  it("reparação explícita: cópia exata em quarentena e reconstrução só com conclusões comprovadas",async()=>{
    const r=await reliability();
    const raw='[{"id":"lost-1"},{"id":';
    local.setItem(REGISTRY,raw);
    const state={missionHistory:[{completionId:"mission-1"}],examHistory:[{completionId:"exam-1"}],
      engagement:{days:{"2026-11-01":{activityIds:["training-1"]}}}};
    const result=r.repairCompletionRegistry(state,{now:1234});
    expect(result).toMatchObject({ok:true,repaired:true,quarantineKey:`${r.COMPLETION_QUARANTINE_PREFIX}1234`,rebuilt:3});
    expect(local.getItem(`${r.COMPLETION_QUARANTINE_PREFIX}1234`)).toBe(raw);
    for(const id of ["mission-1","exam-1","training-1"])expect(r.reserveSessionCompletion(id).status).toBe("already_completed");
    expect(r.reserveSessionCompletion("new-after-repair").status).toBe("reserved");
  });

  it("a reparação não apaga nada se a quarentena falhar",async()=>{
    const r=await reliability();
    const raw="{broken";
    const map=new Map([[REGISTRY,raw]]);
    vi.stubGlobal("localStorage",{getItem:k=>map.get(k)??null,setItem:(k,v)=>{if(k!==REGISTRY)throw Error("quota");map.set(k,v)},removeItem:k=>map.delete(k)});
    expect(r.repairCompletionRegistry({}).ok).toBe(false);
    expect(r.clearCompletionRegistry()).toBe(false);
    expect(map.get(REGISTRY)).toBe(raw);
  });

  it("reinício total guarda cópia do registo ilegível antes de o remover",async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,"{broken");
    expect(r.clearCompletionRegistry()).toBe(true);
    const quarantined=[...local.map.entries()].filter(([k])=>k.startsWith(r.COMPLETION_QUARANTINE_PREFIX));
    expect(quarantined).toHaveLength(1);
    expect(quarantined[0][1]).toBe("{broken");
  });
});

describe("D3 · protocolo de duas fases",()=>{
  const state=(ids=[])=>({examHistory:ids.map(id=>({completionId:id}))});

  it("interrupção antes da reserva: conclusão normal, uma única vez",async()=>{
    const r=await reliability();
    expect(r.reserveSessionCompletion("s1",{isRecorded:()=>false}).status).toBe("reserved");
    expect(r.commitSessionCompletion("s1")).toBe(true);
    expect(r.reserveSessionCompletion("s1").status).toBe("already_completed");
  });

  it("interrupção depois da reserva e antes de gravar: retoma imediata no mesmo separador",async()=>{
    let r=await reliability();
    expect(r.reserveSessionCompletion("s2",{now:1000}).status).toBe("reserved");
    // reload do mesmo separador: sessionStorage conserva o dono
    vi.resetModules();r=await reliability();
    expect(r.reserveSessionCompletion("s2",{isRecorded:()=>false,now:1001}))
      .toEqual({status:"reserved",reason:"own_pending"});
  });

  it("interrupção depois da reserva: outro separador espera o prazo e depois retoma",async()=>{
    let r=await reliability();
    expect(r.reserveSessionCompletion("s2b",{now:1000}).status).toBe("reserved");
    // separador diferente (sessionStorage próprio)
    session.map.clear();vi.resetModules();r=await reliability();
    expect(r.reserveSessionCompletion("s2b",{isRecorded:()=>false,now:1001}).status).toBe("blocked");
    expect(r.reserveSessionCompletion("s2b",{isRecorded:()=>false,now:1000+r.COMPLETION_PENDING_LEASE_MS+1}))
      .toEqual({status:"reserved",reason:"stale_pending"});
  });

  it("interrupção depois de gravar a avaliação e antes do commit: nunca reaplica",async()=>{
    let r=await reliability();
    r.reserveSessionCompletion("s3",{now:1000});
    vi.resetModules();r=await reliability();
    const s=state(["s3"]);
    expect(r.reserveSessionCompletion("s3",{isRecorded:()=>r.stateRecordsCompletion(s,"s3"),now:1001}))
      .toEqual({status:"already_completed",reason:"recorded_in_state"});
    expect(JSON.parse(local.getItem(REGISTRY))[0].status).toBe("committed");
  });

  it("interrupção depois do commit: concluída, sem reaplicar",async()=>{
    let r=await reliability();
    r.reserveSessionCompletion("s4");r.commitSessionCompletion("s4");
    vi.resetModules();r=await reliability();
    expect(r.reserveSessionCompletion("s4",{isRecorded:()=>false}).status).toBe("already_completed");
  });

  it("recibo antigo sem avaliação gravada (crash no código anterior) é recuperável",async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,JSON.stringify([{id:"legacy",at:5}]));
    expect(r.reserveSessionCompletion("legacy",{isRecorded:()=>false})).toEqual({status:"reserved",reason:"legacy_unrecorded_receipt"});
  });

  it("recibo antigo com avaliação gravada continua concluído",async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,JSON.stringify([{id:"legacy",at:5}]));
    expect(r.reserveSessionCompletion("legacy",{isRecorded:()=>true}).status).toBe("already_completed");
  });

  it("duas abas: reserva viva de outro separador bloqueia sem apagar nada",async()=>{
    const r=await reliability();
    const raw=JSON.stringify([{id:"s5",at:10_000,status:"pending",owner:"tab-other"}]);
    local.setItem(REGISTRY,raw);
    expect(r.reserveSessionCompletion("s5",{isRecorded:()=>false,now:10_500})).toEqual({status:"blocked",reason:"completion_in_progress"});
    expect(local.getItem(REGISTRY)).toBe(raw);
    expect(r.abandonSessionReservation("s5")).toBe(false);
  });

  it("duas abas: se a outra já gravou a avaliação, esta não reaplica",async()=>{
    const r=await reliability();
    local.setItem(REGISTRY,JSON.stringify([{id:"s6",at:10_000,status:"pending",owner:"tab-other"}]));
    expect(r.reserveSessionCompletion("s6",{isRecorded:()=>true,now:10_100}).status).toBe("already_completed");
  });

  it("escrita concorrente entre leitura e escrita é detetada",async()=>{
    const r=await reliability();
    let reads=0;
    const map=new Map();
    vi.stubGlobal("localStorage",{getItem:k=>{reads++;if(reads===2)map.set(REGISTRY,'[{"id":"intruder","at":1}]');return map.get(k)??null},setItem:(k,v)=>map.set(k,v),removeItem:k=>map.delete(k)});
    expect(r.reserveSessionCompletion("s7")).toEqual({status:"blocked",reason:"registry_conflict"});
    expect(map.get(REGISTRY)).toBe('[{"id":"intruder","at":1}]');
  });

  it("perda do registo com avaliação gravada: comprovado pelo estado, sem duplicar",async()=>{
    const r=await reliability();
    expect(local.getItem(REGISTRY)).toBe(null);
    expect(r.reserveSessionCompletion("s8",{isRecorded:()=>r.stateRecordsCompletion(state(["s8"]),"s8")}).status).toBe("already_completed");
  });

  it("falha ao gravar a avaliação: a reserva é desfeita e a retoma continua possível",async()=>{
    const r=await reliability();
    expect(r.reserveSessionCompletion("s9").status).toBe("reserved");
    expect(r.abandonSessionReservation("s9")).toBe(true);
    expect(r.reserveSessionCompletion("s9").status).toBe("reserved");
  });

  it("falha ao gravar o recibo nunca é tratada como já concluída",async()=>{
    const r=await reliability();
    vi.stubGlobal("localStorage",{getItem:()=>null,setItem(){throw Error("quota")},removeItem(){}});
    expect(r.reserveSessionCompletion("s10")).toEqual({status:"blocked",reason:"registry_write_failed"});
  });

  it("provas de conclusão cobrem missão, mini-exame, treino e disciplinas",async()=>{
    const r=await reliability();
    const s={missionHistory:[{completionId:"m"}],examHistory:[{completionId:"e"}],lastExam:{completionId:"le"},
      subjectProgress:{portuguese:{completedSessionIds:["pt"],sessions:[{sessionId:"pt2"}]}},
      engagement:{days:{d:{activityIds:["t"]}}},competition:{weeks:{w:{activityIds:["c"]}}}};
    for(const id of ["m","e","le","pt","pt2","t","c"])expect(r.stateRecordsCompletion(s,id)).toBe(true);
    expect(r.stateRecordsCompletion(s,"missing")).toBe(false);
    expect(r.stateRecordsCompletion(s,"")).toBe(false);
  });
});

describe("D2 · versões futuras e estado ilegível",()=>{
  const initial={xp:0,scores:{}};
  const empty=()=>({});

  for(const [label,raw,reason] of [
    ["versão futura",JSON.stringify({xp:999,futureOnly:{x:1},_stateVersion:99,_savedAt:1}),"state_version_future"],
    ["versão inválida",JSON.stringify({xp:5,_stateVersion:"31"}),"state_version_invalid"],
    ["JSON ilegível","{\"xp\":12,","state_unreadable"],
    ["não objeto","[1,2,3]","state_unreadable"]
  ])it(`${label}: não carrega, não grava, não apaga`,async()=>{
    const i=await integrity();
    local.setItem("a25",raw);
    const loaded=i.guardedLoadLocalStateStatus(initial,empty,"a25");
    expect(loaded).toMatchObject({state:null,found:true,error:true,reason});
    expect(i.guardedSaveLocalState({xp:1,betaMode:"internal"})).toBe(false);
    expect(local.getItem("a25")).toBe(raw);
    expect(i.lastStateIntegrityBlock()?.reason).toBe(reason);
  });

  it("versão atual e antiga carregam e gravam normalmente",async()=>{
    const i=await integrity();
    const {APP_STATE_VERSION}=await import("../../app/lib/persistence.js");
    for(const version of [undefined,29,APP_STATE_VERSION]){
      local.map.clear();session.map.clear();i.resetStateIntegrityCache();
      local.setItem("a25",JSON.stringify({xp:7,_stateVersion:version}));
      const loaded=i.guardedLoadLocalStateStatus(initial,empty,"a25");
      expect(loaded.error).toBe(false);
      expect(loaded.state.xp).toBe(7);
      expect(i.guardedSaveLocalState({...loaded.state,xp:8})).toBe(true);
      expect(JSON.parse(local.getItem("a25"))).toMatchObject({xp:8,_stateVersion:APP_STATE_VERSION});
    }
  });

  it("outro separador grava versão futura depois do arranque: gravação recusada",async()=>{
    const i=await integrity();
    local.setItem("a25",JSON.stringify({xp:1,_stateVersion:31}));
    expect(i.guardedLoadLocalStateStatus(initial,empty,"a25").error).toBe(false);
    expect(i.guardedSaveLocalState({xp:2})).toBe(true);
    const future=JSON.stringify({xp:50,_stateVersion:40,_savedAt:9});
    local.setItem("a25",future);
    expect(i.guardedSaveLocalState({xp:3})).toBe(false);
    expect(local.getItem("a25")).toBe(future);
  });

  it("limpeza de telemetria não toca em estado futuro e limpa o estado íntegro",async()=>{
    const i=await integrity();
    const future=JSON.stringify({xp:1,pilotAggregates:[{date:"x"}],_stateVersion:77});
    local.setItem("a25",future);
    local.setItem("a25-friends-beta",JSON.stringify({xp:2,betaMode:"friends_beta",pilotAggregates:[{date:"y"}],pilotItemResults:[1],_stateVersion:31}));
    const result=i.guardedClearLocalPilotTelemetry();
    expect(result.ok).toBe(false);
    expect(result.skipped).toEqual([{key:"a25",reason:"state_version_future"}]);
    expect(local.getItem("a25")).toBe(future);
    const friends=JSON.parse(local.getItem("a25-friends-beta"));
    expect(friends.pilotAggregates).toBeUndefined();
    expect(friends.pilotItemResults).toBeUndefined();
    expect(friends.xp).toBe(2);
  });

  it("limpeza de telemetria com estados íntegros mantém o comportamento original",async()=>{
    const i=await integrity();
    local.setItem("a25",JSON.stringify({xp:1,pilotAggregates:[{date:"x"}],_stateVersion:31}));
    expect(i.guardedClearLocalPilotTelemetry()).toEqual({ok:true,skipped:[]});
    expect(JSON.parse(local.getItem("a25")).pilotAggregates).toBeUndefined();
  });

  it("estado ilegível não é apagado pelo carregador (o carregador original apaga-o)",async()=>{
    const i=await integrity();
    const p=await import("../../app/lib/persistence.js");
    local.setItem("a25","{broken");
    i.guardedLoadLocalStateStatus(initial,empty,"a25");
    expect(local.getItem("a25")).toBe("{broken");
    // Controlo: o carregador original, chamado diretamente, remove os bytes.
    p.loadLocalStateStatus(initial,empty,"a25");
    expect(local.getItem("a25")).toBe(null);
  });
});
