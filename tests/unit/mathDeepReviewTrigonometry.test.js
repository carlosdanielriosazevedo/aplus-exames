import {describe,expect,it} from "vitest";
import {
  MATH_TRIGONOMETRY_REVIEW_VERSION,
  TRIGONOMETRY_REVIEW,
  mathTrigonometryReviewContentFor
} from "../../app/data/mathDeepReviewTrigonometry";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-trig-triangulos",
  "11-trig-angulos-radianos",
  "11-trig-circulo",
  "11-trig-relacoes",
  "11-trig-funcoes",
  "11-trig-modelacao"
];

describe("Rever Matéria profundo · Trigonometria 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_TRIGONOMETRY_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("segue a taxonomia curricular atual em seis secções",()=>{
    const study=mathTrigonometryReviewContentFor("11-trig");
    expect(study).toBe(TRIGONOMETRY_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    expect(study.sections.map(section=>section.id)).not.toContain("11-trig-equacoes");
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of TRIGONOMETRY_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("inclui os três tipos de função trigonométrica exigidos pelas AE",()=>{
    const text=JSON.stringify(TRIGONOMETRY_REVIEW);
    expect(text).toMatch(/seno, cosseno e tangente/u);
    expect(text).toMatch(/D_sen=D_cos=ℝ/u);
    expect(text).toMatch(/D_tg=ℝ/u);
    expect(text).toMatch(/tg\(x\+π\)=tg x/u);
    expect(text).toMatch(/π\/2\+kπ/u);
  });

  it("protege radianos, círculo trigonométrico e redução ao primeiro quadrante",()=>{
    const text=JSON.stringify(TRIGONOMETRY_REVIEW);
    expect(text).toMatch(/180°=π rad/u);
    expect(text).toMatch(/s=rθ/u);
    expect(text).toMatch(/P\(θ\)=\(cos θ, sen θ\)/u);
    expect(text).toMatch(/sen²θ\+cos²θ=1/u);
    expect(text).toMatch(/redução ao primeiro quadrante/u);
  });

  it("mantém as leis dos senos e cossenos fora do núcleo obrigatório",()=>{
    const triangles=TRIGONOMETRY_REVIEW.sections.find(section=>section.id==="11-trig-triangulos");
    const text=JSON.stringify(triangles);
    expect(text).toMatch(/possível aprofundamento/u);
    expect(text).toMatch(/não como requisito obrigatório/u);
    expect(text).toMatch(/decomposto em dois triângulos retângulos/u);
  });

  it("cobre modelação periódica com parâmetros e uso crítico de tecnologia",()=>{
    const text=JSON.stringify(TRIGONOMETRY_REVIEW);
    expect(text).toMatch(/amplitude=\|b\|/u);
    expect(text).toMatch(/período T=2π\/\|c\|/u);
    expect(text).toMatch(/frequência f=1\/T/u);
    expect(text).toMatch(/linha média/u);
    expect(text).toMatch(/tecnologia gráfica/u);
    expect(text).toMatch(/verificar o domínio temporal/u);
  });

  it("regista apenas fontes oficiais adequadas à nova AE do 11.º ano",()=>{
    const sources=TRIGONOMETRY_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/janeiro de 2025/u);
  });

  it("entra no registo central sem alterar o fallback genérico",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("11-trig");
    expect(mathDeepReviewContentFor("11-trig")).toBe(TRIGONOMETRY_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
