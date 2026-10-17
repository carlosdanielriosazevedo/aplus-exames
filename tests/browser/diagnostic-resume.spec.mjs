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
  const itemIds=Array.from({length:Math.max(4,current+1)},(_,index)=>`resume-${subjectId}-item-${index+1}`);
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
  await expect(page.getByRole("button",{name:"Sair da sessão",exact:true})).toBeVisible({timeout:30_000});
  let saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
  expect(saved.responses).toHaveLength(2);

  await page.reload();
  await expect(page.getByRole("button",{name:"Sair da sessão",exact:true})).toBeVisible({timeout:30_000});
  saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
  expect(saved.responses).toHaveLength(2);
  await expectNoSubjectSelector(page);
});

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · depois de duas respostas a sessão pausada sobrevive ao reload`,async({page})=>{
    await seed(page,pausedSubjectState(subjectId,2));
    await page.goto("/");
    await expect(page.getByRole("button",{name:"Aprender"})).toBeVisible({timeout:30_000});
    let current=await page.evaluate(id=>JSON.parse(localStorage.getItem("a25")).subjectProgress[id].lastPosition.current,subjectId);
    expect(current).toBe(2);

    await page.reload();
    await expect(page.getByRole("button",{name:"Aprender"})).toBeVisible({timeout:30_000});
    current=await page.evaluate(id=>JSON.parse(localStorage.getItem("a25")).subjectProgress[id].lastPosition.current,subjectId);
    expect(current).toBe(2);
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
    else await expect(reopened.getByRole("button",{name:"Aprender"})).toBeVisible({timeout:30_000});
    await expectNoSubjectSelector(reopened);
    await context.close();
  });
}
