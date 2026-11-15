import {readFileSync,readdirSync} from "node:fs";
import {join} from "node:path";
import {describe,expect,it} from "vitest";
import {PORTUGUESE_ITEMS,PORTUGUESE_ALL_ITEMS,isRetiredPortugueseItem,portugueseItemById} from "../../app/data/portugueseContent.js";
import {PHYSICS_CHEMISTRY_A_ITEMS,PHYSICS_CHEMISTRY_A_ALL_ITEMS,isRetiredPhysicsChemistryItem,physicsChemistryItemById} from "../../app/data/physicsChemistryFoundation.js";

const ROOT="content/vnext/math-a";
const mathQuestions=readdirSync(ROOT).flatMap(year=>readdirSync(join(ROOT,year)).filter(f=>f.endsWith(".json"))
  .flatMap(f=>JSON.parse(readFileSync(join(ROOT,year,f),"utf8")).questions));
// Forma canónica simples de expressões de retas/polinómios lineares em opções.
const canon=o=>o.replace(/\s|\.$/gu,"").replace(/(?<![\d.,])1x/gu,"x").replace(/(?<![\d.,(/])0x\+?/gu,"").replace(/\+0(?![\d,.a-z])/gu,"").replace(/\+-/gu,"-").replace(/=\+/gu,"=");

describe("guardas de qualidade do conteúdo",()=>{
  it("Matemática A: nenhuma pergunta tem duas opções equivalentes",()=>{
    const bad=mathQuestions.filter(q=>new Set(q.o.map(canon)).size<q.o.length).map(q=>q.id);
    expect(bad).toEqual([]);
  });
  it("Matemática A: sem notação por simplificar (0x, 1x, +-, --) em opções e resoluções",()=>{
    const bad=mathQuestions.filter(q=>/(?<![\d.,(/])0x|(?<![\w.,])1x\b|\+-|--/u.test(q.o.join(" ")+" "+q.sol)).map(q=>q.id);
    expect(bad).toEqual([]);
  });
  it("FQ A: nenhuma pergunta ativa revela a resposta ou encadeia várias perguntas",()=>{
    const bad=PHYSICS_CHEMISTRY_A_ITEMS.filter(q=>/por que razão a resposta «/u.test(q.prompt||"")||((q.prompt||"").match(/\?/gu)||[]).length>1).map(q=>q.id);
    expect(bad).toEqual([]);
    expect(PHYSICS_CHEMISTRY_A_ITEMS.some(isRetiredPhysicsChemistryItem)).toBe(false);
  });
  it("FQ A: variantes retiradas continuam acessíveis para retomar sessões antigas",()=>{
    const retired=PHYSICS_CHEMISTRY_A_ALL_ITEMS.filter(isRetiredPhysicsChemistryItem);
    expect(retired.length).toBe(1548);
    expect(physicsChemistryItemById(retired[0].id)?.id).toBe(retired[0].id);
  });
  it("Português: nenhuma pergunta ativa encadeia várias perguntas nem usa variantes retiradas",()=>{
    const bad=PORTUGUESE_ITEMS.filter(q=>((q.prompt||"").match(/\?/gu)||[]).length>1&&q.domain==="educacao-literaria").map(q=>q.id);
    expect(bad).toEqual([]);
    expect(PORTUGUESE_ITEMS.some(isRetiredPortugueseItem)).toBe(false);
  });
  it("Português: variantes retiradas continuam acessíveis para retomar sessões antigas",()=>{
    const retired=PORTUGUESE_ALL_ITEMS.filter(isRetiredPortugueseItem);
    expect(retired.length).toBe(900);
    expect(portugueseItemById(retired[0].id)?.id).toBe(retired[0].id);
  });
});
