import {test,expect} from "@playwright/test";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../../app/data/physicsChemistryExamBlueprint.js";
import {studentStateForCloud} from "../../app/lib/cloud.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
const id="physics-chemistry-a";
function syntheticState(){
 const now=Date.now();
 return {goal:17,xp:234,diagnosticDone:true,diagnosticAnswers:0,scores:{},selectedSubjectIds:[id],activeSubjectId:id,firstUseTourCompleted:true,onboardingSharedProfileDone:true,onboardingSubjectIds:[],subjectSettings:{[id]:{profileConfigured:true,goal:17}},subjectProgress:{[id]:{subjectId:id,version:4,diagnosticDone:true,diagnosticCompletedAt:now,sessions:[{sessionId:"synthetic-legacy-science",kind:"mission",completedAt:now-60000,itemIds:["FQA-R-MEC-01"],results:[{status:"auto-assessed-provisional",final:false,provisionalPoints:9,maxPoints:10,responseText:"Resposta histórica exclusivamente sintética",rubricCompleted:true}]}],missionHistory:[],competence:{"fqa-data":{attempts:1,rubricObserved:20,rubricNeedsReview:0,rubricReviews:1}},errorPatterns:{"bad|conceptual":{status:"recurring",label:"Dificuldade sintética não validada",count:5,lastAt:now}},lastPosition:null,lastActivityAt:now}},profile:{schoolYear:"Já terminei o secundário",recentGrade:14,syllabus:"most",taughtSubtopicIds:[]},pedagogicalIdVersion:1,betaMode:"internal",_stateVersion:31,_savedAt:now};
}
for(const width of [360,390,430,1366]){
 test(`FQA historical science is preserved but excluded at ${width}px and reload`,async({page})=>{
  await page.setViewportSize({width,height:844});const state=syntheticState();
  await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
  await page.goto("/");
  for(let pass=0;pass<2;pass++){
   await page.getByRole("button",{name:"Progresso",exact:true}).last().click();
   await expect(page.getByRole("heading",{name:"Como estás a evoluir."})).toBeVisible();
   await expect(page.getByRole("status").filter({hasText:"Informação insuficiente"})).toBeVisible();
   await expect(page.locator(".progressHero b").first()).toHaveText("—");
   await expect(page.getByText("Dificuldade sintética não validada",{exact:true})).toHaveCount(0);
   await expect(page.getByRole("button",{name:"234 XP",exact:true})).toBeVisible();
   const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));
   expect(stored.xp).toBe(234);expect(stored.subjectProgress[id].sessions[0]).toEqual(state.subjectProgress[id].sessions[0]);expect(stored.subjectProgress[id].competence).toEqual(state.subjectProgress[id].competence);
   if(pass===0)await page.reload();
  }
 });
}


test("new objective exam evidence remains eligible alongside excluded legacy science",async({page})=>{
 const state=syntheticState();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
 state.subjectProgress[id].sessions.push({sessionId:"synthetic-new-objective",kind:"full_exam",completedAt:Date.now(),itemIds:[item.id],results:[gradePhysicsChemistryResponse(item,item.answerIndex)]});
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
 await page.goto("/");
 for(let pass=0;pass<2;pass++){
  await page.getByRole("button",{name:"Progresso",exact:true}).last().click();
  await expect(page.locator(".progressHero b").first()).toHaveText("100/100");
  await expect(page.getByRole("status").filter({hasText:"Índice parcial baseado"})).toBeVisible();
  if(pass===0)await page.reload();
 }
});

for(const [label,value] of [["null",null],["string","synthetic malformed sessions"],["partial array",[null]]]){
 test(`incomplete FQA sessions (${label}) recover without crash or reset after reload`,async({page})=>{
  const state=syntheticState();state.subjectProgress[id].sessions=value;
  await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
  await page.goto("/");
  for(let pass=0;pass<2;pass++){
   await expect(page.getByRole("alert").filter({hasText:"histórico de Física e Química A"})).toContainText("Não foi possível recuperar o histórico de Física e Química A com segurança.");
   await expect(page.getByRole("alert").filter({hasText:"histórico de Física e Química A"})).toContainText("Os dados originais foram conservados.");
   const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));
   expect(saved.xp).toBe(234);expect(saved.subjectProgress[id].integrityRecoveryFields.sessions).toEqual(value);expect(Array.isArray(saved.subjectProgress[id].sessions)).toBe(true);
   if(pass===0)await page.reload();
  }
 });
}

test("absent FQA history fields in a historical version load safely",async({page})=>{
 const state=syntheticState();state.subjectProgress[id]={version:1,diagnosticDone:true,lastPosition:null};
 await page.addInitScript(state=>localStorage.setItem("a25",JSON.stringify(state)),state);await page.goto("/");
 await page.getByRole("button",{name:"Progresso",exact:true}).last().click();await expect(page.getByRole("status").filter({hasText:"Informação insuficiente"})).toBeVisible();
 await expect(page.getByRole("alert").filter({hasText:"histórico de Física e Química A"})).toHaveCount(0);
});

