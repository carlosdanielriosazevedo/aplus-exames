import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const fqaEngine=readFileSync(new URL("../app/lib/physicsChemistryEngine.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");

assert.match(math,/className="curriculumPicker"/u,"Matemática A mantém o seletor matéria → submatéria.");
assert.match(fqa,/className="curriculumPicker fqaCurriculumPicker"/u,"FQ A deve usar o mesmo padrão visual de seletor curricular.");
assert.match(fqa,/physicsChemistrySubtopicsForDomain/u,"FQ A deve apresentar submatérias reais por domínio.");
assert.match(fqa,/Selecionar toda esta matéria/u,"FQ A deve permitir selecionar a matéria inteira.");
assert.match(fqa,/submatérias assinaladas/u,"FQ A deve contar submatérias, não apenas domínios.");
assert.match(fqaEngine,/selected\.has\(item\.domain\)\|\|selected\.has\(item\.subtopicId\)/u,"o motor FQ A deve respeitar seleção granular e perfis antigos.");

assert.match(portuguese,/\{id:"educacao-literaria",label:"Educação Literária",rows:literature\},\n    \.\.\.general/u,"Português deve separar Educação Literária, Leitura, Escrita e Gramática em matérias próprias.");
assert.match(portuguese,/Selecionar toda esta matéria/u,"Português deve usar a mesma linguagem de Matemática/FQ A.");
assert.match(portuguese,/matérias\/submatérias assinaladas/u,"Português deve tornar clara a granularidade da seleção.");

assert.match(css,/contraste definitivo da Home/u,"deve existir uma regra final de contraste para a Home clara.");
assert.match(css,/\.learnHome \.learnIntro h1\{color:var\(--app-navy\)!important\}/u,"o título da Home deve ter contraste forte sobre fundo claro.");
assert.match(css,/\.learnHome \.pathNode>div>b,[\s\S]*color:var\(--app-navy\)!important/u,"etapas concluídas e futuras devem ser legíveis.");
assert.match(css,/\.learnHome \.pathNode.current article h2\{color:#fff!important\}/u,"o cartão navy da Missão deve manter texto branco.");
assert.match(css,/\.curriculumPicker input\{[\s\S]*accent-color:var\(--app-orange\)/u,"checkboxes curriculares devem usar a identidade visual da app.");

console.log("✓ teste real: matéria dada alinhada nas 3 disciplinas e Home clara com contraste explícito");
