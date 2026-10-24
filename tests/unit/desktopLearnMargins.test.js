import {test} from "vitest";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const css=readFileSync(new URL("../../app/globals.css",import.meta.url),"utf8");
test("desktop Aprender intro and learning path share the main panel inner margins",()=>{
  assert.match(css,/@media \(min-width:761px\)\{\s*\.learnHome>\.studentSurface \.learnIntro,\s*\.learnHome>\.studentSurface \.adaptivePath/);
  assert.match(css,/\.learnHome>\.studentSurface \.adaptivePath\{[\s\S]*?width:100%;[\s\S]*?max-width:none;[\s\S]*?margin-left:0;[\s\S]*?margin-right:0;/);
});
