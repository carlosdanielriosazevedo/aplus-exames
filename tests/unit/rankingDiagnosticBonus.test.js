import {describe,expect,it} from "vitest";
import {emptyCompetition,recordCompetitiveActivity,weeklyCompetitiveXp} from "../../app/lib/competition.js";

const at=new Date(2026,9,16,12,0,0,0).getTime();

describe("bónus competitivo do diagnóstico",()=>{
  it("conta uma vez em Todas e nunca num filtro por disciplina",()=>{
    let state={competition:emptyCompetition()};
    state=recordCompetitiveActivity(state,{kind:"diagnostic",subjectId:"portuguese",sessionId:"diag-1",at});

    expect(weeklyCompetitiveXp(state,at)).toBe(30);
    expect(weeklyCompetitiveXp(state,at,"math-a")).toBe(0);
    expect(weeklyCompetitiveXp(state,at,"portuguese")).toBe(0);
    expect(weeklyCompetitiveXp(state,at,"physics-chemistry-a")).toBe(0);

    const activity=state.competition.weeks["2026-10-12"].activities.find(row=>row.key==="diag-1");
    expect(activity.subjectId).toBeNull();
    expect(activity.reason).toMatch(/bónus global/u);
  });
});
