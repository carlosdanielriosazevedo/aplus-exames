"use client";

import {useEffect,useState} from "react";
import {graderValidationConsent,setGraderValidationConsent} from "../lib/graderValidationCapture.js";
import {datasetReadiness,exportValidationDataset,loadLocalValidationDataset} from "../lib/graderValidationDataset.js";

function downloadJson(filename,data){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

export default function GraderValidationConsent(){
  const [accepted,setAccepted]=useState(false);
  const [ready,setReady]=useState(false);
  const [count,setCount]=useState(0);

  function refreshCount(){
    const summary=datasetReadiness(loadLocalValidationDataset()).bySubject["physics-chemistry-a"];
    setCount(summary.calibration+summary.holdout);
  }

  useEffect(()=>{
    setAccepted(graderValidationConsent());
    refreshCount();
    setReady(true);
  },[]);

  function choose(value){
    setGraderValidationConsent(value);
    setAccepted(value);
    refreshCount();
  }

  function exportResponses(){
    const rows=loadLocalValidationDataset();
    if(!rows.length)return;
    downloadJson(`aplus-validacao-fqa-${new Date().toISOString().slice(0,10)}.json`,exportValidationDataset(rows));
  }

  if(!ready)return null;
  return <main style={{maxWidth:760,margin:"0 auto",padding:"40px 20px",fontFamily:"system-ui,sans-serif",lineHeight:1.6}}>
    <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>APProva+ · CLOSED BETA</p>
    <h1>Ajuda-nos a validar o corretor</h1>
    <p>Se aceitares, as respostas abertas que deres em Física e Química A podem ser guardadas separadamente para serem comparadas, de forma cega, com a avaliação de professores.</p>
    <p><b>Este conjunto não inclui campos de identidade da conta, como nome, email ou perfil.</b> A tua decisão não altera a correção, a nota, o progresso ou o acesso à aplicação. Evita incluir dados pessoais no texto livre das respostas.</p>
    <p>Uma parte das respostas fica reservada como <i>holdout</i> e nunca é usada para afinar os limites do corretor. Serve apenas para medir, mais tarde, se as melhorias funcionam em dados que o sistema não usou para se ajustar.</p>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",margin:"28px 0"}}>
      <button onClick={()=>choose(true)} style={{padding:"12px 18px",fontWeight:700}}>{accepted?"✓ Participação ativa":"Aceitar participação"}</button>
      <button onClick={()=>choose(false)} style={{padding:"12px 18px"}}>Não participar / retirar consentimento</button>
      {count>0&&<button onClick={exportResponses} style={{padding:"12px 18px"}}>Exportar respostas para validação</button>}
    </div>
    <small>{accepted?`Participação ativa · ${count} resposta(s) FQ A já guardada(s) neste navegador.`:"Participação desligada. Nenhuma nova resposta aberta será adicionada ao dataset de validação."}</small>
    {count>0&&<p style={{marginTop:24,fontSize:14}}>Nesta closed beta, a transferência para a equipa é manual de propósito: exporta este ficheiro e envia-o apenas à pessoa responsável pelo teste. Isto mantém a recolha separada do progresso enquanto a ingestão central ainda não foi formalmente versionada.</p>}
  </main>;
}
