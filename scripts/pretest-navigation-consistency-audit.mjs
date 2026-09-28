import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const hub=readFileSync(new URL("../app/components/StudyModeHub.js",import.meta.url),"utf8");

assert.match(hub,/<b>Exames<\/b>/u,"o hub de estudo deve encaminhar para Exames.");
assert.doesNotMatch(page,/if\(s\.activeSubjectId==="portuguese"\)return <Shell><Back go=\{go\} to="train"\/><p className="eyebrow">MINI-EXAME · PORTUGUÊS 639/u,"o componente genérico de Exames não deve manter um fluxo paralelo morto de Português.");
assert.match(page,/onClick=\{\(\)=>go\("exams"\)\}>Exames<\/button>/u,"atalhos que abrem a área devem dizer Exames.");
assert.match(page,/Treino Livre ou Exames/u,"a copy transversal pós-Missão deve apontar para a área Exames.");
assert.match(page,/Em Exames encontras Mini-exames e, quando disponível, o Exame Completo/u,"o onboarding deve explicar corretamente o conteúdo da área.");
assert.match(portuguese,/Praticar, rever matéria ou fazer um exame/u,"Português deve usar copy genérica quando não escolhe ainda um modelo específico.");
assert.match(fqa,/matéria dada, missão, treino, exames, revisão e progresso por competência/u,"FQ A deve descrever a arquitetura comum com a nomenclatura atual.");

console.log("✓ navegação pré-teste: Exames é o destino comum e não existem fluxos paralelos mortos de Português");
