"use client";
import {useEffect,useRef,useState} from "react";
import {hasPendingAssessment,preservePendingAssessment} from "../lib/pendingAssessment";
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
import {migrateCompetition,updateCompetitionProfile,PORTUGAL_REGIONS} from "../lib/competition";
import {schoolsForRegion} from "../data/secondarySchools";
import {migrateEngagement} from "../lib/engagement";
import {migratePedagogicalIds,recalibrateAllScores,prepIndex,measuredThemes} from "../lib/engine";
import {demoIdentity} from "../lib/identity";
import {academicScopeThemes} from "../lib/curriculumScope";
import {openVerifiedAccount,assertAccountState,accountContextCurrent,accountOwner,accountError,subscribeAccountChanges} from "../lib/cloudAccountSession.js";
import {workspaceAccountId,legacyWorkspacePresent} from "../lib/accountWorkspace.js";
import {saveLocalState} from "../lib/persistence.js";

export function AccountCloud({s,setS,go}){
  const cfg=cloudConfiguration();
  const [mode,setMode]=useState("signin");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [rankingYear,setRankingYear]=useState(["10.º","11.º","12.º","Já terminei o secundário"].includes(s.profile?.schoolYear)?s.profile.schoolYear:"");
  const rankingProfile=s.competition?.profile||{};
  const initialRankingSchool=schoolsForRegion(rankingProfile.region||"").find(row=>row.id===rankingProfile.schoolId||row.name===rankingProfile.school);
  const [rankingRegion,setRankingRegion]=useState(rankingProfile.region||"");
  const [rankingMunicipality,setRankingMunicipality]=useState(initialRankingSchool?.municipality||"");
  const [rankingSchoolId,setRankingSchoolId]=useState(rankingProfile.schoolId||initialRankingSchool?.id||"");
  const rankingRegionSchools=schoolsForRegion(rankingRegion);
  const rankingMunicipalities=[...new Set(rankingRegionSchools.map(row=>row.municipality))].sort((a,b)=>a.localeCompare(b,"pt"));
  const rankingSchools=rankingMunicipality?rankingRegionSchools.filter(row=>row.municipality===rankingMunicipality):[];
  const rankingSelectedSchool=rankingSchools.find(row=>row.id===rankingSchoolId)||null;
  const [rankingSchoolOptIn,setRankingSchoolOptIn]=useState(!!s.competition?.profile?.schoolOptIn);
  const [session,setSession]=useState({loading:true,user:null,error:null});
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState(null);
  const [conflictRemote,setConflictRemote]=useState(null);
  const [pending,setPending]=useState([]);
  const [snapshots,setSnapshots]=useState([]);

  const sync=cloudSyncMeta(s);
  const deviceId=sync.deviceId||getOrCreateDeviceId();
  const stateRef=useRef(s);
  const live=useRef(true);
  stateRef.current=s;
  useEffect(()=>{
    live.current=true;
    const unsubscribe=subscribeAccountChanges(()=>{
      setConflictRemote(null);
      setSession({loading:false,user:null,error:null});
    });
    return ()=>{live.current=false;unsubscribe();};
  },[]);

  function assertCurrent(context,state=stateRef.current){
    if(!live.current||workspaceAccountId()!==context?.subject)throw accountError();
    assertAccountState(state,context);
  }
  async function beginOperation(){
    const owner=accountOwner(s);
    if(!owner)throw accountError("CLOUD_ACCOUNT_UNPROVEN");
    const context=await openVerifiedAccount({expectedAccountId:owner});
    assertCurrent(context);
    return context;
  }
  function accountUpdate(previous,context,next){
    try{assertCurrent(context,previous);return typeof next==="function"?next(previous):next;}
    catch{return previous;}
  }

  function refreshLocalSafety(context=session.accountContext){
    setPending(listPendingCloudSaves(context));
    setSnapshots(listLocalSnapshots(context));
  }

  useEffect(()=>{refreshLocalSafety()},[]);

  async function refreshSession(){
    if(!cfg.configured){
      setSession({loading:false,user:null,error:null});
      return;
    }
    const result=await getCloudSession();
    if(!live.current)return;
    const context=result.accountContext;
    if(context&&!accountContextCurrent(context))return;
    const workspaceMismatch=!!result.user&&workspaceAccountId()!==result.user.id;
    setSession({loading:false,user:result.user||null,error:result.error||null,accountContext:context,workspaceMismatch});
    setConflictRemote(null);
    refreshLocalSafety(context);
    if(result.user&&!workspaceMismatch){
      setS(prev=>accountUpdate(prev,context,previous=>({...migrateCloudSync(previous),identity:{
        mode:"authenticated",
        authUserId:result.user.id,
        displayName:result.user.name||result.user.email?.split("@")[0]||"Aluno",
        email:result.user.email||"",
        roles:["student"],
        activeRole:"student"
      }})));
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
      if(!saveLocalState(stateRef.current))throw new Error("Não foi possível preservar o progresso local. A conta não foi alterada.");
      if(mode==="signup"){
        await cloudSignUp({name:name.trim()||"Aluno",email:email.trim(),password});
        setMessage({ok:true,text:"Conta criada. Se receberes um email de confirmação, confirma-o antes de entrares."});
      }else{
        await cloudSignIn({email:email.trim(),password});
        setMessage({ok:true,text:"Sessão iniciada."});
      }
      await refreshSession();
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  function openAccountWorkspace(){
    if(!session.accountContext||!accountContextCurrent(session.accountContext))return;
    if(!saveLocalState(stateRef.current)){
      setMessage({ok:false,text:"Não foi possível preservar o progresso local. Nenhum dado foi substituído."});return;
    }
    window.location.reload();
  }

  function saveRankingIdentity(){
    setS(prev=>updateCompetitionProfile({
      ...prev,
      profile:{...prev.profile,schoolYear:rankingYear||prev.profile?.schoolYear||null}
    },{
      region:rankingRegion||null,
      school:rankingSelectedSchool?.name||null,
      schoolId:rankingSelectedSchool?.id||null,
      schoolOptIn:Boolean(rankingSelectedSchool&&rankingSchoolOptIn)
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

  function registerConflict(remote,context){
    assertCurrent(context);
    setConflictRemote(remote?{...remote,accountContext:context}:null);
    setS(prev=>accountUpdate(prev,context,previous=>cloudConflict(previous,{
      remoteRevision:remote?.revision,
      remoteDeviceId:remote?.last_device_id,
      remoteUpdatedAt:remote?.updated_at,
      remoteState:remote?.state_json
    })));
    setMessage({ok:false,text:"Existe progresso online mais recente. Não substituímos nada automaticamente."});
  }

  async function saveCloud(){
    setBusy(true);setMessage(null);setConflictRemote(null);
    const currentSync=cloudSyncMeta(s);
    let context;
    try{
      context=await beginOperation();
      const result=await saveStudentCloudState(s,{
        expectedRevision:currentSync.baseRevision,
        deviceId,
        knownRemote:!!currentSync.baseFingerprint,accountContext:context
      });
      assertCurrent(context);
      if(result?.conflict){
        registerConflict(result.remote,context);return;
      }

      const now=Date.now();
      const revision=Number(result?.data?.revision)||currentSync.baseRevision+1;
      setS(prev=>accountUpdate(prev,context,previous=>{
        let next=markCloudSaved(previous,{revision,deviceId,savedState:s,at:now});
        return {...next,cloudMeta:{...(next.cloudMeta||{}),lastSavedAt:now,lastRemoteUpdatedAt:result?.data?.updated_at||new Date(now).toISOString()}};
      }));
      setMessage({ok:true,text:`Progresso guardado online com segurança.`});
    }catch(error){
      if(error?.code==="CLOUD_SCHEMA_OUTDATED"){
        setMessage({ok:false,text:"O progresso online está temporariamente indisponível. O progresso deste dispositivo não foi alterado."});
      }else{
        const queued=queueCloudSave(s,{reason:"save_failed",expectedRevision:currentSync.baseRevision,accountContext:context});
        refreshLocalSafety();
        setMessage({ok:false,text:queued.persisted
          ?"Não foi possível guardar online. Guardámos uma tentativa neste dispositivo para poderes repetir mais tarde; o teu estudo continua disponível aqui."
          :"Não foi possível guardar online nem criar a tentativa pendente. O progresso atual não foi substituído; verifica o armazenamento deste dispositivo."});
      }
    }finally{setBusy(false)}
  }

  async function loadCloud(){
    if(hasPendingAssessment(s)){setMessage({ok:false,text:"Há uma avaliação em curso. Continua e conclui a tentativa antes de carregar progresso online."});return}
    setBusy(true);setMessage(null);setConflictRemote(null);
    try{
      const context=await beginOperation();
      const row=await loadStudentCloudState({accountContext:context});
      assertCurrent(context);
      if(!row?.state_json){
        setMessage({ok:true,text:"Esta conta ainda não tem progresso guardado online. Usa “Guardar online” quando quiseres criar a primeira cópia."});
      }else{
        const backup=saveLocalSnapshot(s,{label:"Antes de carregar da cloud",accountContext:context});
        if(!backup.persisted)throw new Error("Não foi possível preservar a cópia local. Nenhum progresso foi substituído.");
        const merged=mergeStudentCloudState(s,row.state_json);
        let recalibrated=normalizeAfterCloud(merged);
        recalibrated=markCloudLoaded(recalibrated,{
          revision:row.revision,
          remoteDeviceId:row.last_device_id,
          remoteState:row.state_json
        });
        setS(prev=>preservePendingAssessment(prev,accountUpdate(prev,context,{...recalibrated,cloudMeta:{...(recalibrated.cloudMeta||{}),lastLoadedAt:Date.now(),lastRemoteUpdatedAt:row.updated_at}})));
        refreshLocalSafety();
        setMessage({ok:true,text:`Progresso online carregado. Criámos primeiro uma cópia de segurança neste dispositivo.`});
      }
    }catch(error){
      setMessage({ok:false,text:error?.code==="CLOUD_SCHEMA_OUTDATED"
        ?"O progresso online está temporariamente indisponível. Não carregámos nem alterámos o progresso deste dispositivo."
        :String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function resolveKeepRemote(){
    if(hasPendingAssessment(s)){setMessage({ok:false,text:"Há uma avaliação em curso. Continua e conclui a tentativa antes de carregar progresso online."});return}
    if(!conflictRemote?.state_json)return;
    setBusy(true);setMessage(null);
    try{
      const context=conflictRemote.accountContext;
      assertCurrent(context);
      await openVerifiedAccount({expectedAccountId:context.subject});
      assertCurrent(context);
      const backup=saveLocalSnapshot(s,{label:"Conflito · antes de manter a cloud",accountContext:context});
      if(!backup.persisted)throw new Error("Não foi possível preservar a cópia local. Nenhum progresso foi substituído.");
      const merged=mergeStudentCloudState(s,conflictRemote.state_json);
      let next=normalizeAfterCloud(merged);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });
      setS(prev=>preservePendingAssessment(prev,accountUpdate(prev,context,next)));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Usámos o progresso online mais recente. A versão anterior deste dispositivo ficou guardada numa cópia de segurança.`});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  async function resolveKeepLocal(){
    if(!conflictRemote)return;
    setBusy(true);setMessage(null);
    try{
      const context=conflictRemote.accountContext;
      assertCurrent(context);
      const backup=saveLocalSnapshot(s,{label:"Conflito · antes de substituir a cloud",accountContext:context});
      if(!backup.persisted)throw new Error("Não foi possível preservar a cópia local. Nenhum progresso foi substituído.");
      const result=await overwriteStudentCloudState(s,{
        remoteRevision:conflictRemote.revision,
        deviceId,accountContext:context
      });
      assertCurrent(context);
      if(result?.conflict){
        registerConflict(result.remote,context);
        setMessage({ok:false,text:"O progresso online mudou novamente enquanto escolhias. Bloqueámos a gravação para não perder nenhuma versão."});
        return;
      }
      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      setS(prev=>accountUpdate(prev,context,previous=>markCloudSaved(previous,{revision,deviceId,savedState:s})));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Mantivemos o progresso deste dispositivo. A versão anterior ficou preservada numa cópia de segurança.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function resolveMerge(){
    if(hasPendingAssessment(s)){setMessage({ok:false,text:"Há uma avaliação em curso. Continua e conclui a tentativa antes de carregar progresso online."});return}
    if(!conflictRemote?.state_json)return;
    setBusy(true);setMessage(null);
    try{
      const context=conflictRemote.accountContext;
      assertCurrent(context);
      const backup=saveLocalSnapshot(s,{label:"Conflito · antes de combinar",accountContext:context});
      if(!backup.persisted)throw new Error("Não foi possível preservar a cópia local. Nenhum progresso foi substituído.");
      const combined=safeCloudMerge(s,conflictRemote.state_json);
      let next=normalizeAfterCloud(combined);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });

      const result=await overwriteStudentCloudState(next,{
        remoteRevision:conflictRemote.revision,
        deviceId,accountContext:context
      });
      assertCurrent(context);
      if(result?.conflict){
        registerConflict(result.remote,context);
        setMessage({ok:false,text:"O progresso online mudou novamente antes de concluirmos a combinação. Nada foi substituído."});
        return;
      }

      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      next=markCloudSaved(next,{revision,deviceId,savedState:next});
      setS(prev=>preservePendingAssessment(prev,accountUpdate(prev,context,next)));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Combinámos o progresso dos dois dispositivos e guardámos a nova versão online.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  async function retryPending(){
    const item=pending.find(row=>!row.quarantined);
    if(!item)return;
    setBusy(true);setMessage(null);
    try{
      const context=await beginOperation();
      if(item.accountId!==context.subject)throw accountError();
      const result=await saveStudentCloudState(item.state,{
        expectedRevision:item.expectedRevision,
        deviceId:item.deviceId||deviceId,
        knownRemote:!!item.knownRemote,accountContext:context
      });
      assertCurrent(context);
      if(result?.conflict){
        registerConflict(result.remote,context);return;
      }
      removePendingCloudSave(item.id,context);
      const revision=Number(result?.data?.revision)||item.expectedRevision+1;
      setS(prev=>accountUpdate(prev,context,previous=>markCloudSaved(previous,{revision,deviceId,savedState:item.state})));
      refreshLocalSafety();
      setMessage({ok:true,text:`Tentativa pendente guardada online com sucesso.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }

  const user=session.user;
  const accountReady=!!user&&!session.workspaceMismatch&&accountContextCurrent(session.accountContext);
  const localIndex=prepIndex(s);
  const lastRemoteDevice=sync.lastRemoteDeviceId?shortDeviceId(sync.lastRemoteDeviceId):"—";

  return <Shell><Back go={go}/><p className="eyebrow">CONTA <BrandName/> · PROGRESSO ONLINE</p>
    <h1>O teu progresso, seguro em todos os teus dispositivos.</h1>
    <p className="muted">A APProva+ guarda primeiro o estudo neste dispositivo. Quando guardas online, verifica se existe progresso mais recente noutro dispositivo e nunca o substitui sem te perguntar.</p>

    {!cfg.configured&&<div className="cloudUnavailable">
      <b>○ Progresso online temporariamente indisponível</b>
      <span>Podes continuar a estudar normalmente. O progresso fica guardado neste dispositivo e poderás voltar a guardá-lo online quando o serviço estiver disponível.</span>
    </div>}

    {cfg.configured&&session.loading&&<div className="cloudLoading">A verificar sessão…</div>}

    {cfg.configured&&!session.loading&&!user&&<>
      <div className="authTabs"><button className={mode==="signin"?"sel":""} onClick={()=>setMode("signin")}>Entrar</button><button className={mode==="signup"?"sel":""} onClick={()=>setMode("signup")}>Criar conta</button></div>
      <div className="realAuthForm">
        {mode==="signup"&&<label>Nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome"/></label>}
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nome@email.pt"/></label>
        <label>Palavra-passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
        <button disabled={busy||!email.trim()||password.length<8} onClick={submit}>{busy?"A processar…":mode==="signup"?"Criar conta":"Entrar"}</button>
      </div>
      <small className="cloudPrivacy">A palavra-passe é tratada pelo serviço de autenticação. A APProva+ não a guarda nos dados de progresso.</small>
    </>}

    {cfg.configured&&!session.loading&&user&&<>
      <div className="signedAccount">
        <div><span>Conta autenticada</span><b>{user.name||"Aluno"}</b><small>{user.email}</small></div><strong>● online</strong>
      </div>

      {session.workspaceMismatch&&<div className="notice"><b>O progresso desta aba foi preservado separadamente.</b><span>Para abrir o progresso da conta autenticada, muda de espaço de estudo. As tentativas anteriores ficam guardadas na conta de origem.</span><button onClick={openAccountWorkspace} disabled={busy}>Abrir progresso desta conta</button></div>}

      {accountReady&&<>
      {legacyWorkspacePresent()&&<div className="notice"><b>Há progresso antigo guardado em separado.</b><span>Os dados sem conta de origem confirmada continuam neste dispositivo. Não são enviados nem associados automaticamente à conta atual.</span></div>}

      <div className="rankingIdentityCard">
        <div><small>DADOS PARA O RANKING</small><b>Indica o teu ano e escola</b><span>O login continua disponível sem estes dados. Para aderires ao ranking da escola, precisamos do ano, da escola e da tua autorização explícita.</span></div>
        <label>Ano<select value={rankingYear} onChange={e=>setRankingYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
        <label>Distrito/Região<select value={rankingRegion} onChange={e=>{setRankingRegion(e.target.value);setRankingMunicipality("");setRankingSchoolId("")}}><option value="">Selecionar distrito/região</option>{PORTUGAL_REGIONS.map(region=><option key={region} value={region}>{region}</option>)}</select></label>
        <label>Município<select value={rankingMunicipality} disabled={!rankingRegion} onChange={e=>{setRankingMunicipality(e.target.value);setRankingSchoolId("")}}><option value="">{rankingRegion?"Selecionar município":"Escolhe primeiro o distrito/região"}</option>{rankingMunicipalities.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
        <label>Escola<select value={rankingSchoolId} disabled={!rankingMunicipality} onChange={e=>setRankingSchoolId(e.target.value)}><option value="">{rankingMunicipality?"Selecionar escola":"Escolhe primeiro o município"}</option>{rankingSchools.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>
        <label className="rankConsent"><input type="checkbox" checked={rankingSchoolOptIn} onChange={e=>setRankingSchoolOptIn(e.target.checked)}/><span>Quero participar no ranking da minha escola.</span></label>
        <button onClick={saveRankingIdentity}>Guardar dados do ranking</button>
        <small className="privacyRankNote">A escola é usada apenas para agrupar o ranking e não é mostrada no teu perfil público. Podes retirar a autorização a qualquer momento.</small>
      </div>

      <div className="cloudProgressCard">
        <div><span>Progresso local atual</span><b>{localIndex??"—"}<small>/100 índice parcial</small></b></div>
        <div><span>XP</span><b>{s.xp}</b></div>
        <div><span>Áreas com evidência</span><b>{measuredThemes(s).length}/{academicScopeThemes(s.profile).length}</b></div>
      </div>

      <details className="cloudTechnicalDetails">
        <summary>Detalhes e cópias de segurança</summary>
        <div className="cloudRevisionCard">
          <div><small>ESTE DISPOSITIVO</small><b>{shortDeviceId(deviceId)}</b><span>Versão conhecida: {sync.baseRevision}</span></div>
          <div><small>ÚLTIMO PROGRESSO ONLINE</small><b>versão {sync.lastRemoteRevision??sync.baseRevision}</b><span>Dispositivo: {lastRemoteDevice}</span></div>
          <div><small>CÓPIAS DE SEGURANÇA</small><b>{snapshots.length}</b><span>{pending.length} tentativa{pending.length===1?"":"s"} pendente{pending.length===1?"":"s"}</span></div>
        </div>
      </details>

      <div className="syncActions">
        <button onClick={saveCloud} disabled={busy}>↑ Guardar online</button>
        <button onClick={loadCloud} disabled={busy}>↓ Carregar progresso online</button>
      </div>

      {pending.length>0&&<div className="pendingCloudSave">
        <div><b>⟳ Há uma gravação por repetir</b><span>Falhou anteriormente sem apagar o progresso local.</span></div>
        <button onClick={retryPending} disabled={busy||!pending.some(row=>!row.quarantined)}>Tentar novamente</button>
        {pending.some(row=>row.quarantined)&&<small>Há dados antigos ou de outra conta preservados em quarentena. Não serão enviados por esta sessão.</small>}
      </div>}

      {conflictRemote&&<div className="cloudConflictCard">
        <div className="cloudConflictHead"><span>⚠</span><div><b>Encontrámos progresso mais recente noutro dispositivo</b>
          <small>Nada foi substituído. Escolhe qual progresso queres manter ou combina os dois.</small></div></div>
        <p>Antes de qualquer alteração, a APProva+ cria uma cópia de segurança neste dispositivo.</p>
        <div className="conflictChoices">
          <button onClick={resolveKeepRemote} disabled={busy}><b>Usar progresso online</b><span>Usar a versão mais recente que já está guardada online.</span></button>
          <button onClick={resolveMerge} disabled={busy}><b>Combinar progresso</b><span>Juntar atividade feita separadamente nos dois dispositivos.</span></button>
          <button onClick={resolveKeepLocal} disabled={busy}><b>Manter este dispositivo</b><span>Guardar online o progresso que estás a ver aqui.</span></button>
        </div>
      </div>}

      <div className="notice"><b>O que acontece entre dispositivos?</b><span>Se encontrares progresso diferente noutro dispositivo, a APProva+ bloqueia a substituição automática e pede-te para escolher. Assim, nenhuma versão desaparece sem aviso.</span></div>
      </>}

      <button className="secondary" onClick={signout} disabled={busy}>Terminar sessão</button>
    </>}

    {message&&<div className={"cloudMessage "+(message.ok?"ok":"bad")}><b>{message.ok?"✓":"!"}</b><span>{message.text}</span></div>}

    <div className="securityBox">
      <b>🔐 O teu progresso está protegido</b>
      <span>Cada conta só pode aceder ao respetivo progresso e, se dois dispositivos tiverem versões diferentes, a APProva+ pede-te para decidir antes de substituir alguma coisa.</span>
    </div>
  </Shell>
}

