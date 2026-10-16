import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const REQUIRED_11=[
  "pt11-vieira",
  "pt11-frei-luis",
  "pt11-romantismo-opcao",
  "pt11-eca",
  "pt11-antero",
  "pt11-cesario",
  "pt11-leitura",
  "pt11-escrita",
  "pt11-gramatica"
];

describe("Rever Matéria · gate transversal de Português · 11.º ano",()=>{
  it("cobre exatamente as nove unidades atuais da taxonomia do 11.º ano",()=>{
    const taxonomy11=PORTUGUESE_TAXONOMY.find(row=>row.year==="11.º")?.units.map(unit=>unit.id)||[];
    expect(taxonomy11).toEqual(REQUIRED_11);
    expect(new Set(taxonomy11).size).toBe(REQUIRED_11.length);
    for(const unitId of REQUIRED_11){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS,unitId).toContain(unitId);
      expect(portugueseDeepReviewContentFor(unitId),unitId).not.toBeNull();
    }
  });

  it("mantém o registry sem IDs duplicados",()=>{
    expect(new Set(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).size).toBe(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length);
  });

  it("mantém o contrato editorial profundo nas nove unidades",()=>{
    for(const unitId of REQUIRED_11){
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

  it("mantém os quatro domínios escritos do 11.º representados",()=>{
    const taxonomy11=PORTUGUESE_TAXONOMY.find(row=>row.year==="11.º")?.units||[];
    const domains=[...new Set(taxonomy11.map(unit=>unit.domain))].sort();
    expect(domains).toEqual(["educacao-literaria","escrita","gramatica","leitura"]);
    for(const domain of domains){
      const ids=taxonomy11.filter(unit=>unit.domain===domain).map(unit=>unit.id);
      expect(ids.length,domain).toBeGreaterThan(0);
      for(const id of ids)expect(portugueseDeepReviewContentFor(id),`${domain}:${id}`).not.toBeNull();
    }
  });
});