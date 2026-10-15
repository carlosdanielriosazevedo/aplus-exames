import {describe,expect,it} from "vitest";
import {
  INFERENTIAL_STATISTICS_12_REVIEW,
  MATH_INFERENTIAL_STATISTICS_12_REVIEW_VERSION,
  mathInferentialStatistics12ReviewContentFor
} from "../../app/data/mathDeepReviewInferentialStatistics12";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-ie-inferencia-amostragem",
  "12-ie-distribuicoes-amostragem",
  "12-ie-tlc",
  "12-ie-estimacao",
  "12-ie-intervalos-confianca"
];

describe("Rever Matéria profundo · Introdução à Inferência Estatística",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_INFERENTIAL_STATISTICS_12_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias opcionais do mapa",()=>{
    const study=mathInferentialStatistics12ReviewContentFor("12-ie");
    expect(study).toBe(INFERENTIAL_STATISTICS_12_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of INFERENTIAL_STATISTICS_12_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue parâmetro, estatística, estimador e variabilidade amostral",()=>{
    const text=JSON.stringify(INFERENTIAL_STATISTICS_12_REVIEW);
    expect(text).toMatch(/parâmetro.*população/iu);
    expect(text).toMatch(/estatística.*amostra/iu);
    expect(text).toMatch(/variabilidade amostral/iu);
    expect(text).toMatch(/amostra muito grande.*enviesad/iu);
  });

  it("protege distribuição de amostragem e TLC sem dizer que os dados ficam Normais",()=>{
    const text=JSON.stringify(INFERENTIAL_STATISTICS_12_REVIEW);
    expect(text).toContain("DP(x̄)=σ/√n");
    expect(text).toMatch(/Teorema Limite Central/iu);
    expect(text).toMatch(/não afirma que os dados individuais passam a ter distribuição Normal/iu);
    expect(text).toMatch(/quadruplicar n.*metade/iu);
  });

  it("protege estimativas e interpretação correta dos intervalos de confiança",()=>{
    const text=JSON.stringify(INFERENTIAL_STATISTICS_12_REVIEW);
    expect(text).toContain("IC para μ: x̄ ± z_(1−α/2)·σ/√n");
    expect(text).toContain("95%: z_(0,975)≈1,96");
    expect(text).toMatch(/aproximadamente 95% desses intervalos conteriam/iu);
    expect(text).toMatch(/Não se deve dizer.*95% de probabilidade.*μ/iu);
    expect(text).toMatch(/margem de erro.*metade da amplitude/iu);
  });

  it("regista a base curricular oficial atual e entra no registo central",()=>{
    const sources=INFERENTIAL_STATISTICS_12_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/12.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-ie");
    expect(mathDeepReviewContentFor("12-ie")).toBe(INFERENTIAL_STATISTICS_12_REVIEW);
  });
});
