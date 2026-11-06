// P1-A v2 — separador de uma versão anterior (formato do main: chaves brutas,
// estado inteiro gravado a partir da memória) com a app nova aberta.
// Provas pelos bytes persistidos: o canónico não muda; o progresso da versão
// anterior fica numa cópia; o aluno restaura-a pela UI e pode voltar atrás.
// Dados exclusivamente sintéticos.
import {test,expect} from "@playwright/test";
import {buildMiniExam,emptyScores} from "../../app/lib/engine.js";

const G=key=>`a25-ws-v2:global:${key}`;
const parse=raw=>{try{return JSON.parse(raw)}catch{return null}};
const local=page=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
const completions=(raw,sid)=>(parse(raw)?.examHistory||[]).filter(x=>x.completionId===sid).length;
const submit=page=>page.getByRole("button",{name:"Entregar Mini-exame",exact:true});

function mathFixture(sessionId){
  const now=Date.now();
  const state={goal:17,xp:100,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),
    selectedSubjectIds:["math-a"],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,
    onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},
    missionHistory:[],examHistory:[],betaMode:"internal",pedagogicalIdVersion:1,
    profile:{schoolYear:"12.º",syllabus:"most",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:now};
  const questions=buildMiniExam(state);
  const answers=questions.map(q=>q.response?.type==="choice"||(q.a!==undefined&&!q.response)?q.a:null);
  const draft={kind:"mini_exam",betaMode:"internal",screen:"miniExamReview",session:{sessionId,questions,answers,markedForReview:[],current:questions.length-1,startedAt:now-600_000},savedAt:now};
  return {state,draft};
}

test("P1-A v2 · separador do main grava as chaves antigas: o canónico fica intacto e o progresso antigo é restaurável pela UI, de forma reversível",async({browser})=>{
  const context=await browser.newContext();
  const sid="synthetic-v2-legacy";
  const fixture=mathFixture(sid);
  const a=await context.newPage();
  // Estado anterior à nova versão: chaves brutas (importadas pelo primeiro escritor).
  await a.goto("/?recuperar=inicio");
  await a.evaluate(({state,draft})=>{localStorage.clear();sessionStorage.clear();localStorage.setItem("a25",state);localStorage.setItem("a25-active-session-v1",draft);},{state:JSON.stringify(fixture.state),draft:JSON.stringify(fixture.draft)});
  await a.goto("/");
  await expect(submit(a)).toBeVisible({timeout:30_000});
  let now=await local(a);
  expect(parse(now[G("a25")])?.xp,"legado importado para o canónico").toBe(100);
  await submit(a).click();
  await expect.poll(async()=>completions((await local(a))[G("a25")],sid),{timeout:20_000}).toBe(1);
  now=await local(a);
  const xpA=parse(now[G("a25")]).xp;
  expect(xpA).toBeGreaterThan(100);
  expect(completions(now["a25"],sid),"a nova versão nunca escreve no legado").toBe(0);
  const canonicalA=Object.fromEntries(Object.entries(now).filter(([k])=>/^a25-ws-v2:global:[^~]/.test(k)));

  // Separador antigo (main): grava o estado inteiro da sua memória nas chaves brutas.
  const old=await context.newPage();
  await old.goto("/?recuperar=inicio");
  const oldState=JSON.stringify({...fixture.state,xp:999,missionHistory:[{id:"synthetic-old-mission"}],_savedAt:Date.now()});
  await old.evaluate(raw=>{localStorage.setItem("a25",raw);localStorage.removeItem("a25-active-session-v1");},oldState);

  await expect(a.locator("[data-state-writer='legacy-progress']")).toBeVisible({timeout:10_000});
  now=await local(a);
  const canonicalAfter=Object.fromEntries(Object.entries(now).filter(([k])=>/^a25-ws-v2:global:[^~]/.test(k)));
  expect(canonicalAfter,"canónico intacto: nada foi substituído").toEqual(canonicalA);
  expect(now["a25"]).toBe(oldState);
  const legacyCopy=Object.entries(now).filter(([k])=>k.startsWith(G("~recovery:"))).map(([k,v])=>({k,...parse(v)})).find(c=>c.reason==="legacy_version_write");
  expect(parse(legacyCopy.keys.a25).xp,"progresso da versão antiga preservado").toBe(999);

  // Recuperação pela UI: restaurar o progresso da versão antiga.
  await a.getByRole("button",{name:"Ver cópias de recuperação",exact:true}).click();
  const item=a.locator(`[data-recovery-copy='${legacyCopy.k}']`);
  await expect(item).toContainText("999 XP");
  await item.getByRole("button",{name:"Restaurar esta cópia",exact:true}).click();
  await item.getByRole("button",{name:"Confirmar e restaurar",exact:true}).click();
  await expect.poll(async()=>parse((await local(a))[G("a25")])?.xp,{timeout:20_000}).toBe(999);
  now=await local(a);
  const backup=Object.entries(now).filter(([k])=>k.startsWith(G("~recovery:"))).map(([k,v])=>({k,...parse(v)})).find(c=>c.reason==="before_restore");
  expect(parse(backup.keys.a25).xp,"o progresso da nova versão ficou guardado antes").toBe(xpA);
  expect(completions(backup.keys.a25,sid)).toBe(1);
  expect(backup.keys["a25-completed-sessions-v1"]).toBe(canonicalA[G("a25-completed-sessions-v1")]);

  // Reversível: voltar ao progresso da nova versão, sem duplicar a conclusão nem o XP.
  await a.goto("/?recuperacao=1");
  const back=a.locator(`[data-recovery-copy='${backup.k}']`);
  await expect(back).toContainText(`${xpA} XP`,{timeout:30_000});
  await back.getByRole("button",{name:"Restaurar esta cópia",exact:true}).click();
  await back.getByRole("button",{name:"Confirmar e restaurar",exact:true}).click();
  await expect.poll(async()=>parse((await local(a))[G("a25")])?.xp,{timeout:20_000}).toBe(xpA);
  now=await local(a);
  expect(completions(now[G("a25")],sid),"sem duplicação").toBe(1);
  expect(now[G("a25-completed-sessions-v1")]).toBe(canonicalA[G("a25-completed-sessions-v1")]);
  expect(now["a25"],"o legado continua só de leitura").toBe(oldState);
  await context.close();
});

