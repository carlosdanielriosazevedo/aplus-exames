import {describe,expect,it} from "vitest";
import {readFileSync} from "node:fs";

// Sem liga real, o Ranking mostra o XP do aluno e "Ligas semanais — em breve",
// sem participantes simulados. A liga de demonstração só existe com
// NEXT_PUBLIC_APPROVA_RANKING=1 (os testes de browser ligam-no).
describe("Ranking sem participantes simulados por omissão",()=>{
  const screen=readFileSync("app/components/RankingScreen.js","utf8");
  it("o separador Ranking está sempre na navegação",()=>{
    expect(readFileSync("app/components/chrome.js","utf8")).toMatch(/\["ranking","Ranking"\]/);
  });
  it("a liga de demonstração só aparece com o interruptor ligado",()=>{
    expect(screen).toMatch(/LEAGUES_LIVE=process\.env\.NEXT_PUBLIC_APPROVA_RANKING==="1"/);
    expect(screen).toMatch(/\{LEAGUES_LIVE&&<>\s*<details className="demoRankingDisclosure">/);
    expect(process.env.NEXT_PUBLIC_APPROVA_RANKING).not.toBe("1");
  });
  it("sem liga real explica as ligas que vêm aí",()=>{
    expect(screen).toMatch(/!LEAGUES_LIVE&&<section className="leaguesComingSoon"/);
    expect(screen).toContain("sem participantes inventados");
  });
});
