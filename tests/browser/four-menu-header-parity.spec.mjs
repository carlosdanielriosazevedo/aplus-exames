import {test,expect} from "@playwright/test";
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
for(const subjectId of ['math-a','portuguese','physics-chemistry-a'])for(const width of [320,360,390,430,576,760]){
 test(`${subjectId} · four menu slots stay fixed at ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:844});
  await page.addInitScript(s=>localStorage.setItem('a25',JSON.stringify(s)),configuredState(subjectId));
  await page.goto('/');
  const layouts=[];
  for(const tab of ['Aprender','Treinar','Ranking','Progresso','Aprender']){
   await page.getByRole('button',{name:tab,exact:true}).last().click();
   await expect(page.locator('.menuIntro')).toBeVisible();
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
   await page.evaluate(()=>scrollTo(0,0));
   layouts.push(await page.evaluate(()=>{
    const rect=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
    const header=document.querySelector('.menuIntro'),title=header.querySelector('h1');
    const titleSlot=header.querySelector('.menuTitle'),owl=titleSlot.querySelector('img.apronso');
    const pseudo=getComputedStyle(titleSlot,'::after'),slot=titleSlot.getBoundingClientRect();
    const mascot=owl?rect(owl):pseudo.content==='\"\"'?{x:slot.right-parseFloat(pseudo.right)-parseFloat(pseudo.width),y:slot.y+parseFloat(pseudo.top),width:parseFloat(pseudo.width),height:parseFloat(pseudo.height)}:null;
    const keys=['.studentTop .logo','.subjectSwitcher','.studentTopActions','.studentMenu>summary','.menuTitle'];
    return {mascot,common:keys.map(s=>rect(document.querySelector(s))),labelY:header.querySelector('.menuTitle>p').getBoundingClientRect().y,titleY:title.getBoundingClientRect().y,titleFont:getComputedStyle(title).fontSize,header:rect(header),overflow:document.documentElement.scrollWidth>innerWidth};
   }));
   if(width===390&&subjectId==='portuguese')await testInfo.attach(tab,{body:await page.screenshot(),contentType:'image/png'});
  }
  await testInfo.attach('geometry',{body:JSON.stringify(layouts,null,2),contentType:'application/json'});
  for(const layout of layouts){
   if(layout.mascot)for(const key of ['x','y','width','height'])expect(Math.abs(layout.mascot[key]-layouts[0].mascot[key])).toBeLessThan(0.02);
   expect(layout.overflow).toBe(false);
   expect(layout.common).toEqual(layouts[0].common);
   expect(layout.labelY).toBe(layouts[0].labelY);
   expect(layout.titleY).toBe(layouts[0].titleY);
   expect(layout.titleFont).toBe(layouts[0].titleFont);
   expect(layout.header).toEqual(layouts[0].header);
  }
 });
}
