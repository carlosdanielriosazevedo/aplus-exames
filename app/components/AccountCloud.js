"use client";
import {useEffect,useState} from "react";
import {hasPendingAssessment,preservePendingAssessment} from "../lib/pendingAssessment";
import {Back,BrandName,Shell} from "./chrome";
import {
  cloudConfiguration,getCloudSession,cloudSignIn,cloudSignInSocial,cloudSignUp,cloudSignOut,cloudDeleteAccount,cloudDeletionMethod,cloudReauthenticateSocial,cloudRequestPasswordReset,cloudResetPassword,
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
import {flushCloudNow,rememberCloudSession,bindCloudAccount,profilesDiffer} from "../lib/cloudAutosync";
import {CLOUD_ACCOUNT_HINT_KEY} from "../lib/cloudSessionHint";
import {queueSignupConsent,flushPendingConsent} from "../lib/consentClient";
import {activeStateAccount,archiveActiveAccount,switchDeviceToAccount,purgeAccountFromDevice,hasAcademicData,eraseAcademicDataFromDevice,discardAnonymousArchive,discardUnsavedDeviceProgress,OPEN_HOME_AFTER_SIGNIN_KEY} from "../lib/accountDeviceStorage";
import {settleDeviceForAccount} from "../lib/signInDevice";
import {detectUnsavedWork,logoutPlan,logoutPromptCopy} from "../lib/logoutPlan";
import {enabledSocialProviders,markSocialSignInPending,SOCIAL_PENDING_KEY} from "../lib/socialSignIn";

// O ranking ainda usa participantes simulados: não pedimos ano, distrito nem
// escola a alunos (muitos menores) para uma funcionalidade que ainda não existe.
const RANKING_PROFILE_ENABLED=false;

// Perfil escolar resumido: ano e número de áreas que contam para o índice.
function profileSummary(state){
  const year=state?.profile?.schoolYear||"ano por indicar";
  const areas=academicScopeThemes(state?.profile).length;
  return `${year} · ${areas} ${areas===1?"área":"áreas"} da matéria`;
}

// Resumo curto de uma versão do progresso, para o aluno comparar antes de escolher.
function versionSummary(state){
  if(!state)return "—";
  let index=null;
  try{index=prepIndex(state)}catch{}
  const xp=Number(state.xp)||0;
  const sessions=(state.missionHistory||[]).length+(state.examHistory||[]).length
    +Object.values(state.subjectProgress||{}).reduce((n,row)=>n+((row?.sessions||[]).length),0);
  return [`${xp} XP`,index===null?null:`índice ${index}`,`${sessions} ${sessions===1?"sessão":"sessões"}`].filter(Boolean).join(" · ");
}

export function AccountCloud({s,setS,go,gate=false}){
  const cfg=cloudConfiguration();
  // "Criar conta" vindo do convite "Guarda o teu plano" abre já o separador certo.
  const [mode,setMode]=useState(()=>{
    if(gate)return "signup";
    try{if(window.sessionStorage.getItem("approva-account-mode")==="signup"){window.sessionStorage.removeItem("approva-account-mode");return "signup"}}catch{}
    return "signin";
  });
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [confirmStartOver,setConfirmStartOver]=useState(false);
  const [emailInUse,setEmailInUse]=useState(false);
  const [password,setPassword]=useState("");
  const [signupAge,setSignupAge]=useState(false);
  const [signupTerms,setSignupTerms]=useState(false);
  // Entrar com Google/Microsoft: só os fornecedores ativados por variável de ambiente.
  const socialProviders=enabledSocialProviders();
  const [socialConsent,setSocialConsent]=useState(false);
  const [logoutPrompt,setLogoutPrompt]=useState(null);
  const [deletePassword,setDeletePassword]=useState("");
  const [deleteConfirmation,setDeleteConfirmation]=useState("");
  // Como confirmar a eliminação: palavra-passe (conta de email) ou voltar a entrar
  // com Google/Microsoft (conta sem palavra-passe). Carregado ao abrir a secção.
  const [deleteMethod,setDeleteMethod]=useState(null);
  const [resetStep,setResetStep]=useState("request");
  const [resetCode,setResetCode]=useState("");
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
      flushPendingConsent().catch(()=>{});
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
    // Acabou de entrar: depois de recarregar, abrir no menu (o progresso da conta
    // chega pela sincronização), e não o ecrã inicial público.
    try{sessionStorage.setItem(OPEN_HOME_AFTER_SIGNIN_KEY,"1")}catch{}
    window.location.reload();
  }

  async function continueWithProvider(provider){
    if(mode==="signup"&&!socialConsent)return;
    setBusy(true);setMessage(null);
    try{
      markSocialSignInPending(provider);
      rememberCloudSession(true);
      await cloudSignInSocial(provider); // o browser sai para o fornecedor
    }catch(error){
      try{localStorage.removeItem(SOCIAL_PENDING_KEY)}catch{}
      setMessage({ok:false,text:String(error?.message||error)});
      setBusy(false);
    }
  }

  // "Esqueci-me da palavra-passe": 1) pedir código; 2) código + nova palavra-passe.
  async function requestReset(){
    setBusy(true);setMessage(null);
    try{
      await cloudRequestPasswordReset({email:email.trim()});
      setResetStep("code");
      // A mesma resposta exista ou não conta com este email.
      setMessage({ok:true,text:"Se existir uma conta com este email, enviámos um código de 6 dígitos. Procura também no spam."});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }
  async function confirmReset(){
    setBusy(true);setMessage(null);
    try{
      await cloudResetPassword({email:email.trim(),otp:resetCode.trim(),password});
      setMode("signin");setResetStep("request");setResetCode("");setPassword("");
      setMessage({ok:true,text:"Palavra-passe alterada. Já podes entrar com a nova palavra-passe."});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  async function submit(){
    if(mode==="signup"&&!(signupAge&&signupTerms)){
      setMessage({ok:false,text:"Para criar conta, confirma que tens 13 anos ou mais e que aceitas os termos e a política de privacidade."});
      return;
    }
    setBusy(true);setMessage(null);
    try{
      if(mode==="signup"){
        await queueSignupConsent(email);
        await cloudSignUp({name:name.trim()||"Aluno",email:email.trim(),password});
        setMessage({ok:true,text:"Conta criada. A partir de agora o teu progresso fica guardado na conta."});
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
        // Conta acabada de criar neste dispositivo: o estudo feito aqui é de quem a
        // criou. Liga-o já à conta.
        if(mode==="signup"&&switched.ok&&!activeStateAccount()&&hasAcademicData()){
          setS(prev=>bindCloudAccount(prev,userId,{adopted:true}));
        }
        // Entrar numa conta com estudo feito sem conta neste dispositivo
        // (2026-11-22): a conta manda. Conta com progresso → carrega a conta (o
        // estudo deste dispositivo é apagado); conta vazia → fica com ele.
        if(mode==="signin"&&switched.ok){
          const settled=await settleDeviceForAccount(userId,{load:loadStudentCloudState});
          if(settled.action==="replaced"){setHintAndReload();return}
          if(settled.action==="adopt")setS(prev=>bindCloudAccount(prev,userId,{adopted:true}));
        }
      }
      await refreshSession();
      rememberCloudSession(true);
      // Depois de entrar ou criar conta, a app abre sempre no menu inicial
      // (pedido do product owner, 2026-11-21).
      go("home");
    }catch(error){
      if(mode==="signup"&&error?.code==="EMAIL_IN_USE"){
        // Decisão do product owner (2026-11-22): dizer claramente que já há conta.
        setMode("signin");setPassword("");setEmailInUse(true);
        // Logo a seguir, o cursor vai para a palavra-passe.
        setTimeout(()=>{try{document.querySelector('.realAuthForm input[type="password"]')?.focus()}catch{}},0);
        return;
      }
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

  // Eliminação definitiva: conta, progresso online e dados de estudo deste dispositivo.
  async function loadDeleteMethod(){
    if(deleteMethod)return;
    setDeleteMethod(await cloudDeletionMethod());
  }

  async function reauthenticateForDeletion(){
    const provider=deleteMethod?.provider||"google";
    setBusy(true);setMessage(null);
    try{
      rememberCloudSession(true);
      await cloudReauthenticateSocial(provider); // o browser sai para o fornecedor
    }catch(error){
      setMessage({ok:false,text:String(error?.message||error)});
      setBusy(false);
    }
  }

  async function deleteAccount(){
    if(busy)return;
    setBusy(true);setMessage(null);
    try{
      const result=await cloudDeleteAccount({password:deleteMethod?.method==="recent-login"?"":deletePassword,confirmation:deleteConfirmation});
      if(!result.ok){
        if(result.code==="RECENT_LOGIN_REQUIRED")setDeleteMethod(prev=>prev?{...prev,recentLogin:false}:prev);
        const text={
          RECENT_LOGIN_REQUIRED:"Por segurança, volta a entrar com "+(deleteMethod?.provider==="microsoft"?"a Microsoft":"o Google")+" e elimina a conta logo a seguir. Nada foi apagado.",
          INVALID_PASSWORD:"A palavra-passe não está certa. Nada foi apagado.",
          CONFIRMATION_REQUIRED:"Escreve ELIMINAR para confirmar. Nada foi apagado.",
          PASSWORD_REQUIRED:"Indica a tua palavra-passe. Nada foi apagado.",
          TOO_MANY_ATTEMPTS:"Demasiadas tentativas. Espera alguns minutos e tenta novamente. Nada foi apagado.",
          NETWORK_ERROR:"Sem ligação. Nada foi apagado. Tenta novamente quando tiveres internet."
        }[result.code]||"Não foi possível eliminar a conta agora. Nada foi apagado. Tenta novamente mais tarde.";
        setMessage({ok:false,text});
        return;
      }
      const owner=activeStateAccount()||(session.user?String(session.user.id):null);
      eraseAcademicDataFromDevice(owner);
      try{localStorage.removeItem(CLOUD_ACCOUNT_HINT_KEY)}catch{}
      try{sessionStorage.removeItem("a25-onboarding-entry")}catch{}
      rememberCloudSession(false);
      window.location.replace("/eliminar-conta?concluido=1");
    }finally{setBusy(false);setDeletePassword("")}
  }

  // Terminar sessão: a conta é a fonte de verdade. Com o progresso confirmado na
  // conta, este dispositivo fica limpo (sem caixa de "computador partilhado").
  // Só se pergunta quando há trabalho a meio ou quando não foi possível guardar.
  async function signout(confirmed=null){
    setBusy(true);setMessage(null);
    try{
      const flushed=await flushCloudNow();
      const plan=logoutPlan({flushStatus:flushed?.status,work:detectUnsavedWork(s),confirmed});
      if(["offline","long","short"].includes(plan.kind)){setLogoutPrompt(plan);return}
      setLogoutPrompt(null);
      await cloudSignOut();
      const owner=activeStateAccount()||(session.user?String(session.user.id):null);
      // Depois de sair, a app volta ao primeiro ecrã (com "Já tens conta? Entrar"),
      // e não ao onboarding: o próximo aluno tem de poder entrar na sua conta.
      try{sessionStorage.removeItem("a25-onboarding-entry")}catch{}
      if(plan.kind==="purge"&&owner){
        purgeAccountFromDevice(owner);
        // O dispositivo fica limpo: já não existe progresso anónimo posto à parte.
        discardAnonymousArchive();
        try{localStorage.removeItem(CLOUD_ACCOUNT_HINT_KEY)}catch{}
        window.location.reload();
        return;
      }
      // Sem confirmação da conta: os dados ficam neste dispositivo, arquivados por
      // conta (não visíveis ao próximo aluno), para nada se perder.
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

  // Conta obrigatória: «Começar de novo» apaga o estudo feito sem conta neste
  // dispositivo (decisão do product owner, 2026-11-22), depois de confirmação.
  function startOver(){
    const result=discardUnsavedDeviceProgress();
    if(!result.ok){setMessage({ok:false,text:"Não foi possível limpar este dispositivo. Nada foi apagado."});return}
    try{sessionStorage.setItem("a25-onboarding-entry","1")}catch{}
    window.location.reload();
  }

  function registerConflict(remote){
    setConflictRemote(remote||null);
    setS(prev=>cloudConflict(prev,{
      remoteRevision:remote?.revision,
      remoteDeviceId:remote?.last_device_id,
      remoteUpdatedAt:remote?.updated_at,
      remoteState:remote?.state_json
    }));
    // O cartão de conflito já explica a situação; sem mensagem repetida em baixo.
  }

  async function saveCloud(){
    setBusy(true);setMessage(null);setConflictRemote(null);
    const currentSync=cloudSyncMeta(s);
    try{
      const result=await saveStudentCloudState(s,{
        expectedOwner:session.user?.id||null,
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
      const row=await loadStudentCloudState({expectedOwner:session.user?.id||null});
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
        expectedOwner:session.user?.id||null,
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

  // profileFrom: perfil escolar que fica depois de juntar ("local" ou "remote").
  async function resolveMerge(profileFrom="local"){
    if(hasPendingAssessment(s)){setMessage({ok:false,text:"Há uma avaliação em curso. Continua e conclui a tentativa antes de carregar progresso online."});return}
    if(!conflictRemote?.state_json)return;
    setBusy(true);setMessage(null);
    try{
      saveLocalSnapshot(s,{label:"Conflito · antes de combinar"});
      let combined=safeCloudMerge(s,conflictRemote.state_json);
      if(profileFrom==="remote"&&conflictRemote.state_json.profile){
        combined={...combined,profile:conflictRemote.state_json.profile,goal:conflictRemote.state_json.goal??combined.goal};
      }
      let next=normalizeAfterCloud(combined);
      next=markCloudLoaded(next,{
        revision:conflictRemote.revision,
        remoteDeviceId:conflictRemote.last_device_id,
        remoteState:conflictRemote.state_json
      });

      const result=await overwriteStudentCloudState(next,{
        expectedOwner:session.user?.id||null,
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
        expectedOwner:session.user?.id||null,
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
    loadStudentCloudState({expectedOwner:sessionUserId}).then(row=>{if(live&&row)registerConflict(row)}).catch(()=>{});
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

  return <Shell>{gate?<Back go={go} to="welcome"/>:<Back go={go}/>}<p className="eyebrow">CONTA <BrandName/></p>
    <h1>{gate?"Guarda o teu plano.":user?"A tua conta":"Entra na tua conta"}</h1>
    {!user&&<p className="muted">{gate?"Cria conta para continuares no telemóvel ou no computador.":"O teu progresso fica guardado em todos os teus dispositivos."}</p>}

    {!cfg.configured&&<div className="cloudUnavailable">
      <b>○ Progresso online temporariamente indisponível</b>
      <span>Podes continuar a estudar normalmente. O progresso fica guardado neste dispositivo e poderás voltar a guardá-lo online quando o serviço estiver disponível.</span>
    </div>}

    {cfg.configured&&session.loading&&<div className="cloudLoading">A verificar sessão…</div>}

    {cfg.configured&&!session.loading&&!user&&<>
      <div className="authTabs"><button className={mode==="signin"?"sel":""} onClick={()=>setMode("signin")}>Entrar</button><button className={mode==="signup"?"sel":""} onClick={()=>{setMode("signup");setEmailInUse(false)}}>Criar conta</button></div>
      {emailInUse&&mode==="signin"&&<div className="emailInUseNotice" role="status"><b>Este email já tem conta.</b><span>Entra com a tua palavra-passe: o teu progresso está na conta. Depois podes mudar o ano, as disciplinas, a matéria dada e o objetivo no menu (•••).</span></div>}
      {mode==="reset"?<div className="realAuthForm">
        <b className="resetTitle">Recuperar a palavra-passe</b>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nome@email.pt" disabled={resetStep==="code"}/></label>
        {resetStep==="request"
          ?<button disabled={busy||!email.trim()} onClick={requestReset}>{busy?"A enviar…":"Enviar código por email"}</button>
          :<>
            <label>Código de 6 dígitos<input inputMode="numeric" autoComplete="one-time-code" value={resetCode} onChange={e=>setResetCode(e.target.value.replace(/\D/g,"").slice(0,6))} placeholder="123456"/></label>
            <label>Nova palavra-passe<input type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Pelo menos 8 caracteres"/></label>
            <button disabled={busy||resetCode.length!==6||password.length<8} onClick={confirmReset}>{busy?"A processar…":"Mudar palavra-passe"}</button>
            <button type="button" className="linkButton" disabled={busy} onClick={requestReset}>Enviar novo código</button>
          </>}
        <button type="button" className="linkButton" onClick={()=>{setMode("signin");setResetStep("request");setResetCode("");setMessage(null)}}>Voltar a «Entrar»</button>
      </div>
      :<>{socialProviders.length>0&&<div className="socialAuth">
        {mode==="signup"&&<label className="socialConsent"><input type="checkbox" checked={socialConsent} onChange={e=>setSocialConsent(e.target.checked)}/><span>Tenho 13 anos ou mais e aceito os <a href="/termos" target="_blank" rel="noopener">termos</a> e a <a href="/privacidade" target="_blank" rel="noopener">política de privacidade</a>.</span></label>}
        {socialProviders.map(provider=><button key={provider.id} type="button" className={`socialButton ${provider.id}`} disabled={busy||(mode==="signup"&&!socialConsent)} onClick={()=>continueWithProvider(provider.id)}>
          <span aria-hidden="true" className="socialIcon">{provider.id==="google"?"G":"⊞"}</span>{provider.label}
        </button>)}
        {mode!=="signup"&&<small className="socialClickConsent">Se ainda não tens conta, ao continuar confirmas que tens 13 anos ou mais e aceitas os <a href="/termos" target="_blank" rel="noopener">termos</a> e a <a href="/privacidade" target="_blank" rel="noopener">política de privacidade</a>.</small>}
        <div className="socialDivider" aria-hidden="true"><span>ou com email</span></div>
      </div>}
      <div className="realAuthForm">
        {mode==="signup"&&<label>Nome<input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome"/></label>}
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="nome@email.pt"/></label>
        <label>Palavra-passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
        {mode==="signup"&&<>
          <label className="rankConsent"><input type="checkbox" checked={signupAge} onChange={e=>setSignupAge(e.target.checked)}/><span>Tenho 13 anos ou mais.</span></label>
          <label className="rankConsent"><input type="checkbox" checked={signupTerms} onChange={e=>setSignupTerms(e.target.checked)}/><span>Li e aceito os <a href="/termos" target="_blank" rel="noopener">termos</a> e a <a href="/privacidade" target="_blank" rel="noopener">política de privacidade</a>.</span></label>
        </>}
        <button disabled={busy||!email.trim()||password.length<8||(mode==="signup"&&!(signupAge&&signupTerms))} onClick={submit}>{busy?"A processar…":mode==="signup"?"Criar conta":"Entrar"}</button>
        {mode==="signin"&&<button type="button" className="linkButton" onClick={()=>{setMode("reset");setResetStep("request");setMessage(null)}}>Esqueci-me da palavra-passe</button>}
      </div></>}
      <small className="cloudPrivacy">A palavra-passe é tratada pelo serviço de autenticação. A APProva+ não a guarda nos dados de progresso.</small>
      {gate&&<div className="gateNewStudent">{confirmStartOver
        ?<><span>O diagnóstico feito neste dispositivo ainda não está guardado numa conta. Se começares de novo, perde-se.</span><div className="gateNewStudentActions"><button type="button" className="gateStartOverConfirm" disabled={busy} onClick={startOver}>Sim, começar de novo</button><button type="button" className="linkButton" onClick={()=>setConfirmStartOver(false)}>Cancelar</button></div></>
        :<><span>Não és tu, ou queres recomeçar?</span><button type="button" className="linkButton" disabled={busy} onClick={()=>setConfirmStartOver(true)}>Começar de novo</button></>}</div>}
    </>}

    {cfg.configured&&!session.loading&&user&&<>
      <div className="signedAccount">
        <div><b>{user.name||"Aluno"}</b><small>{user.email}</small></div><strong>● sincronizado</strong>
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

      <div className="cloudProgressCard cloudSummaryRow" role="group" aria-label="Resumo do progresso">
        <div><b>{s.xp}</b><span>XP</span></div>
        <div><b>{localIndex??"—"}<small>/100</small></b><span>Preparação</span></div>
        <div><b>{measuredThemes(s).length}<small>/{academicScopeThemes(s.profile).length}</small></b><span>Áreas com evidência</span></div>
      </div>

      <details className="cloudTechnicalDetails">
        <summary>Detalhes e cópias de segurança</summary>
        <p className="muted">O progresso é guardado automaticamente e aparece nos teus outros dispositivos. Se houver versões diferentes, pedimos-te para escolher antes de substituir alguma coisa. Cada conta só acede ao seu próprio progresso.</p>
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

      {conflictRemote&&(profilesDiffer(s,conflictRemote.state_json)
        ?<div className="cloudConflictCard">
          <div className="cloudConflictHead"><span aria-hidden="true">⚠</span><div><b>Qual é o teu perfil escolar?</b>
            <small>Este dispositivo e a tua conta têm anos ou matéria dada diferentes. O estudo dos dois é juntado sempre; só tens de escolher o perfil certo, porque é ele que define o que a APProva+ mede.</small></div></div>
          <div className="conflictProfileChoices">
            <button onClick={()=>resolveMerge("local")} disabled={busy}><span>Neste dispositivo</span><b>{profileSummary(s)}</b></button>
            <button onClick={()=>resolveMerge("remote")} disabled={busy}><span>Na conta</span><b>{profileSummary(conflictRemote.state_json)}</b></button>
          </div>
          <small className="conflictHint">Antes de qualquer alteração, a APProva+ cria uma cópia de segurança neste dispositivo.</small>
        </div>
        :<div className="cloudConflictCard">
          <div className="cloudConflictHead"><span aria-hidden="true">⚠</span><div><b>O progresso deste dispositivo e o da tua conta são diferentes</b>
            <small>Nada foi substituído. Antes de qualquer alteração, a APProva+ cria uma cópia de segurança neste dispositivo.</small></div></div>
          <div className="conflictCompare">
            <div><span>Neste dispositivo</span><b>{versionSummary(s)}</b></div>
            <div><span>Na conta</span><b>{versionSummary(conflictRemote.state_json)}</b></div>
          </div>
          <button className="conflictPrimary" onClick={()=>resolveMerge()} disabled={busy}>Juntar os dois (recomendado)</button>
          <small className="conflictHint">Junta o estudo feito nos dois lados. Nada se perde.</small>
          <div className="conflictChoices">
            <button onClick={resolveKeepRemote} disabled={busy}>Usar só o da conta</button>
            <button onClick={resolveKeepLocal} disabled={busy}>Usar só o deste dispositivo</button>
          </div>
        </div>)}


      {logoutPrompt?(()=>{const copy=logoutPromptCopy(logoutPrompt);return <div className={`logoutPrompt ${copy.tone}`} role="alertdialog" aria-live="assertive" aria-label="Terminar sessão">
        <p>{copy.text}</p>
        <button className="primary" onClick={()=>setLogoutPrompt(null)} disabled={busy} autoFocus>{copy.stay}</button>
        <button className="secondary" onClick={()=>signout(logoutPrompt.kind)} disabled={busy}>{copy.leave}</button>
      </div>})()
      :<button className="secondary accountOptionButton" onClick={()=>signout()} disabled={busy}>Terminar sessão</button>}

      <details className="deleteAccount" onToggle={event=>{if(event.currentTarget.open)loadDeleteMethod()}}>
        <summary>Eliminar conta</summary>
        <p>Apaga a conta, o progresso guardado online e os dados de estudo deste dispositivo. É imediato e <b>não pode ser desfeito</b>.</p>
        {(()=>{
          const social=deleteMethod?.method==="recent-login";
          const providerName=deleteMethod?.provider==="microsoft"?"a Microsoft":"o Google";
          if(social&&!deleteMethod.recentLogin)return <div className="deleteAccountForm">
            <p>Entraste com {providerName}, por isso esta conta não tem palavra-passe. Para confirmar que és tu, volta a entrar com {providerName}. Depois, abre outra vez <b>Conta → Eliminar conta</b>: tens {deleteMethod.recentLoginMinutes||10} minutos para concluir.</p>
            <button type="button" className="secondary" disabled={busy} onClick={reauthenticateForDeletion}>Voltar a entrar com {deleteMethod?.provider==="microsoft"?"Microsoft":"Google"}</button>
          </div>;
          return <form className="deleteAccountForm" onSubmit={event=>{event.preventDefault();deleteAccount()}}>
            {!social&&<label>Palavra-passe<input type="password" autoComplete="current-password" value={deletePassword} onChange={e=>setDeletePassword(e.target.value)}/></label>}
            <label>Escreve ELIMINAR para confirmar<input autoComplete="off" autoCapitalize="characters" value={deleteConfirmation} onChange={e=>setDeleteConfirmation(e.target.value)}/></label>
            <button type="submit" className="dangerButton" disabled={busy||!deleteMethod||(!social&&!deletePassword)||deleteConfirmation.trim().toUpperCase()!=="ELIMINAR"}>Eliminar conta definitivamente</button>
          </form>;
        })()}
        <small><a href="/eliminar-conta">O que é apagado e o que fica</a></small>
      </details>
    </>}

    {message&&<div className={"cloudMessage "+(message.ok?"ok":"bad")}><b>{message.ok?"✓":"!"}</b><span>{message.text}</span></div>}

  </Shell>
}

