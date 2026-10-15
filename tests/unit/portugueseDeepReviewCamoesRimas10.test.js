import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW,
  PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW_VERSION,
  portugueseCamoesRimas10DeepReviewFor
} from "../../app/data/portugueseDeepReviewCamoesRimas10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-cr-forma",
  "pt10-cr-amor",
  "pt10-cr-tempo",
  "pt10-cr-desconcerto",
  "pt10-cr-recursos",
  "pt10-cr-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Camões · Rimas",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseCamoesRimas10DeepReviewFor("pt10-camoes-rimas")).toBe(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW);
    expect(portugueseCamoesRimas10DeepReviewFor("pt10-lusiadas")).toBeNull();
    expect(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo específico de Português",()=>{
    for(const section of PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW.sections){
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

  it("protege a seleção curricular de quatro redondilhas e oito sonetos",()=>{
    const sources=PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/em vigor/iu);
    expect(sources).toMatch(/quatro redondilhas/iu);
    expect(sources).toMatch(/oito sonetos/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/seleção curricular/iu);
    expect(text).toMatch(/outros textos do mesmo autor|poemas diferentes/iu);
  });

  it("protege forma como ferramenta de sentido e não inventário métrico",()=>{
    const text=sectionText("pt10-cr-forma");
    expect(text).toMatch(/redondilhas/iu);
    expect(text).toMatch(/sonetos/iu);
    expect(text).toMatch(/tradicional ibérica/iu);
    expect(text).toMatch(/renascentista/iu);
    expect(text).toMatch(/mote/iu);
    expect(text).toMatch(/progressão do pensamento/iu);
    expect(text).toMatch(/sentido/iu);
  });

  it("protege o amor como experiência variável e frequentemente contraditória",()=>{
    const text=sectionText("pt10-cr-amor");
    expect(text).toMatch(/desejo/iu);
    expect(text).toMatch(/ausência/iu);
    expect(text).toMatch(/idealização/iu);
    expect(text).toMatch(/antíteses/iu);
    expect(text).toMatch(/paradoxos/iu);
    expect(text).toMatch(/não existe uma única fórmula/iu);
    expect(text).toMatch(/texto/iu);
  });

  it("protege tempo e mudança por contraste, consequência e progressão",()=>{
    const text=sectionText("pt10-cr-tempo");
    expect(text).toMatch(/passagem do tempo/iu);
    expect(text).toMatch(/passado/iu);
    expect(text).toMatch(/presente/iu);
    expect(text).toMatch(/mudança/iu);
    expect(text).toMatch(/consequência/iu);
    expect(text).toMatch(/estrutura|organização/iu);
  });

  it("protege desconcerto como desajuste demonstrado e não sinónimo de tristeza",()=>{
    const text=sectionText("pt10-cr-desconcerto");
    expect(text).toMatch(/desconcerto do mundo/iu);
    expect(text).toMatch(/mérito/iu);
    expect(text).toMatch(/resultado/iu);
    expect(text).toMatch(/experiência individual/iu);
    expect(text).toMatch(/condição humana/iu);
    expect(text).toMatch(/não é sinónimo de tristeza/iu);
  });

  it("protege recursos expressivos pela sequência recurso-mecanismo-efeito-tema",()=>{
    const text=sectionText("pt10-cr-recursos");
    expect(text).toMatch(/antítese/iu);
    expect(text).toMatch(/paradoxo/iu);
    expect(text).toMatch(/anáfora/iu);
    expect(text).toMatch(/metáfora/iu);
    expect(text).toMatch(/mecanismo/iu);
    expect(text).toMatch(/efeito/iu);
    expect(text).toMatch(/tema/iu);
    expect(text).toMatch(/dar expressividade/iu);
  });

  it("protege resposta de exame transferível e baseada em evidência",()=>{
    const text=sectionText("pt10-cr-resposta");
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/poema concreto/iu);
    expect(text).toMatch(/quatro redondilhas/iu);
    expect(text).toMatch(/oito sonetos/iu);
    expect(text).toMatch(/não.*decor|decorad/iu);
  });

  it("regista Camões Rimas sem degradar as waves anteriores",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-trovadoresca");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-fernao-lopes");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-gil-vicente");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-camoes-rimas");
    expect(portugueseDeepReviewContentFor("pt10-camoes-rimas")).toBe(PORTUGUESE_CAMOES_RIMAS_10_DEEP_REVIEW);
    expect(portugueseDeepReviewContentFor("pt10-trovadoresca")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt10-fernao-lopes")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt10-gil-vicente")).not.toBeNull();
  });
});
