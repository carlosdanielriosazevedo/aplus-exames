import {beginSubjectSession} from "../../app/lib/subjectProgress.js";
import {describe,expect,it} from "vitest";
import {betaEvent,sessionStart} from "../../app/lib/beta.js";
import {createDiagnosticDraft,validateDiagnosticDraft} from "../../app/lib/diagnosticRecovery.js";

describe("study session identity",()=>{
  it("returns a safe no-telemetry event object when pilot consent is absent",()=>{
    const event=betaEvent("diagnostic_finished",{sessionId:"must-not-leak"});
    expect(event).toEqual({type:"__telemetry_disabled__",at:0,payload:null});
  });

  it("creates a non-empty unique id for every runtime session",()=>{
    const first=sessionStart("diagnostic",{goal:17});
    const second=sessionStart("diagnostic",{goal:17});
    expect(typeof first.id).toBe("string");
    expect(first.id.length).toBeGreaterThan(12);
    expect(second.id).not.toBe(first.id);
    expect(first.kind).toBe("diagnostic");
  });

  it("produces a diagnostic draft that is immediately valid and recoverable by id",()=>{
    const session=sessionStart("diagnostic",{goal:17});
    const item={
      id:"diagnostic-session-id-test",
      themeId:"test-theme",
      subtopicId:null,
      microcompetencyId:null,
      focus:"teste",
      q:"Qual é a opção correta?",
      o:["A","B"],
      a:0,
      sol:"A",
      hyp:"",
      cognitive:"Aplicação",
      difficulty:2,
      signature:"diagnostic-session-id-test",
      role:"anchor",
      contexts:["diagnostic"]
    };
    const draft=createDiagnosticDraft({session,item,betaMode:"internal",difficulty:2,blueprint:["test-theme"]});
    expect(draft.sessionId).toBe(session.id);
    expect(draft.session.id).toBe(session.id);
    expect(validateDiagnosticDraft(draft).ok).toBe(true);
  });
});

describe("pending subject attempts cannot be replaced",()=>{
  for(const subjectId of ["portuguese","physics-chemistry-a"]){
    it(`${subjectId}: starting another assessment preserves the original attempt`,()=>{
      const initial={subjectProgress:{},subjectProgressModelVersion:4};
      const first=beginSubjectSession(initial,{subjectId,kind:"mission",label:"Missão",items:[{id:"Q-1"},{id:"Q-2"}],sessionId:"original",startedAt:1000});
      const interrupted={...first,subjectProgress:{...first.subjectProgress,[subjectId]:{...first.subjectProgress[subjectId],lastPosition:{...first.subjectProgress[subjectId].lastPosition,current:1,results:[{correct:false,final:true}],currentAnswer:"Resposta parcial"}}}};
      for(const kind of ["diagnostic","mission","training","mini_exam","full_exam"]){
        const attempted=beginSubjectSession(interrupted,{subjectId,kind,label:"Outra tentativa",items:[{id:"NEW-1"}],sessionId:"replacement",startedAt:2000});
        expect(attempted).toBe(interrupted);
        expect(attempted.subjectProgress[subjectId].lastPosition).toMatchObject({sessionId:"original",kind:"mission",current:1,currentAnswer:"Resposta parcial",itemIds:["Q-1","Q-2"]});
      }
    });
  }
});
