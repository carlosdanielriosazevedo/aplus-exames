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

test("summary block headings use neutral labels and orange titles",()=>{
 const css=read("app/components/MathReviewMatter.module.css");
 assert.match(css,/\.reviewRemember \.blockHeading small,[\s\S]*?\.reviewPitfalls \.blockHeading small\{color:var\(--app-muted\)\}/);
 assert.match(css,/\.reviewRemember \.blockHeading b,[\s\S]*?\.reviewPitfalls \.blockHeading b\{color:var\(--app-orange-dark\)\}/);
});
test("Portuguese legacy content renders all five review blocks",()=>{
 const source=read("app/components/PortugueseLearnPanel.js");
 for(const n of ["01","02","03","04","05"])assert.ok(source.includes('<span>'+n+'</span>'));
 assert.match(source,/PARA ORIENTAR A LEITURA/);
 assert.match(source,/EXEMPLO ORIENTADO/);
 assert.match(source,/IDEIA-CHAVE/);
 assert.match(source,/ATENÇÃO/);
});
