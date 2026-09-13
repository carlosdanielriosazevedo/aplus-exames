import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";

const YEAR_ROOT=path.resolve("content/vnext/math-a/12");
const PLAN_SPECS=[
  {path:path.resolve("content/reviews/math-a/12/12-complete.review-plan.json"),year:"12.º",expectedSubtopics:35,expectedQuestions:1750},
  {path:path.resolve("content/reviews/math-a/12/12-optional-complex.review-plan.json"),year:"12.º opcional",expectedSubtopics:12,expectedQuestions:600}
];
const EXPECTED_SUBTOPICS=47;
const EXPECTED_QUESTIONS=2350;

function gitBlobSha(buffer){
  const header=Buffer.from(`blob ${buffer.length}\0`);
  return createHash("sha1").update(header).update(buffer).digest("hex");
}
function norm(value){
  return String(value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
}

const plans=PLAN_SPECS.map(spec=>{
  assert.ok(fs.existsSync(spec.path),`${spec.year}: plano editorial anual em falta`);
  const plan=JSON.parse(fs.readFileSync(spec.path,"utf8"));
  assert.equal(plan.year,spec.year,`${spec.year}: ano incorreto no plano`);
  assert.equal(plan.status,"complete",`${spec.year}: plano ainda não está completo`);
  assert.equal(plan.defaultDecision,"approved",`${spec.year}: decisão por omissão inesperada`);
  assert.equal(plan.sources.length,spec.expectedSubtopics,`${spec.year}: número de submatérias cobertas inesperado`);
  assert.equal(plan.summary?.questionsReviewed,spec.expectedQuestions,`${spec.year}: total de perguntas revisto inesperado`);
  assert.equal(plan.summary?.unresolved,0,`${spec.year}: existem itens editoriais por resolver`);
  return {spec,plan};
});

const files=fs.readdirSync(YEAR_ROOT).filter(name=>name.endsWith(".json")).sort();
assert.equal(files.length,EXPECTED_SUBTOPICS,"12.º ano: número de ficheiros/submatérias inesperado");
const expectedPaths=files.map(name=>`content/vnext/math-a/12/${name}`);
const allEntries=plans.flatMap(({plan})=>plan.sources);
const plannedPaths=allEntries.map(x=>x.sourcePath).sort();
assert.equal(allEntries.length,EXPECTED_SUBTOPICS,"12.º ano: os planos não cobrem as 47 submatérias");
assert.deepEqual(plannedPaths,expectedPaths,"12.º ano: os planos editoriais não correspondem exatamente ao banco atual");
assert.equal(new Set(plannedPaths).size,plannedPaths.length,"12.º ano: fontes repetidas nos planos");

let total=0;
const ids=new Set();
for(const {spec,plan} of plans){
  let localTotal=0;
  for(const entry of plan.sources){
    const raw=fs.readFileSync(entry.sourcePath);
    assert.equal(gitBlobSha(raw),entry.sourceBlobSha,`${entry.sourcePath}: fonte mudou depois da revisão`);
    const source=JSON.parse(raw.toString("utf8"));
    assert.equal(norm(source.subject),norm("Matemática A"),`${entry.sourcePath}: disciplina incorreta`);
    assert.equal(source.year,spec.year,`${entry.sourcePath}: ano incorreto`);
    assert.equal(source.editorialTarget,50,`${entry.sourcePath}: editorialTarget inesperado`);
    assert.ok(Array.isArray(source.questions),`${entry.sourcePath}: questions em falta`);
    assert.equal(source.questions.length,50,`${entry.sourcePath}: a submatéria não tem 50 perguntas`);
    for(const item of source.questions){
      assert.ok(item.id,`${entry.sourcePath}: pergunta sem ID`);
      assert.ok(!ids.has(item.id),`12.º ano: ID repetido ${item.id}`);
      ids.add(item.id);
      assert.equal(item.year,spec.year,`${item.id}: ano incorreto`);
      assert.ok(String(item.q||"").trim().length>=5,`${item.id}: enunciado vazio/curto`);
      assert.ok(Array.isArray(item.o)&&item.o.length===4,`${item.id}: são necessárias quatro opções`);
      assert.equal(new Set(item.o.map(String)).size,4,`${item.id}: opções repetidas`);
      assert.ok([0,1,2,3].includes(item.a),`${item.id}: índice de resposta inválido`);
      assert.ok(String(item.sol||"").trim().length>=5,`${item.id}: resolução vazia/curta`);
    }
    localTotal+=source.questions.length;
    total+=source.questions.length;
  }
  assert.equal(localTotal,spec.expectedQuestions,`${spec.year}: total real de perguntas não corresponde ao plano`);
}

assert.equal(total,EXPECTED_QUESTIONS,"12.º ano: total de perguntas inesperado");
assert.equal(ids.size,EXPECTED_QUESTIONS,"12.º ano: IDs únicos não totalizam 2350");
console.log(`✓ 12.º ano fechado no gate interno: 35 regulares + 12 opcionais · ${EXPECTED_SUBTOPICS}/${EXPECTED_SUBTOPICS} submatérias · ${EXPECTED_QUESTIONS}/${EXPECTED_QUESTIONS} perguntas · 0 por resolver`);
