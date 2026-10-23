import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../../"+p,import.meta.url),"utf8");
test("mobile four-tab layout prevents cropped content and keeps consistent margins",()=>{
 const css=read("app/globals.css");
 assert.match(css,/Mobile parity for the four main areas/);
 assert.match(css,/\.learnHome>\.studentSurface \.learnIntro,/);
 assert.match(css,/\.rankingDesktopShell \.rankingHero/);
 assert.match(css,/\.trainHub \.apronsoNudge/);
 assert.match(css,/\.studentMenu>summary/);
});
test("mobile deep review maintains five readable blocks in a single column",()=>{
 const css=read("app/components/MathReviewMatter.module.css");
 assert.match(css,/On phones, the five pedagogical blocks/);
 assert.match(css,/\.lessonSummaryGrid\{grid-template-columns:minmax\(0,1fr\)\}/);
 assert.match(css,/\.blockHeading>div\{min-width:0;overflow-wrap:anywhere\}/);
});
