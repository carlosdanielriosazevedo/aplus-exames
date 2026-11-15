import {beforeEach,afterEach,it,expect,vi} from "vitest";
function storage(){const data=new Map();return {data,get length(){return data.size},key:i=>[...data.keys()][i]??null,getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};}
let local,session,subject,offline,accounts,workspace,recovery,access,clicks,network;
const state=(owner="A")=>({cloudAccount:{version:1,accountId:owner},schema:"aplus-student-state-v8",xp:123,profile:{schoolYear:"12.º"},scores:{},missionHistory:{},examHistory:[{id:"synthetic-exam",score20:14,answers:["synthetic answer"]}],subjectProgress:{portuguese:{lastPosition:{sessionId:"unfinished",currentAnswer:"synthetic pending"}}}});
beforeEach(async()=>{
 vi.resetModules();local=storage();session=storage();subject="A";offline=false;clicks=0;
 vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);
 vi.stubGlobal("window",{localStorage:local,sessionStorage:session,addEventListener:()=>{},dispatchEvent:()=>{}});
 vi.stubGlobal("document",{createElement:()=>({click:()=>{clicks++;}})});
 network=vi.fn(async(url,options={})=>{
  if(offline)throw Error("synthetic network unavailable");
  const expected=new Headers(options.headers).get("x-approva-account");
  if(expected&&decodeURIComponent(expected)!==subject)return Response.json({ok:false},{status:403});
  if(url==="/api/auth/session")return subject?Response.json({ok:true,user:{id:subject}}):Response.json({ok:false},{status:401});
  if(url.startsWith("/api/cloud/state?"))return Response.json({format:"aplus-cloud-recovery-v1",accountId:subject,digest:"a".repeat(64),revision:1,data:{revision:1,state_json:state(subject)}});
  throw Error("Unexpected synthetic transport");
 });vi.stubGlobal("fetch",network);
 accounts=await import("../../app/lib/cloudAccountSession.js");workspace=await import("../../app/lib/accountWorkspace.js");recovery=await import("../../app/lib/cloudRecovery.js");access=await import("../../app/lib/recoveryAccess.js");
});
afterEach(()=>{vi.unstubAllGlobals();vi.restoreAllMocks();});
async function own(){const proof=await accounts.openVerifiedAccount();workspace.selectAccountWorkspace(proof);local.setItem(workspace.accountStorageKey("a25"),JSON.stringify(state(subject)));return proof;}
it("requires a real server proof, not an accountId or a serialized capability",async()=>{
 await own();const capability=await access.beginRecoveryAccess();
 expect(()=>access.assertRecoveryAccess(capability)).not.toThrow();
 for(const forged of [{},{accountId:"A"},{subject:"A"},JSON.parse(JSON.stringify(capability))])expect(()=>access.assertRecoveryAccess(forged)).toThrow();
 await expect(access.beginRecoveryAccess({expected:"B"})).rejects.toBeDefined();
});
it("authorizes before any academic storage read even after a silent cookie change",async()=>{
 await own();subject="B";const read=vi.spyOn(local,"getItem");
 await expect(recovery.readLocalRecoveryOriginals()).rejects.toBeDefined();
 await expect(recovery.listCloudOriginals()).rejects.toBeDefined();
 expect(read.mock.calls.filter(([key])=>key.startsWith("a25-account-v1:A:"))).toHaveLength(0);expect(clicks).toBe(0);
});
it("does not read or adopt global legacy data when no verified workspace was selected",async()=>{
 local.setItem("a25",JSON.stringify(state("A")));subject="B";const before=local.getItem("a25");
 await expect(recovery.readLocalRecoveryOriginals()).rejects.toBeDefined();
 expect(local.getItem("a25")).toBe(before);expect(network).not.toHaveBeenCalled();
});
it("rejects JSON-shaped download requests even when their accountId matches",async()=>{
 await own();await expect(recovery.downloadRecoveryJson({accountId:"A",records:[{raw:"synthetic"}]})).rejects.toBeDefined();expect(clicks).toBe(0);
});
it("binds original reads to the captured workspace, not a request hint",async()=>{
 await own();await expect(recovery.readServerRecoveryOriginal("B")).rejects.toBeDefined();
 expect(network.mock.calls.some(([url])=>url.includes("/api/cloud/state"))).toBe(false);
});
it("preserves an owned malformed snapshot including grade, XP and unfinished answer",async()=>{
 await own();const before=local.getItem(workspace.accountStorageKey("a25"));const original=await recovery.readLocalRecoveryOriginals();
 expect(original.accountId).toBe("A");expect(original.records[0].raw).toBe(before);await recovery.downloadRecoveryJson(original);expect(clicks).toBe(1);
 expect(local.getItem(workspace.accountStorageKey("a25"))).toBe(before);
});
it("does not expose payloads in backup listings, and reads only freshly authorized owned records",async()=>{
 await own();const handle=await recovery.preserveCloudOriginals({local:state(),remote:{test:"synthetic"}}),list=await recovery.listCloudOriginals();
 expect(list).toHaveLength(1);expect(list[0].local).toBeUndefined();expect(list[0].remote).toBeUndefined();
 expect((await recovery.readCloudOriginal(list[0])).local).toEqual(state());expect(handle.id).toContain("v2:");
 subject="B";await expect(recovery.readCloudOriginal(list[0])).rejects.toBeDefined();await expect(recovery.downloadRecoveryJson(handle)).rejects.toBeDefined();expect(clicks).toBe(0);
});
it("keeps old v1 records in metadata-only quarantine without reading their payloads",async()=>{
 await own();const key=workspace.accountStorageKey("a25-cloud-recovery-v1:old"),raw=' {"answers":["synthetic legacy"]} ';local.setItem(key,raw);const get=vi.spyOn(local,"getItem");
 const list=await recovery.listCloudOriginals();expect(list).toEqual([{id:key,quarantined:true}]);expect(get.mock.calls.some(([k])=>k.includes("recovery-v1"))).toBe(false);
 await expect(recovery.downloadRecoveryJson(list[0])).rejects.toBeDefined();expect(local.getItem(key)).toBe(raw);
});
it("does not accept a record belonging to B placed in the A namespace",async()=>{
 await own();const key=workspace.accountStorageKey("a25");local.setItem(key,JSON.stringify(state("B")));const before=local.getItem(key);
 await expect(recovery.readLocalRecoveryOriginals()).rejects.toMatchObject({code:"CLOUD_RECOVERY_ORIGIN_UNPROVEN"});expect(local.getItem(key)).toBe(before);
});
it("a new accountId on a stored wrapper cannot claim the other account's inner state",async()=>{
 await own();const saved=await recovery.preserveCloudOriginals({local:state(),remote:null});const original=JSON.parse(local.getItem(workspace.accountStorageKey(saved.id)));
 subject="B";vi.resetModules();const bAccounts=await import("../../app/lib/cloudAccountSession.js"),bWorkspace=await import("../../app/lib/accountWorkspace.js"),bRecovery=await import("../../app/lib/cloudRecovery.js");
 const proof=await bAccounts.openVerifiedAccount();bWorkspace.selectAccountWorkspace(proof);original.accountId="B";
 local.setItem(bWorkspace.accountStorageKey(original.key),JSON.stringify(original));const list=await bRecovery.listCloudOriginals();expect(list.every(row=>row.quarantined)).toBe(true);await expect(bRecovery.downloadRecoveryJson(list[0])).rejects.toBeDefined();
});
it("invalidates old capabilities on logout even if A signs in again; fresh A can recover",async()=>{
 await own();const old=await recovery.readLocalRecoveryOriginals(),epoch=accounts.beginAccountMutation();accounts.endAccountMutation(epoch);
 await accounts.openVerifiedAccount();await expect(recovery.downloadRecoveryJson(old)).rejects.toBeDefined();
 const fresh=await recovery.readLocalRecoveryOriginals();await recovery.downloadRecoveryJson(fresh);expect(clicks).toBe(1);
});
it.each(["offline","signed-out"])("fails closed on %s without deleting or exporting originals",async fault=>{
 await own();const before=JSON.stringify([...local.data]);if(fault==="offline")offline=true;else subject=null;
 await expect(recovery.readLocalRecoveryOriginals()).rejects.toBeDefined();expect(JSON.stringify([...local.data])).toBe(before);expect(clicks).toBe(0);
});
it("checks the original again immediately before a local recovery write",async()=>{
 await own();const original=await recovery.readLocalRecoveryOriginals(),capability=await access.beginRecoveryAccess();local.setItem(workspace.accountStorageKey("a25"),JSON.stringify({...state(),xp:999}));
 expect(()=>recovery.assertLocalRecoveryUnchanged(original,capability)).toThrow(expect.objectContaining({code:"CLOUD_RECOVERY_SOURCE_CHANGED"}));
});
it("does not run an alternate export reader under the wrong account",async()=>{
 await own();subject="B";const read=vi.fn(()=>({answers:["synthetic A"]}));await expect(recovery.downloadWorkspaceJson(read,"blocked.json")).rejects.toBeDefined();expect(read).not.toHaveBeenCalled();expect(clicks).toBe(0);
});
it("scopes validation answers and never reads the global legacy dataset for the current account",async()=>{
 await own();const validation=await import("../../app/lib/graderValidationDataset.js"),key=validation.GRADER_VALIDATION_STORAGE_KEY;
 const legacy=' [{"student_response":"synthetic unknown answer"}] ';local.setItem(key,legacy);const reads=vi.spyOn(local,"getItem");
 expect(validation.loadLocalValidationDataset()).toEqual([]);expect(reads.mock.calls.some(([k])=>k===key)).toBe(false);
 const row=validation.makeGraderValidationCase({subject:"portuguese",itemId:"synthetic",response:"synthetic A answer",occurredAt:1});
 expect(validation.appendClosedBetaValidationCase(row,{consent:true}).ok).toBe(true);
 expect(validation.loadLocalValidationDataset()).toEqual([row]);expect(local.getItem(key)).toBe(legacy);
 subject="B";const epoch=accounts.beginAccountMutation();accounts.endAccountMutation(epoch);await accounts.openVerifiedAccount();
 expect(validation.loadLocalValidationDataset()).toEqual([]);expect(local.getItem(key)).toBe(legacy);
});
it.each(['[]','{broken',JSON.stringify({format:"aplus-owned-validation-v1",accountId:"B",cases:[]})])("preserves unproven or malformed scoped validation data: %s",async raw=>{
 await own();const validation=await import("../../app/lib/graderValidationDataset.js"),capture=await import("../../app/lib/graderValidationCapture.js");
 const key=workspace.accountStorageKey(validation.GRADER_VALIDATION_STORAGE_KEY);local.setItem(key,raw);capture.setGraderValidationConsent(true);
 expect(()=>validation.loadLocalValidationDataset()).toThrow();
 const row=validation.makeGraderValidationCase({subject:"portuguese",itemId:"synthetic",response:"synthetic",occurredAt:1});
 expect(validation.appendClosedBetaValidationCase(row,{consent:true})).toMatchObject({ok:false,code:"VALIDATION_ORIGIN_UNPROVEN"});
 expect(capture.capturePortugueseValidationCase({item:{id:"synthetic",responseType:"essay"},response:"synthetic",result:{}})).toMatchObject({ok:false,code:"VALIDATION_ORIGIN_UNPROVEN"});
 expect(local.getItem(key)).toBe(raw);
});
