import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(math,/dismissDailyMissionPrompt\(withMilestone\)/u,"Matemática A: ao sair do diagnóstico para a Home, a Missão não deve abrir automaticamente.");
assert.match(math,/go\("home"\);\s*\}\}>Ver o meu primeiro plano/u,"Matemática A: o diagnóstico deve regressar ao menu Aprender.");

assert.match(portuguese,/DIAGNÓSTICO CONCLUÍDO · PORTUGUÊS/u);
assert.match(portuguese,/Voltar ao plano de estudo/u,"Português: após diagnóstico deve existir regresso ao Aprender.");
const portugueseDiagnosticBlock=portuguese.slice(portuguese.indexOf('if(session.kind==="diagnostic")'),portuguese.indexOf('return <Shell><div className="centered completionMoment"',portuguese.indexOf('if(session.kind==="diagnostic")')+1));
assert.doesNotMatch(portugueseDiagnosticBlock,/Começar a missão recomendada/u,"Português: o resultado do diagnóstico não deve empurrar diretamente para a Missão.");

assert.match(fqa,/Caminho adaptativo de Física e Química A/u,"FQ A: Aprender deve usar o mesmo caminho adaptativo das outras disciplinas.");
assert.match(fqa,/O teu próximo passo\./u,"FQ A: a Home deve usar a hierarquia comum.");
assert.match(fqa,/Conhecer o teu ponto de partida/u);
assert.match(fqa,/Diagnóstico de Física e Química A/u);
assert.match(fqa,/Começar diagnóstico/u);
assert.match(fqa,/Primeira Missão adaptada/u);
assert.match(fqa,/progress\.diagnosticDone\?\(missionDone\?"MISSÃO CONCLUÍDA":"MISSÃO DE HOJE"\):"PRÓXIMO PASSO"/u,"FQ A: a Home deve mudar de diagnóstico para Missão apenas depois do diagnóstico.");
assert.match(fqa,/primaryLabel=session\.kind==="diagnostic"\?"Voltar ao plano de estudo"/u,"FQ A: o resultado do diagnóstico deve regressar ao Aprender.");
assert.doesNotMatch(fqa,/Hoje, trabalha ciência com método/u,"FQ A: remover a Home paralela antiga.");

console.log("✓ onboarding: diagnóstico -> Aprender sem Missão forçada; Home de FQ A alinhada com Matemática A e Português");
