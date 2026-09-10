import assert from "node:assert/strict";
import {VNEXT_DIAGNOSTIC_QUESTIONS} from "../app/data/vnextDiagnostic.js";
import {VNEXT_EXAM_QUESTIONS} from "../app/data/vnextExam.js";
import {VNEXT_MISSION_QUESTIONS} from "../app/data/vnextMission.js";
import {CURRICULUM_SUBTOPICS,curriculumSubtopicForItem} from "../app/data/curriculumVnext.js";
import {isEligibleForContext} from "../app/lib/quality.js";
import {RUNTIME_QUESTION_BANK,buildMiniExam,emptyScores} from "../app/lib/engine.js";

const expected=CURRICULUM_SUBTOPICS.length*3;
const reservedSourceIds=new Set([
  ...VNEXT_DIAGNOSTIC_QUESTIONS.map(question=>question.sourceQuestionId),
  ...VNEXT_MISSION_QUESTIONS.map(question=>question.sourceQuestionId)
]);

assert.equal(VNEXT_EXAM_QUESTIONS.length,expected);
assert.equal(new Set(VNEXT_EXAM_QUESTIONS.map(question=>question.id)).size,expected);
assert.equal(new Set(VNEXT_EXAM_QUESTIONS.map(question=>question.sourceQuestionId)).size,expected);

for(const subtopic of CURRICULUM_SUBTOPICS){
  const items=VNEXT_EXAM_QUESTIONS.filter(question=>question.subtopicId===subtopic.id);
  assert.equal(items.length,3,`${subtopic.id} deve ter três itens de Mini-exame.`);
  assert.equal(new Set(items.map(question=>question.signature)).size,3,`${subtopic.id} requer assinaturas independentes.`);
  assert.ok(items.some(question=>question.difficulty>=3),`${subtopic.id} requer pelo menos um item não elementar.`);
}

for(const question of VNEXT_EXAM_QUESTIONS){
  assert.match(question.id,/^EX-VN/);
  assert.equal(question.reviewStatus,"prototype");
  assert.equal(question.productionEligible,false);
  assert.deepEqual(question.contexts,["exam"]);
  assert.equal(curriculumSubtopicForItem(question),question.subtopicId);
  assert.equal(reservedSourceIds.has(question.sourceQuestionId),false,`${question.id} reutiliza um item do Diagnóstico ou das Missões.`);
  assert.equal(question.o.length,4);
  assert.equal(new Set(question.o).size,4);
  assert.ok(Number.isInteger(question.a)&&question.a>=0&&question.a<4);
  assert.ok(question.sol.trim().length>=5);
  assert.equal(isEligibleForContext(question,"exam",{},"internal"),true);
  assert.equal(isEligibleForContext(question,"exam",{},"friends_beta"),true);
  assert.equal(isEligibleForContext(question,"exam",{},"closed_beta"),false);
  assert.equal(isEligibleForContext(question,"exam",{},"production"),false);
}

assert.deepEqual([...new Set(VNEXT_EXAM_QUESTIONS.map(question=>question.year))].sort(),["10.º","11.º","12.º","12.º opcional"]);
assert.ok(new Set(VNEXT_EXAM_QUESTIONS.map(question=>question.cognitive)).size>=5);

const scores=emptyScores();
for(const question of RUNTIME_QUESTION_BANK.filter(item=>item.contexts?.includes("exam")&&!item.id.startsWith("EX-VN"))){
  if(scores[question.themeId])scores[question.themeId].evidence.push({itemId:question.id});
}
const state={
  goal:17,betaMode:"friends_beta",editorialOverrides:{},scores,missionHistory:[],examHistory:[],
  profile:{schoolYear:"12.º",optionalTopics:["all"],taughtSubtopicIds:CURRICULUM_SUBTOPICS.map(subtopic=>subtopic.id)}
};
const exam=buildMiniExam(state,8);
assert.equal(exam.length,8);
assert.ok(exam.some(question=>question.id.startsWith("EX-VN")),"O motor deve usar o novo banco quando os itens anteriores já foram vistos.");

console.log(`✓ Mini-exames vNext: ${VNEXT_EXAM_QUESTIONS.length} itens · 3 por submatéria · sem reutilização do Diagnóstico/Missões · produção bloqueada`);
