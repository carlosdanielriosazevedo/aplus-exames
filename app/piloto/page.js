"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import styles from "./pilot.module.css";
import {pilotConsentText} from "../lib/pilotCopy";
import {setPilotTelemetryAllowed} from "../lib/pilotConsentClient";
import {clearLocalPilotTelemetry} from "../lib/persistence";

export default function PilotConsentPage(){
  const [ageConfirmed,setAgeConfirmed]=useState(false);
  const [accepted,setAccepted]=useState(false);
  const [status,setStatus]=useState({loading:true,active:false,consent:null});
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function refresh(){
    try{
      const response=await fetch("/api/pilot/consent",{credentials:"include",cache:"no-store"});
      const body=await response.json().catch(()=>({}));
      const active=response.ok&&body.active===true;
      setStatus({loading:false,active,consent:body.consent||null});
      setPilotTelemetryAllowed(active);
      if(!active)clearLocalPilotTelemetry();
    }catch{
      setStatus({loading:false,active:false,consent:null});
      setPilotTelemetryAllowed(false);
    }
  }

  useEffect(()=>{refresh()},[]);

  async function grant(){
    setBusy(true);setMessage("");
    try{
      clearLocalPilotTelemetry();
      setPilotTelemetryAllowed(false);
      const response=await fetch("/api/pilot/consent",{
        method:"POST",credentials:"include",headers:{"content-type":"application/json"},
        body:JSON.stringify({ageConfirmed,accepted})
      });
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.active)throw new Error(body.code||"Não foi possível registar o consentimento.");
      setPilotTelemetryAllowed(true);
      setStatus({loading:false,active:true,consent:body.consent||null});
      setMessage("Participação ativada. A telemetria só começa a partir deste momento.");
    }catch(error){
      setPilotTelemetryAllowed(false);
      setMessage(String(error?.message||error));
    }finally{setBusy(false)}
  }

  async function revoke(){
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/pilot/consent",{method:"DELETE",credentials:"include"});
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.ok)throw new Error(body.code||"Não foi possível retirar o consentimento.");
      setPilotTelemetryAllowed(false);
      clearLocalPilotTelemetry();
      setStatus({loading:false,active:false,consent:{...(status.consent||{}),revokedAt:new Date().toISOString()}});
      setMessage("Consentimento retirado. A recolha fica bloqueada imediatamente.");
    }catch(error){setMessage(String(error?.message||error))}
    finally{setBusy(false)}
  }

  function decline(){
    setPilotTelemetryAllowed(false);
    clearLocalPilotTelemetry();
    window.location.href="/";
  }

  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Piloto</b></p>
    <h1>Queres ajudar-nos a testar a app?</h1>
    <p className={styles.copy}>{pilotConsentText()}</p>

    {status.active?<>
      <div className={styles.status}><b>Participação ativa</b><br/><span className={styles.small}>Versão aceite: {status.consent?.policyVersion||"—"} · desde {status.consent?.grantedAt?new Date(status.consent.grantedAt).toLocaleString("pt-PT"):"—"}</span></div>
      <div className={styles.actions}><button className={styles.button} disabled={busy} onClick={revoke}>Retirar consentimento</button><Link className={styles.button} href="/definicoes">Definições do piloto</Link></div>
    </>:<>
      <label className={styles.box}><input type="checkbox" checked={ageConfirmed} onChange={event=>setAgeConfirmed(event.target.checked)}/><span>Tenho 13 anos ou mais</span></label>
      <label className={styles.box}><input type="checkbox" checked={accepted} onChange={event=>setAccepted(event.target.checked)}/><span>Li isto e aceito participar no piloto</span></label>
      <div className={styles.actions}><button className={styles.button} disabled={busy||!ageConfirmed||!accepted} onClick={grant}>Participar no piloto</button><button className={styles.button} disabled={busy} onClick={decline}>Agora não</button></div>
    </>}

    {message&&<div className={styles.status}>{message}</div>}
    <div className={styles.links}><Link href="/privacidade">Privacidade</Link><Link href="/piloto/encarregado">Informação para encarregado de educação</Link><Link href="/definicoes">Apagar os meus dados do piloto</Link></div>
  </section></main>;
}
