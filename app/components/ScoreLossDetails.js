"use client";
import {buildScoreExplainability,shouldShowScoreLossPanel} from "../lib/scoreExplainability";
const n=v=>String(Math.round(Number(v)*10)/10).replace(".",",");
export default function ScoreLossDetails({result,title="Porque perdeste pontos",detailsProvided=false}){
 if(!result||result.status==="unanswered")return null;
 const pendingSteps=(result.steps||result.stepResults||[]).some(row=>["needs_review","needs-review","human-review-required","review_required","pending","unsure"].includes(row.status));
 const fresh=buildScoreExplainability({awardedPoints:Number.isFinite(result.provisionalPoints)?result.provisionalPoints:result.points,maxPoints:result.maxPoints,criteria:result.criteria||[],steps:result.steps||result.stepResults||[],globalPenalty:result.penalty||result.globalPenalty||0,globalPenaltyReason:result.penaltyReason||result.globalPenaltyReason,requiresReview:result.requiresReview||result.reviewRequired});
 const e=pendingSteps?fresh:(result.scoreExplainability||fresh);
 if(!shouldShowScoreLossPanel(e))return null;
 const missing=e.reasons?.filter(row=>row.id!=="global-penalty")||[];
 const penalty=e.reasons?.find(row=>row.id==="global-penalty");
 return <section className="scoreLossExplanation" aria-label={title}>
  <div className="scoreExplainSummary">
   {Number.isFinite(e.awardedPoints)&&Number.isFinite(e.maxPoints)&&<b>{e.requiresReview?"Pontuação provisória":"Pontuação"}: {n(e.awardedPoints)} / {n(e.maxPoints)} pontos.</b>}
   {e.requiresReview&&e.awardedPoints===null&&<span>Por classificar — a app não conseguiu verificar esta resposta.</span>}
   {e.consistencyError&&<span>Os critérios não justificam a pontuação apresentada. A app não conseguiu explicar esta pontuação.</span>}
  </div>
  {!detailsProvided&&e.rows?.length>0&&<div className="scoreBreakdown" aria-label="Pontuação por critério">{e.rows.map(row=><div key={row.id} className="scoreBreakdownRow"><div><b>{row.label}</b>{row.awardedPoints===null?<small>Por classificar — não foi possível verificar esta etapa.</small>:row.lostPoints>0&&<small>{row.reason}</small>}</div>{row.awardedPoints===null?<strong>Por classificar</strong>:Number.isFinite(row.maxPoints)&&<strong>{n(row.awardedPoints)} / {n(row.maxPoints)}</strong>}</div>)}</div>}
  {!detailsProvided&&!e.consistencyError&&missing.length>0&&<div className="scoreMissingForFullCredit"><b>O que faltou para teres a pontuação completa</b>{missing.map(row=><div key={row.id}><strong>{row.label}</strong><span>{row.requirement||row.reason}</span></div>)}</div>}
  {penalty&&<div className="notice"><b>Desvalorização global</b><span>{penalty.reason}</span></div>}
 </section>;
}
