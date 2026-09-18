"use client";

import {useEffect,useMemo,useState} from "react";
import {PORTUGUESE_SELF_ASSESSMENT_LEVELS,criterionFeedback,selfAssessmentSummary,snapshotSelfAssessment,selfAssessmentProgress} from "../lib/portugueseSelfAssessment";
import {loadPortugueseWritingMemory,recordPortugueseWritingMemory,savePortugueseWritingMemory,writingMemoryInsight} from "../lib/portugueseWritingMemory";

function answerFilled(item,value){
  if(item.responseType==="multiple-choice")return Number.isInteger(value);
  return String(value||"").trim().length>0;
}

function resultFor(item,value){
  if(item.responseType!=="multiple-choice")return {final:false,correct:null};
  return {final:true,correct:Number.isInteger(value)&&value===item.answerIndex};
}

function revisionTargets(criteria,assessment){
  const marked=criteria.filter(criterion=>["partial","not-yet"].includes(assessment[criterion.id]?.status));
  return (marked.length?marked:criteria.filter(criterion=>!assessment[criterion.id]?.status)).map(criterion=>criterion.id);
}

export default function PortuguesePassageMiniExam({exam,onExit=null}){
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [review,setReview]=useState(false);
  const [mobileTextOpen,setMobileTextOpen]=useState(false);
  const [selfAssessment,setSelfAssessment]=useState({});
  const [revisionDrafts,setRevisionDrafts]=useState({});
  const [revisions,setRevisions]=useState({});
  const [writingMemory,setWritingMemory]=useState([]);
  const [attemptId]=useState(()=>`ptx-${Date.now()}-${Math.random().toString(36).slice(2,8)}`);
  const item=exam.items[index];
  const block=exam.blocks.find(candidate=>candidate.itemIds.includes(item.id));
  const answeredCount=useMemo(()=>exam.items.filter(row=>answerFilled(row,answers[row.id])).length,[answers,exam.items]);
  const deterministicItems=exam.items.filter(row=>row.responseType==="multiple-choice");
  const deterministicCorrect=deterministicItems.filter(row=>resultFor(row,answers[row.id]).correct).length;
  const openItems=exam.items.filter(row=>row.responseType==="restricted-response");
  const rubricCriteria=openItems.flatMap(row=>(row.rubric?.criteria||[]).map(criterion=>({itemId:row.id,criterionId:criterion.id})));
  const reviewedCriteria=rubricCriteria.filter(({itemId,criterionId})=>selfAssessment[itemId]?.[criterionId]?.status).length;
  const revisedOpenItems=openItems.filter(row=>(revisions[row.id]||[]).length>0).length;

  useEffect(()=>{setWritingMemory(loadPortugueseWritingMemory())},[]);

  const rememberAssessment=(row,assessment)=>setWritingMemory(current=>{
    const next=recordPortugueseWritingMemory(current,{attemptId,item:row,assessment});
    savePortugueseWritingMemory(next);
    return next;
  });
  const setAnswer=value=>setAnswers(current=>({...current,[item.id]:value}));
  const goTo=next=>{setIndex(Math.max(0,Math.min(exam.items.length-1,next)));setMobileTextOpen(false);window.scrollTo?.({top:0,behavior:"smooth"});};
  const updateCriterion=(row,criterionId,patch)=>{
    const itemId=row.id;
    const criteria=row.rubric?.criteria||[];
    const nextItemAssessment={
      ...(selfAssessment[itemId]||{}),
      [criterionId]:{...(selfAssessment[itemId]?.[criterionId]||{}),...patch}
    };
    setSelfAssessment(current=>({...current,[itemId]:nextItemAssessment}));
    if(Object.prototype.hasOwnProperty.call(patch,"status"))rememberAssessment(row,nextItemAssessment);
    setRevisions(current=>{
      const history=current[itemId]||[];
      if(!history.length)return current;
      const next=[...history];
      next[next.length-1]={...next.at(-1),assessmentAfter:snapshotSelfAssessment(criteria,nextItemAssessment)};
      return {...current,[itemId]:next};
    });
  };
  const startRevision=row=>setRevisionDrafts(current=>({...current,[row.id]:String(answers[row.id]||"")}));
  const cancelRevision=itemId=>setRevisionDrafts(current=>{const next={...current};delete next[itemId];return next;});
  const saveRevision=row=>{
    const before=String(answers[row.id]||"").trim();
    const after=String(revisionDrafts[row.id]||"").trim();
    if(!after||after===before)return;
    const criteria=row.rubric?.criteria||[];
    const assessment=selfAssessment[row.id]||{};
    const assessmentSnapshot=snapshotSelfAssessment(criteria,assessment);
    const targetedCriterionIds=revisionTargets(criteria,assessment);
    const revision={before,after,targetedCriterionIds,assessmentBefore:assessmentSnapshot,assessmentAfter:assessmentSnapshot,sequence:(revisions[row.id]||[]).length+1};
    setAnswers(current=>({...current,[row.id]:after}));
    setRevisions(current=>({...current,[row.id]:[...(current[row.id]||[]),revision]}));
    rememberAssessment(row,assessment);
    cancelRevision(row.id);
  };

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
        <div><strong>{revisedOpenItems}/{openItems.length}</strong><span>respostas abertas melhoradas</span></div>
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
            const rowRevisions=revisions[row.id]||[];
            const editing=Object.prototype.hasOwnProperty.call(revisionDrafts,row.id);
            const priorPattern=writingMemoryInsight(writingMemory,row,{excludeAttemptId:attemptId});
            return <article className="ptx-review-item" key={row.id}>
              <div className="ptx-review-top"><span>{row.id.split("-").at(-1)}</span>{row.responseType==="multiple-choice"?<strong className={result.correct?"is-correct":"is-wrong"}>{answerFilled(row,value)?(result.correct?"Correta":"A rever"):"Sem resposta"}</strong>:<strong className="is-pending">Autoavaliação guiada</strong>}</div>
              <h3>{row.prompt}</h3>
              {row.responseType==="multiple-choice"?<>
                <p><b>A tua resposta:</b> {Number.isInteger(value)?row.options[value]:"—"}</p>
                {!result.correct&&<p><b>Resposta correta:</b> {row.options[row.answerIndex]}</p>}
                <p className="ptx-explanation">{row.explanation}</p>
              </>:<>
                <p className="ptx-open-answer"><b>A tua resposta atual:</b> {String(value||"").trim()||"—"}</p>
                <details><summary>Ver resposta de referência</summary><p>{row.referenceAnswer}</p></details>
                {priorPattern.available&&<div className="ptx-improvement-insight">
                  <strong>Lembra-te do padrão das tentativas anteriores</strong>
                  <p>Este aviso usa apenas as tuas próprias autoavaliações anteriores em respostas do mesmo domínio. Não é uma classificação nem um diagnóstico automático.</p>
                  {priorPattern.rows.map(memoryRow=><p key={memoryRow.criterionId}><b>{memoryRow.label}</b> — {memoryRow.message}</p>)}
                </div>}
                <section className="ptx-self-assessment" aria-label={`Autoavaliação de ${row.id}`}>
                  <div className="ptx-self-head"><div><span>Autoavaliação por critérios</span><h4>Compara a tua resposta com a grelha</h4></div><small>Sem nota automática</small></div>
                  {criteria.map(criterion=>{
                    const evidence=itemAssessment[criterion.id]||{};
                    const feedback=criterionFeedback({criterion,status:evidence.status,evidence:evidence.evidence});
                    return <div className="ptx-criterion" key={criterion.id}>
                      <div className="ptx-criterion-copy"><strong>{criterion.label}</strong><span>{criterion.points} pts na grelha editorial</span></div>
                      <div className="ptx-criterion-levels" role="group" aria-label={`Avaliar critério ${criterion.label}`}>
                        {PORTUGUESE_SELF_ASSESSMENT_LEVELS.map(level=><button key={level.id} className={evidence.status===level.id?`is-${level.id}`:""} onClick={()=>updateCriterion(row,criterion.id,{status:level.id})}>{level.label}</button>)}
                      </div>
                      <label className="ptx-evidence-label">Onde está a evidência na tua resposta?
                        <textarea rows={2} value={evidence.evidence||""} onChange={event=>updateCriterion(row,criterion.id,{evidence:event.target.value})} placeholder="Ex.: no 2.º período relacionei a permanência na praça com os encontros e as esplanadas." />
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
                <section className="ptx-revision-loop" aria-label={`Melhoria da resposta ${row.id}`}>
                  <div className="ptx-revision-head"><div><span>Nova versão</span><h4>Melhora a resposta com base na tua autoavaliação</h4></div>{!editing&&<button className="ptx-primary" onClick={()=>startRevision(row)}>Melhorar resposta</button>}</div>
                  {editing&&<div className="ptx-revision-editor"><textarea rows={7} value={revisionDrafts[row.id]} onChange={event=>setRevisionDrafts(current=>({...current,[row.id]:event.target.value}))}/><div className="ptx-revision-actions"><button className="ptx-ghost" onClick={()=>cancelRevision(row.id)}>Cancelar</button><button className="ptx-primary" disabled={!String(revisionDrafts[row.id]||"").trim()||String(revisionDrafts[row.id]||"").trim()===String(value||"").trim()} onClick={()=>saveRevision(row)}>Guardar nova versão</button></div></div>}
                  {rowRevisions.map(revision=>{
                    const progress=selfAssessmentProgress(criteria,revision.assessmentBefore||{},revision.assessmentAfter||{});
                    return <div className="ptx-revision-record" key={revision.sequence}>
                      <div className="ptx-revision-compare">
                        <div><span>Antes · versão {revision.sequence}</span><p>{revision.before}</p></div><div><span>Depois · versão {revision.sequence}</span><p>{revision.after}</p></div>
                        <small>Critérios trabalhados: {revision.targetedCriterionIds.length?revision.targetedCriterionIds.map(id=>criteria.find(criterion=>criterion.id===id)?.label||id).join(" · "):"revisão geral"}</small>
                      </div>
                      <div className={`ptx-improvement-insight ${progress.changed?"has-change":""}`}>
                        <strong>O que mudou na tua autoavaliação</strong>
                        {!progress.changed?<p>Agora volta aos critérios acima e reavalia a nova versão. A app compara a tua própria avaliação antes e depois, sem transformar essa evolução numa nota.</p>:<>
                          {progress.upgraded.length>0&&<p><b>Critérios que assinalaste como melhores:</b> {progress.upgraded.map(entry=>`${entry.label} (${entry.from} → ${entry.to})`).join(" · ")}</p>}
                          {progress.newlyAssessed.length>0&&<p><b>Critérios avaliados depois da revisão:</b> {progress.newlyAssessed.map(entry=>`${entry.label} → ${entry.to}`).join(" · ")}</p>}
                          {progress.evidenceAdded.length>0&&<p><b>Nova evidência identificada:</b> {progress.evidenceAdded.map(entry=>entry.label).join(" · ")}</p>}
                          {progress.evidenceChanged.length>0&&<p><b>Evidência reformulada:</b> {progress.evidenceChanged.map(entry=>entry.label).join(" · ")}</p>}
                          {progress.reconsidered.length>0&&<p><b>Critérios que reavaliaste de forma mais exigente:</b> {progress.reconsidered.map(entry=>`${entry.label} (${entry.from} → ${entry.to})`).join(" · ")}</p>}
                          {progress.stillNeedsWork.length>0&&<p><b>Ainda a trabalhar:</b> {progress.stillNeedsWork.map(entry=>`${entry.label} (${entry.status})`).join(" · ")}</p>}
                        </>}
                      </div>
                    </div>;
                  })}
                </section>
                <p className="ptx-pending-note">A autoavaliação, a comparação entre versões e a evolução assinalada ficam guardadas nesta tentativa; o padrão entre tentativas é guardado apenas no dispositivo e não produz classificação automática final.</p>
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
    <nav className="ptx-question-nav" aria-label="Navegação entre questões">{exam.items.map((row,rowIndex)=><button key={row.id} className={`${rowIndex===index?"is-active":""} ${answerFilled(row,answers[row.id])?"is-answered":""}`} onClick={()=>goTo(rowIndex)} aria-label={`Ir para questão ${rowIndex+1}`}>{rowIndex+1}</button>)}</nav>
    <button className="ptx-mobile-text-toggle" onClick={()=>setMobileTextOpen(current=>!current)}>{mobileTextOpen?"Fechar texto":"Ver texto-base"}</button>
    <div className="ptx-workspace">
      <aside className={`ptx-passage ${mobileTextOpen?"is-mobile-open":""}`}><span className="ptx-passage-label">Texto-base · questões {exam.items.indexOf(block.items[0])+1}–{exam.items.indexOf(block.items.at(-1))+1}</span><h2>{block.title}</h2><p>{block.passageText}</p></aside>
      <section className="ptx-question-card">
        <div className="ptx-question-meta"><span>Questão {index+1}</span><span>{item.responseType==="multiple-choice"?"Escolha múltipla":"Resposta restrita"}</span></div><h2>{item.prompt}</h2>
        {item.responseType==="multiple-choice"?<div className="ptx-options">{item.options.map((option,optionIndex)=><button key={optionIndex} className={answers[item.id]===optionIndex?"is-selected":""} onClick={()=>setAnswer(optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span>{option}</button>)}</div>:<div className="ptx-open-editor"><textarea value={answers[item.id]||""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve aqui a tua resposta…" rows={9}/><div className="ptx-word-row"><span>{String(answers[item.id]||"").trim()?String(answers[item.id]).trim().split(/\s+/u).length:0} palavras</span><span>Objetivo: {item.wordLimit?.min}–{item.wordLimit?.max}</span></div><p>Nas respostas abertas, a app guarda evidência e permite autoavaliação; não atribui automaticamente uma classificação final.</p></div>}
        <div className="ptx-actions"><button className="ptx-ghost" onClick={()=>goTo(index-1)} disabled={index===0}>Anterior</button>{index<exam.itemCount-1?<button className="ptx-primary" onClick={()=>goTo(index+1)}>Seguinte</button>:<button className="ptx-primary" onClick={()=>setReview(true)}>Rever o exame</button>}</div>
      </section>
    </div>
    <footer className="ptx-footer-note">Protótipo editorial · {answeredCount} de {exam.itemCount} questões respondidas · não altera ainda o banco live de Português.</footer>
  </main>;
}
