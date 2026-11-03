import {describe,it,expect,vi} from "vitest";
vi.mock("@neondatabase/neon-js",()=>({createClient:()=>null}));
vi.mock("@neondatabase/neon-js/auth",()=>({createInternalNeonAuth:()=>null}));
vi.mock("@neondatabase/neon-js/auth/react/adapters",()=>({BetterAuthReactAdapter:()=>null}));
import {emptyScores,applyMiniExam,recordLearningHypothesis,refreshLearningHypotheses,dailyMissionPlan} from "../../app/lib/engine.js";
import {beginSubjectSession,advanceSubjectSession,recordSubjectSession} from "../../app/lib/subjectProgress.js";
import {ensureDailyMissionAssignment} from "../../app/lib/dailyMission.js";
import {studentStateForCloud} from "../../app/lib/cloud.js";
import {validateCloudWrite} from "../../app/lib/server/cloud-state-validation.js";
import {safeCloudMerge} from "../../app/lib/cloudStateMerge.js";
const base=()=>({xp:0,goal:15,profile:{schoolYear:"12.º",optionalTopics:[]},scores:emptyScores(),subjectProgress:{},missionHistory:[],examHistory:[],freeTrainingSignals:[],learningHypotheses:[]});
const themeId=Object.keys(emptyScores())[0];
function accepted(state){const wire=studentStateForCloud(state);expect(validateCloudWrite({operation:"insert",expectedRevision:0,state:wire})).toMatchObject({ok:true});expect(()=>safeCloudMerge(state,wire)).not.toThrow();return wire;}
describe("F7 compatibility with real snapshot producers",()=>{
  it("serializes a real engine mini-exam with answer privacy and grade preservation",()=>{
    const question={id:"synthetic-math-item",themeId,responseType:"multiple-choice",answerIndex:0,maxPoints:5,difficulty:2};
    const completed=applyMiniExam(base(),[question],[0],30),wire=accepted(completed);
    expect(completed.lastExam.answers).toEqual([0]);expect(wire.lastExam.answers).toBeUndefined();expect(wire.examHistory[0].score20).toBe(completed.lastExam.score20);
  });
  it.each([null,{themeId,focus:"synthetic focus",ratio:.9,at:1000,confirmed:false,originSessionId:"synthetic-training"}])("accepts the completed Mission signal format %j without weakening numeric evidence",signal=>{
    // clientApp's Mission completion stores plan.signal || null, unlike the
    // numeric signal created by applyEvidence. Keep both contracts distinct.
    const history={type:"confirmation",themeId,focus:"synthetic focus",at:1001,completionId:"synthetic-mission",totalCount:5};
    const state={...base(),missionHistory:[history],lastMission:{...history,signal},freeTrainingSignals:signal?[signal]:[]};
    const wire=accepted(state);expect(wire.lastMission.signal).toEqual(signal);
    const bad={...wire,scores:{[themeId]:{evidence:[{signal:{ratio:.9}}]}}};
    expect(validateCloudWrite({operation:"insert",expectedRevision:0,state:bad}).ok).toBe(false);
  });
  it("accepts causal hypotheses and frozen daily plans from the current engine",()=>{
    const event={targetThemeId:themeId,targetFocus:"synthetic target",dependency:{themeId,focus:"synthetic base"},verdict:{code:"prerequisite_suspected"},at:1000};
    const state=base();state.learningHypotheses=recordLearningHypothesis([],event);
    const refreshed=refreshLearningHypotheses(state,1001);accepted(refreshed);
    accepted(ensureDailyMissionAssignment(refreshed,dailyMissionPlan(refreshed),1001));
  });
  it.each(["portuguese","physics-chemistry-a"])("accepts unfinished and completed %s sessions without losing responses",subjectId=>{
    const item={id:"synthetic-item",domain:"synthetic",competencyId:"synthetic-competence"};
    const result={status:"final",final:true,correct:true,points:5,maxPoints:5,responseText:"synthetic answer"};
    let state=beginSubjectSession(base(),{subjectId,kind:"mini_exam",label:"Synthetic exam",items:[item],sessionId:"synthetic-attempt",startedAt:1000});
    state=advanceSubjectSession(state,subjectId,{sessionId:"synthetic-attempt",current:0,results:[],currentResult:result,currentAnswer:"synthetic unfinished answer",updatedAt:1001});
    const wire=accepted(state);expect(wire.subjectProgress[subjectId].lastPosition.currentAnswer).toBeUndefined();
    expect(state.subjectProgress[subjectId].lastPosition.currentAnswer).toBe("synthetic unfinished answer");
    state=recordSubjectSession(state,{subjectId,kind:"mini_exam",label:"Synthetic exam",items:[item],results:[result],sessionId:"synthetic-attempt",completedAt:1002});accepted(state);
    expect(state.subjectProgress[subjectId].sessions[0].results[0].responseText).toBe("synthetic answer");
  });
  it("accepts human rubric records with nested observations and revisions",()=>{
    const item={id:"synthetic-rubric",domain:"synthetic",competencyId:"synthetic-competence"};
    const result={status:"pending",final:false,correct:null,rubricCompleted:true,responseText:"synthetic draft",previousResponseText:"synthetic previous draft",criteria:[{id:"c1",observations:[{id:"o1",status:"observed",studentEvidence:["synthetic excerpt"]}]}],revisionHistory:[{revision:1,responseText:"synthetic previous draft",rubricCompleted:true,rubricObservationEvidence:[{criterionId:"c1",observationId:"o1",evidence:"observed",studentEvidence:["synthetic excerpt"]}]}]};
    const state=recordSubjectSession(base(),{subjectId:"portuguese",kind:"mini_exam",label:"Synthetic rubric",items:[item],results:[result],sessionId:"synthetic-rubric-attempt",completedAt:1000});
    const wire=accepted(state);expect(JSON.stringify(wire)).not.toContain("synthetic draft");expect(state.subjectProgress.portuguese.sessions[0].results[0].responseText).toBe("synthetic draft");
  });
});
