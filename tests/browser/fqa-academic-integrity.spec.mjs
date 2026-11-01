import {test,expect} from "@playwright/test";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../../app/data/physicsChemistryExamBlueprint.js";
import {studentStateForCloud} from "../../app/lib/cloud.js";
import {gradePhysicsChemistryResponse,buildPhysicsChemistryDiagnostic} from "../../app/lib/physicsChemistryEngine.js";
import {PHYSICS_CHEMISTRY_A_ITEMS} from "../../app/data/physicsChemistryFoundation.js";
import {PHYSICS_CHEMISTRY_A_MINI_EXAMS} from "../../app/data/physicsChemistryMiniExams.js";
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


test("an objective fingerprint seeded from persistence cannot authenticate a session after reload",async({page})=>{
 const state=syntheticState();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
 state.subjectProgress[id].sessions.push({sessionId:"synthetic-new-objective",kind:"full_exam",completedAt:Date.now(),itemIds:[item.id],results:[gradePhysicsChemistryResponse(item,item.answerIndex)]});
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
 await page.goto("/");
 for(let pass=0;pass<2;pass++){
  await page.getByRole("button",{name:"Progresso",exact:true}).last().click();
  await expect(page.locator(".progressHero b").first()).toHaveText("—");
  await expect(page.getByRole("status").filter({hasText:"Informação insuficiente"})).toBeVisible();
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
 await page.getByRole("button",{name:"Progresso",exact:true}).last().click();await expect(page.locator(".progressHero b").first()).toHaveText("—");await expect(page.getByText("UNTRUSTED",{exact:false})).toHaveCount(0);
});


for(const privacy of [false,true]){
 test(`${privacy?"cloud-redacted pauses stay unproven":"complete equivalent local pauses resume despite timestamps"}`,async({page})=>{
  const local=syntheticState(),now=Date.now();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
  local.subjectProgress[id].lastPosition={sessionId:"synthetic-semantic-pause",kind:"mission",label:"Missão sintética",itemIds:[item.id],current:0,results:[],currentAnswer:0,startedAt:now-60000,updatedAt:now-1000};local.subjectProgress[id].lastActivityAt=now-1000;
  const remote=structuredClone(local);if(privacy)remote.subjectProgress[id]=studentStateForCloud(local).subjectProgress[id];remote.subjectProgress[id].lastPosition.updatedAt=now;remote.subjectProgress[id].lastActivityAt=now;remote._savedAt=now+1;
  await page.addInitScript(({local,remote})=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(local));sessionStorage.setItem("a25",JSON.stringify(remote));localStorage.setItem("synthetic-423-seeded","1")}}, {local,remote});
  await page.goto("/");
  if(privacy){
   await expect(page.getByRole("alert").filter({hasText:"Não foi possível confirmar esta retoma"})).toBeVisible();
   page.once("dialog",dialog=>dialog.dismiss());await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
   await expect(page.getByRole("button",{name:"Responder",exact:true})).toHaveCount(0);
  }else{
   await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible();
  }
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(stored.subjectProgress[id].integrityPendingConflict).toBe(privacy);expect(stored.subjectProgress[id].lastPosition.startedAt).toBe(now-60000);expect(stored.xp).toBe(234);
  if(privacy){expect(stored.subjectProgress[id].integrityPendingConflictKind).toBe("privacy-unproven");expect(stored.subjectProgress[id].integrityPendingVariants.some(row=>row.currentAnswer===0)).toBe(true);await page.getByRole("button",{name:"Progresso",exact:true}).last().click();await expect(page.getByRole("heading",{name:"Como estás a evoluir."})).toBeVisible()}
  else expect(stored.subjectProgress[id].lastPosition.currentAnswer).toBe(0);
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

test("a fresh local diagnostic remains usable and contributes only while its runtime context is available",async({page})=>{
 const state=syntheticState();state.subjectProgress[id].diagnosticDone=false;
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
 await page.goto("/");await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).last().click();await page.getByRole("button",{name:"Começar diagnóstico",exact:true}).click();
 const diagnostic=buildPhysicsChemistryDiagnostic(PHYSICS_CHEMISTRY_A_ITEMS);
 for(let index=0;index<diagnostic.length;index++){
  await page.locator(".opts button").nth(diagnostic[index].answerIndex).click();await page.getByRole("button",{name:"Responder",exact:true}).click();
  await page.getByRole("button",{name:index===diagnostic.length-1?"Ver resultado":"Seguinte",exact:true}).click();
 }
 await expect(page.locator(".subjectStats > div").filter({hasText:"respostas objetivas corretas"}).locator("b")).toHaveText("8/8");
 await page.getByRole("button",{name:"Ir para o menu inicial",exact:true}).click();await page.getByRole("button",{name:"Progresso",exact:true}).last().click();
 await expect(page.locator(".progressHero b").first()).toHaveText("100/100");
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));
 await page.reload();await page.getByRole("button",{name:"Progresso",exact:true}).last().click();await expect(page.locator(".progressHero b").first()).toHaveText("—");
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(after.xp).toBe(before.xp);expect(after.subjectProgress[id].sessions).toEqual(before.subjectProgress[id].sessions);
});

