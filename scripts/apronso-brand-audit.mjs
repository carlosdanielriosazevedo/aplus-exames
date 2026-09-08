import assert from "node:assert/strict";
import {readFileSync,statSync} from "node:fs";

const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const layout=readFileSync(new URL("../app/layout.js",import.meta.url),"utf8");
const poses=["welcome","thinking","celebrate","progress"];

assert.match(layout,/APPprova\+/);
assert.match(page,/aria-label="APPprova\+"/);
assert.match(page,/Conhece o Apronso/);
assert.match(page,/Onde encontras o Apronso/);
assert.match(page,/PASSO 4 DE 4/);
assert.match(page,/dailyMissionApronso/);
assert.match(page,/className="dailyMissionHero"/);
assert.match(page,/resultApronso/);
assert.match(page,/Apronso acompanha o teu progresso/);
assert.match(css,/--app-orange:#f59e0b/);
assert.match(css,/--app-navy:#081a2a/);
assert.match(css,/\.logo \.logoApp,\.logo \.logoPlus\{color:var\(--app-orange\)\}/);
assert.match(css,/\.dailyMissionHero\{display:grid/);
assert.match(css,/\.dailyMissionApronso\{position:relative/);
assert.doesNotMatch(css,/\.dailyMissionApronso\{position:absolute/);
assert.doesNotMatch(css,/\.diagApronsoHero>\.apronso\{[^}]*margin:-/);

for(const pose of poses){
  const asset=new URL(`../public/mascot/apronso-${pose}.webp`,import.meta.url);
  const size=statSync(asset).size;
  assert.ok(size>10_000,`${pose}: asset appears incomplete`);
  assert.ok(size<100_000,`${pose}: asset must remain lightweight for mobile`);
  assert.match(page,new RegExp(`(?:pose=|mascot:)['\"]${pose}['\"]`),`${pose}: pose must be used in the experience`);
}

console.log("✓ APPprova+ identity: palette, onboarding and four Apronso poses guarded");
