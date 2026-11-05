// Provas Chromium P1-B e P1-C da auditoria independente da #459, em modo com
// contas (F5): componentes reais da app, servidor de sessão sintético por
// cookie, sem rede externa e sem base de dados. Dados exclusivamente sintéticos.
//
//   node tests/scripts/p1-audit-account-browser-contract.mjs
//   P1_SOURCE_ROOT=<árvore em teste> ...  (por omissão: diretório atual)
//
// Para reproduzir os defeitos, apontar P1_SOURCE_ROOT para o SHA original: os
// cenários marcados [P1-B]/[P1-C] têm de falhar lá e passar na correção.
import assert from "node:assert/strict";
import {createServer} from "node:http";
import {createRequire} from "node:module";
import path from "node:path";
import {pathToFileURL,fileURLToPath} from "node:url";

const here=fileURLToPath(new URL("../../",import.meta.url));
const SOURCE=path.resolve(process.env.P1_SOURCE_ROOT||process.cwd());
const require=createRequire(import.meta.url);
const {build}=require("esbuild");
const playwright=await import(process.env.P1_PLAYWRIGHT_MODULE||require.resolve("playwright"));
const chromium=playwright.chromium||playwright.default?.chromium;
const {assertRequestAccount}=await import(pathToFileURL(path.join(SOURCE,"app/lib/server/account-binding.js")));

