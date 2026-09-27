"use client";
import {PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS,physicsChemistryAssessmentSummary,physicsChemistryRubricFor} from "../lib/physicsChemistryRubric";

export default function PhysicsChemistryRubricReview({item,assessment={},onChange,compact=false}){
  const rubric=physicsChemistryRubricFor(item);
  const summary=physicsChemistryAssessmentSummary(item,assessment);
  const update=(criterionId,patch)=>onChange?.({
    ...assessment,
    [criterionId]:{...(assessment[criterionId]||{}),...patch}
  });
  const updateObservation=(criterionId,observationId,patch)=>onChange?.({
    ...assessment,
    [criterionId]:{
      ...(assessment[criterionId]||{}),
      observations:{
        ...(assessment[criterionId]?.observations||{}),
        [observationId]:{...(assessment[criterionId]?.observations?.[observationId]||{}),...patch}
      }
    }
  });

  return <section className={"fqaRubricReview "+(compact?"is-compact":"")} aria-label="Autoavaliação da resposta científica">
    <div className="fqaRubricHead">
      <div><small>AUTOAVALIAÇÃO GUIADA</small><h4>Compara a tua resposta com os critérios</h4></div>
      <span>{summary.complete?"Concluída":summary.counts.pending+" por avaliar"}</span>
    </div>
    <p className="muted">Não atribui nota automática. Marca o que está efetivamente demonstrado na tua resposta.</p>
    {rubric.map((criterion,criterionIndex)=>{
      const evidence=assessment[criterion.id]||{};
      return <article className="fqaRubricCriterion" key={criterion.id}>
        <div className="fqaRubricCriterionTop"><div className="fqaRubricCriterionLabel"><small>{"CRITÉRIO "+(criterionIndex+1)}</small><b>{criterion.label}</b></div><div className="fqaRubricLevels" aria-label={"Autoavaliação do critério "+(criterionIndex+1)}>
          {PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS.map(level=><button type="button" key={level.id} className={evidence.status===level.id?"is-"+level.id:""} onClick={()=>update(criterion.id,{status:level.id})}>{level.label}</button>)}
        </div></div>
        <ul>{(criterion.observations||[]).map(observation=>{
          const row=evidence.observations?.[observation.id]||{};
          return <li key={observation.id}>
            <span><i aria-hidden="true">•</i>{observation.label}</span>
            <div className="fqaObservationLevels">{PHYSICS_CHEMISTRY_A_SELF_ASSESSMENT_LEVELS.map(level=><button type="button" key={level.id} className={row.status===level.id?"is-"+level.id:""} onClick={()=>updateObservation(criterion.id,observation.id,{status:level.id})} aria-label={level.label+" — "+observation.label}>{level.label}</button>)}</div>
          </li>;
        })}</ul>
        <label className="fqaRubricEvidence">Onde está a evidência na tua resposta?
          <textarea rows={2} value={evidence.evidence||""} onChange={event=>update(criterion.id,{evidence:event.target.value})} placeholder="Ex.: indiquei que o catalisador aumenta a rapidez dos dois sentidos sem alterar Kc."/>
        </label>
      </article>;
    })}
    <div className="fqaRubricSummary">
      <span><b>{summary.counts.observed}</b> Cumpri</span>
      <span><b>{summary.counts.partial}</b> Parcial</span>
      <span><b>{summary.counts["not-observed"]}</b> Ainda não</span>
    </div>
  </section>;
}
