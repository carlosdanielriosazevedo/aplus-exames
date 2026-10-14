import {describe,expect,it} from "vitest";
import {
  ELECTIONS_SHARING_REVIEW,
  MATH_ELECTIONS_SHARING_REVIEW_VERSION,
  mathElectionsSharingReviewContentFor
} from "../../app/data/mathDeepReviewElectionsSharing";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "10-ele-majorias",
  "10-ele-borda",
  "10-ele-dhondt",
  "10-ele-stlague-comparacao"
];

describe("Rever Matéria profundo · Eleições e partilha do 10.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_ELECTIONS_SHARING_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as quatro submatérias estáveis do tema",()=>{
    const study=mathElectionsSharingReviewContentFor("10-ele");
    expect(study).toBe(ELECTIONS_SHARING_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of ELECTIONS_SHARING_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue rigorosamente maioria simples de maioria absoluta",()=>{
    const text=JSON.stringify(ELECTIONS_SHARING_REVIEW);
    expect(text).toMatch(/mais votos do que cada uma das restantes/u);
    expect(text).toMatch(/maioria absoluta.*mais de metade/u);
    expect(text).toMatch(/floor\(N\/2\)\+1/u);
    expect(text).toMatch(/50% exatos.*não/u);
  });

  it("protege a lógica de preferência do método de Borda",()=>{
    const text=JSON.stringify(ELECTIONS_SHARING_REVIEW);
    expect(text).toMatch(/boletins de preferência/u);
    expect(text).toMatch(/m−1,m−2,…,1,0/u);
    expect(text).toMatch(/maior pontuação total/u);
    expect(text).toMatch(/diferente do vencedor por maioria simples/u);
  });

  it("protege os divisores corretos de D’Hondt",()=>{
    const section=ELECTIONS_SHARING_REVIEW.sections.find(item=>item.id==="10-ele-dhondt");
    const text=JSON.stringify(section);
    expect(text).toMatch(/V\/1, V\/2, V\/3/u);
    expect(text).toMatch(/cinco maiores/u);
    expect(text).toMatch(/A=3, B=1 e C=1/u);
    expect(text).toMatch(/igualdade exata de quocientes.*regra de desempate depende/u);
  });

  it("separa St. Laguë de D’Hondt e trata a comparação como tendência",()=>{
    const text=JSON.stringify(ELECTIONS_SHARING_REVIEW);
    expect(text).toMatch(/St\. Laguë: V\/1, V\/3, V\/5/u);
    expect(text).toMatch(/D’Hondt: V\/1, V\/2, V\/3/u);
    expect(text).toMatch(/tende.*menos favorável às listas maiores/u);
    expect(text).toMatch(/tendência comparativa, não uma garantia/u);
    expect(text).toMatch(/D’Hondt 3-1-1 e St\. Laguë 2-2-1/u);
  });

  it("não apresenta nenhum método como justiça universal",()=>{
    const text=JSON.stringify(ELECTIONS_SHARING_REVIEW);
    expect(text).toMatch(/vantagens e limitações/u);
    expect(text).toMatch(/sem declarar um método universalmente.*justo/u);
    expect(text).toMatch(/unidades indivisíveis/u);
  });

  it("regista as fontes curriculares oficiais atuais",()=>{
    const sources=ELECTIONS_SHARING_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/10.º ano/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
  });

  it("entra no registo central sem acoplar a próxima wave",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toContain("10-ele");
    expect(mathDeepReviewContentFor("10-ele")).toBe(ELECTIONS_SHARING_REVIEW);
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
