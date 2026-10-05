"use client";

import {useMemo,useState} from "react";

const DIAGNOSES=[
  ["correct_or_near_correct","Correta / quase correta"],
  ["incomplete_answer","Resposta incompleta"],
  ["insufficient_justification","Justificação insuficiente"],
  ["conceptual_error","Erro conceptual"],
  ["conceptual_contradiction","Contradição conceptual"],
  ["calculation_error","Erro de cálculo"],
  ["result_only","Só resultado"],
  ["ambiguous_answer","Resposta ambígua"],
  ["off_topic","Fora do tema"],
  ["other","Outro"]
];

function downloadJson(filename,data){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

export default function GraderTeacherValidation(){
  const [pack,setPack]=useState(null);
  const [reviewer,setReviewer]=useState("");
  const [index,setIndex]=useState(0);
  const [labels,setLabels]=useState({});
  const [message,setMessage]=useState("");

  const cases=pack?.cases||[];
  const row=cases[index]||null;
  const current=row?labels[row.case_id]||{}:{};
  const completed=useMemo(()=>Object.values(labels).filter(x=>x.decision&&x.score_percent!==undefined&&x.score_percent!=="").length,[labels]);

  async function importPack(file){
    setMessage("");
    try{
      const data=JSON.parse(await file.text());
      if(data?.schema!=="aplus-grader-teacher-pack-v1"||data?.blind!==true||!Array.isArray(data.cases))throw new Error("Pack incompatível ou não cego.");
      const leaked=data.cases.some(x=>x.grader_snapshot||x.systemDecision||x.graderDecision||x.policyScore);
      if(leaked)throw new Error("O pack contém informação do corretor e não pode ser usado numa revisão cega.");
      setPack(data);setIndex(0);setLabels({});setMessage(`${data.cases.length} casos carregados.`);
    }catch(error){setMessage(`Não foi possível importar: ${error.message}`)}
  }

  function patch(values){
    if(!row)return;
    setLabels(prev=>({...prev,[row.case_id]:{...(prev[row.case_id]||{}),...values}}));
  }

  function exportLabels(){
    if(!reviewer.trim()){setMessage("Indica o identificador do professor/revisor antes de exportar.");return}
    const reviews=cases.flatMap(item=>{
      const label=labels[item.case_id];
      if(!label?.decision||label.score_percent===""||label.score_percent===undefined)return [];
      return [{
        schema:"aplus-grader-teacher-label-v1",
        case_id:item.case_id,
        case_fingerprint:item.case_fingerprint,
        reviewer:reviewer.trim(),
        subject:item.subject,
        response_family:item.response_family,
        split:item.split,
        decision:label.decision,
        score_percent:Number(label.score_percent),
        diagnosis:label.diagnosis||"other",
        requires_review:!!label.requires_review,
        note:label.note||""
      }];
    });
    downloadJson(`aplus-grader-review-${reviewer.trim().replace(/[^a-z0-9]+/gi,"-").toLowerCase()}.json`,{
      schema:"aplus-grader-teacher-labels-v1",
      reviewer:reviewer.trim(),
      exported_at:new Date().toISOString(),
      reviews
    });
  }

  return <main style={{maxWidth:920,margin:"0 auto",padding:"32px 20px 80px",fontFamily:"system-ui,sans-serif"}}>
    <p style={{fontWeight:800,letterSpacing:1,fontSize:12}}>APProva+ · VALIDAÇÃO CEGA DO CORRETOR</p>
    <h1>Revisão independente por professor</h1>
    <p>Esta ferramenta não mostra a classificação nem a decisão do Apronso. A comparação só deve ser feita depois de o professor entregar a sua avaliação.</p>

    <section style={{display:"grid",gap:12,padding:"16px 0 24px"}}>
      <label><b>Professor / revisor</b><br/><input value={reviewer} onChange={e=>setReviewer(e.target.value)} placeholder="Ex.: FQA-PROF-01" style={{width:"100%",maxWidth:420,padding:10}}/></label>
      <label><b>Importar pack cego</b><br/><input type="file" accept=".json,application/json" onChange={e=>e.target.files?.[0]&&importPack(e.target.files[0])}/></label>
      {message&&<small>{message}</small>}
    </section>

    {row&&<section style={{border:"1px solid #cbd5e1",borderRadius:16,padding:20}}>
      <div style={{display:"flex",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}><b>Caso {index+1}/{cases.length}</b><span>{row.subject} · {row.response_family}</span></div>
      <h2 style={{marginTop:24}}>Pergunta</h2><p style={{whiteSpace:"pre-wrap"}}>{row.question}</p>
      <h2>Resposta do aluno</h2><blockquote style={{margin:"0 0 24px",padding:"14px 16px",background:"#f1f5f9",whiteSpace:"pre-wrap"}}>{row.student_response}</blockquote>

      <div style={{display:"grid",gap:16}}>
        <label><b>Decisão global</b><br/><select value={current.decision||""} onChange={e=>patch({decision:e.target.value})} style={{padding:10}}><option value="">— escolher —</option><option value="accept">Aceitar</option><option value="partial">Parcial</option><option value="reject">Rejeitar</option></select></label>
        <label><b>Classificação (%)</b><br/><input type="number" min="0" max="100" value={current.score_percent??""} onChange={e=>patch({score_percent:e.target.value})} style={{padding:10,width:120}}/></label>
        <label><b>Diagnóstico principal</b><br/><select value={current.diagnosis||""} onChange={e=>patch({diagnosis:e.target.value})} style={{padding:10}}><option value="">— escolher —</option>{DIAGNOSES.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select></label>
        <label><input type="checkbox" checked={!!current.requires_review} onChange={e=>patch({requires_review:e.target.checked})}/> Eu pediria segunda revisão humana deste caso.</label>
        <label><b>Nota opcional</b><br/><textarea value={current.note||""} onChange={e=>patch({note:e.target.value})} rows={3} style={{width:"100%",padding:10}}/></label>
      </div>

      <div style={{display:"flex",gap:10,justifyContent:"space-between",marginTop:24,flexWrap:"wrap"}}>
        <button onClick={()=>setIndex(i=>Math.max(0,i-1))} disabled={index===0}>← Anterior</button>
        <span>{completed}/{cases.length} avaliados</span>
        <button onClick={()=>setIndex(i=>Math.min(cases.length-1,i+1))} disabled={index===cases.length-1}>Seguinte →</button>
      </div>
    </section>}

    {cases.length>0&&<div style={{marginTop:24}}><button onClick={exportLabels} style={{padding:"12px 18px",fontWeight:700}}>Exportar avaliações cegas</button></div>}
  </main>;
}
