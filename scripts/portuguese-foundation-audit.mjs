import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {
  PORTUGUESE_COMPETENCIES,PORTUGUESE_CURRICULUM_GOVERNANCE,PORTUGUESE_DOMAINS,PORTUGUESE_REFERENCE_SOURCES,PORTUGUESE_RELEASE_POLICY,
  PORTUGUESE_RESPONSE_TYPES,PORTUGUESE_YEAR_FOCUS
} from "../app/data/portugueseFoundation.js";
import {SECONDARY_EXAM_SUBJECTS,subjectStatusLabel} from "../app/data/subjects.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir)
  .filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name))
  .sort((a,b)=>{
    if(a.includes("pilot"))return -1;
    if(b.includes("pilot"))return 1;
    return Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0);
  });
const packs=packFiles.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const pilot=packs[0];
const allItems=packs.flatMap(pack=>pack.items);
const latestDeclared=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||allItems.length;
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const runtimeContent=readFileSync(new URL("../app/data/portugueseContent.js",import.meta.url),"utf8");

assert.equal(packFiles.length,7,"o runtime atual de Português deve ter piloto + seis vagas");
assert.equal(allItems.length,latestDeclared,"o banco agregado deve coincidir com o tamanho declarado pela vaga mais recente");
assert.equal(latestDeclared,120,"a sexta vaga deve elevar o banco para 120 itens");

const portuguese=SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id==="portuguese");
assert.ok(portuguese,"Português deve existir no catálogo de disciplinas.");
assert.deepEqual(portuguese.codes,["639"]);
assert.equal(portuguese.available,undefined,"Português não pode ser selecionável durante a fundação.");
assert.equal(portuguese.releaseStage,"foundation");
assert.equal(subjectStatusLabel(portuguese),"Em preparação");

assert.equal(PORTUGUESE_RELEASE_POLICY.selectable,false);
assert.equal(PORTUGUESE_RELEASE_POLICY.productionEligible,false);
assert.equal(PORTUGUESE_RELEASE_POLICY.extendedWritingFinalAutoGrade,false);
assert.ok(allItems.length>=PORTUGUESE_RELEASE_POLICY.minimumPilotItems,"o banco atual deve ultrapassar o gate quantitativo mínimo do piloto");
assert.ok(PORTUGUESE_RELEASE_POLICY.minimumBetaItems>=PORTUGUESE_RELEASE_POLICY.minimumPilotItems*5,"O beta precisa de profundidade muito superior ao piloto interno.");