test("resuming old scientific feedback does not replay unsigned recommendations or reopen submission",async({page})=>{
 const state=syntheticState(),now=Date.now();const assessment={status:"auto-assessed-provisional",final:false,correct:null,provisionalPoints:9,maxPoints:10,responseText:"synthetic submitted science",note:"UNTRUSTED",feedbackSummary:{strengths:[],gaps:[],nextAction:"UNTRUSTED",errorDiagnosis:{code:"conceptual_error",label:"UNTRUSTED",message:"UNTRUSTED"}}};
 state.subjectProgress[id].lastPosition={sessionId:"synthetic-old-feedback",kind:"mission",label:"Missão sintética",itemIds:["FQA-R-MEC-01"],current:0,results:[assessment],currentAnswer:assessment.responseText,currentResult:assessment,startedAt:now-60000,updatedAt:now};
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
 await expect(page.getByRole("status").filter({hasText:"Resposta guardada sem avaliação verificável"})).toBeVisible();await expect(page.getByText("UNTRUSTED",{exact:false})).toHaveCount(0);await expect(page.getByRole("button",{name:"Responder",exact:true})).toHaveCount(0);await expect(page.locator("textarea")).toBeDisabled();
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(saved.xp).toBe(234);expect(saved.subjectProgress[id].integrityHistory.some(row=>row.lastPosition?.currentResult?.feedbackSummary?.nextAction==="UNTRUSTED")).toBe(true);
});

for(const label of [undefined,null,42]){
 test(`paused label ${String(label)} is display-safe and preserves the original across reload`,async({page})=>{
  const state=syntheticState(),now=Date.now();const item=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems.find(x=>x.responseType==="multiple-choice");
  state.subjectProgress[id].lastPosition={sessionId:"synthetic-label-pause",kind:"mission",label,itemIds:[item.id],current:0,results:[],currentAnswer:0,startedAt:now-60000,updatedAt:now};
  const errors=[];page.on("pageerror",error=>errors.push(error.message));
  await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
  await page.goto("/");
  for(let pass=0;pass<2;pass++){
   await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
   await expect(page.getByRole("button",{name:"Responder",exact:true})).toBeVisible();
   const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));
   expect(saved.subjectProgress[id].lastPosition.label).toBe("Missão");expect(saved.subjectProgress[id].lastPosition.startedAt).toBe(now-60000);expect(saved.xp).toBe(234);
   if(label!==undefined)expect(saved.subjectProgress[id].lastPosition.integrityOriginalLabel).toBe(label);
   if(pass===0)await page.reload();
  }
  expect(errors).toEqual([]);
 });
}

test("a restored unverified scientific final result cannot become an objective correct answer in the completion summary",async({page})=>{
 const state=syntheticState(),now=Date.now();const result={status:"final",final:true,correct:true,points:10,maxPoints:10,requiresReview:false,responseText:"Synthetic retained response"};
 state.subjectProgress[id].lastPosition={sessionId:"synthetic-summary-pause",kind:"mission",label:"Missão sintética",itemIds:["FQA-R-MEC-01"],current:0,results:[result],currentResult:result,currentAnswer:result.responseText,startedAt:now-60000,updatedAt:now};
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
 await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();await page.getByRole("button",{name:"Ver resultado",exact:true}).click();
 await expect(page.getByRole("status").filter({hasText:"Resultados sem avaliação verificável"})).toBeVisible();
 await expect(page.locator(".subjectStats > div").filter({hasText:"respostas objetivas corretas"}).locator("b")).toHaveText("—");
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")));expect(saved.subjectProgress[id].sessions.at(-1).results[0].responseText).toBe(result.responseText);expect(saved.xp).toBe(259);
 await page.reload();expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("a25")).xp)).toBe(259);
});

