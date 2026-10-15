import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_GRAMATICA_10_DEEP_REVIEW,
  PORTUGUESE_GRAMATICA_10_DEEP_REVIEW_VERSION,
  portugueseGramatica10DeepReviewFor
} from "../../app/data/portugueseDeepReviewGramatica10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "pt10-gramatica-metodo",
  "pt10-gramatica-historia",
  "pt10-gramatica-fonologia",
  "pt10-gramatica-formacao",
  "pt10-gramatica-sintaxe",
  "pt10-gramatica-oracoes",
  "pt10-gramatica-modalidade",
  "pt10-gramatica-texto"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Gramática 10.º",()=>{
  it("mantém versão, provider e oito secções profundas",()=>{
    expect(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseGramatica10DeepReviewFor("pt10-gramatica")).toBe(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW);
    expect(portugueseGramatica10DeepReviewFor("pt11-gramatica")).toBeNull();
    expect(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.sections){
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

  it("protege o âmbito curricular da Gramática do 10.º",()=>{
    const text=JSON.stringify(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW);
    expect(text).toMatch(/evolução.*português|português.*evolução/iu);
    expect(text).toMatch(/processos fonológicos/iu);
    expect(text).toMatch(/formação de palavras/iu);
    expect(text).toMatch(/funções sintáticas/iu);
    expect(text).toMatch(/orações subordinadas substantivas/iu);
    expect(text).toMatch(/modalidade/iu);
    expect(text).toMatch(/anáfora/iu);
    expect(text).toMatch(/registo/iu);
    expect(text).toMatch(/atos de fala/iu);
    expect(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/2018.*referencial homologado em vigor/iu);
    expect(PORTUGUESE_GRAMATICA_10_DEEP_REVIEW.sourceBasis.join(" ")).toMatch(/IAVE.*639.*2026/iu);
  });

  it("protege análise em contexto em vez de classificação pela forma superficial",()=>{
    const text=sectionText("pt10-gramatica-metodo");
    expect(text).toMatch(/frase completa/iu);
    expect(text).toMatch(/classe.*função.*valor semântico/iu);
    expect(text).toMatch(/seleciona|seleção/iu);
    expect(text).toMatch(/pronominalização/iu);
    expect(text).toMatch(/relação estrutural/iu);
  });

  it("protege história, variação e etimologia sem juízos de correção simplistas",()=>{
    const text=sectionText("pt10-gramatica-historia");
    expect(text).toMatch(/latim/iu);
    expect(text).toMatch(/variaç|variedades/iu);
    expect(text).toMatch(/distribuição geográfica/iu);
    expect(text).toMatch(/etimologia/iu);
    expect(text).toMatch(/significado atual|uso atual/iu);
  });

  it("protege processos fonológicos por operação e posição",()=>{
    const text=sectionText("pt10-gramatica-fonologia");
    expect(text).toMatch(/inserção/iu);
    expect(text).toMatch(/supressão/iu);
    expect(text).toMatch(/alteração/iu);
    expect(text).toMatch(/prótese.*epêntese.*paragoge/iu);
    expect(text).toMatch(/aférese.*síncope.*apócope/iu);
    expect(text).toMatch(/assimilação.*dissimilação.*metátese.*redução vocálica/iu);
  });

  it("protege formação de palavras pela reconstrução do processo",()=>{
    const text=sectionText("pt10-gramatica-formacao");
    expect(text).toMatch(/derivação.*composição/iu);
    expect(text).toMatch(/prefixação.*sufixação.*parassíntese/iu);
    expect(text).toMatch(/derivação não afixal/iu);
    expect(text).toMatch(/conversão/iu);
    expect(text).toMatch(/base|bases/iu);
  });

  it("protege complemento do nome e do adjetivo por dependência sintática",()=>{
    const text=sectionText("pt10-gramatica-sintaxe");
    expect(text).toMatch(/complemento direto.*indireto.*oblíquo/iu);
    expect(text).toMatch(/agente da passiva/iu);
    expect(text).toMatch(/complemento do nome/iu);
    expect(text).toMatch(/modificador do nome/iu);
    expect(text).toMatch(/complemento do adjetivo/iu);
    expect(text).toMatch(/dependência|seleciona/iu);
  });

  it("protege completivas, substantivas relativas e adjetivas relativas",()=>{
    const text=sectionText("pt10-gramatica-oracoes");
    expect(text).toMatch(/coordenação/iu);
    expect(text).toMatch(/subordinação/iu);
    expect(text).toMatch(/substantivas.*completivas/iu);
    expect(text).toMatch(/substantivas relativas/iu);
    expect(text).toMatch(/adjetiva relativa/iu);
    expect(text).toMatch(/antecedente nominal/iu);
  });

  it("protege modalidade epistémica, deôntica e apreciativa pelo contexto",()=>{
    const text=sectionText("pt10-gramatica-modalidade");
    expect(text).toMatch(/epistémic/iu);
    expect(text).toMatch(/certeza.*probabilidade|probabilidade.*certeza/iu);
    expect(text).toMatch(/deôntic/iu);
    expect(text).toMatch(/obrigação.*permissão|permissão.*obrigação/iu);
    expect(text).toMatch(/apreciativ/iu);
    expect(text).toMatch(/contexto|situação comunicativa/iu);
  });

  it("protege anáfora coesiva, registo e ato de fala",()=>{
    const text=sectionText("pt10-gramatica-texto");
    expect(text).toMatch(/antecedente/iu);
    expect(text).toMatch(/correferência/iu);
    expect(text).toMatch(/figura estilística|figura de estilo/iu);
    expect(text).toMatch(/formal.*informal/iu);
    expect(text).toMatch(/ato de fala|atos de fala/iu);
    expect(text).toMatch(/forma.*função pragmática|intenção comunicativa/iu);
  });

  it("regista Gramática e completa as oito unidades do 10.º ano",()=>{
    const ids=["pt10-trovadoresca","pt10-fernao-lopes","pt10-gil-vicente","pt10-camoes-rimas","pt10-lusiadas","pt10-leitura","pt10-escrita","pt10-gramatica"];
    for(const id of ids){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(id);
      expect(portugueseDeepReviewContentFor(id)).not.toBeNull();
    }
  });
});
