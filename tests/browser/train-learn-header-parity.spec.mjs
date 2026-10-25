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


for(const subjectId of ['math-a','portuguese','physics-chemistry-a'])for(const width of [320,360,390,430,1366,1920]){
 test(`${subjectId} · Aprender/Treinar typography and mascot alignment ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1080});await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(s=>localStorage.setItem('a25',JSON.stringify(s)),configuredState(subjectId));
  await page.goto('/');const layouts=[];
  for(const tab of ['Aprender','Treinar']){
   await page.getByRole('button',{name:tab,exact:true}).last().click();
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})))});
   const data=await page.locator('.learnIntro').evaluate(el=>{
    const title=el.querySelector('h1'),style=getComputedStyle(title),r=title.getBoundingClientRect(),p=getComputedStyle(el,'::after');
    const copy=el.querySelector('.apronsoNudge>p')||el.querySelector(':scope>span');const cr=copy.getBoundingClientRect(),cs=getComputedStyle(copy),er=el.getBoundingClientRect();
    return {x:r.x,y:r.y,font:style.fontFamily,size:style.fontSize,weight:style.fontWeight,color:style.color,copyX:cr.x,copyFont:cs.fontFamily,copySize:cs.fontSize,copyColor:cs.color,copyWeight:cs.fontWeight,copyY:cr.y,mascot:{right:p.right,bottom:p.bottom,width:p.width,height:p.height,baseline:er.bottom+parseFloat(p.bottom)},overflow:document.documentElement.scrollWidth>innerWidth};
   });layouts.push(data);
   await testInfo.attach(`${tab}-${width}`,{body:await page.screenshot({animations:'disabled'}),contentType:'image/png'});
   if(tab==='Treinar'){
    await expect(page.getByText('TREINAR',{exact:true})).toHaveCount(0);
    await expect(page.locator('.trainIntro .apronsoNudge')).toHaveCSS('border-top-width','0px');
    await expect(page.locator('.trainIntro .apronsoNudge>img')).toBeHidden();
    await expect(page.locator('.trainIntro .apronsoNudge')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
   }
  }
  console.log(JSON.stringify({subjectId,width,layouts}));
  await testInfo.attach('Measured layout',{body:JSON.stringify({subjectId,width,layouts},null,2),contentType:'application/json'});
  for(const key of ['x','font','size','weight','color','copyX','copyFont','copySize','copyColor','copyWeight'])expect(layouts[1][key],key).toBe(layouts[0][key]);
  expect(Math.abs(layouts[1].y-layouts[0].y),'title baseline').toBeLessThanOrEqual(1);
  if(width>760){expect(layouts[1].mascot).toEqual(layouts[0].mascot);expect(layouts[1].copyY).toBe(layouts[0].copyY)}
  expect(layouts[1].overflow).toBe(false);
 });
}
