"use client";
import {useEffect,useState} from "react";
import {Apronso,ApronsoNudge,FriendsBetaRibbon,Shell,StudentNav,StudentTop,StudySessionHeader} from "./chrome";
import StudyModeHub from "./StudyModeHub";
import PhysicsChemistryLearnPanel from "./PhysicsChemistryLearnPanel";
import PhysicsChemistryStimulus from "./PhysicsChemistryStimulus";
import {PhysicsChemistryStepwiseEditor,PhysicsChemistryStepwiseReview} from "./PhysicsChemistryStepwise";
import {PHYSICS_CHEMISTRY_A_DOMAINS,PHYSICS_CHEMISTRY_A_ITEMS,physicsChemistryDomainById,physicsChemistryItemById} from "../data/physicsChemistryFoundation";
import {physicsChemistrySubtopicById,physicsChemistrySubtopicsForDomain} from "../data/physicsChemistryTaxonomy";
import {physicsChemistryMiniExamById} from "../data/physicsChemistryMiniExams";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../data/physicsChemistryExamBlueprint";
import {buildAdaptivePhysicsChemistryMission,buildPhysicsChemistryDiagnostic,gradePhysicsChemistryResponse,physicsChemistryCoverage,physicsChemistryScope} from "../lib/physicsChemistryEngine";
import {advanceSubjectSession,beginSubjectSession,createSubjectSessionId,recordSubjectSession,resetSubjectProgress,subjectProgressFor} from "../lib/subjectProgress";
import {activateSubjectState,finishSubjectOnboardingState,subjectGoal,subjectOnboardingStep} from "../lib/subjectWorkspace";
import {missionCompletedToday} from "../lib/engagement";
import {loadPhysicsChemistryExamDraft,physicsChemistryDraftAgeLabel} from "../lib/physicsChemistryExamDraft";
import {answerOptionState} from "../lib/feedbackCopy";

const SUBJECT_ID="physics-chemistry-a";
const SCHOOL_YEARS=["10.º","11.º"];

function curriculumYear(profileYear){
  return profileYear==="10.º"?"10.º":"11.º";
}

function allDomainIdsForYear(year){
  return PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===year).map(row=>row.id);
}

function allDomainIds(){
  return PHYSICS_CHEMISTRY_A_DOMAINS.map(row=>row.id);
}

function allSubtopicIdsForYear(year){
  return PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===year).flatMap(row=>physicsChemistrySubtopicsForDomain(row.id).map(topic=>topic.id));
}

function allSubtopicIds(){
  return PHYSICS_CHEMISTRY_A_DOMAINS.flatMap(row=>physicsChemistrySubtopicsForDomain(row.id).map(topic=>topic.id));
}

function initialTaught(settings,year){
  const allowedSubtopics=new Set(allSubtopicIdsForYear(year));
  const allowedDomains=new Set(allDomainIdsForYear(year));
  const saved=Array.isArray(settings?.taughtUnitIds)?settings.taughtUnitIds:[];
  const expanded=[];
  for(const id of saved){
    if(allowedSubtopics.has(id))expanded.push(id);
    else if(allowedDomains.has(id))expanded.push(...physicsChemistrySubtopicsForDomain(id).map(topic=>topic.id));
  }
  return [...new Set(expanded)];
}

