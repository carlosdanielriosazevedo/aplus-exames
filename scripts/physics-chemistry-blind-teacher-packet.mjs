import {OPEN_RESPONSE_WAVE4_CASES} from "../app/data/openResponseCalibrationBankWave4.js";
import {OPEN_RESPONSE_WAVE5_CASES} from "../app/data/openResponseCalibrationBankWave5.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";

// A starter pack only: 5 synthetic responses per item. No expected ratings,
// development labels, confidence or shadow flags are visible to the reviewer.
// This does not replace 15 independently adjudicated cases per item.
const inputs=[...OPEN_RESPONSE_WAVE4_CASES,...OPEN_RESPONSE_WAVE5_CASES]
  .filter(row=>row.subject==="physics-chemistry-a");

// Stable, documented shuffle to avoid presenting all mistakes together.
// Not secret randomness and not an audit holdout against the developer.
function stableKey(row){
  const str=row.itemId+"|"+row.response;
  let hash=2166136261;
  for(let i=0;i<str.length;i++)hash=Math.imul(hash^str.charCodeAt(i),16777619);
  return hash>>>0;
}
function csv(values){
  return values.map(value=>'"'+String(value??"").replace(/"/g,'""').replace(/[\r\n]+/gu," ").trim()+'"').join(",");
}
if(inputs.length!==35)throw new Error("Expected 35 synthetic teacher-review examples");
const rows=inputs.slice().sort((a,b)=>stableKey(a)-stableKey(b));
const header=["blind_id","item_id","question","max_points","marking_criteria_reference",
  "synthetic_student_response","human_awarded_points","human_criterion_breakdown",
  "human_rationale","human_confidence","requires_followup"];
console.log(csv(header));
rows.forEach((row,index)=>{
  const item=physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Unknown FQA item "+row.itemId);
  console.log(csv(["FQA-B-"+String(index+1).padStart(3,"0"),item.id,
    item.prompt,item.maxPoints,item.criteria.join(" | "),row.response,"","","","",""]));
});
