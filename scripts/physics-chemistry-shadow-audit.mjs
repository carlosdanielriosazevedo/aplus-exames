import {OPEN_RESPONSE_WAVE4_CASES} from "../app/data/openResponseCalibrationBankWave4.js";
import {OPEN_RESPONSE_WAVE5_CASES} from "../app/data/openResponseCalibrationBankWave5.js";
import {FQA_SHADOW_RESEARCH_WAVE2} from "../app/data/fqaShadowResearchWave2.js";
import {SHADOW_FQA_ITEM_IDS,inspectScientificRelations} from "./lib/physicsChemistryShadowRelations.mjs";

// Diagnostic evidence only: NEVER used for marks, progression or release GO.
// Teachers have not adjudicated these examples independently.
const cases=[...OPEN_RESPONSE_WAVE4_CASES,...OPEN_RESPONSE_WAVE5_CASES]
  .filter(row=>row.subject==="physics-chemistry-a");
const counts={};
for(const id of SHADOW_FQA_ITEM_IDS){
  const sample=cases.filter(row=>row.itemId===id);
  const outcomes=sample.map(row=>({...row,shadow:inspectScientificRelations(id,row.response)}));
  counts[id]={
    total:outcomes.length,
    contradictionSignals:outcomes.filter(x=>x.shadow.contradictions.length).length,
    relationCandidates:outcomes.filter(x=>x.shadow.status==="candidate-relations").length,
    insufficient:outcomes.filter(x=>x.shadow.status==="insufficient-evidence").length,
    corrected:outcomes.filter(x=>x.shadow.corrected).length
  };
}
const byProfile={};
for(const row of cases){
  const key=row.profile;
  const outcome=inspectScientificRelations(row.itemId,row.response);
  const count=byProfile[key]??={total:0,contradictionSignals:0,relationCandidates:0,insufficient:0};
  count.total++;
  if(outcome.contradictions.length)count.contradictionSignals++;
  if(outcome.status==="candidate-relations")count.relationCandidates++;
  if(outcome.status==="insufficient-evidence")count.insufficient++;
}
if(cases.length!==35||Object.keys(counts).length!==7)throw Error("Calibration fixture coverage changed");
if(cases.some(row=>inspectScientificRelations(row.itemId,row.response).scoringAuthorized!==false))
  throw Error("Shadow MUST NEVER authorize scientific scoring");
console.log("=== FQ A SHADOW SCIENTIFIC RELATIONS — RESEARCH ONLY ===");
console.log("Fixture cases:",cases.length,"· rubric items:",SHADOW_FQA_ITEM_IDS.length);
console.table(counts);
console.table(byProfile);
console.log("No numeric grades. No pedagogical GO; professor adjudication and adversarial calibration still required.");

console.log("\n=== FQ A SHADOW RESEARCH WAVE 2 (DEVELOPER-AUTHORED, NOT INDEPENDENT) ===");
const wave2Profiles={};
let unsafeCandidates=0;
for(const row of FQA_SHADOW_RESEARCH_WAVE2){
  const out=inspectScientificRelations(row.itemId,row.response);
  const tally=wave2Profiles[row.profile]??={total:0,candidate:0,contradiction:0,instruction:0,insufficient:0};
  tally.total+=1;
  tally.candidate+=out.status==="candidate-relations"?1:0;
  tally.contradiction+=out.status==="contradiction-signals"?1:0;
  tally.instruction+=out.status==="instruction-attempt"?1:0;
  tally.insufficient+=out.status==="insufficient-evidence"?1:0;
  if(["contradiction","negation","keyword-soup","injection","partial","irrelevant"].includes(row.profile)&&out.status==="candidate-relations")unsafeCandidates++;
  if(out.scoringAuthorized!==false||out.score!==null||out.points!==null)throw Error("SHADOW POINTS MUST BE NULL");
}
if(FQA_SHADOW_RESEARCH_WAVE2.length!==70||unsafeCandidates!==0)
  throw Error("Synthetic safety regressions: "+unsafeCandidates+" unsafe candidate(s)");
console.table(wave2Profiles);
console.log("This research set is developer-authored; it is not a fresh, human-adjudicated holdout.");
