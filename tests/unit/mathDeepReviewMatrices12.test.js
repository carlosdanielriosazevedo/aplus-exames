import {describe,expect,it} from "vitest";
import {
  MATRICES_12_REVIEW,
  MATH_MATRICES_12_REVIEW_VERSION,
  mathMatrices12ReviewContentFor
} from "../../app/data/mathDeepReviewMatrices12";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-mat-representacao-tipos",
  "12-mat-adicao-escalar",
  "12-mat-produto",
  "12-mat-transformacoes",
  "12-mat-modelacao"
];

describe("Rever Matéria profundo · Matrizes",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_MATRICES_12_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias opcionais oficiais",()=>{
    const study=mathMatrices12ReviewContentFor("12-mat");
    expect(study).toBe(MATRICES_12_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato profundo em todas as secções",()=>{
    for(const section of MATRICES_12_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege dimensão, índices, tipos e identidade",()=>{
    const text=JSON.stringify(MATRICES_12_REVIEW);
    expect(text).toContain("A=[aᵢⱼ]_(m×n) ⇒ A tem m linhas e n colunas");
    expect(text).toMatch(/linha i.*coluna j/iu);
    expect(text).toMatch(/matriz linha.*matriz coluna/iu);
    expect(text).toContain("Iₙ=diag(1,1,…,1)");
  });

  it("protege compatibilidade e não comutatividade do produto",()=>{
    const text=JSON.stringify(MATRICES_12_REVIEW);
    expect(text).toContain("A_(m×n) B_(n×p) ⇒ AB é m×p");
    expect(text).toContain("(AB)ᵢⱼ=Σₖ aᵢₖbₖⱼ");
    expect(text).toMatch(/em geral.*AB≠BA/iu);
    expect(text).toMatch(/AB existir.*BA.*não.*definido/iu);
  });

  it("protege transformações, ordem de composição e translação",()=>{
    const text=JSON.stringify(MATRICES_12_REVIEW);
    expect(text).toContain("rotação θ: Rθ=[[cosθ,−sinθ],[sinθ,cosθ]]");
    expect(text).toContain("translação por v: X'=X+v");
    expect(text).toContain("primeiro A, depois B ⇒ matriz composta BA");
    expect(text).toMatch(/translação.*não é.*forma AX/iu);
  });

  it("mantém aprofundamentos fora do núcleo e exige interpretação do modelo",()=>{
    const text=JSON.stringify(MATRICES_12_REVIEW);
    expect(text).toMatch(/Métodos de Gauss, grafos, PageRank e modelos populacionais.*aprofundamentos/iu);
    expect(text).toMatch(/linhas, colunas e unidades/iu);
    expect(text).toContain("Q_(m×n) p_(n×1) ⇒ c=Qp é m×1");
  });

  it("regista a base curricular atual e entra no registo central",()=>{
    const sources=MATRICES_12_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/12.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-mat");
    expect(mathDeepReviewContentFor("12-mat")).toBe(MATRICES_12_REVIEW);
  });
});
