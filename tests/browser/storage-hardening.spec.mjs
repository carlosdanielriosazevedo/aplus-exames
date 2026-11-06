// Arranque com armazenamento bloqueado e conclusões de Português.
// Provas por dados persistidos, nunca por avisos visuais. Dados sintéticos.
import {test,expect} from "@playwright/test";
import {readFileSync} from "node:fs";
import {buildMiniExam,emptyScores} from "../../app/lib/engine.js";

const FAULT="__synthetic-storage-fault";
const MATH_DRAFT="a25-active-session-v1";
const REGISTRY="a25-completed-sessions-v1";

async function installFaults(context){
  await context.addInitScript(({FAULT})=>{
    const local=window.localStorage,session=window.sessionStorage;
    window.__real={local,session};
    window.__pageErrors=[];
    window.addEventListener("error",event=>window.__pageErrors.push(String(event.message||event.error)));
    let fault={};try{fault=JSON.parse(local.getItem(FAULT)||"{}")}catch{}
    const set=Storage.prototype.setItem;
    Storage.prototype.setItem=function(key,value){
      if(String(value).length>4000&&this===local&&fault.localLarge)throw new DOMException("synthetic quota","QuotaExceededError");
      return set.call(this,key,value);
    };
    if(fault.localBlocked)Object.defineProperty(window,"localStorage",{configurable:true,get(){throw new DOMException("synthetic","SecurityError")}});
  },{FAULT});
}

async function newContext(browser,viewport){
  const context=await browser.newContext({viewport});
  await installFaults(context);
  return context;
}
function collectErrors(page){
  const errors=[];
  page.on("pageerror",error=>errors.push(String(error?.message||error)));
  return errors;
}
// P1-A v2: as sementes são o estado anterior (chaves brutas), importado pela
// nova versão; com quota cheia simulada, importa-se primeiro com espaço livre e
// só depois o armazenamento enche (a falha ao concluir, que é o que se prova).
async function prepare(page,{fault={},local={},session={}}){
  await page.goto("/");
  const importFirst=!!fault.localLarge;
  await page.evaluate(({fault,local,session,FAULT,importFirst})=>{
    const real=window.__real;
    real.local.clear();real.session.clear();
    if(importFirst)real.local.removeItem(FAULT);else real.local.setItem(FAULT,JSON.stringify(fault));
    for(const [k,v] of Object.entries(local))real.local.setItem(k,v);
    for(const [k,v] of Object.entries(session))real.session.setItem(k,v);
  },{fault,local,session,FAULT,importFirst});
  if(importFirst){
    await page.goto("/");
    await expect.poll(()=>page.evaluate(()=>window.__real.local.getItem("a25-ws-v2:global:~legacy-import")!==null),{timeout:30_000}).toBe(true);
    await page.evaluate(({fault,FAULT})=>window.__real.local.setItem(FAULT,JSON.stringify(fault)),{fault,FAULT});
  }
}
// Vista do progresso da app: chaves canónicas pelo nome curto; legado em "legacy:<chave>".
const readStores=page=>page.evaluate(()=>{
  const PREFIX="a25-ws-v2:global:";
  const ACADEMIC=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1","applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715","a25-completed-sessions-v1","approva.portuguese-writing-memory.v1"];
  const dump=store=>{const out={};for(const k of Object.keys(store)){const v=store.getItem(k);
    if(k.startsWith(PREFIX)&&!k.startsWith(PREFIX+"~"))out[k.slice(PREFIX.length)]=v;
    else if(ACADEMIC.includes(k))out["legacy:"+k]=v;else out[k]=v;}return out;};
  return {local:dump(window.__real.local),session:dump(window.__real.session)};
});
const parse=raw=>{try{return JSON.parse(raw)}catch{return null}};

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
  return {state:JSON.stringify(state),draft:JSON.stringify(draft)};
}
const mathEntries=(raw,sid)=>(parse(raw)?.examHistory||[]).filter(x=>x.completionId===sid).length;

