import {describe,expect,it} from "vitest";
import {effortXp} from "../../app/lib/competition.js";
import {beginSubjectSession,recordSubjectSession,evidenceWeight,evidenceExposureKey} from "../../app/lib/subjectProgress.js";

// AGENTS.md: o XP mede esforço/atividade, nunca conhecimento.
describe("XP por esforço",()=>{
  it("treino e mini-exame não dependem de acertos",()=>{
    expect(effortXp("training",{answered:5})).toBe(40);
    expect(effortXp("training",{answered:2})).toBe(16);
    expect(effortXp("mini_exam",{total:10,answered:10})).toBe(80);
    expect(effortXp("mini_exam",{total:5,answered:3})).toBe(40);
    expect(effortXp("mini_exam",{total:5,answered:0})).toBe(0);
  });

  for(const subjectId of ["portuguese","physics-chemistry-a"]){
    it(`${subjectId}: errar e acertar dão o mesmo XP`,()=>{
      const items=[{id:"Q1",domain:"general",competencyId:"general"},{id:"Q2",domain:"general",competencyId:"general"}];
      const run=(correct)=>{
        const base={subjectProgress:{},subjectProgressModelVersion:4,xp:0};
        const results=items.map(()=>({status:"final",final:true,correct,points:correct?1:0,maxPoints:1}));
        const started=beginSubjectSession(base,{subjectId,kind:"mini_exam",label:"Mini",sessionId:"s",items,startedAt:1});
        return recordSubjectSession(started,{subjectId,kind:"mini_exam",label:"Mini",items,results,sessionId:"s",completedAt:2});
      };
      expect(run(true).xp).toBe(run(false).xp);
      expect(run(true).xp).toBeGreaterThan(0);
    });
  }
});

describe("evidência repetida não conta como independente",()=>{
  it("cada repetição vale metade da anterior e variantes contam como a mesma pergunta",()=>{
    expect([0,1,2].map(evidenceWeight)).toEqual([1,.5,.25]);
    expect(evidenceExposureKey({id:"FQA-V-STO-V2"})).toBe(evidenceExposureKey({id:"FQA-V-STO-V5"}));
  });

  it("a mesma pergunta em duas sessões avaliativas pesa menos da segunda vez",()=>{
    const subjectId="portuguese";
    const items=[{id:"PT-REP-1",domain:"gramatica",competencyId:"pt-gram"}];
    const results=[{status:"final",final:true,correct:true,points:1,maxPoints:1}];
    let state={subjectProgress:{},subjectProgressModelVersion:4,xp:0};
    for(const sessionId of ["a","b"]){
      state=beginSubjectSession(state,{subjectId,kind:"mini_exam",label:"Mini",sessionId,items,startedAt:1});
      state=recordSubjectSession(state,{subjectId,kind:"mini_exam",label:"Mini",items,results,sessionId,completedAt:2});
    }
    const row=state.subjectProgress[subjectId].competence["pt-gram"];
    expect(row.deterministicAttempts).toBe(1.5);
    expect(row.correct).toBe(1.5);
  });
});

import {todaysMissionAssignment,assignDailyMission} from "../../app/lib/subjectProgress.js";
describe("Missão diária congelada e única",()=>{
  it("a primeira atribuição do dia fica e não é substituída",()=>{
    let state={subjectProgress:{},subjectProgressModelVersion:4};
    state=assignDailyMission(state,"portuguese",{day:"2026-11-17",itemIds:["A","B"],label:"Missão recomendada"});
    state=assignDailyMission(state,"portuguese",{day:"2026-11-17",itemIds:["C"],label:"Outra"});
    expect(todaysMissionAssignment(state,"portuguese","2026-11-17").itemIds).toEqual(["A","B"]);
    expect(todaysMissionAssignment(state,"portuguese","2026-11-18")).toBeNull();
  });
  it("uma segunda Missão no mesmo dia não acumula evidência académica",()=>{
    const subjectId="physics-chemistry-a";
    const items=[{id:"Q-M1",domain:"d",competencyId:"c1"}];
    const results=[{status:"final",final:true,correct:true,points:1,maxPoints:1}];
    let state={subjectProgress:{},subjectProgressModelVersion:4,xp:0};
    const at=Date.UTC(2026,10,17,12);
    for(const sessionId of ["m1","m2"]){
      state=beginSubjectSession(state,{subjectId,kind:"mission",label:"Missão",sessionId,items,startedAt:at});
      state=recordSubjectSession(state,{subjectId,kind:"mission",label:"Missão",items,results,sessionId,completedAt:at+1000});
    }
    expect(state.subjectProgress[subjectId].competence.c1.deterministicAttempts).toBe(1);
  });
});
