import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const ptx=readFileSync(new URL("../app/portugues-mini-exame/passage-mini-exam.css",import.meta.url),"utf8");
const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistryExam.js",import.meta.url),"utf8");
const fqaMini=readFileSync(new URL("../app/components/PhysicsChemistryMiniExam.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");

assert.match(css,/\/\* Desktop pass 3 — provas, revisão e resultados \*\//u,"deve existir uma passagem desktop dedicada a provas e revisão.");
assert.match(css,/\.fqaFullExamPage>.panel,[\s\S]*width:min\(1120px,calc\(100vw - 72px\)\)/u,"FQ A deve usar uma superfície larga mas controlada em desktop.");
assert.match(css,/\.fqaExamDots\{max-width:620px;margin:0 auto\}/u,"a navegação por questões de FQ A não deve espalhar-se pelo ecrã inteiro.");
assert.match(css,/\.examSubmitMap\{grid-template-columns:repeat\(auto-fit,minmax\(110px,1fr\)\)\}/u,"o checkpoint deve aproveitar melhor a largura em desktop.");
assert.match(css,/\.answerMap\{grid-template-columns:repeat\(6,minmax\(0,1fr\)\)/u,"o mapa de respostas de Matemática deve usar mais colunas em desktop.");
assert.match(css,/\.resultDisclaimer\{font-size:12px/u,"avisos de resultado não devem ficar ilegíveis em computador.");
assert.match(css,/\.reviewWrong summary\{font-size:13px\}/u,"a revisão de erros deve ter tipografia de leitura desktop.");
assert.match(css,/@media\(min-width:1440px\)[\s\S]*\.fqaExamReviewList\{max-width:1040px\}/u,"a revisão FQ A deve aproveitar 1440p sem ficar excessivamente larga.");

assert.match(ptx,/\/\* Desktop pass — Português em prova e revisão \*\//u,"Português deve ter uma passagem desktop específica em contexto de prova.");
assert.match(ptx,/\.ptx-workspace\{max-width:1240px[\s\S]*grid-template-columns:minmax\(430px,\.88fr\) minmax\(560px,1\.12fr\)/u,"texto-base e pergunta devem usar duas colunas equilibradas em desktop.");
assert.match(ptx,/\.ptx-question-card h2\{font-size:24px/u,"o enunciado de Português deve ganhar legibilidade no desktop.");
assert.match(ptx,/\.ptx-summary,.ptx-review-progress,.ptx-exam-policy,.ptx-review-list\{max-width:1180px/u,"a revisão de Português deve usar a largura disponível sem ocupar o ecrã todo.");
assert.match(ptx,/@media\(min-width:1440px\)[\s\S]*\.ptx-workspace\{grid-template-columns:minmax\(470px,\.9fr\) minmax\(590px,1\.1fr\)/u,"Português deve escalar de forma explícita em 1440p.");

assert.match(math,/MINI-EXAME CONCLUÍDO/u,"Matemática deve manter o fluxo de resultado.");
assert.match(fqa,/fqaExamReviewPage/u,"FQ A completo deve manter área de revisão.");
assert.match(fqaMini,/fqaMiniReviewPage/u,"FQ A mini-exame deve manter área de revisão.");
assert.match(portuguese,/ptx-review-list/u,"Português deve manter a revisão detalhada.");

console.log("✓ desktop provas/revisão: Matemática A, Português e FQ A com larguras, grelhas e tipografia próprias de 1080p/1440p");
