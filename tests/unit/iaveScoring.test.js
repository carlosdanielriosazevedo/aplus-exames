import {describe,expect,it} from "vitest";
import {
  applyIaveGlobalPenalties,
  dependentStepCap,
  iaveGlobalPenalty,
  iaveSituationLabel,
  iaveStepCap,
  iaveStepPenalty,
  scoreIaveStep
} from "../../app/lib/iaveScoring.js";

describe("IAVE scoring primitives",()=>{
  it("zeros instruction violations and missing required work",()=>{
    expect(iaveStepCap(12,"instruction_violation")).toBe(0);
    expect(iaveStepCap(12,"missing_required_work")).toBe(0);
  });

  it("caps conceptual errors at floor half",()=>{
    expect(iaveStepCap(9,"conceptual_error")).toBe(4);
    expect(iaveStepCap(10,"conceptual_error")).toBe(5);
  });

  it("caps reduced copied-number errors at half",()=>{
    expect(iaveStepCap(9,"copied_number_or_sign_error",{difficultyReduced:true})).toBe(4);
    expect(iaveStepCap(9,"copied_number_or_sign_error",{difficultyReduced:false})).toBe(9);
  });

  it("treats final-passage incompleteness differently from deeper incompleteness",()=>{
    expect(iaveStepCap(10,"incomplete_step",{missingOnlyFinalPassage:true})).toBe(9);
    expect(iaveStepCap(10,"incomplete_step",{missingOnlyFinalPassage:false})).toBe(5);
  });

  it("applies one-point penalties to objective local slips",()=>{
    for(const reason of ["copied_number_or_sign_error","occasional_calculation_error","wrong_final_form","approximate_instead_of_exact","wrong_final_rounding"]){
      expect(iaveStepPenalty(reason)).toBe(1);
    }
  });

  it("does not double-penalise copied-number error when difficulty is reduced",()=>{
    expect(iaveStepPenalty("copied_number_or_sign_error",{difficultyReduced:true})).toBe(0);
  });

  it("keeps omitted final unit at base score",()=>{
    expect(scoreIaveStep({maxPoints:8,basePoints:7,reason:"omitted_final_unit"})).toBe(7);
  });

  it("never lets scored points fall below zero or above max",()=>{
    expect(scoreIaveStep({maxPoints:5,basePoints:99})).toBe(5);
    expect(scoreIaveStep({maxPoints:5,basePoints:-4})).toBe(0);
  });

  it("applies global copied-data penalty only when difficulty was not reduced",()=>{
    expect(iaveGlobalPenalty("copied_data_error",{difficultyReduced:false})).toBe(1);
    expect(iaveGlobalPenalty("copied_data_error",{difficultyReduced:true})).toBe(0);
  });

  it("applies excess-elements penalty only when performance is affected",()=>{
    expect(iaveGlobalPenalty("excess_elements",{affectsPerformance:true})).toBe(2);
    expect(iaveGlobalPenalty("excess_elements",{affectsPerformance:false})).toBe(0);
  });

  it("applies notation penalty only when it reaches non-zero steps",()=>{
    expect(iaveGlobalPenalty("formal_notation_error",{onlyZeroPointSteps:false})).toBe(1);
    expect(iaveGlobalPenalty("formal_notation_error",{onlyZeroPointSteps:true})).toBe(0);
  });

  it("aggregates global penalties without producing negative totals",()=>{
    expect(applyIaveGlobalPenalties(3,[
      {reason:"intermediate_rounding"},
      {reason:"excess_elements",affectsPerformance:true},
      {reason:"formal_notation_error",onlyZeroPointSteps:false}
    ])).toBe(0);
  });

  it("caps dependent steps when an upstream error reduces difficulty",()=>{
    expect(dependentStepCap(9,{upstreamDifficultyReduced:true})).toBe(4);
    expect(dependentStepCap(9,{upstreamDifficultyReduced:false})).toBe(9);
  });

  it("maps classified situations to stable labels",()=>{
    expect(iaveSituationLabel("final_result_only")).toBe("Situação 3");
    expect(iaveSituationLabel("wrong_final_rounding")).toBe("Situação 15");
    expect(iaveSituationLabel("unknown")).toBeNull();
  });
});
