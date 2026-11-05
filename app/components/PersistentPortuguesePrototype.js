"use client";
import {useCallback,useEffect,useState} from "react";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {normalizePortugueseMiniExamDraft} from "../lib/portugueseMiniExamDraft";
import {openVerifiedAccount} from "../lib/cloudAccountSession.js";
import {selectAccountWorkspace,scopedLocalStorage} from "../lib/accountWorkspace.js";
import {useAccountWorkspaceGuard} from "../lib/useAccountWorkspaceGuard.js";

// Chave histórica, global ao dispositivo. Com contas ativas nunca é lida nem
// escrita: não se sabe a quem pertence (P1-B). Os bytes ficam intactos.
export const PROTOTYPE_LEGACY_KEY="applus:portuguese-prototype-draft:v1";
// Com contas ativas a tentativa vive só na área da conta comprovada.
export const PROTOTYPE_ACCOUNT_KEY="applus:portuguese-prototype-draft:v2";

const accountsEnabled=()=>!!(process.env.NEXT_PUBLIC_NEON_AUTH_URL&&process.env.NEXT_PUBLIC_NEON_DATA_API_URL);
function rawLocal(){try{return globalThis.localStorage||null}catch{return null}}
function legacyPresent(){try{return rawLocal()?.getItem(PROTOTYPE_LEGACY_KEY)!==null}catch{return false}}

export default function PersistentPortuguesePrototype({exam}){
  const [recovery,setRecovery]=useState(null);
  const [store,setStore]=useState(null);
  const [mode,setMode]=useState(null);
  const guard=useAccountWorkspaceGuard(mode==="account");
  useEffect(()=>{
    let live=true;
    (async()=>{
      let storage=null,key=PROTOTYPE_LEGACY_KEY,nextMode="device",legacy=false;
      if(accountsEnabled()){
        legacy=legacyPresent();
        try{
          const context=await openVerifiedAccount();
          if(!live)return;
          selectAccountWorkspace(context);
          storage=scopedLocalStorage();key=PROTOTYPE_ACCOUNT_KEY;nextMode="account";
        }catch{nextMode="unverified";}
      }else storage=rawLocal();
      if(!live)return;
      setMode(nextMode);
      if(!storage){setStore(null);setRecovery({draft:null,error:false,legacy});return;}
      setStore({storage,key});
      try{
        const raw=storage.getItem(key);
        const draft=raw?normalizePortugueseMiniExamDraft(JSON.parse(raw),{examId:"mini-1",itemIds:exam.items.map(item=>item.id)}):null;
        setRecovery({draft,error:!!raw&&!draft,legacy});
      }catch{setRecovery({error:true,legacy})}
    })();
    return ()=>{live=false};
  },[exam]);
  const save=useCallback(draft=>{
    // Sem conta comprovada (modo com contas): nada é gravado no dispositivo.
    if(!store)return;
    try{store.storage.setItem(store.key,JSON.stringify(draft))}catch{setRecovery(previous=>({...(previous||{}),error:true}))}
  },[store]);
  if(!recovery)return <p>A recuperar a avaliação…</p>;
  if(mode==="account"&&guard.locked)return <p role="alert" data-prototype-mode="locked">A conta mudou. Confirma a sessão para continuar; as respostas desta conta não são mostradas a outra.</p>;
  if(recovery.error)return <p role="alert">Não foi possível recuperar ou guardar esta avaliação. Os dados existentes foram conservados.</p>;
  return <div data-prototype-mode={mode}>
    {mode==="unverified"&&<p role="status">Inicia sessão na APProva+ para guardares esta avaliação. Até lá, as respostas ficam só neste ecrã e não são gravadas no dispositivo.</p>}
    {recovery.legacy&&<p role="status" data-prototype-legacy="preserved">Há uma tentativa antiga deste mini-exame guardada neste dispositivo sem conta associada. Não a abrimos nesta conta e não a apagámos.</p>}
    <PortuguesePassageMiniExam exam={exam} examId="mini-1" initialDraft={recovery.draft} onDraftChange={save}/>
  </div>;
}