// Histórico sintético de sessões anteriores (estado realista com mais de 4000 caracteres).
function priorSessions(now){
  const final={status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic"};
  return Array.from({length:10},(_,i)=>({sessionId:`synthetic-prior-${i}`,kind:"training",label:"Treino sintético",domain:null,
    itemIds:Array.from({length:6},(_,j)=>`synthetic-item-${i}-${j}`),results:Array.from({length:6},()=>({...final})),completedAt:now-(i+1)*86400000}));
}
function portugueseBase(now){
  const base=portugueseBaseCore(now);
  base.subjectProgress.portuguese.sessions=priorSessions(now);
  base.subjectProgress.portuguese.completedSessionIds=base.subjectProgress.portuguese.sessions.map(row=>row.sessionId);
  return base;
}
function portugueseBaseCore(now){
  return {goal:17,xp:175,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),selectedSubjectIds:["portuguese"],activeSubjectId:"portuguese",
    firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{portuguese:{profileConfigured:true,goal:17}},
    subjectProgress:{portuguese:{subjectId:"portuguese",version:4,diagnosticDone:true,diagnosticCompletedAt:now-100000,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:now}},
    profile:{schoolYear:"12.º",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
}
function portugueseMissionFixture(sessionId){
  const now=Date.now();
  const ids=JSON.parse(readFileSync(new URL("../../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8")).items.slice(0,7).map(x=>x.id);
  const final={status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic",classificationMode:null,requiresReview:false,responseText:"",type1Count:0,type2Count:0};
  const state=portugueseBase(now);
  state.subjectProgress.portuguese.lastPosition={sessionId,kind:"mission",label:"Missão recomendada",domain:null,itemIds:ids,current:ids.length-1,
    results:Array.from({length:ids.length-1},()=>({...final})),currentResult:{...final},currentAnswer:0,startedAt:now-60000,updatedAt:now};
  return JSON.stringify(state);
}
function portugueseMiniExamFixture(attemptId){
  const now=Date.now();
  const state=portugueseBase(now);
  // Sem itemIds: o normalizador aceita e usa os itens do modelo "mini-1" (12.º ano).
  state.subjectSettings.portuguese.miniExamDraft={version:2,examId:"mini-1",index:0,review:true,answers:{},attemptId,startedAt:now-600_000,updatedAt:now};
  return JSON.stringify(state);
}
const ptState=raw=>parse(raw)?.subjectProgress?.portuguese||{};
const ptCompleted=(raw,sid)=>(ptState(raw).sessions||[]).filter(row=>row.sessionId===sid).length;

for(const viewport of [{width:390,height:844},{width:1366,height:768}]){
  test.describe(`armazenamento · ${viewport.width}×${viewport.height}`,()=>{

    test("bloqueado desde o primeiro carregamento: a app arranca sem erros",async({browser})=>{
      const context=await newContext(browser,viewport);
      const page=await context.newPage();
      const errors=collectErrors(page);
      await prepare(page,{fault:{localBlocked:true}});
      await page.goto("/");
      await page.getByRole("button",{name:/Descobrir o meu nível/}).click();
      await expect(page.locator(".landing, .hero")).toHaveCount(0,{timeout:30_000});
      await page.waitForTimeout(1500);
      expect(errors,"erros de página com armazenamento bloqueado").toEqual([]);
      await context.close();
    });

    test("bloqueado: avaliação nunca dada como concluída; reload, recuperação e conclusão única",async({browser})=>{
      const context=await newContext(browser,viewport);
      let page=await context.newPage();
      const errors=collectErrors(page);
      const sid=`synthetic-blocked-${viewport.width}`;
      const fixture=mathFixture(sid);
      await prepare(page,{fault:{localBlocked:true},session:{a25:fixture.state,[MATH_DRAFT]:fixture.draft}});
      await page.goto("/");
      const submit=page.getByRole("button",{name:"Entregar Mini-exame",exact:true});
      await expect(submit).toBeVisible({timeout:30_000});
      await submit.click();
      // O aviso não promete que as respostas estão guardadas: estão só no separador.
      const blocked=page.locator("[data-completion-block]");
      await expect(blocked).toHaveAttribute("data-storage-risk","tab",{timeout:20_000});
      await expect(blocked).toContainText("Se o fechares antes de a avaliação ficar guardada de forma segura, perdes estas respostas.");
      await expect(blocked).not.toContainText("continuam guardadas");
      await expect(blocked).not.toContainText("A tua sessão está guardada");
      await page.waitForTimeout(500);
      let stores=await readStores(page);
      expect(mathEntries(stores.session.a25,sid),"conclusão gravada só no separador").toBe(0);
      expect(stores.session[MATH_DRAFT],"rascunho do separador apagado").toBeTruthy();
      expect(stores.local[REGISTRY]??null).toBe(null);
      // reload continua a permitir retomar
      await page.reload();
      await expect(submit).toBeVisible({timeout:30_000});
      // armazenamento recuperado
      await page.evaluate(FAULT=>window.__real.local.removeItem(FAULT),FAULT);
      await page.reload();
      await expect(submit).toBeVisible({timeout:30_000});
      await submit.click();
      await expect.poll(async()=>mathEntries((await readStores(page)).local.a25,sid),{timeout:20_000}).toBe(1);
      stores=await readStores(page);
      expect(stores.local[MATH_DRAFT]??null).toBe(null);
      expect((parse(stores.local[REGISTRY])||[]).filter(x=>x.id===sid&&x.status==="committed")).toHaveLength(1);
      // fechar o separador: a conclusão está em localStorage
      await page.close();
      page=await context.newPage();
      await page.goto("/");await page.waitForTimeout(2000);
      expect(mathEntries((await readStores(page)).local.a25,sid)).toBe(1);
      expect(errors).toEqual([]);
      await context.close();
    });

    test("bloqueado em duas abas: a segunda arranca e não toca nos dados da primeira",async({browser})=>{
      const context=await newContext(browser,viewport);
      const a=await context.newPage();
      const errorsA=collectErrors(a);
      const sid=`synthetic-blocked-tabs-${viewport.width}`;
      const fixture=mathFixture(sid);
      await prepare(a,{fault:{localBlocked:true},session:{a25:fixture.state,[MATH_DRAFT]:fixture.draft}});
      await a.goto("/");
      await expect(a.getByRole("button",{name:"Entregar Mini-exame",exact:true})).toBeVisible({timeout:30_000});
      const before=await readStores(a);
      // Anti-vacuidade (v2): o rascunho e o estado lidos são os que a app tem no separador.
      expect(before.session[MATH_DRAFT],"pré-condição: rascunho canónico do separador").toBeTruthy();
      expect(before.session.a25,"pré-condição: estado canónico do separador").toBeTruthy();
      const b=await context.newPage();
      const errorsB=collectErrors(b);
      await b.goto("/");
      await b.getByRole("button",{name:/Descobrir o meu nível/}).click();
      await b.waitForTimeout(2000);
      const after=await readStores(a);
      expect(after.session[MATH_DRAFT]).toBe(before.session[MATH_DRAFT]);
      expect(mathEntries(after.session.a25,sid)).toBe(0);
      expect(errorsA).toEqual([]);expect(errorsB).toEqual([]);
      await context.close();
    });

    for(const [label,build,open,finish,completed,pending] of [
      ["Português · sessão",portugueseMissionFixture,
        async page=>{await page.getByRole("button",{name:"Continuar sessão",exact:true}).first().click()},
        page=>page.getByRole("button",{name:"Ver resultado",exact:true}),
        (raw,sid)=>ptCompleted(raw,sid),
        (raw,sid)=>ptState(raw).lastPosition?.sessionId===sid],
      ["Português · mini-exame",portugueseMiniExamFixture,
        async page=>{await page.getByRole("button",{name:/Continuar/}).first().click()},
        page=>page.getByRole("button",{name:/Guardar revisão e/}),
        (raw,sid)=>ptCompleted(raw,sid),
        (raw,sid)=>parse(raw)?.subjectSettings?.portuguese?.miniExamDraft?.attemptId===sid]
    ])test(`${label}: localStorage cheio — prova comportamental de preservação`,async({browser},testInfo)=>{
      const context=await newContext(browser,viewport);
      let page=await context.newPage();
      const sid=`synthetic-pt-${viewport.width}-${label.length}`;
      // o estado de Português ultrapassa a quota simulada (>4000 caracteres)
      const raw=build(sid);
      expect(raw.length).toBeGreaterThan(4000);
      await prepare(page,{fault:{localLarge:true},local:{a25:raw}});
      await page.goto("/");
      await open(page);
      const button=finish(page);
      await expect(button).toBeVisible({timeout:30_000});
      await button.click();
      await page.waitForTimeout(1500);
      const evidence={afterFinish:await readStores(page)};
      await page.close();
      page=await context.newPage();
      await page.goto("/");await page.waitForTimeout(2500);
      evidence.afterTabClose=await readStores(page);
      const summary=stage=>({completed:completed(evidence[stage].local.a25,sid),pending:pending(evidence[stage].local.a25,sid),
        completedOnlyInTab:completed(evidence[stage].session.a25,sid)>0&&completed(evidence[stage].local.a25,sid)===0});
      await testInfo.attach("evidence.json",{body:JSON.stringify({afterFinish:summary("afterFinish"),afterTabClose:summary("afterTabClose")},null,1),contentType:"application/json"});
      // Confirmação falsa: a conclusão foi gravada e apresentada só no separador.
      const finished=summary("afterFinish");
      expect.soft(finished.completedOnlyInTab,`CONFIRMAÇÃO FALSA: conclusão só em sessionStorage: ${JSON.stringify(finished)}`).toBe(false);
      const closed=summary("afterTabClose");
      expect(closed.completed+(closed.pending?1:0),`AVALIAÇÃO PERDIDA após fechar o separador: ${JSON.stringify(closed)}`).toBeGreaterThan(0);
      expect(closed.completed).toBeLessThanOrEqual(1);
      // armazenamento recuperado: conclui uma única vez
      await page.evaluate(FAULT=>window.__real.local.removeItem(FAULT),FAULT);
      if(closed.completed===0){
        await page.reload();
        await open(page);
        await expect(finish(page)).toBeVisible({timeout:30_000});
        await finish(page).click();
        await expect.poll(async()=>completed((await readStores(page)).local.a25,sid),{timeout:20_000}).toBe(1);
      }
      const final=await readStores(page);
      expect(completed(final.local.a25,sid)).toBe(1);
      expect(pending(final.local.a25,sid)).toBe(false);
      await context.close();
    });
  });
}
