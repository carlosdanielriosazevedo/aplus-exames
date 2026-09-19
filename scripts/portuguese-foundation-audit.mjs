import assert from "node:assert/strict";
import {readFileSync,readdirSync} from "node:fs";
import {PORTUGUESE_COMPETENCIES,resolvePortugueseCompetencyId,PORTUGUESE_CURRICULUM_GOVERNANCE,PORTUGUESE_DOMAINS,PORTUGUESE_REFERENCE_SOURCES,PORTUGUESE_RELEASE_POLICY,PORTUGUESE_RESPONSE_TYPES,PORTUGUESE_YEAR_FOCUS} from "../app/data/portugueseFoundation.js";
import {SECONDARY_EXAM_SUBJECTS,subjectStatusLabel} from "../app/data/subjects.js";

const contentDir=new URL("../content/vnext/portuguese/foundation/",import.meta.url);
const packFiles=readdirSync(contentDir).filter(name=>/^portuguese-639-(?:pilot|wave\d+)\.json$/u.test(name)).sort((a,b)=>a.includes("pilot")?-1:b.includes("pilot")?1:Number(a.match(/wave(\d+)/u)?.[1]||0)-Number(b.match(/wave(\d+)/u)?.[1]||0));
const packs=packFiles.map(name=>JSON.parse(readFileSync(new URL(name,contentDir),"utf8")));
const pilot=packs[0];
const allItems=packs.flatMap(pack=>pack.items);
const latestDeclared=[...packs].reverse().find(pack=>Number.isInteger(pack.bankSizeAfterWave))?.bankSizeAfterWave||allItems.length;
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const runtimeContent=readFileSync(new URL("../app/data/portugueseContent.js",import.meta.url),"utf8");

assert.equal(packFiles.length,13,"o runtime atual de Português deve ter piloto + doze vagas");
assert.equal(allItems.length,latestDeclared,"o banco agregado deve coincidir com o tamanho declarado pela vaga mais recente");
assert.equal(latestDeclared,300,"a décima quarta vaga deve elevar o banco para 300 itens");

const portuguese=SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id==="portuguese");
assert.ok(portuguese); assert.deepEqual(portuguese.codes,["639"]); assert.equal(portuguese.available,undefined); assert.equal(portuguese.releaseStage,"foundation"); assert.equal(subjectStatusLabel(portuguese),"Em preparação");
assert.equal(PORTUGUESE_RELEASE_POLICY.selectable,false); assert.equal(PORTUGUESE_RELEASE_POLICY.productionEligible,false); assert.equal(PORTUGUESE_RELEASE_POLICY.extendedWritingFinalAutoGrade,false);
assert.ok(allItems.length>=PORTUGUESE_RELEASE_POLICY.minimumPilotItems);
assert.ok(PORTUGUESE_RELEASE_POLICY.minimumBetaItems>allItems.length,"300 itens ainda não devem desbloquear automaticamente o beta de Português");

assert.deepEqual(PORTUGUESE_DOMAINS.map(domain=>domain.id),["oralidade","leitura","educacao-literaria","escrita","gramatica"]);
assert.equal(PORTUGUESE_DOMAINS.filter(domain=>domain.writtenExam).length,4);
assert.equal(PORTUGUESE_COMPETENCIES.length,20); assert.equal(PORTUGUESE_COMPETENCIES.filter(c=>c.writtenExam).length,16);
assert.deepEqual(PORTUGUESE_YEAR_FOCUS.map(f=>f.year),["10.º","11.º","12.º"]);
assert.equal(PORTUGUESE_REFERENCE_SOURCES.find(source=>source.id==="ae-revision-2026").status,"consultation");
assert.match(PORTUGUESE_CURRICULUM_GOVERNANCE.rule,/não substitui/);
for(const focus of PORTUGUESE_YEAR_FOCUS){const source=PORTUGUESE_REFERENCE_SOURCES.find(s=>s.id===focus.sourceId);assert.equal(source?.authority,"DGE");assert.equal(source?.status,"in-force");assert.equal(focus.curriculumStatus,"in-force");}

