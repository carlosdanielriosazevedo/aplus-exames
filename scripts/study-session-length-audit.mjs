import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const read=path=>readFileSync(new URL(path,import.meta.url),"utf8");
const policy=read("../app/lib/sessionPolicy.js");
const engine=read("../app/lib/engine.js");
const portugueseEngine=read("../app/lib/portugueseEngine.js");
const page=read("../app/page.js");
const portugueseExams=read("../app/data/portuguesePassagePrototype.js");

assert.match(policy,/STUDY_SESSION_MIN_QUESTIONS=7/u);
assert.match(policy,/STUDY_SESSION_MAX_QUESTIONS=10/u);
assert.match(policy,/DEFAULT_TRAINING_QUESTIONS=8/u);
assert.match(policy,/DEFAULT_MISSION_QUESTIONS=7/u);
assert.match(policy,/MATH_MINI_EXAM_QUESTIONS=12/u);
assert.match(policy,/PORTUGUESE_MINI_EXAM_QUESTIONS=10/u);

assert.match(engine,/DAILY_MISSION_MIN_INTERACTIONS=STUDY_SESSION_MIN_QUESTIONS/u);
assert.match(engine,/DAILY_MISSION_MAX_INTERACTIONS=STUDY_SESSION_MAX_QUESTIONS/u);
assert.match(engine,/const boundedLimit=clampStudySessionSize\(limit\)/u);
assert.match(engine,/buildMiniExam\(s,count=MATH_MINI_EXAM_QUESTIONS\)/u);

assert.match(portugueseEngine,/const missionSize=clampStudySessionSize\(size\)/u);
assert.match(portugueseEngine,/selected\.length<STUDY_SESSION_MIN_QUESTIONS/u);

assert.match(page,/trainingQuestions\(s,cfg,DEFAULT_TRAINING_QUESTIONS\)/u);
assert.match(page,/questions\.length<STUDY_SESSION_MIN_QUESTIONS/u);
assert.match(page,/buildMiniExam\(s,MATH_MINI_EXAM_QUESTIONS\)/u);
assert.match(page,/minimumFallback=newTotal<STUDY_SESSION_MIN_QUESTIONS/u);

assert.match(portugueseExams,/expandPortugueseMiniExam/u);
assert.match(portugueseExams,/slice\(0,PORTUGUESE_MINI_EXAM_QUESTIONS\)/u);
assert.match(portugueseExams,/durationMinutes:45/u);

console.log("✓ study sessions: Missões 7–10, Treino Livre 7–10, Mini-exame Matemática 12, Mini-exame Português 10");
