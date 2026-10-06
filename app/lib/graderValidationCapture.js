import {appendClosedBetaValidationCase,loadLocalValidationDataset,makeGraderValidationCase} from "./graderValidationDataset.js";

export const GRADER_VALIDATION_CONSENT_KEY="aplus-grader-validation-consent-v1";
export const GRADER_VALIDATION_SUBJECTS=["mathematics","portuguese","physics-chemistry-a"];

function hashText(text){
  let h=2166136261;
  for(let i=0;i<String(text).length;i++){
    h^=String(text).charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return h>>>0;
}

export function graderValidationConsent(){
  if(typeof localStorage==="undefined")return false;
  return localStorage.getItem(GRADER_VALIDATION_CONSENT_KEY)==="accepted";
}

export function setGraderValidationConsent(accepted){
  if(typeof localStorage==="undefined")return false;
  localStorage.setItem(GRADER_VALIDATION_CONSENT_KEY,accepted?"accepted":"declined");
  return true;
}

export function validationSplitForRealResponse({subject,itemId,response}){
  const serialized=typeof response==="string"?response:JSON.stringify(response);
  return hashText(`${subject}|${itemId}|${serialized}`)%5===0?"holdout":"calibration";
}

function alreadyCaptured({subject,itemId,response}){
  const serialized=typeof response==="string"?String(response):JSON.stringify(response);
  return loadLocalValidationDataset().some(row=>row.source==="closed_beta_real"&&row.subject===subject&&row.item_id===String(itemId)&&row.student_response===serialized);
}

function normalizeSnapshot(result,item){
  return {
    status:result?.status??null,
    final:result?.final??null,
    correct:result?.correct??null,
    points:result?.points??result?.provisionalPoints??null,
    maxPoints:result?.maxPoints??item?.maxPoints??item?.points??100,
    gradingMode:result?.gradingMode??item?.gradingMode??null,
    reviewRequired:result?.reviewRequired??result?.requiresReview??null,
    diagnosis:result?.diagnosis??result?.errorDiagnosis?.code??result?.feedbackSummary?.errorDiagnosis?.code??null,
    confidence:result?.autoAssessmentConfidence??result?.classificationConfidence??null
  };
}

export function captureRealValidationCase({subject,item,response,result,responseFamily=null,question=null,maxPoints=null}={}){
  if(!graderValidationConsent())return {ok:false,code:"VALIDATION_CONSENT_REQUIRED"};
  if(!GRADER_VALIDATION_SUBJECTS.includes(subject))return {ok:false,code:"VALIDATION_SUBJECT_INVALID"};
  if(!item?.id)return {ok:false,code:"VALIDATION_ITEM_REQUIRED"};
  const family=responseFamily||item.responseType||item.response?.type||"unknown";
  const prompt=question||item.prompt||item.q||"";
  const resolvedMaxPoints=maxPoints??item.maxPoints??item.points??result?.maxPoints??100;
  if(alreadyCaptured({subject,itemId:item.id,response}))return {ok:false,code:"ALREADY_CAPTURED"};
  const split=validationSplitForRealResponse({subject,itemId:item.id,response});
  const row=makeGraderValidationCase({
    source:"closed_beta_real",
    split,
    subject,
    responseFamily:family,
    itemId:item.id,
    question:prompt,
    response,
    maxPoints:resolvedMaxPoints,
    graderSnapshot:normalizeSnapshot(result,{...item,maxPoints:resolvedMaxPoints})
  });
  return appendClosedBetaValidationCase(row,{consent:true});
}

export function capturePhysicsChemistryValidationCase({item,response,result}={}){
  if(!item||!["restricted-response","stepwise"].includes(item.responseType))return {ok:false,code:"NOT_OPEN_RESPONSE"};
  return captureRealValidationCase({subject:"physics-chemistry-a",item,response,result});
}

export function capturePortugueseValidationCase({item,response,result}={}){
  if(!item||["multiple-choice","short-answer"].includes(item.responseType))return {ok:false,code:"NOT_OPEN_RESPONSE"};
  return captureRealValidationCase({subject:"portuguese",item,response,result});
}

export function captureMathematicsValidationCase({item,response,result}={}){
  const type=item?.response?.type||item?.responseType||"choice";
  if(["choice","completion"].includes(type))return {ok:false,code:"NOT_OPEN_RESPONSE"};
  return captureRealValidationCase({subject:"mathematics",item,response,result,responseFamily:type,question:item.q,maxPoints:item.points});
}
