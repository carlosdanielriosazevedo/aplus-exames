"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {Shell,StudySessionHeader} from "./chrome";
import PhysicsChemistryStimulus from "./PhysicsChemistryStimulus";
import ExamSubmissionCheck from "./ExamSubmissionCheck";
import {PhysicsChemistryStepwiseEditor,PhysicsChemistryStepwiseReview} from "./PhysicsChemistryStepwise";
import {PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT} from "../data/physicsChemistryExamBlueprint";
import {gradePhysicsChemistryResponse} from "../lib/physicsChemistryEngine";
import {recordSubjectSession} from "../lib/subjectProgress";
import {clearPhysicsChemistryExamDraft,loadPhysicsChemistryExamDraft,savePhysicsChemistryExamDraft} from "../lib/physicsChemistryExamDraft";

const SUBJECT_ID="physics-chemistry-a";

function answered(item,value){
  if(item.responseType==="multiple-choice")return Number.isInteger(value);
  if(item.responseType==="stepwise")return Object.values(value?.steps||{}).some(row=>row&&typeof row==="object"?Object.values(row).some(part=>String(part??"").trim()):String(row??"").trim());
  return String(value??"").trim().length>0;
}

function examPointsFor(item,result){
  if(!result||result.status==="unanswered")return {points:0,provisional:false,pending:false};
  if(item.responseType==="multiple-choice")return {points:result.correct?item.examPoints:0,provisional:false,pending:false};
  if(["stepwise","restricted-response"].includes(item.responseType)){
    const raw=Number(result.provisionalPoints)||0;
    const max=Number(result.maxPoints)||1;
    return {points:Math.round(raw/max*item.examPoints*10)/10,provisional:true,pending:!!result.requiresReview};
  }
  return {points:0,provisional:true,pending:true};
}

function Stimulus({item}){return <PhysicsChemistryStimulus item={item}/>;}

