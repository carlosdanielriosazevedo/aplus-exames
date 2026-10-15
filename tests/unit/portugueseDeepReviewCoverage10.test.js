import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const REQUIRED_10=[
  "pt10-trovadoresca",
  "pt10-fernao-lopes",
  "pt10-gil-vicente",
  "pt10-camoes-rimas",
  "pt10-lusiadas",
  "pt10-leitura",
  "pt10-escrita",
  "pt10-gramatica"
];

describe("Rever Matéria · gate transversal de Português · 10.º ano",()=>{
  it("cobre exatamente as oito unidades atuais da taxonomia do 10.º ano",()=>{
    const taxonomy10=PORTUGUESE_TAXONOMY.find(row=>row.year==="10.º")?.units.map(unit=>unit.id)||[];
    expect(taxonomy10).toEqual(REQUIRED_10);
    expect(new Set(taxonomy10).size).toBe(REQUIRED_10.length);
    for(const unitId of REQUIRED_10){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS,unitId).toContain(unitId);
      expect(portugueseDeepReviewContentFor(unitId),unitId).not.toBeNull();
    }
  });

  it("mantém o registry sem IDs duplicados",()=>{
    expect(new Set(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).size).toBe(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length);
  });

  it("mantém o contrato editorial profundo nas oito unidades",()=>{
    for(const unitId of REQUIRED_10){
      const study=portugueseDeepReviewContentFor(unitId);
      expect(study.id,unitId).toBe(unitId);
      expect(study.title,unitId).toBeTruthy();
      expect(study.lead,unitId).toBeTruthy();
      expect(study.goals.length,unitId).toBeGreaterThanOrEqual(3);
      expect(study.sourceBasis.length,unitId).toBeGreaterThanOrEqual(2);
      expect(study.sourceBasis.join(" "),unitId).toMatch(/DGE/iu);
      expect(study.sections.length,unitId).toBeGreaterThanOrEqual(3);

      const sectionIds=study.sections.map(section=>section.id);
      expect(new Set(sectionIds).size,`${unitId}: secções duplicadas`).toBe(sectionIds.length);

      for(const section of study.sections){
        expect(section.id,unitId).toBeTruthy();
        expect(section.kicker,section.id).toBeTruthy();
        expect(section.title,section.id).toBeTruthy();
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.prompt,section.id).toBeTruthy();
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.modelAnswer,section.id).toBeTruthy();
        expect(section.example?.note,section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("mantém os quatro domínios escritos do 10.º representados",()=>{
    const taxonomy10=PORTUGUESE_TAXONOMY.find(row=>row.year==="10.º")?.units||[];
    const domains=[...new Set(taxonomy10.map(unit=>unit.domain))].sort();
    expect(domains).toEqual(["educacao-literaria","escrita","gramatica","leitura"]);
    for(const domain of domains){
      const ids=taxonomy10.filter(unit=>unit.domain===domain).map(unit=>unit.id);
      expect(ids.length,domain).toBeGreaterThan(0);
      for(const id of ids)expect(portugueseDeepReviewContentFor(id),`${domain}:${id}`).not.toBeNull();
    }
  });
});
