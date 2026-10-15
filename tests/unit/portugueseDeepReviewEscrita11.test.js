import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_ESCRITA_11_DEEP_REVIEW,
  PORTUGUESE_ESCRITA_11_DEEP_REVIEW_VERSION,
  portugueseEscrita11DeepReviewFor
} from "../../app/data/portugueseDeepReviewEscrita11";

const EXPECTED_SECTIONS=[
  "pt11-escrita-planificacao",
  "pt11-escrita-opiniao",
  "pt11-escrita-apreciacao",
  "pt11-escrita-exposicao",
  "pt11-escrita-coesao-revisao",
  "pt11-escrita-exame"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_ESCRITA_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Escrita · 11.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_ESCRITA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseEscrita11DeepReviewFor("pt11-escrita")).toBe(PORTUGUESE_ESCRITA_11_DEEP_REVIEW);
    expect(portugueseEscrita11DeepReviewFor("pt11-gramatica")).toBeNull();
    expect(PORTUGUESE_ESCRITA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo",()=>{
    for(const section of PORTUGUESE_ESCRITA_11_DEEP_REVIEW.sections){
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

  it("protege os géneros e processos de escrita ativos",()=>{
    const sources=PORTUGUESE_ESCRITA_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/texto de opinião/iu);
    expect(sources).toMatch(/apreciação crítica/iu);
    expect(sources).toMatch(/exposição sobre um tema/iu);
    expect(sources).toMatch(/pesquisa.*seleção/iu);
    expect(sources).toMatch(/revisão/iu);
    expect(sources).toMatch(/referenciação bibliográfica/iu);
  });

  it("protege planificação por tarefa, pesquisa e função de parágrafo",()=>{
    const text=sectionText("pt11-escrita-planificacao");
    expect(text).toMatch(/género.*tema.*finalidade.*destinatário/iu);
    expect(text).toMatch(/pesquisa/iu);
    expect(text).toMatch(/fontes/iu);
    expect(text).toMatch(/função.*parágrafo|parágrafo.*função/iu);
  });

  it("protege opinião pela cadeia tese → argumento → evidência",()=>{
    const text=sectionText("pt11-escrita-opiniao");
    expect(text).toMatch(/tese/iu);
    expect(text).toMatch(/argument/iu);
    expect(text).toMatch(/evidência|exemplo/iu);
    expect(text).toMatch(/objeção/iu);
    expect(text).toMatch(/circular/iu);
  });

  it("protege apreciação crítica por critério e fundamento",()=>{
    const text=sectionText("pt11-escrita-apreciacao");
    expect(text).toMatch(/sinopse/iu);
    expect(text).toMatch(/critério/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/juízo|avaliação/iu);
    expect(text).toMatch(/balanço/iu);
  });

  it("protege exposição por hierarquia, explicação e reformulação",()=>{
    const text=sectionText("pt11-escrita-exposicao");
    expect(text).toMatch(/informativa|explicativa/iu);
    expect(text).toMatch(/subtemas/iu);
    expect(text).toMatch(/hierarqu/iu);
    expect(text).toMatch(/reformul/iu);
    expect(text).toMatch(/referencia/iu);
  });

  it("protege revisão em camadas e coesão funcional",()=>{
    const text=sectionText("pt11-escrita-coesao-revisao");
    expect(text).toMatch(/coesão/iu);
    expect(text).toMatch(/macro.*meso.*micro/iu);
    expect(text).toMatch(/conectores/iu);
    expect(text).toMatch(/fonte|referenciação/iu);
    expect(text).toMatch(/paráfrase/iu);
  });

  it("protege escrita em prova por checklist e revisão hierarquizada",()=>{
    const text=sectionText("pt11-escrita-exame");
    expect(text).toMatch(/checklist/iu);
    expect(text).toMatch(/planificação|plano/iu);
    expect(text).toMatch(/revisão/iu);
    expect(text).toMatch(/conteúdo.*estrutura/iu);
    expect(text).toMatch(/pontuação.*concordância|concordância.*pontuação/iu);
  });
});
