import {describe,expect,it} from "vitest";
import {
  MATH_SEQUENCES_REVIEW_VERSION,
  SEQUENCES_REVIEW,
  mathSequencesReviewContentFor
} from "../../app/data/mathDeepReviewSequences";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "11-suc-termo-recorrencia",
  "11-suc-pa",
  "11-suc-pg",
  "11-suc-somas",
  "11-suc-modelacao-comportamento"
];

describe("Rever Matéria profundo · Sucessões 11.º ano",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_SEQUENCES_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias do mapa vNext",()=>{
    const study=mathSequencesReviewContentFor("11-suc");
    expect(study).toBe(SEQUENCES_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of SEQUENCES_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("distingue termo geral, ordem, termo e recorrência",()=>{
    const text=JSON.stringify(SEQUENCES_REVIEW);
    expect(text).toMatch(/n∈ℕ\*/u);
    expect(text).toMatch(/termo geral/u);
    expect(text).toMatch(/recorrência/u);
    expect(text).toMatch(/condição inicial é indispensável/u);
    expect(text).toMatch(/Confundir a ordem n com o valor u_n/u);
  });

  it("protege as definições de PA e PG e o expoente n−1",()=>{
    const text=JSON.stringify(SEQUENCES_REVIEW);
    expect(text).toMatch(/u_n=u_1\+\(n−1\)r/u);
    expect(text).toMatch(/u_n=u_1·q\^\(n−1\)/u);
    expect(text).toMatch(/diferença constante/u);
    expect(text).toMatch(/fator multiplicativo constante/u);
  });

  it("cobre corretamente somas finitas de PA e PG",()=>{
    const text=JSON.stringify(SEQUENCES_REVIEW);
    expect(text).toMatch(/S_n=n\(u_1\+u_n\)\/2/u);
    expect(text).toMatch(/S_n=u_1\(1−q\^n\)\/\(1−q\)/u);
    expect(text).toMatch(/PG, q=1: S_n=n·u_1/u);
    expect(text).toMatch(/930 lugares/u);
  });

  it("inclui a soma infinita de PG apenas sob a condição curricular correta",()=>{
    const text=JSON.stringify(SEQUENCES_REVIEW);
    expect(text).toMatch(/\|q\|<1/u);
    expect(text).toMatch(/S_∞=u_1\/\(1−q\)/u);
    expect(text).toMatch(/Se \|q\|≥1 e u_1≠0/u);
    expect(text).toMatch(/não tem esta soma finita/u);
    expect(text).toMatch(/somas parciais/u);
  });

  it("não ensina que termo tender a zero basta para qualquer série convergir",()=>{
    const text=JSON.stringify(SEQUENCES_REVIEW);
    expect(text).toMatch(/Termos tenderem a zero é necessário/u);
    expect(text).toMatch(/não é uma regra suficiente/u);
  });

  it("regista fontes oficiais atuais",()=>{
    const sources=SEQUENCES_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE|EduQA/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/março de 2026/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/junho de 2025/u);
  });

  it("fica preparado para o registo central sem depender do tema seguinte",()=>{
    const registered=MATH_DEEP_REVIEW_THEME_IDS.includes("11-suc");
    if(registered){
      expect(mathDeepReviewContentFor("11-suc")).toBe(SEQUENCES_REVIEW);
    }else{
      expect(mathDeepReviewContentFor("11-suc")).toBeNull();
    }
    expect(mathDeepReviewContentFor("tema-ainda-nao-convertido")).toBeNull();
  });
});
