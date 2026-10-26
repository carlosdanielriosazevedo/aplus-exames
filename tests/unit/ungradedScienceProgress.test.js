import {test,expect} from "vitest";
import {advanceSubjectSession,beginSubjectSession,recordSubjectSession,subjectProgressFor} from "../../app/lib/subjectProgress.js";
import {gradePhysicsChemistryResponse} from "../../app/lib/physicsChemistryEngine.js";
import {PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS} from "../../app/data/physicsChemistryConstructed.js";

const item=PHYSICS_CHEMISTRY_A_CONSTRUCTED_ITEMS.find(row=>row.id==="FQA-R-MEC-01");
if(!item)throw Error("Missing FQA-R-MEC-01 fixture");

test("an ungraded scientific attempt remains pending and never becomes a completed review",()=>{
  const result=gradePhysicsChemistryResponse(item,"O declive não representa a aceleração.");
  expect(result).toMatchObject({final:false,points:null,provisionalPoints:null,requiresReview:true,automaticScoringSuspended:true});
  const initial={subjectProgress:{},subjectProgressModelVersion:4,xp:0};
  const done=recordSubjectSession(initial,{subjectId:"physics-chemistry-a",kind:"mini_exam",label:"teste de proteção",items:[item],results:[result],sessionId:"safe-pending-fqa",completedAt:1750000000000});
  const progress=subjectProgressFor(done,"physics-chemistry-a");
  const row=progress.competence[item.competencyId||item.domain+":general"];
  expect(row.attempts).toBe(1);
  expect(row.pendingRubrics).toBe(1);
  expect(row.rubricReviews).toBe(0);
  expect(row.rubricObserved).toBe(0);
  expect(row.rubricNeedsReview).toBe(1);
  expect(row.correct).toBe(0);
  expect(progress.sessions.at(-1).results[0]).toMatchObject({points:null,provisionalPoints:null,requiresReview:true,automaticScoringSuspended:true});
});

test("a pending scientific observation cannot erase previously validated evidence",()=>{
  const result=gradePhysicsChemistryResponse(item,"Um texto incompleto que não pode ser pontuado automaticamente.");
  const id=item.competencyId||item.domain+":general";
  const baseline={
    subjectProgress:{
      "physics-chemistry-a":{
        competence:{
          [id]:{
            attempts:1,rubricReviews:1,rubricObserved:1,pendingRubrics:0,
            rubricEvidenceByObservation:{"acceleration-slope":{status:"observed",studentEvidence:["evidência anterior"]}}
          }
        }
      }
    },xp:0
  };
  const done=recordSubjectSession(baseline,{subjectId:"physics-chemistry-a",kind:"mini_exam",label:"teste",items:[item],results:[result],sessionId:"pending-after-reviewed",completedAt:1750000000010});
  const row=subjectProgressFor(done,"physics-chemistry-a").competence[id];
  expect(row.rubricReviews).toBe(1);
  expect(row.pendingRubrics).toBe(1);
  expect(row.rubricObserved).toBe(1);
  expect(row.rubricEvidenceByObservation["acceleration-slope"]).toMatchObject({status:"observed",studentEvidence:["evidência anterior"]});
});

test("resumed ungraded response preserves its safety marker without assigning a score",()=>{
  const result=gradePhysicsChemistryResponse(item,"A aceleração não é o declive do gráfico.");
  const original=beginSubjectSession({subjectProgress:{}},{subjectId:"physics-chemistry-a",kind:"mission",items:[item],sessionId:"pending-fqa-restart",startedAt:1750000000050});
  const saved=advanceSubjectSession(original,"physics-chemistry-a",{sessionId:"pending-fqa-restart",current:0,results:[result],currentResult:result,currentAnswer:result.responseText,updatedAt:1750000000060});
  const resumed=subjectProgressFor(saved,"physics-chemistry-a").lastPosition;
  expect(resumed.currentResult).toMatchObject({final:false,points:null,provisionalPoints:null,automaticScoringSuspended:true,requiresReview:true});
});
