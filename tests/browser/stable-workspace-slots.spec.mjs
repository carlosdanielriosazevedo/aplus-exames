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

const subjects=["math-a","portuguese","physics-chemistry-a"];
const names={"math-a":"Matemática A",portuguese:"Português","physics-chemistry-a":"Física e Química A"};
const selectors=[".studentTop",".studentTop .logo",".studentTop .subjectSwitcher",".studentTop .subjectSwitcher>span",'.studentTop button[aria-label^="Sequência:"]','.studentTop button[aria-label$=" XP"]',".studentTop .studentMenu>summary",".friendsBetaRibbon"];
async function measure(page){
  return page.evaluate(selectors=>{
    const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
    const textBox=el=>{const range=document.createRange();range.selectNodeContents(el);return box(range)};
    const anchors=selectors.map(selector=>{const el=document.querySelector(selector);return el?box(el):null});
    const hero=document.querySelector(".learnIntro");
    if(!hero)return {anchors};
    const heading=hero.querySelector(".mobileMainTitle"),image=heading.querySelector("img");
    const style=getComputedStyle(image||heading,image?null:"::after");
    let mascot;
    if(image)mascot=box(image);
    else{
      // A pseudo-element has no DOMRect API. Lay out a probe with its actual
      // computed styles in the SAME grid cell, then remove it. Never infer its
      // y from the heading: that hid the old end-alignment bug on long titles.
      const probe=document.createElement("i");
      for(const property of style)probe.style.setProperty(property,style.getPropertyValue(property));
      probe.style.visibility="hidden";
      heading.append(probe);mascot=box(probe);probe.remove();
    }
    return {anchors,hero:box(hero),heading:box(heading),
      title:box(heading.querySelector("h1")),label:box(heading.querySelector("p")),copy:box(hero.querySelector(":scope>span")),mascot,
      text:{title:textBox(heading.querySelector("h1")),label:textBox(heading.querySelector("p")),copy:textBox(hero.querySelector(":scope>span"))},
      motion:{animation:style.animationName,transform:style.transform},
      overflow:document.documentElement.scrollWidth>innerWidth};
  },selectors);
}
function sameBox(actual,expected,label){
  for(const key of ["x","y","width","height"])expect(Math.abs(actual[key]-expected[key]),`${label}: ${key}`).toBeLessThanOrEqual(2);
}
function sameAnchors(actual,expected,label){
  actual.anchors.forEach((anchor,i)=>{
    expect(Boolean(anchor),`${label}: presence ${selectors[i]}`).toBe(Boolean(expected.anchors[i]));
    if(anchor)sameBox(anchor,expected.anchors[i],`${label}: ${selectors[i]}`);
  });
}
async function settle(page){
  await page.evaluate(async()=>{
    await document.fonts.ready;
    await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));
    const mascot=new Image();mascot.src="/mascot/apronso-welcome.webp";await mascot.decode();
    window.scrollTo(0,0);
    await new Promise(requestAnimationFrame);
  });
}
async function readable(page){
  const problems=await page.evaluate(()=>{
    const problems=[];
    // Check line boxes and clipping ancestors, not only document.scrollWidth:
    // overflow-x:clip can hide a regression while that document check passes.
    for(const el of document.querySelectorAll('.studentTop .subjectSwitcher b,.studentTopActions>button,.friendsBetaRibbon b,.friendsBetaRibbon span,.learnIntro p,.learnIntro h1,.learnIntro>span')){
      const range=document.createRange();range.selectNodeContents(el);
      for(const line of range.getClientRects()){
        if(line.left < -2||line.right > innerWidth+2)problems.push(`${el.className||el.tagName}: outside viewport`);
        for(let parent=el;parent;parent=parent.parentElement){
          const r=parent.getBoundingClientRect(),s=getComputedStyle(parent);
          if(s.display==="contents")continue;
          if(line.left<r.left-2||line.right>r.right+2)problems.push(`${el.tagName}: outside ${parent.className||parent.tagName}`);
          if(/hidden|clip|auto|scroll/.test(s.overflowY)&&(line.top<r.top-2||line.bottom>r.bottom+2))problems.push(`${el.tagName}: vertically clipped`);
        }
      }
      if(el.scrollWidth>el.clientWidth+2)problems.push(`${el.tagName}: local horizontal overflow`);
    }
    return problems;
  });
  expect(problems,"All essential text is readable, including inside clipped ancestors").toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
}
async function stressCopy(page,layout,capture){
  const original=await page.evaluate(()=>{
    const selectors=['.mobileMainTitle>p','.mobileMainTitle>h1','.learnIntro>span','.studentTop .subjectSwitcher b','.studentTopActions>button:first-child b'];
    const text=["Uma saudação e um contexto suficientemente longos para ocupar várias linhas sem esconder informação",
      "Um título muito mais longo para confirmar que todo o conteúdo pode crescer sem deslocar as âncoras persistentes",
      "Uma explicação longa, com informação essencial que deve continuar completamente legível em todos os tamanhos de ecrã, incluindo palavras como interdisciplinaridade e uma sequência sem espaços ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.",
      "Física e Química A","1"];
    return selectors.map((selector,i)=>{const el=document.querySelector(selector),value=el.textContent;el.textContent=text[i];return {selector,value}});
  });
  const long=await measure(page);
  sameAnchors(long,layout,"long copy");sameBox(long.mascot,layout.mascot,"long copy: mascot");
  expect(long.title.y).toBeGreaterThanOrEqual(long.label.y+long.label.height-2);
  expect(long.copy.y).toBeGreaterThanOrEqual(long.title.y+long.title.height-2);
  expect(long.text.title.y).toBeGreaterThanOrEqual(long.text.label.y+long.text.label.height-2);
  expect(long.text.copy.y).toBeGreaterThanOrEqual(long.text.title.y+long.text.title.height-2);
  expect(long.copy.y).toBeGreaterThanOrEqual(long.mascot.y+long.mascot.height-2);
  await readable(page);
  await capture?.();
  await page.evaluate(rows=>rows.forEach(({selector,value})=>{document.querySelector(selector).textContent=value}),original);
  const restored=await measure(page);
  for(const slot of ["hero","heading","title","label","copy","mascot"])sameBox(restored[slot],layout[slot],`restored: ${slot}`);
  return long;
}

