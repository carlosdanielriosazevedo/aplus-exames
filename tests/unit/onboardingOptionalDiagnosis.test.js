import test from "node:test";
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
  assert.match(app,/Continuar Diagnóstico/);
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
