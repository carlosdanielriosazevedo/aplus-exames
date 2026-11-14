import {test,expect} from '@playwright/test';
import {configuredState,measure,sameAnchors,settle,readable} from './workspace-layout.mjs';
import {evidence,capture} from './workspace-evidence.mjs';

for(const width of [320,360,390,759,761,1440])for(const beta of [false,true]){
  test(`shared shell surfaces · ${width}px · ${beta?'private saved':'internal'}`,async({context},testInfo)=>{
    const rows=[];
    for(const subject of ['math-a','portuguese','physics-chemistry-a']){
      const page=await context.newPage();await page.setViewportSize({width,height:900});
      await page.emulateMedia({reducedMotion:beta?'no-preference':'reduce'});
      const state=configuredState(subject);state.diagnosticDone=true;
      if(beta){state.betaMode='friends_beta';state.betaParticipant={code:'AMG-TEST01'};state.betaTesterMeta={segment:'student',consentAt:Date.now()}}
      await page.addInitScript(state=>{localStorage.setItem('a25',JSON.stringify(state));window.__shellDocument=crypto.randomUUID()},state);
      await page.goto('/');await expect(page.locator('.studentTop')).toBeVisible();await settle(page);
      const identity=await page.evaluate(()=>window.__shellDocument),reference=await measure(page);
      async function check(name,hasTop=true){
        await expect(page.locator('.panel')).toBeVisible();
        await expect(page.locator('.friendsBetaRibbon')).toHaveCount(beta?1:0);
        if(hasTop){await expect(page.locator('.studentTop')).toBeVisible();await settle(page);sameAnchors(await measure(page),reference,`${subject}/${name}`)}
        else await expect(page.locator('.studentTop')).toHaveCount(0);
        await readable(page);
        expect(await page.evaluate(()=>window.__shellDocument)).toBe(identity);
        rows.push({subject,name,hasTop,layout:await measure(page)});
        await evidence(testInfo,`${subject}-${name}-raw`,rows.at(-1));
        await capture(page,testInfo,`${subject}-${name}`,{fullPage:true});
      }
      await page.getByRole('button',{name:'Progresso',exact:true}).last().click();await check('progress');
      if(!beta){await page.getByRole('button',{name:'Ranking',exact:true}).last().click();await check('ranking')}
      for(const [label,screen,top] of [['Praticar','practice-setup',false],['Exames','exams',true],['Rever matéria','review',true]]){
        await page.getByRole('button',{name:'Treinar',exact:true}).last().click();
        await page.locator('.trainChoices').getByRole('button',{name:new RegExp(label)}).click();
        await check(screen,top);
        if(top)await page.getByRole('button',{name:'Treinar',exact:true}).last().click();
        else await page.getByRole('button',{name:'← Voltar',exact:true}).first().click();
        await expect(page.locator('.studentTop')).toBeVisible();
      }
      await page.locator('.subjectSwitcher').click();await check('subject-manager',false);
      await page.getByRole('button',{name:'← Voltar',exact:true}).click();await expect(page.locator('.studentTop')).toBeVisible();
      expect(await page.evaluate(()=>window.__shellDocument)).toBe(identity);
      await page.close();
    }
    await evidence(testInfo,'shell-surfaces-raw',{width,beta,rows});
  });
}
