"use client";
import {useEffect,useRef,useState} from "react";
import {saveLocalState} from "../lib/persistence.js";
import {assertCloudSnapshot,SNAPSHOT_LIMITS} from "../lib/cloudSnapshotValidation.js";
import {preserveCloudOriginals,downloadRecoveryJson,assertLocalRecoveryCopy,readLocalRecoveryOriginals,assertLocalRecoveryUnchanged} from "../lib/cloudRecovery.js";
import {beginRecoveryAccess,revalidateRecoveryAccess,assertRecoveryState} from "../lib/recoveryAccess.js";
import {subscribeAccountChanges} from "../lib/cloudAccountSession.js";
import {stableSnapshotJson} from "../lib/cloudStateMerge.js";
import {hasPendingAssessment} from "../lib/pendingAssessment.js";
import {Shell,Logo} from "./chrome.js";

export default function LocalSnapshotRecovery({storageKey="a25"}){
  const [exported,setExported]=useState(null),[candidate,setCandidate]=useState(null),[message,setMessage]=useState("");
  const [ready,setReady]=useState(false),[busy,setBusy]=useState(false),live=useRef(true);
  useEffect(()=>{
    live.current=true;
    void beginRecoveryAccess().then(()=>{if(live.current)setReady(true);}).catch(()=>{if(live.current)setReady(false);});
    const unsubscribe=subscribeAccountChanges(()=>{setReady(false);setExported(null);setCandidate(null);});
    return ()=>{live.current=false;unsubscribe();};
  },[]);
  async function exportOriginal(){
    setBusy(true);setMessage("");
    try{
      const bundle=await readLocalRecoveryOriginals(storageKey);
      let durable=true;
      try{await preserveCloudOriginals({local:bundle,remote:null,label:"Progresso local original ilegível"});}catch{durable=false;}
      await downloadRecoveryJson(bundle);
      if(live.current){setReady(true);setExported(durable?bundle:null);if(!durable)setMessage("Original exportado. Sem uma cópia durável neste dispositivo, a substituição fica bloqueada.");}
    }catch{if(live.current){setReady(false);setExported(null);setCandidate(null);setMessage("Acesso bloqueado. Confirma a conta de origem; os dados continuam preservados e não foram atribuídos à sessão atual.");}}
    finally{if(live.current)setBusy(false);}
  }
  async function choose(event){
    setCandidate(null);
    try{
      const access=await beginRecoveryAccess(),file=event.target.files?.[0];if(!file)return;
      if(!exported||file.size>SNAPSHOT_LIMITS.bytes)throw new Error();
      const envelope=JSON.parse(await file.text());
      if(envelope.format!==exported.format||envelope.accountId!==exported.accountId||envelope.digest!==exported.digest||envelope.storageKey!==storageKey)throw new Error();
      const state=envelope.repairedState;
      assertRecoveryState(state,access);assertCloudSnapshot(state,{local:true,privateFields:false});
      if(!state.profile||!state.scores||!Array.isArray(state.missionHistory)||!Array.isArray(state.examHistory))throw new Error();
      await revalidateRecoveryAccess(access);
      if(live.current){setCandidate(state);setMessage("Cópia local válida. Só será aplicada após confirmação; as tentativas em curso bloqueiam a substituição.");}
    }catch{if(live.current)setMessage("Cópia incompatível ou origem não comprovada. Nenhum original foi alterado.");}
  }
  async function restore(){
    if(!exported||!candidate)return;setBusy(true);
    try{
      const access=await beginRecoveryAccess();assertRecoveryState(candidate,access);
      if(hasPendingAssessment(candidate))throw new Error();
      const current=await readLocalRecoveryOriginals(storageKey);
      if(stableSnapshotJson(current)!==stableSnapshotJson(exported))throw new Error();
      for(const record of exported.records.filter(row=>row.key===storageKey)){
        const old=JSON.parse(record.raw);if(hasPendingAssessment(old))throw new Error();assertLocalRecoveryCopy(old,candidate);
      }
      await preserveCloudOriginals({local:current,remote:candidate,label:"Antes de restaurar cópia local revista"});
      await revalidateRecoveryAccess(access);
      assertLocalRecoveryUnchanged(current,access);
      if(!live.current||!saveLocalState(candidate,storageKey))throw new Error();
      window.location.reload();
    }catch{if(live.current)setMessage("Recuperação bloqueada. Nenhum original foi substituído; confirma a conta e revê a cópia sem apagar avaliações ou respostas.");}
    finally{if(live.current)setBusy(false);}
  }
  return <Shell><Logo/><div className="notice warning"><b>Não foi possível ler o progresso guardado</b>
    <p>Os dados originais não foram apagados. É necessário comprovar a conta de origem antes de ler, exportar ou recuperar.</p>
    <button disabled={busy} onClick={exportOriginal}>{ready?"Exportar progresso local original":"Verificar conta e exportar o seu original"}</button>
    {exported&&ready&&<><label>Cópia local revista<input type="file" accept="application/json,.json" disabled={busy} onChange={choose}/></label><button disabled={!candidate||busy} onClick={restore}>Confirmar recuperação local</button></>}
    {message&&<p role="status">{message}</p>}
  </div></Shell>;
}
