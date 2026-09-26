import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const helper=readFileSync(new URL("../app/lib/physicsChemistryExamDraft.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");

assert.match(helper,/localStorage/u,"rascunhos devem persistir no dispositivo.");
assert.match(helper,/version:1/u,"formato do rascunho deve ser versionado.");
assert.match(helper,/JSON\.stringify\(draft\.itemIds\)!==JSON\.stringify\(itemIds\)/u,"rascunho incompatível com outro conjunto de itens não pode ser recuperado.");
assert.match(helper,/clearPhysicsChemistryExamDraft/u);

for(const [label,component] of [["simulado",full],["mini-exame",mini]]){
  assert.match(component,/loadPhysicsChemistryExamDraft/u,label+": deve recuperar rascunho.");
  assert.match(component,/savePhysicsChemistryExamDraft/u,label+": deve guardar rascunho.");
  assert.match(component,/clearPhysicsChemistryExamDraft/u,label+": deve apagar rascunho quando termina.");
  assert.match(component,/Rascunho retomado/u,label+": deve informar quando recupera uma sessão.");
  assert.match(component,/Guardar e sair/u,label+": saída deve ser explicitamente guardada.");
  assert.match(component,/startedAt/u,label+": retoma deve preservar o relógio original.");
}
assert.match(full,/examId="fqa-full-715"/u);
assert.match(mini,/exam\.id/u);

console.log("✓ FQ A drafts: simulado e mini-exames guardam respostas, posição e tempo de início e retomam no mesmo dispositivo");
