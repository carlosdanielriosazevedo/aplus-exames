import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const sessionPolicy=readFileSync(new URL("../app/lib/sessionPolicy.js",import.meta.url),"utf8");

assert.match(sessionPolicy,/DEFAULT_TRAINING_QUESTIONS=8/u,"Matemática A deve manter treino livre com 8 perguntas.");
assert.match(portuguese,/buildAdaptivePortugueseMission/u,"Português deve construir treino e Missão pelo motor adaptativo.");
assert.match(fqa,/size:7/u,"a Missão de FQ A deve ter 7 perguntas.");
assert.match(fqa,/Math\.max\(7,Math\.min\(8,available\)\)/u,"o Treino Livre de FQ A deve ficar entre 7 e 8 perguntas.");
assert.match(fqa,/Não sobe nem desce diretamente o teu Domínio/u,"FQ A deve explicar a mesma regra pedagógica do Treino Livre.");

assert.match(math,/missionDone\?<button onClick=\{\(\)=>go\("train"\)\}/u,"Matemática A deve encaminhar para treino depois da Missão diária.");
assert.match(portuguese,/missionDone\?\(\)=>go\("train"\)/u,"Português deve encaminhar para treino depois da Missão diária.");
assert.match(fqa,/missionDone\?\(\)=>go\("train"\):progress\.diagnosticDone\?\(\)=>startMission\(\):startDiagnostic/u,"FQ A deve usar o mesmo CTA adaptativo: diagnóstico, Missão e depois treino.");
assert.match(fqa,/className="adaptivePath"/u,"FQ A deve usar o caminho adaptativo comum no Aprender.");
assert.match(fqa,/Praticar, rever matéria ou fazer um exame/u,"FQ A deve apresentar o mesmo próximo passo provável das restantes disciplinas.");

assert.match(fqa,/if\(!\["home","exams"\]\.includes\(view\)\)return/u,"FQ A deve carregar retomas de exame também no Home.");
assert.match(fqa,/SESSÃO EM PAUSA/u,"o Home de FQ A deve mostrar sessões de estudo em pausa.");
assert.match(fqa,/REVISÃO EM PAUSA/u,"o Home de FQ A deve mostrar revisões de exame em pausa.");
assert.match(fqa,/physicsChemistryDraftAgeLabel/u,"a retoma de FQ A deve indicar quando foi guardada.");

for(const [label,source] of [["Matemática A",math],["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/progressHero/u,label+": Progresso deve manter o resumo principal comum.");
  assert.match(source,/OBJETIVO/u,label+": Progresso deve mostrar o objetivo do aluno.");
  assert.match(source,/O índice não prevê a tua nota de exame/u,label+": o índice deve manter o aviso de não previsão.");
}
assert.match(fqa,/const overall=totalSignals\?Math\.round\(positiveSignals\/totalSignals\*100\):null/u,"o resumo de FQ A deve ser derivado da evidência disponível, não de uma nota inventada.");
assert.match(fqa,/Não é uma nota/u,"as competências de FQ A devem continuar explicitamente separadas de uma classificação.");

assert.match(math,/pendingSelectedDiagnostics/u,"Matemática A deve impedir o modal automático da Missão enquanto houver diagnósticos de outras disciplinas por concluir.");
assert.match(math,/Ir para o menu inicial/u,"o pós-diagnóstico de Matemática A deve devolver explicitamente à Home.");
assert.match(math,/recordMilestone\(dismissDailyMissionPrompt\(prev\),"first_plan_viewed"/u,"ao sair do diagnóstico de Matemática A, a Home deve abrir sem modal automático da Missão.");
assert.match(portuguese,/Ir para o menu inicial/u,"o pós-diagnóstico de Português deve devolver explicitamente à Home.");
assert.match(fqa,/Ir para o menu inicial/u,"o pós-diagnóstico de FQ A deve devolver explicitamente à Home.");

console.log("✓ percurso pré-teste: diagnósticos multi-disciplina antes de prompt automático · Missão única/dia · Treino 7–10 · retoma no Home · Progresso coerente");
