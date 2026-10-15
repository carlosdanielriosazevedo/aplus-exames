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
    expect(portugueseGilVicente10DeepReviewFor("pt10-camoes-rimas")).toBeNull();
    expect(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo específico de Português",()=>{
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

  it("protege o corpus vigente como Farsa de Inês Pereira OU Auto da Feira",()=>{
    const sources=PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_GIL_VICENTE_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/em vigor/iu);
    expect(sources).toMatch(/Farsa de Inês Pereira/iu);
    expect(sources).toMatch(/Auto da Feira/iu);
    expect(sources).toMatch(/OU/u);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).not.toMatch(/Auto da Índia/iu);
    expect(text).toMatch(/alternativas curriculares/iu);
    expect(text).toMatch(/apresenta ambas.*apoiar qualquer aluno/iu);
  });

  it("protege teatro como ação, relação, caracterização e crítica",()=>{
    const text=sectionText("pt10-gv-teatro");
    expect(text).toMatch(/texto dramático/iu);
    expect(text).toMatch(/didascálias/iu);
    expect(text).toMatch(/fala|linguagem/iu);
    expect(text).toMatch(/ações/iu);
    expect(text).toMatch(/comicidade/iu);
    expect(text).toMatch(/crítica/iu);
    expect(text).toMatch(/alvo/iu);
  });

  it("protege Farsa de Inês Pereira pela evolução e não por resumo de enredo",()=>{
    const text=sectionText("pt10-gv-ines");
    expect(text).toMatch(/evolução/iu);
    expect(text).toMatch(/expectativa/iu);
    expect(text).toMatch(/casamento/iu);
    expect(text).toMatch(/ascensão social/iu);
    expect(text).toMatch(/Pero Marques/iu);
    expect(text).toMatch(/Escudeiro/iu);
    expect(text).toMatch(/aparência.*realidade/iu);
    expect(text).toMatch(/resumo do enredo/iu);
  });

  it("protege Auto da Feira pela lógica simbólica da troca e pelos alvos da crítica",()=>{
    const text=sectionText("pt10-gv-feira");
    expect(text).toMatch(/espaço simbólico/iu);
    expect(text).toMatch(/Mercúrio/iu);
    expect(text).toMatch(/Tempo/iu);
    expect(text).toMatch(/Roma/iu);
    expect(text).toMatch(/Diabo/iu);
    expect(text).toMatch(/valores/iu);
    expect(text).toMatch(/transação|troca/iu);
    expect(text).toMatch(/crítica moral e social/iu);
  });

  it("protege cómico de linguagem, caráter e situação sem aceitar etiquetas vazias",()=>{
    const text=sectionText("pt10-gv-comico");
    expect(text).toMatch(/linguagem/iu);
    expect(text).toMatch(/caráter/iu);
    expect(text).toMatch(/situação/iu);
    expect(text).toMatch(/expectativa/iu);
    expect(text).toMatch(/alvo da sátira/iu);
    expect(text).toMatch(/Nunca pares/iu);
    expect(text).toMatch(/explicação precisa do mecanismo/iu);
  });

  it("protege personagem → comportamento → crítica social e evita anacronismo simplista",()=>{
    const text=sectionText("pt10-gv-satira");
    expect(text).toMatch(/comportamento concreto/iu);
    expect(text).toMatch(/tipo social/iu);
    expect(text).toMatch(/grupo|instituição/iu);
    expect(text).toMatch(/contexto histórico/iu);
    expect(text).toMatch(/não substitui.*texto|não para substituir.*evidência/iu);
    expect(text).toMatch(/anacrónicos simplistas/iu);
  });

  it("protege o método de resposta da prova 639 e a leitura transferível do excerto",()=>{
    const text=sectionText("pt10-gv-resposta");
    expect(text).toMatch(/prova 639/iu);
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/excertos diferentes/iu);
    expect(text).toMatch(/ideia/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/explica|explicação/iu);
    expect(text).toMatch(/alternativas curriculares/iu);
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
