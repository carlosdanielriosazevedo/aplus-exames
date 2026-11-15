// Durabilidade da gravação: nível real, reposição exata e conclusão do diagnóstico.
// Dados exclusivamente sintéticos.
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";

function storage({rejectLarge=false}={}){
  const map=new Map();
  return {map,rejectLarge,
    getItem:k=>map.has(k)?map.get(k):null,
    setItem(k,v){if(this.rejectLarge&&String(v).length>200)throw Object.assign(Error("quota"),{name:"QuotaExceededError"});map.set(k,String(v))},
    removeItem:k=>map.delete(k)};
}
let local,session,events;
beforeEach(()=>{
  vi.resetModules();
  local=storage();session=storage();events=[];
  vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);
  vi.stubGlobal("window",{localStorage:local,sessionStorage:session,dispatchEvent:e=>events.push(e),setTimeout,clearTimeout});
  vi.stubGlobal("CustomEvent",class{constructor(type,init){this.type=type;this.detail=init?.detail}});
});
afterEach(()=>vi.unstubAllGlobals());
const mod=()=>import("../../app/lib/stateIntegrity.js");
const big=extra=>({xp:10,betaMode:"internal",payload:"x".repeat(400),...extra});

describe("nível real da gravação",()=>{
  it("localStorage disponível: durável",async()=>{
    const i=await mod();
    expect(i.saveLocalStateWithTier(big()).tier).toBe("durable");
    expect(i.saveLocalStateDurably(big({xp:11}))).toEqual({ok:true,tier:"durable"});
    expect(JSON.parse(local.getItem("a25")).xp).toBe(11);
    expect(events.at(-1)).toMatchObject({type:i.STORAGE_TIER_EVENT,detail:{tier:"durable"}});
  });

  it("localStorage cheio: fica só no separador e a cópia antiga continua em localStorage",async()=>{
    const i=await mod();
    expect(i.saveLocalStateWithTier(big({xp:1})).tier).toBe("durable");
    local.rejectLarge=true;
    const r=i.saveLocalStateWithTier(big({xp:2}));
    expect(r).toMatchObject({ok:true,tier:"tab"});
    expect(JSON.parse(session.getItem("a25")).xp).toBe(2);
    // Esta é a cópia que reaparece quando o separador é fechado.
    expect(JSON.parse(local.getItem("a25")).xp).toBe(1);
    expect(events.at(-1).detail.tier).toBe("tab");
  });

  it("localStorage e sessionStorage cheios: só memória",async()=>{
    const i=await mod();
    local.rejectLarge=true;session.rejectLarge=true;
    expect(i.saveLocalStateWithTier(big()).tier).toBe("memory");
  });
});

describe("gravação durável exigida para concluir",()=>{
  for(const [label,setup,tier] of [
    ["só separador",()=>{local.rejectLarge=true},"tab"],
    ["só memória",()=>{local.rejectLarge=true;session.rejectLarge=true},"memory"]
  ])it(`${label}: falha e repõe exatamente o estado anterior`,async()=>{
    const i=await mod();
    expect(i.saveLocalStateDurably(big({xp:1})).ok).toBe(true);
    setup();
    // progresso intermédio já gravado num nível não durável
    i.saveLocalStateWithTier(big({xp:2,stage:"in-progress"}));
    const beforeLocal=local.getItem("a25"),beforeSession=session.getItem("a25");
    const r=i.saveLocalStateDurably(big({xp:3,completed:true}));
    expect(r).toEqual({ok:false,tier});
    expect(local.getItem("a25")).toBe(beforeLocal);
    expect(session.getItem("a25")).toBe(beforeSession);
    // nenhum nível ficou com a conclusão
    for(const raw of [local.getItem("a25"),session.getItem("a25")])if(raw)expect(JSON.parse(raw).completed).toBeUndefined();
    const loaded=i.guardedLoadLocalStateStatus({},()=>({}),"a25");
    expect(loaded.state.completed).toBeUndefined();
  });

  it("depois de libertar espaço, a gravação durável passa",async()=>{
    const i=await mod();
    local.rejectLarge=true;
    expect(i.saveLocalStateDurably(big({completed:true})).ok).toBe(false);
    local.rejectLarge=false;
    expect(i.saveLocalStateDurably(big({completed:true})).ok).toBe(true);
    expect(JSON.parse(local.getItem("a25")).completed).toBe(true);
  });

  it("a proteção D2 continua a prevalecer",async()=>{
    const i=await mod();
    const future=JSON.stringify({xp:1,_stateVersion:99});
    local.setItem("a25",future);
    expect(i.saveLocalStateDurably(big())).toEqual({ok:false,tier:"failed"});
    expect(local.getItem("a25")).toBe(future);
  });

  it("razões apresentadas ao aluno",async()=>{
    const i=await mod();
    expect(i.durabilityFailureReason("tab")).toBe("state_tab_only");
    expect(i.durabilityFailureReason("memory")).toBe("state_memory_only");
    expect(i.durabilityFailureReason("failed")).toBe("state_write_failed");
  });
});

