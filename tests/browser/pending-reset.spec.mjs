import {test,expect} from "@playwright/test";
import {emptyScores,trainingQuestions} from "../../app/lib/engine.js";

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
 test(`${subjectId} · menu de protótipo não pode apagar uma avaliação pendente`,async({page})=>{
  const now=Date.now();
  const state={goal:17,xp:120,diagnosticDone:true,scores:emptyScores(),selectedSubjectIds:["math-a",subjectId],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},profile:{schoolYear:"Já terminei o secundário",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:now};
  let draft=null;
  if(subjectId==="math-a"){
   const cfg={themeId:"10-fun",focus:"Domínio e zeros",level:"auto"};
   draft={kind:"training",sessionId:"reset-math",cfg,questions:trainingQuestions(state,cfg),i:2,sel:0,savedAt:now};
  }else{
   state.subjectProgress[subjectId]={subjectId,version:4,diagnosticDone:true,sessions:[],missionHistory:[],competence:{},lastPosition:{sessionId:"reset-"+subjectId,kind:"training",current:2,currentAnswer:"resposta por conservar",results:[{final:true,correct:true}],itemIds:subjectId==="portuguese"?["PT639-FND-001","PT639-FND-002","PT639-FND-004"]:["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01"],startedAt:now-60000}};
  }
  await page.goto("/");
  await page.evaluate(({state,draft})=>{localStorage.setItem("a25",JSON.stringify(state));if(draft)localStorage.setItem("a25-active-session-v1",JSON.stringify(draft))},{state,draft});
  await page.goto("/?dev=1");
  if(draft){
   await expect(page.locator(".sessionTop")).toBeVisible({timeout:30_000});
   await page.getByRole("button",{name:"Guardar e continuar depois",exact:true}).click();
  }
  await page.getByLabel("Abrir menu",{exact:true}).click();
  const read=()=>page.evaluate(subjectId=>{
   const state=JSON.parse(localStorage.getItem("a25")||"null");
   const raw=subjectId==="math-a"?JSON.parse(localStorage.getItem("a25-active-session-v1")||"null"):state?.subjectProgress?.[subjectId]?.lastPosition;
   const attempt=raw?Object.fromEntries(Object.entries(raw).filter(([key])=>key!=="savedAt")):raw;
   return {xp:state?.xp,attempt};
  },subjectId);
  const before=await read();
  expect(before.attempt).toBeTruthy();
  await expect(page.getByRole("button",{name:"Recomeçar protótipo",exact:true})).toHaveCount(0);
  await expect.poll(read).toEqual(before);
  await page.reload();
  await expect.poll(read).toEqual(before);
 });
}

test("Matemática A · callback de reset antigo respeita uma tentativa entretanto guardada",async({page})=>{
 const state={goal:17,xp:120,diagnosticDone:true,scores:emptyScores(),selectedSubjectIds:["math-a"],activeSubjectId:"math-a",firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{"math-a":{profileConfigured:true}},subjectProgress:{},profile:{schoolYear:"Já terminei o secundário",syllabus:"most",taughtSubtopicIds:[]},betaMode:"internal",_stateVersion:31,_savedAt:Date.now()};
 await page.goto("/");
 await page.evaluate(state=>localStorage.setItem("a25",JSON.stringify(state)),state);
 await page.goto("/?dev=1");
 await page.getByLabel("Abrir menu",{exact:true}).click();
 const reset=page.getByRole("button",{name:"Recomeçar protótipo",exact:true});
 await expect(reset).toBeVisible();
 const cfg={themeId:"10-fun",focus:"Domínio e zeros",level:"auto"};
 const draft={kind:"training",sessionId:"saved-after-render",cfg,questions:trainingQuestions(state,cfg),i:2,sel:0,savedAt:Date.now()};
 await page.evaluate(draft=>localStorage.setItem("a25-active-session-v1",JSON.stringify(draft)),draft);
 await reset.click();
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")||"null"))).toEqual(draft);
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem("a25")||"null")?.xp)).toBe(120);
});
