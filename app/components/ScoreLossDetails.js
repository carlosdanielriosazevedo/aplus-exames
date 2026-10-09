"use client";
import {buildScoreExplainability} from "../lib/scoreExplainability";
const n=v=>String(Math.round(Number(v)*10)/10).replace(".",",");
export default function ScoreLossDetails({result,title="Porque perdeste pontos"}){
 if(!result)return null;
 const e=result.scoreExplainability||buildScoreExplainability({awardedPoints:Number.isFinite(result.provisionalPoints)?result.provisionalPoints:result.points,maxPoints:result.maxPoints,criteria:result.criteria||[],steps:result.steps||result.stepResults||[],globalPenalty:result.penalty||result.globalPenalty||0,globalPenaltyReason:result.penaltyReason||result.globalPenaltyReason,requiresReview:result.requiresReview||result.reviewRequired});
 if(!Number.isFinite(e.lostPoints)||e.lostPoints<=0)return null;
 const missing=e.reasons?.filter(row=>row.id!=="global-penalty")||[],strengths=e.rows?.filter(row=>Number.isFinite(row.maxPoints)&&row.maxPoints>0&&Number.isFinite(row.awardedPoints)&&row.awardedPoints>=row.maxPoints-.05)||[],penalty=e.reasons?.find(row=>row.id==="global-penalty");
 const full=e.consistencyError?"A pontuação e os critérios não são coerentes. Esta avaliação fica sinalizada para revisão.":missing.length===1?`Para teres a pontuação completa, faltava ${missing[0].label.toLocaleLowerCase("pt-PT")}: ${missing[0].requirement||missing[0].reason}`:missing.length>1?`Para teres a pontuação completa, precisavas de cumprir integralmente ${missing.map(row=>row.label).join("; ")}.`:penalty?"A resposta cumpriu os critérios principais, mas sofreu uma desvalorização global prevista nos critérios.":"Cada perda abaixo está ligada ao critério ou etapa que a originou.";
 return <section className="scoreLossExplanation" aria-label={title}>
  <div className="notice warning"><b>{title}: {n(e.lostPoints)} {e.lostPoints===1?"ponto":"pontos"}</b><span>{full}</span></div>
  {Number.isFinite(e.awardedPoints)&&Number.isFinite(e.maxPoints)&&<div className="scoreExplainSummary"><b>{e.requiresReview?"Pontuação provisória":"Pontuação"}: {n(e.awardedPoints)} / {n(e.maxPoints)} pontos.</b>{strengths.length>0&&<span><strong>Já garantiste:</strong> {strengths.map(row=>row.label).join(" · ")}</span>}</div>}
  {e.rows?.length>0&&<div className="scoreBreakdown">{e.rows.map(row=><div key={row.id} className="scoreBreakdownRow"><div><b>{row.label}</b>{row.lostPoints>0&&<small>{row.reason}</small>}</div>{Number.isFinite(row.awardedPoints)&&Number.isFinite(row.maxPoints)&&<strong>{n(row.awardedPoints)} / {n(row.maxPoints)}</strong>}</div>)}</div>}
  {missing.length>0&&<div className="scoreMissingForFullCredit"><b>Para chegares à pontuação completa</b>{missing.map(row=><div key={row.id}><strong>{row.label}</strong><span>{row.requirement||row.reason}</span>{Number.isFinite(row.lostPoints)&&<small>−{n(row.lostPoints)} {row.lostPoints===1?"ponto":"pontos"}</small>}</div>)}</div>}
  {penalty&&<div className="notice"><b>Desvalorização global</b><span>{penalty.reason}</span></div>}
 </section>;
}