describe("diagnóstico: conclusão só com gravação final durável",()=>{
  async function terminal(){
    const {DIAGNOSTIC_BLUEPRINT}=await import("../../app/data/content.js");
    const {emptyScores,diagnosticAnchor}=await import("../../app/lib/engine.js");
    const dr=await import("../../app/lib/diagnosticRecovery.js");
    const NOW=Date.now(),id="synthetic-diag-durable";
    let state={goal:17,profile:{schoolYear:"Já terminei o secundário",recentGrade:"",syllabus:"most",examTiming:"thisYear",taughtSubtopicIds:[]},
      betaMode:"internal",editorialOverrides:{},scores:emptyScores(),diagnosticAnswers:0,diagnosticDone:false,
      betaSessions:[{id,kind:"diagnostic",startedAt:NOW-1000,finishedAt:null,meta:{}}],betaEvents:[],
      productAnalytics:{version:1,firstSeenAt:null,firstSeenDay:null,lastSeenAt:null,activeDays:[],appOpenCount:0,milestones:{},events:[]}};
    let draft=dr.createDiagnosticDraft({session:state.betaSessions[0],item:diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],2,state),difficulty:2,now:NOW});
    for(let i=0;i<5;i++){
      const r=dr.transactDiagnosticAnswer({state,draft,sel:draft.current.a,saveDraft:()=>true,saveState:()=>true,now:NOW});
      expect(r.ok).toBe(true);state=r.state;draft=r.draft;
    }
    expect(draft.phase).toBe("completion_pending");
    const completeState=(s,d)=>{
      const sessions=s.betaSessions.map(x=>x.id===d.sessionId?{...x,finishedAt:NOW}:x);
      return {ok:true,state:{...s,diagnosticDone:true,betaSessions:sessions}};
    };
    return {dr,state,draft,completeState,NOW};
  }

  it("gravação final não durável: não conclui e conserva o rascunho",async()=>{
    const {dr,state,draft,completeState,NOW}=await terminal();
    let cleared=0;
    const result=dr.recoverDiagnosticTransaction({state,draft,saveState:()=>true,saveFinalState:()=>false,saveDraft:()=>true,
      clearDraft:()=>{cleared++},startState:s=>({ok:true,state:s}),completeState,now:NOW});
    expect(result).toMatchObject({ok:false,reason:"completion_state_write_failed"});
    expect(result.draft.phase).toBe("completion_pending");
    expect(cleared).toBe(0);
  });

  it("gravação final durável: conclui e só então apaga o rascunho",async()=>{
    const {dr,state,draft,completeState,NOW}=await terminal();
    const order=[];
    const result=dr.recoverDiagnosticTransaction({state,draft,saveState:()=>true,saveFinalState:s=>{order.push(s.diagnosticDone?"final-save":"save");return true},saveDraft:()=>true,
      clearDraft:()=>{order.push("clear")},startState:s=>({ok:true,state:s}),completeState,now:NOW});
    expect(result).toMatchObject({ok:true,completed:true});
    expect(order).toEqual(["final-save","clear"]);
  });

  it("sem saveFinalState, mantém o comportamento anterior (saveState)",async()=>{
    const {dr,state,draft,completeState,NOW}=await terminal();
    let saves=0;
    const result=dr.recoverDiagnosticTransaction({state,draft,saveState:()=>{saves++;return true},saveDraft:()=>true,
      clearDraft:()=>{},startState:s=>({ok:true,state:s}),completeState,now:NOW});
    expect(result.ok).toBe(true);expect(saves).toBeGreaterThan(0);
  });
});
