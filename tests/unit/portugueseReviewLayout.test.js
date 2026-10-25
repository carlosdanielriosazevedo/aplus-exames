import {test} from "vitest";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const source=p=>readFileSync(new URL("../../"+p,import.meta.url),"utf8");
test("Portuguese deep and legacy review cards share full width style",()=>{
 const page=source("app/components/PortugueseLearnPanel.js");
 const instances=page.match(/portugueseProgressCard \$\{styles\.deepReviewArticle\}/g)||[];
 assert.equal(instances.length,2,"Deep and legacy renderer should use same full-width article");
});
test("Desktop legacy review content is not confined to a grid column",()=>{
 const css=source("app/components/MathReviewMatter.module.css");
 assert.match(css,/\.deepReviewArticle\{display:block!important;width:100%/);
 assert.match(css,/\.deepReviewArticle>\.studyFlow\{[\s\S]*?display:grid!important/);
 assert.match(css,/grid-column:1\/-1/);
});
