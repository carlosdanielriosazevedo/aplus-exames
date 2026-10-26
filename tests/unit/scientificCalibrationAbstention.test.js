import {test,expect} from "vitest";
import {OPEN_RESPONSE_WAVE4_CASES} from "../../app/data/openResponseCalibrationBankWave4.js";
import {OPEN_RESPONSE_WAVE5_CASES} from "../../app/data/openResponseCalibrationBankWave5.js";
import {physicsChemistryConstructedItemById} from "../../app/data/physicsChemistryConstructed.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";

// Safety certification only. The v4/v5 performance-calibration gates still require
// successful human-adjudicated scoring and MUST remain NO-GO in abstention mode.
const cases=[...OPEN_RESPONSE_WAVE4_CASES,...OPEN_RESPONSE_WAVE5_CASES]
  .filter(row=>row.subject==="physics-chemistry-a");

test("all 35 legacy calibrated scientific answers abstain rather than invent any score",()=>{
  expect(cases).toHaveLength(35);
  expect(new Set(cases.map(row=>row.itemId)).size).toBe(7);
  for(const row of cases){
    const item=physicsChemistryConstructedItemById(row.itemId);
    expect(item,`Missing rubric: ${row.itemId}`).toBeTruthy();
    const actual=gradePhysicsChemistryResponse(item,row.response);
    expect(actual,`${row.itemId}/${row.profile}`).toMatchObject({
      status:"ungraded-awaiting-validation",
      final:false,correct:null,points:null,provisionalPoints:null,
      requiresReview:true,automaticScoringSuspended:true,
      rubricCompleted:true,feedbackSummary:null,scoreExplainability:null
    });
    expect(actual.responseText).toBe(row.response);
    expect(actual.criteria.length).toBeGreaterThanOrEqual(2);
    for(const criterion of actual.criteria){
      expect(criterion.status).toBe("pending");
      expect(criterion.awardedPoints).toBeNull();
      expect(criterion.lostPoints).toBeNull();
      expect(criterion.observations.every(o=>o.status==="pending"&&o.autoAssessed===false)).toBe(true);
    }
  }
});

test("abstention never counts as meeting the v4/v5 positive-grade calibration thresholds",()=>{
  const correctCases=cases.filter(row=>Number(row.minScore)>0);
  expect(correctCases.length).toBeGreaterThan(0);
  for(const row of correctCases){
    const result=gradePhysicsChemistryResponse(physicsChemistryConstructedItemById(row.itemId),row.response);
    expect(result.provisionalPoints).toBeNull();
    expect(result.automaticScoringSuspended).toBe(true);
    // Null is deliberately NOT interpreted as zero / 0% accuracy. Actual scoring
    // performance is unmeasured, therefore release eligibility remains blocked.
  }
});
