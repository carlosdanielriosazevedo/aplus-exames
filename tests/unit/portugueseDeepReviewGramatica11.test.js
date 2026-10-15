import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_GRAMATICA_11_DEEP_REVIEW,
  PORTUGUESE_GRAMATICA_11_DEEP_REVIEW_VERSION,
  portugueseGramatica11DeepReviewFor
} from "../../app/data/portugueseDeepReviewGramatica11";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const sectionText=id=>JSON.stringify(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW.sections.find(row=>row.id===id));
const EXPECTED_SECTIONS=[
  "pt11-gram-constituintes",
  "pt11-gram-articulacao",
  "pt11-gram-etimo",
  "pt11-gram-coesao",
  "pt11-gram-discurso",
  "pt11-gram-deixis",
  "pt11-gram-exame"
];

describe("Rever Matéria profundo · Português · Gramática 11.º",()=>{
  it("mantém versão, provider e sete secções profundas",()=>{
    expect(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseGramatica11DeepReviewFor("pt11-gramatica")).toBe(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW);
    expect(portugueseGramatica11DeepReviewFor("pt12-gramatica")).toBeNull();
    expect(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo específico de Português",()=>{
    for(const section of PORTUGUESE_GRAMATICA_11_DEEP_REVIEW.sections){
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

  it("protege o âmbito curricular ativo do 11.º ano",()=>{
    const sources=PORTUGUESE_GRAMATICA_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/2018/iu);
    expect(sources).toMatch(/em vigor/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/grupo nominal/iu);
    expect(text).toMatch(/grupo verbal/iu);
    expect(text).toMatch(/grupo adjetival/iu);
    expect(text).toMatch(/grupo preposicional/iu);
    expect(text).toMatch(/grupo adverbial/iu);
    expect(text).toMatch(/étimo/iu);
    expect(text).toMatch(/anáfora/iu);
    expect(text).toMatch(/discurso indireto livre/iu);
    expect(text).toMatch(/referência deítica|dêixis/iu);
  });

  it("protege grupo sintático ≠ função e análise pela construção inteira",()=>{
    const text=sectionText("pt11-gram-constituintes");
    expect(text).toMatch(/grupo.*função|função.*grupo/iu);
    expect(text).toMatch(/preposição.*não.*função|preposição igual.*não.*função/iu);
    expect(text).toMatch(/verbo/iu);
    expect(text).toMatch(/seleção/iu);
    expect(text).toMatch(/complemento.*modificador/iu);
  });

  it("protege articulação por dependência estrutural, não por conector ou pontuação isolados",()=>{
    const text=sectionText("pt11-gram-articulacao");
    expect(text).toMatch(/coordenação/iu);
    expect(text).toMatch(/subordinação/iu);
    expect(text).toMatch(/dependência estrutural/iu);
    expect(text).toMatch(/conector.*indício|conjunção.*não/iu);
    expect(text).toMatch(/pontuação.*não.*relação|pontuação não cria/iu);
  });

  it("protege étimo como pista histórica sem congelar o sentido atual",()=>{
    const text=sectionText("pt11-gram-etimo");
    expect(text).toMatch(/contexto atual primeiro|contexto.*valor/iu);
    expect(text).toMatch(/origem.*não.*definição|etimologia.*não.*definição/iu);
    expect(text).toMatch(/especialização|ampliação|deslocação/iu);
    expect(text).toMatch(/continuidade|mudança/iu);
  });

  it("protege anáfora, coesão e progressão como relações distintas",()=>{
    const text=sectionText("pt11-gram-coesao");
    expect(text).toMatch(/coesão gramatical/iu);
    expect(text).toMatch(/coesão lexical/iu);
    expect(text).toMatch(/anáfora/iu);
    expect(text).toMatch(/antecedente/iu);
    expect(text).toMatch(/ambiguidade referencial/iu);
    expect(text).toMatch(/coesão.*progressão.*não.*sinónim|Coesão liga.*progressão/iu);
  });

  it("protege reprodução do discurso e reajuste do centro enunciativo",()=>{
    const text=sectionText("pt11-gram-discurso");
    expect(text).toMatch(/discurso direto/iu);
    expect(text).toMatch(/discurso indireto/iu);
    expect(text).toMatch(/discurso indireto livre/iu);
    expect(text).toMatch(/não.*indireto sem.*que|não classifiques.*falta.*que/iu);
    expect(text).toMatch(/pessoa.*tempo.*dêixis|pessoas.*tempos.*demonstrativos/iu);
  });

  it("protege dêixis pela situação de enunciação e distingue-a da anáfora",()=>{
    const text=sectionText("pt11-gram-deixis");
    expect(text).toMatch(/pessoal/iu);
    expect(text).toMatch(/espacial/iu);
    expect(text).toMatch(/temporal/iu);
    expect(text).toMatch(/dêixis.*anáfora.*não|Dêixis e anáfora não/iu);
    expect(text).toMatch(/situação de enunciação/iu);
    expect(text).toMatch(/amanhã/iu);
  });

  it("regista Gramática e preserva todas as waves profundas anteriores do 11.º",()=>{
    for(const unitId of ["pt11-vieira","pt11-frei-luis","pt11-romantismo-opcao","pt11-eca","pt11-antero","pt11-cesario","pt11-leitura","pt11-escrita","pt11-gramatica"]){
      expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain(unitId);
      expect(portugueseDeepReviewContentFor(unitId),unitId).not.toBeNull();
    }
    expect(portugueseDeepReviewContentFor("pt11-gramatica")).toBe(PORTUGUESE_GRAMATICA_11_DEEP_REVIEW);
  });
});
