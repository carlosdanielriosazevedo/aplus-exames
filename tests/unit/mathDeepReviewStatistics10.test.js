import {describe,expect,it} from "vitest";
import {
  STATISTICS_10_REVIEW,
  MATH_STATISTICS_10_REVIEW_VERSION,
  mathStatistics10ReviewContentFor
} from "../../app/data/mathDeepReviewStatistics10";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-est-problema-pop-amostra",
  "10-est-amostragem",
  "10-est-univariados-representacoes",
  "10-est-localizacao",
  "10-est-dispersao",
  "10-est-bivariados-regressao"
];

describe("Rever Matéria profundo · Estatística do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_STATISTICS_10_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias estáveis do mapa",()=>{
    const study=mathStatistics10ReviewContentFor("10-est");
    expect(study).toBe(STATISTICS_10_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of STATISTICS_10_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege problema estatístico, população, amostra e variável",()=>{
    const text=JSON.stringify(STATISTICS_10_REVIEW);
    expect(text).toMatch(/variabilidade/u);
    expect(text).toMatch(/população/u);
    expect(text).toMatch(/amostra ⊂ população/u);
    expect(text).toMatch(/quantitativos discretos/u);
    expect(text).toMatch(/quantitativos contínuos/u);
  });

  it("não confunde dimensão amostral com representatividade",()=>{
    const text=JSON.stringify(STATISTICS_10_REVIEW);
    expect(text).toMatch(/enviesamento de seleção/u);
    expect(text).toMatch(/amostra maior ≠ garantia/u);
    expect(text).toMatch(/500 respostas.*porta da cantina/u);
  });

  it("protege tabelas, gráficos e a natureza própria do histograma",()=>{
    const text=JSON.stringify(STATISTICS_10_REVIEW);
    expect(text).toMatch(/frequência relativa=/u);
    expect(text).toMatch(/caule-e-folhas/u);
    expect(text).toMatch(/extremos-e-quartis/u);
    expect(text).toMatch(/histograma.*área/u);
    expect(text).toMatch(/classes.*igual amplitude/u);
  });

  it("trata localização e dispersão em conjunto e protege resistência a outliers",()=>{
    const text=JSON.stringify(STATISTICS_10_REVIEW);
    expect(text).toMatch(/média x̄=/u);
    expect(text).toMatch(/mediana/u);
    expect(text).toMatch(/Q₁.*Q₃/u);
    expect(text).toMatch(/AIQ=Q₃−Q₁/u);
    expect(text).toMatch(/pouco resistente|sensível a outliers/u);
    expect(text).toMatch(/amplitude interquartil igual a zero não implica/iu);
  });

  it("protege correlação, regressão e causalidade",()=>{
    const text=JSON.stringify(STATISTICS_10_REVIEW);
    expect(text).toMatch(/−1≤r≤1/u);
    expect(text).toMatch(/r≈0 não exclui associação não linear/u);
    expect(text).toMatch(/reta de regressão/u);
    expect(text).toMatch(/domínio observado/u);
    expect(text).toMatch(/Correlação não prova causa-efeito/u);
    expect(text).toMatch(/variável perturbadora/u);
  });

  it("regista a base curricular oficial e a coletânea piloto",()=>{
    const sources=STATISTICS_10_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/abril de 2024/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-est");
    expect(mathDeepReviewContentFor("10-est")).toBe(STATISTICS_10_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
