// Durabilidade da conclusão em Chromium real. Dados exclusivamente sintéticos.
// Invariante: uma avaliação apresentada como concluída tem de existir em
// localStorage; se não existir, o rascunho tem de sobreviver em localStorage.
import {test,expect} from "@playwright/test";
import {buildMiniExam,emptyScores} from "../../app/lib/engine.js";

const REGISTRY="a25-completed-sessions-v1";
const DRAFT="a25-active-session-v1";
const FAULT="__synthetic-storage-fault";

function fixture(sessionId){
  const now=Date.now();
  const state={goal:17,xp:100,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),
    selectedSubjectIds:["math-a"],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,
    onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},
    missionHistory:[],examHistory:[],betaMode:"internal",pedagogicalIdVersion:1,
    profile:{schoolYear:"12.º",syllabus:"most",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,_savedAt:now};
  const questions=buildMiniExam(state);
  const answers=questions.map(q=>q.response?.type==="choice"||(q.a!==undefined&&!q.response)?q.a:null);
  const session={sessionId,questions,answers,markedForReview:[],current:questions.length-1,startedAt:now-600_000};
  return {state,draft:{kind:"mini_exam",betaMode:"internal",screen:"miniExamReview",session,savedAt:now}};
}

// Falhas sintéticas de armazenamento, lidas no arranque de cada documento:
//  localLarge: localStorage recusa valores grandes (quota cheia; recibos pequenos cabem)
//  sessionLarge: idem para sessionStorage
//  localBlocked: aceder a localStorage lança SecurityError (ver docs/security/durable-completion.md:
//  a app não arranca neste modo — defeito pré-existente, fora deste âmbito)
async function installFaults(context){
  await context.addInitScript(({FAULT})=>{
    const local=window.localStorage,session=window.sessionStorage;
    window.__real={local,session};
    let fault={};try{fault=JSON.parse(local.getItem(FAULT)||"{}")}catch{}
    const set=Storage.prototype.setItem;
    Storage.prototype.setItem=function(key,value){
      const big=String(value).length>4000;
      if(big&&((this===local&&fault.localLarge)||(this===session&&fault.sessionLarge)))
        throw new DOMException("synthetic quota","QuotaExceededError");
      return set.call(this,key,value);
    };
    if(fault.localBlocked)Object.defineProperty(window,"localStorage",{configurable:true,get(){throw new DOMException("synthetic","SecurityError")}});
  },{FAULT});
}

async function seed(page,{state,draft},fault){
  await page.goto("/");
  await page.evaluate(({state,draft,fault,DRAFT,FAULT})=>{
    const {local,session}=window.__real;
    local.clear();session.clear();
    local.setItem("a25",JSON.stringify(state));
    local.setItem(DRAFT,JSON.stringify(draft));
    local.setItem(FAULT,JSON.stringify(fault));
  },{state,draft,fault,DRAFT,FAULT});
}

function snapshot(page,sid){
  return page.evaluate(({sid,DRAFT,REGISTRY})=>{
    const {local,session}=window.__real;
    const parse=raw=>{try{return JSON.parse(raw)}catch{return null}};
    const entries=raw=>(parse(raw)?.examHistory||[]).filter(x=>x.completionId===sid).length;
    const registry=parse(local.getItem(REGISTRY))||[];
    return {
      localEntries:entries(local.getItem("a25")),
      sessionEntries:entries(session.getItem("a25")),
      localXp:parse(local.getItem("a25"))?.xp??null,
      localDraft:local.getItem(DRAFT)!==null,
      sessionDraft:session.getItem(DRAFT)!==null,
      committed:registry.some(x=>x.id===sid&&x.status!=="pending"),
      blocked:document.querySelector("[data-completion-block]")?.getAttribute("data-completion-block")||null,
      result:/Mini-exame/i.test(document.querySelector("h1")?.textContent||"")&&!document.querySelector("[data-completion-block]")
    };
  },{sid,DRAFT,REGISTRY});
}

const submit=page=>page.getByRole("button",{name:"Entregar Mini-exame",exact:true});

async function openReview(page){
  await page.goto("/");
  await expect(submit(page)).toBeVisible({timeout:30_000});
}

// Simula fechar o separador e abrir outro: sessionStorage novo, localStorage igual.
async function reopenInNewTab(context,page){
  await page.close();
  const tab=await context.newPage();
  await tab.goto("/");
  await tab.waitForTimeout(2500);
  return tab;
}

