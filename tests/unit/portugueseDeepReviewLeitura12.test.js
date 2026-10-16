import {test,expect} from "vitest";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";
import {portugueseTaxonomyUnit} from "../../app/data/portugueseTaxonomy.js";

const content=portugueseDeepReviewContentFor("pt12-leitura");
const text=()=>JSON.stringify(content);

test("12th-year reading is registered against the taxonomy",()=>{
  expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-leitura");
  expect(portugueseTaxonomyUnit("pt12-leitura")?.domain).toBe("leitura");
  expect(content?.id).toBe("pt12-leitura");
});

test("deep review has substantial structure",()=>{
  expect(content.sections.length).toBeGreaterThanOrEqual(7);
  for(const section of content.sections){
    expect(section.paragraphs.length).toBeGreaterThanOrEqual(3);
    expect(section.signals.length).toBeGreaterThanOrEqual(4);
    expect(section.example.steps.length).toBeGreaterThanOrEqual(4);
    expect(section.example.modelAnswer.length).toBeGreaterThan(40);
    expect(section.pitfalls.length).toBeGreaterThanOrEqual(3);
  }
});

test("March 2026 reading scope prioritises argumentative genres",()=>{
  const all=text();
  expect(all).toMatch(/março de 2026/i);
  expect(all).toMatch(/artigo de opinião/i);
  expect(all).toMatch(/apreciação crítica/i);
  expect(all).toMatch(/argumentativ/i);
});

test("theme is not collapsed into thesis",()=>{
  const all=text();
  expect(all).toMatch(/Tema ≠ tese/i);
  expect(all).toMatch(/posição defendida/i);
});

test("argument labels depend on function, not keywords",()=>{
  const all=text();
  expect(all).toMatch(/Argumento = razão/i);
  expect(all).toMatch(/Exemplo pode apoiar um argumento sem ser a tese/i);
  expect(all).toMatch(/conector ajuda, mas não substitui análise funcional/i);
});

test("critical appreciation is not summary or unsupported taste",()=>{
  const all=text();
  expect(all).toMatch(/Apreciação crítica.*avaliação.*critérios|avaliação \+ critérios/i);
  expect(all).toMatch(/Resumo não equivale a apreciação/i);
  expect(all).toMatch(/gosto pessoal.*crítica fundamentada/i);
});

test("inference remains anchored in textual evidence",()=>{
  const all=text();
  expect(all).toMatch(/Inferência precisa de pistas/i);
  expect(all).toMatch(/Possível não significa demonstrado/i);
  expect(all).toMatch(/Opinião pessoal não responde/i);
});

test("internal and external organisation are distinguished",()=>{
  const all=text();
  expect(all).toMatch(/Externa = disposição observável/i);
  expect(all).toMatch(/Interna = função das partes/i);
  expect(all).toMatch(/Posição no texto não determina função/i);
});

test("expressive resources must be connected to mechanism and intention",()=>{
  const all=text();
  expect(all).toMatch(/Recurso → mecanismo → efeito → intenção/i);
  expect(all).toMatch(/Etiqueta não é análise/i);
  expect(all).toMatch(/intencionalidade comunicativa/i);
});

test("exam method protects evidence-to-reasoning chain",()=>{
  const all=text();
  expect(all).toMatch(/verbo do enunciado/i);
  expect(all).toMatch(/Afirmação → evidência → relação → interpretação/i);
  expect(all).toMatch(/Citação ≠ explicação/i);
});
