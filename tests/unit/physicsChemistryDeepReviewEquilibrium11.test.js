import {describe,expect,it} from "vitest";
import {
  FQA_EQUILIBRIUM_11_DEEP_REVIEW,
  FQA_EQUILIBRIUM_11_DEEP_REVIEW_VERSION,
  physicsChemistryEquilibrium11DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewEquilibrium11";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=[
  "q11-stoichiometry",
  "q11-limiting-yield",
  "q11-equilibrium-state",
  "q11-kq",
  "q11-lechatelier",
  "q11-green-industry"
];

describe("Rever Matéria profundo · FQ A · Equilíbrio Químico do 11.º",()=>{
  it("mantém versão e cobre exatamente a taxonomia",()=>{
    expect(FQA_EQUILIBRIUM_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    const study=physicsChemistryEquilibrium11DeepReviewFor("q11-equilibrium");
    expect(study).toBe(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(physicsChemistrySubtopicsForDomain("q11-equilibrium").map(row=>row.id));
  });

  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of FQA_EQUILIBRIUM_11_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege quantidade de matéria e razões estequiométricas",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toContain("n = m/M");
    expect(text).toContain("c = n/V");
    expect(text).toMatch(/coeficientes estequiométricos.*quantidades de matéria/iu);
    expect(text).toMatch(/converter os dados para mol.*razão estequiométrica/iu);
    expect(text).toMatch(/N₂\(g\)\+3H₂\(g\)⇌2NH₃\(g\)/u);
  });

  it("protege reagente limitante, rendimento e avaliação experimental",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toContain("reagente limitante: menor valor de n/ν");
    expect(text).toContain("rendimento (%) = quantidade_real/quantidade_teórica × 100");
    expect(text).toMatch(/determinar experimentalmente.*rendimento.*síntese/iu);
    expect(text).toMatch(/fontes de perda ou contaminação.*incerteza.*melhorias/iu);
    expect(text).toMatch(/rendimento experimental superior a 100%/iu);
  });

  it("protege equilíbrio dinâmico e interpretação de gráficos",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toContain("no equilíbrio: v_direta = v_inversa");
    expect(text).toMatch(/equilíbrio é dinâmico/iu);
    expect(text).toMatch(/concentração-tempo.*concentrações deixam de variar/iu);
    expect(text).toMatch(/velocidade-tempo.*velocidades direta e inversa.*mesmo valor/iu);
    expect(text).toMatch(/equilíbrio.*não.*concentrações iguais/iu);
  });

  it("protege K, reação inversa e comparação entre Q e K",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toContain("K_c = [C]^c[D]^d / ([A]^a[B]^b)");
    expect(text).toContain("K_inversa = 1/K_direta");
    expect(text).toContain("Q<K → evolução no sentido direto");
    expect(text).toContain("Q>K → evolução no sentido inverso");
    expect(text).toContain("Q=K → estado de equilíbrio");
    expect(text).toMatch(/K.*dada temperatura/iu);
  });

  it("protege Le Châtelier, temperatura, pressão, concentração e catalisador",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toMatch(/Princípio de Le Châtelier/iu);
    expect(text).toMatch(/pressão.*lado com menor quantidade.*gasosas/iu);
    expect(text).toMatch(/reação direta exotérmica.*aumentar a temperatura.*reagentes/iu);
    expect(text).toMatch(/catalisador.*não altera K.*composição de equilíbrio/iu);
    expect(text).toMatch(/investigar experimentalmente.*temperatura e concentração/iu);
  });

  it("protege química verde e compromisso industrial na síntese do amoníaco",()=>{
    const text=JSON.stringify(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(text).toMatch(/química verde.*matérias-primas.*resíduos.*consumo energético/iu);
    expect(text).toContain("N₂(g) + 3H₂(g) ⇌ 2NH₃(g)");
    expect(text).toMatch(/pressão elevada.*favorece.*NH₃/iu);
    expect(text).toMatch(/temperatura baixa.*favorece.*NH₃.*reação.*lenta/iu);
    expect(text).toMatch(/catalisador.*velocidade.*não altera.*equilíbrio/iu);
    expect(text).toMatch(/recircular reagentes não convertidos/iu);
  });

  it("regista Equilíbrio Químico e mantém Sistemas Aquosos como próximo fallback",()=>{
    const sources=FQA_EQUILIBRIUM_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/11.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q11-equilibrium");
    expect(physicsChemistryDeepReviewContentFor("q11-equilibrium")).toBe(FQA_EQUILIBRIUM_11_DEEP_REVIEW);
    expect(physicsChemistryDeepReviewContentFor("q11-aqueous")).toBeNull();
  });
});
