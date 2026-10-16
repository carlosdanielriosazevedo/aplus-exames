import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const sectionHeading=(section)=>section.kicker||(/^\d+[.·]/u.test(section.title||"")?section.title:null);
const sectionModelAnswer=(section)=>section.example?.modelAnswer||section.example?.answer;
const sectionNote=(section)=>section.example?.note||section.note;

function studies(){
  return PORTUGUESE_DEEP_REVIEW_UNIT_IDS.map(unitId=>{
    const study=portugueseDeepReviewContentFor(unitId);
    return {unitId,study};
  });
}

describe("Rever Matéria · auditoria editorial global de Português",()=>{
  it("resolve todas as unidades profundas sem IDs duplicados",()=>{
    expect(new Set(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).size).toBe(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length);
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length).toBe(26);
    for(const {unitId,study} of studies()){
      expect(study,unitId).not.toBeNull();
      expect(study.id,unitId).toBe(unitId);
    }
  });

  it("mantém um contrato editorial profundo compatível entre waves",()=>{
    for(const {unitId,study} of studies()){
      expect(study.title,unitId).toBeTruthy();
      expect(study.lead,unitId).toBeTruthy();
      expect(study.goals.length,unitId).toBeGreaterThanOrEqual(3);
      expect(study.sourceBasis.length,unitId).toBeGreaterThanOrEqual(2);
      expect(study.sections.length,unitId).toBeGreaterThanOrEqual(3);

      const sectionIds=study.sections.map(section=>section.id);
      expect(new Set(sectionIds).size,`${unitId}: secções duplicadas`).toBe(sectionIds.length);

      for(const section of study.sections){
        expect(section.id,unitId).toBeTruthy();
        expect(sectionHeading(section),section.id).toBeTruthy();
        expect(section.title,section.id).toBeTruthy();
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.prompt,section.id).toBeTruthy();
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(sectionModelAnswer(section),section.id).toBeTruthy();
        expect(sectionNote(section),section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("normaliza a forma imperativa negativa em todo o conteúdo apresentado ao aluno",()=>{
    for(const {unitId,study} of studies()){
      const text=JSON.stringify(study);
      expect(text,unitId).not.toMatch(/\bnão assumes\b/iu);
    }
  });

  it("mantém fonte curricular explícita em todas as unidades",()=>{
    for(const {unitId,study} of studies()){
      expect(study.sourceBasis.join(" "),unitId).toMatch(/DGE/iu);
    }
  });
});
