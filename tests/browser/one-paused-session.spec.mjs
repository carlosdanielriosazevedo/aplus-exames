// Decisão do product owner (2026-11-22): qualquer sessão pode ficar a meio, todas
// avisam que estão em pausa e, ao continuar, nunca se misturam. Estudo (diagnóstico,
// Missão, treino) e provas (Mini-exame, Exame Completo) são independentes: uma
// Missão em pausa não bloqueia um Mini-exame, e cada «Continuar sessão» abre a sua.
// Origem: com uma Missão de Matemática A em pausa, «Mini-exame misto → Começar»
// abria a pergunta da Missão.
import {test,expect} from "@playwright/test";
import {emptyScores,trainingQuestions,questionById} from "../../app/lib/engine.js";

function configuredState(subjectId){
  const now=Date.now();
  return {
    goal:17,xp:40,diagnosticDone:subjectId==="math-a",diagnosticAnswers:subjectId==="math-a"?8:0,scores:emptyScores(),
    selectedSubjectIds:[subjectId],activeSubjectId:subjectId,
    firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],
    subjectSettings:{[subjectId]:{profileConfigured:true,recentGrade:"",examTiming:"thisYear",goal:17}},
    subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:now}},
    subjectProgressModelVersion:4,pedagogicalIdVersion:1,betaMode:"internal",
    profile:{schoolYear:"Já terminei o secundário",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,_savedAt:now
  };
}

async function dismissMissionWindow(page){
  const later=page.getByRole("button",{name:"Agora não · ver a Home"});
  if(await later.isVisible().catch(()=>false))await later.click();
}
async function openExams(page){
  await dismissMissionWindow(page);
  await page.locator(".studentNav button",{hasText:"Treinar"}).click();
  await page.getByRole("button",{name:/^📝\s*Exames/u}).click();
}
const studyDraft=page=>page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")||"null"));
const examDraft=page=>page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-exam-session-v1")||"null"));

