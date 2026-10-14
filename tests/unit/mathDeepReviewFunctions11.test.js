import {describe,expect,it} from "vitest";
import {
  FUNCTIONS_11_REVIEW,
  MATH_FUNCTIONS_11_REVIEW_VERSION,
  mathFunctions11ReviewContentFor
} from "../../app/data/mathDeepReviewFunctions11";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-fun-cubicas-quarticas",
  "11-fun-divisao-polinomios",
  "11-fun-resto-raizes",
  "11-fun-operacoes",
  "11-fun-racionais",
  "11-fun-assintotas-modelacao"
];

describe("Rever Matéria profundo · Funções do 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_FUNCTIONS_11_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias estáveis do mapa",()=>{
    const study=mathFunctions11ReviewContentFor("11-fun");
    expect(study).toBe(FUNCTIONS_11_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de capítulo estudável",()=>{
    for(const section of FUNCTIONS_11_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege o comportamento de cúbicas e quárticas sem inventar o número de zeros",()=>{
    const text=JSON.stringify(FUNCTIONS_11_REVIEW);
    expect(text).toMatch(/termo de maior grau/u);
    expect(text).toMatch(/grau ímpar.*pelo menos um zero real/u);
    expect(text).toMatch(/não significa que uma cúbica tenha sempre três zeros reais/u);
    expect(text).toMatch(/janela da calculadora/u);
  });

  it("liga divisão, Ruffini, resto, raízes e multiplicidade",()=>{
    const text=JSON.stringify(FUNCTIONS_11_REVIEW);
    expect(text).toMatch(/P\(x\)=D\(x\)Q\(x\)\+R\(x\)/u);
    expect(text).toMatch(/Ruffini/u);
    expect(text).toMatch(/resto da divisão.*P\(a\)/u);
    expect(text).toMatch(/P\(a\)=0 ⇔ \(x−a\) é fator/u);
    expect(text).toMatch(/multiplicidade par/u);
    expect(text).toMatch(/inequações polinomiais/u);
  });

  it("preserva domínios nas operações com funções",()=>{
    const text=JSON.stringify(FUNCTIONS_11_REVIEW);
    expect(text).toMatch(/D_\(f\/g\)=\{x∈D_f∩D_g : g\(x\)≠0\}/u);
    expect(text).toMatch(/simplificação não recupera o ponto excluído/u);
    expect(text).toMatch(/zero do denominador não é zero da função/u);
  });

  it("cobre a família racional prevista nas AE e as assíntotas do 11.º ano",()=>{
    const text=JSON.stringify(FUNCTIONS_11_REVIEW);
    expect(text).toMatch(/a\+b\/\(x−c\)/u);
    expect(text).toMatch(/x=c é assíntota vertical/u);
    expect(text).toMatch(/y=a é assíntota horizontal/u);
    expect(text).toMatch(/razão dos coeficientes/u);
    expect(text).toMatch(/cancelamento de um fator comum/u);
  });

  it("não antecipa assíntotas oblíquas como núcleo obrigatório desta wave",()=>{
    const section=FUNCTIONS_11_REVIEW.sections.find(item=>item.id==="11-fun-assintotas-modelacao");
    const text=JSON.stringify(section);
    expect(text).toMatch(/assíntotas oblíquas.*não são aqui impostas como núcleo/u);
    expect(text).toMatch(/AE de março de 2026 focarem aqui as verticais e horizontais/u);
  });

  it("regista a base curricular oficial atual",()=>{
    const sources=FUNCTIONS_11_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/11.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("11-fun");
    expect(mathDeepReviewContentFor("11-fun")).toBe(FUNCTIONS_11_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
