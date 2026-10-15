import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_LEITURA_10_DEEP_REVIEW,
  PORTUGUESE_LEITURA_10_DEEP_REVIEW_VERSION,
  portugueseLeitura10DeepReviewFor
} from "../../app/data/portugueseDeepReviewLeitura10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-leitura-metodo",
  "pt10-leitura-relato",
  "pt10-leitura-exposicao",
  "pt10-leitura-apreciacao",
  "pt10-leitura-cartoon",
  "pt10-leitura-exame"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_LEITURA_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Leitura 10.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_LEITURA_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseLeitura10DeepReviewFor("pt10-leitura")).toBe(PORTUGUESE_LEITURA_10_DEEP_REVIEW);
    expect(portugueseLeitura10DeepReviewFor("pt10-escrita")).toBeNull();
    expect(PORTUGUESE_LEITURA_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_LEITURA_10_DEEP_REVIEW.sections){
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

  it("protege os quatro géneros de Leitura previstos nas AE em vigor",()=>{
    const text=JSON.stringify(PORTUGUESE_LEITURA_10_DEEP_REVIEW);
    expect(text).toMatch(/relato de viagem/iu);
    expect(text).toMatch(/exposição sobre um tema/iu);
    expect(text).toMatch(/apreciação crítica/iu);
    expect(text).toMatch(/cartoon/iu);
    expect(PORTUGUESE_LEITURA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/2018.*referencial homologado em vigor/iu);
    expect(PORTUGUESE_LEITURA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/IAVE.*639.*2026/iu);
  });

  it("protege leitura crítica por evidência e inferência sustentada",()=>{
    const text=sectionText("pt10-leitura-metodo");
    expect(text).toMatch(/informação explícita/iu);
    expect(text).toMatch(/inferência/iu);
    expect(text).toMatch(/pistas textuais|pistas observáveis/iu);
    expect(text).toMatch(/tema.*ideia principal/iu);
    expect(text).toMatch(/causa.*consequência.*contraste/iu);
  });

  it("protege relato de viagem por percurso, observação e perspetiva",()=>{
    const text=sectionText("pt10-leitura-relato");
    expect(text).toMatch(/progressão espacial e temporal/iu);
    expect(text).toMatch(/narração.*descrição/iu);
    expect(text).toMatch(/observação.*avaliação/iu);
    expect(text).toMatch(/perspetiva/iu);
    expect(text).toMatch(/itinerário|percurso/iu);
  });

  it("protege exposição por hierarquia e relações lógicas",()=>{
    const text=sectionText("pt10-leitura-exposicao");
    expect(text).toMatch(/definir conceitos|definições/iu);
    expect(text).toMatch(/causa e consequência/iu);
    expect(text).toMatch(/exempl/iu);
    expect(text).toMatch(/hierarqu/iu);
    expect(text).toMatch(/conectores/iu);
  });

  it("protege apreciação crítica por avaliação, critério e fundamentação",()=>{
    const text=sectionText("pt10-leitura-apreciacao");
    expect(text).toMatch(/avaliação fundamentada/iu);
    expect(text).toMatch(/critérios/iu);
    expect(text).toMatch(/razões.*exemplos|exemplos.*razões/iu);
    expect(text).toMatch(/reservas|concessões/iu);
    expect(text).toMatch(/globalmente/iu);
  });

  it("protege cartoon pela articulação entre linguagem verbal e visual",()=>{
    const text=sectionText("pt10-leitura-cartoon");
    expect(text).toMatch(/elementos visuais e verbais/iu);
    expect(text).toMatch(/ironia/iu);
    expect(text).toMatch(/alvo/iu);
    expect(text).toMatch(/contraste/iu);
    expect(text).toMatch(/linguagem verbal e visual/iu);
  });

  it("protege o método de exame para seleção e resposta restrita",()=>{
    const text=sectionText("pt10-leitura-exame");
    expect(text).toMatch(/prova 639/iu);
    expect(text).toMatch(/itens de seleção/iu);
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/distratores/iu);
    expect(text).toMatch(/resposta direta.*evidência.*explicação/iu);
  });

  it("regista Leitura sem degradar as cinco waves anteriores do 10.º",()=>{
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
  });
});
