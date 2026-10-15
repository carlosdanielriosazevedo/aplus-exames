import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {
  FQA_ELEMENTS_10_DEEP_REVIEW,
  FQA_ELEMENTS_10_DEEP_REVIEW_VERSION,
  physicsChemistryElements10DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewElements10";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const component=readFileSync(new URL("../../app/components/PhysicsChemistryLearnPanel.js",import.meta.url),"utf8");

const EXPECTED_SECTIONS=[
  "q10-atom-structure",
  "q10-amount-molar",
  "q10-spectra",
  "q10-electron-config",
  "q10-periodicity"
];

describe("Rever Matéria profundo · FQ A · Elementos Químicos",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(FQA_ELEMENTS_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre exatamente as cinco submatérias estáveis do domínio",()=>{
    const study=physicsChemistryElements10DeepReviewFor("q10-elements");
    const taxonomyIds=physicsChemistrySubtopicsForDomain("q10-elements").map(row=>row.id);
    expect(study).toBe(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(taxonomyIds);
  });

  it("cada secção mantém o contrato profundo de estudo",()=>{
    for(const section of FQA_ELEMENTS_10_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege estrutura atómica, isótopos e iões",()=>{
    const text=JSON.stringify(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(text).toContain("A = Z + N ⇒ N = A − Z");
    expect(text).toMatch(/isótopos/iu);
    expect(text).toMatch(/ião.*número de eletrões.*Z não muda/iu);
    expect(text).toMatch(/massa atómica relativa.*não deve ser confundida.*número de massa/iu);
  });

  it("protege mol, Avogadro, massa molar e tipo de entidade",()=>{
    const text=JSON.stringify(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(text).toContain("N_A = 6,02214076×10²³ mol⁻¹");
    expect(text).toContain("n = m/M ⇔ m = nM");
    expect(text).toMatch(/átomos, moléculas, iões/iu);
    expect(text).toContain("3,01×10²³ moléculas de H₂O");
  });

  it("protege fotões, espectros e trabalho experimental do teste de chama",()=>{
    const text=JSON.stringify(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(text).toContain("E_fotão = hν");
    expect(text).toContain("c = λν");
    expect(text).toMatch(/espectros de emissão e absorção.*impressão digital/iu);
    expect(text).toMatch(/teste de chama/iu);
    expect(text).toContain("λ≈656 nm");
  });

  it("protege configurações até Z=23, orbitais e princípios de ocupação",()=>{
    const text=JSON.stringify(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(text).toMatch(/até Z=23/iu);
    expect(text).toMatch(/Princípio da Construção/iu);
    expect(text).toMatch(/Exclusão de Pauli/iu);
    expect(text).toMatch(/maximização do número de eletrões desemparelhados/iu);
    expect(text).toContain("V (Z=23): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d³");
  });

  it("protege periodicidade como tendência explicada pela estrutura",()=>{
    const text=JSON.stringify(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(text).toMatch(/ao longo de um período.*raio atómico tende a diminuir/iu);
    expect(text).toMatch(/energia de ionização tende, globalmente, a aumentar/iu);
    expect(text).toMatch(/ao descer num grupo.*raio tende a aumentar/iu);
    expect(text).toMatch(/gases nobres/iu);
    expect(text).toMatch(/picnometria/iu);
    expect(text).toMatch(/tendências globais.*não regras sem exceções/iu);
  });

  it("regista fontes oficiais e acompanha a progressão das waves",()=>{
    const sources=FQA_ELEMENTS_10_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q10-elements");
    expect(physicsChemistryDeepReviewContentFor("q10-elements")).toBe(FQA_ELEMENTS_10_DEEP_REVIEW);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q10-matter");
    expect(physicsChemistryDeepReviewContentFor("q10-matter")).not.toBeNull();
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("f10-energy");
    expect(physicsChemistryDeepReviewContentFor("f10-energy")).not.toBeNull();
    expect(physicsChemistryDeepReviewContentFor("f11-mechanics")).toBeNull();
  });

  it("liga a experiência profunda ao ecrã sem remover o fallback",()=>{
    expect(component).toContain("physicsChemistryDeepReviewContentFor");
    expect(component).toContain("DeepScienceReview");
    expect(component).toContain(":deepStudy?");
    expect(component).toContain('className="portugueseProgressCard"');
    expect(component).toContain("styles.deepReviewArticle");
  });
});
