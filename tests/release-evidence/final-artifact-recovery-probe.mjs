import {expect,chromium} from "@playwright/test";
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {DIAGNOSTIC_BLUEPRINT} from "../../app/data/content.js";
import {diagnosticAnchor,emptyScores,dailyMissionPlan,selectQuestionForPlan,trainingQuestions,buildMiniExam} from "../../app/lib/engine.js";
import {createDiagnosticDraft,transactDiagnosticAnswer} from "../../app/lib/diagnosticRecovery.js";

const SUBJECTS=[
  {id:"math-a",marker:"AVALIAÇÃO INICIAL · MATEMÁTICA A · PROVA 635"},
  {id:"portuguese",marker:"AVALIAÇÃO INICIAL · PORTUGUÊS · PROVA 639"},
  {id:"physics-chemistry-a",marker:"AVALIAÇÃO INICIAL · FÍSICA E QUÍMICA A · PROVA 715"}
];

function configuredState(subjectId){
  const now=Date.now();
  return {
    goal:17,
    diagnosticDone:false,
    diagnosticAnswers:0,
    selectedSubjectIds:[subjectId],
    activeSubjectId:subjectId,
    firstUseTourCompleted:true,
    onboardingSharedProfileDone:true,
    onboardingSubjectIds:[],
    onboardingReturnSubjectId:null,
    subjectOnboardingMode:"initial",
    subjectSettings:{[subjectId]:{profileConfigured:true,recentGrade:"",examTiming:"thisYear",goal:17}},
    subjectProgress:subjectId==="math-a"?{}:{[subjectId]:{subjectId,version:4,diagnosticDone:false,diagnosticCompletedAt:null,sessions:[],missionHistory:[],competence:{},errorPatterns:{},errorMemoryVersion:1,lastPosition:null,lastActivityAt:null}},
    subjectProgressModelVersion:4,
    pedagogicalIdVersion:1,
    betaMode:"internal",
    profile:{schoolYear:"11.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,
    _savedAt:now
  };
}

function pausedSubjectState(subjectId,current=2){
  const state=configuredState(subjectId);
  const now=Date.now();
  const itemIds=subjectId==="portuguese"
    ?["PT639-FND-001","PT639-FND-002","PT639-FND-004","PT639-FND-018"]
    :["FQA-ELEM-01","FQA-MAT-01","FQA-ENE-01","FQA-ELEM-02"];
  state.subjectProgress[subjectId]={
    ...state.subjectProgress[subjectId],
    lastPosition:{
      sessionId:`resume-${subjectId}`,
      kind:"diagnostic",
      label:"Diagnóstico",
      domain:null,
      itemIds,
      current,
      results:Array.from({length:current},()=>({status:"final",final:true,correct:true,points:1,maxPoints:1,gradingMode:"deterministic",classificationMode:null,countsForExamScore:null,penalty:0,provisionalPoints:null,requiresReview:false,responseText:"",type1Count:0,type2Count:0})),
      startedAt:now-60_000,
      updatedAt:now
    },
    lastActivityAt:now
  };
  return state;
}

function completedState(subjectId){
  const state=configuredState(subjectId);
  if(subjectId==="math-a")state.diagnosticDone=true;
  else state.subjectProgress[subjectId]={...state.subjectProgress[subjectId],diagnosticDone:true,diagnosticCompletedAt:Date.now(),lastPosition:null};
  return state;
}

function mathStateAfterTwoAnswers(){
  const now=Date.now();
  const base=configuredState("math-a");
  let state={
    ...base,
    profile:{...base.profile,schoolYear:"Já terminei o secundário",taughtSubtopicIds:[]},
    editorialOverrides:{},
    scores:emptyScores(),
    betaSessions:[{id:"resume-math-diagnostic",kind:"diagnostic",startedAt:now-60_000,finishedAt:null,meta:{}}],
    betaEvents:[],
    productAnalytics:{version:1,firstSeenAt:null,firstSeenDay:null,lastSeenAt:null,activeDays:[],appOpenCount:0,milestones:{},events:[]}
  };
  let draft=createDiagnosticDraft({
    session:state.betaSessions[0],
    item:diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],2,state),
    difficulty:2,
    now
  });
  const persist=()=>true;
  for(let i=0;i<2;i++){
    const tx=transactDiagnosticAnswer({state,draft,sel:draft.current.a,saveDraft:persist,saveState:persist,now:now+i+1});
    if(!tx.ok)throw new Error(`Não foi possível preparar draft matemático: ${tx.stage}/${tx.reason}`);
    state=tx.state;
    draft=tx.draft;
  }
  return {state:{...state,_stateVersion:31,_savedAt:Date.now()},draft:{...draft,savedAt:Date.now()}};
}

