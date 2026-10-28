import {describe,it,expect} from "vitest";
import {miniExamReviewItemLabel} from "../../app/lib/scoreReviewCopy.js";
import {shouldShowScoreLossPanel} from "../../app/lib/scoreExplainability.js";

describe("mini-exam review copy is truthful",()=>{
 it("shows an unanswered question without inventing a provisional score",()=>{
  expect(miniExamReviewItemLabel({status:"unanswered",points:0,maxPoints:35,reviewRequired:true},35)).toBe("Não respondida");
  expect(miniExamReviewItemLabel({status:"unanswered",points:0,maxPoints:35,scoreExplainability:{lostPoints:35}},35)).toBe("Não respondida");
 });
 it("keeps real awarded zeros and partial scores",()=>{
  expect(miniExamReviewItemLabel({status:"incorrect",points:0,maxPoints:35},35)).toBe("Errada · 0/35 pontos");
  expect(miniExamReviewItemLabel({status:"partial",points:4,maxPoints:10},10)).toBe("Parcial · 4/10 pontos");
 });
 it("does not turn pending classification into zero",()=>{
  expect(miniExamReviewItemLabel({status:"needs_review",points:0,maxPoints:35},35)).toBe("Avaliação incompleta · 0/35 pontos");
  expect(miniExamReviewItemLabel({status:"needs_review",points:0,maxPoints:35,reviewRequired:true},35)).toBe("Avaliação incompleta · Por classificar");
  expect(miniExamReviewItemLabel({status:"incorrect",points:0,maxPoints:35,stepResults:[{status:"needs_review",points:0}]},35)).toBe("Errada · Por classificar");
 });
 it("avoids fabricated points on incomplete score objects",()=>{
  expect(miniExamReviewItemLabel({status:"partial",points:null,maxPoints:35},35)).toBe("Parcial · Por classificar");
 });
 it("no loss pane is justified for an unanswered item",()=>{
  // The component must also suppress an unanswered item before calling this helper.
  expect(shouldShowScoreLossPanel({lostPoints:0,requiresReview:true})).toBe(false);
 });
});