const compiled=await build({absWorkingDir:SOURCE,entryPoints:[path.join(here,"tests/fixtures/p1AuditAccountBrowserEntry.jsx")],outfile:path.join(SOURCE,"p1-audit-bundle.js"),bundle:true,write:false,format:"iife",platform:"browser",
  loader:{".js":"jsx",".css":"empty"},jsx:"automatic",logLevel:"silent",nodePaths:[path.join(SOURCE,"node_modules")],
  define:{"process.env.NEXT_PUBLIC_NEON_AUTH_URL":'"https://auth.example.invalid"',"process.env.NEXT_PUBLIC_NEON_DATA_API_URL":'"https://data.example.invalid"',"process.env.NODE_ENV":'"production"'},
  plugins:[{name:"p1-audit-synthetic",setup(b){
    b.onResolve({filter:/^(app|content)\//},args=>({path:path.join(SOURCE,args.path)}));
    b.onResolve({filter:/^next\/dynamic$/},()=>({path:"dynamic",namespace:"probe"}));
    b.onResolve({filter:/^@neondatabase\/neon-js/},args=>({path:args.path,namespace:"probe"}));
    b.onLoad({filter:/.*/,namespace:"probe"},args=>({loader:"jsx",resolveDir:SOURCE,contents:args.path==="dynamic"
      ?"import React,{lazy,Suspense} from 'react';export default function dynamic(loader){const Component=lazy(async()=>{const value=await loader();return typeof value==='function'?{default:value}:value;});return props=><Suspense fallback={null}><Component {...props}/></Suspense>;}"
      :args.path.endsWith("adapters")?"export const BetterAuthReactAdapter=()=>({});"
      :args.path.endsWith("/auth")?"export const createInternalNeonAuth=()=>({adapter:{signOut:async()=>fetch('/fixture/logout',{method:'POST'}),getSession:async()=>({data:await(await fetch('/api/auth/session')).json()})}});"
      :"export const createClient=()=>{throw Error('Data API forbidden in this probe')};"}));
  }}]});
const bundle=compiled.outputFiles.find(file=>file.path.endsWith(".js")).text; // nunca escrito em disco

const server=createServer((req,res)=>{
  const send=(body,status=200)=>{res.writeHead(status,{"Content-Type":"application/json","Cache-Control":"no-store"});res.end(JSON.stringify(body));};
  const user=/synthetic-account=([^;]+)/.exec(req.headers.cookie||"")?.[1]||null;
  if(req.url==="/bundle.js"){res.writeHead(200,{"Content-Type":"text/javascript"});res.end(bundle);return;}
  if(req.url==="/"||req.url.startsWith("/?")){res.writeHead(200,{"Content-Type":"text/html"});res.end('<!doctype html><meta charset="utf-8"><title>P1 audit synthetic fixture</title><script src="/bundle.js"></script>');return;}
  if(req.url==="/fixture/logout"){res.writeHead(200,{"Set-Cookie":"synthetic-account=; Max-Age=0; Path=/"});res.end("{}");return;}
  try{assertRequestAccount(new Headers(req.headers),user);}catch{send({ok:false},403);return;}
  if(req.url==="/api/auth/session"){send(user?{ok:true,user:{id:user}}:{ok:false},user?200:401);return;}
  if(req.url.startsWith("/api/cloud/state")){send({ok:true,data:null});return;}
  send({ok:false},404);
});
await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
const origin=`http://127.0.0.1:${server.address().port}`;
const browser=await chromium.launch({headless:true,...(process.env.P1_CHROMIUM_PATH?{executablePath:process.env.P1_CHROMIUM_PATH}:{}),args:["--no-sandbox"]});
const results=[],pageErrors=[];
async function scenario(name,fn){
  try{await fn();results.push({name,ok:true});console.log("PASS "+name);}
  catch(error){results.push({name,ok:false,error:String(error?.message||error).split("\n")[0]});console.log("FAIL "+name+" :: "+String(error?.message||error).split("\n")[0]);}
}
const signIn=(context,id)=>id?context.addCookies([{name:"synthetic-account",value:id,url:origin}]):context.clearCookies();
async function open(context,label){
  const page=await context.newPage();
  page.on("pageerror",error=>pageErrors.push({label,message:error.message}));
  await page.goto(origin+"/?case="+encodeURIComponent(label));
  await page.waitForFunction(()=>window.probe&&window.mountActualApp);
  return page;
}
const dump=page=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
const visibleText=page=>page.evaluate(()=>document.body.innerText+" "+[...document.querySelectorAll("textarea,input")].map(x=>x.value).join(" "));
async function typeFirstOpenAnswer(page,text){
  await page.locator(".ptx-question-nav, textarea, .ptx-options").first().waitFor({timeout:20_000});
  for(let i=0;i<14&&!(await page.locator("textarea").count());i++){
    const next=page.getByRole("button",{name:/Seguinte|Próxima/}).first();
    if(!(await next.count()))break;
    await next.click();
  }
  await page.locator("textarea").first().fill(text);
  await page.waitForTimeout(400);
}
const keyWith=(stores,text)=>Object.keys(stores).filter(k=>stores[k].includes(text));

const ANSWER_A="RESPOSTA-SINTETICA-CONTA-A-7f3";
const ANSWER_B="RESPOSTA-SINTETICA-CONTA-B-9c1";
const ANSWER_LEGACY="RESPOSTA-SINTETICA-SEM-DONO-2d8";
const LEGACY_PROTOTYPE_KEY="applus:portuguese-prototype-draft:v1";

try{
  // ------------------------------------------------------------------ P1-B
  const ctx=await browser.newContext();
  let draftA=null;
  await scenario("[P1-B] A grava respostas do protótipo só na área de A",async()=>{
    await signIn(ctx,"A");
    const a=await open(ctx,"prototype-A");
    await a.evaluate(()=>mountPrototype());
    await typeFirstOpenAnswer(a,ANSWER_A);
    const stores=await dump(a);
    const keys=keyWith(stores,ANSWER_A);
    assert.deepEqual(keys,["a25-account-v1:A:applus:portuguese-prototype-draft:v2"],"chaves com a resposta de A: "+JSON.stringify(keys));
    draftA=stores[keys[0]];
    await a.evaluate(()=>probe.cloud.cloudSignOut());await a.close();
  });
  await scenario("[P1-B] B no mesmo dispositivo não vê nem herda as respostas de A",async()=>{
    await signIn(ctx,"B");
    const b=await open(ctx,"prototype-B");
    const before=await dump(b);
    await b.evaluate(()=>mountPrototype());
    await b.locator(".ptx-question-nav, textarea, .ptx-options").first().waitFor({timeout:20_000});
    await b.waitForTimeout(500);
    assert.ok(!(await visibleText(b)).includes(ANSWER_A),"resposta de A visível para B");
    await typeFirstOpenAnswer(b,ANSWER_B);
    const after=await dump(b);
    assert.deepEqual(keyWith(after,ANSWER_B),["a25-account-v1:B:applus:portuguese-prototype-draft:v2"]);
    for(const [key,value] of Object.entries(before))if(!key.includes("auth-epoch"))assert.equal(after[key],value,"B alterou "+key);
    await b.evaluate(()=>probe.cloud.cloudSignOut());await b.close();
  });
  await scenario("[P1-B] tentativa global antiga (sem dono) nunca é aberta e fica intacta",async()=>{
    assert.ok(draftA,"pré-condição: rascunho de A");
    const legacy=draftA.split(ANSWER_A).join(ANSWER_LEGACY);
    for(const id of ["A","B"]){
      await signIn(ctx,id);
      const page=await open(ctx,"prototype-legacy-"+id);
      await page.evaluate(([k,v])=>{if(localStorage.getItem(k)===null)localStorage.setItem(k,v)},[LEGACY_PROTOTYPE_KEY,legacy]);
      await page.evaluate(()=>mountPrototype());
      await page.locator("[data-prototype-legacy='preserved']").waitFor({timeout:20_000});
      const text=await visibleText(page);
      assert.ok(!text.includes(ANSWER_LEGACY),"tentativa sem dono mostrada a "+id);
      if(id==="A")assert.ok(text.includes(ANSWER_A),"A perdeu a sua própria tentativa");
      if(id==="B")assert.ok(text.includes(ANSWER_B)&&!text.includes(ANSWER_A),"B não recuperou só a sua tentativa");
      assert.equal(await page.evaluate(k=>localStorage.getItem(k),LEGACY_PROTOTYPE_KEY),legacy,"bytes antigos alterados");
      await page.evaluate(()=>probe.cloud.cloudSignOut());await page.close();
    }
  });
  await scenario("[P1-B] sem sessão comprovada: nada é lido nem gravado no dispositivo",async()=>{
    await signIn(ctx,null);
    const page=await open(ctx,"prototype-unverified");
    const before=await dump(page);
    await page.evaluate(()=>mountPrototype());
    await page.locator("[data-prototype-mode='unverified']").waitFor({timeout:20_000});
    const text=await visibleText(page);
    assert.ok(![ANSWER_A,ANSWER_B,ANSWER_LEGACY].some(x=>text.includes(x)),"respostas mostradas sem sessão");
    await typeFirstOpenAnswer(page,"RESPOSTA-SEM-SESSAO");
    const after=await dump(page);
    assert.deepEqual(keyWith(after,"RESPOSTA-SEM-SESSAO"),[]);
    for(const [key,value] of Object.entries(before))if(!key.includes("auth-epoch"))assert.equal(after[key],value);
    await page.close();
  });
  await scenario("[P1-B] troca de conta noutro separador bloqueia o protótipo aberto",async()=>{
    await signIn(ctx,"A");
    const a=await open(ctx,"prototype-switch-A");
    await a.evaluate(()=>mountPrototype());
    await a.locator("textarea, .ptx-options").first().waitFor({timeout:20_000});
    const other=await open(ctx,"prototype-switch-B");
    await other.evaluate(()=>probe.cloud.cloudSignOut());await signIn(ctx,"B");
    await other.evaluate(async()=>{await probe.accounts.openVerifiedAccount();});
    await a.bringToFront();await a.evaluate(()=>window.dispatchEvent(new Event("focus")));
    await a.locator("[data-prototype-mode='locked']").waitFor({timeout:20_000});
    assert.ok(!(await visibleText(a)).includes(ANSWER_A));
    await a.close();await other.close();
  });
  await ctx.close();

  // ------------------------------------------------------------------ P1-C
  const legacyState=JSON.stringify({schema:"aplus-student-state-v8",xp:7771,identity:{mode:"authenticated",authUserId:"B"},diagnosticDone:true,
    missionHistory:[{id:"synthetic-legacy-mission-secret",xp:7771}],examHistory:[],profile:{schoolYear:"12.º"},scores:{},_stateVersion:31,_savedAt:1});
  const legacyDraft=JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"synthetic-legacy-draft",responses:[{answer:"synthetic legacy answer"}],savedAt:1});
  const seedLegacy=async(page,extra={})=>page.evaluate(entries=>{for(const [k,v] of Object.entries(entries))localStorage.setItem(k,v)},{a25:legacyState,"a25-active-session-v1":legacyDraft,...extra});
  const legacyIntact=async(page,expected={a25:legacyState,"a25-active-session-v1":legacyDraft})=>{
    for(const [k,v] of Object.entries(expected))assert.equal(await page.evaluate(k=>localStorage.getItem(k),k),v,"progresso antigo alterado: "+k);
  };
  await scenario("[P1-C] conta nova com progresso antigo sem dono: aviso em vez de perfil vazio silencioso",async()=>{
    const c=await browser.newContext();await signIn(c,"B");
    const page=await open(c,"legacy-B");
    await seedLegacy(page);
    await page.evaluate(()=>mountActualApp());
    await page.locator("[data-legacy-progress='detected']").waitFor({timeout:20_000});
    const text=await visibleText(page);
    assert.ok(!text.includes("7771")&&!text.includes("synthetic-legacy-mission-secret")&&!text.includes("synthetic legacy answer"),"conteúdo antigo revelado");
    assert.equal(await page.evaluate(()=>localStorage.getItem("a25-account-v1:B:a25")),null,"perfil criado antes da escolha");
    await legacyIntact(page);
    // Rótulo de identidade antigo (authUserId=B) não é prova: nada é atribuído.
    await page.getByRole("button",{name:"O progresso antigo é meu",exact:true}).click();
    await page.locator("[data-legacy-progress='recovery']").waitFor();
    await page.getByRole("button",{name:"Começar nesta conta sem esse progresso",exact:true}).click();
    await page.waitForFunction(()=>!!localStorage.getItem("a25-account-v1:B:a25"),null,{timeout:20_000});
    const own=JSON.parse(await page.evaluate(()=>localStorage.getItem("a25-account-v1:B:a25")));
    assert.equal(own.cloudAccount?.accountId,"B");
    assert.notEqual(own.xp,7771);assert.ok(!JSON.stringify(own).includes("synthetic-legacy-mission-secret"),"progresso antigo atribuído a B");
    await legacyIntact(page);
    await page.reload();await page.waitForFunction(()=>window.mountActualApp);await page.evaluate(()=>mountActualApp());
    await page.waitForTimeout(2500);
    assert.equal(await page.locator("[data-legacy-progress='detected']").count(),0,"aviso repetido para B com perfil próprio");
    await legacyIntact(page);
    await c.close();
  });
  await scenario("[P1-C] conta antiga com área própria: abre o seu progresso, sem aviso nem mistura",async()=>{
    const c=await browser.newContext();await signIn(c,"A");
    const page=await open(c,"legacy-A-owned");
    const ownA=JSON.stringify({schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:"A"},xp:4242,diagnosticDone:false,missionHistory:[],examHistory:[],profile:{schoolYear:"12.º"},scores:{},_stateVersion:31,_savedAt:2});
    await seedLegacy(page,{"a25-account-v1:A:a25":ownA});
    await page.evaluate(()=>mountActualApp());
    await page.waitForFunction(()=>JSON.parse(localStorage.getItem("a25-account-v1:A:a25")||"null")?._savedAt>2,null,{timeout:20_000});
    assert.equal(await page.locator("[data-legacy-progress='detected']").count(),0);
    const own=JSON.parse(await page.evaluate(()=>localStorage.getItem("a25-account-v1:A:a25")));
    assert.equal(own.xp,4242);assert.ok(!JSON.stringify(own).includes("synthetic-legacy-mission-secret"));
    await legacyIntact(page);
    await c.close();
  });
  await scenario("[P1-C] progresso antigo ilegível também é detetado e preservado",async()=>{
    const c=await browser.newContext();await signIn(c,"C");
    const page=await open(c,"legacy-unreadable");
    await page.evaluate(()=>localStorage.setItem("a25","{broken-synthetic"));
    await page.evaluate(()=>mountActualApp());
    await page.locator("[data-legacy-progress='detected']").waitFor({timeout:20_000});
    assert.equal(await page.evaluate(()=>localStorage.getItem("a25")),"{broken-synthetic");
    await c.close();
  });
  await scenario("[controlo] conta nova sem progresso antigo: arranque normal sem aviso",async()=>{
    const c=await browser.newContext();await signIn(c,"D");
    const page=await open(c,"legacy-none");
    await page.evaluate(()=>mountActualApp());
    await page.waitForFunction(()=>!!localStorage.getItem("a25-account-v1:D:a25"),null,{timeout:20_000});
    assert.equal(await page.locator("[data-legacy-progress='detected']").count(),0);
    await c.close();
  });
  await scenario("[P1-A] contas: duas abas da mesma conta — só uma escreve",async()=>{
    const c=await browser.newContext();await signIn(c,"E");
    const a=await open(c,"writer-E-1");await a.evaluate(()=>mountActualApp());
    await a.waitForFunction(()=>!!localStorage.getItem("a25-account-v1:E:a25"),null,{timeout:20_000});
    const b=await open(c,"writer-E-2");await b.evaluate(()=>mountActualApp());
    await b.locator("[data-state-writer='observer']").waitFor({timeout:20_000});
    await c.close();
  });
  await scenario("[P1-A] contas sem Web Locks: só consulta, isolamento A/B e nenhuma gravação",async()=>{
    const c=await browser.newContext();
    await c.addInitScript(()=>{try{Object.defineProperty(Navigator.prototype,"locks",{configurable:true,get:()=>undefined})}catch{}});
    const ownA=JSON.stringify({schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:"RA"},xp:3131,selectedSubjectIds:["portuguese"],missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:5});
    const ownB=JSON.stringify({schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:"RB"},xp:4747,selectedSubjectIds:["math-a"],missionHistory:[],examHistory:[],profile:{},scores:{},_stateVersion:31,_savedAt:5});
    await signIn(c,"RA");
    const a=await open(c,"readonly-A");
    await a.evaluate(([x,y])=>{localStorage.setItem("a25-account-v1:RA:a25",x);localStorage.setItem("a25-account-v1:RB:a25",y);},[ownA,ownB]);
    const before=await dump(a);
    await a.evaluate(()=>mountActualApp());
    await a.locator("[data-state-writer='readonly']").waitFor({timeout:20_000});
    const textA=await visibleText(a);
    assert.ok(textA.includes("3131")&&!textA.includes("4747"),"A vê só o seu progresso");
    await a.evaluate(()=>probe.cloud.cloudSignOut());await signIn(c,"RB");
    const b=await open(c,"readonly-B");await b.evaluate(()=>mountActualApp());
    await b.locator("[data-state-writer='readonly']").waitFor({timeout:20_000});
    const textB=await visibleText(b);
    assert.ok(textB.includes("4747")&&!textB.includes("3131"),"B vê só o seu progresso");
    await b.evaluate(()=>{document.dispatchEvent(new Event("visibilitychange"));window.dispatchEvent(new Event("focus"));});
    await b.waitForTimeout(1200);
    const after=await dump(b);
    for(const [key,value] of Object.entries(before))if(!key.includes("auth-epoch"))assert.equal(after[key],value,"alterado sem Web Locks: "+key);
    assert.deepEqual(Object.keys(after).filter(k=>!k.includes("auth-epoch")&&!(k in before)),[],"chaves novas sem Web Locks");
    await c.close();
  });
}finally{
  await browser.close();server.close();
}
const failed=results.filter(x=>!x.ok);
console.log(JSON.stringify({result:failed.length?"FAIL":"PASS",source:SOURCE,passed:results.length-failed.length,failed:failed.length,pageErrors},null,1));
if(pageErrors.length)console.log("page errors present");
process.exit(failed.length||pageErrors.length?1:0);
