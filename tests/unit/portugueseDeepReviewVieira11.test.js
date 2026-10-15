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
  "pt11-vieira-estrutura",
  "pt11-vieira-cap1",
  "pt11-vieira-louvores",
  "pt11-vieira-repreensoes-gerais",
  "pt11-vieira-cap5",
  "pt11-vieira-peroracao",
  "pt11-vieira-retorica",
  "pt11-vieira-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Padre António Vieira",()=>{
  it("mantém versão, provider e oito secções profundas",()=>{
    expect(PORTUGUESE_VIEIRA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseVieira11DeepReviewFor("pt11-vieira")).toBe(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
    expect(portugueseVieira11DeepReviewFor("pt11-frei-luis")).toBeNull();
    expect(PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo específico de Português",()=>{
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

  it("protege o corpus ativo: capítulos I e V integrais e excertos dos restantes",()=>{
    const sources=PORTUGUESE_VIEIRA_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/11\.º ano/iu);
    expect(sources).toMatch(/capítulos I e V integrais/iu);
    expect(sources).toMatch(/excertos dos restantes/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/capítulo I.*leitura integral|capítulo I, de leitura integral/iu);
    expect(text).toMatch(/capítulo V.*leitura integral|capítulo V, de leitura integral/iu);
  });

  it("protege situação comunicativa e alegoria peixes-homens",()=>{
    const text=sectionText("pt11-vieira-estrutura");
    expect(text).toMatch(/destinatário aparente|formalmente.*peixes/iu);
    expect(text).toMatch(/verdadeiro alvo.*humano|destinatário humano/iu);
    expect(text).toMatch(/alegoria/iu);
    expect(text).toMatch(/peixe.*comportamento humano|peixes.*homens/iu);
    expect(text).toMatch(/persuas/iu);
  });

  it("protege capítulo I pelo conceito predicável e encadeamento lógico",()=>{
    const text=sectionText("pt11-vieira-cap1");
    expect(text).toMatch(/Vós sois o sal da terra/iu);
    expect(text).toMatch(/sal/iu);
    expect(text).toMatch(/corrupção/iu);
    expect(text).toMatch(/pregadores/iu);
    expect(text).toMatch(/ouvintes/iu);
    expect(text).toMatch(/Santo António/iu);
    expect(text).toMatch(/problema argumentativo|motor lógico/iu);
  });

  it("protege louvores como modelo e crítica indireta",()=>{
    const text=sectionText("pt11-vieira-louvores");
    expect(text).toMatch(/louvores gerais/iu);
    expect(text).toMatch(/louvores particulares/iu);
    expect(text).toMatch(/virtude/iu);
    expect(text).toMatch(/contraste/iu);
    expect(text).toMatch(/crítica indireta/iu);
  });

  it("protege repreensões gerais pela passagem do comportamento animal à crítica humana",()=>{
    const text=sectionText("pt11-vieira-repreensoes-gerais");
    expect(text).toMatch(/repreensões em geral/iu);
    expect(text).toMatch(/relações de poder|exploração/iu);
    expect(text).toMatch(/analogia/iu);
    expect(text).toMatch(/perguntas retóricas/iu);
    expect(text).toMatch(/apóstrofes/iu);
    expect(text).toMatch(/auditório/iu);
  });

  it("protege capítulo V pelos quatro peixes e respetivas relações morais",()=>{
    const text=sectionText("pt11-vieira-cap5");
    expect(text).toMatch(/Roncadores.*arrogância|Roncadores.*ostentação/iu);
    expect(text).toMatch(/Pegadores.*dependência interesseira/iu);
    expect(text).toMatch(/Voadores.*ambição/iu);
    expect(text).toMatch(/Polvo.*dissimulação.*traição|Polvo.*falsidade/iu);
    expect(text).toMatch(/propriedade.*comportamento humano.*censura/iu);
  });

  it("protege peroração como síntese e movimento persuasivo final",()=>{
    const text=sectionText("pt11-vieira-peroracao");
    expect(text).toMatch(/peroração/iu);
    expect(text).toMatch(/conclusão/iu);
    expect(text).toMatch(/peixes.*homens|homens.*peixes/iu);
    expect(text).toMatch(/verdadeiro alvo/iu);
    expect(text).toMatch(/persuas/iu);
    expect(text).toMatch(/transformação/iu);
  });

  it("protege recursos retóricos pela função argumentativa e não por inventário",()=>{
    const text=sectionText("pt11-vieira-retorica");
    expect(text).toMatch(/perguntas retóricas/iu);
    expect(text).toMatch(/apóstrofes/iu);
    expect(text).toMatch(/enumerações|gradações/iu);
    expect(text).toMatch(/antíteses/iu);
    expect(text).toMatch(/exemplos/iu);
    expect(text).toMatch(/finalidade persuasiva/iu);
    expect(text).toMatch(/não é adorno|não.*adorno/iu);
  });

  it("protege resposta de exame pela reconstrução do raciocínio",()=>{
    const text=sectionText("pt11-vieira-resposta");
    expect(text).toMatch(/propriedade.*correspondência humana.*vício ou virtude.*finalidade/iu);
    expect(text).toMatch(/tese.*argumento.*recurso.*efeito/iu);
    expect(text).toMatch(/conhecimento global.*não substitui/iu);
    expect(text).toMatch(/raciocínio persuasivo/iu);
  });

  it("regista Vieira sem degradar as cinco waves anteriores",()=>{
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt11-vieira"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id),id).not.toBeNull();
    }
    expect(portugueseDeepReviewContentFor("pt11-vieira")).toBe(PORTUGUESE_VIEIRA_11_DEEP_REVIEW);
  });
});
