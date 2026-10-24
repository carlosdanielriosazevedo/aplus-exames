import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const source=readFileSync(new URL("../../app/clientApp.js",import.meta.url),"utf8");
test("Aprender does not inject an additional Apronso in the mobile heading",()=>{
 const start=source.indexOf('<div className="learnIntro">');
 assert.ok(start>=0);
 const end=source.indexOf('</span></div>',start);
 assert.ok(end>start);
 const intro=source.slice(start,end);
 assert.doesNotMatch(intro,/mobileHeadingApronso/);
 assert.match(intro,/O teu próximo passo\./);
});
