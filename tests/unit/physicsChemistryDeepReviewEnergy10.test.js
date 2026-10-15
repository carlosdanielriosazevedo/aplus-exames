import {describe,expect,it} from "vitest";
import {
  FQA_ENERGY_10_DEEP_REVIEW,
  FQA_ENERGY_10_DEEP_REVIEW_VERSION,
  physicsChemistryEnergy10DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewEnergy10";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=[
  "f10-energy-motion",
  "f10-work",
  "f10-mechanical-energy",
  "f10-electric",
  "f10-thermal-radiation",
  "f10-thermodynamics"
];

describe("Rever Matéria profundo · FQ A · Energia e sua conservação",()=>{
  it("mantém versão e cobre exatamente a taxonomia",()=>{
    expect(FQA_ENERGY_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    const study=physicsChemistryEnergy10DeepReviewFor("f10-energy");
    expect(study).toBe(FQA_ENERGY_10_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(physicsChemistrySubtopicsForDomain("f10-energy").map(row=>row.id));
  });

  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of FQA_ENERGY_10_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege energia cinética, trabalho e teorema da energia cinética",()=>{
    const text=JSON.stringify(FQA_ENERGY_10_DEEP_REVIEW);
    expect(text).toContain("E_c = 1/2 mv²");
    expect(text).toContain("W_F = F d cosθ");
    expect(text).toContain("ΣW_i = ΔE_c");
    expect(text).toMatch(/força resultante constante.*ΔE_c.*distância/iu);
  });

  it("protege energia mecânica, dissipação e rendimento",()=>{
    const text=JSON.stringify(FQA_ENERGY_10_DEEP_REVIEW);
    expect(text).toContain("E_pg = mgh");
    expect(text).toContain("E_m = E_c + E_pg");
    expect(text).toContain("W_não conservativas = ΔE_m");
    expect(text).toMatch(/forças dissipativas.*energia mecânica/iu);
    expect(text).toMatch(/rendimento/iu);
  });

  it("protege circuitos, potência e gerador real",()=>{
    const text=JSON.stringify(FQA_ENERGY_10_DEEP_REVIEW);
    expect(text).toContain("I = ΔQ/Δt");
    expect(text).toContain("potência elétrica: P=UI=RI²=U²/R");
    expect(text).toContain("gerador real em descarga: U=ε−rI");
    expect(text).toMatch(/amperímetro em paralelo.*voltímetro em série/iu);
  });

  it("protege calor, mecanismos de transferência, radiação e trabalho experimental",()=>{
    const text=JSON.stringify(FQA_ENERGY_10_DEEP_REVIEW);
    expect(text).toMatch(/condução, convecção e radiação/iu);
    expect(text).toMatch(/temperatura ambiente.*infravermelha/iu);
    expect(text).toContain("sem mudança de fase: Q=mcΔT");
    expect(text).toContain("mudança de fase: Q=mL");
    expect(text).toMatch(/painéis fotovoltaicos/iu);
  });

  it("protege Primeira e Segunda Leis com convenção de sinais explícita",()=>{
    const text=JSON.stringify(FQA_ENERGY_10_DEEP_REVIEW);
    expect(text).toContain("convenção usada: ΔU = Q + W_on");
    expect(text).toContain("se o sistema realiza trabalho W_by>0: ΔU=Q−W_by");
    expect(text).toMatch(/energia útil tende a diminuir/iu);
    expect(text).toMatch(/rendimento é inferior a 100%/iu);
  });

  it("regista fontes oficiais, conclui o 10.º e acompanha a entrada do 11.º",()=>{
    const sources=FQA_ENERGY_10_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("f10-energy");
    expect(physicsChemistryDeepReviewContentFor("f10-energy")).toBe(FQA_ENERGY_10_DEEP_REVIEW);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("f11-mechanics");
    expect(physicsChemistryDeepReviewContentFor("f11-mechanics")).not.toBeNull();
  });
});
