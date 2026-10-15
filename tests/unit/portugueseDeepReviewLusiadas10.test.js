import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_LUSIADAS_10_DEEP_REVIEW,
  PORTUGUESE_LUSIADAS_10_DEEP_REVIEW_VERSION,
  portugueseLusiadas10DeepReviewFor
} from "../../app/data/portugueseDeepReviewLusiadas10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-lus-mapa",
  "pt10-lus-i105",
  "pt10-lus-v92",
  "pt10-lus-vii78",
  "pt10-lus-viii96",
  "pt10-lus-ix88",
  "pt10-lus-x145",
  "pt10-lus-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Os Lusíadas",()=>{
  it("mantém versão, provider e oito secções profundas",()=>{
    expect(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseLusiadas10DeepReviewFor("pt10-lusiadas")).toBe(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW);
    expect(portugueseLusiadas10DeepReviewFor("pt11-vieira")).toBeNull();
    expect(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo específico de Português",()=>{
    for(const section of PORTUGUESE_LUSIADAS_10_DEEP_REVIEW.sections){
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

  it("protege o corpus ativo: escolher três entre os seis blocos prescritos",()=>{
    const sources=PORTUGUESE_LUSIADAS_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/Currículo Nacional/iu);
    expect(sources).toMatch(/escolher três/iu);
    for(const range of ["I 105-106","V 92-100","VII 78-87","VIII 96-99","IX 88-95","X 145-156"]){
      expect(sources).toContain(range);
    }
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/três dos seis blocos prescritos|escolha de três/iu);
    expect(text).toMatch(/não trata os seis como leituras obrigatórias/iu);
  });

  it("protege a passagem de episódio concreto para reflexão geral",()=>{
    const text=sectionText("pt10-lus-mapa");
    expect(text).toMatch(/narração/iu);
    expect(text).toMatch(/reflex/iu);
    expect(text).toMatch(/acontecimento|episódio/iu);
    expect(text).toMatch(/tese/iu);
    expect(text).toMatch(/particular|concreto/iu);
    expect(text).toMatch(/universal|geral/iu);
  });

  it("protege Canto I 105-106 pela fragilidade e insegurança humanas",()=>{
    const text=sectionText("pt10-lus-i105");
    expect(text).toMatch(/perigos|ameaças/iu);
    expect(text).toMatch(/fragilidade|vulnerabilidade/iu);
    expect(text).toMatch(/insegurança/iu);
    expect(text).toMatch(/mar.*terra/iu);
    expect(text).toMatch(/exclama/iu);
    expect(text).toMatch(/interroga/iu);
    expect(text).toMatch(/universal/iu);
  });

  it("protege Canto V 92-100 pela complementaridade entre feitos e letras",()=>{
    const text=sectionText("pt10-lus-v92");
    expect(text).toMatch(/louvor/iu);
    expect(text).toMatch(/memória/iu);
    expect(text).toMatch(/Antiguidade/iu);
    expect(text).toMatch(/letras/iu);
    expect(text).toMatch(/ação|feitos/iu);
    expect(text).toMatch(/complementaridade|articulação/iu);
    expect(text).toMatch(/crítica.*Portugal|crítica.*portugueses/iu);
  });

  it("protege Canto VII 78-87 pela experiência do Poeta e crítica ao mau poder",()=>{
    const text=sectionText("pt10-lus-vii78");
    expect(text).toMatch(/dimensão pessoal|experiência pessoal/iu);
    expect(text).toMatch(/ninfas/iu);
    expect(text).toMatch(/ambição/iu);
    expect(text).toMatch(/interesse pessoal/iu);
    expect(text).toMatch(/exploração do povo/iu);
    expect(text).toMatch(/bem comum/iu);
    expect(text).toMatch(/merece.*cant|digno.*memória/iu);
  });

  it("protege Canto VIII 96-99 pelo poder corruptor do dinheiro",()=>{
    const text=sectionText("pt10-lus-viii96");
    expect(text).toMatch(/corrup/iu);
    expect(text).toMatch(/dinheiro|interesse material/iu);
    expect(text).toMatch(/traição/iu);
    expect(text).toMatch(/justiça|leis/iu);
    expect(text).toMatch(/consciência/iu);
    expect(text).toMatch(/enumeração|acumulação/iu);
    expect(text).toMatch(/tese/iu);
  });

  it("protege Canto IX 88-95 pelo mérito, fama e imortalidade simbólica",()=>{
    const text=sectionText("pt10-lus-ix88");
    expect(text).toMatch(/Ilha dos Amores/iu);
    expect(text).toMatch(/fama/iu);
    expect(text).toMatch(/imortalidade simbólica/iu);
    expect(text).toMatch(/mérito/iu);
    expect(text).toMatch(/esforço/iu);
    expect(text).toMatch(/cobiça|ambição/iu);
    expect(text).toMatch(/exortação/iu);
  });

  it("protege Canto X 145-156 pela coexistência de desalento, crítica e esperança",()=>{
    const text=sectionText("pt10-lus-x145");
    expect(text).toMatch(/desalento/iu);
    expect(text).toMatch(/pátria/iu);
    expect(text).toMatch(/cobiça/iu);
    expect(text).toMatch(/D\. Sebastião|rei/iu);
    expect(text).toMatch(/conselho|exortação/iu);
    expect(text).toMatch(/esperança/iu);
    expect(text).toMatch(/possibilidade de mudança|renovação/iu);
  });

  it("protege comparação e resposta restrita por critério comum e evidência",()=>{
    const text=sectionText("pt10-lus-resposta");
    expect(text).toMatch(/critério comum/iu);
    expect(text).toMatch(/semelhança|diferença/iu);
    expect(text).toMatch(/ideia/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/explica|explicação/iu);
    expect(text).toMatch(/dois resumos independentes/iu);
  });

  it("regista Os Lusíadas sem degradar as quatro waves anteriores",()=>{
    for(const id of ["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id),id).not.toBeNull();
    }
    expect(portugueseDeepReviewContentFor("pt10-lusiadas")).toBe(PORTUGUESE_LUSIADAS_10_DEEP_REVIEW);
  });
});
