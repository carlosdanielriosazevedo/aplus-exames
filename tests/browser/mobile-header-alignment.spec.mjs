import {test,expect} from "@playwright/test";
import {mkdirSync} from "node:fs";
import {emptyScores,trainingQuestions} from "../../app/lib/engine.js";
mkdirSync("/tmp/audit-visual",{recursive:true});
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
async function seed(page,state){
 await page.addInitScript(value=>localStorage.setItem("a25",JSON.stringify(value)),state);
}
function completedState(subjectId){return configuredState(subjectId);}

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
  for(const width of [320,360,390,430]){
  test(`${subjectId} · cabeçalho estável a ${width}px entre separadores`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:844});
    await seed(page,completedState(subjectId));
    await page.goto("/");
    const positions=[];
    for(const tab of ["Aprender","Treinar","Ranking","Progresso"]){
      await page.getByRole("button",{name:tab,exact:true}).last().click();
      await expect(page.locator(".studentTop")).toBeVisible({timeout:30_000});
      await expect(page.getByRole("button",{name:tab,exact:true}).last()).toHaveAttribute("aria-current","page");
      await expect(page.getByRole("button",{name:"123456 XP",exact:true})).toBeVisible();
      if(tab==="Ranking"){
        await expect(page.locator(".divisionBadge b")).toHaveCSS("white-space","nowrap");
        const filter=page.getByLabel("Escolher disciplina",{exact:true});
        await expect(filter.locator("option")).toHaveText(["Todas as disciplinas","Matemática A","Português","Física e Química A"]);
        for(const value of ["math-a","portuguese","physics-chemistry-a","all"]){await filter.selectOption(value);await expect(filter).toHaveValue(value)}
      }
      await page.evaluate(()=>window.scrollTo(0,0));
      await page.screenshot({path:`/tmp/audit-visual/${subjectId}-${width}-${tab}.png`});
      await testInfo.attach(`${tab}-${width}`,{body:await page.screenshot(),contentType:"image/png"});
      const layout=await page.evaluate(()=>{
        const logo=document.querySelector(".studentTop .logo").getBoundingClientRect();
        const actions=document.querySelector(".studentTopActions").getBoundingClientRect();
        const xp=document.querySelector('.studentTopActions button[aria-label="123456 XP"] b');
        const range=document.createRange();range.selectNodeContents(xp);
        return {logoRight:logo.right,actionsLeft:actions.left,xpLines:range.getClientRects().length,scrollWidth:document.documentElement.scrollWidth};
      });
      const counters=await page.evaluate(()=>{
        const button=document.querySelector('.studentTop button[aria-label$=" XP"]');
        const range=document.createRange();range.selectNodeContents(button.querySelector('b'));
        return {textRight:range.getBoundingClientRect().right,buttonRight:button.getBoundingClientRect().right,menuLeft:document.querySelector('.studentMenu>summary').getBoundingClientRect().left};
      });
      expect(counters.textRight,`${tab}: XP sai do próprio botão`).toBeLessThanOrEqual(counters.buttonRight);
      expect(counters.textRight,`${tab}: XP invade o menu`).toBeLessThan(counters.menuLeft);
      if(tab==='Aprender'){
        const mascot=await page.locator('.learnIntro').evaluate(el=>{
          const title=el.querySelector('.mobileMainTitle'),copy=el.querySelector(':scope>span');
          const pseudo=getComputedStyle(title,'::after');
          return {titleBottom:title.getBoundingClientRect().bottom,copyTop:copy.getBoundingClientRect().top,legacyContent:getComputedStyle(el,'::after').content,content:pseudo.content,background:pseudo.backgroundImage,bottom:pseudo.bottom};
        });
        expect(mascot.legacyContent).toBe('none');
        expect(mascot.content).toBe('""');
        expect(mascot.background).toContain('apronso-welcome.webp');
        expect(mascot.bottom).toBe('0px');
        expect(mascot.copyTop).toBeGreaterThan(mascot.titleBottom);
        await expect(page.locator('.learnIntro img.apronso')).toHaveCount(0);
      }
      expect(layout.logoRight,`${tab}: logótipo sobreposto aos indicadores`).toBeLessThanOrEqual(layout.actionsLeft+1);
      expect(layout.xpLines,`${tab}: XP quebrou de linha`).toBe(1);
      expect(layout.scrollWidth,`${tab}: scroll horizontal`).toBeLessThanOrEqual(width+1);
      const geometry=await page.evaluate(()=>{
        const selectors=[".studentTop .logo",".studentTop .subjectSwitcher",".studentTop .studentMenu>summary",'.studentTop button[aria-label$=" XP"]'];
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

for(const subjectId of ["math-a","portuguese","physics-chemistry-a"]){
 for(const width of [320,360,390,430]){
  test(`${subjectId} · cartão de sessão em pausa a ${width}px`,async({page},testInfo)=>{
   await page.setViewportSize({width,height:844});
   const state=configuredState(subjectId);
   let draft=null;
   if(subjectId==="math-a"){
    state.scores=emptyScores();state.profile.schoolYear="Já terminei o secundário";
    const cfg={themeId:"10-fun",focus:"Domínio e zeros",level:"auto"};
    const questions=trainingQuestions(state,cfg);
    draft={kind:"training",sessionId:"visual-paused-math",cfg,questions,i:2,sel:null,savedAt:Date.now()};
   }else{
    state.subjectProgress[subjectId].lastPosition={sessionId:"visual-paused-"+subjectId,kind:"mission",label:"Missão em pausa",current:2,results:[],startedAt:Date.now()-60000,itemIds:subjectId==="portuguese"?["PT639-FND-001","PT639-FND-002","PT639-FND-004","PT639-FND-018"]:["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01","FQA-ELEM-02"]};
   }
   await page.addInitScript(({state,draft})=>{localStorage.setItem("a25",JSON.stringify(state));if(draft)localStorage.setItem("a25-active-session-v1",JSON.stringify(draft))},{state,draft});
   await page.goto("/");
   if(subjectId==="math-a"){
    await expect(page.locator(".sessionTop")).toBeVisible({timeout:30_000});
    await page.getByRole("button",{name:"Guardar e continuar depois",exact:true}).click();
   }
   const card=page.locator(".learnHome .adaptivePath .pathNode.current article").first();
   await expect(card).toBeVisible({timeout:30_000});
   await expect(card.locator(".missionPausedStatus")).toHaveCount(1);
   await expect(card.locator(".missionPausedStatus")).toContainText("SESSÃO EM PAUSA");
   await expect(card.getByRole("button",{name:"Continuar sessão",exact:true})).toBeVisible();
   await expect(page.locator(".learnHome .pausedSession")).toHaveCount(0);
   await expect(page.locator(".learnHome button",{hasText:"Continuar →"})).toHaveCount(0);
   const rect=await card.boundingBox();
   expect(rect.x).toBeGreaterThanOrEqual(0);expect(rect.x+rect.width).toBeLessThanOrEqual(width+1);
   // This is the existing full-sized navy mission card, not the old compact yellow banner.
   expect(rect.height).toBeLessThanOrEqual(440);
   const view=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth}));
   expect(view.scrollWidth).toBeLessThanOrEqual(view.width+1);
   await page.screenshot({path:`/tmp/audit-visual/${subjectId}-${width}-Pausa.png`});
   await testInfo.attach(`Sessão em pausa-${width}`,{body:await page.screenshot(),contentType:"image/png"});
  });
 }
}
