"use client";
import {useEffect,useRef,useState} from "react";
import {exportStudentCloudOriginal,verifyRecoveryAccount,saveStudentCloudState} from "../lib/cloud.js";
import {safeCloudMerge} from "../lib/cloudStateMerge.js";
import {assertCloudSnapshot,SNAPSHOT_LIMITS,snapshotError} from "../lib/cloudSnapshotValidation.js";
import {preserveCloudOriginals,listCloudOriginals,downloadRecoveryJson,assertLocalRecoveryCopy} from "../lib/cloudRecovery.js";
import {hasPendingAssessment} from "../lib/pendingAssessment.js";
import {markCloudSaved} from "../lib/cloudReliability.js";

export default function CloudSnapshotRecovery({s,setS,accountId,normalizeAfterCloud}){
  const [original,setOriginal]=useState(null),[candidate,setCandidate]=useState(null),[confirmed,setConfirmed]=useState(false);
  const [message,setMessage]=useState(""),[busy,setBusy]=useState(false),[copies,setCopies]=useState([]);
  const latest=useRef({s,accountId}),live=useRef(true);latest.current={s,accountId};
  useEffect(()=>{live.current=true;setCopies(listCloudOriginals());return ()=>{live.current=false;};},[accountId]);
  function current(owner){if(!live.current||latest.current.accountId!==owner||latest.current.s.cloudAccount?.accountId&&latest.current.s.cloudAccount.accountId!==owner)throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");}
  async function exportCopy(copy){
    const owner=accountId;
    try{await verifyRecoveryAccount(owner);current(owner);downloadRecoveryJson(copy);}
    catch(error){setMessage(error.message);}
  }
  async function exportOriginal(){
    const owner=accountId;setBusy(true);setMessage("");
    try{
      const bundle=await exportStudentCloudOriginal(owner);current(owner);
      try{preserveCloudOriginals({local:latest.current.s,remote:bundle,label:"Original antes de recuperação controlada"});}
      catch{
        downloadRecoveryJson(bundle);setOriginal(null);
        setMessage("Original exportado. Sem uma cópia durável neste dispositivo, a substituição fica bloqueada.");return;
      }
      downloadRecoveryJson(bundle);setOriginal(bundle);setCopies(listCloudOriginals());
      setMessage("Original exportado e preservado neste dispositivo. Revê uma cópia do ficheiro; não alterámos o progresso.");
    }catch(error){setMessage(error.message);}finally{setBusy(false);}
  }
  async function chooseFile(event){
    setCandidate(null);setConfirmed(false);setMessage("");
    const file=event.target.files?.[0];if(!file)return;
    try{
      if(file.size>SNAPSHOT_LIMITS.bytes)throw snapshotError();
      const parsed=JSON.parse(await file.text());
      if(!original||original.accountId!==accountId||parsed?.format!=="aplus-cloud-recovery-v1"||parsed.accountId!==accountId||parsed.digest!==original.digest)throw snapshotError();
      const state=parsed.data?.state_json;
      assertCloudSnapshot(state,{legacy:true,privateFields:false});
      assertLocalRecoveryCopy(original.data.state_json,state);
      setCandidate(state);setMessage("Cópia estruturalmente válida. Só será combinada e guardada após confirmação explícita.");
    }catch{setMessage("A cópia não é compatível. O ficheiro e o progresso original não foram alterados.");}
  }
  async function recover(){
    if(!original?.needsRepair||original.accountId!==accountId||!candidate||!confirmed)return;
    const owner=accountId;setBusy(true);setMessage("");
    try{
      await verifyRecoveryAccount(owner);current(owner);
      const source=latest.current.s;
      if(hasPendingAssessment(source))throw new Error("Conclui a avaliação em curso antes de recuperar progresso. As respostas continuam preservadas.");
      const combined=safeCloudMerge(source,candidate);
      const next=normalizeAfterCloud(combined);
      assertCloudSnapshot(next,{local:true,privateFields:false});
      preserveCloudOriginals({local:source,remote:{original,candidate},label:"Originais antes de aplicar a cópia revista"});
      const result=await saveStudentCloudState(next,{expectedRevision:original.revision,knownRemote:true,
        recovery:{confirmed:true,revision:original.revision,digest:original.digest,accountId:owner}});
      await verifyRecoveryAccount(owner);current(owner);
      if(result.conflict)throw new Error("O progresso online mudou. Nenhuma cópia local foi substituída; exporta a nova versão antes de repetir.");
      setS(previous=>previous===source&&!hasPendingAssessment(previous)&&live.current&&latest.current.accountId===owner
        ?markCloudSaved(next,{revision:result.data.revision,savedState:next}):previous);
      setCopies(listCloudOriginals());setCandidate(null);setConfirmed(false);
      setMessage("Cópia revista guardada. Os originais permanecem disponíveis abaixo. Uma tentativa local iniciada entretanto não é substituída.");
    }catch(error){setMessage(error.message);}finally{setBusy(false);}
  }
  return <section className="notice" aria-label="Recuperação controlada de progresso">
    <b>Recuperar sem apagar o original</b>
    <p>Um formato incompatível ou uma combinação ambígua exige revisão. Não inferimos que dados inválidos sejam progresso vazio.</p>
    <button disabled={busy||!accountId} onClick={exportOriginal}>Exportar snapshot original</button>
    {original&&!original.needsRepair&&<p>O original online tem uma estrutura válida. Uma divergência de registos exige revisão; usa as escolhas explícitas de conflito depois de exportar ambas as cópias.</p>}
    {original?.needsRepair&&<>
      <p>Trabalha numa cópia do ficheiro exportado. Uma cópia corrigida tem de manter o schema e os registos que queres recuperar.</p>
      <label>Cópia revista<input type="file" accept="application/json,.json" disabled={busy} onChange={chooseFile}/></label>
      <label><input type="checkbox" checked={confirmed} onChange={event=>setConfirmed(event.target.checked)}/>Revisei a cópia e confirmo a combinação. Os originais continuarão guardados.</label>
      <button disabled={busy||!candidate||!confirmed||hasPendingAssessment(s)} onClick={recover}>Recuperar cópia validada</button>
    </>}
    {message&&<p role="status">{message}</p>}
    <details><summary>Originais preservados ({copies.length})</summary>{copies.map(copy=><button key={copy.key} onClick={()=>exportCopy(copy)}>Exportar cópia · {copy.label}</button>)}</details>
  </section>;
}
