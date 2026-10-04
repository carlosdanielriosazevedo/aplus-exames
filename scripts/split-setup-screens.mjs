import fs from "node:fs";

const pagePath="app/page.js";
const outputPath="app/components/SetupScreens.js";
let source=fs.readFileSync(pagePath,"utf8");

if(source.includes('const StudentProfile=dynamic(()=>import("./components/SetupScreens")')){
  console.log("Setup screens already split.");
  process.exit(0);
}

const startMarker="function suggestedExamTimingForYear(year,current){";
const endMarker="const PRE_DIAGNOSTIC_TOUR_STEPS=[";
const start=source.indexOf(startMarker);
const end=source.indexOf(endMarker,start);
if(start<0||end<0)throw new Error("Could not locate setup screen block");
let block=source.slice(start,end).trim();
block=block
  .replace("function StudentProfile({s,setS,go,editing=false}){","export function StudentProfile({s,setS,go,editing=false,initialProfile}){")
  .replace("...(s.profile||initial.profile),","...(s.profile||initialProfile),")
  .replace("function TaughtCurriculum({s,setS,go,onboarding=false}){","export function TaughtCurriculum({s,setS,go,onboarding=false}){")
  .replace("function GoalScreen({s,setS,go,onboarding=false}){","export function GoalScreen({s,setS,go,onboarding=false}){")
  .replace('<div className="notice"><b>Conteúdo em validação</b><span>A seleção representa o que já aprendeste, mesmo que algumas submatérias ainda não tenham perguntas validadas. A app nunca usa automaticamente as 5.650 perguntas protótipo.</span></div>','<div className="notice"><b>Escolhe apenas o que já aprendeste</b><span>A app usa esta seleção para adaptar o diagnóstico, os treinos e as recomendações ao teu percurso escolar.</span></div>');

const moduleSource=`"use client";\nimport {useState} from "react";\nimport {BrandName,Logo,Shell} from "./chrome";\nimport {SECONDARY_EXAM_SUBJECTS} from "../data/subjects";\nimport {curriculumSubtopicsForTheme,curriculumSubtopicId} from "../data/curriculumVnext";\nimport {currentYearThemes,normalizeTaughtSubtopics} from "../lib/curriculumScope";\nimport {clearSessionDraft} from "../lib/sessionDraft";\nimport {migrateDailyMission} from "../lib/dailyMission";\nimport {recordMilestone} from "../lib/productAnalytics";\nimport {activateSubjectState,finishSubjectOnboardingState,subjectGoal,subjectOnboardingStep} from "../lib/subjectWorkspace";\n\nconst DEFAULT_SUBJECT_ID="math-a";\nfunction subjectById(id){return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);}\n\n${block}\n`;

source=source.slice(0,start)+source.slice(end);
const dynamicAnchor='const Parent=dynamic(()=>import("./components/SecondaryScreens").then(module=>module.Parent),{ssr:false});';
if(!source.includes(dynamicAnchor))throw new Error("Secondary screen dynamic import anchor not found");
source=source.replace(dynamicAnchor,`${dynamicAnchor}\nconst StudentProfile=dynamic(()=>import("./components/SetupScreens").then(module=>module.StudentProfile),{ssr:false});\nconst TaughtCurriculum=dynamic(()=>import("./components/SetupScreens").then(module=>module.TaughtCurriculum),{ssr:false});\nconst GoalScreen=dynamic(()=>import("./components/SetupScreens").then(module=>module.GoalScreen),{ssr:false});`);

for(const route of [
  ['if(screen==="onboard")return <StudentProfile s={s} setS={setS} go={go}/>;','if(screen==="onboard")return <StudentProfile s={s} setS={setS} go={go} initialProfile={initial.profile}/>;'],
  ['if(screen==="profileSettings")return <StudentProfile s={s} setS={setS} go={go} editing/>;','if(screen==="profileSettings")return <StudentProfile s={s} setS={setS} go={go} editing initialProfile={initial.profile}/>;']
]){
  if(!source.includes(route[0]))throw new Error(`Route not found: ${route[0]}`);
  source=source.replace(route[0],route[1]);
}

fs.writeFileSync(outputPath,moduleSource);
fs.writeFileSync(pagePath,source);
console.log("Split profile, curriculum and goal screens out of the initial page chunk.");
