import {test,expect} from "@playwright/test";
import {configuredState,subjects,names,selectors,measure,sameBox,sameAnchors,settle,readable,stressCopy} from "./workspace-layout.mjs";
import {transition,checkFrames,counterValueFrames,evidence,capture as captureScreenshot} from "./workspace-evidence.mjs";
for(const width of [320,360,390,759,761,1440])for(const reducedMotion of ["reduce","no-preference"])for(const beta of [false,true])for(const xp of [1,123456]){
  test(`workspace slots · ${width}px · ${reducedMotion} · ${beta?"private":"internal"} · XP ${xp}`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion});
    const state=configuredState("math-a");state.xp=xp;
    state.selectedSubjectIds=subjects;state.diagnosticDone=true;
    state.subjectSettings=Object.assign({},...subjects.map(id=>configuredState(id).subjectSettings));
    state.subjectProgress=Object.assign({},...subjects.map(id=>configuredState(id).subjectProgress));
    state.engagement={version:1,streak:xp===1?1:365,longestStreak:365,lastActiveDay:new Date().toLocaleDateString("en-CA")};
    if(beta){state.betaMode="friends_beta";state.betaParticipant={code:"AMG-TEST01"};state.betaTesterMeta={segment:"student",consentAt:Date.now()}}
    // Cover both the query entry and a saved private-beta state without query.
    const queryBeta=beta&&reducedMotion==="reduce",key=queryBeta?"a25-friends-beta":"a25";
    await page.addInitScript(({state,key})=>{localStorage.setItem(key,JSON.stringify(state));window.__workspaceDocument=crypto.randomUUID()},{state,key});
    const errors=[];page.on("pageerror",error=>errors.push(error.message));
    await page.goto(queryBeta?"/?beta=friends":"/");
    await expect(page.locator(".studentTop")).toBeVisible();
    const documentId=await page.evaluate(()=>window.__workspaceDocument);
    let reference;
    const measurements=[];
    for(const subject of subjects){
      await expect(page.locator(".studentTop .subjectSwitcher")).toHaveAttribute("aria-label",`Mudar de disciplina. Disciplina atual: ${names[subject]}`);
      for(const tab of ["Aprender","Treinar"]){
        const frames=await transition(page,()=>page.getByRole("button",{name:tab,exact:true}).last().click(),{targetScreen:tab==='Aprender'?'home':'train'});
        await evidence(testInfo,`frames-${subject}-${tab}`,frames);
        await expect(page.getByRole("button",{name:tab,exact:true}).last()).toHaveAttribute("aria-current","page");
        await expect(page.locator(".friendsBetaRibbon")).toHaveCount(beta?1:0);
        await expect(page.locator('.studentTop button[aria-label$=" XP"]')).toHaveCount(beta?0:1);
        await expect(page.locator('.studentTop button[aria-label^="Sequência:"]')).toHaveAttribute("aria-label",`Sequência: ${xp===1?1:365} dias`);
        if(!beta)await expect(page.getByRole("button",{name:`${xp} XP`,exact:true})).toBeVisible();
        await settle(page);
        const layout=await measure(page);reference??=layout;
        const counterFrames=await counterValueFrames(page,layout);
        await evidence(testInfo,`counter-frames-${subject}-${tab}`,counterFrames);
        checkFrames(frames,layout,`${subject}/${tab}: first frames`);
        expect(layout.overflow).toBe(false);
        for(const box of [...layout.anchors.filter(Boolean),layout.mascot]){
          expect(box.x).toBeGreaterThanOrEqual(0);
          expect(box.x+box.width).toBeLessThanOrEqual(width+1);
        }
        sameAnchors(layout,reference,`${subject}/${tab}/${xp}`);
        for(const slot of ["hero","heading","title","label","copy","mascot"])sameBox(layout[slot],reference[slot],`${subject}/${tab}: ${slot}`);
        expect(layout.motion).toEqual({animation:"none",transform:"none"});
        // Sample live frames with normal motion enabled; screenshots must not
        // freeze the image and accidentally hide an animation mismatch.
        for(let frame=0;frame<3;frame++){
          await page.evaluate(()=>new Promise(requestAnimationFrame));
          sameBox((await measure(page)).mascot,layout.mascot,`${subject}/${tab}: live mascot`);
        }
        await readable(page);
        // Every value stays inside its button, including six-digit XP.
        const fits=await page.locator('.studentTopActions>button').evaluateAll(buttons=>buttons.every(button=>button.scrollWidth<=button.clientWidth));
        expect(fits).toBe(true);
        const capture=xp===123456&&reducedMotion==="reduce";
        const long=await stressCopy(page,layout,capture?()=>captureScreenshot(page,testInfo,`${subject}-${tab}-long`,{fullPage:true}):null);
        measurements.push({subject,tab,xp,...layout,long,frames,counterFrames});
        await captureScreenshot(page,testInfo,`${subject}-${tab}`);
      }
      const next=subjects[(subjects.indexOf(subject)+1)%subjects.length];
      await page.locator(".studentTop .subjectSwitcher").click();
      const switchFrames=await transition(page,()=>page.locator(".subjectWorkspaceCard").filter({has:page.getByText(names[next],{exact:true})}).click(),{targetScreen:'home'});
      await evidence(testInfo,`switch-${subject}`,switchFrames);
      await expect(page.locator(".learnIntro")).toBeVisible();
      await settle(page);
      const switched=await measure(page);
      checkFrames(switchFrames,switched,`subject switch ${subject}→${next}: first frames`,{allowSourceWithoutHero:true});
      sameAnchors(switched,reference,"real subject switch");
      for(const slot of ["hero","heading","title","label","copy","mascot"])sameBox(switched[slot],reference[slot],`real subject switch: ${slot}`);
      expect(switched.overflow).toBe(false);
      expect(await page.evaluate(()=>window.__workspaceDocument),"Navigation must preserve the live document").toBe(documentId);
    }
    expect(errors).toEqual([]);
    await testInfo.attach("anchor-measurements",{body:JSON.stringify(measurements,null,2),contentType:"application/json"});
    await evidence(testInfo,'workspace-raw',{width,reducedMotion,beta,xp,streak:xp===1?1:365,measurements});
  });
}

