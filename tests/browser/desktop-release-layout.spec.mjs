import {test,expect} from "@playwright/test";
import {mkdirSync} from "node:fs";
mkdirSync("/tmp/audit-desktop",{recursive:true});
function configuredState(subjectId){
 const now=Date.now();
 return {
  goal:17,xp:123456,diagnosticDone:subjectId==="math-a",diagnosticAnswers:0,
  selectedSubjectIds:[subjectId],activeSubjectId:subjectId,
  firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],
  onboardingReturnSubjectId:null,subjectOnboardingMode:"initial",
  subjectSettings:{[subjectId]:{profileConfigured:true,recentGrade:"",examTiming:"thisYear",goal:17}},
  subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:now}},
  subjectProgressModelVersion:4,pedagogicalIdVersion:1,betaMode:"internal",
  profile:{schoolYear:"11.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
  _stateVersion:31,_savedAt:now
 };
}

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
 for(const [width,height] of [[1366,768],[1920,1080]]){
  test(`${subjectId} · desktop ${width}×${height} e Rever matéria`,async({page},testInfo)=>{
   await page.setViewportSize({width,height});
   await page.addInitScript(state=>localStorage.setItem('a25',JSON.stringify(state)),configuredState(subjectId));
   await page.goto('/');
   for(const tab of ['Aprender','Ranking','Progresso','Treinar']){
    await page.getByRole('button',{name:tab,exact:true}).last().click();
    await expect(page.getByRole('button',{name:tab,exact:true}).last()).toHaveAttribute('aria-current','page');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({path:`/tmp/audit-desktop/${subjectId}-${width}-${tab}.png`});
   }
   await page.getByRole('button',{name:/Rever matéria/u}).click();
   await expect(page.getByText('REVER MATÉRIA',{exact:true})).toBeVisible();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
   await page.screenshot({path:`/tmp/audit-desktop/${subjectId}-${width}-Rever.png`});
   await testInfo.attach('Rever matéria',{body:await page.screenshot(),contentType:'image/png'});
  });
 }
}
