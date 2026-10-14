import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";

const mainPage=readFileSync(new URL("../app/clientApp.js",import.meta.url),"utf8");
const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const studyModeHub=readFileSync(new URL("../app/components/StudyModeHub.js",import.meta.url),"utf8");
const secondaryScreens=readFileSync(new URL("../app/components/SecondaryScreens.js",import.meta.url),"utf8");
const portuguese=readFileSync(new URL("../app/components/PortugueseSubject.js",import.meta.url),"utf8");
const fqa=readFileSync(new URL("../app/components/PhysicsChemistrySubject.js",import.meta.url),"utf8");
const page=[welcome,mainPage,chrome,studyModeHub,portuguese,fqa].join("\n");
const studentSurfaces=[mainPage,secondaryScreens,portuguese,fqa].join("\n");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const parityCss=readFileSync(new URL("../app/apronso-parity.css",import.meta.url),"utf8");
const layout=readFileSync(new URL("../app/layout.js",import.meta.url),"utf8");
const poses=["welcome","thinking","celebrate","progress"];
assert.match(layout,/APProva\+/);assert.match(chrome,/aria-label="APProva\+"/);assert.doesNotMatch(page,/APPp/);assert.doesNotMatch(layout,/APPp/);
assert.match(chrome,/className="brandAP">AP<\/span><span className="brandProva">Prova<\/span><span className="brandPlus">\+<\/span>/);
assert.match(page,/Não é uma avaliação\. A app usa apenas matéria do teu percurso e aprofunda só quando precisa de perceber melhor uma dificuldade\./);
assert.match(page,/Conhece o Apronso/);assert.match(page,/Onde encontras o Apronso/);assert.match(page,/const PRE_DIAGNOSTIC_TOUR_STEPS=/);assert.match(page,/PASSO 2 DE 2/);assert.match(page,/dailyMissionApronso/);assert.match(page,/className="dailyMissionHero"/);assert.match(page,/resultApronso/);assert.match(page,/Apronso acompanha o teu progresso/);
assert.match(css,/--app-orange:#f59e0b/);assert.match(css,/--app-navy:#081a2a/);assert.match(css,/--app-card-dark:#0f3047/);assert.match(css,/--app-card-light:#fff4df/);
assert.match(css,/\.brandAP,\.brandPlus,\.logo \.brandAP,\.logo \.brandPlus\{color:var\(--app-orange\)\}/);assert.match(css,/\.brandProva,\.logo \.brandProva\{color:var\(--app-card-dark\)\}/);assert.match(css,/\.dailyMissionHero\{display:grid/);assert.match(css,/\.dailyMissionApronso\{position:relative/);assert.match(css,/\.dark,\.light,\.learnHome\{background:#fff/);
assert.match(css,/\.testerSegmentPicker button\{background:var\(--app-card-light\);[^}]*color:var\(--app-navy\)/);assert.match(css,/\.testerSegmentPicker button\.selected\{background:var\(--app-card-dark\);[^}]*color:#fff/);assert.match(css,/\.testerSegmentPicker button\.selected small\{color:#dce7ef\}/);
assert.ok(css.lastIndexOf(".dark,.light,.learnHome{background:#fff")>css.lastIndexOf(".learnHome{background:radial-gradient"),"O fundo branco global tem de prevalecer sobre os temas antigos.");
assert.doesNotMatch(css,/\.dailyMissionApronso\{position:absolute/);assert.doesNotMatch(css,/\.diagApronsoHero>\.apronso\{[^}]*margin:-/);

// Apronso must remain part of the layout, not a detached decoration.
assert.match(parityCss,/\.apronso\{[\s\S]*?object-fit:contain;[\s\S]*?object-position:center bottom;/u);
assert.match(parityCss,/@keyframes apronsoIdle/u,"A animação idle do Apronso deve viver no CSS global, fora do bundle JS.");
assert.match(parityCss,/@keyframes apronsoThink/u,"A animação thinking do Apronso deve viver no CSS global.");
assert.match(parityCss,/@keyframes apronsoCelebrate/u,"A animação celebrate do Apronso deve viver no CSS global.");
assert.match(parityCss,/@media\(prefers-reduced-motion:reduce\)/u,"As animações do Apronso devem respeitar reduced motion.");
assert.match(chrome,/apronso-motion-celebrate/u,"O componente Apronso deve continuar a selecionar a animação pela pose.");
assert.doesNotMatch(chrome,/<style>/u,"O componente Apronso não deve injetar CSS repetido no runtime.");
assert.match(parityCss,/\.diagApronsoHero\{[\s\S]*?display:grid;[\s\S]*?align-items:end;/u,"Nos diagnósticos desktop o Apronso deve partilhar a linha de base do bloco explicativo.");
assert.match(parityCss,/\.diagApronsoHero>\.apronso\{[\s\S]*?align-self:end;[\s\S]*?object-position:center bottom;/u,"O Apronso deve usar uma base visual consistente em todos os diagnósticos.");
assert.match(parityCss,/\.diagApronsoHero \.diagPurposeHero\{[\s\S]*?padding-right:116px;/u,"No diagnóstico mobile o texto deve reservar espaço para o Apronso dentro do cartão.");
assert.match(parityCss,/\.diagApronsoHero>\.apronso\{[\s\S]*?position:absolute;[\s\S]*?bottom:40px;/u,"No diagnóstico mobile os pés do Apronso devem alinhar com a base do texto dentro do cartão, não com a borda do cartão.");
assert.match(parityCss,/\.learnIntro::after\{[\s\S]*?background:url\('\/mascot\/apronso-welcome\.webp'\)/u,"Apronso deve continuar integrado no Aprender.");
assert.match(parityCss,/\.progressPage \.progressHero>\.apronso\{[\s\S]*?position:absolute;/u,"Apronso deve continuar integrado no cartão de Progresso em mobile.");

assert.ok((studentSurfaces.match(/<ApronsoNudge/g)||[]).length>=3,"Apronso must remain on useful shared student surfaces without duplicating nearby UI copy");
assert.ok((studyModeHub.match(/<ApronsoNudge/g)||[]).length>=1,"Apronso must remain on the shared study hub");
assert.match(portuguese,/Apronso acompanha o teu progresso/u,"Português deve manter Apronso no Progresso.");
assert.match(fqa,/Apronso acompanha o teu progresso/u,"FQ A deve manter Apronso no Progresso.");
assert.match(fqa,/diagApronsoHero/u,"FQ A deve reutilizar o mesmo padrão visual do diagnóstico.");

for(const pose of poses){const asset=new URL(`../public/mascot/apronso-${pose}.webp`,import.meta.url);const size=statSync(asset).size;assert.ok(size>10_000,`${pose}: asset appears incomplete`);assert.ok(size<100_000,`${pose}: asset must remain lightweight for mobile`);assert.match(page,new RegExp(`(?:pose=|mascot:)['\"]${pose}['\"]`),`${pose}: pose must be used in the experience`);}
console.log("✓ APProva+ identity: Apronso is present and visually integrated across Matemática A, Português and FQ A");
