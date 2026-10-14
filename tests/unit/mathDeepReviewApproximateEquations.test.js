import {describe,expect,it} from "vitest";
import {
  APPROXIMATE_EQUATIONS_REVIEW,
  MATH_APPROXIMATE_EQUATIONS_REVIEW_VERSION,
  mathApproximateEquationsReviewContentFor
} from "../../app/data/mathDeepReviewApproximateEquations";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-rae-bolzano-localizacao",
  "12-rae-bissecao",
  "12-rae-newton"
];

describe("Rever Matéria profundo · Resolução aproximada de equações",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_APPROXIMATE_EQUATIONS_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("segue os três pilares curriculares do bloco",()=>{
    const study=mathApproximateEquationsReviewContentFor("12-rae");
    expect(study).toBe(APPROXIMATE_EQUATIONS_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of APPROXIMATE_EQUATIONS_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege as hipóteses e o alcance de Bolzano-Cauchy",()=>{
    const text=JSON.stringify(APPROXIMATE_EQUATIONS_REVIEW);
    expect(text).toMatch(/f contínua em \[a,b\].*f\(a\)·f\(b\)<0/u);
    expect(text).toMatch(/pelo menos um zero/u);
    expect(text).toMatch(/não garante unicidade/u);
    expect(text).toMatch(/sem verificar continuidade/u);
  });

  it("liga bisseção, amplitude e erro máximo do ponto médio",()=>{
    const text=JSON.stringify(APPROXIMATE_EQUATIONS_REVIEW);
    expect(text).toMatch(/L_n=\(b_0−a_0\)\/2\^n/u);
    expect(text).toMatch(/erro do ponto médio ≤ L_n\/2/u);
    expect(text).toMatch(/2\^\(n\+1\)≤ε/u);
    expect(text).toMatch(/seis bisseções/u);
    expect(text).toMatch(/0,0078125/u);
  });

  it("explica Newton-Raphson algebricamente, geometricamente e com limites reais",()=>{
    const text=JSON.stringify(APPROXIMATE_EQUATIONS_REVIEW);
    expect(text).toMatch(/x_\(n\+1\)=x_n−f\(x_n\)\/f'\(x_n\)/u);
    expect(text).toMatch(/reta tangente/u);
    expect(text).toMatch(/f'\(x_n\)=0/u);
    expect(text).toMatch(/oscilações ou à divergência/u);
    expect(text).toMatch(/outra raiz/u);
  });

  it("não apresenta a diferença entre iterações como garantia universal de erro",()=>{
    const text=JSON.stringify(APPROXIMATE_EQUATIONS_REVIEW);
    expect(text).toMatch(/critério de paragem/u);
    expect(text).toMatch(/não é por si só uma prova universal/u);
    expect(text).toMatch(/garantia matemática de erro/u);
  });

  it("regista a base curricular oficial mais recente",()=>{
    const sources=APPROXIMATE_EQUATIONS_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/EduQA|DGE/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/junho de 2026/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(sources).toMatch(/635/u);
  });

  it("entra no registo central mantendo fallback genérico",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-rae");
    expect(mathDeepReviewContentFor("12-rae")).toBe(APPROXIMATE_EQUATIONS_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
