import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {confirmedBrowserReload} from '../helpers/confirmedBrowserReload.mjs';
const source=fileURLToPath(new URL('../../',import.meta.url));
const root=process.env.P1_EVIDENCE_DIR||'/tmp/p1-recovery-evidence';
await mkdir(root,{recursive:true});
const require=createRequire(import.meta.url);
const {build}=require('esbuild');
const {chromium}=await import(process.env.F7_PLAYWRIGHT_MODULE||require.resolve('playwright'));
const {realNeonAuthFixture}=await import('../helpers/neonAuthSdkFixture.mjs');
const {assertRequestAccount}=await import(pathToFileURL(source+'/app/lib/server/account-binding.js'));
const compiled=await build({absWorkingDir:source,entryPoints:['tests/fixtures/recoveryAuthorizationBrowserEntry.jsx'],outfile:source+'/bundle.js',bundle:true,write:false,format:'iife',platform:'browser',loader:{'.js':'jsx','.css':'empty'},jsx:'automatic',logLevel:'silent',define:{'process.env.NEXT_PUBLIC_NEON_AUTH_URL':'"https://auth.example.invalid"','process.env.NEXT_PUBLIC_NEON_DATA_API_URL':'"https://data.example.invalid"'},plugins:[{name:'synthetic-transports-and-next-loader',setup(b){
 b.onResolve({filter:/^next\/dynamic$/},()=>({path:'dynamic',namespace:'probe'}));
 b.onResolve({filter:/^@neondatabase\/neon-js/},a=>({path:a.path,namespace:'probe'}));
 b.onLoad({filter:/.*/,namespace:'probe'},a=>({loader:'jsx',contents:a.path==='dynamic'?`import React,{lazy,Suspense} from 'react';export default function dynamic(loader){const Component=lazy(async()=>{const value=await loader();return typeof value==='function'?{default:value}:value;});return props=><Suspense fallback={null}><Component {...props}/></Suspense>;}`:a.path.endsWith('adapters')?'export const BetterAuthReactAdapter=()=>({});':a.path.endsWith('/auth')?`export const createInternalNeonAuth=()=>({adapter:{signIn:{email:async value=>(await fetch('/fixture/login',{method:'POST',body:JSON.stringify(value)})).json()},signOut:async()=>fetch('/fixture/logout',{method:'POST'}),getSession:async()=>({data:await(await fetch('/api/auth/session')).json()})}});`:`export const createClient=()=>{throw Error('Data API forbidden in this probe')};`,resolveDir:source}));
 }}]}).catch(error=>{console.error(error.errors.map(x=>({text:x.text,location:x.location?.file})));throw error;});
