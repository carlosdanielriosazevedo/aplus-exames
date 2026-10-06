export const GRADER_VALIDATION_DATASET_SCHEMA="aplus-grader-validation-dataset-v2";
export const GRADER_VALIDATION_STORAGE_KEY="aplus-grader-validation-local-v2";
export const VALIDATION_SOURCES=["synthetic","closed_beta_real"];
export const VALIDATION_SPLITS=["calibration","holdout"];
export const REAL_VALIDATION_HOLDOUT_PERCENT=20;

export function hashValidationText(text){
  let h=2166136261;
  for(let i=0;i<String(text).length;i++){
    h^=String(text).charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

function cleanText(value,max=12000){return String(value??"").slice(0,max)}

export function deterministicValidationSplit({participantId,subject,itemId,response}={}){
  if(!participantId||!subject||!itemId)throw new Error("VALIDATION_SPLIT_IDENTITY_REQUIRED");
  const bucket=parseInt(hashValidationText([participantId,subject,itemId,cleanText(response)].join("|")),16)%100;
  return bucket<REAL_VALIDATION_HOLDOUT_PERCENT?"holdout":"calibration";
}

export function graderValidationCaseFingerprint(row){
  return hashValidationText([
    row.schema,row.source,row.split,row.participant_id,row.subject,row.response_family,row.item_id,
    row.question,row.student_response,row.max_points,row.consent_version
  ].join("|"));
}

export function makeGraderValidationCase({
  source="closed_beta_real",split=null,participantId=null,subject,responseFamily,itemId,
  question,response,maxPoints=100,graderSnapshot=null,occurredAt=Date.now(),consentVersion=null
}={}){
  if(!VALIDATION_SOURCES.includes(source))throw new Error("VALIDATION_SOURCE_INVALID");
  if(!subject||!itemId)throw new Error("VALIDATION_CASE_IDENTITY_REQUIRED");
  const studentResponse=cleanText(typeof response==="string"?response:JSON.stringify(response));
  const real=source==="closed_beta_real";
  if(real&&(!participantId||!consentVersion))throw new Error("REAL_VALIDATION_CONSENT_IDENTITY_REQUIRED");
  const resolvedSplit=real
    ?deterministicValidationSplit({participantId,subject,itemId,response:studentResponse})
    :(VALIDATION_SPLITS.includes(split)?split:"calibration");
  const stableIdentity=[participantId||"synthetic",subject,itemId,studentResponse].join("|");
  const caseId=`gv-${subject}-${itemId}-${hashValidationText(stableIdentity)}`;
  const row={
    schema:GRADER_VALIDATION_DATASET_SCHEMA,
    case_id:caseId,
    source,
    split:resolvedSplit,
    participant_id:real?String(participantId):null,
    subject,
    response_family:responseFamily||"unknown",
    item_id:String(itemId),
    question:cleanText(question),
    student_response:studentResponse,
    max_points:Number(maxPoints)||100,
    occurred_at:new Date(occurredAt).toISOString(),
    consent_version:real?String(consentVersion):null,
    // Hidden from blind teacher exports. Never put account name/email/profile in this dataset.
    grader_snapshot:graderSnapshot||null,
    case_fingerprint:""
  };
  row.case_fingerprint=graderValidationCaseFingerprint(row);
  return row;
}

export function blindTeacherCase(row){
  return {
    schema:GRADER_VALIDATION_DATASET_SCHEMA,
    case_id:row.case_id,
    source:row.source,
    split:row.split,
    subject:row.subject,
    response_family:row.response_family,
    item_id:row.item_id,
    question:row.question,
    student_response:row.student_response,
    max_points:row.max_points,
    case_fingerprint:row.case_fingerprint,
    reviewer:"",
    decision:"",
    score_percent:"",
    diagnosis:"",
    requires_review:"",
    note:""
  };
}

export function calibrationCases(rows=[]){return rows.filter(row=>row.split==="calibration")}
export function holdoutCases(rows=[]){return rows.filter(row=>row.split==="holdout")}

export function thresholdTuningCases(rows=[]){
  if(rows.some(row=>row.split==="holdout"))throw new Error("HOLDOUT_MUST_NOT_TUNE_THRESHOLDS");
  return calibrationCases(rows);
}

export function loadLocalValidationDataset(){
  if(typeof localStorage==="undefined")return [];
  try{
    const parsed=JSON.parse(localStorage.getItem(GRADER_VALIDATION_STORAGE_KEY)||"[]");
    return Array.isArray(parsed)?parsed:[];
  }catch{return []}
}

export function appendClosedBetaValidationCase(row,{consent=false,consentVersion=null}={}){
  if(!consent||!consentVersion)return {ok:false,code:"VALIDATION_CONSENT_REQUIRED",count:loadLocalValidationDataset().length};
  if(row?.source!=="closed_beta_real")return {ok:false,code:"REAL_BETA_SOURCE_REQUIRED",count:loadLocalValidationDataset().length};
  if(row?.consent_version!==consentVersion)return {ok:false,code:"VALIDATION_CONSENT_VERSION_MISMATCH",count:loadLocalValidationDataset().length};
  const expectedSplit=deterministicValidationSplit({participantId:row.participant_id,subject:row.subject,itemId:row.item_id,response:row.student_response});
  if(row.split!==expectedSplit)return {ok:false,code:"VALIDATION_SPLIT_TAMPERED",count:loadLocalValidationDataset().length};
  if(row.case_fingerprint!==graderValidationCaseFingerprint(row))return {ok:false,code:"VALIDATION_FINGERPRINT_INVALID",count:loadLocalValidationDataset().length};
  if(typeof localStorage==="undefined")return {ok:false,code:"LOCAL_STORAGE_UNAVAILABLE",count:0};
  const current=loadLocalValidationDataset();
  const existing=current.find(x=>x.case_id===row.case_id);
  if(existing&&existing.split!==row.split)return {ok:false,code:"VALIDATION_SPLIT_IMMUTABLE",count:current.length};
  const byId=new Map(current.map(x=>[x.case_id,x]));
  byId.set(row.case_id,existing?{...row,split:existing.split,occurred_at:existing.occurred_at}:row);
  const next=[...byId.values()];
  localStorage.setItem(GRADER_VALIDATION_STORAGE_KEY,JSON.stringify(next));
  return {ok:true,count:next.length,split:row.split,caseId:row.case_id};
}

export function clearLocalValidationDataset(){
  if(typeof localStorage==="undefined")return false;
  localStorage.removeItem(GRADER_VALIDATION_STORAGE_KEY);
  return true;
}

export function exportBlindTeacherPack(rows=[]){
  return {
    schema:"aplus-grader-teacher-pack-v1",
    dataset_schema:GRADER_VALIDATION_DATASET_SCHEMA,
    exported_at:new Date().toISOString(),
    blind:true,
    cases:rows.map(blindTeacherCase)
  };
}

export function datasetReadiness(rows=[]){
  const real=rows.filter(row=>row.source==="closed_beta_real");
  const calibration=real.filter(row=>row.split==="calibration");
  const holdout=real.filter(row=>row.split==="holdout");
  const bySubject=subject=>({
    calibration:calibration.filter(row=>row.subject===subject).length,
    holdout:holdout.filter(row=>row.subject===subject).length
  });
  return {
    realCases:real.length,
    calibrationCases:calibration.length,
    holdoutCases:holdout.length,
    bySubject:{
      mathematics:bySubject("mathematics"),
      portuguese:bySubject("portuguese"),
      "physics-chemistry-a":bySubject("physics-chemistry-a")
    },
    phase1SanityReady:["mathematics","portuguese","physics-chemistry-a"].every(subject=>bySubject(subject).calibration>=50),
    humanValidated:false
  };
}
