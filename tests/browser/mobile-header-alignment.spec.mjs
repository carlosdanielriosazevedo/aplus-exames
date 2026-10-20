import {test,expect} from "@playwright/test";
function configuredState(subjectId){
 const now=Date.now();
 return {
  goal:17,diagnosticDone:subjectId==="math-a",diagnosticAnswers:0,
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
async function seed(page,state){
 await page.addInitScript(value=>localStorage.setItem("a25",JSON.stringify(value)),state);
}
function completedState(subjectId){return configuredState(subjectId);}

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
  for(const width of [360,390,430]){
  test(`${subjectId} · cabeçalho estável a ${width}px entre separadores`,async({page})=>{
    await page.setViewportSize({width,height:844});
    await seed(page,completedState(subjectId));
    await page.goto("/");
    const positions=[];
    for(const tab of ["Aprender","Treinar","Ranking","Progresso"]){
      await page.getByRole("button",{name:tab,exact:true}).last().click();
      await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
      const geometry=await page.evaluate(()=>{
        const selectors=[".studentTop .logo",".studentTop .subjectSwitcher",".studentTop .studentMenu>summary"];
        return selectors.map(selector=>{
          const el=document.querySelector(selector);
          if(!el){
            if(selector.includes("studentMenu"))return null; // nem todos os menus expõem o mesmo botão
            throw new Error("Elemento comum ausente: "+selector);
          }
          const rect=el.getBoundingClientRect();
          return {x:rect.x,y:rect.y,width:rect.width,height:rect.height};
        });
      });
      positions.push({tab,geometry});
    }
    for(const row of positions){
      for(const item of row.geometry.filter(Boolean)){
        expect(item.x,`${subjectId} ${width}px: ${row.tab} sai pela margem esquerda`).toBeGreaterThanOrEqual(0);
        expect(item.x+item.width,`${subjectId} ${width}px: ${row.tab} sai pela margem direita`).toBeLessThanOrEqual(width+1);
      }
    }
    const reference=positions[0].geometry;
    for(const row of positions.slice(1)){
      for(let index=0;index<reference.length;index++){
        if(!reference[index]||!row.geometry[index])continue;
        expect(Math.abs(row.geometry[index].x-reference[index].x),`${row.tab}: elemento ${index} deslocou-se na horizontal`).toBeLessThanOrEqual(2);
        expect(Math.abs(row.geometry[index].y-reference[index].y),`${row.tab}: elemento ${index} deslocou-se na vertical`).toBeLessThanOrEqual(2);
      }
    }
  });
  }
}
