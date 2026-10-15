import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_CESARIO_11_DEEP_REVIEW,
  PORTUGUESE_CESARIO_11_DEEP_REVIEW_VERSION,
  portugueseCesario11DeepReviewFor
} from "../../app/data/portugueseDeepReviewCesario11";

const EXPECTED_SECTIONS=[
  "pt11-cesario-percurso",
  "pt11-cesario-cidade-tipos",
  "pt11-cesario-sensacoes",
  "pt11-cesario-deambulacao-imaginacao",
  "pt11-cesario-presente-eternidade",
  "pt11-cesario-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_CESARIO_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Cesário Verde · 11.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_CESARIO_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseCesario11DeepReviewFor("pt11-cesario")).toBe(PORTUGUESE_CESARIO_11_DEEP_REVIEW);
    expect(portugueseCesario11DeepReviewFor("pt11-leitura")).toBeNull();
    expect(PORTUGUESE_CESARIO_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_CESARIO_11_DEEP_REVIEW.sections){
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

  it("protege a leitura integral e as quatro partes na ordem correta",()=>{
    const sources=PORTUGUESE_CESARIO_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=sectionText("pt11-cesario-percurso");
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/O Sentimento dum Ocidental.*leitura integral/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/Ave-Marias.*Noite Fechada.*Ao Gás.*Horas Mortas/iu);
    expect(text).toMatch(/progressão temporal/iu);
    expect(text).toMatch(/deambulação/iu);
  });

  it("protege cidade, tipos sociais e crítica através de imagens concretas",()=>{
    const text=sectionText("pt11-cesario-cidade-tipos");
    expect(text).toMatch(/tipos sociais/iu);
    expect(text).toMatch(/trabalhadores/iu);
    expect(text).toMatch(/riqueza.*pobreza|pobreza.*riqueza/iu);
    expect(text).toMatch(/trabalho.*ócio|ócio.*trabalho/iu);
    expect(text).toMatch(/crítica social/iu);
    expect(text).toMatch(/figura concreta.*condição.*contraste/iu);
  });

  it("protege perceção sensorial e transfiguração poética do real",()=>{
    const text=sectionText("pt11-cesario-sensacoes");
    expect(text).toMatch(/luzes|luz/iu);
    expect(text).toMatch(/cores/iu);
    expect(text).toMatch(/sons/iu);
    expect(text).toMatch(/cheiros/iu);
    expect(text).toMatch(/transfigur/iu);
    expect(text).toMatch(/metáfora/iu);
    expect(text).toMatch(/comparação/iu);
  });

  it("protege deambulação, imaginação e contraste com o imaginário épico",()=>{
    const text=sectionText("pt11-cesario-deambulacao-imaginacao");
    expect(text).toMatch(/deambulação/iu);
    expect(text).toMatch(/observador/iu);
    expect(text).toMatch(/memória histórica/iu);
    expect(text).toMatch(/imaginário épico/iu);
    expect(text).toMatch(/grandeza|amplitude/iu);
    expect(text).toMatch(/presente urbano/iu);
  });

  it("protege Horas Mortas pela tensão finitude/eternidade e pelo percurso global",()=>{
    const text=sectionText("pt11-cesario-presente-eternidade");
    expect(text).toMatch(/Horas Mortas/iu);
    expect(text).toMatch(/presente negativo/iu);
    expect(text).toMatch(/finitude.*eternidade|eternidade.*finitude/iu);
    expect(text).toMatch(/clausura.*expansão|expansão.*clausura/iu);
    expect(text).toMatch(/quatro partes/iu);
  });

  it("protege resposta de exame pela cadeia observação → evidência → transformação → significado",()=>{
    const text=sectionText("pt11-cesario-resposta");
    expect(text).toMatch(/observação.*evidência.*transfiguração\/contraste.*efeito.*significado/iu);
    expect(text).toMatch(/excerto/iu);
    expect(text).toMatch(/critério comum/iu);
    expect(text).toMatch(/deambulação/iu);
  });
});
