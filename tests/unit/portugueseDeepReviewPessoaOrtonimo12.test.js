import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";
import {PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW} from "../../app/data/portugueseDeepReviewPessoaOrtonimo12";

const study=PORTUGUESE_PESSOA_ORTONIMO_12_DEEP_REVIEW;

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

describe("Rever Matéria · Português · Fernando Pessoa ortónimo · 12.º ano",()=>{
  it("está ligado à unidade correta da taxonomia e ao registry profundo",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º");
    const unit=taxonomy12?.units.find(item=>item.id==="pt12-pessoa-ortonimo");
    expect(unit?.domain).toBe("educacao-literaria");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-pessoa-ortonimo");
    expect(portugueseDeepReviewContentFor("pt12-pessoa-ortonimo")).toBe(study);
  });

  it("mantém o contrato editorial profundo",()=>{
    expect(study.id).toBe("pt12-pessoa-ortonimo");
    expect(study.title).toMatch(/Pessoa.+ortónimo/iu);
    expect(study.goals.length).toBeGreaterThanOrEqual(6);
    expect(study.sourceBasis.length).toBeGreaterThanOrEqual(3);
    expect(study.sourceBasis.join(" ")).toMatch(/DGE/iu);
    expect(study.sourceBasis.join(" ")).toMatch(/2026/iu);
    expect(study.sections.length).toBeGreaterThanOrEqual(7);
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

  it("protege o referencial curricular de março de 2026: oito poemas do ortónimo",()=>{
    const text=corpus();
    expect(text).toMatch(/oito poemas/iu);
    expect(text).toMatch(/março de 2026/iu);
  });

  it("distingue fingimento artístico de mentira e de ausência de emoção",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-fingimento");
    const text=JSON.stringify(section);
    expect(text).toMatch(/transforma/iu);
    expect(text).toMatch(/não mentira|não significa.*falsa|falsidade/iu);
    expect(text).toMatch(/consciência/iu);
  });

  it("protege a dor de pensar como conflito de consciência, não tristeza genérica",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-pensar");
    const text=JSON.stringify(section);
    expect(text).toMatch(/auto-observação|consciência reflexiva/iu);
    expect(text).toMatch(/espontaneidade/iu);
    expect(text).toMatch(/tristeza genérica/iu);
  });

  it("não confunde fragmentação do eu com heteronímia",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-fragmentacao");
    const text=JSON.stringify(section);
    expect(text).toMatch(/fragmentação/iu);
    expect(text).toMatch(/heteronímia/iu);
    expect(text).toMatch(/não confundas|≠/iu);
  });

  it("trata infância como construção de memória e não como facto biográfico automático",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-infancia");
    const text=JSON.stringify(section);
    expect(text).toMatch(/memória/iu);
    expect(text).toMatch(/reconstr/iu);
    expect(text).toMatch(/biográfic/iu);
  });

  it("mantém sonho e realidade como relação interpretável, sem classificar sonho como escapismo por defeito",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-sonho-realidade");
    const text=JSON.stringify(section);
    expect(text).toMatch(/sonho/iu);
    expect(text).toMatch(/realidade|presente/iu);
    expect(text).toMatch(/não concluas automaticamente|evita interpretar qualquer imagem irreal como escapismo/iu);
  });

  it("obriga a ligar forma e efeito na estratégia de exame",()=>{
    const section=study.sections.find(item=>item.id==="pt12-ortonimo-forma-exame");
    const text=JSON.stringify(section);
    expect(text).toMatch(/antítese/iu);
    expect(text).toMatch(/paradoxo/iu);
    expect(text).toMatch(/efeito/iu);
    expect(text).toMatch(/evidência/iu);
  });
});
