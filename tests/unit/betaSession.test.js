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
