"use client";

import {useMemo} from "react";
import {writingCycleSummary} from "../lib/portugueseWritingCycle";

export default function PortugueseWritingCycleSummary({criteria=[],before={},after={},revisionCount=0}){
  const summary=useMemo(()=>writingCycleSummary({criteria,before,after,revisionCount}),[criteria,before,after,revisionCount]);
  if(!criteria.length)return null;
  return <section className="ptx-writing-cycle" aria-label="Evolução desta revisão">
    <div className="ptx-writing-cycle-head">
      <div><span>Ciclo de melhoria</span><strong>O que mudou nesta revisão</strong></div>
      {revisionCount>0&&<small>Revisão {revisionCount}</small>}
    </div>
    <p>{summary.message}</p>
    <div className="ptx-writing-cycle-stats">
      <div><b>{summary.improvedCount}</b><span>critérios que subiram na tua autoavaliação</span></div>
      <div><b>{summary.evidenceImprovedCount}</b><span>evidências adicionadas ou revistas</span></div>
      <div><b>{summary.attentionCount}</b><span>pontos que ainda pedem atenção</span></div>
    </div>
    <aside className={`ptx-writing-next is-${summary.nextStep.kind}`}>
      <span>{summary.nextStep.title}</span>
      <p>{summary.nextStep.message}</p>
    </aside>
  </section>;
}
