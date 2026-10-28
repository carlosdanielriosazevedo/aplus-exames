import {test,expect} from "@playwright/test";
import {emptyScores,buildMiniExam} from "../../app/lib/engine.js";

test("unanswered mini-exam review does not invent a provisional zero grade",async({page})=>{
  const now=Date.now(),subjectId="math-a";
  const state={goal:17,xp:120,diagnosticDone:true,diagnosticAnswers:0,scores:emptyScores(),selectedSubjectIds:[subjectId],activeSubjectId:subjectId,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[subjectId]:{profileConfigured:true,goal:17}},subjectProgress:{},profile:{schoolYear:"Já terminei o secundário",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
  const questions=buildMiniExam(state);
  expect(questions.length).toBeGreaterThan(0);
  const draft={kind:"mini_exam",screen:"miniExamRun",session:{sessionId:"review-copy-unanswered-synthetic",questions,current:0,answers:questions.map(()=>null),startedAt:now-60000}};
  await page.addInitScript(({state,draft})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    localStorage.setItem("a25-active-session-v1",JSON.stringify(draft));
  },{state,draft});
  await page.goto("/");
  await expect(page.getByRole("button",{name:"Ver mapa de respostas"})).toBeVisible({timeout:30000});
  await page.getByRole("button",{name:"Ver mapa de respostas"}).click();
  await page.getByRole("button",{name:"Entregar Mini-exame"}).click();
  await page.getByRole("button",{name:"Rever o Mini-exame"}).click();
  await expect(page.getByRole("heading",{name:"Revê as tuas respostas."})).toBeVisible({timeout:30000});
  const unanswered=page.locator("details.reviewItem.unanswered").first();
  await expect(unanswered).toBeVisible();
  await expect(unanswered.locator("summary")).toContainText("Não respondida");
  await expect(unanswered.locator("summary")).not.toContainText("0/");
  await expect(unanswered.locator(".scoreLossExplanation")).toHaveCount(0);
  await expect(page.getByText("A resposta fica sinalizada para revisão.")).toHaveCount(0);
});
