// Actual F7 UI/API + real installed server SDK; all identities/transports/SQL
// are synthetic. F5 modules are read verbatim from its immutable audit commit.
import assert from "node:assert/strict";
import {build} from "esbuild";
import {createServer} from "node:http";
import {createRequire} from "node:module";
import {execFileSync} from "node:child_process";
import {readFile} from "node:fs/promises";
import path from "node:path";
import {realNeonAuthFixture} from "../helpers/neonAuthSdkFixture.mjs";
const F5="3e6e8e9b4477f1e3bd50ab3c996e264bfed5370a";
const gitFile=file=>execFileSync("git",["show",`${F5}:${file}`],{encoding:"utf8"});
const {assertRequestAccount}=await import("data:text/javascript;base64,"+Buffer.from(gitFile("app/lib/server/account-binding.js")).toString("base64"));
const require=createRequire(import.meta.url);
const {chromium}=await import(process.env.F7_PLAYWRIGHT_MODULE||require.resolve("playwright"));
const result=await build({entryPoints:["tests/fixtures/cloudSnapshotBrowserEntry.jsx"],bundle:true,write:false,format:"iife",platform:"browser",loader:{".js":"jsx"},jsx:"automatic",logLevel:"silent",
  define:{"process.env.NEXT_PUBLIC_NEON_AUTH_URL":'"https://auth.example.invalid"',"process.env.NEXT_PUBLIC_NEON_DATA_API_URL":'"https://data.example.invalid"'},
  plugins:[{name:"synthetic-browser-sdk-and-pinned-f5",setup(b){
    b.onResolve({filter:/^@neondatabase\/neon-js/},a=>({path:a.path,namespace:"sdk"}));
    b.onLoad({filter:/.*/,namespace:"sdk"},a=>({loader:"js",contents:a.path.endsWith("adapters")?"export const BetterAuthReactAdapter=()=>({});":a.path.endsWith("/auth")?
      "export const createInternalNeonAuth=()=>({adapter:{getSession:async()=>({data:await(await fetch('/api/auth/session')).json()}),signOut:async()=>fetch('/test/logout',{method:'POST'})}});":
      "export const createClient=()=>{globalThis.__f7DataFallbacks=(globalThis.__f7DataFallbacks||0)+1;throw Error('F5 attempted an unsafe Data API fallback')};"}));
    b.onResolve({filter:/^f5:/},a=>({path:a.path.slice(3),namespace:"f5"}));
    b.onResolve({filter:/.*/,namespace:"f5"},a=>{
      if(!a.path.startsWith("."))return;
      const file=path.posix.normalize(path.posix.join(path.posix.dirname(a.importer),a.path));
      if(file==="app/lib/cloudStateMerge.js")return {path:path.resolve(file)};
      return {path:file,namespace:"f5"};
    });
    b.onLoad({filter:/.*/,namespace:"f5"},a=>({contents:gitFile(a.path),loader:"js"}));
    b.onResolve({filter:/browserStorage\.js$/},a=>a.namespace!=="f5"&&path.resolve(a.resolveDir,a.path)===path.resolve("app/lib/browserStorage.js")?{path:"app/lib/browserStorage.js",namespace:"f5"}:undefined);
  }}]});
