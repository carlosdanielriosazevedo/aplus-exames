import {describe,it,expect} from "vitest";
import {buildScoreExplainability,criterionPointRows,stepPointRows} from "../../app/lib/scoreExplainability.js";

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
  expect(stepPointRows([{maxPoints:2,points:null}])[0].awardedPoints).toBe(0);
 });
});
