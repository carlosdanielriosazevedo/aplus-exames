import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const component=readFileSync(new URL("../app/components/PortuguesePassageMiniExam.js",import.meta.url),"utf8");
const route=readFileSync(new URL("../app/portugues-mini-exame/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/portugues-mini-exame/passage-mini-exam.css",import.meta.url),"utf8");

assert.match(component,/"use client"/u,"a experiência deve preservar estado de respostas no cliente");
assert.match(component,/exam\.blocks\.find/u,"a questão ativa deve recuperar o respetivo bloco de texto partilhado");
assert.match(component,/answers\[row\.id\]/u,"as respostas devem ser persistidas por item durante a navegação");
assert.match(component,/onClick=\{\(\)=>setReview\(true\)\}>Terminar e rever o exame/u,"o fim do fluxo deve conduzir explicitamente à revisão");
assert.doesNotMatch(component,/>Corrigir</u,"um exame terminado não deve voltar a apresentar uma ação de correção");
assert.doesNotMatch(component,/Voltar às respostas/u,"depois de terminado, o exame deve permanecer no fluxo de revisão");
assert.match(component,/Autoavaliação guiada/u,"respostas abertas devem conduzir à autoavaliação guiada por critérios");
assert.match(component,/não (?:produz|produzem)[^\n]*classificação automática final/u,"a UI deve dizer que autoavaliação e revisão não produzem nota automática final");
assert.match(component,/Onde está a evidência na tua resposta\?/u,"a revisão deve pedir evidência explícita por critério");
assert.match(component,/Como distinguir uma resposta forte de uma resposta parcial/u,"a revisão deve mostrar âncoras de qualidade para respostas construídas");
assert.match(component,/Também pode estar correta se/u,"a revisão deve explicitar variantes semanticamente aceitáveis");
assert.match(component,/Erros frequentes/u,"a revisão deve mostrar erros típicos que distinguem resumo de análise");
assert.match(component,/ptx-criterion-observations/u,"a revisão deve tornar visíveis as observações atómicas de cada critério");
assert.match(component,/Melhorar resposta/u,"a revisão deve permitir criar uma nova versão depois da autoavaliação");
assert.match(component,/Antes · versão/u,"a UI deve preservar visualmente a versão anterior");
assert.match(component,/Depois · versão/u,"a UI deve mostrar a versão melhorada");
assert.match(component,/Ver texto-base/u,"em ecrãs pequenos deve existir acesso persistente ao texto-base");
assert.match(component,/Questão \$\{index\+1\}/u,"a UI deve mostrar a posição da questão");
assert.match(component,/ptx-question-nav/u,"deve existir navegação direta entre questões");

assert.match(route,/buildPortuguesePassagePrototypeExam/u,"a rota deve consumir o construtor canónico do protótipo");
assert.match(route,/portuguese-639-passage-prototypes\.json/u,"a rota deve consumir o documento editorial versionado");
assert.match(route,/PortuguesePassageMiniExam/u,"a rota deve renderizar o componente dedicado");

assert.match(css,/\.ptx-passage\{[^}]*position:sticky/u,"no desktop o texto-base deve permanecer visível durante a resposta");
assert.match(css,/@media\(max-width:820px\)/u,"deve existir comportamento responsivo dedicado");
assert.match(css,/\.ptx-mobile-text-toggle\{display:block;position:sticky/u,"no mobile o acesso ao texto-base deve permanecer visível");
assert.match(css,/\.ptx-workspace\{display:grid;grid-template-columns/u,"desktop deve separar texto e questão em duas colunas");
assert.match(css,/\.ptx-self-assessment\{/u,"a autoavaliação guiada deve ter uma área visual própria");
assert.match(css,/\.ptx-revision-loop\{/u,"o ciclo de melhoria deve ter uma área visual própria");
assert.match(css,/\.ptx-quality-levels\{/u,"as âncoras forte/parcial/insuficiente devem ter estrutura visual própria");
assert.match(css,/\.ptx-criterion-observations/u,"as observações atómicas devem ter estilo dedicado e legível");

console.log("✓ UI Português: texto sticky · autoavaliação guiada · observações atómicas · âncoras forte/parcial/insuficiente · revisão antes/depois");
