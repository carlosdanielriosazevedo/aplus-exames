const STATUS_RANK={"not-yet":0,partial:1,met:2};

function clean(value){return String(value||"").trim()}
function status(entry){return entry?.status||null}
function evidence(entry){return clean(entry?.evidence)}

export function writingRevisionDelta(criteria=[],before={},after={}){
  const rows=criteria.map(criterion=>{
    const previous=before?.[criterion.id]||{};
    const current=after?.[criterion.id]||{};
    const beforeStatus=status(previous);
    const afterStatus=status(current);
    const beforeRank=Object.prototype.hasOwnProperty.call(STATUS_RANK,beforeStatus)?STATUS_RANK[beforeStatus]:null;
    const afterRank=Object.prototype.hasOwnProperty.call(STATUS_RANK,afterStatus)?STATUS_RANK[afterStatus]:null;
    const beforeEvidence=evidence(previous);
    const afterEvidence=evidence(current);
    const direction=beforeRank===null||afterRank===null?"unknown":afterRank>beforeRank?"up":afterRank<beforeRank?"down":"same";
    return {
      criterionId:criterion.id,
      label:criterion.label,
      beforeStatus,afterStatus,direction,
      evidenceAdded:!beforeEvidence&&Boolean(afterEvidence),
      evidenceChanged:Boolean(beforeEvidence&&afterEvidence&&beforeEvidence!==afterEvidence),
      stillAttention:["partial","not-yet"].includes(afterStatus)
    };
  });
  return {
    rows,
    improved:rows.filter(row=>row.direction==="up"),
    reconsidered:rows.filter(row=>row.direction==="down"),
    evidenceImproved:rows.filter(row=>row.evidenceAdded||row.evidenceChanged),
    stillAttention:rows.filter(row=>row.stillAttention)
  };
}

export function writingRevisionNextStep(criteria=[],before={},after={}){
  const delta=writingRevisionDelta(criteria,before,after);
  const priority=delta.stillAttention[0]||delta.rows.find(row=>!row.afterStatus)||null;
  if(priority){
    return {
      kind:"attention",
      criterionId:priority.criterionId,
      title:"Próximo ponto a confirmar",
      message:`Revê “${priority.label}” e identifica na tua resposta uma passagem concreta que demonstre o critério antes de terminares.`
    };
  }
  const withoutEvidence=delta.rows.find(row=>row.afterStatus==="met"&&!evidence(after?.[row.criterionId]));
  if(withoutEvidence){
    return {
      kind:"evidence",
      criterionId:withoutEvidence.criterionId,
      title:"Torna a melhoria verificável",
      message:`Marcaste “${withoutEvidence.label}” como cumprido. Regista agora a frase ou passagem que sustenta essa decisão.`
    };
  }
  return {
    kind:"consolidate",
    criterionId:null,
    title:"Consolida antes de avançar",
    message:"Os critérios ficaram assinalados como cumpridos e com evidência. Faz uma última leitura para confirmar que a resposta continua diretamente ligada ao enunciado."
  };
}

export function writingCycleSummary({criteria=[],before={},after={},revisionCount=0}={}){
  const delta=writingRevisionDelta(criteria,before,after);
  const nextStep=writingRevisionNextStep(criteria,before,after);
  const changed=delta.improved.length+delta.reconsidered.length+delta.evidenceImproved.length;
  return {
    revisionCount:Math.max(0,Number(revisionCount)||0),
    changed,
    improvedCount:delta.improved.length,
    reconsideredCount:delta.reconsidered.length,
    evidenceImprovedCount:delta.evidenceImproved.length,
    attentionCount:delta.stillAttention.length,
    nextStep,
    delta,
    message:changed
      ?`Nesta revisão alteraste ${changed} sinal(is) da tua autoavaliação. A comparação descreve apenas o que assinalaste; não atribui classificação.`
      :"Ainda não há alterações verificáveis entre as duas autoavaliações. Usa o próximo passo para orientar uma revisão curta e concreta."
  };
}
