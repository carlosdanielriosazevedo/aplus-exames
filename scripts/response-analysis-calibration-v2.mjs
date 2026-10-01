import {OPEN_RESPONSE_ADVERSARIAL_CASES} from "../app/data/openResponseCalibrationBankWave2.js";
import {MATH_RESPONSE_CALIBRATION_CASES} from "../app/data/mathResponseCalibrationBank.js";
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
function round(value){return Math.round(value*100)/100}
function pct(value){return Math.round(value*1000)/10+"%"}
function mean(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}

const openRows=OPEN_RESPONSE_ADVERSARIAL_CASES.map(row=>{
  const item=row.subject==="portuguese"
    ?portugueseCalibrationItemById(row.itemId)
    :physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error("Missing open calibration item: "+row.subject+"/"+row.itemId);
  const result=row.subject==="portuguese"
    ?gradePortugueseResponse(item,row.response)
    :gradePhysicsChemistryResponse(item,row.response);
  return {...row,result,score:ratio(result)};
});

const mathRows=MATH_RESPONSE_CALIBRATION_CASES.map(row=>{
  const item=CONSTRUCTED_RESPONSE_BANK.find(candidate=>candidate.id===row.itemId);
  if(!item)throw new Error("Missing Mathematics calibration item: "+row.itemId);
  const result=gradeMathResponse(item,row.answer);
  return {...row,result,score:ratio(result)};
});

const failures=[];
for(const row of openRows){
  if(Number.isFinite(row.maxScore)&&row.score>row.maxScore+.001){
    failures.push(`${row.subject}/${row.itemId}/${row.profile}: ${pct(row.score)} > max ${pct(row.maxScore)}`);
  }
  if(Number.isFinite(row.minScore)&&row.score<row.minScore-.001){
    failures.push(`${row.subject}/${row.itemId}/${row.profile}: ${pct(row.score)} < min ${pct(row.minScore)}`);
  }
  if(row.requiresReview===true&&row.result.requiresReview!==true){
    failures.push(`${row.subject}/${row.itemId}/${row.profile}: contradiction/ambiguity should require review`);
  }
}
for(const row of mathRows){
  if(Number.isFinite(row.maxScore)&&row.score>row.maxScore+.001){
    failures.push(`mathematics/${row.itemId}/${row.profile}: ${pct(row.score)} > max ${pct(row.maxScore)}`);
  }
  if(Number.isFinite(row.minScore)&&row.score<row.minScore-.001){
    failures.push(`mathematics/${row.itemId}/${row.profile}: ${pct(row.score)} < min ${pct(row.minScore)}`);
  }
}

const openByProfile={};
for(const profile of [...new Set(openRows.map(row=>row.profile))]){
  const rows=openRows.filter(row=>row.profile===profile);
  openByProfile[profile]={count:rows.length,mean:round(mean(rows.map(row=>row.score)))};
}
const mathByProfile={};
for(const profile of [...new Set(mathRows.map(row=>row.profile))]){
  const rows=mathRows.filter(row=>row.profile===profile);
  mathByProfile[profile]={count:rows.length,mean:round(mean(rows.map(row=>row.score)))};
}

const totalCases=65+openRows.length+mathRows.length;
console.log("=== RESPONSE ANALYSIS CALIBRATION V2 ===");
console.log("Total protected cases (including wave 1): "+totalCases);
console.log("\nOpen-response adversarial profiles:");
Object.entries(openByProfile).forEach(([profile,row])=>console.log("  "+profile.padEnd(20)+" "+pct(row.mean)+" · "+row.count+" cases"));
console.log("\nMathematics A constructed-response profiles:");
Object.entries(mathByProfile).forEach(([profile,row])=>console.log("  "+profile.padEnd(20)+" "+pct(row.mean)+" · "+row.count+" cases"));

const report={
  totalProtectedCases:totalCases,
  wave2OpenCases:openRows.length,
  mathematicsCases:mathRows.length,
  openByProfile,
  mathByProfile,
  failures,
  worstOpenViolations:openRows
    .filter(row=>(Number.isFinite(row.maxScore)&&row.score>row.maxScore)||(Number.isFinite(row.minScore)&&row.score<row.minScore)||(row.requiresReview===true&&row.result.requiresReview!==true))
    .map(row=>({subject:row.subject,itemId:row.itemId,profile:row.profile,score:round(row.score),review:!!row.result.requiresReview})),
  worstMathViolations:mathRows
    .filter(row=>(Number.isFinite(row.maxScore)&&row.score>row.maxScore)||(Number.isFinite(row.minScore)&&row.score<row.minScore))
    .map(row=>({itemId:row.itemId,profile:row.profile,score:round(row.score),status:row.result.status,review:!!row.result.reviewRequired}))
};
await import("node:fs").then(({writeFileSync})=>writeFileSync(new URL("../response-analysis-calibration-v2.json",import.meta.url),JSON.stringify(report,null,2)));

if(failures.length){
  console.error("\nRESPONSE ANALYSIS CALIBRATION V2 FAILED ("+failures.length+" issues)");
  failures.slice(0,40).forEach(row=>console.error("✗ "+row));
  if(failures.length>40)console.error("… "+(failures.length-40)+" more");
  process.exit(1);
}
console.log("\nRESPONSE ANALYSIS CALIBRATION V2 PASSED");
