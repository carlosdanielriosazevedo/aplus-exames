import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";

// Em produção a liga (participantes simulados) fica escondida até existir uma
// liga real. Os testes de browser ligam NEXT_PUBLIC_APPROVA_RANKING=1 para
// continuar a verificar o ecrã, que fica no código para ser reativado.
describe("navegação principal sem liga simulada",()=>{
  it("o separador Ranking só existe com NEXT_PUBLIC_APPROVA_RANKING=1",()=>{
    const chrome=readFileSync("app/components/chrome.js","utf8");
    expect(chrome).toMatch(/RANKING_ENABLED=process\.env\.NEXT_PUBLIC_APPROVA_RANKING==="1"/);
    expect(chrome).toMatch(/\.\.\.\(RANKING_ENABLED\?\[\["ranking","Ranking"\]\]:\[\]\)/);
    expect(process.env.NEXT_PUBLIC_APPROVA_RANKING).not.toBe("1");
  });
  it("o XP no topo leva ao Progresso quando a liga está escondida",()=>{
    expect(readFileSync("app/components/chrome.js","utf8")).toMatch(/go\(RANKING_ENABLED\?"ranking":"progress"\)/);
  });
});
