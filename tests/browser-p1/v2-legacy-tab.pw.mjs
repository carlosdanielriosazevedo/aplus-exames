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
  // Anti-vacuidade: o armazenamento inteiro (exceto chaves técnicas), não só os prefixos conhecidos.
  const everything=stores=>Object.fromEntries(Object.entries(stores).filter(([k])=>!k.includes("auth-epoch")&&k!=="a25-device-id-v1"));
  const before=everything(await local(a));
  await a.goto("/");
  await expect(a.locator("[data-readonly-reason='register_unavailable']")).toBeVisible({timeout:30_000});
  await expect(submit(a)).toHaveCount(0);
  await a.waitForTimeout(1000);
  expect(everything(await local(a)),"nenhum byte alterado em nenhuma chave, nada importado").toEqual(before);
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

test("P1-A v2 · restauro interrompido a meio (armazenamento morre após 4 das 9 escritas): a abertura seguinte conclui-o; nunca fica misto",async({browser})=>{
  const context=await browser.newContext();
  const sid="synthetic-v2-restore-crash";
  const fixture=mathFixture(sid);
  const a=await context.newPage();
  await seedLegacy(a,fixture);
  await a.goto("/");
  await expect(submit(a)).toBeVisible({timeout:30_000});
  await submit(a).click();
  await expect.poll(async()=>completions((await local(a))[G("a25")],sid),{timeout:20_000}).toBe(1);
  // versão anterior grava progresso diferente → cópia restaurável
  const old=await context.newPage();await old.goto("/?recuperar=inicio");
  await old.evaluate(raw=>localStorage.setItem("a25",raw),JSON.stringify({...fixture.state,xp:4444,missionHistory:[{id:"synthetic-old-restore"}],_savedAt:Date.now()}));
  await old.close();
  await expect(a.locator("[data-state-writer='legacy-progress']")).toBeVisible({timeout:10_000});
  await a.getByRole("button",{name:"Ver cópias de recuperação",exact:true}).click();
  const stores=await local(a);
  const legacyCopy=Object.entries(stores).filter(([k])=>k.startsWith(G("~recovery:"))).map(([k,v])=>({k,...parse(v)})).find(c=>c.reason==="legacy_version_write");
  const KEYS=Object.keys(legacyCopy.keys);
  const before=Object.fromEntries(KEYS.map(k=>[k,stores[G(k)]??null]));
  // o armazenamento "morre" depois da 4.ª escrita académica do restauro
  await a.evaluate(keys=>{const set=Storage.prototype.setItem,remove=Storage.prototype.removeItem;let n=0,dead=false;
    const academic=k=>keys.some(x=>k==="a25-ws-v2:global:"+x);
    Storage.prototype.setItem=function(k,v){if(dead)return;set.call(this,k,v);if(academic(k)&&++n>=4)dead=true;};
    Storage.prototype.removeItem=function(k){if(dead)return;remove.call(this,k);if(academic(k)&&++n>=4)dead=true;};},KEYS);
  const item=a.locator(`[data-recovery-copy='${legacyCopy.k}']`);
  await item.getByRole("button",{name:"Restaurar esta cópia",exact:true}).click();
  await item.getByRole("button",{name:"Confirmar e restaurar",exact:true}).click();
  await a.waitForTimeout(1500);
  const mid=await local(a);
  const midSet=Object.fromEntries(KEYS.map(k=>[k,mid[G(k)]??null]));
  expect(KEYS.some(k=>midSet[k]!==before[k])&&KEYS.some(k=>midSet[k]!==legacyCopy.keys[k]),"o armazenamento ficou de facto a meio").toBe(true);
  expect(mid[G("~restore-journal")],"diário gravado antes das escritas").toBeTruthy();
  await a.close();
  // reabertura: sem selo → retenção → recuperação explícita → diário resolvido antes de hidratar
  const b=await context.newPage();await b.goto("/");
  const hold=b.locator("[data-state-writer='recovery-hold']");
  await hold.or(b.locator("[data-restore-result]")).first().waitFor({timeout:30_000});
  if(await hold.count()){
    await b.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    await b.getByRole("button",{name:"Guardar cópia e continuar aqui",exact:true}).click();
  }
  await expect(b.locator("[data-restore-result]")).toHaveAttribute("data-restore-result",/^completed/,{timeout:30_000});
  const after=await local(b);
  // Depois de concluir, a app hidrata e volta a gravar o estado (migrações normais),
  // por isso "a25" compara-se pelo conteúdo académico; as outras 8 chaves (incluindo
  // os recibos D3, onde um conjunto misto se veria) comparam-se byte a byte.
  // a app também retoma o rascunho e volta a gravá-lo (savedAt novo): compara-se o conteúdo.
  const REWRITTEN=["a25","a25-active-session-v1"];
  for(const k of KEYS.filter(k=>!REWRITTEN.includes(k)))expect(after[G(k)]??null,"conjunto restaurado por inteiro: "+k).toBe(legacyCopy.keys[k]??null);
  const draftT=parse(legacyCopy.keys["a25-active-session-v1"]),draftR=parse(after[G("a25-active-session-v1")]);
  expect(draftR?.session?.sessionId??null,"rascunho restaurado: sessão").toBe(draftT?.session?.sessionId??null);
  expect(JSON.stringify(draftR?.session?.answers??null),"rascunho restaurado: respostas").toBe(JSON.stringify(draftT?.session?.answers??null));
  const target=parse(legacyCopy.keys.a25),restored=parse(after[G("a25")]);
  expect(restored.xp,"XP do conjunto restaurado").toBe(target.xp);
  expect((restored.missionHistory||[]).map(x=>x.id),"histórico do conjunto restaurado").toEqual((target.missionHistory||[]).map(x=>x.id));
  expect(completions(after[G("a25")],sid),"sem a conclusão do conjunto anterior").toBe(completions(legacyCopy.keys.a25,sid));
  const pinned=Object.entries(after).filter(([k])=>k.startsWith(G("~recovery:"))).map(([,v])=>parse(v)).find(c=>c.reason==="restore_target");
  for(const k of KEYS)expect(pinned.keys[k]??null,"alvo fixado = cópia escolhida: "+k).toBe(legacyCopy.keys[k]??null);
  expect(after[G("~restore-journal")]??null).toBe(null);
  const backup=Object.entries(after).filter(([k])=>k.startsWith(G("~recovery:"))).map(([,v])=>parse(v)).find(c=>c.reason==="before_restore");
  for(const k of KEYS)expect(backup.keys[k]??null,"progresso anterior guardado: "+k).toBe(before[k]);
  expect(completions(backup.keys.a25,sid)).toBe(1);
  await context.close();
});
