"use client";
import {useEffect,useState} from "react";
import {Back,BrandName,Shell} from "./chrome";
import {
  cloudConfiguration,getCloudSession,cloudSignIn,cloudSignUp,cloudSignOut,
  loadStudentCloudState,saveStudentCloudState,overwriteStudentCloudState,mergeStudentCloudState
} from "../lib/cloud";
import {
  getOrCreateDeviceId,shortDeviceId,cloudSyncMeta,migrateCloudSync,
  markCloudLoaded,markCloudSaved,cloudConflict,saveLocalSnapshot,
  listLocalSnapshots,queueCloudSave,listPendingCloudSaves,removePendingCloudSave,
  safeCloudMerge
} from "../lib/cloudReliability";
import {migrateDailyMission} from "../lib/dailyMission";
import {migrateCompetition,updateCompetitionProfile} from "../lib/competition";
import {migrateEngagement} from "../lib/engagement";
import {migratePedagogicalIds,recalibrateAllScores,prepIndex,measuredThemes} from "../lib/engine";
import {demoIdentity} from "../lib/identity";
import {academicScopeThemes} from "../lib/curriculumScope";

export function AccountCloud({s,setS,go}){
  const cfg=cloudConfiguration();
  const [mode,setMode]=useState("signin");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [rankingYear,setRankingYear]=useState(["10.º","11.º","12.º","Já terminei o secundário"].includes(s.profile?.schoolYear)?s.profile.schoolYear:"");
  const [rankingSchool,setRankingSchool]=useState(s.competition?.profile?.school||"");
  const [rankingSchoolOptIn,setRankingSchoolOptIn]=useState(!!s.competition?.profile?.schoolOptIn);
  const [session,setSession]=useState({loading:true,user:null,error:null});
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState(null);
  const [conflictRemote,setConflictRemote]=useState(null);
  const [pending,setPending]=useState([]);
  const [snapshots,setSnapshots]=useState([]);

  const sync=cloudSyncMeta(s);
  const deviceId=sync.deviceId||getOrCreateDeviceId();

  function refreshLocalSafety(){
    setPending(listPendingCloudSaves());
    setSnapshots(listLocalSnapshots());
  }

  useEffect(()=>{refreshLocalSafety()},[]);

  async function refreshSession(){
    if(!cfg.configured){
      setSession({loading:false,user:null,error:null});
      return;
    }
    const result=await getCloudSession();
    setSession({loading:false,user:result.user||null,error:result.error||null});
    if(result.user){
      setS(prev=>({...migrateCloudSync(prev),identity:{
        mode:"authenticated",
        authUserId:result.user.id,
        displayName:result.user.name||result.user.email?.split("@")[0]||"Aluno",
        email:result.user.email||"",
        roles:["student"],
        activeRole:"student"
      }}));
    }
  }

  useEffect(()=>{refreshSession()},[]);

  function normalizeAfterCloud(base){
    return migrateCloudSync(
      migrateDailyMission(
        migrateCompetition(
          migrateEngagement(
            migratePedagogicalIds({
              ...base,
              scores:recalibrateAllScores(base.scores)
            })
          )
        )
      )
    );
  }

  async function submit(){
    setBusy(true);setMessage(null);
    try{
      if(mode==="signup"){
        await cloudSignUp({name:name.trim()||"Aluno",email:email.trim(),password});
        setMessage({ok:true,text:"Conta criada. Se a verificação de email estiver ativa no Neon, confirma o email antes de entrar."});
      }else{
        await cloudSignIn({email:email.trim(),password});
        setMessage({ok:true,text:"Sessão iniciada."});
      }
      await refreshSession();
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  function saveRankingIdentity(){
    setS(prev=>updateCompetitionProfile({
      ...prev,
      profile:{...prev.profile,schoolYear:rankingYear||prev.profile?.schoolYear||null}
    },{
      school:rankingSchool.trim()||null,
      schoolOptIn:rankingSchoolOptIn
    }));
    setMessage({ok:true,text:"Dados do ranking guardados neste dispositivo. A escola só será usada se a participação estiver ativa."});
  }

  async function signout(){
    setBusy(true);setMessage(null);
    try{
      await cloudSignOut();
      setS(prev=>({...prev,identity:demoIdentity("student")}));
      setSession({loading:false,user:null,error:null});
      setConflictRemote(null);
      setMessage({ok:true,text:"Sessão terminada. O progresso local continua neste dispositivo."});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  function registerConflict(remote){
    setConflictRemote(remote||null);
    setS(prev=>cloudConflict(prev,{
      remoteRevision:remote?.revision,
      remoteDeviceId:remote?.last_device_id,
      remoteUpdatedAt:remote?.updated_at,
      remoteState:remote?.state_json
    }));
    setMessage({ok:false,text:"A cloud tem uma versão mais recente. Não substituímos nada automaticamente."});
  }

  async function saveCloud(){
    setBusy(true);setMessage(null);setConflictRemote(null);
    const currentSync=cloudSyncMeta(s);
    try{
      const result=await saveStudentCloudState(s,{
        expectedRevision:currentSync.baseRevision,
        deviceId,
        knownRemote:!!currentSync.baseFingerprint
      });
      if(result?.conflict){
        registerConflict(result.remote);return;
      }

      const now=Date.now();
      const revision=Number(result?.data?.revision)||currentSync.baseRevision+1;
      setS(prev=>{
        let next=markCloudSaved(prev,{revision,deviceId,savedState:prev,at:now});
        return {...next,cloudMeta:{...(next.cloudMeta||{}),lastSavedAt:now,lastRemoteUpdatedAt:result?.data?.updated_at||new Date(now).toISOString()}};
      });
      setMessage({ok:true,text:`Progresso guardado com segurança na cloud · revisão ${revision}.`});
    }catch(error){
      if(error?.code==="CLOUD_SCHEMA_OUTDATED"){
        setMessage({ok:false,text:"Falta aplicar a migration v4.9 da cloud. O progresso local não foi alterado."});
      }else{
        queueCloudSave(s,{reason:"save_failed",expectedRevision:currentSync.baseRevision});
        refreshLocalSafety();
        setMessage({ok:false,text:"Não foi possível chegar à cloud. Guardámos uma tentativa local para poderes repetir mais tarde; o estudo continua seguro neste dispositivo."});
      }
    }finally{setBusy(false)}
  }

  async function loadCloud(){
    setBusy(true);setMessage(null);setConflictRemote(null);
    try{
      const row=await loadStudentCloudState();
      if(!row?.state_json){
        setMessage({ok:true,text:"Esta conta ainda não tem progresso guardado na cloud. O primeiro Guardar criará a revisão 1."});
      }else{
        saveLocalSnapshot(s,{label:"Antes de carregar da cloud"});
        const merged=mergeStudentCloudState(s,row.state_json);
        let recalibrated=normalizeAfterCloud(merged);
        recalibrated=markCloudLoaded(recalibrated,{
          revision:row.revision,
          remoteDeviceId:row.last_device_id,
          remoteState:row.state_json
        });
        setS({...recalibrated,cloudMeta:{...(recalibrated.cloudMeta||{}),lastLoadedAt:Date.now(),lastRemoteUpdatedAt:row.updated_at}});
        refreshLocalSafety();
        setMessage({ok:true,text:`Cloud carregada · revisão ${row.revision}. Criámos um snapshot local antes da substituição.`});
      }
    }catch(error){
      setMessage({ok:false,text:error?.code==="CLOUD_SCHEMA_OUTDATED"
        ?"Falta aplicar a migration v4.9 da cloud. Não carregámos nem alterámos o progresso local."
        :String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function resolveKeepRemote(){
    if(!conflictRemote?.state_json)return;
    setBusy(true);setMessage(null);
    try{
      saveLocalSnapshot(s,{label:"Conflito · antes de manter a cloud"});
      const merged=mergeStudentCloudState(s,conflictRemote.state_json);
      let next=normalizeAfterCloud(merged);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });
      setS(next);
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Mantivemos a revisão ${conflictRemote.revision} da cloud. A versão local anterior ficou num snapshot.`});
    }finally{setBusy(false)}
  }

  async function resolveKeepLocal(){
    if(!conflictRemote)return;
    setBusy(true);setMessage(null);
    try{
      saveLocalSnapshot(s,{label:"Conflito · antes de substituir a cloud"});
      const result=await overwriteStudentCloudState(s,{
        remoteRevision:conflictRemote.revision,
        deviceId
      });
      if(result?.conflict){
        registerConflict(result.remote);
        setMessage({ok:false,text:"A cloud mudou novamente enquanto resolvias o conflito. Voltámos a bloquear a escrita."});
        return;
      }
      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      setS(prev=>markCloudSaved(prev,{revision,deviceId,savedState:prev}));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Mantivemos este dispositivo e criámos a revisão ${revision}. O estado anterior foi preservado num snapshot.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function resolveMerge(){
    if(!conflictRemote?.state_json)return;
    setBusy(true);setMessage(null);
    try{
      saveLocalSnapshot(s,{label:"Conflito · antes de combinar"});
      const combined=safeCloudMerge(s,conflictRemote.state_json);
      let next=normalizeAfterCloud(combined);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });

      const result=await overwriteStudentCloudState(next,{
        remoteRevision:conflictRemote.revision,
        deviceId
      });
      if(result?.conflict){
        registerConflict(result.remote);
        setMessage({ok:false,text:"A cloud mudou novamente antes de concluirmos a combinação. Nada foi sobrescrito."});
        return;
      }

      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      next=markCloudSaved(next,{revision,deviceId,savedState:next});
      setS(next);
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Combinámos atividade independente dos dois dispositivos e guardámos a revisão ${revision}.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function retryPending(){
    const item=pending[0];
    if(!item)return;
    setBusy(true);setMessage(null);
    try{
      const result=await saveStudentCloudState(item.state,{
        expectedRevision:item.expectedRevision,
        deviceId:item.deviceId||deviceId,
        knownRemote:!!item.knownRemote
      });
      if(result?.conflict){
        registerConflict(result.remote);return;
      }
      removePendingCloudSave(item.id);
      const revision=Number(result?.data?.revision)||item.expectedRevision+1;
      setS(prev=>markCloudSaved(prev,{revision,deviceId,savedState:item.state}));
      refreshLocalSafety();
      setMessage({ok:true,text:`Tentativa pendente sincronizada · revisão ${revision}.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  const user=session.user;
  const localIndex=prepIndex(s);
  const lastRemoteDevice=sync.lastRemoteDeviceId?shortDeviceId(sync.lastRemoteDeviceId):"—";

  return <Shell><Back go={go}/><p className="eyebrow">CONTA <BrandName/> · CLOUD SEGURA</p>
    <h1>O teu progresso, sem sobrescritas silenciosas.</h1>
    <p className="muted">A app continua local-first. A v4.9 passa a tratar cada gravação cloud como uma revisão: se outro dispositivo avançou entretanto, a escrita é bloqueada e és tu que decides o que fazer.</p>

    {!cfg.configured&&<div className="cloudUnavailable">
      <b>○ Neon Auth/Data API ainda não ativados</b>
      <span>A arquitetura de conflitos já está pronta, mas nenhum serviço externo foi ativado por esta versão. O estudo continua integralmente local.</span>
    </div>}

    {cfg.configured&&session.loading&&<div className="cloudLoading">A verificar sessão…</div>}

    {cfg.configured&&!session.loading&&!user&&<>
      <div className="authTabs"><button className={mode==="signin"?"sel":""} onClick={()=>setMode("signin")}>Entrar</button><button className={mode==="signup"?"sel":""} onClick={()=>setMode("signup")}>Criar conta</button></div>
      <div className="realAuthForm">
        {mode==="signup"&&<label>Nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome"/></label>}
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nome@email.pt"/></label>
        <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
        <button disabled={busy||!email.trim()||password.length<8} onClick={submit}>{busy?"A processar…":mode==="signup"?"Criar conta":"Entrar"}</button>
      </div>
      <small className="cloudPrivacy">A password é tratada pelo Neon Auth. A app não guarda passwords na base de dados de progresso.</small>
    </>}

    {cfg.configured&&!session.loading&&user&&<>
      <div className="signedAccount">
        <div><span>Conta autenticada</span><b>{user.name||"Aluno"}</b><small>{user.email}</small></div><strong>● online</strong>
      </div>

      <div className="rankingIdentityCard">
        <div><small>DADOS PARA O RANKING</small><b>Indica o teu ano e escola</b><span>O login continua disponível sem estes dados. Para aderires ao ranking da escola, precisamos do ano, da escola e da tua autorização explícita.</span></div>
        <label>Ano<select value={rankingYear} onChange={e=>setRankingYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
        <label>Escola<input value={rankingSchool} onChange={e=>setRankingSchool(e.target.value)} placeholder="Nome da escola"/></label>
        <label className="rankConsent"><input type="checkbox" checked={rankingSchoolOptIn} onChange={e=>setRankingSchoolOptIn(e.target.checked)}/><span>Quero participar no ranking da minha escola.</span></label>
        <button onClick={saveRankingIdentity}>Guardar dados do ranking</button>
        <small className="privacyRankNote">A escola é usada apenas para agrupar o ranking e não é mostrada no teu perfil público. Podes retirar a autorização a qualquer momento.</small>
      </div>

      <div className="cloudProgressCard">
        <div><span>Progresso local atual</span><b>{localIndex??"—"}<small>/100 índice parcial</small></b></div>
        <div><span>XP</span><b>{s.xp}</b></div>
        <div><span>Áreas com evidência</span><b>{measuredThemes(s).length}/{academicScopeThemes(s.profile).length}</b></div>
      </div>

      <div className="cloudRevisionCard">
        <div><small>ESTE DISPOSITIVO</small><b>{shortDeviceId(deviceId)}</b><span>Revisão conhecida: {sync.baseRevision}</span></div>
        <div><small>ÚLTIMA CLOUD CONHECIDA</small><b>rev. {sync.lastRemoteRevision??sync.baseRevision}</b><span>Dispositivo: {lastRemoteDevice}</span></div>
        <div><small>REDE DE SEGURANÇA</small><b>{snapshots.length} snapshots</b><span>{pending.length} tentativa{pending.length===1?"":"s"} pendente{pending.length===1?"":"s"}</span></div>
      </div>

      <div className="syncActions">
        <button onClick={saveCloud} disabled={busy}>↑ Guardar com controlo de revisão</button>
        <button onClick={loadCloud} disabled={busy}>↓ Carregar cloud com snapshot</button>
      </div>

      {pending.length>0&&<div className="pendingCloudSave">
        <div><b>⟳ Há uma gravação por repetir</b><span>Falhou anteriormente sem apagar o progresso local.</span></div>
        <button onClick={retryPending} disabled={busy}>Tentar novamente</button>
      </div>}

      {conflictRemote&&<div className="cloudConflictCard">
        <div className="cloudConflictHead"><span>⚠</span><div><b>Conflito detetado — nada foi sobrescrito</b>
          <small>Este dispositivo conhecia a revisão {sync.baseRevision}; a cloud está na revisão {conflictRemote.revision}.</small></div></div>
        <p>Escolhe conscientemente. Antes de qualquer substituição ou combinação criamos um snapshot local.</p>
        <div className="conflictChoices">
          <button onClick={resolveKeepRemote} disabled={busy}><b>Manter cloud</b><span>Usar a versão mais recente que já está online.</span></button>
          <button onClick={resolveMerge} disabled={busy}><b>Combinar atividade</b><span>Unir evidências, Missões e exames independentes e recalibrar.</span></button>
          <button onClick={resolveKeepLocal} disabled={busy}><b>Manter este dispositivo</b><span>Substituir a cloud apenas se ela não tiver mudado outra vez.</span></button>
        </div>
      </div>}

      <div className="notice"><b>Porque ainda não sincronizamos silenciosamente?</b><span>Agora já detetamos conflitos e temos mecanismos de recuperação. A sincronização automática só deve ser ligada depois de testarmos estes fluxos com duas contas/dispositivos reais e a migration v4.9 aplicada.</span></div>

      <button className="secondary" onClick={signout} disabled={busy}>Terminar sessão</button>
    </>}

    {message&&<div className={"cloudMessage "+(message.ok?"ok":"bad")}><b>{message.ok?"✓":"!"}</b><span>{message.text}</span></div>}

    <div className="securityBox">
      <b>🔐 Duas proteções diferentes</b>
      <span><b>RLS</b> impede um utilizador de ler/escrever o progresso de outra conta. <b>Revisões otimistas</b> impedem dois dispositivos da mesma conta de se sobrescreverem sem aviso.</span>
    </div>
  </Shell>
}

