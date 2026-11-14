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
const selectors=[".studentTop .logo",".studentTop .subjectSwitcher",".studentTop .subjectSwitcher>span",'.studentTop button[aria-label^="Sequência:"]','.studentTop button[aria-label$=" XP"]',".studentTop .studentMenu>summary"];
async function measure(page){
  return page.evaluate(selectors=>{
    const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
    const hero=document.querySelector(".learnIntro"),heading=hero.querySelector(".mobileMainTitle");
    const image=heading.querySelector("img"),pseudo=getComputedStyle(heading,"::after"),r=heading.getBoundingClientRect();
    const mascot=image?box(image):{x:r.right-parseFloat(pseudo.width),y:r.y,width:parseFloat(pseudo.width),height:parseFloat(pseudo.height)};
    return {anchors:selectors.map(selector=>box(document.querySelector(selector))),
      title:box(heading.querySelector("h1")),label:box(heading.querySelector("p")),copy:box(hero.querySelector(":scope>span")),mascot,
      overflow:document.documentElement.scrollWidth>innerWidth};
  },selectors);
}
function sameBox(actual,expected,label){
  for(const key of ["x","y","width","height"])expect(Math.abs(actual[key]-expected[key]),`${label}: ${key}`).toBeLessThanOrEqual(2);
}
for(const width of [320,360,390,1440])for(const reducedMotion of ["reduce","no-preference"]){
  test(`workspace slots · ${width}px · ${reducedMotion}`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion});
    await page.goto("/");
    let reference;
    const measurements=[];
    for(const subject of subjects)for(const xp of [1,123456]){
      const state=configuredState(subject);state.xp=xp;
      state.selectedSubjectIds=subjects;state.diagnosticDone=true;
      state.subjectSettings=Object.assign({},...subjects.map(id=>configuredState(id).subjectSettings));
      state.subjectProgress=Object.assign({},...subjects.map(id=>configuredState(id).subjectProgress));
      state.engagement={version:1,streak:xp===1?1:365,longestStreak:365,lastActiveDay:new Date().toLocaleDateString("en-CA")};
      await page.evaluate(state=>localStorage.setItem("a25",JSON.stringify(state)),state);
      await page.reload();
      for(const tab of ["Aprender","Treinar"]){
        await page.getByRole("button",{name:tab,exact:true}).last().click();
        await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));window.scrollTo(0,0)});
        const layout=await measure(page);reference??=layout;
        expect(layout.overflow).toBe(false);
        layout.anchors.forEach((anchor,i)=>sameBox(anchor,reference.anchors[i],`${subject}/${tab}/${xp}: anchor ${i}`));
        for(const slot of ["title","label","copy","mascot"])sameBox(layout[slot],reference[slot],`${subject}/${tab}: ${slot}`);
        // Every value stays inside its button, including six-digit XP.
        const fits=await page.locator('.studentTopActions>button').evaluateAll(buttons=>buttons.every(button=>button.scrollWidth<=button.clientWidth));
        expect(fits).toBe(true);
        measurements.push({subject,tab,xp,...layout});
        if(xp===123456)await testInfo.attach(`${subject}-${tab}`,{body:await page.screenshot({animations:"disabled"}),contentType:"image/png"});
        await page.locator('.learnIntro h1').evaluate(el=>el.textContent="Um título muito mais longo para confirmar que o conteúdo pode crescer sem deslocar as âncoras persistentes");
        const long=await measure(page);
        long.anchors.forEach((anchor,i)=>sameBox(anchor,layout.anchors[i],`long title: anchor ${i}`));
        sameBox(long.mascot,layout.mascot,"long title: mascot");
        expect(long.overflow).toBe(false);
        // Restore the real title before navigating, including Aprender → Aprender.
        await page.reload();
      }
      if(xp===123456){
        const next=subjects[(subjects.indexOf(subject)+1)%subjects.length];
        const names={"math-a":"Matemática A",portuguese:"Português","physics-chemistry-a":"Física e Química A"};
        await page.locator(".studentTop .subjectSwitcher").click();
        await page.locator(".subjectWorkspaceCard").filter({has:page.getByText(names[next],{exact:true})}).click();
        await expect(page.locator(".learnIntro")).toBeVisible();
        const switched=await measure(page);
        switched.anchors.forEach((anchor,i)=>sameBox(anchor,reference.anchors[i],`subject switch: anchor ${i}`));
        expect(switched.overflow).toBe(false);
      }
    }
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
