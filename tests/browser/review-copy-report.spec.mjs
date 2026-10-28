import {test,expect} from "@playwright/test";
import {emptyScores,questionById} from "../../app/lib/engine.js";

test("content report records a problem without promising human review",async({page})=>{
  const now=Date.now(),subjectId="math-a";
  const state={goal:17,xp:120,diagnosticDone:true,diagnosticAnswers:0,scores:emptyScores(),selectedSubjectIds:[subjectId],activeSubjectId:subjectId,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[subjectId]:{profileConfigured:true,goal:17}},subjectProgress:{},profile:{schoolYear:"Já terminei o secundário",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
  const current={...questionById("CRV2-10FUN-STEPS-1"),practiceOnly:true};
  const draft={kind:"mission",sessionId:"review-copy-report-synthetic",current,plan:{type:"target",themeId:current.themeId,focus:current.focus},savedAt:now};
  await page.addInitScript(({state,draft})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    localStorage.setItem("a25-active-session-v1",JSON.stringify(draft));
  },{state,draft});
  await page.goto("/");
  await expect(page.getByRole("heading",{name:current.q,exact:true})).toBeVisible({timeout:30000});
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-equation"]').fill("3x-12=0");
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-value"]').fill("x=4");
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-conclusion"]').fill("O zero de f é 4.");
  await page.getByRole("button",{name:"Responder",exact:true}).click();
  await page.getByRole("button",{name:/Reportar problema nesta pergunta/i}).click();
  await page.getByRole("button",{name:"A resposta parece errada"}).click();
  const receipt=page.locator(".reportThanks");
  await expect(receipt).toHaveText("✓ Obrigado. O problema ficou registado.");
  await expect(receipt).not.toContainText(/sinalizad.*revisão|revisão humana/i);
  await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem("a25"))?.contentReports?.length)).toBe(1);
});
