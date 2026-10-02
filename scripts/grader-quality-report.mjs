import {OPEN_RESPONSE_CALIBRATION_CASES,portugueseCalibrationItemById} from "../app/data/openResponseCalibrationBank.js";
import {physicsChemistryConstructedItemById} from "../app/data/physicsChemistryConstructed.js";
import {gradePortugueseResponse} from "../app/lib/portugueseEngine.js";
import {gradePhysicsChemistryResponse} from "../app/lib/physicsChemistryEngine.js";
import {gradeResponse as gradeMathResponse} from "../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../app/lib/constructedResponseBank.js";
import {writeFileSync} from "node:fs";

function scoreRatio(result){
  if(Number.isFinite(result?.provisionalPoints)&&Number(result?.maxPoints)>0)return result.provisionalPoints/result.maxPoints;
  if(Number.isFinite(result?.points)&&Number(result?.maxPoints)>0)return result.points/result.maxPoints;
  return 0;
}
function diagnosis(result){return result?.feedbackSummary?.errorDiagnosis||result?.errorDiagnosis||null}
function contradiction(result){return diagnosis(result)?.code==="conceptual_contradiction"||!!result?.contradictionDetected}
function review(result){return !!result?.requiresReview||result?.status==="needs_review"}
function pct(value){return Math.round(value*1000)/10}
function mean(values){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function gradeOpen(row){
  const item=row.subject==="portuguese"?portugueseCalibrationItemById(row.itemId):physicsChemistryConstructedItemById(row.itemId);
  if(!item)throw new Error(`Missing benchmark item ${row.subject}/${row.itemId}`);
  return row.subject==="portuguese"?gradePortugueseResponse(item,row.response):gradePhysicsChemistryResponse(item,row.response);
}

const rows=OPEN_RESPONSE_CALIBRATION_CASES.map(row=>{
  const result=gradeOpen(row);
  return {...row,result,score:scoreRatio(result),review:review(result),diagnosis:diagnosis(result)?.code||null,contradiction:contradiction(result)};
});

const strong=rows.filter(row=>["excellent","paraphrase"].includes(row.category));
const partial=rows.filter(row=>row.category==="partial");
const vague=rows.filter(row=>row.category==="vague");
const wrong=rows.filter(row=>row.category==="wrong");

// Conservative policy metrics. These are benchmark labels, not teacher-agreement measurements.
const strongUndercredited=strong.filter(row=>row.score<.35&&!row.review);
const wrongOvercredited=wrong.filter(row=>row.score>.35&&!row.review&&!row.contradiction);
const partialExtremes=partial.filter(row=>row.score<.12||row.score>.82);
const vagueOvercredited=vague.filter(row=>row.score>.65&&!row.review);
const reviewRate=rows.filter(row=>row.review).length/rows.length;

const pairGroups=new Map();
for(const row of rows.filter(row=>["excellent","paraphrase"].includes(row.category))){
  const key=`${row.subject}::${row.itemId}`;
  if(!pairGroups.has(key))pairGroups.set(key,{});
  pairGroups.get(key)[row.category]=row;
}
const paraphrasePairs=[...pairGroups.entries()].flatMap(([key,pair])=>pair.excellent&&pair.paraphrase?[{
  key,
  subject:pair.excellent.subject,
  itemId:pair.excellent.itemId,
  delta:Math.abs(pair.excellent.score-pair.paraphrase.score),
  excellent:pair.excellent.score,
  paraphrase:pair.paraphrase.score,
  excellentReview:pair.excellent.review,
  paraphraseReview:pair.paraphrase.review,
  excellentDiagnosis:pair.excellent.diagnosis,
  paraphraseDiagnosis:pair.paraphrase.diagnosis
}]:[]);
const unstableParaphrases=paraphrasePairs.filter(row=>row.delta>.22);

const diagnosticCases=[
  {subject:"portuguese",itemId:"PT639-FND-315",expected:"conceptual_contradiction",response:"«Esta iniciativa» retoma a horta, mas «por isso» introduz contraste e não consequência."},
  {subject:"portuguese",itemId:"PT639-FND-315",expected:"ambiguous_answer",response:"Acho que «por isso» pode indicar consequência ou talvez contraste; não sei qual é a relação correta."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-MEC-01",expected:"conceptual_contradiction",response:"O declive dá a aceleração, mas a área algébrica dá sempre a distância total e não o deslocamento."},
  {subject:"physics-chemistry-a",itemId:"FQA-R-EQ-01",expected:"conceptual_contradiction",response:"O catalisador acelera os dois sentidos e aumenta Kc."}
];
const diagnosticRows=diagnosticCases.map(row=>{
  const result=gradeOpen(row);
  return {...row,actual:diagnosis(result)?.code||null,pass:diagnosis(result)?.code===row.expected};
});

const mathItem=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id==="CRV2-11CD-STEPS-1");
if(!mathItem)throw new Error("Missing Mathematics diagnostic benchmark item");
for(const row of [
  {expected:"correct_or_near_correct",answer:{steps:{derivative:"3x^2-2",substitution:"3*2^2-2",value:"10"}}},
  {expected:"conceptual_error",answer:{steps:{derivative:"3x^2",substitution:"3*2^2",value:"12"}}},
  {expected:"calculation_error",answer:{steps:{derivative:"3x^2-2",substitution:"3*2^2-2",value:"11"}}},
  {expected:"result_only",answer:"10"}
]){
  const result=gradeMathResponse(mathItem,row.answer);
  diagnosticRows.push({subject:"mathematics",itemId:mathItem.id,expected:row.expected,actual:diagnosis(result)?.code||null,pass:diagnosis(result)?.code===row.expected});
}

const metrics={
  benchmarkKind:"curated-simulated-responses",
  humanAgreementMeasured:false,
  openResponseCases:rows.length,
  strongCases:strong.length,
  wrongCases:wrong.length,
  strongUndercreditRate:pct(strongUndercredited.length/Math.max(1,strong.length)),
  wrongOvercreditRate:pct(wrongOvercredited.length/Math.max(1,wrong.length)),
  partialExtremeRate:pct(partialExtremes.length/Math.max(1,partial.length)),
  vagueOvercreditRate:pct(vagueOvercredited.length/Math.max(1,vague.length)),
  reviewRate:pct(reviewRate),
  paraphrasePairs:paraphrasePairs.length,
  meanParaphraseScoreDelta:pct(mean(paraphrasePairs.map(row=>row.delta))),
  unstableParaphraseRate:pct(unstableParaphrases.length/Math.max(1,paraphrasePairs.length)),
  diagnosticCases:diagnosticRows.length,
  diagnosticAccuracy:pct(diagnosticRows.filter(row=>row.pass).length/diagnosticRows.length),
  paraphrasePairs:paraphrasePairs.map(row=>({...row,delta:pct(row.delta),excellent:pct(row.excellent),paraphrase:pct(row.paraphrase)})),
  failures:{
    strongUndercredited:strongUndercredited.map(row=>`${row.subject}/${row.itemId}/${row.category}`),
    wrongOvercredited:wrongOvercredited.map(row=>`${row.subject}/${row.itemId}/${row.category}`),
    partialExtremes:partialExtremes.map(row=>`${row.subject}/${row.itemId}`),
    vagueOvercredited:vagueOvercredited.map(row=>`${row.subject}/${row.itemId}`),
    unstableParaphrases:unstableParaphrases.map(row=>row.key),
    diagnosticMismatches:diagnosticRows.filter(row=>!row.pass).map(row=>`${row.subject}/${row.itemId}: ${row.expected} -> ${row.actual}`)
  }
};

console.log("=== GRADER QUALITY REPORT ===");
console.log(`Curated open-response benchmark: ${metrics.openResponseCases} cases`);
console.log(`Strong undercredit: ${metrics.strongUndercreditRate}%`);
console.log(`Wrong overcredit: ${metrics.wrongOvercreditRate}%`);
console.log(`Review rate: ${metrics.reviewRate}%`);
console.log(`Paraphrase mean score delta: ${metrics.meanParaphraseScoreDelta}pp`);
console.log(`Unstable paraphrases: ${metrics.unstableParaphraseRate}%`);
console.log(`Diagnostic accuracy: ${metrics.diagnosticAccuracy}% (${diagnosticRows.filter(row=>row.pass).length}/${diagnosticRows.length})`);
console.log("Human agreement: NOT MEASURED (requires independent teacher labels)");
if(unstableParaphrases.length){
  console.log("Unstable excellent↔paraphrase pairs:");
  for(const row of unstableParaphrases){
    console.log(`  ${row.key}: excellent ${pct(row.excellent)}% · paraphrase ${pct(row.paraphrase)}% · Δ ${pct(row.delta)}pp · review ${row.excellentReview}/${row.paraphraseReview} · diagnosis ${row.excellentDiagnosis||"—"}/${row.paraphraseDiagnosis||"—"}`);
  }
}

writeFileSync(new URL("../grader-quality-report.json",import.meta.url),JSON.stringify(metrics,null,2));

const failures=[];
if(metrics.strongUndercreditRate>10)failures.push(`strong undercredit ${metrics.strongUndercreditRate}% > 10%`);
if(metrics.wrongOvercreditRate>10)failures.push(`wrong overcredit ${metrics.wrongOvercreditRate}% > 10%`);
if(metrics.partialExtremeRate>20)failures.push(`partial extreme rate ${metrics.partialExtremeRate}% > 20%`);
if(metrics.vagueOvercreditRate>15)failures.push(`vague overcredit ${metrics.vagueOvercreditRate}% > 15%`);
if(metrics.unstableParaphraseRate>20)failures.push(`unstable paraphrase rate ${metrics.unstableParaphraseRate}% > 20%`);
if(metrics.diagnosticAccuracy<87.5)failures.push(`diagnostic accuracy ${metrics.diagnosticAccuracy}% < 87.5%`);

if(failures.length){
  console.error(`\nGRADER QUALITY REPORT FAILED (${failures.length} quality regressions)`);
  failures.forEach(row=>console.error("✗ "+row));
  process.exit(1);
}
console.log("\nGRADER QUALITY REPORT PASSED");