test("unbound assessment metadata cannot invent an Apronso weakness",async({page})=>{
 const state=syntheticState();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
 const result={...gradePhysicsChemistryResponse(item,item.answerIndex),errorDiagnosis:{code:"conceptual_error",message:"UNTRUSTED scientific weakness"},feedbackSummary:{errorDiagnosis:{code:"units",message:"UNTRUSTED units"}},criteria:[{id:"conceptual",status:"not-observed"}]};
 state.subjectProgress[id].sessions=[0,1,2].map(i=>({sessionId:"synthetic-adversarial-"+i,kind:"mission",completedAt:Date.now()+i,itemIds:[item.id],results:[result]}));
 await page.addInitScript(state=>localStorage.setItem("a25",JSON.stringify(state)),state);await page.goto("/");
 await expect(page.locator(".apronsoPatternInsight")).toHaveCount(0);
 await page.getByRole("button",{name:"Progresso",exact:true}).last().click();await expect(page.locator(".progressHero b").first()).toHaveText("100/100");await expect(page.getByText("UNTRUSTED",{exact:false})).toHaveCount(0);
});


for(const privacy of [false,true]){
 test(`equivalent paused attempts resume through ${privacy?"cloud privacy":"timestamp-only"} differences`,async({page})=>{
  const local=syntheticState(),now=Date.now();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
  local.subjectProgress[id].lastPosition={sessionId:"synthetic-semantic-pause",kind:"mission",label:"Missão sintética",itemIds:[item.id],current:0,results:[],currentAnswer:0,startedAt:now-60000,updatedAt:now-1000};local.subjectProgress[id].lastActivityAt=now-1000;
  const remote=structuredClone(local);if(privacy)remote.subjectProgress[id]=studentStateForCloud(local).subjectProgress[id];remote.subjectProgress[id].lastPosition.updatedAt=now;remote.subjectProgress[id].lastActivityAt=now;remote._savedAt=now+1;
  await page.addInitScript(({local,remote})=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(local));sessionStorage.setItem("a25",JSON.stringify(remote));localStorage.setItem("synthetic-423-seeded","1")}}, {local,remote});
  await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible();
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(stored.subjectProgress[id].integrityPendingConflict).toBe(false);expect(stored.subjectProgress[id].lastPosition.startedAt).toBe(now-60000);expect(stored.subjectProgress[id].lastPosition.currentAnswer).toBe(0);expect(stored.xp).toBe(234);
 });
}

test("genuinely divergent paused answers stay protected in the browser",async({page})=>{
 const local=syntheticState(),now=Date.now();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
 local.subjectProgress[id].lastPosition={sessionId:"synthetic-conflicting-pause",kind:"mission",label:"Missão sintética",itemIds:[item.id],current:0,results:[],currentAnswer:0,startedAt:now-60000,updatedAt:now};
 const other=structuredClone(local);other.subjectProgress[id].lastPosition.currentAnswer=1;
 await page.addInitScript(({local,other})=>{localStorage.setItem("a25",JSON.stringify(local));sessionStorage.setItem("a25",JSON.stringify(other))},{local,other});await page.goto("/");
 await expect(page.getByRole("alert").filter({hasText:"Há versões diferentes"})).toContainText("Há versões diferentes de uma tentativa");
 page.once("dialog",dialog=>dialog.dismiss());await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();await expect(page.getByRole("button",{name:"Responder",exact:true})).toHaveCount(0);
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(stored.subjectProgress[id].integrityPendingConflict).toBe(true);expect(stored.xp).toBe(234);expect(stored.subjectProgress[id].integrityPendingVariants.map(x=>x.currentAnswer)).toEqual(expect.arrayContaining([0,1]));
});

test("resuming old scientific feedback does not replay unsigned recommendations or reopen submission",async({page})=>{
 const state=syntheticState(),now=Date.now();const assessment={status:"auto-assessed-provisional",final:false,correct:null,provisionalPoints:9,maxPoints:10,responseText:"synthetic submitted science",note:"UNTRUSTED",feedbackSummary:{strengths:[],gaps:[],nextAction:"UNTRUSTED",errorDiagnosis:{code:"conceptual_error",label:"UNTRUSTED",message:"UNTRUSTED"}}};
 state.subjectProgress[id].lastPosition={sessionId:"synthetic-old-feedback",kind:"mission",label:"Missão sintética",itemIds:["FQA-R-MEC-01"],current:0,results:[assessment],currentAnswer:assessment.responseText,currentResult:assessment,startedAt:now-60000,updatedAt:now};
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
 await expect(page.getByRole("status").filter({hasText:"Resposta guardada sem avaliação verificável"})).toBeVisible();await expect(page.getByText("UNTRUSTED",{exact:false})).toHaveCount(0);await expect(page.getByRole("button",{name:"Responder",exact:true})).toHaveCount(0);await expect(page.locator("textarea")).toBeDisabled();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(saved.xp).toBe(234);expect(saved.subjectProgress[id].integrityHistory.some(row=>row.lastPosition?.currentResult?.feedbackSummary?.nextAction==="UNTRUSTED")).toBe(true);
});
