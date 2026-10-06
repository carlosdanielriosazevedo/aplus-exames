import assert from "node:assert/strict";
import {exportValidationDataset,makeGraderValidationCase} from "../app/lib/graderValidationDataset.js";
import {buildGraderValidationReport} from "../app/lib/graderValidationReport.js";

const makeCase=({subject,id,family,split,points,maxPoints=10,signals={}})=>makeGraderValidationCase({
  source:"closed_beta_real",split,subject,responseFamily:family,itemId:id,
  question:`Pergunta ${id}`,response:`Resposta ${id}`,maxPoints,
  graderSnapshot:{points,maxPoints,reviewRequired:false,semanticScore:.98,relationScore:.98,coherenceScore:.98,substanceScore:.98,matchedCriteriaCount:2,totalCriteriaCount:2,...signals},
  occurredAt:Date.parse(`2026-10-06T12:00:${id.slice(-1).padStart(2,"0")}Z`)
});

const cases=[
  makeCase({subject:"mathematics",id:"m1",family:"stepwise",split:"calibration",points:9}),
  makeCase({subject:"portuguese",id:"p1",family:"restricted-response",split:"calibration",points:8}),
  makeCase({subject:"physics-chemistry-a",id:"f1",family:"restricted-response",split:"holdout",points:2})
];
const dataset=exportValidationDataset(cases);
const teacher={
  schema:"aplus-grader-teacher-labels-v1",reviewer:"prof-1",reviews:cases.map((row,index)=>({
    schema:"aplus-grader-teacher-label-v1",case_id:row.case_id,case_fingerprint:row.case_fingerprint,
    reviewer:"prof-1",subject:row.subject,response_family:row.response_family,split:row.split,
    decision:index===0?"accept":index===1?"partial":"reject",score_percent:[90,70,10][index],diagnosis:"other",requires_review:false,note:""
  }))
};

const report=buildGraderValidationReport({datasetExports:[dataset],teacherLabelExports:[teacher]});
assert.equal(report.cases.length,3);
assert.equal(report.labels.length,3);
assert.equal(report.invalid.length,0);
assert.equal(report.readiness.bySubject.mathematics.calibration,1);
assert.equal(report.readiness.bySubject.portuguese.calibration,1);
assert.equal(report.readiness.bySubject["physics-chemistry-a"].holdout,1);
assert.equal(report.raw.overall.labels,3);
assert.ok(Number.isFinite(report.raw.overall.meanAbsoluteScoreDelta));
assert.equal(report.selective.labels,3);
assert.ok(report.selective.overall.abstentionRate>0,"classes abertas pré-calibração devem abster-se");
assert.equal(report.release.humanValidated,false,"três labels não podem declarar validação humana");
assert.notEqual(report.release.status,"human_validated");

const tamperedTeacher=JSON.parse(JSON.stringify(teacher));
tamperedTeacher.reviews[0].case_fingerprint="00000000";
const rejected=buildGraderValidationReport({datasetExports:[dataset],teacherLabelExports:[tamperedTeacher]});
assert.equal(rejected.labels.length,2);
assert.ok(rejected.invalid.some(row=>row.reason==="teacher_case_fingerprint_invalid"));

console.log("GRADER VALIDATION REPORT: GO");
