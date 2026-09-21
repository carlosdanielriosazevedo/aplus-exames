"use client";
import {useState} from "react";
import {Back,Shell,Logo,StudentNav} from "./chrome";
import {SECONDARY_EXAM_SUBJECTS} from "../data/subjects";
import {engagementSummary} from "../lib/engagement";
import {PORTUGUESE_ITEMS,portugueseItemById} from "../data/portugueseContent";
import {PORTUGUESE_RUBRIC_EVIDENCE,assessPortugueseRubricObservation,buildAdaptivePortugueseMission,buildPortugueseDiagnostic,gradePortugueseResponse,portugueseCoverage,portugueseRubricGuidance,restorePortugueseRubricEvidence,revisePortugueseResponse,portugueseRevisionCompare,portugueseRevisionEvidenceCompare} from "../lib/portugueseEngine";
import {portugueseObservationGuidance} from "../lib/portugueseObservationGuidance";
import {portugueseWordLimitFeedback} from "../lib/portugueseWordLimit";
import {advanceSubjectSession,beginSubjectSession,recordSubjectSession,resetSubjectProgress,subjectProgressFor} from "../lib/subjectProgress";
const PORTUGUESE_DOMAIN_LABELS={leitura:"Leitura","educacao-literaria":"Educação Literária",escrita:"Escrita",gramatica:"Gramática"};

