import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_ESCRITA_10_DEEP_REVIEW,
  PORTUGUESE_ESCRITA_10_DEEP_REVIEW_VERSION,
  portugueseEscrita10DeepReviewFor
} from "../../app/data/portugueseDeepReviewEscrita10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-escrita-processo",
  "pt10-escrita-sintese",
  "pt10-escrita-exposicao",
  "pt10-escrita-apreciacao",
  "pt10-escrita-coesao",
  "pt10-escrita-exame"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_ESCRITA_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Escrita 10.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_ESCRITA_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseEscrita10DeepReviewFor("pt10-escrita")).toBe(PORTUGUESE_ESCRITA_10_DEEP_REVIEW);
    expect(portugueseEscrita10DeepReviewFor("pt10-gramatica")).toBeNull();
    expect(PORTUGUESE_ESCRITA_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_ESCRITA_10_DEEP_REVIEW.sections){
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

  it("protege os três géneros de escrita previstos no 10.º ano",()=>{
    const text=JSON.stringify(PORTUGUESE_ESCRITA_10_DEEP_REVIEW);
    expect(text).toMatch(/síntese/iu);
    expect(text).toMatch(/exposição sobre um tema/iu);
    expect(text).toMatch(/apreciação crítica/iu);
    expect(PORTUGUESE_ESCRITA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/2018.*referencial homologado em vigor/iu);
    expect(PORTUGUESE_ESCRITA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/IAVE.*639.*2026/iu);
  });

  it("protege o processo planificação → textualização → revisão",()=>{
    const text=sectionText("pt10-escrita-processo");
    expect(text).toMatch(/planifica/iu);
    expect(text).toMatch(/textualização/iu);
    expect(text).toMatch(/revisão/iu);
    expect(text).toMatch(/género.*tema.*objetivo.*destinatário/iu);
    expect(text).toMatch(/conteúdo e estrutura/iu);
    expect(text).toMatch(/linguagem/iu);
  });

  it("protege síntese por seleção, hierarquia, reformulação e fidelidade",()=>{
    const text=sectionText("pt10-escrita-sintese");
    expect(text).toMatch(/informação essencial/iu);
    expect(text).toMatch(/hierarqu/iu);
    expect(text).toMatch(/reformula|parafrasear/iu);
    expect(text).toMatch(/fiel|fidelidade/iu);
    expect(text).toMatch(/não acrescenta opinião pessoal/iu);
  });

  it("protege exposição como desenvolvimento organizado e não enumeração",()=>{
    const text=sectionText("pt10-escrita-exposicao");
    expect(text).toMatch(/definir o foco/iu);
    expect(text).toMatch(/definição.*explicação.*exemplificação/iu);
    expect(text).toMatch(/causa e consequência/iu);
    expect(text).toMatch(/conclusão/iu);
    expect(text).toMatch(/enumeração de factos/iu);
  });

  it("protege apreciação crítica por elemento, juízo e fundamentação",()=>{
    const text=sectionText("pt10-escrita-apreciacao");
    expect(text).toMatch(/juízo fundamentado/iu);
    expect(text).toMatch(/discurso valorativo/iu);
    expect(text).toMatch(/critérios/iu);
    expect(text).toMatch(/elemento observado.*interpretação.*juízo.*fundamentação/iu);
    expect(text).toMatch(/nuance/iu);
  });

  it("protege coerência e coesão pela relação de sentido",()=>{
    const text=sectionText("pt10-escrita-coesao");
    expect(text).toMatch(/coerência/iu);
    expect(text).toMatch(/coesão/iu);
    expect(text).toMatch(/pronomes.*conectores/iu);
    expect(text).toMatch(/contraste.*consequência/iu);
    expect(text).toMatch(/parágrafo/iu);
    expect(text).toMatch(/valor lógico|relação lógica/iu);
  });

  it("protege as condições da resposta extensa da prova 639",()=>{
    const text=sectionText("pt10-escrita-exame");
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/resposta extensa/iu);
    expect(text).toMatch(/200 e 350 palavras/iu);
    expect(text).toMatch(/exceto.*síntese/iu);
    expect(text).toMatch(/género.*tema.*extensão/iu);
    expect(text).toMatch(/correção linguística/iu);
  });

  it("regista Escrita sem degradar as waves anteriores do 10.º",()=>{
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
  });
});
