import {describe,it,expect} from "vitest";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";
import {portugueseTaxonomyUnit} from "../../app/data/portugueseTaxonomy.js";

const content=portugueseDeepReviewContentFor("pt12-gramatica");
const text=()=>JSON.stringify(content);

describe("Portuguese 12th-year grammar deep review",()=>{
  it("is registered against the 12th-year taxonomy",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-gramatica");
    expect(portugueseTaxonomyUnit("pt12-gramatica")?.domain).toBe("gramatica");
    expect(content?.id).toBe("pt12-gramatica");
  });

  it("has a substantial exam-oriented structure",()=>{
    expect(content.sections.length).toBeGreaterThanOrEqual(7);
    for(const section of content.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example.steps.length,section.id).toBeGreaterThanOrEqual(4);
      expect(section.example.modelAnswer.length,section.id).toBeGreaterThan(40);
      expect(section.example.note.length,section.id).toBeGreaterThan(15);
      expect(section.remember.length,section.id).toBeGreaterThan(20);
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("covers the official 12th-year grammar scope",()=>{
    const all=text();
    expect(all).toMatch(/processos irregulares|formação irregular/i);
    expect(all).toMatch(/sintaxe/i);
    expect(all).toMatch(/perfetivo/i);
    expect(all).toMatch(/imperfetivo/i);
    expect(all).toMatch(/habitual/i);
    expect(all).toMatch(/iterativo/i);
    expect(all).toMatch(/genérico/i);
    expect(all).toMatch(/cadeias referenciais|cadeia referencial/i);
    expect(all).toMatch(/anáfora/i);
    expect(all).toMatch(/coerência/i);
    expect(all).toMatch(/coesão/i);
    expect(all).toMatch(/discurso direto/i);
    expect(all).toMatch(/indireto livre/i);
  });

  it("protects word formation from visual guessing",()=>{
    const all=text();
    expect(all).toMatch(/mecanismo primeiro|mecanismo de formação/i);
    expect(all).toMatch(/sigla/i);
    expect(all).toMatch(/acrónimo/i);
    expect(all).toMatch(/amálgama/i);
    expect(all).toMatch(/truncação/i);
  });

  it("protects syntax from position and connector shortcuts",()=>{
    const all=text();
    expect(all).toMatch(/posição.{0,80}não basta|classificar pelo lugar/i);
    expect(all).toMatch(/Conector ≠ classificação automática|conector.{0,80}não substitui/i);
    expect(all).toMatch(/cruza.{0,80}propriedade|mais de uma propriedade/i);
  });

  it("separates tense from aspect and habitual from iterative",()=>{
    const all=text();
    expect(all).toMatch(/Tempo verbal ≠ valor aspetual|valor aspetual não é o mesmo que tempo verbal/i);
    expect(all).toMatch(/habitual.{0,120}iterativo|iterativo.{0,120}habitual/i);
    expect(all).toMatch(/contexto/i);
  });

  it("anchors reference chains in grammatical semantic and discourse evidence",()=>{
    const all=text();
    expect(all).toMatch(/compatibilidade gramatical/i);
    expect(all).toMatch(/plausibilidade semântica|compatibilidade semântica/i);
    expect(all).toMatch(/continuidade discursiva|discursiva/i);
    expect(all).toMatch(/proximidade não garante|não deve ser escolhido apenas por proximidade/i);
  });

  it("keeps coherence and cohesion distinct",()=>{
    const all=text();
    expect(all).toMatch(/Coesão = mecanismos linguísticos/i);
    expect(all).toMatch(/Coerência = compatibilidade/i);
    expect(all).toMatch(/mais conectores não garantem|muitas marcas de coesão.{0,100}incoerente/i);
  });

  it("protects free indirect discourse from punctuation-only classification",()=>{
    const all=text();
    expect(all).toMatch(/ausência de aspas.{0,80}não basta|não deve ser identificado apenas pela ausência de aspas/i);
    expect(all).toMatch(/voz narrativa/i);
    expect(all).toMatch(/perspetiva da personagem/i);
  });

  it("requires evidence before labels in exam answers",()=>{
    const all=text();
    expect(all).toMatch(/Propriedade → teste → classificação|propriedade.{0,30}teste.{0,30}classificação/i);
    expect(all).toMatch(/palavra-gatilho/i);
    expect(all).toMatch(/justificar.{0,100}demonstrar|demonstrar a classificação/i);
  });
});
