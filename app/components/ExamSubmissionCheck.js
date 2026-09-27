"use client";

export default function ExamSubmissionCheck({
  items=[],answers={},isAnswered,isRequired=()=>true,markedIds=[],onJump,onConfirm,onBack,
  eyebrow="REVER ANTES DE ENTREGAR",title="Confirma as tuas respostas."
}){
  const marked=new Set(markedIds||[]);
  const rows=items.map((item,index)=>({
    item,index,
    answered:!!isAnswered?.(item,answers[item.id]),
    required:!!isRequired(item),
    marked:marked.has(item.id)
  }));
  const requiredRows=rows.filter(row=>row.required);
  const requiredMissing=requiredRows.filter(row=>!row.answered);
  const optionalRows=rows.filter(row=>!row.required);
  const optionalAnswered=optionalRows.filter(row=>row.answered).length;

  return <section className="examSubmitCheck">
    <div className="examSubmitCheckHead">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">Ainda podes voltar a qualquer questão. A correção e a revisão por critérios só começam depois de confirmares a entrega.</p></div>
      {onBack&&<button type="button" className="secondary" onClick={onBack}>Voltar à prova</button>}
    </div>
    <div className="examSubmitSummary">
      <div><small>RESPONDIDAS</small><b>{rows.filter(row=>row.answered).length}/{rows.length}</b></div>
      <div><small>OBRIGATÓRIAS EM BRANCO</small><b>{requiredMissing.length}</b></div>
      <div><small>MARCADAS PARA REVER</small><b>{rows.filter(row=>row.marked).length}</b></div>
      {optionalRows.length>0&&<div><small>OPCIONAIS RESPONDIDAS</small><b>{optionalAnswered}/{optionalRows.length}</b></div>}
    </div>
    <div className="examSubmitMap" aria-label="Mapa de respostas antes da entrega">
      {rows.map(row=><button type="button" key={row.item.id} className={(row.answered?"is-answered ":"is-empty ")+(row.required?"is-required ":"is-optional ")+(row.marked?"is-marked":"")} onClick={()=>onJump?.(row.index)} aria-label={"Ir para a questão "+(row.index+1)+(row.answered?", respondida":", por responder")}>
        <b>{row.index+1}</b><span>{row.marked?"Marcada para rever":row.answered?"Respondida":row.required?"Por responder":"Opcional"}</span>
      </button>)}
    </div>
    {requiredMissing.length>0&&<div className="notice warning"><b>{requiredMissing.length+" "+(requiredMissing.length===1?"questão obrigatória por responder":"questões obrigatórias por responder")}</b><span>Podes entregar assim, mas estas respostas ficam em branco. Usa o mapa para voltar diretamente a uma delas.</span></div>}
    {optionalRows.length>0&&<div className="notice"><b>Itens opcionais</b><span>Não precisas de responder a todos os opcionais. A regra de classificação do exame continua a ser aplicada no fim.</span></div>}
    <button type="button" className="primary" onClick={onConfirm}>{requiredMissing.length?"Entregar com "+requiredMissing.length+" por responder":"Confirmar entrega e rever"}</button>
  </section>;
}
