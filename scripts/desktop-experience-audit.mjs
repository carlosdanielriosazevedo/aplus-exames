import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(css,/\/\* Desktop pass — APProva\+ \*\/[\s\S]*@media\(min-width:1100px\)/u,"deve existir uma camada desktop explícita.");
assert.match(css,/width:min\(1180px,calc\(100vw - 64px\)\)/u,"as superfícies largas devem aproveitar melhor monitores de secretária.");
assert.match(css,/\.learnHome \.wrap\{max-width:1040px/u,"a Home desktop não deve ficar limitada à largura mobile/tablet.");
assert.match(css,/\.learnHome \.adaptivePath\{max-width:820px/u,"o caminho adaptativo deve ganhar largura útil em desktop.");
assert.match(css,/\.studentNav\{[\s\S]*bottom:18px;[\s\S]*border-radius:22px/u,"a navegação desktop deve aparecer como dock flutuante e não como barra colada ao ecrã.");
assert.match(css,/\.trainChoices\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)\}/u,"Treinar deve usar três colunas em desktop.");
assert.match(css,/\.progressHero\{grid-template-columns:minmax\(0,1\.45fr\) minmax\(0,\.9fr\) 138px\}/u,"Progresso deve aproveitar o espaço horizontal do desktop.");
assert.match(css,/\.reviewStudyPage \.portugueseProgressCard\{max-width:1020px\}/u,"Rever matéria deve poder usar duas colunas com largura confortável.");
assert.match(css,/\.trainingSetupPage \.themeGrid\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)\}/u,"a seleção de matéria deve aproveitar três colunas em desktop.");
assert.match(css,/\.questionCard\{max-width:920px;margin-left:auto;margin-right:auto\}/u,"as perguntas devem manter uma largura de leitura controlada em monitores largos.");

for(const [label,source] of [["Matemática A",page],["Português",portuguese],["FQ A",fqa]]){
  assert.match(source,/wideStudentShell/u,label+": deve continuar a usar a superfície larga partilhada.");
}

console.log("✓ desktop: largura 1180 · Home 1040 · dock flutuante · 3 colunas · leitura controlada · três disciplinas na mesma superfície");
