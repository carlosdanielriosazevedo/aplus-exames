import {describe,expect,it} from "vitest";
import {reconcileDiagnosticRuntimeSessions} from "../../app/lib/diagnosticRuntime.js";

describe("diagnostic runtime session reconciliation",()=>{
  it("removes orphan open diagnostics before starting a new diagnostic",()=>{
    const finished={id:"done",kind:"diagnostic",finishedAt:10};
    const mission={id:"mission",kind:"mission"};
    const state={betaSessions:[{id:"orphan",kind:"diagnostic"},finished,mission]};
    const next=reconcileDiagnosticRuntimeSessions(state);
    expect(next.betaSessions).toEqual([finished,mission]);
  });

  it("keeps exactly one open session for the draft being recovered",()=>{
    const state={betaSessions:[
      {id:"stale",kind:"diagnostic"},
      {id:"current",kind:"diagnostic"},
      {id:"current",kind:"diagnostic"},
      {id:"finished",kind:"diagnostic",finishedAt:20}
    ]};
    const next=reconcileDiagnosticRuntimeSessions(state,"current");
    expect(next.betaSessions).toEqual([
      {id:"current",kind:"diagnostic"},
      {id:"finished",kind:"diagnostic",finishedAt:20}
    ]);
  });

  it("preserves object identity when there is nothing to reconcile",()=>{
    const state={betaSessions:[{id:"current",kind:"diagnostic"},{id:"mission",kind:"mission"}]};
    expect(reconcileDiagnosticRuntimeSessions(state,"current")).toBe(state);
  });
});
