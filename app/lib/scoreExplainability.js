export const SCORE_EXPLAINABILITY_SCHEMA="aplus-score-explainability-v1";

const round1=value=>Math.round((Number(value)||0)*10)/10;
const finite=value=>Number.isFinite(Number(value));

function reasonForRow(row={}){
  if(row.lossReason)return String(row.lossReason);
  if(row.contradictionDetected)return "Foi detetada uma contradição relevante neste critério.";
  if(row.ambiguityDetected)return "A formulação ficou ambígua neste critério.";
  if(row.status==="partial")return "Este critério foi cumprido apenas em parte.";
  if(row.status==="not-observed")return "Este critério não ficou demonstrado na resposta.";
  if(row.status==="unsure"||row.status==="needs_review")return "O corretor não tem evidência suficiente para atribuir a pontuação máxima neste critério.";
  if(row.note)return String(row.note);
  if(row.reason)return String(row.reason).replace(/_/g," ");
  return "A resposta não demonstrou integralmente o que este critério exigia.";
}

export function criterionPointRows(criteria=[]){
  return (criteria||[]).map((criterion,index)=>{
    const maximum=finite(criterion.points)?Number(criterion.points):null;
    let awarded=finite(criterion.awardedPoints)?Number(criterion.awardedPoints):null;
    if(awarded===null&&maximum!==null){
      if(criterion.status==="observed"||criterion.status==="correct")awarded=maximum;
      else if(finite(criterion.scoreRatio))awarded=maximum*Number(criterion.scoreRatio);
      else if(criterion.status==="partial")awarded=maximum*.5;
      else awarded=0;
    }
    return {
      id:criterion.id||`criterion-${index+1}`,
      label:criterion.label||criterion.title||`Critério ${index+1}`,
      status:criterion.status||null,
      awardedPoints:awarded===null?null:round1(awarded),
      maxPoints:maximum===null?null:round1(maximum),
      lostPoints:awarded===null||maximum===null?null:round1(Math.max(0,maximum-awarded)),
      reason:reasonForRow(criterion)
    };
  });
}

export function stepPointRows(steps=[]){
  return (steps||[]).map((step,index)=>{
    const maximum=finite(step.maxPoints)?Number(step.maxPoints):0;
    const awarded=finite(step.points)?Number(step.points):0;
    return {
      id:step.id||step.stepId||`step-${index+1}`,
      label:step.label||step.id||step.stepId||`Etapa ${index+1}`,
      status:step.status||null,
      awardedPoints:round1(awarded),
      maxPoints:round1(maximum),
      lostPoints:round1(Math.max(0,maximum-awarded)),
      reason:reasonForRow(step)
    };
  });
}

export function buildScoreExplainability({awardedPoints,maxPoints,criteria=[],steps=[],globalPenalty=0,globalPenaltyReason=null,requiresReview=false}={}){
  const awarded=finite(awardedPoints)?round1(Number(awardedPoints)):null;
  const maximum=finite(maxPoints)?round1(Number(maxPoints)):null;
  const rows=criteria?.length?criterionPointRows(criteria):stepPointRows(steps);
  const penalty=finite(globalPenalty)?round1(Math.max(0,Number(globalPenalty))):0;
  const lost=awarded===null||maximum===null?null:round1(Math.max(0,maximum-awarded));
  const rowLoss=round1(rows.reduce((sum,row)=>sum+(finite(row.lostPoints)?Number(row.lostPoints):0),0));
  const allSolid=rows.length>0&&rows.every(row=>["observed","correct"].includes(row.status)&&(!finite(row.lostPoints)||Number(row.lostPoints)===0));
  const unexplained=lost!==null&&lost>0&&rowLoss+penalty+0.11<lost;
  const inconsistentFullCriteria=lost!==null&&lost>0&&allSolid&&penalty===0;
  const reasons=rows.filter(row=>finite(row.lostPoints)&&Number(row.lostPoints)>0);
  if(penalty>0)reasons.push({id:"global-penalty",label:"Desvalorização global",awardedPoints:null,maxPoints:null,lostPoints:penalty,reason:globalPenaltyReason||"Foi aplicada uma desvalorização global prevista pelos critérios."});
  return {
    schema:SCORE_EXPLAINABILITY_SCHEMA,
    awardedPoints:awarded,maxPoints:maximum,lostPoints:lost,rows,reasons,
    requiresReview:!!requiresReview||unexplained||inconsistentFullCriteria,
    explainable:lost===null||lost===0||(!unexplained&&!inconsistentFullCriteria&&reasons.length>0),
    consistencyError:inconsistentFullCriteria?"ALL_CRITERIA_SOLID_BUT_SCORE_BELOW_MAX":unexplained?"UNEXPLAINED_POINT_LOSS":null
  };
}
