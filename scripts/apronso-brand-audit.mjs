import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";

const mainPage=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const welcome=readFileSync(new URL("../app/components/Welcome.js",import.meta.url),"utf8");
const chrome=readFileSync(new URL("../app/components/chrome.js",import.meta.url),"utf8");
const page=[welcome,mainPage,chrome].join("\n");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const layout=readFileSync(new URL("../app/layout.js",import.meta.url),"utf8");
const poses=["welcome","thinking","celebrate","progress"];

assert.match(layout,/APProva\+/);
assert.match(chrome,/aria-label="APProva\+"/);
assert.doesNotMatch(page,/APPp/);
assert.doesNotMatch(layout,/APPp/);
assert.match(chrome,/className="brandAP">AP<\/span><span className="brandProva">Prova<\/span><span className="brandPlus">\+<\/span>/);
assert.match(page,/Não te vou avaliar\. Só te quero conhecer um pouco melhor para saber por onde começarmos\./);
assert.match(page,/Conhece o Apronso/);
assert.match(page,/Onde encontras o Apronso/);
assert.match(page,/const PRE_DIAGNOSTIC_TOUR_STEPS=/);
assert.match(page,/PASSO 2 DE 2/);
assert.match(page,/dailyMissionApronso/);
assert.match(page,/className="dailyMissionHero"/);
assert.match(page,/resultApronso/);
assert.match(page,/Apronso acompanha o teu progresso/);
assert.match(css,/--app-orange:#f59e0b/);
assert.match(css,/--app-navy:#081a2a/);
assert.match(css,/--app-card-dark:#0f3047/);
assert.match(css,/--app-card-light:#fff4df/);
assert.match(css,/\.brandAP,\.brandPlus,\.logo \.brandAP,\.logo \.brandPlus\{color:var\(--app-orange\)\}/);
assert.match(css,/\.brandProva,\.logo \.brandProva\{color:var\(--app-card-dark\)\}/);
assert.match(css,/\.dailyMissionHero\{display:grid/);
assert.match(css,/\.dailyMissionApronso\{position:relative/);
assert.match(css,/\.dark,\.light,\.learnHome\{background:#fff/);
assert.match(css,/\.testerSegmentPicker button\{background:var\(--app-card-light\);[^}]*color:var\(--app-navy\)/);
assert.match(css,/\.testerSegmentPicker button\.selected\{background:var\(--app-card-dark\);[^}]*color:#fff/);
assert.match(css,/\.testerSegmentPicker button\.selected small\{color:#dce7ef\}/);
assert.ok(
  css.lastIndexOf(".dark,.light,.learnHome{background:#fff")>css.lastIndexOf(".learnHome{background:radial-gradient"),
  "O fundo branco global tem de prevalecer sobre os temas antigos."
);
assert.doesNotMatch(css,/\.dailyMissionApronso\{position:absolute/);
assert.doesNotMatch(css,/\.diagApronsoHero>\.apronso\{[^}]*margin:-/);
assert.ok((page.match(/<ApronsoNudge/g)||[]).length>=4,"Apronso must be present in the main navigation surfaces");

for(const pose of poses){
  const asset=new URL(`../public/mascot/apronso-${pose}.webp`,import.meta.url);
  const size=statSync(asset).size;
  assert.ok(size>10_000,`${pose}: asset appears incomplete`);
  assert.ok(size<100_000,`${pose}: asset must remain lightweight for mobile`);
  assert.match(page,new RegExp(`(?:pose=|mascot:)['\"]${pose}['\"]`),`${pose}: pose must be used in the experience`);
}

console.log("✓ APProva+ identity: white surfaces, action-card palette, onboarding and four Apronso poses guarded");
