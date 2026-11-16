"use client";
import {useEffect,useState} from "react";
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
import {updateCompetitionProfile,PORTUGAL_REGIONS} from "../lib/competition";
import {schoolsForRegion} from "../data/secondarySchools";
import {prepIndex,measuredThemes} from "../lib/engine";
import {demoIdentity} from "../lib/identity";
import {academicScopeThemes} from "../lib/curriculumScope";
import {normalizeAfterCloud} from "../lib/cloudApply";
import {flushCloudNow,rememberCloudSession,bindCloudAccount} from "../lib/cloudAutosync";
import {CLOUD_ACCOUNT_HINT_KEY} from "../lib/cloudSessionHint";
import {activeStateAccount,archiveActiveAccount,switchDeviceToAccount} from "../lib/accountDeviceStorage";

// O ranking ainda usa participantes simulados: não pedimos ano, distrito nem
// escola a alunos (muitos menores) para uma funcionalidade que ainda não existe.
const RANKING_PROFILE_ENABLED=false;

export function AccountCloud({s,setS,go,gate=false}){
  const cfg=cloudConfiguration();
  const [mode,setMode]=useState("signin");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [signupAge,setSignupAge]=useState(false);
  const [signupTerms,setSignupTerms]=useState(false);
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
      rememberCloudSession(true);
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

  async function verifiedSessionUserId(){
    try{
      const response=await fetch("/api/auth/session",{credentials:"include",cache:"no-store"});
      const body=response.ok?await response.json().catch(()=>null):null;
      return body?.ok&&body.user?.id?String(body.user.id):null;
    }catch{return null}
  }

  function setHintAndReload(){
    // Sem setS antes de recarregar: o estado em memória do aluno anterior não
    // pode voltar a ser escrito no armazenamento depois da troca.
    try{localStorage.setItem(CLOUD_ACCOUNT_HINT_KEY,"1")}catch{}
    window.location.reload();
  }

  async function submit(){
    if(mode==="signup"&&!(signupAge&&signupTerms)){
      setMessage({ok:false,text:"Para criar conta, confirma que tens 13 anos ou mais e que aceitas os termos e a política de privacidade."});
      return;
    }
    setBusy(true);setMessage(null);
    try{
      if(mode==="signup"){
        await cloudSignUp({name:name.trim()||"Aluno",email:email.trim(),password});
        setMessage({ok:true,text:"Conta criada. Se receberes um email de confirmação, confirma-o antes de entrares."});
      }else{
        await cloudSignIn({email:email.trim(),password});
        setMessage({ok:true,text:"Sessão iniciada."});
      }
      // Cada conta tem a sua área neste dispositivo: se o progresso ativo for de
      // outra conta, é arquivado (sem apagar) e o desta conta é reposto.
      const userId=await verifiedSessionUserId();
      if(userId){
        const switched=switchDeviceToAccount(userId);
        if(switched.reload){setHintAndReload();return}
        if(!switched.ok){
          setMessage({ok:false,text:"Não foi possível separar o progresso de outra conta neste dispositivo (pouco espaço no browser). Por segurança, não vamos guardar nem misturar dados até isto ser resolvido."});
        }
      }
      await refreshSession();
      rememberCloudSession(true);
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
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
      // Última gravação antes de sair. Se falhar, o aluno decide: o progresso
      // nunca é apagado deste dispositivo ao terminar sessão.
      const flushed=await flushCloudNow();
      if(!["saved","inactive","signed_out"].includes(flushed?.status)
        &&typeof window!=="undefined"
        &&!window.confirm("Ainda não foi possível guardar online o progresso mais recente. Fica guardado neste dispositivo. Terminar sessão mesmo assim?")){
        setMessage({ok:false,text:"Sessão mantida. Tenta novamente quando tiveres ligação."});
        return;
      }
      await cloudSignOut();
      // O progresso desta conta sai da área ativa do dispositivo (fica arquivado
      // localmente e na conta) para não ficar visível ao próximo aluno.
      const owner=activeStateAccount()||(session.user?String(session.user.id):null);
      if(owner&&activeStateAccount()===owner){
        const archived=archiveActiveAccount(owner);
        if(archived.ok){
          try{localStorage.removeItem(CLOUD_ACCOUNT_HINT_KEY)}catch{}
          window.location.reload();
          return;
        }
      }
      rememberCloudSession(false);
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
    setMessage({ok:false,text:"Existe progresso online mais recente. Não substituímos nada automaticamente."});
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
      setMessage({ok:true,text:`Progresso guardado online com segurança.`});
    }catch(error){
      if(error?.code==="CLOUD_SCHEMA_OUTDATED"){
        setMessage({ok:false,text:"O progresso online está temporariamente indisponível. O progresso deste dispositivo não foi alterado."});
      }else{
        queueCloudSave(s,{reason:"save_failed",expectedRevision:currentSync.baseRevision});
        refreshLocalSafety();
        setMessage({ok:false,text:"Não foi possível guardar online. Guardámos uma tentativa neste dispositivo para poderes repetir mais tarde; o teu estudo continua disponível aqui."});
      }
    }finally{setBusy(false)}
  }

  async function loadCloud(){
    if(hasPendingAssessment(s)){setMessage({ok:false,text:"Há uma avaliação em curso. Continua e conclui a tentativa antes de carregar progresso online."});return}
    setBusy(true);setMessage(null);setConflictRemote(null);
    try{
      const row=await loadStudentCloudState();
      if(!row?.state_json){
        setMessage({ok:true,text:"Esta conta ainda não tem progresso guardado online. Usa “Guardar online” quando quiseres criar a primeira cópia."});
      }else{
        saveLocalSnapshot(s,{label:"Antes de carregar da cloud"});
        const merged=mergeStudentCloudState(s,row.state_json);
        let recalibrated=normalizeAfterCloud(merged);
        recalibrated=markCloudLoaded(recalibrated,{
          revision:row.revision,
          remoteDeviceId:row.last_device_id,
          remoteState:row.state_json
        });
        setS(prev=>preservePendingAssessment(prev,{...recalibrated,cloudMeta:{...(recalibrated.cloudMeta||{}),lastLoadedAt:Date.now(),lastRemoteUpdatedAt:row.updated_at}}));
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
      saveLocalSnapshot(s,{label:"Conflito · antes de manter a cloud"});
      const merged=mergeStudentCloudState(s,conflictRemote.state_json);
      let next=normalizeAfterCloud(merged);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });
      setS(prev=>preservePendingAssessment(prev,next));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Usámos o progresso online mais recente. A versão anterior deste dispositivo ficou guardada numa cópia de segurança.`});
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
        setMessage({ok:false,text:"O progresso online mudou novamente enquanto escolhias. Bloqueámos a gravação para não perder nenhuma versão."});
        return;
      }
      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      setS(prev=>markCloudSaved(prev,{revision,deviceId,savedState:prev}));
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
        setMessage({ok:false,text:"O progresso online mudou novamente antes de concluirmos a combinação. Nada foi substituído."});
        return;
      }

      const revision=Number(result?.data?.revision)||Number(conflictRemote.revision)+1;
      next=markCloudSaved(next,{revision,deviceId,savedState:next});
      setS(prev=>preservePendingAssessment(prev,next));
      setConflictRemote(null);
      refreshLocalSafety();
      setMessage({ok:true,text:`Combinámos o progresso dos dois dispositivos e guardámos a nova versão online.`});
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
      setMessage({ok:true,text:`Tentativa pendente guardada online com sucesso.`});
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
    }finally{setBusy(false)}
  }


  // Conflito detetado pela sincronização automática: mostrar já as opções.
  const sessionUserId=session.user?String(session.user.id):null;
  const autosyncConflict=!!sync.lastConflict;
  useEffect(()=>{
    if(!sessionUserId||!autosyncConflict||conflictRemote)return;
    if(sync.accountId&&sync.accountId!==sessionUserId)return;
    let live=true;
    loadStudentCloudState().then(row=>{if(live&&row)registerConflict(row)}).catch(()=>{});
    return ()=>{live=false};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sessionUserId,autosyncConflict]);

  // Guardar/carregar/resolver aqui é uma escolha explícita: o progresso deste
  // dispositivo fica associado a esta conta (a sincronização automática segue-a).
  useEffect(()=>{
    if(sessionUserId&&!sync.accountId&&sync.lastSyncedAt)setS(prev=>bindCloudAccount(prev,sessionUserId));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sessionUserId,sync.lastSyncedAt]);

  const user=session.user;
  // O progresso deste dispositivo pertence a outra conta: nada de guardar/carregar
  // manualmente nesta conta, para não misturar dados de alunos diferentes.
  const otherAccountOwnsDevice=!!(user&&sync.accountId&&sync.accountId!==String(user.id));
  const localIndex=prepIndex(s);
  const lastRemoteDevice=sync.lastRemoteDeviceId?shortDeviceId(sync.lastRemoteDeviceId):"—";

  return <Shell>{gate?<Back go={go} to="welcome"/>:<Back go={go}/>}<p className="eyebrow">CONTA <BrandName/> · PROGRESSO ONLINE</p>
    <h1>{gate?"Entra ou cria a tua conta para começar.":"O teu progresso, seguro em todos os teus dispositivos."}</h1>
    {gate&&<p className="muted">A conta guarda o teu progresso para o encontrares no telemóvel e no computador. Só pedimos nome, email e palavra-passe.</p>}
    <p className="muted">Com sessão iniciada, o teu progresso é guardado automaticamente na conta e aparece nos teus outros dispositivos. Se houver versões diferentes, a APProva+ pede-te para escolher antes de substituir alguma coisa.</p>

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
        {mode==="signup"&&<>
          <label className="rankConsent"><input type="checkbox" checked={signupAge} onChange={e=>setSignupAge(e.target.checked)}/><span>Tenho 13 anos ou mais.</span></label>
          <label className="rankConsent"><input type="checkbox" checked={signupTerms} onChange={e=>setSignupTerms(e.target.checked)}/><span>Li e aceito os <a href="/termos" target="_blank" rel="noopener">termos</a> e a <a href="/privacidade" target="_blank" rel="noopener">política de privacidade</a>.</span></label>
        </>}
        <button disabled={busy||!email.trim()||password.length<8||(mode==="signup"&&!(signupAge&&signupTerms))} onClick={submit}>{busy?"A processar…":mode==="signup"?"Criar conta":"Entrar"}</button>
      </div>
      <small className="cloudPrivacy">A palavra-passe é tratada pelo serviço de autenticação. A APProva+ não a guarda nos dados de progresso.</small>
    </>}

    {cfg.configured&&!session.loading&&user&&<>
      <div className="signedAccount">
        <div><span>Conta autenticada</span><b>{user.name||"Aluno"}</b><small>{user.email}</small></div><strong>● online</strong>
      </div>

      {RANKING_PROFILE_ENABLED&&<div className="rankingIdentityCard">
        <div><small>DADOS PARA O RANKING</small><b>Indica o teu ano e escola</b><span>O login continua disponível sem estes dados. Para aderires ao ranking da escola, precisamos do ano, da escola e da tua autorização explícita.</span></div>
        <label>Ano<select value={rankingYear} onChange={e=>setRankingYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
        <label>Distrito/Região<select value={rankingRegion} onChange={e=>{setRankingRegion(e.target.value);setRankingMunicipality("");setRankingSchoolId("")}}><option value="">Selecionar distrito/região</option>{PORTUGAL_REGIONS.map(region=><option key={region} value={region}>{region}</option>)}</select></label>
        <label>Município<select value={rankingMunicipality} disabled={!rankingRegion} onChange={e=>{setRankingMunicipality(e.target.value);setRankingSchoolId("")}}><option value="">{rankingRegion?"Selecionar município":"Escolhe primeiro o distrito/região"}</option>{rankingMunicipalities.map(name=><option key={name} value={name}>{name}</option>)}</select></label>
        <label>Escola<select value={rankingSchoolId} disabled={!rankingMunicipality} onChange={e=>setRankingSchoolId(e.target.value)}><option value="">{rankingMunicipality?"Selecionar escola":"Escolhe primeiro o município"}</option>{rankingSchools.map(row=><option key={row.id} value={row.id}>{row.name}</option>)}</select></label>
        <label className="rankConsent"><input type="checkbox" checked={rankingSchoolOptIn} onChange={e=>setRankingSchoolOptIn(e.target.checked)}/><span>Quero participar no ranking da minha escola.</span></label>
        <button onClick={saveRankingIdentity}>Guardar dados do ranking</button>
        <small className="privacyRankNote">A escola é usada apenas para agrupar o ranking e não é mostrada no teu perfil público. Podes retirar a autorização a qualquer momento.</small>
      </div>}

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
        <p className="muted">Normalmente não precisas destes botões: o progresso é guardado e atualizado automaticamente. Usa-os apenas se te pedirmos ajuda para recuperar progresso.</p>
        {!otherAccountOwnsDevice&&<div className="syncActions">
          <button onClick={saveCloud} disabled={busy}>↑ Guardar online</button>
          <button onClick={loadCloud} disabled={busy}>↓ Carregar progresso online</button>
        </div>}

        {pending.length>0&&<div className="pendingCloudSave">
          <div><b>⟳ Há uma gravação por repetir</b><span>Falhou anteriormente sem apagar o progresso local.</span></div>
          <button onClick={retryPending} disabled={busy}>Tentar novamente</button>
        </div>}

        <div className="notice"><b>O que acontece entre dispositivos?</b><span>Se encontrares progresso diferente noutro dispositivo, a APProva+ bloqueia a substituição automática e pede-te para escolher. Assim, nenhuma versão desaparece sem aviso.</span></div>
      </details>

      {otherAccountOwnsDevice&&<div className="notice warning"><b>Este dispositivo tem progresso de outra conta</b><span>Para proteger os dados de cada aluno, o progresso deste dispositivo não é guardado nem substituído nesta conta. Termina sessão e entra com a conta a que o progresso pertence.</span></div>}

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


      <button className="secondary" onClick={signout} disabled={busy}>Terminar sessão</button>
    </>}

    {message&&<div className={"cloudMessage "+(message.ok?"ok":"bad")}><b>{message.ok?"✓":"!"}</b><span>{message.text}</span></div>}

    <div className="securityBox">
      <b>🔐 O teu progresso está protegido</b>
      <span>Cada conta só pode aceder ao respetivo progresso e, se dois dispositivos tiverem versões diferentes, a APProva+ pede-te para decidir antes de substituir alguma coisa.</span>
    </div>
  </Shell>
}

