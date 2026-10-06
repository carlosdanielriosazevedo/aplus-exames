"use client";

import {useMemo,useState} from "react";
import {datasetReadiness,exportBlindTeacherPack,importValidationExports} from "../lib/graderValidationDataset.js";

function downloadJson(filename,data){
  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url);
}

export default function GraderValidationAdmin(){
  const [exports,setExports]=useState([]);
  const [message,setMessage]=useState("");

  const merged=useMemo(()=>importValidationExports(exports),[exports]);
  const readiness=useMemo(()=>datasetReadiness(merged.rows),[merged.rows]);

  async function importFiles(files){
    const list=[...(files||[])];
    if(!list.length)return;
    const parsed=[];
    let unreadable=0;
    for(const file of list){
      try{parsed.push(JSON.parse(await file.text()))}catch{unreadable++}
    }
    setExports(prev=>[...prev,...parsed]);
    setMessage(`${parsed.length} exportação(ões) lida(s)${unreadable?` · ${unreadable} ficheiro(s) inválido(s)`:""}.`);
  }

  function downloadBlind(split){
    const rows=merged.rows.filter(row=>row.split===split);
    if(!rows.length){setMessage(`Ainda não existem casos ${split}.`);return}
    downloadJson(`aplus-professor-${split}-${new Date().toISOString().slice(0,10)}.json`,exportBlindTeacherPack(rows));
  }

  return <main style={{maxWidth:900,margin:"0 auto",padding:"36px 20px 80px",fontFamily:"system-ui,sans-serif",lineHeight:1.55}}>
    <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>APProva+ · GOLD SET INTERNO</p>
    <h1>Agregar respostas reais</h1>
    <p>Importa os ficheiros exportados pelos testers. A ferramenta valida fingerprints, elimina duplicados por <code>case_id</code> e mantém calibração e holdout separados.</p>

    <label style={{display:"block",margin:"24px 0"}}><b>Importar exportações da closed beta</b><br/><input type="file" accept=".json,application/json" multiple onChange={e=>importFiles(e.target.files)}/></label>
    {message&&<p>{message}</p>}

    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,margin:"28px 0"}}>
      <div style={{border:"1px solid #cbd5e1",borderRadius:12,padding:16}}><small>CASOS REAIS</small><h2>{readiness.realCases}</h2></div>
      <div style={{border:"1px solid #cbd5e1",borderRadius:12,padding:16}}><small>CALIBRAÇÃO</small><h2>{readiness.calibrationCases}</h2></div>
      <div style={{border:"1px solid #cbd5e1",borderRadius:12,padding:16}}><small>HOLDOUT</small><h2>{readiness.holdoutCases}</h2></div>
      <div style={{border:"1px solid #cbd5e1",borderRadius:12,padding:16}}><small>REJEITADOS</small><h2>{merged.invalid.length}</h2></div>
    </div>

    <section style={{border:"1px solid #cbd5e1",borderRadius:14,padding:18,marginBottom:22}}>
      <h2>Física e Química A</h2>
      <p>{readiness.bySubject["physics-chemistry-a"].calibration} calibração · {readiness.bySubject["physics-chemistry-a"].holdout} holdout</p>
    </section>

    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
      <button onClick={()=>downloadBlind("calibration")} style={{padding:"12px 18px",fontWeight:700}}>Gerar pack cego · calibração</button>
      <button onClick={()=>downloadBlind("holdout")} style={{padding:"12px 18px"}}>Gerar pack cego · holdout</button>
    </div>

    <p style={{marginTop:28,fontSize:14}}><b>Regra:</b> o pack de holdout pode ser enviado para classificação humana, mas os seus resultados não podem ser usados para escolher thresholds. Só servem para validação final.</p>
  </main>;
}
