import {describe,expect,it} from "vitest";
import {demoLeaderboard,emptyCompetition,recordCompetitiveActivity} from "../../app/lib/competition.js";

const at=new Date(2026,9,16,12,0,0,0).getTime();

describe("identidade do grupo semanal",()=>{
  it("mantém as mesmas pessoas ao trocar o filtro de disciplina",()=>{
    let state={competition:emptyCompetition()};
    state=recordCompetitiveActivity(state,{kind:"training",subjectId:"math-a",sessionId:"m",total:5,focusKey:"math",at});
    state=recordCompetitiveActivity(state,{kind:"training",subjectId:"portuguese",sessionId:"p",total:3,focusKey:"pt",at:at+1000});

    const all=demoLeaderboard(state,{scope:"league",at});
    const math=demoLeaderboard(state,{scope:"league",at,subjectId:"math-a"});
    const portuguese=demoLeaderboard(state,{scope:"league",at,subjectId:"portuguese"});

    const identities=rows=>rows.filter(row=>!row.self).map(row=>[row.id,row.nickname]).sort((a,b)=>a[0].localeCompare(b[0]));
    expect(identities(math)).toEqual(identities(all));
    expect(identities(portuguese)).toEqual(identities(all));
    expect(math.find(row=>row.self)?.xp).toBe(40);
    expect(portuguese.find(row=>row.self)?.xp).toBe(24);
  });
});
