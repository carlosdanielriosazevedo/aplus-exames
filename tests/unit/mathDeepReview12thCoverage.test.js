import {describe,expect,it} from "vitest";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const REQUIRED_12TH_DEEP_REVIEW={
  "12-cplx":[
    "12-cplx-unidade-equacoes",
    "12-cplx-forma-algebrica",
    "12-cplx-conjugado-modulo",
    "12-cplx-operacoes-algebricas",
    "12-cplx-argand",
    "12-cplx-forma-trig",
    "12-cplx-operacoes-trig"
  ],
  "12-prob":[
    "12-prob-fenomeno-acontecimentos",
    "12-prob-propriedades",
    "12-prob-condicionada",
    "12-prob-produto-arvores",
    "12-prob-contingencia-independencia",
    "12-prob-total",
    "12-prob-variaveis-discretas",
    "12-prob-normal"
  ],
  "12-expl":[
    "12-expl-exponencial",
    "12-expl-modelacao",
    "12-expl-inversa-raizes",
    "12-expl-logaritmica",
    "12-expl-equacoes"
  ],
  "12-fcd":[
    "12-fcd-composicao",
    "12-fcd-e-exponencial",
    "12-fcd-log-trig-potencias",
    "12-fcd-regras-cadeia",
    "12-fcd-aplicacoes"
  ],
  "12-fcont":[
    "12-fcont-limites-continuidade",
    "12-fcont-operacoes",
    "12-fcont-lhopital",
    "12-fcont-assintotas",
    "12-fcont-estudo-global"
  ],
  "12-rae":[
    "12-rae-bolzano-localizacao",
    "12-rae-bissecao",
    "12-rae-newton"
  ]
};

const REQUIRED_THEME_IDS=Object.keys(REQUIRED_12TH_DEEP_REVIEW);

describe("Rever Matéria · cobertura transversal do 12.º ano obrigatório",()=>{
  it("mantém os seis grandes temas obrigatórios registados",()=>{
    for(const themeId of REQUIRED_THEME_IDS){
      expect(MATH_DEEP_REVIEW_THEME_IDS,themeId).toContain(themeId);
      expect(mathDeepReviewContentFor(themeId),themeId).not.toBeNull();
    }
  });

  it("mantém a taxonomia profunda oficial de cada tema sem secções perdidas ou duplicadas",()=>{
    const allSectionIds=[];

    for(const [themeId,expectedSections] of Object.entries(REQUIRED_12TH_DEEP_REVIEW)){
      const content=mathDeepReviewContentFor(themeId);
      expect(content?.id,themeId).toBe(themeId);
      expect(content?.sections.map(section=>section.id),themeId).toEqual(expectedSections);
      allSectionIds.push(...expectedSections);
    }

    expect(new Set(allSectionIds).size).toBe(allSectionIds.length);
  });

  it("mantém o contrato editorial mínimo em todas as secções obrigatórias",()=>{
    for(const themeId of REQUIRED_THEME_IDS){
      const content=mathDeepReviewContentFor(themeId);
      expect(content?.title,themeId).toBeTruthy();
      expect(content?.lead,themeId).toBeTruthy();
      expect(content?.goals.length,themeId).toBeGreaterThanOrEqual(3);
      expect(content?.sourceBasis.length,themeId).toBeGreaterThanOrEqual(2);

      for(const section of content.sections){
        expect(section.kicker,section.id).toBeTruthy();
        expect(section.title,section.id).toBeTruthy();
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.result,section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("não volta a introduzir a taxonomia preliminar de derivabilidade no Rever Matéria profundo",()=>{
    const continuous=mathDeepReviewContentFor("12-fcont");
    const sectionIds=continuous.sections.map(section=>section.id);
    expect(sectionIds).not.toContain("12-fcont-derivabilidade");
    expect(sectionIds).toContain("12-fcont-lhopital");
    expect(sectionIds).toContain("12-fcont-assintotas");
  });

  it("continua a devolver null para temas ainda sem capítulo profundo",()=>{
    expect(mathDeepReviewContentFor("12-opcional-ainda-nao-convertido")).toBeNull();
  });
});
