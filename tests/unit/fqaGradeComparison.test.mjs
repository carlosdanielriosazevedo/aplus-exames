import {test} from "vitest";
import assert from "node:assert/strict";
import {compareGrades} from "../../scripts/fqa-grade-comparison.mjs";
const csv=rows=>rows.map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(",")).join("\n")+"\n";
const humans=csv([["blind_id","item_id","max_points","human_awarded_points","human_criterion_breakdown","human_rationale"],["B1","FQA-R-ELEM-01","10","7","[3,4]","Partial"],["B2","FQA-R-MAT-01","10","0","[0,0]","Wrong"]]);
const predictions=csv([["blind_id","item_id","points","scoring_authorized","criterion_points"],["B2","FQA-R-MAT-01","","false",""],["B1","FQA-R-ELEM-01","8","true","[4,4]"]]);
test("blind join with per-item MAE and coverage",()=>{
 const r=compareGrades(humans,predictions);
 assert.equal(r.overall.scored,1);assert.equal(r.overall.abstained,1);assert.equal(r.overall.mae,1);
 assert.equal(r.perItem["FQA-R-MAT-01"].coverage,0);
});
test("abstention never means a zero score",()=>{
 assert.equal(compareGrades(humans,predictions).outcomes.find(x=>x.blind_id==="B2").points,null);
});
test("reject missing blind IDs",()=>assert.throws(()=>compareGrades(humans,predictions.replace("B2","ZZ")),/populations differ/));
test("reject disguised zero points while abstaining",()=>assert.throws(()=>compareGrades(humans,predictions.replace('"B2","FQA-R-MAT-01","","false"','"B2","FQA-R-MAT-01","0","false"')),/Abstention/));
test("reject criterion totals that do not match",()=>assert.throws(()=>compareGrades(humans,predictions.replace("[4,4]","[4,3]")),/breakdown/));
test("reject duplicate prediction rows",()=>assert.throws(()=>compareGrades(humans,predictions+predictions.split("\n")[1]+"\n"),/Duplicate/));

test("reports criterion-level MAE separately from total MAE",()=>{
 const r=compareGrades(humans,predictions);
 assert.equal(r.overall.criterionMAE,0.5);
 assert.equal(r.perItem["FQA-R-MAT-01"].criterionMAE,null);
});
test("flags severe score inflation relative to question maximum",()=>{
 const aggressive=predictions.replace('"8","true","[4,4]"','"10","true","[5,5]"');
 const r=compareGrades(humans,aggressive);
 assert.equal(r.overall.severeOvercredit,1);
 assert.equal(r.overall.severeUndercredit,0);
});
test("flags severe undercredit even when overall points are valid",()=>{
 const low=predictions.replace('"8","true","[4,4]"','"3","true","[1,2]"');
 const r=compareGrades(humans,low);
 assert.equal(r.overall.severeUndercredit,1);
});
test("abstained responses excluded from criterion error denominators",()=>{
 const r=compareGrades(humans,predictions);
 assert.equal(r.overall.criterionMAE,0.5);
 assert.equal(r.overall.scored,1);
});

test("prioritizes severe overcredit and undercredit for human review",()=>{
 const over=predictions.replace('"8","true","[4,4]"','"10","true","[5,5]"');
 const report=compareGrades(humans,over);
 assert.deepEqual(report.priorityReview,[{blind_id:"B1",item_id:"FQA-R-ELEM-01",risk:"SEVERE_OVERCREDIT",error:3}]);
 assert.equal(report.overall.riskCounts.SEVERE_OVERCREDIT,1);
 assert.equal(report.overall.riskCounts.ABSTAINED,1);
});
test("keeps criterion disagreement visible when total agrees",()=>{
 const equal=predictions.replace('"8","true","[4,4]"','"7","true","[4,3]"');
 const report=compareGrades(humans,equal);
 const row=report.outcomes.find(x=>x.blind_id==="B1");
 assert.equal(row.error,0);
 assert.deepEqual(row.criterionErrors,[1,-1]);
 assert.equal(row.risk,"CRITERION_DISAGREEMENT");
 assert.equal(report.overall.criterionMAE,1);
});
test("does not flag abstention as scoring failure or priority-review error",()=>{
 const report=compareGrades(humans,predictions);
 assert.equal(report.priorityReview.length,0);
 assert.equal(report.outcomes.find(x=>x.blind_id==="B2").risk,"ABSTAINED");
});
