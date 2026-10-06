"use client";

import {useEffect,useState} from "react";
import {graderValidationConsent,setGraderValidationConsent} from "../lib/graderValidationCapture.js";
import {datasetReadiness,loadLocalValidationDataset} from "../lib/graderValidationDataset.js";

export default function GraderValidationConsent(){
  const [accepted,setAccepted]=useState(false);
  const [ready,setReady]=useState(false);
  const [count,setCount]=useState(0);

  useEffect(()=>{
    setAccepted(graderValidationConsent());
    setCount(datasetReadiness(loadLocalValidationDataset()).bySubject["physics-chemistry-a"].calibration+datasetReadiness(loadLocalValidationDataset()).bySubject["physics-chemistry-a"].holdout);
    setReady(true);
  },[]);

  function choose(value){
    setGraderValidationConsent(value);
    setAccepted(value);
    setCount(datasetReadiness(loadLocalValidationDataset()).bySubject["physics-chemistry-a"].calibration+datasetReadiness(loadLocalValidationDataset()).bySubject["physics-chemistry-a"].holdout);
  }

  if(!ready)return null;
  return <main style={{maxWidth:760,margin:"0 auto",padding:"40px 20px",fontFamily:"system-ui,sans-serif",lineHeight:1.6}}>
    <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>APProva+ · CLOSED BETA</p>
    <h1>Ajuda-nos a validar o corretor</h1>
    <p>Se aceitares, as respostas abertas que deres em Física e Química A podem ser guardadas separadamente para serem comparadas, de forma cega, com a avaliação de professores.</p>
    <p><b>Não guardamos aqui nome, email ou perfil.</b> A tua decisão não altera a correção, a nota, o progresso ou o acesso à aplicação.</p>
    <p>Uma parte das respostas fica reservada como <i>holdout</i> e nunca é usada para afinar os limites do corretor. Serve apenas para medir, mais tarde, se as melhorias funcionam em dados que o sistema não usou para se ajustar.</p>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",margin:"28px 0"}}>
      <button onClick={()=>choose(true)} style={{padding:"12px 18px",fontWeight:700}}>{accepted?"✓ Participação ativa":"Aceitar participação"}</button>
      <button onClick={()=>choose(false)} style={{padding:"12px 18px"}}>Não participar / retirar consentimento</button>
    </div>
    <small>{accepted?`Participação ativa · ${count} resposta(s) FQ A já guardada(s) neste navegador.`:"Participação desligada. Nenhuma nova resposta aberta será adicionada ao dataset de validação."}</small>
  </main>;
}
