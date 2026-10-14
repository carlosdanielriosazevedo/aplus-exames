import {describe,expect,it} from "vitest";
import {
  COMPOSITE_DERIVATIVES_REVIEW,
  MATH_COMPOSITE_DERIVATIVES_REVIEW_VERSION,
  mathCompositeDerivativesReviewContentFor
} from "../../app/data/mathDeepReviewCompositeDerivatives";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";

const EXPECTED_SECTIONS=[
  "12-fcd-composicao",
  "12-fcd-e-exponencial",
  "12-fcd-log-trig-potencias",
  "12-fcd-regras-cadeia",
  "12-fcd-aplicacoes"
];

describe("Rever Matéria profundo · Função composta e derivadas",()=>{
  it("mantém uma versão editorial explícita",()=>{
    expect(MATH_COMPOSITE_DERIVATIVES_REVIEW_VERSION).toMatch(/^2026\.10-/u);
  });

  it("cobre as cinco submatérias do mapa vNext",()=>{
    const study=mathCompositeDerivativesReviewContentFor("12-fcd");
    expect(study).toBe(COMPOSITE_DERIVATIVES_REVIEW);
    expect(study.sections.map(section=>section.id)).toEqual(EXPECTED_SECTIONS);
  });

  it("cada secção mantém o contrato de matéria estudável",()=>{
    for(const section of COMPOSITE_DERIVATIVES_REVIEW.sections){
      expect(section.paragraphs.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.formulas.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.steps.length,section.id).toBeGreaterThanOrEqual(3);
      expect(section.example?.result,section.id).toBeTruthy();
      expect(section.remember,section.id).toBeTruthy();
      expect(section.pitfalls.length,section.id).toBeGreaterThanOrEqual(2);
    }
  });

  it("protege composição, domínios e regra da cadeia",()=>{
    const text=JSON.stringify(COMPOSITE_DERIVATIVES_REVIEW);
    expect(text).toMatch(/D_\(f∘g\)/u);
    expect(text).toMatch(/g primeiro, f depois/u);
    expect(text).toMatch(/\(f∘g\)'\(x\)=f'\(g\(x\)\)·g'\(x\)/u);
    expect(text).toMatch(/esquecer o fator g'\(x\)/u);
  });

  it("inclui as novas famílias de derivadas previstas nas AE",()=>{
    const text=JSON.stringify(COMPOSITE_DERIVATIVES_REVIEW);
    expect(text).toMatch(/\(e\^x\)'=e\^x/u);
    expect(text).toMatch(/\(ln x\)'=1\/x/u);
    expect(text).toMatch(/\(sen x\)'=cos x/u);
    expect(text).toMatch(/\(cos x\)'=−sen x/u);
    expect(text).toMatch(/\(tg x\)'=1\/cos²x/u);
    expect(text).toMatch(/\(x\^α\)'=αx\^\(α−1\)/u);
  });

  it("não transforma zeros de derivadas em conclusões automáticas",()=>{
    const text=JSON.stringify(COMPOSITE_DERIVATIVES_REVIEW);
    expect(text).toMatch(/condição é necessária, mas não suficiente/u);
    expect(text).toMatch(/não basta/u);
    expect(text).toMatch(/mudança de concavidade/u);
    expect(text).toMatch(/otimização/u);
    expect(text).toMatch(/segunda derivada/u);
  });

  it("regista a base curricular oficial e atual",()=>{
    const sources=COMPOSITE_DERIVATIVES_REVIEW.sourceBasis.join(" ");
    expect(sources).toMatch(/EduQA|DGE/u);
    expect(sources).toMatch(/turmas piloto/u);
    expect(sources).toMatch(/maio de 2026/u);
    expect(sources).toMatch(/Aprendizagens Essenciais/u);
    expect(sources).toMatch(/IAVE/u);
    expect(sources).toMatch(/635/u);
  });

  it("entra no registo central sem alterar o fallback dos temas restantes",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS).toEqual(["12-cplx","12-prob","12-expl","12-fcd"]);
    expect(mathDeepReviewContentFor("12-fcd")).toBe(COMPOSITE_DERIVATIVES_REVIEW);
    expect(mathDeepReviewContentFor("12-fcont")).toBeNull();
  });
});
