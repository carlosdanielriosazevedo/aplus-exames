import {describe,expect,it} from "vitest";
import {PORTUGUESE_TAXONOMY} from "../../app/data/portugueseTaxonomy";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";
import {PORTUGUESE_GEORGE_12_DEEP_REVIEW} from "../../app/data/portugueseDeepReviewGeorge12";

const study=PORTUGUESE_GEORGE_12_DEEP_REVIEW;

function sectionText(id){
  return JSON.stringify(study.sections.find(section=>section.id===id));
}

describe("Rever Matéria · Português · George · 12.º ano",()=>{
  it("corrige a taxonomia para George obrigatório nas AE de 2026",()=>{
    const taxonomy12=PORTUGUESE_TAXONOMY.find(row=>row.year==="12.º");
    const unit=taxonomy12?.units.find(item=>item.id==="pt12-conto");
    expect(unit?.title).toMatch(/Maria Judite de Carvalho.+George/iu);
    expect(unit?.summary).toMatch(/obrigatória.+2026/iu);
    expect(unit?.title).not.toMatch(/opção prescrita/iu);
  });

  it("está ligado ao registry profundo sem alterar o ID estável pt12-conto",()=>{
    expect(study.id).toBe("pt12-conto");
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt12-conto");
    expect(portugueseDeepReviewContentFor("pt12-conto")).toBe(study);
  });

  it("mantém contrato editorial profundo em sete secções",()=>{
    expect(study.goals.length).toBeGreaterThanOrEqual(7);
    expect(study.sourceBasis.length).toBeGreaterThanOrEqual(3);
    expect(study.sourceBasis.join(" ")).toMatch(/DGE/iu);
    expect(study.sourceBasis.join(" ")).toMatch(/março de 2026/iu);
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

  it("trata George, Gi e Georgina como três idades relacionadas, não biografias independentes",()=>{
    const text=sectionText("pt12-george-tres-idades");
    expect(text).toMatch(/George/iu);
    expect(text).toMatch(/Gi/iu);
    expect(text).toMatch(/Georgina/iu);
    expect(text).toMatch(/três personagens independentes|três biografias separadas/iu);
    expect(text).toMatch(/identidade/iu);
  });

  it("distingue realidade, memória e imaginação por marcas narrativas",()=>{
    const text=sectionText("pt12-george-realidade-memoria-imaginacao");
    expect(text).toMatch(/realidade|presente/iu);
    expect(text).toMatch(/memória/iu);
    expect(text).toMatch(/imaginação|projeção/iu);
    expect(text).toMatch(/tempos verbais|marcas linguísticas|marcas textuais/iu);
  });

  it("não confunde narrador na terceira pessoa com focalização",()=>{
    const text=sectionText("pt12-george-focalizacao");
    expect(text).toMatch(/terceira pessoa/iu);
    expect(text).toMatch(/focalização/iu);
    expect(text).toMatch(/quem narra|quem vê|quem percebe/iu);
    expect(text).toMatch(/não equivalentes|não.*mesma/iu);
  });

  it("não reduz envelhecimento a decadência nem escolhas a moral",()=>{
    const text=sectionText("pt12-george-tempo-escolhas");
    expect(text).toMatch(/envelhecimento/iu);
    expect(text).toMatch(/decadência automática|deterioração física/iu);
    expect(text).toMatch(/moral/iu);
    expect(text).toMatch(/liberdade/iu);
    expect(text).toMatch(/solidão/iu);
  });

  it("protege a função das peripécias inicial e final",()=>{
    const text=sectionText("pt12-george-estrutura");
    expect(text).toMatch(/peripécias inicial e final/iu);
    expect(text).toMatch(/início/iu);
    expect(text).toMatch(/final|desfecho/iu);
    expect(text).toMatch(/reinterpre|releitura/iu);
  });

  it("impede simbolismo de dicionário e obriga contexto",()=>{
    const text=sectionText("pt12-george-linguagem-simbolos");
    expect(text).toMatch(/símbolo/iu);
    expect(text).toMatch(/equivalência fixa|dicionário/iu);
    expect(text).toMatch(/contexto/iu);
    expect(text).toMatch(/efeito/iu);
  });

  it("obriga comparação por eixo comum em vez de duas listas",()=>{
    const text=sectionText("pt12-george-exame");
    expect(text).toMatch(/eixo comum/iu);
    expect(text).toMatch(/duas mini-respostas independentes|duas descrições separadas/iu);
    expect(text).toMatch(/evidência/iu);
  });
});
