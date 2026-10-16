import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";
import {PORTUGUESE_PESSOA_HETERONIMOS_12_DEEP_REVIEW} from "../../app/data/portugueseDeepReviewPessoaHeteronimos12";

const study=PORTUGUESE_PESSOA_HETERONIMOS_12_DEEP_REVIEW;

function corpus(){
  return [
    study.lead,
    ...study.goals,
    ...study.sourceBasis,
    ...study.sections.flatMap(section=>[
      section.kicker,
      section.title,
      ...section.paragraphs,
      ...section.signals,
      section.example?.title,
      section.example?.prompt,
      ...(section.example?.steps||[]),
      section.example?.modelAnswer,
      section.example?.note,
      section.remember,
      ...section.pitfalls
    ])
  ].filter(Boolean).join(" ");
}

describe("Rever Matéria · Português · Pessoa heterónimos · 12.º ano",()=>{
  it("está ligado à unidade correta da taxonomia e ao registry profundo",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º");
    const unit=taxonomy12?.units.find(item=>item.id==="pt12-pessoa-heteronimos");
    expect(unit?.domain).toBe("educacao-literaria");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-pessoa-heteronimos");
    expect(portugueseDeepReviewContentFor("pt12-pessoa-heteronimos")).toBe(study);
  });

  it("mantém o contrato editorial profundo",()=>{
    expect(study.id).toBe("pt12-pessoa-heteronimos");
    expect(study.title).toMatch(/Pessoa.+heterónimos/iu);
    expect(study.goals.length).toBeGreaterThanOrEqual(6);
    expect(study.sourceBasis.length).toBeGreaterThanOrEqual(3);
    expect(study.sourceBasis.join(" ")).toMatch(/DGE/iu);
    expect(study.sourceBasis.join(" ")).toMatch(/2026/iu);
    expect(study.sections.length).toBeGreaterThanOrEqual(8);
    for(const section of study.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(4);
      expect(section.example?.modelAnswer,section.id).toBeTruthy();
      expect(section.example?.note,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(3);
    }
  });

  it("protege o referencial curricular de março de 2026: três poemas de cada heterónimo",()=>{
    const text=corpus();
    expect(text).toMatch(/três poemas de Alberto Caeiro/iu);
    expect(text).toMatch(/três de Ricardo Reis/iu);
    expect(text).toMatch(/três de Álvaro de Campos/iu);
    expect(text).toMatch(/março de 2026/iu);
  });

  it("não reduz heteronímia a pseudonímia nem a reconhecimento por palavra-chave",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-sistema");
    const text=JSON.stringify(section);
    expect(text).toMatch(/pseudónimo/iu);
    expect(text).toMatch(/não basta|não permite|não mero/iu);
    expect(text).toMatch(/indícios convergentes/iu);
  });

  it("protege Caeiro como primazia da sensação sem o transformar em alguém que simplesmente não pensa",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-caeiro");
    const text=JSON.stringify(section);
    expect(text).toMatch(/sensação|sensível/iu);
    expect(text).toMatch(/metafísic/iu);
    expect(text).toMatch(/não é 'quem não pensa'|não significa ausência de pensamento/iu);
  });

  it("impede simbolização automática da natureza em Caeiro",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-caeiro");
    const text=JSON.stringify(section);
    expect(text).toMatch(/não deve ser tratada automaticamente como símbolo|não atribui valor simbólico|simbolizar automaticamente/iu);
  });

  it("protege o carpe diem de Reis contra a leitura de hedonismo sem limites",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-reis");
    const text=JSON.stringify(section);
    expect(text).toMatch(/carpe diem/iu);
    expect(text).toMatch(/moderação|medida/iu);
    expect(text).toMatch(/não significa.*máximo|não equivale a viver sem limites|hedonismo sem limites/iu);
  });

  it("não confunde o ideal de serenidade de Reis com serenidade psicológica garantida",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-reis-forma");
    const text=JSON.stringify(section);
    expect(text).toMatch(/serenidade/iu);
    expect(text).toMatch(/não assumas automaticamente|não prova|ideal ético/iu);
    expect(text).toMatch(/autodisciplina|domínio|control/iu);
  });

  it("protege Campos contra a redução a máquinas, futurismo ou euforia",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-campos");
    const text=JSON.stringify(section);
    expect(text).toMatch(/sensacionismo/iu);
    expect(text).toMatch(/não se reduz à euforia/iu);
    expect(text).toMatch(/tédio|fracasso|vazio/iu);
    expect(text).toMatch(/máquinas/iu);
  });

  it("mantém a crise do eu de Campos distinta da nostalgia do ortónimo",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-campos-eu");
    const text=JSON.stringify(section);
    expect(text).toMatch(/possibilidade|poderia ter sido/iu);
    expect(text).toMatch(/fracasso/iu);
    expect(text).toMatch(/não devem ser automaticamente confundidas com a nostalgia da infância do ortónimo/iu);
  });

  it("obriga a comparação a usar um eixo comum e mecanismos textuais",()=>{
    const section=study.sections.find(item=>item.id==="pt12-heteronimos-comparar");
    const text=JSON.stringify(section);
    expect(text).toMatch(/eixo comum/iu);
    expect(text).toMatch(/indício/iu);
    expect(text).toMatch(/mecanismo/iu);
    expect(text).toMatch(/Caeiro/iu);
    expect(text).toMatch(/Reis/iu);
    expect(text).toMatch(/Campos/iu);
  });
});
