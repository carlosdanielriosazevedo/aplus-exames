import {test,expect} from "@playwright/test";
import {PORTUGUESE_ITEMS} from "../../app/data/portugueseContent.js";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";

function configured(subjectId,kind,itemIds){
  const now=Date.now();
  return {
    goal:17,xp:175,diagnosticDone:false,diagnosticAnswers:0,
    selectedSubjectIds:[subjectId],activeSubjectId:subjectId,
    firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],
    subjectSettings:{[subjectId]:{profileConfigured:true,goal:17}},
    subjectProgress:{[subjectId]:{
      subjectId,version:4,diagnosticDone:true,diagnosticCompletedAt:now,missionHistory:[],sessions:[],
      competence:{},errorPatterns:{},errorMemoryVersion:1,lastActivityAt:now,
      lastPosition:{sessionId:"single-cta-"+subjectId+"-"+kind,kind,label:kind==="mission"?"Missão recomendada":"Treino Livre",
        itemIds,current:2,results:[],startedAt:now-120000}
    }},
    profile:{schoolYear:"11.º",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    betaMode:"internal",_stateVersion:31,_savedAt:now
  };
}
for(const [subjectId,items] of [
  ["portuguese",PORTUGUESE_ITEMS],
  ["physics-chemistry-a",PHYSICS_CHEMISTRY_A_ITEMS]
]){
  for(const kind of ["mission","training"]){
    test(subjectId+" · "+kind+" · single resume CTA restores exact saved item",async({page})=>{
      await page.setViewportSize({width:390,height:844});
      const selected=items.slice(0,7);
      const state=configured(subjectId,kind,selected.map(item=>item.id));
      await page.addInitScript(state=>localStorage.setItem("a25",JSON.stringify(state)),state);
      await page.goto("/");
      const card=page.locator(".learnHome .adaptivePath .pathNode.current article");
      await expect(card).toBeVisible({timeout:30000});
      await expect(card.locator(".missionPausedStatus")).toContainText("SESSÃO EM PAUSA");
      await expect(card.locator(".missionPausedProgress")).toContainText("Pergunta 3 de 7");
      await expect(page.locator(".learnHome .pausedSession")).toHaveCount(0);
      await expect(page.getByRole("button",{name:"Continuar sessão",exact:true})).toHaveCount(1);
      await card.getByRole("button",{name:"Continuar sessão"}).click();
      await expect(page.locator(".studySessionShell")).toBeVisible({timeout:30000});
      await expect(page.locator(".sessionTop")).toBeVisible();
      const recovered=await page.evaluate(subjectId=>JSON.parse(localStorage.getItem("a25"))?.subjectProgress?.[subjectId]?.lastPosition,subjectId);
      expect(recovered.sessionId).toBe(state.subjectProgress[subjectId].lastPosition.sessionId);
      expect(recovered.current).toBe(2);
    });
  }
}
