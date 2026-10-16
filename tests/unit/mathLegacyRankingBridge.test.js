import {describe,expect,it} from "vitest";
import {emptyCompetition,recordCompetitiveActivity,weeklyCompetitiveXp} from "../../app/lib/competition.js";

const at=new Date(2026,9,16,12,0,0,0).getTime();

describe("ponte competitiva legado Matemática A",()=>{
  it("atribui os fluxos matemáticos legados sem subjectId a math-a",()=>{
    let state={competition:emptyCompetition()};
    state=recordCompetitiveActivity(state,{kind:"training",sessionId:"math-training",total:5,focusKey:"12-prob:condicionada",at});
    expect(weeklyCompetitiveXp(state,at)).toBe(40);
    expect(weeklyCompetitiveXp(state,at,"math-a")).toBe(40);
    expect(weeklyCompetitiveXp(state,at,"portuguese")).toBe(0);
  });

  it("não reclassifica retroativamente atividades históricas já guardadas sem disciplina",()=>{
    const state={competition:{...emptyCompetition(),weeks:{"2026-10-12":{xp:40,activities:[{key:"old",kind:"training",rankedXp:40,at,day:"2026-10-16"}]}}}};
    expect(weeklyCompetitiveXp(state,at)).toBe(40);
    expect(weeklyCompetitiveXp(state,at,"math-a")).toBe(0);
  });
});
