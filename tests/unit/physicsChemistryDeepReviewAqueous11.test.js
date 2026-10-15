import {describe,expect,it} from "vitest";
import {
  FQA_AQUEOUS_11_DEEP_REVIEW,
  FQA_AQUEOUS_11_DEEP_REVIEW_VERSION,
  physicsChemistryAqueous11DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewAqueous11";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=[
  "q11-acid-base",
  "q11-ph",
  "q11-titration",
  "q11-redox",
  "q11-electrochem",
  "q11-solubility",
  "q11-ksp"
];

describe("Rever Matéria profundo · FQ A · Reações em sistemas aquosos do 11.º",()=>{
  it("mantém versão e cobre exatamente a taxonomia",()=>{
    expect(FQA_AQUEOUS_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    const study=physicsChemistryAqueous11DeepReviewFor("q11-aqueous");
    expect(study).toBe(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(physicsChemistrySubtopicsForDomain("q11-aqueous").map(row=>row.id));
  });

  it("mantém o contrato profundo em todas as sete secções",()=>{
    for(const section of FQA_AQUEOUS_11_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege Brønsted-Lowry, transferência de protão e pares conjugados",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toMatch(/Brønsted.*Lowry/iu);
    expect(text).toMatch(/ácido.*doa.*protão/iu);
    expect(text).toMatch(/base.*aceita.*protão/iu);
    expect(text).toMatch(/pares conjugados.*diferem por um protão/iu);
    expect(text).toMatch(/água é anfotérica/iu);
  });

  it("protege autoionização, Kw, pH, fortes e fracos",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toContain("K_w = [H₃O⁺][OH⁻]");
    expect(text).toContain("pH = −log[H₃O⁺]");
    expect(text).toContain("K_a = [A⁻][H₃O⁺]/[HA]");
    expect(text).toContain("K_b = [BH⁺][OH⁻]/[B]");
    expect(text).toMatch(/ácidos fortes.*ionização.*praticamente completa/iu);
    expect(text).toMatch(/ácidos e bases fracos.*parcialmente/iu);
    expect(text).toMatch(/K_w.*depende da temperatura/iu);
  });

  it("protege titulação, equivalência, sais e chuva ácida",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toMatch(/titulação ácido-base/iu);
    expect(text).toMatch(/ponto de equivalência.*condição estequiométrica/iu);
    expect(text).toMatch(/não.*em todos os casos.*pH=7/iu);
    expect(text).toMatch(/caráter ácido, básico ou neutro.*soluções de sais/iu);
    expect(text).toMatch(/chuva ácida.*óxidos atmosféricos.*impactos ambientais/iu);
    expect(text).toContain("para 1:1 no equivalente: c_aV_a = c_bV_b");
  });

  it("protege redox, semirreações, números de oxidação, oxidante e redutor",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toMatch(/transferência de eletrões/iu);
    expect(text).toContain("oxidação: Red → Ox + ne⁻");
    expect(text).toContain("redução: Ox + ne⁻ → Red");
    expect(text).toMatch(/números de oxidação/iu);
    expect(text).toMatch(/espécie oxidada.*redutor/iu);
    expect(text).toMatch(/espécie reduzida.*oxidante/iu);
  });

  it("protege série eletroquímica experimental, previsão de reação e corrosão",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toMatch(/construir experimentalmente uma série eletroquímica/iu);
    expect(text).toMatch(/maior poder redutor/iu);
    expect(text).toMatch(/prever se uma reação redox.*espontânea/iu);
    expect(text).toMatch(/corrosão.*processo redox/iu);
    expect(text).toMatch(/proteção catódica.*metal de sacrifício/iu);
  });

  it("protege águas, solubilidade e investigação do efeito da temperatura",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toMatch(/águas naturais e tratadas.*soluções aquosas/iu);
    expect(text).toMatch(/dióxido de carbono atmosférico/iu);
    expect(text).toMatch(/investigar experimentalmente.*temperatura.*solubilidade/iu);
    expect(text).toMatch(/distingue dissolver mais depressa.*mais solúvel/iu);
    expect(text).toMatch(/solubilidade.*condições/iu);
  });

  it("protege Kps, Qps, precipitação, ião comum, dureza e tratamento da água",()=>{
    const text=JSON.stringify(FQA_AQUEOUS_11_DEEP_REVIEW);
    expect(text).toContain("K_ps(AgCl) = [Ag⁺][Cl⁻]");
    expect(text).toContain("Q_ps<K_ps → não precipita por saturação");
    expect(text).toContain("Q_ps>K_ps → tendência para precipitação");
    expect(text).toMatch(/efeito do ião comum.*Le Châtelier/iu);
    expect(text).toMatch(/dureza da água.*remoção de poluentes.*precipitação/iu);
    expect(text).toMatch(/concentrações após mistura\/diluição/iu);
  });

  it("regista todo o domínio de Sistemas Aquosos",()=>{
    const sources=FQA_AQUEOUS_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/11.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q11-aqueous");
    expect(physicsChemistryDeepReviewContentFor("q11-aqueous")).toBe(FQA_AQUEOUS_11_DEEP_REVIEW);
  });
});
