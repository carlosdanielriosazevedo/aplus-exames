import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_ECA_11_DEEP_REVIEW,
  PORTUGUESE_ECA_11_DEEP_REVIEW_VERSION,
  portugueseEca11DeepReviewFor
} from "../../app/data/portugueseDeepReviewEca11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt11-eca-corpus-realismo",
  "pt11-eca-maias-arquitetura",
  "pt11-eca-maias-intriga",
  "pt11-eca-maias-sociedade",
  "pt11-eca-maias-narrador-espacos",
  "pt11-eca-ramires-dupla-narrativa",
  "pt11-eca-ramires-identidade",
  "pt11-eca-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_ECA_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Eça de Queirós · 11.º",()=>{
  it("mantém versão, provider e oito secções profundas",()=>{
    expect(PORTUGUESE_ECA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseEca11DeepReviewFor("pt11-eca")).toBe(PORTUGUESE_ECA_11_DEEP_REVIEW);
    expect(portugueseEca11DeepReviewFor("pt11-antero")).toBeNull();
    expect(PORTUGUESE_ECA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_ECA_11_DEEP_REVIEW.sections){
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

  it("protege o corpus atualmente em vigor: Os Maias OU A Ilustre Casa de Ramires",()=>{
    const sources=PORTUGUESE_ECA_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_ECA_11_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/referencial em vigor/iu);
    expect(sources).toMatch(/Os Maias.*leitura integral.*OU.*A Ilustre Casa de Ramires.*leitura integral/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).not.toMatch(/A Cidade e as Serras/iu);
    expect(text).toMatch(/não.*cumulativ|não.*obrigação cumulativa/iu);
  });

  it("protege Realismo e ironia como mecanismos demonstrados",()=>{
    const text=sectionText("pt11-eca-corpus-realismo");
    expect(text).toMatch(/Realismo/iu);
    expect(text).toMatch(/observação/iu);
    expect(text).toMatch(/crítica/iu);
    expect(text).toMatch(/ironia/iu);
    expect(text).toMatch(/aparência.*realidade|discurso.*ação/iu);
    expect(text).toMatch(/pormenor/iu);
  });

  it("protege a arquitetura familiar, educação e subtítulo de Os Maias",()=>{
    const text=sectionText("pt11-eca-maias-arquitetura");
    expect(text).toMatch(/Afonso.*Pedro.*Carlos/iu);
    expect(text).toMatch(/Eusebiozinho/iu);
    expect(text).toMatch(/educação/iu);
    expect(text).toMatch(/Episódios da Vida Romântica/iu);
    expect(text).toMatch(/intriga privada.*retrato coletivo|história privada.*retrato coletivo/iu);
  });

  it("protege a intriga Carlos–Maria Eduarda pela progressão trágica e reconhecimento",()=>{
    const text=sectionText("pt11-eca-maias-intriga");
    expect(text).toMatch(/Carlos da Maia/iu);
    expect(text).toMatch(/Maria Eduarda/iu);
    expect(text).toMatch(/sinais/iu);
    expect(text).toMatch(/anagnórise|reconhecimento/iu);
    expect(text).toMatch(/incesto/iu);
    expect(text).toMatch(/Afonso/iu);
    expect(text).toMatch(/indício.*reconhecimento.*releitura.*perda/iu);
  });

  it("protege os episódios sociais pela cadeia comportamento → ironia → crítica",()=>{
    const text=sectionText("pt11-eca-maias-sociedade");
    expect(text).toMatch(/Lisboa oitocentista/iu);
    expect(text).toMatch(/jornalismo/iu);
    expect(text).toMatch(/política/iu);
    expect(text).toMatch(/cultura/iu);
    expect(text).toMatch(/comportamento.*ironia.*crítica social/iu);
  });

  it("protege narrador, espaço e desfecho como instrumentos de releitura",()=>{
    const text=sectionText("pt11-eca-maias-narrador-espacos");
    expect(text).toMatch(/Ramalhete/iu);
    expect(text).toMatch(/Lisboa/iu);
    expect(text).toMatch(/narrador/iu);
    expect(text).toMatch(/focalização/iu);
    expect(text).toMatch(/capítulo final|desfecho/iu);
    expect(text).toMatch(/memória|passagem do tempo/iu);
  });

  it("protege A Ilustre Casa pela dupla narrativa e contraste passado-presente",()=>{
    const text=sectionText("pt11-eca-ramires-dupla-narrativa");
    expect(text).toMatch(/Gonçalo Mendes Ramires/iu);
    expect(text).toMatch(/A Torre de D\. Ramires/iu);
    expect(text).toMatch(/Tructesindo Mendes Ramires/iu);
    expect(text).toMatch(/antepassados/iu);
    expect(text).toMatch(/passado.*presente|presente.*passado/iu);
    expect(text).toMatch(/notoriedade.*polít|prestígio.*polít/iu);
  });

  it("protege Gonçalo como personagem contraditória e o final sem conversão simplista",()=>{
    const text=sectionText("pt11-eca-ramires-identidade");
    expect(text).toMatch(/Gonçalo/iu);
    expect(text).toMatch(/contradit/iu);
    expect(text).toMatch(/ambição política/iu);
    expect(text).toMatch(/África/iu);
    expect(text).toMatch(/ambiguidade/iu);
    expect(text).toMatch(/não.*conversão simples|não.*totalmente inequívoca|evita.*herói/iu);
  });

  it("protege resposta e comparação por alternativa correta, evidência e mecanismo",()=>{
    const text=sectionText("pt11-eca-resposta");
    expect(text).toMatch(/Os Maias.*OU.*A Ilustre Casa de Ramires/iu);
    expect(text).toMatch(/ideia.*evidência.*mecanismo narrativo.*significado crítico/iu);
    expect(text).toMatch(/critério comum/iu);
    expect(text).toMatch(/semelhança/iu);
    expect(text).toMatch(/diferença/iu);
  });

  it("regista Eça sem degradar as waves profundas anteriores do 11.º",()=>{
    for(const id of ["pt11-vieira","pt11-frei-luis","pt11-romantismo-opcao","pt11-eca"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
    expect(portugueseDeepReviewContentFor("pt11-eca")).toBe(PORTUGUESE_ECA_11_DEEP_REVIEW);
  });
});