export default function PhysicsChemistrySubject({s,setS,go,view="home"}){
  const currentYear=curriculumYear(s.profile?.schoolYear);
  const settings=s.subjectSettings?.[SUBJECT_ID]||{};
  const taughtUnitIds=initialTaught(settings,currentYear);
  const finishedSecondary=s.profile?.schoolYear==="Já terminei o secundário"||s.profile?.schoolYear==="12.º";
  const [scopeDraft,setScopeDraft]=useState(()=>finishedSecondary?allSubtopicIds():taughtUnitIds);
  const initialPracticeDomain=allDomainIdsForYear(currentYear)[0]||null;
  const [practiceYear,setPracticeYear]=useState(currentYear);
  const [practiceDomain,setPracticeDomain]=useState(initialPracticeDomain);
  const [practiceSubtopic,setPracticeSubtopic]=useState(()=>initialPracticeDomain?physicsChemistrySubtopicsForDomain(initialPracticeDomain)[0]?.id||null:null);
  const [practiceLevel,setPracticeLevel]=useState("auto");
  const [session,setSession]=useState(null);
  const [answer,setAnswer]=useState(null);
  const [feedback,setFeedback]=useState(null);
  const [results,setResults]=useState([]);
  const [rubricAssessment,setRubricAssessment]=useState({});
  const [examDrafts,setExamDrafts]=useState([]);
  const progress=subjectProgressFor(s,SUBJECT_ID);
  const scopedItems=finishedSecondary?PHYSICS_CHEMISTRY_A_ITEMS:physicsChemistryScope(PHYSICS_CHEMISTRY_A_ITEMS,currentYear,taughtUnitIds);
  const coverage=physicsChemistryCoverage(PHYSICS_CHEMISTRY_A_ITEMS);
  const scopedCoverage=physicsChemistryCoverage(scopedItems);
  const onboardingStep=subjectOnboardingStep(s,SUBJECT_ID);
  const onboardingDoneScreen=s.subjectOnboardingMode==="add"?"diag":"apronsoIntro";
  const missionDone=missionCompletedToday(s);
  useEffect(()=>{
    if(!["home","exams"].includes(view))return;
    const mini1=physicsChemistryMiniExamById("fqa-mini-1");
    const mini2=physicsChemistryMiniExamById("fqa-mini-2");
    const fullRows=[...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.mandatoryItems,...PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT.optionalItems];
    const candidates=[
      {id:mini1.id,title:mini1.label,route:"physicsChemistryMini1",itemIds:mini1.items.map(row=>row.id)},
      {id:mini2.id,title:mini2.label,route:"physicsChemistryMini2",itemIds:mini2.items.map(row=>row.id)},
      {id:"fqa-full-715",title:"Exame Completo · 715",route:"physicsChemistryExam",itemIds:fullRows.map(row=>row.id)}
    ];
    setExamDrafts(candidates.map(candidate=>{
      const draft=loadPhysicsChemistryExamDraft(candidate.id,candidate.itemIds);
      return draft?{...candidate,draft}:null;
    }).filter(Boolean));
  },[view]);

  const sharedTop=<StudentTop s={s} go={go}><details className="studentMenu"><summary aria-label="Abrir menu">•••</summary><div>
    <button onClick={()=>go("curriculumSettings")}>Matéria dada na escola</button>
    <button onClick={()=>go("profileSettings")}>Ano e percurso escolar</button>
    <button onClick={()=>go("goalSettings")}>Objetivo: {subjectGoal(s,SUBJECT_ID)} valores</button>
    {(progress.sessions.length>0||progress.lastPosition||examDrafts.length>0)&&<button onClick={resetPhysicsChemistry}>Repor progresso de Física e Química A</button>}
  </div></details></StudentTop>;
  const sharedNav=<StudentNav active={view==="home"?"home":view==="progress"?"progress":"train"} go={go}/>;

  function start(kind,items,label,domain=null){
    if(progress.lastPosition&&!window.confirm("Começar uma nova sessão substitui a retoma atual de Física e Química A. Queres continuar?"))return;
    const sessionId=createSubjectSessionId(SUBJECT_ID,kind);
    setSession({sessionId,kind,label,domain,items,current:0});
    setAnswer(null);setFeedback(null);setResults([]);setRubricAssessment({});
    setS(prev=>beginSubjectSession(prev,{subjectId:SUBJECT_ID,sessionId,kind,label,domain,items}));
  }

  function startDiagnostic(){start("diagnostic",buildPhysicsChemistryDiagnostic(scopedItems),"Diagnóstico")}
  function startMission(domain=null){
    const built=buildAdaptivePhysicsChemistryMission(scopedItems,{progress,domain,size:7});
    start("mission",built.items,domain?"Missão · "+(physicsChemistryDomainById(domain)?.shortTitle||domain):"Missão recomendada",domain);
  }
  function startPractice(){
    const available=practiceSubtopic?(coverage.bySubtopic[practiceSubtopic]||0):(coverage.byDomain[practiceDomain]||0);
    const size=Math.max(7,Math.min(8,available));
    const built=buildAdaptivePhysicsChemistryMission(PHYSICS_CHEMISTRY_A_ITEMS,{progress,domain:practiceDomain,subtopicId:practiceSubtopic,year:practiceYear,level:practiceLevel,size});
    const domainLabel=physicsChemistryDomainById(practiceDomain)?.shortTitle||practiceYear;
    const subtopicLabel=physicsChemistrySubtopicById(practiceSubtopic)?.label;
    start("training",built.items,"Praticar · "+[domainLabel,subtopicLabel].filter(Boolean).join(" · "),practiceDomain);
  }

  function answerReady(item){
    if(item.responseType==="multiple-choice")return Number.isInteger(answer);
    if(item.responseType==="stepwise")return Object.values(answer?.steps||{}).some(value=>value&&typeof value==="object"?Object.values(value).some(part=>String(part??"").trim().length>0):String(value??"").trim().length>0);
    return String(answer??"").trim().length>0;
  }

  function submit(){
    const item=session.items[session.current];
    if(!answerReady(item))return;
    const result=gradePhysicsChemistryResponse(item,answer);
    const nextResults=[...results,result];
    setFeedback(result);setResults(nextResults);
    setS(prev=>advanceSubjectSession(prev,SUBJECT_ID,{current:session.current,results:nextResults,currentResult:result,currentAnswer:answer}));
  }

  function next(){
    if(!feedback)return;
    if(session.current>=session.items.length-1){
      const finalResults=feedback?[...results.slice(0,-1),feedback]:results;
      setResults(finalResults);
      setS(prev=>recordSubjectSession(prev,{subjectId:SUBJECT_ID,kind:session.kind,label:session.label,domain:session.domain,items:session.items,results:finalResults,sessionId:session.sessionId}));
      setSession(current=>({...current,finished:true}));
      return;
    }
    const current=session.current+1;
    setSession(prev=>({...prev,current}));
    setAnswer(null);setFeedback(null);setRubricAssessment({});
    setS(prev=>advanceSubjectSession(prev,SUBJECT_ID,{current,results,currentResult:null,currentAnswer:null}));
  }

  function resume(){
    const saved=progress.lastPosition;
    if(!saved)return;
    const items=saved.itemIds.map(physicsChemistryItemById).filter(Boolean);
    if(items.length!==saved.itemIds.length){resetPhysicsChemistry();return}
    setSession({sessionId:saved.sessionId,kind:saved.kind,label:saved.label,domain:saved.domain,items,current:Math.min(saved.current,items.length-1)});
    setResults(saved.results||[]);setAnswer(saved.currentAnswer??null);setFeedback(saved.currentResult||null);
  }

  function resetPhysicsChemistry(){
    if(!window.confirm("Repor apenas o progresso de Física e Química A?"))return;
    setS(prev=>resetSubjectProgress(prev,SUBJECT_ID));setSession(null);setResults([]);setAnswer(null);setFeedback(null);setRubricAssessment({});
  }

  if(session?.finished){
    const deterministic=results.filter(result=>result?.final===true&&typeof result.correct==="boolean");
    const correct=deterministic.filter(result=>result.correct).length;
    const pending=results.filter(result=>result&&result.final!==true&&result.status!=="unanswered").length;
    const unanswered=results.filter(result=>result?.status==="unanswered").length;
    const title=session.kind==="mission"?"Missão concluída":session.kind==="diagnostic"?"Diagnóstico concluído":"Treino concluído";
    const primaryLabel=session.kind==="diagnostic"?"Ir para o menu inicial":"Voltar à Home";
    const primaryTarget="home";
    return <Shell>
      <div className="centered completionMoment">
        <Apronso pose="celebrate" className="resultApronso" alt={"Apronso celebra: "+title}/>
        <p className="eyebrow">{session.label.toUpperCase()}</p>
        <h1>{title}</h1>
        <p className="muted">{session.kind==="training"?"O Treino Livre serviu para praticar e não altera diretamente o teu Domínio.":"A sessão ficou guardada no teu progresso de Física e Química A."}</p>
      </div>
      <div className="subjectStats">
        <div><b>{session.items.length}</b><span>itens</span></div>
        <div><b>{deterministic.length?correct+"/"+deterministic.length:"—"}</b><span>respostas objetivas corretas</span></div>
        <div><b>{pending}</b><span>respostas ainda por critérios</span></div>
      </div>
      {pending>0&&<div className="notice warning"><b>Resultado académico incompleto</b><span>A app avaliou automaticamente o que conseguiu nas respostas abertas e por etapas. Os resultados não determinísticos mantêm indicação provisória e de confiança.</span></div>}
      {unanswered>0&&<div className="notice"><b>{unanswered+" "+(unanswered===1?"resposta em branco":"respostas em branco")}</b><span>Ficam registadas como ausência de resposta, sem inventar evidência de domínio.</span></div>}
      <button className="primary" onClick={()=>{setSession(null);setAnswer(null);setFeedback(null);setResults([]);setRubricAssessment({});go(primaryTarget)}}>{primaryLabel}</button>
      {session.kind!=="diagnostic"&&<button className="secondary" onClick={()=>{const kind=session.kind;setSession(null);setAnswer(null);setFeedback(null);setResults([]);setRubricAssessment({});go(kind==="mission"?"progress":"train")}}>{session.kind==="mission"?"Ver progresso detalhado":"Treinar outra coisa"}</button>}
    </Shell>;
  }

  if(session){
    const item=session.items[session.current];
    const domain=physicsChemistryDomainById(item.domain);
    const position=session.current+1;
    return <Shell className="wideStudentShell">
      <StudySessionHeader progress={position/session.items.length*100} label={position+"/"+session.items.length} onExit={()=>{setSession(null);go("home")}}/>
      <p className="eyebrow">{session.label.toUpperCase()}</p>
      <h1>{domain?.shortTitle||"Física e Química A"}</h1>
      <div className="trainingScopeNote"><b>{item.year+" · "+domain?.area}</b><span>{domain?.title}</span></div>
      <div className="questionCard">
        <PhysicsChemistryStimulus item={item}/>
        <h2>{item.prompt}</h2>
        {item.responseType==="multiple-choice"&&<div className="opts">{item.options.map((option,index)=><button type="button" key={option} disabled={!!feedback} className={answerOptionState({index,selectedIndex:answer,correctIndex:item.answerIndex,submitted:!!feedback?.final})} onClick={()=>setAnswer(index)}><b>{String.fromCharCode(65+index)}</b>{option}</button>)}</div>}
        {item.responseType==="stepwise"&&<PhysicsChemistryStepwiseEditor item={item} value={answer} onChange={setAnswer} disabled={!!feedback}/>} 
        {item.responseType==="restricted-response"&&<div className="fqaRestricted"><div className="notice"><b>Resposta científica</b><span>Explica o raciocínio com linguagem científica e articula os elementos pedidos.</span></div><textarea disabled={!!feedback} value={typeof answer==="string"?answer:""} onChange={event=>setAnswer(event.target.value)} rows={8} placeholder="Escreve a tua resposta..."/></div>}
        {!feedback?<button className="primary" disabled={!answerReady(item)} onClick={submit}>Responder</button>:<>
          {item.responseType==="multiple-choice"&&<div className={"feedback answerFeedback "+(feedback.correct?"good":"bad")}><b>{feedback.correct?"✓ Muito bem!":"Não é essa."}</b><span>{feedback.correct?item.explanation:<>A resposta correta é:<strong>{item.options[item.answerIndex]}</strong>{item.explanation&&<small>{item.explanation}</small>}</>}</span></div>}
          {item.responseType==="stepwise"&&<PhysicsChemistryStepwiseReview item={item} result={feedback}/>} 
          {item.responseType==="restricted-response"&&<div className="fqaConstructedReview">
            <div className="notice"><b>Avaliação automática provisória</b><span>{feedback.note}</span></div>
            {Number.isFinite(feedback.provisionalPoints)&&<div className="autoAssessmentScore"><b>{String(feedback.provisionalPoints).replace(".",",")} / {feedback.maxPoints} pontos</b><small>estimativa provisória · confiança {feedback.autoAssessmentConfidence??"—"}%</small></div>}
            {feedback.feedbackSummary&&<div className="automaticFeedbackPanel">
              {feedback.feedbackSummary.strengths.length>0&&<section className="automaticFeedbackGood"><b>O que fizeste bem</b>{feedback.feedbackSummary.strengths.map(row=><div key={row.id}><strong>✓ {row.label}</strong>{row.evidence&&<blockquote>“{row.evidence}”</blockquote>}<span>{row.message}</span></div>)}</section>}
              {feedback.feedbackSummary.gaps.length>0&&<section className="automaticFeedbackImprove"><b>O que falta melhorar</b>{feedback.feedbackSummary.gaps.map(row=><div key={row.id}><strong>{row.message}</strong><span>{row.label}</span>{row.evidence&&<blockquote>Na tua resposta: “{row.evidence}”</blockquote>}</div>)}</section>}
              {feedback.feedbackSummary.errorDiagnosis&&feedbackSummary.errorDiagnosis.code!=="correct_or_near_correct"&&<p className="automaticFeedbackNext"><b>{feedback.feedbackSummary.errorDiagnosis.label}:</b> {feedback.feedbackSummary.errorDiagnosis.message}</p>}
              <p className="automaticFeedbackNext"><b>Para subir este resultado:</b> {feedback.feedbackSummary.nextAction}</p>
            </div>}
            <details className="automaticCriteriaDetails"><summary>Ver critérios detalhados</summary><div className="automaticCriteriaList">{(feedback.criteria||[]).map(criterion=><div key={criterion.id} className={"automaticCriterion "+criterion.status}><div><b>{criterion.label}</b><span>{criterion.status==="observed"?"✓ Detetado":criterion.status==="partial"?"◐ Parcial":"○ Não detetado"}</span></div>{(criterion.observations||[]).map(observation=><small key={observation.id}>{observation.status==="observed"?"✓":observation.status==="partial"?"◐":"○"} {observation.label}</small>)}</div>)}</div></details>
            <p className="muted">A resposta fica fechada depois de submetida. Lê a correção com atenção e usa o feedback para responder melhor numa próxima questão. Uma formulação diferente pode estar correta; por isso, respostas abertas continuam assinaladas como provisórias quando a confiança não é suficiente.</p>
          </div>}
          <button className="primary" onClick={next}>{position===session.items.length?"Ver resultado":"Seguinte"}</button>
        </>}
      </div>
    </Shell>;
  }

  if(view==="curriculumOnboard"||view==="curriculum"){
    const rows=PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===currentYear);
    if(finishedSecondary){
      return <Shell className="wideStudentShell">
        <p className="eyebrow">{view==="curriculumOnboard"?"MATÉRIA DADA · "+onboardingStep.position+" DE "+onboardingStep.total+" · FÍSICA E QUÍMICA A":"MATÉRIA DADA NA ESCOLA"}</p>
        <div className="completedCurriculumHero"><span>✓</span><div><small>MATÉRIA ASSUMIDA COMO DADA</small><h1>Todo o programa de Física e Química A fica disponível.</h1><p>Como já terminaste o secundário, a app assume automaticamente a matéria do 10.º e 11.º anos, incluindo Física, Química e trabalho prático.</p></div></div>
        <button className="primary" onClick={()=>{
          setS(prev=>{
            const configured={...prev,subjectSettings:{...(prev.subjectSettings||{}),[SUBJECT_ID]:{...(prev.subjectSettings?.[SUBJECT_ID]||{}),taughtUnitIds:allSubtopicIds(),curriculumConfigured:true}}};
            return view==="curriculumOnboard"&&onboardingStep.nextId?activateSubjectState(configured,onboardingStep.nextId):view==="curriculumOnboard"?finishSubjectOnboardingState(configured,onboardingStep.firstId):configured;
          });
          go(view==="curriculumOnboard"?(onboardingStep.nextId?"onboard":onboardingDoneScreen):"progress");
        }}>{view==="curriculumOnboard"?(onboardingStep.nextId?"Configurar próxima disciplina":"Continuar"):"Guardar"}</button>
      </Shell>;
    }
    const totalSubtopics=rows.flatMap(row=>physicsChemistrySubtopicsForDomain(row.id)).length;
    return <Shell className="wideStudentShell">
      
      <p className="eyebrow">{view==="curriculumOnboard"?"MATÉRIA DADA · "+onboardingStep.position+" DE "+onboardingStep.total+" · FÍSICA E QUÍMICA A":"MATÉRIA DADA NA ESCOLA"}</p>
      <h1>O que já deste no {currentYear}?</h1>
      <p className="muted">A matéria do ano anterior fica disponível. No ano atual, abre cada matéria e assinala apenas as submatérias que a tua turma já trabalhou.</p>
      <div className="scopeCounter"><b>{scopeDraft.length}</b><span>de {totalSubtopics} submatérias assinaladas</span></div>
      <div className="curriculumPicker fqaCurriculumPicker">{rows.map(row=>{const topics=physicsChemistrySubtopicsForDomain(row.id);const ids=topics.map(topic=>topic.id);const count=ids.filter(id=>scopeDraft.includes(id)).length;const all=count===ids.length&&ids.length>0;return <details key={row.id} open={count>0}>
        <summary><div><b>{row.title}</b><small>{row.area} · {count}/{ids.length} selecionadas</small></div><span>⌄</span></summary>
        <button type="button" className="selectTheme" onClick={()=>setScopeDraft(current=>all?current.filter(id=>!ids.includes(id)):[...new Set([...current,...ids])])}>{all?"Desmarcar esta matéria":"Selecionar toda esta matéria"}</button>
        <div>{topics.map(topic=><label key={topic.id}><input type="checkbox" checked={scopeDraft.includes(topic.id)} onChange={()=>setScopeDraft(current=>current.includes(topic.id)?current.filter(id=>id!==topic.id):[...current,topic.id])}/><span>{topic.label}</span></label>)}</div>
      </details>})}</div>
      {!scopeDraft.length&&<div className="notice warning"><b>Ainda não assinalaste nenhuma submatéria deste ano</b><span>No 10.º ano, o diagnóstico e as missões ficam indisponíveis até assinalares pelo menos uma submatéria. Podes voltar aqui sempre que começares matéria nova.</span></div>}
      <div className="notice"><b>O teu histórico fica guardado</b><span>Se desmarcares uma submatéria, os resultados anteriores não são apagados; apenas deixam de influenciar o plano enquanto ela estiver fora do âmbito.</span></div>
      <button className="primary" onClick={()=>{
        setS(prev=>{
          const configured={...prev,subjectSettings:{...(prev.subjectSettings||{}),[SUBJECT_ID]:{...(prev.subjectSettings?.[SUBJECT_ID]||{}),taughtUnitIds:scopeDraft,curriculumConfigured:true}}};
          return view==="curriculumOnboard"&&onboardingStep.nextId?activateSubjectState(configured,onboardingStep.nextId):view==="curriculumOnboard"?finishSubjectOnboardingState(configured,onboardingStep.firstId):configured;
        });
        go(view==="curriculumOnboard"?(onboardingStep.nextId?"onboard":onboardingDoneScreen):"progress");
      }}>{view==="curriculumOnboard"?(onboardingStep.nextId?"Configurar próxima disciplina":"Continuar"):"Guardar matéria dada"}</button>
    </Shell>;
  }

  if(view==="diagnostic")return <Shell>
    <p className="eyebrow">AVALIAÇÃO INICIAL · FÍSICA E QUÍMICA A · PROVA 715</p>
    <div className="diagApronsoHero"><div><h1>Diagnóstico de Física e Química A</h1><div className="diagPurposeHero"><small>8 PERGUNTAS · SÓ MATÉRIA DO TEU PERCURSO</small><strong>8 perguntas para localizar o ponto de partida, usando apenas matéria do teu percurso.</strong></div></div><Apronso pose="thinking" alt="Apronso a pensar"/></div>
    {!scopedCoverage.diagnosticReady&&<div className="notice warning"><b>Primeiro atualiza a matéria dada</b><span>O diagnóstico precisa de cobertura suficiente dos domínios já lecionados.</span></div>}
    <button className="primary" disabled={!scopedCoverage.diagnosticReady} onClick={startDiagnostic}>Começar diagnóstico</button>
  </Shell>;

  if(view==="trainingSetup"){
    const rows=PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===practiceYear);
    const subtopics=practiceDomain?physicsChemistrySubtopicsForDomain(practiceDomain):[];
    const availableInSelection=practiceSubtopic?(coverage.bySubtopic[practiceSubtopic]||0):practiceDomain?(coverage.byDomain[practiceDomain]||0):0;
    const selectedDomain=physicsChemistryDomainById(practiceDomain);
    const selectedSubtopic=physicsChemistrySubtopicById(practiceSubtopic);
    const levelLabel={auto:"Adaptado ao meu nível",basic:"Básico",mid:"Intermédio",adv:"Avançado",challenge:"Desafio"}[practiceLevel];
    return <Shell className="wideStudentShell trainingSetupPage">
      <p className="eyebrow">TREINO LIVRE</p><h1>O que queres praticar?</h1>
      <p className="muted">O Treino Livre serve para praticar. <b>Não sobe nem desce diretamente o teu Domínio.</b> Um bom desempenho pode gerar um sinal para confirmar mais tarde numa Missão ou Exame.</p>

      <h3>1. Ano</h3><div className="chips yearSelector">{SCHOOL_YEARS.map(year=><button type="button" key={year} className={practiceYear===year?"sel":""} onClick={()=>{const firstDomain=allDomainIdsForYear(year)[0]||null;setPracticeYear(year);setPracticeDomain(firstDomain);setPracticeSubtopic(firstDomain?physicsChemistrySubtopicsForDomain(firstDomain)[0]?.id||null:null)}}>{year}</button>)}</div>

      <h3>2. Tema</h3><div className="themeGrid">{rows.map(row=><button type="button" key={row.id} className={practiceDomain===row.id?"sel":""} onClick={()=>{setPracticeDomain(row.id);const first=physicsChemistrySubtopicsForDomain(row.id).find(topic=>(coverage.bySubtopic[topic.id]||0)>=7);setPracticeSubtopic(first?.id||null)}}><b>{row.shortTitle}</b><small>{row.area+" · banco disponível"}</small></button>)}</div>

      {practiceDomain&&<><h3>3. Em que queres focar-te?</h3><div className="chips fqaSubtopicChips">{subtopics.map(row=><button type="button" key={row.id} className={practiceSubtopic===row.id?"sel":""} onClick={()=>setPracticeSubtopic(row.id)}>{row.label}{(coverage.bySubtopic[row.id]||0)?` (${coverage.bySubtopic[row.id]})`:""}</button>)}</div></>}

      {practiceDomain&&<><h3>4. Nível</h3><div className="levelGrid">{[
        ["auto","✨","Adaptado ao meu nível"],["basic","🟢","Básico"],["mid","🔵","Intermédio"],["adv","🟣","Avançado"],["challenge","🔥","Desafio"]
      ].map(row=><button type="button" key={row[0]} className={practiceLevel===row[0]?"sel":""} onClick={()=>setPracticeLevel(row[0])}><span>{row[1]}</span><b>{row[2]}</b></button>)}</div></>}

      {practiceDomain&&practiceSubtopic&&availableInSelection>=7&&<div className="trainingSummary"><b>{selectedDomain?.shortTitle} → {selectedSubtopic?.label}</b><span>{availableInSelection} perguntas disponíveis neste foco · nível: {levelLabel}. A sessão escolhe 7–8 perguntas e evita repetições recentes sempre que possível.</span></div>}
      {practiceSubtopic&&availableInSelection<7&&<div className="notice"><b>Conteúdo ainda em construção</b><span>Esta submatéria ainda não tem perguntas suficientes para uma sessão completa.</span></div>}

      <button className="primary" disabled={!practiceDomain||!practiceSubtopic||availableInSelection<7} onClick={startPractice}>Começar treino</button>
    </Shell>;
  }

  if(view==="train")return <Shell className="wideStudentShell trainHub">{sharedTop}<StudyModeHub subjectId={SUBJECT_ID} go={go}/>{sharedNav}</Shell>;
  if(view==="reviewMatter")return <Shell className="wideStudentShell reviewStudyPage">{sharedTop}<PhysicsChemistryLearnPanel schoolYear={currentYear}/>{sharedNav}</Shell>;

  if(view==="exams")return <Shell className="wideStudentShell examHub">{sharedTop}<div className="sectionIntro"><p className="eyebrow">EXAMES</p><h1>Física e Química A · 715</h1><p className="muted">Escolhe entre um treino mais curto e o Exame Completo com a estrutura 15 obrigatórios + 8 opcionais, contando os 4 melhores opcionais.</p></div>
    <ApronsoNudge pose="thinking" tone="dark">Aqui não dou pistas durante as perguntas. No fim, voltamos à prova para rever as tuas respostas.</ApronsoNudge>
    {examDrafts.map(({id,title,route,draft})=><div className="pausedSession" key={id}><div><small>{draft.review?"REVISÃO EM PAUSA":"PROVA EM PAUSA"}</small><b>{title}</b><span>{draft.review?"Retoma a revisão por critérios.":`Pergunta ${(draft.index||0)+1} de ${draft.itemIds?.length||0}`} · {physicsChemistryDraftAgeLabel(draft.updatedAt)}</span></div><button onClick={()=>go(route)}>Continuar →</button></div>)}
    <div className="trainChoices">
      <button onClick={()=>go("physicsChemistryMini1")}><span>📝</span><div><b>Mini-exame · Modelo 1</b><small>12 itens · 45 min · seleção, construção e suportes científicos</small></div><em>→</em></button>
      <button onClick={()=>go("physicsChemistryMini2")}><span>🧪</span><div><b>Mini-exame · Modelo 2</b><small>12 itens · 45 min · combinação diferente de 10.º e 11.º</small></div><em>→</em></button>
      <button onClick={()=>go("physicsChemistryExam")}><span>⏱️</span><div><b>Exame Completo · 715</b><small>23 itens · 200 pontos · 120 min + 30 min de tolerância</small></div><em>→</em></button>
    </div>{sharedNav}</Shell>;

  if(view==="progress"){
    const rows=PHYSICS_CHEMISTRY_A_DOMAINS.map(domain=>{
      const competence=Object.values(progress.competence).filter(row=>row.domainId===domain.id);
      const attempts=competence.reduce((sum,row)=>sum+(row.deterministicAttempts||0),0);
      const correct=competence.reduce((sum,row)=>sum+(row.correct||0),0);
      return {...domain,attempts,percent:attempts?Math.round(correct/attempts*100):null};
    });
    const dimensions=[
      {id:"knowledge",label:"Conhecimento científico",competencies:["fqa-concepts","fqa-data"],note:"Inclui interpretação de dados, gráficos e modelos."},
      {id:"practical",label:"Trabalho prático",competencies:["fqa-experimental"],note:"Procedimentos, variáveis, incerteza e análise experimental."},
      {id:"problems",label:"Resolução de problemas",competencies:["fqa-problems"],note:"Estratégia, relações quantitativas e coerência do resultado."},
      {id:"communication",label:"Comunicação científica",competencies:["fqa-communication"],note:"Explicações, justificações e conclusões cientificamente rigorosas."}
    ].map(dimension=>{
      const evidence=dimension.competencies.map(id=>progress.competence[id]).filter(Boolean);
      const deterministic=evidence.reduce((sum,row)=>sum+(row.deterministicAttempts||0),0);
      const correct=evidence.reduce((sum,row)=>sum+(row.correct||0),0);
      const observed=evidence.reduce((sum,row)=>sum+(row.rubricObserved||0),0);
      const needsReview=evidence.reduce((sum,row)=>sum+(row.rubricNeedsReview||0),0);
      const reviewed=evidence.reduce((sum,row)=>sum+(row.rubricReviews||0),0);
      const structuredScored=evidence.reduce((sum,row)=>sum+(row.structuredScoredAttempts||0),0);
      const structuredEarned=evidence.reduce((sum,row)=>sum+(row.structuredNormalizedEarned||0),0);
      const structuredNeedsReview=evidence.reduce((sum,row)=>sum+(row.structuredNeedsReview||0),0);
      const totalSignals=deterministic+structuredScored+observed+needsReview;
      const positive=correct+structuredEarned+observed;
      return {...dimension,deterministic,correct,observed,needsReview,reviewed,structuredScored,structuredEarned,structuredNeedsReview,percent:totalSignals?Math.round(positive/totalSignals*100):null};
    });
    const totalSignals=dimensions.reduce((sum,row)=>sum+row.deterministic+row.structuredScored+row.observed+row.needsReview,0);
    const positiveSignals=dimensions.reduce((sum,row)=>sum+row.correct+row.structuredEarned+row.observed,0);
    const overall=totalSignals?Math.round(positiveSignals/totalSignals*100):null;
    return <Shell className="wideStudentShell progressPage">{sharedTop}<div className="sectionIntro"><p className="eyebrow">PROGRESSO</p><h1>Como estás a evoluir.</h1></div>
      <div className="progressHero"><div><small>PREPARAÇÃO</small><b>{overall??"—"}<em>{overall!==null?"/100":""}</em></b><div className="bar"><i style={{width:(overall??0)+"%"}}/></div><span>Índice parcial</span></div><p><small>OBJETIVO</small><b>{subjectGoal(s,SUBJECT_ID)} valores</b><span>O índice não prevê a tua nota de exame.</span></p><Apronso pose="progress" alt="Apronso acompanha o teu progresso"/></div>
      <div className="progressOverview">{rows.map(row=><div key={row.id}><span>{row.shortTitle}</span><div className="bar"><i style={{width:(row.percent??0)+"%"}}/></div><b>{row.percent??"—"}</b></div>)}</div>
      <div className="progressActions"><button className="secondary" onClick={()=>go("curriculumSettings")}>Atualizar matéria dada</button><button className="secondary" onClick={()=>go("profileSettings")}>Ano e percurso escolar</button></div>
      <details className="progressDetails"><summary>Ver detalhe por matéria →</summary>
        <p className="muted">Consulta domínio, evidência e competências científicas quando precisares de perceber melhor o resultado.</p>
        <section className="fqaCompetencyProgress"><div className="fqaCompetencyProgressHead"><div><small>COMPETÊNCIAS DE FQ A</small><h2>O que o teu trabalho já mostra</h2></div><span>Não é uma nota.</span></div>
          <p className="muted">Combina respostas objetivas com evidência que tu próprio assinalaste nas respostas científicas. “Parcial” e “Ainda não” ficam como pontos a rever, não como classificação automática.</p>
          <div className="fqaCompetencyGrid">{dimensions.map(row=><article key={row.id}><div><b>{row.label}</b><small>{row.note}</small></div><strong>{row.percent===null?"—":row.percent+"%"}</strong><div className="bar"><i style={{width:(row.percent??0)+"%"}}/></div><footer><span>{row.observed} evidências cumpridas</span><span>{row.structuredScored} problemas por etapas</span><span>{row.needsReview+row.structuredNeedsReview} a rever</span></footer></article>)}</div>
        </section>
        {rows.map(row=><div className={"prog "+(row.percent===null?"unmeasured":"")} key={row.id}><div className="progHead"><b>{row.shortTitle}</b><small>{row.area} · {row.year}</small></div>{row.percent===null?<div className="noEvidence"><b>Ainda sem estimativa</b><span>A app vai recolher evidência quando praticares esta área.</span></div>:<><span>Domínio estimado: {row.percent}/100</span><div className="bar"><i style={{width:row.percent+"%"}}/></div><div className="certaintyRow"><span>Evidência objetiva</span><b>{row.attempts} respostas</b><small>As respostas científicas abertas e os problemas por etapas mantêm a sua evidência separada.</small></div></>}</div>)}
      </details>
      <details className="progressHelp"><summary>ⓘ Como interpretar o teu progresso</summary><div className="notice"><b>Preparação ≠ nota de exame</b><span>O índice resume apenas a evidência disponível nesta disciplina e pode mudar com novas respostas.</span></div><div className="notice"><b>Respostas científicas</b><span>A evidência por critérios e os problemas por etapas não são convertidos automaticamente numa classificação final.</span></div></details>
      {progress.lastPosition&&<button className="primary" onClick={resume}>Retomar sessão em pausa</button>}{sharedNav}</Shell>;
  }

  return <main className="learnHome"><section className="wrap studentSurface">{sharedTop}<FriendsBetaRibbon s={s}/>
    <div className="learnIntro"><p>Olá 👋</p><h1>O teu próximo passo.</h1><span>{missionDone?"Missão feita. Podes continuar por tua conta.":progress.diagnosticDone?"Uma recomendação curta, escolhida a partir do teu percurso.":"Primeiro, vamos encontrar o melhor ponto de partida."}</span></div>
    {progress.lastPosition&&<div className="pausedSession"><div><small>SESSÃO EM PAUSA</small><b>{progress.lastPosition.label}</b><span>Pergunta {progress.lastPosition.current+1} de {progress.lastPosition.itemIds.length}</span></div><button onClick={resume}>Continuar →</button></div>}
    {!progress.lastPosition&&examDrafts.map(({id,title,route,draft})=><div className="pausedSession" key={"home-"+id}><div><small>{draft.review?"REVISÃO EM PAUSA":"PROVA EM PAUSA"}</small><b>{title}</b><span>{draft.review?"Retoma a revisão por critérios.":`Pergunta ${(draft.index||0)+1} de ${draft.itemIds?.length||0}`} · {physicsChemistryDraftAgeLabel(draft.updatedAt)}</span></div><button onClick={()=>go(route)}>Continuar →</button></div>)}
    <section className="adaptivePath" aria-label="Caminho adaptativo de Física e Química A">
      <div className={`pathNode ${progress.diagnosticDone?"done":"current"}`}><span>{progress.diagnosticDone?"✓":"●"}</span><div><small>{progress.diagnosticDone?"ÚLTIMO PASSO":"PRIMEIRO PASSO"}</small><b>{progress.diagnosticDone?"Diagnóstico concluído":"Conhecer o teu ponto de partida"}</b></div></div>
      <div className="pathLine active"/>
      <div className={`pathNode current ${missionDone?"complete":""}`}><span>{missionDone?"✓":"●"}</span><article><small>{progress.diagnosticDone?(missionDone?"MISSÃO CONCLUÍDA":"MISSÃO DE HOJE"):"PRÓXIMO PASSO"}</small><h2>{progress.diagnosticDone?"Física e Química A adaptada ao teu percurso":"Diagnóstico de Física e Química A"}</h2><div className="missionCardMeta"><span>{progress.diagnosticDone?"~3–5 min":"8 perguntas"}</span>{progress.diagnosticDone&&<span>{currentYear}</span>}</div><button disabled={!!progress.lastPosition||(!progress.diagnosticDone&&!scopedCoverage.diagnosticReady)||(!missionDone&&progress.diagnosticDone&&!scopedCoverage.missionReady)} onClick={missionDone?()=>go("train"):progress.diagnosticDone?()=>startMission():startDiagnostic}>{missionDone?"Continuar a estudar":progress.diagnosticDone?"Começar Missão":"Começar diagnóstico"}</button></article></div>
      <div className="pathLine"/>
      <div className="pathNode next"><span>○</span><div><small>PRÓXIMO PASSO PROVÁVEL</small><b>{progress.diagnosticDone?"Praticar, rever matéria ou fazer um exame":"Primeira Missão adaptada"}</b><p>Pode mudar com nova evidência.</p></div></div>
    </section>
    {!scopedCoverage.diagnosticReady&&<div className="notice warning homeScopeWarning"><b>Atualiza a matéria dada</b><span>O diagnóstico precisa de 8 perguntas disponíveis dentro da matéria que assinalaste. Podes começar mesmo que ainda só tenhas dado uma pequena parte do programa.</span><button onClick={()=>go("curriculumSettings")}>Indicar matéria dada</button></div>}
    {sharedNav}</section></main>;
}
