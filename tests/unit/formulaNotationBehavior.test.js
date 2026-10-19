import {describe,it,expect} from "vitest";
import {FORMULA_PATTERN,formattedParts} from "../../app/lib/formulaNotation.js";
import {MATH_DEEP_REVIEW_THEME_IDS,mathDeepReviewContentFor} from "../../app/data/mathDeepReviewRegistry.js";
import {PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS,physicsChemistryDeepReviewContentFor} from "../../app/data/physicsChemistryDeepReviewRegistry.js";
import {PORTUGUESE_DEEP_REVIEW_UNIT_IDS,portugueseDeepReviewContentFor} from "../../app/data/portugueseDeepReviewRegistry.js";

const CASES=[
  ["x^1/2",[]],["x^12/3",[]],["x^2.5",[]],["x^2,5",[]],["x^2y",[]],["x^a_b",[]],
  ["x^(1/2)",["^(1/2)"]],["a^x",["^x"]],["f(x)=x^2+1",["^2"]],
  ["√(a+b)",["√(a+b)"]],["√((a+b)²)",[]],["√Var(X)",[]],["σ=√Var",["√Var"]],["√52",["√52"]],
  ["√2.5",[]],["√x²",[]],
  ["P(A)=3/5",["3/5"]],["E_c = 1/2 mv²",["1/2"]],
  ["1/2/3",[]],["0,5/2",[]],["1/2.5",[]],["1/2π",[]],["x/2+a/b",[]],["(a+b)/(c+d)",[]]
];

function collectAllFormulas(){
  const studies=[
    ...MATH_DEEP_REVIEW_THEME_IDS.map(mathDeepReviewContentFor),
    ...PHYSICS_CHEMISTRY_DEEP_REVIEW_DOMAIN_IDS.map(physicsChemistryDeepReviewContentFor),
    ...PORTUGUESE_DEEP_REVIEW_UNIT_IDS.map(portugueseDeepReviewContentFor)
  ];
  const formulas=[];
  for(const study of studies){
    for(const section of study?.sections||[]){
      if(Array.isArray(section.formulas))formulas.push(...section.formulas);
    }
  }
  return formulas;
}

describe("FormulaNotation · comportamento da regex real",()=>{
  it.each(CASES)("%s",(input,expected)=>{
    expect(formattedParts(input)).toEqual(expected);
  });

  it("nenhuma fórmula real é formatada junto a decimal, barra ou letra",()=>{
    const formulas=collectAllFormulas();
    expect(formulas.length).toBeGreaterThan(100);
    const risky=[];
    for(const formula of formulas){
      const parts=String(formula).split(FORMULA_PATTERN);
      parts.forEach((part,index)=>{
        if(index%2===0)return;
        const before=parts[index-1],after=parts[index+1]??"";
        if(/[\d][.,]$|\/$/u.test(before)||/^([.,]\d|[\p{L}\d_/])/u.test(after))risky.push({formula,part});
      });
    }
    expect(risky).toEqual([]);
  });
});
