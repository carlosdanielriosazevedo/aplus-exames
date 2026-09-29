import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(
  page,
  /dismissDailyMissionPrompt\(recordMilestone\(prev,"first_plan_viewed"/u,
  "Depois do diagnóstico de Matemática A, a Home deve abrir sem disparar automaticamente a Missão do dia."
);

for(const [label,source] of [["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/O teu próximo passo\./u,label+": a Home deve usar o mesmo enquadramento de Aprender.");
  assert.match(source,/Conhecer o teu ponto de partida/u,label+": antes do diagnóstico deve mostrar o primeiro passo.");
  assert.match(source,/Diagnóstico concluído/u,label+": depois do diagnóstico deve mostrar o passo concluído.");
  assert.match(source,/PRÓXIMO PASSO PROVÁVEL/u,label+": deve manter a progressão visual partilhada.");
}
assert.match(fqa,/progress\.diagnosticDone\?"Física e Química A adaptada ao teu percurso":"Diagnóstico de Física e Química A"/u,"FQ A deve trocar o cartão central de diagnóstico para missão apenas depois do diagnóstico.");
assert.match(fqa,/onClick=\{missionDone\?\(\)=>go\("train"\):progress\.diagnosticDone\?\(\)=>startMission\(\):startDiagnostic\}/u,"FQ A não pode oferecer a Missão antes de concluir o diagnóstico.");
assert.match(fqa,/progress\.diagnosticDone\?"Começar Missão":"Começar diagnóstico"/u,"O CTA de FQ A deve refletir o estado do diagnóstico.");
assert.doesNotMatch(fqa,/Hoje, trabalha ciência com método\./u,"A Home antiga e paralela de FQ A deve deixar de ser usada.");

console.log("✓ Aprender: FQ A alinhada com Português/Matemática e Matemática não força Missão após diagnóstico");