for(const viewport of [{width:390,height:844},{width:1366,height:768}]){
  test.describe(`durabilidade da conclusão · ${viewport.width}×${viewport.height}`,()=>{
    for(const [label,fault] of [
      ["localStorage cheio (só separador)",{localLarge:true}],
      ["localStorage e sessionStorage cheios (só memória)",{localLarge:true,sessionLarge:true}]
    ])test(`${label}: prova comportamental — a avaliação nunca se perde`,async({browser},testInfo)=>{
      // Prova só por dados: o resultado não depende de nenhum aviso visual.
      const context=await browser.newContext({viewport});
      await installFaults(context);
      let page=await context.newPage();
      const sid=`synthetic-durable-${viewport.width}-${label.length}`;
      await seed(page,fixture(sid),fault);
      await openReview(page);
      await submit(page).click();
      await page.waitForTimeout(1500);
      const evidence={};
      evidence.afterSubmit=await snapshot(page,sid);
      await page.reload();await page.waitForTimeout(2000);
      evidence.afterReload=await snapshot(page,sid);
      page=await reopenInNewTab(context,page);
      evidence.afterTabClose=await snapshot(page,sid);
      await testInfo.attach("evidence.json",{body:JSON.stringify(evidence,null,1),contentType:"application/json"});
      const {afterSubmit,afterReload,afterTabClose}=evidence;
      // Integridade dos dados (todas avaliadas, mesmo que uma falhe):
      expect.soft(afterSubmit.result&&afterSubmit.localEntries===0,`resultado mostrado sem avaliação em localStorage: ${JSON.stringify(afterSubmit)}`).toBe(false);
      expect.soft(afterSubmit.localEntries===0&&!afterSubmit.localDraft,`rascunho durável apagado sem avaliação durável: ${JSON.stringify(afterSubmit)}`).toBe(false);
      expect.soft(afterSubmit.committed&&afterSubmit.localEntries===0,`recibo confirmado sem avaliação durável: ${JSON.stringify(afterSubmit)}`).toBe(false);
      expect.soft(afterReload.localEntries+(afterReload.localDraft?1:0),`avaliação e rascunho perdidos após reload: ${JSON.stringify(afterReload)}`).toBeGreaterThan(0);
      expect(afterTabClose.localEntries+(afterTabClose.localDraft?1:0),`AVALIAÇÃO PERDIDA após fechar o separador: ${JSON.stringify(afterTabClose)}`).toBeGreaterThan(0);
      // Armazenamento recuperado: concluir uma única vez, XP uma vez.
      await page.evaluate(FAULT=>window.__real.local.removeItem(FAULT),FAULT);
      if(afterTabClose.localEntries===0){
        await openReview(page);
        await submit(page).click();
        await expect.poll(async()=>(await snapshot(page,sid)).localEntries,{timeout:20_000}).toBe(1);
        await expect.poll(async()=>(await snapshot(page,sid)).localDraft,{timeout:20_000}).toBe(false);
      }
      const final=await snapshot(page,sid);
      expect(final.localEntries).toBe(1);
      expect(final.committed).toBe(true);
      expect(final.localXp).toBeGreaterThanOrEqual(100);
      await context.close();
    });

    for(const [label,fault,tier] of [
      ["só separador",{localLarge:true},"tab"],
      ["só memória",{localLarge:true,sessionLarge:true},"memory"]
    ])test(`aviso ao aluno (complementar, não prova de integridade): ${label}`,async({browser})=>{
      const context=await browser.newContext({viewport});
      await installFaults(context);
      const page=await context.newPage();
      await seed(page,fixture(`synthetic-notice-${viewport.width}-${tier}`),fault);
      await openReview(page);
      await expect(page.locator(`[data-storage-tier="${tier}"]`)).toBeVisible({timeout:10_000});
      // Ao entregar, o ecrã de bloqueio diz onde estão de facto as respostas.
      await submit(page).click();
      const blocked=page.locator("[data-completion-block]");
      await expect(blocked).toHaveAttribute("data-storage-risk",tier,{timeout:20_000});
      await expect(blocked).toContainText(tier==="memory"?"Se atualizares ou fechares esta página":"Se o fechares antes de a avaliação ficar guardada");
      await expect(blocked).not.toContainText("A tua sessão está guardada");
      await context.close();
    });

    test("duas abas com localStorage cheio: nenhuma confirma nem duplica",async({browser})=>{
      const context=await browser.newContext({viewport});
      await installFaults(context);
      const a=await context.newPage();
      const sid=`synthetic-durable-tabs-${viewport.width}`;
      await seed(a,fixture(sid),{localLarge:true});
      const b=await context.newPage();
      await openReview(a);await openReview(b);
      await Promise.all([submit(a).click(),submit(b).click()]);
      await a.waitForTimeout(1500);
      for(const page of [a,b]){
        const snap=await snapshot(page,sid);
        if(!snap.blocked)expect(snap.localEntries).toBe(1);
        expect(snap.localEntries+(snap.localDraft?1:0)).toBeGreaterThan(0);
        expect(snap.localEntries).toBeLessThanOrEqual(1);
      }
      await context.close();
    });
  });
}
