import {test,expect} from "@playwright/test";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../../app/data/vnextDiagnostic.js";
import {createDiagnosticDraft} from "../../app/lib/diagnosticRecovery.js";

const ITEM=VNEXT_DIAGNOSTIC_QUESTIONS.find(item=>item.id==="DG-VN11CD-DP-011");
if(!ITEM)throw new Error("Pergunta estável do diagnóstico não encontrada.");

async function seedMathDiagnostic(page){
  const now=Date.now();
  const session={id:"block2-2-question-parity",kind:"diagnostic",startedAt:now-1000,finishedAt:null,meta:{}};
  const draft=createDiagnosticDraft({session,item:ITEM,difficulty:ITEM.difficulty,blueprint:[ITEM.subtopicId||ITEM.themeId],now:now-1000});
  const state={goal:17,diagnosticDone:false,diagnosticAnswers:0,selectedSubjectIds:["math-a"],activeSubjectId:"math-a",subjectProgress:{},subjectProgressModelVersion:1,pedagogicalIdVersion:1,betaMode:"internal",firstUseTourCompleted:true,profile:{schoolYear:"Já terminei o secundário",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},_stateVersion:31,_savedAt:now};
  await page.addInitScript(({state,draft,now})=>{
    localStorage.setItem("a25",JSON.stringify(state));
    localStorage.setItem("a25-active-session-v1",JSON.stringify({...draft,savedAt:now}));
  },{state,draft,now});
}

test("Bloco 2.2 · ecrã de pergunta tem contador comum e uma única saída",async({page})=>{
  await page.setViewportSize({width:390,height:844});
  await seedMathDiagnostic(page);
  await page.goto("/");

  const header=page.locator(".sessionTop");
  await expect(header).toBeVisible({timeout:30_000});
  await expect(header.locator("[data-session-progress]")).toHaveText(/^\d+%$/u);

  const exits=page.getByRole("button",{name:/sair|guardar e sair/i});
  await expect(exits).toHaveCount(1);
  await expect(page.getByRole("button",{name:"Guardar e continuar depois",exact:true})).toHaveCount(0);

  page.once("dialog",dialog=>dialog.accept());
  await header.getByRole("button",{name:"Sair da sessão"}).click();
  await expect(page.getByRole("heading",{name:"Diagnóstico de Matemática A"})).toBeVisible();
  const preserved=await page.evaluate(()=>JSON.parse(localStorage.getItem("a25-active-session-v1")));
  expect(preserved.sessionId).toBe("block2-2-question-parity");
});
