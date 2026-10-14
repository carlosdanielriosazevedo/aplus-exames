import {describe,expect,it} from "vitest";
import {
  COUNTING_REVIEW,
  MATH_COUNTING_REVIEW_VERSION,
  mathCountingReviewContentFor
} from "../../app/data/mathDeepReviewCounting";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-cont-adicao-multiplicacao",
  "11-cont-diagramas",
  "11-cont-fatorial",
  "11-cont-permutacoes",
  "11-cont-arranjos",
  "11-cont-combinacoes"
];

describe("Rever Matéria profundo · Contagem 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_COUNTING_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as seis submatérias do mapa vNext",()=>{
    const study=mathCountingReviewContentFor("11-cont");
    expect(study).toBe(COUNTING_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of COUNTING_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue adição de multiplicação e protege contra dupla contagem",()=>{
    const text=JSON.stringify(COUNTING_REVIEW);
    expect(text).toMatch(/Alternativas disjuntas somam/u);
    expect(text).toMatch(/etapas sucessivas multiplicam/u);
    expect(text).toMatch(/nenhum resultado.*contado duas vezes/u);
    expect(text).toMatch(/casos que se sobrepõem/u);
  });

  it("usa representações e princípio do pombal como estratégia de raciocínio",()=>{
    const text=JSON.stringify(COUNTING_REVIEW);
    expect(text).toMatch(/diagrama em árvore/u);
    expect(text).toMatch(/tabelas/u);
    expect(text).toMatch(/princípio do pombal/u);
    expect(text).toMatch(/⌈N\/p⌉/u);
    expect(text).toMatch(/13 pessoas/u);
  });

  it("protege fatorial e os seus casos limite",()=>{
    const text=JSON.stringify(COUNTING_REVIEW);
    expect(text).toMatch(/0!=1/u);
    expect(text).toMatch(/n!=n·\(n−1\)!/u);
    expect(text).toMatch(/9!\/6!=504/u);
    expect(text).toMatch(/\(n\/p\)!.*falso/u);
  });

  it("distingue permutações, arranjos completos, arranjos simples e combinações",()=>{
    const text=JSON.stringify(COUNTING_REVIEW);
    expect(text).toMatch(/P_n=n!/u);
    expect(text).toMatch(/AC_n\^p=n\^p/u);
    expect(text).toMatch(/A_n\^p=n!\/\(n−p\)!/u);
    expect(text).toMatch(/C_n\^p=n!\/\[p!\(n−p\)!\]/u);
    expect(text).toMatch(/A_n\^p=C_n\^p·p!/u);
  });

  it("obriga a decidir ordem e repetição antes de escolher a fórmula",()=>{
    const guide=COUNTING_REVIEW.decisionGuide.join(" ");
    expect(guide).toMatch(/ordem importa/u);
    expect(guide).toMatch(/repetição/u);
    expect(guide).toMatch(/arranjo completo/u);
    expect(guide).toMatch(/arranjo simples/u);
    expect(guide).toMatch(/Combinação/u);
  });

  it("regista fontes oficiais atuais",()=>{
    const sources=COUNTING_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/junho de 2025/u);
  });

  it("entra no registo central mantendo o fallback genérico",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("11-cont");
    expect(mathDeepReviewContentFor("11-cont")).toBe(COUNTING_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
