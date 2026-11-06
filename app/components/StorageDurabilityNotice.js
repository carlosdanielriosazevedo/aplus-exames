"use client";

import {useEffect,useState} from "react";
import {volatileStorageActive} from "../lib/browserStorage";
import {STORAGE_TIER_EVENT,lastStorageTier} from "../lib/stateIntegrity";

// Nível em que o progresso ficou gravado:
//   "memory": só memória (perde-se ao recarregar);
//   "tab":    só neste separador (perde-se ao fechar o separador);
//   null:     armazenamento permanente.
export default function StorageDurabilityNotice(){
  const [tier,setTier]=useState(null);
  useEffect(()=>{
    const known=lastStorageTier();
    setTier(volatileStorageActive()?"memory":known==="tab"||known==="memory"?known:null);
    const onTemporary=()=>setTier("memory");
    const onDurable=()=>setTier(current=>current==="memory"?null:current);
    const onTier=event=>{
      const next=event?.detail?.tier;
      setTier(next==="tab"||next==="memory"?next:null);
    };
    window.addEventListener("approva:volatile-storage",onTemporary);
    window.addEventListener("approva:durable-storage",onDurable);
    window.addEventListener(STORAGE_TIER_EVENT,onTier);
    return ()=>{
      window.removeEventListener("approva:volatile-storage",onTemporary);
      window.removeEventListener("approva:durable-storage",onDurable);
      window.removeEventListener(STORAGE_TIER_EVENT,onTier);
    };
  },[]);
  if(!tier)return null;
  return <aside className="storageDurabilityBanner" role="status" aria-live="polite" data-storage-tier={tier}>
    <b>{tier==="tab"?"Progresso guardado só neste separador":"Sessão temporária neste separador"}</b>
    <span>{tier==="tab"
      ?"O browser não está a deixar guardar de forma permanente. Se fechares este separador, perdes o que fizeste desde a última gravação permanente. As avaliações só são dadas como concluídas quando ficam guardadas de forma permanente."
      :"O browser está a bloquear o armazenamento permanente. Não recarregues nem feches este separador: o que ainda não foi guardado perde-se. As avaliações só são dadas como concluídas quando ficam guardadas de forma permanente."}</span>
  </aside>;
}
