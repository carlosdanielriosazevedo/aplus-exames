import {physicsChemistryAssessmentSummary} from "./physicsChemistryRubric.js";

export function physicsChemistryOpenReviewStatus(item,value,assessment={}){
  if(item?.responseType!=="restricted-response")return null;
  if(!String(value??"").trim())return {answered:false,complete:true,label:"Sem resposta"};
  const summary=physicsChemistryAssessmentSummary(item,assessment);
  return {answered:true,complete:summary.complete,label:summary.complete?"Revisão concluída":"Por rever",summary};
}

export function physicsChemistryOpenReviewProgress(items=[],answers={},assessments={}){
  const rows=items
    .filter(item=>item.responseType==="restricted-response")
    .map(item=>({item,status:physicsChemistryOpenReviewStatus(item,answers[item.id],assessments[item.id]||{})}))
    .filter(row=>row.status?.answered);
  const complete=rows.filter(row=>row.status.complete).length;
  return {total:rows.length,complete,pending:rows.length-complete,rows};
}
