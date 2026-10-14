import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {MATH_PROBABILITY_REVIEW_VERSION,PROBABILITY_REVIEW,mathProbabilityReviewContentFor} from "../../app/data/mathDeepReviewProbability";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_PROBABILITY_SECTIONS=[
  "12-prob-fenomeno-acontecimentos",
  "12-prob-propriedades",
  "12-prob-condicionada",
  "12-prob-produto-arvores",
  "12-prob-contingencia-independencia",
  "12-prob-total",
  "12-prob-variaveis-discretas",
  "12-prob-normal"
];

const component=readFileSync(new URL("../../app/components/MathReviewMatter.js",import.meta.url),"utf8");

describe("Rever Matéria profundo · Probabilidade",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_PROBABILITY_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as oito submatérias oficiais de Probabilidade do mapa vNext",()=>{
    const study=mathProbabilityReviewContentFor("12-prob");
    expect(study).toBe(PROBABILITY_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_PROBABILITY_SECTIONS);
  });

  it("cada submatéria contém teoria, relações, exemplo resolvido e prevenção de erros",()=>{
    for(const section of PROBABILITY_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue explicitamente Laplace, condicionada, independência e modelo Normal",()=>{
    const text=JSON.stringify(PROBABILITY_REVIEW);
    expect(text).toMatch(/equiprováveis/u);
    expect(text).toMatch(/P\(A\|B\)/u);
    expect(text).toMatch(/independentes/u);
    expect(text).toMatch(/modelo Normal/u);
    expect(text).toMatch(/variável aleatória/u);
  });

  it("regista a base curricular oficial usada",()=>{
    const sources=PROBABILITY_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/12.º/u);
    expect(sources).toMatch(/IAVE/u);
    expect(sources).toMatch(/635/u);
  });

  it("liga Probabilidade ao registo profundo sem alterar o fallback",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-prob");
    expect(mathDeepReviewContentFor("12-prob")).toBe(PROBABILITY_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
    expect(component).toContain('from "../data/mathDeepReviewRegistry"');
    expect(component).toContain(":deepStudy?");
    expect(component).toContain("study?.summary");
  });

  it("o fecho profundo é genérico e não fica preso a Números complexos",()=>{
    expect(component).not.toContain("passar entre a leitura algébrica e a leitura geométrica dos números complexos");
    expect(component).toContain("conceitos centrais desta matéria");
  });
});
