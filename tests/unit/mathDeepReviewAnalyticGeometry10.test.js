import {describe,expect,it} from "vitest";
import {
  ANALYTIC_GEOMETRY_10_REVIEW,
  MATH_ANALYTIC_GEOMETRY_10_REVIEW_VERSION,
  mathAnalyticGeometry10ReviewContentFor
} from "../../app/data/mathDeepReviewAnalyticGeometry10";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-ga-coordenadas-transformacoes",
  "10-ga-distancias-ponto-medio",
  "10-ga-lugares-geometricos",
  "10-ga-vetores",
  "10-ga-colinearidade-retas",
  "10-ga-espaco"
];

describe("Rever Matéria profundo · Geometria Analítica do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_ANALYTIC_GEOMETRY_10_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias estáveis do mapa",()=>{
    const study=mathAnalyticGeometry10ReviewContentFor("10-ga");
    expect(study).toBe(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of ANALYTIC_GEOMETRY_10_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege coordenadas, transformações, distância e ponto médio",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("simetria em Ox");
    expect(text).toContain("simetria em Oy");
    expect(text).toContain("meia-volta de centro O");
    expect(text).toContain("d(A,B)=√((x_B−x_A)²+(y_B−y_A)²)");
    expect(text).toContain("M_AB=((x_A+x_B)/2,(y_A+y_B)/2)");
  });

  it("inclui semiplanos e combinações lógicas de condições",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("semiplanos ax+by≤c e ax+by≥c");
    expect(text).toContain("condição A e B ⇒ interseção");
    expect(text).toContain("condição A ou B ⇒ união");
    expect(text).toMatch(/metade direita do círculo.*incluindo o diâmetro/iu);
  });

  it("distingue fronteira e interior nos lugares geométricos",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("circunferência: (x−a)²+(y−b)²=r²");
    expect(text).toContain("círculo: (x−a)²+(y−b)²≤r²");
    expect(text).toMatch(/equações reduzidas de circunferências/iu);
  });

  it("protege vetores e a ordem ponto final menos ponto inicial",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("AB⃗=(x_B−x_A,y_B−y_A)");
    expect(text).toContain("u⃗−v⃗=(u₁−v₁,u₂−v₂)");
    expect(text).toContain("||u⃗||=√(u₁²+u₂²)");
    expect(text).toMatch(/ponto final menos.*ponto inicial/iu);
    expect(text).toContain("BA⃗=−AB⃗");
  });

  it("protege colinearidade e retas sem inventar declive para verticais",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("reta: X=A+t·v⃗, t∈ℝ, v⃗≠0⃗");
    expect(text).toContain("v_x≠0 ⇒ m=v_y/v_x");
    expect(text).toContain("v_x=0 ⇒ reta vertical x=x_A");
    expect(text).toMatch(/não se força uma forma reduzida com declive infinito/iu);
  });

  it("cobre os conjuntos de pontos exigidos no espaço",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("planos coordenados: x=0, y=0, z=0");
    expect(text).toContain("planos paralelos aos coordenados: x=k, y=k ou z=k");
    expect(text).toContain("plano mediador de AB: PA=PB");
    expect(text).toContain("superfície esférica: (x−a)²+(y−b)²+(z−c)²=r²");
    expect(text).toContain("esfera: (x−a)²+(y−b)²+(z−c)²≤r²");
    expect(text).toMatch(/duas coordenadas constantes.*retas paralelas a um eixo/iu);
  });

  it("estende corretamente distância, vetores e retas ao espaço",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toContain("(z_B−z_A)²");
    expect(text).toContain("AB⃗=(x_B−x_A,y_B−y_A,z_B−z_A)");
    expect(text).toContain("reta no espaço: (x,y,z)=(x₀,y₀,z₀)+t(a,b,c)");
  });

  it("não antecipa o bloco de produto escalar do 11.º ano",()=>{
    const text=JSON.stringify(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/produto escalar.*11.º ano/iu);
    expect(text).toMatch(/ângulos entre retas ou planos ficam para o 11.º ano/iu);
  });

  it("regista a base curricular oficial atual",()=>{
    const sources=ANALYTIC_GEOMETRY_10_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
  });

  it("entra no registo central sem acoplar conteúdo futuro",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-ga");
    expect(mathDeepReviewContentFor("10-ga")).toBe(ANALYTIC_GEOMETRY_10_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