function ResponseEditor({item,value,onChange,disabled=false}){
  if(item.responseType==="multiple-choice")return <div className="opts">{item.options.map((option,index)=><button type="button" key={option} disabled={disabled} className={value===index?"selected":""} onClick={()=>onChange(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>;
  if(item.responseType==="stepwise")return <PhysicsChemistryStepwiseEditor item={item} value={value} onChange={onChange} disabled={disabled}/>;
  return <textarea className="fqaExamText" disabled={disabled} rows={9} value={typeof value==="string"?value:""} onChange={event=>onChange(event.target.value)} placeholder="Escreve a tua resposta científica..."/>;
}

export default function PhysicsChemistryExam({s,setS,go}){
  const blueprint=PHYSICS_CHEMISTRY_A_FULL_EXAM_BLUEPRINT;
  const rows=useMemo(()=>[...blueprint.mandatoryItems,...blueprint.optionalItems],[]);
  const examId="fqa-full-715";
  const itemIds=useMemo(()=>rows.map(row=>row.id),[rows]);
  const [initialDraft]=useState(()=>loadPhysicsChemistryExamDraft(examId,rows.map(row=>row.id)));
  const [current,setCurrent]=useState(()=>Math.max(0,Math.min(rows.length-1,initialDraft?.index||0)));
  const [answers,setAnswers]=useState(()=>initialDraft?.answers||{});
  const [review,setReview]=useState(()=>!!initialDraft?.review);
  const [submitCheck,setSubmitCheck]=useState(false);
  const [rubricAssessments,setRubricAssessments]=useState(()=>initialDraft?.rubricAssessments||{});
  const [markedForReview,setMarkedForReview]=useState(()=>initialDraft?.markedForReview||[]);
  const [startedAt]=useState(()=>initialDraft?.startedAt||Date.now());
  const [now,setNow]=useState(Date.now);
  const recordedRef=useRef(false);
  const item=rows[current];
  const filled=rows.filter(row=>answered(row,answers[row.id])).length;

  const baseResults=useMemo(()=>rows.map(row=>gradePhysicsChemistryResponse(row,answers[row.id])),[rows,answers]);
  const results=baseResults;
  const scored=useMemo(()=>rows.map((row,index)=>({...examPointsFor(row,results[index]),item:row,result:results[index]})),[rows,results]);
  const mandatory=scored.slice(0,blueprint.mandatoryItems.length);
  const optional=scored.slice(blueprint.mandatoryItems.length);
  const mandatoryKnown=mandatory.reduce((sum,row)=>sum+row.points,0);
  const bestOptional=[...optional].sort((a,b)=>b.points-a.points).slice(0,blueprint.optionalCounted);
  const optionalKnown=bestOptional.reduce((sum,row)=>sum+row.points,0);
  const pendingOpen=scored.filter(row=>row.pending).length;
  const hasProvisional=scored.some(row=>row.provisional);
  const baseSeconds=blueprint.durationMinutes*60;
  const toleranceSeconds=blueprint.toleranceMinutes*60;
  const elapsedSeconds=Math.max(0,Math.floor((now-startedAt)/1000));
  const inTolerance=elapsedSeconds>=baseSeconds&&elapsedSeconds<baseSeconds+toleranceSeconds;
  const timeExpired=elapsedSeconds>=baseSeconds+toleranceSeconds;
  const remainingSeconds=inTolerance
    ?Math.max(0,toleranceSeconds-(elapsedSeconds-baseSeconds))
    :Math.max(0,baseSeconds-elapsedSeconds);

  useEffect(()=>{
    if(review)return undefined;
    const timer=window.setInterval(()=>setNow(Date.now()),1000);
    return ()=>window.clearInterval(timer);
  },[review]);

  useEffect(()=>{if(timeExpired&&!review)finish({force:true})},[timeExpired,review]);
  useEffect(()=>{
    savePhysicsChemistryExamDraft(examId,{itemIds,index:current,answers,startedAt,review,rubricAssessments,markedForReview});
  },[answers,current,examId,itemIds,markedForReview,review,rubricAssessments,startedAt]);

  function toggleMarked(id){setMarkedForReview(current=>current.includes(id)?current.filter(row=>row!==id):[...current,id]);}
  function finish({force=false}={}){if(force){setReview(true);return;}setSubmitCheck(true);}

  function saveReviewAndExit(){
    if(!recordedRef.current){
      recordedRef.current=true;
      setS(prev=>recordSubjectSession(prev,{
        subjectId:SUBJECT_ID,
        kind:"full_exam",
        label:blueprint.label,
        items:rows,
        results,
        sessionId:"fqa-full-"+startedAt
      }));
    }
    clearPhysicsChemistryExamDraft(examId);
    go("exams");
  }

  if(submitCheck&&!review)return <Shell className="wideStudentShell fqaSubmitCheckPage">
    <ExamSubmissionCheck
      items={rows}
      answers={answers}
      isAnswered={answered}
      markedIds={markedForReview}
      isRequired={row=>row.examSection==="mandatory"}
      onBack={()=>setSubmitCheck(false)}
      onJump={next=>{setSubmitCheck(false);setCurrent(next)}}
      onConfirm={()=>{setSubmitCheck(false);setReview(true)}}
    />
  </Shell>;

  if(review)return <Shell className="wideStudentShell fqaExamReviewPage">
    <button className="back" onClick={saveReviewAndExit}>← Guardar revisão e voltar aos exames</button>
    <p className="eyebrow">EXAME COMPLETO · PROVA 715</p>
    <h1>Revisão do Exame Completo</h1>
    <div className="notice"><b>{"Subtotal provisório já corrigível: "+(mandatoryKnown+optionalKnown).toFixed(1)+" / 200"}</b><span>{pendingOpen?pendingOpen+" resposta(s) aberta(s) têm confiança reduzida. ":""}{hasProvisional?"As respostas abertas e problemas por etapas usam classificação provisória quando a correção não é totalmente determinística.":""}</span></div>
    <div className="fqaExamScoreGrid">
      <div><small>Obrigatórios</small><b>{mandatoryKnown.toFixed(1)} / 160</b></div>
      <div><small>Opcionais</small><b>{optionalKnown.toFixed(1)} / 40</b><span>Contam os 4 melhores.</span></div>
      <div><small>Respondidas</small><b>{filled} / {rows.length}</b></div>
    </div>
    <p className="muted">Este subtotal é uma estimativa provisória sempre que inclui respostas abertas ou etapas cuja correção não é totalmente determinística.</p>
    <div className="fqaExamReviewList">{rows.map((row,index)=>{
      const result=results[index],score=scored[index],value=answers[row.id];
      const resultLabel=row.responseType==="multiple-choice"?(result.correct?"Correto":"A rever"):result.status==="unanswered"?"Sem resposta":"Provisório";
      return <details id={"fqa-review-"+row.id} key={row.id} className="reviewChapter"><summary><div><small>{row.examSection==="mandatory"?"OBRIGATÓRIO":"OPCIONAL"} · {row.examPoints} pts</small><b>{index+1}. {row.prompt}</b></div><span>{resultLabel}</span></summary><div className="reviewChapterBody">
        <Stimulus item={row}/>
        {row.responseType==="multiple-choice"&&<><p><b>A tua resposta:</b> {Number.isInteger(value)?row.options[value]:"Sem resposta"}</p><p><b>Resposta correta:</b> {row.options[row.answerIndex]}</p><p>{row.explanation}</p></>}
        {row.responseType==="stepwise"&&<PhysicsChemistryStepwiseReview item={row} result={result}/>} 
        {row.responseType==="restricted-response"&&<><p><b>A tua resposta:</b> {value||"Sem resposta"}</p>{Number.isFinite(result.provisionalPoints)&&<div className="autoAssessmentScore"><b>{String(result.provisionalPoints).replace(".",",")} / {result.maxPoints} pontos-base</b><small>estimativa provisória · confiança {result.autoAssessmentConfidence??"—"}%</small></div>}<div className="automaticCriteriaList">{(result.criteria||[]).map(criterion=><div className={"automaticCriterion "+criterion.status} key={criterion.id}><div><b>{criterion.label}</b><span>{criterion.status==="observed"?"✓ Detetado":criterion.status==="partial"?"◐ Parcial":"○ Não detetado"}</span></div></div>)}</div></>}
      </div></details>;
    })}</div>
    {pendingOpen>0&&<div className="notice warning"><b>{pendingOpen} resposta(s) com confiança reduzida</b><span>A app já atribuiu uma estimativa provisória. Não é necessário o aluno preencher uma grelha de autoavaliação.</span></div>}
    <button className="primary" onClick={saveReviewAndExit}>Guardar revisão e terminar</button>
  </Shell>;

  return <Shell className="wideStudentShell fqaFullExamPage">
    <StudySessionHeader progress={(current+1)/rows.length*100} label={(current+1)+"/"+rows.length} onExit={()=>{savePhysicsChemistryExamDraft(examId,{itemIds,index:current,answers,startedAt,review,rubricAssessments,markedForReview});go("exams")}} exitLabel="Guardar e sair"/>
    {initialDraft&&<div className="notice"><b>Rascunho retomado</b><span>As respostas e o tempo de início foram recuperados deste dispositivo.</span></div>}
    <div className="fqaExamMeta"><span>{item.examSection==="mandatory"?"ITEM OBRIGATÓRIO":"ITEM OPCIONAL"}</span><b>{item.examPoints} pontos</b><small>{item.year}</small><strong className={inTolerance?"is-tolerance":""}>{inTolerance?"Tolerância · ":"Tempo · "}{String(Math.floor(remainingSeconds/60)).padStart(2,"0")}:{String(remainingSeconds%60).padStart(2,"0")}</strong></div>
    <Stimulus item={item}/>
    <div className="questionCard">
      <h2>{item.prompt}</h2>
      <ResponseEditor item={item} value={answers[item.id]} onChange={value=>setAnswers(prev=>({...prev,[item.id]:value}))}/>
      <button type="button" className={"examMarkButton "+(markedForReview.includes(item.id)?"is-marked":"")} onClick={()=>toggleMarked(item.id)}>{markedForReview.includes(item.id)?"★ Marcada para rever":"☆ Marcar para rever"}</button>
    </div>
    <div className="fqaExamNavigation">
      <button className="secondary" disabled={current===0} onClick={()=>setCurrent(value=>value-1)}>← Anterior</button>
      <div className="fqaExamDots">{rows.map((row,index)=><button type="button" key={row.id} className={(index===current?"current ":"")+(answered(row,answers[row.id])?"done ":"")+(markedForReview.includes(row.id)?"marked":"")} onClick={()=>setCurrent(index)} aria-label={"Questão "+(index+1)}>{index+1}</button>)}</div>
      {current<rows.length-1?<button className="primary" onClick={()=>setCurrent(value=>value+1)}>Seguinte →</button>:<button className="primary" onClick={()=>finish()}>Terminar e rever</button>}
    </div>
    <p className="muted fqaExamRule">{inTolerance?"Entraste nos 30 minutos de tolerância. ":""}Durante o Exame Completo não mostramos correções. Podes voltar atrás e alterar respostas antes de terminar; ao esgotar a tolerância, a prova termina automaticamente.</p>
  </Shell>;
}
