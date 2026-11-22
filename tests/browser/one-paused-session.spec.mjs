// Relato do product owner (2026-11-22): com uma Missão de Matemática A em pausa,
// «Mini-exame misto → Começar» abria a pergunta da Missão. Regra: só há uma
// sessão a meio de cada vez, mas nenhum «Começar…» pode abrir outra sessão em
// silêncio — o ecrã mostra a sessão em pausa e um «Continuar sessão» explícito.
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

async function openExams(page){
  await page.locator(".studentNav button",{hasText:"Treinar"}).click();
  await page.getByRole("button",{name:/^📝\s*Exames/u}).click();
}

test("Matemática A · Missão em pausa: o Mini-exame não abre a pergunta da Missão",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const state=configuredState("math-a");
  const current={...questionById("CRV2-10FUN-STEPS-1"),practiceOnly:true};
  const draft={kind:"mission",sessionId:"paused-mission",current,plan:{type:"target",themeId:current.themeId,focus:current.focus},savedAt:Date.now()};
  await page.addInitScript(({state,draft})=>{if(!sessionStorage.getItem("seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify(draft));sessionStorage.setItem("seeded","1")}},{state,draft});
  await page.goto("/");
  await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
  // Janela «Continuamos de onde ficaste?»: o aluno escolhe ver a Home.
  const later=page.getByRole("button",{name:"Agora não · ver a Home"});
  await expect(later).toBeVisible({timeout:30_000});
  await expect(page.locator(".dailyMissionModal .pausedActivityStatus")).toHaveText("SESSÃO EM PAUSA");
  await expect(page.locator(".dailyMissionModal .sessionPausedMeta")).toHaveCSS("background-color","rgb(255, 226, 163)");
  await later.click();
  await openExams(page);
  const card=page.locator(".examHub .pausedSession");
  await expect(card).toHaveCount(1);
  await expect(card.locator(".pausedActivityEyebrow")).toContainText("MISSÃO DE HOJE");
  await expect(card.locator(".pausedActivityStatus")).toHaveText("SESSÃO EM PAUSA");
  await expect(card.locator("b")).toHaveText(current.focus);
  await expect(page.locator(".pausedSessionNote")).toContainText("uma sessão a meio de cada vez");
  const mini=page.getByRole("button",{name:/Mini-exame misto/u});
  await expect(mini).toBeDisabled();
  await mini.click({force:true});
  await expect(page.locator(".examHub")).toBeVisible();
  await expect(page.getByRole("heading",{name:current.q,exact:true})).toHaveCount(0);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")).kind)).toBe("mission");
  // «Continuar sessão» é o único caminho para a Missão, e retoma a mesma pergunta.
  await card.getByRole("button",{name:"Continuar sessão",exact:true}).click();
  await expect(page.getByRole("heading",{name:current.q,exact:true})).toBeVisible({timeout:30_000});
});

test("Matemática A · Treino em pausa: a área Exames mostra o treino, não o abre ao «Começar»",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const state=configuredState("math-a");
  const cfg={themeId:"10-fun",focus:"Domínio e zeros",level:"auto"};
  const draft={kind:"training",sessionId:"paused-training",cfg,questions:trainingQuestions(state,cfg),i:2,sel:null,savedAt:Date.now()};
  await page.addInitScript(({state,draft})=>{localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify(draft))},{state,draft});
  await page.goto("/");
  await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
  await openExams(page);
  const card=page.locator(".examHub .pausedSession");
  await expect(card.locator(".pausedActivityEyebrow")).toContainText("TREINO LIVRE");
  await expect(card.locator(".sessionPausedPosition")).toHaveText(`Pergunta 3 de ${draft.questions.length}`);
  await expect(page.getByRole("button",{name:/Mini-exame misto/u})).toBeDisabled();
});

for(const subjectId of ["portuguese","physics-chemistry-a"]){
  test(`${subjectId} · Missão em pausa: «Começar treino» não abre a Missão em silêncio`,async({page})=>{
    await page.setViewportSize({width:390,height:844});
    const state=configuredState(subjectId);
    state.subjectProgress[subjectId].lastPosition={sessionId:"paused-"+subjectId,kind:"mission",label:"Missão recomendada",current:1,results:[],startedAt:Date.now()-60000,
      itemIds:subjectId==="portuguese"?["PT639-FND-001","PT639-FND-002","PT639-FND-004","PT639-FND-018"]:["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01","FQA-ELEM-02"]};
    await page.addInitScript(value=>localStorage.setItem("a25",JSON.stringify(value)),state);
    await page.goto("/");
    await expect(page.locator(".learnHome")).toBeVisible({timeout:30_000});
    await page.locator(".studentNav button",{hasText:"Treinar"}).click();
    await page.getByRole("button",{name:/^🎯\s*Praticar/u}).click();
    await expect(page.getByRole("button",{name:"Começar treino",exact:true})).toHaveCount(0);
    await expect(page.locator(".pausedSessionStatus .pausedActivityEyebrow")).toContainText("MISSÃO DE HOJE");
    await expect(page.locator(".pausedSessionStatus .sessionPausedPosition")).toHaveText("Pergunta 2 de 4");
    await expect(page.locator(".pausedSessionNote")).toContainText("uma sessão a meio de cada vez");
    await expect(page.getByRole("button",{name:"Continuar sessão",exact:true})).toHaveCount(1);
    // Área Exames: as provas ficam escondidas, com a explicação.
    await page.goBack();
    await expect(page.locator(".studentNav")).toBeVisible({timeout:30_000});
    await page.locator(".studentNav button",{hasText:"Treinar"}).click();
    await page.getByRole("button",{name:/^📝\s*Exames/u}).click();
    await expect(page.locator(".pausedSession")).toHaveCount(1);
    await expect(page.locator(".pausedSessionNote")).toContainText("uma sessão a meio de cada vez");
  });
}
