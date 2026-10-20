import {readFileSync} from "node:fs";
import {describe,expect,it} from "vitest";

const source=readFileSync(new URL("../../app/components/RankingScreen.js",import.meta.url),"utf8");

describe("ranking por disciplina",()=>{
  it("expõe Todas e as disciplinas disponíveis pela ordem pedagógica definida",()=>{
    expect(source).toMatch(/Filtrar ranking por disciplina/u);
    expect(source).toMatch(/<select id="rankingSubjectFilter"/u);
    expect(source).toMatch(/<option value="all">Todas as disciplinas<\/option>/u);
    expect(source).toMatch(/<option key=\{id\} value=\{id\}>\{subject.name\}<\/option>/u);
    expect(source).toMatch(/const RANKING_SUBJECT_IDS=\["math-a","portuguese","physics-chemistry-a"\]/u);
    expect(source).toMatch(/RANKING_SUBJECT_IDS\.map/u);
  });

  it("passa a disciplina ao leaderboard sem alterar a projeção global",()=>{
    expect(source).toMatch(/demoLeaderboard\(s,\{scope,subjectId\}\)/u);
    expect(source).toMatch(/const projection=leagueProjection\(s\)/u);
    expect(source).toMatch(/const divisionMode=scope==="league"&&!subjectId/u);
    expect(source).toMatch(/A tua divisão continua a ser decidida pelo XP total em “Todas”/u);
  });

  it("torna explícita a regra do Exame Completo",()=>{
    expect(source).toMatch(/até \+120/u);
    expect(source).toMatch(/Exame Completo/u);
    expect(source).toMatch(/parte da prova respondida, nunca da nota/u);
    expect(source).toMatch(/Uma recompensa por disciplina\/dia/u);
  });

  it("mantém o bónus do primeiro Diagnóstico apenas no ranking global",()=>{
    expect(source).toMatch(/!subjectId&&<div><b>🧭 \+30<\/b><span>1.º Diagnóstico<\/span>/u);
    expect(source).toMatch(/Bónus inicial global/u);
    expect(source).toMatch(/pertence apenas ao ranking “Todas”/u);
  });

  it("adapta as regras de XP ao filtro ativo",()=>{
    expect(source).toMatch(/XP COMPETITIVO · \$\{subjectLabel\.toUpperCase\(\)\}/u);
    expect(source).toMatch(/O que conta em \$\{subjectLabel\}/u);
    expect(source).toMatch(/O XP fica associado à disciplina dessa Missão/u);
  });

  it("não apresenta uma atividade de zero XP como último ganho",()=>{
    expect(source).toMatch(/const latestGain=latest\?\.rankedXp>0\?latest:null/u);
    expect(source).toMatch(/latestGain&&<div className="lastRankXp"/u);
    expect(source).not.toMatch(/latest&&<div className="lastRankXp"/u);
  });

  it("mantém ligas pequenas e promoção dependente do total",()=>{
    expect(source).toMatch(/até 20 alunos/u);
    expect(source).toMatch(/divisão usa sempre o XP total/u);
  });
});
