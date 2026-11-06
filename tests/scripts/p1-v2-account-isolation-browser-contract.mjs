// P1-A v2 — isolamento de contas com o espaço canónico separado (app real, Chromium).
// Contas A/B, troca e logout, separadores de versões anteriores e legado sem dono.
// Provas pelos bytes persistidos. Dados exclusivamente sintéticos.
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

const compiled=await build({absWorkingDir:SOURCE,entryPoints:[path.join(here,"tests/fixtures/p1AuditAccountBrowserEntry.jsx")],outfile:path.join(SOURCE,"p1-v2-isolation-bundle.js"),bundle:true,write:false,format:"iife",platform:"browser",
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

const CANON=id=>key=>`a25-ws-v2:acct:${id}:${key}`;
const GLOBAL=key=>`a25-ws-v2:global:${key}`;
const academicOf=(stores,prefix)=>Object.fromEntries(Object.entries(stores).filter(([k])=>k.startsWith(prefix)));
const reactivate=page=>page.evaluate(()=>{document.dispatchEvent(new Event("visibilitychange"));window.dispatchEvent(new Event("focus"));});
const state=(id,xp,extra={})=>JSON.stringify({schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:id},xp,diagnosticDone:false,missionHistory:[],examHistory:[],profile:{schoolYear:"12.º"},scores:{},_stateVersion:31,_savedAt:3,...extra});
const SECRET="synthetic-v2-global-secret-mission";
const globalV2=JSON.stringify({schema:"aplus-student-state-v8",xp:8181,diagnosticDone:true,missionHistory:[{id:SECRET,xp:8181}],examHistory:[],profile:{schoolYear:"12.º"},scores:{},_stateVersion:31,_savedAt:4,_writer:{tab:"writer-old",epoch:"e-old",seq:3}});
const globalDraft=JSON.stringify({kind:"mission",betaMode:"internal",sessionId:"synthetic-v2-global-draft",responses:[{answer:"RESPOSTA-GLOBAL-V2-SEM-DONO"}],savedAt:4});

try{
  await scenario("[v2·P1-C] progresso v2 sem conta (global) + primeira conta: aviso, nada atribuído, bytes intactos",async()=>{
    const c=await browser.newContext();await signIn(c,"B");
    const page=await open(c,"v2-global-B");
    await page.evaluate(([s,d,ks,kd])=>{localStorage.setItem(ks,s);localStorage.setItem(kd,d);},[globalV2,globalDraft,GLOBAL("a25"),GLOBAL("a25-active-session-v1")]);
    const before=academicOf(await dump(page),"a25-ws-v2:global:");
    await page.evaluate(()=>mountActualApp());
    await page.locator("[data-legacy-progress='detected']").waitFor({timeout:20_000});
    const text=await visibleText(page);
    assert.ok(!text.includes("8181")&&!text.includes(SECRET)&&!text.includes("RESPOSTA-GLOBAL-V2-SEM-DONO"),"conteúdo sem dono revelado");
    assert.equal(await page.evaluate(k=>localStorage.getItem(k),CANON("B")("a25")),null,"perfil de B criado antes da escolha");
    await page.getByRole("button",{name:"Começar nesta conta sem esse progresso",exact:true}).click();
    await page.waitForFunction(k=>!!localStorage.getItem(k),CANON("B")("a25"),{timeout:20_000});
    const stores=await dump(page);
    const own=JSON.parse(stores[CANON("B")("a25")]);
    assert.equal(own.cloudAccount?.accountId,"B");assert.notEqual(own.xp,8181);
    for(const [k,v] of Object.entries(stores))if(k.startsWith("a25-ws-v2:acct:B:"))assert.ok(!v.includes(SECRET)&&!v.includes("RESPOSTA-GLOBAL-V2-SEM-DONO"),"conteúdo sem dono na área de B: "+k);
    assert.deepEqual(academicOf(stores,"a25-ws-v2:global:"),before,"progresso sem dono alterado");
    await c.close();
  });

  await scenario("[v2·P1-C] legado bruto (main) e global v2 em simultâneo: nada importado para a conta",async()=>{
    const c=await browser.newContext();await signIn(c,"B2");
    const page=await open(c,"v2-both-B2");
    await page.evaluate(([s,ks])=>{localStorage.setItem("a25",s);localStorage.setItem(ks,s);},[globalV2,GLOBAL("a25")]);
    await page.evaluate(()=>mountActualApp());
    await page.locator("[data-legacy-progress='detected']").waitFor({timeout:20_000});
    const stores=await dump(page);
    // Anti-vacuidade: nenhuma chave académica de B2 em NENHUM espaço (v2, outro prefixo ou F5).
    assert.deepEqual(Object.keys(stores).filter(k=>/:acct:B2:[^~]|^a25-account-v1:B2:/.test(k)),[],"chaves académicas de B2 criadas sem escolha");
    assert.ok(!Object.entries(stores).some(([k,v])=>/B2/.test(k)&&v.includes(SECRET)),"conteúdo sem dono numa chave de B2");
    assert.equal(stores["a25"],globalV2);assert.equal(stores[GLOBAL("a25")],globalV2);
    await c.close();
  });

  await scenario("[v2] contas A/B com troca e logout: cada separador só escreve na sua área; B não vê A",async()=>{
    const c=await browser.newContext();await signIn(c,"A");
    const a=await open(c,"v2-switch-A");
    await a.evaluate(k=>localStorage.setItem(k,JSON.stringify({schema:"aplus-student-state-v8",cloudAccount:{version:1,accountId:"A"},xp:5151,diagnosticDone:false,missionHistory:[],examHistory:[],profile:{schoolYear:"12.º"},scores:{},_stateVersion:31,_savedAt:2})),"a25-account-v1:A:a25");
    await a.evaluate(()=>mountActualApp());
    await a.waitForFunction(k=>JSON.parse(localStorage.getItem(k)||"null")?.xp===5151,CANON("A")("a25"),{timeout:20_000});
    await a.waitForTimeout(1500);
    const areaA=academicOf(await dump(a),"a25-ws-v2:acct:A:");
    // logout de A e entrada de B noutro separador (cookie partilhado)
    await a.evaluate(()=>probe.cloud.cloudSignOut());await signIn(c,"B");
    const b=await open(c,"v2-switch-B");await b.evaluate(()=>mountActualApp());
    await b.waitForFunction(k=>!!localStorage.getItem(k),CANON("B")("a25"),{timeout:20_000});
    // o separador de A volta a ficar ativo com a sessão de B
    await reactivate(a);await a.waitForTimeout(2500);await reactivate(b);await b.waitForTimeout(1500);
    const stores=await dump(b);
    const areaANow=academicOf(stores,"a25-ws-v2:acct:A:");
    // Comportamento herdado de ee33d54 (fixado, não escondido): ao reativar, o separador
    // de A pode registar uma abertura (productAnalytics) antes de o guarda de conta
    // bloquear. Nenhum outro campo académico pode mudar, e nada de B entra em A.
    const INHERITED=new Set(["productAnalytics","_savedAt","_writer"]);
    for(const k of Object.keys(areaA).filter(k=>!k.includes(":~"))){
      if(!k.endsWith(":a25")){assert.equal(areaANow[k],areaA[k],"área académica de A alterada: "+k);continue;}
      const x=JSON.parse(areaA[k]),y=JSON.parse(areaANow[k]);
      const changed=[...new Set([...Object.keys(x),...Object.keys(y)])].filter(f=>JSON.stringify(x[f])!==JSON.stringify(y[f]));
      assert.deepEqual(changed.filter(f=>!INHERITED.has(f)),[],"campos académicos de A alterados: "+changed.join(","));
      assert.equal(y.xp,5151);assert.equal(y.cloudAccount.accountId,"A");
    }
    assert.ok(!(await visibleText(b)).includes("5151"),"B vê o XP de A");
    for(const [k,v] of Object.entries(stores))if(k.startsWith("a25-ws-v2:acct:B:"))assert.ok(!v.includes("5151"),"dados de A na área de B: "+k);
    assert.equal(stores["a25-account-v1:A:a25"]!==undefined,true,"legado de A preservado");
    await c.close();
  });

  await scenario("[v2] separador antigo (formato #461) de A escreve enquanto B é a conta ativa: B intacto; A recebe a cópia ao voltar",async()=>{
    const c=await browser.newContext();await signIn(c,"A3");
    const a=await open(c,"v2-old-A3");
    await a.evaluate(()=>mountActualApp());
    await a.waitForFunction(k=>!!localStorage.getItem(k),CANON("A3")("a25"),{timeout:20_000});
    const canonA=(await dump(a))[CANON("A3")("a25")];
    await a.evaluate(()=>probe.cloud.cloudSignOut());await signIn(c,"B3");
    const b=await open(c,"v2-old-B3");await b.evaluate(()=>mountActualApp());
    await b.waitForFunction(k=>!!localStorage.getItem(k),CANON("B3")("a25"),{timeout:20_000});
    await b.waitForTimeout(1000);
    const areaB=academicOf(await dump(b),"a25-ws-v2:acct:B3:");
    // separador da versão anterior grava a área F5 de A3
    const old=await open(c,"v2-old-tab");
    await old.evaluate(s=>localStorage.setItem("a25-account-v1:A3:a25",s),state("A3",6161));
    await b.waitForTimeout(1500);
    const afterB=academicOf(await dump(b),"a25-ws-v2:acct:B3:");
    for(const k of Object.keys(areaB).filter(k=>!k.includes(":~")))assert.equal(afterB[k],areaB[k],"área de B3 alterada: "+k);
    assert.ok(!Object.values(afterB).some(v=>v.includes("6161")),"progresso de A3 na área de B3");
    assert.ok(!(await visibleText(b)).includes("6161"),"B3 vê dados de A3");
    // A3 volta: o canónico de A3 não muda; o progresso antigo fica numa cópia da área de A3
    await b.close();await a.close();
    await b.context().clearCookies().catch(()=>{});await signIn(c,"A3");
    const back=await open(c,"v2-old-A3-back");await back.evaluate(()=>mountActualApp());
    await back.locator("[data-state-writer='legacy-progress']").waitFor({timeout:20_000});
    const stores=await dump(back);
    {const x=JSON.parse(canonA),y=JSON.parse(stores[CANON("A3")("a25")]);
     const changed=[...new Set([...Object.keys(x),...Object.keys(y)])].filter(f=>JSON.stringify(x[f])!==JSON.stringify(y[f]));
     // abrir a app como A3 regista a abertura (productAnalytics); nada mais muda
     assert.deepEqual(changed.filter(f=>!["productAnalytics","_savedAt","_writer"].includes(f)),[],"canónico de A3 substituído: "+changed.join(","));
     assert.notEqual(y.xp,6161,"progresso da versão anterior aplicado ao canónico");}
    const copies=Object.entries(stores).filter(([k])=>k.startsWith("a25-ws-v2:acct:A3:~recovery:")).map(([,v])=>JSON.parse(v));
    assert.equal(JSON.parse(copies.find(x=>x.reason==="legacy_version_write").keys.a25).xp,6161);
    assert.ok(!Object.keys(stores).some(k=>k.startsWith("a25-ws-v2:acct:B3:~recovery:")&&stores[k].includes("6161")),"cópia de A3 na área de B3");
    await c.close();
  });

  await scenario("[v2] sem sessão (logout): nada lido nem escrito no espaço canónico",async()=>{
    const c=await browser.newContext();await signIn(c,null);
    const page=await open(c,"v2-no-session");
    await page.evaluate(([k,s])=>localStorage.setItem(k,s),[CANON("Z")("a25"),state("Z",999)]);
    const before=await dump(page);
    await page.evaluate(()=>mountActualApp());
    await page.waitForTimeout(3000);
    const after=await dump(page);
    // Anti-vacuidade: comparação do armazenamento inteiro, não só do prefixo v2.
    for(const [k,v] of Object.entries(before))if(!k.includes("auth-epoch"))assert.equal(after[k],v,"alterado sem sessão: "+k);
    assert.deepEqual(Object.keys(after).filter(k=>!(k in before)&&!k.includes("auth-epoch")&&k!=="a25-device-id-v1"),[],"chaves criadas sem sessão");
    assert.ok(!(await visibleText(page)).includes("999"),"dados mostrados sem sessão");
    await c.close();
  });
}finally{
  await browser.close();server.close();
}
const failed=results.filter(x=>!x.ok);
console.log(JSON.stringify({result:failed.length?"FAIL":"PASS",source:SOURCE,passed:results.length-failed.length,failed:failed.length,pageErrors},null,1));
if(pageErrors.length)console.log("page errors present");
process.exit(failed.length||pageErrors.length?1:0);
