import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";
import {
  PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW,
  PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW_VERSION,
  portugueseTrovadoresca10DeepReviewFor
} from "../../app/data/portugueseDeepReviewTrovadoresca10";
import {
  PORTUGUESE_DEEP_REVIEW_UNIT_IDS,
  portugueseDeepReviewContentFor
} from "../../app/data/portugueseDeepReviewRegistry";

const component=readFileSync(new URL("../../app/components/PortugueseLearnPanel.js",import.meta.url),"utf8");

const EXPECTED_SECTIONS=[
  "pt10-trov-contexto",
  "pt10-trov-amigo",
  "pt10-trov-amor",
  "pt10-trov-satira",
  "pt10-trov-resposta"
];

describe("Rever Matéria profundo · Português · Poesia trovadoresca",()=>{
  it("mantém versão editorial e provider específico",()=>{
    expect(PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW_VERSION).toMatch(/^2026\.10-/u);
    expect(portugueseTrovadoresca10DeepReviewFor("pt10-trovadoresca")).toBe(PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW);
    expect(portugueseTrovadoresca10DeepReviewFor("pt10-fernao-lopes")).toBeNull();
  });

  it("mantém as cinco secções pedagógicas da wave",()=>{
    expect(PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
    for(const section of PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.signals.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.prompt,section.id).toBeTruthy();
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.modelAnswer,section.id).toBeTruthy();
      expect(section.example?.note,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege o referencial homologado em vigor e a quantidade prescrita de cantigas",()=>{
    const sources=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sourceBasis.join(" ");
    const text=JSON.stringify(PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW);
    expect(sources).toMatch(/DGE/iu);
    expect(sources).toMatch(/2018/iu);
    expect(sources).toMatch(/referencial em vigor/iu);
    expect(sources).toMatch(/IAVE.*639.*2026/iu);
    expect(text).toMatch(/quatro cantigas de amigo.*duas de amor.*uma de escárnio e maldizer/iu);
    expect(text).not.toMatch(/proposta.*2026.*substitui/iu);
  });

  it("protege situação comunicativa e distinção entre autor e voz poética",()=>{
    const section=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-trov-contexto");
    const text=JSON.stringify(section);
    expect(text).toMatch(/quem fala.*a quem fala.*circunstância/iu);
    expect(text).toMatch(/voz.*poema.*não.*biografia.*autor/iu);
    expect(text).toMatch(/classificar/iu);
    expect(text).toMatch(/marcas/iu);
  });

  it("protege cantiga de amigo como leitura textual e não lista decorada",()=>{
    const section=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-trov-amigo");
    const text=JSON.stringify(section);
    expect(text).toMatch(/voz poética.*feminina/iu);
    expect(text).toMatch(/mãe.*amigas.*irmãs.*natureza/iu);
    expect(text).toMatch(/paralelismo.*refrão.*repetição/iu);
    expect(text).toMatch(/não.*apenas.*musicalidade/iu);
    expect(text).toMatch(/não.*reduzida.*saudade|não deve ser resumida.*saudade/iu);
  });

  it("protege cantiga de amor, coita demonstrada e posição da senhora",()=>{
    const section=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-trov-amor");
    const text=JSON.stringify(section);
    expect(text).toMatch(/voz poética.*masculina/iu);
    expect(text).toMatch(/senhora.*superioridade/iu);
    expect(text).toMatch(/coita de amor/iu);
    expect(text).toMatch(/não basta.*coita de amor/iu);
    expect(text).toMatch(/submissão|serviço amoroso/iu);
  });

  it("protege sátira pelo alvo, mecanismo e efeito",()=>{
    const section=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-trov-satira");
    const text=JSON.stringify(section);
    expect(text).toMatch(/alvo.*criticado|alvo.*censurado/iu);
    expect(text).toMatch(/escárnio.*indireta.*maldizer.*explícito/iu);
    expect(text).toMatch(/ironia.*contraste/iu);
    expect(text).toMatch(/não deve ser aplicada.*automática/iu);
  });

  it("protege o método de resposta restrita ideia-evidência-explicação",()=>{
    const section=PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW.sections.find(row=>row.id==="pt10-trov-resposta");
    const text=JSON.stringify(section);
    expect(text).toMatch(/resposta restrita/iu);
    expect(text).toMatch(/ideia.*evidência.*explicação/iu);
    expect(text).toMatch(/comparar.*critério/iu);
    expect(text).toMatch(/citação.*explicar/iu);
  });

  it("regista a unidade convertida e preserva o fallback do painel no fluxo partilhado",()=>{
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS).toContain("pt10-trovadoresca");
    expect(portugueseDeepReviewContentFor("pt10-trovadoresca")).toBe(PORTUGUESE_TROVADORESCA_10_DEEP_REVIEW);
    expect(component).toContain("portugueseDeepReviewContentFor");
    expect(component).toContain("DeepReviewStudy");
    expect(component).toContain('kind="portuguese"');
    expect(component).toContain(":deepStudy?");
    expect(component).toContain("unit.summary");
    expect(component).toContain("guide?.studySteps");
  });
});
