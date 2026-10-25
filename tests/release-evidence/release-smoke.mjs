import {chromium} from "playwright";
import assert from "node:assert/strict";
import {mkdirSync} from "node:fs";
const evidenceDir=process.env.RELEASE_EVIDENCE_DIR||"tmp/release-evidence";
mkdirSync(evidenceDir,{recursive:true});
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


const base=process.env.RELEASE_BASE_URL;
const phase=process.env.RELEASE_PHASE;
assert.ok(['stage','public'].includes(phase));
const url=new URL(base);
assert.equal(url.protocol,'https:');
assert.ok(['approvamais.pt','www.approvamais.pt'].includes(url.hostname)||/^aplus-exames-[a-z0-9-]+\.vercel\.app$/.test(url.hostname));
const widths=phase==='stage'?[320,390]:[390];
const browser=await chromium.launch({headless:true,proxy:{server:process.env.HTTPS_PROXY||process.env.HTTP_PROXY}});
try{
 for(const subject of ['math-a','portuguese','physics-chemistry-a'])for(const width of widths){
  const context=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width,height:844}});
  let blockedWrites=0;
  await context.route('**/*',route=>{if(!['GET','HEAD','OPTIONS'].includes(route.request().method())){blockedWrites++;return route.abort()}return route.continue()});
  const page=await context.newPage();
  const share=process.env.RELEASE_SHARE_TOKEN;
  await page.goto(base+'/'+(share?'?_vercel_share='+share:''));
  await page.evaluate(state=>localStorage.setItem('a25',JSON.stringify(state)),configuredState(subject));
  await page.goto(base+'/');
  for(const tab of ['Aprender','Treinar','Ranking','Progresso']){
   const button=page.getByRole('button',{name:tab,exact:true}).last();await button.click();
   assert.equal(await button.getAttribute('aria-current'),'page');
   await page.evaluate(()=>window.scrollTo(0,0));
   assert.ok(await page.evaluate(w=>document.documentElement.scrollWidth<=w,width));
   await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].filter(img=>{const r=img.getBoundingClientRect();return r.width>0&&r.height>0&&r.top<innerHeight&&r.bottom>0}).map(img=>img.decode()))});
   await page.screenshot({animations:'disabled',path:`${evidenceDir}/${phase}-${subject}-${width}-${tab}.png`});
  }
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('a25')).xp),123456);
  assert.equal(blockedWrites,0,'A read-only release smoke must not attempt writes');
  console.log(JSON.stringify({phase,subject,width,menus:4,overflow:false,xpPreserved:true,writeAttempts:blockedWrites}));await context.close();
 }
}catch(error){console.error(String(error).replaceAll(process.env.RELEASE_SHARE_TOKEN||'<unused-token>','<redacted>'));process.exitCode=1}finally{await browser.close()}
