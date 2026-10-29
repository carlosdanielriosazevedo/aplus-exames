import {test,expect,chromium} from "@playwright/test";
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {DIAGNOSTIC_BLUEPRINT} from "../../app/data/content.js";
import {diagnosticAnchor,emptyScores,dailyMissionPlan,selectQuestionForPlan,trainingQuestions,buildMiniExam} from "../../app/lib/engine.js";
import {createDiagnosticDraft,transactDiagnosticAnswer} from "../../app/lib/diagnosticRecovery.js";

const SUBJECTS=[
  {id:"math-a",marker:"AVALIAÇÃO INICIAL · MATEMÁTICA A · PROVA 635"},
  {id:"portuguese",marker:"AVALIAÇÃO INICIAL · PORTUGUÊS · PROVA 639"},
  {id:"physics-chemistry-a",marker:"AVALIAÇÃO INICIAL · FÍSICA E QUÍMICA A · PROVA 715"}
];

function configuredState(subjectId){
  const now=Date.now();
  return {
    goal:17,
    diagnosticDone:false,
    diagnosticAnswers:0,
    selectedSubjectIds:[subjectId],
    activeSubjectId:subjectId,
    firstUseTourCompleted:true,
    onboardingSharedProfileDone:true,
    onboardingSubjectIds:[],
    onboardingReturnSubjectId:null,
    subjectOnboardingMode:"initial",
    subjectSettings:{[subjectId]:{profileConfigured:true,recentGrade:"",examTiming:"thisYear",goal:17}},
    subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:false,diagnosticCompletedAt:null,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:null}},
    subjectProgressModelVersion:4,
    pedagogicalIdVersion:1,
    betaMode:"internal",
    profile:{schoolYear:"11.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,
    _savedAt:now
  };
}

function pausedSubjectState(subjectId,current=2){
  const state=configuredState(subjectId);
  const now=Date.now();
  const itemIds=subjectId==="portuguese"
    ?["PT639-FND-001","PT639-FND-002","PT639-FND-004","PT639-FND-018"]
    :["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01","FQA-ELEM-02"];
  state.subjectProgress[subjectId]={
    ...state.subjectProgress[subjectId],
    lastPosition:{
      sessionId:`resume-${subjectId}`,
      kind:"diagnostic",
      label:"Diagnóstico",
      domain:null,
      itemIds,
      current,
      results:Array.from({length:current},()=>({status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic",classificationMode:null,countsForExamScore:null,penalty:0,provisionalPoints:null,requiresReview:false,responseText:"",type1Count:0,type2Count:0})),
      startedAt:now-60_000,
      updatedAt:now
    },
    lastActivityAt:now
  };
  return state;
}

function completedState(subjectId){
  const state=configuredState(subjectId);
  if(subjectId==="math-a")state.diagnosticDone=true;
  else state.subjectProgress[subjectId]={...state.subjectProgress[subjectId],diagnosticDone:true,diagnosticCompletedAt:Date.now(),lastPosition:null};
  return state;
}

function mathStateAfterTwoAnswers(){
  const now=Date.now();
  const base=configuredState("math-a");
  let state={
    ...base,
    profile:{...base.profile,schoolYear:"Já terminei o secundário",taughtSubtopicIds:[]},
    editorialOverrides:{},
    scores:emptyScores(),
    betaSessions:[{id:"resume-math-diagnostic",kind:"diagnostic",startedAt:now-60_000,finishedAt:null,meta:{}}],
    betaEvents:[],
    productAnalytics:{version:1,firstSeenAt:null,firstSeenDay:null,lastSeenAt:null,activeDays:[],appOpenCount:0,milestones:{},events:[]}
  };
  let draft=createDiagnosticDraft({
    session:state.betaSessions[0],
    item:diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],2,state),
    difficulty:2,
    now
  });
  const persist=()=>true;
  for(let i=0;i<2;i++){
    const tx=transactDiagnosticAnswer({state,draft,sel:draft.current.a,saveDraft:persist,saveState:persist,now:now+i+1});
    if(!tx.ok)throw new Error(`Não foi possível preparar draft matemático: ${tx.stage}/${tx.reason}`);
    state=tx.state;
    draft=tx.draft;
  }
  return {state:{...state,_stateVersion:31,_savedAt:Date.now()},draft:{...draft,savedAt:Date.now()}};
}

async function seed(page,state,draft=null){
  await page.addInitScript(({state,draft})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    if(draft)localStorage.setItem("a25-active-session-v1",JSON.stringify(draft));
    else localStorage.removeItem("a25-active-session-v1");
  },{state,draft});
}

