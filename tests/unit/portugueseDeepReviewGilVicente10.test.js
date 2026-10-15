import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW,
  PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW_VERSION,
  portugueseGilVicente10DeepReviewFor
} from "../../app/data/portugueseDeepReviewGilVicente10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-gv-teatro",
  "pt10-gv-ines",
  "pt10-gv-feira",
  "pt10-gv-comico",
  "pt10-gv-satira",
  "pt10-gv-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Gil Vicente",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseGilVicente10DeepReviewFor("pt10-gil-vicente")).toBe(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW);
    expect(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sections){
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

  it("protege as duas alternativas curriculares vigentes",()=>{
    const sources=PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/Farsa de Inês Pereira/iu);
    expect(sources).toMatch(/Auto da Feira/iu);
    expect(sources).toMatch(/OU/u);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/alternativas curriculares|OU do Auto da Feira/iu);
  });

  it("protege leitura do teatro por ação, relação e crítica",()=>{
    const text=sectionText("pt10-gv-teatro");
    expect(text).toMatch(/texto dramático/iu);
    expect(text).toMatch(/didascálias/iu);
    expect(text).toMatch(/ações/iu);
    expect(text).toMatch(/comicidade/iu);
    expect(text).toMatch(/crítica/iu);
    expect(text).toMatch(/alvo/iu);
  });

  it("protege Farsa de Inês Pereira pela evolução da protagonista",()=>{
    const text=sectionText("pt10-gv-ines");
    expect(text).toMatch(/evolução/iu);
    expect(text).toMatch(/expectativa/iu);
    expect(text).toMatch(/casamento/iu);
    expect(text).toMatch(/ascensão social/iu);
    expect(text).toMatch(/Pero Marques/iu);
    expect(text).toMatch(/Escudeiro/iu);
    expect(text).toMatch(/aparência.*realidade/iu);
  });

  it("protege Auto da Feira pela lógica simbólica da troca",()=>{
    const text=sectionText("pt10-gv-feira");
    expect(text).toMatch(/espaço simbólico/iu);
    expect(text).toMatch(/Mercúrio/iu);
    expect(text).toMatch(/Tempo/iu);
    expect(text).toMatch(/Roma/iu);
    expect(text).toMatch(/Diabo/iu);
    expect(text).toMatch(/transação|troca/iu);
    expect(text).toMatch(/crítica moral e social/iu);
  });

  it("protege cómico de linguagem, caráter e situação com explicação do efeito",()=>{
    const text=sectionText("pt10-gv-comico");
    expect(text).toMatch(/linguagem/iu);
    expect(text).toMatch(/caráter/iu);
    expect(text).toMatch(/situação/iu);
    expect(text).toMatch(/expectativa/iu);
    expect(text).toMatch(/alvo da sátira/iu);
    expect(text).toMatch(/explicação precisa do mecanismo/iu);
  });

  it("protege personagem, comportamento e crítica social",()=>{
    const text=sectionText("pt10-gv-satira");
    expect(text).toMatch(/comportamento concreto/iu);
    expect(text).toMatch(/tipo social/iu);
    expect(text).toMatch(/grupo|instituição/iu);
    expect(text).toMatch(/contexto histórico/iu);
    expect(text).toMatch(/evidência textual|leitura do texto/iu);
  });

  it("protege resposta restrita transferível para a prova 639",()=>{
    const text=sectionText("pt10-gv-resposta");
    expect(text).toMatch(/prova 639/iu);
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/excertos diferentes/iu);
    expect(text).toMatch(/ideia/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/explica|explicação/iu);
  });

  it("regista Gil Vicente sem degradar as waves anteriores",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-trovadoresca");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-fernao-lopes");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-gil-vicente");
    expect(portugueseDeepReviewContentFor("pt10-gil-vicente")).toBe(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW);
    expect(portugueseDeepReviewContentFor("pt10-trovadoresca")).not.toBeNull();
    expect(portugueseDeepReviewContentFor("pt10-fernao-lopes")).not.toBeNull();
  });
});
