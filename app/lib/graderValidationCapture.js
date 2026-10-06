import {makeGraderValidationCase,appendClosedBetaValidationCase} from "./graderValidationDataset";
import {
  currentGraderValidationConsent,graderValidationParticipantId,GRADER_VALIDATION_CONSENT_VERSION
} from "./graderValidationConsent";
import {responseFamily,selectiveGradingDecision} from "./selectiveGrading";

function compactGraderSnapshot(graderResult={},selective=null){
  return {
    decision:selective?.decision||null,
    score_percent:selective?.scorePercent??graderResult.scorePercent??graderResult.score??null,
    policy_score:selective?.policyScore??null,
    response_family:selective?.responseFamily||null,
    reasons:selective?.reasons||[],
    definitive:selective?.definitive===true,
    requires_review:graderResult.requiresReview===true||selective?.decision==="abstain",
    diagnosis:graderResult.diagnosis||graderResult.errorDiagnosis?.code||null,
    semantic_score:graderResult.semanticScore??null,
    relation_score:graderResult.relationScore??null,
    coherence_score:graderResult.coherenceScore??null,
    substance_score:graderResult.substanceScore??null,
    ambiguity_score:graderResult.ambiguityScore??null,
    contradiction:graderResult.contradiction===true||graderResult.hasContradiction===true,
    matched_criteria_count:graderResult.matchedCriteriaCount??null,
    total_criteria_count:graderResult.totalCriteriaCount??null
  };
}

async function sendCaseToValidationBackend(row){
  try{
    const response=await fetch("/api/grader-validation/cases",{
      method:"POST",headers:{"content-type":"application/json"},
      body:JSON.stringify({schema:"aplus-grader-validation-capture-v1",consent:true,consentVersion:GRADER_VALIDATION_CONSENT_VERSION,case:row})
    });
    const body=await response.json().catch(()=>({}));
    return response.ok&&body?.ok?{ok:true,provider:body.provider||"backend"}:{ok:false,code:body?.code||`HTTP_${response.status}`};
  }catch{return {ok:false,code:"VALIDATION_BACKEND_UNAVAILABLE"}}
}

export async function captureRealGraderValidationCase({subject,item,question,response,graderResult,maxPoints=100}={}){
  const consent=currentGraderValidationConsent();
  if(!consent.granted)return {ok:false,code:"VALIDATION_CONSENT_REQUIRED"};
  const participantId=graderValidationParticipantId();
  if(!participantId)return {ok:false,code:"VALIDATION_PARTICIPANT_UNAVAILABLE"};
  const questionObject=item||question||{};
  const questionText=questionObject.prompt||questionObject.question||questionObject.text||String(question||"");
  const itemId=questionObject.id||questionObject.itemId;
  if(!itemId||!subject)return {ok:false,code:"VALIDATION_CASE_IDENTITY_REQUIRED"};
  const family=responseFamily(subject,questionObject);
  const selective=selectiveGradingDecision({subject,question:questionObject,graderResult:graderResult||{}});
  const row=makeGraderValidationCase({
    source:"closed_beta_real",participantId,subject,responseFamily:family,itemId,
    question:questionText,response,maxPoints,consentVersion:consent.version,
    graderSnapshot:compactGraderSnapshot(graderResult||{},selective)
  });
  const local=appendClosedBetaValidationCase(row,{consent:true,consentVersion:consent.version});
  if(!local.ok)return local;
  // Local-first: failure to reach the backend must never block the student's study flow.
  const remote=await sendCaseToValidationBackend(row);
  return {ok:true,caseId:row.case_id,split:row.split,local:true,remote:remote.ok,remoteCode:remote.code||null};
}
