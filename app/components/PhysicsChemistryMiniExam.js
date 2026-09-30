"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {Shell,StudySessionHeader} from "./chrome";
import PhysicsChemistryStimulus from "./PhysicsChemistryStimulus";
import ExamSubmissionCheck from "./ExamSubmissionCheck";
import {PhysicsChemistryStepwiseEditor,PhysicsChemistryStepwiseReview} from "./PhysicsChemistryStepwise";
import {gradePhysicsChemistryResponse} from "../lib/physicsChemistryEngine";
import {recordSubjectSession} from "../lib/subjectProgress";
import {physicsChemistryMiniExamById} from "../data/physicsChemistryMiniExams";
import {clearPhysicsChemistryExamDraft,loadPhysicsChemistryExamDraft,savePhysicsChemistryExamDraft} from "../lib/physicsChemistryExamDraft";

const SUBJECT_ID="physics-chemistry-a";

function filled(item,value){
  if(item.responseType==="multiple-choice")return Number.isInteger(value);
  if(item.responseType==="stepwise")return Object.values(value?.steps||{}).some(row=>row&&typeof row==="object"?Object.values(row).some(part=>String(part??"").trim()):String(row??"").trim());
  return String(value??"").trim().length>0;
}

function Editor({item,value,onChange}){
  if(item.responseType==="multiple-choice")return <div className="opts">{item.options.map((option,index)=><button type="button" key={option} className={value===index?"selected":""} onClick={()=>onChange(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>;
  if(item.responseType==="stepwise")return <PhysicsChemistryStepwiseEditor item={item} value={value} onChange={onChange}/>;
  return <textarea className="fqaExamText" rows={8} value={typeof value==="string"?value:""} onChange={event=>onChange(event.target.value)} placeholder="Escreve a tua resposta científica..."/>;
}

function formatTime(seconds){
  const safe=Math.max(0,seconds);
  const minutes=Math.floor(safe/60);
  const rest=safe%60;
  return String(minutes).padStart(2,"0")+":"+String(rest).padStart(2,"0");
}

export default function PhysicsChemistryMiniExam({modelId="fqa-mini-1",s,setS,go}){
  const exam=physicsChemistryMiniExamById(modelId);
  const itemIds=useMemo(()=>exam.items.map(row=>row.id),[exam.items]);
  const [initialDraft]=useState(()=>loadPhysicsChemistryExamDraft(exam.id,exam.items.map(row=>row.id)));
  const [index,setIndex]=useState(()=>Math.max(0,Math.min(exam.items.length-1,initialDraft?.index||0)));
  const [answers,setAnswers]=useState(()=>initialDraft?.answers||{});
  const [review,setReview]=useState(()=>!!initialDraft?.review);
  const [submitCheck,setSubmitCheck]=useState(false);
  const [rubricAssessments,setRubricAssessments]=useState(()=>initialDraft?.rubricAssessments||{});
  const [markedForReview,setMarkedForReview]=useState(()=>initialDraft?.markedForReview||[]);
  const [startedAt]=useState(()=>initialDraft?.startedAt||Date.now());
  const [now,setNow]=useState(Date.now);
  const recordedRef=useRef(false);
  const item=exam.items[index];
  const answeredCount=exam.items.filter(row=>filled(row,answers[row.id])).length;
  const elapsed=Math.floor((now-startedAt)/1000);
  const remaining=Math.max(0,exam.durationMinutes*60-elapsed);

  useEffect(()=>{
    if(review)return undefined;
    const timer=window.setInterval(()=>setNow(Date.now()),1000);
    return ()=>window.clearInterval(timer);
  },[review]);
  useEffect(()=>{if(remaining===0&&!review)finish({force:true})},[remaining,review]);
  useEffect(()=>{
    savePhysicsChemistryExamDraft(exam.id,{itemIds,index,answers,startedAt,review,rubricAssessments,markedForReview});
  },[answers,exam.id,index,itemIds,markedForReview,review,rubricAssessments,startedAt]);

  const baseResults=useMemo(()=>exam.items.map(row=>gradePhysicsChemistryResponse(row,answers[row.id])),[exam.items,answers]);
  const results=baseResults;
  const deterministic=exam.items.map((row,i)=>({item:row,result:results[i]})).filter(row=>row.item.responseType==="multiple-choice");
  const deterministicCorrect=deterministic.filter(row=>row.result.correct).length;
  const provisional=results.filter(row=>["structured-provisional","auto-assessed-provisional"].includes(row.gradingMode)||row.status==="auto-assessed-provisional").length;
  const openPending=results.filter(row=>row.requiresReview).length;

  function answer(value){setAnswers(current=>({...current,[item.id]:value}))}
  function respond(){
    if(!filled(item,answers[item.id]))return;
    if(index<exam.items.length-1)setIndex(value=>value+1);
  }
  function toggleMarked(id){setMarkedForReview(current=>current.includes(id)?current.filter(row=>row!==id):[...current,id]);}
  function finish({force=false}={}){if(force){setReview(true);return;}setSubmitCheck(true);}

  function saveReviewAndExit(){
    if(!recordedRef.current){
      recordedRef.current=true;
      setS(prev=>recordSubjectSession(prev,{
        subjectId:SUBJECT_ID,kind:"mini_exam",label:exam.label,items:exam.items,results,sessionId:exam.id+"-"+startedAt
      }));
    }
    clearPhysicsChemistryExamDraft(exam.id);
    go("exams");
  }

  if(submitCheck&&!review)return <Shell className="wideStudentShell fqaSubmitCheckPage">
    <ExamSubmissionCheck
      items={exam.items}
      answers={answers}
      isAnswered={filled}
      markedIds={markedForReview}
      onBack={()=>setSubmitCheck(false)}
      onJump={next=>{setSubmitCheck(false);setIndex(next)}}
      onConfirm={()=>{setSubmitCheck(false);setReview(true)}}
    />
  </Shell>;

  if(review)return <Shell className="wideStudentShell fqaMiniReviewPage">
    <button className="back" onClick={saveReviewAndExit}>← Guardar revisão e voltar aos exames</button>
    <p className="eyebrow">FÍSICA E QUÍMICA A · MINI-EXAME</p>
    <h1>Rever o mini-exame</h1>
    <div className="fqaExamScoreGrid">
      <div><small>Respondidas</small><b>{answeredCount} / {exam.itemCount}</b></div>
      <div><small>Escolha múltipla</small><b>{deterministicCorrect} / {deterministic.length}</b><span>corretas</span></div>
      <div><small>Construídas</small><b>{provisional}</b><span>{openPending?"inclui avaliações de confiança reduzida":"correção provisória"}</span></div>
    </div>
    <div className="notice"><b>Correção automática maximizada</b><span>A app corrige escolhas, etapas e respostas científicas automaticamente sempre que consegue. Nas respostas abertas, a pontuação continua provisória quando a interpretação tem incerteza.</span></div>
    <div className="fqaExamReviewList">{exam.items.map((row,rowIndex)=>{
      const value=answers[row.id],result=results[rowIndex];
      const resultLabel=row.responseType==="multiple-choice"?(result.correct?"Correta":"A rever"):result.status==="unanswered"?"Sem resposta":"Avaliação automática";
      return <details id={"fqa-review-"+row.id} className="reviewChapter" key={row.id}><summary><div><small>{row.year} · {row.responseType==="multiple-choice"?"SELEÇÃO":"CONSTRUÇÃO"}</small><b>{rowIndex+1}. {row.prompt}</b></div><span>{resultLabel}</span></summary><div className="reviewChapterBody">
        <PhysicsChemistryStimulus item={row}/>
        {row.responseType==="multiple-choice"&&<><p><b>A tua resposta:</b> {Number.isInteger(value)?row.options[value]:"Sem resposta"}</p>{!result.correct&&<p><b>Resposta correta:</b> {row.options[row.answerIndex]}</p>}<p>{row.explanation}</p></>}
        {row.responseType==="stepwise"&&<PhysicsChemistryStepwiseReview item={row} result={result}/>} 
        {row.responseType==="restricted-response"&&<><p><b>A tua resposta:</b> {value||"Sem resposta"}</p>{Number.isFinite(result.provisionalPoints)&&<div className="autoAssessmentScore"><b>{String(result.provisionalPoints).replace(".",",")} / {result.maxPoints} pontos</b><small>estimativa provisória · confiança {result.autoAssessmentConfidence??"—"}%</small></div>}{result.feedbackSummary&&<div className="automaticFeedbackPanel">
    {result.feedbackSummary.strengths.length>0&&<section className="automaticFeedbackGood"><b>O que fizeste bem</b>{result.feedbackSummary.strengths.map(row=><div key={row.id}><strong>✓ {row.label}</strong>{row.evidence&&<blockquote>“{row.evidence}”</blockquote>}</div>)}</section>}
    {result.feedbackSummary.gaps.length>0&&<section className="automaticFeedbackImprove"><b>O que faltou</b>{result.feedbackSummary.gaps.map(row=><div key={row.id}><strong>{row.message}</strong><span>{row.label}</span></div>)}</section>}
    <p className="automaticFeedbackNext"><b>Próximo passo:</b> {result.feedbackSummary.nextAction}</p>
  </div>}<div className="automaticCriteriaList">{(result.criteria||[]).map(criterion=><div className={"automaticCriterion "+criterion.status} key={criterion.id}><div><b>{criterion.label}</b><span>{criterion.status==="observed"?"✓ Detetado":criterion.status==="partial"?"◐ Parcial":"○ Não detetado"}</span></div></div>)}</div><p className="muted">Uma formulação cientificamente equivalente pode ser válida. O aluno não precisa de preencher uma autoavaliação.</p></>}
      </div></details>;
    })}</div>
    {openPending>0&&<div className="notice warning"><b>{openPending} avaliação(ões) com confiança reduzida</b><span>A app já as avaliou provisoriamente; não precisas de completar nenhuma grelha manual.</span></div>}
    <button className="primary" onClick={saveReviewAndExit}>Guardar revisão e terminar</button>
  </Shell>;

  return <Shell className="wideStudentShell fqaMiniExamPage">
    <StudySessionHeader progress={(index+1)/exam.items.length*100} label={(index+1)+"/"+exam.items.length} onExit={()=>{savePhysicsChemistryExamDraft(exam.id,{itemIds,index,answers,startedAt,review,rubricAssessments,markedForReview});go("exams")}} exitLabel="Guardar e sair"/>
    {initialDraft&&<div className="notice"><b>Rascunho retomado</b><span>As respostas e o tempo de início foram recuperados deste dispositivo.</span></div>}
    <div className="fqaExamMeta"><span>MINI-EXAME</span><b>{exam.label.replace("Mini-exame · ","")}</b><small>{formatTime(remaining)}</small></div>
    <PhysicsChemistryStimulus item={item}/>
    <div className="questionCard">
      <h2>{item.prompt}</h2>
      <Editor item={item} value={answers[item.id]} onChange={answer}/>
      <button type="button" className={"examMarkButton "+(markedForReview.includes(item.id)?"is-marked":"")} onClick={()=>toggleMarked(item.id)}>{markedForReview.includes(item.id)?"★ Marcada para rever":"☆ Marcar para rever"}</button>
      <div className="fqaMiniAnswerActions">
        <button className="primary" disabled={!filled(item,answers[item.id])} onClick={respond}>Responder</button>
        {index===exam.items.length-1&&<button className="secondary" onClick={()=>finish()}>Terminar e rever</button>}
      </div>
    </div>
    <div className="fqaExamNavigation">
      <button className="secondary" disabled={index===0} onClick={()=>setIndex(value=>value-1)}>← Anterior</button>
      <div className="fqaExamDots">{exam.items.map((row,rowIndex)=><button type="button" key={row.id} className={(rowIndex===index?"current ":"")+(filled(row,answers[row.id])?"done ":"")+(markedForReview.includes(row.id)?"marked":"")} onClick={()=>setIndex(rowIndex)} aria-label={"Questão "+(rowIndex+1)}>{rowIndex+1}</button>)}</div>
      <button className="secondary" disabled={index===exam.items.length-1} onClick={()=>setIndex(value=>value+1)}>Seguinte →</button>
    </div>
    <p className="muted fqaExamRule">O botão “Responder” confirma a resposta atual, mas não mostra a correção durante o mini-exame. Podes voltar atrás antes de terminar.</p>
  </Shell>;
}
