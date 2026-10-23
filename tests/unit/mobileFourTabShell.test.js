import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const css=readFileSync(new URL("../../app/globals.css",import.meta.url),"utf8");
test("mobile main tabs use the white surface and identical gutters",()=>{
 assert.match(css,/Mobile: Treinar\/Progresso are the reference/);
 assert.match(css,/\.learnHome>\.studentSurface\{background:#fff!important\}/);
 for(const selector of [".learnHome>.studentSurface",".wideStudentShell>.panel",".rankingDesktopShell>.panel",".progressPage>.panel"]){
   assert.ok(css.includes(selector),"Missing "+selector);
 }
 assert.match(css,/padding-left:max\(16px,env\(safe-area-inset-left\)\)/);
 assert.match(css,/padding-right:max\(16px,env\(safe-area-inset-right\)\)/);
});
