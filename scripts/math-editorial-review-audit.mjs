import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {createHash} from "node:crypto";

const ROOT=path.resolve("content/reviews/math-a");
const YEAR10_ROOT=path.resolve("content/vnext/math-a/10");
const VALID_STATUSES=new Set(["approved","approved_with_override","needs_rewrite","rejected"]);

function files(dir,suffix){
  if(!fs.existsSync(dir))return [];
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>{
    const full=path.join(dir,entry.name);
    if(entry.isDirectory())return files(full,suffix);
    return entry.isFile()&&entry.name.endsWith(suffix)?[full]:[];
  }).sort();
}
function gitBlobSha(buffer){
  const header=Buffer.from(`blob ${buffer.length}\0`);
  return createHash("sha1").update(header).update(buffer).digest("hex");
}
function sourcePayload(sourcePath,expectedSha,label){
  const raw=fs.readFileSync(sourcePath);
  const actualSha=gitBlobSha(raw);
  assert.equal(actualSha,expectedSha,`${label}: a fonte mudou depois da revisão; é necessária nova passagem editorial`);
  return JSON.parse(raw.toString("utf8"));
}
function validateEffectiveDecision(decision,sourceItem,label){
  assert.ok(VALID_STATUSES.has(decision.status),`${label}/${decision.id}: estado editorial inválido`);
  if(decision.status==="approved_with_override"){
    assert.ok(decision.rationale?.trim(),`${label}/${decision.id}: override sem justificação`);
    assert.ok(decision.override&&Object.keys(decision.override).length>0,`${label}/${decision.id}: override vazio`);
    const effective={...sourceItem,...decision.override};
    assert.ok(Array.isArray(effective.o)&&effective.o.length===4,`${label}/${decision.id}: override deixou de ter quatro opções`);
    assert.equal(new Set(effective.o.map(String)).size,4,`${label}/${decision.id}: override criou opções repetidas`);
    assert.ok([0,1,2,3].includes(effective.a),`${label}/${decision.id}: índice de resposta inválido`);
    assert.ok(String(effective.q||"").trim().length>=8,`${label}/${decision.id}: enunciado demasiado curto`);
    assert.ok(String(effective.sol||"").trim().length>=20,`${label}/${decision.id}: resolução revista demasiado curta`);
  }else if(decision.status==="needs_rewrite"||decision.status==="rejected"){
    assert.ok(decision.rationale?.trim(),`${label}/${decision.id}: item não aprovado sem justificação`);
  }
}

const reviewFiles=files(ROOT,".review.json");
const planFiles=files(ROOT,".review-plan.json");
assert.ok(reviewFiles.length>0,"É necessário pelo menos um ficheiro de revisão editorial de Matemática.");

let reviewed=0;
let approved=0;
let approvedWithOverride=0;
let unresolved=0;
const coveredSources=new Set();
const coveredIds=new Set();

function countDecision(decision){
  reviewed++;
  if(decision.status==="approved")approved++;
  else if(decision.status==="approved_with_override")approvedWithOverride++;
  else unresolved++;
}
function registerCoverage(sourcePath,id,label){
  const key=`${sourcePath}::${id}`;
  assert.ok(!coveredIds.has(key),`${label}: pergunta coberta mais de uma vez: ${id}`);
  coveredIds.add(key);
}

