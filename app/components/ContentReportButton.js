"use client";
import {useEffect,useState} from "react";
import {CONTENT_REPORT_SAVED_MESSAGE} from "../lib/scoreReviewCopy";

export const CONTENT_REPORT_CATEGORIES=[
  ["wrong","A resposta parece errada"],
  ["unclear","Enunciado confuso"],
  ["difficulty","Dificuldade desajustada"],
  ["typo","Erro/typo"],
  ["other","Outro problema"]
];

// Reportes ainda não aceites pelo servidor (sem sessão, sem rede…). Só contêm
// pergunta, disciplina e categoria; são reenviados mais tarde.
const PENDING_KEY="approva-pending-content-reports-v1";
const MAX_PENDING=50;
function readPending(){
  try{const list=JSON.parse(localStorage.getItem(PENDING_KEY)||"[]");return Array.isArray(list)?list:[]}catch{return []}
}
function writePending(list){
  try{list.length?localStorage.setItem(PENDING_KEY,JSON.stringify(list.slice(-MAX_PENDING))):localStorage.removeItem(PENDING_KEY)}catch{}
}
async function sendToServer(payload){
  try{
    const response=await fetch("/api/content-reports",{
      method:"POST",credentials:"include",cache:"no-store",
      headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)
    });
    // 4xx de validação não melhora com novas tentativas: descartar.
    return response.ok||(response.status>=400&&response.status<500&&![401,403,429].includes(response.status));
  }catch{return false}
}
let flushing=false;
export async function flushPendingContentReports(){
  if(flushing||typeof window==="undefined")return;
  flushing=true;
  try{
    const remaining=[];
    for(const payload of readPending())if(!(await sendToServer(payload)))remaining.push(payload);
    writePending(remaining);
  }finally{flushing=false}
}

// Reporte de problema numa pergunta: fica registado no dispositivo (painéis
// internos) e é enviado ao servidor sem dados pessoais; se o envio falhar,
// fica numa fila local e é reenviado mais tarde.
export default function ContentReportButton({item,s,setS,subjectId=null,compact=false}){
  const [open,setOpen]=useState(false);
  const [sent,setSent]=useState(false);
  useEffect(()=>{flushPendingContentReports()},[]);
  if(!item?.id)return null;
  function send(category,label){
    setOpen(false);setSent(true);
    const report={
      id:`rep-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      itemId:item.id,templateId:item.templateId||null,generated:!!item.generated,
      themeId:item.themeId||null,focus:item.focus||null,subjectId:subjectId||s?.activeSubjectId||null,
      category,label,at:Date.now()
    };
    setS(prev=>({...prev,contentReports:[...(prev.contentReports||[]),report]}));
    const payload={itemId:String(item.id),subjectId:report.subjectId,category};
    sendToServer(payload).then(ok=>{if(!ok)writePending([...readPending(),payload])});
  }
  if(sent)return <div className="reportThanks">{CONTENT_REPORT_SAVED_MESSAGE}</div>;
  return <div className={"reportBox "+(compact?"compact":"")}>
    <button className="reportToggle" type="button" onClick={()=>setOpen(!open)}>⚑ Reportar problema nesta pergunta</button>
    {open&&<div className="reportChoices">{CONTENT_REPORT_CATEGORIES.map(([v,l])=><button type="button" key={v} onClick={()=>send(v,l)}>{l}</button>)}</div>}
  </div>;
}
