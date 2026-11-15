"use client";
// Sincronização automática do progresso com a conta. Só é carregada quando já
// houve sessão iniciada neste dispositivo (ver clientApp), por isso visitantes
// anónimos não fazem pedidos adicionais.
import {useCallback,useEffect,useRef,useState} from "react";
import {saveStudentCloudState,loadStudentCloudState,studentStateForCloud,mergeStudentCloudState} from "../lib/cloud";
import {getOrCreateDeviceId,saveLocalSnapshot,cloudConflict} from "../lib/cloudReliability";
import {hasPendingAssessment,preservePendingAssessment} from "../lib/pendingAssessment";
import {
  AUTH_CHANGED_EVENT,decideSync,markAutosynced,bindCloudAccount,payloadFingerprint,
  registerCloudFlush,retryDelayMs,rememberCloudSession
} from "../lib/cloudAutosync";
import {normalizeAfterCloud} from "../lib/cloudApply";

const DEBOUNCE_MS=8000;

const COPY={
  // "A guardar"/"Guardado" não aparecem durante o estudo (silêncio = está tudo
  // bem); o estado detalhado está no ecrã Conta e progresso.
  offline:{icon:"!",text:"Sem ligação. O progresso está guardado neste dispositivo e vamos tentar de novo."},
  conflict:{icon:"⚠",text:"Há progresso diferente noutro dispositivo. Nada foi substituído.",action:"Resolver"},
  blocked_other_account:{icon:"⚠",text:"Este dispositivo tem progresso de outra conta. Não vamos misturar os dados.",action:"Ver conta"},
  wait_assessment:{icon:"⏸",text:"Há progresso mais recente online. Será aplicado quando terminares a avaliação em curso."},
  error:{icon:"!",text:"Não foi possível guardar online. O progresso continua neste dispositivo.",action:"Ver conta"}
};

async function verifiedSession(){
  try{
    const response=await fetch("/api/auth/session",{credentials:"include",cache:"no-store"});
    if(response.status===401)return {user:null};
    if(!response.ok)return {user:null,unavailable:true};
    const body=await response.json().catch(()=>null);
    return body?.ok&&body.user?.id?{user:body.user}:{user:null};
  }catch{return {user:null,unavailable:true}}
}

