import {describe,expect,it} from "vitest";
import {TAXONOMY} from "../../app/data/content.js";
import {MATH_REVIEW_CONTENT,mathReviewContentFor} from "../../app/data/mathReviewContent.js";

describe("Mathematics review content",()=>{
  it("covers every Mathematics A taxonomy theme",()=>{
    const taxonomyIds=TAXONOMY.map(row=>row.id).sort();
    const reviewIds=Object.keys(MATH_REVIEW_CONTENT).sort();
    expect(reviewIds).toEqual(taxonomyIds);
  });

  it("keeps every study entry substantive and study-only",()=>{
    for(const theme of TAXONOMY){
      const entry=mathReviewContentFor(theme.id);
      expect(entry).toBeTruthy();
      expect(entry.summary.length).toBeGreaterThan(80);
      expect(entry.keyIdeas.length).toBeGreaterThanOrEqual(3);
      expect(entry.formulas.length).toBeGreaterThanOrEqual(2);
      expect(entry.pitfalls.length).toBeGreaterThanOrEqual(2);
      expect(entry.studyTip.length).toBeGreaterThan(30);
      const serialized=JSON.stringify(entry).toLocaleLowerCase("pt-PT");
      expect(serialized).not.toMatch(/(?:^|[^\p{L}])(?:responder|pergunta|pontuação|xp)(?:$|[^\p{L}])/u);
    }
  });

  it("does not invent content for unknown themes",()=>{
    expect(mathReviewContentFor("unknown-theme")).toBeNull();
  });
});
