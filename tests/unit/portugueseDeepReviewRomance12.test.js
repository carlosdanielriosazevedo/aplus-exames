import {describe,it,expect} from "vitest";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";
import {portugueseTaxonomyUnit,PORTUGUESE_TAXONOMY_VERSION} from "../../app/data/portugueseTaxonomy.js";

const content=portugueseDeepReviewContentFor("pt12-saramago");
const text=()=>JSON.stringify(content);

describe("Portuguese 12th-year romance deep review",()=>{
  it("preserves the legacy unit id while correcting its curricular scope",()=>{
    const unit=portugueseTaxonomyUnit("pt12-saramago");
    expect(PORTUGUESE_TAXONOMY_VERSION).toBe("2026.10-v3");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-saramago");
    expect(unit?.domain).toBe("educacao-literaria");
    expect(unit?.title).toMatch(/Romance · opção prescrita/i);
    expect(content?.id).toBe("pt12-saramago");
  });

  it("represents the March 2026 three-option contract exactly",()=>{
    const all=`${JSON.stringify(portugueseTaxonomyUnit("pt12-saramago"))} ${text()}`;
    expect(all).toMatch(/março de 2026/i);
    expect(all).toMatch(/Memorial do Convento/i);
    expect(all).toMatch(/O Ano da Morte de Ricardo Reis/i);
    expect(all).toMatch(/Um Deus Passeando pela Brisa da Tarde/i);
    expect(all).toMatch(/Mário de Carvalho/i);
    expect(all).toMatch(/três opções|uma de três opções/i);
  });

  it("does not present Saramago as the only curricular romance author",()=>{
    const all=text();
    expect(all).toMatch(/Duas opções são de Saramago/i);
    expect(all).toMatch(/terceira é de Mário de Carvalho/i);
    expect(all).toMatch(/não se deve ensinar.*todos os alunos.*José Saramago/is);
  });

  it("has a substantial editorial structure",()=>{
    expect(content.goals.length).toBeGreaterThanOrEqual(8);
    expect(content.sourceBasis.length).toBeGreaterThanOrEqual(4);
    expect(content.sections.length).toBeGreaterThanOrEqual(8);
    for(const section of content.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(4);
      expect(section.example.steps.length,section.id).toBeGreaterThanOrEqual(4);
      expect(section.example.answer.length,section.id).toBeGreaterThan(30);
      expect(section.example.note.length,section.id).toBeGreaterThan(15);
      expect(section.remember.length,section.id).toBeGreaterThan(20);
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("keeps narrator and focalization conceptually separate",()=>{
    const all=text();
    expect(all).toMatch(/Narrador ≠ focalizador/i);
    expect(all).toMatch(/quem sabe, quem vê e quem avalia/i);
    expect(all).toMatch(/focalização pode variar/i);
  });

  it("prevents history lessons from replacing literary analysis",()=>{
    const all=text();
    expect(all).toMatch(/Contexto histórico ≠ resumo histórico/i);
    expect(all).toMatch(/não deve transformar-se numa aula de História/i);
    expect(all).toMatch(/tempo da história ≠ tempo do discurso/i);
  });

  it("requires character analysis to be evidence based",()=>{
    const all=text();
    expect(all).toMatch(/Adjetivo sem prova/i);
    expect(all).toMatch(/Personagem ≠ tese ambulante do autor/i);
    expect(all).toMatch(/decisões, relações, contradições/i);
  });

  it("keeps the three novels distinct instead of forcing one authorial template",()=>{
    const all=text();
    expect(all).toMatch(/Três opções curriculares, três mapas de obra/i);
    expect(all).toMatch(/Ricardo Reis no romance ≠ simples ficha do heterónimo/i);
    expect(all).toMatch(/Mário de Carvalho exige grelha própria/i);
    expect(all).toMatch(/não devo aplicar-lhe uma grelha de 'estilo saramaguiano'/i);
  });

  it("treats irony and intertextuality as mechanisms with functions",()=>{
    const all=text();
    expect(all).toMatch(/Ironia: alvo \+ desfasamento \+ efeito/i);
    expect(all).toMatch(/Intertexto: origem \+ transformação \+ função/i);
    expect(all).toMatch(/Voz citada não equivale à posição do romance/i);
  });

  it("protects the exam reasoning chain",()=>{
    const all=text();
    expect(all).toMatch(/Afirmação → evidência → mecanismo → efeito → interpretação integrada/i);
    expect(all).toMatch(/verbo do enunciado/i);
    expect(all).toMatch(/Evidência antes de generalização/i);
  });
});
