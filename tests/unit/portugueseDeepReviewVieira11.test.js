import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_VIEIRA_11_DEEP_REVIEW,
  PORTUGUESE_VIEIRA_11_DEEP_REVIEW_VERSION,
  portugueseVieira11DeepReviewFor
} from "../../app/data/portugueseDeepReviewVieira11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt11-vieira-contexto",
  "pt11-vieira-estrutura",
  "pt11-vieira-cap1",
  "pt11-vieira-louvores",
  "pt11-vieira-repreensoes-gerais",
  "pt11-vieira-cap5",
  "pt11-vieira-retorica-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Padre António Vieira · 11.º",()=>{
  it("mantém versão, provider e sete secções profundas",()=>{
    expect(PORTUGUESE_VIEIRA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseVieira11DeepReviewFor("pt11-vieira")).toBe(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
    expect(portugueseVieira11DeepReviewFor("pt11-frei-luis")).toBeNull();
    expect(PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sections){
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

  it("protege o corpus vigente: capítulos I e V integrais, restantes por excertos",()=>{
    const sources=PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/2018/iu);
    expect(sources).toMatch(/capítulos I e V integrais/iu);
    expect(sources).toMatch(/excertos dos restantes/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/Capítulo I/iu);
    expect(text).toMatch(/Capítulo V/iu);
  });

  it("protege contexto, alegoria e objetivos da eloquência",()=>{
    const text=sectionText("pt11-vieira-contexto");
    expect(text).toMatch(/Maranhão.*1654/iu);
    expect(text).toMatch(/alegoria/iu);
    expect(text).toMatch(/peixes.*homens|homens.*peixes/iu);
    expect(text).toMatch(/ensinar.*deleitar.*mover/iu);
    expect(text).toMatch(/persuas/iu);
  });

  it("protege a estrutura e a progressão geral → particular",()=>{
    const text=sectionText("pt11-vieira-estrutura");
    expect(text).toMatch(/exórdio/iu);
    expect(text).toMatch(/invocação/iu);
    expect(text).toMatch(/exposição/iu);
    expect(text).toMatch(/confirmação/iu);
    expect(text).toMatch(/peroração/iu);
    expect(text).toMatch(/conceito predicável/iu);
    expect(text).toMatch(/geral.*particular/iu);
  });

  it("protege o raciocínio integral do Capítulo I",()=>{
    const text=sectionText("pt11-vieira-cap1");
    expect(text).toMatch(/sal.*terra/iu);
    expect(text).toMatch(/corrupção/iu);
    expect(text).toMatch(/pregadores/iu);
    expect(text).toMatch(/ouvintes/iu);
    expect(text).toMatch(/Santo António/iu);
    expect(text).toMatch(/pregar aos peixes/iu);
  });

  it("protege louvores gerais e particulares como analogia moral",()=>{
    const text=sectionText("pt11-vieira-louvores");
    expect(text).toMatch(/Capítulo II/iu);
    expect(text).toMatch(/Capítulo III/iu);
    expect(text).toMatch(/peixe de Tobias/iu);
    expect(text).toMatch(/rémora/iu);
    expect(text).toMatch(/torpedo/iu);
    expect(text).toMatch(/quatro-olhos/iu);
    expect(text).toMatch(/analogia/iu);
  });

  it("protege as repreensões gerais pela crítica social",()=>{
    const text=sectionText("pt11-vieira-repreensoes-gerais");
    expect(text).toMatch(/Capítulo IV/iu);
    expect(text).toMatch(/ictiofagia/iu);
    expect(text).toMatch(/grandes.*pequenos/iu);
    expect(text).toMatch(/exploração|desigualdade/iu);
    expect(text).toMatch(/vaidade/iu);
  });

  it("protege integralmente os quatro exemplos do Capítulo V",()=>{
    const text=sectionText("pt11-vieira-cap5");
    expect(text).toMatch(/roncadores.*arrogância/iu);
    expect(text).toMatch(/pegadores.*oportunismo/iu);
    expect(text).toMatch(/voadores.*ambição/iu);
    expect(text).toMatch(/polvo.*traição/iu);
    expect(text).toMatch(/dissimulação/iu);
    expect(text).toMatch(/característica.*comportamento moral.*alvo humano.*efeito persuasivo/iu);
  });

  it("protege resposta de exame por recurso, efeito, argumento e intenção",()=>{
    const text=sectionText("pt11-vieira-retorica-resposta");
    expect(text).toMatch(/perguntas retóricas/iu);
    expect(text).toMatch(/interpelações/iu);
    expect(text).toMatch(/antíteses/iu);
    expect(text).toMatch(/ideia.*evidência.*efeito.*intenção/iu);
    expect(text).toMatch(/excertos diferentes/iu);
    expect(text).toMatch(/resposta restrita/iu);
  });

  it("regista Vieira sem degradar as oito unidades profundas do 10.º",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt11-vieira");
    expect(portugueseDeepReviewContentFor("pt11-vieira")).toBe(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita","pt10-gramatica"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
  });
});
