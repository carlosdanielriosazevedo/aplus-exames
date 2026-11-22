import {loadAllSessionDrafts} from "./sessionLanes.js";
import {pendingPhysicsChemistryExam} from "./physicsChemistryExamDraft.js";

// Incoming progress must never replace the local attempt or its academic baseline.
export function hasPendingAssessment(state){
  if(Object.values(state?.subjectProgress||{}).some(row=>row?.lastPosition))return true;
  if(state?.subjectSettings?.portuguese?.miniExamDraft)return true;
  const math=loadAllSessionDrafts(state?.betaMode||"internal");
  return math.error||math.drafts.length>0||!!pendingPhysicsChemistryExam();
}

export function preservePendingAssessment(current,incoming){
  return hasPendingAssessment(current)?current:incoming;
}
