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
  const summary=explanation.studentSummary||{};
  return <section className="scoreLossExplanation" aria-label={title}>
    <div className="notice warning"><b>{title}: {n(explanation.lostPoints)} {explanation.lostPoints===1?"ponto":"pontos"}</b>
      <span>{explanation.consistencyError
        ?"A pontuação e os critérios não são coerentes. Esta avaliação fica sinalizada para revisão em vez de esconder uma penalização."
        :(summary.fullCreditMessage||"Cada perda abaixo está ligada ao critério ou etapa que a originou.")}</span>
    </div>
    {summary.scoreLine&&<div className="scoreExplainSummary"><b>{summary.scoreLine}</b>
      {summary.strengths?.length>0&&<span><strong>Já garantiste:</strong> {summary.strengths.map(row=>row.label).join(" · ")}</span>}
      {summary.partialSuccesses?.length>0&&<span><strong>Fizeste parte:</strong> {summary.partialSuccesses.map(row=>`${row.label} (${n(row.awardedPoints)}/${n(row.maxPoints)})`).join(" · ")}</span>}
    </div>}
    {explanation.rows.length>0&&<div className="scoreBreakdown">{explanation.rows.map(row=><div key={row.id} className="scoreBreakdownRow">
      <div><b>{row.label}</b>{Number.isFinite(row.lostPoints)&&row.lostPoints>0&&<small>{row.reason}</small>}</div>
      {Number.isFinite(row.awardedPoints)&&Number.isFinite(row.maxPoints)&&<strong>{n(row.awardedPoints)} / {n(row.maxPoints)}</strong>}
    </div>)}</div>}
    {summary.missingForFullCredit?.length>0&&<div className="scoreMissingForFullCredit"><b>Para chegares à pontuação completa</b>{summary.missingForFullCredit.map(row=><div key={row.id}><strong>{row.label}</strong><span>{row.requirement}</span>{Number.isFinite(row.lostPoints)&&<small>−{n(row.lostPoints)} {row.lostPoints===1?"ponto":"pontos"}</small>}</div>)}</div>}
    {explanation.reasons.some(row=>row.id==="global-penalty")&&<div className="notice"><b>Desvalorização global</b><span>{explanation.reasons.find(row=>row.id==="global-penalty")?.reason}</span></div>}
  </section>;
}
