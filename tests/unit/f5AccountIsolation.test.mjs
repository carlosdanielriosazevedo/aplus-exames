import {beforeEach,afterEach,describe,it,expect,vi} from "vitest";

const sdk=vi.hoisted(()=>({createClient:vi.fn(),signOut:vi.fn(),signIn:vi.fn()}));
vi.mock("@neondatabase/neon-js",()=>({createClient:sdk.createClient}));
vi.mock("@neondatabase/neon-js/auth",()=>({createInternalNeonAuth:()=>({adapter:{
  signOut:sdk.signOut,signIn:{email:sdk.signIn}
}})}));
vi.mock("@neondatabase/neon-js/auth/react/adapters",()=>({BetterAuthReactAdapter:()=>({})}));

function storage(){
  const data=new Map();
  return {data,get length(){return data.size;},key:i=>[...data.keys()][i]??null,
    getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
}
function deferred(){let resolve;const promise=new Promise(r=>{resolve=r;});return {promise,resolve};}
const token=subject=>"header."+Buffer.from(JSON.stringify({sub:subject})).toString("base64url")+".synthetic";
let user,local,session,events,accounts,workspace,cloud,reliability,persistence,rows,requests,api,beforeWrite,afterRead;

beforeEach(async()=>{
  vi.resetModules();vi.clearAllMocks();
  local=storage();session=storage();events=[];user="A";rows=new Map();requests=[];api=true;beforeWrite=null;afterRead=null;
  vi.stubGlobal("localStorage",local);vi.stubGlobal("sessionStorage",session);
  vi.stubGlobal("window",{localStorage:local,sessionStorage:session,location:{origin:"https://isolated.example.invalid"},
    addEventListener:(name,fn)=>{if(name==="storage")events.push(fn);},dispatchEvent:()=>{},setTimeout,clearTimeout});
  vi.stubEnv("NEXT_PUBLIC_NEON_AUTH_URL","https://auth.example.invalid");
  vi.stubEnv("NEXT_PUBLIC_NEON_DATA_API_URL","https://data.example.invalid");
  accounts=await import("../../app/lib/cloudAccountSession.js");
  workspace=await import("../../app/lib/accountWorkspace.js");
  reliability=await import("../../app/lib/cloudReliability.js");
  persistence=await import("../../app/lib/persistence.js");
  cloud=await import("../../app/lib/cloud.js");
  const {assertRequestAccount}=await import("../../app/lib/server/account-binding.js");
  vi.stubGlobal("fetch",vi.fn(async(path,options={})=>{
    const headers=new Headers(options.headers);
    requests.push({path,options,subject:user});
    if(path==="/api/auth/session"){
      try{assertRequestAccount(headers,user);}
      catch{return Response.json({ok:false},{status:403});}
      return user?Response.json({ok:true,user:{id:user,name:"Synthetic "+user}}):Response.json({ok:false},{status:401});
    }
    if(path==="/api/auth/token")return Response.json({token:token(user)});
    if(path==="/api/cloud/state"){
      if(!api)return Response.json({ok:false},{status:404});
      if(options.method==="POST"&&beforeWrite)await beforeWrite();
      try{assertRequestAccount(headers,user,{required:true});}
      catch{return Response.json({ok:false},{status:403});}
      if(options.method!=="POST"){
        const row=rows.get(user)||null;
        if(afterRead)await afterRead();
        return Response.json({ok:true,data:row});
      }
      const body=JSON.parse(options.body),old=rows.get(user);
      if(old&&(body.operation==="insert"||old.revision!==body.expectedRevision))
        return Response.json({ok:false,conflict:true,remote:old},{status:409});
      const row={state_json:body.state,revision:(old?.revision||0)+1};rows.set(user,row);
      return Response.json({ok:true,data:{revision:row.revision}});
    }
    if(path==="/api/pilot/sync"){
      try{assertRequestAccount(headers,user,{required:true});}
      catch{return Response.json({ok:false},{status:403});}
      return Response.json({ok:true});
    }
    throw Error("Unexpected synthetic request "+path);
  }));
  sdk.createClient.mockImplementation(config=>({from:()=>{
    let action="read",row=null;const filters={};
    const execute=async()=>{
      const jwt=await config.dataApi.getToken();
      const subject=JSON.parse(Buffer.from(jwt.split(".")[1],"base64url")).sub;
      if(action!=="read"&&beforeWrite)await beforeWrite();
      const target=row?.auth_user_id||filters.auth_user_id;
      if(subject!==target)return {error:{message:"Synthetic RLS denied"}};
      if(action==="read")return {data:rows.get(target)||null};
      const old=rows.get(target);
      if((action==="insert"&&old)||(action==="update"&&old?.revision!==filters.revision))return {data:null};
      rows.set(target,{state_json:row.state_json,revision:row.revision});
      return {data:{revision:row.revision}};
    };
    const builder={select:()=>builder,eq:(key,value)=>{filters[key]=value;return builder;},
      insert:value=>{action="insert";row=value;return builder;},update:value=>{action="update";row=value;return builder;},
      single:execute,maybeSingle:execute};return builder;
  }}));
});
afterEach(()=>{vi.unstubAllGlobals();vi.unstubAllEnvs();});

async function owned(subject="A",initial={xp:0,scores:{},subjectProgress:{}}){
  user=subject;
  const context=await accounts.openVerifiedAccount();
  return {context,state:accounts.newAccountState(initial,context)};
}

describe("F5 verified provenance and non-destructive quarantine",()=>{
  it("does not allow a verified proof or an owned state to be rebound",async()=>{
    const {context,state}=await owned();
    expect(()=>{context.subject="B";}).toThrow();
    expect(()=>accounts.newAccountState(state,context)).toThrow();
    expect(()=>accounts.assertAccountState(state,{...context})).toThrow();
  });
  it("does not trust identity.authUserId or send unowned legacy progress",async()=>{
    await expect(cloud.saveStudentCloudState({xp:42,identity:{authUserId:"A"}})).rejects.toMatchObject({code:"CLOUD_ACCOUNT_UNPROVEN"});
    expect(requests).toHaveLength(0);
  });
  it("never sends A's pending save with B's session",async()=>{
    const {context,state}=await owned();state.xp=42;
    const pending=reliability.queueCloudSave(state,{accountContext:context});
    user="B";const b=await accounts.openVerifiedAccount();
    await expect(cloud.saveStudentCloudState(state,{accountContext:b})).rejects.toBeDefined();
    expect(requests.some(x=>x.options.method==="POST")).toBe(false);
    expect(reliability.listPendingCloudSaves(b)).toContainEqual({id:pending.id,quarantined:true});
    expect(local.getItem("a25-cloud-pending-v2:"+pending.id)).toContain('"accountId":"A"');
  });
  it("retains old unidentified queues and snapshots byte-for-byte",async()=>{
    const raw=JSON.stringify([{id:"old",state:{xp:123,answers:["preserve"]},identity:{authUserId:"A"}}]);
    local.setItem("a25-cloud-pending-v1",raw);local.setItem("a25-cloud-snapshots-v1",raw);
    const {context,state}=await owned("B");
    for(let i=0;i<30;i++)reliability.queueCloudSave({...state,xp:i},{accountContext:context});
    expect(reliability.listPendingCloudSaves(context)).toHaveLength(31);
    expect(reliability.listPendingCloudSaves(context).at(-1).quarantined).toBe(true);
    expect(reliability.removePendingCloudSave("legacy-a25-cloud-pending-v1-0",context)).toBe(false);
    expect(local.getItem("a25-cloud-pending-v1")).toBe(raw);
    expect(local.getItem("a25-cloud-snapshots-v1")).toBe(raw);
  });
  it("binds failed saves to the original verified proof even after logout",async()=>{
    const {context,state}=await owned();
    const epoch=accounts.beginAccountMutation();accounts.endAccountMutation(epoch);user=null;
    const item=reliability.queueCloudSave(state,{accountContext:context});
    expect(item.accountId).toBe("A");
    expect(reliability.listPendingCloudSaves()[0].quarantined).toBe(true);
  });
  it("resumes a legitimate queue after logout/login to the same account",async()=>{
    const {context,state}=await owned();state.xp=88;
    const item=reliability.queueCloudSave(state,{accountContext:context});
    const epoch=accounts.beginAccountMutation();accounts.endAccountMutation(epoch);
    const again=await accounts.openVerifiedAccount();
    const restored=reliability.listPendingCloudSaves(again).find(x=>x.id===item.id);
    await expect(cloud.saveStudentCloudState(restored.state,{accountContext:again})).resolves.toMatchObject({ok:true});
    expect(rows.get("A").state_json.xp).toBe(88);
    expect(reliability.removePendingCloudSave(item.id,again)).toBe(true);
  });
  it("preserves concurrent queues and snapshots without overwriting entries",async()=>{
    const {context,state}=await owned();
    const items=await Promise.all(Array.from({length:40},async(_,xp)=>reliability.queueCloudSave({...state,xp},{accountContext:context})));
    expect(new Set(items.map(x=>x.id)).size).toBe(40);
    expect(reliability.listPendingCloudSaves(context)).toHaveLength(40);
    for(let i=0;i<12;i++)expect(reliability.saveLocalSnapshot({...state,xp:i},{accountContext:context}).persisted).toBe(true);
    expect(reliability.listLocalSnapshots(context)).toHaveLength(12);
  });
});

describe.each([false,true])("F5 transport races; server CAS=%s",serverApi=>{
  beforeEach(()=>{api=serverApi;});
  it("stores only the verified origin account, never the identity label",async()=>{
    const {context,state}=await owned();state.identity={authUserId:"B"};state.xp=7;
    if(!serverApi){
      await expect(cloud.saveStudentCloudState(state,{accountContext:context})).rejects.toBeDefined();
      expect(rows.size).toBe(0);expect(sdk.createClient).not.toHaveBeenCalled();return;
    }
    await cloud.saveStudentCloudState(state,{accountContext:context});
    expect(rows.get("A").state_json.xp).toBe(7);expect(rows.has("B")).toBe(false);
  });
  it("discards completion when the session changes in flight",async()=>{
    const {context,state}=await owned();state.xp=19;
    rows.set("B",{revision:1,state_json:{xp:999}});
    beforeWrite=async()=>{user="B";};
    await expect(cloud.saveStudentCloudState(state,{accountContext:context})).rejects.toBeDefined();
    expect(rows.get("B")).toEqual({revision:1,state_json:{xp:999}});
  });
  it("keeps both concurrent results on A, with stale revisions reported as conflicts",async()=>{
    const {context,state}=await owned();
    rows.set("A",{revision:2,state_json:{xp:1}});
    if(!serverApi){
      const refused=await Promise.allSettled([cloud.saveStudentCloudState({...state,xp:3},{expectedRevision:2,knownRemote:true,accountContext:context}),cloud.saveStudentCloudState({...state,xp:4},{expectedRevision:2,knownRemote:true,accountContext:context})]);
      expect(refused.every(x=>x.status==="rejected")).toBe(true);expect(rows.get("A").revision).toBe(2);expect(sdk.createClient).not.toHaveBeenCalled();return;
    }
    const result=await Promise.all([cloud.saveStudentCloudState({...state,xp:3},{expectedRevision:2,knownRemote:true,accountContext:context}),
      cloud.saveStudentCloudState({...state,xp:4},{expectedRevision:2,knownRemote:true,accountContext:context})]);
    expect(result.filter(x=>x.ok)).toHaveLength(1);expect(result.filter(x=>x.conflict)).toHaveLength(1);
    expect(rows.get("A").revision).toBe(3);expect(rows.has("B")).toBe(false);
  });
  it("does not send old data after another tab changes the auth epoch",async()=>{
    const {context,state}=await owned();
    local.setItem("a25-cloud-auth-epoch-v1",JSON.stringify({epoch:"other-tab",subject:"B",changing:false}));
    for(const fn of events)fn({key:"a25-cloud-auth-epoch-v1"});
    await expect(cloud.saveStudentCloudState(state,{accountContext:context})).rejects.toBeDefined();
    expect(requests.some(x=>x.options.method==="POST")).toBe(false);
  });
});

describe("F5 workspace and response isolation",()=>{
  it("invalidates proofs on logout even when Web Storage writes fail",async()=>{
    const {context}=await owned();
    local.setItem=()=>{throw Error("synthetic quota");};
    const epoch=accounts.beginAccountMutation();accounts.endAccountMutation(epoch);
    expect(accounts.accountContextCurrent(context)).toBe(false);
    await expect(accounts.accountFetch(context,"/never-sent")).rejects.toBeDefined();
    expect(requests.some(x=>x.path==="/never-sent")).toBe(false);
  });
  it("reports a failed backup instead of claiming to preserve a snapshot",async()=>{
    const {context,state}=await owned();
    local.setItem=session.setItem=()=>{throw Error("synthetic quota");};
    expect(reliability.saveLocalSnapshot(state,{accountContext:context}).persisted).toBe(false);
    expect(reliability.queueCloudSave(state,{accountContext:context}).persisted).toBe(false);
  });
  it("keeps unreadable old local data without deleting it",()=>{
    local.setItem("a25","{damaged");
    expect(persistence.loadLocalStateStatus({},()=>({}))).toMatchObject({found:true,error:true});
    expect(local.getItem("a25")).toBe("{damaged");
  });
  it("blocks pilot autosync of A's academic results under B",async()=>{
    const {context,state}=await owned();workspace.selectAccountWorkspace(context);
    const consent=await import("../../app/lib/pilotConsentClient.js");consent.setPilotTelemetryAllowed(true);
    state.pilotItemResults=[{id:"A-1",itemId:"synthetic-A",outcome:"correct",seconds:5,date:"2026-11-03"}];
    user="B";
    expect((await persistence.syncStateToBackend(state)).ok).toBe(false);
    expect(requests.some(x=>x.path==="/api/pilot/sync")).toBe(false);
    user="A";
    expect((await persistence.syncStateToBackend(state)).ok).toBe(true);
    const request=requests.find(x=>x.path==="/api/pilot/sync");
    expect(request.subject).toBe("A");expect(new Headers(request.options.headers).get("x-approva-account")).toBe("A");
    expect(JSON.parse(request.options.body).itemResults[0].itemId).toBe("synthetic-A");
  });
  it("keeps local XP, drafts and answers under A while B uses a separate tab",async()=>{
    const a=await owned();workspace.selectAccountWorkspace(a.context);
    const draftsA=await import("../../app/lib/sessionDraft.js");
    const fqaA=await import("../../app/lib/physicsChemistryExamDraft.js");
    expect(persistence.saveLocalState({...a.state,xp:123})).toBe(true);
    draftsA.saveSessionDraft({kind:"diagnostic",sessionId:"attempt-A",answers:["A answer"]});
    fqaA.savePhysicsChemistryExamDraft("fqa-mini-1",{itemIds:["a"],index:0,answers:{a:"12"},startedAt:1});
    vi.resetModules();user="B";
    const managerB=await import("../../app/lib/cloudAccountSession.js");
    const workspaceB=await import("../../app/lib/accountWorkspace.js");
    const contextB=await managerB.openVerifiedAccount();workspaceB.selectAccountWorkspace(contextB);
    const persistenceB=await import("../../app/lib/persistence.js");
    const draftsB=await import("../../app/lib/sessionDraft.js");
    const fqaB=await import("../../app/lib/physicsChemistryExamDraft.js");
    expect(persistenceB.loadLocalStateStatus({},()=>({})).found).toBe(false);
    expect(draftsB.loadSessionDraft()).toBe(null);expect(fqaB.pendingPhysicsChemistryExam()).toBe(null);
    expect(persistenceB.saveLocalState(managerB.newAccountState({xp:5},contextB))).toBe(true);
    expect(persistenceB.saveLocalState(a.state)).toBe(false);
    expect(local.getItem("a25-account-v1:A:a25")).toContain('"xp":123');
    expect(draftsA.loadSessionDraft().answers).toEqual(["A answer"]);
    expect(fqaA.loadPhysicsChemistryExamDraft("fqa-mini-1",["a"]).answers.a).toBe("12");
  });
  it("never copies unclaimed legacy state into a verified workspace",async()=>{
    const raw=JSON.stringify({xp:42,diagnosticResponses:[{answer:"legacy"}]});local.setItem("a25",raw);
    const {context}=await owned("B");workspace.selectAccountWorkspace(context);
    expect(persistence.loadLocalStateStatus({},()=>({})).found).toBe(false);
    expect(local.getItem("a25")).toBe(raw);
  });
  it("does not return an A cloud read after a B session takes over",async()=>{
    api=true;const {context}=await owned();rows.set("A",{revision:1,state_json:{xp:9}});
    afterRead=async()=>{user="B";};
    await expect(cloud.loadStudentCloudState({accountContext:context})).rejects.toBeDefined();
  });
  it("aborts an outstanding bound request on logout without deleting local data",async()=>{
    const {context,state}=await owned();const wait=deferred();
    local.setItem("preserved",JSON.stringify(state));
    vi.mocked(fetch).mockImplementationOnce(async(_url,options)=>{
      await wait.promise;
      expect(options.signal.aborted).toBe(true);
      return Response.json({ok:true});
    });
    const request=accounts.accountFetch(context,"/synthetic-delayed");
    sdk.signOut.mockResolvedValue({});await cloud.cloudSignOut();wait.resolve();
    await expect(request).rejects.toBeDefined();expect(local.getItem("preserved")).toContain('"accountId":"A"');
  });
  it("fails closed on auth/network errors and does not fall back from a forbidden CAS API",async()=>{
    const {context,state}=await owned();
    vi.mocked(fetch).mockRejectedValueOnce(new Error("synthetic offline"));
    await expect(cloud.saveStudentCloudState(state,{accountContext:context})).rejects.toBeDefined();
    expect(rows.size).toBe(0);
    vi.mocked(fetch).mockImplementation(async path=>path==="/api/auth/session"?Response.json({ok:true,user:{id:"A"}}):Response.json({ok:false},{status:403}));
    await expect(cloud.saveStudentCloudState(state,{accountContext:context})).rejects.toBeDefined();
    expect(sdk.createClient).not.toHaveBeenCalled();
  });
});
