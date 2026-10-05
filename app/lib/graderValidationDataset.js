export const GRADER_VALIDATION_DATASET_SCHEMA="aplus-grader-validation-dataset-v1";
export const GRADER_VALIDATION_STORAGE_KEY="aplus-grader-validation-local-v1";
export const VALIDATION_SOURCES=["synthetic","closed_beta_real"];
export const VALIDATION_SPLITS=["calibration","holdout"];

function hashText(text){
  let h=2166136261;
  for(let i=0;i<String(text).length;i++){
    h^=String(text).charCodeAt(i);
    h=Math.imul(h,16777619);
  }
  return (h>>>0).toString(16).padStart(8,"0");
}

function cleanText(value,max=12000){return String(value??"").slice(0,max)}

export function graderValidationCaseFingerprint(row){
  return hashText([
    row.schema,row.source,row.split,row.subject,row.response_family,row.item_id,
    row.question,row.student_response,row.max_points
  ].join("|"));
}

export function makeGraderValidationCase({
  source="closed_beta_real",split="calibration",subject,responseFamily,itemId,
  question,response,maxPoints=100,graderSnapshot=null,occurredAt=Date.now()
}={}){
  if(!VALIDATION_SOURCES.includes(source))throw new Error("VALIDATION_SOURCE_INVALID");
  if(!VALIDATION_SPLITS.includes(split))throw new Error("VALIDATION_SPLIT_INVALID");
  if(!subject||!itemId)throw new Error("VALIDATION_CASE_IDENTITY_REQUIRED");
  const studentResponse=cleanText(typeof response==="string"?response:JSON.stringify(response));
  const caseId=`gv-${subject}-${itemId}-${hashText(`${studentResponse}|${occurredAt}`)}`;
  const row={
    schema:GRADER_VALIDATION_DATASET_SCHEMA,
    case_id:caseId,
    source,
    split,
    subject,
    response_family:responseFamily||"unknown",
    item_id:String(itemId),
    question:cleanText(question),
    student_response:studentResponse,
    max_points:Number(maxPoints)||100,
    occurred_at:new Date(occurredAt).toISOString(),
    // Hidden from blind teacher exports. No name/email/profile is stored here.
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

export function appendClosedBetaValidationCase(row,{consent=false}={}){
  if(!consent)return {ok:false,code:"VALIDATION_CONSENT_REQUIRED",count:loadLocalValidationDataset().length};
  if(row?.source!=="closed_beta_real")return {ok:false,code:"REAL_BETA_SOURCE_REQUIRED",count:loadLocalValidationDataset().length};
  if(typeof localStorage==="undefined")return {ok:false,code:"LOCAL_STORAGE_UNAVAILABLE",count:0};
  const current=loadLocalValidationDataset();
  const byId=new Map(current.map(x=>[x.case_id,x]));
  byId.set(row.case_id,row);
  const next=[...byId.values()];
  localStorage.setItem(GRADER_VALIDATION_STORAGE_KEY,JSON.stringify(next));
  return {ok:true,count:next.length};
}

export function clearLocalValidationDataset(){
  if(typeof localStorage==="undefined")return false;
  localStorage.removeItem(GRADER_VALIDATION_STORAGE_KEY);
  return true;
}

export function exportBlindTeacherPack(rows=[]){
  return {
    schema:"aplus-grader-teacher-pack-v1",
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
