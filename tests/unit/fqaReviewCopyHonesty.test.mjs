import {describe,it,expect} from "vitest";
import {readFileSync} from "node:fs";
import {gradePhysicsChemistryStepwise} from "../../app/lib/physicsChemistryStepwiseGrader.js";
import {physicsChemistryConstructedItemById} from "../../app/data/physicsChemistryConstructed.js";

const panel=readFileSync(new URL("../../app/components/PhysicsChemistryStepwise.js",import.meta.url),"utf8");
const item=physicsChemistryConstructedItemById("FQA-C-MAT-01");

describe("FQA copy does not promise nonoperational human review",()=>{
 it("keeps alternative solution ungraded while explaining its uncertainty",()=>{
  expect(item).toBeTruthy();
  const result=gradePhysicsChemistryStepwise(item,{steps:{
    n:{work:"quantidade de soluto pela concentração e volume",result:"0,0200",unit:"mol"},
    V:{work:"faço a conservação do soluto por proporção",result:"40,0",unit:"mL"}
  }});
  expect(result.requiresReview).toBe(true);
  expect(result.provisionalPoints).toBeNull();
  expect(result.steps.some(row=>row.status==="alternative-method-review")).toBe(true);
  expect(result.note).toMatch(/não consegue avaliar automaticamente/i);
  expect(result.note).not.toMatch(/revisão humana|aguarda revisão|será revist/i);
  for(const row of result.steps.filter(row=>row.status==="alternative-method-review")){
   expect(row.points).toBeNull();
   expect(row.note).not.toMatch(/precisa de revisão|revisão humana/i);
  }
 });
 it("gives a truthful message in the actual stepwise feedback component",()=>{
  expect(panel).toContain("Avaliação automática incompleta");
  expect(panel).toContain("não existe uma revisão humana pendente");
  expect(panel).not.toContain("Revisão necessária");
  expect(panel).not.toContain("continuam sujeitos a revisão");
 });
});
