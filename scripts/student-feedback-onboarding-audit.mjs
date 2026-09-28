import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const workspace=readFileSync(new URL("../app/lib/subjectWorkspace.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(workspace,/export function subjectGoal/u,"deve existir objetivo por disciplina.");
assert.match(workspace,/goal:subjectGoal\(state,id\)/u,"mudar de disciplina deve carregar o objetivo respetivo.");
assert.match(page,/Que nota queres alcançar a \{activeSubject\.name\}\?/u,"o objetivo deve ser configurado dentro da disciplina.");
assert.match(page,/goal:p\.goal/u,"o perfil da disciplina deve guardar o objetivo.");
assert.doesNotMatch(page,/subjectOnboardingMode==="add"\?"diag":"goalOnboard"/u,"o onboarding não deve criar um ecrã global de objetivo depois das disciplinas.");

assert.match(fqa,/Todo o programa de Física e Química A fica disponível/u,"quem terminou o secundário deve receber o programa completo de FQ A.");
assert.match(fqa,/taughtUnitIds:allDomainIds\(\)/u,"FQ A concluída deve guardar todos os domínios do 10.º e 11.º.");
assert.match(fqa,/finishedSecondary\?PHYSICS_CHEMISTRY_A_ITEMS/u,"FQ A concluída deve disponibilizar todo o banco curricular.");

assert.match(page,/PASSO 1 DE 4/u,"a apresentação do Apronso deve ser um único percurso.");
assert.match(page,/PASSO 4 DE 4/u,"o percurso único deve incluir navegação e progresso.");
assert.match(page,/firstUseTourCompleted:true/u,"concluir a apresentação inicial deve impedir uma segunda apresentação automática.");
assert.match(page,/Diagnóstico de Matemática A/u,"o diagnóstico deve identificar claramente a disciplina.");

assert.match(page,/window\.history\.pushState/u,"a navegação normal deve criar histórico do browser.");
assert.match(page,/window\.addEventListener\("popstate"/u,"Android, iOS e retroceder do browser devem conseguir navegar para trás.");
assert.match(page,/approvaScreen/u,"o histórico deve identificar o ecrã APProva+.");

assert.match(css,/\.learnHome\{background:linear-gradient\(180deg,#f6f8f9/u,"a Home deve usar fundo claro em vez de um grande campo azul.");
assert.match(css,/\.examHub \.apronsoNudge\.dark\{background:var\(--app-card-light\)/u,"o bloco do Apronso nos Exames deve deixar de competir com os cartões de ação.");
assert.match(portuguese,/className="learnHome"/u,"Português deve usar a Home clara comum.");
assert.match(fqa,/className="learnHome"/u,"FQ A deve usar a Home clara comum.");

console.log("✓ feedback do teste: FQ concluída, objetivo por disciplina, tour único, diagnóstico explícito, Home clara e histórico nativo");