test("Matemática A · Missão e Mini-exame a meio ao mesmo tempo: cada «Continuar» abre a sua",async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();
  const state=configuredState("math-a");
  const current={...questionById("CRV2-10FUN-STEPS-1"),practiceOnly:true};
  const mission={kind:"mission",sessionId:"paused-mission",current,plan:{type:"target",themeId:current.themeId,focus:current.focus},savedAt:Date.now()};
  await page.addInitScript(({state,mission})=>{if(!localStorage.getItem("seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify(mission));localStorage.setItem("seeded","1")}},{state,mission});
  await page.goto("/");
  await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
  // A janela da Missão retomada avisa que está em pausa.
  await expect(page.locator(".dailyMissionModal .pausedActivityStatus")).toHaveText("SESSÃO EM PAUSA",{timeout:30_000});
  await expect(page.locator(".dailyMissionModal .sessionPausedMeta")).toHaveCSS("background-color","rgb(255, 226, 163)");

  // Com a Missão em pausa, o Mini-exame começa normalmente — com as suas perguntas.
  await openExams(page);
  await expect(page.locator(".examHub .pausedSession")).toHaveCount(0);
  const mini=page.getByRole("button",{name:/Mini-exame misto/u});
  await expect(mini).toBeEnabled();
  await mini.click();
  await page.getByRole("button",{name:"Começar Mini-exame",exact:true}).click();
  await expect(page.getByRole("heading",{name:current.q,exact:true})).toHaveCount(0);
  await expect.poll(()=>examDraft(page).then(d=>d?.kind)).toBe("mini_exam");
  const exam=await examDraft(page);
  expect((await studyDraft(page)).sessionId).toBe("paused-mission");

  // Reabrir a app: as duas sessões avisam que estão em pausa, cada uma no seu cartão.
  const reopened=await context.newPage();
  await reopened.goto("/");
  await expect(reopened.locator(".learnHome")).toBeVisible({timeout:30_000});
  await dismissMissionWindow(reopened);
  const main=reopened.locator(".pathNode.current article");
  await expect(main.locator(".pausedActivityEyebrow")).toContainText("MISSÃO DE HOJE");
  await expect(main.locator(".pausedActivityStatus")).toHaveText("SESSÃO EM PAUSA");
  const examCard=reopened.locator(".homePausedExam");
  await expect(examCard.locator(".pausedActivityEyebrow")).toContainText("MINI-EXAME");
  await expect(examCard.locator(".pausedActivityStatus")).toHaveText("SESSÃO EM PAUSA");
  await expect(examCard.locator(".sessionPausedMeta")).toHaveText("Progresso guardado");
  await expect(examCard.locator(".sessionPausedMeta")).toHaveCSS("background-color","rgb(255, 226, 163)");

  // «Continuar» no Mini-exame abre o Mini-exame (a mesma tentativa).
  await examCard.getByRole("button",{name:"Continuar sessão",exact:true}).click();
  await expect(reopened.getByRole("heading",{name:current.q,exact:true})).toHaveCount(0);
  await expect.poll(()=>examDraft(reopened).then(d=>d?.session?.sessionId)).toBe(exam.session.sessionId);
  await expect(reopened.locator(".learnHome")).toHaveCount(0);

  // «Continuar» na Missão abre a Missão (a mesma pergunta).
  const third=await context.newPage();
  await third.goto("/");
  await expect(third.locator(".learnHome")).toBeVisible({timeout:30_000});
  await dismissMissionWindow(third);
  await third.locator(".pathNode.current article").getByRole("button",{name:"Continuar sessão",exact:true}).click();
  await expect(third.getByRole("heading",{name:current.q,exact:true})).toBeVisible({timeout:30_000});
  expect((await examDraft(third)).session.sessionId).toBe(exam.session.sessionId);
  await context.close();
});

test("Matemática A · Mini-exame antigo (guardado antes de 2026-11-22) passa para o espaço das provas sem se perder",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const state=configuredState("math-a");
  const legacy={kind:"mini_exam",screen:"miniExamRun",savedAt:Date.now(),session:{sessionId:"legacy-mini",questions:trainingQuestions(state,{themeId:"10-fun",focus:"Domínio e zeros",level:"auto"}).slice(0,3),current:1,answers:[0,null,null],markedForReview:[],startedAt:Date.now()-60000}};
  await page.addInitScript(({state,legacy})=>{if(!localStorage.getItem("seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify(legacy));localStorage.setItem("seeded","1")}},{state,legacy});
  await page.goto("/");
  await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
  await expect.poll(()=>examDraft(page).then(d=>d?.session?.sessionId)).toBe("legacy-mini");
  expect(await studyDraft(page)).toBeNull();
  await dismissMissionWindow(page);
  await expect(page.locator(".homePausedExam .pausedActivityEyebrow")).toContainText("MINI-EXAME");
});

test("Matemática A · Mini-exame a meio: «Começar» fica bloqueado e o cartão retoma o mesmo Mini-exame",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const state=configuredState("math-a");
  const questions=trainingQuestions(state,{themeId:"10-fun",focus:"Domínio e zeros",level:"auto"}).slice(0,3);
  const exam={kind:"mini_exam",screen:"miniExamRun",savedAt:Date.now(),session:{sessionId:"paused-mini",questions,current:1,answers:[0,null,null],markedForReview:[],startedAt:Date.now()-60000}};
  await page.addInitScript(({state,exam})=>{localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-exam-session-v1",JSON.stringify(exam))},{state,exam});
  await page.goto("/");
  await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
  await openExams(page);
  const card=page.locator(".examHub .pausedSession");
  await expect(card.locator(".pausedActivityEyebrow")).toContainText("MINI-EXAME");
  await expect(page.locator(".pausedSessionNote")).toContainText("Mini-exame a meio");
  await expect(page.getByRole("button",{name:/Mini-exame misto/u})).toBeDisabled();
  await card.getByRole("button",{name:"Continuar sessão",exact:true}).click();
  await expect.poll(()=>examDraft(page).then(d=>d?.session?.sessionId)).toBe("paused-mini");
  await expect(page.locator(".examHub")).toHaveCount(0);
});

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · Missão em pausa: as provas continuam disponíveis e o treino pede para continuar a Missão`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    const state=configuredState(subjectId);
    state.subjectProgress[subjectId].lastPosition={sessionId:"paused-"+subjectId,kind:"mission",label:"Missão recomendada",current:1,results:[],startedAt:Date.now()-60000,
      itemIds:subjectId==="portuguese"?["PT639-FND-001","PT639-FND-002","PT639-FND-004","PT639-FND-018"]:["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01","FQA-ELEM-02"]};
    await page.addInitScript(value=>localStorage.setItem("a25",JSON.stringify(value)),state);
    await page.goto("/");
    await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
    // Treino: a Missão a meio ocupa o espaço do estudo; nunca abre em silêncio.
    await page.locator(".studentNav button",{hasText:"Treinar"}).click();
    await page.getByRole("button",{name:/^🎯\s*Praticar/u}).click();
    await expect(page.getByRole("button",{name:"Começar treino",exact:true})).toHaveCount(0);
    await expect(page.locator(".pausedSessionStatus .pausedActivityEyebrow")).toContainText("MISSÃO DE HOJE");
    await expect(page.locator(".pausedSessionStatus .sessionPausedPosition")).toHaveText("Pergunta 2 de 4");
    await expect(page.locator(".pausedSessionNote")).toContainText("sessão de estudo a meio");
    await expect(page.getByRole("button",{name:"Continuar sessão",exact:true})).toHaveCount(1);
    // Exames: as provas ficam disponíveis; a Missão não aparece aqui nem bloqueia.
    await page.goBack();
    await expect(page.locator(".studentNav")).toBeVisible({timeout:30_000});
    await page.locator(".studentNav button",{hasText:"Treinar"}).click();
    await page.getByRole("button",{name:/^📝\s*Exames/u}).click();
    await expect(page.locator(".pausedSession")).toHaveCount(0);
    await expect(page.locator(".pausedSessionNote")).toHaveCount(0);
    await expect(page.locator(".exam.examAction, .trainChoices button").first()).toBeVisible();
    expect(await page.evaluate(id=>JSON.parse(localStorage.getItem("a25")).subjectProgress[id].lastPosition?.sessionId,subjectId)).toBe("paused-"+subjectId);
  });
}
