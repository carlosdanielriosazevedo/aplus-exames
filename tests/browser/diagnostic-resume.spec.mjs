import {test,expect} from "@playwright/test";
import {DIAGNOSTIC_BLUEPRINT} from "../../app/data/content.js";
import {diagnosticAnchor,emptyScores} from "../../app/lib/engine.js";
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
      results:Array.from({length:current},()=>({status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic"})),
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
  test(`${subject.id} · reload antes de responder mantém o diagnóstico configurado`,async({page})=>{
    await seed(page,configuredState(subject.id));
    await page.goto("/");
    await expect(page.getByText(subject.marker,{exact:true})).toBeVisible({timeout:30_000});
    await expectNoSubjectSelector(page);

    await page.reload();
    await expect(page.getByText(subject.marker,{exact:true})).toBeVisible({timeout:30_000});
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
    if(subject.id==="math-a")await expect(reopened.getByText(subject.marker,{exact:true})).toBeVisible({timeout:30_000});
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
    await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
    if(await skip.isVisible().catch(()=>false))await skip.click();
    await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();
    for(let index=0;index<2;index++){
      await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30_000});
      if(index===0){
        // Paridade entre disciplinas: mesmo contador x/N e uma única saída «Guardar e sair».
        await expect(page.locator(".sessionTop span").last()).toHaveText(/^\d+\/\d+ · \d+%$/u);
        await expect(page.getByRole("button",{name:"Guardar e sair",exact:true})).toHaveCount(1);
        await expect(page.getByRole("button",{name:"Sair da sessão",exact:true})).toHaveCount(0);
      }
      const options=page.locator(".opts button:visible, .portugueseOptions button:visible");
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
    await context.close();
  });
}

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · cabeçalho mantém coordenadas entre os quatro separadores móveis`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    await seed(page,completedState(subjectId));
    await page.goto("/");
    const positions=[];
    for(const tab of ["Aprender","Treinar","Ranking","Progresso"]){
      await page.getByRole("button",{name:tab,exact:true}).last().click();
      await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
      const geometry=await page.evaluate(()=>{
        const selectors=[".studentTop .logo",".studentTop .subjectSwitcher",".studentTop .studentMenu>summary"];
        return selectors.map(selector=>{
          const el=document.querySelector(selector);
          if(!el)throw new Error("Elemento comum ausente: "+selector);
          const rect=el.getBoundingClientRect();
          return {x:rect.x,y:rect.y,width:rect.width,height:rect.height};
        });
      });
      positions.push({tab,geometry});
    }
    const reference=positions[0].geometry;
    for(const row of positions.slice(1)){
      for(let index=0;index<reference.length;index++){
        expect(Math.abs(row.geometry[index].x-reference[index].x),`${row.tab}: elemento ${index} deslocou-se na horizontal`).toBeLessThanOrEqual(2);
        expect(Math.abs(row.geometry[index].y-reference[index].y),`${row.tab}: elemento ${index} deslocou-se na vertical`).toBeLessThanOrEqual(2);
      }
    }
  });
}
