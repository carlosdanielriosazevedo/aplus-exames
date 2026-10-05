import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const setup=readFileSync(new URL("../app/components/SetupScreens.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const workspace=readFileSync(new URL("../app/lib/subjectWorkspace.js",import.meta.url),"utf8");

assert.match(page,/Cada disciplina terá o seu diagnóstico, objetivo e plano de estudo/u,"a seleção inicial deve explicar que diagnóstico e objetivo são por disciplina.");
assert.match(setup,/Que nota queres alcançar a \{activeSubject\.name\}\?/u,"o objetivo deve aparecer dentro da configuração de cada disciplina.");
assert.match(setup,/Este objetivo é específico desta disciplina/u,"a configuração deve explicar que o objetivo é específico da disciplina.");
assert.match(setup,/\[activeSubject\.id\]:\{[\s\S]*goal:p\.goal/u,"o objetivo configurado deve ser persistido no espaço da disciplina ativa.");
assert.match(setup,/const finished=s\.profile\?\.schoolYear==="Já terminei o secundário"/u,"Matemática deve reconhecer secundário concluído como programa completo.");
assert.match(setup,/const clean=finished\?\[\.\.\.valid\]/u,"Matemática deve ativar automaticamente todas as submatérias válidas quando o secundário terminou.");
assert.match(setup,/Todo o programa de Matemática A fica disponível/u,"o ecrã de matéria deve explicar o desbloqueio de Matemática A.");
assert.match(portuguese,/Todo o programa de Português fica disponível/u,"secundário concluído deve desbloquear Português.");
assert.match(fqa,/Todo o programa de Física e Química A fica disponível/u,"secundário concluído deve desbloquear FQ A.");

assert.match(page,/PASSO 1 DE 4/u,"deve existir um único tour inicial.");
assert.match(page,/PASSO 4 DE 4/u,"o tour deve terminar com navegação e progresso.");
assert.match(page,/firstUseTourCompleted:true/u,"o tour não deve reaparecer automaticamente depois do diagnóstico.");

assert.match(page,/AVALIAÇÃO INICIAL · MATEMÁTICA A · PROVA 635/u,"o diagnóstico de Matemática deve identificar disciplina e prova.");
assert.match(portuguese,/AVALIAÇÃO INICIAL · PORTUGUÊS · PROVA 639/u,"o diagnóstico de Português deve identificar disciplina e prova.");
assert.match(fqa,/AVALIAÇÃO INICIAL · FÍSICA E QUÍMICA A · PROVA 715/u,"o diagnóstico de FQ A deve identificar disciplina e prova.");

assert.match(workspace,/goal:subjectGoal\(state,id\)/u,"trocar de disciplina deve carregar o objetivo correspondente.");
assert.match(page,/approvaSubjectId:s\.activeSubjectId\|\|null/u,"o histórico deve guardar a disciplina atual.");
assert.match(page,/targetSubjectId=event\.state\?\.approvaSubjectId/u,"o retroceder deve recuperar a disciplina associada ao ecrã.");
assert.match(page,/activateSubjectState\(prev,targetSubjectId\)/u,"o retroceder deve restaurar o contexto da disciplina e não apenas o nome do ecrã.");

assert.match(fqa,/progressHero[\s\S]*progressOverview[\s\S]*progressActions[\s\S]*progressDetails/u,"FQ A deve seguir a estrutura visual de Progresso usada nas outras disciplinas.");
assert.match(fqa,/<details className="progressDetails"><summary>Ver detalhe por matéria →<\/summary>/u,"o detalhe de FQ A deve começar fechado.");

console.log("✓ reteste desde zero: disciplinas → perfil/objetivo → matéria → tour → diagnóstico explícito → histórico nativo → progresso FQ A");
