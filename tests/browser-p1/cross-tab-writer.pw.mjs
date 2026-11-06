// P1-A (auditoria independente da #459): perda de progresso entre separadores,
// na app real (build de produção). Provas pelos bytes persistidos, não por
// avisos visuais. Dados exclusivamente sintéticos.
import {test,expect} from "@playwright/test";
import {buildMiniExam,emptyScores} from "../../app/lib/engine.js";

// P1-A v2: o progresso vive no espaço canónico; o seed() grava as chaves
// brutas (estado anterior), que o primeiro escritor importa. Só muda ONDE se lê.
const STATE="a25-ws-v2:global:a25";
const DRAFT="a25-ws-v2:global:a25-active-session-v1";
const REGISTRY="a25-ws-v2:global:a25-completed-sessions-v1";
const legacyName=key=>key.replace(/^a25-ws-v2:global:/,"");
const OBSERVER=/A APProva\+ está aberta noutro separador\./;
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
const completions=(raw,sid)=>(parse(raw)?.examHistory||[]).filter(x=>x.completionId===sid).length;
const local=page=>page.evaluate(()=>Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)])));
async function seed(page,entries){
  await page.goto("/?recuperar=inicio");
  await page.evaluate(entries=>{localStorage.clear();sessionStorage.clear();for(const [k,v] of Object.entries(entries))localStorage.setItem(k,v);},Object.fromEntries(Object.entries(entries).map(([k,v])=>[legacyName(k),v])));
}
// O separador volta a ficar ativo (o que no browser real dispara recordAppOpen).
const reactivate=page=>page.evaluate(()=>{document.dispatchEvent(new Event("visibilitychange"));window.dispatchEvent(new Event("focus"));});
const submit=page=>page.getByRole("button",{name:"Entregar Mini-exame",exact:true});

