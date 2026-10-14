import {describe,expect,it} from "vitest";
import {
  FUNCTIONS_10_REVIEW,
  MATH_FUNCTIONS_10_REVIEW_VERSION,
  mathFunctions10ReviewContentFor
} from "../../app/data/mathDeepReviewFunctions10";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-fun-conceito-representacoes",
  "10-fun-dominio-imagem-zeros",
  "10-fun-afim",
  "10-fun-quadratica",
  "10-fun-transformacoes-ramos-modulo"
];

describe("Rever Matéria profundo · Funções do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_FUNCTIONS_10_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias estáveis do mapa",()=>{
    const study=mathFunctions10ReviewContentFor("10-fun");
    expect(study).toBe(FUNCTIONS_10_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of FUNCTIONS_10_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege conceito, representações, domínio e imagem",()=>{
    const text=JSON.stringify(FUNCTIONS_10_REVIEW);
    expect(text).toMatch(/cada x∈D tem exatamente uma imagem/u);
    expect(text).toMatch(/diagrama, tabela, gráfico ou expressão analítica/u);
    expect(text).toMatch(/Im\(f\)=\{f\(x\):x∈D\}⊆C/u);
    expect(text).toMatch(/conjunto de chegada/u);
  });

  it("distingue zeros, f(0), imagem e sinal",()=>{
    const text=JSON.stringify(FUNCTIONS_10_REVIEW);
    expect(text).toMatch(/zero a ⇔ f\(a\)=0/u);
    expect(text).toMatch(/não confundas o zero da função com o valor f\(0\)/iu);
    expect(text).toMatch(/imagem depende do domínio/iu);
    expect(text).toMatch(/gráfico acima de Ox/u);
  });

  it("protege a função afim e a interpretação do declive",()=>{
    const text=JSON.stringify(FUNCTIONS_10_REVIEW);
    expect(text).toMatch(/f\(x\)=mx\+b/u);
    expect(text).toMatch(/m>0.*crescente/u);
    expect(text).toMatch(/m<0.*decrescente/u);
    expect(text).toMatch(/custo adicional por quilómetro/u);
  });

  it("cobre a quadrática com vértice, discriminante, zeros, sinal e inequações",()=>{
    const text=JSON.stringify(FUNCTIONS_10_REVIEW);
    expect(text).toMatch(/x_v=−b\/\(2a\)/u);
    expect(text).toMatch(/Δ=b²−4ac/u);
    expect(text).toMatch(/Δ>0.*dois zeros reais distintos/u);
    expect(text).toMatch(/inequações do 2.º grau/u);
    expect(text).toMatch(/intervalos que satisfazem/u);
  });

  it("protege transformações, ramos e módulo sem antecipar continuidade",()=>{
    const text=JSON.stringify(FUNCTIONS_10_REVIEW);
    expect(text).toMatch(/f\(x−a\).*direita/u);
    expect(text).toMatch(/c<0.*reflexão/u);
    expect(text).toMatch(/\|x\|=\{x, se x≥0; −x, se x<0\}/u);
    expect(text).toMatch(/fronteira usa <, ≤, > ou ≥/u);
    expect(text).toMatch(/sem antecipar a teoria formal de continuidade/u);
  });

  it("regista a base curricular oficial atual",()=>{
    const sources=FUNCTIONS_10_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-fun");
    expect(mathDeepReviewContentFor("10-fun")).toBe(FUNCTIONS_10_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
