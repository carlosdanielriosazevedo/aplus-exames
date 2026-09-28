import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(css,/\/\* Desktop pass 2 — cabeçalho, menus e 1440p \*\//u,"deve existir uma segunda passagem desktop focada em cabeçalho e ecrãs largos.");
assert.match(css,/@media\(min-width:1100px\)[\s\S]*\.subjectSwitcher\{max-width:340px/u,"o seletor de disciplina deve ganhar espaço em desktop.");
assert.match(css,/\.studentMenu>div\{top:58px;width:320px/u,"o menu do aluno deve ter largura confortável em desktop.");
assert.match(css,/\.studentTopActions>button:hover,[\s\S]*translateY\(-1px\)/u,"ações do cabeçalho devem ter feedback hover próprio de desktop.");
assert.match(css,/\.sectionIntro\{max-width:900px\}/u,"títulos e introduções devem manter largura de leitura controlada.");
assert.match(css,/@media\(min-width:1440px\)/u,"deve existir otimização explícita para 1440p.");
assert.match(css,/width:min\(1240px,calc\(100vw - 96px\)\)/u,"em 1440p a área útil deve aumentar sem ocupar o ecrã todo.");
assert.match(css,/\.learnHome \.wrap\{max-width:1120px\}/u,"a Home deve aproveitar melhor monitores 1440p.");
assert.match(css,/\.reviewStudyPage \.portugueseProgressCard\{max-width:1080px\}/u,"Rever matéria deve ganhar largura adicional em 1440p.");
assert.match(css,/\.examHub \.sectionIntro,.trainingSetupPage \.sectionIntro\{max-width:920px\}/u,"Exames e Treino Livre devem manter textos legíveis mesmo em ecrãs largos.");

console.log("✓ desktop 1080p/1440p: cabeçalho, menus, hover, larguras e leitura controlada");
