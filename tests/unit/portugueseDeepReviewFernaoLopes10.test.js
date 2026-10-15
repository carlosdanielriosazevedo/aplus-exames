import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW,
  PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW_VERSION,
  portugueseFernaoLopes10DeepReviewFor
} from "../../app/data/portugueseDeepReviewFernaoLopes10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-fl-cronica",
  "pt10-fl-cap11",
  "pt10-fl-cap115",
  "pt10-fl-cap148",
  "pt10-fl-resposta"
];

describe("Rever Matéria profundo · Português · Fernão Lopes",()=>{
  it("mantém versão, provider e cinco secções profundas",()=>{
    expect(PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseFernaoLopes10DeepReviewFor("pt10-fernao-lopes")).toBe(PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW);
    expect(portugueseFernaoLopes10DeepReviewFor("pt10-gil-vicente")).toBeNull();
    expect(PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico específico de Português",()=>{
    for(const section of PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.prompt,section.id).toBeTruthy();
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.modelAnswer,section.id).toBeTruthy();
      expect(section.example?.note,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege o corpus ativo: capítulo 11 e capítulo 115 ou 148",()=>{
    const sources=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/2018/iu);
    expect(sources).toMatch(/referencial em vigor/iu);
    expect(sources).toMatch(/capítulo 11.*115 ou 148/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/115.*148.*alternativ|148.*115.*alternativ/iu);
    expect(text).toMatch(/segue o capítulo efetivamente trabalhado|alternativa a 148|alternativa prescrita/iu);
  });

  it("protege crónica como narrativa histórica com marcas de credibilidade",()=>{
    const section=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-fl-cronica");
    const text=JSON.stringify(section);
    expect(text).toMatch(/acontecimentos históricos/iu);
    expect(text).toMatch(/técnicas narrativas|cena narrativa/iu);
    expect(text).toMatch(/credibilidade/iu);
    expect(text).toMatch(/testemunhos.*documentos.*pormenores/iu);
    expect(text).toMatch(/não.*objetivo.*sem.*marca|não.*objetividade.*rótulos/iu);
  });

  it("protege capítulo 11: multidão, dinamismo e presentificação demonstrados",()=>{
    const section=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-fl-cap11");
    const text=JSON.stringify(section);
    expect(text).toMatch(/população de Lisboa|multidão/iu);
    expect(text).toMatch(/ator coletivo/iu);
    expect(text).toMatch(/verbos de movimento/iu);
    expect(text).toMatch(/discurso direto/iu);
    expect(text).toMatch(/presentificação/iu);
    expect(text).toMatch(/Mestre.*multidão.*altera.*estado emocional|aparecimento do Mestre.*altera/iu);
  });

  it("protege capítulo 115 como alternativa de defesa organizada e coletiva",()=>{
    const section=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-fl-cap115");
    const text=JSON.stringify(section);
    expect(text).toMatch(/alternativ.*prescrit/iu);
    expect(text).toMatch(/preparação de Lisboa.*cerco castelhano/iu);
    expect(text).toMatch(/recolha de mantimentos.*muralhas.*portas/iu);
    expect(text).toMatch(/atores individuais.*atores coletivos/iu);
    expect(text).toMatch(/consciência coletiva/iu);
  });

  it("protege capítulo 148 como alternativa centrada na fome e em Lisboa",()=>{
    const section=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-fl-cap148");
    const text=JSON.stringify(section);
    expect(text).toMatch(/alternativa prescrita/iu);
    expect(text).toMatch(/fome.*Lisboa/iu);
    expect(text).toMatch(/atores coletivos/iu);
    expect(text).toMatch(/presentificação/iu);
    expect(text).toMatch(/referências.*bíblica/iu);
    expect(text).toMatch(/espaço.*experiência.*coletiva|cidade.*experiência coletiva/iu);
  });

  it("protege resposta de exame por marca narrativa, efeito e significado",()=>{
    const section=PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-fl-resposta");
    const text=JSON.stringify(section);
    expect(text).toMatch(/marca narrativa.*efeito.*significado/iu);
    expect(text).toMatch(/comparar.*critério comum/iu);
    expect(text).toMatch(/ideia.*evidência.*explicação/iu);
    expect(text).toMatch(/não.*resumos|dois resumos/iu);
  });

  it("regista Fernão Lopes sem degradar Poesia Trovadoresca",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-trovadoresca");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-fernao-lopes");
    expect(portugueseDeepReviewContentFor("pt10-fernao-lopes")).toBe(PORTUGUESE_FERNAO_LOPES_10_DEEP_REVIEW);
    expect(portugueseDeepReviewContentFor("pt10-trovadoresca")).not.toBeNull();
  });
});
