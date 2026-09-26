"use client";
import {useEffect,useMemo,useState} from "react";
import {Shell,StudySessionHeader} from "./chrome";
import PhysicsChemistryStimulus from "./PhysicsChemistryStimulus";
import {gradePhysicsChemistryResponse} from "../lib/physicsChemistryEngine";
import {recordSubjectSession} from "../lib/subjectProgress";
import {physicsChemistryMiniExamById} from "../data/physicsChemistryMiniExams";

const SUBJECT_ID="physics-chemistry-a";

function filled(item,value){
  if(item.responseType==="multiple-choice")return Number.isInteger(value);
  if(item.responseType==="stepwise")return Object.values(value?.steps||{}).some(row=>String(row??"").trim());
  return String(value??"").trim().length>0;
}

function Editor({item,value,onChange}){
  if(item.responseType==="multiple-choice")return <div className="opts">{item.options.map((option,index)=><button type="button" key={option} className={value===index?"selected":""} onClick={()=>onChange(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>;
  if(item.responseType==="stepwise")return <div className="fqaStepwise">{item.steps.map((step,index)=><label className="fqaStep" key={step.id}><span><b>{"Etapa "+(index+1)+" · "+step.label}</b><small>{step.unit?"Unidade esperada: "+step.unit:"Expressão/relação pedida"}</small></span><input value={value?.steps?.[step.id]||""} onChange={event=>onChange({...(value&&typeof value==="object"?value:{}),steps:{...(value?.steps||{}),[step.id]:event.target.value}})}/></label>)}</div>;
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
  const [index,setIndex]=useState(0);
  const [answers,setAnswers]=useState({});
  const [review,setReview]=useState(false);
  const [startedAt]=useState(Date.now);
  const [now,setNow]=useState(Date.now);
  const item=exam.items[index];
  const answeredCount=exam.items.filter(row=>filled(row,answers[row.id])).length;
  const elapsed=Math.floor((now-startedAt)/1000);
  const remaining=Math.max(0,exam.durationMinutes*60-elapsed);

  useEffect(()=>{
    if(review)return undefined;
    const timer=window.setInterval(()=>setNow(Date.now()),1000);
    return ()=>window.clearInterval(timer);
  },[review]);
  useEffect(()=>{if(remaining===0&&!review)setReview(true)},[remaining,review]);

  const results=useMemo(()=>exam.items.map(row=>gradePhysicsChemistryResponse(row,answers[row.id])),[exam.items,answers]);
  const deterministic=exam.items.map((row,i)=>({item:row,result:results[i]})).filter(row=>row.item.responseType==="multiple-choice");
  const deterministicCorrect=deterministic.filter(row=>row.result.correct).length;
  const provisional=results.filter(row=>row.status==="provisional-review").length;
  const openPending=results.filter(row=>row.status==="awaiting-rubric").length;

  function answer(value){setAnswers(current=>({...current,[item.id]:value}))}
  function respond(){
    if(!filled(item,answers[item.id]))return;
    if(index<exam.items.length-1)setIndex(value=>value+1);
  }
  function finish(){
    setReview(true);
    setS(prev=>recordSubjectSession(prev,{
      subjectId:SUBJECT_ID,kind:"mini_exam",label:exam.label,items:exam.items,results,sessionId:exam.id+"-"+Date.now()
    }));
  }

  if(review)return <Shell className="wideStudentShell fqaMiniReviewPage">
    <button className="back" onClick={()=>go("exams")}>← Voltar aos exames</button>
    <p className="eyebrow">FÍSICA E QUÍMICA A · MINI-EXAME</p>
    <h1>Rever o mini-exame</h1>
    <div className="fqaExamScoreGrid">
      <div><small>Respondidas</small><b>{answeredCount} / {exam.itemCount}</b></div>
      <div><small>Escolha múltipla</small><b>{deterministicCorrect} / {deterministic.length}</b><span>corretas</span></div>
      <div><small>Construídas</small><b>{provisional+openPending}</b><span>{openPending?"inclui respostas por rever":"correção provisória"}</span></div>
    </div>
    <div className="notice"><b>Sem nota automática final</b><span>As respostas por etapas são apenas provisórias e as respostas científicas abertas são revistas por critérios.</span></div>
    <div className="fqaExamReviewList">{exam.items.map((row,rowIndex)=>{
      const value=answers[row.id],result=results[rowIndex];
      return <details className="reviewChapter" key={row.id}><summary><div><small>{row.year} · {row.responseType==="multiple-choice"?"SELEÇÃO":"CONSTRUÇÃO"}</small><b>{rowIndex+1}. {row.prompt}</b></div><span>{row.responseType==="multiple-choice"?(result.correct?"Correta":"A rever"):result.status==="provisional-review"?"Provisório":"Por rever"}</span></summary><div className="reviewChapterBody">
        <PhysicsChemistryStimulus item={row}/>
        {row.responseType==="multiple-choice"&&<><p><b>A tua resposta:</b> {Number.isInteger(value)?row.options[value]:"Sem resposta"}</p>{!result.correct&&<p><b>Resposta correta:</b> {row.options[row.answerIndex]}</p>}<p>{row.explanation}</p></>}
        {row.responseType==="stepwise"&&<>{result.steps?.map((step,stepIndex)=><p key={step.id}><b>{"Etapa "+(stepIndex+1)+": "}</b>{step.status==="unanswered"?"Sem resposta":step.answer+" → referência: "+step.expected}</p>)}<p className="muted">{result.note}</p></>}
        {row.responseType==="restricted-response"&&<><p><b>A tua resposta:</b> {value||"Sem resposta"}</p><p><b>Critérios a verificar:</b></p><ul>{(row.criteria||[]).map(criterion=><li key={criterion}>{criterion}</li>)}</ul><p className="muted">Uma formulação cientificamente equivalente pode ser válida mesmo que não coincida palavra por palavra com uma referência.</p></>}
      </div></details>;
    })}</div>
  </Shell>;

  return <Shell className="wideStudentShell fqaMiniExamPage">
    <StudySessionHeader progress={(index+1)/exam.items.length*100} label={(index+1)+"/"+exam.items.length} onExit={()=>go("exams")} exitLabel="Sair do mini-exame"/>
    <div className="fqaExamMeta"><span>MINI-EXAME</span><b>{exam.label.replace("Mini-exame · ","")}</b><small>{formatTime(remaining)}</small></div>
    <PhysicsChemistryStimulus item={item}/>
    <div className="questionCard">
      <h2>{item.prompt}</h2>
      <Editor item={item} value={answers[item.id]} onChange={answer}/>
      <div className="fqaMiniAnswerActions">
        <button className="primary" disabled={!filled(item,answers[item.id])} onClick={respond}>Responder</button>
        {index===exam.items.length-1&&<button className="secondary" onClick={finish}>Terminar e rever</button>}
      </div>
    </div>
    <div className="fqaExamNavigation">
      <button className="secondary" disabled={index===0} onClick={()=>setIndex(value=>value-1)}>← Anterior</button>
      <div className="fqaExamDots">{exam.items.map((row,rowIndex)=><button type="button" key={row.id} className={(rowIndex===index?"current ":"")+(filled(row,answers[row.id])?"done":"")} onClick={()=>setIndex(rowIndex)} aria-label={"Questão "+(rowIndex+1)}>{rowIndex+1}</button>)}</div>
      <button className="secondary" disabled={index===exam.items.length-1} onClick={()=>setIndex(value=>value+1)}>Seguinte →</button>
    </div>
    <p className="muted fqaExamRule">O botão “Responder” confirma a resposta atual, mas não mostra a correção durante o mini-exame. Podes voltar atrás antes de terminar.</p>
  </Shell>;
}
