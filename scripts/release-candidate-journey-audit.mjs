import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const portugueseMini=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const fqaMini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const fqaFull=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const hub=readFileSync(new URL("../app/components/StudyModeHub.js",import.meta.url),"utf8");
const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const cloud=readFileSync(new URL("../app/lib/cloudState.js",import.meta.url),"utf8");

// Shared release-candidate contract: the normal student journey must stay navigable.
assert.match(chrome,/STUDENT_NAV\s*=\s*\[\["home","Aprender"\],\["train","Treinar"\],\["ranking","Ranking"\],\["progress","Progresso"\]\]/u,"RC: the four primary student areas must remain available.");
assert.match(hub,/Praticar/u,"RC: Praticar must remain available from Treinar.");
assert.match(hub,/Rever matéria/u,"RC: Rever matéria must remain available from Treinar.");
assert.match(hub,/Exames/u,"RC: Exames must remain available from Treinar.");

// Matemática A: diagnóstico → Aprender → Praticar/Missão → Mini-exame → revisão → Progresso.
for(const [pattern,label] of [
  [/function DiagRun\(/u,"diagnóstico"],
  [/function Home\(/u,"Aprender"],
  [/function TrainHub\(/u,"Treinar"],
  [/function Mission\(/u,"Missão"],
  [/function TrainingRun\(/u,"Praticar"],
  [/function MiniExamRun\(/u,"Mini-exame"],
  [/function MiniExamCompletedReview\(/u,"revisão"],
  [/function Progress\(/u,"Progresso"]
]) assert.match(math,pattern,`Matemática A RC: ${label} must remain wired.`);
assert.match(math,/EXAMES/u,"Matemática A RC: Exames hub must remain available.");
assert.match(math,/Exame Completo/u,"Matemática A RC: Exame Completo must remain available.");

// Português: same product journey, with its dedicated mini-exam/review implementation.
assert.match(portuguese,/PortugueseLearnPanel/u,"Português RC: Aprender must remain wired.");
assert.match(portuguese,/StudyModeHub/u,"Português RC: Treinar must reuse the shared hub.");
assert.match(portuguese,/view==="trainingSetup"/u,"Português RC: Praticar must remain wired.");
assert.match(portuguese,/startMission/u,"Português RC: Missão must remain wired.");
assert.match(portuguese,/go\("portugueseMiniExam"\)/u,"Português RC: Mini-exame must remain reachable.");
assert.match(portuguese,/Exame Completo/u,"Português RC: Exame Completo must remain reachable.");
assert.match(portuguese,/REVISÃO EM PAUSA/u,"Português RC: interrupted review must remain resumable.");
assert.match(portuguese,/view==="progress"/u,"Português RC: Progresso must remain wired.");
assert.match(portugueseMini,/Terminar e rever o exame/u,"Português RC: completed exam must lead to review.");
assert.match(portugueseMini,/Resposta submetida e fechada/u,"Português RC: submitted answers must stay locked after feedback.");

// FQ A: explicit full candidate journey, including no correction during exams.
assert.match(fqa,/Conhecer o teu ponto de partida/u,"FQ A RC: diagnostic entry must remain visible.");
assert.match(fqa,/const primaryTarget="home"/u,"FQ A RC: diagnostic completion must return to Aprender instead of auto-starting a mission.");
assert.match(fqa,/startMission/u,"FQ A RC: Missão must remain wired.");
assert.match(fqa,/view==="trainingSetup"/u,"FQ A RC: Praticar must remain wired.");
assert.match(fqa,/Mini-exame · Modelo 1/u,"FQ A RC: Mini-exame must remain reachable.");
assert.match(fqa,/Exame Completo · 715/u,"FQ A RC: Exame Completo must remain reachable.");
assert.match(fqa,/REVISÃO EM PAUSA/u,"FQ A RC: interrupted review must remain resumable.");
assert.match(fqa,/view==="progress"/u,"FQ A RC: Progresso must remain wired.");
assert.match(fqaMini,/não mostra a correção durante o mini-exame/u,"FQ A RC: Mini-exam must not reveal correction before submission.");
assert.match(fqaFull,/Durante o Exame Completo não mostramos correções/u,"FQ A RC: full exam must not reveal correction before submission.");

// Mobile release floor: safe areas, no horizontal overflow, minimum touch targets and native-size inputs.
assert.match(css,/\/\* v5\.6 — Beta Candidate mobile-first e legibilidade do fluxo do aluno \*\//u,"RC mobile: candidate override block must remain present.");
assert.match(css,/html,body\{max-width:100%;overflow-x:hidden\}/u,"RC mobile: horizontal page overflow must stay blocked.");
assert.match(css,/env\(safe-area-inset-top\)/u,"RC mobile: top safe-area support must remain present.");
assert.match(css,/env\(safe-area-inset-bottom\)/u,"RC mobile: bottom safe-area support must remain present.");
assert.match(css,/@media\(max-width:760px\)[\s\S]*button\{min-height:44px\}/u,"RC mobile: touch targets must remain at least 44px.");
assert.match(css,/@media\(max-width:760px\)[\s\S]*input,select,textarea\{font-size:16px!important\}/u,"RC mobile: form controls must avoid mobile zoom regressions.");

// Resume/switch-subject contract: cloud state must stay user-scoped and versioned.
assert.match(cloud,/auth_user_id/u,"RC cloud: cloud state must stay user-scoped.");
assert.match(cloud,/schemaVersion/u,"RC cloud: cloud state must remain explicitly versioned.");
assert.match(cloud,/activeSubjectId/u,"RC cloud: active subject must remain part of resumable product state.");

console.log("✓ release candidate journey: Matemática A, Português e FQ A preserve diagnóstico → Aprender → Praticar/Missão → exames → revisão → Progresso, with mobile and cloud-resume invariants");
