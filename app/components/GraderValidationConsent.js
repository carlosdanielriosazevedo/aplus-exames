"use client";

import {useEffect,useState} from "react";
import {graderValidationConsent,setGraderValidationConsent} from "../lib/graderValidationCapture.js";
import {datasetReadiness,exportValidationDataset,loadLocalValidationDataset} from "../lib/graderValidationDataset.js";

const SUBJECT_LABELS={mathematics:"Matemática A",portuguese:"Português","physics-chemistry-a":"Física e Química A"};

function downloadJson(filename,data){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

export default function GraderValidationConsent(){
  const [accepted,setAccepted]=useState(false);
  const [ready,setReady]=useState(false);
  const [summary,setSummary]=useState(null);

  function refresh(){setSummary(datasetReadiness(loadLocalValidationDataset()))}
  useEffect(()=>{setAccepted(graderValidationConsent());refresh();setReady(true)},[]);

  function choose(value){setGraderValidationConsent(value);setAccepted(value);refresh()}
  function exportData(){
    const rows=loadLocalValidationDataset();
    if(!rows.length)return;
    downloadJson(`aplus-validacao-respostas-${new Date().toISOString().slice(0,10)}.json`,exportValidationDataset(rows));
  }

  if(!ready)return null;
  const total=summary?.realCases||0;
  return <main style={{maxWidth:760,margin:"0 auto",padding:"40px 20px",fontFamily:"system-ui,sans-serif",lineHeight:1.6}}>
    <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>APProva+ · CLOSED BETA</p>
    <h1>Ajuda-nos a validar o corretor</h1>
    <p>Se aceitares, as tuas respostas abertas em <b>Matemática A, Português e Física e Química A</b> podem ser guardadas separadamente para comparação cega com a avaliação de professores.</p>
    <p><b>Não guardamos aqui nome, email ou perfil.</b> A decisão não altera a correção, a nota, o progresso nem o acesso à aplicação. Evita incluir dados pessoais no texto das respostas.</p>
    <p>Uma parte das respostas é reservada automaticamente como <i>holdout</i> e nunca pode ser usada para afinar os limites do corretor. Serve apenas para medir a qualidade em dados que o sistema não usou para se ajustar.</p>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",margin:"28px 0"}}>
      <button onClick={()=>choose(true)} style={{padding:"12px 18px",fontWeight:700}}>{accepted?"✓ Participação ativa":"Aceitar participação"}</button>
      <button onClick={()=>choose(false)} style={{padding:"12px 18px"}}>Não participar / retirar consentimento</button>
      {total>0&&<button onClick={exportData} style={{padding:"12px 18px"}}>Exportar respostas para validação</button>}
    </div>
    <small>{accepted?`Participação ativa · ${total} resposta(s) real(is) guardada(s) neste navegador.`:"Participação desligada. Nenhuma nova resposta aberta será adicionada ao dataset de validação."}</small>
    {summary&&total>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginTop:20}}>{Object.entries(summary.bySubject).map(([subject,row])=><div key={subject} style={{padding:12,border:"1px solid #e2e8f0",borderRadius:12}}><b>{SUBJECT_LABELS[subject]}</b><br/><small>{row.calibration} calibração · {row.holdout} holdout</small></div>)}</div>}
  </main>;
}
