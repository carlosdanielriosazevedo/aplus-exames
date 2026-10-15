import {describe,expect,it} from "vitest";
import {
  MATH_PRIMITIVES_INTEGRALS_12_REVIEW_VERSION,
  PRIMITIVES_INTEGRALS_12_REVIEW,
  mathPrimitivesIntegrals12ReviewContentFor
} from "../../app/data/mathDeepReviewPrimitivesIntegrals12";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-int-primitiva",
  "12-int-tabela-propriedades",
  "12-int-integral-definido",
  "12-int-tfc-barrow",
  "12-int-areas"
];

describe("Rever Matéria profundo · Primitivas e Integrais",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_PRIMITIVES_INTEGRALS_12_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias opcionais oficiais",()=>{
    const study=mathPrimitivesIntegrals12ReviewContentFor("12-int");
    expect(study).toBe(PRIMITIVES_INTEGRALS_12_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of PRIMITIVES_INTEGRALS_12_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege o conceito de primitiva e a constante de integração",()=>{
    const text=JSON.stringify(PRIMITIVES_INTEGRALS_12_REVIEW);
    expect(text).toContain("F é primitiva de f ⇔ F'(x)=f(x)");
    expect(text).toMatch(/todas as primitivas.*diferem por uma constante/iu);
    expect(text).toContain("∫ f(x) dx = F(x)+C");
    expect(text).toMatch(/verificar.*deriva/iu);
  });

  it("limita o núcleo às primitivas imediatas e à linearidade",()=>{
    const text=JSON.stringify(PRIMITIVES_INTEGRALS_12_REVIEW);
    expect(text).toContain("∫ xⁿ dx = x^(n+1)/(n+1)+C, n≠−1");
    expect(text).toContain("∫ (1/x) dx = ln|x|+C, num intervalo sem 0");
    expect(text).toContain("∫(a f+b g)dx = a∫f dx+b∫g dx");
    expect(text).toMatch(/integração por partes.*fora do núcleo/iu);
  });

  it("distingue integral definido de primitiva e protege Barrow",()=>{
    const text=JSON.stringify(PRIMITIVES_INTEGRALS_12_REVIEW);
    expect(text).toMatch(/integral definido.*produz um valor.*não uma família/iu);
    expect(text).toContain("se F'=f, então ∫ₐᵦf(x)dx=F(b)−F(a)");
    expect(text).toMatch(/limite superior menos limite inferior/iu);
    expect(text).toMatch(/constante.*cancela/iu);
  });

  it("distingue acumulação com sinal de área geométrica",()=>{
    const text=JSON.stringify(PRIMITIVES_INTEGRALS_12_REVIEW);
    expect(text).toContain("f(x)≥0 em [a,b] ⇒ A=∫ₐᵦf(x)dx");
    expect(text).toMatch(/integral definido.*0.*área geométrica.*1/iu);
    expect(text).toMatch(/Integral definido é um valor de acumulação/iu);
  });

  it("regista a base curricular atual e entra no registo central",()=>{
    const sources=PRIMITIVES_INTEGRALS_12_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/12.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-int");
    expect(mathDeepReviewContentFor("12-int")).toBe(PRIMITIVES_INTEGRALS_12_REVIEW);
  });
});
