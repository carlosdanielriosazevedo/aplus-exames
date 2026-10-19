import {describe,expect,it} from "vitest";
import fs from "node:fs";
import path from "node:path";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry";
import {PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,physicsChemistryDeepReviewContentFor} from "../../app/data/physicsChemistryDeepReviewRegistry";

const ROOT=process.cwd();
const source=(file)=>fs.readFileSync(path.join(ROOT,file),"utf8");

function allStudies(){
  return [
    ...MATH_DEEP_REVIEW_THEME_IDS.map(id=>["Matemática A",id,mathDeepReviewContentFor(id)]),
    ...PORTUGUESE_DEEP_REVIEW_UNIT_IDS.map(id=>["Português",id,portugueseDeepReviewContentFor(id)]),
    ...PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS.map(id=>["FQ A",id,physicsChemistryDeepReviewContentFor(id)])
  ];
}

describe("Rever Matéria · apresentação transversal",()=>{
  it("mantém toda a cobertura profunda das três disciplinas ligada ao percurso comum",()=>{
    expect(MATH_DEEP_REVIEW_THEME_IDS.length).toBe(21);
    expect(PORTUGUESE_DEEP_REVIEW_UNIT_IDS.length).toBe(26);
    expect(PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS.length).toBe(7);
    for(const [subject,id,study] of allStudies()){
      expect(study,`${subject}:${id}`).not.toBeNull();
      expect(study.lead,`${subject}:${id}`).toBeTruthy();
      expect(study.goals.length,`${subject}:${id}`).toBeGreaterThanOrEqual(3);
      expect(study.sections.length,`${subject}:${id}`).toBeGreaterThanOrEqual(3);
      for(const section of study.sections){
        expect(section.title,`${subject}:${section.id}`).toBeTruthy();
        expect(section.paragraphs.length,`${subject}:${section.id}`).toBeGreaterThanOrEqual(3);
        expect(section.example?.steps?.length,`${subject}:${section.id}`).toBeGreaterThanOrEqual(3);
        expect(section.remember,`${subject}:${section.id}`).toBeTruthy();
        expect(section.pitfalls?.length,`${subject}:${section.id}`).toBeGreaterThanOrEqual(2);
      }
    }
  });

  it("usa o mesmo componente de leitura em Matemática A, Português e FQ A",()=>{
    for(const file of [
      "app/components/MathReviewMatter.js",
      "app/components/PortugueseLearnPanel.js",
      "app/components/PhysicsChemistryLearnPanel.js"
    ]){
      const text=source(file);
      expect(text,file).toMatch(/import DeepReviewStudy from "\.\/DeepReviewStudy"/u);
      expect(text,file).toMatch(/<DeepReviewStudy/u);
    }
  });

  it("leva o aluno rapidamente da orientação para o mapa e só consolida objetivos no fim",()=>{
    const text=source("app/components/DeepReviewStudy.js");
    expect(text).toMatch(/INÍCIO · ORIENTAÇÃO/u);
    expect(text).toMatch(/MEIO · PERCURSO/u);
    expect(text).toMatch(/FIM · CONSOLIDAÇÃO/u);
    expect(text).toMatch(/compactLead\(study\.lead\)/u);
    expect(text).not.toMatch(/className=\{styles\.studyRoute\}/u);
    const mapIndex=text.indexOf("Mapa do capítulo");
    const lessonsIndex=text.indexOf("styles.lessonStack");
    const goalsIndex=text.indexOf("Confirma o que já consegues fazer:");
    expect(mapIndex).toBeGreaterThan(0);
    expect(lessonsIndex).toBeGreaterThan(mapIndex);
    expect(goalsIndex).toBeGreaterThan(lessonsIndex);
    expect(text).toMatch(/COMPREENDER/u);
    expect(text).toMatch(/EXEMPLO ORIENTADO/u);
    expect(text).toMatch(/IDEIA-CHAVE/u);
    expect(text).toMatch(/Erros a evitar/u);
  });






  it("declara explicitamente semântica matemática e texto alternativo nas fórmulas",()=>{
    const component=source("app/components/DeepReviewStudy.js");
    expect(component).toContain('<code key={formula}><span role="img" aria-label={formula}><span aria-hidden="true">');
    // Este contrato de fonte NÃO substitui a inspeção da árvore a11y nem o leitor de ecrã.
  });

  it("mantém hierarquia responsiva e largura de leitura controlada",()=>{
    const css=source("app/components/MathReviewMatter.module.css");
    expect(css).toMatch(/max-width:980px/u);
    expect(css).toMatch(/max-width:78ch/u);
    expect(css).toMatch(/@media\(max-width:760px\)/u);
    expect(css).toMatch(/\.goalPanel ul,\.mapGrid,\.reviewToolbox ul,\.formulaStack,\.lessonSummaryGrid,\.finishChecklist\{grid-template-columns:1fr;\}/u);
  });
});
