import {test,expect} from "@playwright/test";
import {mkdirSync,readFileSync} from "node:fs";
import {emptyScores,questionById} from "../../app/lib/engine.js";
const PORTUGUESE_ITEMS=JSON.parse(readFileSync(new URL("../../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8")).items;
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {beginSubjectSession} from "../../app/lib/subjectProgress.js";
mkdirSync('/tmp/audit-journey',{recursive:true});
const fixtures=[
 {id:'math-a',item:questionById('CRV2-10FUN-STEPS-1')},
 {id:'portuguese',item:PORTUGUESE_ITEMS.find(i=>i.responseType==='restricted-response'&&i.referenceAnswer)},
 {id:'physics-chemistry-a',item:PHYSICS_CHEMISTRY_A_ITEMS.find(i=>i.id==='FQA-R-ELEM-01')}
];
for(const {id,item} of fixtures)for(const width of [320,360,390,430,1366,1920]){
 test(`${id} · readable correction and single exit ${width}px`,async({page})=>{
  expect(item,'real, stable content fixture').toBeTruthy();
  const now=Date.now(),sessionId=`visual-feedback-${id}`;
  let state={goal:17,xp:0,diagnosticDone:true,diagnosticAnswers:0,scores:emptyScores(),selectedSubjectIds:[id],activeSubjectId:id,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[id]:{profileConfigured:true,goal:17}},subjectProgress:{},profile:{schoolYear:'Já terminei o secundário',syllabus:'most',taughtSubtopicIds:[]},betaMode:'internal',subjectProgressModelVersion:4,pedagogicalIdVersion:1,_stateVersion:31,_savedAt:now};
  if(id!=='math-a')state=beginSubjectSession(state,{subjectId:id,kind:'training',label:'Treino sintético de revisão visual',items:[item],sessionId,startedAt:now});
  const draft=id==='math-a'?{kind:'mission',sessionId,current:{...item,practiceOnly:true},plan:{type:'target',themeId:item.themeId,focus:item.focus},savedAt:now}:null;
  await page.setViewportSize({width,height:width>760?(width===1366?768:1080):844});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.addInitScript(({state,draft})=>{localStorage.setItem('a25',JSON.stringify(state));if(draft)localStorage.setItem('a25-active-session-v1',JSON.stringify(draft))},{state,draft});
  await page.goto('/');
  if(id!=='math-a')await page.getByRole('button',{name:'Continuar sessão',exact:true}).click();
  await expect(page.getByRole('button',{name:'Responder',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:/^(← Voltar|Guardar e sair|Guardar e continuar depois|Sair da sessão)$/})).toHaveCount(1);
  if(id==='math-a'){
   const fields=await page.locator('.practiceFields textarea').evaluateAll(els=>els.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,width:r.width,font:parseFloat(getComputedStyle(e).fontSize)}}));
   expect(fields).toHaveLength(3);
   for(const field of fields){expect(Math.abs(field.x-fields[0].x)).toBeLessThanOrEqual(1);expect(Math.abs(field.width-fields[0].width)).toBeLessThanOrEqual(1);expect(field.font).toBeGreaterThanOrEqual(16)}
   await page.locator('[id="practice-CRV2-10FUN-STEPS-1-equation"]').fill('3x-12=0');
   await page.locator('[id="practice-CRV2-10FUN-STEPS-1-value"]').fill('x=4');
   await page.locator('[id="practice-CRV2-10FUN-STEPS-1-conclusion"]').fill('Não sei concluir.');
  }else await page.locator('textarea').fill('Apresento uma ideia inicial, mas ainda não consigo justificar todos os elementos pedidos na questão.');
  await page.getByRole('button',{name:'Responder',exact:true}).click();
  const feedback=page.locator(id==='math-a'?'.practiceResponse>.notice':id==='portuguese'?'.portugueseFeedback':'.automaticFeedbackPanel');
  await expect(feedback).toBeVisible();
  await expect(page.locator('.scoreLossExplanation')).toBeVisible();
  if(id!=='math-a'){
   const panel=page.locator('.automaticFeedbackPanel');
   const sizes=await panel.locator('strong,span,blockquote,.automaticFeedbackNext').evaluateAll(els=>els.map(e=>parseFloat(getComputedStyle(e).fontSize)));
   expect(sizes.length).toBeGreaterThan(0);
   expect(Math.min(...sizes),'correction reading size').toBeGreaterThanOrEqual(14);
   const details=page.locator('.scoreExplainDetails');await expect(details).not.toHaveAttribute('open');
   await details.locator('summary').click();
   await expect(page.locator('.scoreBreakdown')).toBeVisible();
   await details.locator('summary').click();
  }
  if(id==='portuguese'){
   const details=page.locator('.automaticCriteriaDetails').filter({hasText:'Ver análise detalhada dos critérios'});
   await expect(details).not.toHaveAttribute('open');
   await expect(page.locator('.rubricEvidenceSummary')).toBeHidden();
   await details.locator('summary').click();await expect(page.locator('.rubricEvidenceSummary')).toBeVisible();
   await details.locator('summary').click();
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  await page.screenshot({path:`/tmp/audit-journey/${id}-${width}-feedback.png`,fullPage:true,animations:'disabled'});
  await expect(page.getByRole('button',{name:/^(← Voltar|Guardar e sair|Guardar e continuar depois|Sair da sessão)$/})).toHaveCount(1);
  // The submitted answer remains locked; presentation must not reopen an attempt.
  if(id==='math-a'){
   await expect(page.locator('.practiceFields')).toHaveAttribute('disabled','');
   for(const field of await page.locator('.practiceFields textarea').all())await expect(field).toBeDisabled();
  }
  else await expect(page.locator('textarea')).toBeDisabled();
 });
}
