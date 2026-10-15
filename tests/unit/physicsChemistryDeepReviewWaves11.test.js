import {describe,expect,it} from "vitest";
import {
  FQA_WAVES_11_DEEP_REVIEW,
  FQA_WAVES_11_DEEP_REVIEW_VERSION,
  physicsChemistryWaves11DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewWaves11";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=["f11-waves-signals","f11-sound","f11-fields","f11-induction","f11-em-waves","f11-optics"];

describe("Rever Matéria profundo · FQ A · Ondas e eletromagnetismo do 11.º",()=>{
  it("mantém versão e cobre exatamente a taxonomia",()=>{
    expect(FQA_WAVES_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    const study=physicsChemistryWaves11DeepReviewFor("f11-waves");
    expect(study).toBe(FQA_WAVES_11_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(physicsChemistrySubtopicsForDomain("f11-waves").map(row=>row.id));
  });
  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of FQA_WAVES_11_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });
  it("protege periodicidade temporal e espacial e a frequência imposta pela fonte",()=>{
    const text=JSON.stringify(FQA_WAVES_11_DEEP_REVIEW);
    expect(text).toContain("T = 1/f"); expect(text).toContain("v = λf"); expect(text).toMatch(/frequência.*fonte/iu);
    expect(text).toMatch(/passa de um meio para outro.*frequência não se altera/iu); expect(text).toMatch(/ondas transversais.*ondas longitudinais/iu);
  });
  it("protege som como onda de pressão e os dois eixos experimentais das AE",()=>{
    const text=JSON.stringify(FQA_WAVES_11_DEEP_REVIEW);
    expect(text).toMatch(/som é uma onda.*pressão/iu); expect(text).toMatch(/som puro.*sinal sinusoidal/iu);
    expect(text).toMatch(/intensidade, altura e timbre/iu); expect(text).toMatch(/determinação experimental.*velocidade/iu);
    expect(text).toContain("eco: d_obstáculo = vΔt/2"); expect(text).toMatch(/fontes de erro.*melhorias.*procedimentos alternativos/iu);
  });
  it("mantém campos e forças no âmbito qualitativo explícito das AE",()=>{
    const section=FQA_WAVES_11_DEEP_REVIEW.sections.find(row=>row.id==="f11-fields");
    const text=JSON.stringify(section);
    expect(text).toMatch(/origens dos campos elétrico e magnético/iu); expect(text).toMatch(/linhas de campo/iu);
    expect(text).toMatch(/relação campo-força é qualitativo/iu); expect(text).toMatch(/Oersted/iu);
    expect(text).not.toContain("F_e = k |q₁q₂|/r²");
  });
  it("protege Faraday quantitativo e aplicações de indução",()=>{
    const text=JSON.stringify(FQA_WAVES_11_DEEP_REVIEW);
    expect(text).toContain("Φ_B = BA cosθ"); expect(text).toContain("Faraday-Lenz: ε_ind = −N dΦ_B/dt");
    expect(text).toMatch(/Lei de Faraday.*resolução de problemas/iu); expect(text).toMatch(/geradores e transformadores/iu); expect(text).toMatch(/Lei de Lenz/iu);
  });
  it("protege a sequência histórica Oersted, Faraday, Maxwell e Hertz",()=>{
    const text=JSON.stringify(FQA_WAVES_11_DEEP_REVIEW);
    expect(text).toMatch(/Oersted.*Faraday.*Maxwell.*Hertz/iu); expect(text).toContain("no vazio: c = λf");
    expect(text).toMatch(/tecnologias de comunicação/iu); expect(text).toMatch(/conhecimento do Universo/iu);
  });
  it("protege reflexão, refração, reflexão total, difração e trabalho com laser",()=>{
    const text=JSON.stringify(FQA_WAVES_11_DEEP_REVIEW);
    expect(text).toContain("lei da reflexão: θ_r = θ_i"); expect(text).toContain("lei de Snell: n₁ sinθ₁ = n₂ sinθ₂");
    expect(text).toContain("para n₁>n₂: sinθ_c = n₂/n₁"); expect(text).toContain("rede de difração: d sinθ = mλ");
    expect(text).toMatch(/índice de refração.*comprimento de onda.*laser.*rede de difração/iu); expect(text).toMatch(/frequência mantém-se/iu);
  });
  it("regista Ondas e acompanha a progressão para Equilíbrio Químico",()=>{
    const sources=FQA_WAVES_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u); expect(sources).toMatch(/11.º ano/u); expect(sources).toMatch(/março de 2026/u); expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("f11-waves");
    expect(physicsChemistryDeepReviewContentFor("f11-waves")).toBe(FQA_WAVES_11_DEEP_REVIEW);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q11-equilibrium");
    expect(physicsChemistryDeepReviewContentFor("q11-equilibrium")).not.toBeNull();
  });
});