for(const reviewFile of reviewFiles){
  const review=JSON.parse(fs.readFileSync(reviewFile,"utf8"));
  assert.equal(review.schemaVersion,1,`${reviewFile}: schemaVersion inesperado`);
  assert.equal(review.subject,"Matemática A",`${reviewFile}: disciplina incorreta`);
  assert.equal(review.reviewType,"editorial_math_pass",`${reviewFile}: tipo de revisão incorreto`);
  assert.ok(review.sourcePath,`${reviewFile}: sourcePath em falta`);
  assert.ok(review.sourceBlobSha,`${reviewFile}: sourceBlobSha em falta`);
  assert.ok(Array.isArray(review.criteria)&&review.criteria.length>=6,`${reviewFile}: critérios insuficientes`);

  const source=sourcePayload(review.sourcePath,review.sourceBlobSha,reviewFile);
  const sourceIds=source.questions.map(q=>q.id);
  const decisions=review.decisions||[];
  const decisionIds=decisions.map(d=>d.id);

  assert.equal(decisions.length,source.questions.length,`${reviewFile}: a revisão tem de cobrir todas as perguntas da submatéria`);
  assert.equal(new Set(decisionIds).size,decisionIds.length,`${reviewFile}: IDs de decisão repetidos`);
  assert.deepEqual([...decisionIds].sort(),[...sourceIds].sort(),`${reviewFile}: decisões não correspondem exatamente às perguntas da fonte`);
  assert.ok(!coveredSources.has(review.sourcePath),`${reviewFile}: fonte já coberta por outra revisão`);
  coveredSources.add(review.sourcePath);

  for(const decision of decisions){
    const original=source.questions.find(q=>q.id===decision.id);
    validateEffectiveDecision(decision,original,reviewFile);
    registerCoverage(review.sourcePath,decision.id,reviewFile);
    countDecision(decision);
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

for(const planFile of planFiles){
  const plan=JSON.parse(fs.readFileSync(planFile,"utf8"));
  assert.equal(plan.schemaVersion,1,`${planFile}: schemaVersion inesperado`);
  assert.equal(plan.subject,"Matemática A",`${planFile}: disciplina incorreta`);
  assert.equal(plan.reviewType,"editorial_math_annual_pass",`${planFile}: tipo de plano incorreto`);
  assert.ok(Array.isArray(plan.criteria)&&plan.criteria.length>=6,`${planFile}: critérios insuficientes`);
  assert.equal(plan.defaultDecision,"approved",`${planFile}: a decisão por omissão tem de ser approved`);
  assert.ok(Array.isArray(plan.sources)&&plan.sources.length>0,`${planFile}: fontes em falta`);
  assert.equal(new Set(plan.sources.map(x=>x.sourcePath)).size,plan.sources.length,`${planFile}: fontes repetidas`);

  const overrideById=new Map();
  for(const ov of plan.overrides||[]){
    assert.ok(ov.id&&ov.sourcePath,`${planFile}: override sem id/sourcePath`);
    assert.ok(!overrideById.has(ov.id),`${planFile}: override repetido ${ov.id}`);
    overrideById.set(ov.id,ov);
  }

  for(const entry of plan.sources){
    assert.ok(entry.sourcePath&&entry.sourceBlobSha,`${planFile}: sourcePath/sourceBlobSha em falta`);
    assert.ok(!coveredSources.has(entry.sourcePath),`${planFile}: fonte já coberta por outra revisão: ${entry.sourcePath}`);
    const source=sourcePayload(entry.sourcePath,entry.sourceBlobSha,planFile);
    assert.equal(source.subject,"Matemática A",`${planFile}: fonte de outra disciplina`);
    assert.equal(source.year,plan.year,`${planFile}: ano da fonte não corresponde ao plano`);
    assert.equal(source.questions.length,50,`${planFile}: cada submatéria do 10.º deve ter 50 perguntas`);
    coveredSources.add(entry.sourcePath);

    for(const item of source.questions){
      const explicit=overrideById.get(item.id);
      if(explicit)assert.equal(explicit.sourcePath,entry.sourcePath,`${planFile}/${item.id}: override aponta para outra fonte`);
      const decision=explicit||{id:item.id,status:plan.defaultDecision};
      validateEffectiveDecision(decision,item,planFile);
      registerCoverage(entry.sourcePath,item.id,planFile);
      countDecision(decision);
    }
  }

  for(const ov of plan.overrides||[]){
    assert.ok(coveredIds.has(`${ov.sourcePath}::${ov.id}`),`${planFile}: override não corresponde a nenhuma pergunta coberta: ${ov.id}`);
  }
  if(plan.status==="complete"){
    const planUnresolved=(plan.overrides||[]).filter(x=>x.status==="needs_rewrite"||x.status==="rejected").length;
    assert.equal(planUnresolved,0,`${planFile}: plano completo não pode ter itens por resolver`);
  }
}

// Quando existe o plano anual do 10.º ano, "completo" significa literalmente
// todas as 31 submatérias / 1550 perguntas, sem depender de contagens manuais.
const year10Plans=planFiles.filter(f=>{
  const p=JSON.parse(fs.readFileSync(f,"utf8"));
  return p.year==="10.º"&&p.status==="complete";
});
if(year10Plans.length){
  const sourcePaths=files(YEAR10_ROOT,".json").map(f=>path.relative(process.cwd(),f).split(path.sep).join("/"));
  assert.equal(sourcePaths.length,31,"10.º ano: número de submatérias inesperado");
  const missing=sourcePaths.filter(p=>!coveredSources.has(p));
  const extras=[...coveredSources].filter(p=>p.startsWith("content/vnext/math-a/10/")&&!sourcePaths.includes(p));
  assert.deepEqual(missing,[],`10.º ano: faltam revisões para ${missing.join(", ")}`);
  assert.deepEqual(extras,[],`10.º ano: fontes de revisão inesperadas ${extras.join(", ")}`);

  const year10Questions=sourcePaths.reduce((n,p)=>n+JSON.parse(fs.readFileSync(p,"utf8")).questions.length,0);
  const reviewed10=[...coveredIds].filter(k=>k.startsWith("content/vnext/math-a/10/")).length;
  assert.equal(year10Questions,1550,"10.º ano: banco deixou de ter 1550 perguntas");
  assert.equal(reviewed10,1550,"10.º ano: a revisão não cobre as 1550 perguntas");
  assert.equal(unresolved,0,"10.º ano: existem itens editoriais por resolver");
  console.log(`✓ 10.º ano fechado editorialmente: 31/31 submatérias · 1550/1550 perguntas cobertas · ${approvedWithOverride} correções explícitas · 0 por resolver`);
}

console.log(`✓ Revisão editorial Matemática: ${coveredSources.size} submatéria(s) · ${reviewed} perguntas revistas · ${approved} aprovadas · ${approvedWithOverride} aprovadas com correção · ${unresolved} por resolver`);