async function expectNoSubjectSelector(page){
  await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toHaveCount(0);
}

for(const subject of SUBJECTS){
  test(`${subject.id} · reload antes de escolher diagnóstico mantém Aprender e configuração`,async({page})=>{
    await seed(page,configuredState(subject.id));
    await page.goto("/");
    await expect(page.getByRole("button",{name:"Aprender",exact:true})).toHaveAttribute("aria-current","page");
    await expect(page.getByText(subject.marker,{exact:true})).toHaveCount(0);
    await expectNoSubjectSelector(page);

    await page.reload();
    await expect(page.getByRole("button",{name:"Aprender",exact:true})).toHaveAttribute("aria-current","page");
    await expect(page.getByText(subject.marker,{exact:true})).toHaveCount(0);
    await expectNoSubjectSelector(page);
  });

  test(`${subject.id} · diagnóstico concluído reabre na área Aprender`,async({page})=>{
    await seed(page,completedState(subject.id));
    await page.goto("/");
    await expect(page.getByRole("button",{name:"Aprender"})).toBeVisible({timeout:30_000});
    await expect(page.getByText(subject.marker,{exact:true})).toHaveCount(0);
    await expectNoSubjectSelector(page);
  });
}

test("Matemática A · depois de duas respostas o draft é retomado após reload",async({page})=>{
  const prepared=mathStateAfterTwoAnswers();
  await seed(page,prepared.state,prepared.draft);
  await page.goto("/");
  await expect(page.getByRole("button",{name:"Guardar e sair",exact:true})).toBeVisible({timeout:30_000});
  let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
  expect(saved.responses).toHaveLength(2);

  await page.reload();
  await expect(page.getByRole("button",{name:"Guardar e sair",exact:true})).toBeVisible({timeout:30_000});
  saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
  expect(saved.responses).toHaveLength(2);
  await expectNoSubjectSelector(page);
});

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · duas respostas guardadas e regresso direto à pergunta após reload`,async({page})=>{
    await seed(page,pausedSubjectState(subjectId,2));
    await page.goto("/");
    const submit=page.getByRole("button",{name:"Responder",exact:true});
    await expect(submit).toBeVisible({timeout:30_000});
    const snapshot=await page.evaluate(id=>{
      const saved=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
      return {current:saved?.current,results:saved?.results?.length,itemId:saved?.itemIds?.[saved?.current]};
    },subjectId);
    expect(snapshot.current).toBe(2);
    expect(snapshot.results).toBe(2);
    expect(snapshot.itemId).toBeTruthy();

    await page.reload();
    await expect(submit).toBeVisible({timeout:30_000});
    const restored=await page.evaluate(id=>{
      const saved=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
      return {current:saved?.current,results:saved?.results?.length,itemId:saved?.itemIds?.[saved?.current]};
    },subjectId);
    expect(restored).toEqual(snapshot);
    await expectNoSubjectSelector(page);
  });
}

for(const subject of SUBJECTS){
  test(`${subject.id} · fechar e reabrir separador preserva o ponto de entrada`,async({browser})=>{
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const initialPage=await context.newPage();
    const state=subject.id==="math-a"?configuredState(subject.id):pausedSubjectState(subject.id,2);
    await initialPage.goto("/");
    await initialPage.evaluate(({state})=>{
      localStorage.setItem("a25",JSON.stringify(state));
      localStorage.removeItem("a25-active-session-v1");
    },{state});
    await initialPage.close();

    const reopened=await context.newPage();
    await reopened.goto("/");
    if(subject.id==="math-a")await expect(reopened.getByRole("button",{name:"Aprender",exact:true})).toHaveAttribute("aria-current","page");
    else{
      await expect(reopened.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
      const recovered=await reopened.evaluate(id=>{
        const position=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
        return {current:position?.current,results:position?.results?.length};
      },subject.id);
      expect(recovered).toEqual({current:2,results:2});
    }
    await expectNoSubjectSelector(reopened);
    await context.close();
  });
}


for(const subject of [
  {id:"math-a",name:"Matemática A",button:/^Matemática A\b/u},
  {id:"portuguese",name:"Português",button:/^Português 12\.º ano · Prova 639\b/u},
  {id:"physics-chemistry-a",name:"Física e Química A",button:/^Física e Química A\b/u}
]){
  test(`${subject.id} · retoma real depois de duas respostas sem semear armazenamento`,async({browser})=>{
    const context=await browser.newContext({viewport:{width:390,height:844}});
    const page=await context.newPage();
    await page.goto("/");
    await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
    await page.getByRole("button",{name:subject.button}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
    await page.getByRole("textbox",{name:/Nota recente de/u}).fill("14");
    await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
    if(await skip.isVisible().catch(()=>false))await skip.click();
    await page.locator(".adaptivePath").getByRole("button",{name:/Começar diagnóstico/iu}).click();
    await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();
    for(let index=0;index<2;index++){
      await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
      if(index===0){
        // Paridade entre disciplinas: mesmo contador x/N e uma única saída «Guardar e sair».
        await expect(page.locator(".sessionTop span").last()).toHaveText(/^\d+\/\d+ · \d+%$/u);
        await expect(page.getByRole("button",{name:"Guardar e sair",exact:true})).toHaveCount(1);
        await expect(page.getByRole("button",{name:"Sair da sessão",exact:true})).toHaveCount(0);
      }
      const options=page.locator(".opts button:visible, .portugueseOptions button:visible, .ptx-options button:visible");
      if(await options.count())await options.first().click();
      else{
        const textarea=page.locator("textarea:visible").first();
        if(await textarea.count())await textarea.fill("Justificação de teste.");
        else{
          const inputs=page.locator('input:visible:not([type="range"]):not([type="checkbox"]):not([type="radio"])');
          if(await inputs.count())await inputs.first().fill(index%2?"1":"0");
          else throw new Error("Resposta real sem controlo visível");
        }
      }
      await page.getByRole("button",{name:"Responder",exact:true}).click();
      const next=page.getByRole("button",{name:/Próxima pergunta|Seguinte/u}).first();
      await expect(next).toBeVisible({timeout:30_000});
      await next.click();
    }
    const snapshot=await page.evaluate(()=>({
      state:JSON.parse(localStorage.getItem("a25")||"null"),
      draft:JSON.parse(localStorage.getItem("a25-active-session-v1")||"null")
    }));
    expect(snapshot.state?.selectedSubjectIds).toContain(subject.id);
    const savedPosition=snapshot.draft
      ?{itemId:snapshot.draft.current?.id,responses:snapshot.draft.responses?.length}
      :{itemId:snapshot.state?.subjectProgress?.[subject.id]?.lastPosition?.itemIds?.[snapshot.state?.subjectProgress?.[subject.id]?.lastPosition?.current],responses:snapshot.state?.subjectProgress?.[subject.id]?.lastPosition?.results?.length};
    expect(savedPosition.itemId).toBeTruthy();
    expect(savedPosition.responses).toBeGreaterThanOrEqual(2);
    await page.reload();
    const restoredSubmit=page.getByRole("button",{name:"Responder",exact:true});
    await expect(restoredSubmit).toBeVisible({timeout:30_000});
    await expectNoSubjectSelector(page);
    const reloadState=await page.evaluate(id=>{
      const draft=JSON.parse(localStorage.getItem("a25-active-session-v1")||"null");
      const state=JSON.parse(localStorage.getItem("a25")||"null");
      const saved=state?.subjectProgress?.[id]?.lastPosition;
      return draft?.kind==="diagnostic"&&id==="math-a"
        ?{itemId:draft.current?.id,responses:draft.responses?.length}
        :{itemId:saved?.itemIds?.[saved.current],responses:saved?.results?.length};
    },subject.id);
    expect(reloadState).toEqual(savedPosition);
    await page.close();
    const reopened=await context.newPage();
    await reopened.goto("/");
    await expect(reopened.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
    await expectNoSubjectSelector(reopened);
    const reopenedPosition=await reopened.evaluate(id=>{
      const draft=JSON.parse(localStorage.getItem("a25-active-session-v1")||"null");
      const state=JSON.parse(localStorage.getItem("a25")||"null");
      const saved=state?.subjectProgress?.[id]?.lastPosition;
      return draft?.kind==="diagnostic"&&id==="math-a"
        ?{itemId:draft.current?.id,responses:draft.responses?.length}
        :{itemId:saved?.itemIds?.[saved.current],responses:saved?.results?.length};
    },subject.id);
    expect(reopenedPosition,"fechar e reabrir o separador deve preservar a pergunta e as duas respostas").toEqual(savedPosition);
    if(subject.id!=="math-a"){
      reopened.once("dialog",dialog=>dialog.accept());
      await reopened.getByRole("button",{name:"Guardar e sair",exact:true}).click();
      await expect(reopened.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true})).toBeVisible({timeout:30_000});
      await expect(reopened.getByRole("button",{name:"Começar diagnóstico",exact:true})).toHaveCount(0);
      const pausedPosition=await reopened.evaluate(id=>{
        const saved=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
        return {itemId:saved?.itemIds?.[saved.current],responses:saved?.results?.length,sessionId:saved?.sessionId};
      },subject.id);
      expect(pausedPosition.itemId).toBe(savedPosition.itemId);
      expect(pausedPosition.responses).toBe(savedPosition.responses);
      await reopened.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true}).click();
      await expect(reopened.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
      const continuedPosition=await reopened.evaluate(id=>{
        const saved=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
        return {itemId:saved?.itemIds?.[saved.current],responses:saved?.results?.length,sessionId:saved?.sessionId};
      },subject.id);
      expect(continuedPosition).toEqual(pausedPosition);
    }
    await context.close();
  });
}

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · Missão pausada não pode ser substituída por novo diagnóstico`,async({page})=>{
    const state=pausedSubjectState(subjectId,2);
    state.subjectProgress[subjectId].lastPosition.kind="mission";
    state.subjectProgress[subjectId].lastPosition.label="Missão";
    await seed(page,state);
    await page.goto("/");
    await expect(page.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true})).toBeVisible({timeout:30_000});
    await page.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true}).click();
    await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
    const before=await page.evaluate(id=>{
      const position=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
      return {sessionId:position?.sessionId,kind:position?.kind,current:position?.current,results:position?.results?.length};
    },subjectId);
    expect(before).toMatchObject({kind:"mission",current:2,results:2});
    await page.reload();
    const after=await page.evaluate(id=>{
      const position=JSON.parse(localStorage.getItem("a25")||"null")?.subjectProgress?.[id]?.lastPosition;
      return {sessionId:position?.sessionId,kind:position?.kind,current:position?.current,results:position?.results?.length};
    },subjectId);
    expect(after).toEqual(before);
  });
}

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · sessão irrecuperável exige confirmação, preserva arquivo e não credita XP`,async({page})=>{
    const state=pausedSubjectState(subjectId,2);
    state.xp=50;
    state.subjectProgress[subjectId].lastPosition.kind="mission";
    state.subjectProgress[subjectId].lastPosition.label="Missão";
    state.subjectProgress[subjectId].lastPosition.itemIds[3]="ITEM-NOT-IN-CATALOG-EXCEPTION";
    await seed(page,state);
    await page.goto("/");
    const recover=page.getByRole("button",{name:"Resolver sessão irrecuperável"});
    await expect(recover).toBeVisible({timeout:30_000});
    page.once("dialog",dialog=>dialog.dismiss());
    await recover.click();
    const before=await page.evaluate(id=>{
      const st=JSON.parse(localStorage.getItem("a25")||"null");
      return {xp:st.xp,pending:st.subjectProgress[id].lastPosition?.sessionId,archives:st.subjectProgress[id].interruptedTechnicalSessions||[]};
    },subjectId);
    expect(before.pending).toBe(`resume-${subjectId}`);
    expect(before.archives).toHaveLength(0);
    page.once("dialog",dialog=>dialog.accept());
    await recover.click();
    await expect(recover).toHaveCount(0);
    const after=await page.evaluate(id=>{
      const st=JSON.parse(localStorage.getItem("a25")||"null");
      return {xp:st.xp,pending:st.subjectProgress[id].lastPosition,archives:st.subjectProgress[id].interruptedTechnicalSessions||[]};
    },subjectId);
    expect(after.xp).toBe(50);
    expect(after.pending).toBeNull();
    expect(after.archives).toEqual([expect.objectContaining({sessionId:`resume-${subjectId}`,status:"interrupted_technical",missingItemIds:["ITEM-NOT-IN-CATALOG-EXCEPTION"]})]);
    await page.reload();
    await expect(page.getByRole("button",{name:"Resolver sessão irrecuperável"})).toHaveCount(0);
  });
}

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  for(const kind of ["diagnostic","mission","training"]){
    test(`${subjectId} · ${kind} resiste à navegação direta para outro exame`,async({page})=>{
      const state=pausedSubjectState(subjectId,2);
      state.subjectProgress[subjectId].lastPosition.kind=kind;
      state.subjectProgress[subjectId].lastPosition.currentAnswer="Resposta conservada";
      await seed(page,state);
      await page.goto("/");
      await expect(page.getByRole("button",{name:kind==="diagnostic"?"Responder":"Continuar sessão",exact:true})).toBeVisible({timeout:30_000});
      const read=()=>page.evaluate(id=>JSON.parse(localStorage.getItem("a25")).subjectProgress[id].lastPosition,subjectId);
      const before=await read();
      await page.evaluate(({subjectId})=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaSessionGuard:true,approvaScreen:subjectId==="portuguese"?"portugueseMiniExam":"physicsChemistryExam",approvaSubjectId:subjectId}})),{subjectId});
      await expect(page.getByText("Tens uma avaliação em curso",{exact:true})).toBeVisible();
      await page.getByRole("button",{name:"Continuar",exact:true}).click();
      await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible();
      const after=await read();
      expect(after.sessionId).toBe(before.sessionId);
      expect(after.current).toBe(before.current);
      expect(after.results).toEqual(before.results);
      expect(after.currentAnswer).toBe(before.currentAnswer);
      expect(after.startedAt).toBe(before.startedAt);
    });
  }
}

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  for(const mode of (subjectId==="physics-chemistry-a"?["mini","mini2","full"]:["mini","full"])){
    test(`${subjectId} · ${mode} mantém identidade, respostas e relógio após rota concorrente e reabertura`,async({browser})=>{
      const context=await browser.newContext({viewport:{width:390,height:844}});
      const page=await context.newPage();
      const state=completedState(subjectId);
      state.profile.schoolYear="12.º";
      // Seed once, then remove the initializer: reload must use actual saved data.
      await page.goto("/");
      await page.evaluate(state=>localStorage.setItem("a25",JSON.stringify(state)),state);
      await page.reload();
      await expect(page.locator(".adaptivePath")).toBeVisible({timeout:30_000});
      const route=subjectId==="portuguese"?"portugueseMiniExam":mode==="full"?"physicsChemistryExam":mode==="mini2"?"physicsChemistryMini2":"physicsChemistryMini1";
      if(subjectId==="portuguese"){
        await page.evaluate(mode=>{
          const s=JSON.parse(localStorage.getItem("a25"));
          s.subjectSettings.portuguese.selectedMiniExamId=mode==="full"?"full-1":"mini-1";
          localStorage.setItem("a25",JSON.stringify(s));
        },mode);
        await page.reload();
        await expect(page.locator(".adaptivePath")).toBeVisible({timeout:30_000});
      }
      await page.evaluate(({route,subjectId})=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaSessionGuard:true,approvaScreen:route,approvaSubjectId:subjectId}})),{route,subjectId});
      const key=subjectId==="portuguese"?"a25":`applus:fqa-exam-draft:v1:${mode==="full"?"fqa-full-715":mode==="mini2"?"fqa-mini-2":"fqa-mini-1"}`;
      const read=()=>page.evaluate(({key,subjectId})=>{
        const value=JSON.parse(localStorage.getItem(key)||"null");
        return subjectId==="portuguese"?value?.subjectSettings?.portuguese?.miniExamDraft:value;
      },{key,subjectId});
      await expect.poll(read).toBeTruthy();
      const options=page.locator(".opts button:visible, .portugueseOptions button:visible, .ptx-options button:visible");
      if(await options.first().isVisible())await options.first().click();
      else await page.getByRole("textbox").first().fill("Resposta em edição que deve sobreviver à recuperação da tentativa.");
      await expect.poll(async()=>Object.keys((await read()).answers).length).toBeGreaterThan(0);
      const before=await read();
      await page.evaluate(subjectId=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaSessionGuard:true,approvaScreen:"trainingSetup",approvaSubjectId:subjectId}})),subjectId);
      await expect(page.getByText("Tens uma avaliação em curso",{exact:true})).toBeVisible();
      await page.getByRole("button",{name:"Continuar",exact:true}).click();
      await expect.poll(read).toMatchObject({startedAt:before.startedAt,answers:before.answers,index:before.index});
      await page.close();
      const reopened=await context.newPage();
      await reopened.goto("/");
      await expect(reopened.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true})).toBeVisible({timeout:30_000});
      await reopened.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true}).click();
      const restored=await reopened.evaluate(({key,subjectId})=>{
        const value=JSON.parse(localStorage.getItem(key));
        return subjectId==="portuguese"?value.subjectSettings.portuguese.miniExamDraft:value;
      },{key,subjectId});
      expect(restored).toMatchObject({startedAt:before.startedAt,answers:before.answers,index:before.index});
      if(before.attemptId)expect(restored.attemptId).toBe(before.attemptId);
      await context.close();
    });
  }
}

for(const kind of ["diagnostic","mission","training","mini_exam"]){
 test(`math-a · ${kind} conserva a tentativa perante três rotas concorrentes`,async({page})=>{
  const {state,draft}=mathPendingAttempt(kind);
  await seed(page,state,draft);
  await page.goto("/");
  await expect(page.locator(".sessionTop, .examQuestion").first()).toBeVisible({timeout:30_000});
  const key="a25-active-session-v1";
  const read=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
  await expect.poll(read).toBeTruthy();
  const id=kind==="mini_exam"?draft.session.sessionId:draft.sessionId;
  for(const route of ["mission","trainingSetup","miniExamIntro"]){
   if((kind==="mission"&&route==="mission")||(kind==="mini_exam"&&route==="miniExamIntro"))continue;
   await page.evaluate(route=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaSessionGuard:true,approvaScreen:route,approvaSubjectId:"math-a"}})),route);
   await expect(page.getByText("Tens uma avaliação em curso",{exact:true})).toBeVisible();
   await page.getByRole("button",{name:"Continuar",exact:true}).click();
   await expect(page.getByText("Tens uma avaliação em curso",{exact:true})).toHaveCount(0);
   await expect.poll(async()=>{const d=await read();return d.sessionId||d.session?.sessionId}).toBe(id);
   const after=await read();
   expect(after.kind).toBe(kind);
   if(kind==="training")expect(after.questions.map(q=>q.id)).toEqual(draft.questions.map(q=>q.id));
   if(kind==="mini_exam")expect(after.session.startedAt).toBe(draft.session.startedAt);
  }
 });
}

function mathPendingAttempt(kind){
  const prepared=mathStateAfterTwoAnswers();
  const state=prepared.state;
  let draft=prepared.draft;
  const sessionId=`adversarial-${kind}`;
  if(kind!=="diagnostic"){
   state.diagnosticDone=true;
   const plan=dailyMissionPlan(state);
   const cfg={themeId:plan.themeId,focus:plan.focus,level:"auto"};
   const questions=kind==="mini_exam"?buildMiniExam(state):trainingQuestions(state,cfg);
   draft=kind==="mission"?{kind,sessionId,plan,current:selectQuestionForPlan(state,plan),targetCount:2,totalCount:2,usedIds:[],sel:0}
    :kind==="training"?{kind,sessionId,cfg,questions,i:2,sel:0}
    :{kind,screen:"miniExamRun",session:{sessionId,questions,current:2,answers:questions.map((_,i)=>i<2?0:null),startedAt:Date.now()-60000}};
  }
  return {state,draft};
}

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
 for(const kind of (subjectId==="physics-chemistry-a"?["diagnostic","mission","training","mini_exam","mini_exam_2","full_exam"]:["diagnostic","mission","training","mini_exam","full_exam"])){
  if(subjectId==="math-a"&&kind==="full_exam")continue; // Motor completo continua bloqueado.
  test(`${subjectId} · ${kind} sobrevive ao encerramento completo do Chromium`,async({},testInfo)=>{
   const directory=mkdtempSync(join(tmpdir(),"approva-recovery-"));
   const options={...testInfo.project.use.launchOptions,headless:true,viewport:{width:390,height:844}};
   let context=await chromium.launchPersistentContext(directory,options);
   const exam=["mini_exam","mini_exam_2","full_exam"].includes(kind);
   let state,draft=null;
   if(subjectId==="math-a")({state,draft}=mathPendingAttempt(kind));
   else if(exam){state=completedState(subjectId);state.profile.schoolYear="12.º";if(subjectId==="portuguese")state.subjectSettings.portuguese.selectedMiniExamId=kind==="full_exam"?"full-1":"mini-1"}
   else{
    state=pausedSubjectState(subjectId,2);
    state.subjectProgress[subjectId].lastPosition.kind=kind;
    state.subjectProgress[subjectId].lastPosition.currentAnswer=0;
   }
   try{
    await context.addInitScript(({state,draft})=>{localStorage.setItem("a25",JSON.stringify(state));if(draft)localStorage.setItem("a25-active-session-v1",JSON.stringify(draft))},{state,draft});
    let page=context.pages()[0];
    await page.goto(testInfo.project.use.baseURL+"/");
    if(subjectId!=="math-a"&&exam){
     await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
     const route=subjectId==="portuguese"?"portugueseMiniExam":kind==="full_exam"?"physicsChemistryExam":kind==="mini_exam_2"?"physicsChemistryMini2":"physicsChemistryMini1";
     await page.evaluate(({route,subjectId})=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaSessionGuard:true,approvaScreen:route,approvaSubjectId:subjectId}})),{route,subjectId});
     const choices=page.locator(".ptx-options button, .opts button").first();
     await expect(page.locator(".ptx-question-card, .fqaMiniExamPage, .fqaFullExamPage").first()).toBeVisible({timeout:30_000});
     if(await choices.isVisible())await choices.click();else await page.getByRole("textbox").first().fill("Resposta guardada antes de fechar a aplicação.");
    }else if(subjectId!=="math-a"&&kind!=="diagnostic"){
     await expect(page.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true})).toBeVisible({timeout:30_000});
     await page.locator(".learnHome").getByRole("button",{name:"Continuar sessão",exact:true}).click();
    }
    if(!exam||subjectId==="math-a")await expect(page.locator(".sessionTop")).toBeVisible({timeout:30_000});
    const snapshot=page=>page.evaluate(({subjectId,exam,kind})=>{
     const state=JSON.parse(localStorage.getItem("a25"));
     const draft=subjectId==="math-a"?JSON.parse(localStorage.getItem("a25-active-session-v1")||"null")
      :exam?(subjectId==="portuguese"?state.subjectSettings.portuguese.miniExamDraft:JSON.parse(localStorage.getItem("applus:fqa-exam-draft:v1:"+(kind==="full_exam"?"fqa-full-715":kind==="mini_exam_2"?"fqa-mini-2":"fqa-mini-1"))||"null")):state.subjectProgress[subjectId].lastPosition;
     if(!draft)return null;
     const attempt=draft.session||draft;
     return {id:attempt.sessionId||attempt.attemptId||attempt.startedAt,current:attempt.current??attempt.index??attempt.i??null,itemId:attempt.current?.id||null,itemIds:attempt.itemIds||attempt.questions?.map(row=>row.id)||null,answers:attempt.answers||attempt.responses||attempt.results||null,answer:attempt.currentAnswer??attempt.sel??null,startedAt:attempt.startedAt||null,xp:state.xp||0};
    },{subjectId,exam,kind});
    await expect.poll(()=>snapshot(page)).toBeTruthy();
    if(exam&&subjectId!=="math-a")await expect.poll(async()=>Object.keys((await snapshot(page)).answers||{}).length).toBeGreaterThan(0);
    const before=await snapshot(page);
    await context.close();
    context=await chromium.launchPersistentContext(directory,options);
    page=context.pages()[0];
    await page.goto(testInfo.project.use.baseURL+"/");
    await expect(page.locator(".sessionTop, .studentTop").first()).toBeVisible({timeout:30_000});
    await expect.poll(()=>snapshot(page)).toEqual(before);
   }finally{await context.close();rmSync(directory,{recursive:true,force:true})}
  });
 }
}

test("math-a · Exame Completo permanece bloqueado",async({page})=>{
 await seed(page,completedState("math-a"));
 await page.goto("/");
 await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
 await page.evaluate(()=>window.dispatchEvent(new PopStateEvent("popstate",{state:{...window.history.state,approvaScreen:"exams",approvaSubjectId:"math-a"}})));
 await expect(page.locator(".exam.locked").filter({hasText:"Exame Completo"})).toContainText("ainda não disponível");
 await expect(page.getByRole("button",{name:/Exame Completo/u})).toHaveCount(0);
});

test("math-a · diagnóstico legado incompatível é conservado sem oferecer reinício",async({page})=>{
 const {state,draft}=mathStateAfterTwoAnswers();draft.version=1;
 await seed(page,state,draft);await page.goto("/");
 await expect(page.getByText("Não foi possível recuperar esta sessão",{exact:true})).toBeVisible({timeout:30_000});
 const preserved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
 expect(preserved).toEqual(draft);
 await expect(page.getByRole("button",{name:/Começar.*novo|Recomeçar/u})).toHaveCount(0);
});
