import {writeFileSync} from "node:fs";
import {expect} from "@playwright/test";
import {measureInBrowser,selectors,sameAnchors,sameBox} from "./workspace-layout.mjs";

// Install BEFORE the real click. These samples run in the event microtask and
// the first three animation frames, independently of fonts/decode/settle().
export async function transition(page,click,{targetScreen=null}={}){
  await page.evaluate(({source,selectors,targetScreen})=>{
    const measure=new Function("selectors",`return (${source})(selectors)`);
    window.__workspaceFrames=[];
    window.__workspaceFramesDone=new Promise(resolve=>{
      document.addEventListener("click",()=>{
        const sample=phase=>{
          try{window.__workspaceFrames.push({phase,targetScreen,at:performance.now(),screen:history.state?.approvaScreen,subject:history.state?.approvaSubjectId,layout:measure(selectors)})}
          catch(error){window.__workspaceFrames.push({phase,error:String(error)})}
        };
        sample("click");queueMicrotask(()=>sample("microtask"));
        let count=0,targetFrames=0;
        const frame=()=>{
          sample(`raf-${++count}`);
          if(!targetScreen||history.state?.approvaScreen===targetScreen)targetFrames++;
          if(targetFrames<3&&count<600)requestAnimationFrame(frame);else resolve();
        };
        requestAnimationFrame(frame);
      },{capture:true,once:true});
    });
  },{source:measureInBrowser.toString(),selectors,targetScreen});
  await click();
  return page.evaluate(async()=>{await window.__workspaceFramesDone;return window.__workspaceFrames});
}

export function checkFrames(frames,reference,label,{allowSourceWithoutHero=false}={}){
  expect(frames.filter(row=>row.phase.startsWith("raf-")).length).toBeGreaterThanOrEqual(3);
  const target=frames[0]?.targetScreen;
  if(target)expect(frames.filter(row=>row.phase.startsWith('raf-')&&row.screen===target).length,`${label}: first three target frames required`).toBeGreaterThanOrEqual(3);
  for(const row of frames){
    expect(row.error,`${label}/${row.phase}: probe`).toBeUndefined();
    const layout=row.layout;
    if(allowSourceWithoutHero&&!['home','train'].includes(row.screen)){
      expect(layout.surfaceVisible,`${label}/${row.phase}: source screen disappeared while loading`).toBe(true);
      continue;
    }
    expect(layout.hero,`${label}/${row.phase}: missing persistent hero (${row.screen}/${row.subject})`).toBeTruthy();
    sameAnchors(layout,reference,`${label}/${row.phase}`);
    for(const key of ['hero','heading','title','label','copy','mascot'])sameBox(layout[key],reference[key],`${label}/${row.phase}/${key}`);
    expect(layout.overflow).toBe(false);
  }
}

export async function evidence(testInfo,name,value){
  const path=testInfo.outputPath(`${name}.json`);
  writeFileSync(path,JSON.stringify(value,null,2));
  await testInfo.attach(name,{path,contentType:"application/json"});
}

export async function capture(page,testInfo,name,options={}){
  const path=testInfo.outputPath(`${name}.png`);
  await page.screenshot({...options,path});
  await testInfo.attach(name,{path,contentType:'image/png'});
}
