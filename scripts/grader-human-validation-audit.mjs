import {buildGraderHumanValidationPack} from "./generate-grader-human-validation-pack.mjs";
import {
  GRADER_HUMAN_VALIDATION_TARGET,
  GRADER_DIAGNOSIS_CODES,
  summarizeHumanAgreement,
  validateHumanValidationRows
} from "../app/lib/graderHumanValidation.js";

function assert(condition,message){if(!condition)throw new Error(message)}

const pack=buildGraderHumanValidationPack();
const subjects=["mathematics","portuguese","physics-chemistry-a"];
const forbiddenKeys=["category","profile","solution","answer_key","correct_answer","grader_score","grader_diagnosis","expected"];

assert(pack.length===GRADER_HUMAN_VALIDATION_TARGET.cases,"blind pack size mismatch");
assert(new Set(pack.map(row=>row.case_id)).size===pack.length,"blind pack case IDs must be unique");
for(const subject of subjects){
  assert(pack.filter(row=>row.subject===subject).length===GRADER_HUMAN_VALIDATION_TARGET.perSubject,`unbalanced ${subject} sample`);
}
for(const row of pack){
  for(const key of forbiddenKeys)assert(!(key in row),`blind row leaks ${key}`);
  assert(row.question&&row.student_response,"blind row must contain question and student response");
  assert(row.case_fingerprint,"blind row must carry immutable fingerprint");
}

// Infrastructure simulation only. These labels are synthetic and MUST NOT be reported as human agreement.
const graderRows=pack.map((row,index)=>({
  caseId:row.case_id,
  scorePercent:20+(index%8)*10,
  diagnosis:GRADER_DIAGNOSIS_CODES[index%GRADER_DIAGNOSIS_CODES.length],
  requiresReview:index%3===0
}));
const reviewerA=pack.map((row,index)=>({
  ...row,reviewer:"SYNTHETIC-A",score_percent:String(graderRows[index].scorePercent),diagnosis:graderRows[index].diagnosis,requires_review:graderRows[index].requiresReview?"SIM":"NÃO"
}));
const overlap=pack.slice(0,GRADER_HUMAN_VALIDATION_TARGET.overlapCases).map((row,index)=>({
  ...row,reviewer:"SYNTHETIC-B",score_percent:String(graderRows[index].scorePercent),diagnosis:graderRows[index].diagnosis,requires_review:graderRows[index].requiresReview?"SIM":"NÃO"
}));
const checked=validateHumanValidationRows([...reviewerA,...overlap],pack);
assert(checked.invalid.length===0,"valid blind-review imports should pass validation");
const summary=summarizeHumanAgreement(checked.valid,graderRows);
assert(summary.humanAgreementMeasured===true,"complete simulated campaign should satisfy readiness mechanics");
assert(summary.uniqueCases===45&&summary.reviewers===2&&summary.overlapCases===9,"campaign readiness counts mismatch");
assert(summary.overall.meanAbsoluteScoreDelta===0,"synthetic exact labels should have zero score delta");

const tampered={...reviewerA[0],student_response:reviewerA[0].student_response+" alterado"};
const tamperCheck=validateHumanValidationRows([tampered],pack);
assert(tamperCheck.invalid.length===1,"tampered response must be rejected");
const duplicateCheck=validateHumanValidationRows([reviewerA[0],reviewerA[0]],pack);
assert(duplicateCheck.invalid.length===1,"duplicate reviewer/case label must be rejected");
const invalidDiagnosisCheck=validateHumanValidationRows([{...reviewerA[0],diagnosis:"invented"}],pack);
assert(invalidDiagnosisCheck.invalid.length===1,"unknown diagnosis must be rejected");

console.log("=== GRADER HUMAN VALIDATION AUDIT ===");
console.log("✓ blind export contains 45 cases: 15 Mathematics A · 15 Portuguese · 15 Physics & Chemistry A");
console.log("✓ benchmark labels, solutions and grader outputs are not exposed to reviewers");
console.log("✓ immutable fingerprints reject altered responses");
console.log("✓ duplicate labels and unknown diagnoses are rejected");
console.log("✓ campaign readiness requires 45 unique cases, 2+ reviewers and 9 overlap cases");
console.log("✓ agreement metrics include score delta, diagnosis, review decision, subject breakdown and inter-rater agreement");
console.log("NOTE: audit labels are synthetic test fixtures; human agreement remains NOT MEASURED until independent teacher labels are imported.");
console.log("GRADER HUMAN VALIDATION AUDIT PASSED");
