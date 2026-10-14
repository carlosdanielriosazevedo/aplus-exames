import {describe,expect,it} from "vitest";
import {
  DOT_PRODUCT_REVIEW,
  MATH_DOT_PRODUCT_REVIEW_VERSION,
  mathDotProductReviewContentFor
} from "../../app/data/mathDeepReviewDotProduct";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-pe-declive-inclinacao",
  "11-pe-produto-coordenadas",
  "11-pe-angulo-norma",
  "11-pe-perpendicularidade",
  "11-pe-retas-planos",
  "11-pe-distancias"
];

describe("Rever Matéria profundo · Produto escalar 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_DOT_PRODUCT_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias previstas no mapa vNext",()=>{
    const study=mathDotProductReviewContentFor("11-pe");
    expect(study).toBe(DOT_PRODUCT_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of DOT_PRODUCT_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege declive, inclinação e a exceção das retas verticais",()=>{
    const text=JSON.stringify(DOT_PRODUCT_REVIEW);
    expect(text).toMatch(/m=tg α/u);
    expect(text).toMatch(/declive não definido/u);
    expect(text).toMatch(/2π\/3 rad/u);
  });

  it("cobre produto escalar no plano e espaço e a interpretação pelo ângulo",()=>{
    const text=JSON.stringify(DOT_PRODUCT_REVIEW);
    expect(text).toMatch(/u₁v₁\+u₂v₂/u);
    expect(text).toMatch(/u₁v₁\+u₂v₂\+u₃v₃/u);
    expect(text).toMatch(/u·v=\|\|u\|\|·\|\|v\|\|·cos θ/u);
    expect(text).toMatch(/u·v>0.*agudo/u);
    expect(text).toMatch(/u·v=0.*reto/u);
    expect(text).toMatch(/u·v<0.*obtuso/u);
  });

  it("usa produto escalar nulo como condição de perpendicularidade sem abusar de declives",()=>{
    const text=JSON.stringify(DOT_PRODUCT_REVIEW);
    expect(text).toMatch(/u⊥v ⇔ u·v=0/u);
    expect(text).toMatch(/m₁m₂=−1/u);
    expect(text).toMatch(/quando uma das retas é vertical/u);
  });

  it("cobre equações de planos, posições relativas e distância ponto-plano",()=>{
    const text=JSON.stringify(DOT_PRODUCT_REVIEW);
    expect(text).toMatch(/n·\(X−A\)=0/u);
    expect(text).toMatch(/ax\+by\+cz\+d=0/u);
    expect(text).toMatch(/u·n=0/u);
    expect(text).toMatch(/d\(P,π\)=\|ax₀\+by₀\+cz₀\+d\|/u);
    expect(text).toMatch(/√\(a²\+b²\+c²\)/u);
  });

  it("mantém fora do núcleo os aprofundamentos que as AE não exigem",()=>{
    const notes=DOT_PRODUCT_REVIEW.boundaryNotes.join(" ");
    expect(notes).toMatch(/lugares geométricos/u);
    expect(notes).toMatch(/não pertencem ao núcleo obrigatório/u);
    expect(notes).toMatch(/Produto vetorial/u);
    expect(notes).toMatch(/possíveis aprofundamentos/u);
  });

  it("regista as fontes oficiais atuais",()=>{
    const sources=DOT_PRODUCT_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/abril de 2025/u);
  });

  it("entra no registo central mantendo o fallback genérico",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("11-pe");
    expect(mathDeepReviewContentFor("11-pe")).toBe(DOT_PRODUCT_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
