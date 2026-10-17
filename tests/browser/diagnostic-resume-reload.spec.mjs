import {test,expect} from "@playwright/test";

const SUBJECTS=[
  ["math-a","Matemática A"],
  ["portuguese","Português"],
  ["physics-chemistry-a","Física e Química A"]
];

function persistedState(subjectId){
  const subjectProgress={
    portuguese:{diagnosticDone:false},
    "physics-chemistry-a":{diagnosticDone:false}
  };
  return {
    goal:17,
    diagnosticDone:false,
    diagnosticAnswers:0,
    selectedSubjectIds:[subjectId],
    activeSubjectId:subjectId,
    subjectProgress,
    subjectProgressModelVersion:1,
    pedagogicalIdVersion:1,
    betaMode:"internal",
    firstUseTourCompleted:true,
    profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]},
    _stateVersion:31,
    _savedAt:Date.now()
  };
}

async function seedConfiguredSubject(page,subjectId){
  const state=persistedState(subjectId);
  await page.addInitScript(value=>{
    localStorage.setItem("a25",JSON.stringify(value));
    localStorage.removeItem("a25-active-session-v1");
  },state);
}

for(const [subjectId,label] of SUBJECTS){
  test(`${label} · reload sem draft não perde a disciplina ativa`,async({page})=>{
    await seedConfiguredSubject(page,subjectId);
    await page.goto("/");
    await expect(page.locator("body")).not.toContainText("Descobrir o meu nível",{timeout:30_000});
    await expect(page.locator("body")).not.toContainText("Que disciplinas queres preparar?",{timeout:30_000});
    await expect(page.locator("body")).toContainText(/Diagnóstico|Sessão em pausa/u,{timeout:30_000});

    await page.reload();
    await expect(page.locator("body")).not.toContainText("Descobrir o meu nível",{timeout:30_000});
    await expect(page.locator("body")).not.toContainText("Que disciplinas queres preparar?",{timeout:30_000});
    await expect(page.locator("body")).toContainText(/Diagnóstico|Sessão em pausa/u,{timeout:30_000});
  });
}
