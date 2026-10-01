import {OPEN_RESPONSE_CALIBRATION_CASES,CALIBRATION_CATEGORY_ORDER} from "../app/data/openResponseCalibrationBank.js";
import {portugueseItemById} from "../app/data/portugueseContent.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";

function itemFor(row){
  return row.subject==="portuguese"?portugueseItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
}
function grade(row){
  const item=itemFor(row);
  if(!item)throw new Error("Calibration item not found: "+row.subject+"/"+row.itemId);
  const result=row.subject==="portuguese"
    ?gradePortugueseResponse(item,row.response)
    :gradePhysicsChemistryResponse(item,row.response);
  const score=Number.isFinite(result.provisionalPoints)&&Number(result.maxPoints)>0
    ?result.provisionalPoints/result.maxPoints
    :Number.isFinite(result.points)&&Number(result.maxPoints)>0
      ?result.points/result.maxPoints
      :0;
  return {...row,result,score:Math.max(0,Math.min(1,score))};
}
function mean(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function pct(value){return Math.round(value*1000)/10+"%"}
function fixed(value){return Math.round(value*100)/100}

const rows=OPEN_RESPONSE_CALIBRATION_CASES.map(grade);
const groups=new Map();
for(const row of rows){
  const key=row.subject+"::"+row.itemId;
  const list=groups.get(key)||[];
  list.push(row); groups.set(key,list);
}

const expectedPerItem=5;
const malformed=[...groups.entries()].filter(([,list])=>list.length!==expectedPerItem||new Set(list.map(row=>row.category)).size!==expectedPerItem);
const summaries={};
for(const subject of ["portuguese","physics-chemistry-a"]){
  summaries[subject]={};
  for(const category of CALIBRATION_CATEGORY_ORDER){
    const values=rows.filter(row=>row.subject===subject&&row.category===category).map(row=>row.score);
    summaries[subject][category]={mean:mean(values),count:values.length};
  }
}

let strongVsWrongPass=0;
let strongVsVaguePass=0;
let paraphraseRecognition=0;
let excellentRecognition=0;
let wrongInflation=0;
let vagueInflation=0;
let orderingViolations=0;
let totalItems=0;

for(const [key,list] of groups){
  totalItems++;
  const by=Object.fromEntries(list.map(row=>[row.category,row]));
  const strong=Math.max(by.excellent.score,by.paraphrase.score);
  if(strong-by.wrong.score>=.18)strongVsWrongPass++;
  if(strong-by.vague.score>=.12)strongVsVaguePass++;
  if(by.paraphrase.score>=.28)paraphraseRecognition++;
  if(by.excellent.score>=.35)excellentRecognition++;
  if(by.wrong.score>=.62)wrongInflation++;
  if(by.vague.score>=.68)vagueInflation++;

  const ordered=CALIBRATION_CATEGORY_ORDER.map(category=>by[category].score);
  for(let i=1;i<ordered.length;i++){
    if(ordered[i]+.12<ordered[i-1])orderingViolations++;
  }

  console.log("\n"+key);
  for(const category of [...CALIBRATION_CATEGORY_ORDER].reverse()){
    const row=by[category];
    console.log("  "+category.padEnd(10)+" "+pct(row.score).padStart(7)+" · confidence "+String(row.result.autoAssessmentConfidence??"—")+" · "+(row.result.requiresReview?"review":"ok"));
  }
}

console.log("\n=== CATEGORY MEANS ===");
for(const [subject,summary] of Object.entries(summaries)){
  console.log(subject);
  for(const category of CALIBRATION_CATEGORY_ORDER){
    console.log("  "+category.padEnd(10)+" "+pct(summary[category].mean)+" ("+summary[category].count+")");
  }
}

const metrics={
  cases:rows.length,
  items:totalItems,
  strongVsWrongRate:strongVsWrongPass/totalItems,
  strongVsVagueRate:strongVsVaguePass/totalItems,
  paraphraseRecognitionRate:paraphraseRecognition/totalItems,
  excellentRecognitionRate:excellentRecognition/totalItems,
  wrongInflationRate:wrongInflation/totalItems,
  vagueInflationRate:vagueInflation/totalItems,
  orderingViolations
};
console.log("\n=== CALIBRATION METRICS ===");
Object.entries(metrics).forEach(([key,value])=>console.log(key+": "+(typeof value==="number"&&value<=1?pct(value):value)));

const failures=[];
if(OPEN_RESPONSE_CALIBRATION_CASES.length<60)failures.push("bank must contain at least 60 simulated responses");
if(malformed.length)failures.push("every item must have exactly five distinct categories");
if(metrics.strongVsWrongRate<.8)failures.push("strong-vs-wrong separation below 80%");
if(metrics.strongVsVagueRate<.7)failures.push("strong-vs-vague separation below 70%");
if(metrics.paraphraseRecognitionRate<.75)failures.push("paraphrase recognition below 75%");
if(metrics.excellentRecognitionRate<.85)failures.push("excellent-answer recognition below 85%");
if(metrics.wrongInflationRate>.2)failures.push("wrong-answer inflation above 20%");
if(metrics.vagueInflationRate>.3)failures.push("vague-answer inflation above 30%");
if(metrics.orderingViolations>Math.ceil(totalItems*.35))failures.push("too many category-order inversions");

const eqRows=rows.filter(row=>row.itemId==="FQA-R-EQ-01");
const eqWrong=eqRows.find(row=>row.category==="wrong");
const eqExcellent=eqRows.find(row=>row.category==="excellent");
if(!eqWrong?.result?.requiresReview)failures.push("equilibrium contradiction must require review");
if((eqWrong?.score??1)>=(eqExcellent?.score??0))failures.push("equilibrium contradiction must score below excellent answer");

if(failures.length){
  console.error("\nOPEN-RESPONSE CALIBRATION FAILED");
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}

console.log("\nOPEN-RESPONSE CALIBRATION PASSED");
console.log("Bank: "+rows.length+" responses across "+totalItems+" items.");