const responseTypes=new Map(PORTUGUESE_RESPONSE_TYPES.map(type=>[type.id,type]));
assert.equal(responseTypes.get("extended-writing").gradingMode,"rubric-assisted-provisional");
assert.equal(pilot.subjectId,"portuguese"); assert.equal(pilot.examCode,"639"); assert.equal(pilot.sourcePolicy,"original-only"); assert.equal(pilot.items.length,12);
for(const [index,pack] of packs.slice(1).entries()){const wave=index+1;assert.equal(pack.wave,wave,`wave${wave}: índice incoerente`);assert.equal(pack.subjectId,"portuguese");assert.equal(pack.examCode,"639");assert.equal(pack.sourcePolicy,"original-only");assert.equal(pack.productionEligible,false);assert.ok(pack.items?.length>0);}
assert.equal(packs.at(-1).wave,14); assert.equal(packs.at(-1).bankSizeAfterWave,300);

assert.equal(new Set(allItems.map(item=>item.id)).size,300,"Os IDs devem ser únicos.");
assert.equal(new Set(allItems.map(item=>item.stimulus)).size,300,"Os estímulos devem ser distintos.");
const years=new Set(),domains=new Set(),usedTypes=new Set();
for(const item of allItems){years.add(item.year);domains.add(item.domain);usedTypes.add(item.responseType);assert.match(item.id,/^PT639-FND-\d{3}$/);assert.ok(["10.º","11.º","12.º"].includes(item.year));assert.ok(PORTUGUESE_COMPETENCIES.some(c=>c.id===item.competencyId&&c.writtenExam),`${item.id}: competencyId inválido ou não canónico: ${item.competencyId}`);const competency=PORTUGUESE_COMPETENCIES.find(c=>c.id===item.competencyId);assert.ok(competency?.writtenExam);assert.equal(competency.domain,item.domain);assert.equal(item.sourceOrigin,"original");assert.equal(item.reviewStatus,"prototype");assert.ok(responseTypes.has(item.responseType));assert.ok(Number.isInteger(item.maxPoints)&&item.maxPoints>0);if(item.responseType==="multiple-choice"){assert.equal(item.options.length,4);assert.ok([0,1,2,3].includes(item.answerIndex));assert.equal(item.gradingMode,"deterministic");}if(item.responseType==="short-answer"){assert.ok(item.acceptedAnswers.length>=2);assert.equal(item.gradingMode,"deterministic-with-equivalents");}if(["restricted-response","extended-writing"].includes(item.responseType)){assert.equal(item.gradingMode,"rubric-assisted-provisional");assert.equal(item.rubric.criteria.reduce((total,c)=>total+c.points,0),item.rubric.maxPoints);assert.equal(item.rubric.maxPoints,item.maxPoints);}}
assert.deepEqual([...years].sort(),["10.º","11.º","12.º"]); assert.deepEqual([...domains].sort(),["educacao-literaria","escrita","gramatica","leitura"]); assert.deepEqual([...usedTypes].sort(),["extended-writing","multiple-choice","restricted-response","short-answer"]);

for(const competency of PORTUGUESE_COMPETENCIES.filter(c=>c.writtenExam))assert.ok(allItems.filter(item=>resolvePortugueseCompetencyId(item.competencyId)===competency.id).length>=7,`${competency.id}: menos de sete itens.`);
const domainCounts=Object.fromEntries(["leitura","educacao-literaria","escrita","gramatica"].map(domain=>[domain,allItems.filter(item=>item.domain===domain).length]));
for(const [domain,count] of Object.entries(domainCounts))assert.ok(count>=40,`${domain}: desequilíbrio excessivo (${count}/300).`);
for(const year of ["10.º","11.º","12.º"])assert.ok(allItems.filter(item=>item.year===year).length>=60,`${year}: cobertura anual insuficiente.`);

const answerPositions=allItems.filter(item=>item.responseType==="multiple-choice").reduce((counts,item)=>{counts[item.answerIndex]+=1;return counts;},[0,0,0,0]);
const mcTotal=answerPositions.reduce((sum,n)=>sum+n,0); for(const n of answerPositions)assert.ok(n/mcTotal>=0.12&&n/mcTotal<=0.40,`posição correta demasiado concentrada: ${answerPositions.join("/")}`);
assert.match(page,/Português em preparação/); assert.match(page,/preview==="portuguese"/); assert.match(page,/function PortugueseLab\(/);
assert.equal((runtimeContent.match(/portuguese-639-(?:pilot|wave\d+)\.json/g)||[]).length,11,"O runtime deve agregar piloto + doze vagas."); assert.match(runtimeContent,/flatMap\(pack=>pack\.items\)/);
console.log(`✓ Portuguese 639 foundation: 15 pacotes · 300 itens · 16 competências escritas · distribuição por domínio ${JSON.stringify(domainCounts)} · release ainda bloqueado`);
