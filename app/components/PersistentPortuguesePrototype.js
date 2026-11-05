"use client";
import {useEffect,useState} from "react";
import PortuguesePassageMiniExam from "./PortuguesePassageMiniExam";
import {openVerifiedAccount} from "../lib/cloudAccountSession.js";
import {selectAccountWorkspace,accountStorageKey,workspaceAccountId} from "../lib/accountWorkspace.js";
import {useAccountWorkspaceGuard} from "../lib/useAccountWorkspaceGuard.js";

// Chave histórica, global ao dispositivo, e chave por conta da #460.
// P1-B: a chave global nunca é aberta noutra conta.
// P1-A (revisão antes da publicação): este protótipo não tem coordenação entre
// separadores — dois separadores da mesma conta sobrescreviam as respostas um
// do outro. Até ser integrado no protocolo de escritor (stateWriter.js), a
// persistência fica bloqueada: nada é gravado, e as tentativas já guardadas não
// são lidas para escrita, alteradas nem apagadas.
export const PROTOTYPE_LEGACY_KEY="applus:portuguese-prototype-draft:v1";
export const PROTOTYPE_ACCOUNT_KEY="applus:portuguese-prototype-draft:v2";

const accountsEnabled=()=>!!(process.env.NEXT_PUBLIC_NEON_AUTH_URL&&process.env.NEXT_PUBLIC_NEON_DATA_API_URL);
function rawLocal(){try{return globalThis.localStorage||null}catch{return null}}
function present(key){try{return rawLocal()?.getItem(key)!==null&&rawLocal()?.getItem(key)!==undefined}catch{return false}}

export default function PersistentPortuguesePrototype({exam}){
  const [view,setView]=useState(null);
  const guard=useAccountWorkspaceGuard(view?.mode==="account");
  useEffect(()=>{
    let live=true;
    (async()=>{
      let mode="device",saved=false;
      const legacy=accountsEnabled()&&present(PROTOTYPE_LEGACY_KEY);
      if(accountsEnabled()){
        mode="unverified";
        // Outro separador a confirmar a mesma sessão ao mesmo tempo invalida esta
        // verificação (F5: mudança de conta em curso). Repetir algumas vezes.
        for(let attempt=0;attempt<3&&live;attempt++){
          try{
            const context=await openVerifiedAccount();
            if(!live)return;
            selectAccountWorkspace(context);mode="account";
            saved=present(accountStorageKey(PROTOTYPE_ACCOUNT_KEY,workspaceAccountId()));
            break;
          }catch(error){
            if(error?.code!=="CLOUD_ACCOUNT_CHANGED")break;
            await new Promise(resolve=>setTimeout(resolve,150*(attempt+1)));
          }
        }
      }else saved=present(PROTOTYPE_LEGACY_KEY);
      if(live)setView({mode,saved,legacy});
    })();
    return ()=>{live=false};
  },[exam]);
  if(!view)return <p>A preparar a avaliação…</p>;
  // Sem sessão comprovada não há área de conta: o exame leria dados globais do
  // dispositivo (por exemplo a memória de escrita antiga). Não abrir.
  if(view.mode==="unverified")return <p role="status" data-prototype-mode="unverified">Inicia sessão na APProva+ para usares este mini-exame. Nada foi lido nem gravado neste dispositivo.</p>;
  if(view.mode==="account"&&guard.locked)return <p role="alert" data-prototype-mode="locked">A conta mudou. Confirma a sessão para continuar; as respostas desta conta não são mostradas a outra.</p>;
  return <div data-prototype-mode={view.mode} data-prototype-persistence="blocked">
    <p role="status" data-prototype-notice="no-persistence">Neste protótipo as respostas não são guardadas: se fechares ou recarregares a página, perdes as respostas desta tentativa.</p>
    {view.saved&&<p role="status" data-prototype-saved="preserved">Há uma tentativa anterior guardada neste dispositivo. Não foi aberta nem alterada.</p>}
    {view.legacy&&<p role="status" data-prototype-legacy="preserved">Há uma tentativa antiga deste mini-exame guardada neste dispositivo sem conta associada. Não a abrimos nesta conta e não a apagámos.</p>}
    <PortuguesePassageMiniExam exam={exam} examId="mini-1" initialDraft={null} onDraftChange={null} persistWritingMemory={false}/>
  </div>;
}
