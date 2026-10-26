import {gradePhysicsChemistryResponse} from "./physicsChemistryEngine.js";

// Restoring an already submitted open response must never revive an earlier
// provisional score from the unsafe semantic grader. Do not treat the response
// as a new attempt just because its stored result is from a previous version.
export function restorePhysicsChemistrySubmittedResponse(item,snapshot,savedAnswer=null){
  if(!snapshot||item?.responseType!=="restricted-response")return snapshot??null;
  if(snapshot.status==="unanswered")return snapshot;

  const original=String(snapshot.responseText??savedAnswer??"").trim();
  if(original){
    const safe=gradePhysicsChemistryResponse(item,original);
    return safe.automaticScoringSuspended===true?safe:{
      status:"ungraded-awaiting-validation",final:false,correct:null,points:null,
      provisionalPoints:null,maxPoints:item.maxPoints||10,
      gradingMode:"criterion-reference-ungraded",responseText:original,
      rubricCompleted:true,requiresReview:true,automaticScoringSuspended:true,
      note:"A classificação anterior não foi recuperada por não estar validada. A tua resposta permanece bloqueada.",
      criteria:[],scoreExplainability:null,feedbackSummary:null
    };
  }
  // Legacy snapshot without an answer: preserve the submission lock, rather
  // than permitting a second attempt after viewing a prior assessment.
  return {
    status:"ungraded-awaiting-validation",final:false,correct:null,points:null,
    provisionalPoints:null,maxPoints:item.maxPoints||10,
    gradingMode:"criterion-reference-ungraded",responseText:"",
    rubricCompleted:true,requiresReview:true,automaticScoringSuspended:true,
    note:"Esta resposta foi submetida numa versão anterior, mas o texto não pôde ser recuperado. Para proteger a tentativa, não é possível voltar a responder.",
    criteria:[],scoreExplainability:null,feedbackSummary:null
  };
}
