import assert from "node:assert/strict";
import {PORTUGUESE_ITEMS} from "../app/data/portugueseContent.js";
import {PORTUGUESE_YEAR_FOCUS,PORTUGUESE_COMPETENCIES,PORTUGUESE_REFERENCE_SOURCES} from "../app/data/portugueseFoundation.js";

const YEARS=["10.º","11.º","12.º"];
const WRITTEN_DOMAINS=["leitura","educacao-literaria","escrita","gramatica"];
const focusByYear=new Map(PORTUGUESE_YEAR_FOCUS.map(focus=>[focus.year,focus]));
const competencyById=new Map(PORTUGUESE_COMPETENCIES.map(c=>[c.id,c]));
const sourceById=new Map(PORTUGUESE_REFERENCE_SOURCES.map(source=>[source.id,source]));

assert.deepEqual([...focusByYear.keys()],YEARS,"O referencial deve explicitar 10.º, 11.º e 12.º anos.");

const report={};
for(const year of YEARS){
  const focus=focusByYear.get(year);
  const source=sourceById.get(focus.sourceId);
  assert.equal(focus.curriculumStatus,"in-force",`${year}: referencial curricular não está marcado como vigente.`);
  assert.equal(source?.authority,"DGE",`${year}: a fonte curricular ativa deve ser DGE.`);
  assert.equal(source?.status,"in-force",`${year}: a fonte DGE deve estar vigente.`);
  assert.ok(focus.readingGenres?.length,`${year}: faltam géneros de leitura.`);
  assert.ok(focus.literatureCorpus?.length,`${year}: falta corpus de Educação Literária.`);
  assert.ok(focus.writingGenres?.length,`${year}: faltam géneros de escrita.`);
  assert.ok(focus.grammarFocus?.length,`${year}: falta foco gramatical.`);

  const items=PORTUGUESE_ITEMS.filter(item=>item.year===year);
  assert.ok(items.length>0,`${year}: não existem itens no banco.`);
  const domains=Object.fromEntries(WRITTEN_DOMAINS.map(domain=>[domain,items.filter(item=>item.domain===domain).length]));
  for(const [domain,count] of Object.entries(domains))assert.ok(count>0,`${year}: falta cobertura de ${domain}.`);

  const competencies=new Set(items.map(item=>item.competencyId));
  for(const id of competencies){
    const competency=competencyById.get(id);
    assert.ok(competency?.writtenExam,`${year}: ${id} não pertence às competências modeladas do exame escrito.`);
  }
  report[year]={items:items.length,domains,competencies:competencies.size,editorialTargets:{itemsAtLeast50:items.length>=50,domainsAtLeast10:Object.fromEntries(Object.entries(domains).map(([domain,count])=>[domain,count>=10]))}};
}

const open=PORTUGUESE_ITEMS.filter(item=>["restricted-response","extended-writing"].includes(item.responseType));
assert.ok(open.length>0,"O banco tem de incluir respostas abertas.");
for(const item of open){
  assert.equal(item.gradingMode,"rubric-assisted-provisional",`${item.id}: resposta aberta não pode ser corrigida como determinística.`);
  assert.ok(item.rubric?.criteria?.length,`${item.id}: falta grelha de critérios.`);
  for(const criterion of item.rubric.criteria)assert.ok(criterion.observations?.length,`${item.id}/${criterion.id}: falta decomposição observável.`);
}

console.log(JSON.stringify({subject:"Português",examCode:"639",framework:"DGE — Aprendizagens Essenciais",assessmentReference:"IAVE — critérios de classificação",report,openResponses:open.length},null,2));
console.log("✓ Integridade curricular e de correção verificada; metas editoriais são reportadas sem confundir cobertura atual com validade estrutural.");
