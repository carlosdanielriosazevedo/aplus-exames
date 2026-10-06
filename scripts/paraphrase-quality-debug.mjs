import {OPEN_RESPONSE_CALIBRATION_CASES,portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {applyPortugueseRubricObservations} from "../app/data/portugueseRubrics.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

const targets=new Set([
  "portuguese::PT639-FND-311","portuguese::PT639-FND-317","portuguese::PT639-FND-322",
  "physics-chemistry-a::FQA-R-ELEM-01","physics-chemistry-a::FQA-R-ENE-01","physics-chemistry-a::FQA-R-MEC-01","physics-chemistry-a::FQA-R-EQ-01","physics-chemistry-a::FQA-R-AQ-01"
]);
function grade(row){
  let item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
  if(row.subject==="portuguese")item=applyPortugueseRubricObservations([item])[0];
  return row.subject==="portuguese"?gradePortugueseResponse(item,row.response):gradePhysicsChemistryResponse(item,row.response);
}
for(const row of OPEN_RESPONSE_CALIBRATION_CASES.filter(row=>targets.has(`${row.subject}::${row.itemId}`)&&["excellent","paraphrase"].includes(row.category))){
  const result=grade(row);
  console.log(`\n=== ${row.subject} ${row.itemId} ${row.category} :: ${result.provisionalPoints}/${result.maxPoints} ===`);
  for(const criterion of result.criteria||[]){
    console.log(JSON.stringify({
      id:criterion.id,label:criterion.label,status:criterion.status,scoreRatio:criterion.scoreRatio,
      semanticScore:criterion.semanticScore,relationScore:criterion.relationScore,matchedCount:criterion.matchedCount,
      matched:criterion.matched,awardedPoints:criterion.awardedPoints,maxPoints:criterion.maxPoints,
      observations:(criterion.observations||[]).map(o=>({id:o.id,label:o.label,status:o.status,scoreRatio:o.scoreRatio,semanticScore:o.semanticScore,relationScore:o.relationScore,matchedCount:o.matchedCount,matched:o.matched}))
    }));
  }
}
