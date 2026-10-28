import {test,expect} from "@playwright/test";
import {readFileSync} from "node:fs";
import {emptyScores} from "../../app/lib/engine.js";

test("Português · Missão em pausa fica apenas na caixa principal com uma ação",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  const now=Date.now();
  const ids=JSON.parse(readFileSync(new URL("../../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8")).items.slice(0,7).map(x=>x.id);
  expect(ids).toHaveLength(7);
  const position={sessionId:"synthetic-paused-pt-mission",kind:"mission",label:"Missão recomendada",domain:null,itemIds:ids,current:3,results:Array.from({length:3},()=>({status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic",classificationMode:null,requiresReview:false,responseText:"",type1Count:0,type2Count:0})),startedAt:now-60000,updatedAt:now};
  const state={goal:17,xp:175,diagnosticDone:true,diagnosticAnswers:8,scores:emptyScores(),selectedSubjectIds:["portuguese"],activeSubjectId:"portuguese",firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{portuguese:{profileConfigured:true,goal:17}},subjectProgress:{portuguese:{subjectId:"portuguese",version:4,diagnosticDone:true,diagnosticCompletedAt:now-100000,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:position,lastActivityAt:now}},profile:{schoolYear:"11.º",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
  await page.addInitScript(state=>localStorage.setItem("a25",JSON.stringify(state)),state);
  await page.goto("/");
  const home=page.locator(".learnHome");
  await expect(home).toBeVisible({timeout:30000});
  await expect(home.locator(".pausedSession")).toHaveCount(0);
  await expect(home.locator(".pathNode.current article")).toContainText("SESSÃO EM PAUSA");
  await expect(home.locator(".sessionPausedMeta")).toHaveText("Pergunta 4 de 7");
  const resume=home.getByRole("button",{name:"Continuar sessão",exact:true});
  await expect(resume).toHaveCount(1);
  await resume.click();
  await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible({timeout:30000});
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25"))?.subjectProgress?.portuguese?.lastPosition);
  expect(saved?.sessionId).toBe(position.sessionId);
  expect(saved?.current).toBe(3);
});