const bundle=result.outputFiles[0].text,rows=new Map(),history=[],requests=[];
const state=(xp=20)=>({xp,goal:15,profile:{schoolYear:"12.º",optionalTopics:[]},scores:{},subjectProgress:{},missionHistory:[],examHistory:[],freeTrainingSignals:[],learningHypotheses:[],lastExam:null,lastMission:null});
const invalid=()=>({revision:2,state_json:{schema:"aplus-student-state-v8",xp:37,scores:{},missionHistory:{},examHistory:[{id:"old-exam",score20:14}],lastExam:{id:"old-exam",answers:["synthetic old answer"]}}});
const previousEnv={url:process.env.NEON_AUTH_BASE_URL,secret:process.env.NEON_AUTH_COOKIE_SECRET};
process.env.NEON_AUTH_BASE_URL="https://auth.example.invalid";process.env.NEON_AUTH_COOKIE_SECRET="f7-synthetic-server-cookie-signing-material";
const previousFetch=globalThis.fetch;
globalThis.fetch=async(url,options={})=>{
  assert.equal(new URL(url).origin,"https://auth.example.invalid");
  const subject=/__Secure-neon-auth\.session_token=([^;]+)/.exec(new Headers(options.headers).get("cookie")||"")?.[1];
  const now=new Date().toISOString();
  return Response.json(subject?{user:{id:subject,createdAt:now,updatedAt:now},session:{id:"synthetic-session-"+subject,userId:subject,expiresAt:new Date(Date.now()+3600000).toISOString(),createdAt:now,updatedAt:now}}:{user:null,session:null});
};
let holdRead=null,releaseRead=null;
const fixture=globalThis.__f6Fixture={headers:new Headers(),cookieWrites:[],sqlCalls:[],sqlReply:async(sql,values)=>{
  if(sql.includes("select state_json")){
    const found=rows.has(values[0])?structuredClone(rows.get(values[0])):null;
    if(holdRead){const started=holdRead;holdRead=null;await new Promise(resolve=>{releaseRead=resolve;started();});}
    return found?[found]:[];
  }
  if(sql.includes("insert into public.student_cloud_state")){
    const [owner,json]=values;if(rows.has(owner))return [];
    const row={revision:1,state_json:JSON.parse(json)};rows.set(owner,row);return [row];
  }
  if(sql.includes("update public.student_cloud_state")){
    const [json,device,owner,revision]=values,old=rows.get(owner);if(old?.revision!==revision)return [];
    history.push({owner,row:structuredClone(old)});const row={revision:revision+1,state_json:JSON.parse(json),last_device_id:device};rows.set(owner,row);return [row];
  }
  return [];
}};
const serverBundle=await realNeonAuthFixture(),app=serverBundle.load();
const server=createServer(async(req,res)=>{
  try{
    if(req.url==="/"){res.end('<!doctype html><meta charset="utf-8"><title>F7 isolated synthetic fixture</title><script src="/bundle.js"></script>');return;}
    if(req.url==="/bundle.js"){res.setHeader("content-type","text/javascript");res.end(bundle);return;}
    if(req.url==="/test/logout"){res.setHeader("set-cookie","synthetic-account=; Path=/; Max-Age=0");res.end('{}');return;}
    const subject=/synthetic-account=([^;]+)/.exec(req.headers.cookie||"")?.[1]||null;
    try{assertRequestAccount(new Headers(req.headers),subject);}catch{res.writeHead(403,{"content-type":"application/json"});res.end('{"ok":false,"error":"FORBIDDEN"}');return;}
    fixture.headers=new Headers({...req.headers,cookie:subject?`__Secure-neon-auth.session_token=${subject}`:""});
    requests.push({url:req.url,method:req.method,subject});
    let response;
    if(req.url==="/api/auth/session"){
      const session=await app.identity.requireSession();response=Response.json({ok:true,user:session.user});
    }else{
      const chunks=[];for await(const c of req)chunks.push(c);
      const request=new Request(`http://127.0.0.1:${server.address().port}`+req.url,{method:req.method,headers:req.headers,...(req.method==="POST"?{body:Buffer.concat(chunks)}:{})});
      response=await app.cloud[req.method](request);
    }
    res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
  }catch{res.writeHead(503,{"content-type":"application/json"});res.end('{"ok":false,"error":"SYNTHETIC_REQUEST_FAILED"}');}
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.F7_CHROMIUM_PATH?{executablePath:process.env.F7_CHROMIUM_PATH}:{}),args:["--no-sandbox"]});
const account=async(context,value)=>context.addCookies([{name:"synthetic-account",value,url:origin}]);
const open=async(context)=>{const page=await context.newPage();await page.goto(origin);await page.waitForFunction(()=>window.f7);return page;};
const mount=async(page,initial=state())=>{await page.evaluate(value=>mountAccount(value),initial);await page.getByRole("button",{name:"↑ Guardar online",exact:true}).waitFor();};
async function closeContext(context){
  for(const page of context.pages())assert.equal(await page.evaluate(()=>globalThis.__f7DataFallbacks||0),0,"No recovery/client path may attempt the Data API fallback");
  await context.close();
}
async function downloaded(page,action){const event=page.waitForEvent("download");await action();const download=await event;return JSON.parse(await readFile(await download.path(),"utf8"));}
try{
  // Negative control: the transport double must register a forbidden fallback
  // even when the calling recovery code catches its rejection.
  const control=await browser.newContext(),probe=await open(control);
  assert.equal(await probe.evaluate(()=>{try{f7.probeDataApiFallback();}catch{}return globalThis.__f7DataFallbacks||0;}),1);
  await control.close();
  let context=await browser.newContext();await account(context,"A");let page=await open(context);rows.set("A",invalid());await mount(page);
  const original=structuredClone(rows.get("A"));
  await page.getByRole("button",{name:"↓ Carregar progresso online",exact:true}).click();
  await page.getByRole("button",{name:"Exportar snapshot original",exact:true}).waitFor();
  assert.equal(await page.evaluate(()=>studyState.xp),20);assert.deepEqual(rows.get("A"),original);
  const exported=await downloaded(page,()=>page.getByRole("button",{name:"Exportar snapshot original",exact:true}).click());
  assert.deepEqual(exported.data,original);
  await page.evaluate(()=>{const copy=f7.recovery.listCloudOriginals()[0];copy.label={legacy:"synthetic metadata"};copy.createdAt={valueOf:{},toString:{}};localStorage.setItem(copy.key,JSON.stringify(copy));});
  await downloaded(page,()=>page.getByRole("button",{name:"Exportar snapshot original",exact:true}).click());
  await page.locator("summary").filter({hasText:"Originais preservados"}).click();
  const metadataExport=await downloaded(page,()=>page.getByRole("button",{name:"Exportar cópia · Original com metadados incompatíveis",exact:true}).click());
  assert.deepEqual(metadataExport.label,{legacy:"synthetic metadata"});assert.deepEqual(metadataExport.createdAt,{valueOf:{},toString:{}});
  const corrected=structuredClone(exported);corrected.data.state_json.missionHistory=[];
  await page.locator('input[type="file"]').setInputFiles({name:"reviewed.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify(corrected))});
  await page.getByText("Revisei a cópia e confirmo a combinação.",{exact:false}).locator("..").locator('input[type="checkbox"]').check();
  await page.getByRole("button",{name:"Recuperar cópia validada",exact:true}).click();
  await page.waitForFunction(()=>studyState.xp===37);
  assert.equal(rows.get("A").revision,3);assert.deepEqual(history.at(-1).row,original);
  assert.equal(JSON.stringify(rows.get("A").state_json).includes("synthetic old answer"),false);
  assert.ok(await page.evaluate(()=>f7.recovery.listCloudOriginals().some(x=>JSON.stringify(x).includes("synthetic old answer"))));
  await closeContext(context);
  console.log("PASS F7 actual UI/API: malformed snapshot quarantined; exact original exported; reviewed CAS repair preserves OLD history, local answers and all backup copies");

  context=await browser.newContext();await account(context,"A");page=await open(context);rows.set("A",{revision:4,state_json:{schema:"aplus-student-state-v8",...state(99)}});await mount(page);
  await page.evaluate(()=>{const setter=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key.includes("a25-cloud-recovery-v1:"))throw Error("synthetic quota");return setter.call(this,key,value);};});
  await page.getByRole("button",{name:"↓ Carregar progresso online",exact:true}).click();await page.getByText("Este progresso precisa de revisão.",{exact:false}).first().waitFor();
  assert.equal(await page.evaluate(()=>studyState.xp),20);
  const quotaExport=await downloaded(page,()=>page.getByRole("button",{name:"Exportar snapshot original",exact:true}).click());
  assert.equal(quotaExport.data.state_json.xp,99);assert.equal(await page.locator('input[type="file"]').count(),0);
  await closeContext(context);
  console.log("PASS F7 storage failure: no volatile fallback authorizes replacement; current local XP stays unchanged");

  context=await browser.newContext();await account(context,"A");page=await open(context);await mount(page);
  const started=new Promise(resolve=>{holdRead=resolve;});
  await page.getByRole("button",{name:"↓ Carregar progresso online",exact:true}).click();await started;
  await page.evaluate(()=>updateStudy(previous=>({...previous,xp:25,examHistory:[{id:"just-completed",score20:18}],subjectProgress:{portuguese:{lastPosition:{sessionId:"unfinished",currentAnswer:"synthetic pending answer"}}}})));
  releaseRead();await page.getByText("O progresso local mudou durante o pedido.",{exact:false}).waitFor();
  assert.equal(await page.evaluate(()=>studyState.xp),25);assert.equal(await page.evaluate(()=>studyState.subjectProgress.portuguese.lastPosition.currentAnswer),"synthetic pending answer");
  const before=requests.filter(x=>x.url==="/api/cloud/state").length;
  await page.getByRole("button",{name:"↓ Carregar progresso online",exact:true}).click();
  assert.equal(requests.filter(x=>x.url==="/api/cloud/state").length,before);await closeContext(context);
  console.log("PASS F7 delayed response and assessment: new completed work and an unfinished answer are never replaced");

  context=await browser.newContext();await account(context,"A");page=await open(context);
  const localOriginal={schema:"aplus-student-state-v8",...state(55),missionHistory:{},examHistory:[{id:"retained-local-exam",score20:16}]};
  const raw="  "+JSON.stringify(localOriginal)+"  ";await page.evaluate(value=>{localStorage.setItem("a25",value);mountLocalRecovery();},raw);
  await page.getByRole("button",{name:"Tentar novamente",exact:true}).waitFor();
  await page.getByRole("button",{name:"Ir para o início",exact:true}).waitFor();
  const localExport=await downloaded(page,()=>page.getByRole("button",{name:"Exportar progresso local original",exact:true}).click());
  assert.equal(localExport.records.find(x=>x.key==="a25").raw,raw);
  await page.locator('input[type="file"]').setInputFiles({name:"local-reviewed.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify({...localOriginal,missionHistory:[]}))});
  await page.getByRole("button",{name:"Confirmar recuperação local",exact:true}).click();await page.waitForLoadState();await page.waitForFunction(()=>window.f7&&JSON.parse(localStorage.getItem("a25")).missionHistory instanceof Array);
  assert.ok(await page.evaluate(value=>f7.recovery.listCloudOriginals().some(x=>x.local?.records?.some(row=>row.raw===value)),raw));await closeContext(context);
  console.log("PASS F7 local recovery: raw bytes, XP and grades retained; corrected file applied only after export and confirmation");

  context=await browser.newContext();await account(context,"A");const a=await open(context);
  await a.evaluate(async()=>{const f=f7;window.proof=await f.f5Accounts.openVerifiedAccount();f.f5Workspace.selectAccountWorkspace(proof);window.owned=f.f5Accounts.newAccountState({xp:123,scores:{},subjectProgress:{},missionHistory:[],examHistory:[]},proof);f.f5Persistence.saveLocalState(owned);f.f5Reliability.queueCloudSave(owned,{accountContext:proof});f.recovery.preserveCloudOriginals({local:owned,remote:{answers:["synthetic A answer"]}});localStorage.setItem("a25-cloud-pending-v1",'[{"state":{"xp":444}}]');});
  const rawA=await a.evaluate(()=>Object.fromEntries(Object.entries(localStorage).filter(([k])=>k.includes("a25-cloud-pending")||k.includes("a25-cloud-recovery"))));
  await a.evaluate(()=>f7.f5Cloud.cloudSignOut());await account(context,"B");const b=await open(context);
  await b.evaluate(async()=>{const f=f7;window.proof=await f.f5Accounts.openVerifiedAccount();f.f5Workspace.selectAccountWorkspace(proof);window.owned=f.f5Accounts.newAccountState({xp:5,scores:{},subjectProgress:{},missionHistory:[],examHistory:[]},proof);});
  assert.equal(await b.evaluate(()=>f7.recovery.listCloudOriginals().length),0);
  assert.ok(await b.evaluate(()=>f7.f5Reliability.listPendingCloudSaves(proof).every(x=>x.quarantined)));
  rows.delete("B");await b.evaluate(()=>f7.f5Cloud.saveStudentCloudState(owned,{accountContext:proof}));assert.equal(rows.get("B").state_json.xp,5);
  assert.equal(await a.evaluate(async()=>{try{await f7.f5Cloud.saveStudentCloudState(owned,{accountContext:proof});return false;}catch{return true;}}),true);
  const preserved=await b.evaluate(()=>Object.fromEntries(Object.entries(localStorage)));
  for(const [key,value] of Object.entries(rawA))assert.equal(preserved[key],value);
  await account(context,"A");const resumed=await open(context);rows.set("A",invalid());
  assert.equal(await resumed.evaluate(async()=>{const f=f7;const proof=await f.f5Accounts.openVerifiedAccount();f.f5Workspace.selectAccountWorkspace(proof);try{await f.f5Cloud.loadStudentCloudState({accountContext:proof});return false;}catch{return f.recovery.listCloudOriginals().length===1;}}),true);
  assert.equal(rows.get("B").state_json.xp,5);await closeContext(context);
  console.log("PASS F5 compatibility at "+F5+": real client/queue/workspace modules, A/B tabs, quarantine, same-account resume and account-scoped F7 archives; no A state enters B and no Data API fallback bypasses F7");
}finally{
  releaseRead?.();await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));serverBundle.close();globalThis.fetch=previousFetch;delete globalThis.__f6Fixture;
  for(const [name,value] of [["NEON_AUTH_BASE_URL",previousEnv.url],["NEON_AUTH_COOKIE_SECRET",previousEnv.secret]])if(value===undefined)delete process.env[name];else process.env[name]=value;
}
