import test from "node:test";
import assert from "node:assert/strict";
import {parseCsv,validateCsv} from "../../scripts/fqa-blind-validation.mjs";

const head=["blind_id","item_id","max_points","human_awarded_points","human_criterion_breakdown","human_rationale"];
const make=(values)=>[head.join(","),...values.map(r=>r.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(","))].join("\n")+"\n";
const good=["B1","FQA-R-ELEM-01","10","7","[3,4]","Evidence supports partial credit"];
test("CSV parses commas, quotes and embedded newlines",()=>{
  assert.deepEqual(parseCsv('a,b\n"hello, ""teacher""","line1\nline2"\n'),[["a","b"],['hello, "teacher"',"line1\nline2"]]);
});
test("validates blinded rubric totals without calling grading engine",()=>{
  const report=validateCsv(make([good]),{expectedCount:1});
  assert.equal(report.ok,true);assert.equal(report.completed,1);
});
test("rejects duplicate blind IDs",()=>{
  const report=validateCsv(make([good,good]),{expectedCount:2});
  assert.equal(report.ok,false);assert.match(report.errors.join(" "),/duplicate blind_id/);
});
test("rejects missing adjudication and never replaces it with zero",()=>{
  const report=validateCsv(make([["B2","FQA-R-ELEM-01","10","","",""]]),{expectedCount:1});
  assert.equal(report.completed,0);assert.equal(report.ok,false);
  assert.match(report.errors.join(" "),/missing human adjudication/);
});
test("rejects inconsistent rubric sums and out-of-bounds scores",()=>{
  const report=validateCsv(make([["B1","FQA-R-ELEM-01","10","11","[6,4]","Wrong score"]]),{expectedCount:1});
  assert.equal(report.ok,false);
  assert.ok(report.errors.some(s=>s.includes("outside")));
  assert.ok(report.errors.some(s=>s.includes("criterion sum")));
});
test("rejects malformed CSV and partial adjudication",()=>{
  assert.throws(()=>parseCsv('"unfinished'),/Unterminated/);
  const report=validateCsv(make([["B1","FQA-R-ELEM-01","10","0","",""]]),{expectedCount:1});
  assert.equal(report.ok,false);
});
test("refuses claimed complete review of template blanks",()=>{
  const rows=[...Array(15)].flatMap((_,j)=>["ELEM","MAT","ENE","MEC","WAV","EQ","AQ"].map(k=>[`B${j}-${k}`,`FQA-R-${k}-01`,"10","","",""]));
  const report=validateCsv(make(rows));
  assert.equal(report.rows,105);assert.equal(report.completed,0);assert.equal(report.ok,false);
});
