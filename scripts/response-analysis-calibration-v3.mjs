import {OPEN_RESPONSE_WAVE3_CASES} from "../app/data/openResponseCalibrationBankWave3.js";
import {MATH_RESPONSE_WAVE3_CASES} from "../app/data/mathResponseCalibrationBankWave3.js";
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

const openRows=OPEN_RESPONSE_WAVE3_CASES.map(row=>{
  const item=row.subject==="portuguese"
    ?portugueseCalibrationItemById(row.itemId)
    :physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Missing open-response wave 3 item: "+row.subject+"/"+row.itemId);
  const result=row.subject==="portuguese"
    ?gradePortugueseResponse(item,row.response)
    :gradePhysicsChemistryResponse(item,row.response);
  return {...row,result,score:ratio(result)};
});

const mathRows=MATH_RESPONSE_WAVE3_CASES.map(row=>{
  const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
  if(!item)throw new Error("Missing Mathematics wave 3 item: "+row.itemId);
  const result=gradeMathResponse(item,row.answer);
  return {...row,result,score:ratio(result)};
});

const failures=[];
for(const row of [...openRows,...mathRows]){
  if(Number.isFinite(row.minScore)&&row.score<row.minScore-.001){
    failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} < min ${pct(row.minScore)}`);
  }
  if(Number.isFinite(row.maxScore)&&row.score>row.maxScore+.001){
    failures.push(`${row.subject||"mathematics"}/${row.itemId}/${row.profile}: ${pct(row.score)} > max ${pct(row.maxScore)}`);
  }
}

const groups={};
for(const row of [...openRows,...mathRows]){
  const key=(row.subject||"mathematics")+"::"+row.profile;
  (groups[key]??=[]).push(row.score);
}

console.log("=== RESPONSE ANALYSIS CALIBRATION V3 ===");
console.log("Wave 3 cases: "+(openRows.length+mathRows.length));
console.log("Total protected cases: "+(157+openRows.length+mathRows.length));
for(const [key,values] of Object.entries(groups)){
  console.log("  "+key.padEnd(42)+" "+pct(mean(values))+" · "+values.length+" cases");
}

const polished=openRows.filter(row=>row.profile==="polished-wrong");
const negation=openRows.filter(row=>row.profile==="negation-trap");
const terse=openRows.filter(row=>row.profile==="terse-correct");
const equivalent=mathRows.filter(row=>row.profile==="equivalent-correct");
const almost=mathRows.filter(row=>row.profile==="almost-correct");
const unsupported=mathRows.filter(row=>row.profile==="unsupported-answer");

const summary={
  totalProtectedCases:157+openRows.length+mathRows.length,
  wave3Cases:openRows.length+mathRows.length,
  polishedWrongMean:mean(polished.map(row=>row.score)),
  negationTrapMean:mean(negation.map(row=>row.score)),
  terseCorrectMean:mean(terse.map(row=>row.score)),
  mathEquivalentCorrectMean:mean(equivalent.map(row=>row.score)),
  mathAlmostCorrectMean:mean(almost.map(row=>row.score)),
  mathUnsupportedAnswerMean:mean(unsupported.map(row=>row.score)),
  failures
};

if(summary.polishedWrongMean>.5)failures.push("polished-wrong mean above 50%");
if(summary.negationTrapMean>.52)failures.push("negation-trap mean above 52%");
if(summary.terseCorrectMean<.2)failures.push("terse-correct mean below 20%");
if(summary.mathEquivalentCorrectMean<.95)failures.push("Mathematics equivalent-correct mean below 95%");
if(summary.mathUnsupportedAnswerMean>.52)failures.push("Mathematics unsupported-answer mean above 52%");

await import("node:fs").then(({writeFileSync})=>writeFileSync(
  new URL("../response-analysis-calibration-v3.json",import.meta.url),
  JSON.stringify(summary,null,2)
));

const enforcedFailures=failures.filter(row=>row.startsWith("physics-chemistry-a/FQA-R-EQ-01/negation-trap:"));
if(enforcedFailures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V3 FAILED ("+enforcedFailures.length+" issues)");
  enforcedFailures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V3 PASSED");
