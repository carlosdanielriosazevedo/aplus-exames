import {expect} from "@playwright/test";
import counterContract from "./workspace-matrix-contract.cjs";
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
function measureInBrowser(selectors){
    const box=el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};
    const textBox=el=>{const range=document.createRange();range.selectNodeContents(el);return box(range)};
    const anchors=selectors.map(selector=>{const el=document.querySelector(selector);return el?box(el):null});
    const counters=Object.fromEntries([['streak','[aria-label^="Sequência:"]'],['xp','[aria-label$=" XP"]']].map(([name,selector])=>{
      const button=document.querySelector(`.studentTopActions>button${selector}`);
      if(!button)return [name,null];
      const value=button.querySelector('b'),icon=button.querySelector('.studentCounterIcon');
      // The text-node fallback also records the uncorrected HEAD as a genuine
      // before measurement. A Range measures the glyph, not just its fixed cell.
      const node=icon?.firstChild||[...button.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
      const range=document.createRange();range.setStart(node,0);range.setEnd(node,2);
      const row={button:box(button),icon:icon?box(icon):box(range),iconGlyph:box(range),value:box(value),valueText:textBox(value),text:value.textContent,problems:[]};
      for(const key of ['icon','iconGlyph','value','valueText']){
        const r=row[key],b=row.button;
        if(r.x<b.x-2||r.x+r.width>b.x+b.width+2||r.y<b.y-2||r.y+r.height>b.y+b.height+2)row.problems.push(`${key}: outside button`);
        if(r.x< -2||r.x+r.width>innerWidth+2)row.problems.push(`${key}: outside viewport`);
      }
      if(row.iconGlyph.x+row.iconGlyph.width>row.valueText.x+2)row.problems.push('icon overlaps number');
      if(value.scrollWidth>value.clientWidth+2||button.scrollWidth>button.clientWidth+2)row.problems.push('local overflow');
      return [name,row];
    }));
    const hero=document.querySelector(".learnIntro");
    if(!hero)return {anchors,counters,surfaceVisible:(document.querySelector('main')?.getBoundingClientRect().height||0)>0};
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
    const ribbon=document.querySelector('.friendsBetaRibbon');
    const contextBand=ribbon?box(ribbon).height+parseFloat(getComputedStyle(ribbon).marginBottom):0;
    return {anchors,counters,contextBand,hero:box(hero),heading:box(heading),
      title:box(heading.querySelector("h1")),label:box(heading.querySelector("p")),copy:box(hero.querySelector(":scope>span")),mascot,
      text:{title:textBox(heading.querySelector("h1")),label:textBox(heading.querySelector("p")),copy:textBox(hero.querySelector(":scope>span"))},
      motion:{animation:style.animationName,transform:style.transform},
      overflow:document.documentElement.scrollWidth>innerWidth};
}
async function measure(page){return page.evaluate(measureInBrowser,selectors)}
function sameBox(actual,expected,label){
  for(const key of ["x","y","width","height"])expect(Math.abs(actual[key]-expected[key]),`${label}: ${key}`).toBeLessThanOrEqual(2);
}
function sameAnchors(actual,expected,label){
  actual.anchors.forEach((anchor,i)=>{
    expect(Boolean(anchor),`${label}: presence ${selectors[i]}`).toBe(Boolean(expected.anchors[i]));
    if(anchor)sameBox(anchor,expected.anchors[i],`${label}: ${selectors[i]}`);
  });
  counterContract.compareCounters(actual.counters,expected.counters,label);
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
    for(const el of document.querySelectorAll('.studentTop .subjectSwitcher b,.studentTopActions>button,.friendsBetaRibbon b,.friendsBetaRibbon span,.learnIntro p,.learnIntro h1,.learnIntro>span,.sessionRecoveryNotice b,.sessionRecoveryNotice span,.sessionRecoveryNotice button')){
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

export {configuredState,subjects,names,selectors,measureInBrowser,measure,sameBox,sameAnchors,settle,readable,stressCopy};
