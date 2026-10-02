import {OPEN_RESPONSE_WAVE5_CASES} from "../app/data/openResponseCalibrationBankWave5.js";
import {MATH_RESPONSE_WAVE5_CASES} from "../app/data/mathResponseCalibrationBankWave5.js";
import {portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";

function ratio(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return result.provisionalPoints/result.maxPoints;
  if(Number.isFinite(result?.points)&&Number(result?.maxPoints)>0)return result.points/result.maxPoints;
  return 0;
}
function pct(value){return Math.round(value*1000)/10+"%"}
function mean(values){return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:0}

const openRows=OPEN_RESPONSE_WAVE5_CASES.map(row=>{
  const item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Missing wave 5 item: "+row.subject+"/"+row.itemId);
  const result=row.subject==="portuguese"?gradePortugueseResponse(item,row.response):gradePhysicsChemistryResponse(item,row.response);
  return {...row,result,score:ratio(result)};
});
const mathRows=MATH_RESPONSE_WAVE5_CASES.map(row=>{
  const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
  if(!item)throw new Error("Missing Mathematics wave 5 item: "+row.itemId);
  const result=gradeMathResponse(item,row.answer);
  return {...row,result,score:ratio(result)};
});

const failures=[];
for(const row of [...openRows,...mathRows]){
  if(Number.isFinite(row.minScore)&&row.score<row.minScore-.001)failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} < min ${pct(row.minScore)}`);
  if(Number.isFinite(row.maxScore)&&row.score>row.maxScore+.001)failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} > max ${pct(row.maxScore)}`);
}

const groups={};
for(const row of [...openRows,...mathRows]){
  const key=(row.subject||"mathematics")+"::"+row.profile;
  (groups[key]??=[]).push(row.score);
}

console.log("=== RESPONSE ANALYSIS CALIBRATION V5 ===");
console.log("Wave 5 cases: "+(openRows.length+mathRows.length));
console.log("Total protected cases: "+(279+openRows.length+mathRows.length));
for(const [key,values] of Object.entries(groups))console.log("  "+key.padEnd(46)+" "+pct(mean(values))+" · "+values.length+" cases");

const selfCorrected=openRows.filter(row=>row.profile==="self-corrected");
const shorthand=openRows.filter(row=>row.profile==="student-shorthand");
const mathSelf=mathRows.filter(row=>row.profile==="self-corrected-step");
const mathEquivalent=mathRows.filter(row=>row.profile==="equivalent-notation");

const summary={
  totalProtectedCases:279+openRows.length+mathRows.length,
  wave5Cases:openRows.length+mathRows.length,
  selfCorrectedMean:mean(selfCorrected.map(row=>row.score)),
  studentShorthandMean:mean(shorthand.map(row=>row.score)),
  mathSelfCorrectedMean:mean(mathSelf.map(row=>row.score)),
  mathEquivalentNotationMean:mean(mathEquivalent.map(row=>row.score)),
  failures
};

if(summary.selfCorrectedMean<.2)failures.push("self-corrected open responses mean below 20%");
if(summary.studentShorthandMean<.18)failures.push("student-shorthand mean below 18%");
if(summary.mathSelfCorrectedMean<.7)failures.push("Mathematics self-corrected mean below 70%");
if(summary.mathEquivalentNotationMean<.9)failures.push("Mathematics equivalent-notation mean below 90%");

await import("node:fs").then(({writeFileSync})=>writeFileSync(
  new URL("../response-analysis-calibration-v5.json",import.meta.url),
  JSON.stringify(summary,null,2)
));

if(failures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V5 FAILED ("+failures.length+" issues)");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V5 PASSED");
