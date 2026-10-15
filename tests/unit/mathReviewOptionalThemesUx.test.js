import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {TAXONOMY} from "../../app/data/content";

const component=readFileSync(new URL("../../app/components/MathReviewMatter.js",import.meta.url),"utf8");

describe("Rever Matéria · identificação dos temas opcionais",()=>{
  it("reconhece exatamente os três opcionais do 12.º ano",()=>{
    const optionalIds=TAXONOMY
      .filter(theme=>theme.year==="12.º"&&theme.optionalTrack)
      .map(theme=>theme.id)
      .sort();
    expect(optionalIds).toEqual(["12-ie","12-int","12-mat"]);
  });

  it("mantém os opcionais acessíveis no grid e identifica-os como opcionais",()=>{
    expect(component).toContain("const themes=TAXONOMY.filter(row=>row.year===year)");
    expect(component).toContain('row.optionalTrack?"TEMA OPCIONAL · ":""');
  });

  it("repete o contexto opcional dentro do capítulo selecionado",()=>{
    expect(component).toContain('selected.optionalTrack?" · TEMA OPCIONAL":""');
    expect(component).toContain("{selectedEyebrow}");
  });
});
