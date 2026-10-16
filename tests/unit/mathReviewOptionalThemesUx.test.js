import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {TAXONOMY} from "../../app/data/content";
import {mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const component=readFileSync(new URL("../../app/components/MathReviewMatter.js",import.meta.url),"utf8");

describe("Rever Matéria · identificação dos temas opcionais",()=>{
  it("reconhece exatamente os três opcionais do 12.º ano",()=>{
    const optionalIds=TAXONOMY
      .filter(theme=>theme.year==="12.º"&&theme.optionalTrack)
      .map(theme=>theme.id)
      .sort();
    expect(optionalIds).toEqual(["12-ie","12-int","12-mat"]);
  });

  it("todos os temas atuais resolvem para a experiência profunda",()=>{
    for(const theme of TAXONOMY){
      expect(mathDeepReviewContentFor(theme.id),theme.id).not.toBeNull();
    }
  });

  it("mantém os opcionais acessíveis na navegação e identifica-os como opcionais",()=>{
    expect(component).toContain("const themes=TAXONOMY.filter(row=>row.year===year)");
    expect(component).toContain('badge:row.optionalTrack?"TEMA OPCIONAL":null');
    expect(component).toContain("items={navigationItems}");
  });

  it("repete o contexto opcional dentro do capítulo selecionado",()=>{
    expect(component).toContain('selected.optionalTrack?" · TEMA OPCIONAL":""');
    expect(component).toContain("{selectedEyebrow}");
  });
});
