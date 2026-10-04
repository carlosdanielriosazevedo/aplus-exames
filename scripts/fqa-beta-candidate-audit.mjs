import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const subject=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const mini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const full=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const parityCss=readFileSync(new URL("../app/apronso-parity.css",import.meta.url),"utf8");

// 1. Entrada e diagnóstico: o aluno deve perceber o próximo passo e nunca ser empurrado
// automaticamente para uma missão depois do diagnóstico.
assert.match(subject,/O teu próximo passo\./u,"FQ A: Aprender deve apresentar um próximo passo claro.");
assert.match(subject,/Conhecer o teu ponto de partida/u,"FQ A: antes do diagnóstico deve existir um ponto de partida explícito.");
assert.match(subject,/progress\.diagnosticDone\?"Começar Missão":"Começar diagnóstico"/u,"FQ A: o CTA deve mudar de diagnóstico para missão apenas depois do diagnóstico.");
assert.match(subject,/session\.kind==="diagnostic"\?"Ir para o menu inicial"/u,"FQ A: o fim do diagnóstico deve regressar ao menu inicial.");
assert.match(subject,/const primaryTarget="home"/u,"FQ A: o diagnóstico não deve abrir Progresso ou Missão automaticamente.");

// 2. Estudo diário: Missão, Praticar e Rever Matéria devem existir no mesmo workspace.
assert.match(subject,/startMission/u,"FQ A: Missão deve estar operacional.");
assert.match(subject,/view==="trainingSetup"/u,"FQ A: Praticar deve ter configuração própria.");
assert.match(subject,/Começar treino/u,"FQ A: Praticar deve permitir iniciar treino.");
assert.match(subject,/view==="reviewMatter"/u,"FQ A: Rever Matéria deve estar disponível.");
assert.match(subject,/StudyModeHub/u,"FQ A: os modos de estudo devem continuar no hub partilhado.");

// 3. Avaliação: Mini-exame e Exame Completo devem estar ligados ao hub, guardar retoma
// e só mostrar correção depois da submissão.
assert.match(subject,/Mini-exame · Modelo 1/u,"FQ A: Mini-exame Modelo 1 deve estar acessível.");
assert.match(subject,/Mini-exame · Modelo 2/u,"FQ A: Mini-exame Modelo 2 deve estar acessível.");
assert.match(subject,/Exame Completo · 715/u,"FQ A: Exame Completo 715 deve estar acessível.");
assert.match(subject,/REVISÃO EM PAUSA/u,"FQ A: a Home deve permitir retomar revisão de prova.");
assert.match(mini,/não mostra a correção durante o mini-exame/u,"FQ A: Mini-exame não pode revelar correção durante a prova.");
assert.match(full,/Durante o Exame Completo não mostramos correções/u,"FQ A: Exame Completo não pode revelar correção durante a prova.");
assert.match(mini,/autoAssessmentConfidence/u,"FQ A: Mini-exame deve expor confiança da correção automática.");
assert.match(full,/autoAssessmentConfidence/u,"FQ A: Exame Completo deve expor confiança da correção automática.");

// 4. Pós-prova e progresso: a beta precisa de revisão, progresso e distinção clara entre
// preparação e nota de exame.
assert.match(subject,/view==="progress"/u,"FQ A: Progresso deve estar operacional.");
assert.match(subject,/Preparação ≠ nota de exame/u,"FQ A: Progresso deve explicar que preparação não é nota de exame.");
assert.match(subject,/Atualizar matéria dada/u,"FQ A: Progresso deve permitir atualizar matéria dada.");
assert.match(subject,/fqaCompetencyGrid/u,"FQ A: Progresso deve manter detalhe por competências.");

// 5. Navegação e mobile: Ranking e Apronso têm de sobreviver ao percurso completo.
assert.match(chrome,/STUDENT_NAV\.map/u,"Navegação: Ranking não pode ser removido no teste privado.");
assert.doesNotMatch(chrome,/filter\(\(\[id\]\)=>id!=="ranking"\)\)/u,"Navegação: não pode existir filtro que esconda Ranking.");
assert.match(parityCss,/\.learnIntro::after/u,"Apronso deve continuar visível no Aprender.");
assert.match(parityCss,/@media\(max-width:900px\)/u,"A presença do Apronso deve estar protegida em ecrãs menores.");
assert.match(parityCss,/\.progressPage \.progressHero>\.apronso/u,"Apronso deve continuar visível no Progresso mobile.");

console.log("✓ FQ A Beta Candidate: diagnóstico → Aprender → Missão/Praticar/Rever → Mini-exame/Exame Completo → revisão → Progresso → Ranking, com proteção mobile");
