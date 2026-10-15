import {describe,expect,it} from "vitest";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const REQUIRED_OPTIONAL={
  "12-ie":[
    "12-ie-inferencia-amostragem",
    "12-ie-distribuicoes-amostragem",
    "12-ie-tlc",
    "12-ie-estimacao",
    "12-ie-intervalos-confianca"
  ],
  "12-int":[
    "12-int-primitiva",
    "12-int-tabela-propriedades",
    "12-int-integral-definido",
    "12-int-tfc-barrow",
    "12-int-areas"
  ],
  "12-mat":[
    "12-mat-representacao-tipos",
    "12-mat-adicao-escalar",
    "12-mat-produto",
    "12-mat-transformacoes",
    "12-mat-modelacao"
  ]
};

describe("Rever Matéria · cobertura transversal dos opcionais do 12.º ano",()=>{
  it("mantém os três temas opcionais registados",()=>{
    for(const themeId of Object.keys(REQUIRED_OPTIONAL)){
      expect(MATH_DEEP_REVIEW_THEME_IDS,themeId).toContain(themeId);
      expect(mathDeepReviewContentFor(themeId),themeId).not.toBeNull();
    }
  });

  it("mantém exatamente as quinze submatérias opcionais atuais",()=>{
    const all=[];
    for(const [themeId,expected] of Object.entries(REQUIRED_OPTIONAL)){
      const study=mathDeepReviewContentFor(themeId);
      const actual=study.sections.map(section=>section.id);
      expect(actual,themeId).toEqual(expected);
      expect(new Set(actual).size,`${themeId}: ids duplicados`).toBe(actual.length);
      all.push(...actual);
    }
    expect(all).toHaveLength(15);
    expect(new Set(all).size).toBe(15);
  });

  it("mantém o contrato editorial profundo nos três opcionais",()=>{
    for(const themeId of Object.keys(REQUIRED_OPTIONAL)){
      const study=mathDeepReviewContentFor(themeId);
      expect(study.id,themeId).toBe(themeId);
      expect(study.title,themeId).toBeTruthy();
      expect(study.lead,themeId).toBeTruthy();
      expect(study.goals.length,themeId).toBeGreaterThanOrEqual(3);
      expect(study.sourceBasis.length,themeId).toBeGreaterThanOrEqual(2);
      for(const section of study.sections){
        expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
        expect(section.example?.result,section.id).toBeTruthy();
        expect(section.remember,section.id).toBeTruthy();
        expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("completa o Rever Matéria profundo em 21 grandes temas",()=>{
    expect(new Set(MATH_DEEP_REVIEW_THEME_IDS).size).toBe(MATH_DEEP_REVIEW_THEME_IDS.length);
    expect(MATH_DEEP_REVIEW_THEME_IDS).toHaveLength(21);
  });
});
