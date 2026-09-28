import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(page,/return dismissDailyMissionPrompt\(withMilestone\)/u,
  "Matemática A deve silenciar o prompt automático da Missão ao sair do diagnóstico.");
assert.match(page,/Ver o meu primeiro plano/u,
  "O diagnóstico de Matemática A deve continuar a encaminhar para a Home/Aprender.");

for(const [label,source] of [["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/O teu próximo passo\./u,label+": a Home deve usar a estrutura comum de Aprender.");
  assert.match(source,/Conhecer o teu ponto de partida/u,label+": antes do diagnóstico deve apresentar o primeiro passo.");
  assert.match(source,/Diagnóstico de /u,label+": deve mostrar um cartão de diagnóstico.");
  assert.match(source,/Começar diagnóstico/u,label+": o diagnóstico deve ser iniciado por ação explícita do aluno.");
  assert.match(source,/PRÓXIMO PASSO PROVÁVEL/u,label+": deve manter a continuação provável do percurso.");
  assert.match(source,/Primeira Missão adaptada/u,label+": antes do diagnóstico a Missão deve aparecer apenas como passo futuro.");
}
assert.match(fqa,/progress\.diagnosticDone\?"Física e Química A adaptada ao teu percurso":"Diagnóstico de Física e Química A"/u,
  "FQ A deve trocar o cartão principal de diagnóstico para missão apenas depois do diagnóstico.");
assert.doesNotMatch(fqa,/Hoje, trabalha ciência com método\./u,
  "FQ A não deve regressar à Home antiga específica da disciplina.");

console.log("✓ onboarding: Matemática regressa à Home sem forçar Missão · Português/FQ A usam o mesmo caminho Diagnóstico → Missão");