assert.deepEqual(PORTUGUESE_DOMAINS.map(domain=>domain.id),["oralidade","leitura","educacao-literaria","escrita","gramatica"]);
assert.equal(PORTUGUESE_DOMAINS.find(domain=>domain.id==="oralidade").writtenExam,false,"A oralidade curricular não deve ser confundida com o exame escrito 639.");
assert.equal(PORTUGUESE_DOMAINS.filter(domain=>domain.writtenExam).length,4);
assert.equal(PORTUGUESE_COMPETENCIES.length,20);
assert.equal(PORTUGUESE_COMPETENCIES.filter(competency=>competency.writtenExam).length,16);
assert.equal(new Set(PORTUGUESE_COMPETENCIES.map(competency=>competency.id)).size,PORTUGUESE_COMPETENCIES.length);
for(const competency of PORTUGUESE_COMPETENCIES){
  const domain=PORTUGUESE_DOMAINS.find(candidate=>candidate.id===competency.domain);
  assert.ok(domain,`${competency.id}: domínio desconhecido.`);
  assert.equal(competency.writtenExam,domain.writtenExam,`${competency.id}: incoerência entre competência e domínio escrito.`);
}
assert.deepEqual(PORTUGUESE_YEAR_FOCUS.map(focus=>focus.year),["10.º","11.º","12.º"]);
assert.equal(PORTUGUESE_REFERENCE_SOURCES.length,5);
assert.equal(PORTUGUESE_REFERENCE_SOURCES.filter(source=>source.status==="in-force").length,4);
assert.equal(PORTUGUESE_REFERENCE_SOURCES.find(source=>source.id==="ae-revision-2026").status,"consultation");
for(const source of PORTUGUESE_REFERENCE_SOURCES)assert.match(source.url,/^https:\/\/(?:www\.dge\.mec\.pt|eduqa\.pt|iave\.pt)\//);
for(const focus of PORTUGUESE_YEAR_FOCUS){
  const source=PORTUGUESE_REFERENCE_SOURCES.find(candidate=>candidate.id===focus.sourceId);
  assert.equal(source?.status,"in-force",`${focus.year}: o mapa curricular só pode usar uma fonte em vigor.`);
  assert.equal(focus.curriculumStatus,"in-force");
  assert.ok(focus.readingGenres.length>=2);
  assert.ok(focus.writingGenres.length>=3);
  assert.ok(focus.literatureCorpus.length>=5);
  assert.ok(focus.grammarFocus.length>=6);
}
assert.equal(PORTUGUESE_CURRICULUM_GOVERNANCE.verifiedOn,"2026-09-16");
assert.match(PORTUGUESE_CURRICULUM_GOVERNANCE.rule,/não substitui/);

const responseTypes=new Map(PORTUGUESE_RESPONSE_TYPES.map(type=>[type.id,type]));
assert.equal(responseTypes.size,4);
assert.equal(responseTypes.get("extended-writing").gradingMode,"rubric-assisted-provisional");

assert.equal(pilot.subjectId,"portuguese");
assert.equal(pilot.examCode,"639");
assert.equal(pilot.sourcePolicy,"original-only");
assert.equal(pilot.editorialStatus,"prototype");
assert.equal(pilot.productionEligible,false);
assert.equal(pilot.items.length,12);

for(const [index,pack] of packs.slice(1).entries()){
  const wave=index+1;
  assert.equal(pack.wave,wave,`wave${wave}: índice incoerente`);
  assert.equal(pack.subjectId,"portuguese");
  assert.equal(pack.examCode,"639");
  assert.equal(pack.sourcePolicy,"original-only");
  assert.equal(pack.productionEligible,false);
  assert.ok(Array.isArray(pack.items)&&pack.items.length>0,`wave${wave}: sem itens`);
}
assert.equal(packs.at(-1).bankSizeAfterWave,120);
assert.equal(packs.at(-1).items.length,20,"a sexta vaga deve conter 20 itens");

assert.equal(new Set(allItems.map(item=>item.id)).size,allItems.length,"Os IDs de Português devem ser únicos.");
assert.equal(new Set(allItems.map(item=>item.stimulus)).size,allItems.length,"Os estímulos devem ser originais e não repetidos.");
assert.equal(new Set(allItems.map(item=>item.prompt)).size,allItems.length,"Os enunciados devem ser distintos.");

const years=new Set();
const domains=new Set();
const usedTypes=new Set();
for(const item of allItems){
  years.add(item.year);
  domains.add(item.domain);
  usedTypes.add(item.responseType);
  assert.match(item.id,/^PT639-FND-\d{3}$/);
  assert.ok(["10.º","11.º","12.º"].includes(item.year));
  assert.ok(PORTUGUESE_DOMAINS.some(domain=>domain.id===item.domain&&domain.writtenExam),`${item.id}: domínio inválido para o exame escrito.`);
  const competency=PORTUGUESE_COMPETENCIES.find(candidate=>candidate.id===item.competencyId);
  assert.ok(competency?.writtenExam,`${item.id}: competência inválida para o exame escrito.`);
  assert.equal(competency.domain,item.domain,`${item.id}: a competência não pertence ao domínio declarado.`);
  assert.equal(item.sourceOrigin,"original",`${item.id}: a fundação não pode misturar conteúdo oficial.`);
  assert.equal(item.reviewStatus,"prototype",`${item.id}: a fundação deve permanecer em protótipo.`);
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
const extended=allItems.filter(item=>item.responseType==="extended-writing");
assert.equal(extended.length,1);
assert.equal(extended[0].maxPoints,44,"O banco preserva a escala de 44 pontos usada na produção escrita de 2025.");

for(const domain of ["leitura","educacao-literaria","escrita","gramatica"]){
  const missionEligible=allItems.filter(item=>item.domain===domain&&item.responseType!=="extended-writing");
  assert.ok(missionEligible.length>=7,`${domain}: deve existir profundidade suficiente para missões.`);
}
assert.equal(new Set(allItems.map(item=>item.competencyId)).size,16,"O banco deve cobrir todas as competências do exame escrito.");
for(const competency of PORTUGUESE_COMPETENCIES.filter(item=>item.writtenExam)){
  assert.ok(allItems.filter(item=>item.competencyId===competency.id).length>=7,`${competency.id}: o banco de 120 itens deve manter pelo menos sete itens por competência escrita.`);
}
const domainCounts=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,allItems.filter(item=>item.domain===domain).length]));
assert.deepEqual(domainCounts,{leitura:30,"educacao-literaria":30,escrita:30,gramatica:30},"a sexta vaga deve fechar a distribuição em 30 itens por domínio");

const answerPositions=allItems.filter(item=>item.responseType==="multiple-choice").reduce((counts,item)=>{counts[item.answerIndex]+=1;return counts;},[0,0,0,0]);
const mcTotal=answerPositions.reduce((sum,n)=>sum+n,0);
for(const n of answerPositions)assert.ok(n/mcTotal>=0.12&&n/mcTotal<=0.40,`posição correta demasiado concentrada: ${answerPositions.join("/")}`);

assert.match(page,/Português em preparação/);
assert.match(page,/continuará bloqueado até o diagnóstico, os treinos e a correção escrita serem suficientemente fiáveis/);
assert.match(page,/preview==="portuguese"/,"O laboratório de Português deve exigir um preview interno explícito.");
assert.match(page,/function PortugueseLab\(/,"O banco de Português deve estar ligado a um fluxo interno executável.");
assert.match(page,/buildPortugueseDiagnostic\(PORTUGUESE_ITEMS\)/);
assert.match(page,/buildAdaptivePortugueseMission\(PORTUGUESE_ITEMS/);
assert.equal((runtimeContent.match(/portuguese-639-(?:pilot|wave\d+)\.json/g)||[]).length,7,"O runtime deve agregar piloto + seis vagas.");
assert.match(runtimeContent,/flatMap\(pack=>pack\.items\)/);

console.log(`✓ Portuguese 639 foundation: ${packFiles.length} pacotes · 5 domínios curriculares · 16 competências escritas com profundidade ≥7 · ${allItems.length} itens originais · domínios 30/30/30/30 · release bloqueado`);
