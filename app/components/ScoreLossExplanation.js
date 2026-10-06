"use client";
import {buildScoreExplainability} from "../lib/scoreExplainability";

const n=value=>String(Math.round(Number(value)*10)/10).replace(".",",");

export default function ScoreLossExplanation({result,title="Porque perdeste pontos"}){
  if(!result)return null;
  const awarded=Number.isFinite(result.provisionalPoints)?result.provisionalPoints:result.points;
  const steps=result.steps||result.stepResults||[];
  const explanation=result.scoreExplainability||buildScoreExplainability({
    awardedPoints:awarded,
    maxPoints:result.maxPoints,
    criteria:result.criteria||[],
    steps,
    globalPenalty:result.penalty||result.globalPenalty||0,
    globalPenaltyReason:result.penaltyReason||result.globalPenaltyReason,
    requiresReview:result.requiresReview||result.reviewRequired
  });
  if(!Number.isFinite(explanation.lostPoints)||explanation.lostPoints<=0)return null;
  return <section className="scoreLossExplanation" aria-label={title}>
    <div className="notice warning"><b>{title}: {n(explanation.lostPoints)} {explanation.lostPoints===1?"ponto":"pontos"}</b>
      <span>{explanation.consistencyError
        ?"A pontuação e os critérios não são coerentes. Esta avaliação fica sinalizada para revisão em vez de esconder uma penalização."
        :"Cada perda abaixo está ligada ao critério ou etapa que a originou."}</span>
    </div>
    {explanation.rows.length>0&&<div className="scoreBreakdown">{explanation.rows.map(row=><div key={row.id} className="scoreBreakdownRow">
      <div><b>{row.label}</b>{Number.isFinite(row.lostPoints)&&row.lostPoints>0&&<small>{row.reason}</small>}</div>
      {Number.isFinite(row.awardedPoints)&&Number.isFinite(row.maxPoints)&&<strong>{n(row.awardedPoints)} / {n(row.maxPoints)}</strong>}
    </div>)}</div>}
    {explanation.reasons.some(row=>row.id==="global-penalty")&&<div className="notice"><b>Desvalorização global</b><span>{explanation.reasons.find(row=>row.id==="global-penalty")?.reason}</span></div>}
  </section>;
}
