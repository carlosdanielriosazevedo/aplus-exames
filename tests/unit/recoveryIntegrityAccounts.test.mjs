// Porta D1–D3 sobre #455: isolamento A/B por conta. Dados sintéticos.
import {afterEach,beforeEach,describe,expect,it,vi} from "vitest";
function storage(){const data=new Map();return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)}}
let local,session;
beforeEach(()=>{vi.resetModules();local=storage();session=storage();vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);vi.stubGlobal("window",{localStorage:local,sessionStorage:session,dispatchEvent(){},setTimeout,clearTimeout});vi.stubGlobal("CustomEvent",class{constructor(t,i){this.type=t;this.detail=i?.detail}});});
afterEach(()=>vi.unstubAllGlobals());
async function as(id){
  vi.resetModules();
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id}})));
  const {openVerifiedAccount}=await import("../../app/lib/cloudAccountSession.js");
  const ws=await import("../../app/lib/accountWorkspace.js");
  ws.selectAccountWorkspace(await openVerifiedAccount());
  return {ws,r:await import("../../app/lib/reliability.js"),i:await import("../../app/lib/stateIntegrity.js")};
}
const REG="a25-completed-sessions-v1";
describe("A/B · recibos e proteções por conta",()=>{
  it("recibos de A não afetam B e vice-versa",async()=>{
    const a=await as("A");
    expect(a.r.reserveSessionCompletion("shared-id").status).toBe("reserved");
    expect(a.r.commitSessionCompletion("shared-id")).toBe(true);
    const keyA=a.ws.accountStorageKey(REG,"A");
    expect(JSON.parse(local.getItem(keyA))[0]).toMatchObject({id:"shared-id",status:"committed"});
    expect(local.getItem(REG)).toBe(null);
    const b=await as("B");
    expect(b.r.reserveSessionCompletion("shared-id").status).toBe("reserved");
    expect(JSON.parse(local.getItem(keyA))[0].status).toBe("committed");
  });
  it("registo corrompido em A bloqueia só A, preserva os bytes e a quarentena fica no espaço de A",async()=>{
    let a=await as("A");
    const keyA=a.ws.accountStorageKey(REG,"A");
    local.setItem(keyA,"{broken");
    expect(a.r.reserveSessionCompletion("x").status).toBe("blocked");
    const b=await as("B");
    expect(b.r.reserveSessionCompletion("x").status).toBe("reserved");
    expect(local.getItem(keyA)).toBe("{broken");
    a=await as("A");
    const repair=a.r.repairCompletionRegistry({},{now:7});
    expect(repair.ok).toBe(true);
    expect(local.getItem(a.ws.accountStorageKey(`${a.r.COMPLETION_QUARANTINE_PREFIX}7`,"A"))).toBe("{broken");
    expect(local.getItem(`${a.r.COMPLETION_QUARANTINE_PREFIX}7`)).toBe(null);
  });
  it("versão futura no espaço de A bloqueia A sem tocar em B",async()=>{
    const a=await as("A");
    const keyA=a.ws.accountStorageKey("a25","A");
    const future=JSON.stringify({xp:1,cloudAccount:{version:1,accountId:"A"},_stateVersion:99});
    local.setItem(keyA,future);
    expect(a.i.guardedLoadLocalStateStatus({},()=>({}),"a25")).toMatchObject({error:true,reason:"state_version_future"});
    expect(a.i.guardedSaveLocalState({xp:2,cloudAccount:{version:1,accountId:"A"}})).toBe(false);
    a.i.guardedClearLocalPilotTelemetry();
    expect(local.getItem(keyA)).toBe(future);
    const b=await as("B");
    expect(b.i.guardedSaveLocalState({xp:5,cloudAccount:{version:1,accountId:"B"}})).toBe(true);
    expect(local.getItem(keyA)).toBe(future);
  });
});
