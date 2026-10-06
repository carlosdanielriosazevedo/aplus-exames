export const GRADER_VALIDATION_CONSENT_VERSION="2026-10-06-v1";
export const GRADER_VALIDATION_CONSENT_KEY="aplus-grader-validation-consent-v1";
export const GRADER_VALIDATION_PARTICIPANT_KEY="aplus-grader-validation-participant-v1";

function randomToken(){
  if(typeof crypto!=="undefined"&&crypto.getRandomValues){
    const bytes=new Uint8Array(12);crypto.getRandomValues(bytes);
    return [...bytes].map(x=>x.toString(16).padStart(2,"0")).join("");
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,14)}`;
}

export function currentGraderValidationConsent(){
  if(typeof localStorage==="undefined")return {granted:false,version:GRADER_VALIDATION_CONSENT_VERSION,decidedAt:null};
  try{
    const row=JSON.parse(localStorage.getItem(GRADER_VALIDATION_CONSENT_KEY)||"null");
    return row?.version===GRADER_VALIDATION_CONSENT_VERSION&&row?.granted===true
      ?row
      :{granted:false,version:GRADER_VALIDATION_CONSENT_VERSION,decidedAt:row?.decidedAt||null};
  }catch{return {granted:false,version:GRADER_VALIDATION_CONSENT_VERSION,decidedAt:null}}
}

export function setGraderValidationConsent(granted){
  if(typeof localStorage==="undefined")return {granted:false,version:GRADER_VALIDATION_CONSENT_VERSION,decidedAt:null};
  const row={granted:granted===true,version:GRADER_VALIDATION_CONSENT_VERSION,decidedAt:new Date().toISOString()};
  localStorage.setItem(GRADER_VALIDATION_CONSENT_KEY,JSON.stringify(row));
  return row;
}

export function graderValidationParticipantId(){
  if(typeof localStorage==="undefined")return null;
  let value=localStorage.getItem(GRADER_VALIDATION_PARTICIPANT_KEY);
  if(!value){value=`gvp-${randomToken()}`;localStorage.setItem(GRADER_VALIDATION_PARTICIPANT_KEY,value)}
  return value;
}

export function clearGraderValidationConsent(){
  if(typeof localStorage==="undefined")return false;
  localStorage.removeItem(GRADER_VALIDATION_CONSENT_KEY);
  return true;
}
