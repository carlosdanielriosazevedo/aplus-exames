import {appendClosedBetaValidationCase,loadLocalValidationDataset,makeGraderValidationCase} from "./graderValidationDataset.js";

export const GRADER_VALIDATION_CONSENT_KEY="aplus-grader-validation-consent-v1";

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

export function capturePhysicsChemistryValidationCase({item,response,result}={}){
  if(!graderValidationConsent())return {ok:false,code:"VALIDATION_CONSENT_REQUIRED"};
  if(!item||!["restricted-response","stepwise"].includes(item.responseType))return {ok:false,code:"NOT_OPEN_RESPONSE"};
  if(alreadyCaptured({subject:"physics-chemistry-a",itemId:item.id,response}))return {ok:false,code:"ALREADY_CAPTURED"};
  const split=validationSplitForRealResponse({subject:"physics-chemistry-a",itemId:item.id,response});
  const row=makeGraderValidationCase({
    source:"closed_beta_real",
    split,
    subject:"physics-chemistry-a",
    responseFamily:item.responseType,
    itemId:item.id,
    question:item.prompt,
    response,
    maxPoints:item.maxPoints||10,
    graderSnapshot:{
      status:result?.status??null,
      final:result?.final??null,
      correct:result?.correct??null,
      points:result?.points??result?.provisionalPoints??null,
      maxPoints:result?.maxPoints??item.maxPoints??10,
      gradingMode:result?.gradingMode??item.gradingMode??null,
      reviewRequired:result?.reviewRequired??result?.requiresReview??null,
      diagnosis:result?.diagnosis??result?.errorDiagnosis?.code??null
    }
  });
  return appendClosedBetaValidationCase(row,{consent:true});
}
