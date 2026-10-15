import {describe,expect,it} from "vitest";
import {
  FQA_MATTER_10_DEEP_REVIEW,
  FQA_MATTER_10_DEEP_REVIEW_VERSION,
  physicsChemistryMatter10DeepReviewFor
} from "../../app/data/physicsChemistryDeepReviewMatter10";
import {
  PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,
  physicsChemistryDeepReviewContentFor
} from "../../app/data/physicsChemistryDeepReviewRegistry";
import {physicsChemistrySubtopicsForDomain} from "../../app/data/physicsChemistryTaxonomy";

const EXPECTED_SECTIONS=[
  "q10-bonding",
  "q10-geometry-polarity",
  "q10-carbon",
  "q10-intermolecular",
  "q10-gases-solutions",
  "q10-enthalpy",
  "q10-photochemistry"
];

describe("Rever Matéria profundo · FQ A · Propriedades e Transformações da Matéria",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(FQA_MATTER_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre exatamente as sete submatérias estáveis do domínio",()=>{
    const study=physicsChemistryMatter10DeepReviewFor("q10-matter");
    const taxonomyIds=physicsChemistrySubtopicsForDomain("q10-matter").map(row=>row.id);
    expect(study).toBe(FQA_MATTER_10_DEEP_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).toEqual(taxonomyIds);
  });

  it("cada secção mantém o contrato profundo de estudo",()=>{
    for(const section of FQA_MATTER_10_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege ligação química, energia e gráfico distância internuclear",()=>{
    const text=JSON.stringify(FQA_MATTER_10_DEEP_REVIEW);
    expect(text).toMatch(/atrações.*repulsões/iu);
    expect(text).toMatch(/energia.*mínima/iu);
    expect(text).toMatch(/formação de ligação.*< 0/iu);
    expect(text).toMatch(/quebra de ligação.*> 0/iu);
    expect(text).toMatch(/covalente, iónica e metálica/iu);
  });

  it("protege Lewis, geometria, polaridade e parâmetros de ligação",()=>{
    const text=JSON.stringify(FQA_MATTER_10_DEEP_REVIEW);
    expect(text).toMatch(/estruturas de Lewis/iu);
    expect(text).toMatch(/repulsão.*regiões eletrónicas/iu);
    expect(text).toContain("μ⃗_mol = soma vetorial dos μ⃗ das ligações");
    expect(text).toMatch(/CO₂.*apolar/iu);
    expect(text).toMatch(/ligações mais fortes.*mais curtas/iu);
  });

  it("protege compostos de carbono e interações intermoleculares",()=>{
    const text=JSON.stringify(FQA_MATTER_10_DEEP_REVIEW);
    expect(text).toMatch(/álcoois, aldeídos, cetonas, ácidos carboxílicos e aminas/iu);
    expect(text).toMatch(/saturada.*ligações simples C–C/iu);
    expect(text).toMatch(/Van der Waals/iu);
    expect(text).toMatch(/ligações de hidrogénio/iu);
    expect(text).toMatch(/não se.*quebram ligações O–H.*água ferve/iu);
    expect(text).toMatch(/ebulição da água quebra as ligações covalentes O–H/iu);
  });

  it("protege gases, soluções e procedimentos de preparação",()=>{
    const text=JSON.stringify(FQA_MATTER_10_DEEP_REVIEW);
    expect(text).toMatch(/volume molar depende de P e T/iu);
    expect(text).toContain("fração molar: x_i=n_i/n_total e Σx_i=1");
    expect(text).toContain("concentração molar: c=n_soluto/V_solução");
    expect(text).toContain("diluição do mesmo soluto: c_iV_i=c_fV_f");
    expect(text).toMatch(/completa.*volume final.*250,0 mL/iu);
    expect(text).toMatch(/troposfera.*gases com efeito de estufa/iu);
  });

  it("protege entalpia, fotoquímica, AgCl e papéis do ozono",()=>{
    const text=JSON.stringify(FQA_MATTER_10_DEEP_REVIEW);
    expect(text).toContain("ΔH = H_produtos − H_reagentes");
    expect(text).toContain("a pressão constante: q_p = ΔH");
    expect(text).toMatch(/quebrar ligações.*requer energia/iu);
    expect(text).toMatch(/cloreto de prata/iu);
    expect(text).toMatch(/estratosfera.*ultravioleta/iu);
    expect(text).toMatch(/troposfera.*poluente/iu);
    expect(text).toContain("O· + O₂ → O₃");
  });

  it("regista fontes oficiais e preserva os próximos domínios no fallback",()=>{
    const sources=FQA_MATTER_10_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS).toContain("q10-matter");
    expect(physicsChemistryDeepReviewContentFor("q10-matter")).toBe(FQA_MATTER_10_DEEP_REVIEW);
    expect(physicsChemistryDeepReviewContentFor("f10-energy")).toBeNull();
  });
});
