import {test,expect} from "@playwright/test";
import {emptyScores,questionById} from "../../app/lib/engine.js";

for(const complete of [true,false]){
 test(`CRV2-10FUN-STEPS-1 · ${complete?"35 pontos com conclusão correta":"25 pontos e explicação sem duplicações"}`,async({page},testInfo)=>{
  const now=Date.now(),subjectId="math-a",sessionId="score-feedback-"+complete;
  const state={goal:17,xp:120,diagnosticDone:true,diagnosticAnswers:0,scores:emptyScores(),selectedSubjectIds:[subjectId],activeSubjectId:subjectId,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[subjectId]:{profileConfigured:true,goal:17}},subjectProgress:{},profile:{schoolYear:"Já terminei o secundário",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
  const current={...questionById("CRV2-10FUN-STEPS-1"),practiceOnly:true};
  const draft={kind:"mission",sessionId,current,plan:{type:"target",themeId:current.themeId,focus:current.focus},savedAt:now};
  await page.addInitScript(({state,draft})=>{localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify(draft))},{state,draft});
  await page.goto("/");
  await expect(page.getByRole("heading",{name:current.q,exact:true})).toBeVisible({timeout:30_000});
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-equation"]').fill("3x-12=0");
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-value"]').fill("x=4");
  await page.locator('[id="practice-CRV2-10FUN-STEPS-1-conclusion"]').fill(complete?"O zero de f é 4.":"Não sei concluir.");
  await page.getByRole("button",{name:"Responder",exact:true}).click();
  const feedback=page.locator(".practiceResponse>.notice");
  await expect(feedback).toBeVisible();
  if(complete){
   await expect(feedback.getByText("35/35 pontos",{exact:true})).toBeVisible();
   await expect(feedback.locator(".scoreLossExplanation")).toHaveCount(0);
  }else{
   await expect(feedback.locator(".scoreExplainSummary")).toContainText("25 / 35");
   await expect(feedback.locator(".scoreExplainSummary")).toHaveCount(1);
   await expect(feedback.locator(".scoreBreakdown, .scoreMissingForFullCredit")).toHaveCount(0);
   await expect(feedback.getByText("Etapa ainda não validada:",{exact:false})).toBeVisible();
   await expect(feedback.getByText("Exemplo: O zero de f é 4.",{exact:true})).toHaveCount(1);
  }
  await expect(feedback.locator(".stepResults>div")).toHaveCount(3);
  await expect(feedback.getByText("Ver resolução completa",{exact:true})).toBeVisible();
  await expect(feedback.locator("details")).not.toHaveAttribute("open");
  await testInfo.attach("feedback",{body:await page.screenshot(),contentType:"image/png"});
 });
}
