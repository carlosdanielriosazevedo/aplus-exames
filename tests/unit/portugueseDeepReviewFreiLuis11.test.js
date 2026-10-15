import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW,
  PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW_VERSION,
  portugueseFreiLuis11DeepReviewFor
} from "../../app/data/portugueseDeepReviewFreiLuis11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt11-fls-drama-tragedia",
  "pt11-fls-passado-conflito",
  "pt11-fls-personagens-acao",
  "pt11-fls-espaco-tempo-simbolos",
  "pt11-fls-romeiro-reconhecimento",
  "pt11-fls-ato3-catastrofe",
  "pt11-fls-resposta-exame"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Frei Luís de Sousa · 11.º",()=>{
  it("mantém versão, provider e sete secções profundas",()=>{
    expect(PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseFreiLuis11DeepReviewFor("pt11-frei-luis")).toBe(PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW);
    expect(portugueseFreiLuis11DeepReviewFor("pt11-romantismo-opcao")).toBeNull();
    expect(PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW.sections){
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

  it("protege o corpus vigente como leitura integral",()=>{
    const sources=PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/Frei Luís de Sousa.*leitura integral/iu);
    expect(sources).toMatch(/Estudo Autónomo/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
  });

  it("protege drama histórico e dimensão trágica sem confundir a peça com tragédia clássica pura",()=>{
    const text=sectionText("pt11-fls-drama-tragedia");
    expect(text).toMatch(/drama romântico/iu);
    expect(text).toMatch(/não.*tragédia clássica pura/iu);
    expect(text).toMatch(/Alcácer-Quibir/iu);
    expect(text).toMatch(/sebastianismo/iu);
    expect(text).toMatch(/fatalidade/iu);
    expect(text).toMatch(/reconhecimento/iu);
    expect(text).toMatch(/catástrofe/iu);
  });

  it("protege o passado aberto e o conflito de Madalena, Maria e Telmo",()=>{
    const text=sectionText("pt11-fls-passado-conflito");
    expect(text).toMatch(/Madalena.*D\. João de Portugal/iu);
    expect(text).toMatch(/validade do segundo casamento/iu);
    expect(text).toMatch(/Maria.*identidade|identidade.*Maria/iu);
    expect(text).toMatch(/Telmo/iu);
    expect(text).toMatch(/fidelidade.*D\. João/iu);
    expect(text).toMatch(/afeto.*Maria/iu);
  });

  it("protege caracterização por ação e consequências",()=>{
    const text=sectionText("pt11-fls-personagens-acao");
    expect(text).toMatch(/Manuel de Sousa Coutinho/iu);
    expect(text).toMatch(/incêndio.*palácio/iu);
    expect(text).toMatch(/patriotismo/iu);
    expect(text).toMatch(/Madalena/iu);
    expect(text).toMatch(/Maria/iu);
    expect(text).toMatch(/ação.*altera|decisão.*consequência/iu);
  });

  it("protege espaço, tempo e símbolos pela função dramática",()=>{
    const text=sectionText("pt11-fls-espaco-tempo-simbolos");
    expect(text).toMatch(/mudança.*espaço/iu);
    expect(text).toMatch(/D\. João/iu);
    expect(text).toMatch(/retratos|retrato/iu);
    expect(text).toMatch(/datas|referências históricas/iu);
    expect(text).toMatch(/memória.*ação|passado.*presente/iu);
    expect(text).toMatch(/Romeiro/iu);
  });

  it("protege o Romeiro como reconhecimento que torna a ação irreversível",()=>{
    const text=sectionText("pt11-fls-romeiro-reconhecimento");
    expect(text).toMatch(/Romeiro/iu);
    expect(text).toMatch(/D\. João de Portugal/iu);
    expect(text).toMatch(/reconhecimento|anagnórise/iu);
    expect(text).toMatch(/Madalena/iu);
    expect(text).toMatch(/Manuel/iu);
    expect(text).toMatch(/Maria/iu);
    expect(text).toMatch(/Telmo/iu);
    expect(text).toMatch(/irreversível/iu);
  });

  it("protege o ato III pela cadeia reconhecimento → perda → catástrofe",()=>{
    const text=sectionText("pt11-fls-ato3-catastrofe");
    expect(text).toMatch(/ato final|ato III/iu);
    expect(text).toMatch(/vida religiosa/iu);
    expect(text).toMatch(/Maria/iu);
    expect(text).toMatch(/morte/iu);
    expect(text).toMatch(/catástrofe/iu);
    expect(text).toMatch(/pressentimento.*reconhecimento.*irreversibilidade.*catástrofe/iu);
  });

  it("protege resposta de exame por ideia, evidência, efeito dramático e significado",()=>{
    const text=sectionText("pt11-fls-resposta-exame");
    expect(text).toMatch(/ideia.*evidência.*efeito dramático.*significado/iu);
    expect(text).toMatch(/excerto/iu);
    expect(text).toMatch(/interrupção|silêncio|entrada/iu);
    expect(text).toMatch(/conhecimento integral/iu);
    expect(text).toMatch(/resumo/iu);
  });

  it("regista Frei Luís de Sousa sem degradar Vieira nem o 10.º ano",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-vieira");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-frei-luis");
    expect(portugueseDeepReviewContentFor("pt11-vieira")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt11-frei-luis")).toBe(PORTUGUESE_FREI_LUIS_11_DEEP_REVIEW);
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita","pt10-gramatica"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
  });
});
