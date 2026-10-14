import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {MATH_DEEP_REVIEW_CONTENT,MATH_DEEP_REVIEW_VERSION,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewContent";

const EXPECTED_COMPLEX_SECTIONS=[
  "12-cplx-unidade-equacoes",
  "12-cplx-forma-algebrica",
  "12-cplx-conjugado-modulo",
  "12-cplx-operacoes-algebricas",
  "12-cplx-argand",
  "12-cplx-forma-trig",
  "12-cplx-operacoes-trig"
];

const component=readFileSync(new URL("../../app/components/MathReviewMatter.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/components/MathReviewMatter.module.css",import.meta.url),"utf8");

describe("Rever Matéria profundo · Matemática A",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as sete submatérias de Números complexos",()=>{
    const study=mathDeepReviewContentFor("12-cplx");
    expect(study).toBe(MATH_DEEP_REVIEW_CONTENT["12-cplx"]);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_COMPLEX_SECTIONS);
  });

  it("cada submatéria contém teoria, relações, exemplo resolvido e prevenção de erros",()=>{
    const study=mathDeepReviewContentFor("12-cplx");
    for(const section of study.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(2);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("regista a base curricular oficial usada na revisão",()=>{
    const sources=mathDeepReviewContentFor("12-cplx").sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/IAVE|EduQA/u);
    expect(sources).toMatch(/635/u);
  });

  it("renderiza a experiência profunda sem remover o fallback das restantes matérias",()=>{
    expect(component).toContain("mathDeepReviewContentFor");
    expect(component).toContain("DeepMathReview");
    expect(component).toContain(":deepStudy?");
    expect(component).toContain("study?.summary");
  });

  it("mantém o novo capítulo em fluxo de leitura de uma coluna e sem mexer no shell partilhado",()=>{
    expect(css).toMatch(/\.deepReviewArticle\{[\s\S]*display:block!important/u);
    expect(css).toMatch(/max-width:900px!important/u);
    expect(component).toContain('className="wideStudentShell reviewStudyPage"');
  });
});
