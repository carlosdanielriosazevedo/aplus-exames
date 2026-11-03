import assert from "node:assert/strict";
import {createServer} from "node:http";
import {createRequire} from "node:module";
import {build} from "esbuild";
import {assertRequestAccount} from "../../app/lib/server/account-binding.js";
const require=createRequire(import.meta.url);
// Match the repository's existing isolated Playwright installation convention.
const {chromium}=await import(process.env.F5_PLAYWRIGHT_MODULE||require.resolve("playwright"));
const result=await build({entryPoints:["tests/f5/browser-entry.js"],bundle:true,write:false,format:"iife",platform:"browser",logLevel:"silent",loader:{".js":"jsx"},jsx:"automatic",
  define:{"process.env.NEXT_PUBLIC_NEON_AUTH_URL":'"https://auth.example.invalid"',"process.env.NEXT_PUBLIC_NEON_DATA_API_URL":'"https://data.example.invalid"'},
  plugins:[{name:"no-external-auth",setup(builder){
    builder.onResolve({filter:/^@neondatabase\/neon-js/},args=>({path:args.path,namespace:"synthetic"}));
    builder.onLoad({filter:/.*/,namespace:"synthetic"},args=>({contents:args.path.endsWith("adapters")
      ?"export const BetterAuthReactAdapter=()=>({});"
      :args.path.endsWith("/auth")?"export const createInternalNeonAuth=()=>({adapter:{signOut:async()=>fetch('/fixture/logout',{method:'POST'})}});"
      :"export const createClient=()=>{throw Error('Unexpected Data API fallback')};",loader:"js"}));
  }}]});
const bundle=result.outputFiles[0].text;
const rows=new Map(),posts=[];
let heldRead=null,releaseRead=null;
const server=createServer(async(req,res)=>{
  const send=(body,status=200)=>{res.writeHead(status,{"Content-Type":"application/json","Cache-Control":"no-store"});res.end(JSON.stringify(body));};
  const user=/synthetic-account=([^;]+)/.exec(req.headers.cookie||"")?.[1]||null;
  if(req.url==="/bundle.js"){res.writeHead(200,{"Content-Type":"text/javascript"});res.end(bundle);return;}
  if(req.url==="/"){res.end('<!doctype html><meta charset="utf-8"><title>Isolated F5 synthetic fixture</title><script src="/bundle.js"></script>');return;}
  if(req.url==="/fixture/logout"){res.writeHead(200,{"Set-Cookie":"synthetic-account=; Max-Age=0; Path=/"});res.end('{}');return;}
  try{assertRequestAccount(new Headers(req.headers),user,{required:req.url==="/api/cloud/state"});}
  catch{send({ok:false},403);return;}
  if(req.url==="/api/auth/session"){send(user?{ok:true,user:{id:user}}:{ok:false},user?200:401);return;}
  if(req.url==="/api/cloud/state"){
    if(req.method!=="POST"){
      const row=rows.get(user)||null;
      if(heldRead){const signal=heldRead;heldRead=null;await new Promise(resolve=>{releaseRead=resolve;signal();});}
      send({ok:true,data:row});return;
    }
    const chunks=[];for await(const chunk of req)chunks.push(chunk);
    const body=JSON.parse(Buffer.concat(chunks));posts.push({user,body});
    const old=rows.get(user);
    if(old&&(body.operation==="insert"||old.revision!==body.expectedRevision)){send({ok:false,conflict:true,remote:old},409);return;}
    const row={revision:(old?.revision||0)+1,state_json:body.state};rows.set(user,row);send({ok:true,data:row});return;
  }
  send({ok:false},404);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.F5_CHROMIUM_PATH?{executablePath:process.env.F5_CHROMIUM_PATH}:{}),args:["--no-sandbox"]});
