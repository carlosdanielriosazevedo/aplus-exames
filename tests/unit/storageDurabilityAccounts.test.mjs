// Gravação durável com área por conta (F5). Dados sintéticos.
import {afterEach,beforeEach,expect,it,vi} from "vitest";
function storage(){const m=new Map();return {m,rejectLarge:false,get length(){return m.size},key:i=>[...m.keys()][i]??null,getItem:k=>m.has(k)?m.get(k):null,setItem(k,v){if(this.rejectLarge&&String(v).length>200)throw Error("quota");m.set(k,String(v))},removeItem:k=>m.delete(k)}}
let local,session;
beforeEach(()=>{vi.resetModules();local=storage();session=storage();vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);vi.stubGlobal("window",{localStorage:local,sessionStorage:session,dispatchEvent(){},setTimeout,clearTimeout});vi.stubGlobal("CustomEvent",class{constructor(t,i){this.type=t;this.detail=i?.detail}})});
afterEach(()=>vi.unstubAllGlobals());
async function as(id){
  vi.resetModules();
  vi.stubGlobal("fetch",vi.fn(async()=>Response.json({ok:true,user:{id}})));
  const {openVerifiedAccount}=await import("../../app/lib/cloudAccountSession.js");
  const ws=await import("../../app/lib/accountWorkspace.js");
  ws.selectAccountWorkspace(await openVerifiedAccount());
  return {ws,i:await import("../../app/lib/stateIntegrity.js")};
}
const state=(id,extra={})=>({xp:1,betaMode:"internal",cloudAccount:{version:1,accountId:id},pad:"x".repeat(400),...extra});
it("conta A: durável na chave da conta; localStorage cheio → só separador, reposto na chave da conta",async()=>{
  const {ws,i}=await as("A");
  const keyA=ws.accountStorageKey("a25","A");
  expect(i.saveLocalStateDurably(state("A")).ok).toBe(true);
  expect(local.getItem(keyA)).not.toBe(null);
  expect(local.getItem("a25")).toBe(null);
  local.rejectLarge=true;
  const beforeA=local.getItem(keyA),beforeSessionA=session.getItem(keyA);
  expect(i.saveLocalStateDurably(state("A",{completed:true}))).toEqual({ok:false,tier:"tab"});
  expect(local.getItem(keyA)).toBe(beforeA);
  expect(session.getItem(keyA)).toBe(beforeSessionA);
});
it("A e B: gravação durável de B não toca na área de A",async()=>{
  let {ws,i}=await as("A");
  const keyA=ws.accountStorageKey("a25","A");
  expect(i.saveLocalStateDurably(state("A",{xp:7})).ok).toBe(true);
  const rawA=local.getItem(keyA);
  ({ws,i}=await as("B"));
  expect(i.saveLocalStateDurably(state("B",{xp:9})).ok).toBe(true);
  expect(local.getItem(keyA)).toBe(rawA);
  expect(JSON.parse(local.getItem(ws.accountStorageKey("a25","B"))).xp).toBe(9);
  // B não consegue carregar o estado de A
  const loadedB=i.guardedLoadLocalStateStatus({},()=>({}),"a25");
  expect(loadedB.state?.cloudAccount?.accountId).toBe("B");
});
