import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import {VNEXT_EXAM_QUESTIONS} from "../app/data/vnextExam.js";

const ROOT=path.resolve("content/vnext/math-a");
const EXPECTED={files:113,questions:5650,exam:339};

const files=[];
for(const year of ["10","11","12"]){
  const dir=path.join(ROOT,year);
  for(const name of fs.readdirSync(dir).filter(x=>x.endsWith(".json")).sort())files.push(path.join(dir,name));
}

let questions=0;
let malformed=0;
const years={"10.º":0,"11.º":0,"12.º":0,"12.º opcional":0};
for(const file of files){
  const doc=JSON.parse(fs.readFileSync(file,"utf8"));
  const rows=doc.questions||[];
  questions+=rows.length;
  for(const q of rows){
    if(!q.id||!q.q||!Array.isArray(q.o)||q.o.length!==4||![0,1,2,3].includes(q.a))malformed++;
    years[q.year]=(years[q.year]||0)+1;
  }
}

const examIds=new Set(VNEXT_EXAM_QUESTIONS.map(q=>q.id));
const examSources=new Set(VNEXT_EXAM_QUESTIONS.map(q=>q.sourceQuestionId).filter(Boolean));
const examSubtopics=new Set(VNEXT_EXAM_QUESTIONS.map(q=>q.subtopicId));
const examProductionEligible=VNEXT_EXAM_QUESTIONS.filter(q=>q.productionEligible===true).length;

assert.equal(files.length,EXPECTED.files,`Esperadas ${EXPECTED.files} submatérias vNext`);
assert.equal(questions,EXPECTED.questions,`Esperadas ${EXPECTED.questions} perguntas vNext`);
assert.equal(malformed,0,"O piloto não pode arrancar com itens estruturalmente inválidos");
assert.equal(VNEXT_EXAM_QUESTIONS.length,EXPECTED.exam,`Esperados ${EXPECTED.exam} itens de Mini-exame`);
assert.equal(examIds.size,EXPECTED.exam,"IDs de Mini-exame devem ser únicos");
assert.equal(examSources.size,EXPECTED.exam,"Mini-exame não deve repetir a mesma pergunta-fonte");
assert.equal(examSubtopics.size,EXPECTED.files,"Mini-exame deve cobrir as 113 submatérias");
assert.equal(examProductionEligible,0,"O piloto não pode desbloquear conteúdo para produção comercial");

console.log("\n=== Prontidão para piloto com alunos reais — Matemática A ===");
console.log(`Banco vNext: ${files.length}/${EXPECTED.files} submatérias · ${questions}/${EXPECTED.questions} perguntas`);
console.log(`Mini-exame: ${VNEXT_EXAM_QUESTIONS.length}/${EXPECTED.exam} itens · ${examSubtopics.size}/${EXPECTED.files} submatérias cobertas`);
console.log(`Estrutura inválida: ${malformed}`);
console.log(`Itens de Mini-exame marcados productionEligible=true: ${examProductionEligible}`);
console.log("Guardrail: este GO autoriza apenas validação controlada com alunos reais; não substitui revisão externa nem desbloqueia produção comercial.");
console.log("STUDENT PILOT READINESS: GO");