export default function CloudSyncLayer({s,setS,hydrated,screen,go}){
  const stateRef=useRef(s);stateRef.current=s;
  const [account,setAccount]=useState(null);
  const [status,setStatus]=useState(null);
  const [adoption,setAdoption]=useState(false);
  const adoptionRef=useRef(false);
  const busy=useRef(false);
  const again=useRef(false);
  const attempts=useRef(0);
  const timer=useRef(null);
  const accountRef=useRef(null);accountRef.current=account;

  const refreshAccount=useCallback(async()=>{
    const result=await verifiedSession();
    if(result.unavailable)return;
    setAccount(result.user?{id:String(result.user.id),email:result.user.email||null}:null);
    if(!result.user){setStatus(null);rememberCloudSession(false)}
  },[]);

  const cycle=useCallback(async({fetchRemote=false}={})=>{
    const user=accountRef.current;
    if(!user)return {status:"signed_out"};
    if(busy.current){again.current=true;return {status:"busy"}}
    busy.current=true;
    try{
      let state=stateRef.current;
      let remote;
      for(let step=0;step<3;step++){
        const payload=studentStateForCloud(state);
        const decision=decideSync({state,payload,accountId:user.id,remote,
          pendingAssessment:hasPendingAssessment(state),adoptionConfirmed:adoptionRef.current});
        if(decision.action==="fetch_remote"||(fetchRemote&&remote===undefined&&decision.action!=="needs_adoption"&&decision.action!=="blocked_other_account")){
          remote=await loadStudentCloudState();fetchRemote=false;continue;
        }
        if(decision.action==="needs_adoption"){setAdoption(true);setStatus(null);return {status:"needs_adoption"}}
        if(["blocked_other_account","wait_assessment"].includes(decision.action)){setStatus(decision.action);return {status:decision.action}}
        if(decision.action==="idle"){setStatus("saved");attempts.current=0;return {status:"saved"}}
        if(decision.action==="conflict"){
          setS(prev=>cloudConflict(prev,{remoteRevision:remote?.revision,remoteDeviceId:remote?.last_device_id,remoteUpdatedAt:remote?.updated_at,remoteState:remote?.state_json}));
          setStatus("conflict");return {status:"conflict"};
        }
        if(decision.action==="apply_remote"){
          saveLocalSnapshot(state,{label:"Antes de aplicar progresso de outro dispositivo"});
          let next=normalizeAfterCloud(mergeStudentCloudState(state,remote.state_json));
          next=markAutosynced(next,{accountId:user.id,revision:Number(remote.revision)||0,payload:studentStateForCloud(next),deviceId:getOrCreateDeviceId()});
          setS(prev=>preservePendingAssessment(prev,next));
          setStatus("saved");attempts.current=0;return {status:"saved"};
        }
        if(decision.action==="push"){
          setStatus("saving");
          const deviceId=getOrCreateDeviceId();
          const result=await saveStudentCloudState(state,{expectedRevision:decision.expectedRevision,deviceId,knownRemote:decision.operation==="update"});
          if(result.conflict){remote=result.remote;state=stateRef.current;continue}
          const revision=Number(result.data?.revision)||decision.expectedRevision+1;
          // Marca a impressão do payload efetivamente enviado; alterações feitas
          // durante o pedido continuam "por guardar" e geram novo ciclo.
          setS(prev=>markAutosynced(prev,{accountId:user.id,revision,payload,deviceId}));
          setStatus("saved");attempts.current=0;return {status:"saved"};
        }
        return {status:"idle"};
      }
      setStatus("conflict");return {status:"conflict"};
    }catch(error){
      if(error?.status===401){setAccount(null);setStatus(null);rememberCloudSession(false);return {status:"signed_out"}}
      if(error?.retryable||error?.code==="CLOUD_NETWORK_ERROR"){
        setStatus("offline");
        clearTimeout(timer.current);
        timer.current=setTimeout(()=>cycle(),retryDelayMs(attempts.current++));
        return {status:"offline"};
      }
      setStatus("error");return {status:"error",code:error?.code||null};
    }finally{
      busy.current=false;
      if(again.current){again.current=false;clearTimeout(timer.current);timer.current=setTimeout(()=>cycle(),DEBOUNCE_MS)}
    }
  },[setS]);

  useEffect(()=>{if(hydrated)refreshAccount()},[hydrated,refreshAccount]);
  useEffect(()=>{
    const onAuth=()=>refreshAccount();
    window.addEventListener(AUTH_CHANGED_EVENT,onAuth);
    return ()=>window.removeEventListener(AUTH_CHANGED_EVENT,onAuth);
  },[refreshAccount]);
  useEffect(()=>{if(account)cycle({fetchRemote:true})},[account,cycle]);
  useEffect(()=>registerCloudFlush(()=>cycle()),[cycle]);

  // Alterações ao estado: gravação com debounce (não em cada tecla/resposta).
  const fingerprint=account?payloadFingerprint(studentStateForCloud(s)):null;
  useEffect(()=>{
    if(!account||!fingerprint)return;
    clearTimeout(timer.current);
    timer.current=setTimeout(()=>cycle(),DEBOUNCE_MS);
    return ()=>clearTimeout(timer.current);
  },[fingerprint,account,cycle]);

  // Ao sair da página ou mudar de separador: gravar já; ao voltar: ver se outro
  // dispositivo avançou.
  useEffect(()=>{
    if(!account)return;
    const onVisibility=()=>{
      if(document.visibilityState==="hidden")cycle();
      else cycle({fetchRemote:true});
    };
    document.addEventListener("visibilitychange",onVisibility);
    return ()=>document.removeEventListener("visibilitychange",onVisibility);
  },[account,cycle]);

  if(adoption&&account)return <div role="dialog" aria-modal="true" aria-labelledby="cloud-adopt-title" style={styles.overlay}>
    <div style={styles.dialog}>
      <b id="cloud-adopt-title" style={{fontSize:18}}>Guardar o progresso deste dispositivo na tua conta?</b>
      <p style={styles.text}>Este dispositivo tem estudo feito antes de entrares{account.email?<> como <b>{account.email}</b></>:null}. Se for teu, guardamo-lo na conta para o encontrares noutros dispositivos. Se este computador for partilhado e o progresso não for teu, escolhe “Agora não”.</p>
      <button type="button" style={styles.primary} onClick={()=>{adoptionRef.current=true;setS(prev=>bindCloudAccount(prev,account.id));setAdoption(false);setTimeout(()=>cycle({fetchRemote:true}),0)}}>Sim, é meu — guardar na conta</button>
      <button type="button" style={styles.secondary} onClick={()=>{setAdoption(false);setStatus("not_synced")}}>Agora não</button>
    </div>
  </div>;

  const copy=COPY[status];
  if(!copy||screen==="account")return null;
  return <div role="status" aria-live="polite" style={styles.pill}>
    <span aria-hidden="true">{copy.icon}</span><span>{copy.text}</span>
    {copy.action&&<button type="button" style={styles.link} onClick={()=>go("account")}>{copy.action}</button>}
  </div>;
}

const styles={
  overlay:{position:"fixed",inset:0,zIndex:10000,background:"rgba(15,13,35,.72)",display:"flex",alignItems:"center",justifyContent:"center",padding:18},
  dialog:{background:"#fff",borderRadius:18,padding:22,maxWidth:440,display:"grid",gap:12,color:"#111a32"},
  text:{margin:0,fontSize:14,lineHeight:1.55,color:"#4d566b"},
  primary:{border:0,background:"#6b54db",color:"#fff",borderRadius:12,padding:"13px 16px",fontWeight:900},
  secondary:{border:"1px solid #dfe4eb",background:"#fff",color:"#4d566b",borderRadius:12,padding:"12px 16px",fontWeight:700},
  pill:{position:"fixed",left:12,right:12,bottom:"calc(env(safe-area-inset-bottom, 0px) + 84px)",zIndex:9000,margin:"0 auto",maxWidth:520,display:"flex",gap:8,alignItems:"center",background:"#20293d",color:"#fff",borderRadius:12,padding:"10px 12px",fontSize:13,boxShadow:"0 8px 24px #17203c33"},
  link:{marginLeft:"auto",border:0,background:"transparent",color:"#b9adff",fontWeight:900,whiteSpace:"nowrap"}
};
