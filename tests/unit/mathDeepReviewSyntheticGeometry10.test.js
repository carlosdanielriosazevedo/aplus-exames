import {describe,expect,it} from "vitest";
import {
  SYNTHETIC_GEOMETRY_10_REVIEW,
  MATH_SYNTHETIC_GEOMETRY_10_REVIEW_VERSION,
  mathSyntheticGeometry10ReviewContentFor
} from "../../app/data/mathDeepReviewSyntheticGeometry10";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-gs-propriedades-construcoes",
  "10-gs-circuncentro-incentro",
  "10-gs-baricentro-medianas",
  "10-gs-ortocentro",
  "10-gs-euler-nove-pontos"
];

describe("Rever Matéria profundo · Geometria sintética do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_SYNTHETIC_GEOMETRY_10_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias estáveis do mapa",()=>{
    const study=mathSyntheticGeometry10ReviewContentFor("10-gs");
    expect(study).toBe(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of SYNTHETIC_GEOMETRY_10_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue as quatro retas notáveis pelas propriedades certas",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/mediana.*ponto médio/u);
    expect(text).toMatch(/altura.*perpendicular/u);
    expect(text).toMatch(/bissetriz.*ângulos iguais/u);
    expect(text).toMatch(/mediatriz.*PA=PB/u);
  });

  it("protege incentro e circuncentro e as respetivas equidistâncias",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/OA=OB=OC=R/u);
    expect(text).toMatch(/dist\(I,AB\)=dist\(I,BC\)=dist\(I,CA\)=r/u);
    expect(text).toMatch(/ponto médio da hipotenusa/u);
    expect(text).toMatch(/incentro.*sempre no interior/u);
  });

  it("protege as propriedades das medianas e do baricentro",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/AG=\(2\/3\)AM/u);
    expect(text).toMatch(/AG:GM=2:1/u);
    expect(text).toMatch(/seis triângulos equivalentes/u);
    expect(text).toMatch(/centro de massa/u);
  });

  it("localiza corretamente o ortocentro nos diferentes triângulos",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/triângulo acutângulo.*interior/u);
    expect(text).toMatch(/triângulo retângulo.*vértice do ângulo reto/u);
    expect(text).toMatch(/triângulo obtusângulo.*exterior/u);
    expect(text).toMatch(/O=I=G=H/u);
  });

  it("protege reta de Euler, caso equilátero e circunferência dos nove pontos",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/O,G,H colineares.*HG=2·GO/u);
    expect(text).toMatch(/não determina uma reta de Euler única/u);
    expect(text).toMatch(/N=ponto médio de OH/u);
    expect(text).toMatch(/R_9=R\/2/u);
    expect(text).toMatch(/3 pontos médios dos lados.*3 pés das alturas.*3 pontos médios/u);
  });

  it("mantém exploração dinâmica subordinada à justificação",()=>{
    const text=JSON.stringify(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(text).toMatch(/geometria dinâmica/u);
    expect(text).toMatch(/não substitui uma demonstração/u);
    expect(text).toMatch(/justificação matemática/u);
  });

  it("regista a base curricular oficial e a coletânea piloto",()=>{
    const sources=SYNTHETIC_GEOMETRY_10_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-gs");
    expect(mathDeepReviewContentFor("10-gs")).toBe(SYNTHETIC_GEOMETRY_10_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
