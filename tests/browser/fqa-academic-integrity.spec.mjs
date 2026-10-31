import {test,expect} from "@playwright/test";
const id="physics-chemistry-a";
function syntheticState(){
 const now=Date.now();
 return {goal:17,xp:234,diagnosticDone:true,diagnosticAnswers:0,scores:{},selectedSubjectIds:[id],activeSubjectId:id,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[id]:{profileConfigured:true,goal:17}},subjectProgress:{[id]:{subjectId:id,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[{sessionId:"synthetic-legacy-science",kind:"mission",completedAt:now-60000,itemIds:["FQA-R-MEC-01"],results:[{status:"auto-assessed-provisional",final:false,provisionalPoints:9,maxPoints:10,responseText:"Resposta histórica exclusivamente sintética",rubricCompleted:true}]}],missionHistory:[],competence:{"fqa-data":{attempts:1,rubricObserved:20,rubricNeedsReview:0,rubricReviews:1}},errorPatterns:{"bad|conceptual":{status:"recurring",label:"Dificuldade sintética não validada",count:5,lastAt:now}},lastPosition:null,lastActivityAt:now}},profile:{schoolYear:"Já terminei o secundário",recentGrade:14,syllabus:"most",taughtSubtopicIds:[]},pedagogicalIdVersion:1,betaMode:"internal",_stateVersion:31,_savedAt:now};
}
for(const width of [360,390,430,1366]){
 test(`FQA historical science is preserved but excluded at ${width}px and reload`,async({page})=>{
  await page.setViewportSize({width,height:844});const state=syntheticState();
  await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
  await page.goto("/");
  for(let pass=0;pass<2;pass++){
   await page.getByRole("button",{name:"Progresso",exact:true}).last().click();
   await expect(page.getByRole("heading",{name:"Como estás a evoluir."})).toBeVisible();
   await expect(page.getByRole("status").filter({hasText:"Informação insuficiente"})).toBeVisible();
   await expect(page.locator(".progressHero b").first()).toHaveText("—");
   await expect(page.getByText("Dificuldade sintética não validada",{exact:true})).toHaveCount(0);
   await expect(page.getByRole("button",{name:"234 XP",exact:true})).toBeVisible();
   const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));
   expect(stored.xp).toBe(234);expect(stored.subjectProgress[id].sessions[0]).toEqual(state.subjectProgress[id].sessions[0]);expect(stored.subjectProgress[id].competence).toEqual(state.subjectProgress[id].competence);
   if(pass===0)await page.reload();
  }
 });
}