test("parent assessment summaries do not certify an excluded scientific correction",async({page})=>{
 const state=syntheticState();state.identity={roles:["parent"],activeRole:"parent",displayName:"Synthetic guardian"};state.parentInvites=[{id:"synthetic-parent-link",status:"accepted",studentName:"Synthetic student"}];
 state.subjectProgress[id].sessions=[{sessionId:"synthetic-parent-exam",kind:"full_exam",completedAt:Date.now(),itemIds:["FQA-R-MEC-01"],results:[{status:"final",final:true,correct:true,points:10,maxPoints:10,requiresReview:false}]}];
 await page.addInitScript(state=>localStorage.setItem("a25",JSON.stringify(state)),state);await page.goto("/");
 await page.getByLabel("Abrir menu").click();await page.getByRole("button",{name:"Área dos pais",exact:true}).click();
 await expect(page.locator(".parentAssessmentList")).toContainText("1/1 respostas registadas · 1 sem avaliação verificável");
 await expect(page.locator(".parentAssessmentList")).not.toContainText("correção concluída");
 await expect(page.locator(".parentInsight.good")).toHaveCount(0);
});

test("an unverified saved objective cannot disclose a correct or incorrect option state",async({page})=>{
 const state=syntheticState(),now=Date.now(),item=PHYSICS_CHEMISTRY_A_ITEMS.find(row=>row.responseType==="multiple-choice");
 const result=gradePhysicsChemistryResponse(item,item.answerIndex);
 state.subjectProgress[id].lastPosition={sessionId:"synthetic-unverified-objective",kind:"mission",label:"Missão",itemIds:[item.id],current:0,results:[result],currentResult:result,currentAnswer:item.answerIndex,startedAt:now-1000,updatedAt:now};
 await page.addInitScript(state=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("synthetic-423-seeded","1")}},state);
 await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
 await expect(page.getByRole("status").filter({hasText:"Resposta guardada sem avaliação verificável"})).toBeVisible();
 await expect(page.locator(".opts .correct,.opts .incorrect,.opts .good,.opts .bad")).toHaveCount(0);
 await expect(page.getByRole("button",{name:"Responder",exact:true})).toHaveCount(0);
});

for(const full of [false,true]){
 test(`${full?"full":"mini"} exam review excludes fresh unvalidated science without a zero score`,async({page})=>{
  const state=syntheticState(),now=Date.now();
  const rows=full?[...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems,...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalItems]:PHYSICS_CHEMISTRY_A_MINI_EXAMS[0].items;
  const examId=full?"fqa-full-715":PHYSICS_CHEMISTRY_A_MINI_EXAMS[0].id,science=rows.find(row=>row.responseType==="restricted-response");
  const draft={version:1,examId,itemIds:rows.map(row=>row.id),index:0,answers:{[science.id]:"Synthetic unvalidated scientific response"},startedAt:now-10000,updatedAt:now,review:true,markedForReview:[],rubricAssessments:{}};
  await page.addInitScript(({state,draft})=>{if(!localStorage.getItem("synthetic-423-seeded")){localStorage.setItem("a25",JSON.stringify(state));localStorage.setItem("applus:fqa-exam-draft:v1:"+draft.examId,JSON.stringify(draft));localStorage.setItem("synthetic-423-seeded","1")}}, {state,draft});
  await page.goto("/");await page.getByRole("button",{name:"Continuar sessão",exact:true}).last().click();
  await expect(page.getByRole("heading",{name:full?"Revisão do Exame Completo":"Rever o mini-exame",exact:true})).toBeVisible();
  await expect(page.locator("#fqa-review-"+science.id+" > summary")).toContainText("Sem avaliação verificável");
  await page.locator("#fqa-review-"+science.id+" > summary").click();
  await expect(page.locator("#fqa-review-"+science.id)).toContainText("Synthetic unvalidated scientific response");
  await expect(page.locator(".autoAssessmentScore,.automaticFeedbackPanel,.automaticCriteriaList")).toHaveCount(0);
  if(full)await expect(page.getByText("Subtotal provisório já corrigível: Informação insuficiente",{exact:true})).toBeVisible();
  else await expect(page.locator(".fqaExamScoreGrid > div").filter({hasText:"Escolha múltipla elegível"}).locator("b")).toHaveText("—");
  const saved=await page.evaluate(examId=>JSON.parse(localStorage.getItem("applus:fqa-exam-draft:v1:"+examId)),examId);expect(saved.startedAt).toBe(draft.startedAt);expect(saved.answers).toEqual(draft.answers);
 });
}