const rows=new Map(),history=[];
const authFixture=globalThis.__f6Fixture={headers:new Headers(),cookieWrites:[],sqlCalls:[],sqlReply:async(sql,values)=>{
 if(sql.includes('select state_json'))return rows.has(values[0])?[structuredClone(rows.get(values[0]))]:[];
 if(sql.includes('update public.student_cloud_state')){const [json,device,owner,revision]=values,old=rows.get(owner);if(old?.revision!==revision)return [];history.push(structuredClone(old));const row={revision:revision+1,state_json:JSON.parse(json),last_device_id:device};rows.set(owner,row);return [row];}
 if(sql.includes('insert into public.student_cloud_state')){if(rows.has(values[0]))return [];const row={revision:1,state_json:JSON.parse(values[1])};rows.set(values[0],row);return [row];}
 return [];
}};
const env={base:process.env.NEON_AUTH_BASE_URL,secret:process.env.NEON_AUTH_COOKIE_SECRET};
process.env.NEON_AUTH_BASE_URL='https://auth.example.invalid';process.env.NEON_AUTH_COOKIE_SECRET='integration-synthetic-cookie-material-only';
const originalFetch=globalThis.fetch;let unavailable=false,expired=false,revoked=false,holdAuth=null,releaseAuth=null,authHit=0,holdIndex=0;
globalThis.fetch=async(url,options={})=>{
 assert.equal(new URL(url).origin,'https://auth.example.invalid');
 if(unavailable)throw Error('synthetic provider unavailable');
 const subject=/__Secure-neon-auth\.session_token=([^;]+)/.exec(new Headers(options.headers).get('cookie')||'')?.[1];
 const now=new Date().toISOString();return Response.json(subject&&!revoked?{user:{id:subject,createdAt:now,updatedAt:now},session:{id:'synthetic-'+subject,userId:subject,expiresAt:new Date(Date.now()+(expired?-1000:3600000)).toISOString(),createdAt:now,updatedAt:now}}:{user:null,session:null});
};
const sdkFixture=await realNeonAuthFixture(),app=sdkFixture.load(),requests=[];
const server=createServer(async(req,res)=>{
 if(req.url==='/bundle.js'){res.setHeader('content-type','text/javascript');res.end(compiled.outputFiles[0].text);return;}
 if(req.url?.startsWith('/?')||req.url==='/'){res.end('<!doctype html><meta charset="utf-8"><title>Synthetic integration isolation probe</title><script src="/bundle.js"></script>');return;}
 if(req.url==='/fixture/login'){const chunks=[];for await(const chunk of req)chunks.push(chunk);const value=JSON.parse(Buffer.concat(chunks));if(value.email!=='synthetic-a@example.invalid'||value.password!=='synthetic-browser-password'){res.writeHead(401);res.end('{}');return;}res.setHeader('set-cookie','synthetic-account=A; Path=/');res.setHeader('content-type','application/json');res.end('{"data":{"user":{"id":"A"}}}');return;}
 if(req.url==='/fixture/logout'){res.setHeader('set-cookie','synthetic-account=; Path=/; Max-Age=0');res.end('{}');return;}
 const subject=/synthetic-account=([^;]+)/.exec(req.headers.cookie||'')?.[1]||null;
 requests.push({url:req.url,subject,expected:req.headers['x-approva-account']||null,referer:req.headers.referer||null});
 try{
  assertRequestAccount(new Headers(req.headers),subject);
  authFixture.headers=new Headers({...req.headers,cookie:subject?'__Secure-neon-auth.session_token='+subject:''});
  if(req.url==='/api/auth/session'){const result=await app.identity.requireSession();if(holdAuth&&++authHit===holdIndex){const signal=holdAuth;holdAuth=null;await new Promise(resolve=>{releaseAuth=resolve;signal();});}res.setHeader('content-type','application/json');res.end(JSON.stringify({ok:true,user:result.user}));return;}
  if(req.url.startsWith('/api/cloud/state')){
   const chunks=[];for await(const chunk of req)chunks.push(chunk);
   const request=new Request('http://127.0.0.1:'+server.address().port+req.url,{method:req.method,headers:req.headers,...(req.method==='POST'?{body:Buffer.concat(chunks)}:{})});
   const response=await app.cloud[req.method](request);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  res.writeHead(404,{'content-type':'application/json'});res.end('{"ok":false}');
 }catch(error){res.writeHead(error.status||401,{'content-type':'application/json'});res.end('{"ok":false}');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const origin='http://127.0.0.1:'+server.address().port;
const browser=await chromium.launch({headless:true,...(process.env.F7_CHROMIUM_PATH?{executablePath:process.env.F7_CHROMIUM_PATH}:{}),args:['--no-sandbox']});
const pageErrors=[];
async function open(context,label){const page=await context.newPage();page.on('pageerror',error=>pageErrors.push({label,message:error.message}));await page.goto(origin+'/?case='+label);await page.waitForFunction(()=>window.probe);return page;}
async function account(context,subject){await context.addCookies([{name:'synthetic-account',value:subject,url:origin}]);}
// A real second tab may publish the same newly verified identity first. A
// cancelled proof must be re-requested rather than reused after its epoch.
async function verified(page,subject){await page.waitForFunction(async expected=>{try{return (await probe.accounts.openVerifiedAccount({expectedAccountId:expected})).subject===expected;}catch{return false;}},subject,{timeout:5000});}
async function download(page,button){const future=page.waitForEvent('download');await button.click();const result=await future;return JSON.parse(await readFile(await result.path(),'utf8'));}
try{
 const ctx=await browser.newContext();await account(ctx,'A');const a=await open(ctx,'malformed-A');
 const stateA={cloudAccount:{version:1,accountId:'A'},xp:123,goal:15,profile:{schoolYear:'12.º'},scores:{},missionHistory:{},examHistory:[{id:'synthetic-exam-A',score20:14,answers:['synthetic-A-answer']}],subjectProgress:{portuguese:{version:4,lastPosition:{sessionId:'synthetic-unfinished-A',currentAnswer:'synthetic-A-unsubmitted-answer'}}},_savedAt:1};
 const rawA=JSON.stringify(stateA);
 await a.evaluate(raw=>{localStorage.setItem(probe.workspace.accountStorageKey('a25','A'),raw);mountActualApp();},rawA);
 const exportButton=a.getByRole('button',{name:'Exportar progresso local original',exact:true});await exportButton.waitFor();
 assert.equal(await a.evaluate(()=>probe.workspace.workspaceAccountId()),'A');
 const own=await download(a,exportButton);assert.equal(own.records.find(x=>x.key==='a25').raw,rawA);
 await a.locator('input[type="file"]').setInputFiles({name:'owned-pending-reviewed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...own,repairedState:{...stateA,missionHistory:[]}}))});
 await a.getByRole('button',{name:'Confirmar recuperação local',exact:true}).click();
 await a.getByText('Recuperação bloqueada.',{exact:false}).waitFor();
 assert.equal(await a.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','A'))),rawA);
 console.log('PASS control: actual auto-merged App reaches F7 local recovery after malformed A hydration; authenticated A can export its exact original');
 const b=await open(ctx,'account-change-B');await b.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(ctx,'B');
 assert.equal(await b.evaluate(async()=>{const context=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(context);return context.subject;}),'B');
 const rawB=JSON.stringify({cloudAccount:{version:1,accountId:'B'},xp:5,scores:{},missionHistory:[],examHistory:[]});
 await b.evaluate(raw=>localStorage.setItem(probe.workspace.accountStorageKey('a25','B'),raw),rawB);
 await a.bringToFront();
 await a.getByText('Confirma a conta para continuar.',{exact:true}).waitFor();
 assert.equal(await exportButton.count(),0);
 const denied=await a.evaluate(async()=>{
  let reads=0,urls=0,called=0;const get=Storage.prototype.getItem,create=URL.createObjectURL;
  Storage.prototype.getItem=function(key){if(key.startsWith('a25-account-v1:A:'))reads++;return get.call(this,key);};
  URL.createObjectURL=function(...args){urls++;return create.apply(this,args);};
  const attempts={};
  for(const [name,run] of Object.entries({read:()=>probe.recovery.readLocalRecoveryOriginals(),list:()=>probe.recovery.listCloudOriginals(),server:()=>probe.recovery.readServerRecoveryOriginal('A'),forged:()=>probe.recovery.downloadRecoveryJson({accountId:'A',records:[]}),alternative:()=>probe.recovery.downloadWorkspaceJson(()=>{called++;return {xp:123};},'blocked.json')})){
   try{await run();attempts[name]='UNSAFE';}catch(error){attempts[name]=error.code;}
  }
  Storage.prototype.getItem=get;URL.createObjectURL=create;return {reads,urls,called,attempts};
 });
 assert.equal(denied.reads,0);assert.equal(denied.urls,0);assert.equal(denied.called,0);assert.ok(Object.values(denied.attempts).every(value=>value&&value!=='UNSAFE'));
 assert.equal(await b.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','B'))),rawB);
 assert.equal(await b.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','A'))),rawA); // Explicit architecture limit: raw shared storage remains plaintext.
 assert.equal(await a.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','A'))),rawA);
 console.log('PASS P1 negative: same App/error path locks after A/logout/B; direct reads, list, server export, forged JSON and alternate download deny before storage/Blob access');
 await a.screenshot({path:root+'/fixed-recovery-after-account-B.png',fullPage:true});
 // A returns legitimately; the account namespace never changes in the old tab.
 await b.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(ctx,'A');await verified(b,'A');
 await a.bringToFront();await exportButton.waitFor();
 const restored=await download(a,exportButton);assert.equal(restored.records.find(row=>row.key==='a25').raw,rawA);
 const ownedBackup=await a.evaluate(async()=>{const copies=await probe.recovery.listCloudOriginals();const own=copies.find(copy=>!copy.quarantined);const record=await probe.recovery.readCloudOriginal(own);return record.accountId;});assert.equal(ownedBackup,'A');
 console.log('PASS P1 positive: legitimate A login restores access to its exact XP, grade and unfinished answer; newly owned backups remain readable');
 // Unknown and legacy data remain untouched and cannot acquire an owner from
 // a request identifier. Stored v1 backup contents are never returned.
 const legacy=' {"xp":777,"answers":["synthetic unknown legacy"]} ';
 await a.evaluate(raw=>{localStorage.setItem('a25',raw);localStorage.setItem('a25-account-v1:A:a25-cloud-recovery-v1:unknown',raw);},legacy);
 const quarantine=await a.evaluate(async()=>{const list=await probe.recovery.listCloudOriginals();const old=list.find(x=>x.quarantined);let denied=false;try{await probe.recovery.downloadRecoveryJson(old);}catch{denied=true;}return {old,denied,raw:localStorage.getItem('a25')};});
 assert.equal(quarantine.raw,legacy);assert.equal(quarantine.denied,true);assert.equal(quarantine.old.local,undefined);assert.equal(quarantine.old.remote,undefined);
 console.log('PASS legacy quarantine: global and v1 originals are not read, adopted, downloaded or deleted');
 for(const fault of ['unavailable','expired','revoked']){
  if(fault==='unavailable')unavailable=true;if(fault==='expired')expired=true;if(fault==='revoked')revoked=true;
  assert.equal(await a.evaluate(async()=>{try{await probe.recovery.readLocalRecoveryOriginals();return false;}catch{return true;}}),true);
  unavailable=false;expired=false;revoked=false;
 }
 assert.equal(await a.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','A'))),rawA);
 console.log('PASS fail closed: provider/network failure, expiry and revocation deny reads and preserve originals');
 // Hold the post-read fresh authorization, then change the session in a real
 // second tab. Neither a late original nor a Blob may escape.
 const race=await open(ctx,'race-A');await race.evaluate(async()=>{const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);});
 authHit=0;holdIndex=2;const started=new Promise(resolve=>{holdAuth=resolve;});
 const pending=race.evaluate(async()=>{let urls=0;const old=URL.createObjectURL;URL.createObjectURL=(...args)=>{urls++;return old(...args);};try{const data=await probe.recovery.readLocalRecoveryOriginals();await probe.recovery.downloadRecoveryJson(data);return {unsafe:true,urls};}catch(error){return {unsafe:false,urls,code:error.code};}finally{URL.createObjectURL=old;}});
 await started;await b.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(ctx,'B');await verified(b,'B');releaseAuth();
 const late=await pending;assert.equal(late.unsafe,false);assert.equal(late.urls,0);
 console.log('PASS in-flight export: account epoch and session change suppress the held response before any download');
 // A cookie can change without a cooperating tab emitting an epoch. Fresh
 // verification after the first response must still prevent releasing data.
 await account(ctx,'A');const silent=await open(ctx,'silent-race-A');
 await silent.evaluate(async()=>{const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);});
 authHit=0;holdIndex=1;const silentStarted=new Promise(resolve=>{holdAuth=resolve;});
 const silentPending=silent.evaluate(async()=>{let urls=0;const old=URL.createObjectURL;URL.createObjectURL=(...args)=>{urls++;return old(...args);};try{const value=await probe.recovery.readLocalRecoveryOriginals();await probe.recovery.downloadRecoveryJson(value);return {unsafe:true,urls};}catch{return {unsafe:false,urls};}finally{URL.createObjectURL=old;}});
 await silentStarted;await account(ctx,'B');releaseAuth();
 assert.deepEqual(await silentPending,{unsafe:false,urls:0});
 await account(ctx,'A');
 await silent.route('**/api/auth/session',route=>route.abort('internetdisconnected'));
 assert.equal(await silent.evaluate(async()=>{try{await probe.recovery.readLocalRecoveryOriginals();return false;}catch{return true;}}),true);
 await silent.unroute('**/api/auth/session');
 console.log('PASS silent cookie change and actual network abort: no epoch event is required to deny recovery or download');
 await ctx.close();
 // Positive guard control using the same literal App and normal hydration.
 const control=await browser.newContext();await account(control,'A');const normal=await open(control,'valid-A-control');
 await normal.evaluate(()=>mountActualApp());
 await normal.waitForFunction(()=>probe.workspace.workspaceAccountId()==='A');
 await normal.waitForFunction(()=>JSON.parse(localStorage.getItem('a25-ws-v2:acct:A:a25')||'null')?.cloudAccount?.accountId==='A');
 const other=await open(control,'B-control');await other.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(control,'B');
 assert.equal(await other.evaluate(async()=>{const context=await probe.accounts.openVerifiedAccount();return context.subject;}),'B');
 await normal.bringToFront();await normal.getByText('Confirma a conta para continuar.',{exact:true}).waitFor();
 console.log('PASS positive control: the same actual App locks on A->B when hydration succeeds');await control.close();
 assert.deepEqual(pageErrors,[]);
 // Actual local file recovery: fail closed on provider failure and account
 // change while the first authorization response is held; then resume as A.
 const recoveryContext=await browser.newContext();await account(recoveryContext,'A');const localPage=await open(recoveryContext,'local-repair-A');
 const repairState={cloudAccount:{version:1,accountId:'A'},schema:'aplus-student-state-v8',xp:55,profile:{schoolYear:'12.º'},scores:{},missionHistory:{},examHistory:[{id:'old-grade',score20:16,answers:['synthetic retained answer']}],subjectProgress:{}};
 const repairRaw='  '+JSON.stringify(repairState)+'  ';
 await localPage.evaluate(async raw=>{const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);localStorage.setItem(probe.workspace.accountStorageKey('a25'),raw);mountLocalRecovery();},repairRaw);
 let localBundle=await download(localPage,localPage.getByRole('button',{name:'Exportar progresso local original',exact:true}));
 const choose=async bundle=>localPage.locator('input[type="file"]').setInputFiles({name:'owned-reviewed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...bundle,repairedState:{...repairState,missionHistory:[]}}))});
 await choose(localBundle);await localPage.getByRole('button',{name:'Confirmar recuperação local',exact:true}).waitFor();
 unavailable=true;await localPage.getByRole('button',{name:'Confirmar recuperação local',exact:true}).click();await localPage.getByText('Recuperação bloqueada.',{exact:false}).waitFor();unavailable=false;
 assert.equal(await localPage.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25'))),repairRaw);
 authHit=0;holdIndex=1;const repairStarted=new Promise(resolve=>{holdAuth=resolve;});await localPage.getByRole('button',{name:'Confirmar recuperação local',exact:true}).click();await repairStarted;
 const change=await open(recoveryContext,'repair-B');await change.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(recoveryContext,'B');await change.evaluate(()=>probe.accounts.openVerifiedAccount());releaseAuth();
 await localPage.waitForFunction(()=>[...document.querySelectorAll('button')].some(button=>/Verificar conta e exportar|Exportar progresso local original/.test(button.textContent)&&!button.disabled));
 assert.equal(await localPage.evaluate(()=>localStorage.getItem(probe.workspace.accountStorageKey('a25','A'))),repairRaw);
 await change.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(recoveryContext,'A');await change.evaluate(()=>probe.accounts.openVerifiedAccount());
 localBundle=await download(localPage,localPage.getByRole('button',{name:/Verificar conta e exportar|Exportar progresso local original/}));await choose(localBundle);
 await confirmedBrowserReload(localPage,
  ()=>localPage.getByRole('button',{name:'Confirmar recuperação local',exact:true}).click(),
  ()=>window.probe&&Array.isArray(JSON.parse(localStorage.getItem('a25-account-v1:A:a25')).missionHistory));
 const recovered=await localPage.evaluate(async()=>{const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);const records=await probe.recovery.listCloudOriginals();const originals=[];for(const item of records)if(!item.quarantined)originals.push(await probe.recovery.readCloudOriginal(item));return {state:JSON.parse(localStorage.getItem(probe.workspace.accountStorageKey('a25'))),originals};});
 assert.equal(recovered.state.xp,55);assert.deepEqual(recovered.state.examHistory,repairState.examHistory);assert.ok(recovered.originals.some(entry=>entry.local?.records?.some(row=>row.raw===repairRaw)));await recoveryContext.close();
 console.log('PASS actual local repair: auth outage and in-flight A->B cannot write; A re-authenticates and repairs a reviewed envelope with exact raw original, XP, grade and answers retained');
 // Actual cloud recovery with the real route/store/validator and synthetic SQL.
 const cloudContext=await browser.newContext();await account(cloudContext,'A');const cloudPage=await open(cloudContext,'cloud-repair-A');
 const remote={revision:2,state_json:{schema:'aplus-student-state-v8',xp:37,scores:{},missionHistory:{},examHistory:[{id:'cloud-old-exam',score20:14}],lastExam:{id:'cloud-old-exam',answers:['synthetic historical private answer']}}};rows.set('A',structuredClone(remote));
 await cloudPage.evaluate(async()=>{const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);mountCloudRecovery({cloudAccount:{version:1,accountId:'A'},xp:20,goal:15,profile:{schoolYear:'12.º'},scores:{},missionHistory:[],examHistory:[],subjectProgress:{}});});
 const cloudBundle=await download(cloudPage,cloudPage.getByRole('button',{name:'Exportar snapshot original',exact:true}));assert.deepEqual(cloudBundle.data,remote);
 const repaired=structuredClone(cloudBundle);repaired.data.state_json.missionHistory=[];
 await cloudPage.locator('input[type="file"]').setInputFiles({name:'cloud-reviewed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(repaired))});
 await cloudPage.getByText('Revisei a cópia e confirmo a combinação.',{exact:false}).locator('..').locator('input[type="checkbox"]').check();
 await cloudPage.getByRole('button',{name:'Recuperar cópia validada',exact:true}).click();await cloudPage.waitForFunction(()=>cloudRecovered.xp===37);
 assert.equal(rows.get('A').revision,3);assert.deepEqual(history.at(-1),remote);assert.equal(JSON.stringify(rows.get('A').state_json).includes('synthetic historical private answer'),false);
 const cloudB=await open(cloudContext,'cloud-export-B');await cloudB.evaluate(()=>probe.f5Cloud.cloudSignOut());await account(cloudContext,'B');await cloudB.evaluate(async()=>{const context=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(context);});
 const beforeSql=authFixture.sqlCalls.length;assert.equal(await cloudB.evaluate(async()=>{try{await probe.recovery.readServerRecoveryOriginal('A');return false;}catch{return true;}}),true);assert.equal(authFixture.sqlCalls.length,beforeSql);await cloudContext.close();
 console.log('PASS actual cloud repair: authenticated owner, reviewed digest/CAS, exact OLD history, private answer exclusion, and B cannot claim A via an accountId');
 // The standalone validation export used to read a global answers key. A
 // fresh B workspace must never adopt that old array or A's scoped dataset.
 const graderContext=await browser.newContext();await account(graderContext,'A');const graderA=await open(graderContext,'grader-A');
 const graderRaw=await graderA.evaluate(async()=>{
  const proof=await probe.accounts.openVerifiedAccount();probe.workspace.selectAccountWorkspace(proof);
  const row=probe.validation.makeGraderValidationCase({subject:'portuguese',itemId:'synthetic-owned-validation',response:'synthetic private validation A',question:'Synthetic only',occurredAt:1});
  const raw=JSON.stringify([row]);localStorage.setItem(probe.validation.GRADER_VALIDATION_STORAGE_KEY,raw);
  if(!probe.validation.appendClosedBetaValidationCase(row,{consent:true}).ok)throw Error('Owned validation fixture failed');
  mountGraderConsent();return raw;
 });
 const graderButton=graderA.getByRole('button',{name:'Exportar respostas para validação',exact:true});await graderButton.waitFor();
 const graderOwn=await download(graderA,graderButton);assert.equal(graderOwn.cases[0].student_response,'synthetic private validation A');
 let foreignGraderDownloads=0;graderA.on('download',()=>foreignGraderDownloads++);
 await account(graderContext,'B');
 const rejectedExport=graderA.waitForResponse(response=>new URL(response.url()).pathname==='/api/auth/session'&&response.status()===403);
 await graderA.evaluate(()=>{document.querySelectorAll('button').forEach(button=>{if(button.textContent==='Exportar respostas para validação')button.click();});});
 await (await rejectedExport).finished();assert.equal(foreignGraderDownloads,0);
 const graderB=await open(graderContext,'grader-B');await graderB.evaluate(()=>mountGraderConsent());
 await graderB.getByRole('heading',{name:'Ajuda-nos a validar o corretor',exact:true}).waitFor();
 assert.equal(await graderB.getByRole('button',{name:'Exportar respostas para validação',exact:true}).count(),0);
 assert.equal(await graderB.evaluate(()=>localStorage.getItem(probe.validation.GRADER_VALIDATION_STORAGE_KEY)),graderRaw);
 assert.equal(await graderB.evaluate(()=>probe.validation.loadLocalValidationDataset().length),0);
 await graderA.bringToFront();await graderA.getByText('Confirma a conta para aceder às respostas guardadas.',{exact:true}).waitFor();
 await account(graderContext,'A');await graderA.evaluate(()=>window.dispatchEvent(new Event('focus')));await graderButton.waitFor();
 const resumedGrader=await download(graderA,graderButton);assert.deepEqual(resumedGrader.cases,graderOwn.cases);await graderContext.close();
 console.log('PASS alternate actual validation UI: silent B cookie cannot download A responses; new B cannot adopt global legacy data; legitimate A retains exact answers');
 // The fail-closed initial gate must still provide a legitimate sign-in path
 // using only the empty initial model, never the previous account's state.
 const loginContext=await browser.newContext(),seed=await open(loginContext,'signed-out-seed');
 await seed.evaluate(raw=>localStorage.setItem(probe.workspace.accountStorageKey('a25','A'),raw),rawA);
 await loginContext.addInitScript(()=>{window.preAuthAcademicReads=0;const get=Storage.prototype.getItem;Storage.prototype.getItem=function(key){if(/^a25-account-v1:.*:(a25|a25-friends-beta|a25-active-session-v1)$/.test(key))window.preAuthAcademicReads++;return get.call(this,key);};});
 const signedOut=await open(loginContext,'auth-reentry');
 await signedOut.getByText('Confirma a sessão para recuperar o progresso.',{exact:true}).waitFor();
 assert.equal(await signedOut.getByRole('button',{name:'Exportar progresso local original',exact:true}).count(),0);
 assert.equal(await signedOut.evaluate(()=>probe.workspace.workspaceAccountId()),null);
 assert.equal(await signedOut.evaluate(()=>window.preAuthAcademicReads),0);
 await signedOut.locator('input[type="email"]').fill('synthetic-a@example.invalid');
 await signedOut.locator('input[type="password"]').fill('synthetic-browser-password');
 await confirmedBrowserReload(signedOut,
  ()=>signedOut.getByRole('button',{name:'Entrar',exact:true}).last().click(),
  ()=>window.probe?.workspace.workspaceAccountId()==='A');
 const recoveredLogin=await download(signedOut,signedOut.getByRole('button',{name:'Exportar progresso local original',exact:true}));
 assert.equal(recoveredLogin.records.find(row=>row.key==='a25').raw,rawA);await loginContext.close();
 console.log('PASS legitimate sign-in through actual AccountCloud: no workspace or academic read before authentication; verified A recovers its exact unfinished state after login and reload');
 assert.deepEqual(pageErrors,[]);
 const result={result:'P1_FIXED_BROWSER_CONTRACT_PASS',localRepairPassed:true,cloudRepairPassed:true,plaintextStorageReadableFromBOutsideApplication:true,sourceCommits:['2c42b6699ffb12c7d599e1603d4ead4680cd1767','3e6e8e9b4477f1e3bd50ab3c996e264bfed5370a'],foreignReadsDenied:true,foreignDownloadDenied:true,forgedIdentifierDenied:true,legacyQuarantined:true,unavailableExpiredRevokedDenied:true,lateResponseDenied:true,silentCookieChangeDenied:true,networkAbortDenied:true,legitimateARecovery:true,originalAUnchanged:true,accountBUnchanged:true,normalHydrationGuardLocks:true,sqlCalls:authFixture.sqlCalls.length,pageErrors};
 await writeFile(root+'/p1-browser-evidence.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}finally{
 releaseAuth?.();await browser.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));sdkFixture.close();globalThis.fetch=originalFetch;
 if(env.base===undefined)delete process.env.NEON_AUTH_BASE_URL;else process.env.NEON_AUTH_BASE_URL=env.base;
 if(env.secret===undefined)delete process.env.NEON_AUTH_COOKIE_SECRET;else process.env.NEON_AUTH_COOKIE_SECRET=env.secret;
}
