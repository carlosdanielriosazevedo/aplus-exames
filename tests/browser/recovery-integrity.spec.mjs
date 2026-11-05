// D1–D3 em Chromium real. Dados exclusivamente sintéticos.
// Simula interrupções congelando o armazenamento a partir de uma escrita
// escolhida (equivalente a o separador morrer nesse ponto) e recarregando.
import {test,expect} from "@playwright/test";
import {buildMiniExam,emptyScores} from "../../app/lib/engine.js";

const REGISTRY="a25-completed-sessions-v1";
const DRAFT="a25-active-session-v1";
const QUARANTINE_PREFIX="a25-completed-sessions-v1-quarantine-";

function answerFor(question){
  if(question.response?.type==="choice"||question.a!==undefined&&!question.response)return question.a;
  return null;
}

function fixture(sessionId){
  const now=Date.now();
  const state={goal:17,xp:100,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),
    selectedSubjectIds:["math-a"],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,
    onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},
    missionHistory:[],examHistory:[],betaMode:"internal",pedagogicalIdVersion:1,
    profile:{schoolYear:"12.º",syllabus:"most",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,_savedAt:now};
  const questions=buildMiniExam(state);
  const session={sessionId,questions,answers:questions.map(answerFor),markedForReview:[],current:questions.length-1,startedAt:now-600_000};
  const draft={kind:"mini_exam",betaMode:"internal",screen:"miniExamReview",session,savedAt:now};
  return {state,draft};
}

async function installCrashSwitch(page){
  await page.addInitScript(()=>{
    const set=Storage.prototype.setItem,remove=Storage.prototype.removeItem;
    let frozen=false,seen=0;
    window.__crash={key:null,nth:1};
    Storage.prototype.setItem=function(key,value){
      if(frozen)return;
      set.call(this,key,value);
      if(window.__crash.key===key&&++seen>=window.__crash.nth)frozen=true;
    };
    Storage.prototype.removeItem=function(key){if(!frozen)remove.call(this,key)};
    window.__crashNow=()=>{frozen=true};
  });
}

async function seed(page,{state,draft,registry=undefined,extra={}}){
  await page.goto("/");
  await page.evaluate(({state,draft,registry,extra,DRAFT,REGISTRY})=>{
    localStorage.clear();sessionStorage.clear();
    localStorage.setItem("a25",typeof state==="string"?state:JSON.stringify(state));
    if(draft)localStorage.setItem(DRAFT,JSON.stringify(draft));
    if(registry!==undefined)localStorage.setItem(REGISTRY,registry);
    for(const [k,v] of Object.entries(extra))localStorage.setItem(k,v);
  },{state,draft,registry,extra,DRAFT,REGISTRY});
}

const submitButton=page=>page.getByRole("button",{name:"Entregar Mini-exame",exact:true});

async function openReview(page){
  await page.goto("/");
  await expect(submitButton(page)).toBeVisible({timeout:30_000});
}

function read(page,sessionId){
  return page.evaluate(({sessionId,DRAFT,REGISTRY,QUARANTINE_PREFIX})=>{
    const raw=localStorage.getItem("a25");
    let state=null;try{state=JSON.parse(raw)}catch{}
    const quarantine=Object.keys(localStorage).filter(k=>k.startsWith(QUARANTINE_PREFIX)).map(k=>localStorage.getItem(k));
    return {
      raw,
      xp:state?.xp??null,
      entries:(state?.examHistory||[]).filter(x=>x.completionId===sessionId).length,
      draft:localStorage.getItem(DRAFT)!==null,
      registry:localStorage.getItem(REGISTRY),
      quarantine
    };
  },{sessionId,DRAFT,REGISTRY,QUARANTINE_PREFIX});
}

async function completeOnce(page,sessionId){
  await submitButton(page).click();
  await expect.poll(async()=>(await read(page,sessionId)).entries,{timeout:20_000}).toBe(1);
  await expect.poll(async()=>(await read(page,sessionId)).draft,{timeout:20_000}).toBe(false);
  return read(page,sessionId);
}

async function baselineXp(page,sessionId){
  const {state,draft}=fixture(sessionId);
  await seed(page,{state,draft});
  await openReview(page);
  return (await completeOnce(page,sessionId)).xp;
}

