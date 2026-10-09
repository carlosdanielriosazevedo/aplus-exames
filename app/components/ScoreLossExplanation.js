"use client";
import {buildScoreExplainability} from "../lib/scoreExplainability";
const n=v=>String(Math.round(Number(v)*10)/10).replace(".",",");
export default function ScoreLossExplanation({result,title="Porque perdeste pontos"}){
 if(!result)return null;
 const e=result.scoreExplainability||buildScoreExplainability({awardedPoints:Number.isFinite(result.provisionalPoints)?result.provisionalPoints:result.points,maxPoints:result.maxPoints,criteria:result.criteria||[],steps:result.steps||result.stepResults||[],globalPenalty:result.penalty||result.globalPenalty||0,globalPenaltyReason:result.penaltyReason||result.globalPenaltyReason,requiresReview:result.requiresReview||result.reviewRequired});
 if(!Number.isFinite(e.lostPoints)||e.lostPoints<=0)return null;
 const s=e.studentSummary||{},penalty=e.reasons?.find(row=>row.id==="global-penalty");
 return <section className="scoreLossExplanation" aria-label={title}>
  <div className="notice warning"><b>{title}: {n(e.lostPoints)} {e.lostPoints===1?"ponto":"pontos"}</b><span>{e.consistencyError?"A pontuação e os critérios não são coerentes. Esta avaliação fica sinalizada para revisão.":s.fullCreditMessage||"Cada perda abaixo está ligada ao critério ou etapa que a originou."}</span></div>
  {s.scoreLine&&<div className="scoreExplainSummary"><b>{s.scoreLine}</b>{s.strengths?.length>0&&<span><strong>Já garantiste:</strong> {s.strengths.map(row=>row.label).join(" · ")}</span>}</div>}
  {e.rows?.length>0&&<div className="scoreBreakdown">{e.rows.map(row=><div key={row.id} className="scoreBreakdownRow"><div><b>{row.label}</b>{row.lostPoints>0&&<small>{row.reason}</small>}</div>{Number.isFinite(row.awardedPoints)&&Number.isFinite(row.maxPoints)&&<strong>{n(row.awardedPoints)} / {n(row.maxPoints)}</strong>}</div>)}</div>}
  {s.missingForFullCredit?.length>0&&<div className="scoreMissingForFullCredit"><b>Para chegares à pontuação completa</b>{s.missingForFullCredit.map(row=><div key={row.id}><strong>{row.label}</strong><span>{row.requirement}</span>{Number.isFinite(row.lostPoints)&&<small>−{n(row.lostPoints)} {row.lostPoints===1?"ponto":"pontos"}</small>}</div>)}</div>}
  {penalty&&<div className="notice"><b>Desvalorização global</b><span>{penalty.reason}</span></div>}
 </section>;
}
