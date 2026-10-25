import {test,expect} from '@playwright/test';
import {emptyScores} from '../../app/lib/engine.js';
for(const kind of ['training','mission','mini_exam','diagnostic']){
 test(`Matemática · guardar matéria preserva tentativa ${kind} antiga`,async({page})=>{
  const now=Date.now();
  const state={goal:17,xp:120,diagnosticDone:true,scores:emptyScores(),selectedSubjectIds:['math-a'],activeSubjectId:'math-a',firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{'math-a':{profileConfigured:true}},subjectProgress:{},profile:{schoolYear:'Já terminei o secundário',syllabus:'most',taughtSubtopicIds:[]},betaMode:'internal',betaSessions:[{id:'existing-session',kind,startedAt:now-90*86400000,finishedAt:null}],_stateVersion:31,_savedAt:now};
  await page.goto('/');
  await page.evaluate(state=>localStorage.setItem('a25',JSON.stringify(state)),state);
  await page.reload();
  await page.getByLabel('Abrir menu',{exact:true}).click();
  await page.getByRole('button',{name:'Matéria dada na escola',exact:true}).click();
  await expect(page.getByRole('button',{name:'Guardar',exact:true})).toBeVisible();
  // Concurrent persisted draft after opening settings: exercises the real save callback.
  const draft={kind,version:4,sessionId:'existing-session',i:2,responses:[{answer:'synthetic retained answer'}],savedAt:now-90*86400000,startedAt:now-90*86400000,phase:'in_progress'};
  await page.evaluate(draft=>localStorage.setItem('a25-active-session-v1',JSON.stringify(draft)),draft);
  const raw=await page.evaluate(()=>localStorage.getItem('a25-active-session-v1'));
  await page.getByRole('button',{name:'Guardar',exact:true}).click();
  await expect(page.getByRole('button',{name:'Progresso',exact:true})).toHaveAttribute('aria-current','page');
  expect(await page.evaluate(()=>localStorage.getItem('a25-active-session-v1'))).toBe(raw);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('a25')));
  expect(saved.xp).toBe(120);
 });
}
