const PREFIX="applus:fqa-exam-draft:v1:";

function storage(){
  if(typeof window==="undefined")return null;
  try{return window.localStorage}catch{return null}
}

export function loadPhysicsChemistryExamDraft(examId,itemIds=[]){
  const store=storage();
  if(!store)return null;
  try{
    const raw=store.getItem(PREFIX+examId);
    if(!raw)return null;
    const draft=JSON.parse(raw);
    if(draft?.version!==1||draft?.examId!==examId)return null;
    if(JSON.stringify(draft.itemIds)!==JSON.stringify(itemIds))return null;
    return draft;
  }catch{return null}
}

export function savePhysicsChemistryExamDraft(examId,{itemIds,index,answers,startedAt,review=false,rubricAssessments={}}){
  const store=storage();
  if(!store)return;
  const payload={version:1,examId,itemIds,index,answers,startedAt,review:!!review,rubricAssessments,updatedAt:Date.now()};
  try{store.setItem(PREFIX+examId,JSON.stringify(payload))}catch{}
}

export function clearPhysicsChemistryExamDraft(examId){
  const store=storage();
  try{store?.removeItem(PREFIX+examId)}catch{}
}

export function physicsChemistryDraftAgeLabel(updatedAt){
  if(!Number.isFinite(Number(updatedAt)))return "";
  const minutes=Math.max(0,Math.round((Date.now()-Number(updatedAt))/60000));
  if(minutes<1)return "guardado agora";
  if(minutes===1)return "guardado há 1 min";
  if(minutes<60)return "guardado há "+minutes+" min";
  const hours=Math.round(minutes/60);
  return "guardado há "+hours+" h";
}
