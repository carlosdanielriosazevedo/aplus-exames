"use client";

import {useState} from "react";
import Link from "next/link";
import styles from "../piloto/pilot.module.css";
import {setPilotTelemetryAllowed} from "../lib/pilotConsentClient";
import {clearLocalPilotTelemetry} from "../lib/persistence";

export default function SettingsPage(){
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");

  async function stopPilotParticipation(){
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/pilot/consent",{method:"DELETE",credentials:"include"});
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.ok)throw new Error(body.code||"Não foi possível retirar o consentimento.");
      setPilotTelemetryAllowed(false);
      setMessage("Participação no piloto terminada. A recolha e o envio de novos dados ficaram bloqueados. Os dados já recolhidos mantêm-se até serem apagados ou até ao fim do prazo de retenção.");
    }catch(error){setMessage(String(error?.message||error))}
    finally{setBusy(false)}
  }

  async function erasePilotData(){
    setBusy(true);setMessage("");
    try{
      const response=await fetch("/api/pilot/data",{method:"DELETE",credentials:"include"});
      const body=await response.json().catch(()=>({}));
      if(!response.ok||!body.ok)throw new Error(body.code||"Não foi possível apagar os dados do piloto.");
      setPilotTelemetryAllowed(false);
      clearLocalPilotTelemetry();
      setMessage("Dados do piloto apagados. O consentimento ficou revogado e a recolha está bloqueada. O registo técnico do consentimento é mantido apenas como prova da concessão e revogação.");
    }catch(error){setMessage(String(error?.message||error))}
    finally{setBusy(false)}
  }

  return <main className={styles.page}><section className={styles.wrap}>
    <p><b>APProva+ · Definições</b></p>
    <h1>Privacidade do piloto</h1>
    <p className={styles.copy}>Podes deixar de participar quando quiseres. Tens duas opções diferentes: parar a recolha de novos dados mantendo, por agora, o histórico já recolhido; ou apagar os dados do piloto.</p>
    <div className={styles.section}>
      <h2>Parar de participar</h2>
      <p className={styles.copy}>Revoga o consentimento e bloqueia imediatamente a recolha e o envio de nova telemetria. Os dados já recolhidos não são apagados por esta ação.</p>
      <div className={styles.actions}><button className={styles.button} disabled={busy} onClick={stopPilotParticipation}>Parar de participar no piloto</button></div>
    </div>
    <div className={styles.section}>
      <h2>Apagar os dados do piloto</h2>
      <p className={styles.copy}>Apaga a telemetria, os resultados por item e o feedback do piloto e revoga o consentimento. O registo técnico do consentimento não é apagado: fica marcado como revogado para preservar prova do que aconteceu.</p>
      <div className={styles.actions}><button className={styles.button} disabled={busy} onClick={erasePilotData}>Apagar os meus dados do piloto</button></div>
    </div>
    {message&&<div className={styles.status}>{message}</div>}
    <div className={styles.links}><Link href="/piloto">Gerir consentimento</Link><Link href="/privacidade">Privacidade</Link><Link href="/piloto/encarregado">Informação para encarregado de educação</Link></div>
  </section></main>;
}
