import {describe,expect,it} from "vitest";
import {
  FINANCE_10_REVIEW,
  MATH_FINANCE_10_REVIEW_VERSION,
  mathFinance10ReviewContentFor
} from "../../app/data/mathDeepReviewFinance10";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-fin-salarios",
  "10-fin-bruto-liquido",
  "10-fin-irs",
  "10-fin-juro-simples",
  "10-fin-juro-composto-credito"
];

describe("Rever Matéria profundo · Modelos matemáticos em finanças do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_FINANCE_10_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias estáveis do tema",()=>{
    const study=mathFinance10ReviewContentFor("10-fin");
    expect(study).toBe(FINANCE_10_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of FINANCE_10_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege comparações de salários com bases temporais coerentes",()=>{
    const text=JSON.stringify(FINANCE_10_REVIEW);
    expect(text).toMatch(/número de pagamentos anuais/u);
    expect(text).toMatch(/valor-hora/u);
    expect(text).toMatch(/mesma unidade temporal/u);
    expect(text).toMatch(/não existe uma regra universal/iu);
  });

  it("distingue bruto, líquido, retenção e imposto anual",()=>{
    const text=JSON.stringify(FINANCE_10_REVIEW);
    expect(text).toMatch(/salário bruto/u);
    expect(text).toMatch(/salário líquido/u);
    expect(text).toMatch(/retenção na fonte.*(?:adiantamento|provisão)/u);
    expect(text).toMatch(/não deve ser confundida com o IRS anual definitivo/u);
    expect(text).toMatch(/taxas ou tabelas fornecidas/u);
  });

  it("protege a progressividade por escalões",()=>{
    const text=JSON.stringify(FINANCE_10_REVIEW);
    expect(text).toMatch(/diferentes parcelas.*taxas diferentes/u);
    expect(text).toMatch(/taxa marginal/u);
    expect(text).toMatch(/taxa média/u);
    expect(text).toMatch(/17,5%/u);
    expect(text).toMatch(/não significa aplicar a taxa desse escalão a todo o rendimento/u);
  });

  it("separa juro simples de composto e exige unidades compatíveis",()=>{
    const text=JSON.stringify(FINANCE_10_REVIEW);
    expect(text).toMatch(/J=C₀·r·n/u);
    expect(text).toMatch(/Cₙ=C₀\(1\+r\)\^n/u);
    expect(text).toMatch(/mesma unidade/u);
    expect(text).toMatch(/crescimento.*linear/u);
    expect(text).toMatch(/crescimento.*multiplicativo/u);
  });

  it("trata capitalização periódica sem impor uma convenção errada",()=>{
    const text=JSON.stringify(FINANCE_10_REVIEW);
    expect(text).toMatch(/r\/m/u);
    expect(text).toMatch(/mn/u);
    expect(text).toMatch(/taxa nominal/u);
    expect(text).toMatch(/não dividas qualquer taxa efetiva por 12/u);
    expect(text).toMatch(/sem antecipar logaritmos/u);
  });

  it("regista a base curricular oficial atual",()=>{
    const sources=FINANCE_10_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-fin");
    expect(mathDeepReviewContentFor("10-fin")).toBe(FINANCE_10_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
