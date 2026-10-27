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
