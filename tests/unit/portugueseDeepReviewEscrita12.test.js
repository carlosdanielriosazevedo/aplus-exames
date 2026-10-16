import {describe,it,expect} from "vitest";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";
import {portugueseTaxonomyUnit} from "../../app/data/portugueseTaxonomy.js";

const content=portugueseDeepReviewContentFor("pt12-escrita");
const text=()=>JSON.stringify(content);

describe("Portuguese 12th-year writing deep review",()=>{
  it("is registered against the 12th-year taxonomy",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-escrita");
    expect(portugueseTaxonomyUnit("pt12-escrita")?.domain).toBe("escrita");
    expect(content?.id).toBe("pt12-escrita");
  });

  it("has a substantial advanced structure",()=>{
    expect(content.sections.length).toBeGreaterThanOrEqual(7);
    for(const section of content.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example.steps.length,section.id).toBeGreaterThanOrEqual(4);
      expect(section.example.modelAnswer.length,section.id).toBeGreaterThan(40);
      expect(section.note.length,section.id).toBeGreaterThan(15);
      expect(section.remember.length,section.id).toBeGreaterThan(20);
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("covers the three official writing genres",()=>{
    const all=text();
    expect(all).toMatch(/texto de opinião/i);
    expect(all).toMatch(/apreciação crítica/i);
    expect(all).toMatch(/exposição sobre um tema/i);
  });

  it("protects planning from becoming a rigid memorised template",()=>{
    const all=text();
    expect(all).toMatch(/decompor o enunciado/i);
    expect(all).toMatch(/função de cada parágrafo/i);
    expect(all).toMatch(/modelo.{0,80}(?:não|nunca).{0,30}molde rígido|estruturas memorizadas.{0,100}não substituem/i);
  });

  it("requires argument development rather than repeated opinion",()=>{
    const all=text();
    expect(all).toMatch(/afirmação.{0,20}explicação.{0,30}evidência/i);
    expect(all).toMatch(/dois argumentos/i);
    expect(all).toMatch(/mesma coisa com palavras diferentes|paráfrases/i);
  });

  it("requires criteria and evidence in critical appreciation",()=>{
    const all=text();
    expect(all).toMatch(/critério/i);
    expect(all).toMatch(/evidência/i);
    expect(all).toMatch(/sinopse|resumo/i);
    expect(all).toMatch(/adjetivos/i);
  });

  it("treats exposition as hierarchy and explanation rather than enumeration",()=>{
    const all=text();
    expect(all).toMatch(/hierarqu/i);
    expect(all).toMatch(/enumerar factos não é o mesmo que explicar|enumeração/i);
    expect(all).toMatch(/exemplo.{0,80}não substitui/i);
  });

  it("protects source integration and real paraphrase",()=>{
    const all=text();
    expect(all).toMatch(/fiabilidade/i);
    expect(all).toMatch(/parafrasear não é trocar algumas palavras/i);
    expect(all).toMatch(/referência.{0,100}não legitima|referenciar.{0,100}não apaga/i);
  });

  it("forces layered revision from macro to micro",()=>{
    const all=text();
    expect(all).toMatch(/macro.{0,20}meso.{0,20}micro/i);
    expect(all).toMatch(/revisão.{0,100}estrutura/i);
    expect(all).toMatch(/redund/i);
  });

  it("prioritises exam compliance and precision over ornament",()=>{
    const all=text();
    expect(all).toMatch(/checklist/i);
    expect(all).toMatch(/Precisão > complexidade ornamental|precisão sobre ornamentação/i);
    expect(all).toMatch(/reserva.{0,30}revisão/i);
  });
});
