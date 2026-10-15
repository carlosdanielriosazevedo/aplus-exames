import {describe,expect,it} from "vitest";
import {
  FQA_MECHANICS_11_DEEP_REVIEW,
  FQA_MECHANICS_11_DEEP_REVIEW_VERSION,
  physicsChemistryMechanics11DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewMechanics11";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=[
  "f11-kinematics",
  "f11-interactions",
  "f11-newton-gravity",
  "f11-forces-motion",
  "f11-circular",
  "f11-experimental-motion"
];

describe("Rever Matéria profundo · FQ A · Mecânica do 11.º",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(FQA_MECHANICS_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre exatamente as seis submatérias estáveis do domínio",()=>{
    const study=physicsChemistryMechanics11DeepReviewFor("f11-mechanics");
    const taxonomyIds=physicsChemistrySubtopicsForDomain("f11-mechanics").map(row=>row.id);
    expect(study).toBe(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(taxonomyIds);
  });

  it("cada secção mantém o contrato profundo de estudo",()=>{
    for(const section of FQA_MECHANICS_11_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege cinemática vetorial e leitura de gráficos",()=>{
    const text=JSON.stringify(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(text).toContain("Δx = x_f − x_i");
    expect(text).toContain("v_m = Δx/Δt");
    expect(text).toContain("a_m = Δv/Δt");
    expect(text).toMatch(/declive.*x\(t\).*velocidade/iu);
    expect(text).toMatch(/área algébrica.*v\(t\).*deslocamento/iu);
    expect(text).toMatch(/aceleração negativa.*sempre.*retardado/iu);
  });

  it("protege interação, resultante, Newton e gravitação",()=>{
    const text=JSON.stringify(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(text).toMatch(/interações fundamentais.*gravítica.*eletromagnética.*nuclear forte.*nuclear fraca/iu);
    expect(text).toContain("F⃗_resultante = ΣF⃗_i");
    expect(text).toContain("ΣF⃗ = m a⃗");
    expect(text).toContain("F_g = G m₁m₂/r²");
    expect(text).toContain("g = GM/r²");
    expect(text).toMatch(/ação-reação.*corpos diferentes/iu);
    expect(text).toMatch(/queda livre.*independente da massa/iu);
  });

  it("protege movimentos retilíneos, plano inclinado e resistência do ar",()=>{
    const text=JSON.stringify(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(text).toContain("v = v₀ + at (a constante)");
    expect(text).toContain("v² = v₀² + 2aΔx (a constante)");
    expect(text).toContain("P_∥ = mg sinθ");
    expect(text).toMatch(/velocidade terminal/iu);
    expect(text).toMatch(/modelo ideal.*resistência/iu);
  });

  it("protege MCU e aplicação orbital a satélites",()=>{
    const text=JSON.stringify(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(text).toContain("ω = 2π/T = 2πf");
    expect(text).toContain("a_c = v²/r = ω²r");
    expect(text).toContain("órbita circular: v = √(GM/r)");
    expect(text).toMatch(/massa do satélite.*cancela/iu);
    expect(text).toMatch(/aceleração centrípeta.*dirigida para o centro/iu);
  });

  it("protege os dois eixos experimentais explícitos das AE",()=>{
    const text=JSON.stringify(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(text).toMatch(/determinação experimental de g/iu);
    expect(text).toMatch(/resultante é nula e não nula/iu);
    expect(text).toContain("gráfico v²(Δx): declive ≈ 2a");
    expect(text).toMatch(/incerteza experimental/iu);
    expect(text).toMatch(/corpos de massas diferentes.*aceleração gravítica não depende da massa/iu);
  });

  it("regista Mecânica e mantém Ondas como próximo fallback",()=>{
    const sources=FQA_MECHANICS_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/11.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("f11-mechanics");
    expect(physicsChemistryDeepReviewContentFor("f11-mechanics")).toBe(FQA_MECHANICS_11_DEEP_REVIEW);
    expect(physicsChemistryDeepReviewContentFor("f11-waves")).toBeNull();
  });
});
