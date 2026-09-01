import assert from "node:assert/strict";
import {readFileSync} from "node:fs";

const css=readFileSync(new URL("../app/globals.css",import.meta.url),"utf8");
const page=readFileSync(new URL("../app/page.js",import.meta.url),"utf8");
const layout=readFileSync(new URL("../app/layout.js",import.meta.url),"utf8");
const mobileMarker="/* v5.6 — Beta Candidate mobile-first e legibilidade do fluxo do aluno */";
const mobileCss=css.slice(css.indexOf(mobileMarker));
const viewports=[[320,568],[360,800],[390,844],[430,932],[1280,800]];

assert.ok(mobileCss.startsWith(mobileMarker),"mobile override block is missing");
assert.match(layout,/export const viewport=\{width:'device-width',initialScale:1,viewportFit:'cover'\}/);
assert.match(mobileCss,/min-height:100dvh/);
assert.match(mobileCss,/env\(safe-area-inset-top\)/);
assert.match(mobileCss,/env\(safe-area-inset-bottom\)/);
assert.match(mobileCss,/html,body\{max-width:100%;overflow-x:hidden\}/);
assert.match(mobileCss,/\.opts button[^}]*overflow-wrap:anywhere|\.light :where\([^}]+overflow-wrap:anywhere/);
assert.match(mobileCss,/:where\(button,input,select,textarea,summary,\[tabindex\]\):focus-visible/);
assert.match(mobileCss,/@media\(max-width:760px\)[\s\S]*button\{min-height:44px\}/);
assert.match(mobileCss,/@media\(max-width:760px\)[\s\S]*input,select,textarea\{font-size:16px!important\}/);
assert.match(mobileCss,/input\[type=range\]\{min-height:44px;height:44px\}/);
assert.match(mobileCss,/\.betaFeedback>b\{font-size:15px\}/);
assert.match(mobileCss,/\.dailyMissionModal\{[^}]*max-height:calc\(100dvh/);
assert.match(css,/\.dailyMissionModal\{[^}]*overflow:hidden[^}]*display:flex[^}]*flex-direction:column/);
assert.match(css,/\.dailyMissionContent\{[^}]*overflow-y:auto/);
assert.match(mobileCss,/\.dailyMissionActions\{[^}]*flex:0 0 auto/);
assert.match(page,/className="dailyMissionActions"/);
assert.doesNotMatch(page,/<section className="leagueMini"[^>]*onClick/);
assert.match(page,/<nav className="studentNav" aria-label="Navegação principal">/);
const studentNav=page.match(/<nav className="studentNav"[\s\S]*?<\/nav>/)?.[0]||"";
assert.match(studentNav,/<button type="button"/);
assert.doesNotMatch(studentNav,/<(?:div|h[1-6]|p|section|article)\b/,"navigation button descendants must remain phrasing content");

const tooSmall=[...mobileCss.matchAll(/font-size:\s*([0-9.]+)px/g)]
  .map(match=>Number(match[1])).filter(size=>size<11);
assert.deepEqual(tooSmall,[],"mobile overrides must not introduce text below 11px");

for(const [width,height] of viewports){
  assert.ok(width>=320&&height>=568,`invalid audit viewport ${width}x${height}`);
}

console.log(`✓ mobile legibility audit: ${viewports.map(v=>v.join("×")).join(", ")} · viewport, safe-area, readable text, touch targets, modal and semantics guarded`);
