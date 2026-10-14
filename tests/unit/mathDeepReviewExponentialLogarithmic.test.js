import {describe,expect,it} from "vitest";
import {EXPONENTIAL_LOGARITHMIC_REVIEW,MATH_EXP_LOG_REVIEW_VERSION,mathExpLogReviewContentFor} from "../../app/data/mathDeepReviewExponentialLogarithmic";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-expl-exponencial",
  "12-expl-modelacao",
  "12-expl-inversa-raizes",
  "12-expl-logaritmica",
  "12-expl-equacoes"
];

describe("Rever Matéria profundo · Funções exponenciais e logarítmicas",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_EXP_LOG_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias do mapa vNext",()=>{
    const study=mathExpLogReviewContentFor("12-expl");
    expect(study).toBe(EXPONENTIAL_LOGARITHMIC_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção é matéria estudável e não apenas orientação",()=>{
    for(const section of EXPONENTIAL_LOGARITHMIC_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege os conceitos que mais geram erros",()=>{
    const text=JSON.stringify(EXPONENTIAL_LOGARITHMIC_REVIEW);
    expect(text).toMatch(/a>0/u);
    expect(text).toMatch(/a≠1/u);
    expect(text).toMatch(/assíntota/u);
    expect(text).toMatch(/f⁻¹/u);
    expect(text).toMatch(/log_a\(x\+y\)|log\(x\+y\)/u);
    expect(text).toMatch(/condições de existência/u);
    expect(text).toMatch(/variação percentual/u);
  });

  it("regista a base curricular oficial e atual",()=>{
    const sources=EXPONENTIAL_LOGARITHMIC_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/EduQA|DGE/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/IAVE/u);
    expect(sources).toMatch(/635/u);
  });

  it("entra no registo central sem duplicar lógica no componente",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toEqual(["12-cplx","12-prob","12-expl"]);
    expect(mathDeepReviewContentFor("12-expl")).toBe(EXPONENTIAL_LOGARITHMIC_REVIEW);
  });

  it("mantém derivadas fora deste capítulo vNext",()=>{
    const headings=EXPONENTIAL_LOGARITHMIC_REVIEW.sections.map(section=>section.title).join(" ");
    expect(headings).not.toMatch(/derivada/u);
  });
});
