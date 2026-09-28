import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const math=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");

assert.match(css,/\/\* Desktop pass 4 — resultados, estados vazios e consistência final \*\//u,"deve existir uma passagem desktop final.");
assert.match(css,/\.subjectStats\{display:grid;grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/u,"FQ A deve ter cartões de resultado próprios e consistentes.");
assert.match(css,/\.completionMoment h1\{font-size:38px/u,"resultados devem ganhar hierarquia em desktop.");
assert.match(css,/\.subjectStats,.portugueseSubjectStats\{max-width:860px/u,"resultados de Português e FQ A devem ter largura controlada.");
assert.match(css,/\.portugueseResultHero b\{font-size:62px/u,"o resultado principal de Português deve ser legível em desktop.");
assert.match(css,/\.noEvidence b\{font-size:13px\}\.noEvidence span\{font-size:12px/u,"estados sem evidência não devem usar microtipografia no computador.");
assert.match(css,/\.exam\.locked\{min-height:78px/u,"estados bloqueados de Exames devem parecer cartões intencionais em desktop.");
assert.match(css,/\.rankingLocked\{padding:16px 18px/u,"estados indisponíveis devem manter leitura confortável.");
assert.match(css,/\.studentMenu div button\+button\{border-top:1px solid #f0f2f4\}/u,"menu desktop deve separar visualmente as ações.");
assert.match(css,/@media\(min-width:1440px\)[\s\S]*\.completionMoment\{max-width:920px\}/u,"resultados devem escalar explicitamente em 1440p.");

assert.match(math,/completionMoment/u,"Matemática deve manter ecrãs de conclusão.");
assert.match(portuguese,/completionMoment/u,"Português deve manter ecrãs de conclusão.");
assert.match(fqa,/completionMoment/u,"FQ A deve manter ecrãs de conclusão.");
assert.match(portuguese,/portugueseSubjectStats/u,"Português deve manter estatísticas pós-sessão.");
assert.match(fqa,/subjectStats/u,"FQ A deve manter estatísticas pós-sessão.");

console.log("✓ desktop final: resultados, estados sem evidência, bloqueios e menus consistentes em 1080p/1440p");
