import {test} from "vitest";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const src=path=>readFileSync(new URL("../../"+path,import.meta.url),"utf8");

test("disciplines retain user click order (not fixed catalog order)",()=>{
  const app=src("app/clientApp.js");
  assert.match(app,/const ordered=selected\.filter\(id=>AVAILABLE_SUBJECT_IDS\.includes\(id\)\)/);
  assert.match(app,/onboardingReturnSubjectId:ordered\[0\]/);
});

test("completed onboarding opens Aprender without launching a diagnosis",()=>{
  for(const path of ["app/components/SetupScreens.js","app/components/PortugueseSubject.js","app/components/PhysicsChemistrySubject.js"]){
    const source=src(path);
    assert.doesNotMatch(source,/const onboardingDoneScreen="diag"/,path);
    assert.match(source,/const onboardingDoneScreen="home"/,path);
  }
  const app=src("app/clientApp.js");
  assert.match(app,/setScreen\(activeSubjectConfigured\?"home":\(fromLanding\?"subjectOnboard":"welcome"\)\)/);
});

test("Math Aprender offers explicit per-subject diagnostic entry",()=>{
  const app=src("app/clientApp.js");
  assert.match(app,/!s\.diagnosticDone\?<section className="adaptivePath"/);
  assert.match(app,/Começar Diagnóstico/);
  assert.match(app,/Continuar diagnóstico/);
  assert.match(app,/go\("diag"\)/);
});

test("Portuguese and FQA keep their own diagnosis completion and resume state",()=>{
  for(const path of ["app/components/PortugueseSubject.js","app/components/PhysicsChemistrySubject.js"]){
    const source=src(path);
    assert.match(source,/progress\.diagnosticDone/,path);
    assert.match(source,/progress\.lastPosition/,path);
    assert.match(source,/startDiagnostic/,path);
  }
});

test("onboarding cannot advance with missing recent grade",()=>{
  const setup=src("app/components/SetupScreens.js");
  assert.match(setup,/if\(profileIncomplete\)return;/);
  assert.match(setup,/disabled=\{profileIncomplete\}/);
  assert.match(setup,/aria-required="true"/);
  assert.match(setup,/p\.recentGrade===""/);
});

test("required selection and profile guards remain; Portuguese allows previous-year scope",()=>{
 const selection=src("app/clientApp.js");
 assert.match(selection,/disabled=\{!selected\.length\}/);
 const setup=src("app/components/SetupScreens.js");
 assert.match(setup,/const profileIncomplete=gradeMissing/);
 assert.match(setup,/disabled=\{profileIncomplete\}/);
 assert.match(setup,/const curriculumIncomplete=onboarding/);
 assert.match(setup,/disabled=\{curriculumIncomplete\}/);
 const pt=src("app/components/PortugueseSubject.js");
 const fqa=src("app/components/PhysicsChemistrySubject.js");
 assert.match(fqa,/disabled=\{view==="curriculumOnboard"&&currentYear!=="10.º"&&scopeDraft\.length===0\}/);
 // Portuguese permits an empty current-year scope; UI tests assert that every
 // resulting diagnostic question is from a previous year (11th and 12th).
 assert.doesNotMatch(pt,/disabled=\{view==="curriculumOnboard"/);
 assert.doesNotMatch(pt,/if\(view==="curriculumOnboard"&&currentYear!=="10.º"&&scopeDraft\.length===0\)return/);
 assert.match(pt,/allowedYears\.includes\(item\.year\)&&portugueseItemInScope\(item,currentYear,taughtUnitIds\)/);
});

test("10th-year student may finish with zero taught topics",()=>{
 const setup=src("app/components/SetupScreens.js");
 assert.match(setup,/s\.profile\?\.schoolYear!=="10.º"/);
 assert.match(src("app/components/PhysicsChemistrySubject.js"),/currentYear!=="10.º"&&scopeDraft\.length===0/);
 const pt=src("app/components/PortugueseSubject.js");
 assert.match(pt,/currentYear==="10.º"\?"No 10.º ano, o diagnóstico e as missões ficam indisponíveis/);
 assert.match(pt,/!progress\.diagnosticDone&&!scopedCoverage\.diagnosticReady/);
});

test("main student header includes ellipsis fallback on non-Aprender tabs",()=>{
 const chrome=src("app/components/chrome.js");
 assert.match(chrome,/menu=children\?augmentStudentMenu/);
 assert.match(chrome,/aria-label="Abrir menu"/);
 assert.match(chrome,/Matéria dada na escola/);
});
