import {test,expect} from "@playwright/test";

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

async function seedConfiguredSubject(page,subjectId){
  const state=configuredState(subjectId);
  await page.addInitScript(state=>{
    localStorage.setItem("a25",JSON.stringify(state));
    localStorage.removeItem("a25-active-session-v1");
  },state);
}

for(const subject of SUBJECTS){
  test(`${subject.id} · reload sem draft mantém o aluno no diagnóstico configurado`,async({page})=>{
    await seedConfiguredSubject(page,subject.id);
    await page.goto("/");
    await expect(page.getByText(subject.marker,{exact:true})).toBeVisible({timeout:30_000});
    await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toHaveCount(0);

    await page.reload();
    await expect(page.getByText(subject.marker,{exact:true})).toBeVisible({timeout:30_000});
    await expect(page.getByRole("heading",{name:"Que disciplinas queres preparar?"})).toHaveCount(0);
  });
}
