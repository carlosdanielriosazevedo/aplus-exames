"use client";
import {physicsChemistryOpenReviewProgress} from "../lib/physicsChemistryReviewProgress";

export default function PhysicsChemistryReviewProgress({items,answers,assessments}){
  const progress=physicsChemistryOpenReviewProgress(items,answers,assessments);
  if(!progress.total)return <div className="fqaReviewProgress is-complete"><div><small>REVISÃO POR CRITÉRIOS</small><b>Sem respostas abertas respondidas</b></div><strong>0 pendentes</strong></div>;
  return <div className={"fqaReviewProgress "+(progress.pending?"has-pending":"is-complete")}>
    <div><small>REVISÃO POR CRITÉRIOS</small><b>{progress.complete+" de "+progress.total+" concluída"+(progress.total===1?"":"s")}</b><span>{progress.pending?progress.pending+" resposta"+(progress.pending===1?"":"s")+" ainda por rever. Quest"+(progress.pending===1?"ão ":"ões ")+progress.pendingQuestionNumbers.join(", ")+".":"Todas as respostas abertas respondidas já foram revistas."}</span></div>
    <strong>{progress.pending?progress.pending+" pendente"+(progress.pending===1?"":"s"):"Concluída"}</strong>
  </div>;
}
