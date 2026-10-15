import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_LEITURA_11_DEEP_REVIEW,
  PORTUGUESE_LEITURA_11_DEEP_REVIEW_VERSION,
  portugueseLeitura11DeepReviewFor
} from "../../app/data/portugueseDeepReviewLeitura11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt11-leitura-metodo",
  "pt11-leitura-discurso-politico",
  "pt11-leitura-opiniao",
  "pt11-leitura-apreciacao",
  "pt11-leitura-coesao",
  "pt11-leitura-exame"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_LEITURA_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Leitura · 11.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_LEITURA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseLeitura11DeepReviewFor("pt11-leitura")).toBe(PORTUGUESE_LEITURA_11_DEEP_REVIEW);
    expect(portugueseLeitura11DeepReviewFor("pt11-escrita")).toBeNull();
    expect(PORTUGUESE_LEITURA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo",()=>{
    for(const section of PORTUGUESE_LEITURA_11_DEEP_REVIEW.sections){
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

  it("protege os três géneros de leitura ativos do 11.º",()=>{
    const sources=PORTUGUESE_LEITURA_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/discurso político/iu);
    expect(sources).toMatch(/artigo de opinião/iu);
    expect(sources).toMatch(/apreciação crítica/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
  });

  it("protege tese, argumento e inferência sem extrapolação",()=>{
    const text=sectionText("pt11-leitura-metodo");
    expect(text).toMatch(/tema.*tese|tese.*tema/iu);
    expect(text).toMatch(/argumento/iu);
    expect(text).toMatch(/exemplo/iu);
    expect(text).toMatch(/inferência/iu);
    expect(text).toMatch(/extrapolação/iu);
  });

  it("protege discurso político por auditório, contexto, valores e finalidade",()=>{
    const text=sectionText("pt11-leitura-discurso-politico");
    expect(text).toMatch(/auditório/iu);
    expect(text).toMatch(/contexto/iu);
    expect(text).toMatch(/objetivo/iu);
    expect(text).toMatch(/valores/iu);
    expect(text).toMatch(/perguntas retóricas|vocativos|repetições/iu);
    expect(text).toMatch(/persuas/iu);
  });

  it("protege artigo de opinião por tese, modalização, concessão e refutação",()=>{
    const text=sectionText("pt11-leitura-opiniao");
    expect(text).toMatch(/tese/iu);
    expect(text).toMatch(/modalização/iu);
    expect(text).toMatch(/certeza|possibilidade|obrigação/iu);
    expect(text).toMatch(/concessão/iu);
    expect(text).toMatch(/refutação/iu);
  });

  it("protege apreciação crítica por objeto, critério, evidência e juízo",()=>{
    const text=sectionText("pt11-leitura-apreciacao");
    expect(text).toMatch(/objeto/iu);
    expect(text).toMatch(/critério/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/juízo/iu);
    expect(text).toMatch(/sinopse|resumo/iu);
  });

  it("protege coesão pela relação lógica e pelo referente",()=>{
    const text=sectionText("pt11-leitura-coesao");
    expect(text).toMatch(/causa/iu);
    expect(text).toMatch(/consequência/iu);
    expect(text).toMatch(/oposição/iu);
    expect(text).toMatch(/concessão/iu);
    expect(text).toMatch(/anafóric/iu);
    expect(text).toMatch(/intenção comunicativa/iu);
  });

  it("protege estratégia de exame por conclusão fundamentada, não coincidência lexical",()=>{
    const text=sectionText("pt11-leitura-exame");
    expect(text).toMatch(/opção inteira/iu);
    expect(text).toMatch(/conclusão.*evidência.*explicação/iu);
    expect(text).toMatch(/mecanismo.*efeito.*intenção/iu);
    expect(text).toMatch(/conhecimento exterior/iu);
  });

  it("regista Leitura sem degradar as seis unidades literárias profundas do 11.º",()=>{
    for(const id of ["pt11-vieira","pt11-frei-luis","pt11-romantismo-opcao","pt11-eca","pt11-antero","pt11-cesario","pt11-leitura"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
    expect(portugueseDeepReviewContentFor("pt11-leitura")).toBe(PORTUGUESE_LEITURA_11_DEEP_REVIEW);
  });
});
