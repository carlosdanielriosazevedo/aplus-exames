import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_ANTERO_11_DEEP_REVIEW,
  PORTUGUESE_ANTERO_11_DEEP_REVIEW_VERSION,
  portugueseAntero11DeepReviewFor
} from "../../app/data/portugueseDeepReviewAntero11";

const EXPECTED_SECTIONS=[
  "pt11-antero-corpus",
  "pt11-antero-angustia",
  "pt11-antero-ideal-sonho",
  "pt11-antero-natureza",
  "pt11-antero-forma-progressao",
  "pt11-antero-comparacao-resposta"
];

const sectionText=id=>JSON.stringify(PORTUGUESE_ANTERO_11_DEEP_REVIEW.sections.find(row=>row.id===id));

describe("Rever Matéria profundo · Português · Antero de Quental · 11.º",()=>{
  it("mantém versão, provider e seis secções profundas",()=>{
    expect(PORTUGUESE_ANTERO_11_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseAntero11DeepReviewFor("pt11-antero")).toBe(PORTUGUESE_ANTERO_11_DEEP_REVIEW);
    expect(portugueseAntero11DeepReviewFor("pt11-cesario")).toBeNull();
    expect(PORTUGUESE_ANTERO_11_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("mantém o contrato pedagógico profundo de Português",()=>{
    for(const section of PORTUGUESE_ANTERO_11_DEEP_REVIEW.sections){
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

  it("protege o corpus ativo como dois sonetos, sem cristalizar exemplos de aula",()=>{
    const sources=PORTUGUESE_ANTERO_11_DEEP_REVIEW.sourceBasis.join(" ");
    const text=sectionText("pt11-antero-corpus");
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/Sonetos Completos.*escolher dois poemas/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/dois sonetos|dois poemas/iu);
    expect(text).toMatch(/O Palácio da Ventura/iu);
    expect(text).toMatch(/Sonho oriental/iu);
    expect(text).toMatch(/Oceano Nox/iu);
    expect(text).toMatch(/não.*lista fixa|não.*obrigatória/iu);
  });

  it("protege angústia existencial como procura e conflito, não como tristeza genérica",()=>{
    const text=sectionText("pt11-antero-angustia");
    expect(text).toMatch(/angústia existencial/iu);
    expect(text).toMatch(/procura/iu);
    expect(text).toMatch(/verdade|repouso|felicidade|absoluto|libertação/iu);
    expect(text).toMatch(/não se reduz a tristeza/iu);
    expect(text).toMatch(/problema.*procura.*obstáculo.*consciência/iu);
  });

  it("protege idealização, sonho e viragem para a realidade",()=>{
    const text=sectionText("pt11-antero-ideal-sonho");
    expect(text).toMatch(/idealização do real/iu);
    expect(text).toMatch(/sonho/iu);
    expect(text).toMatch(/vigília|despert/iu);
    expect(text).toMatch(/ideal.*realidade/iu);
    expect(text).toMatch(/desilusão/iu);
  });

  it("protege natureza pela relação exterior-interior e pela interlocução",()=>{
    const text=sectionText("pt11-antero-natureza");
    expect(text).toMatch(/natureza/iu);
    expect(text).toMatch(/noite|mar|vento|céu/iu);
    expect(text).toMatch(/Oceano Nox/iu);
    expect(text).toMatch(/apóstrofe|personificação|interrogação/iu);
    expect(text).toMatch(/silêncio|ausência de resposta/iu);
    expect(text).toMatch(/estado interior|vida interior/iu);
  });

  it("protege forma do soneto pela progressão do pensamento",()=>{
    const text=sectionText("pt11-antero-forma-progressao");
    expect(text).toMatch(/catorze versos/iu);
    expect(text).toMatch(/duas quadras.*dois tercetos/iu);
    expect(text).toMatch(/oposições/iu);
    expect(text).toMatch(/gradações/iu);
    expect(text).toMatch(/metáforas/iu);
    expect(text).toMatch(/viragem/iu);
    expect(text).toMatch(/não.*regra mecânica|não.*apenas.*estrofe/iu);
  });

  it("protege comparação e resposta por progressão, não só por tema",()=>{
    const text=sectionText("pt11-antero-comparacao-resposta");
    expect(text).toMatch(/critério comum/iu);
    expect(text).toMatch(/ideia.*evidência.*progressão.*efeito.*tema/iu);
    expect(text).toMatch(/poema novo/iu);
    expect(text).toMatch(/dois mini-resumos|dois.*resumos/iu);
  });
});
