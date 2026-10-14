import {describe,expect,it} from "vitest";
import {
  DIFFERENTIAL_CALCULUS_11_REVIEW,
  MATH_DIFFERENTIAL_CALCULUS_11_REVIEW_VERSION,
  mathDifferentialCalculus11ReviewContentFor
} from "../../app/data/mathDeepReviewDifferentialCalculus11";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-cd-taxa-media",
  "11-cd-derivada-ponto",
  "11-cd-tangente",
  "11-cd-funcao-derivada",
  "11-cd-regras",
  "11-cd-monotonia-otimizacao"
];

describe("Rever Matéria profundo · Cálculo diferencial do 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_DIFFERENTIAL_CALCULUS_11_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias do mapa",()=>{
    const study=mathDifferentialCalculus11ReviewContentFor("11-cd");
    expect(study).toBe(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of DIFFERENTIAL_CALCULUS_11_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("liga taxa média, razão incremental e tangente",()=>{
    const text=JSON.stringify(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(text).toMatch(/\[f\(b\)−f\(a\)\]\/\(b−a\)/u);
    expect(text).toMatch(/razão incremental/u);
    expect(text).toMatch(/lim_\(h→0\)/u);
    expect(text).toMatch(/declive da tangente/u);
    expect(text).toMatch(/y−f\(a\)=f'\(a\)\(x−a\)/u);
  });

  it("protege as regras de derivação previstas no 11.º ano",()=>{
    const text=JSON.stringify(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(text).toMatch(/\(uv\)'=u'v\+uv'/u);
    expect(text).toMatch(/\(u\/v\)'=\(u'v−uv'\)\/v²/u);
    expect(text).toMatch(/\(x\^n\)'=n·x\^\(n−1\)/u);
    expect(text).toMatch(/regra da cadeia.*12.º ano/u);
  });

  it("não transforma a condição de Fermat numa equivalência",()=>{
    const text=JSON.stringify(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(text).toMatch(/condição necessária/u);
    expect(text).toMatch(/recíproco é falso/u);
    expect(text).toMatch(/f'\(a\)=0 ⇏ extremo local/u);
    expect(text).toMatch(/mudança de sinal/u);
  });

  it("trata otimização como modelo, domínio, candidatos e justificação",()=>{
    const text=JSON.stringify(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(text).toMatch(/função objetivo/u);
    expect(text).toMatch(/domínio imposto pelo contexto/u);
    expect(text).toMatch(/candidato escolhido é efetivamente ótimo/u);
    expect(text).toMatch(/A'>0.*A'<0/u);
  });

  it("regista a base curricular oficial atual",()=>{
    const sources=DIFFERENTIAL_CALCULUS_11_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/11.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
  });

  it("entra no registo central sem acoplar a wave seguinte",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("11-cd");
    expect(mathDeepReviewContentFor("11-cd")).toBe(DIFFERENTIAL_CALCULUS_11_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
