"use client";

import {useEffect,useState} from "react";
import {volatileStorageActive} from "../lib/browserStorage";

export default function StorageDurabilityNotice(){
  const [temporary,setTemporary]=useState(false);
  useEffect(()=>{
    setTemporary(volatileStorageActive());
    const onTemporary=()=>setTemporary(true);
    const onDurable=()=>setTemporary(false);
    window.addEventListener("approva:volatile-storage",onTemporary);
    window.addEventListener("approva:durable-storage",onDurable);
    return ()=>{
      window.removeEventListener("approva:volatile-storage",onTemporary);
      window.removeEventListener("approva:durable-storage",onDurable);
    };
  },[]);
  if(!temporary)return null;
  return <aside className="storageDurabilityBanner" role="status" aria-live="polite">
    <b>Sessão temporária neste separador</b>
    <span>O browser está a bloquear o armazenamento permanente. Podes continuar a estudar, mas mantém este separador aberto para não perder o que ainda não conseguiu ser guardado.</span>
  </aside>;
}
