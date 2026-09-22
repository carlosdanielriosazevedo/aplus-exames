import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {AVAILABLE_SUBJECT_IDS} from "../app/data/subjects.js";
import {canonicalSubjectId,normalizeSubjectWorkspaceState,uniqueSubjectIds} from "../app/lib/subjectWorkspace.js";
import {migrateSubjectProgress,subjectProgressFor} from "../app/lib/subjectProgress.js";

for(const legacy of ["portugueseLab","portuguese-lab","portuguese_lab","portuguesePilot","portuguese-pilot","portuguese_pilot","portuguese-639","pt-639-pilot","pt639"]){
  assert.equal(canonicalSubjectId(legacy),"portuguese",`${legacy} deve convergir para Portuguese canónico`);
}

assert.deepEqual(uniqueSubjectIds(["math-a","portugueseLab","portuguese","portuguese-pilot"],AVAILABLE_SUBJECT_IDS),["math-a","portuguese"]);
const workspace=normalizeSubjectWorkspaceState({selectedSubjectIds:["portugueseLab","portuguese"],activeSubjectId:"portuguese-pilot"},AVAILABLE_SUBJECT_IDS);
assert.deepEqual(workspace.selectedSubjectIds,["portuguese"]);
assert.equal(workspace.activeSubjectId,"portuguese");

const migrated=migrateSubjectProgress({subjectProgress:{
  portuguese:{diagnosticDone:true,sessions:[{kind:"diagnostic",label:"Diagnóstico",completedAt:10,itemIds:["A"]}],competence:{x:{attempts:2,correct:1}},lastActivityAt:10},
  portugueseLab:{sessions:[{kind:"mission",label:"Missão",completedAt:20,itemIds:["B"]}],missionHistory:[{kind:"mission",label:"Missão",completedAt:20,itemIds:["B"]}],competence:{x:{attempts:3,correct:2},y:{attempts:1}},lastActivityAt:20}
}});
assert.deepEqual(Object.keys(migrated.subjectProgress),["portuguese"]);
const progress=subjectProgressFor(migrated,"portuguese");
assert.equal(progress.diagnosticDone,true);
assert.equal(progress.sessions.length,2,"sessões canónicas e legadas devem ser preservadas sem duplicar a disciplina");
assert.equal(progress.missionHistory.length,1);
assert.equal(progress.competence.x.attempts,3,"a migração deve conservar a evidência mais completa sem a duplicar");
assert.equal(progress.competence.y.attempts,1);

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const subject=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
assert.doesNotMatch(page,/PortugueseLab|portugueseLab/u);
assert.doesNotMatch(subject,/PortugueseLab|portugueseLab|laboratório/iu);
assert.match(subject,/StudentTop/u);
assert.match(subject,/StudentNav/u);
assert.match(subject,/view==="curriculum"/u);
assert.match(subject,/view==="trainingSetup"/u);
assert.match(subject,/>Responder</u,"Português deve exigir confirmação explícita da resposta");
assert.match(subject,/feedback\.final/u,"o feedback só deve ser renderizado depois da submissão");

console.log("✓ workspace por disciplina: Português único, aliases migrados, progresso preservado e navegação comum");
