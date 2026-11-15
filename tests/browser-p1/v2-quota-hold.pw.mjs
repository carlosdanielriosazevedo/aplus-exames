// NO-GO #462 · r4 no Chromium (build de produção): fecho abrupto do escritor +
// localStorage da origem cheio. Antes: a retenção exigia gravar uma cópia e o
// ecrã de cópias só abria como escritor (impasse). Agora: em retenção, sem ser
// escritor, o aluno descarrega e apaga uma cópia antiga e continua.
// Provas pelos bytes persistidos (9 chaves intactas, cópia prévia da adoção).
// Dados exclusivamente sintéticos.
import {test,expect} from "@playwright/test";

const G=key=>`a25-ws-v2:global:${key}`;
const KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1","applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715","a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
const parse=raw=>{try{return JSON.parse(raw)}catch{return null}};
const local=page=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));

test("NO-GO #462 · r4: retenção com quota cheia — descarregar e apagar uma cópia antiga sem ser escritor, depois continuar",async({browser})=>{
  test.setTimeout(120_000);
  const context=await browser.newContext({acceptDownloads:true});
  const page=await context.newPage();
  const now=Date.now();
  const state={goal:17,xp:321,diagnosticDone:true,diagnosticAnswers:8,scores:{},selectedSubjectIds:["math-a"],activeSubjectId:"math-a",
    firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},
    subjectProgress:{},missionHistory:[{id:"m-sint",completionId:"m-sint",xp:21}],examHistory:[],betaMode:"internal",pedagogicalIdVersion:1,
    profile:{schoolYear:"12.º",syllabus:"most",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:now};
  const seeded={[G("a25")]:JSON.stringify(state),[G("a25-completed-sessions-v1")]:JSON.stringify([{id:"m-sint",status:"committed",at:now}]),
    [G("approva.portuguese-writing-memory.v1")]:JSON.stringify([{attemptId:"pt-sint",criterionId:"c1",status:"weak",at:now}])};
  // Página sem a app (mesma origem) para semear: escritor anterior registado, sem selo (fecho abrupto).
  await page.goto("/privacidade");
  const filled=await page.evaluate(async seed=>{
    localStorage.clear();sessionStorage.clear();
    for(const [k,v] of Object.entries(seed))localStorage.setItem(k,v);
    localStorage.setItem("a25-ws-v2:global:~legacy-import",JSON.stringify({status:"done",at:1,fp:{}}));
    const mandate={tab:"writer-synthetic-crashed",epoch:"e-crashed",local:true,at:1};
    localStorage.setItem("a25-ws-v2:global:~writer-mandate",JSON.stringify({tab:mandate.tab,epoch:mandate.epoch}));
    await new Promise((resolve,reject)=>{const r=indexedDB.open("approva-state-writer-v2",1);r.onupgradeneeded=()=>r.result.createObjectStore("mandates");
      r.onsuccess=()=>{const tx=r.result.transaction("mandates","readwrite");tx.objectStore("mandates").put(mandate,"mandate:global");tx.oncomplete=()=>{r.result.close();resolve();};tx.onerror=()=>reject(tx.error);};r.onerror=()=>reject(r.error);});
    // Encher a quota da origem com cópias de recuperação antigas (apagáveis depois de descarregadas).
    let n=0;
    for(const size of [400_000,40_000,4_000,400,40])for(;;){
      const key=`a25-ws-v2:global:~recovery:old-${n}`;
      const raw=JSON.stringify({format:"aplus-state-recovery-copy-v2",scope:"global",reason:"synthetic-old",at:n+1,keys:{a25:JSON.stringify({_stateVersion:31,xp:n,pad:"x".repeat(size)})}});
      try{localStorage.setItem(key,raw);n++;}catch{break;}
    }
    return n;
  },seeded);
  expect(filled).toBeGreaterThan(3);
  const before=await local(page);
  await page.goto("/");
  await expect(page.locator('[data-state-writer="recovery-hold"]')).toBeVisible({timeout:30_000});
  await page.getByRole("button",{name:"Continuar neste separador"}).click();
  await page.getByRole("button",{name:"Guardar cópia e continuar aqui"}).click();
  await page.waitForTimeout(1_000);
  await expect(page.locator('[data-state-writer="recovery-hold"]'),"sem espaço para a cópia prévia: continua em retenção").toBeVisible();
  let now1=await local(page);
  for(const k of KEYS)expect(now1[G(k)]??null,`retenção não escreve ${k}`).toBe(before[G(k)]??null);
  // Cofre de cópias sem ser escritor (no SHA vulnerável não existe: impasse).
  await expect(page.getByRole("button",{name:"Ver e descarregar cópias de recuperação"}),"saída do impasse disponível em retenção").toBeVisible({timeout:5_000});
  await expect(page.locator('[data-recovery-no-space="true"]')).toBeVisible();
  await page.getByRole("button",{name:"Ver e descarregar cópias de recuperação"}).click();
  await expect(page.locator('[data-recovery-copies="true"]')).toBeVisible();
  await expect(page.locator('[data-recovery-readonly="true"]')).toBeVisible();
  await expect(page.getByRole("button",{name:"Restaurar esta cópia"}),"restaurar só no escritor").toHaveCount(0);
  const item=page.locator('li[data-recovery-copy="a25-ws-v2:global:~recovery:old-0"]');
  const download=page.waitForEvent("download");
  await item.getByRole("button",{name:"Descarregar"}).click();
  const file=await download;
  const exported=JSON.parse(await (await file.createReadStream()).toArray().then(chunks=>Buffer.concat(chunks).toString("utf8")));
  expect(parse(exported.keys.a25)?.xp,"exportação com os bytes da cópia").toBe(0);
  await item.getByRole("button",{name:"Apagar esta cópia"}).click();
  await expect(page.locator('[data-recovery-message="true"]')).toHaveText("Cópia apagada deste dispositivo.");
  now1=await local(page);
  expect(now1["a25-ws-v2:global:~recovery:old-0"]).toBeUndefined();
  await page.getByRole("button",{name:"Voltar"}).click();
  // Agora há espaço: guardar a cópia prévia e continuar.
  await page.getByRole("button",{name:"Continuar neste separador"}).click();
  await page.getByRole("button",{name:"Guardar cópia e continuar aqui"}).click();
  await expect(page.locator('[data-state-writer="recovery-hold"]')).toHaveCount(0,{timeout:15_000});
  const after=await local(page);
  expect(parse(after[G("a25")])?.xp,"XP intacto").toBe(321);
  expect((parse(after[G("a25")])?.missionHistory||[]).map(m=>m.completionId)).toContain("m-sint");
  expect(after[G("a25-completed-sessions-v1")],"recibos D3 intactos").toBe(before[G("a25-completed-sessions-v1")]);
  expect(after[G("approva.portuguese-writing-memory.v1")],"memória de escrita intacta").toBe(before[G("approva.portuguese-writing-memory.v1")]);
  const adoption=Object.entries(after).filter(([k])=>k.startsWith("a25-ws-v2:global:~recovery:")).map(([,v])=>parse(v)).find(c=>String(c?.reason).startsWith("unclean_end_adoption"));
  expect(parse(adoption?.keys?.a25)?.xp,"cópia prévia da adoção com o progresso").toBe(321);
  await context.close();
});
