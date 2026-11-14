import {test,expect} from '@playwright/test';
import {configuredState,measure,sameAnchors,sameBox,settle,readable} from './workspace-layout.mjs';
import {transition,checkFrames,evidence,capture} from './workspace-evidence.mjs';

const missing='ITEM-NOT-IN-CATALOG-WORKSPACE-RECOVERY';
for(const width of [320,360,390,759,761,1440])for(const reducedMotion of ['reduce','no-preference'])for(const beta of [false,true]){
  test(`recovery geometry · ${width}px · ${reducedMotion} · ${beta?'private':'internal'}`,async({context},testInfo)=>{
    const rows=[];
    for(const subject of ['portuguese','physics-chemistry-a']){
      const state=configuredState(subject);state.xp=123456;
      const progress=state.subjectProgress[subject];
      const position={sessionId:`broken-${subject}`,kind:'mission',label:'Missão',itemIds:[subject==='portuguese'?'PT639-FND-001':'FQA-ELEM-01',missing],current:1,results:[{final:true,status:'final',correct:true,points:1,maxPoints:1,responseText:'Resposta sintética preservada'}],currentAnswer:'Resposta em curso',startedAt:Date.now()-60000};
      progress.lastPosition=position;
      if(beta){state.betaMode='friends_beta';state.betaParticipant={code:'AMG-TEST01'};state.betaTesterMeta={segment:'student',consentAt:Date.now()}}
      const page=await context.newPage();await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion});
      const key=beta?'a25-friends-beta':'a25';
      await page.addInitScript(({state,key})=>{localStorage.setItem(key,JSON.stringify(state));window.__recoveryDocument=crypto.randomUUID()},{state,key});
      await page.goto(beta?'/?beta=friends':'/');
      const alert=page.getByRole('alert',{name:'Sessão impossível de recuperar'});
      await expect(alert).toBeVisible();await settle(page);
      const identity=await page.evaluate(()=>window.__recoveryDocument);
      const reference=await measure(page);
      const persisted=()=>page.evaluate(({key,subject})=>{const s=JSON.parse(localStorage.getItem(key));return {xp:s.xp,progress:s.subjectProgress[subject]}},{key,subject});
      const before=await persisted();
      expect(before.progress.lastPosition).toEqual(position);
      for(const tab of ['Treinar','Aprender']){
        const frames=await transition(page,()=>page.getByRole('button',{name:tab,exact:true}).last().click());
        await expect(alert).toBeVisible();await settle(page);
        const layout=await measure(page);
        await evidence(testInfo,`${subject}-${tab}-frames`,{layout,frames});
        sameAnchors(layout,reference,`${subject}/${tab}: recovery`);
        for(const slot of ['hero','heading','title','label','copy','mascot'])sameBox(layout[slot],reference[slot],`${subject}/${tab}/${slot}`);
        checkFrames(frames,layout,`${subject}/${tab}: recovery first frames`);
        const notice=await alert.boundingBox();expect(notice.y).toBeGreaterThanOrEqual(layout.hero.y+layout.hero.height-2);
        await readable(page);
        const recover=alert.getByRole('button',{name:'Resolver sessão irrecuperável'});
        await recover.focus();await expect(recover).toBeFocused();
        page.once('dialog',dialog=>dialog.dismiss());await recover.press('Enter');
        expect((await persisted()).progress.lastPosition).toEqual(position);
        await expect(alert).toBeVisible();
        await capture(page,testInfo,`${subject}-${tab}-recovery`,{fullPage:true});
        rows.push({subject,tab,layout,frames,notice});
      }
      // Accept in both menus across the motion matrix; cancel in BOTH above.
      const acceptTab=reducedMotion==='reduce'?'Treinar':'Aprender';
      await page.getByRole('button',{name:acceptTab,exact:true}).last().click();
      page.once('dialog',dialog=>dialog.accept());
      const recoveryFrames=await transition(page,()=>alert.getByRole('button',{name:'Resolver sessão irrecuperável'}).click(),{targetScreen:'home'});
      await evidence(testInfo,`${subject}-confirmed-frames`,recoveryFrames);
      await expect(alert).toHaveCount(0);await settle(page);
      const after=await persisted();
      expect(after.xp).toBe(before.xp);expect(after.progress.lastPosition).toBeNull();
      expect(after.progress.competence).toEqual(before.progress.competence);
      expect(after.progress.sessions).toEqual(before.progress.sessions);
      expect(after.progress.interruptedTechnicalSessions).toEqual([expect.objectContaining({...position,status:'interrupted_technical',missingItemIds:[missing]})]);
      const healthy=await measure(page);sameAnchors(healthy,reference,'after recovery');
      checkFrames(recoveryFrames,healthy,'confirmed recovery: first frames');
      for(const slot of ['hero','heading','title','label','copy','mascot'])sameBox(healthy[slot],reference[slot],`after recovery/${slot}`);
      expect(await page.evaluate(()=>window.__recoveryDocument)).toBe(identity);
      rows.push({subject,phase:'recovered',acceptTab,layout:healthy,before,after,recoveryFrames});
      await page.close();
    }
    await evidence(testInfo,'recovery-raw',{width,reducedMotion,beta,rows});
  });
}
