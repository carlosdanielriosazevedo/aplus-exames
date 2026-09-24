import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy.js";
import {DOMAIN_STUDY_GUIDES,SPECIAL_FOCUS,portugueseReviewGuide} from "../../app/data/portugueseReviewGuides.js";

describe("Portuguese review study guides",()=>{
  const units=PORTUGUESE_TAXONOMY.flatMap(row=>row.units);

  it("provides a study guide for every Portuguese unit",()=>{
    for(const unit of units){
      const guide=portugueseReviewGuide(unit);
      expect(guide).toBeTruthy();
      expect(guide.studySteps.length).toBeGreaterThanOrEqual(3);
      expect(guide.pitfalls.length).toBeGreaterThanOrEqual(3);
      expect(guide.memoryTip.length).toBeGreaterThan(30);
      expect(guide.focus.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("covers all Portuguese domains used by the taxonomy",()=>{
    const domains=[...new Set(units.map(unit=>unit.domain))].sort();
    expect(Object.keys(DOMAIN_STUDY_GUIDES).sort()).toEqual(domains);
  });

  it("keeps literary works with explicit work-specific focus where curated",()=>{
    for(const id of Object.keys(SPECIAL_FOCUS)){
      const unit=units.find(row=>row.id===id);
      expect(unit).toBeTruthy();
      expect(unit.domain).toBe("educacao-literaria");
      expect(portugueseReviewGuide(unit).focus).toEqual(SPECIAL_FOCUS[id]);
    }
  });

  it("does not introduce question, scoring or XP mechanics into review mode content",()=>{
    for(const unit of units){
      const serialized=JSON.stringify(portugueseReviewGuide(unit)).toLocaleLowerCase("pt-PT");
      expect(serialized).not.toMatch(/(?:^|[^\p{L}])(?:responder|pergunta|pontuação|xp)(?:$|[^\p{L}])/u);
    }
  });

  it("returns null for invalid input",()=>{
    expect(portugueseReviewGuide(null)).toBeNull();
  });
});
