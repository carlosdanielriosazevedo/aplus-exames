import {describe,expect,it} from "vitest";
import {safeCloudMerge} from "../../app/lib/cloudReliability.js";

function progress(overrides={}){
  return {
    subjectId:"physics-chemistry-a",
    version:4,
    diagnosticDone:false,
    diagnosticCompletedAt:null,
    sessions:[],
    missionHistory:[],
    competence:{},
    errorPatterns:{},
    errorMemoryVersion:1,
    lastPosition:null,
    lastActivityAt:0,
    ...overrides
  };
}

function state(subjectProgress){
  return {xp:0,scores:{},missionHistory:[],examHistory:[],freeTrainingSignals:[],learningHypotheses:[],subjectProgress,subjectProgressModelVersion:4};
}

describe("launch state torture · multi-device subject progress",()=>{
  it("keeps progress that exists only on the remote device",()=>{
    const remote=state({"physics-chemistry-a":progress({diagnosticDone:true,lastActivityAt:200,sessions:[{sessionId:"remote-1",kind:"diagnostic",completedAt:200}]})});
    const combined=safeCloudMerge(state({}),remote);
    expect(combined.subjectProgress["physics-chemistry-a"].diagnosticDone).toBe(true);
    expect(combined.subjectProgress["physics-chemistry-a"].sessions.map(x=>x.sessionId)).toContain("remote-1");
  });

  it("unions completed session history from both devices",()=>{
    const local=state({"physics-chemistry-a":progress({lastActivityAt:300,sessions:[{sessionId:"local-1",completedAt:300}]})});
    const remote=state({"physics-chemistry-a":progress({lastActivityAt:200,sessions:[{sessionId:"remote-1",completedAt:200}]})});
    const combined=safeCloudMerge(local,remote);
    expect(combined.subjectProgress["physics-chemistry-a"].sessions.map(x=>x.sessionId).sort()).toEqual(["local-1","remote-1"]);
  });

  it("does not resurrect an older paused session after a newer device completed work",()=>{
    const local=state({"physics-chemistry-a":progress({lastActivityAt:500,lastPosition:null,sessions:[{sessionId:"done-new",completedAt:500}]})});
    const remote=state({"physics-chemistry-a":progress({lastActivityAt:300,lastPosition:{sessionId:"pause-old",kind:"training",current:3,updatedAt:300}})});
    const combined=safeCloudMerge(local,remote);
    expect(combined.subjectProgress["physics-chemistry-a"].lastPosition).toBeNull();
  });

  it("keeps the genuinely newest paused session including an unsubmitted answer",()=>{
    const local=state({"physics-chemistry-a":progress({lastActivityAt:300,lastPosition:null})});
    const remote=state({"physics-chemistry-a":progress({lastActivityAt:600,lastPosition:{sessionId:"pause-new",kind:"training",current:2,currentAnswer:"texto ainda não submetido",updatedAt:600}})});
    const combined=safeCloudMerge(local,remote);
    expect(combined.subjectProgress["physics-chemistry-a"].lastPosition?.sessionId).toBe("pause-new");
    expect(combined.subjectProgress["physics-chemistry-a"].lastPosition?.currentAnswer).toBe("texto ainda não submetido");
  });

  it("never exposes a pause for a session already completed on either device",()=>{
    const local=state({"physics-chemistry-a":progress({lastActivityAt:700,lastPosition:{sessionId:"same-session",kind:"mission",current:6,updatedAt:700}})});
    const remote=state({"physics-chemistry-a":progress({lastActivityAt:650,lastPosition:null,sessions:[{sessionId:"same-session",kind:"mission",completedAt:650}]})});
    const combined=safeCloudMerge(local,remote);
    expect(combined.subjectProgress["physics-chemistry-a"].lastPosition).toBeNull();
    expect(combined.subjectProgress["physics-chemistry-a"].sessions).toHaveLength(1);
  });

  it("keeps separate Portuguese and FQ A progress instead of letting the local map overwrite remote subjects",()=>{
    const local=state({portuguese:progress({subjectId:"portuguese",lastActivityAt:400,sessions:[{sessionId:"pt-1",completedAt:400}]})});
    const remote=state({"physics-chemistry-a":progress({lastActivityAt:450,sessions:[{sessionId:"fqa-1",completedAt:450}]})});
    const combined=safeCloudMerge(local,remote);
    expect(Object.keys(combined.subjectProgress).sort()).toEqual(["physics-chemistry-a","portuguese"]);
  });
});
