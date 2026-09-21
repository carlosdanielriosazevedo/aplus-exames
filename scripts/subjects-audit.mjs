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
const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const analytics=readFileSync(new URL("../app/lib/productAnalytics.js",import.meta.url),"utf8");
assert.match(page,/if\(screen==="subjectOnboard"\)/);
assert.match(page,/if\(screen==="subjectManager"\)/,"the persistent subject manager must have a guarded route");
assert.match(page,/if\(preview==="subjects"\)/);
assert.match(welcome,/segment === "parent" \? "parent" : "subjectOnboard"/);
assert.match(page,/disabled=\{!subject\.available\}/);
assert.match(page,/Continuar com Matemática A/);
assert.match(page,/className="subjectSwitcher"/,"the student header must expose the active subject switcher");
assert.match(page,/const subjectHomeScreen=id=>id==="portuguese"\?"portugueseLab":"home"/,"subject switching must route Portuguese to its dedicated lab");
assert.match(page,/go\(subjectHomeScreen\(subject\.id\)\)/,"switching subjects must open the matching workspace");
assert.match(page,/onClick=\{\(\)=>go\(subjectHomeScreen\(active\.id\)\)\}/,"the current-subject card must not send Portuguese back to the Math-only home");
assert.match(page,/normalizeSubjectWorkspace\(base\)/,"legacy saved state must receive a safe active-subject default");
assert.match(page,/recoveredState\.activeSubjectId==="portuguese"/,"a saved Portuguese workspace must reopen in the Portuguese lab after reload");
assert.match(page,/setScreen\("portugueseLab"\)/,"saved Portuguese state must not fall through to the Math-only home");
assert.match(page,/Português continua fora do plano normal/,"Portuguese remains explicitly identified as beta outside the normal academic plan");
assert.match(analytics,/\{id:"subjects_selected",label:"Escolheu disciplinas"\}/);

console.log("✓ subjects: official 2026 catalog, persistent switcher, legacy migration and unavailable subjects guarded");
