import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const REQUIRED_12=[
  "pt12-pessoa-ortonimo",
  "pt12-pessoa-heteronimos",
  "pt12-mensagem",
  "pt12-conto",
  "pt12-poesia-contemporanea",
  "pt12-saramago",
  "pt12-leitura",
  "pt12-escrita",
  "pt12-gramatica"
];

const sectionHeading=(section)=>section.kicker||(/^\d+[.·]/u.test(section.title||"")?section.title:null);
const sectionModelAnswer=(section)=>section.example?.modelAnswer||section.example?.answer;
const sectionNote=(section)=>section.example?.note||section.note;

describe("Rever Matéria · gate transversal de Português · 12.º ano",()=>{
  it("cobre exatamente as nove unidades atuais da taxonomia do 12.º ano",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º")?.units.map(unit=>unit.id)||[];
    expect(taxonomy12).toEqual(REQUIRED_12);
    expect(new Set(taxonomy12).size).toBe(REQUIRED_12.length);
    for(const unitId of REQUIRED_12){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS,unitId).toContain(unitId);
      expect(portugueseDeepReviewContentFor(unitId),unitId).not.toBeNull();
    }
  });

  it("mantém o registry sem IDs duplicados",()=>{
    expect(new Set(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).size).toBe(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length);
  });

  it("mantém o contrato editorial profundo nas nove unidades",()=>{
    for(const unitId of REQUIRED_12){
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

  it("mantém os quatro domínios escritos do 12.º representados",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º")?.units||[];
    const domains=[...new Set(taxonomy12.map(unit=>unit.domain))].sort();
    expect(domains).toEqual(["educacao-literaria","escrita","gramatica","leitura"]);
    for(const domain of domains){
      const ids=taxonomy12.filter(unit=>unit.domain===domain).map(unit=>unit.id);
      expect(ids.length,domain).toBeGreaterThan(0);
      for(const id of ids)expect(portugueseDeepReviewContentFor(id),`${domain}:${id}`).not.toBeNull();
    }
  });

  it("protege as correções curriculares críticas de George e do romance por opção",()=>{
    const conto=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º")?.units.find(unit=>unit.id==="pt12-conto");
    expect(`${conto?.title} ${conto?.summary}`).toMatch(/Maria Judite de Carvalho|George/iu);

    const romance=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º")?.units.find(unit=>unit.id==="pt12-saramago");
    const romanceText=`${romance?.title} ${romance?.summary} ${(romance?.keyPoints||[]).join(" ")}`;
    expect(romanceText).toMatch(/opção prescrita/iu);
    expect(romanceText).toMatch(/Memorial do Convento/iu);
    expect(romanceText).toMatch(/O Ano da Morte de Ricardo Reis/iu);
    expect(romanceText).toMatch(/Um Deus Passeando pela Brisa da Tarde/iu);
  });
});