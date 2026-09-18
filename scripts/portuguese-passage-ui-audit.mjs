import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const component=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/portugues-mini-exame/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/portugues-mini-exame/passage-mini-exam.css",import.meta.url),"utf8");

assert.match(component,/"use client"/u,"a experiência deve preservar estado de respostas no cliente");
assert.match(component,/exam\.blocks\.find/u,"a questão ativa deve recuperar o respetivo bloco de texto partilhado");
assert.match(component,/answers\[row\.id\]/u,"as respostas devem ser persistidas por item durante a navegação");
assert.match(component,/Rever o exame/u,"o fim do fluxo deve conduzir à revisão, não à correção imediata");
assert.match(component,/Autoavaliação necessária/u,"respostas abertas devem ficar explicitamente para autoavaliação/revisão");
assert.match(component,/não recebe classificação automática final/u,"a UI deve dizer que respostas abertas não têm nota automática final");
assert.match(component,/Ver texto-base/u,"em ecrãs pequenos deve existir acesso persistente ao texto-base");
assert.match(component,/Questão \{index\+1\}/u,"a UI deve mostrar a posição da questão");
assert.match(component,/ptx-question-nav/u,"deve existir navegação direta entre questões");

assert.match(route,/buildPortuguesePassagePrototypeExam/u,"a rota deve consumir o construtor canónico do protótipo");
assert.match(route,/portuguese-639-passage-prototypes\.json/u,"a rota deve consumir o documento editorial versionado");
assert.match(route,/PortuguesePassageMiniExam/u,"a rota deve renderizar o componente dedicado");

assert.match(css,/\.ptx-passage\{[^}]*position:sticky/u,"no desktop o texto-base deve permanecer visível durante a resposta");
assert.match(css,/@media\(max-width:820px\)/u,"deve existir comportamento responsivo dedicado");
assert.match(css,/\.ptx-mobile-text-toggle\{display:block;position:sticky/u,"no mobile o acesso ao texto-base deve permanecer visível");
assert.match(css,/\.ptx-workspace\{display:grid;grid-template-columns/u,"desktop deve separar texto e questão em duas colunas");

console.log("✓ UI texto partilhado Português: texto sticky desktop · acesso sticky mobile · navegação 6 questões · respostas preservadas · revisão final sem nota automática nas abertas");
