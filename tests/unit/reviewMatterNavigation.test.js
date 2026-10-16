import {describe,expect,test} from "vitest";
import {readFileSync} from "node:fs";

const read=relative=>readFileSync(new URL(`../../${relative}`,import.meta.url),"utf8");
const navigator=read("app/components/ReviewMatterNavigator.js");
const navigatorCss=read("app/components/ReviewMatterNavigator.module.css");
const math=read("app/components/MathReviewMatter.js");
const portuguese=read("app/components/PortugueseLearnPanel.js");
const science=read("app/components/PhysicsChemistryLearnPanel.js");

describe("Rever Matéria navigation",()=>{
  test("uses one shared two-step navigator in all three subjects",()=>{
    for(const source of [math,portuguese,science]){
      expect(source).toMatch(/ReviewMatterNavigator/u);
      expect(source).not.toMatch(/className="chips yearSelector"/u);
      expect(source).not.toMatch(/className="themeGrid"/u);
    }
    expect(navigator).toMatch(/<h2>Escolhe o ano<\/h2>/u);
    expect(navigator).toMatch(/itemHeading/u);
  });

  test("keeps year selection explicit and accessible",()=>{
    expect(navigator).toMatch(/role="group"/u);
    expect(navigator).toMatch(/aria-pressed=\{active\}/u);
    expect(navigator).toMatch(/yearAriaLabel/u);
    expect(navigator).toMatch(/Selecionado/u);
  });

  test("presents study units as descriptive cards instead of anonymous buttons",()=>{
    expect(navigator).toMatch(/itemIndex/u);
    expect(navigator).toMatch(/itemBadge/u);
    expect(navigator).toMatch(/itemSubtitle/u);
    expect(navigator).toMatch(/itemMeta/u);
    expect(navigator).toMatch(/Abrir \$\{itemNoun\}/u);
  });

  test("keeps subject-specific information useful",()=>{
    expect(math).toMatch(/submatérias/u);
    expect(math).toMatch(/TEMA OPCIONAL/u);
    expect(portuguese).toMatch(/Educação Literária/u);
    expect(portuguese).toMatch(/ideias essenciais/u);
    expect(science).toMatch(/Fundamentos de Física e Química/u);
    expect(science).toMatch(/trabalho experimental/u);
  });

  test("has premium interaction states and a one-column mobile fallback",()=>{
    expect(navigatorCss).toMatch(/:focus-visible/u);
    expect(navigatorCss).toMatch(/\.itemCard:hover/u);
    expect(navigatorCss).toMatch(/@media\(max-width:760px\)/u);
    expect(navigatorCss).toMatch(/\.itemGrid\{grid-template-columns:1fr;\}/u);
    expect(navigatorCss).toMatch(/\.yearGrid\{grid-template-columns:1fr;\}/u);
  });
});
