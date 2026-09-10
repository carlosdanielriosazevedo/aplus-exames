import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {
  PORTUGUESE_DOMAINS,PORTUGUESE_REFERENCE_SOURCES,PORTUGUESE_RELEASE_POLICY,
  PORTUGUESE_RESPONSE_TYPES,PORTUGUESE_YEAR_FOCUS
} from "../app/data/portugueseFoundation.js";
import {SECONDARY_EXAM_SUBJECTS,subjectStatusLabel} from "../app/data/subjects.js";

const pilot=JSON.parse(readFileSync(new URL("../content/vnext/portuguese/foundation/portuguese-639-pilot.json",import.meta.url),"utf8"));
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");

const portuguese=SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id==="portuguese");
assert.ok(portuguese,"Português deve existir no catálogo de disciplinas.");
assert.deepEqual(portuguese.codes,["639"]);
assert.equal(portuguese.available,undefined,"Português não pode ser selecionável durante a fundação.");
assert.equal(portuguese.releaseStage,"foundation");
assert.equal(subjectStatusLabel(portuguese),"Em preparação");

assert.equal(PORTUGUESE_RELEASE_POLICY.selectable,false);
assert.equal(PORTUGUESE_RELEASE_POLICY.productionEligible,false);
assert.equal(PORTUGUESE_RELEASE_POLICY.extendedWritingFinalAutoGrade,false);
assert.ok(PORTUGUESE_RELEASE_POLICY.minimumPilotItems>pilot.items.length,"O piloto não pode desbloquear prematuramente a disciplina.");
assert.ok(PORTUGUESE_RELEASE_POLICY.minimumBetaItems>=PORTUGUESE_RELEASE_POLICY.minimumPilotItems*5,"O beta precisa de profundidade muito superior ao piloto interno.");

assert.deepEqual(PORTUGUESE_DOMAINS.map(domain=>domain.id),["oralidade","leitura","educacao-literaria","escrita","gramatica"]);
assert.equal(PORTUGUESE_DOMAINS.find(domain=>domain.id==="oralidade").writtenExam,false,"A oralidade curricular não deve ser confundida com o exame escrito 639.");
assert.equal(PORTUGUESE_DOMAINS.filter(domain=>domain.writtenExam).length,4);
assert.deepEqual(PORTUGUESE_YEAR_FOCUS.map(focus=>focus.year),["10.º","11.º","12.º"]);
assert.equal(PORTUGUESE_REFERENCE_SOURCES.length,4);
for(const source of PORTUGUESE_REFERENCE_SOURCES)assert.match(source.url,/^https:\/\/(?:www\.dge\.mec\.pt|iave\.pt)\//);

const responseTypes=new Map(PORTUGUESE_RESPONSE_TYPES.map(type=>[type.id,type]));
assert.equal(responseTypes.size,4);
assert.equal(responseTypes.get("extended-writing").gradingMode,"rubric-assisted-provisional");

assert.equal(pilot.subjectId,"portuguese");
assert.equal(pilot.examCode,"639");
assert.equal(pilot.sourcePolicy,"original-only");
assert.equal(pilot.editorialStatus,"prototype");
assert.equal(pilot.productionEligible,false);
assert.equal(pilot.items.length,12);
assert.equal(new Set(pilot.items.map(item=>item.id)).size,pilot.items.length,"Os IDs do piloto devem ser únicos.");

const years=new Set();
const domains=new Set();
const usedTypes=new Set();
for(const item of pilot.items){
  years.add(item.year);
  domains.add(item.domain);
  usedTypes.add(item.responseType);
  assert.match(item.id,/^PT639-FND-\d{3}$/);
  assert.ok(["10.º","11.º","12.º"].includes(item.year));
  assert.ok(PORTUGUESE_DOMAINS.some(domain=>domain.id===item.domain&&domain.writtenExam),`${item.id}: domínio inválido para o piloto escrito.`);
  assert.ok(responseTypes.has(item.responseType),`${item.id}: formato de resposta desconhecido.`);
  assert.ok(["reconhecer","interpretar","raciocinar","criar"].includes(item.cognitive));
  assert.ok(item.stimulus.length>=40,`${item.id}: estímulo demasiado curto.`);
  assert.ok(item.prompt.length>=20,`${item.id}: enunciado demasiado curto.`);
  assert.ok(item.explanation?.length>=30||item.rubric,`${item.id}: falta explicação ou grelha de critérios.`);
  assert.ok(Number.isInteger(item.maxPoints)&&item.maxPoints>0);

  if(item.responseType==="multiple-choice"){
    assert.equal(item.options.length,4,`${item.id}: escolha múltipla requer quatro opções.`);
    assert.ok([0,1,2,3].includes(item.answerIndex));
    assert.equal(new Set(item.options.map(option=>option.trim().toLocaleLowerCase("pt-PT"))).size,4);
    assert.equal(item.gradingMode,"deterministic");
  }
  if(item.responseType==="short-answer"){
    assert.ok(item.acceptedAnswers.length>=2,`${item.id}: resposta curta requer formulações equivalentes.`);
    assert.equal(item.gradingMode,"deterministic-with-equivalents");
  }
  if(["restricted-response","extended-writing"].includes(item.responseType)){
    assert.equal(item.gradingMode,"rubric-assisted-provisional",`${item.id}: texto livre não pode receber nota final automática.`);
    assert.equal(item.rubric.criteria.reduce((total,criterion)=>total+criterion.points,0),item.rubric.maxPoints);
    assert.equal(item.rubric.maxPoints,item.maxPoints);
    assert.ok(item.wordLimit.min<item.wordLimit.max);
  }
}

assert.deepEqual([...years].sort(),["10.º","11.º","12.º"]);
assert.deepEqual([...domains].sort(),["educacao-literaria","escrita","gramatica","leitura"]);
assert.deepEqual([...usedTypes].sort(),["extended-writing","multiple-choice","restricted-response","short-answer"]);
const extended=pilot.items.filter(item=>item.responseType==="extended-writing");
assert.equal(extended.length,1);
assert.equal(extended[0].maxPoints,44,"O piloto preserva a escala de 44 pontos usada na produção escrita de 2025.");

assert.match(page,/Português em preparação/);
assert.match(page,/continuará bloqueado até o diagnóstico, os treinos e a correção escrita serem suficientemente fiáveis/);

console.log("✓ Portuguese 639 foundation: 5 curricular domains · 4 written-exam domains · 4 response formats · 12 original prototype items · release remains locked");
