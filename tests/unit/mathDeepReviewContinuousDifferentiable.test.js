import {describe,expect,it} from "vitest";
import {
  CONTINUOUS_DIFFERENTIABLE_REVIEW,
  MATH_CONTINUOUS_DIFFERENTIABLE_REVIEW_VERSION,
  mathContinuousDifferentiableReviewContentFor
} from "../../app/data/mathDeepReviewContinuousDifferentiable";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-fcont-limites-continuidade",
  "12-fcont-operacoes",
  "12-fcont-lhopital",
  "12-fcont-assintotas",
  "12-fcont-estudo-global"
];

describe("Rever Matéria profundo · Funções contínuas e deriváveis",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_CONTINUOUS_DIFFERENTIABLE_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("segue a estrutura curricular oficial atualizada do tema",()=>{
    const study=mathContinuousDifferentiableReviewContentFor("12-fcont");
    expect(study).toBe(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of CONTINUOUS_DIFFERENTIABLE_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege a definição de continuidade e as condições das operações",()=>{
    const text=JSON.stringify(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(text).toMatch(/lim_\(x→a\) f\(x\)=f\(a\)/u);
    expect(text).toMatch(/limites laterais/u);
    expect(text).toMatch(/g\(a\)≠0/u);
    expect(text).toMatch(/f∘g/u);
    expect(text).toMatch(/ln\(u\(x\)\).*u\(x\)>0/u);
  });

  it("limita L’Hôpital às indeterminações e condições corretas",()=>{
    const text=JSON.stringify(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(text).toMatch(/0\/0 ou ∞\/∞/u);
    expect(text).toMatch(/hipóteses de derivabilidade/u);
    expect(text).toMatch(/0·∞/u);
    expect(text).toMatch(/∞−∞/u);
    expect(text).toMatch(/1\^∞/u);
    expect(text).toMatch(/sen\(x\)\/x = 1/u);
    expect(text).toMatch(/a\^x\/x\^p=\+∞/u);
  });

  it("cobre assíntotas verticais, horizontais e oblíquas por limites",()=>{
    const text=JSON.stringify(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(text).toMatch(/assíntota vertical/u);
    expect(text).toMatch(/assíntota horizontal/u);
    expect(text).toMatch(/assíntota oblíqua/u);
    expect(text).toMatch(/f\(x\)−\(mx\+b\)/u);
    expect(text).toMatch(/zero do denominador sem verificar/u);
  });

  it("fecha o estudo global sem transformar a tecnologia em prova",()=>{
    const text=JSON.stringify(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(text).toMatch(/domínio → zeros\/sinal → limites\/assíntotas → f' → f''/u);
    expect(text).toMatch(/janela mal escolhida/u);
    expect(text).toMatch(/tecnologia gráfica é uma ferramenta de verificação/u);
    expect(text).toMatch(/não existe ponto de inflexão em x=0/u);
  });

  it("regista a base curricular oficial e atual",()=>{
    const sources=CONTINUOUS_DIFFERENTIABLE_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/EduQA|DGE/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/maio de 2026/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/IAVE/u);
    expect(sources).toMatch(/635/u);
  });

  it("entra no registo central e mantém um fallback realmente genérico",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("12-fcont");
    expect(mathDeepReviewContentFor("12-fcont")).toBe(CONTINUOUS_DIFFERENTIABLE_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
