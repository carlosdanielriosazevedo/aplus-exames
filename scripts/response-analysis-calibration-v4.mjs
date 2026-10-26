import {OPEN_RESPONSE_WAVE4_CASES} from "../app/data/openResponseCalibrationBankWave4.js";
import {MATH_RESPONSE_WAVE4_CASES} from "../app/data/mathResponseCalibrationBankWave4.js";
import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";

function ratio(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return result.provisionalPoints/result.maxPoints;
  if(Number.isFinite(result?.points)&&Number(result?.maxPoints)>0)return result.points/result.maxPoints;
  return null; // Not graded is NOT a zero-percent grade.
}
function pct(value){return Number.isFinite(value)?Math.round(value*1000)/10+"%":"SEM NOTA"}
function mean(values){const scored=values.filter(Number.isFinite);return scored.length?scored.reduce((sum,value)=>sum+value,0)/scored.length:null}

const openRows=OPEN_RESPONSE_WAVE4_CASES.map(row=>{
  const item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Missing open-response wave 4 item: "+row.subject+"/"+row.itemId);
  const result=row.subject==="portuguese"?gradePortugueseResponse(item,row.response):gradePhysicsChemistryResponse(item,row.response);
  return {...row,result,score:ratio(result)};
});
const mathRows=MATH_RESPONSE_WAVE4_CASES.map(row=>{
  const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
  if(!item)throw new Error("Missing Mathematics wave 4 item: "+row.itemId);
  const result=gradeMathResponse(item,row.answer);
  return {...row,result,score:ratio(result)};
});

const failures=[];
for(const row of [...openRows,...mathRows]){
  // An abstention cannot satisfy the calibration threshold of a correct answer.
  // Keep the gate red rather than pretending the student received zero points.
  if(!Number.isFinite(row.score)){
    failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: SEM NOTA — calibração pedagógica indisponível`);
    continue;
  }
  if(Number.isFinite(row.minScore)&&row.score<row.minScore-.001)failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} < min ${pct(row.minScore)}`);
  if(Number.isFinite(row.maxScore)&&row.score>row.maxScore+.001)failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} > max ${pct(row.maxScore)}`);
  if(row.requiresReview===true&&row.result.requiresReview!==true)failures.push(`${row.subject}/${row.itemId}/${row.profile}: contradictory answer should require review`);
}

const groups={};
for(const row of [...openRows,...mathRows]){
  const key=(row.subject||"mathematics")+"::"+row.profile;
  (groups[key]??=[]).push(row.score);
}
console.log("=== RESPONSE ANALYSIS CALIBRATION V4 ===");
console.log("Wave 4 cases: "+(openRows.length+mathRows.length));
console.log("Total protected cases: "+(220+openRows.length+mathRows.length));
for(const [key,values] of Object.entries(groups))console.log("  "+key.padEnd(46)+" "+pct(mean(values))+" · "+values.length+" cases");

const related=openRows.filter(row=>row.profile==="related-nonanswer");
const hedged=openRows.filter(row=>row.profile==="hedged-correct");
const partialFalse=openRows.filter(row=>row.profile==="partial-then-false");
const localSlip=mathRows.filter(row=>row.profile==="right-method-local-slip");
const falseConclusion=mathRows.filter(row=>row.profile==="correct-work-false-conclusion");

const summary={
  totalProtectedCases:220+openRows.length+mathRows.length,
  wave4Cases:openRows.length+mathRows.length,
  relatedNonAnswerMean:mean(related.map(row=>row.score)),
  hedgedCorrectMean:mean(hedged.map(row=>row.score)),
  partialThenFalseMean:mean(partialFalse.map(row=>row.score)),
  mathLocalSlipMean:mean(localSlip.map(row=>row.score)),
  mathFalseConclusionMean:mean(falseConclusion.map(row=>row.score)),
  failures
};

if(summary.relatedNonAnswerMean>.5)failures.push("related-but-nonanswer mean above 50%");
if(!Number.isFinite(summary.hedgedCorrectMean)||summary.hedgedCorrectMean<.2)failures.push("hedged-correct mean unavailable or below 20%");
if(summary.partialThenFalseMean>.62)failures.push("partial-then-false mean above 62%");
if(summary.mathLocalSlipMean<.2||summary.mathLocalSlipMean>.85)failures.push("Mathematics local-slip mean outside 20%-85%");
if(summary.mathFalseConclusionMean>.85)failures.push("Mathematics false-conclusion mean above 85%");

await import("node:fs").then(({writeFileSync})=>writeFileSync(
  new URL("../response-analysis-calibration-v4.json",import.meta.url),
  JSON.stringify(summary,null,2)
));

if(failures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V4 FAILED ("+failures.length+" issues)");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V4 PASSED");
