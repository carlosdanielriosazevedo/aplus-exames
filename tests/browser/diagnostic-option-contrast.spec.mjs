import {test,expect} from "@playwright/test";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../../app/data/vnextDiagnostic.js";
import {createDiagnosticDraft} from "../../app/lib/diagnosticRecovery.js";

const ITEM=VNEXT_DIAGNOSTIC_QUESTIONS.find(item=>item.id==="DG-VN11CD-DP-011");
if(!ITEM)throw new Error("Pergunta estável de contraste não encontrada.");

function luminance([r,g,b]){
  const values=[r,g,b].map(value=>{const c=value/255;return c<=.03928?c/12.92:((c+.055)/1.055)**2.4});
  return .2126*values[0]+.7152*values[1]+.0722*values[2];
}
function ratio(fg,bg){const a=luminance(fg),b=luminance(bg);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)}

async function renderedContrast(locator){
  return locator.evaluate(node=>{
    const parse=value=>{const match=value.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/u);return match?[+match[1],+match[2],+match[3]]:null};
    const lum=rgb=>{const values=rgb.map(value=>{const c=value/255;return c<=.03928?c/12.92:((c+.055)/1.055)**2.4});return .2126*values[0]+.7152*values[1]+.0722*values[2]};
    const style=getComputedStyle(node);
    const fg=parse(style.color),bg=parse(style.backgroundColor);
    if(!fg||!bg)throw new Error(`Cor não mensurável: ${style.color} / ${style.backgroundColor}`);
    const value=(Math.max(lum(fg),lum(bg))+.05)/(Math.min(lum(fg),lum(bg))+.05);
    return {ratio:value,color:style.color,background:style.backgroundColor,opacity:style.opacity,className:node.className};
  });
}

async function seedMathDiagnostic(page){
  const now=Date.now();
  const session={id:"contrast-proof",kind:"diagnostic",startedAt:now-1000,finishedAt:null,meta:{}};
  const draft=createDiagnosticDraft({session,item:ITEM,difficulty:ITEM.difficulty,blueprint:[ITEM.subtopicId||ITEM.themeId],now:now-1000});
  const state={goal:17,diagnosticDone:false,diagnosticAnswers:0,selectedSubjectIds:["math-a"],activeSubjectId:"math-a",subjectProgress:{},subjectProgressModelVersion:1,pedagogicalIdVersion:1,betaMode:"internal",firstUseTourCompleted:true,profile:{schoolYear:"Já terminei o secundário",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:now};
  await page.addInitScript(({state,draft,now})=>{localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("a25-active-session-v1",JSON.stringify({...draft,savedAt:now}))},{state,draft,now});
}

function expectAA(measurement,label){
  expect(measurement.ratio,`${label}: ${measurement.ratio.toFixed(2)}:1 · ${measurement.color} sobre ${measurement.background} · opacity ${measurement.opacity}`).toBeGreaterThanOrEqual(4.5);
}

test("Diagnóstico · alternativas mantêm contraste AA em todos os estados",async({page})=>{
  await seedMathDiagnostic(page);
  await page.goto("/");
  const options=page.locator(".opts button");
  await expect(options.first()).toBeVisible({timeout:30_000});

  const wrong=(ITEM.a+1)%ITEM.o.length;
  await options.nth(wrong).click();
  expectAA(await renderedContrast(options.nth(wrong)),"selecionada");

  await page.getByRole("button",{name:"Responder",exact:true}).click();
  await expect(page.locator(".answerFeedback")).toBeVisible();

  const correctButton=options.nth(ITEM.a);
  const wrongButton=options.nth(wrong);
  const neutral=[0,1,2,3].find(index=>index!==ITEM.a&&index!==wrong);
  expectAA(await renderedContrast(correctButton),"correta");
  expectAA(await renderedContrast(wrongButton),"errada");
  expectAA(await renderedContrast(options.nth(neutral)),"desativada");
});