// ---------------------------------------------------------------------------
// Prova sem ecrãs: os bytes persistidos não mudam quando não há prova.
const academic=stores=>Object.fromEntries(Object.entries(stores).filter(([k])=>/^a25-ws-v2:global:[^~]/.test(k)||["a25","a25-active-session-v1","a25-completed-sessions-v1"].includes(k)));
async function seedLegacy(page,fixture){
  await page.goto("/?recuperar=inicio");
  await page.evaluate(({state,draft})=>{localStorage.clear();sessionStorage.clear();localStorage.setItem("a25",state);localStorage.setItem("a25-active-session-v1",draft);},{state:JSON.stringify(fixture.state),draft:JSON.stringify(fixture.draft)});
}

test("P1-A v2 · IndexedDB recusa gravar o registo: só consulta, nada importado nem escrito",async({browser})=>{
  const context=await browser.newContext();
  await context.addInitScript(()=>{
    const put=IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put=function(){throw new DOMException("synthetic","QuotaExceededError")};
    window.__restorePut=()=>{IDBObjectStore.prototype.put=put};
  });
  const a=await context.newPage();
  await seedLegacy(a,mathFixture("synthetic-v2-idb"));
  const before=academic(await local(a));
  await a.goto("/");
  await expect(a.locator("[data-readonly-reason='register_unavailable']")).toBeVisible({timeout:30_000});
  await expect(submit(a)).toHaveCount(0);
  await a.waitForTimeout(1000);
  expect(academic(await local(a)),"nenhum byte académico alterado, nada importado").toEqual(before);
  await context.close();
});

test("P1-A v2 · selo de um mandato anterior (epoch antiga) após fim abrupto: retenção e nada escrito",async({browser})=>{
  const context=await browser.newContext();
  const sid="synthetic-v2-epoch";
  const a=await context.newPage();
  await seedLegacy(a,mathFixture(sid));
  await a.goto("/");
  await expect(submit(a)).toBeVisible({timeout:30_000});
  // A fica escondida (sela a epoch 1) e volta (retoma o próprio mandato: epoch 2).
  const setVisibility=state=>a.evaluate(state=>{Object.defineProperty(document,"visibilityState",{configurable:true,get:()=>state});document.dispatchEvent(new Event("visibilitychange"));},state);
  await setVisibility("hidden");await a.waitForTimeout(300);
  await setVisibility("visible");await a.waitForTimeout(3000);
  await submit(a).click();
  await expect.poll(async()=>completions((await local(a))[G("a25")],sid),{timeout:20_000}).toBe(1);
  const stores=await local(a);
  const seal=parse(stores[G("~writer-seal")]),marker=parse(stores[G("~writer-mandate")]);
  expect(seal.tab).toBe(marker.tab);
  expect(seal.epoch,"o único selo visível é de um mandato anterior").not.toBe(marker.epoch);
  // Fim abrupto: o armazenamento deixa de aceitar escritas (como nos testes D3) e o
  // separador fecha; o pagehide corre mas o selo do mandato atual nunca é gravado.
  await a.evaluate(()=>{Storage.prototype.setItem=function(){};Storage.prototype.removeItem=function(){};});
  await a.close();
  const b=await context.newPage();
  await b.goto("/");
  await expect(b.locator("[data-state-writer='recovery-hold']")).toBeVisible({timeout:30_000});
  const held=academic(await local(b));
  await b.waitForTimeout(1500);
  expect(academic(await local(b)),"sem prova, nada é escrito").toEqual(held);
  expect(completions(held[G("a25")],sid),"a conclusão de A continua lá").toBe(1);
  await context.close();
});

test("P1-A v2 · escritor alheio no rascunho canónico: o escritor para e os dois rascunhos ficam guardados",async({browser})=>{
  const context=await browser.newContext();
  const fixture=mathFixture("synthetic-v2-draft");
  const a=await context.newPage();
  await seedLegacy(a,fixture);
  await a.goto("/");
  await expect(submit(a)).toBeVisible({timeout:30_000});
  const mine=(await local(a))[G("a25-active-session-v1")];
  const other=await context.newPage();
  await other.goto("/?recuperar=inicio");
  const foreign=JSON.stringify({...fixture.draft,session:{...fixture.draft.session,answers:fixture.draft.session.answers.map(()=>null)},savedAt:Date.now()});
  await other.evaluate(([key,raw])=>localStorage.setItem(key,raw),[G("a25-active-session-v1"),foreign]);
  await expect(a.locator("[data-state-writer='conflict']")).toBeVisible({timeout:10_000});
  const stores=await local(a);
  expect(stores[G("a25-active-session-v1")],"nada substituído").toBe(foreign);
  const copies=Object.entries(stores).filter(([k])=>k.startsWith(G("~recovery:"))).map(([,v])=>parse(v));
  expect(copies.some(c=>c.keys["a25-active-session-v1"]===mine),"rascunho deste separador guardado").toBe(true);
  expect(copies.some(c=>c.keys["a25-active-session-v1"]===foreign),"rascunho recebido guardado").toBe(true);
  await context.close();
});
