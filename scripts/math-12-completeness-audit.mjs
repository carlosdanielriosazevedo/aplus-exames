import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";

const YEAR_ROOT=path.resolve("content/vnext/math-a/12");
const PLAN_PATH=path.resolve("content/reviews/math-a/12/12-complete.review-plan.json");
const EXPECTED_SUBTOPICS=47;
const EXPECTED_QUESTIONS=2350;

function gitBlobSha(buffer){
  const header=Buffer.from(`blob ${buffer.length}\0`);
  return createHash("sha1").update(header).update(buffer).digest("hex");
}
function norm(value){
  return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}

assert.ok(fs.existsSync(PLAN_PATH),"12.º ano: plano editorial anual em falta");
const plan=JSON.parse(fs.readFileSync(PLAN_PATH,"utf8"));
assert.equal(plan.year,"12.º","12.º ano: ano incorreto no plano");
assert.equal(plan.status,"complete","12.º ano: plano ainda não está completo");
assert.equal(plan.defaultDecision,"approved","12.º ano: decisão por omissão inesperada");
assert.equal(plan.sources.length,EXPECTED_SUBTOPICS,"12.º ano: plano não cobre as 47 submatérias");
assert.equal(plan.summary?.questionsReviewed,EXPECTED_QUESTIONS,"12.º ano: resumo não cobre as 2350 perguntas");
assert.equal(plan.summary?.unresolved,0,"12.º ano: existem itens editoriais por resolver");

const files=fs.readdirSync(YEAR_ROOT).filter(name=>name.endsWith(".json")).sort();
assert.equal(files.length,EXPECTED_SUBTOPICS,"12.º ano: número de ficheiros/submatérias inesperado");
const expectedPaths=files.map(name=>`content/vnext/math-a/12/${name}`);
const plannedPaths=plan.sources.map(x=>x.sourcePath).sort();
assert.deepEqual(plannedPaths,expectedPaths,"12.º ano: o plano editorial não corresponde exatamente ao banco atual");
assert.equal(new Set(plannedPaths).size,plannedPaths.length,"12.º ano: fontes repetidas no plano");

let total=0;
const ids=new Set();
for(const entry of plan.sources){
  const raw=fs.readFileSync(entry.sourcePath);
  assert.equal(gitBlobSha(raw),entry.sourceBlobSha,`${entry.sourcePath}: fonte mudou depois da revisão`);
  const source=JSON.parse(raw.toString("utf8"));
  assert.equal(norm(source.subject),norm("Matemática A"),`${entry.sourcePath}: disciplina incorreta`);
  assert.equal(source.year,"12.º",`${entry.sourcePath}: ano incorreto`);
  assert.equal(source.editorialTarget,50,`${entry.sourcePath}: editorialTarget inesperado`);
  assert.ok(Array.isArray(source.questions),`${entry.sourcePath}: questions em falta`);
  assert.equal(source.questions.length,50,`${entry.sourcePath}: a submatéria não tem 50 perguntas`);
  for(const item of source.questions){
    assert.ok(item.id,`${entry.sourcePath}: pergunta sem ID`);
    assert.ok(!ids.has(item.id),`12.º ano: ID repetido ${item.id}`);
    ids.add(item.id);
    assert.equal(item.year,"12.º",`${item.id}: ano incorreto`);
    assert.ok(String(item.q||"").trim().length>=5,`${item.id}: enunciado vazio/curto`);
    assert.ok(Array.isArray(item.o)&&item.o.length===4,`${item.id}: são necessárias quatro opções`);
    assert.equal(new Set(item.o.map(String)).size,4,`${item.id}: opções repetidas`);
    assert.ok([0,1,2,3].includes(item.a),`${item.id}: índice de resposta inválido`);
    assert.ok(String(item.sol||"").trim().length>=5,`${item.id}: resolução vazia/curta`);
  }
  total+=source.questions.length;
}
assert.equal(total,EXPECTED_QUESTIONS,"12.º ano: total de perguntas inesperado");
assert.equal(ids.size,EXPECTED_QUESTIONS,"12.º ano: IDs únicos não totalizam 2350");

console.log(`✓ 12.º ano fechado no gate interno: ${EXPECTED_SUBTOPICS}/${EXPECTED_SUBTOPICS} submatérias · ${EXPECTED_QUESTIONS}/${EXPECTED_QUESTIONS} perguntas · 0 por resolver`);