try{
  const context=await browser.newContext();
  const setAccount=async value=>context.addCookies([{name:"synthetic-account",value,url:origin}]);
  const open=async()=>{const page=await context.newPage();await page.goto(origin);await page.waitForFunction(()=>window.f5);return page;};
  await setAccount("A");const a=await open();
  await a.evaluate(async()=>{
    const f=window.f5;window.proof=await f.accounts.openVerifiedAccount();f.workspace.selectAccountWorkspace(proof);
    window.state=f.accounts.newAccountState({xp:123,scores:{},subjectProgress:{},examHistory:[{id:"synthetic-evaluation-A",score:14}]},proof);
    f.persistence.saveLocalState(state);
    f.drafts.saveSessionDraft({kind:"diagnostic",sessionId:"unfinished-A",answers:["synthetic A answer"],startedAt:123});
    f.fqa.savePhysicsChemistryExamDraft("fqa-mini-1",{itemIds:["q"],answers:{q:"synthetic response"},startedAt:777,index:0});
    f.reliability.queueCloudSave(state,{accountContext:proof});
    localStorage.setItem("a25-cloud-pending-v1",JSON.stringify([{state:{xp:555}}]));
    localStorage.setItem("a25",JSON.stringify({xp:444,answers:["legacy"]}));
  });
  const preserved=await a.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([key])=>!key.includes("auth-epoch"))));
  await a.evaluate(()=>f5.cloud.cloudSignOut());
  await setAccount("B");const b=await open();
  const isolated=await b.evaluate(async()=>{
    const f=f5;window.proof=await f.accounts.openVerifiedAccount();f.workspace.selectAccountWorkspace(proof);
    const before={state:f.persistence.loadLocalStateStatus({},()=>({})),draft:f.drafts.loadSessionDraft(),fqa:f.fqa.pendingPhysicsChemistryExam()};
    window.state=f.accounts.newAccountState({xp:5,scores:{},subjectProgress:{}},proof);
    f.persistence.saveLocalState(state);
    const pending=f.reliability.listPendingCloudSaves(proof);
    await f.cloud.saveStudentCloudState(state,{accountContext:proof});
    return {before,pending};
  });
  assert.equal(isolated.before.state.found,false);assert.equal(isolated.before.draft,null);assert.equal(isolated.before.fqa,null);
  assert.equal(isolated.pending.length,2);assert.ok(isolated.pending.every(x=>x.quarantined&&!x.state));
  assert.equal(await a.evaluate(async()=>{try{await f5.cloud.saveStudentCloudState(state,{accountContext:proof});return false;}catch{return true;}}),true);
  assert.equal(rows.get("B").state_json.xp,5);assert.ok(posts.every(x=>x.user!=="B"||x.body.state.xp!==123));
  const untouched=await b.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));
  for(const [key,value] of Object.entries(preserved))assert.equal(untouched[key],value,"Old A/legacy data changed: "+key);
  await b.evaluate(()=>f5.cloud.cloudSignOut());await setAccount("A");const resumed=await open();
  const restored=await resumed.evaluate(async()=>{
    const f=f5;window.proof=await f.accounts.openVerifiedAccount();f.workspace.selectAccountWorkspace(proof);
    window.state=f.persistence.loadLocalStateStatus({},()=>({})).state;
    const queue=f.reliability.listPendingCloudSaves(proof).find(x=>!x.quarantined);
    await f.cloud.saveStudentCloudState(queue.state,{accountContext:proof});
    return {xp:state.xp,evaluation:state.examHistory[0],draft:f.drafts.loadSessionDraft(),fqa:f.fqa.loadPhysicsChemistryExamDraft("fqa-mini-1",["q"])};
  });
  assert.equal(restored.xp,123);assert.equal(restored.evaluation.score,14);assert.equal(restored.draft.answers[0],"synthetic A answer");
  assert.equal(restored.fqa.startedAt,777);assert.equal(rows.get("A").state_json.xp,123);
  // Hold an actual HTTP read after server authentication, then change the
  // shared cookie and epoch in another real tab. The old response is discarded.
  const readStarted=new Promise(resolve=>{heldRead=resolve;});
  const staleRead=resumed.evaluate(async()=>{try{await f5.cloud.loadStudentCloudState({accountContext:proof});return false;}catch{return true;}});
  await readStarted;
  await b.evaluate(()=>{const epoch=f5.accounts.beginAccountMutation();f5.accounts.endAccountMutation(epoch);});
  await setAccount("B");releaseRead();assert.equal(await staleRead,true);
  assert.equal(rows.get("B").state_json.xp,5);
  console.log("PASS Chromium: real shared-cookie A/logout/B, two tabs, stale HTTP completion, quarantined legacy queue, preserved XP/answers/evaluation/FQA clock, legitimate A resume; no A payload or state incorporated into B");
  for(const choice of ["Usar progresso online","Combinar progresso","Manter este dispositivo"]){
    const isolated=await browser.newContext();
    await isolated.addCookies([{name:"synthetic-account",value:"A",url:origin}]);
    const page=await isolated.newPage();await page.goto(origin);await page.waitForFunction(()=>window.f5);
    rows.set("A",{revision:7,state_json:{schema:"aplus-student-state-v8",xp:80,scores:{},subjectProgress:{},missionHistory:[],examHistory:[]}});
    rows.set("B",{revision:8,state_json:{xp:900}});
    await page.evaluate(async()=>{
      const f=f5,proof=await f.accounts.openVerifiedAccount();f.workspace.selectAccountWorkspace(proof);
      const state=f.accounts.newAccountState({xp:22,goal:15,profile:{},scores:{},subjectProgress:{},missionHistory:[],examHistory:[]},proof);
      f.persistence.saveLocalState(state);window.mountAccount(state);
    });
    await page.getByRole("button",{name:"↑ Guardar online",exact:true}).click();
    await page.getByText("Encontrámos progresso mais recente noutro dispositivo",{exact:true}).waitFor();
    const postCount=posts.length;
    // Deliberately omit the storage event: server authentication must still
    // reject the stale account's choice after the shared cookie changes.
    await isolated.addCookies([{name:"synthetic-account",value:"B",url:origin}]);
    await page.getByRole("button",{name:new RegExp("^"+choice)}).click();
    await page.waitForFunction(()=>document.querySelector(".cloudMessage.bad"));
    await page.waitForFunction(()=>!document.querySelector(".conflictChoices button")?.disabled);
    const remaining=await page.evaluate(()=>({xp:renderedState.xp,owner:renderedState.cloudAccount.accountId,raw:localStorage.getItem("a25-account-v1:A:a25")}));
    assert.equal(remaining.xp,22);assert.equal(remaining.owner,"A");assert.ok(remaining.raw.includes('"xp":22'));
    assert.equal(rows.get("B").state_json.xp,900);assert.equal(posts.length,postCount);
    await isolated.close();
  }
  console.log("PASS actual AccountCloud UI: all three conflict recovery choices reject a silently changed A->B cookie, keep A XP=22 and leave B XP=900 unchanged");
  const studyContext=await browser.newContext();
  await studyContext.addCookies([{name:"synthetic-account",value:"A",url:origin}]);
  const study=await studyContext.newPage();await study.goto(origin);await study.waitForFunction(()=>window.f5);
  await study.evaluate(async()=>{
    const proof=await f5.accounts.openVerifiedAccount();f5.workspace.selectAccountWorkspace(proof);
    const state=f5.accounts.newAccountState({xp:11,scores:{}},proof);f5.persistence.saveLocalState(state);mountStudy(state);
  });
  await study.getByRole("button",{name:"Continuar estudo sintético"}).click();
  await study.route("**/api/auth/session",route=>route.abort("internetdisconnected"));
  const failedCheck=study.waitForEvent("requestfailed",request=>request.url().endsWith("/api/auth/session"));
  await study.evaluate(()=>window.dispatchEvent(new Event("focus")));await failedCheck;
  await study.getByRole("button",{name:"Continuar estudo sintético"}).waitFor();
  await study.unroute("**/api/auth/session");
  await studyContext.addCookies([{name:"synthetic-account",value:"B",url:origin}]);
  await study.evaluate(()=>window.dispatchEvent(new Event("focus")));
  await study.getByRole("button",{name:"Reverificar conta de origem"}).waitFor();
  assert.equal(await study.getByRole("button",{name:"Continuar estudo sintético"}).count(),0);
  assert.equal(await study.evaluate(()=>renderedState.xp),12);
  await studyContext.addCookies([{name:"synthetic-account",value:"A",url:origin}]);
  await study.getByRole("button",{name:"Reverificar conta de origem"}).click();
  await study.getByRole("button",{name:"Continuar estudo sintético"}).click();
  assert.equal(await study.evaluate(()=>renderedState.xp),13);
  await study.close();await studyContext.close();
  console.log("PASS study workspace guard: silent B takeover suspends local academic actions; verified A resumes its own unchanged workspace");
}finally{releaseRead?.();await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
