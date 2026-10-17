import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";

const source=readFileSync(new URL("../../app/components/DeepReviewStudy.js",import.meta.url),"utf8");
const css=readFileSync(new URL("../../app/components/MathReviewMatter.module.css",import.meta.url),"utf8");

describe("Rever Matéria no telemóvel",()=>{
  it("força o percurso profundo a permanecer vertical e a ocupar a largura disponível",()=>{
    expect(source).toMatch(/const verticalFlow=\{display:"flex",flexDirection:"column",alignItems:"stretch",width:"100%",maxWidth:"100%",minWidth:0\}/u);
    expect(source).toMatch(/className=\{styles\.studyFlow\} style=\{verticalFlow\}/u);
  });

  it("mantém as grelhas internas em uma coluna no breakpoint mobile",()=>{
    expect(css).toMatch(/@media\(max-width:760px\)[\s\S]*\.studyRoute\{grid-template-columns:1fr/u);
    expect(css).toMatch(/\.goalPanel ul,\.mapGrid,\.reviewToolbox ul,\.formulaStack,\.lessonSummaryGrid,\.finishChecklist\{grid-template-columns:1fr;\}/u);
  });
});
