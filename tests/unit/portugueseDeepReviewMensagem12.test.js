import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";
import {PORTUGUESE_MENSAGEM_12_DEEP_REVIEW} from "../../app/data/portugueseDeepReviewMensagem12";

const study=PORTUGUESE_MENSAGEM_12_DEEP_REVIEW;

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

describe("Rever Matéria · Português · Mensagem · 12.º ano",()=>{
  it("está ligada à unidade correta da taxonomia e ao registry profundo",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º");
    const unit=taxonomy12?.units.find(item=>item.id==="pt12-mensagem");
    expect(unit?.domain).toBe("educacao-literaria");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-mensagem");
    expect(portugueseDeepReviewContentFor("pt12-mensagem")).toBe(study);
  });

  it("mantém o contrato editorial profundo",()=>{
    expect(study.id).toBe("pt12-mensagem");
    expect(study.title).toMatch(/Mensagem/iu);
    expect(study.goals.length).toBeGreaterThanOrEqual(7);
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

  it("protege o referencial curricular de março de 2026: nove poemas, três de cada parte",()=>{
    const text=corpus();
    expect(text).toMatch(/nove poemas/iu);
    expect(text).toMatch(/três de cada parte/iu);
    expect(text).toMatch(/março de 2026/iu);
  });

  it("mantém a arquitetura Brasão → Mar Português → O Encoberto como percurso funcional",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-arquitetura");
    const text=JSON.stringify(section);
    expect(text).toMatch(/Brasão/iu);
    expect(text).toMatch(/Mar Português/iu);
    expect(text).toMatch(/O Encoberto/iu);
    expect(text).toMatch(/fundação|fundadora/iu);
    expect(text).toMatch(/realização/iu);
    expect(text).toMatch(/crise|espera/iu);
  });

  it("distingue história de transfiguração mítica e impede resumo biográfico",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-historia-mito");
    const text=JSON.stringify(section);
    expect(text).toMatch(/transfiguração mítica/iu);
    expect(text).toMatch(/função simbólica/iu);
    expect(text).toMatch(/manual de história|aula de história/iu);
  });

  it("protege Mar Português contra uma leitura triunfalista sem custo humano",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-mar-portugues");
    const text=JSON.stringify(section);
    expect(text).toMatch(/sacrifício/iu);
    expect(text).toMatch(/sofrimento|dor|perda/iu);
    expect(text).toMatch(/preço|custo/iu);
    expect(text).toMatch(/não simplista|não é apresentada como triunfo limpo|triunfalista/iu);
  });

  it("trata sebastianismo e messianismo de forma simbólica, não como previsão literal",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-encoberto");
    const text=JSON.stringify(section);
    expect(text).toMatch(/sebastianismo/iu);
    expect(text).toMatch(/messianismo/iu);
    expect(text).toMatch(/simbólic/iu);
    expect(text).toMatch(/não literal|não.*previsão|previsão.*não/iu);
  });

  it("impede reduzir o Quinto Império a nova expansão territorial",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-quinto-imperio");
    const text=JSON.stringify(section);
    expect(text).toMatch(/Quinto Império/iu);
    expect(text).toMatch(/espiritual/iu);
    expect(text).toMatch(/cultural/iu);
    expect(text).toMatch(/não.*territorial|≠ expansão territorial/iu);
  });

  it("obriga símbolo e recurso expressivo a terem contexto, mecanismo e efeito",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-simbolos-forma");
    const text=JSON.stringify(section);
    expect(text).toMatch(/context/iu);
    expect(text).toMatch(/mecanismo/iu);
    expect(text).toMatch(/efeito/iu);
    expect(text).toMatch(/não significado fixo|significado fixo/iu);
  });

  it("protege a comparação de poemas contra duas listas independentes",()=>{
    const section=study.sections.find(item=>item.id==="pt12-mensagem-exame");
    const text=JSON.stringify(section);
    expect(text).toMatch(/eixo comum/iu);
    expect(text).toMatch(/evidência/iu);
    expect(text).toMatch(/duas listas independentes/iu);
    expect(text).toMatch(/função/iu);
  });
});
