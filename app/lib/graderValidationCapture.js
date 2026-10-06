import {makeGraderValidationCase,appendClosedBetaValidationCase} from "./graderValidationDataset";
import {
  currentGraderValidationConsent,graderValidationParticipantId,GRADER_VALIDATION_CONSENT_VERSION
} from "./graderValidationConsent";
import {responseFamily,selectiveGradingDecision} from "./selectiveGrading";

const mean=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
const number=value=>Number.isFinite(Number(value))?Number(value):null;

export function normalizeGraderResultForValidation(graderResult={}){
  const criteria=Array.isArray(graderResult.criteria)?graderResult.criteria:[];
  const observations=criteria.flatMap(row=>Array.isArray(row.observations)?row.observations:[]);
  const ratios=observations.map(row=>number(row.scoreRatio)).filter(x=>x!==null);
  const semantics=observations.map(row=>number(row.semanticScore)).filter(x=>x!==null);
  const matched=observations.filter(row=>row.status==="observed").length;
  const total=observations.length||criteria.length||null;
  const max=number(graderResult.maxPoints);
  const rawPoints=number(graderResult.scorePercent??graderResult.score_percent??graderResult.score);
  const earned=number(graderResult.points??graderResult.provisionalPoints);
  const scorePercent=rawPoints!==null
    ?(rawPoints<=1?rawPoints*100:rawPoints)
    :(earned!==null&&max?earned/max*100:null);
  const contradiction=observations.some(row=>row.contradictionDetected===true)||graderResult.contradiction===true||graderResult.hasContradiction===true;
  const ambiguity=observations.some(row=>row.ambiguityDetected===true)||graderResult.requiresReview===true;
  return {
    ...graderResult,
    scorePercent,
    semanticScore:number(graderResult.semanticScore)??mean(semantics)??mean(ratios)??0.5,
    relationScore:number(graderResult.relationScore)??mean(ratios)??0.5,
    coherenceScore:number(graderResult.coherenceScore)??(contradiction?0.25:0.8),
    substanceScore:number(graderResult.substanceScore)??(total?Math.min(1,(matched+observations.filter(row=>row.status==="partial").length*0.5)/total):0.6),
    ambiguityScore:number(graderResult.ambiguityScore)??(ambiguity?0.6:0.05),
    contradiction,
    matchedCriteriaCount:number(graderResult.matchedCriteriaCount)??matched,
    totalCriteriaCount:number(graderResult.totalCriteriaCount)??total,
    requiresReview:graderResult.requiresReview===true||ambiguity
  };
}

function compactGraderSnapshot(graderResult={},selective=null){
  return {
    decision:selective?.decision||null,
    score_percent:selective?.scorePercent??graderResult.scorePercent??null,
    policy_score:selective?.policyScore??null,
    response_family:selective?.responseFamily||null,
    reasons:selective?.reasons||[],
    definitive:selective?.definitive===true,
    requires_review:graderResult.requiresReview===true||selective?.decision==="abstain",
    diagnosis:graderResult.diagnosis||graderResult.errorDiagnosis?.code||graderResult.feedbackSummary?.errorDiagnosis?.code||null,
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
  const normalized=normalizeGraderResultForValidation(graderResult||{});
  const family=responseFamily(subject,questionObject);
  const selective=selectiveGradingDecision({subject,question:questionObject,graderResult:normalized});
  const row=makeGraderValidationCase({
    source:"closed_beta_real",participantId,subject,responseFamily:family,itemId,
    question:questionText,response,maxPoints:maxPoints||normalized.maxPoints||100,consentVersion:consent.version,
    graderSnapshot:compactGraderSnapshot(normalized,selective)
  });
  const local=appendClosedBetaValidationCase(row,{consent:true,consentVersion:consent.version});
  if(!local.ok)return local;
  // Local-first: failure to reach the backend must never block the student's study flow.
  const remote=await sendCaseToValidationBackend(row);
  return {ok:true,caseId:row.case_id,split:row.split,local:true,remote:remote.ok,remoteCode:remote.code||null};
}
