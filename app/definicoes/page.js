"use client";

import {useState} from "react";
import Link from "next/link";
import styles from "../piloto/pilot.module.css";
import {setPilotTelemetryAllowed} from "../lib/pilotConsentClient";
import {clearLocalPilotTelemetry} from "../lib/persistence";

export default function SettingsPage(){
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function erasePilotData(){
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/pilot/data",{method:"DELETE",credentials:"include"});
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.ok)throw new Error(body.code||"Não foi possível apagar os dados do piloto.");
      setPilotTelemetryAllowed(false);
      clearLocalPilotTelemetry();
      setMessage("Dados do piloto apagados. O consentimento ficou revogado e a recolha está bloqueada.");
    }catch(error){setMessage(String(error?.message||error))}
    finally{setBusy(false)}
  }

  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Definições</b></p>
    <h1>Privacidade do piloto</h1>
    <p className={styles.copy}>Podes parar de participar quando quiseres. Apagar os dados remove a telemetria, os resultados por item e o feedback do piloto. O registo de consentimento não é apagado: fica marcado como revogado.</p>
    <div className={styles.actions}><button className={styles.button} disabled={busy} onClick={erasePilotData}>Apagar os meus dados do piloto</button></div>
    {message&&<div className={styles.status}>{message}</div>}
    <div className={styles.links}><Link href="/piloto">Gerir consentimento</Link><Link href="/privacidade">Privacidade</Link></div>
  </section></main>;
}
