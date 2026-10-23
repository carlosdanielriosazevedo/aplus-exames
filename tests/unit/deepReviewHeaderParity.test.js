import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
const read=p=>readFileSync(new URL("../../"+p,import.meta.url),"utf8");
test("deep review summary and attention use shared numbered heading",()=>{
  const src=read("app/components/DeepReviewStudy.js");
  for(const label of ["IDEIA-CHAVE","ATENÇÃO"])assert.match(src,new RegExp('className=\\{styles\\.blockHeading\\}[^\\n]*'+label));
  assert.ok(!src.includes("<small>04 · IDEIA-CHAVE</small>")&&!src.includes("<small>05 · ATENÇÃO</small>"));
});
test("FQA practical review headings share the same pattern",()=>{
  const src=read("app/components/PhysicsChemistryLearnPanel.js");
  assert.match(src,/className=\{styles\.blockHeading\}[^\n]*03<\/span>/);
  assert.match(src,/className=\{styles\.blockHeading\}[^\n]*04<\/span>/);
});
test("deep review section numbers render white",()=>{
  const css=read("app/components/MathReviewMatter.module.css");
  assert.match(css,/\.lessonHeader>\.lessonNumber\{color:#fff!important\}/);
});