for(const width of [320,360,390,759,761,1440])for(const reducedMotion of ["reduce","no-preference"])for(const beta of [false,true])for(const xp of beta?[123456]:[1,123456]){
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
        await page.getByRole("button",{name:tab,exact:true}).last().click();
        await expect(page.getByRole("button",{name:tab,exact:true}).last()).toHaveAttribute("aria-current","page");
        await expect(page.locator(".friendsBetaRibbon")).toHaveCount(beta?1:0);
        await expect(page.locator('.studentTop button[aria-label$=" XP"]')).toHaveCount(beta?0:1);
        await expect(page.locator('.studentTop button[aria-label^="Sequência:"]')).toHaveAttribute("aria-label",`Sequência: ${xp===1?1:365} dias`);
        if(!beta)await expect(page.getByRole("button",{name:`${xp} XP`,exact:true})).toBeVisible();
        await settle(page);
        const layout=await measure(page);reference??=layout;
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
        const long=await stressCopy(page,layout,capture?async()=>testInfo.attach(`${subject}-${tab}-long`,{body:await page.screenshot({fullPage:true}),contentType:"image/png"}):null);
        measurements.push({subject,tab,xp,...layout,long});
        if(capture)await testInfo.attach(`${subject}-${tab}`,{body:await page.screenshot(),contentType:"image/png"});
      }
      const next=subjects[(subjects.indexOf(subject)+1)%subjects.length];
      await page.locator(".studentTop .subjectSwitcher").click();
      await page.locator(".subjectWorkspaceCard").filter({has:page.getByText(names[next],{exact:true})}).click();
      await expect(page.locator(".learnIntro")).toBeVisible();
      await settle(page);
      const switched=await measure(page);
      sameAnchors(switched,reference,"real subject switch");
      for(const slot of ["hero","heading","title","label","copy","mascot"])sameBox(switched[slot],reference[slot],`real subject switch: ${slot}`);
      expect(switched.overflow).toBe(false);
      expect(await page.evaluate(()=>window.__workspaceDocument),"Navigation must preserve the live document").toBe(documentId);
    }
    expect(errors).toEqual([]);
    await testInfo.attach("anchor-measurements",{body:JSON.stringify(measurements,null,2),contentType:"application/json"});
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
