"use client";
import {useEffect,useRef,useState} from "react";
import {exportStudentCloudOriginal,verifyRecoveryAccount,saveStudentCloudState} from "../lib/cloud.js";
import {safeCloudMerge} from "../lib/cloudStateMerge.js";
import {assertCloudSnapshot,SNAPSHOT_LIMITS,snapshotError} from "../lib/cloudSnapshotValidation.js";
import {preserveCloudOriginals,listCloudOriginals,downloadRecoveryJson,assertLocalRecoveryCopy} from "../lib/cloudRecovery.js";
import {hasPendingAssessment} from "../lib/pendingAssessment.js";
import {markCloudSaved} from "../lib/cloudReliability.js";
import {beginRecoveryAccess,revalidateRecoveryAccess} from "../lib/recoveryAccess.js";
import {subscribeAccountChanges} from "../lib/cloudAccountSession.js";

export default function CloudSnapshotRecovery({s,setS,accountId,normalizeAfterCloud}){
  const [original,setOriginal]=useState(null),[candidate,setCandidate]=useState(null),[confirmed,setConfirmed]=useState(false);
  const [message,setMessage]=useState(""),[busy,setBusy]=useState(false),[copies,setCopies]=useState([]);
  const latest=useRef({s,accountId}),live=useRef(true),epoch=useRef(0);latest.current={s,accountId};
  useEffect(()=>{
    live.current=true;const ticket=++epoch.current;
    const unsubscribe=subscribeAccountChanges(()=>{epoch.current++;setOriginal(null);setCandidate(null);setConfirmed(false);setCopies([]);setMessage("");});
    void listCloudOriginals().then(value=>{if(live.current&&ticket===epoch.current)setCopies(value);}).catch(()=>{if(live.current&&ticket===epoch.current)setCopies([]);});
    return ()=>{live.current=false;epoch.current++;unsubscribe();};
  },[accountId]);
  function current(owner,ticket=epoch.current){if(!live.current||ticket!==epoch.current||latest.current.accountId!==owner||latest.current.s.cloudAccount?.accountId&&latest.current.s.cloudAccount.accountId!==owner)throw snapshotError("CLOUD_RECOVERY_ACCOUNT_CHANGED");}
  async function exportCopy(copy){
    const owner=accountId,ticket=epoch.current;
    try{await verifyRecoveryAccount(owner);current(owner,ticket);await downloadRecoveryJson(copy);}
    catch(error){setMessage(error.message);}
  }
  async function exportOriginal(){
    const owner=accountId,ticket=epoch.current;setBusy(true);setMessage("");
    try{
      const bundle=await exportStudentCloudOriginal(owner);current(owner,ticket);
      try{await preserveCloudOriginals({local:latest.current.s,remote:bundle,label:"Original antes de recuperação controlada"});}
      catch{
        await downloadRecoveryJson(bundle);setOriginal(null);
        setMessage("Original exportado. Sem uma cópia durável neste dispositivo, a substituição fica bloqueada.");return;
      }
      await downloadRecoveryJson(bundle);current(owner,ticket);setOriginal(bundle);
      const preserved=await listCloudOriginals();current(owner,ticket);setCopies(preserved);
      setMessage("Original exportado e preservado neste dispositivo. Revê uma cópia do ficheiro; não alterámos o progresso.");
    }catch(error){setMessage(error.message);}finally{setBusy(false);}
  }
  async function chooseFile(event){
    setCandidate(null);setConfirmed(false);setMessage("");
    const file=event.target.files?.[0];if(!file)return;
    const owner=accountId,ticket=epoch.current;
    try{
      const access=await beginRecoveryAccess({expected:owner});current(owner,ticket);
      if(file.size>SNAPSHOT_LIMITS.bytes)throw snapshotError();
      const parsed=JSON.parse(await file.text());
      if(!original||original.accountId!==accountId||parsed?.format!=="aplus-cloud-recovery-v1"||parsed.accountId!==accountId||parsed.digest!==original.digest)throw snapshotError();
      const state=parsed.data?.state_json;
      assertCloudSnapshot(state,{legacy:true,privateFields:false});
      assertLocalRecoveryCopy(original.data.state_json,state);
      await revalidateRecoveryAccess(access);current(owner,ticket);
      setCandidate(state);setMessage("Cópia estruturalmente válida. Só será combinada e guardada após confirmação explícita.");
    }catch{setMessage("A cópia não é compatível. O ficheiro e o progresso original não foram alterados.");}
  }
  async function recover(){
    if(!original?.needsRepair||original.accountId!==accountId||!candidate||!confirmed)return;
    const owner=accountId,ticket=epoch.current;setBusy(true);setMessage("");
    try{
      await verifyRecoveryAccount(owner);current(owner,ticket);
      const source=latest.current.s;
      if(hasPendingAssessment(source))throw new Error("Conclui a avaliação em curso antes de recuperar progresso. As respostas continuam preservadas.");
      const combined=safeCloudMerge(source,candidate);
      const next=normalizeAfterCloud(combined);
      assertCloudSnapshot(next,{local:true,privateFields:false});
      await preserveCloudOriginals({local:source,remote:{original,candidate},label:"Originais antes de aplicar a cópia revista"});
      const result=await saveStudentCloudState(next,{expectedRevision:original.revision,knownRemote:true,
        recovery:{confirmed:true,revision:original.revision,digest:original.digest,accountId:owner}});
      await verifyRecoveryAccount(owner);current(owner,ticket);
      if(result.conflict)throw new Error("O progresso online mudou. Nenhuma cópia local foi substituída; exporta a nova versão antes de repetir.");
      setS(previous=>previous===source&&!hasPendingAssessment(previous)&&live.current&&ticket===epoch.current&&latest.current.accountId===owner
        ?markCloudSaved(next,{revision:result.data.revision,savedState:next}):previous);
      const preserved=await listCloudOriginals();current(owner,ticket);setCopies(preserved);setCandidate(null);setConfirmed(false);
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
    <details><summary>Originais preservados ({copies.length})</summary>{copies.map(copy=><button disabled={copy.quarantined} key={copy.id} onClick={()=>exportCopy(copy)}>Exportar cópia · {typeof copy.label==="string"?copy.label:"Original com metadados incompatíveis"}</button>)}</details>
  </section>;
}
