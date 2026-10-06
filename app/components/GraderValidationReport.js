"use client";

import {useMemo,useState} from "react";
import {buildGraderValidationReport} from "../lib/graderValidationReport.js";

const SUBJECTS=[
  ["mathematics","Matemática A"],
  ["portuguese","Português"],
  ["physics-chemistry-a","Física e Química A"]
];

async function readJsonFiles(files){
  const payloads=[];
  for(const file of files){payloads.push(JSON.parse(await file.text()))}
  return payloads;
}

function Metric({label,value,suffix=""}){
  return <div style={{padding:14,border:"1px solid #e2e8f0",borderRadius:12}}><small>{label}</small><br/><b style={{fontSize:24}}>{value??"—"}{value!==null&&value!==undefined?suffix:""}</b></div>;
}

function QualityGrid({row}){
  if(!row)return null;
  return <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:10}}>
    <Metric label="Casos avaliados" value={row.labels??row.cases}/>
    <Metric label="Concordância decisão" value={row.decisionAgreement} suffix="%"/>
    <Metric label="Erro médio absoluto" value={row.meanAbsoluteScoreDelta} suffix=" pp"/>
    <Metric label="Dentro de ±10 pp" value={row.within10pp} suffix="%"/>
    <Metric label="Overgrading" value={row.overgradingRate} suffix="%"/>
    <Metric label="Undergrading" value={row.undergradingRate} suffix="%"/>
    <Metric label="Erros catastróficos" value={row.catastrophicErrorRate} suffix="%"/>
    {row.abstentionRate!==undefined&&<Metric label="Abstention" value={row.abstentionRate} suffix="%"/>}
  </div>;
}

export default function GraderValidationReport(){
  const [datasetExports,setDatasetExports]=useState([]);
  const [teacherExports,setTeacherExports]=useState([]);
  const [message,setMessage]=useState("");
  const report=useMemo(()=>buildGraderValidationReport({datasetExports,teacherLabelExports:teacherExports}),[datasetExports,teacherExports]);

  async function importDatasets(files){
    try{setDatasetExports(await readJsonFiles(files));setMessage("")}catch(error){setMessage(`Dataset inválido: ${error.message}`)}
  }
  async function importTeachers(files){
    try{setTeacherExports(await readJsonFiles(files));setMessage("")}catch(error){setMessage(`Avaliação inválida: ${error.message}`)}
  }

  return <main style={{maxWidth:1080,margin:"0 auto",padding:"32px 20px 80px",fontFamily:"system-ui,sans-serif",lineHeight:1.5}}>
    <p style={{fontSize:12,fontWeight:800,letterSpacing:1}}>APProva+ · QUALIDADE DO CORRETOR</p>
    <h1>Apronso ↔ professores</h1>
    <p>Importa os datasets exportados pelos testers e as avaliações cegas dos professores. O holdout é mostrado separadamente e nunca deve ser usado para afinar thresholds.</p>

    <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:16,margin:"24px 0"}}>
      <label style={{padding:16,border:"1px solid #cbd5e1",borderRadius:14}}><b>1. Respostas dos testers</b><br/><small>Podes selecionar vários ficheiros JSON.</small><br/><input type="file" multiple accept=".json,application/json" onChange={e=>importDatasets([...e.target.files])} style={{marginTop:12}}/></label>
      <label style={{padding:16,border:"1px solid #cbd5e1",borderRadius:14}}><b>2. Avaliações dos professores</b><br/><small>Podes juntar vários revisores.</small><br/><input type="file" multiple accept=".json,application/json" onChange={e=>importTeachers([...e.target.files])} style={{marginTop:12}}/></label>
    </section>
    {message&&<p>{message}</p>}
    {report.invalid.length>0&&<div style={{padding:14,border:"1px solid #f59e0b",borderRadius:12,marginBottom:20}}><b>{report.invalid.length} registo(s) rejeitado(s)</b><p style={{marginBottom:0}}>Foram encontrados ficheiros/casos incompatíveis, duplicados ou com fingerprint inválido. Não entram nas métricas.</p></div>}

    <section style={{margin:"28px 0"}}><h2>Dataset real</h2><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
      <Metric label="Casos reais" value={report.readiness.realCases}/><Metric label="Calibração" value={report.readiness.calibrationCases}/><Metric label="Holdout" value={report.readiness.holdoutCases}/><Metric label="Labels humanas" value={report.selective.labels}/>
    </div></section>

    <section style={{margin:"28px 0"}}><h2>Comparação bruta Apronso ↔ humano</h2><p>Estas métricas comparam a pontuação produzida pelo corretor com o professor, mesmo quando a política seletiva decidiria abster-se.</p><QualityGrid row={report.raw.overall}/></section>

    <section style={{margin:"28px 0"}}><h2>Política seletiva</h2><p>Aqui conta a decisão <i>accept / partial / reject / abstain</i>. Em pré-calibração, classes abertas devem ter abstention elevada por desenho.</p><QualityGrid row={report.selective.overall}/></section>

    <section style={{margin:"28px 0"}}><h2>Holdout independente</h2><p>Este é o conjunto decisivo para validação. Não usar estes casos para escolher thresholds.</p><QualityGrid row={report.selective.holdout}/></section>

    <section style={{margin:"28px 0"}}><h2>Por disciplina</h2><div style={{display:"grid",gap:16}}>{SUBJECTS.map(([id,label])=><article key={id} style={{padding:16,border:"1px solid #e2e8f0",borderRadius:14}}><h3>{label}</h3><p style={{marginTop:0}}>{report.readiness.bySubject[id].calibration} calibração · {report.readiness.bySubject[id].holdout} holdout</p><QualityGrid row={report.raw.bySubject[id]}/></article>)}</div></section>

    <section style={{padding:18,border:"2px solid #0f172a",borderRadius:16,marginTop:30}}>
      <small>ESTADO DE VALIDAÇÃO</small><h2 style={{margin:"6px 0"}}>{report.release.status}</h2>
      <p>{report.release.humanValidated?"O holdout cumpre os critérios técnicos configurados para esta fase.":report.release.warning}</p>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}><span>Holdout suficiente: <b>{report.release.checks.enoughHoldout?"sim":"não"}</b></span><span>Concordância: <b>{report.release.checks.agreementGood?"sim":"não"}</b></span><span>Erro catastrófico: <b>{report.release.checks.catastrophicGood?"sim":"não"}</b></span></div>
    </section>
  </main>;
}
