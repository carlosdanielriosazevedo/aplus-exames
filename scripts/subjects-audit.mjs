import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  SUBJECT_GROUPS,SECONDARY_EXAM_SUBJECTS,AVAILABLE_SUBJECT_IDS,
  SUBJECT_CATALOG_YEAR,SUBJECT_CATALOG_SOURCE
} from "../app/data/subjects.js";

assert.equal(SUBJECT_CATALOG_YEAR,2026);
assert.match(SUBJECT_CATALOG_SOURCE,/^https:\/\/iave\.pt\//);
assert.equal(SECONDARY_EXAM_SUBJECTS.length,24,"the 2026 catalog must contain 24 distinct disciplines");
assert.equal(new Set(SECONDARY_EXAM_SUBJECTS.map(subject=>subject.id)).size,24,"subject IDs must be unique");
assert.deepEqual(AVAILABLE_SUBJECT_IDS,["math-a","portuguese"],"Matemática A e Português devem ser selecionáveis no beta atual");

const expectedCodes=["138","501","517","547","550","623","635","639","702","706","708","712","714","715","719","723","724","732","734","735","835","839","847","848","849"];
const catalogCodes=SECONDARY_EXAM_SUBJECTS.flatMap(subject=>subject.codes).sort();
assert.deepEqual(catalogCodes,expectedCodes,"catalog must match the official 2026 secondary exam codes");

const groupIds=new Set(SUBJECT_GROUPS.map(group=>group.id));
for(const subject of SECONDARY_EXAM_SUBJECTS){
  assert.ok(groupIds.has(subject.group),`${subject.id} must belong to a visible group`);
  assert.ok(["11.º","12.º"].includes(subject.examYear),`${subject.id} must expose its exam year`);
}

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const analytics=readFileSync(new URL("../app/lib/productAnalytics.js",import.meta.url),"utf8");
const mathReview=readFileSync(new URL("../app/components/MathReviewMatter.js",import.meta.url),"utf8");
const portugueseSubject=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const globalCss=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
assert.match(page,/if\(screen==="subjectOnboard"\)/);
assert.match(page,/if\(screen==="subjectManager"\)/,"the persistent subject manager must have a guarded route");
assert.match(page,/if\(preview==="subjects"\)/);
assert.match(welcome,/segment === "parent" \? "parent" : "subjectOnboard"/);
assert.match(page,/disabled=\{!subject\.available\}/);
assert.match(page,/Matemática A e Português disponíveis/);
assert.match(chrome,/className="subjectSwitcher"/,"the shared student header must expose the active subject switcher");
assert.match(page,/\["home","train","progress","exams"\]\.includes\(screen\)&&s\.activeSubjectId==="portuguese"/,"Portuguese must use the same semantic workspace destinations as Mathematics A");
assert.match(page,/go\("home"\)/,"subject switching must be able to open the shared home destination");
assert.match(page,/go\(isNew\?"onboard":subjectHomeScreen\(subject\.id\)\)/,"uma disciplina adicionada mais tarde deve passar pela configuração antes de abrir a Home");
assert.match(page,/subjectOnboardingStep/u,"o onboarding deve percorrer todas as disciplinas selecionadas");
assert.match(page,/if\(screen==="reviewMatter"\)return <MathReviewMatter/u,"Matemática A deve ter um ecrã próprio de Rever matéria");
assert.match(page,/onClick=\{\(\)=>go\("reviewMatter"\)\}[\s\S]{0,180}<b>Rever matéria<\/b>/u,"o cartão Rever matéria de Matemática A deve estar ativo");
assert.match(mathReview,/Aqui não há perguntas, pontuação nem avaliação/u,"Rever matéria de Matemática A deve ser claramente um modo de estudo");
assert.match(mathReview,/reviewChapter/u,"Rever matéria deve organizar o conteúdo em capítulos legíveis");
assert.doesNotMatch(mathReview,/Responder|startPractice|trainingRun|QUESTION_BANK/u,"Rever matéria de Matemática A não deve iniciar perguntas nem treino");
assert.match(portugueseSubject,/taughtUnitIds/u,"Português deve guardar a matéria dada por obra ou conteúdo, não apenas por domínio");
assert.match(portugueseSubject,/literaryWorkId/u,"perguntas de obras não lecionadas devem ficar fora do âmbito do aluno");
assert.match(portugueseSubject,/Resposta certa: /u,"o feedback de Português deve identificar explicitamente a resposta certa");
assert.match(globalCss,/\.opts button\.selected/u,"a opção escolhida em Matemática deve permanecer visualmente selecionada antes da resposta");
assert.match(globalCss,/\.portugueseProgressCard>\.portugueseMissionGrid\{display:grid\}/u,"o resumo de Português não pode ser comprimido pela regra flex do cartão");
assert.match(page,/normalizeSubjectWorkspace\(base\)/,"legacy saved state must receive a safe active-subject default");
assert.match(page,/normalizeSubjectWorkspaceState/,"saved subject aliases must be normalized through the shared migration");
assert.doesNotMatch(page,/PortugueseLab|portugueseLab/u,"the legacy Portuguese lab route must no longer exist");
assert.equal((page.match(/subjectById\("portuguese"\)/gu)||[]).length,0,"Português must not be injected manually into the subject manager");
assert.match(analytics,/\{id:"subjects_selected",label:"Escolheu disciplinas"\}/);

console.log("✓ subjects: official 2026 catalog, shared semantic workspace, persistent switcher, legacy migration and unavailable subjects guarded");
