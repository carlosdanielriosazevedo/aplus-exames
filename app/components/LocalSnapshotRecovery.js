"use client";
import {useState} from "react";
import {browserStores} from "../lib/browserStorage.js";
import {saveLocalState} from "../lib/persistence.js";
import {assertCloudSnapshot,SNAPSHOT_LIMITS} from "../lib/cloudSnapshotValidation.js";
import {preserveCloudOriginals,downloadRecoveryJson,assertLocalRecoveryCopy} from "../lib/cloudRecovery.js";
import {stableSnapshotJson} from "../lib/cloudStateMerge.js";
import {hasPendingAssessment} from "../lib/pendingAssessment.js";
import {Shell,Logo} from "./chrome.js";

const KEYS=["a25","a25-friends-beta","a25-active-session-v1","a25-friends-active-session-v1",
  "applus:fqa-exam-draft:v1:fqa-mini-1","applus:fqa-exam-draft:v1:fqa-mini-2","applus:fqa-exam-draft:v1:fqa-full-715"];
function originals(){
  const records=[];
  for(const store of browserStores())for(const key of KEYS)try{
    const raw=store.getItem(key);if(raw)records.push({key,raw});
  }catch{}
  return {format:"aplus-local-progress-recovery-v1",records};
}
export default function LocalSnapshotRecovery({storageKey="a25"}){
  const [exported,setExported]=useState(null),[candidate,setCandidate]=useState(null),[message,setMessage]=useState("");
  function exportOriginal(){
    const bundle=originals();
    try{preserveCloudOriginals({local:bundle,remote:null,label:"Progresso local original ilegível"});downloadRecoveryJson(bundle);setExported(bundle);}
    catch{downloadRecoveryJson(bundle);setMessage("Original exportado. Sem uma cópia durável neste dispositivo, a substituição fica bloqueada.");}
  }
  async function choose(event){
    setCandidate(null);
    try{
      const file=event.target.files?.[0];if(!file)return;
      if(file.size>SNAPSHOT_LIMITS.bytes)throw new Error();
      const state=JSON.parse(await file.text());assertCloudSnapshot(state,{local:true,privateFields:false});
      if(!state.profile||!state.scores||!Array.isArray(state.missionHistory)||!Array.isArray(state.examHistory))throw new Error();
      setCandidate(state);setMessage("Cópia local válida. Só será aplicada após confirmação; as tentativas em curso bloqueiam a substituição.");
    }catch{setMessage("Cópia incompatível. Nenhum original foi alterado.");}
  }
  function restore(){
    if(!exported||!candidate)return;
    if(hasPendingAssessment(candidate)){setMessage("Há uma avaliação em curso. O original e as respostas ficam preservados para revisão; não substituímos o seu baseline.");return;}
    try{
      if(stableSnapshotJson(originals())!==stableSnapshotJson(exported))throw new Error();
      for(const record of exported.records.filter(row=>row.key===storageKey)){
        const old=JSON.parse(record.raw);
        if(hasPendingAssessment(old))throw new Error();
        assertLocalRecoveryCopy(old,candidate);
      }
      preserveCloudOriginals({local:originals(),remote:candidate,label:"Antes de restaurar cópia local revista"});
      if(!saveLocalState(candidate,storageKey))throw new Error();
      window.location.reload();
    }catch{setMessage("Não foi possível preservar e gravar a cópia. Os originais continuam disponíveis; não recomeçámos com progresso vazio.");}
  }
  return <Shell><Logo/><div className="notice warning"><b>Não foi possível ler o progresso guardado</b>
    <p>Os dados originais não foram apagados. Exporta-os para corrigir uma cópia, mantendo XP, avaliações e respostas.</p>
    <button onClick={exportOriginal}>Exportar progresso local original</button>
    {exported&&<><label>Cópia local revista<input type="file" accept="application/json,.json" onChange={choose}/></label><button disabled={!candidate} onClick={restore}>Confirmar recuperação local</button></>}
    {message&&<p role="status">{message}</p>}
  </div></Shell>;
}
