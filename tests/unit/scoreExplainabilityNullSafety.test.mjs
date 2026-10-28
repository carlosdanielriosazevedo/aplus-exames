import {gradeResponse} from "../../app/lib/constructedResponse.js";
import {CONSTRUCTED_RESPONSE_BANK} from "../../app/lib/constructedResponseBank.js";
import {describe,it,expect} from "vitest";
import {buildScoreExplainability,criterionPointRows,stepPointRows,shouldShowScoreLossPanel} from "../../app/lib/scoreExplainability.js";

describe("missing score is unknown, never zero",()=>{
 it("does not invent a zero grade when top-level points are null",()=>{
  const e=buildScoreExplainability({awardedPoints:null,maxPoints:20,criteria:[{id:"fqa",points:null,awardedPoints:null,status:"needs_review"}],requiresReview:true});
  expect(e.awardedPoints).toBeNull();
  expect(e.lostPoints).toBeNull();
  expect(e.rows[0].maxPoints).toBeNull();
  expect(e.rows[0].awardedPoints).toBeNull();
  expect(e.requiresReview).toBe(true);
 });
 it("does not turn omitted or empty scores into zero",()=>{
  for(const value of [undefined,null,"","  "]){
   const e=buildScoreExplainability({awardedPoints:value,maxPoints:20});
   expect(e.awardedPoints).toBeNull();
   expect(e.lostPoints).toBeNull();
  }
 });
 it("preserves explicit numeric zero and numeric strings",()=>{
  const e=buildScoreExplainability({awardedPoints:0,maxPoints:"20",criteria:[{points:5,awardedPoints:0,status:"not-observed"}]});
  expect(e.awardedPoints).toBe(0);
  expect(e.lostPoints).toBe(20);
  expect(e.rows[0].lostPoints).toBe(5);
 });
 it("does not invent points in missing criterion or step fields",()=>{
  expect(criterionPointRows([{points:null,awardedPoints:null,status:"needs_review"}])[0].awardedPoints).toBeNull();
  expect(criterionPointRows([{points:"",awardedPoints:""}])[0].maxPoints).toBeNull();
  expect(stepPointRows([{maxPoints:2,points:null}])[0].awardedPoints).toBeNull();
  expect(criterionPointRows([{points:5,awardedPoints:null,status:"needs_review"}])[0].awardedPoints).toBeNull();
  expect(criterionPointRows([{points:5,awardedPoints:null,status:"unsure"}])[0].lostPoints).toBeNull();
 });
 it("never fabricates half credit from an absent partial ratio",()=>{
  const row=criterionPointRows([{points:10,awardedPoints:null,scoreRatio:null,status:"partial"}])[0];
  expect(row.awardedPoints).toBeNull();
 });
 it("overrides explicit engine zero for pending mathematics steps",()=>{
  const e=buildScoreExplainability({awardedPoints:0,maxPoints:35,steps:[{status:"needs_review",points:0,maxPoints:10}],requiresReview:false});
  expect(e.awardedPoints).toBeNull();
  expect(e.rows[0].awardedPoints).toBeNull();
  expect(e.rows[0].lostPoints).toBeNull();
  expect(e.requiresReview).toBe(true);
  expect(e.consistencyError).toBeNull();
 });
 it("rejects nonnumeric values as score",()=>{
  for(const value of [false,true,[],{}])expect(buildScoreExplainability({awardedPoints:value,maxPoints:10}).awardedPoints).toBeNull();
 });
 it("hides misleading loss panel for full scores even if flagged for review",()=>{
  const e=buildScoreExplainability({awardedPoints:10,maxPoints:10,requiresReview:true});
  expect(e.requiresReview).toBe(true);
  expect(e.lostPoints).toBe(0);
  expect(shouldShowScoreLossPanel(e)).toBe(false);
 });
 it("keeps pending-score explanation visible without promising human review",()=>{
  const e=buildScoreExplainability({awardedPoints:0,maxPoints:35,steps:[{status:"needs_review",points:0,maxPoints:10}]});
  expect(e.awardedPoints).toBeNull();
  expect(shouldShowScoreLossPanel(e)).toBe(true);
 });
 it("real mathematics grader does not present needs_review as zero",()=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(q=>q.id==="CRV2-10FUN-STEPS-1");
  expect(question).toBeDefined();
  const grade=gradeResponse(question,{steps:{},working:"Vou aplicar a regra e simplificar a expressão para obter o resultado."});
  expect(grade.stepResults.some(row=>row.status==="needs_review")).toBe(true);
  expect(grade.scoreExplainability.awardedPoints).toBeNull();
  expect(grade.scoreExplainability.requiresReview).toBe(true);
  expect(grade.scoreExplainability.rows.filter(row=>row.status==="needs_review").every(row=>row.awardedPoints===null)).toBe(true);
 });
});