// Diagnostic intros intentionally have their own shell. Guard all three against
// mobile overflow without asserting that their different guidance has equal height.
for(const width of [320,390,1440])for(const subject of [
  {name:"Matemática A",choice:/^Matemática A\b/u},
  {name:"Português",choice:/^Português 12\.º ano · Prova 639\b/u},
  {name:"Física e Química A",choice:/^Física e Química A\b/u}
]){
  test(`diagnostic anchors · ${subject.name} · ${width}px`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto("/");
    await page.getByRole("button",{name:/Descobrir o meu nível/u}).click();
    await page.getByRole("button",{name:subject.choice}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    await page.getByRole("button",{name:"Já terminei o secundário",exact:true}).click();
    await page.getByRole("textbox",{name:/Nota recente de/u}).fill("14");
    await page.getByRole("button",{name:new RegExp(`Continuar para a matéria de ${subject.name}`,"u")}).click();
    await page.getByRole("button",{name:"Continuar",exact:true}).click();
    const skip=page.getByRole("button",{name:"Saltar explicação",exact:true});
    if(await skip.isVisible())await skip.click();
    await page.locator(".adaptivePath").getByRole("button",{name:/Começar diagnóstico/iu}).click();
    await expect(page.getByRole("heading",{name:`Diagnóstico de ${subject.name}`})).toBeVisible();
    await expect(page.locator(".diagApronsoHero>.apronso")).toHaveCount(1);
    for(const selector of [".diagApronsoHero h1",".diagPurposeHero",".diagApronsoHero>.apronso"]){
      const box=await page.locator(selector).boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x+box.width).toBeLessThanOrEqual(width+1);
    }
    expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
    await testInfo.attach("diagnostic",{body:await page.screenshot({animations:"disabled"}),contentType:"image/png"});
  });
}