test.describe("P1-A · um único separador grava o progresso",()=>{
  test("cenário auditado: A conclui, B desatualizado reativa — a conclusão e o XP de A permanecem",async({browser})=>{
    const context=await browser.newContext();
    const sid="synthetic-cross-tab-1";
    const fixture=mathFixture(sid);
    const a=await context.newPage();
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    await a.goto("/");
    await expect(submit(a)).toBeVisible({timeout:30_000});
    const b=await context.newPage();
    await b.goto("/");
    await b.waitForTimeout(2500);
    await submit(a).click();
    await expect.poll(async()=>completions((await local(a))[STATE],sid),{timeout:20_000}).toBe(1);
    const afterA=await local(a);
    const xpA=parse(afterA[STATE]).xp;
    expect(xpA).toBeGreaterThan(100);
    await reactivate(b);
    await b.waitForTimeout(1500);
    let now=await local(a);
    expect(completions(now[STATE],sid),"conclusão de A apagada por B").toBe(1);
    expect(parse(now[STATE]).xp,"XP de A apagado por B").toBe(xpA);
    // B é observador: nada leu nem gravou.
    await expect(b.getByText(OBSERVER)).toBeVisible();
    // Passagem de controlo: B passa a escrever e mostra o progresso de A.
    await b.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    await expect(a.getByText(OBSERVER)).toBeVisible({timeout:20_000}); // A recarregou como observador
    await expect(b.getByText(OBSERVER)).toHaveCount(0,{timeout:20_000});
    await b.waitForTimeout(1500);
    now=await local(b);
    expect(completions(now[STATE],sid),"sem duplicação").toBe(1);
    expect(parse(now[STATE]).xp,"sem XP repetido").toBe(xpA);
    expect((parse(now[REGISTRY])||[]).filter(x=>x.id===sid&&x.status==="committed")).toHaveLength(1);
    // Reload do escritor: continua a escrever.
    await b.reload();
    await expect(b.getByText(OBSERVER)).toHaveCount(0,{timeout:20_000});
    await b.waitForTimeout(1000);
    expect(completions((await local(b))[STATE],sid)).toBe(1);
    await context.close();
  });

  test("três abas, separador duplicado e fecho abrupto",async({browser})=>{
    const context=await browser.newContext();
    const sid="synthetic-cross-tab-3";
    const fixture=mathFixture(sid);
    const a=await context.newPage();
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    await a.goto("/");
    await expect(submit(a)).toBeVisible({timeout:30_000});
    const before=await local(a);
    const session=await a.evaluate(()=>Object.fromEntries(Object.keys(sessionStorage).map(k=>[k,sessionStorage.getItem(k)])));
    const b=await context.newPage();await b.goto("/");
    const duplicate=await context.newPage();
    await duplicate.addInitScript(entries=>{if(!sessionStorage.length)for(const [k,v] of Object.entries(entries))sessionStorage.setItem(k,v);},session);
    await duplicate.goto("/");
    await expect(b.getByText(OBSERVER)).toBeVisible({timeout:20_000});
    await expect(duplicate.getByText(OBSERVER)).toBeVisible({timeout:20_000});
    await reactivate(b);await reactivate(duplicate);await b.waitForTimeout(800);
    const after=await local(a);
    expect(after[STATE]).toBe(before[STATE]);
    expect(after[DRAFT]).toBe(before[DRAFT]);
    // Fecho abrupto do escritor: o lock é libertado pelo browser.
    await a.close({runBeforeUnload:false});
    await duplicate.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    await expect(submit(duplicate)).toBeVisible({timeout:20_000}); // a tentativa em curso continua intacta
    await expect(b.getByText(OBSERVER)).toBeVisible();
    await submit(duplicate).click();
    await expect.poll(async()=>completions((await local(duplicate))[STATE],sid),{timeout:20_000}).toBe(1);
    await context.close();
  });

  test("escritor suspenso: o pedido expira sem forçar; ao retomar continua a escrever",async({browser})=>{
    const context=await browser.newContext();
    const fixture=mathFixture("synthetic-cross-tab-frozen");
    const a=await context.newPage();
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    await a.goto("/");
    await expect(submit(a)).toBeVisible({timeout:30_000});
    const b=await context.newPage();await b.goto("/");
    await expect(b.getByText(OBSERVER)).toBeVisible({timeout:20_000});
    // O escritor deixa de responder (separador suspenso/bloqueado durante 12 s).
    // Page.setWebLifecycleState não suspende as mensagens no Chromium headless.
    const hung=a.evaluate(()=>{const end=Date.now()+12_000;while(Date.now()<end){}}).catch(()=>{});
    await b.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    await expect(b.getByText("O outro separador não respondeu.",{exact:false})).toBeVisible({timeout:20_000});
    await hung;
    await a.waitForTimeout(1000);
    // O pedido antigo (>8 s) é ignorado ao retomar: A continua a ser o escritor.
    await expect(submit(a)).toBeVisible();
    await expect(b.getByText(OBSERVER)).toBeVisible();
    await submit(a).click();
    await expect.poll(async()=>completions((await local(a))[STATE],"synthetic-cross-tab-frozen"),{timeout:20_000}).toBe(1);
    await context.close();
  });

  test("fim abrupto do escritor (terminado sem selo): B não grava sem prova; recuperação explícita mantém a conclusão de A",async({browser})=>{
    const context=await browser.newContext();
    const sid="synthetic-cross-tab-crash";
    const fixture=mathFixture(sid);
    const a=await context.newPage();
    // A termina como num crash: os seus handlers de pagehide/freeze/visibilidade
    // nunca correm (nenhum selo final). Page.crash não serve: no Chromium headless
    // os dois separadores partilham o processo e terminariam ambos.
    await a.addInitScript(()=>{
      const original=EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener=function(type,...rest){
        if(["pagehide","freeze","visibilitychange"].includes(type)&&(this===window||this===document))return;
        return original.call(this,type,...rest);
      };
    });
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    await a.goto("/");
    await expect(submit(a)).toBeVisible({timeout:30_000});
    const b=await context.newPage();await b.goto("/");
    await expect(b.getByText(OBSERVER)).toBeVisible({timeout:20_000});
    await submit(a).click();
    await expect.poll(async()=>completions((await local(b))[STATE],sid),{timeout:20_000}).toBe(1);
    const xpA=parse((await local(b))[STATE]).xp;
    await a.close({runBeforeUnload:false});                      // sem selo; o browser liberta o lock
    await b.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    const hold=b.locator("[data-state-writer='recovery-hold']");
    await expect(hold).toBeVisible({timeout:20_000});
    const before=await local(b);
    await reactivate(b);await b.waitForTimeout(1500);
    let now=await local(b);
    expect(now[STATE],"sem prova, B não grava").toBe(before[STATE]);
    await b.getByRole("button",{name:"Verificar de novo",exact:true}).click();
    await expect(hold).toBeVisible();                              // continua sem selo
    await b.getByRole("button",{name:"Continuar neste separador",exact:true}).click();
    await b.getByRole("button",{name:"Guardar cópia e continuar aqui",exact:true}).click();
    await expect(hold).toHaveCount(0,{timeout:20_000});
    await b.waitForTimeout(1500);
    now=await local(b);
    expect(completions(now[STATE],sid),"conclusão de A mantida, sem duplicar").toBe(1);
    expect(parse(now[STATE]).xp,"XP de A mantido").toBe(xpA);
    const copies=Object.keys(now).filter(k=>k.startsWith("a25-ws-v2:global:~recovery:")).map(k=>parse(now[k])).filter(c=>String(c.reason).startsWith("unclean_end_adoption"));
    expect(copies.length,"cópia de recuperação antes de continuar").toBeGreaterThan(0);
    // A cópia contém de facto o conjunto que B via (com a conclusão de A), não só um registo.
    expect(completions(copies[0].keys.a25,sid),"conclusão de A na cópia").toBe(1);
    expect(copies[0].keys["a25-completed-sessions-v1"],"recibos na cópia").toBe(before[REGISTRY]??null);
    await context.close();
  });

  // v2: uma versão anterior escreve nas chaves brutas e não toca no canónico
  // (v2-legacy-tab.pw.mjs). Mantém-se a premissa original: um escritor sem
  // coordenação a gravar a MESMA chave que o escritor usa.
  test("escrita de um escritor sem coordenação na mesma chave: o escritor para e guarda as duas cópias",async({browser})=>{
    const context=await browser.newContext();
    const fixture=mathFixture("synthetic-cross-tab-old");
    const a=await context.newPage();
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    await a.goto("/");
    await expect(submit(a)).toBeVisible({timeout:30_000});
    const old=await context.newPage();
    await old.goto("/?recuperar=inicio"); // landing: não arranca a app
    const foreign=JSON.stringify({...parse(fixture.state),xp:999,_savedAt:Date.now()});
    await old.evaluate(([key,raw])=>localStorage.setItem(key,raw),[STATE,foreign]);
    await expect(a.locator("[data-state-writer='conflict']")).toBeVisible({timeout:10_000});
    await expect(a.locator("[data-state-writer='conflict']")).toHaveAttribute("data-conflict-copy","durable");
    await reactivate(a);await a.waitForTimeout(800);
    const stores=await local(a);
    expect(stores[STATE]).toBe(foreign); // nada foi substituído
    const copies=Object.keys(stores).filter(k=>k.startsWith("a25-ws-v2:global:~recovery:")).map(k=>parse(stores[k]));
    expect(parse(copies.find(c=>c.reason==="foreign_write:this_tab")?.keys?.a25)?.xp,"progresso deste separador preservado").toBe(100);
    expect(parse(copies.find(c=>c.reason==="foreign_write:received")?.keys?.a25)?.xp,"bytes recebidos preservados").toBe(999);
    await context.close();
  });

  test("sem Web Locks: só consulta — nenhuma aba grava, nenhum byte muda, nenhuma avaliação abre",async({browser})=>{
    const context=await browser.newContext();
    await context.addInitScript(()=>{try{Object.defineProperty(Navigator.prototype,"locks",{configurable:true,get:()=>undefined})}catch{}});
    const sid="synthetic-cross-tab-readonly";
    const fixture=mathFixture(sid);
    const a=await context.newPage();
    await seed(a,{[STATE]:fixture.state,[DRAFT]:fixture.draft});
    const before=await local(a);
    await a.goto("/");
    const readonly=page=>page.locator("[data-state-writer='readonly']");
    await expect(readonly(a)).toBeVisible({timeout:30_000});
    await expect(a.locator("[data-readonly-summary='true']")).toContainText("100");      // consulta: XP lido
    await expect(a.locator("[data-readonly-pending='true']")).toBeVisible();             // tentativa por terminar preservada
    await expect(submit(a)).toHaveCount(0);                                              // nenhuma avaliação abre
    const b=await context.newPage();await b.goto("/");
    await expect(readonly(b)).toBeVisible({timeout:30_000});
    await reactivate(a);await reactivate(b);await a.waitForTimeout(1200);
    await b.reload();await expect(readonly(b)).toBeVisible({timeout:30_000});
    await b.getByRole("button",{name:"Voltar a verificar",exact:true}).click();
    await expect(readonly(b)).toBeVisible({timeout:30_000});await b.waitForTimeout(800);
    const after=await local(a);
    const strip=stores=>Object.fromEntries(Object.entries(stores).filter(([k])=>!k.includes("auth-epoch")&&!k.includes("writer-signal")));
    expect(strip(after),"nenhuma gravação sem Web Locks").toEqual(strip(before));
    await context.close();
  });
});
