// Presentation-only labels. This module must not change any grader output or stored score.
export function miniExamReviewItemLabel(grade,fallbackMaxPoints){
  if(!grade||grade.status==="unanswered")return "Não respondida";
  const status=grade.status==="needs_review"?"Avaliação incompleta":grade.status==="correct"?"Certa":grade.status==="partial"?"Parcial":"Errada";
  const pending=grade.reviewRequired||grade.requiresReview||grade.stepResults?.some(row=>row.status==="needs_review");
  if(pending)return `${status} · Por classificar`;
  if(!Number.isFinite(grade.points))return `${status} · Por classificar`;
  const max=grade.maxPoints??fallbackMaxPoints;
  if(!Number.isFinite(max))return `${status} · Por classificar`;
  return `${status} · ${String(grade.points).replace(".",",")}/${max} pontos`;
}
