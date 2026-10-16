import test from "node:test";
import assert from "node:assert/strict";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";
import {portugueseTaxonomyUnit} from "../../app/data/portugueseTaxonomy.js";

const content=portugueseDeepReviewContentFor("pt12-poesia-contemporanea");
const allText=()=>JSON.stringify(content);

test("contemporary poetry is registered against the 12th-year taxonomy",()=>{
  assert.ok(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.includes("pt12-poesia-contemporanea"));
  assert.equal(portugueseTaxonomyUnit("pt12-poesia-contemporanea")?.domain,"educacao-literaria");
  assert.equal(content?.id,"pt12-poesia-contemporanea");
});

test("deep review has an editorially substantial transferable structure",()=>{
  assert.ok(content.sections.length>=7);
  for(const section of content.sections){
    assert.ok(section.paragraphs.length>=3,section.id);
    assert.ok(section.signals.length>=4,section.id);
    assert.ok(section.example.steps.length>=4,section.id);
    assert.ok(section.example.answer.length>30,section.id);
    assert.ok(section.note.length>15,section.id);
    assert.ok(section.remember.length>20,section.id);
    assert.ok(section.pitfalls.length>=3,section.id);
  }
});

test("current March 2026 contract is represented without inventing three mandatory authors",()=>{
  const text=allText();
  assert.match(text,/março de 2026/i);
  assert.match(text,/seis poemas/i);
  assert.match(text,/pelo menos.{0,20}três poetas/i);
  assert.match(text,/contrato de leitura/i);
  assert.match(text,/não.{0,80}três nomes fixos|não.{0,80}lista obrigatória/i);
});

test("method is explicitly transferable beyond the app examples",()=>{
  const text=allText();
  assert.match(text,/transfer/i);
  assert.match(text,/seleção.{0,80}app.{0,80}treino|amostra de treino/i);
  assert.match(text,/autores diferentes|poetas e poemas diferentes/i);
});

test("lyrical voice is not collapsed into author biography",()=>{
  const text=allText();
  assert.match(text,/sujeito poético/i);
  assert.match(text,/não deve ser confundido automaticamente com o autor|não são equivalentes automáticos/i);
  assert.match(text,/marcas linguísticas|pronomes|modalizadores/i);
});

test("images and symbols require contextual mechanism rather than dictionary meanings",()=>{
  const text=allText();
  assert.match(text,/imagem poética/i);
  assert.match(text,/dicionário fixo|equivalência fixa/i);
  assert.match(text,/relação criada|rede de relações/i);
});

test("free verse and rhythm are treated as constructed form",()=>{
  const text=allText();
  assert.match(text,/verso livre/i);
  assert.match(text,/Forma livre não é ausência de construção/i);
  assert.match(text,/repetição|paralelismo/i);
  assert.match(text,/enjambement/i);
});

test("theme is not reduced to a one-word topic",()=>{
  const text=allText();
  assert.match(text,/Tema não é resumo/i);
  assert.match(text,/demasiado amplo|Reduzir o poema a uma palavra/i);
  assert.match(text,/tópico \+ relação específica/i);
});

test("comparison requires a shared axis and evidence from both poems",()=>{
  const text=allText();
  assert.match(text,/eixo comum/i);
  assert.match(text,/evidência dos dois lados|nos dois textos/i);
  assert.match(text,/duas análises independentes|dois mini-resumos separados/i);
});

test("exam method protects evidence-to-mechanism reasoning",()=>{
  const text=allText();
  assert.match(text,/Afirmação.{0,20}evidência.{0,20}mecanismo.{0,20}interpretação/i);
  assert.match(text,/verbo do enunciado/i);
  assert.match(text,/conhecimento sobre o poeta.{0,80}não substitua|não substituas a leitura/i);
});
