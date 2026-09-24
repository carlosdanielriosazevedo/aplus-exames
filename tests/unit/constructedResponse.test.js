import {describe,expect,it} from "vitest";
import {
  CONSTRUCTED_RESPONSE_BANK,
  gradeResponse,
  isResponseAnswered,
  responseType
} from "../../app/lib/constructedResponse.js";

const byId=id=>{
  const question=CONSTRUCTED_RESPONSE_BANK.find(row=>row.id===id);
  if(!question)throw new Error("Missing fixture question: "+id);
  return question;
};

describe("constructed response engine",()=>{
  const derivative=byId("CRV2-11CD-STEPS-1");

  it("recognises response type and answered state",()=>{
    expect(responseType(derivative)).toBe("stepwise");
    expect(isResponseAnswered(derivative,{steps:{}})).toBe(false);
    expect(isResponseAnswered(derivative,{steps:{derivative:"f'(x)=3x^2-2"}})).toBe(true);
  });

  it("awards full points to the declared correct derivative solution",()=>{
    const result=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10");
    expect(result.correct).toBe(true);
    expect(result.points).toBe(derivative.points);
    expect(result.reviewRequired).toBe(false);
  });

  it("gives zero to final-result-only answers in a stepwise item",()=>{
    const result=gradeResponse(derivative,"f'(2)=10");
    expect(result.points).toBe(0);
    expect(result.reason).toBe("final_result_only");
    expect(result.iaveSituation).toBe("Situação 3");
    expect(result.reviewRequired).toBe(false);
  });

  it("recognises a high-confidence transcription slip without zeroing the whole answer",()=>{
    const result=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=10=11");
    const value=result.stepResults.find(row=>row.stepId==="value");
    expect(value).toMatchObject({
      reason:"copied_number_or_sign_error",
      iaveSituation:"Situação 7",
      classificationConfidence:"high",
      points:11
    });
    expect(result.points).toBe(34);
  });

  it("recognises an occasional arithmetic slip conservatively",()=>{
    const result=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=3×2²-2=11");
    const value=result.stepResults.find(row=>row.stepId==="value");
    expect(value).toMatchObject({
      reason:"occasional_calculation_error",
      iaveSituation:"Situação 8",
      classificationConfidence:"high",
      points:11
    });
    expect(result.reviewRequired).toBe(false);
  });

  it("does not over-classify an ambiguous wrong result with high confidence",()=>{
    const result=gradeResponse(derivative,"f'(x)=3x²-2\nf'(2)=11");
    const value=result.stepResults.find(row=>row.stepId==="value");
    expect(value?.reason).not.toBe("copied_number_or_sign_error");
    expect(value?.reason).not.toBe("occasional_calculation_error");
    expect(value?.classificationConfidence).not.toBe("high");
  });

  it("routes plausible unrecognised alternative work to review instead of fabricating points",()=>{
    const result=gradeResponse(derivative,"Apresentei uma resolução matemática alternativa que o corretor automático ainda não reconhece.");
    expect(result.status).toBe("needs_review");
    expect(result.reviewRequired).toBe(true);
    expect(result.pendingPoints).toBe(derivative.points);
  });

  it("keeps random junk at zero points",()=>{
    const result=gradeResponse(derivative,"§§§ †††");
    expect(result.points).toBe(0);
    expect(result.correct).toBe(false);
  });

  it("accepts equivalent fractions and penalises decimal final form conservatively",()=>{
    const integral=byId("CRV2-12INT-STEPS-1");
    const exact=gradeResponse(integral,{steps:{primitive:"x²/2",barrow:"1²/2−0²/2",value:"1/2"}});
    expect(exact.correct).toBe(true);
    const decimal=gradeResponse(integral,{steps:{primitive:"x²/2",barrow:"1²/2−0²/2",value:"0,5"}});
    const value=decimal.stepResults.find(row=>row.stepId==="value");
    expect(value).toMatchObject({
      reason:"wrong_final_form",
      iaveSituation:"Situação 12",
      classificationConfidence:"high",
      points:9
    });
  });

  it("preserves partial credit for a declared incomplete final passage",()=>{
    const q=byId("CRV2-12RAE-STEPS-1");
    const result=gradeResponse(q,{steps:{comparison:"1,9881<2<1,42²"}});
    const step=result.stepResults.find(row=>row.stepId==="comparison");
    expect(step).toMatchObject({
      reason:"incomplete_step",
      iaveSituation:"Situação 10",
      missingOnlyFinalPassage:true,
      classificationConfidence:"high",
      points:7
    });
  });
});