async function seed(page,state,draft=null){
  await page.addInitScript(({state,draft})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    if(draft)localStorage.setItem("a25-active-session-v1",JSON.stringify(draft));
    else localStorage.removeItem("a25-active-session-v1");
  },{state,draft});
}

async function expectNoSubjectSelector(page){
  await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toHaveCount(0);
}


const browser=await chromium.launch({headless:true,proxy:{server:process.env.HTTPS_PROXY||process.env.HTTP_PROXY}});
const candidate='https://aplus-exames-fad3igfre-carlos-rios-azevedo-s-projects.vercel.app';
const recovery='https://aplus-exames-b1i1www76-carlos-rios-azevedo-s-projects.vercel.app';
const core=d=>d?{sessionId:d.sessionId,current:typeof d.current==='number'?d.current:d.current?.id,i:d.i,answer:d.currentAnswer,startedAt:d.startedAt,responses:d.responses,results:d.results,itemIds:d.itemIds}:null;
try{
 for(const subject of ['math-a','portuguese','physics-chemistry-a']){
  const fixture=subject==='math-a'?mathStateAfterTwoAnswers():{state:pausedSubjectState(subject,2),draft:null};
  const states=[];
  for(const [base,token] of [[candidate,process.env.CANDIDATE_SHARE],[recovery,process.env.RECOVERY_SHARE]]){
   const context=await browser.newContext({ignoreHTTPSErrors:true,viewport:{width:390,height:844}});
   let writeAttempts=0;await context.route('**/*',route=>{if(['GET','HEAD','OPTIONS'].includes(route.request().method()))return route.continue();writeAttempts++;return route.abort()});
   const page=await context.newPage();await page.goto(base+'/?_vercel_share='+token);
   const incoming=states[0]||fixture;
   await page.evaluate(({state,draft})=>{localStorage.setItem('a25',JSON.stringify(state));if(draft)localStorage.setItem('a25-active-session-v1',JSON.stringify(draft));else localStorage.removeItem('a25-active-session-v1')},incoming);
   await page.goto(base+'/');await expect(page.getByRole('button',{name:'Responder',exact:true})).toBeVisible({timeout:30000});
   const snapshot=await page.evaluate(()=>({state:JSON.parse(localStorage.getItem('a25')),draft:JSON.parse(localStorage.getItem('a25-active-session-v1')||'null')}));states.push(snapshot);
   expect(writeAttempts,'No API writes may be attempted in a production recovery probe').toBe(0);await context.close();
  }
  if(subject==='math-a'){expect(core(states[1].draft)).toEqual(core(states[0].draft));expect(states[1].state.scores).toEqual(states[0].state.scores)}
  else expect(core(states[1].state.subjectProgress[subject].lastPosition)).toEqual(core(states[0].state.subjectProgress[subject].lastPosition));
  console.log(JSON.stringify({subject,candidateToRecovery:true,responses:subject==='math-a'?states[1].draft.responses.length:states[1].state.subjectProgress[subject].lastPosition.results.length}));
 }
}catch(error){console.error(String(error).replaceAll(process.env.CANDIDATE_SHARE,'<redacted>').replaceAll(process.env.RECOVERY_SHARE,'<redacted>'));process.exitCode=1}finally{await browser.close()}
