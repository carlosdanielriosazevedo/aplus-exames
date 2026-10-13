import fs from "node:fs";
import path from "node:path";

const full=fs.readFileSync("app/page.js","utf8");
if(!full.startsWith('"use client"'))throw new Error("app/page.js já não contém o cliente completo esperado");
fs.writeFileSync("app/clientApp.js",full);

const bootstrap=`"use client";

import dynamic from "next/dynamic";
import {useEffect,useState} from "react";

const ClientApp=dynamic(()=>import("./clientApp"),{ssr:false,loading:()=> <Loading/>});
const STORAGE_KEYS=["a25","a25-friends-beta"];

function storedProgress(){
  for(const name of ["localStorage","sessionStorage"])try{
    const store=window[name];
    if(STORAGE_KEYS.some(key=>store?.getItem(key)))return true;
  }catch{}
  return false;
}
function privateEntry(){
  const q=new URLSearchParams(window.location.search);
  return q.get("beta")==="friends"||q.get("mode")==="friends_beta";
}
function Brand(){return <span className="brandName" aria-label="APProva+"><span className="brandAP">AP</span><span className="brandProva">Prova</span><span className="brandPlus">+</span></span>}
function Loading(){return <main className="dark center"><section className="hero"><div className="logo"><Brand/></div><p className="eyebrow">A PREPARAR O TEU ESPAÇO</p></section></main>}
function Landing({onStart}){return <main className="dark center"><section className="hero">
  <div className="logo"><Brand/></div>
  <div className="welcomeApronso"><img className="apronso apronso-motion-idle" src="/mascot/apronso-welcome.webp" alt="Apronso, a mascote da APProva+"/><div><small>OLÁ, EU SOU O APRONSO</small><b>O teu parceiro de estudo.</b><span>Vou ajudar-te a perceber o que estudar, explicar dificuldades e celebrar cada conquista.</span></div></div>
  <p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>
  <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
  <p>A <Brand/> descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
  <button onClick={onStart}>Descobrir o meu nível →</button>
  <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div>
  <div aria-label="Informação legal" className="publicLegalLinks"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de utilização</a></div>
</section></main>}

export default function Page(){
  const [ready,setReady]=useState(false),[boot,setBoot]=useState(false);
  useEffect(()=>{const q=new URLSearchParams(window.location.search);setBoot(storedProgress()||privateEntry()||q.has("preview"));setReady(true)},[]);
  function start(){
    const url=new URL(window.location.href);url.searchParams.set("preview","subjects");
    window.history.replaceState(window.history.state,"",url.pathname+url.search+url.hash);setBoot(true);
  }
  if(!ready)return <Landing onStart={()=>{}}/>;
  return boot?<ClientApp/>:<Landing onStart={start}/>;
}
`;
fs.writeFileSync("app/page.js",bootstrap);

for(const name of fs.readdirSync("scripts")){
  if(!name.endsWith(".mjs")||name==="public-launch-split-bootstrap.mjs"||name==="performance-isolation-audit.mjs")continue;
  const file=path.join("scripts",name),source=fs.readFileSync(file,"utf8");
  const next=source
    .replaceAll('../app/page.js','../app/clientApp.js')
    .replaceAll('app/page.js','app/clientApp.js');
  if(next!==source)fs.writeFileSync(file,next);
}

fs.writeFileSync("scripts/performance-isolation-audit.mjs",`import assert from "node:assert/strict";
import fs from "node:fs";

const bootstrap=fs.readFileSync("app/page.js","utf8");
const page=fs.readFileSync("app/clientApp.js","utf8");
const portugueseMini=fs.readFileSync("app/components/PortuguesePassageMiniExam.js","utf8");

assert.match(bootstrap,/dynamic\\(\\(\\)=>import\\("\\.\\/clientApp"\\)/,"Home bootstrap must defer the full study client behind dynamic import()");
assert.doesNotMatch(bootstrap,/from\\s+["']\\.\\/data\\/content["']/,"Home bootstrap must not pull Mathematics content into the first-visit bundle");
assert.doesNotMatch(bootstrap,/from\\s+["']\\.\\/lib\\/engine["']/,"Home bootstrap must not pull the Mathematics engine into the first-visit bundle");
assert.match(bootstrap,/preview","subjects"/,"New students must hand off directly to subject selection");

assert.doesNotMatch(page,/^import\\s+\\{[\\s\\S]*?\\}\\s+from\\s+["\\']\\.\\/lib\\/engine["\\'];?/m,"Mathematics engine must not be statically imported by app/clientApp.js");
assert.match(page,/import\\("\\.\\/lib\\/engine"\\)/,"Mathematics engine must remain behind dynamic import()");
assert.doesNotMatch(page,/^import\\s+\\{[\\s\\S]*?\\}\\s+from\\s+["']\\.\\/lib\\/diagnosticRecovery["'];?/m,"Diagnostic recovery must stay lazy");
assert.match(page,/import\\("\\.\\/lib\\/diagnosticRecovery"\\)/,"Diagnostic recovery must remain behind dynamic import()");
assert.doesNotMatch(page,/^import\\s+\\{[\\s\\S]*?\\}\\s+from\\s+["']\\.\\/lib\\/constructedResponse["'];?/m,"Constructed-response grading must stay lazy");
assert.match(page,/import\\("\\.\\/lib\\/constructedResponse"\\)/,"Constructed-response grading must remain behind dynamic import()");
assert.match(page,/from\\s+["']\\.\\/lib\\/constructedResponseView["'];?/,"Study client must use lightweight constructed-response view helpers");
for(const name of ["PhysicsChemistrySubject","PhysicsChemistryExam","PhysicsChemistryMiniExam"]){
  assert.doesNotMatch(page,new RegExp(\`^import\\\\s+\${name}\\\\s+from\\\\s+["']\\\\./components/\${name}["'];?\`,"m"),name+" must not be statically imported");
  assert.match(page,new RegExp(\`const\\\\s+\${name}=dynamic\\\\(\\\\(\\\\)=>import\\\\(["']\\\\./components/\${name}["']\\\\),\\\\{ssr:false\\\\}\\\\);\`),name+" must remain isolated behind next/dynamic");
}
assert.doesNotMatch(portugueseMini,/from\\s+["']\\.\\.\\/data\\/portuguesePassagePrototype["']/,"Portuguese mini-exam must not import the heavy passage prototype module");
assert.match(portugueseMini,/from\\s+["']\\.\\.\\/lib\\/portugueseFullExamClassification["']/,"Portuguese mini-exam must use the lightweight full-exam classifier");
console.log("✓ performance isolation: first-visit bootstrap stays light; full study client remains lazy");
`);

const cssPath="app/public-release.css",css=fs.readFileSync(cssPath,"utf8");
if(!css.includes(".publicLegalLinks"))fs.appendFileSync(cssPath,`\n.publicLegalLinks{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:18px;font-size:13px}.publicLegalLinks a{color:#cbd5e1}\n`);

console.log("✓ lightweight public bootstrap split prepared");
