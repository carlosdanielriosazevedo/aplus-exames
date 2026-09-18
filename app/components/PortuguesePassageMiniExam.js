"use client";

import {useMemo,useState} from "react";
import {PORTUGUESE_SELF_ASSESSMENT_LEVELS,criterionFeedback,selfAssessmentSummary} from "../lib/portugueseSelfAssessment";

function answerFilled(item,value){
  if(item.responseType==="multiple-choice")return Number.isInteger(value);
  return String(value||"").trim().length>0;
}

function resultFor(item,value){
  if(item.responseType!=="multiple-choice")return {final:false,correct:null};
  return {final:true,correct:Number.isInteger(value)&&value===item.answerIndex};
}

export default function PortuguesePassageMiniExam({exam,onExit=null}){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [review,setReview]=useState(false);
  const [mobileTextOpen,setMobileTextOpen]=useState(false);
  const [selfAssessment,setSelfAssessment]=useState({});
  const item=exam.items[index];
  const block=exam.blocks.find(candidate=>candidate.itemIds.includes(item.id));
  const answeredCount=useMemo(()=>exam.items.filter(row=>answerFilled(row,answers[row.id])).length,[answers,exam.items]);
  const deterministicItems=exam.items.filter(row=>row.responseType==="multiple-choice");
  const deterministicCorrect=deterministicItems.filter(row=>resultFor(row,answers[row.id]).correct).length;
  const openItems=exam.items.filter(row=>row.responseType==="restricted-response");
  const rubricCriteria=openItems.flatMap(row=>(row.rubric?.criteria||[]).map(criterion=>({itemId:row.id,criterionId:criterion.id})));
  const reviewedCriteria=rubricCriteria.filter(({itemId,criterionId})=>selfAssessment[itemId]?.[criterionId]?.status).length;

  const setAnswer=value=>setAnswers(current=>({...current,[item.id]:value}));
  const goTo=next=>{setIndex(Math.max(0,Math.min(exam.items.length-1,next)));setMobileTextOpen(false);window.scrollTo?.({top:0,behavior:"smooth"});};
  const updateCriterion=(itemId,criterionId,patch)=>setSelfAssessment(current=>({
    ...current,
    [itemId]:{
      ...(current[itemId]||{}),
      [criterionId]:{...(current[itemId]?.[criterionId]||{}),...patch}
    }
  }));

  if(review){
    return <main className="ptx-shell">
      <header className="ptx-header">
        <div><span className="ptx-kicker">Português 639 · protótipo</span><h1>Rever o mini-exame</h1></div>
        <div className="ptx-header-actions"><button className="ptx-ghost" onClick={()=>setReview(false)}>Voltar às respostas</button>{onExit&&<button className="ptx-ghost" onClick={onExit}>Sair do mini-exame</button>}</div>
      </header>
      <section className="ptx-summary">
        <div><strong>{answeredCount}/{exam.itemCount}</strong><span>respondidas</span></div>
        <div><strong>{deterministicCorrect}/{deterministicItems.length}</strong><span>certas nas escolhas múltiplas</span></div>
        <div><strong>{reviewedCriteria}/{rubricCriteria.length}</strong><span>critérios autoavaliados</span></div>
      </section>
      <div className="ptx-review-list">
        {exam.blocks.map((reviewBlock,blockIndex)=><section className="ptx-review-block" key={reviewBlock.key}>
          {reviewBlock.type==="shared-passage"&&<div className="ptx-review-passage"><span>Texto {blockIndex+1}</span><h2>{reviewBlock.title}</h2><p>{reviewBlock.passageText}</p></div>}
          {reviewBlock.items.map((row)=>{
            const value=answers[row.id];
            const result=resultFor(row,value);
            const criteria=row.rubric?.criteria||[];
            const itemAssessment=selfAssessment[row.id]||{};
            const summary=selfAssessmentSummary(criteria,itemAssessment);
            return <article className="ptx-review-item" key={row.id}>
              <div className="ptx-review-top"><span>{row.id.split("-").at(-1)}</span>{row.responseType==="multiple-choice"?<strong className={result.correct?"is-correct":"is-wrong"}>{answerFilled(row,value)?(result.correct?"Correta":"A rever"):"Sem resposta"}</strong>:<strong className="is-pending">Autoavaliação guiada</strong>}</div>
              <h3>{row.prompt}</h3>
              {row.responseType==="multiple-choice"?<>
                <p><b>A tua resposta:</b> {Number.isInteger(value)?row.options[value]:"—"}</p>
                {!result.correct&&<p><b>Resposta correta:</b> {row.options[row.answerIndex]}</p>}
                <p className="ptx-explanation">{row.explanation}</p>
              </>:<>
                <p className="ptx-open-answer"><b>A tua resposta:</b> {String(value||"").trim()||"—"}</p>
                <details><summary>Ver resposta de referência</summary><p>{row.referenceAnswer}</p></details>
                <section className="ptx-self-assessment" aria-label={`Autoavaliação de ${row.id}`}>
                  <div className="ptx-self-head"><div><span>Autoavaliação por critérios</span><h4>Compara a tua resposta com a grelha</h4></div><small>Sem nota automática</small></div>
                  {criteria.map(criterion=>{
                    const evidence=itemAssessment[criterion.id]||{};
                    const feedback=criterionFeedback({criterion,status:evidence.status,evidence:evidence.evidence});
                    return <div className="ptx-criterion" key={criterion.id}>
                      <div className="ptx-criterion-copy"><strong>{criterion.label}</strong><span>{criterion.points} pts na grelha editorial</span></div>
                      <div className="ptx-criterion-levels" role="group" aria-label={`Avaliar critério ${criterion.label}`}>
                        {PORTUGUESE_SELF_ASSESSMENT_LEVELS.map(level=><button key={level.id} className={evidence.status===level.id?`is-${level.id}`:""} onClick={()=>updateCriterion(row.id,criterion.id,{status:level.id})}>{level.label}</button>)}
                      </div>
                      <label className="ptx-evidence-label">Onde está a evidência na tua resposta?
                        <textarea rows={2} value={evidence.evidence||""} onChange={event=>updateCriterion(row.id,criterion.id,{evidence:event.target.value})} placeholder="Ex.: no 2.º período relacionei a permanência na praça com os encontros e as esplanadas." />
                      </label>
                      <div className={`ptx-criterion-feedback is-${feedback.kind}`}><strong>{feedback.title}</strong><p>{feedback.message}</p></div>
                    </div>;
                  })}
                  {criteria.length>0&&<div className="ptx-next-step">
                    <strong>{summary.complete?"Autoavaliação concluída":"Próximo passo sugerido"}</strong>
                    <p>{summary.complete?`Revê sobretudo os critérios marcados como “Parcial” (${summary.counts.partial}) ou “Ainda não” (${summary.counts["not-yet"]}) e melhora apenas essas partes da resposta.`:summary.nextCriterion?`Continua pelo critério: ${summary.nextCriterion.label}`:"Continua a comparar a tua resposta com a grelha."}</p>
                    <span>{summary.counts.withEvidence}/{summary.total} critérios com evidência escrita</span>
                  </div>}
                </section>
                <p className="ptx-pending-note">A autoavaliação fica guardada por critério nesta tentativa, mas não produz classificação automática final.</p>
              </>}
            </article>;
          })}
        </section>)}
      </div>
    </main>;
  }

  return <main className="ptx-shell">
    <header className="ptx-header">
      <div><span className="ptx-kicker">Português 639 · experiência de mini-exame</span><h1>Texto + várias questões</h1></div>
      <div className="ptx-header-actions">{onExit&&<button className="ptx-ghost" onClick={onExit}>Sair</button>}<div className="ptx-progress-copy"><strong>{index+1}</strong> / {exam.itemCount}</div></div>
    </header>
    <div className="ptx-progress" aria-label={`Questão ${index+1} de ${exam.itemCount}`}><span style={{width:`${((index+1)/exam.itemCount)*100}%`}} /></div>

    <nav className="ptx-question-nav" aria-label="Navegação entre questões">
      {exam.items.map((row,rowIndex)=><button key={row.id} className={`${rowIndex===index?"is-active":""} ${answerFilled(row,answers[row.id])?"is-answered":""}`} onClick={()=>goTo(rowIndex)} aria-label={`Ir para questão ${rowIndex+1}`}>{rowIndex+1}</button>)}
    </nav>

    <button className="ptx-mobile-text-toggle" onClick={()=>setMobileTextOpen(current=>!current)}>{mobileTextOpen?"Fechar texto":"Ver texto-base"}</button>

    <div className="ptx-workspace">
      <aside className={`ptx-passage ${mobileTextOpen?"is-mobile-open":""}`}>
        <span className="ptx-passage-label">Texto-base · questões {exam.items.indexOf(block.items[0])+1}–{exam.items.indexOf(block.items.at(-1))+1}</span>
        <h2>{block.title}</h2>
        <p>{block.passageText}</p>
      </aside>

      <section className="ptx-question-card">
        <div className="ptx-question-meta"><span>Questão {index+1}</span><span>{item.responseType==="multiple-choice"?"Escolha múltipla":"Resposta restrita"}</span></div>
        <h2>{item.prompt}</h2>
        {item.responseType==="multiple-choice"?<div className="ptx-options">
          {item.options.map((option,optionIndex)=><button key={optionIndex} className={answers[item.id]===optionIndex?"is-selected":""} onClick={()=>setAnswer(optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span>{option}</button>)}
        </div>:<div className="ptx-open-editor">
          <textarea value={answers[item.id]||""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve aqui a tua resposta…" rows={9} />
          <div className="ptx-word-row"><span>{String(answers[item.id]||"").trim()?String(answers[item.id]).trim().split(/\s+/u).length:0} palavras</span><span>Objetivo: {item.wordLimit?.min}–{item.wordLimit?.max}</span></div>
          <p>Nas respostas abertas, a app guarda evidência e permite autoavaliação; não atribui automaticamente uma classificação final.</p>
        </div>}

        <div className="ptx-actions">
          <button className="ptx-ghost" onClick={()=>goTo(index-1)} disabled={index===0}>Anterior</button>
          {index<exam.itemCount-1?<button className="ptx-primary" onClick={()=>goTo(index+1)}>Seguinte</button>:<button className="ptx-primary" onClick={()=>setReview(true)}>Rever o exame</button>}
        </div>
      </section>
    </div>
    <footer className="ptx-footer-note">Protótipo editorial · {answeredCount} de {exam.itemCount} questões respondidas · não altera ainda o banco live de Português.</footer>
  </main>;
}
