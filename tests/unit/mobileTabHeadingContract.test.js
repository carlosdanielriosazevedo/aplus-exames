import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const css=readFileSync(new URL("../../app/globals.css",import.meta.url),"utf8");
test("mobile title alignment keeps StudentTop out of the override",()=>{
 const block=css.split("Mobile 4-tab heading contract.")[1];
 assert.ok(block);
 assert.match(block,/\.learnHome>\.studentSurface>\.learnIntro/);
 assert.match(block,/\.rankingDesktopShell>\.panel>\.rankingHero/);
 assert.match(block,/margin:10px 0 28px!important/);
 assert.match(block,/margin:5px 0!important/);
 assert.doesNotMatch(block,/\.studentTop[\s\{,:]/);
});
