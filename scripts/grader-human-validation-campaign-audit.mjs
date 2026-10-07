import {buildHumanValidationCampaign} from "./generate-grader-human-validation-campaign.mjs";
import {currentGraderRowsForHumanValidation} from "./report-grader-human-validation.mjs";
import {GRADER_HUMAN_VALIDATION_TARGET} from "../app/lib/graderHumanValidation.js";

function assert(condition,message){if(!condition)throw new Error(message)}

const campaign=buildHumanValidationCampaign();
const subjects=["mathematics","portuguese","physics-chemistry-a"];
const forbiddenKeys=["category","profile","solution","answer_key","correct_answer","grader_score","grader_diagnosis","expected","grader_snapshot"];

assert(campaign.pack.length===45,"campaign must preserve the 45-case blind pack");
for(const subject of subjects){
  const primary=campaign.primary[subject];
  const overlap=campaign.overlap[subject];
  assert(primary.length===GRADER_HUMAN_VALIDATION_TARGET.perSubject,`primary ${subject} pack must contain 15 cases`);
  assert(overlap.length===3,`overlap ${subject} pack must contain 3 cases`);
  assert(overlap.every(row=>primary.some(candidate=>candidate.case_id===row.case_id)),`overlap ${subject} cases must also exist in primary pack`);
}
assert(campaign.overlapRows.length===GRADER_HUMAN_VALIDATION_TARGET.overlapCases,"global overlap must contain 9 cases");
assert(new Set(campaign.overlapRows.map(row=>row.case_id)).size===campaign.overlapRows.length,"overlap cases must be unique");

for(const row of [...campaign.pack,...campaign.overlapRows]){
  for(const key of forbiddenKeys)assert(!(key in row),`blind campaign leaks ${key}`);
  assert(row.reviewer===""&&row.score_percent===""&&row.diagnosis===""&&row.requires_review==="","review fields must start blank");
  assert(row.case_fingerprint,"each case must preserve immutable fingerprint");
}

const graderRows=currentGraderRowsForHumanValidation();
const packIds=new Set(campaign.pack.map(row=>row.case_id));
const graderIds=new Set(graderRows.map(row=>row.caseId));
assert(graderRows.length===45,"runtime grader comparison must contain exactly 45 cases");
assert(graderIds.size===45,"runtime grader comparison IDs must be unique");
assert([...packIds].every(id=>graderIds.has(id))&&[...graderIds].every(id=>packIds.has(id)),"blind pack and runtime grader comparison must refer to the exact same 45 cases");
assert(graderRows.every(row=>Number.isFinite(row.scorePercent)&&row.scorePercent>=0&&row.scorePercent<=100),"runtime grader scores must stay in 0–100");

console.log("=== GRADER HUMAN VALIDATION CAMPAIGN AUDIT ===");
console.log("✓ 45 primary cases split by subject: 15 Mathematics A · 15 Portuguese · 15 Physics & Chemistry A");
console.log("✓ 9 deterministic overlap cases: 3 per subject");
console.log("✓ reviewer labels start blank and grader outputs remain hidden");
console.log("✓ overlap cases preserve the same immutable fingerprints as their primary copies");
console.log("✓ report engine re-runs the current grader on the exact same 45 immutable cases");
console.log("NOTE: this audit validates campaign mechanics only; human agreement remains NOT MEASURED until independent reviewer labels are imported.");
console.log("GRADER HUMAN VALIDATION CAMPAIGN: GO");
