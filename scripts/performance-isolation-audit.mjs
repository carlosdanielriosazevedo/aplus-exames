import assert from "node:assert/strict";
import fs from "node:fs";

const page=fs.readFileSync("app/page.js","utf8");
const portugueseMini=fs.readFileSync("app/components/PortuguesePassageMiniExam.js","utf8");

for(const name of ["PhysicsChemistrySubject","PhysicsChemistryExam","PhysicsChemistryMiniExam"]){
  assert.doesNotMatch(
    page,
    new RegExp(`^import\\s+${name}\\s+from\\s+["']\\./components/${name}["'];?`,"m"),
    `${name} must not be statically imported by app/page.js`
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

console.log("✓ performance isolation: FQ A stays lazy on / and Portuguese mini-exam stays detached from the full content prototype");
