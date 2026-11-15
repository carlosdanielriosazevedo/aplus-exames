"use client";
import {useState} from "react";
import {CONTENT_REPORT_SAVED_MESSAGE} from "../lib/scoreReviewCopy";

export const CONTENT_REPORT_CATEGORIES=[
  ["wrong","A resposta parece errada"],
  ["unclear","Enunciado confuso"],
  ["difficulty","Dificuldade desajustada"],
  ["typo","Erro/typo"],
  ["other","Outro problema"]
];

// Reporte de problema numa pergunta: guardado no dispositivo (painéis internos)
// e enviado ao servidor sem dados pessoais (pergunta, disciplina, categoria).
export default function ContentReportButton({item,s,setS,subjectId=null,compact=false}){
  const [open,setOpen]=useState(false);
  const [state,setState]=useState("idle");
  if(!item?.id)return null;
  async function send(category,label){
    setOpen(false);setState("sending");
    const report={
      id:`rep-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      itemId:item.id,templateId:item.templateId||null,generated:!!item.generated,
      themeId:item.themeId||null,focus:item.focus||null,subjectId:subjectId||s?.activeSubjectId||null,
      category,label,at:Date.now()
    };
    setS(prev=>({...prev,contentReports:[...(prev.contentReports||[]),report]}));
    try{
      const response=await fetch("/api/content-reports",{
        method:"POST",credentials:"include",cache:"no-store",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({itemId:String(item.id),subjectId:report.subjectId,category})
      });
      setState(response.ok?"sent":"failed");
    }catch{setState("failed")}
  }
  if(state==="sent")return <div className="reportThanks">{CONTENT_REPORT_SAVED_MESSAGE}</div>;
  if(state==="failed")return <div className="reportThanks">Não foi possível enviar o reporte agora. Tenta novamente mais tarde.</div>;
  return <div className={"reportBox "+(compact?"compact":"")}>
    <button className="reportToggle" type="button" disabled={state==="sending"} onClick={()=>setOpen(!open)}>⚑ Reportar problema nesta pergunta</button>
    {open&&<div className="reportChoices">{CONTENT_REPORT_CATEGORIES.map(([v,l])=><button type="button" key={v} onClick={()=>send(v,l)}>{l}</button>)}</div>}
  </div>;
}
