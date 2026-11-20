import {test,expect} from "@playwright/test";
import {mkdirSync} from "node:fs";
mkdirSync("/tmp/audit-ranking",{recursive:true});
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
 test(`${subjectId} · compact Ranking header ${width}px`,async({page},testInfo)=>{
  await page.setViewportSize({width,height:1080});await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(s=>localStorage.setItem('a25',JSON.stringify(s)),configuredState(subjectId));
  await page.goto('/');await page.getByRole('button',{name:'Ranking',exact:true}).last().click();
  const hero=page.locator('.rankingHero'),owl=hero.locator('img.rankingHeadingApronso'),badge=hero.locator('.divisionBadge');
  await expect(owl).toBeVisible();await expect(hero.locator('img')).toHaveCount(1);
  await owl.evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('Mascot not loaded')});
  await expect(badge).toHaveCSS('background-color','rgb(255, 248, 237)');
  await expect(page.getByText('Modo de demonstração · participantes simulados ⓘ',{exact:true})).toBeVisible();
  const layout=await hero.evaluate(el=>{
   const title=el.querySelector('h1'),owl=el.querySelector('img'),copy=el.querySelector('.muted'),badge=el.querySelector('.divisionBadge');
   const r=document.createRange();r.selectNodeContents(title);
   const bounds=e=>{const x=e.getBoundingClientRect();return {left:x.left,right:x.right,top:x.top,bottom:x.bottom,width:x.width,height:x.height}};
   return {owl:bounds(owl),copy:bounds(copy),badge:bounds(badge),title:bounds(title),titleLineHeight:parseFloat(getComputedStyle(title).lineHeight),titleText:[...r.getClientRects()].map(x=>({left:x.left,right:x.right,top:x.top,bottom:x.bottom})),overflow:document.documentElement.scrollWidth>innerWidth};
  });
  expect(layout.overflow).toBe(false);
  expect(layout.badge.left).toBe(layout.copy.left);expect(layout.badge.top).toBeGreaterThanOrEqual(layout.copy.bottom);
  expect(layout.badge.height).toBeLessThan(60);
  if(width>760){expect(layout.owl.width).toBe(126);expect(layout.owl.height).toBe(142)}
  else {expect(Math.abs(layout.owl.bottom-(layout.title.top+layout.titleLineHeight))).toBeLessThanOrEqual(1)}
  for(const line of layout.titleText)expect(line.right).toBeLessThanOrEqual(layout.owl.left);
  const total=await badge.locator('small').first().innerText(),division=await badge.locator('b').innerText();
  const filter=page.getByLabel('Escolher disciplina',{exact:true});
  for(const id of ['math-a','portuguese','physics-chemistry-a']){
   await filter.selectOption(id);await expect(badge.locator('small').first()).toHaveText(total);await expect(badge.locator('b')).toHaveText(division);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  }
  await filter.selectOption('all');await page.evaluate(()=>document.fonts.ready);
  const path=`/tmp/audit-ranking/${subjectId}-${width}.png`;await page.screenshot({path,animations:'disabled'});
  await testInfo.attach('Ranking',{path,contentType:'image/png'});console.log(JSON.stringify({subjectId,width,layout}));
 });
}
