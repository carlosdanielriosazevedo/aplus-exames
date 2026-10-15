import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW,
  PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW_VERSION,
  portugueseRomantismoOpcao11DeepReviewFor
} from "../../app/data/portugueseDeepReviewRomantismoOpcao11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt11-rom-corpus",
  "pt11-rom-tracos",
  "pt11-rom-viagens-viagem",
  "pt11-rom-viagens-novela",
  "pt11-rom-abobada",
  "pt11-rom-amor-perdicao",
  "pt11-rom-comparacao",
  "pt11-rom-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Romantismo opção · 11.º",()=>{
  it("mantém versão, provider e oito secções profundas",()=>{
    expect(PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseRomantismoOpcao11DeepReviewFor("pt11-romantismo-opcao")).toBe(PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW);
    expect(portugueseRomantismoOpcao11DeepReviewFor("pt11-eca")).toBeNull();
    expect(PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW.sections){
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

  it("protege as três alternativas curriculares sem as tornar cumulativas",()=>{
    const text=sectionText("pt11-rom-corpus");
    expect(text).toMatch(/Viagens na Minha Terra/iu);
    expect(text).toMatch(/A Abóbada/iu);
    expect(text).toMatch(/Amor de Perdição/iu);
    expect(text).toMatch(/alternativ/iu);
    expect(text).toMatch(/não.*cumulativ|não.*três.*obrigat/iu);
    expect(text).toMatch(/I, V, VIII, X, XIII, XX, XLIV e XLIX/iu);
    expect(text).toMatch(/A Abóbada.*leitura integral/iu);
    expect(text).toMatch(/Introdução.*I.*IV.*X.*XIX.*Conclusão/iu);
  });

  it("protege Romantismo por evidência e conflito, não por etiquetas",()=>{
    const text=sectionText("pt11-rom-tracos");
    expect(text).toMatch(/subjetividade/iu);
    expect(text).toMatch(/liberdade individual/iu);
    expect(text).toMatch(/ideal.*realidade/iu);
    expect(text).toMatch(/natureza/iu);
    expect(text).toMatch(/passado nacional/iu);
    expect(text).toMatch(/não basta.*romântico|não.*sinónimo/iu);
  });

  it("protege Viagens como viagem, digressão, natureza e crítica",()=>{
    const text=sectionText("pt11-rom-viagens-viagem");
    expect(text).toMatch(/viagem geográfica/iu);
    expect(text).toMatch(/digress/iu);
    expect(text).toMatch(/natureza|paisagem/iu);
    expect(text).toMatch(/coloquialidade/iu);
    expect(text).toMatch(/crítica/iu);
    expect(text).toMatch(/leitor/iu);
  });

  it("protege a novela sentimental de Viagens sem a separar da obra global",()=>{
    const text=sectionText("pt11-rom-viagens-novela");
    expect(text).toMatch(/Carlos/iu);
    expect(text).toMatch(/Joaninha/iu);
    expect(text).toMatch(/Frei Dinis/iu);
    expect(text).toMatch(/Vale de Santarém/iu);
    expect(text).toMatch(/materialismo.*idealismo|idealismo.*materialismo/iu);
    expect(text).toMatch(/narrativa sentimental encaixada/iu);
  });

  it("protege A Abóbada por imaginação histórica, sentimento nacional e herói romântico",()=>{
    const text=sectionText("pt11-rom-abobada");
    expect(text).toMatch(/Mosteiro da Batalha/iu);
    expect(text).toMatch(/imaginação histórica/iu);
    expect(text).toMatch(/sentimento nacional|memória nacional/iu);
    expect(text).toMatch(/Afonso Domingues/iu);
    expect(text).toMatch(/herói romântico/iu);
    expect(text).toMatch(/reconhecimento|mérito/iu);
  });

  it("protege Amor de Perdição por conflito amoroso, cartas e desfecho trágico",()=>{
    const text=sectionText("pt11-rom-amor-perdicao");
    expect(text).toMatch(/Simão Botelho/iu);
    expect(text).toMatch(/Teresa de Albuquerque/iu);
    expect(text).toMatch(/Mariana/iu);
    expect(text).toMatch(/cartas/iu);
    expect(text).toMatch(/amor contrariado/iu);
    expect(text).toMatch(/Conclusão/iu);
    expect(text).toMatch(/trágic/iu);
  });

  it("protege comparação por critério comum, sem dois resumos",()=>{
    const text=sectionText("pt11-rom-comparacao");
    expect(text).toMatch(/critério comum/iu);
    expect(text).toMatch(/semelhança/iu);
    expect(text).toMatch(/diferença/iu);
    expect(text).toMatch(/dois resumos/iu);
  });

  it("protege resposta de exame por alternativa correta e evidência do excerto",()=>{
    const text=sectionText("pt11-rom-resposta");
    expect(text).toMatch(/alternativa curricular/iu);
    expect(text).toMatch(/ideia.*evidência.*mecanismo.*significado/iu);
    expect(text).toMatch(/excerto novo|excertos novos/iu);
    expect(text).toMatch(/conhecimento global/iu);
  });

  it("regista a opção romântica sem degradar Vieira e Frei Luís de Sousa",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-vieira");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-frei-luis");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-romantismo-opcao");
    expect(portugueseDeepReviewContentFor("pt11-vieira")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt11-frei-luis")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt11-romantismo-opcao")).toBe(PORTUGUESE_ROMANTISMO_OPCAO_11_DEEP_REVIEW);
  });
});
