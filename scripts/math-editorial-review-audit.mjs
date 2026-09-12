import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const ROOT=path.resolve("content/reviews/math-a");
const VALID_STATUSES=new Set(["approved","approved_with_override","needs_rewrite","rejected"]);

function files(dir){
  if(!fs.existsSync(dir))return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const full=path.join(dir,entry.name);
    if(entry.isDirectory())return files(full);
    return entry.isFile()&&entry.name.endsWith(".review.json")?[full]:[];
  }).sort();
}

const reviewFiles=files(ROOT);
assert.ok(reviewFiles.length>0,"É necessário pelo menos um ficheiro de revisão editorial de Matemática.");

let reviewed=0;
let approved=0;
let approvedWithOverride=0;
let unresolved=0;

for(const reviewFile of reviewFiles){
  const review=JSON.parse(fs.readFileSync(reviewFile,"utf8"));
  assert.equal(review.schemaVersion,1,`${reviewFile}: schemaVersion inesperado`);
  assert.equal(review.subject,"Matemática A",`${reviewFile}: disciplina incorreta`);
  assert.equal(review.reviewType,"editorial_math_pass",`${reviewFile}: tipo de revisão incorreto`);
  assert.ok(review.sourcePath,`${reviewFile}: sourcePath em falta`);
  assert.ok(review.sourceBlobSha,`${reviewFile}: sourceBlobSha em falta`);
  assert.ok(Array.isArray(review.criteria)&&review.criteria.length>=6,`${reviewFile}: critérios insuficientes`);

  const source=JSON.parse(fs.readFileSync(review.sourcePath,"utf8"));
  const sourceIds=source.questions.map(q=>q.id);
  const decisions=review.decisions||[];
  const decisionIds=decisions.map(d=>d.id);

  assert.equal(decisions.length,source.questions.length,`${reviewFile}: a revisão tem de cobrir todas as perguntas da submatéria`);
  assert.equal(new Set(decisionIds).size,decisionIds.length,`${reviewFile}: IDs de decisão repetidos`);
  assert.deepEqual([...decisionIds].sort(),[...sourceIds].sort(),`${reviewFile}: decisões não correspondem exatamente às perguntas da fonte`);

  for(const decision of decisions){
    assert.ok(VALID_STATUSES.has(decision.status),`${reviewFile}/${decision.id}: estado editorial inválido`);
    reviewed++;
    if(decision.status==="approved")approved++;
    else if(decision.status==="approved_with_override"){
      approvedWithOverride++;
      assert.ok(decision.rationale?.trim(),`${reviewFile}/${decision.id}: override sem justificação`);
      assert.ok(decision.override&&Object.keys(decision.override).length>0,`${reviewFile}/${decision.id}: override vazio`);
      const original=source.questions.find(q=>q.id===decision.id);
      const effective={...original,...decision.override};
      assert.ok(Array.isArray(effective.o)&&effective.o.length===4,`${reviewFile}/${decision.id}: override deixou de ter quatro opções`);
      assert.equal(new Set(effective.o.map(String)).size,4,`${reviewFile}/${decision.id}: override criou opções repetidas`);
      assert.ok([0,1,2,3].includes(effective.a),`${reviewFile}/${decision.id}: índice de resposta inválido`);
      assert.ok(String(effective.q||"").trim().length>=8,`${reviewFile}/${decision.id}: enunciado demasiado curto`);
      assert.ok(String(effective.sol||"").trim().length>=20,`${reviewFile}/${decision.id}: resolução revista demasiado curta`);
    }else{
      unresolved++;
      assert.ok(decision.rationale?.trim(),`${reviewFile}/${decision.id}: item não aprovado sem justificação`);
    }
  }

  const localApproved=decisions.filter(d=>d.status==="approved").length;
  const localOverride=decisions.filter(d=>d.status==="approved_with_override").length;
  const localUnresolved=decisions.length-localApproved-localOverride;
  assert.equal(review.summary.questionsReviewed,decisions.length,`${reviewFile}: summary.questionsReviewed incorreto`);
  assert.equal(review.summary.approved,localApproved,`${reviewFile}: summary.approved incorreto`);
  assert.equal(review.summary.approvedWithOverride,localOverride,`${reviewFile}: summary.approvedWithOverride incorreto`);
  assert.equal(review.summary.unresolved,localUnresolved,`${reviewFile}: summary.unresolved incorreto`);
  if(review.status==="complete")assert.equal(localUnresolved,0,`${reviewFile}: revisão completa não pode ter itens por resolver`);
}

console.log(`✓ Revisão editorial Matemática: ${reviewFiles.length} submatéria(s) · ${reviewed} perguntas revistas · ${approved} aprovadas · ${approvedWithOverride} aprovadas com correção · ${unresolved} por resolver`);
