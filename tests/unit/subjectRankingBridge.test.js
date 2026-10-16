import {describe,expect,it} from "vitest";
import {emptyCompetition,weeklyCompetitiveXp} from "../../app/lib/competition.js";
import {recordSubjectSession} from "../../app/lib/subjectProgress.js";

const at=(day,hour=12)=>new Date(2026,9,day,hour,0,0,0).getTime();
const items=Array.from({length:4},(_,index)=>({
  id:`item-${index+1}`,
  domain:"general",
  competencyId:`general-${index+1}`
}));
const answered={status:"final",final:true,correct:false,points:0,maxPoints:1,gradingMode:"deterministic"};
const unanswered={status:"unanswered",final:true,correct:null,points:0,maxPoints:1,gradingMode:"deterministic"};

function base(){
  return {profile:{schoolYear:"12.º"},competition:emptyCompetition(),subjectProgress:{},xp:0};
}

describe("subject progress → ranking competitivo",()=>{
  it("atribui a atividade à disciplina certa",()=>{
    const state=recordSubjectSession(base(),{
      subjectId:"portuguese",kind:"training",label:"Treino Livre",items,results:items.map(()=>answered),sessionId:"pt-training",completedAt:at(16)
    });
    expect(weeklyCompetitiveXp(state,at(16))).toBe(32);
    expect(weeklyCompetitiveXp(state,at(16),"portuguese")).toBe(32);
    expect(weeklyCompetitiveXp(state,at(16),"math-a")).toBe(0);
  });

  it("passa a percentagem efetivamente respondida do Exame Completo",()=>{
    const state=recordSubjectSession(base(),{
      subjectId:"physics-chemistry-a",kind:"full_exam",label:"Exame Completo · 715",items,
      results:[answered,answered,unanswered,unanswered],sessionId:"fqa-full-half",completedAt:at(16)
    });
    expect(weeklyCompetitiveXp(state,at(16))).toBe(60);
    expect(weeklyCompetitiveXp(state,at(16),"physics-chemistry-a")).toBe(60);
  });

  it("normaliza o alias practice_exam usado pelo Exame Completo de Português",()=>{
    const state=recordSubjectSession(base(),{
      subjectId:"portuguese",kind:"practice_exam",label:"Exame Completo · 639",items,
      results:items.map(()=>answered),sessionId:"pt-full",completedAt:at(16)
    });
    expect(weeklyCompetitiveXp(state,at(16),"portuguese")).toBe(120);
  });
});
