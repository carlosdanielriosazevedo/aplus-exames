import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=path=>readFileSync(new URL("../../"+path,import.meta.url),"utf8");

test("Aprender and Treinar attach a single mobile Apronso to the heading",()=>{
  const learn=read("app/clientApp.js");
  const train=read("app/components/StudyModeHub.js");
  assert.match(learn,/className="mobileMainTitle"[^]*?O teu próximo passo\.[^]*?mobileHeadingApronso/);
  assert.match(train,/className="mobileMainTitle"[^]*?O que queres fazer\?[^]*?mobileHeadingApronso/);
  assert.match(train,/ApronsoNudge pose="thinking"/);
});

test("mobile preserves header and restores both streak and XP indicators",()=>{
  const chrome=read("app/components/chrome.js");
  const css=read("app/globals.css");
  assert.match(chrome,/aria-label=\{\x60Sequência: \$\{daily.streak\} dias\x60\}/);
  assert.match(chrome,/🔥/);
  assert.match(css,/\.studentTop \.studentTopActions>button\[aria-label\^="Sequência:"\]/);
  assert.match(css,/display:inline-flex!important/);
});

test("mobile leaves a clear full-width descriptive line and compact ranking badge",()=>{
  const css=read("app/globals.css");
  assert.match(css,/\.trainHub \.apronsoNudge>p\{/);
  assert.match(css,/\.trainHub \.apronsoNudge>\.apronso\{display:none!important\}/);
  assert.match(css,/\.rankingDesktopShell>\.panel>\.rankingHero \.sectionIntro h1\{/);
  assert.match(css,/white-space:nowrap/);
  assert.match(css,/\.rankingDesktopShell>\.panel>\.rankingHero>\.divisionBadge\{/);
  assert.match(css,/\.rankingDesktopShell>\.panel>\.rankingHero \.sectionIntro>\.muted\{/);
});