for(const viewport of [{width:390,height:844},{width:1366,height:768}]){
  const label=`${viewport.width}×${viewport.height}`;

  test.describe(`recuperação de conclusões · ${label}`,()=>{
    test.beforeEach(async({page})=>{await page.setViewportSize(viewport);await installCrashSwitch(page)});

    for(const [point,crash] of [
      ["antes de qualquer escrita",{now:true}],
      ["depois da reserva do recibo",{key:REGISTRY,nth:1}],
      ["depois de gravar a avaliação",{key:"a25",nth:1}],
      ["depois de confirmar o recibo",{key:REGISTRY,nth:2}]
    ])test(`D3 · interrupção ${point}: retoma sem perda nem XP duplicado`,async({page})=>{
      const sid=`synthetic-d3-${viewport.width}-${point.length}`;
      const expectedXp=await baselineXp(page,sid+"-baseline");
      const {state,draft}=fixture(sid);
      await seed(page,{state,draft});
      await openReview(page);
      await page.evaluate(crash=>{if(crash.now)window.__crashNow();else window.__crash={key:crash.key,nth:crash.nth}},crash);
      await submitButton(page).click();
      await page.waitForTimeout(800);
      // o separador "morre": recarregar
      await page.goto("/");
      const review=submitButton(page);
      // Se o rascunho sobreviveu à interrupção, a app tem de reabrir a revisão.
      if((await read(page,sid)).draft){
        await expect(review).toBeVisible({timeout:30_000});
        await review.click();
      }
      await expect.poll(async()=>(await read(page,sid)).entries,{timeout:20_000}).toBe(1);
      await expect.poll(async()=>(await read(page,sid)).draft,{timeout:20_000}).toBe(false);
      const after=await read(page,sid);
      expect(after.entries).toBe(1);
      expect(after.xp).toBe(expectedXp);
      expect(JSON.parse(after.registry).find(x=>x.id===sid)?.status).toBe("committed");
      // Uma nova tentativa de entregar não reaplica nada.
      await page.reload();
      await page.waitForTimeout(1000);
      expect((await read(page,sid)).entries).toBe(1);
    });

    test("D3 · recibo antigo de uma interrupção no código anterior é recuperado",async({page})=>{
      const sid=`synthetic-legacy-${viewport.width}`;
      const {state,draft}=fixture(sid);
      await seed(page,{state,draft,registry:JSON.stringify([{id:sid,at:Date.now()-60_000}])});
      await openReview(page);
      const after=await completeOnce(page,sid);
      expect(after.entries).toBe(1);
    });

    test("D3 · perda do registo depois da conclusão não duplica avaliação nem XP",async({page})=>{
      const sid=`synthetic-loss-${viewport.width}`;
      const {state,draft}=fixture(sid);
      await seed(page,{state,draft});
      await openReview(page);
      const first=await completeOnce(page,sid);
      // o registo desaparece e o rascunho reaparece (ex.: restauro parcial)
      await page.evaluate(({draft,DRAFT,REGISTRY})=>{localStorage.removeItem(REGISTRY);localStorage.setItem(DRAFT,JSON.stringify({...draft,savedAt:Date.now()}))},{draft,DRAFT,REGISTRY});
      await openReview(page);
      await submitButton(page).click();
      await expect.poll(async()=>(await read(page,sid)).draft,{timeout:20_000}).toBe(false);
      const after=await read(page,sid);
      expect(after.entries).toBe(1);
      expect(after.xp).toBe(first.xp);
    });

    test("D1 · registo ilegível: bloqueia, preserva bytes e rascunho; reparação explícita conclui uma vez",async({page})=>{
      const sid=`synthetic-d1-${viewport.width}`;
      const corrupt='[{"id":"synthetic-previous","at":1},{"id":';
      const {state,draft}=fixture(sid);
      await seed(page,{state,draft,registry:corrupt});
      await openReview(page);
      await submitButton(page).click();
      await expect(page.locator('[data-completion-block="registry_corrupt"]')).toBeVisible({timeout:20_000});
      let snap=await read(page,sid);
      expect(snap.registry).toBe(corrupt);
      expect(snap.draft).toBe(true);
      expect(snap.entries).toBe(0);
      await page.getByRole("button",{name:"Guardar cópia e reparar",exact:true}).click();
      await expect.poll(async()=>(await read(page,sid)).quarantine,{timeout:10_000}).toEqual([corrupt]);
      await openReview(page);
      snap=await completeOnce(page,sid);
      expect(snap.entries).toBe(1);
      expect(snap.quarantine).toEqual([corrupt]);
    });

    test("D3 · duas abas a entregar a mesma sessão: uma única conclusão",async({page,context})=>{
      const sid=`synthetic-tabs-${viewport.width}`;
      const {state,draft}=fixture(sid);
      await seed(page,{state,draft});
      const other=await context.newPage();
      await other.setViewportSize(viewport);
      await openReview(page);
      // P1-A (auditoria #459): só um separador escreve. A segunda aba não chega a
      // poder entregar; tenta e reativa enquanto a primeira conclui.
      await other.goto("/");
      await expect(other.locator("[data-state-writer='observer']")).toBeVisible({timeout:30_000});
      await expect(submitButton(other)).toHaveCount(0);
      await Promise.all([submitButton(page).click(),other.evaluate(()=>{document.dispatchEvent(new Event("visibilitychange"));window.dispatchEvent(new Event("focus"))})]);
      await page.waitForTimeout(1500);
      await expect.poll(async()=>(await read(page,sid)).entries,{timeout:20_000}).toBe(1);
      // a outra aba não pode reaplicar nem apagar a conclusão (nem depois de passar a escrever)
      await other.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
      await expect(other.locator("[data-state-writer='observer']")).toHaveCount(0,{timeout:20_000});
      await other.waitForTimeout(1500);
      expect((await read(other,sid)).entries).toBe(1);
      await other.reload();await page.reload();
      await page.waitForTimeout(1500);
      expect((await read(page,sid)).entries).toBe(1);
      await other.close();
    });

    for(const [label2,raw,reason] of [
      ["versão futura",JSON.stringify({...fixture("x").state,xp:4242,futureOnly:{kept:true},_stateVersion:99}),"state_version_future"],
      ["estado ilegível",'{"xp":4242,"examHistory":[',"state_unreadable"]
    ])test(`D2 · ${label2}: não carrega, não grava, não apaga`,async({page})=>{
      await seed(page,{state:raw,draft:null});
      await page.goto("/");
      // Versão futura: aviso D2 sem escrita. JSON ilegível: na base #455 segue o
      // percurso F7 (LocalSnapshotRecovery), que também não escreve sem revisão.
      const screen=reason==="state_version_future"
        ?page.locator(`[data-recovery-reason="${reason}"]`)
        :page.getByText("Não foi possível ler o progresso guardado",{exact:true});
      await expect(screen).toBeVisible({timeout:30_000});
      await page.waitForTimeout(2500);
      expect(await page.evaluate(()=>localStorage.getItem("a25"))).toBe(raw);
      await page.reload();
      await page.waitForTimeout(1500);
      expect(await page.evaluate(()=>localStorage.getItem("a25"))).toBe(raw);
    });
  });
}
