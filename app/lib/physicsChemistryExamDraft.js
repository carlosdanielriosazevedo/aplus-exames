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

export function savePhysicsChemistryExamDraft(examId,{itemIds,index,answers,startedAt,review=false,rubricAssessments={},markedForReview=[]}){
  const store=storage();
  if(!store)return;
  // O relógio pertence à tentativa original; nunca reiniciar ao guardar uma sessão retomada.
  const existing=loadPhysicsChemistryExamDraft(examId,itemIds);
  const preservedStart=Number.isFinite(existing?.startedAt)?existing.startedAt:startedAt;
  const payload={version:1,examId,itemIds,index,answers,startedAt:preservedStart,review:!!review,rubricAssessments,markedForReview:Array.from(new Set(markedForReview)).filter(id=>itemIds.includes(id)),updatedAt:Date.now()};
  try{
    const raw=store.getItem(PREFIX+examId);
    if(raw){
      const pending=JSON.parse(raw);
      if(pending.version!==1||JSON.stringify(pending.itemIds)!==JSON.stringify(itemIds))return false;
    }
    store.setItem(PREFIX+examId,JSON.stringify(payload));return true;
  }catch{return false}
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

export function pendingPhysicsChemistryExam(){
  const store=storage();
  if(!store)return null;
  for(const [examId,route] of [["fqa-mini-1","physicsChemistryMini1"],["fqa-mini-2","physicsChemistryMini2"],["fqa-full-715","physicsChemistryExam"]]){
    try{if(store.getItem(PREFIX+examId))return {examId,route}}catch{return {error:true}}
  }
  return null;
}

export function hasPhysicsChemistryExamDraft(examId){
  try{return !!storage()?.getItem(PREFIX+examId)}catch{return true}
}
