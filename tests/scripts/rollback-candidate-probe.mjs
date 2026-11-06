// P1-A v2 — Gate de candidata a rollback (NÃO executa rollback; só dados sintéticos).
// Uma build só é candidata a rollback se, num dispositivo com progresso v2 e um
// legado mais antigo: (1) mostrar o progresso v2, (2) manter as chaves v2 intactas e
// (3) não gravar o legado. Uso: ROLLBACK_CANDIDATE_URL=http://127.0.0.1:3100 node tests/scripts/rollback-candidate-probe.mjs
// Resultado observado com o main 118021d: progresso v2 escondido (mostra o legado), chaves v2
// intactas, legado regravado → NÃO é candidata. Ver docs/security/p1a-v2-rollback-plan.md.
import {createRequire} from "node:module";
const require=createRequire(import.meta.url);
const playwright=await import(process.env.ROLLBACK_PLAYWRIGHT_MODULE||require.resolve("playwright"));
const chromium=playwright.chromium||playwright.default?.chromium;
const base=process.env.ROLLBACK_CANDIDATE_URL||"http://127.0.0.1:3100";
const mk=(xp,tag)=>JSON.stringify({goal:17,xp,diagnosticDone:true,diagnosticAnswers:8,scores:{},selectedSubjectIds:["math-a"],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},missionHistory:[{id:`mission-${tag}`,xp,date:"2026-11-01"}],examHistory:[],betaMode:"internal",pedagogicalIdVersion:1,profile:{schoolYear:"12.º",syllabus:"most",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:5});
const legacy=mk(1234,"legacy-older"),v2=mk(7777,"v2-newer");
// mesma impressão digital que app/lib/academicKeys.js (o marcador de importação de um dispositivo real)
const fingerprint=raw=>{if(raw==null)return null;let h=2166136261;for(let i=0;i<raw.length;i++){h^=raw.charCodeAt(i);h=Math.imul(h,16777619);}return `fp1-${(h>>>0).toString(16)}-${raw.length}`;};
const ACADEMIC=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1","applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715","a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
const REGISTRY=JSON.stringify([{id:"e-v2",status:"committed",at:5}]);
const v2keys={"a25-ws-v2:global:a25":v2,"a25-ws-v2:global:a25-completed-sessions-v1":REGISTRY,
  "a25-ws-v2:global:~legacy-import":JSON.stringify({status:"done",at:1,fp:Object.fromEntries(ACADEMIC.map(k=>[k,k==="a25"?fingerprint(legacy):null]))})};
const browser=await chromium.launch();const ctx=await browser.newContext();const page=await ctx.newPage();
await page.goto(base+"/?recuperar=inicio");
// Dispositivo v2 real, fechado de forma limpa: registo IndexedDB, marcador e selo do mesmo mandato.
await page.evaluate(async([l,k])=>{
  localStorage.clear();localStorage.setItem("a25",l);for(const [a,b] of Object.entries(k))localStorage.setItem(a,b);
  const mandate={tab:"writer-synthetic-device",epoch:"e-synthetic",local:true,at:1};
  localStorage.setItem("a25-ws-v2:global:~writer-mandate",JSON.stringify({tab:mandate.tab,epoch:mandate.epoch}));
  localStorage.setItem("a25-ws-v2:global:~writer-seal",JSON.stringify({tab:mandate.tab,epoch:mandate.epoch,seq:1,final:true,at:1}));
  await new Promise((resolve,reject)=>{const r=indexedDB.open("approva-state-writer-v2",1);r.onupgradeneeded=()=>r.result.createObjectStore("mandates");
    r.onsuccess=()=>{const tx=r.result.transaction("mandates","readwrite");tx.objectStore("mandates").put(mandate,"mandate:global");tx.oncomplete=()=>{r.result.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);});
},[legacy,v2keys]);
await page.goto(base+"/");await page.waitForTimeout(6000);
const text=await page.evaluate(()=>document.body.innerText);
await page.reload();await page.waitForTimeout(4000);
const dump=await page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
const has=(t,n)=>new RegExp(String(n).replace(/\B(?=(\d{3})+$)/g,"[\\s\\u00a0\\u202f.]?")).test(t);
const v2now=JSON.parse(dump["a25-ws-v2:global:a25"]||"null");
// a hidratação normaliza as entradas (acrescenta campos); o que não pode faltar é cada conclusão
const ids=state=>JSON.stringify((state?.missionHistory||[]).map(x=>x.id).sort());
const out={
  mostra_progresso_v2:has(text,7777),
  mostra_progresso_legado:has(text,1234),
  // uma candidata funcional pode gravar o estado (ex.: registo de abertura); o que não
  // pode é perder o progresso v2: XP, histórico e recibos D3 têm de se manter.
  v2_xp:v2now?.xp??null,
  v2_historico_igual:ids(v2now)===ids(JSON.parse(v2)),
  v2_recibos_iguais:dump["a25-ws-v2:global:a25-completed-sessions-v1"]===REGISTRY,
  chaves_v2_intactas:v2now?.xp===7777&&ids(v2now)===ids(JSON.parse(v2))&&dump["a25-ws-v2:global:a25-completed-sessions-v1"]===REGISTRY,
  grava_legado:dump["a25"]!==legacy,
  xp_no_legado_depois:JSON.parse(dump["a25"]||"null")?.xp,
  texto:text.replace(/\s+/g," ").slice(0,160)
};
const candidate=out.mostra_progresso_v2&&out.chaves_v2_intactas&&!out.grava_legado;
console.log(JSON.stringify({...out,candidata_a_rollback:candidate},null,1));
await browser.close();
process.exit(candidate?0:1);