function PortugueseLab({s,setS,go,view="home"}){
  const [session,setSession]=useState(null);
  const [answer,setAnswer]=useState(null);
  const [feedback,setFeedback]=useState(null);
  const [editingCriterionId,setEditingCriterionId]=useState(null);
  const [revisionEditing,setRevisionEditing]=useState(false);
  const [results,setResults]=useState([]);
  const [missionFocus,setMissionFocus]=useState(null);
  const missionEvidenceFocus=missionFocus?.targetEvidenceObservations||[];
  const coverage=portugueseCoverage(PORTUGUESE_ITEMS);
  const progress=subjectProgressFor(s,"portuguese");
  const competenceRows=Object.entries(progress.competence);
  const deterministicAttempts=competenceRows.reduce((sum,[,row])=>sum+(row.deterministicAttempts||0),0);
  const correctAnswers=competenceRows.reduce((sum,[,row])=>sum+(row.correct||0),0);
  const pendingRubrics=competenceRows.reduce((sum,[,row])=>sum+(row.pendingRubrics||0),0);
  const activeSubject=SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id==="portuguese");
  const daily=engagementSummary(s);
  const sharedTop=<header className="studentTop"><div className="studentTopIdentity"><Logo/><button type="button" className="subjectSwitcher" onClick={()=>go("subjectManager")} aria-label="Mudar de disciplina"><span aria-hidden="true">{activeSubject.icon}</span><b>{activeSubject.shortName||activeSubject.name}</b><i aria-hidden="true">⌄</i></button></div><div className="studentTopActions"><button type="button" onClick={()=>go("home")} aria-label="Sequência">🔥 <b>{daily.streak}</b></button><button type="button" onClick={()=>go("ranking")} aria-label="XP">🏆 <b>{s.xp}</b></button></div></header>;
  const sharedNav=<StudentNav active={view==="home"?"home":view==="progress"?"progress":"train"} go={go}/>;
  function sharedShell(content){return <main className="dark learnHome"><section className="wrap studentSurface">{sharedTop}{content}{sharedNav}</section></main>;}

  function start(kind,items,label,domain=null){
    if(progress.lastPosition&&!window.confirm("Começar uma nova sessão substitui a retoma atual de Português. Queres continuar?"))return;
    setSession({kind,label,domain,items,current:0});
    setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);setResults([]);
    setS(prev=>beginSubjectSession(prev,{subjectId:"portuguese",kind,label,domain,items}));
  }

  function startDiagnostic(){
    start("diagnostic",buildPortugueseDiagnostic(PORTUGUESE_ITEMS),"Diagnóstico interno");
  }

  function startMission(domain){
    const mission=buildAdaptivePortugueseMission(PORTUGUESE_ITEMS,{progress,domain});
    setMissionFocus({targetEvidenceCompetencyIds:mission.targetEvidenceCompetencyIds||[],targetEvidenceObservations:mission.targetEvidenceObservations||[],label:PORTUGUESE_DOMAIN_LABELS[domain]});
    start("mission",mission.items,`Missão · ${PORTUGUESE_DOMAIN_LABELS[domain]}`,domain);
  }

  function startRecommendedMission(){
    const mission=buildAdaptivePortugueseMission(PORTUGUESE_ITEMS,{progress});
    setMissionFocus({targetEvidenceCompetencyIds:mission.targetEvidenceCompetencyIds||[],targetEvidenceObservations:mission.targetEvidenceObservations||[],label:"Missão recomendada"});
    start("mission",mission.items,"Missão recomendada");
  }

  function resume(){
    const saved=progress.lastPosition;
    if(!saved)return;
    const items=saved.itemIds.map(portugueseItemById).filter(Boolean);
    if(items.length!==saved.itemIds.length){
      setS(prev=>resetSubjectProgress(prev,"portuguese"));
      return;
    }
    const current=Math.min(saved.current,items.length-1);
    setSession({kind:saved.kind,label:saved.label,domain:saved.domain,items,current});
    setResults(saved.results||[]);const restored=restorePortugueseRubricEvidence(items[current],saved.currentResult);setAnswer(restored?.responseText??null);setFeedback(restored);setEditingCriterionId(null);setRevisionEditing(false);
  }

  function resetPortuguese(){
    if(!window.confirm("Repor apenas o progresso de Português? O progresso de Matemática A não será alterado."))return;
    setS(prev=>resetSubjectProgress(prev,"portuguese"));
    setSession(null);setResults([]);setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);setMissionFocus(null);
  }

  if(!session&&view==="train")return sharedShell(<>
    <div className="sectionIntro"><p className="eyebrow">TREINAR</p><h1>O que queres fazer?</h1></div>
    <div className="notice"><b>Praticar</b><span>Queres praticar um domínio específico ou deixar a app escolher o próximo passo com base no teu percurso.</span></div>
    <div className="trainChoices">
      <button onClick={()=>startRecommendedMission()}><span>🎯</span><div><b>Praticar</b><small>Escolhe o domínio que queres trabalhar ou deixa a missão adaptar-se à tua evidência. O treino não altera diretamente o Domínio.</small></div><em>→</em></button>
      <button onClick={()=>go("exams")}><span>📝</span><div><b>Mini-exame</b><small>Treina leitura, educação literária e escrita num formato próximo da prova, com revisão no fim.</small></div><em>→</em></button>
      <button className="comingSoon" disabled><span>📚</span><div><b>Rever matéria</b><small>Explicações e resumos de Português serão acrescentados aqui.</small></div><em>Em breve</em></button>
    </div>
  </>);

  if(!session&&view==="progress"){
    const overview=Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{
      const rows=competenceRows.filter(([,row])=>row.domain===domain||row.domainId===domain);
      const attempts=rows.reduce((sum,[,row])=>sum+(row.deterministicAttempts||0),0);
      const correct=rows.reduce((sum,[,row])=>sum+(row.correct||0),0);
      return {domain,label,attempts,correct,percent:attempts?Math.round(correct/attempts*100):null};
    });
    const overall=deterministicAttempts?Math.round(correctAnswers/deterministicAttempts*100):null;
    return sharedShell(<>
      <p className="eyebrow">PROGRESSO</p><h1>Como estás a evoluir.</h1>
      <div className="progressHero"><div><small>PREPARAÇÃO</small><b>{overall??"—"}<em>{overall!==null?"%":""}</em></b><div className="bar"><i style={{width:(overall??0)+"%"}}/></div><span>Índice de Português baseado na evidência disponível nesta disciplina.</span></div><p>O teu objetivo: <b>{s.goal} valores</b><span>O progresso de Português é separado do de Matemática A.</span></p><div className="progressMascot" aria-hidden="true">🦉</div></div>
      <div className="progressOverview">{overview.map(row=><div key={row.domain}><span>{row.label}</span><div className="bar"><i style={{width:(row.percent??0)+"%"}}/></div><b>{row.percent??"—"}</b></div>)}</div>
      <button className="secondary" onClick={()=>go("profileSettings")}>Atualizar ano e percurso escolar</button>
      <details className="progressDetails" open><summary>Ver mapa completo →</summary><p className="muted">Explora domínios, competências, evidência e o estado das respostas abertas.</p>
      {overview.map(row=><div className={"prog "+(row.percent===null?"unmeasured":"")} key={row.domain}><div className="progHead"><b>{row.label}</b><small>Domínio de Português</small></div>{row.percent===null?<div className="noEvidence"><b>Ainda sem estimativa</b><span>A app vai recolher evidência quando praticares esta área.</span></div>:<><span>Domínio estimado: {row.percent}/100</span><div className="bar"><i style={{width:row.percent+"%"}}/></div><div className="certaintyRow"><span>Evidência da app</span><b>{row.attempts} respostas objetivas</b><small>As respostas abertas são acompanhadas por critérios observáveis e não recebem uma classificação automática final.</small></div><div className="focusMap"><b>Competências dentro deste domínio</b>{competenceRows.filter(([,r])=>r.domain===row.domain||r.domainId===row.domain).map(([id,r])=><div key={id}><span>{r.label||id}</span><div className="focusMiniBar"><i style={{width:(r.deterministicAttempts?Math.round((r.correct||0)/r.deterministicAttempts*100):0)+"%"}}/></div><strong>{r.deterministicAttempts?Math.round((r.correct||0)/r.deterministicAttempts*100):"—"}</strong><small>{r.deterministicAttempts?(r.correct||0)+"/"+r.deterministicAttempts+" corretas":"Sem evidência"}</small></div>)}</div></>}</div>)}</details>
      <details className="progressHelp"><summary>ⓘ Como interpretar o teu progresso</summary><div className="notice"><b>Domínio ≠ certeza da app</b><span>O Domínio resume a evidência disponível. A app mantém separadas as respostas objetivas e a evidência das grelhas de respostas abertas.</span></div><div className="notice"><b>Respostas abertas</b><span>A autoavaliação serve para orientar o treino e guardar evidência por critério; não é convertida automaticamente numa nota final.</span></div></details>
    </>);
  }

  if(!session&&view==="exams")return sharedShell(<>
    <p className="eyebrow">MINI-EXAME</p><h1>Avaliação em contexto de prova.</h1>
    <div className="notice"><b>Mini-exame</b><span>Aqui não dou pistas durante as perguntas. No fim, volto para te ajudar a perceber o resultado.</span></div>
    <button className="exam examAction" onClick={()=>go("portugueseMiniExam")}><div><b>⚡ Mini-exame com texto partilhado</b><span>2 textos · 6 questões · seleção + resposta restrita · revisão no fim</span></div><strong>Começar →</strong></button>
    <div className="lastExam"><div><small>ÚLTIMO MINI-EXAME</small><b>{progress.sessions.filter(row=>row.kind==="mini_exam").length?"Sessão disponível":"Ainda não realizado"}</b></div><span>{progress.sessions.filter(row=>row.kind==="mini_exam").length?"O histórico desta disciplina fica separado do de Matemática A.":"Começa o primeiro mini-exame para criar histórico."}</span></div>
    <div className="exam locked"><b>📝 Exame de treino</b><span>Prova completa · próxima etapa após validarmos o Mini-exame.</span></div>
    <div className="exam locked"><b>🏛️ Exames oficiais</b><span>🔒 Aguardam validação de conteúdos oficiais.</span></div>
    <div className="notice"><b>O que muda num Mini-exame?</b><span>Não há feedback pergunta a pergunta. O resultado aparece no fim e as respostas abertas são revistas por critérios observáveis.</span></div>
  </>);
  if(!session)return sharedShell(<><div className="portugueseSharedHeading"><p className="eyebrow">ESPAÇO DE ESTUDO · PORTUGUÊS</p><h1>{view==="train"?"Treinar Português":view==="exams"?"Mini-exames de Português":view==="progress"?"Progresso de Português":"Plano de Português"}</h1><p className="muted">A navegação, topo e posição das ações são os mesmos da Matemática A. Só o conteúdo muda.</p></div><div className="portugueseLabHead"><span>Aa</span><div><p className="eyebrow">PILOTO CONTROLADO</p><h1>Português · Prova 639</h1></div></div>
    <div className="notice warning"><b>Piloto controlado — ainda não conta para o plano académico</b><span>Podes testar diagnóstico, missões e correção assistida com o conteúdo atual. O resultado é provisório e não altera o teu nível de Matemática A.</span></div>
    <div className="portugueseLabStats"><div><b>{coverage.total}</b><span>itens originais</span></div><div><b>{competenceRows.length}/16</b><span>competências observadas</span></div><div><b>{progress.missionHistory.length}</b><span>missões concluídas</span></div></div>
    {progress.lastPosition&&<section className="portugueseLabSection"><h2>Continuar</h2><button className="portugueseLabAction featured" onClick={resume}><b>Retomar {progress.lastPosition.label}</b><span>Pergunta {progress.lastPosition.current+1} de {progress.lastPosition.itemIds.length}</span></button></section>}
    <section className="portugueseLabSection"><h2>Fluxo de diagnóstico</h2><button className="portugueseLabAction featured" onClick={startDiagnostic}><b>{progress.diagnosticDone?"Repetir diagnóstico":"Testar diagnóstico"}</b><span>{progress.diagnosticDone?"Concluído · nova tentativa mantém o histórico":"8 itens · 2 por domínio · sem produção extensa"}</span></button></section>
    <section className="portugueseLabSection"><h2>Missão adaptativa</h2><button className="portugueseLabAction featured" onClick={startRecommendedMission}><b>Treinar o que mais precisa</b><span>7 itens · competências prioritárias · evita repetição recente</span></button><small className="portugueseMethodNote">A missão usa também a evidência das respostas abertas já autoavaliadas para dar mais prioridade ao que ficou “a rever”. A app não transforma essa evidência numa nota.</small><small className="portugueseMethodNote">A dificuldade é uma classificação editorial provisória. Só será considerada calibrada depois de existirem dados suficientes de alunos.</small></section>
    <section className="portugueseLabSection"><h2>Missões por domínio</h2><div className="portugueseMissionGrid">{Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([id,label])=><button key={id} className="portugueseLabAction" onClick={()=>startMission(id)}><b>{label}</b><span>7 itens adaptados ao progresso</span></button>)}</div></section>
    {(deterministicAttempts>0||pendingRubrics>0)&&<section className="portugueseProgressCard"><h2>Progresso de Português</h2><div><span>Respostas determinísticas</span><b>{correctAnswers}/{deterministicAttempts}</b></div><div><span>Respostas pendentes de grelha</span><b>{pendingRubrics}</b></div><div><span>Sessões concluídas</span><b>{progress.sessions.length}</b></div><small>O texto livre das respostas não é guardado neste histórico.</small></section>}
    <section className="portugueseLabSection"><h2>Mini-exame</h2><button className="portugueseLabAction featured" onClick={()=>go("portugueseMiniExam")}><b>Testar mini-exame com texto partilhado</b><span>2 textos · 6 questões · leitura e educação literária · revisão no fim</span></button><small className="portugueseMethodNote">Protótipo interno: o texto permanece associado ao grupo de perguntas e as respostas abertas não recebem classificação automática final.</small></section>
    <div className="notice"><b>300 itens disponíveis · publicação geral ainda bloqueada</b><span>Os 120 itens permitem testar os fluxos; a base atual já tem dimensão suficiente para o piloto controlado. O que falta fechar é a calibração de dificuldade, a consistência editorial entre competências e a validação da correção aberta com respostas reais de alunos.</span></div>
    {(()=>{const lastDiagnostic=[...progress.sessions].reverse().find(row=>row.kind==="diagnostic");if(!lastDiagnostic)return null;const rows=Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{const ids=lastDiagnostic.itemIds.filter(id=>portugueseItemById(id)?.domain===domain);const domainResults=ids.map((id,index)=>lastDiagnostic.results[index]).filter(Boolean);const deterministic=domainResults.filter(row=>row.final);const correct=deterministic.filter(row=>row.correct).length;return {domain,label,total:ids.length,correct,pending:domainResults.filter(row=>!row.final).length,percent:deterministic.length?Math.round(correct/deterministic.length*100):null};});return <section className="portugueseProgressCard"><h2>O teu ponto de partida</h2><p>O diagnóstico não é uma nota. Serve para decidir onde vale a pena começares a praticar.</p><div className="portugueseMissionGrid">{rows.map(row=><article className="portugueseLabAction" key={row.domain}><b>{row.label}</b><span>{row.percent===null?"A aguardar grelha":`${row.correct}/${row.total} corretas · ${row.percent}%`}</span>{row.pending>0&&<small>{row.pending} resposta(s) por autoavaliação</small>}</article>)}</div><button className="primary" onClick={startRecommendedMission}>Começar a missão recomendada</button></section>})()}{(progress.sessions.length>0||progress.lastPosition)&&<button className="secondary portugueseReset" onClick={resetPortuguese}>Repor apenas progresso de Português</button>}
  </>);

  if(session.finished){
    const finalResults=results;
    const deterministic=finalResults.filter(result=>result.final&&result.status!=="unanswered");
    const correct=deterministic.filter(result=>result.correct).length;
    const awaiting=finalResults.filter(result=>!result.final&&result.status!=="unanswered").length;
    if(session.kind==="diagnostic"){
      const rows=Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{const domainRows=session.items.map((item,index)=>({item,result:finalResults[index]})).filter(row=>row.item.domain===domain&&row.result?.status!=="unanswered");const d=domainRows.filter(row=>row.result?.final);const c=d.filter(row=>row.result.correct).length;return {domain,label,total:domainRows.length,correct:c,pending:domainRows.filter(row=>!row.result.final).length,percent:d.length?Math.round(c/d.length*100):null};});
      const priority=[...rows].sort((a,b)=>(a.percent===null?-1:a.percent)-(b.percent===null?-1:b.percent))[0];
      return <Shell><p className="eyebrow">Diagnóstico interno</p><h1>Já temos um ponto de partida</h1><p className="portugueseMethodNote">Isto não é uma nota. É uma fotografia inicial para escolher o próximo treino.</p>
        <div className="portugueseLabStats"><div><b>{correct}/{deterministic.length}</b><span>respostas objetivas corretas</span></div><div><b>{awaiting}</b><span>respostas por grelha</span></div><div><b>{session.items.length}</b><span>itens diagnosticados</span></div></div>
        <section className="portugueseProgressCard"><h2>O que vimos por domínio</h2><div className="portugueseMissionGrid">{rows.map(row=><article className="portugueseLabAction" key={row.domain}><b>{row.label}</b><span>{row.percent===null?"Ainda sem leitura objetiva":`${row.correct}/${row.total} · ${row.percent}%`}</span>{row.pending>0&&<small>{row.pending} resposta(s) aguardam autoavaliação</small>}</article>)}</div></section>
        {priority&&<div className="notice"><b>Próximo foco: {priority.label}</b><span>Vamos começar por aqui e ajustar a missão àquilo que já respondeste, evitando repetir conteúdo sem necessidade.</span></div>}
        <button className="primary" onClick={()=>{setSession(null);setResults([]);setAnswer(null);setFeedback(null);setTimeout(()=>startRecommendedMission(),0)}}>Começar a missão recomendada</button>
        <button className="secondary" onClick={()=>{setSession(null);setResults([]);setAnswer(null);setFeedback(null)}}>Voltar ao laboratório</button>
      </Shell>;
    }
    return <Shell><p className="eyebrow">{session.label}</p><h1>Sessão concluída</h1><div className="portugueseResultHero"><b>{correct}/{deterministic.length}</b><span>respostas determinísticas corretas</span></div>{missionEvidenceFocus.length>0&&<div className="notice"><b>Esta missão foi ajustada ao teu histórico</b><span>Incluiu critérios que assinalaste anteriormente como “em parte”, “não identificados” ou “por confirmar”. Isto orienta o treino, mas não é uma nota.</span><ul>{missionEvidenceFocus.slice(0,3).map(row=><li key={row.competencyId+row.observationId}>{row.label}</li>)}</ul></div>}
      <div className="portugueseLabStats"><div><b>{session.items.length}</b><span>itens</span></div><div><b>{awaiting}</b><span>respostas por grelha</span></div><div><b>{results.filter(result=>result.status==="unanswered").length}</b><span>não respondidas</span></div></div>
      {awaiting>0&&<div className="notice warning"><b>Resultado académico incompleto</b><span>As respostas abertas ficaram pendentes de aplicação da grelha. Não foram convertidas automaticamente numa nota.</span></div>}
      <button className="primary" onClick={()=>setSession(null)}>Voltar ao laboratório</button>
    </Shell>;
  }

  const item=session.items[session.current];
  const isChoice=item.responseType==="multiple-choice";
  const isShort=item.responseType==="short-answer";
  const answered=isChoice?Number.isInteger(answer):String(answer??"").trim().length>0;
  const rubricGuidance=feedback&&!feedback.final&&feedback.rubricCompleted?portugueseRubricGuidance(feedback):null;
  const wordLimitFeedback=!isChoice&&!isShort?portugueseWordLimitFeedback(item,answer):null;

  function submit(){
    if(!answered||feedback)return;
    const nextFeedback=gradePortugueseResponse(item,answer);
    setFeedback(nextFeedback);
    if(!nextFeedback.final)setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback}));
  }

  function recordRubricEvidence(criterionId,observationId,evidence){
    const nextFeedback=assessPortugueseRubricObservation(feedback,criterionId,observationId,evidence);
    setFeedback(nextFeedback);setEditingCriterionId(null);
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback}));
  }

  function startRevision(){
    if(!feedback||feedback.final)return;
    setAnswer(feedback.responseText||"");
    setRevisionEditing(true);
    setEditingCriterionId(null);
  }

  function saveRevision(){
    if(!revisionEditing||!feedback||feedback.final)return;
    if(!String(answer??"").trim())return;
    const nextFeedback=revisePortugueseResponse(item,feedback,answer);
    setFeedback(nextFeedback);
    setRevisionEditing(false);
    setEditingCriterionId(null);
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback}));
  }

  function next(){
    if(feedback&&!feedback.final&&!feedback.rubricCompleted)return;
    const nextResults=[...results,feedback];
    if(session.current===session.items.length-1){
      setS(prev=>recordSubjectSession(prev,{subjectId:"portuguese",kind:session.kind,label:session.label,domain:session.domain,items:session.items,results:nextResults}));
      setResults(nextResults);setSession(current=>({...current,finished:true}));return;
    }
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current+1,results:nextResults}));
    setResults(nextResults);setSession(current=>({...current,current:current.current+1}));setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);
  }

  return <Shell><button className="back" onClick={()=>setSession(null)}>← Sair da sessão</button><div className="portugueseRunTop"><div><small>{session.label}</small><b>{PORTUGUESE_DOMAIN_LABELS[item.domain]} · {item.year}</b></div><span>{session.current+1}/{session.items.length}</span></div>
    <div className="bar portugueseRunBar"><i style={{width:`${((session.current+1)/session.items.length)*100}%`}}/></div>
    {session.kind==="mission"&&missionEvidenceFocus.length>0&&session.current===0&&<section className="notice" aria-label="Foco desta missão"><b>Foco desta missão</b><span>Vamos dar atenção extra a pontos que assinalaste como precisando de revisão em respostas anteriores.</span><ul>{missionEvidenceFocus.slice(0,3).map(row=><li key={row.competencyId+row.observationId}>{row.label} <small>· {row.status==="partial"?"em parte":row.status==="not-observed"?"não identificado":"por confirmar"}</small></li>)}</ul></section>}
    <article className="portugueseQuestion"><div className="portugueseStimulus">{item.stimulus}</div><h2>{item.prompt}</h2>
      {isChoice?<div className="portugueseOptions">{item.options.map((option,index)=><button type="button" disabled={!!feedback} key={option} className={answer===index?"selected":""} onClick={()=>setAnswer(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>
      :isShort?<input className="portugueseShortAnswer" disabled={!!feedback} value={answer??""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve uma resposta curta"/>
      :feedback&&answer===null?<div className="rubricRecoveryNote"><b>Resposta já submetida</b><span>A resposta foi recuperada juntamente com a evidência assinalada na grelha.</span></div>:<><textarea className="portugueseOpenAnswer" disabled={!!feedback&&!revisionEditing} value={answer??""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve a tua resposta…" rows={9}/><div className={`portugueseWordCount ${wordLimitFeedback.status}`}><b>{wordLimitFeedback.label}</b><span>{wordLimitFeedback.count} palavras · pedido: {wordLimitFeedback.min}–{wordLimitFeedback.max}</span>{wordLimitFeedback.caution&&<small>{wordLimitFeedback.caution}</small>}</div></>}
    </article>
    {feedback&&<div className={`portugueseFeedback ${feedback.final?(feedback.correct?"correct":"incorrect"):"provisional"}`}><b>{feedback.final?(feedback.correct?"Resposta correta":"Resposta incorreta"):feedback.rubricCompleted?"Autoavaliação guardada — sem classificação automática":"Agora revê a tua resposta"}</b>
      {feedback.final&&<><span className="portugueseCorrectAnswer"><b>Resposta certa</b><span>{isChoice?item.options[item.answerIndex]:isShort?(item.acceptedAnswers?.[0]||""):item.referenceAnswer||""}</span></span><span>{item.explanation}</span></>}
      {!feedback.final&&(!feedback.rubricCompleted||editingCriterionId)&&(()=>{const observations=feedback.criteria.flatMap(criterion=>criterion.observations.map(observation=>({criterion,observation})));const selected=observations.find(row=>row.observation.id===editingCriterionId)||observations.find(row=>row.observation.status==="pending");if(!selected)return null;const {criterion,observation}=selected;const index=observations.indexOf(selected);return <div className="guidedRubric"><div className="guidedRubricProgress"><span>Verificação {index+1} de {observations.length}</span><span>{criterion.label} · {criterion.points} pt na grelha</span></div><p>{observation.label}</p><span className="guidedRubricPrompt">Na tua resposta, que evidência encontras desta observação?</span>{(()=>{const guidance=portugueseObservationGuidance(item,criterion,observation);return <div className="rubricEvidenceGuide"><div><b>Conta como evidência</b><span>{guidance.counts}</span></div><div><b>Não chega</b><span>{guidance.notEnough}</span></div></div>})()}<div className="guidedRubricChoices">{PORTUGUESE_RUBRIC_EVIDENCE.map(option=><button type="button" className={observation.status===option.id?"selected":""} key={option.id} onClick={()=>recordRubricEvidence(criterion.id,observation.id,option.id)}><b>{option.label}</b><small>{option.description}</small></button>)}</div></div>})()}
      {!feedback.final&&feedback.rubricCompleted&&!editingCriterionId&&<><span>A tua leitura ficou registada por observação. Isto não é uma classificação nem altera o teu nível.</span><ul className="rubricEvidenceSummary">{feedback.criteria.map(criterion=>{const option=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===criterion.status);return <li key={criterion.id}><span>{criterion.label}</span><b>{option?.label||"Pendente"}</b><ul className="rubricObservationSummary">{criterion.observations.map(observation=>{const observationOption=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===observation.status);return <li key={observation.id}><span>{observation.label}</span><b>{observationOption?.label||"Pendente"}</b><button type="button" onClick={()=>setEditingCriterionId(observation.id)}>Alterar</button></li>})}</ul></li>})}</ul><div className="rubricGuidance"><b>Próximo passo</b><p>{rubricGuidance.nextAction}</p>{rubricGuidance.reviewObservations.length>0&&<ul className="rubricGuidanceTargets">{rubricGuidance.reviewObservations.map(observation=><li key={`${observation.criterionId}:${observation.id}`}><span><b>{observation.action.title}</b><small>{observation.label}</small><em>{observation.action.action}</em><i>{observation.action.hint}</i></span><button type="button" onClick={()=>setEditingCriterionId(observation.id)}>Rever</button></li>)}</ul>}<button type="button" className="rubricRevisionButton" onClick={startRevision}>Reescrever a resposta</button><div><span><strong>{rubricGuidance.observed.length}</strong> critérios sólidos</span><span><strong>{rubricGuidance.needsReview.length}</strong> a rever</span><span><strong>{rubricGuidance.uncertain.length}</strong> dúvidas</span></div></div>{feedback.revisionHistory?.length>0&&<details><summary>Ver histórico de revisões</summary><div className="rubricRevisionHistory">{feedback.revisionHistory.map((row,index)=>{const next=feedback.revisionHistory[index+1]?.responseText??feedback.responseText;const delta=portugueseRevisionCompare(row.responseText,next);const evidenceRows=Array.isArray(row.rubricObservationEvidence)?row.rubricObservationEvidence:[];const nextEvidence=feedback.revisionHistory[index+1]?.rubricObservationEvidence??rubricObservationEvidenceSnapshot(feedback);const evidenceEvolution=portugueseRevisionEvidenceCompare(evidenceRows,{criteria:nextEvidence.map(evidence=>({id:evidence.criterionId,observations:[{id:evidence.observationId,status:evidence.evidence,evidence:evidence.studentEvidence||[]}]}))});return <div key={row.revision}><b>{row.revision===0?"Resposta inicial":`Revisão ${row.revision}`}</b><p>{row.responseText}</p>{delta.changed&&<small>Evolução para a versão seguinte: {delta.afterWords} palavras · {delta.addedWords} palavras novas · {delta.removedWords} removidas.</small>}{evidenceRows.length>0&&<div className="rubricRevisionEvidence"><span>Evidência desta versão</span><ul>{evidenceRows.map(evidence=>{const criterion=feedback.criteria.find(row=>row.id===evidence.criterionId);const observation=criterion?.observations?.find(row=>row.id===evidence.observationId);const option=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===evidence.evidence);return <li key={`${evidence.criterionId}:${evidence.observationId}`}><b>{observation?.label||evidence.observationId}</b><span>{criterion?.label||evidence.criterionId} · {option?.label||"Pendente"}</span></li>})}</ul>{evidenceEvolution.some(evidence=>evidence.direction!=="same")&&<div className="rubricRevisionTransitions"><span>Evolução por critério</span><ul>{evidenceEvolution.filter(evidence=>evidence.direction!=="same").map(evidence=><li key={`${evidence.criterionId}:${evidence.observationId}`}><b>{evidence.beforeLabel} → {evidence.afterLabel}</b><span>{feedback.criteria.find(criterion=>criterion.id===evidence.criterionId)?.observations?.find(observation=>observation.id===evidence.observationId)?.label||evidence.observationId}</span></li>)}</ul></div>}</div>}</div>})}</div></details>}{item.referenceAnswer&&<details><summary>Comparar com uma resposta de referência</summary><p>{item.referenceAnswer}</p></details>}</>}
    </div>}
    {revisionEditing&&<div className="rubricRevisionActions"><span>Revisão {((feedback?.revisionCount||0)+1)} · melhora a resposta e volta a verificar a grelha.</span><div><button type="button" className="secondary" onClick={()=>{setRevisionEditing(false);setAnswer(feedback?.responseText||"")}}>Cancelar</button><button type="button" className="primary" disabled={!String(answer??"").trim()} onClick={saveRevision}>Guardar revisão</button></div></div>}
    {!feedback?<button className="primary" disabled={!answered} onClick={submit}>Responder</button>:revisionEditing?null:<button className="primary" disabled={!feedback.final&&!feedback.rubricCompleted} onClick={next}>{!feedback.final&&!feedback.rubricCompleted?"Avalia todas as observações":session.current===session.items.length-1?"Ver resultado":"Próxima pergunta"}</button>}
  </Shell>;
}


export default PortugueseLab;
