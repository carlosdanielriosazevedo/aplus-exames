import assert from "node:assert/strict";
import fs from "node:fs";

const bootstrap=fs.readFileSync("app/page.js","utf8");
const page=fs.readFileSync("app/clientApp.js","utf8");
const portugueseMini=fs.readFileSync("app/components/PortuguesePassageMiniExam.js","utf8");

assert.match(bootstrap,/dynamic\(\(\)=>import\("\.\/clientApp"\)/,"Home bootstrap must defer the full study client behind dynamic import()");
assert.doesNotMatch(bootstrap,/from\s+["']\.\/data\/content["']/,"Home bootstrap must not pull Mathematics content into the first-visit bundle");
assert.doesNotMatch(bootstrap,/from\s+["']\.\/lib\/engine["']/,"Home bootstrap must not pull the Mathematics engine into the first-visit bundle");

assert.doesNotMatch(page,/^import\s+\{[\s\S]*?\}\s+from\s+["\']\.\/lib\/engine["\'];?/m,"Mathematics engine must not be statically imported by app/clientApp.js");
assert.match(page,/import\("\.\/lib\/engine"\)/,"Mathematics engine must remain behind dynamic import()");

assert.doesNotMatch(
  page,
  /^import\s+\{[\s\S]*?\}\s+from\s+["']\.\/lib\/diagnosticRecovery["'];?/m,
  "Diagnostic recovery must not statically re-import the Mathematics engine into app/clientApp.js."
);
assert.match(
  page,
  /import\("\.\/lib\/diagnosticRecovery"\)/,
  "Diagnostic recovery must remain behind dynamic import()."
);

assert.doesNotMatch(
  page,
  /^import\s+\{[\s\S]*?\}\s+from\s+["']\.\/lib\/constructedResponse["'];?/m,
  "Constructed-response grading must not be statically imported by app/clientApp.js."
);
assert.match(
  page,
  /import\("\.\/lib\/constructedResponse"\)/,
  "Constructed-response grading must remain behind dynamic import()."
);
assert.match(
  page,
  /from\s+["']\.\/lib\/constructedResponseView["'];?/,
  "Study client must use the lightweight constructed-response view helpers."
);

for(const name of ["PhysicsChemistrySubject","PhysicsChemistryExam","PhysicsChemistryMiniExam"]){
  assert.doesNotMatch(
    page,
    new RegExp(`^import\\s+${name}\\s+from\\s+["']\\./components/${name}["'];?`,"m"),
    `${name} must not be statically imported by app/clientApp.js`
  );
  assert.match(
    page,
    new RegExp(`const\\s+${name}=dynamic\\(\\(\\)=>import\\(["']\\./components/${name}["']\\),\\{ssr:false\\}\\);`),
    `${name} must remain isolated behind next/dynamic`
  );
}

assert.doesNotMatch(
  portugueseMini,
  /from\s+["']\.\.\/data\/portuguesePassagePrototype["']/,
  "Portuguese mini-exam must not import the heavy passage prototype module."
);
assert.match(
  portugueseMini,
  /from\s+["']\.\.\/lib\/portugueseFullExamClassification["']/,
  "Portuguese mini-exam must use the lightweight full-exam classifier."
);

console.log("✓ performance isolation: first-visit bootstrap stays light; heavy Math grading and FQ A remain deferred; Portuguese mini-exam stays detached from the full content prototype");
