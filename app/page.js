"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {
  TAXONOMY,PREREQUISITES,QUESTION_BANK,DIAGNOSTIC_BLUEPRINT,microcompetencyId
} from "./data/content";
import {
  emptyScores,theme,byYear,getQuestions,diagnosticAnchor,
  certaintyLabel,certaintyHelp,applyEvidence,measuredThemes,prepIndex,
  priorityScore,selectMissionTheme,selectMissionQuestion,selectPrereqQuestion,
  shouldEndMission,missionStopDecision,trainingQuestions,startingDifficulty,
  missionContentExhaustedDecision,canStartMissionDetour,
  dailyMissionPlan,missionCandidateQueue,markTrainingSignalConfirmed,selectQuestionForPlan,
  buildMiniExam,applyMiniExam,miniExamScore20,hasTrainingContent,hasGenerator,
  eligibleQuestions,eligibleCount,rankedStudyPriorities,likelyUnlocks,
  focusScore,focusRows,competenceMap,
  selectCausalProbe,causalVerdict,recordLearningHypothesis,activeLearningHypotheses,
  allLearningHypotheses,refreshLearningHypotheses,
  recalibrateAllScores,migratePedagogicalIds
} from "./lib/engine";
import {
  allFocusRows,qualitySnapshot,
  editorialQueue,editorialStats,makeReviewBatch,
  applyEditorialDecision,bumpEditorialVersion,urgentReviewItems,
  eligibilitySummary,betaContentReadiness,prioritizedReviewQueue,reviewPackRows,
  minimumReviewRoadmap,reviewRoadmapProgress
} from "./lib/quality";
import {
  buildTeacherReviewPack,buildTeacherReviewBatches,teacherReviewOperationsSummary,
  serializeSemicolonCsv,parseSemicolonCsv,
  validateTeacherReviewImport,applyTeacherReviewImport,teacherReviewInstructions
} from "./lib/teacherReview";
import {
  revisionCandidateFromItem,validateRevisionCandidate,applyContentRevision,
  revertLastContentRevision,editorialRevisionSummary
} from "./lib/editorialRevisions";
import {qaForItemId} from "./lib/preReviewQa";
import {
  hybridValidationPlan,hybridValidationSummary,hybridBetaReadiness,hybridLaneForItem
} from "./lib/hybridValidation";
import {buildHybridTeacherBatches} from "./lib/hybridTeacherReview";
import {betaEvent,sessionStart,sessionFinish,betaSummary,exportBetaPayload} from "./lib/beta";
import {
  migrateProductAnalytics,recordAppOpen,recordMilestone,recordProductEvent,
  retentionSummary,funnelSummary,activationSummary
} from "./lib/productAnalytics";
import {engineAuditSummary,engineAuditLabel} from "./lib/engineAudit";
import {
  loadLocalStateStatus,saveLocalState,clearLocalState,FRIENDS_STORAGE_KEY,
  backendHealth,syncStateToBackend
} from "./lib/persistence";
import {
  saveSessionDraft,loadSessionDraft,loadSessionDraftStatus,clearSessionDraft,draftScreen
} from "./lib/sessionDraft";
import {
  createDiagnosticDraft,recoverDiagnosticTransaction,recoverLegacyDiagnosticSessions,
  transactDiagnosticAnswer
} from "./lib/diagnosticRecovery";
import {
  claimSessionCompletion,clearCompletionRegistry,latestOpenSessionId,dataIntegrityAudit
} from "./lib/reliability";
import {
  ROLES,normalizeIdentity,can,defaultScreenForRole,createParentInvite,
  activeParentLink,requestLinkRemoval,confirmLinkRemoval,demoIdentity
} from "./lib/identity";
import {
  cloudConfiguration,getCloudSession,cloudSignIn,cloudSignUp,cloudSignOut,
  loadStudentCloudState,saveStudentCloudState,overwriteStudentCloudState,mergeStudentCloudState
} from "./lib/cloud";
import {
  getOrCreateDeviceId,shortDeviceId,cloudSyncMeta,migrateCloudSync,
  markCloudLoaded,markCloudSaved,cloudConflict,saveLocalSnapshot,
  listLocalSnapshots,queueCloudSave,listPendingCloudSaves,removePendingCloudSave,
  safeCloudMerge
} from "./lib/cloudReliability";
import {
  TESTER_SEGMENTS,friendsBetaRequested,activateFriendsBeta,markFriendsBetaConsent,
  isFriendsBeta,friendsBetaReport,testerSegmentInfo,currentTesterSegment,
  isTargetStudentTester,friendsFeedbackSummary,aggregateFriendsBetaReports
} from "./lib/friendsBeta";
import {
  emptyEngagement,recordStudyActivity,engagementSummary,migrateEngagement,
  missionCompletedToday,todayMissionRecord
} from "./lib/engagement";
import {
  emptyDailyMission,ensureDailyMissionAssignment,missionPlanForToday,
  markDailyMissionPromptShown,dismissDailyMissionPrompt,markDailyMissionStarted,
  dailyMissionPromptDecision,migrateDailyMission
} from "./lib/dailyMission";
import {
  emptyCompetition,recordCompetitiveActivity,competitionSummary,latestCompetitiveActivity,demoLeaderboard,
  leaderboardAroundUser,leagueProjection,updateCompetitionProfile,scopeAvailability,
  PORTUGAL_REGIONS,DIVISIONS,PROMOTION_COUNT,DEMOTION_COUNT,
  SCHOOL_MIN_PARTICIPANTS,DISTRICT_MIN_PARTICIPANTS,migrateCompetition
} from "./lib/competition";

const initial={
  goal:17,
  xp:0,
  streak:0,
  engagement:emptyEngagement(),
  engagementModelVersion:1,
  competition:emptyCompetition(),
  competitionModelVersion:1,
  dailyMission:emptyDailyMission(),
  dailyMissionModelVersion:1,
  scores:emptyScores(),
  diagnosticDone:false,
  diagnosticAnswers:0,
  lastMission:null,
  missionHistory:[],
  freeTrainingSignals:[],
  examHistory:[],
  lastExam:null,
  contentReports:[],
  editorialOverrides:{},
  reviewBatches:[],
  reviewImports:[],
  betaParticipant:{code:null,cohort:"Piloto Matemática A"},
  betaEvents:[],
  betaSessions:[],
  betaFeedback:[],
  productAnalytics:{version:1,firstSeenAt:null,firstSeenDay:null,lastSeenAt:null,activeDays:[],appOpenCount:0,milestones:{},events:[]},
  productAnalyticsVersion:1,
  betaMode:"internal",
  betaTesterMeta:null,
  syncMeta:{lastAttemptAt:null,lastSuccessAt:null,lastStatus:"local_only"},
  identity:demoIdentity("student"),
  cloudMeta:{lastLoadedAt:null,lastSavedAt:null,lastRemoteUpdatedAt:null},
  cloudSync:{version:1,deviceId:null,baseRevision:0,baseFingerprint:null,lastRemoteRevision:null,lastRemoteDeviceId:null,lastSyncedAt:null,lastConflictAt:null,lastConflict:null,pendingCount:0},
  cloudSyncModelVersion:1,
  learningHypotheses:[],
  pedagogicalIdVersion:1,
  pedagogicalMemoryVersion:2,
  parentInvites:[],
  profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear"}
};

export default function App(){
  const [s,setS]=useState(initial);
  const [screen,setScreen]=useState("welcome");
  const [trainingCfg,setTrainingCfg]=useState(null);
  const [examSession,setExamSession]=useState(null);
  const [recoveredSession,setRecoveredSession]=useState(null);
  const [hydrated,setHydrated]=useState(false);

  useEffect(()=>{
    const requested=typeof window!=="undefined"&&friendsBetaRequested(window.location.search);
    const storageKey=requested?FRIENDS_STORAGE_KEY:undefined;
    const loaded=loadLocalStateStatus(initial,emptyScores,storageKey);
    if(loaded.error){setScreen("storageRecoveryError");return}
    const x=loaded.state;
    const base=x
      ?migrateProductAnalytics(migrateCloudSync(migrateDailyMission(migrateCompetition(migrateEngagement(migratePedagogicalIds({...x,scores:recalibrateAllScores(x.scores)}))))))
      :migrateProductAnalytics(migrateCloudSync(initial));
    const betaState=requested?activateFriendsBeta(base):base;
    const next=recordAppOpen(betaState,{source:"initial_load"});
    const draftStatus=loadSessionDraftStatus(next.betaMode||"internal");
    if(draftStatus.error){setScreen("storageRecoveryError");return}
    const draft=draftStatus.draft;
    let recoveredState=next;
    let validDraft=draft;
    let recoveryError=null;
    let recoveredCompletion=false;
    let recoveredLegacy=false;
    const openDiagnostic=(next.betaSessions||[]).some(x=>x.kind==="diagnostic"&&!x.finishedAt);
    const legacyDiagnostic=openDiagnostic&&(!draft||(draft.kind==="diagnostic"&&draft.version!==2));
    if(!next.diagnosticDone&&legacyDiagnostic){
      const recovery=recoverLegacyDiagnosticSessions({state:next,saveState:saveLocalState});
      if(recovery.ok){
        recoveredState=recovery.state;recoveredLegacy=recovery.migrated;validDraft=null;
        if(draft&&!clearSessionDraft(next.betaMode||"internal"))recoveryError="legacy_draft_clear_failed";
      }else recoveryError=recovery.reason;
    }else if(draft?.kind==="diagnostic"){
      const recovery=recoverDiagnosticTransaction({
        state:next,draft,saveState:saveLocalState,saveDraft:saveSessionDraft,
        clearDraft:()=>clearSessionDraft(next.betaMode||"internal"),
        startState:ensureDiagnosticStarted,completeState:finalizeDiagnosticState
      });
      if(recovery.ok){recoveredState=recovery.state;validDraft=recovery.draft;recoveredCompletion=!!recovery.completed&&!next.diagnosticDone}
      else if(String(recovery.reason).includes("write_failed")||String(recovery.reason).includes("advance_failed")){
        recoveredState=recovery.state;validDraft=recovery.draft;
      }else{
        validDraft=null;
        const hasDurableWork=(draft.responses?.length||0)>0||!!draft.pendingResponse||draft.phase==="completion_pending";
        if(!hasDurableWork)clearSessionDraft(next.betaMode||"internal");
        else recoveryError=recovery.reason;
        console.warn(`Draft de diagnóstico ignorado: ${recovery.reason}`);
      }
    }

    setS(recoveredState);

    if(draft?.kind==="training" && draft.cfg)setTrainingCfg(draft.cfg);
    if(draft?.kind==="mini_exam" && draft.session)setExamSession(draft.session);

    const recovered=draftScreen(validDraft);
    const canRecover=recovered&&(validDraft?.kind==="diagnostic"?!recoveredState.diagnosticDone:recoveredState.diagnosticDone);
    if(recoveryError){
      setScreen("diagRecoveryError");
    }else if(recoveredCompletion){
      setScreen("diagResult");
    }else if(recoveredLegacy){
      setScreen("diag");
    }else if(canRecover){
      setRecoveredSession(validDraft);
      setScreen(recovered);
    }else{
      setScreen(recoveredState.diagnosticDone?"home":"welcome");
    }
    setHydrated(true);
  },[]);

  useEffect(()=>{
    if(hydrated)saveLocalState(s);
  },[s,hydrated]);

  useEffect(()=>{
    if(!hydrated||typeof document==="undefined")return;
    const register=()=>{
      if(document.visibilityState==="visible"){
        setS(prev=>recordAppOpen(prev,{source:"visibility"}));
      }
    };
    document.addEventListener("visibilitychange",register);
    return ()=>document.removeEventListener("visibilitychange",register);
  },[hydrated]);

  useEffect(()=>{
    if(examSession && ["miniExamIntro","miniExamRun","miniExamReview"].includes(screen)){
      saveSessionDraft({kind:"mini_exam",betaMode:s.betaMode||"internal",screen,session:examSession});
    }
  },[examSession,screen,s.betaMode]);

  const go=x=>setScreen(x);

  if(screen==="welcome")return <Welcome s={s} setS={setS} go={go}/>;
  if(screen==="onboard")return <StudentProfile s={s} setS={setS} go={go}/>;
  if(screen==="goalOnboard")return <GoalScreen s={s} setS={setS} go={go} onboarding/>;
  if(screen==="goalSettings")return <GoalScreen s={s} setS={setS} go={go}/>;
  if(screen==="diag")return <DiagIntro s={s} setS={setS} go={go}/>;
  if(screen==="diagRecoveryError")return <Shell><Logo/><div className="notice warning"><b>Não foi possível recuperar esta sessão</b><span>O estado académico não foi alterado. O progresso guardado foi conservado para uma nova tentativa.</span></div></Shell>;
  if(screen==="storageRecoveryError")return <Shell><Logo/><div className="notice warning"><b>Não foi possível ler o progresso guardado</b><span>Nenhum dado foi substituído. Reabre a app para tentar novamente.</span></div></Shell>;
  if(screen==="diagRun")return <DiagRun s={s} setS={setS} go={go} recoveredDraft={recoveredSession?.kind==="diagnostic"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="diagResult")return <DiagResult s={s} setS={setS} go={go}/>;
  if(screen==="mission")return <Mission s={s} setS={setS} go={go} recoveredDraft={recoveredSession?.kind==="mission"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="missionResult")return <MissionResult s={s} setS={setS} go={go}/>;
  if(screen==="train")return <Train s={s} setS={setS} go={go} start={cfg=>{setTrainingCfg(cfg);go("trainingRun")}}/>;
  if(screen==="trainingRun")return <TrainingRun s={s} setS={setS} go={go} cfg={trainingCfg} recoveredDraft={recoveredSession?.kind==="training"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="progress")return <Progress s={s} go={go}/>;
  if(screen==="ranking")return <Ranking s={s} setS={setS} go={go}/>;
  if(screen==="exams")return <Exams s={s} go={go} startMini={()=>{
    clearSessionDraft(s.betaMode||"internal");
    setRecoveredSession(null);
    const questions=buildMiniExam(s,8);
    const ses=sessionStart("mini_exam",{questionCount:questions.length});
    setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("mini_exam_started",{sessionId:ses.id,questionCount:questions.length})]}));
    setExamSession({sessionId:ses.id,questions,answers:Array(questions.length).fill(null),current:0,startedAt:Date.now()});
    go("miniExamIntro");
  }}/>;
  if(screen==="miniExamIntro")return <MiniExamIntro session={examSession} go={go}/>;
  if(screen==="miniExamRun")return <MiniExamRun session={examSession} setSession={setExamSession} go={go}/>;
  if(screen==="miniExamReview")return <MiniExamReview session={examSession} setSession={setExamSession} s={s} setS={setS} go={go}/>;
  if(screen==="miniExamResult")return <MiniExamResult s={s} setS={setS} go={go}/>;
  if(screen==="qa")return <QualityPanel s={s} setS={setS} go={go}/>;
  if(screen==="review")return <ReviewerDashboard s={s} setS={setS} go={go}/>;
  if(screen==="beta")return <BetaDashboard s={s} setS={setS} go={go}/>;
  if(screen==="identity")return <IdentityLab s={s} setS={setS} go={go}/>;
  if(screen==="account")return <AccountCloud s={s} setS={setS} go={go}/>;
  if(screen==="parent")return <Parent s={s} setS={setS} go={go}/>;

  return <Home s={s} setS={setS} go={go} reset={()=>{
    clearLocalState(s.betaMode==="friends_beta"?FRIENDS_STORAGE_KEY:undefined);
    clearSessionDraft(s.betaMode||"internal");
    clearCompletionRegistry();
    setRecoveredSession(null);
    setS(isFriendsBeta(s)?activateFriendsBeta(initial):initial);go("welcome");
  }}/>;
}

const Logo=()=> <div className="logo">A<span>+</span> EXAMES</div>;
const Back=({go,to="home"})=> <button className="back" onClick={()=>go(to)}>← Voltar</button>;
function FriendsBetaRibbon(){
  const active=typeof window!=="undefined"&&friendsBetaRequested(window.location.search);
  if(!active)return null;
  return <div className="friendsBetaRibbon"><b>🧪 TESTE PRIVADO</b><span>Conteúdo ainda em revisão · resultados provisórios</span></div>;
}

function FriendsBetaDisclaimer({s,compact=false}){
  if(!isFriendsBeta(s))return null;
  return <div className={"friendsBetaDisclaimer "+(compact?"compact":"")}>
    <b>Teste de experiência — não é uma avaliação real do teu nível.</b>
    <span>Estamos a testar a app com conteúdo ainda em revisão pedagógica. Índice, Domínio, Certeza e notas servem para avaliar o funcionamento da experiência e podem mudar.</span>
  </div>;
}

function FriendsBetaPanel({s}){
  if(!isFriendsBeta(s))return null;
  const sum=betaSummary(s);
  const segment=testerSegmentInfo(currentTesterSegment(s));
  const fx=friendsFeedbackSummary(s);

  function downloadReport(){
    const payload=friendsBetaReport(s);
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`teste-amigos-${s.betaParticipant?.code||"participante"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return <div className="friendsBetaPanel">
    <div className="friendsBetaPanelHead"><div><small>BETA PRIVADA · EXPERIÊNCIA</small><b>Código {s.betaParticipant?.code||"—"}</b></div><span>{sum.sessions} sessões</span></div>
    <div className="testerSegmentTag"><b>{segment.short}</b><span>{segment.group==="target"?"Público-alvo":segment.group==="near_target"?"Próximo do público-alvo":segment.group==="buyer"?"Perspetiva de compra":"Observador"}</span></div>
    <p>Testa como aluno normal e diz-nos onde ficaste confuso, aborrecido ou surpreendido. Os resultados académicos desta versão são provisórios.</p>
    <div className="friendsBetaPanelMeta"><span>{sum.feedbackCount} feedbacks</span><span>{sum.reports} perguntas reportadas</span><span>{sum.completionRate}% conclusão</span></div>
    {(fx.personalization!==null||fx.returnIntent!==null)&&<div className="friendExperienceNumbers">
      <div><span>Personalização</span><b>{fx.personalization??"—"}/5</b></div>
      <div><span>{isTargetStudentTester(s)?"Vontade de voltar amanhã":"Potencial de regresso"}</span><b>{fx.returnIntent??"—"}/5</b></div>
    </div>}
    <button onClick={downloadReport}>Exportar relatório do teste</button>
    <small>No fim, envia este ficheiro a quem te deu o link. Não inclui nome nem email.</small>
  </div>;
}


function DailyEngagementCard({s}){
  const e=engagementSummary(s);
  const pct=Math.min(100,Math.round((e.xpToday/Math.max(1,e.dailyGoalXp))*100));
  return <section className={"dailyEngagement "+e.nudge.state}>
    <div className="dailyEngagementHead">
      <div><small>RITMO DIÁRIO</small><h3>{e.nudge.title}</h3><p>{e.nudge.detail}</p></div>
      <div className="streakOrb"><b>🔥 {e.streak}</b><span>{e.streak===1?"dia":"dias"}</span></div>
    </div>
    <div className="dailyGoalLine"><div><span>Objetivo diário</span><b>{e.dailyGoalComplete?"Concluído":`${e.xpToday}/${e.dailyGoalXp} XP`}</b></div>
      <div className="dailyGoalBar"><i style={{width:(e.dailyGoalComplete?100:pct)+"%"}}/></div>
      <small>Uma Missão, Mini-exame ou Diagnóstico completa o objetivo; em Treino Livre podes completá-lo com {e.dailyGoalXp} XP.</small>
    </div>
    <div className="weekRhythm">{e.last7.map(d=>{
      const label=new Date(`${d.key}T12:00:00`).toLocaleDateString("pt-PT",{weekday:"short"}).replace(".","");
      return <div key={d.key} className={d.goalComplete?"goal":d.active?"active":""}><span>{label}</span><b>{d.goalComplete?"✓":d.active?"•":"·"}</b></div>;
    })}</div>
    <div className="dailyStats"><span>Melhor sequência: <b>{e.longestStreak}</b></span><span>Dias ativos: <b>{e.activeDays}</b></span><span>Objetivos cumpridos: <b>{e.goalDays}</b></span></div>
  </section>;
}

function DailyCompletionNote({s}){
  const e=engagementSummary(s);
  if(!e.activeToday)return null;
  return <div className={"dailyCompletionNote "+(e.dailyGoalComplete?"done":"partial")}>
    <b>{e.dailyGoalComplete?"🔥 Objetivo diário concluído":`🔥 Sequência de ${e.streak} ${e.streak===1?"dia":"dias"} protegida`}</b>
    <span>{e.dailyGoalComplete
      ?"Hoje já fizeste o essencial. Podes continuar a treinar, mas não precisas de “farmar” exercícios para manter a sequência."
      :`Já conta como dia de estudo. Se quiseres completar também o objetivo diário, faltam ${e.xpRemaining} XP ou uma Missão.`}</span>
  </div>;
}


function CompetitionXpNote({s}){
  const row=latestCompetitiveActivity(s);
  if(!row)return null;
  return <div className="competitionXpNote">
    <div><small>🏆 XP COMPETITIVO · ESTA SEMANA</small><b>+{row.rankedXp} XP</b></div>
    <span>{row.reason}</span>
  </div>;
}

const Shell=({children})=> <main className="light"><FriendsBetaRibbon/><section className="panel">{children}</section></main>;

function Welcome({s,setS,go}){
  const requested=typeof window!=="undefined"&&friendsBetaRequested(window.location.search);
  const friends=requested||isFriendsBeta(s);
  const [segment,setSegment]=useState(currentTesterSegment(s));

  function start(){
    if(friends){
      if(!segment)return;
      setS(prev=>{
        const next=markFriendsBetaConsent(prev,{segment});
        const already=(next.betaEvents||[]).some(e=>e.type==="friends_beta_started");
        return already?next:{
          ...next,
          betaEvents:[...(next.betaEvents||[]),betaEvent("friends_beta_started",{
            participantCode:next.betaParticipant?.code||null,
            purpose:"ux_experience",
            testerSegment:segment,
            testerGroup:testerSegmentInfo(segment).group
          })]
        };
      });
    }
    setS(prev=>recordMilestone(prev,"onboarding_started",{
      testerSegment:friends?segment:null
    }));
    go("onboard");
  }

  return <main className="dark center"><section className="hero">
    <Logo/>
    {friends?<><p className="eyebrow">🧪 BETA PRIVADA · TESTE DE EXPERIÊNCIA</p>
      <div className="friendsWelcome"><b>Estás a ver uma versão ainda em construção.</b><span>Queremos perceber se a app é clara, útil e motivadora. O conteúdo ainda está a ser revisto por professor, por isso não uses os resultados como avaliação real do teu nível.</span></div>
      <div className="testerSegmentPicker"><b>Antes de começar: qual é a tua perspetiva neste teste?</b>
        <span>Não pedimos idade, nome nem email. Isto serve apenas para não misturarmos feedback de alunos com feedback de adultos.</span>
        <div>{Object.entries(TESTER_SEGMENTS).map(([key,item])=><button key={key} className={segment===key?"selected":""} onClick={()=>setSegment(key)}>
          <strong>{item.label}</strong><small>{item.description}</small>
        </button>)}</div>
      </div>
    </>:<p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>}
    <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
    <p>A A+ descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
    <button disabled={friends&&!segment} onClick={start}>{friends?(segment?"Entrar no teste →":"Escolhe primeiro o teu perfil"):"Descobrir o meu nível →"}</button>
    <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>{friends?"🧪 Feedback importante":"📈 Progresso real"}</span></div>
  </section></main>
}

function suggestedExamTimingForYear(year,current){
  if(year==="10.º")return "twoYears";
  if(year==="11.º")return "nextYear";
  if(year==="12.º")return "thisYear";
  if(year==="Já terminei o secundário")return "unsure";
  return current||"unsure";
}

function StudentProfile({s,setS,go}){
  const [p,setP]=useState(s.profile||initial.profile);
  function save(){
    setS(prev=>recordMilestone({...prev,profile:p},"profile_completed",{
      schoolYear:p.schoolYear||null,
      examTiming:p.examTiming||null
    }));
    go("goalOnboard");
  }
  return <Shell><Logo/><p className="eyebrow">ANTES DO DIAGNÓSTICO</p>
    <h1>Ajuda a A+ a começar no sítio certo.</h1>
    <p className="muted">Estas respostas só definem o <b>ponto de partida</b> do diagnóstico. Nunca são usadas como se fossem prova do teu nível.</p>

    <h3>Em que ano estás?</h3>
    <div className="chips">{["10.º","11.º","12.º","Já terminei o secundário"].map(x=><button key={x} className={p.schoolYear===x?"sel":""} onClick={()=>setP({...p,schoolYear:x,examTiming:suggestedExamTimingForYear(x,p.examTiming)})}>{x}</button>)}</div>

    <h3>{p.schoolYear==="Já terminei o secundário"?"Que nota tinhas aproximadamente a Matemática?":"Que nota tens tido aproximadamente a Matemática?"}</h3>
    <div className="gradeInput"><input inputMode="numeric" min="0" max="20" placeholder="Ex.: 14" value={p.recentGrade} onChange={e=>{
      const raw=e.target.value.replace(/[^0-9]/g,"");
      const n=raw===""?"":Math.max(0,Math.min(20,Number(raw)));
      setP({...p,recentGrade:n});
    }}/><span>/20</span></div>

    <h3>{p.schoolYear==="Já terminei o secundário"?"Quanto do programa sentes que tens consolidado?":"Quanto do programa já deste?"}</h3>
    <div className="stackChoices">
      {[
        ["little",p.schoolYear==="Já terminei o secundário"?"Pouco consolidado":"Ainda pouco"],
        ["most","Uma parte significativa"],
        ["all",p.schoolYear==="Já terminei o secundário"?"Praticamente todo consolidado":"Praticamente todo o programa"]
      ].map(([v,l])=><button key={v} className={p.syllabus===v?"sel":""} onClick={()=>setP({...p,syllabus:v})}>{l}</button>)}
    </div>

    <h3>Quando pretendes fazer o exame?</h3>
    <div className="stackChoices">
      {[["thisYear","Este ano letivo"],["nextYear","No próximo ano"],["twoYears","Daqui a 2 anos"],["unsure","Ainda não sei"]].map(([v,l])=><button key={v} className={p.examTiming===v?"sel":""} onClick={()=>setP({...p,examTiming:v})}>{l}</button>)}
    </div>

    <div className="notice"><b>Exemplo</b><span>Se tens tido 18 valores, a A+ não começa por perguntas demasiado elementares. Se a evidência contrariar essa indicação, adapta imediatamente.</span></div>
    <button className="primary" onClick={save}>Continuar</button>
  </Shell>
}

function GoalScreen({s,setS,go,onboarding=false}){
  const [goal,setGoal]=useState(s.goal);
  function save(){
    setS(prev=>{
      const next={...prev,goal};
      return onboarding
        ?recordMilestone(next,"goal_completed",{goal})
        :next;
    });
    go(onboarding?"diag":"home");
  }
  return <Shell><Logo/>
    <p className="eyebrow">{onboarding?"O TEU OBJETIVO":"AJUSTAR OBJETIVO"}</p>
    <h1>Que nota queres alcançar?</h1>
    <p className="muted">{onboarding
      ?"Isto ajusta a exigência das Missões. Não é uma previsão da tua nota."
      :"Podes alterar o objetivo quando quiseres. A A+ adapta as decisões seguintes sem apagar o teu histórico."}</p>
    <div className="goalHero"><strong>{goal}</strong><span>valores</span></div>
    <div className="sliderLabels"><span>10</span><span>15</span><span>20</span></div>
    <input aria-label="Nota objetivo" className="goalSlider" type="range" min="10" max="20" step="1" value={goal} onChange={e=>setGoal(Number(e.target.value))}/>
    <div className="goalMessage"><b>{goal>=18?"Objetivo muito exigente":goal>=16?"Objetivo ambicioso":"Objetivo sólido"}</b>
      <span>A dificuldade e profundidade do plano serão ajustadas progressivamente a este objetivo.</span></div>
    <button className="primary" onClick={save}>{onboarding?"Continuar":"Guardar novo objetivo"}</button>
    {!onboarding&&<button className="secondary" onClick={()=>go("home")}>Cancelar</button>}
  </Shell>
}

function ensureDiagnosticStarted(state,draft){
  const matching=(state.betaSessions||[]).filter(x=>x.id===draft.sessionId&&x.kind==="diagnostic");
  const otherOpen=(state.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt&&x.id!==draft.sessionId);
  if(otherOpen.length||matching.length>1||matching.some(x=>x.finishedAt))return {ok:false,reason:"ambiguous_session"};
  if(matching.length===1)return {ok:true,state};
  const eventExists=(state.betaEvents||[]).some(e=>e.type==="diagnostic_started"&&e.payload?.sessionId===draft.sessionId);
  const base={...state,betaSessions:[...(state.betaSessions||[]),draft.session],
    betaEvents:eventExists?(state.betaEvents||[]):[...(state.betaEvents||[]),betaEvent("diagnostic_started",{sessionId:draft.sessionId})]};
  return {ok:true,state:recordMilestone(base,"diagnostic_started",{sessionId:draft.sessionId})};
}

function finalizeDiagnosticState(nextState,draft){
  if(nextState.diagnosticDone&&(nextState.betaSessions||[]).some(x=>x.id===draft.sessionId&&x.kind==="diagnostic"&&x.finishedAt))return {ok:true,state:nextState};
  const matching=(nextState.betaSessions||[]).map((x,index)=>({x,index})).filter(({x})=>x.id===draft.sessionId&&x.kind==="diagnostic"&&!x.finishedAt);
  const otherOpen=(nextState.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt&&x.id!==draft.sessionId);
  if(matching.length!==1||otherOpen.length)return {ok:false,reason:"ambiguous_session"};
  const at=draft.completionAt||Date.now(),sessions=[...(nextState.betaSessions||[])],idx=matching[0].index;
  sessions[idx]={...sessions[idx],finishedAt:at,durationSeconds:Math.max(1,Math.round((at-sessions[idx].startedAt)/1000)),meta:{...(sessions[idx].meta||{}),answers:nextState.diagnosticAnswers}};
  const eventExists=(nextState.betaEvents||[]).some(e=>e.type==="diagnostic_finished"&&e.payload?.sessionId===draft.sessionId);
  let completed={...nextState,diagnosticDone:true,betaSessions:sessions,
    betaEvents:eventExists?(nextState.betaEvents||[]):[...(nextState.betaEvents||[]),betaEvent("diagnostic_finished",{answers:nextState.diagnosticAnswers,sessionId:draft.sessionId})]};
  completed=recordStudyActivity(completed,{kind:"diagnostic",xpEarned:0,sessionId:draft.sessionId,at});
  completed=recordCompetitiveActivity(completed,{kind:"diagnostic",sessionId:draft.sessionId,at});
  completed=refreshLearningHypotheses(completed,at);
  completed=recordMilestone(completed,"diagnostic_completed",{answers:nextState.diagnosticAnswers,sessionId:draft.sessionId},{at});
  return {ok:true,state:completed};
}

function DiagIntro({s,setS,go}){
  const [saveError,setSaveError]=useState(false);
  const available=eligibleCount(s,"diagnostic");
  const gated=(s.betaMode||"internal")!=="internal" && available===0;
  return <Shell><Logo/><p className="eyebrow">DIAGNÓSTICO INICIAL</p>
    <h1>Poucas perguntas. Muita informação.</h1>
    <p className="muted">A A+ mistura conteúdos de 10.º, 11.º e 12.º. Começa por perguntas-âncora e só faz uma pergunta extra quando precisa de localizar melhor uma dificuldade.</p>
    <div className="diagIntroGrid">
      <div><span>⏱</span><b>~10–20 min</b><small>Pode terminar mais cedo se a evidência for consistente.</small></div>
      <div><span>🎯</span><b>Direto ao ponto</b><small>Não existe uma pergunta obrigatória para cada tema.</small></div>
      <div><span>🧠</span><b>Continua depois</b><small>O perfil é afinado nas Missões dos primeiros dias.</small></div>
    </div>
    <div className="notice"><b>O objetivo do diagnóstico</b><span>Não é conhecer-te perfeitamente. É conhecer-te o suficiente para tomar a primeira boa decisão.</span></div>
    {saveError&&<div className="notice warning"><b>Não foi possível guardar o progresso</b><span>Tenta novamente antes de começar.</span></div>}
    {gated&&<div className="notice warning"><b>Diagnóstico bloqueado pelo gate editorial</b><span>Este modo só permite conteúdo revisto e ainda não existem perguntas elegíveis suficientes. Volta ao modo Interno ou valida conteúdo no painel de revisão.</span></div>}
    <button className="primary" disabled={gated} onClick={()=>{
      const existing=loadSessionDraft(s.betaMode||"internal");
      const open=(s.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt);
      if(existing?.kind==="diagnostic"){go("diagRun");return}
      if(open.length){setSaveError(true);return}
      const ses=sessionStart("diagnostic",{goal:s?.goal||null});
      const difficulty=startingDifficulty(s.profile,s.goal);
      const current=diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],difficulty,s);
      const draft=createDiagnosticDraft({session:ses,item:current,betaMode:s.betaMode||"internal",difficulty});
      if(!saveSessionDraft(draft)){setSaveError(true);return}
      const started=ensureDiagnosticStarted(s,draft);
      if(!started.ok||!saveLocalState(started.state)){setSaveError(true);return}
      setSaveError(false);
      setS(started.state);
      go("diagRun");
    }}>Começar diagnóstico</button>
  </Shell>
}


function DiagRun({s,setS,go,recoveredDraft=null,onRecovered=()=>{}}){
  const [draft,setDraft]=useState(()=>recoveredDraft||loadSessionDraft(s.betaMode||"internal"));
  const [saveError,setSaveError]=useState(false);
  const [ready,setReady]=useState(false);
  function retryRecovery(){
    const result=recoverDiagnosticTransaction({state:s,draft,saveState:saveLocalState,saveDraft:saveSessionDraft,
      clearDraft:()=>clearSessionDraft(s.betaMode||"internal"),startState:ensureDiagnosticStarted,completeState:finalizeDiagnosticState});
    if(!result.ok){setReady(false);setSaveError(true);setDraft(result.draft);return}
    setReady(true);setSaveError(false);setS(result.state);setDraft(result.draft);
    if(result.completed)go("diagResult");
  }
  useEffect(()=>{onRecovered();retryRecovery()},[]);
  const current=draft.current,sel=draft.sel,fb=draft.fb,difficulty=draft.difficulty;
  const anchorResults=draft.anchorResults,probeCount=draft.probeCount;

  const anchorsDone=anchorResults.length;
  const estimate=Math.min(94,Math.round(((anchorsDone+probeCount)/8)*100));

  function answer(n){
    if(!ready||fb||draft.pendingResponse)return;
    const selected={...draft,sel:n,fb:{correct:n===current.a}};
    if(!saveSessionDraft(selected)){setSaveError(true);return}
    setSaveError(false);setDraft(selected);
  }

  function finish(nextState,nextDraft){
    const final=finalizeDiagnosticState(nextState,nextDraft);
    if(!final.ok||!saveLocalState(final.state)){setSaveError(true);setDraft(nextDraft);return}
    clearSessionDraft(s.betaMode||"internal");setS(final.state);go("diagResult");
  }

  function next(){
    if(draft.pendingResponse||draft.phase==="completion_pending"){retryRecovery();return}
    if(!fb)return;
    const result=transactDiagnosticAnswer({state:s,draft,sel,saveDraft:saveSessionDraft,saveState:saveLocalState});
    if(!result.ok){setReady(false);setSaveError(true);setDraft(result.draft);return}
    setSaveError(false);setS(result.state);setDraft(result.draft);
    if(result.completed)finish(result.state,result.draft);
  }

  if(draft.phase==="completion_pending")return <Shell><div className="topline"><Logo/><span>Diagnóstico em progresso</span></div>
    <div className="notice"><b>A concluir com segurança</b><span>O teu progresso está guardado.</span></div>
    {saveError&&<div className="notice warning"><b>Não foi possível concluir agora</b><span>Tenta novamente sem fechar esta página.</span></div>}
    <button className="primary" onClick={retryRecovery}>Tentar novamente</button></Shell>;

  if(!ready)return <Shell><div className="topline"><Logo/><span>Diagnóstico em progresso</span></div>
    <div className="notice warning"><b>Estamos a confirmar o teu progresso</b><span>Nenhuma resposta será repetida enquanto a sessão não estiver segura.</span></div>
    <button className="primary" onClick={retryRecovery}>Tentar novamente</button></Shell>;

  return <Shell>
    <div className="topline"><Logo/><span>Diagnóstico em progresso</span></div>
    {saveError&&<div className="notice warning"><b>Estamos a conservar o teu progresso</b><span>Tenta continuar novamente. A resposta guardada não será repetida.</span></div>}
    <div className="diagProgressWrap">
      <div className="diagProgressText">
        <b>{anchorsDone?`${anchorsDone} áreas-âncora já observadas`:"A construir o primeiro mapa"}</b>
        <span>Dificuldade atual: {difficulty===1?"base":difficulty===2?"intermédia":"elevada"}</span>
      </div>
      <div className="progress"><i style={{width:`${Math.max(8,estimate)}%`}}/></div>
    </div>

    <div className="activeArea">
      <span>{current.role==="probe"?"↳ A A+ decidiu aprofundar":"● Pergunta-âncora"}</span>
      <b>{theme(current.themeId).short}</b>
    </div>

    {current.role==="probe"&&<div className="branchNote"><b>Porque apareceu esta pergunta?</b>
      <span>A resposta anterior deixou dúvidas. Esta pergunta mais simples ajuda a distinguir uma lacuna de base de um erro pontual.</span></div>}

    <p className="eyebrow">{current.cognitive.toUpperCase()} · NÍVEL {current.difficulty}</p>
    <h2>{current.q}</h2>
    <QuestionOptions q={current} sel={sel} fb={fb} answer={answer}/>
    {fb&&<div className={"feedback "+(fb.correct?"good":"bad")}>
      <b>{fb.correct?"✓ Correto":"Resposta registada"}</b>
      <span>{fb.correct?current.sol:current.hyp}</span>
      {!fb.correct&&<small>A A+ usa esta resposta para decidir a próxima pergunta, não para “rotular” o teu nível.</small>}
    </div>}
    <button className="primary" disabled={!fb} onClick={next}>Continuar</button>
  </Shell>
}

function DiagResult({s,setS,go}){
  const measured=measuredThemes(s);
  const priority=selectMissionTheme(s);
  const index=prepIndex(s);
  const ranked=[...measured].sort((a,b)=>(s.scores[a.id].domain??100)-(s.scores[b.id].domain??100)).slice(0,4);

  return <Shell><div className="centered"><Logo/><div className="check">✓</div>
    <p className="eyebrow">JÁ TEMOS INFORMAÇÃO SUFICIENTE</p>
    <h1>Podemos criar o teu primeiro plano.</h1>
    <div className="indexCircle"><strong>{index}</strong><span>/100</span></div>
    <p className="indexQualifier">Índice inicial parcial · {measured.length}/{TAXONOMY.length} áreas com evidência</p>
    <p className="muted">Não é uma fotografia completa da Matemática A. A A+ vai preencher as áreas em falta e recalibrar as restantes durante as próximas Missões.</p>
  </div>

  <div className="notice"><b>Primeira prioridade: {priority.short}</b>
    <span>A escolha combina Domínio, Certeza da A+, relevância para o exame e pré-requisitos. Não é simplesmente “o score mais baixo”.</span></div>

  <div className="resultSkills">{ranked.map(t=>{
    const v=s.scores[t.id];
    return <div className="resultSkill" key={t.id}><div><b>{t.short}</b><small>Domínio estimado: {v.domain}/100</small></div>
      <div className="certainty"><span>Certeza da A+</span><strong>{certaintyLabel(v.conf,v.evidence.length)}</strong></div></div>
  })}</div>

  <div className="notice"><b>Domínio ≠ Certeza da A+</b>
    <span><b>Domínio</b> é quanto a A+ estima que sabes. <b>Certeza da A+</b> é quão segura está dessa estimativa — não mede a tua confiança em ti próprio.</span></div>

  <FriendsBetaDisclaimer s={s}/>
  <DailyCompletionNote s={s}/>
  <CompetitionXpNote s={s}/>
  {isFriendsBeta(s)&&<BetaSessionFeedback s={s} setS={setS} kind="diagnostic"/>}
  <button className="primary" onClick={()=>{
    setS(prev=>recordMilestone(prev,"first_plan_viewed",{
      measuredThemes:measured.length,
      firstPriority:priority?.id||null
    }));
    go("home");
  }}>Ver o meu primeiro plano</button>
  </Shell>
}



function DailyMissionModal({s,plan,mode="new",onStart,onDismiss}){
  if(!plan||plan.type==="blocked")return null;
  const t=plan.themeId?theme(plan.themeId):null;
  const typeMeta={
    priority:{icon:"🎯",label:"Prioridade"},
    calibration:{icon:"🧭",label:"Calibração"},
    confirmation:{icon:"✅",label:"Confirmação"},
    investigation:{icon:"🔎",label:"Investigação"}
  }[plan.type]||{icon:"🎯",label:"Missão"};
  const duration="~3–5 min";
  const daily=engagementSummary(s);

  return <div className="dailyMissionOverlay" role="dialog" aria-modal="true" aria-label="Missão de Hoje">
    <section className="dailyMissionModal">
      <div className="dailyMissionGlow">{typeMeta.icon}</div>
      <div className="dailyMissionModalTop">
        <small>{mode==="resume"?"MISSÃO EM PAUSA":"NOVA MISSÃO DISPONÍVEL"}</small>
        <span>🔥 {daily.streak} {daily.streak===1?"dia":"dias"}</span>
      </div>
      <div className="dailyMissionTitle">
        <span>{typeMeta.icon}</span>
        <div><small>A TUA MISSÃO DE HOJE · {typeMeta.label.toUpperCase()}</small>
          <h2>{mode==="resume"?"Continuamos de onde ficaste?":t?.short||"Missão de Hoje"}</h2>
          {plan.focus&&<b>{plan.focus}</b>}
        </div>
      </div>

      <p className="dailyMissionReason">{mode==="resume"
        ?"O teu progresso ficou guardado. Não começamos outra Missão: continuas exatamente a Missão de hoje."
        :plan.reason}</p>

      {plan.reasons?.length>0&&mode!=="resume"&&<div className="dailyMissionWhy">
        <small>PORQUE ESTA MISSÃO?</small>
        {plan.reasons.slice(0,2).map((r,i)=><div key={`${r.kind||"reason"}-${i}`}><span>✓</span><p><b>{r.title}</b><small>{r.detail}</small></p></div>)}
      </div>}

      <div className="dailyMissionRewards">
        <div><span>⏱</span><b>{duration}</b><small>duração estimada</small></div>
        <div><span>🏆</span><b>+50 XP</b><small>competitivo</small></div>
        <div><span>🔥</span><b>{daily.streak?`Dia ${daily.streak+1}`:"Começar"}</b><small>{daily.streak?"se mantiveres amanhã":"a tua sequência"}</small></div>
      </div>

      <div className="dailyMissionActions">
        <button className="dailyMissionStart" onClick={onStart}>{mode==="resume"?"Continuar Missão →":"Começar Missão →"}</button>
        <button className="dailyMissionLater" onClick={onDismiss}>Agora não · ver a Home</button>
        <small className="dailyMissionFoot">Existe apenas uma Missão principal por dia. Depois podes continuar com Treino Livre ou Mini-exames.</small>
      </div>
    </section>
  </div>;
}


function Home({s,setS,go,reset}){
  const index=prepIndex(s);
  const daily=engagementSummary(s);
  const missionDone=missionCompletedToday(s);
  const completedMission=todayMissionRecord(s);
  const league=competitionSummary(s);
  const leagueProj=leagueProjection(s);
  const devView=typeof window!=="undefined" && new URLSearchParams(window.location.search).get("dev")==="1";
  const measured=measuredThemes(s);
  const computedPlan=dailyMissionPlan(s);
  const persistedPlan=missionPlanForToday(s,null);
  const [pausedDraft,setPausedDraft]=useState(()=>typeof window!=="undefined"?loadSessionDraft(s.betaMode||"internal"):null);
  const plan=pausedDraft?.kind==="mission"&&pausedDraft.plan
    ?pausedDraft.plan
    :(persistedPlan||computedPlan);
  const t=plan.themeId?theme(plan.themeId):null;
  const pv=plan.themeId?s.scores[plan.themeId]:null;
  const fv=plan.themeId&&plan.focus?focusScore(s,plan.themeId,plan.focus):null;
  const priorities=[...measured].filter(x=>eligibleQuestions(s,x.id,"mission").length)
    .sort((a,b)=>priorityScore(b,s)-priorityScore(a,s)).slice(0,5);
  const ranked=rankedStudyPriorities(s,4);
  const [showMissionModal,setShowMissionModal]=useState(false);
  const [missionModalMode,setMissionModalMode]=useState("new");

  const labels={
    priority:"🎯 MISSÃO DE HOJE · PRIORIDADE",
    calibration:"🧭 MISSÃO DE HOJE · CALIBRAÇÃO",
    confirmation:"✅ MISSÃO DE HOJE · CONFIRMAÇÃO",
    investigation:"🔎 MISSÃO DE HOJE · INVESTIGAÇÃO",
    blocked:"🔒 MISSÃO INDISPONÍVEL"
  };

  useEffect(()=>{
    if(typeof window==="undefined"||missionDone)return;

    const assignmentPlan=pausedDraft?.kind==="mission"&&pausedDraft.plan
      ?pausedDraft.plan
      :(persistedPlan||computedPlan);

    if(!s.diagnosticDone||!assignmentPlan||assignmentPlan.type==="blocked")return;
    if(pausedDraft&&pausedDraft.kind!=="mission")return;

    if(!persistedPlan){
      setS(prev=>ensureDailyMissionAssignment(prev,assignmentPlan));
    }

    const decision=dailyMissionPromptDecision(s,{
      plan:assignmentPlan,
      diagnosticDone:s.diagnosticDone,
      pausedDraft
    });
    if(!decision.show)return;

    if(decision.mode==="resume"){
      const resumeKey=`a25-daily-mission-resume:${decision.sessionId||"unknown"}`;
      if(sessionStorage.getItem(resumeKey))return;
      sessionStorage.setItem(resumeKey,"1");
      setMissionModalMode("resume");
      setShowMissionModal(true);
      setS(prev=>{
        let next=ensureDailyMissionAssignment(prev,decision.plan||assignmentPlan);
        next=markDailyMissionPromptShown(next);
        next=recordMilestone(next,"first_daily_mission_prompt_shown",{
          mode:"resume",
          themeId:decision.plan?.themeId||assignmentPlan.themeId
        });
        return {...next,betaEvents:[...(next.betaEvents||[]),betaEvent("daily_mission_prompt_shown",{
          mode:"resume",sessionId:decision.sessionId||null,
          themeId:decision.plan?.themeId||assignmentPlan.themeId,
          focus:decision.plan?.focus||assignmentPlan.focus||null
        })]};
      });
      return;
    }

    setMissionModalMode("new");
    setShowMissionModal(true);
    setS(prev=>{
      let next=ensureDailyMissionAssignment(prev,decision.plan||assignmentPlan);
      next=markDailyMissionPromptShown(next);
      next=recordMilestone(next,"first_daily_mission_prompt_shown",{
        mode:"new",themeId:assignmentPlan.themeId,type:assignmentPlan.type
      });
      return {...next,betaEvents:[...(next.betaEvents||[]),betaEvent("daily_mission_prompt_shown",{
        mode:"new",themeId:assignmentPlan.themeId,focus:assignmentPlan.focus||null,
        type:assignmentPlan.type
      })]};
    });
  },[]);

  function startDailyMission(source="home_card"){
    if(missionDone||plan.type==="blocked")return;
    setShowMissionModal(false);

    if(pausedDraft?.kind==="mission"){
      setS(prev=>{
        let next=markDailyMissionStarted(prev);
        next=recordMilestone(next,"first_mission_started",{
          source,sessionId:pausedDraft.sessionId||null,themeId:plan.themeId,resumed:true
        });
        return {...next,betaEvents:[...(next.betaEvents||[]),betaEvent("daily_mission_prompt_resumed",{
          source,sessionId:pausedDraft.sessionId||null,themeId:plan.themeId,focus:plan.focus||null
        })]};
      });
      go("mission");
      return;
    }

    const ses=sessionStart("mission",{
      type:plan.type,themeId:plan.themeId,focus:plan.focus||null,
      microcompetencyId:plan.microcompetencyId||microcompetencyId(plan.themeId,plan.focus)||null,
      decisionSource:plan.decisionMeta?.source||null,
      dailyMission:true
    });
    setS(prev=>{
      let next=ensureDailyMissionAssignment(prev,plan);
      next=markDailyMissionStarted(next);
      next=recordMilestone(next,"first_mission_started",{
        source,sessionId:ses.id,themeId:plan.themeId
      });
      return {...next,
        betaSessions:[...(next.betaSessions||[]),ses],
        betaEvents:[...(next.betaEvents||[]),betaEvent("mission_started",{
          sessionId:ses.id,type:plan.type,themeId:plan.themeId,focus:plan.focus||null,
          microcompetencyId:plan.microcompetencyId||microcompetencyId(plan.themeId,plan.focus)||null,
          decisionSource:plan.decisionMeta?.source||null,
          source,dailyMission:true
        })]
      };
    });
    go("mission");
  }

  function dismissMissionModal(){
    setShowMissionModal(false);
    setS(prev=>{
      const next=dismissDailyMissionPrompt(prev);
      return {...next,betaEvents:[...(next.betaEvents||[]),betaEvent("daily_mission_prompt_dismissed",{
        mode:missionModalMode,themeId:plan.themeId,focus:plan.focus||null
      })]};
    });
  }

  return <main className="dark">
    {showMissionModal&&<DailyMissionModal s={s} plan={plan} mode={missionModalMode} onStart={()=>startDailyMission("daily_modal")} onDismiss={dismissMissionModal}/>}
    <section className="wrap">
    <header><div><Logo/><small>MATEMÁTICA A</small></div><div className="headerRight"><span className="rolePill">{ROLES[normalizeIdentity(s.identity).activeRole]?.icon} {ROLES[normalizeIdentity(s.identity).activeRole]?.label}</span><span>🔥 {daily.streak} {daily.streak===1?"dia":"dias"} · <b>{s.xp} XP</b></span></div></header>

    <div className="hello"><div><p>Boa noite 👋</p><h1>O que vamos conquistar hoje?</h1>
      <button className="goalLink" onClick={()=>go("goalSettings")}>🎯 Objetivo: {s.goal} valores · Alterar</button></div>
      <strong>{index??"—"}<small>/100<br/>índice parcial</small></strong>
    </div>

    <DailyEngagementCard s={s}/>

    <button type="button" className="leagueMini" onClick={()=>go("ranking")}>
      <div><small>🏆 RANKING SEMANAL · DEMONSTRAÇÃO</small><h3>{league.division.icon} Divisão {league.division.label}</h3>
        <p><b>{league.weekXp} XP competitivo</b> esta semana · posição simulada #{leagueProj?.position||"—"}</p></div>
      <div className={"leagueZone "+(leagueProj?.zone||"stay")}><b>{leagueProj?.message||"Liga em preparação"}</b><span>Ver ranking →</span></div>
    </button>

    <div className="coverageLine"><b>{measured.length}/{TAXONOMY.length}</b><span>áreas já têm evidência. A A+ vai completar o mapa sem te obrigar a fazer outro diagnóstico gigante.</span></div>

    <FriendsBetaPanel s={s}/>

    {pausedDraft&&<div className="pausedSession"><div><small>SESSÃO EM PAUSA</small><b>{pausedDraft.kind==="mini_exam"?"Mini-exame":pausedDraft.kind==="training"?"Treino Livre":"Missão"}</b><span>O teu progresso desta sessão ficou guardado neste dispositivo.</span></div><button onClick={()=>{
      if(pausedDraft.kind==="mini_exam")go(pausedDraft.screen||"miniExamRun");
      else if(pausedDraft.kind==="training")go("trainingRun");
      else go("mission");
    }}>Continuar →</button></div>}

    {missionDone?<div className="mission completedToday">
      <div className="missionMain"><small>✅ MISSÃO DE HOJE CONCLUÍDA</small>
        <h2>{completedMission?.focus||theme(completedMission?.themeId)?.short||"Bom trabalho"}</h2>
        <p>A recomendação principal de hoje está feita. A app só prepara uma nova Missão amanhã, depois de considerar tudo o que fizeres entretanto.</p>
        <div className="missionMeta"><span>🔥 Streak protegido</span><span>🏆 +50 XP competitivo</span><span>Nova Missão amanhã</span></div>
        <div className="postMissionChoices"><button onClick={()=>go("train")}>Treino Livre</button><button onClick={()=>go("exams")}>Mini-exame</button><button onClick={()=>go("ranking")}>Ranking</button></div>
      </div>
    </div>:<div className={"mission "+plan.type}>
      <div className="missionMain"><small>{labels[plan.type]}</small><h2>{t?.short||"Conteúdo protegido"}</h2>
        {plan.focus&&<div className="missionFocus">Foco: <b>{plan.focus}</b></div>}
        <p>{plan.reason}</p>
        {pv&&<div className="missionMeta">
          <span>{plan.focus?(fv?.domain!==null&&fv?.domain!==undefined?`Competência ${fv.domain}/100`:"Competência ainda sem estimativa"):(pv.domain===null?"Ainda sem Domínio":`Tema ${pv.domain}/100`)}</span>
          <span>Certeza: {fv?certaintyLabel(fv.conf,fv.evidence.length):certaintyLabel(pv.conf,pv.evidence.length)}</span>
          {plan.type==="confirmation"&&<span>Vem do Treino Livre</span>}
        </div>}
        {plan.reasons?.length>0&&<div className="whyNow"><b>Porque agora?</b>{plan.reasons.map((r,i)=><div key={`${r.kind}-${i}`}><span>✓</span><p><strong>{r.title}</strong><small>{r.detail}</small></p></div>)}</div>}
        {plan.unlocks?.length>0&&<div className="unlockLine"><b>↗ Pode desbloquear</b><span>{plan.unlocks.slice(0,3).map(x=>x.label).join(" · ")}</span></div>}
      </div>
      <button disabled={plan.type==="blocked"} onClick={()=>startDailyMission("home_card")}>{plan.type==="blocked"?"Bloqueado":pausedDraft?.kind==="mission"?"Continuar →":"Começar →"}</button>
    </div>}

    {ranked.length>0&&<div className="nextActions"><div className="nextActionsHead"><div><small>O MOTOR ESTÁ A PENSAR À FRENTE</small><h3>Próximas prioridades prováveis</h3></div><span>Recalcula após cada sessão</span></div>
      <div className="nextActionRows">{ranked.map((row,i)=>{
        const v=s.scores[row.theme.id];
        const unlocks=likelyUnlocks(row.theme.id);
        return <div key={row.theme.id} className={i===0?"first":""}><b>{i+1}</b><div><strong>{row.theme.short}</strong><small>{v.domain}/100 · Certeza {certaintyLabel(v.conf,v.evidence.length)}{unlocks.length?` · desbloqueia ${unlocks[0].label}`:""}</small></div><span>{i===0?"Agora":"Depois"}</span></div>
      })}</div>
      <small className="dynamicPlan">Não é um calendário rígido: se uma resposta revelar outra causa, a ordem muda.</small>
    </div>}

    <div className="navgrid">{[
      ["🧠","Treinar","Prática livre sem inflacionar Domínio.","train"],
      ["📝","Exames","Avaliação em contexto de prova.","exams"],
      ["📈","Progresso","Domínio + Certeza da A+.","progress"],
      ["👨‍👩‍👧","Área dos pais","Acompanhamento parental.","parent"]
    ].map(x=><button key={x[1]} onClick={()=>go(x[3])}><b>{x[0]} {x[1]}</b><span>{x[2]}</span></button>)}</div>

    <div className="card"><h3>Prioridades atuais</h3>{priorities.length?priorities.map(x=>{
      const v=s.scores[x.id];
      return <div className="skill" key={x.id}><span>{x.short}</span><div className="bar"><i style={{width:(v.domain??0)+"%"}}/></div>
        <b>{v.domain??"—"}</b><small>{certaintyLabel(v.conf,v.evidence.length)}</small></div>
    }):<div className="calibrationHint">Ainda estamos a construir o mapa inicial.</div>}
      <div className="calibrationHint">Nos primeiros dias, algumas Missões podem servir para calibrar áreas ainda desconhecidas ou confirmar sinais vindos do Treino Livre.</div>
    </div>

    {!isFriendsBeta(s)&&<button className="qaLink studentAccount" onClick={()=>go("account")}>☁️ Conta & progresso na cloud</button>}

    {devView&&<div className="devTools"><small>FERRAMENTAS INTERNAS · NÃO VISÍVEIS A TESTERS</small>
      <button className="qaLink" onClick={()=>go("identity")}>👤 Identidade & Permissões (demo)</button>
      <button className="qaLink" onClick={()=>go("qa")}>🧪 Painel interno de Qualidade</button>
      <button className="qaLink" onClick={()=>go("review")}>👨‍🏫 Painel interno de Revisão Pedagógica</button>
      <button className="qaLink" onClick={()=>go("beta")}>🧪 Painel interno da Beta · modo {s.betaMode||"internal"}</button>
      <button className="reset" onClick={reset}>Recomeçar protótipo</button>
    </div>}
  </section></main>
}


function Mission({s,setS,go,recoveredDraft=null,onRecovered=()=>{}}){
  const completingRef=useRef(false);
  const draft=recoveredDraft || (typeof window!=="undefined" ? loadSessionDraft(s.betaMode||"internal") : null);
  const [sessionId]=useState(()=>draft?.sessionId||latestOpenSessionId(s,"mission"));
  const [plan]=useState(()=>draft?.plan||missionPlanForToday(s,dailyMissionPlan(s)));
  const targetId=plan.themeId;
  const [before]=useState(()=>draft?.before||({...s.scores[targetId]}));
  const [beforeFocus]=useState(()=>draft?.beforeFocus??(plan.focus?focusScore(s,targetId,plan.focus):null));
  const [current,setCurrent]=useState(()=>draft?.current||({...selectQuestionForPlan(s,plan,[],[]),sessionRole:"target"}));
  const [sel,setSel]=useState(draft?.sel??null);
  const [fb,setFb]=useState(draft?.fb??null);
  const [usedIds,setUsedIds]=useState(draft?.usedIds||[]);
  const [usedSignatures,setUsedSignatures]=useState(draft?.usedSignatures||[]);
  const [targetItems,setTargetItems]=useState(draft?.targetItems||[]);
  const [targetCount,setTargetCount]=useState(draft?.targetCount||0);
  const [totalCount,setTotalCount]=useState(draft?.totalCount||0);
  const [pendingError,setPendingError]=useState(draft?.pendingError||null);
  const [detour,setDetour]=useState(draft?.detour||null);

  useEffect(()=>{
    if(draft)onRecovered();
  },[]);

  useEffect(()=>{
    if(!targetId || !current)return;
    saveSessionDraft({
      kind:"mission",betaMode:s.betaMode||"internal",sessionId,plan,before,beforeFocus,current,sel,fb,
      usedIds,usedSignatures,targetItems,targetCount,totalCount,pendingError,detour
    });
  },[plan,current,sel,fb,usedIds,usedSignatures,targetItems,targetCount,totalCount,pendingError,detour]);

  if(missionCompletedToday(s) && !draft){
    return <Shell><Back go={go}/><div className="centered"><div className="check">✓</div><p className="eyebrow">MISSÃO DE HOJE CONCLUÍDA</p>
      <h1>Volta amanhã para uma nova Missão.</h1><p className="muted">Hoje podes continuar com Treino Livre ou Mini-exames. O que fizeres será tido em conta quando o motor preparar a próxima Missão.</p></div>
      <button className="primary" onClick={()=>go("train")}>Treino Livre</button><button className="secondary" onClick={()=>go("exams")}>Mini-exame</button></Shell>;
  }

  function answer(n){if(!fb){setSel(n);setFb({correct:n===current.a})}}

  function closeMission(finalState,finalDetour=detour,newTargetCount=targetCount,newTotal=totalCount+1,stopDecision=null){
    if(completingRef.current)return;
    completingRef.current=true;

    if(!claimSessionCompletion(sessionId)){
      clearSessionDraft(s.betaMode||"internal");
      go("missionResult");
      return;
    }

    const now=finalState.scores[targetId];
    const afterFocus=plan.focus?focusScore(finalState,targetId,plan.focus):null;
    const historyItem={
      type:plan.type,themeId:targetId,focus:plan.focus||null,
      microcompetencyId:plan.microcompetencyId||microcompetencyId(targetId,plan.focus)||null,
      at:Date.now(),
      completionId:sessionId||null,
      beforeDomain:before.domain,afterDomain:now.domain,
      beforeConf:before.conf,afterConf:now.conf,
      beforeFocusDomain:beforeFocus?.domain??null,afterFocusDomain:afterFocus?.domain??null,
      beforeFocusConf:beforeFocus?.conf??0,afterFocusConf:afterFocus?.conf??0,
      beforeFocusEvidence:beforeFocus?.evidence?.length||0,afterFocusEvidence:afterFocus?.evidence?.length||0,
      totalCount:newTotal,interactionCount:newTotal,
      stopCode:stopDecision?.code||"unknown",
      stopTitle:stopDecision?.title||null,
      stopDetail:stopDecision?.detail||null,
      decisionSource:plan.decisionMeta?.source||null,
      decisionUtility:plan.decisionMeta?.utility??null,
      alternatives:plan.alternatives||[]
    };
    const sessions=[...(finalState.betaSessions||[])];
    const openIdx=[...sessions].map(x=>x.kind==="mission"&&!x.finishedAt).lastIndexOf(true);
    if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{themeId:targetId,focus:plan.focus||null,type:plan.type,totalCount:newTotal});

    const baseFinished={...finalState,
      betaSessions:sessions,
      betaEvents:[...(finalState.betaEvents||[]),betaEvent("mission_finished",{
        sessionId:sessionId||null,themeId:targetId,focus:plan.focus||null,
        microcompetencyId:plan.microcompetencyId||microcompetencyId(targetId,plan.focus)||null,
        type:plan.type,totalCount:newTotal
      })],
      missionHistory:[...(finalState.missionHistory||[]),historyItem],
      freeTrainingSignals:plan.type==="confirmation"
        ? markTrainingSignalConfirmed(finalState.freeTrainingSignals,plan.signal)
        : finalState.freeTrainingSignals,
      lastMission:{
        ...historyItem,
        planReason:plan.reason,
        targetCount:newTargetCount,
        detour:finalDetour,
        signal:plan.signal||null
      }
    };
    const activityAt=Date.now();
    let finished=recordStudyActivity(baseFinished,{
      kind:"mission",
      xpEarned:newTotal*25,
      sessionId:sessionId||historyItem.completionId,
      at:activityAt
    });
    finished=recordCompetitiveActivity(finished,{
      kind:"mission",
      total:newTotal,
      focusKey:plan.microcompetencyId||microcompetencyId(targetId,plan.focus)||`${targetId}:${plan.focus||""}`,
      sessionId:sessionId||historyItem.completionId,
      at:activityAt
    });
    finished=refreshLearningHypotheses(finished,activityAt);
    finished=recordMilestone(finished,"first_mission_completed",{
      sessionId:sessionId||historyItem.completionId,
      themeId:targetId,
      type:plan.type,
      totalCount:newTotal
    },{at:activityAt});
    clearSessionDraft(s.betaMode||"internal");
    setS(finished);go("missionResult");
  }

  function next(){
    const correct=sel===current.a;
    const newUsed=[...usedIds,current.id];
    const newSigs=[...usedSignatures,current.signature||current.id];
    const newTotal=totalCount+1;
    setUsedIds(newUsed);setUsedSignatures(newSigs);setTotalCount(newTotal);

    if(current.sessionRole==="target" && !correct && !detour && plan.type!=="calibration"
      && canStartMissionDetour(newTotal)){
      const probe=selectCausalProbe(s,targetId,current.focus||plan.focus,newUsed,newSigs);
      if(probe?.question){
        setS(prev=>({...prev,xp:prev.xp+25}));
        setPendingError(current);
        setDetour({
          preId:probe.question.themeId,
          preFocus:probe.dependency.focus||probe.question.focus||null,
          targetFocus:current.focus||plan.focus||null,
          dependency:probe.dependency,
          result:null,
          verdict:null
        });
        setCurrent({...probe.question,sessionRole:"prereq"});
        setSel(null);setFb(null);
        return;
      }
    }

    let nextState={...s,scores:{...s.scores},xp:s.xp+25};
    let newTargetCount=targetCount;
    let newTargetItems=[...targetItems];
    let finalDetour=detour;

    if(current.sessionRole==="prereq"){
      nextState.scores[current.themeId]=applyEvidence(nextState.scores[current.themeId],current,correct,"mission");

      const verdict=causalVerdict({
        probeCorrect:correct,
        targetThemeId:targetId,
        targetFocus:pendingError?.focus||plan.focus||null,
        dependency:detour?.dependency
      });

      if(pendingError){
        nextState.scores[targetId]=applyEvidence(
          nextState.scores[targetId],pendingError,false,"mission",verdict?.targetStrength??1
        );
        newTargetCount=targetCount+1;
        newTargetItems=[...targetItems,pendingError];
        setTargetCount(newTargetCount);setTargetItems(newTargetItems);
      }

      finalDetour={...detour,result:correct,verdict};
      nextState.learningHypotheses=recordLearningHypothesis(nextState.learningHypotheses,{
        targetThemeId:targetId,
        targetFocus:pendingError?.focus||plan.focus||null,
        dependency:detour?.dependency,
        verdict
      });
      setDetour(finalDetour);setPendingError(null);
    }else{
      nextState.scores[targetId]=applyEvidence(nextState.scores[targetId],current,correct,"mission");
      newTargetCount=targetCount+1;
      newTargetItems=[...targetItems,current];
      setTargetCount(newTargetCount);setTargetItems(newTargetItems);
    }

    setS(nextState);

    const targetScore=nextState.scores[targetId];
    const currentFocusScore=plan.focus?focusScore(nextState,targetId,plan.focus):null;
    const stopDecision=missionStopDecision({
      missionType:plan.type,
      targetCount:newTargetCount,
      totalCount:newTotal,
      beforeConf:before.conf,
      currentScore:targetScore,
      sessionTargetItems:newTargetItems,
      beforeFocusConf:beforeFocus?.conf??null,
      currentFocusScore
    });

    if(stopDecision.stop){
      closeMission(nextState,finalDetour,newTargetCount,newTotal,stopDecision);return;
    }

    const nxt=selectQuestionForPlan(nextState,plan,newUsed,newSigs);
    if(!nxt){
      closeMission(nextState,finalDetour,newTargetCount,newTotal,missionContentExhaustedDecision());return
    }
    setCurrent({...nxt,sessionRole:"target"});setSel(null);setFb(null);
  }

  if(!current)return <Shell><Back go={go}/><h1>Ainda não existem perguntas suficientes para esta Missão.</h1></Shell>;

  const typeName=plan.type==="confirmation"?"Confirmação":plan.type==="calibration"?"Calibração":plan.type==="investigation"?"Investigação":"Prioridade";
  const missionStage=totalCount===0?"A começar":totalCount<3?"A aprofundar":"Quase concluída";

  return <Shell>
    <div className="topline"><Logo/><span>Missão · {typeName}</span></div>
    {draft&&<div className="resumeBanner"><b>↻ Sessão retomada</b><span>Continuaste exatamente no ponto onde tinhas ficado.</span></div>}
    <div className="missionStep"><div><small>FOCO PRINCIPAL</small><b>{theme(targetId).short}</b>{plan.focus&&<em>{plan.focus}</em>}</div>
      <span>{missionStage} · sessão curta</span></div>

    {plan.type==="confirmation"&&current.sessionRole==="target"&&<div className="notice"><b>Porque estamos aqui?</b>
      <span>Treinaste {plan.focus}. O desempenho foi promissor, mas o Treino Livre não altera o Domínio. Esta Missão serve para confirmar se a evolução se mantém.</span></div>}

    {plan.type==="calibration"&&<div className="notice"><b>Missão de calibração</b>
      <span>A A+ ainda conhece pouco esta área. Uma pequena sequência de interações úteis ajuda a começar o mapa sem transformar a Missão num teste.</span></div>}

    {plan.type==="investigation"&&current.sessionRole==="target"&&<div className="decisionExplain"><b>Porque estamos a voltar a esta competência?</b>
      {(plan.reasons||[]).map((r,i)=><div key={`${r.kind}-${i}`}><span>{i+1}</span><p><strong>{r.title}</strong><small>{r.detail}</small></p></div>)}
      <footer>A app não assume que a hipótese anterior estava certa. Esta Missão existe precisamente para tentar confirmá-la ou enfraquecê-la.</footer>
    </div>}

    {plan.type==="priority"&&current.sessionRole==="target"&&<div className="decisionExplain"><b>Porque é esta a próxima melhor ação?</b>
      {(plan.reasons||[]).map((r,i)=><div key={`${r.kind}-${i}`}><span>{i+1}</span><p><strong>{r.title}</strong><small>{r.detail}</small></p></div>)}
      {plan.unlocks?.length>0&&<footer>Se melhorares esta base, o motor poderá avançar com mais segurança para <b>{plan.unlocks.slice(0,2).map(x=>x.label).join(" e ")}</b>.</footer>}
    </div>}

    {current.sessionRole==="prereq"&&<div className="branchNote strong"><b>↳ Verificação rápida da causa</b>
      <span>Antes de concluir que a dificuldade está em <b>{detour?.targetFocus||theme(targetId).short}</b>, a A+ vai testar <b>{detour?.preFocus||theme(current.themeId).short}</b>. Uma pergunta não prova a causa — apenas torna uma hipótese mais ou menos provável.</span></div>}

    {current.generated&&<div className="validatedVariant"><b>✓ Variante validada</b><span>Resposta calculada por regras matemáticas fechadas · seed {current.variantSeed}</span></div>}
    <p className="eyebrow">{current.cognitive.toUpperCase()} · NÍVEL {current.difficulty}</p>
    <h2>{current.q}</h2>
    <QuestionOptions q={current} sel={sel} fb={fb} answer={answer}/>

    {fb&&<div className={"feedback "+(fb.correct?"good":"bad")}>
      <b>{fb.correct?"✓ Correto":"A A+ detetou uma hipótese."}</b>
      <span>{fb.correct?current.sol:current.hyp}</span>
      {!fb.correct&&<small>{current.sessionRole==="target"&&!detour&&plan.type!=="calibration"
        ?"Se existir um pré-requisito verificável, a A+ pode testá-lo antes de atribuir a causa."
        :"Ainda não existe evidência suficiente para uma conclusão forte."}</small>}
    </div>}
    {fb&&<ReportButton item={current} s={s} setS={setS}/>}
    <button disabled={!fb} className="primary" onClick={next}>Continuar</button>
  </Shell>
}


function MissionResult({s,setS,go}){
  const m=s.lastMission;
  if(!m)return <Shell><Back go={go}/><h1>Missão concluída.</h1></Shell>;
  const t=theme(m.themeId);
  const now=s.scores[m.themeId];
  const delta=(m.afterDomain??0)-(m.beforeDomain??0);
  const typeName=m.type==="confirmation"?"Confirmação concluída":m.type==="calibration"?"Calibração concluída":"Missão concluída";

  return <Shell><div className="centered"><Logo/><div className="check">✓</div>
    <p className="eyebrow">{typeName.toUpperCase()}</p><h1>{t.short}</h1>
    <p className="muted">{m.stopDetail
      ?m.stopDetail
      :m.type==="calibration"
        ?"A A+ já tem primeiras observações nesta área. Ainda é cedo para tratar esta estimativa como robusta."
        :`A sessão terminou após ${m.interactionCount||m.totalCount} interações úteis.`}</p></div>

    {m.stopTitle&&<div className="stopReason"><small>PORQUE TERMINOU AGORA?</small><b>{m.stopTitle}</b><span>{m.stopDetail}</span></div>}

    {m.focus&&<div className="competenceOutcome"><small>COMPETÊNCIA TRABALHADA</small><h2>{m.focus}</h2><div>
      <p><span>Domínio</span><b>{m.beforeFocusDomain??"—"} → {m.afterFocusDomain??"—"}/100</b></p>
      <p><span>Certeza da A+</span><b>{certaintyLabel(m.beforeFocusConf,m.beforeFocusEvidence)} → {certaintyLabel(m.afterFocusConf,m.afterFocusEvidence)}</b></p>
    </div></div>}
    <div className="missionOutcome">
      <div><span>{m.focus?"Tema — visão agregada":"Domínio estimado"}</span><b>{m.beforeDomain??"—"} → {m.afterDomain}/100</b><small>{m.beforeDomain===null?"primeira estimativa":delta>0?`+${delta}`:delta===0?"sem alteração":delta}</small></div>
      <div><span>Certeza do tema</span><b>{certaintyLabel(m.beforeConf,m.beforeDomain===null?0:1)} → {certaintyLabel(now.conf,now.evidence.length)}</b><small>O tema agrega evidência de várias competências.</small></div>
    </div>

    {m.type==="confirmation"&&<div className="notice"><b>Sinal do Treino Livre confirmado</b>
      <span>O resultado deixou de ser apenas prática livre e passou a contar como evidência avaliativa desta competência.</span></div>}

    {m.detour?.verdict&&<div className={"causeCard "+(m.detour.verdict.code==="prerequisite_suspected"?"suspect":"clear")}>
      <small>CAUSA PROVÁVEL · AINDA NÃO É UMA CONCLUSÃO</small>
      <h3>{m.detour.verdict.title}</h3>
      <p>{m.detour.verdict.detail}</p>
      <span>{m.detour.verdict.code==="prerequisite_suspected"
        ?`Por isso, o erro anterior em ${m.detour.targetFocus||t.short} teve peso reduzido. A base será observada novamente noutra evidência independente.`
        :"O erro do foco principal manteve o seu peso normal, porque a verificação da base não revelou a mesma dificuldade."}</span>
    </div>}

    <div className="notice"><b>Porque mudou?</b>
      <span>O Domínio reage ao desempenho. A Certeza da A+ cresce sobretudo com evidências independentes, tipos de raciocínio diferentes e contextos avaliativos.</span></div>
    <div className="notice"><b>O plano vai ser recalculado agora</b><span>A próxima Missão não está pré-programada. O motor volta a comparar dificuldades, certeza, pré-requisitos, relevância, recência e objetivo com esta nova evidência.</span></div>

    <FriendsBetaDisclaimer s={s}/>
    <DailyCompletionNote s={s}/>
    <CompetitionXpNote s={s}/>
    <BetaSessionFeedback s={s} setS={setS} kind="mission"/>
    <button className="primary" onClick={()=>go("home")}>Voltar ao plano</button>
    <button className="secondary" onClick={()=>go("progress")}>Ver progresso detalhado</button>
  </Shell>
}


function Ranking({s,setS,go}){
  const summary=competitionSummary(s);
  const projection=leagueProjection(s);
  const profile=summary.profile||{};
  const [scope,setScope]=useState("league");
  const [nickname,setNickname]=useState(profile.nickname||"");
  const [region,setRegion]=useState(profile.region||"");
  const [school,setSchool]=useState(profile.school||"");
  const [districtOptIn,setDistrictOptIn]=useState(!!profile.districtOptIn);
  const [schoolOptIn,setSchoolOptIn]=useState(!!profile.schoolOptIn);
  const availability=scopeAvailability(s,scope);
  const allRows=availability.available?demoLeaderboard(s,{scope}):[];
  const rows=scope==="league"?allRows:leaderboardAroundUser(allRows,3);
  const self=allRows.find(x=>x.self);
  const latest=latestCompetitiveActivity(s);

  const scopeLabel={
    league:`Divisão ${summary.division.label}`,
    general:"Geral",
    year:s.profile?.schoolYear||"Meu ano",
    district:profile.region||"Distrito/Região",
    school:profile.school||"Escola"
  }[scope];

  function saveProfile(){
    setS(prev=>updateCompetitionProfile(prev,{
      nickname,
      region:region||null,
      school:school||null,
      districtOptIn,
      schoolOptIn
    }));
  }

  return <Shell><Back go={go}/>
    <div className="rankingHero">
      <div><p className="eyebrow">🏆 COMPETIÇÃO SEMANAL</p><h1>Treina. Ganha XP. Sobe.</h1>
        <p className="muted">O ranking compara <b>atividade de estudo</b>, nunca Domínio, Certeza, Índice de Preparação ou notas.</p></div>
      <div className="divisionBadge"><span>{summary.division.icon}</span><b>{summary.division.label}</b><small>{summary.weekXp} XP esta semana</small></div>
    </div>

    <div className="demoRankingWarning"><b>DEMONSTRAÇÃO LOCAL</b><span>Os outros nomes e XP desta versão são simulados para testarmos a experiência. O ranking real só será ligado quando existir backend multiutilizador.</span></div>

    <div className="rankingTabs">
      {[["league","Divisão"],["general","Geral"],["year","Ano"],["district","Distrito"],["school","Escola"]].map(([id,label])=>
        <button key={id} className={scope===id?"sel":""} onClick={()=>setScope(id)}>{label}</button>
      )}
    </div>

    {scope==="league"&&<section className="leagueStatus">
      <div><small>DIVISÃO ATUAL</small><h3>{summary.division.icon} {summary.division.label}</h3><p>{projection?.message}</p></div>
      <div><b>#{projection?.position||"—"}</b><span>de {allRows.length||20}</span></div>
      <footer><span>↑ Top {PROMOTION_COUNT} sobem</span><span>↓ Últimos {DEMOTION_COUNT} descem</span><span>Termina em ~{summary.daysRemaining} d</span></footer>
    </section>}

    {!availability.available?<div className="rankingLocked">
      <b>{scope==="district"?"Ranking de distrito/região ainda não ativo":"Ranking de escola ainda não ativo"}</b>
      <span>{availability.reason}</span>
      <small>{scope==="school"
        ?`No ranking real, só abriremos uma tabela de escola com pelo menos ${SCHOOL_MIN_PARTICIPANTS} participantes elegíveis, para reduzir risco de identificação.`
        :`No ranking real, o distrito/região terá um limiar mínimo de ${DISTRICT_MIN_PARTICIPANTS} participantes.`}</small>
    </div>:<section className="leaderboard">
      <div className="leaderboardHead"><div><small>RANKING SEMANAL · {scopeLabel?.toUpperCase()}</small><h3>{scope==="league"?"A tua liga":scopeLabel}</h3></div><span>{self?`Tu: #${self.position}`:"—"}</span></div>
      <div className="leaderboardRows">{rows.map(row=>{
        const promote=scope==="league"&&row.position<=PROMOTION_COUNT;
        const demote=scope==="league"&&row.position>allRows.length-DEMOTION_COUNT;
        return <div key={row.id} className={(row.self?"self ":"")+(promote?"promote ":demote?"demote ":"")}>
          <b className="rankPos">{row.position}</b>
          <span className="rankAvatar">{row.self?"🙂":row.position===1?"🥇":row.position===2?"🥈":row.position===3?"🥉":"●"}</span>
          <div><strong>{row.nickname}{row.self?" · TU":""}</strong><small>{row.demo?"tester simulado":"o teu perfil"}</small></div>
          <em>{row.xp} XP</em>
        </div>
      })}</div>
      {scope!=="league"&&<small className="aroundYouNote">Em rankings muito grandes, a experiência deverá privilegiar a tua posição e quem está imediatamente acima/abaixo — não uma lista infinita.</small>}
    </section>}

    <section className="xpRules">
      <div><small>COMO GANHAS XP COMPETITIVO</small><h3>Mais estudo útil, menos farming.</h3></div>
      <div className="xpRuleGrid">
        <div><b>🎯 +50</b><span>Missão diária</span><small>Uma única Missão por dia.</small></div>
        <div><b>🧠 até +40</b><span>Treino Livre</span><small>Repetir sempre o mesmo foco reduz progressivamente o XP competitivo.</small></div>
        <div><b>📝 até +80</b><span>Mini-exame</span><small>XP pela atividade concluída, não pela nota.</small></div>
        <div><b>🧭 +30</b><span>1.º Diagnóstico</span><small>Conta uma vez.</small></div>
      </div>
      {latest&&<div className="lastRankXp"><b>Último ganho: +{latest.rankedXp} XP</b><span>{latest.reason}</span></div>}
      <p className="muted">O teu <b>XP total</b> continua acumulado para sempre. O <b>XP competitivo</b> reinicia semanalmente para que um aluno novo possa competir desde a primeira semana.</p>
    </section>

    <section className="divisionLadder">
      <small>DIVISÕES</small>
      <div>{DIVISIONS.map(d=><div key={d.id} className={d.id===summary.division.id?"current":""}><span>{d.icon}</span><b>{d.label}</b></div>)}</div>
      <p>Em produção, cada liga terá um pequeno grupo de alunos com atividade comparável. No final da semana, os primeiros sobem e os últimos podem descer.</p>
    </section>

    <section className="rankingProfile">
      <div><small>PERFIL PÚBLICO DO RANKING</small><h3>Nickname, nunca nota.</h3>
        <p>Por defeito não mostramos nome real. Escola e distrito/região são opcionais e só entram nos rankings se o aluno aderir.</p></div>
      <label>Nickname<input maxLength="24" value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Ex.: Sigma17"/></label>
      <label>Distrito/Região<select value={region} onChange={e=>setRegion(e.target.value)}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
      <label>Escola<input value={school} onChange={e=>setSchool(e.target.value)} placeholder="Opcional"/></label>
      <label className="rankConsent"><input type="checkbox" checked={districtOptIn} onChange={e=>setDistrictOptIn(e.target.checked)}/><span>Participar no ranking do meu distrito/região.</span></label>
      <label className="rankConsent"><input type="checkbox" checked={schoolOptIn} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>
      <button className="primary" onClick={saveProfile}>Guardar perfil de ranking</button>
      <small className="privacyRankNote">Nunca entram no ranking: Domínio, Certeza, Índice de Preparação, nota objetivo, resultados de exame ou número de erros.</small>
    </section>
  </Shell>;
}


function Train({s,setS,go,start}){
  const [year,setYear]=useState("12.º");
  const themes=byYear(year);
  const [themeId,setThemeId]=useState(themes[0].id);
  const current=theme(themeId)||themes[0];
  const [focus,setFocus]=useState(current.focus[0]);
  const [level,setLevel]=useState("auto");

  function changeYear(y){
    const first=byYear(y)[0];setYear(y);setThemeId(first.id);setFocus(first.focus[0]);
  }
  function changeTheme(id){
    const t=theme(id);setThemeId(id);setFocus(t.focus[0]);
  }

  const curatedAvailable=eligibleQuestions(s,themeId,"training").length;
  const generatedAvailable=(s.betaMode||"internal")==="internal" && hasGenerator(themeId);
  const available=hasTrainingContent(themeId,focus,s);
  const exactCurated=eligibleQuestions(s,themeId,"training",focus).filter(q=>q.focus===focus).length;
  const exactGenerated=(s.betaMode||"internal")==="internal" && hasGenerator(themeId,focus);

  return <Shell><Back go={go}/>
    <p className="eyebrow">TREINO LIVRE</p><h1>O que queres praticar?</h1>
    <p className="muted">O Treino Livre serve para praticar. <b>Não sobe nem desce diretamente o teu Domínio.</b> Um bom desempenho pode gerar um sinal para confirmar mais tarde numa Missão ou Exame.</p>

    <h3>1. Ano</h3><div className="chips">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>changeYear(y)}>{y}</button>)}</div>
    <h3>2. Tema</h3><div className="themeGrid">{themes.map(t=>{
      const count=eligibleQuestions(s,t.id,"training").length;
      const generated=(s.betaMode||"internal")==="internal" && hasGenerator(t.id);
      return <button key={t.id} className={themeId===t.id?"sel":""} onClick={()=>changeTheme(t.id)}>{t.short}{generated?<small> · variantes validadas</small>:count?<small> · banco disponível</small>:<small> · em construção</small>}</button>
    })}</div>

    <h3>3. Em que queres focar-te?</h3><div className="chips">{current.focus.map(x=>{
      const count=eligibleQuestions(s,themeId,"training",x).filter(q=>q.focus===x).length;
      const generated=(s.betaMode||"internal")==="internal" && hasGenerator(themeId,x);
      return <button key={x} className={focus===x?"sel":""} onClick={()=>setFocus(x)}>{x}{generated?" · ∞":count?` (${count})`:""}</button>
    })}</div>

    <h3>4. Nível</h3><div className="levelGrid">{[
      ["auto","✨","Adaptado ao meu nível"],["basic","🟢","Básico"],["mid","🔵","Intermédio"],["adv","🟣","Avançado"],["challenge","🔥","Desafio"]
    ].map(x=><button key={x[0]} className={level===x[0]?"sel":""} onClick={()=>setLevel(x[0])}><span>{x[1]}</span><b>{x[2]}</b></button>)}</div>

    {available
      ? <div className="trainingSummary"><b>{current.short} → {focus}</b><span>{exactGenerated
        ?"Este foco já tem variantes paramétricas validadas: os números mudam, mas a resposta é calculada por regras determinísticas."
        :exactCurated
        ?`${exactCurated} questões curadas correspondem diretamente a este foco.`
        :"A A+ usará perguntas próximas do mesmo tema enquanto este foco é expandido."}</span></div>
      : <div className="notice"><b>Conteúdo ainda em construção</b><span>A taxonomia já contém esta área, mas o banco de perguntas desta versão ainda não tem itens suficientes para a treinar de forma honesta.</span></div>}

    <button className="primary" disabled={!available} onClick={()=>{
      const ses=sessionStart("training",{themeId,focus,level});
      setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("training_started",{sessionId:ses.id,themeId,focus,level})]}));
      start({themeId,focus,level});
    }}>Começar treino</button>
  </Shell>
}

function TrainingRun({s,setS,go,cfg,recoveredDraft=null,onRecovered=()=>{}}){
  const completingRef=useRef(false);
  if(!cfg)return <Shell><Back go={go} to="train"/><h1>Escolhe primeiro o que queres treinar.</h1></Shell>;
  const draft=recoveredDraft || (typeof window!=="undefined" ? loadSessionDraft(s.betaMode||"internal") : null);
  const [sessionId]=useState(()=>draft?.sessionId||latestOpenSessionId(s,"training"));
  const questions=useMemo(()=>draft?.questions||trainingQuestions(s,cfg,4),[]);
  const [i,setI]=useState(draft?.i||0);
  const [sel,setSel]=useState(draft?.sel??null);
  const [fb,setFb]=useState(draft?.fb??null);
  const [correct,setCorrect]=useState(draft?.correct||0);
  const [done,setDone]=useState(false);
  const q=questions[i];

  useEffect(()=>{if(draft)onRecovered()},[]);

  useEffect(()=>{
    if(done || !questions.length)return;
    saveSessionDraft({kind:"training",betaMode:s.betaMode||"internal",sessionId,cfg,questions,i,sel,fb,correct});
  },[cfg,questions,i,sel,fb,correct,done]);

  if(!questions.length)return <Shell><Back go={go} to="train"/><h1>Ainda não há perguntas suficientes neste foco.</h1></Shell>;

  function answer(n){if(!fb){setSel(n);setFb({correct:n===q.a})}}
  function next(){
    const was=sel===q.a;
    const newCorrect=correct+(was?1:0);
    if(was)setCorrect(newCorrect);
    if(i===questions.length-1){
      if(completingRef.current)return;
      completingRef.current=true;

      if(!claimSessionCompletion(sessionId)){
        clearSessionDraft(s.betaMode||"internal");
        setDone(true);
        return;
      }

      const ratio=newCorrect/questions.length;
      const potential=ratio>=.75 && cfg.level!=="basic";
      setS(prev=>{
        const sessions=[...(prev.betaSessions||[])];
        const openIdx=[...sessions].map(x=>x.kind==="training"&&!x.finishedAt).lastIndexOf(true);
        if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length});
        const base={
          ...prev,
          xp:prev.xp+newCorrect*10,
          betaSessions:sessions,
          betaEvents:[...(prev.betaEvents||[]),betaEvent("training_finished",{sessionId:sessionId||null,themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length})],
          freeTrainingSignals:potential?[
            ...(prev.freeTrainingSignals||[]).filter(x=>!(x.themeId===cfg.themeId && x.focus===cfg.focus && !x.confirmed)),
            {
              themeId:cfg.themeId,focus:cfg.focus,
              microcompetencyId:microcompetencyId(cfg.themeId,cfg.focus)||null,
              ratio,at:Date.now(),confirmed:false,originSessionId:sessionId||null
            }
          ]:(prev.freeTrainingSignals||[])
        };
        const activityAt=Date.now();
        let completed=recordStudyActivity(base,{
          kind:"training",
          xpEarned:newCorrect*10,
          sessionId:sessionId||null,
          at:activityAt
        });
        completed=recordCompetitiveActivity(completed,{
          kind:"training",
          total:questions.length,
          focusKey:microcompetencyId(cfg.themeId,cfg.focus)||`${cfg.themeId}:${cfg.focus||""}`,
          sessionId:sessionId||null,
          at:activityAt
        });
        return completed;
      });
      clearSessionDraft(s.betaMode||"internal");
      setDone(true);return;
    }
    setI(i+1);setSel(null);setFb(null);
  }

  if(done){
    const ratio=correct/questions.length;
    const potential=ratio>=.75 && cfg.level!=="basic";
    return <Shell><div className="centered"><Logo/><div className="check">✓</div>
      <p className="eyebrow">TREINO CONCLUÍDO</p><h1>{correct}/{questions.length} corretas</h1>
      <p className="muted">{theme(cfg.themeId).short} → {cfg.focus}</p></div>
      {potential?<div className="notice"><b>Possível evolução detetada</b><span>O Treino Livre não altera o teu Domínio. A A+ guardou apenas um sinal e tentará confirmá-lo numa próxima Missão ou avaliação.</span></div>
      :<div className="notice"><b>Treino registado</b><span>Ganhaste XP pela prática, mas esta sessão não altera a avaliação pedagógica da A+.</span></div>}
      <FriendsBetaDisclaimer s={s}/>
      <DailyCompletionNote s={s}/>
      <CompetitionXpNote s={s}/>
      <BetaSessionFeedback s={s} setS={setS} kind="training"/>
      <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
      <button className="secondary" onClick={()=>go("train")}>Treinar outra coisa</button>
    </Shell>
  }

  return <Shell><Back go={go} to="train"/>
    <div className="topline"><Logo/><span>Treino Livre · {i+1}/{questions.length}</span></div>
    {draft&&<div className="resumeBanner"><b>↻ Treino retomado</b><span>As respostas anteriores desta sessão foram preservadas.</span></div>}
    <div className="activeArea"><span>🧠 Treino</span><b>{theme(cfg.themeId).short} · {q.focus}</b></div>
    {q.generated&&<div className="validatedVariant"><b>✓ Variante validada</b><span>Gerada por regras matemáticas fechadas · seed {q.variantSeed}</span></div>}
    <p className="eyebrow">{q.cognitive.toUpperCase()} · NÍVEL {q.difficulty}</p><h2>{q.q}</h2>
    <QuestionOptions q={q} sel={sel} fb={fb} answer={answer}/>
    {fb&&<div className={"feedback "+(fb.correct?"good":"bad")}><b>{fb.correct?"✓ Correto":"Ainda não."}</b><span>{q.sol}</span></div>}
    {fb&&<ReportButton item={q} s={s} setS={setS}/>}
    <button className="primary" disabled={!fb} onClick={next}>Continuar</button>
    <button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>
  </Shell>
}

function Progress({s,go}){
  const [year,setYear]=useState("12.º");
  const hypotheses=allLearningHypotheses(s,8);
  const activeHypotheses=hypotheses.filter(h=>h.active);
  const closedHypotheses=hypotheses.filter(h=>!h.active).slice(0,3);
  return <Shell><Back go={go}/><p className="eyebrow">PROGRESSO</p>
    <h1>O teu mapa de conhecimento.</h1>
    <p className="muted">Agora distinguimos o <b>tema</b> das competências dentro dele. Podes estar forte em zeros de funções e fraco em monotonia — a A+ já não mistura as duas coisas numa única conclusão.</p>
    <FriendsBetaDisclaimer s={s} compact/>
    <div className="chips">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>setYear(y)}>{y}</button>)}</div>

    {hypotheses.length>0&&<div className="hypothesisPanel"><div><small>MEMÓRIA PEDAGÓGICA · CICLO DE VIDA</small><h3>O que a app está a acompanhar</h3></div>
      {activeHypotheses.length>0?<>{activeHypotheses.slice(0,5).map(h=><div className={"hypothesisRow lifecycle-"+h.lifecycleStatus} key={h.key}>
        <span>{h.icon}</span>
        <div><b>{h.targetFocus||theme(h.targetThemeId)?.short}</b><small>{
          h.lifecycleStatus==="probable_prerequisite"
            ?`Base provável: ${h.prerequisiteFocus||theme(h.prerequisiteThemeId)?.short}. Vamos confirmar se continua a bloquear esta competência.`
            :h.lifecycleStatus==="probable_target"
              ?`A base ${h.prerequisiteFocus||theme(h.prerequisiteThemeId)?.short} tem respondido melhor; a dificuldade parece mais específica do alvo.`
              :h.lifecycleStatus==="ambiguous"
                ?"A evidência aponta em direções diferentes. A app não vai fingir que já sabe a causa."
                :`Ainda estamos a investigar se ${h.prerequisiteFocus||theme(h.prerequisiteThemeId)?.short} explica parte da dificuldade.`
        }</small><em className="hypothesisLifecycleLabel">{h.label}</em></div>
        <em>{h.observations} {h.observations===1?"verificação":"verificações"}</em>
      </div>)}</>:<div className="memoryQuiet"><b>Sem hipóteses ativas neste momento.</b><span>A app continua a observar o teu desempenho e reabre uma hipótese se surgirem novas contradições.</span></div>}

      {closedHypotheses.length>0&&<details className="closedHypotheses"><summary>Ver memória recente resolvida/desatualizada ({closedHypotheses.length})</summary>
        {closedHypotheses.map(h=><div className={"hypothesisRow closed lifecycle-"+h.lifecycleStatus} key={h.key}>
          <span>{h.icon}</span><div><b>{h.targetFocus||theme(h.targetThemeId)?.short}</b><small>{h.lifecycleStatus==="resolved"
            ?(h.resolutionReason||"A evidência recente permitiu fechar esta hipótese.")
            :"Passou demasiado tempo sem nova evidência causal. Não influencia a Missão até surgir um novo sinal."}</small><em className="hypothesisLifecycleLabel">{h.label}</em></div>
          <em>{h.reopenCount?`${h.reopenCount} reab.`:""}</em>
        </div>)}
      </details>}

      <p>Uma hipótese pode ganhar força, tornar-se ambígua, ser resolvida ou ficar desatualizada. Se aparecer nova evidência contraditória, pode ser reaberta. <b>Hipótese não é diagnóstico definitivo.</b></p>
    </div>}

    {byYear(year).map(t=>{
      const v=s.scores[t.id],has=v.domain!==null;
      return <div className={"prog "+(!has?"unmeasured":"")} key={t.id}>
        <div className="progHead"><b>{t.short}</b><small>{t.name}</small></div>
        {has?<>
          <span>Domínio estimado: {v.domain}/100</span><div className="bar"><i style={{width:v.domain+"%"}}/></div>
          <div className="certaintyRow"><span>Certeza da A+</span><b>{certaintyLabel(v.conf,v.evidence.length)}</b><small>{certaintyHelp(v.conf,v.evidence.length)}</small></div>
          <div className="evidenceMeta">{new Set(v.evidence.map(e=>e.signature)).size} evidências independentes · {new Set(v.evidence.map(e=>e.cognitive)).size} tipos de raciocínio</div>
          <div className="focusMap"><b>Competências dentro deste tema</b>{focusRows(s,t.id).map(f=><div key={f.focus} className={f.domain===null?"unknown":""}><span>{f.focus}</span><div className="focusMiniBar"><i style={{width:(f.domain??0)+"%"}}/></div><strong>{f.domain??"—"}</strong><small>{f.domain===null?"Sem evidência":certaintyLabel(f.conf,f.evidence.length)}</small></div>)}</div>
        </>:<div className="noEvidence"><b>Ainda sem estimativa</b><span>A A+ vai recolher evidência quando esta área se tornar relevante.</span></div>}
      </div>
    })}
    <div className="notice"><b>Domínio ≠ Certeza da A+</b><span><b>Domínio</b> é quanto a A+ estima que sabes. <b>Certeza da A+</b> é quão segura está dessa estimativa. Não mede a tua autoconfiança.</span></div>
    <div className="notice"><b>Variantes não contam como “provas novas” infinitas</b><span>Se responderes várias vezes ao mesmo molde com números diferentes, a A+ reconhece que são semanticamente semelhantes e reduz o peso dessas repetições na Certeza.</span></div>
  </Shell>
}

function Exams({s,go,startMini}){
  const last=s.lastExam;
  const miniAvailable=buildMiniExam(s,8).length;
  const miniReady=miniAvailable>=8;
  return <Shell><Back go={go}/><p className="eyebrow">EXAMES</p><h1>Avaliação em contexto de prova.</h1>
    <FriendsBetaDisclaimer s={s} compact/>
    <button className="exam examAction" disabled={!miniReady} onClick={()=>miniReady&&startMini()}>
      <div><b>⚡ Mini-exame A+</b><span>{miniReady?"8 questões · ~10–15 min · 10.º, 11.º e 12.º":`${miniAvailable}/8 questões elegíveis neste modo`}</span></div><strong>{miniReady?"Começar →":"🔒"}</strong>
    </button>
    {!miniReady&&<div className="notice warning"><b>Mini-exame protegido</b><span>O motor não encontrou 8 questões elegíveis segundo o estado editorial atual. Não completa a prova com conteúdo não aprovado só para atingir o número pretendido.</span></div>}
    {last&&<div className="lastExam"><div><small>ÚLTIMO MINI-EXAME</small><b>{String(last.score20).replace('.',',')}/20</b></div><span>{last.correctCount}/{last.total} corretas</span></div>}
    <div className="exam locked"><b>📝 Exame de treino A+</b><span>Prova completa · próxima etapa após validarmos o motor do Mini-exame</span></div>
    <div className="exam locked"><b>🏛️ Exames oficiais</b><span>🔒 A aguardar esclarecimento sobre utilização dos conteúdos oficiais</span></div>
    <div className="notice"><b>O que muda num Mini-exame?</b><span>Não há feedback pergunta a pergunta. O resultado só aparece no fim e a evidência tem mais peso pedagógico do que numa Missão. O resultado desta prova não é uma previsão da tua nota no Exame Nacional.</span></div>
  </Shell>
}

function MiniExamIntro({session,go}){
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Ainda não existem perguntas suficientes.</h1></Shell>;
  const years=[...new Set(session.questions.map(q=>theme(q.themeId).year))];
  return <Shell><Back go={go} to="exams"/><Logo/><p className="eyebrow">MINI-EXAME A+</p>
    <h1>Agora é prova. O feedback fica para o fim.</h1>
    <p className="muted">Este Mini-exame foi montado para dar cobertura ampla, e não apenas para atacar a tua maior fragilidade.</p>
    <div className="examIntroGrid">
      <div><span>📝</span><b>{session.questions.length} questões</b><small>Escolha múltipla nesta versão</small></div>
      <div><span>⏱</span><b>~10–15 min</b><small>Podes avançar ao teu ritmo</small></div>
      <div><span>📚</span><b>{years.join(' · ')}</b><small>Cobertura transversal</small></div>
    </div>
    <div className="notice"><b>Regras do Mini-exame</b><span>Podes voltar atrás e alterar respostas antes de entregar. Não mostramos se acertaste nem a resolução durante a prova.</span></div>
    <button className="primary" onClick={()=>go("miniExamRun")}>Começar Mini-exame</button>
  </Shell>
}

function MiniExamRun({session,setSession,go}){
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Sessão indisponível.</h1></Shell>;
  const i=session.current||0,q=session.questions[i],answer=session.answers[i];
  const answered=session.answers.filter(x=>x!==null).length;
  function choose(n){
    const answers=[...session.answers];answers[i]=n;setSession({...session,answers});
  }
  function move(n){setSession({...session,current:Math.max(0,Math.min(session.questions.length-1,n))})}
  return <Shell>
    <div className="topline"><Logo/><span>Mini-exame · {answered}/{session.questions.length} respondidas</span></div>
    <div className="examProgress"><div className="progress"><i style={{width:`${((i+1)/session.questions.length)*100}%`}}/></div><span>Questão {i+1} de {session.questions.length}</span></div>
    <div className="examQuestionMeta"><span>{theme(q.themeId).short}</span><b>{q.cognitive} · nível {q.difficulty}</b></div>
    <h2>{q.q}</h2>
    <div className="opts examOpts">{q.o.map((x,n)=><button key={`${q.id}-${n}`} className={answer===n?"sel":""} onClick={()=>choose(n)}><b>{String.fromCharCode(65+n)}</b>{x}</button>)}</div>
    <div className="examNav">
      <button className="secondary small" disabled={i===0} onClick={()=>move(i-1)}>← Anterior</button>
      {i<session.questions.length-1
        ? <button className="primary small" onClick={()=>move(i+1)}>Seguinte →</button>
        : <button className="primary small" onClick={()=>go("miniExamReview")}>Rever prova →</button>}
    </div>
    <button className="reviewLink" onClick={()=>go("miniExamReview")}>Ver mapa de respostas</button>
    <button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>
  </Shell>
}

function MiniExamReview({session,setSession,s,setS,go}){
  const submittingRef=useRef(false);
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Sessão indisponível.</h1></Shell>;
  const unanswered=session.answers.filter(x=>x===null).length;
  function jump(i){setSession({...session,current:i});go("miniExamRun")}
  function submit(){
    if(submittingRef.current)return;
    submittingRef.current=true;

    if(!claimSessionCompletion(session.sessionId)){
      clearSessionDraft(s.betaMode||"internal");
      go("miniExamResult");
      return;
    }

    const elapsed=Math.max(1,Math.round((Date.now()-session.startedAt)/1000));
    let updated=applyMiniExam(s,session.questions,session.answers,elapsed);
    const sessions=[...(updated.betaSessions||[])];
    const openIdx=[...sessions].map(x=>x.kind==="mini_exam"&&!x.finishedAt).lastIndexOf(true);
    if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{score20:updated.lastExam?.score20,total:session.questions.length});
    updated={
      ...updated,
      lastExam:updated.lastExam?{...updated.lastExam,completionId:session.sessionId||null}:updated.lastExam,
      examHistory:(updated.examHistory||[]).map((x,i,arr)=>i===arr.length-1?{...x,completionId:session.sessionId||null}:x),
      betaSessions:sessions,
      betaEvents:[...(updated.betaEvents||[]),betaEvent("mini_exam_finished",{sessionId:session.sessionId||null,score20:updated.lastExam?.score20,total:session.questions.length})]
    };
    const activityAt=Date.now();
    updated=recordStudyActivity(updated,{
      kind:"mini_exam",
      xpEarned:(updated.lastExam?.correctCount||0)*18,
      sessionId:session.sessionId||updated.lastExam?.completionId||null,
      at:activityAt
    });
    updated=recordCompetitiveActivity(updated,{
      kind:"mini_exam",
      total:session.questions.length,
      sessionId:session.sessionId||updated.lastExam?.completionId||null,
      at:activityAt
    });
    updated=refreshLearningHypotheses(updated,activityAt);
    clearSessionDraft(s.betaMode||"internal");
    setS(updated);go("miniExamResult");
  }
  return <Shell><Back go={go} to="miniExamRun"/><p className="eyebrow">REVER ANTES DE ENTREGAR</p><h1>Confirma as tuas respostas.</h1>
    <p className="muted">Ainda podes voltar a qualquer questão. A correção só acontece quando entregares.</p>
    <div className="answerMap">{session.questions.map((q,i)=><button key={q.id} className={session.answers[i]===null?"empty":"answered"} onClick={()=>jump(i)}><b>{i+1}</b><span>{session.answers[i]===null?"Por responder":String.fromCharCode(65+session.answers[i])}</span></button>)}</div>
    {unanswered>0&&<div className="notice warning"><b>{unanswered} {unanswered===1?"questão por responder":"questões por responder"}</b><span>Podes entregar assim, mas as não-respostas contam para o resultado. Pedagogicamente recebem um peso ligeiramente menor do que uma resposta explicitamente errada.</span></div>}
    <button className="primary" onClick={submit}>Entregar Mini-exame</button>
  </Shell>
}

function MiniExamResult({s,setS,go}){
  const r=s.lastExam;
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há resultado.</h1></Shell>;
  const questions=r.questionIds.map(id=>QUESTION_BANK.find(q=>q.id===id)).filter(Boolean);
  const wrong=questions.map((q,i)=>({q,i,answer:r.answers[i]})).filter(x=>x.answer!==x.q.a);
  const mins=Math.floor(r.elapsedSeconds/60),secs=r.elapsedSeconds%60;
  return <Shell><div className="centered"><Logo/><div className="check">✓</div><p className="eyebrow">MINI-EXAME CONCLUÍDO</p>
    <h1>{String(r.score20).replace('.',',')}<small className="scoreOut">/20</small></h1>
    <p className="muted">{r.correctCount}/{r.total} respostas corretas · {mins}:{String(secs).padStart(2,'0')}</p>
    <small className="resultDisclaimer">Resultado deste Mini-exame A+ — não é uma previsão da nota do Exame Nacional.</small></div>
    <FriendsBetaDisclaimer s={s}/>
    <DailyCompletionNote s={s}/>
    <CompetitionXpNote s={s}/>

    <div className="examChanges"><h3>O que mudou no teu mapa?</h3>{r.changes.map(c=>{
      const t=theme(c.themeId);
      const beforeLabel=certaintyLabel(c.before.conf,c.before.evidenceCount);
      const afterLabel=certaintyLabel(c.after.conf,c.after.evidenceCount);
      return <div className="examChange" key={c.themeId}><div><b>{t.short}</b><small>Domínio {c.before.domain??'—'} → {c.after.domain}/100</small></div><div><span>Certeza da A+</span><strong>{beforeLabel} → {afterLabel}</strong></div></div>
    })}</div>

    <div className="notice"><b>Porque é que esta prova pesa mais?</b><span>Num Mini-exame respondes sem ajuda nem feedback imediato e em contexto misto. Por isso esta evidência tem mais peso do que uma resposta de Missão — mas continua a ser apenas uma parte do teu histórico.</span></div>

    {wrong.length>0&&<div className="reviewWrong"><h3>Rever o que falhou</h3>{wrong.map(({q,i,answer})=><details key={q.id}><summary>Questão {i+1} · {theme(q.themeId).short}</summary><div className="wrongBody"><b>{q.q}</b><span>A tua resposta: {answer===null?'Sem resposta':`${String.fromCharCode(65+answer)} — ${q.o[answer]}`}</span><span>Resposta correta: {String.fromCharCode(65+q.a)} — {q.o[q.a]}</span><small>{q.sol}</small><ReportButton item={q} s={s} setS={setS} compact/></div></details>)}</div>}

    <BetaSessionFeedback s={s} setS={setS} kind="mini_exam"/>
    <button className="primary" onClick={()=>go("home")}>Voltar ao plano</button>
    <button className="secondary" onClick={()=>go("exams")}>Área de Exames</button>
  </Shell>
}

function AccountCloud({s,setS,go}){
  const cfg=cloudConfiguration();
  const [mode,setMode]=useState("signin");
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
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
        await cloudSignUp({name:name.trim()||"Aluno A+",email:email.trim(),password});
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

  return <Shell><Back go={go}/><p className="eyebrow">CONTA A+ · CLOUD SEGURA</p>
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
        <div><span>Conta autenticada</span><b>{user.name||"Aluno A+"}</b><small>{user.email}</small></div><strong>● online</strong>
      </div>

      <div className="cloudProgressCard">
        <div><span>Progresso local atual</span><b>{localIndex??"—"}<small>/100 índice parcial</small></b></div>
        <div><span>XP</span><b>{s.xp}</b></div>
        <div><span>Áreas com evidência</span><b>{measuredThemes(s).length}/{TAXONOMY.length}</b></div>
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

function IdentityLab({s,setS,go}){
  const identity=normalizeIdentity(s.identity);
  const [authState,setAuthState]=useState({loading:true,authConfigured:false});

  useEffect(()=>{
    let alive=true;
    fetch("/api/auth/capabilities",{cache:"no-store"})
      .then(r=>r.json()).then(x=>{if(alive)setAuthState({loading:false,...x})})
      .catch(()=>{if(alive)setAuthState({loading:false,authConfigured:false})});
    return ()=>{alive=false};
  },[]);

  function switchDemo(role){
    const next=demoIdentity(role);
    setS(prev=>({...prev,identity:next}));
  }

  function openRole(){
    go(defaultScreenForRole(normalizeIdentity(s.identity).activeRole));
  }

  function simulateParentAccept(){
    const pending=[...(s.parentInvites||[])].reverse().find(x=>x.status==="pending");
    if(!pending)return;
    const parent=demoIdentity("parent");
    if(pending.email)parent.email=pending.email;
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===pending.id?{
      ...x,status:"accepted",acceptedAt:Date.now(),parentEmail:parent.email,parentName:"Pai/Mãe Demo"
    }:x)}));
  }

  function confirmRemovalAsParent(){
    const link=activeParentLink(s.parentInvites||[]);
    if(!link?.removal)return;
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?confirmLinkRemoval(x,"parent"):x)}));
  }

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · IDENTIDADE & PERMISSÕES</p>
    <h1>Uma identidade. Papéis diferentes.</h1>
    <p className="muted">Nesta versão não criamos passwords. O modo abaixo serve apenas para testar a experiência dos vários papéis antes de ligarmos a sessão real do Neon Auth.</p>

    <div className={"authStatus "+(authState.authConfigured?"online":"demo")}>
      <span>{authState.authConfigured?"●":"○"}</span>
      <div><b>{authState.authConfigured?"Neon Auth disponível no ambiente":"Modo demo local"}</b>
        <small>{authState.authConfigured?"A infraestrutura existe; falta ligar a sessão real à interface.":"Sem autenticação real. Seguro para prototipagem, não para produção."}</small></div>
    </div>

    <div className="identityCard">
      <div><span>Pessoa ativa</span><b>{identity.displayName}</b><small>{identity.email}</small></div>
      <strong>{ROLES[identity.activeRole]?.icon} {ROLES[identity.activeRole]?.label}</strong>
    </div>

    <h3>Simular papel</h3>
    <div className="roleGrid">{Object.entries(ROLES).map(([role,meta])=><button key={role} className={identity.activeRole===role?"sel":""} onClick={()=>switchDemo(role)}>
      <span>{meta.icon}</span><b>{meta.label}</b>
      <small>{role==="student"?"Estudo, progresso e convites parentais":role==="parent"?"Acompanhamento do aluno":role==="reviewer"?"Revisão pedagógica":"Qualidade, beta e gestão"}</small>
    </button>)}</div>

    <button className="primary" onClick={openRole}>Abrir experiência de {ROLES[identity.activeRole]?.label}</button>
    <button className="secondary" onClick={()=>go("account")}>Conta A+ & Progresso na Cloud →</button>

    <div className="permissionMatrix"><h3>Permissões principais</h3>
      {[
        ["study","Estudar / fazer Missões"],
        ["parent_dashboard","Área parental"],
        ["review_content","Rever conteúdo"],
        ["beta_admin","Administrar beta"]
      ].map(([cap,label])=><div key={cap}><span>{label}</span><b className={can(identity,cap)?"allowed":"denied"}>{can(identity,cap)?"✓ Permitido":"— Não permitido"}</b></div>)}
    </div>

    <div className="demoActions"><h3>Teste rápido da ligação parental</h3>
      <button onClick={()=>go("parent")}>1. Criar convite como aluno →</button>
      <button disabled={!(s.parentInvites||[]).some(x=>x.status==="pending")} onClick={simulateParentAccept}>2. Simular aceitação pelo Pai/Mãe</button>
      <button disabled={!activeParentLink(s.parentInvites||[])?.removal} onClick={confirmRemovalAsParent}>3. Simular confirmação de remoção pelo Pai/Mãe</button>
    </div>

    <div className="notice"><b>Regra de segurança</b><span>Os papéis <b>Professor Revisor</b> e <b>Admin</b> nunca serão escolhidos no registo pelo próprio utilizador. Serão concedidos apenas por uma conta administrativa autorizada.</span></div>
    <div className="notice"><b>Sem pesquisa pública</b><span>Um Pai/Mãe não procura o nome do filho na plataforma. O aluno cria um convite privado, de utilização única e com validade limitada.</span></div>
  </Shell>
}

function Parent({s,setS,go}){
  const index=prepIndex(s),measured=measuredThemes(s);
  const identity=normalizeIdentity(s.identity);
  const link=activeParentLink(s.parentInvites||[]);
  const [email,setEmail]=useState("");
  const [copied,setCopied]=useState(false);

  function createInvite(){
    if(!email.trim())return;
    const invite=createParentInvite({studentName:identity.displayName,email});
    setS(prev=>({...prev,parentInvites:[...(prev.parentInvites||[]),invite]}));
    setEmail("");
  }

  function copyInvite(invite){
    const url=`https://aplus-exames.vercel.app/convite/${invite.token}`;
    if(navigator?.clipboard)navigator.clipboard.writeText(url);
    setCopied(true);setTimeout(()=>setCopied(false),1400);
  }

  function requestRemoval(){
    if(!link)return;
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?requestLinkRemoval(x,"student"):x)}));
  }

  return <Shell><Back go={go}/><p className="eyebrow">ÁREA DOS PAIS · MODELO DE LIGAÇÃO</p>
    <h1>Acompanhar progresso, não vigiar respostas.</h1>

    {!link&&<div className="parentConnect">
      <b>Ligar Pai/Mãe ou Encarregado de Educação</b>
      <span>Não existe pesquisa pública de utilizadores. A ligação nasce sempre de um convite privado criado pelo aluno.</span>
      <div><input type="email" placeholder="email do encarregado" value={email} onChange={e=>setEmail(e.target.value)}/><button disabled={!email.trim()} onClick={createInvite}>Criar convite</button></div>
      {(s.parentInvites||[]).filter(x=>x.status==="pending").slice(-3).reverse().map(inv=><div className="pendingInvite" key={inv.id}>
        <div><b>{inv.email}</b><small>Expira em 7 dias · uso único</small></div>
        <button onClick={()=>copyInvite(inv)}>{copied?"Copiado ✓":"Copiar link demo"}</button>
      </div>)}
      <small className="parentFoot">No produto real, o token é criado no servidor, guardamos apenas o hash e o convite é enviado por email. Este ecrã simula o fluxo localmente.</small>
    </div>}

    {link&&<>
      <div className="parent"><div><b>{link.parentName||"Pai/Mãe ligado"}</b><span>{link.parentEmail||link.email} · Matemática A</span></div><strong>{index??"—"}<small>/100*</small></strong></div>
      <small className="parentFoot">* índice ainda parcial enquanto o perfil está a ser construído</small>
      <div className="metrics"><div><b>🔥 {s.streak}</b><span>dias</span></div><div><b>{s.diagnosticAnswers}</b><span>respostas no diagnóstico</span></div><div><b>{measured.length}/{TAXONOMY.length}</b><span>áreas com evidência</span></div></div>
      {s.lastExam&&<div className="parentExam"><span>Último Mini-exame</span><b>{String(s.lastExam.score20).replace('.',',')}/20</b><small>{s.lastExam.correctCount}/{s.lastExam.total} corretas</small></div>}
      <div className="notice"><b>O que os pais veem?</b><span>Consistência, evolução, prioridades, tempo de estudo e resultados de avaliações — não cada resposta individual.</span></div>

      {!link.removal&&<button className="secondary" onClick={requestRemoval}>Pedir remoção da ligação</button>}
      {link.removal?.status==="awaiting_other_party"&&<div className="notice warning"><b>Remoção pendente de confirmação</b><span>O aluno pediu a remoção. A ligação mantém-se ativa até a outra parte confirmar. Este comportamento evita uma desvinculação silenciosa e unilateral.</span></div>}
    </>}
  </Shell>
}



function BetaDashboard({s,setS,go}){
  const sum=betaSummary(s);
  const retention=retentionSummary(s);
  const funnel=funnelSummary(s);
  const activation=activationSummary(s);
  const engineAudit=engineAuditSummary(s);
  const integrityAudit=dataIntegrityAudit(s);
  const contentReadiness=betaContentReadiness(s.editorialOverrides||{},s.contentReports||[]);
  const reviewRoadmap=reviewRoadmapProgress(s.editorialOverrides||{},s.contentReports||[]);
  const eligibility=eligibilitySummary(QUESTION_BANK,s.editorialOverrides||{},s.betaMode||"internal");
  const [code,setCode]=useState(s.betaParticipant?.code||"");
  const [cohort,setCohort]=useState(s.betaParticipant?.cohort||"Piloto Matemática A");
  const [infra,setInfra]=useState({loading:true,configured:false});
  const [syncing,setSyncing]=useState(false);
  const [syncMessage,setSyncMessage]=useState("");
  const [externalReports,setExternalReports]=useState([]);
  const [externalReportMessage,setExternalReportMessage]=useState("");

  useEffect(()=>{
    let live=true;
    backendHealth().then(x=>{if(live)setInfra({loading:false,...x})});
    return ()=>{live=false};
  },[]);

  function saveParticipant(){
    setS(prev=>({...prev,betaParticipant:{code,cohort}}));
  }

  async function syncNow(){
    setSyncing(true);setSyncMessage("");
    const attemptedAt=Date.now();
    const result=await syncStateToBackend({...s,betaParticipant:{code,cohort}});
    setS(prev=>({...prev,syncMeta:{
      ...(prev.syncMeta||{}),
      lastAttemptAt:attemptedAt,
      lastSuccessAt:result.ok?Date.now():(prev.syncMeta?.lastSuccessAt||null),
      lastStatus:result.ok?"synced":(result.code||"failed")
    }}));
    setSyncMessage(result.ok?"Sincronização concluída.":(["BACKEND_NOT_CONFIGURED","DATABASE_NOT_CONFIGURED"].includes(result.code)?"Neon ainda não está ligado — os dados continuam seguros neste navegador.":"Não foi possível sincronizar. Os dados locais não foram apagados."));
    setSyncing(false);
  }

  function download(){
    const payload=exportBetaPayload(s);
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`aplus-beta-${s.betaParticipant?.code||"participante"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function importFriendReports(files){
    const list=[...(files||[])];
    if(!list.length)return;
    const parsed=[];
    let rejected=0;
    for(const file of list){
      try{
        const data=JSON.parse(await file.text());
        if(["aplus-friends-beta-v2","aplus-friends-beta-v3"].includes(data?.schema))parsed.push(data);
        else rejected++;
      }catch{rejected++}
    }
    setExternalReports(prev=>{
      const byCode=new Map();
      [...prev,...parsed].forEach(r=>byCode.set(r?.participant?.code||`${r?.exportedAt}-${Math.random()}`,r));
      return [...byCode.values()];
    });
    setExternalReportMessage(`${parsed.length} relatório(s) válido(s) importado(s)${rejected?` · ${rejected} rejeitado(s)`:""}.`);
  }

  const externalAggregate=aggregateFriendsBetaReports(externalReports);

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · BETA PILOTO</p>
    <h1>Medir antes de escalar.</h1>
    <p className="muted">Este painel permite testar a experiência num único dispositivo. Numa beta real, estes dados serão agregados num backend.</p>

    <div className="betaIdentity">
      <label>Código do participante<input value={code} onChange={e=>setCode(e.target.value)}/></label>
      <label>Coorte<input value={cohort} onChange={e=>setCohort(e.target.value)}/></label>
      <button onClick={saveParticipant}>Guardar</button>
    </div>

    <section className="backendCard">
      <div className="backendHead"><div><small>INFRAESTRUTURA DE DADOS</small><b>{infra.loading?"A verificar…":infra.backendConfigured?(infra.backendReachable?"Neon Postgres ligado":"Neon configurado · ligação por verificar"):"Local-first · Neon ainda não ligado"}</b></div><span className={infra.backendConfigured&&infra.backendReachable?"online":"local"}>{infra.backendConfigured?(infra.backendReachable?"● online":"● configuração"):"● local"}</span></div>
      <p>A aplicação grava sempre primeiro neste dispositivo. Quando o backend estiver configurado, o mesmo estado pode ser sincronizado através da API server-side sem expor credenciais no browser.</p>
      <div className="backendNumbers"><span>{(s.betaEvents||[]).length} eventos</span><span>{(s.betaSessions||[]).length} sessões</span><span>{(s.contentReports||[]).length} reports</span></div>
      <button disabled={syncing} onClick={syncNow}>{syncing?"A sincronizar…":"Sincronizar agora"}</button>
      {syncMessage&&<small className="syncMessage">{syncMessage}</small>}
      {s.syncMeta?.lastAttemptAt&&<small className="syncMeta">Última tentativa: {new Date(s.syncMeta.lastAttemptAt).toLocaleString("pt-PT")} · {s.syncMeta.lastStatus}</small>}
    </section>

    <div className="qaMetrics betaMetrics">
      <div><span>Sessões concluídas</span><b>{sum.sessions}</b><small>neste dispositivo</small></div>
      <div><span>Conclusão</span><b>{sum.completionRate}%</b><small>inícios → fins</small></div>
      <div><span>Feedbacks</span><b>{sum.feedbackCount}</b><small>qualitativos</small></div>
      <div><span>Reports</span><b>{sum.reports}</b><small>problemas de conteúdo</small></div>
    </div>

    <section className="qaSection retentionPanel">
      <div className="externalBetaHead"><div><small>FUNIL + RETENÇÃO</small><h3>A experiência cria hábito ou só uma boa primeira impressão?</h3></div><span>{retention.activeDays} dia{retention.activeDays===1?"":"s"} ativo{retention.activeDays===1?"":"s"}</span></div>
      <p>Estes números vêm de aberturas reais desta instalação, não da pergunta “voltarias amanhã?”. D1/D3/D7 só entram no denominador quando já passou tempo suficiente.</p>

      <div className="retentionCards">
        {[
          ["D1",retention.d1],
          ["D3",retention.d3],
          ["D7",retention.d7]
        ].map(([label,r])=><div key={label} className={r.eligible?(r.retained?"retained":"missed"):"waiting"}>
          <span>{label}</span><b>{!r.eligible?"…":r.retained?"✓":"×"}</b>
          <small>{!r.eligible?"Ainda não elegível":r.retained?"Regressou nesse dia":"Não abriu nesse dia"}</small>
        </div>)}
        <div className={activation.activated?"retained":"waiting"}><span>Ativação</span><b>{activation.activated?"✓":"…"}</b><small>{activation.activated?`Diagnóstico + 1.ª Missão${activation.minutesToActivation!==null?` · ${activation.minutesToActivation} min`:""}`:"Falta concluir diagnóstico + 1.ª Missão"}</small></div>
      </div>

      <div className="funnelRows">{funnel.map((step,i)=><div key={step.id} className={step.reached?"reached":"pending"}>
        <b>{i+1}</b><span>{step.label}</span><em>{step.reached?"✓":"—"}</em>
      </div>)}</div>

      <small className="auditFoot">Retenção mede abertura da app, enquanto streak mede estudo efetivo. São métricas diferentes de propósito.</small>
    </section>

    <section className="externalBetaReports">
      <div className="externalBetaHead"><div><small>RELATÓRIOS DOS TESTERS</small><h3>Separar alunos de observadores</h3></div><span>{externalAggregate.validReports} testers</span></div>
      <p>Importa aqui os JSON enviados pelos testers. Os ficheiros são analisados apenas neste browser e os resultados são separados pelo tipo de tester.</p>
      <label className="externalReportUpload">Importar relatórios JSON<input type="file" accept=".json,application/json" multiple onChange={e=>importFriendReports(e.target.files)}/></label>
      {externalReportMessage&&<small className="externalReportMessage">{externalReportMessage}</small>}
      {externalAggregate.validReports>0&&<>
        <div className="testerGroupCards">
          {[
            ["target","Alunos atuais"],
            ["near_target","Ex-alunos recentes"],
            ["buyer","Pais / mães"],
            ["observer","Observadores adultos"]
          ].map(([key,label])=>{
            const g=externalAggregate.byFit[key];
            return <div key={key} className={key==="target"?"targetGroup":""}>
              <span>{label}</span><b>{g.testers}</b><small>{g.sessionsPerTester} sessões/tester</small>
              <em>Intenção de voltar: {g.returnIntent??"—"}/5</em>
              <em>D1 real: {g.d1?.rate??"—"}% ({g.d1?.eligible||0} eleg.)</em>
              <em>Ativação: {g.activation?.rate??"—"}%</em>
              <em>Personalização: {g.personalization??"—"}/5</em>
            </div>
          })}
        </div>
        <div className="targetSignalCard">
          <b>{externalAggregate.byFit.target.testers>=5?"Já há um pequeno sinal do público-alvo":"Ainda precisamos de mais alunos reais"}</b>
          <span>{externalAggregate.byFit.target.testers
            ?`${externalAggregate.byFit.target.testers} aluno(s) atual(is) · ativação ${externalAggregate.byFit.target.activation?.rate??"—"}% · D1 real ${externalAggregate.byFit.target.d1?.rate??"—"}% (${externalAggregate.byFit.target.d1?.eligible||0} elegíveis) · intenção declarada ${externalAggregate.byFit.target.returnIntent??"—"}/5.`
            :"Os elogios de adultos continuam úteis para UX/conceito, mas esta caixa só começa a validar adesão quando entram alunos do secundário."}</span>
        </div>
      </>}
    </section>

    <section className="qaSection betaGoNoGo">
      <div className="engineHealthHead"><div><small>GO / NO-GO DA BETA</small><h3>Conteúdo pronto para beta pedagógica fechada?</h3></div><span className={contentReadiness.canClosedBeta?"healthy":"attention"}>{contentReadiness.canClosedBeta?"GO":"NO-GO"}</span></div>
      <div className="betaGoScore"><b>{contentReadiness.score}%</b><div className="readinessBar"><i style={{width:contentReadiness.score+"%"}}/></div></div>
      <p>{contentReadiness.canClosedBeta
        ?"Os critérios mínimos de conteúdo revisto estão cumpridos. Ainda é necessário confirmar infraestrutura e QA da versão a distribuir."
        :"A beta de experiência com amigos pode testar UX, clareza e engagement, mas ainda não devemos interpretar esses resultados académicos como pedagogicamente fiáveis enquanto estes bloqueios não forem resolvidos."}</p>
      {!contentReadiness.canClosedBeta&&<div className="readinessBlockers">{contentReadiness.blockers.slice(0,4).map((x,i)=><span key={i}>• {x}</span>)}</div>}
      {!contentReadiness.canClosedBeta&&<div className="goRoadmapSummary"><b>{reviewRoadmap.approvalsNeeded} aprovações no caminho mínimo</b><span>≈ {reviewRoadmap.estimatedHours} h de revisão a 5 min/questão</span></div>}
    </section>

    <section className="qaSection engineHealth"><div className="engineHealthHead"><div><small>AUDITORIA DO ORQUESTRADOR</small><h3>Saúde do motor</h3></div><span className={engineAudit.status}>{engineAuditLabel(engineAudit.status)}</span></div>
      <div className="perceptionGrid">
        <div><span>Maior sequência no mesmo tema</span><b>{engineAudit.maxSameThemeRun||0}</b></div>
        <div><span>Calibração</span><b>{engineAudit.calibrationRate}%</b></div>
        <div><span>Fim por pouca informação</span><b>{engineAudit.lowInfoRate}%</b></div>
      </div>
      {engineAudit.missions<5
        ?<div className="qaEmpty">Precisamos de pelo menos 5 Missões para avaliar padrões do motor.</div>
        :engineAudit.warnings.length===0
          ?<div className="engineHealthy">✓ Não foram detetados padrões problemáticos no histórico atual.</div>
          :<div className="engineWarnings">{engineAudit.warnings.map(w=><div key={w.code} className={w.severity}><b>{w.title}</b><span>{w.detail}</span></div>)}</div>}
      <small className="auditFoot">Esta auditoria não altera o plano do aluno. Serve apenas para detetar comportamentos anómalos durante desenvolvimento e beta.</small>
    </section>

    <section className="qaSection integrityHealth">
      <div className="engineHealthHead"><div><small>INTEGRIDADE DOS DADOS</small><h3>Sessões sem duplicação</h3></div><span className={integrityAudit.status}>{integrityAudit.status==="healthy"?"Saudável":integrityAudit.status==="attention"?"Requer atenção":"A observar"}</span></div>
      <div className="perceptionGrid">
        <div><span>Conclusões duplicadas</span><b>{integrityAudit.duplicateCompletions}</b></div>
        <div><span>IDs duplicados</span><b>{integrityAudit.duplicateSessionIds+integrityAudit.duplicateEventIds}</b></div>
        <div><span>Sessões ainda abertas</span><b>{integrityAudit.openSessions}</b></div>
      </div>
      {integrityAudit.issues.length===0
        ?<div className="engineHealthy">✓ Não foram encontrados sinais de dupla contabilização ou telemetria inconsistente.</div>
        :<div className="engineWarnings">{integrityAudit.issues.map(x=><div key={x.code} className={x.severity}><b>{x.title}</b><span>{x.detail}</span></div>)}</div>}
      <small className="auditFoot">As conclusões de Missão, Treino e Mini-exame usam agora uma chave de idempotência local antes de alterar o progresso.</small>
    </section>

    <section className="qaSection"><h3>Perceção dos alunos</h3>
      <div className="perceptionGrid">
        <div><span>Clareza</span><b>{sum.avgClarity??"—"}/5</b></div>
        <div><span>Dificuldade adequada</span><b>{sum.avgDifficultyFit??"—"}/5</b></div>
        <div><span>Utilidade</span><b>{sum.avgUsefulness??"—"}/5</b></div>
      </div>
    </section>

    <section className="qaSection"><h3>Duração por tipo de sessão</h3>
      <div className="sessionRows">{Object.entries(sum.byKind).length===0?<div className="qaEmpty">Ainda sem sessões concluídas.</div>:
        Object.entries(sum.byKind).map(([kind,v])=><div key={kind}><b>{kind}</b><span>{v.count} sessões</span><small>média {Math.round(v.totalSeconds/v.count/60*10)/10} min</small></div>)}
      </div>
    </section>

    <section className="qaSection"><h3>Modo de conteúdo</h3>
      <div className="betaModeChoices">
        {[
          ["internal","Interno","Pode usar conteúdo protótipo; serve para desenvolvimento."],
          ["closed_beta","Beta fechada","Os gates são aplicados pelo motor: Diagnóstico/Missões/Exames exigem conteúdo revisto."],
          ["production","Produção","O motor só seleciona conteúdo formalmente revisto."]
        ].map(([v,l,d])=><button key={v} className={(s.betaMode||"internal")===v?"sel":""} onClick={()=>setS(prev=>({...prev,betaMode:v}))}><b>{l}</b><span>{d}</span></button>)}
      </div>
      <div className="eligibilityTable">
        {["diagnostic","mission","training","exam"].map(ctx=><div key={ctx}><b>{ctx}</b><span>{eligibility[ctx].eligible}/{eligibility[ctx].total} elegíveis</span><small>{eligibility[ctx].blocked} bloqueados pelo gate</small></div>)}
      </div>
    </section>

    {(s.betaMode||"internal")!=="internal" && eligibility.diagnostic.eligible===0&&<div className="notice warning"><b>Gate de publicação aplicado pelo motor</b><span>Neste momento não existem questões de Diagnóstico formalmente revistas suficientes para este modo. O motor deixa de as selecionar — não é apenas um aviso visual.</span></div>}

    <section className="qaSection"><h3>Últimos feedbacks</h3>
      {(s.betaFeedback||[]).length===0?<div className="qaEmpty">Ainda sem feedback.</div>:<div className="feedbackRows">{[...(s.betaFeedback||[])].reverse().slice(0,12).map(f=><div key={f.id}><div><b>{f.kind}</b><small>{new Date(f.at).toLocaleString("pt-PT")}</small></div><span>Clareza {f.clarity}/5 · dificuldade {f.difficultyFit}/5 · utilidade {f.usefulness}/5</span>{f.comment&&<em>{f.comment}</em>}</div>)}</div>}
    </section>

    <div className="notice"><b>Backend Ready</b><span>A v2.3 já escreve diretamente em Neon Postgres através da API server-side. Sem `DATABASE_URL`, a app continua local-first e nunca perde os dados do navegador.</span></div>
    <button className="exportBeta" onClick={download}>Exportar dados deste participante (.json)</button>
    <div className="notice"><b>Privacidade na beta real</b><span>Devemos recolher apenas o necessário, informar os participantes do que é medido e evitar dados pessoais desnecessários. O código de participante pode ser pseudónimo.</span></div>
  </Shell>
}

function BetaSessionFeedback({s,setS,kind}){
  const [done,setDone]=useState(false);
  const [clarity,setClarity]=useState(4);
  const [difficultyFit,setDifficultyFit]=useState(4);
  const [usefulness,setUsefulness]=useState(4);
  const [personalization,setPersonalization]=useState(4);
  const [returnIntent,setReturnIntent]=useState(4);
  const [comment,setComment]=useState("");
  const friends=isFriendsBeta(s);
  const segment=currentTesterSegment(s);
  const target=isTargetStudentTester(s);
  const showExperience=friends&&["diagnostic","mission","mini_exam"].includes(kind);

  if(done)return <div className="betaThanks">✓ Feedback guardado. Obrigado por ajudares a melhorar a A+.</div>;

  function save(){
    const row={
      id:`fb-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      kind,at:Date.now(),clarity,difficultyFit,usefulness,comment,
      testerSegment:segment||null,
      testerGroup:testerSegmentInfo(segment).group,
      targetTester:target,
      personalization:showExperience?personalization:null,
      returnIntent:showExperience?returnIntent:null
    };
    setS(prev=>({...prev,
      betaFeedback:[...(prev.betaFeedback||[]),row],
      betaEvents:[...(prev.betaEvents||[]),betaEvent("beta_feedback",{
        kind,clarity,difficultyFit,usefulness,
        testerSegment:segment||null,
        targetTester:target,
        personalization:showExperience?personalization:null,
        returnIntent:showExperience?returnIntent:null
      })]
    }));
    setDone(true);
  }

  return <div className="betaFeedback"><b>{friends?"Ajuda-nos a perceber a experiência":"Ajuda-nos a calibrar a beta"}</b>
    <span>1 = fraco · 5 = excelente</span>
    <label>As perguntas foram claras?<input type="range" min="1" max="5" value={clarity} onChange={e=>setClarity(Number(e.target.value))}/><em>{clarity}/5</em></label>
    <label>A dificuldade pareceu adequada?<input type="range" min="1" max="5" value={difficultyFit} onChange={e=>setDifficultyFit(Number(e.target.value))}/><em>{difficultyFit}/5</em></label>
    <label>Esta sessão foi útil?<input type="range" min="1" max="5" value={usefulness} onChange={e=>setUsefulness(Number(e.target.value))}/><em>{usefulness}/5</em></label>
    {showExperience&&<>
      <label>Sentiste que a app reagiu ao que tinhas feito antes?<input type="range" min="1" max="5" value={personalization} onChange={e=>setPersonalization(Number(e.target.value))}/><em>{personalization}/5</em></label>
      <label>{target?"Se estivesses a estudar para o exame, voltarias amanhã?":"Se fosses aluno hoje, achas que isto daria vontade de voltar no dia seguinte?"}<input type="range" min="1" max="5" value={returnIntent} onChange={e=>setReturnIntent(Number(e.target.value))}/><em>{returnIntent}/5</em></label>
    </>}
    <textarea placeholder={friends?"O que te fez gostar, hesitar ou ter vontade de sair?":"Comentário opcional"} value={comment} onChange={e=>setComment(e.target.value)}/>
    <button onClick={save}>Enviar feedback</button>
  </div>
}

function ReviewerDashboard({s,setS,go}){
  const [statusFilter,setStatusFilter]=useState("prototype");
  const [themeFilter,setThemeFilter]=useState("all");
  const [selectedId,setSelectedId]=useState(null);
  const [note,setNote]=useState("");
  const [reviewer,setReviewer]=useState("Professor Revisor");
  const [checklist,setChecklist]=useState({
    math:false,clarity:false,unique:false,distractors:false,
    solution:false,taxonomy:false,difficulty:false,hypothesis:false
  });
  const [importPreview,setImportPreview]=useState(null);
  const [importFileName,setImportFileName]=useState("");
  const [importMessage,setImportMessage]=useState("");
  const [revisionOpen,setRevisionOpen]=useState(false);
  const [revisionDraft,setRevisionDraft]=useState(null);
  const [revisionMessage,setRevisionMessage]=useState("");

  const queue=editorialQueue(QUESTION_BANK,s.editorialOverrides||{},s.contentReports||[]);
  const stats=editorialStats(queue);
  const urgent=urgentReviewItems(queue);
  const readiness=betaContentReadiness(s.editorialOverrides||{},s.contentReports||[]);
  const priorityQueue=prioritizedReviewQueue(s.editorialOverrides||{},s.contentReports||[],30);
  const roadmap=reviewRoadmapProgress(s.editorialOverrides||{},s.contentReports||[]);
  const reviewOps=useMemo(
    ()=>teacherReviewOperationsSummary(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridPlan=useMemo(
    ()=>hybridValidationPlan(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridSummary=useMemo(
    ()=>hybridValidationSummary(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridReadiness=useMemo(
    ()=>hybridBetaReadiness(s.editorialOverrides||{},s.contentReports||[]),
    [s.editorialOverrides,s.contentReports]
  );
  const hybridOps=useMemo(
    ()=>buildHybridTeacherBatches(s.editorialOverrides||{},s.contentReports||[],{reviewer}),
    [s.editorialOverrides,s.contentReports,reviewer]
  );
  const allChecks=Object.values(checklist).every(Boolean);

  const filtered=queue.filter(row=>{
    const okStatus=statusFilter==="all" || row.status===statusFilter;
    const okTheme=themeFilter==="all" || row.item.themeId===themeFilter;
    return okStatus && okTheme;
  });

  const selected=queue.find(x=>x.item.id===selectedId) || filtered[0] || null;
  const selectedQa=selected?qaForItemId(selected.item.id,s.editorialOverrides||{}):null;
  const selectedHybrid=selected?hybridLaneForItem(selected.item,s.editorialOverrides||{}):null;
  const revisionStats=editorialRevisionSummary(s.editorialOverrides||{});
  const revisionValidation=useMemo(
    ()=>selected&&revisionDraft?validateRevisionCandidate(selected.item,revisionDraft):null,
    [selected?.item?.id,selected?.currentFingerprint,revisionDraft]
  );

  useEffect(()=>{
    setRevisionOpen(false);
    setRevisionDraft(null);
    setRevisionMessage("");
  },[selected?.item?.id]);

  function openRevisionEditor(){
    if(!selected)return;
    setRevisionDraft(revisionCandidateFromItem(selected.item));
    setRevisionOpen(true);
    setRevisionMessage("");
  }

  function applyRevision(){
    if(!selected||!revisionDraft)return;
    const result=applyContentRevision(
      s.editorialOverrides||{},
      selected.item.id,
      revisionDraft,
      {
        editor:"Equipa editorial",
        note:note.trim()||"Alteração pedida na revisão pedagógica",
        requestedBy:(s.editorialOverrides||{})[selected.item.id]?.reviewer||reviewer||null
      }
    );
    if(!result.ok){
      setRevisionMessage((result.errors||[]).join(" · ")||"Não foi possível aplicar a alteração.");
      return;
    }
    setS(prev=>({...prev,editorialOverrides:result.overrides}));
    setRevisionDraft(revisionCandidateFromItem(result.item));
    setRevisionOpen(false);
    setRevisionMessage(`Nova versão v${result.revision.toVersion} criada. A aprovação anterior deixou de valer e a questão voltou a “A rever”.`);
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
  }

  function revertRevision(){
    if(!selected)return;
    const result=revertLastContentRevision(
      s.editorialOverrides||{},
      selected.item.id,
      {editor:"Equipa editorial",note:"Reversão manual da última alteração"}
    );
    if(!result.ok){
      setRevisionMessage(result.reason||"Não foi possível reverter.");
      return;
    }
    setS(prev=>({...prev,editorialOverrides:result.overrides}));
    setRevisionOpen(false);
    setRevisionDraft(null);
    setRevisionMessage(`Reversão aplicada como nova versão v${result.revision.toVersion}. Continua a exigir nova revisão pedagógica.`);
  }

  function decide(decision){
    if(!selected)return;
    if(decision==="approve"&&(selectedQa?.blockerCount||0)>0){
      setRevisionMessage("Esta questão tem bloqueios automáticos de pré-QA. Corrige-os antes de aprovar.");
      return;
    }
    const next=applyEditorialDecision(
      s.editorialOverrides||{},
      selected.item.id,
      decision,
      {
        reviewer,
        note,
        checklist:decision==="approve"?checklist:null,
        source:"in_app"
      }
    );
    setS(prev=>({...prev,editorialOverrides:next}));
    setNote("");
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
    const idx=filtered.findIndex(x=>x.item.id===selected.item.id);
    const nextRow=filtered[idx+1]||filtered[idx-1];
    if(decision==="changes"){
      setSelectedId(selected.item.id);
      setRevisionDraft(revisionCandidateFromItem(selected.item));
      setRevisionOpen(true);
      setRevisionMessage("Pedido de alteração registado. Podes agora preparar a nova versão lado a lado.");
    }else{
      setSelectedId(nextRow?.item.id||null);
    }
  }

  function bump(){
    openRevisionEditor();
  }

  function createBatch(){
    const ids=makeReviewBatch(queue,{
      size:12,
      themeId:themeFilter==="all"?null:themeFilter,
      status:statusFilter==="all"?"prototype":statusFilter
    });
    if(!ids.length)return;
    const batch={
      id:`batch-${Date.now()}`,
      createdAt:Date.now(),
      reviewer,
      itemIds:ids,
      status:"open"
    };
    setS(prev=>({...prev,reviewBatches:[...(prev.reviewBatches||[]),batch]}));
    setSelectedId(ids[0]);
  }

  function createPriorityBatch(){
    const ids=priorityQueue.slice(0,12).map(x=>x.item.id);
    if(!ids.length)return;
    const batch={
      id:`priority-batch-${Date.now()}`,
      createdAt:Date.now(),
      reviewer,
      itemIds:ids,
      status:"open",
      kind:"beta_priority"
    };
    setS(prev=>({...prev,reviewBatches:[...(prev.reviewBatches||[]),batch]}));
    setStatusFilter("all");
    setThemeFilter("all");
    setSelectedId(ids[0]);
  }

  function csvEscape(value){
    const s=String(value??"");
    return `"${s.replace(/"/g,'""')}"`;
  }

  function downloadCsv(csv,fileName){
    const blob=new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=fileName;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPriorityPack(){
    const rows=reviewPackRows(s.editorialOverrides||{},s.contentReports||[],30);
    if(!rows.length)return;
    const headers=Object.keys(rows[0]);
    const csv=[
      headers.map(csvEscape).join(";"),
      ...rows.map(r=>headers.map(h=>csvEscape(r[h])).join(";"))
    ].join("\n");
    downloadCsv(csv,`revisao-professor-prioridades-${Date.now()}.csv`);
  }

  function exportExternalReviewPack(){
    const rows=buildTeacherReviewPack(
      s.editorialOverrides||{},
      s.contentReports||[],
      {roadmapOnly:true,reviewer}
    );
    if(!rows.length)return;
    downloadCsv(
      serializeSemicolonCsv(rows),
      `revisao-professor-caminho-beta-${rows.length}-questoes.csv`
    );
  }

  function exportOperationalBatch(batch){
    if(!batch?.rows?.length)return;
    const n=String(batch.index).padStart(2,"0");
    downloadCsv(
      serializeSemicolonCsv(batch.rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-lote-${n}-${batch.count}-questoes.csv`
    );
  }

  function exportHybridBatch(batch){
    if(!batch?.rows?.length)return;
    const n=String(batch.index).padStart(2,"0");
    downloadCsv(
      serializeSemicolonCsv(batch.rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-hibrido-lote-${n}-${batch.count}-questoes.csv`
    );
  }

  function exportHybridFullPack(){
    const rows=hybridOps.batches.flatMap(batch=>batch.rows);
    if(!rows.length)return;
    downloadCsv(
      serializeSemicolonCsv(rows.map(row=>({...row,reviewer:reviewer||row.reviewer}))),
      `revisao-professor-hibrida-${rows.length}-questoes.csv`
    );
  }

  async function previewImport(file){
    setImportMessage("");
    setImportPreview(null);
    setImportFileName(file?.name||"");
    if(!file)return;
    try{
      const text=await file.text();
      const rows=parseSemicolonCsv(text);
      const validation=validateTeacherReviewImport(rows,s.editorialOverrides||{});
      setImportPreview({rows,validation});
    }catch{
      setImportMessage("Não foi possível ler este ficheiro de revisão.");
    }
  }

  function applyImportedReviews(){
    if(!importPreview?.validation)return;
    const importId=`teacher-import-${Date.now()}`;
    const result=applyTeacherReviewImport(
      s.editorialOverrides||{},
      importPreview.validation,
      {importId,allowPartial:false}
    );
    if(result.rejected){
      setImportMessage(result.reason||"Importação recusada.");
      return;
    }

    const record={
      id:importId,
      at:Date.now(),
      fileName:importFileName,
      applied:result.applied.length,
      reviewerNames:[...new Set(result.applied.map(x=>x.reviewer))],
      itemIds:result.applied.map(x=>x.id),
      batchIds:[...new Set(result.applied.map(x=>x.batchId).filter(Boolean))],
      packIds:[...new Set(result.applied.map(x=>x.packId).filter(Boolean))],
      qualityControl:result.applied.filter(x=>x.qualityControl).length
    };

    setS(prev=>({
      ...prev,
      editorialOverrides:result.overrides,
      reviewImports:[...(prev.reviewImports||[]),record]
    }));
    setImportMessage(`${result.applied.length} decisões importadas com sucesso.`);
    setImportPreview(null);
    setImportFileName("");
  }

  function openItem(itemId){
    setStatusFilter("all");
    setThemeFilter("all");
    setSelectedId(itemId);
    setNote("");
    setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false});
  }

  const statusLabel={
    prototype:"Protótipo",
    pending:"A rever",
    reviewed:"Revisto",
    blocked:"Bloqueado"
  };

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · REVISÃO PEDAGÓGICA</p>
    <h1>Workflow editorial de Matemática A.</h1>
    <p className="muted">Protótipo do espaço de trabalho de um professor revisor. Nada deste painel é visível para alunos.</p>

    <section className="betaReadinessCard">
      <div className="betaReadinessTop"><div><small>PRONTIDÃO DO CONTEÚDO PARA BETA FECHADA</small><h2>{readiness.score}%</h2></div><span className={readiness.canClosedBeta?"ready":"notReady"}>{readiness.canClosedBeta?"Pronto para beta":"Ainda não pronto"}</span></div>
      <div className="readinessBar"><i style={{width:readiness.score+"%"}}/></div>
      <div className="readinessMetrics">
        <div><span>Diagnóstico</span><b>{readiness.diagnostic.ready}/{readiness.diagnostic.total}</b><small>temas com âncora + probe revistos</small></div>
        <div><span>Missões</span><b>{readiness.missions.ready}/{readiness.missions.total}</b><small>focos críticos com ≥2 evidências revistas</small></div>
        <div><span>Mini-exame</span><b>{readiness.exam.items}/8</b><small>{readiness.exam.themes}/6 temas · {readiness.exam.cognitive}/3 tipos</small></div>
        <div><span>Total revisto</span><b>{readiness.totalReviewed}</b><small>questões aprovadas</small></div>
      </div>
      {readiness.blockers.length>0&&<div className="readinessBlockers"><b>O que bloqueia a beta neste momento</b>{readiness.blockers.map((x,i)=><span key={i}>• {x}</span>)}</div>}
      <div className="readinessActions"><button onClick={createPriorityBatch}>Criar lote prioritário de 12</button><button className="secondary" onClick={exportPriorityPack}>Exportar 30 prioridades</button></div>

      <div className="teacherBridge">
        <div className="teacherBridgeHead"><div><small>PONTE COM PROFESSOR EXTERNO</small><h3>Rever fora da app e importar depois</h3></div><span>{roadmap.approvalsNeeded} no caminho atual</span></div>
        <p>Exporta o roteiro mínimo já com enunciados, opções, solução e checklist. O professor preenche apenas as colunas de revisão e devolve o mesmo CSV.</p>
        <div className="teacherBridgeInstructions">{teacherReviewInstructions().map((x,i)=><span key={i}>{i+1}. {x}</span>)}</div>
        <div className="teacherBridgeActions">
          <button onClick={exportHybridFullPack}>Exportar roteiro híbrido recomendado ({hybridOps.remaining})</button>
          <button className="secondary" onClick={exportExternalReviewPack}>Exportar roteiro conservador ({roadmap.approvalsNeeded})</button>
          <label className="importFileButton">Importar CSV devolvido<input type="file" accept=".csv,text/csv" onChange={e=>previewImport(e.target.files?.[0]||null)}/></label>
        </div>

        {importPreview&&<div className="importPreview">
          <div className="importPreviewStats">
            <div><span>Decisões válidas</span><b>{importPreview.validation.valid.length}</b></div>
            <div><span>Linhas inválidas</span><b>{importPreview.validation.invalid.length}</b></div>
            <div><span>Conflitos</span><b>{importPreview.validation.conflicts?.length||0}</b></div>
            <div><span>Sem decisão</span><b>{importPreview.validation.ignored.length}</b></div>
          </div>
          {importPreview.validation.invalid.length>0&&<div className="importErrors"><b>Corrigir antes de importar</b>{importPreview.validation.invalid.slice(0,8).map((x,i)=><span key={i}>Linha {x.rowNumber} · {x.id||"sem ID"} — {x.reason}</span>)}</div>}
          {(importPreview.validation.conflicts?.length||0)>0&&<div className="importErrors conflict"><b>Conflitos que exigem decisão explícita</b>{importPreview.validation.conflicts.slice(0,8).map((x,i)=><span key={i}>Linha {x.rowNumber} · {x.id} — {x.reason}</span>)}</div>}
          <button disabled={!importPreview.validation.canApply} onClick={applyImportedReviews}>Aplicar decisões válidas</button>
          {!importPreview.validation.canApply&&<small>A importação é atómica: enquanto existir uma linha inválida, nenhuma decisão é aplicada.</small>}
        </div>}
        {importMessage&&<div className="importMessage">{importMessage}</div>}
      </div>
    </section>

    <section className="hybridValidationPanel">
      <div className="hybridValidationHead">
        <div><small>POLÍTICA HÍBRIDA · v5.5</small><h2>Professor onde acrescenta julgamento. Máquina onde consegue provar.</h2></div>
        <span>{hybridSummary.hybridTeacherTarget} vs {hybridSummary.conservativeTeacherApprovals}</span>
      </div>
      <p>O modelo conservador pedia revisão humana de todas as {hybridSummary.conservativeTeacherApprovals} questões do caminho mínimo. O novo modelo mantém revisão humana obrigatória no Diagnóstico, em questões com avisos e em itens de maior julgamento pedagógico; exercícios objetivos e atestados entram num lane de máquina, com uma amostra humana de controlo de 20%.</p>
      <div className="hybridValidationMetrics">
        <div><span>Humano obrigatório</span><b>{hybridSummary.mandatoryHuman}</b><small>impacto/complexidade pedagógica</small></div>
        <div><span>Amostra humana</span><b>{hybridSummary.teacherSample}</b><small>20% do lane de máquina</small></div>
        <div><span>Lane de máquina</span><b>{hybridSummary.machineCount}</b><small>oracle + fingerprint + pré-QA</small></div>
        <div><span>Revisões poupadas</span><b>{hybridSummary.savedHumanReviews}</b><small>−{hybridSummary.savedPct}% de trabalho humano</small></div>
      </div>
      <div className="hybridGateLine">
        <b>Gate híbrido para beta fechada</b>
        <span>{hybridReadiness.score}% estrutural</span>
        <em className={hybridReadiness.canClosedBeta?"go":"wait"}>{hybridReadiness.canClosedBeta?"GO":"A aguardar revisão humana"}</em>
      </div>
      {hybridReadiness.reasons.length>0&&<div className="hybridReasons">{hybridReadiness.reasons.slice(0,5).map((x,i)=><span key={i}>• {x}</span>)}</div>}
      <div className="hybridPolicyNotes">
        <span><b>Diagnóstico:</b> continua 100% humano.</span>
        <span><b>Machine lane:</b> só é válido se o fingerprint atual coincidir com a atestação e o oracle determinístico passar.</span>
        <span><b>Produção comercial:</b> ainda não aceita machine-only; o segundo validador externo/IA continua por configurar.</span>
        <span><b>Dados reais:</b> dificuldade empírica será recalibrada com respostas dos alunos, não “certificada” por uma IA.</span>
      </div>
      <div className="reviewBatchCards hybrid">{hybridOps.batches.map(batch=><div key={batch.id}>
        <div><small>LOTE HÍBRIDO {String(batch.index).padStart(2,"0")}</small><b>{batch.count} questões · ~{batch.estimatedMinutes} min</b></div>
        <span>{batch.mandatoryCount} obrigatórias · {batch.sampleCount} de amostragem</span>
        <button onClick={()=>exportHybridBatch(batch)}>Exportar este lote</button>
      </div>)}</div>
      <small className="reviewOpsFoot">O modelo antigo de 64 revisões continua disponível como opção conservadora. A política híbrida não inventa aprovação: cria tipos diferentes de evidência e mantém rastreabilidade por fingerprint.</small>
    </section>

    <section className="reviewOperations">
      <div className="reviewOpsHead">
        <div><small>ROTEIRO CONSERVADOR · v5.4</small><h3>{reviewOps.approvalsNeeded} aprovações em {reviewOps.batches.length} lote{reviewOps.batches.length===1?"":"s"}</h3></div>
        <b>{reviewOps.estimatedHours} h estimadas</b>
      </div>
      <p>Em vez de enviar dezenas de questões soltas, o caminho mínimo é dividido em lotes de 8. Cada ficheiro fica preso a um <b>fingerprint do conteúdo</b>: se uma pergunta mudar depois da exportação, a aprovação antiga deixa de valer automaticamente.</p>
      <div className="reviewOpsMetrics">
        <div><span>Aprovações desatualizadas</span><b>{reviewOps.staleApprovals}</b><small>mudaram depois da revisão</small></div>
        <div><span>QC por confirmar</span><b>{reviewOps.qcPending}</b><small>amostra ~10% após aprovações</small></div>
        <div><span>Pack</span><b>{reviewOps.packId.slice(-8)}</b><small>identifica este roteiro</small></div>
        <div><span>Revisões editoriais</span><b>{revisionStats.revisions}</b><small>{revisionStats.itemsChanged} questões alteradas</small></div>
        <div><span>Pré-QA bloqueadas</span><b>{reviewOps.preReviewQa.blocked}</b><small>não chegam ao professor</small></div>
        <div><span>Pré-QA com avisos</span><b>{reviewOps.preReviewQa.withWarnings}</b><small>professor vê as flags</small></div>
      </div>
      <div className="answerBalance"><b>Distribuição da resposta correta</b><span>A {reviewOps.preReviewQa.answerPositions.counts[0]} · B {reviewOps.preReviewQa.answerPositions.counts[1]} · C {reviewOps.preReviewQa.answerPositions.counts[2]} · D {reviewOps.preReviewQa.answerPositions.counts[3]}</span><em>{reviewOps.preReviewQa.answerPositions.balanced?"✓ equilibrada":"⚠ rever distribuição"}</em></div>
      {!reviewOps.preflightOk&&<div className="preQaBlocker"><b>⛔ Existem questões bloqueadas antes da revisão</b><span>Os lotes exportáveis excluem automaticamente esses itens. Corrige o pré-QA e recalcula o roteiro antes de avançar.</span></div>}
      <div className="reviewBatchCards">{reviewOps.batches.map(batch=><div key={batch.id} className={batch.projected.canClosedBeta?"final":""}>
        <div><small>LOTE {String(batch.index).padStart(2,"0")}</small><b>{batch.count} questões · ~{batch.estimatedMinutes} min</b></div>
        <span>Após aprovação: readiness projetado <b>{batch.projected.readinessScore}%</b></span>
        <small>Diagnóstico {batch.projected.diagnostic} · focos {batch.projected.missions} · exame {batch.projected.examItems} itens / {batch.projected.examThemes} temas</small>
        <button onClick={()=>exportOperationalBatch(batch)}>Exportar este lote</button>
      </div>)}</div>
      <small className="reviewOpsFoot">A projeção assume APROVAÇÃO dos itens do lote; ALTERAR/BLOQUEAR recalcula automaticamente o roteiro seguinte. QC é controlo de qualidade adicional e não cria falsa dupla aprovação.</small>
    </section>

    <section className="reviewRoadmap">
      <div className="reviewRoadmapHead"><div><small>CAMINHO MÍNIMO PARA “GO”</small><h3>{roadmap.ready?"Critérios mínimos já cumpridos":`${roadmap.approvalsNeeded} aprovações estimadas em falta`}</h3></div><b>{roadmap.ready?"✓":roadmap.estimatedHours+" h"}</b></div>
      {!roadmap.ready&&<><p>O motor calculou uma sequência de revisão que tenta satisfazer os critérios da beta com o menor número de aprovações possível. A estimativa usa cerca de 5 min por questão.</p>
        <div className="roadmapSteps">{roadmap.selected.slice(0,10).map(row=><button key={row.item.id} onClick={()=>openItem(row.item.id)}>
          <span>{row.step}</span><div><b>{row.item.id} · {theme(row.item.themeId)?.short}</b><small>{row.item.focus||"Geral"} · {row.reasons.slice(0,2).join(" · ")}</small></div>
        </button>)}</div>
        {roadmap.selected.length>10&&<small className="moreRows">+ {roadmap.selected.length-10} aprovações seguintes no roteiro</small>}
      </>}
      <div className="roadmapGateGrid">
        <div><span>Diagnóstico</span><b>{roadmap.status.diagnosticReady}/{roadmap.status.diagnosticTotal}</b></div>
        <div><span>Focos críticos</span><b>{roadmap.status.criticalReady}/{roadmap.status.criticalTarget}</b></div>
        <div><span>Exame · itens</span><b>{roadmap.status.examItems}/8</b></div>
        <div><span>Exame · temas</span><b>{roadmap.status.examThemes}/6</b></div>
      </div>
    </section>

    <div className="reviewStats">
      <div><span>Protótipo</span><b>{stats.prototype}</b></div>
      <div><span>A rever</span><b>{stats.pending}</b></div>
      <div><span>Revisto</span><b>{stats.reviewed}</b></div>
      <div><span>Bloqueado</span><b>{stats.blocked}</b></div>
    </div>

    {urgent.length>0&&<div className="urgentReview">
      <div><b>⚠ Revisão prioritária</b><span>{urgent.length} itens bloqueados ou com vários reports</span></div>
      <div className="urgentChips">{urgent.slice(0,6).map(x=><button key={x.item.id} onClick={()=>setSelectedId(x.item.id)}>{x.item.id} · {x.reports} reports</button>)}</div>
    </div>}

    {priorityQueue.length>0&&<section className="priorityReviewList"><div><b>Próximas revisões com maior impacto na beta</b><span>Ordenadas pelo que desbloqueia diagnóstico, Missões e Mini-exames.</span></div>
      <div>{priorityQueue.slice(0,8).map((row,i)=><button key={row.item.id} onClick={()=>openItem(row.item.id)}>
        <b>{i+1}. {row.item.id}</b><span>{row.theme?.short} · {row.item.focus||"Geral"}</span><small>{row.reasons.slice(0,3).join(" · ")}</small>
      </button>)}</div>
    </section>}

    <div className="reviewToolbar">
      <label>Estado<select value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setSelectedId(null)}}>
        <option value="prototype">Protótipo</option><option value="pending">A rever</option><option value="reviewed">Revisto</option><option value="blocked">Bloqueado</option><option value="all">Todos</option>
      </select></label>
      <label>Tema<select value={themeFilter} onChange={e=>{setThemeFilter(e.target.value);setSelectedId(null)}}>
        <option value="all">Todos</option>{TAXONOMY.map(t=><option key={t.id} value={t.id}>{t.year} · {t.short}</option>)}
      </select></label>
      <label>Revisor<input value={reviewer} onChange={e=>setReviewer(e.target.value)}/></label>
      <button onClick={createBatch}>Criar lote de 12</button>
    </div>

    <div className="reviewWorkspace">
      <aside className="reviewQueue">
        <div className="queueTitle"><b>Fila</b><span>{filtered.length} itens</span></div>
        {filtered.slice(0,80).map(row=><button key={row.item.id} className={selected?.item.id===row.item.id?"active":""} onClick={()=>{setSelectedId(row.item.id);setNote("");setChecklist({math:false,clarity:false,unique:false,distractors:false,solution:false,taxonomy:false,difficulty:false,hypothesis:false})}}>
          <div><b>{row.item.id}</b><small>{theme(row.item.themeId)?.short}</small></div>
          <span className={`state ${row.status}`}>{statusLabel[row.status]||row.status}</span>
          {row.reports>0&&<em>⚠ {row.reports}</em>}
        </button>)}
      </aside>

      <section className="reviewCard">
        {!selected?<div className="qaEmpty">Não existem itens neste filtro.</div>:<>
          <div className="reviewTop">
            <div><small>{theme(selected.item.themeId)?.year} · {theme(selected.item.themeId)?.short}</small><h2>{selected.item.focus||"Sem foco"}</h2></div>
            <div className="reviewMeta"><span>Versão {selected.version}</span><b className={`state ${selected.status}`}>{statusLabel[selected.status]}</b></div>
          </div>
          {selected.reviewStale&&<div className="staleReviewAlert"><b>⚠ Aprovação invalidada automaticamente</b><span>{selected.integrityReason}</span><small>Fingerprint atual: {selected.currentFingerprint}</small></div>}

          <div className="reviewQuestion">
            <small>{selected.item.cognitive} · D{selected.item.difficulty} · {selected.item.generated?"Gerada":"Curada"}</small>
            <h3>{selected.item.q}</h3>
            <div className="reviewOptions">{selected.item.o.map((o,i)=><div key={i} className={i===selected.item.a?"correct":""}>
              <b>{String.fromCharCode(65+i)}</b><span>{o}</span>{i===selected.item.a&&<em>✓ correta</em>}
            </div>)}</div>
          </div>

          <div className="reviewDetails">
            <div><b>Resolução</b><span>{selected.item.sol}</span></div>
            <div><b>Hipótese de erro</b><span>{selected.item.hyp}</span></div>
            <div><b>Assinatura semântica</b><span>{selected.item.signature}</span></div>
            <div><b>Fingerprint editorial</b><span>{selected.currentFingerprint}</span></div>
            {selected.item.generated&&<div><b>Template</b><span>{selected.item.templateId} · seed {selected.item.variantSeed}</span></div>}
          </div>

          {selectedHybrid&&<div className={"hybridItemLane "+selectedHybrid.lane}>
            <b>{selectedHybrid.lane==="machine_plus_sample"?"⚙ Lane máquina + amostragem":selectedHybrid.lane==="blocked"?"⛔ Bloqueado":"👤 Revisão humana"}</b>
            <span>{selectedHybrid.reason}</span>
            {selectedHybrid.passport?.attestation&&<small>Oracle: {selectedHybrid.passport.localOracle.status} · fingerprint {selectedHybrid.passport.attestationMatch?"válido":"desatualizado"} · segundo validador: {selectedHybrid.passport.externalSecondValidator}</small>}
          </div>}

          {selectedQa&&<div className={"preQaItem "+selectedQa.status}>
            <div><b>{selectedQa.status==="clean"?"✓ Pré-QA limpo":selectedQa.status==="warning"?"⚠ Pré-QA com avisos":"⛔ Pré-QA bloqueado"}</b><span>{selectedQa.blockerCount} bloqueio{selectedQa.blockerCount===1?"":"s"} · {selectedQa.warningCount} aviso{selectedQa.warningCount===1?"":"s"}</span></div>
            {selectedQa.issues.map((issue,i)=><p key={`${issue.code}-${i}`} className={issue.severity}><strong>{issue.code}</strong><span>{issue.message}</span></p>)}
            {selectedQa.status==="clean"&&<small>Os controlos mecânicos passaram. Isto não substitui a avaliação matemática e pedagógica do professor.</small>}
          </div>}

          <div className="reviewChecklist">
            {[
              ["math","Matemática correta"],
              ["clarity","Enunciado claro"],
              ["unique","Resposta inequívoca"],
              ["distractors","Distratores plausíveis"],
              ["solution","Resolução suficiente"],
              ["taxonomy","Classificação curricular correta"],
              ["difficulty","Dificuldade adequada"],
              ["hypothesis","Hipótese de erro plausível"]
            ].map(([k,l])=><label key={k}><input type="checkbox" checked={checklist[k]} onChange={e=>setChecklist(prev=>({...prev,[k]:e.target.checked}))}/>{l}</label>)}
          </div>

          {selected.reports>0&&<div className="itemReports"><b>⚠ {selected.reports} report{selected.reports!==1?"s":""} de utilizadores</b>
            <span>{(s.contentReports||[]).filter(r=>r.itemId===selected.item.id).map(r=>r.label).join(" · ")}</span></div>}

          <textarea className="reviewNote" placeholder="Nota do revisor (opcional)" value={note} onChange={e=>setNote(e.target.value)}/>

          {(!allChecks||(selectedQa?.blockerCount||0)>0)&&<small className="reviewGateHint">{(selectedQa?.blockerCount||0)>0?"O pré-QA encontrou um bloqueio mecânico. Corrige a questão antes de pedir aprovação.":"Para aprovar, o revisor tem de confirmar os 8 critérios acima. “Pedir alteração” e “Bloquear” continuam disponíveis sem checklist completa."}</small>}
          <div className="reviewActions">
            <button className="approve" disabled={!allChecks||!reviewer.trim()||(selectedQa?.blockerCount||0)>0} onClick={()=>decide("approve")}>✓ Aprovar</button>
            <button className="changes" onClick={()=>decide("changes")}>✎ Pedir alteração</button>
            <button className="block" onClick={()=>decide("block")}>⛔ Bloquear</button>
          </div>

          <button className="versionButton" onClick={bump}>✎ Preparar alteração editorial desta questão</button>
          {revisionMessage&&<div className="revisionMessage">{revisionMessage}</div>}

          {revisionOpen&&revisionDraft&&<div className="revisionEditor">
            <div className="revisionEditorHead"><div><small>NOVA VERSÃO EDITORIAL</small><h3>Editar sem perder o histórico</h3></div><button onClick={()=>{setRevisionOpen(false);setRevisionDraft(null)}}>Fechar</button></div>
            <p>A alteração só cria uma nova versão <b>pending</b>. Mesmo que a versão anterior estivesse aprovada, esta nova versão não entra numa beta pedagógica/produção até ser novamente revista.</p>

            <label>Enunciado<textarea value={revisionDraft.q} onChange={e=>setRevisionDraft(prev=>({...prev,q:e.target.value}))}/></label>
            <div className="revisionOptionGrid">{revisionDraft.o.map((value,i)=><label key={i}>Opção {String.fromCharCode(65+i)}
              <input value={value} onChange={e=>setRevisionDraft(prev=>({...prev,o:prev.o.map((x,j)=>j===i?e.target.value:x)}))}/>
            </label>)}</div>
            <div className="revisionMetaGrid">
              <label>Resposta correta<select value={revisionDraft.a} onChange={e=>setRevisionDraft(prev=>({...prev,a:Number(e.target.value)}))}>{revisionDraft.o.map((_,i)=><option key={i} value={i}>{String.fromCharCode(65+i)}</option>)}</select></label>
              <label>Dificuldade<select value={revisionDraft.difficulty} onChange={e=>setRevisionDraft(prev=>({...prev,difficulty:Number(e.target.value)}))}>{[1,2,3,4,5].map(x=><option key={x} value={x}>D{x}</option>)}</select></label>
              <label>Tipo cognitivo<input value={revisionDraft.cognitive} onChange={e=>setRevisionDraft(prev=>({...prev,cognitive:e.target.value}))}/></label>
            </div>
            <label>Resolução<textarea value={revisionDraft.sol} onChange={e=>setRevisionDraft(prev=>({...prev,sol:e.target.value}))}/></label>
            <label>Hipótese de erro<textarea value={revisionDraft.hyp} onChange={e=>setRevisionDraft(prev=>({...prev,hyp:e.target.value}))}/></label>

            <div className="revisionDiff">
              <div><b>Comparação antes → depois</b><span>{revisionValidation?.diff?.length||0} campo{revisionValidation?.diff?.length===1?"":"s"} alterado{revisionValidation?.diff?.length===1?"":"s"}</span></div>
              {(revisionValidation?.diff||[]).map(d=><div key={d.field}><strong>{d.label}</strong><small>ANTES</small><code>{Array.isArray(d.before)?d.before.join(" | "):String(d.before)}</code><small>DEPOIS</small><code>{Array.isArray(d.after)?d.after.join(" | "):String(d.after)}</code></div>)}
              {revisionValidation?.warnings?.map((x,i)=><em key={i}>⚠ {x}</em>)}
              {revisionValidation?.errors?.map((x,i)=><em className="error" key={i}>✕ {x}</em>)}
              {revisionValidation?.valid&&<footer><span>Fingerprint atual: {revisionValidation.beforeFingerprint}</span><span>Novo: {revisionValidation.afterFingerprint}</span></footer>}
            </div>

            <div className="revisionEditorActions">
              <button className="approve" disabled={!revisionValidation?.valid} onClick={applyRevision}>Aplicar como nova versão</button>
              {((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[]).length>0&&<button className="secondary" onClick={revertRevision}>Reverter última alteração</button>}
            </div>
          </div>}

          <div className="reviewAudit">
            <b>Histórico editorial</b>
            {((s.editorialOverrides||{})[selected.item.id]?.history||[]).length===0
              ?<span>Sem decisões registadas.</span>
              :[...((s.editorialOverrides||{})[selected.item.id]?.history||[])].reverse().map((h,i)=><div key={i}>
                <small>v{h.version} · {new Date(h.at).toLocaleString("pt-PT")}</small>
                <span>{h.reviewer}: {h.decision}{h.note?` — ${h.note}`:""}</span>
              </div>)}
            {((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[]).length>0&&<details className="revisionHistory"><summary>Ver alterações de conteúdo</summary>
              {[...((s.editorialOverrides||{})[selected.item.id]?.revisionHistory||[])].reverse().map((r,i)=><div key={i}>
                <small>v{r.fromVersion} → v{r.toVersion} · {new Date(r.at).toLocaleString("pt-PT")}</small>
                <span>{r.editor}: {r.kind==="rollback"?"reversão":(r.diff||[]).map(d=>d.label).join(", ")}</span>
              </div>)}
            </details>}
          </div>
        </>}
      </section>
    </div>

    {(s.reviewImports||[]).length>0&&<section className="reviewImports"><h3>Importações externas</h3>{[...(s.reviewImports||[])].reverse().slice(0,8).map(x=><div key={x.id}>
      <div><b>{x.applied} decisões aplicadas</b><small>{x.fileName||"CSV externo"} · {new Date(x.at).toLocaleString("pt-PT")}</small></div>
      <span>{(x.reviewerNames||[]).join(", ")||"Revisor externo"}</span>
    </div>)}</section>}

    {(s.reviewBatches||[]).length>0&&<section className="reviewBatches"><h3>Lotes criados</h3>{[...s.reviewBatches].reverse().slice(0,8).map(b=><div key={b.id}>
      <div><b>{b.itemIds.length} questões</b><small>{b.reviewer} · {new Date(b.createdAt).toLocaleDateString("pt-PT")}</small></div><span>{b.status==="open"?"Aberto":"Fechado"}</span>
    </div>)}</section>}

    <div className="notice"><b>O que falta para produção?</b><span>Autenticação real de revisores, permissões, backend, edição simultânea colaborativa, comentários em thread e notificações. Nesta versão estamos a validar o workflow e a experiência.</span></div>
  </Shell>
}

function ReportButton({item,s,setS,compact=false}){
  const [open,setOpen]=useState(false),[sent,setSent]=useState(false);
  const categories=[
    ["wrong","A resposta parece errada"],
    ["unclear","Enunciado confuso"],
    ["difficulty","Dificuldade desajustada"],
    ["typo","Erro/typo"],
    ["other","Outro problema"]
  ];
  function send(category,label){
    const report={
      id:`rep-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      itemId:item.id,templateId:item.templateId||null,generated:!!item.generated,
      themeId:item.themeId,focus:item.focus||null,category,label,at:Date.now()
    };
    setS(prev=>({...prev,contentReports:[...(prev.contentReports||[]),report]}));
    setSent(true);setOpen(false);
  }
  if(sent)return <div className="reportThanks">✓ Obrigado. Ficou sinalizado para revisão.</div>;
  return <div className={"reportBox "+(compact?"compact":"")}>
    <button className="reportToggle" onClick={()=>setOpen(!open)}>⚑ Reportar problema nesta pergunta</button>
    {open&&<div className="reportChoices">{categories.map(([v,l])=><button key={v} onClick={()=>send(v,l)}>{l}</button>)}</div>}
  </div>
}

function QualityPanel({s,setS,go}){
  const snapshot=qualitySnapshot(s.contentReports||[]),rows=allFocusRows();
  const gaps=rows.filter(r=>r.status==="gap"),covered=rows.filter(r=>r.status==="covered"),reports=s.contentReports||[];
  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · QUALIDADE & BETA</p>
    <h1>O conteúdo tem de ser auditável.</h1>
    <button className="reviewShortcut" onClick={()=>go("review")}>Abrir workflow de revisão pedagógica →</button>
    <p className="muted">Este ecrã é de desenvolvimento. Não faz parte da experiência normal do aluno numa versão pública.</p>
    <div className="qaMetrics">
      <div><span>Cobertura inicial</span><b>{snapshot.coverage.coveragePct}%</b><small>{snapshot.coverage.covered}/{snapshot.coverage.totalFocus} focos</small></div>
      <div><span>Erros automáticos</span><b>{snapshot.errors}</b><small>devem ser 0</small></div>
      <div><span>Validação matemática</span><b>{snapshot.mathValidation.failed}</b><small>falhas em {snapshot.mathValidation.samples} variantes-amostra</small></div>
      <div><span>Reports</span><b>{snapshot.reports}</b><small>neste dispositivo</small></div>
    </div>
    <div className="notice"><b>Validação matemática ≠ revisão pedagógica</b><span>Uma variante automática só entra no motor se um validador independente do template recalcular a resposta e concordar com a opção marcada. Isso continua sem provar que o enunciado, dificuldade ou distratores são pedagogicamente bons — essa autoridade continua a ser do professor.</span></div>
    <section className="qaSection mathValidationSection"><h3>Pipeline matemático dos geradores</h3>
      <div className="mathValidationSummary"><div><span>Templates</span><b>{snapshot.mathValidation.templates}</b></div><div><span>Amostras</span><b>{snapshot.mathValidation.samples}</b></div><div><span>Validadas</span><b>{snapshot.mathValidation.passed}</b></div><div><span>Conflitos</span><b>{snapshot.mathValidation.failed}</b></div></div>
      <p className="muted">O pipeline já está preparado para uma segunda validação externa. Se no futuro um motor como Wolfram discordar do nosso cálculo local, a questão passa automaticamente a bloqueada para revisão humana.</p>
    </section>

    <section className="qaSection"><h3>Validações automáticas</h3>
      {snapshot.checks.length===0?<div className="qaOk">✓ Nenhum problema estrutural detetado no banco atual.</div>
      :<div className="qaIssues">{snapshot.checks.slice(0,25).map((x,i)=><div className={x.severity} key={`${x.itemId}-${i}`}><b>{x.severity==="error"?"ERRO":"AVISO"}</b><span>{x.itemId}: {x.message}</span></div>)}</div>}
    </section>

    <section className="qaSection"><h3>Focos ainda sem conteúdo</h3>
      {gaps.length===0?<div className="qaOk">✓ Todos os focos têm conteúdo curado ou gerador.</div>
      :<div className="gapGrid">{gaps.slice(0,30).map(r=><div key={`${r.themeId}-${r.focus}`}><small>{r.year} · {r.theme}</small><b>{r.focus}</b></div>)}</div>}
      {gaps.length>30&&<small className="moreRows">+ {gaps.length-30} focos adicionais</small>}
    </section>

    <section className="qaSection"><h3>Amostra de cobertura</h3><div className="coverageTable">
      {covered.slice(0,25).map(r=><div className="coverageRow" key={`${r.themeId}-${r.focus}`}><div><small>{r.year} · {r.theme}</small><b>{r.focus}</b></div><span>{r.curatedCount} curadas</span><span>{r.generatorCount} geradores</span><span>{r.reviewedCount} revistas</span></div>)}
    </div></section>

    <section className="qaSection"><h3>Problemas sinalizados por utilizadores</h3>
      {reports.length===0?<div className="qaEmpty">Ainda não existem reports neste dispositivo.</div>
      :<div className="reportList">{[...reports].reverse().slice(0,30).map(r=><div key={r.id}><div><b>{r.label}</b><small>{r.itemId} · {theme(r.themeId)?.short}</small></div><span>{r.generated?"Variante gerada":"Questão curada"}</span></div>)}</div>}
    </section>
    <div className="notice"><b>Limite do protótipo</b><span>Os reports estão apenas em localStorage. Numa beta real têm de ir para backend/base de dados para compararmos vários alunos.</span></div>
  </Shell>
}

function QuestionOptions({q,sel,fb,answer}){
  return <div className="opts">{q.o.map((x,n)=><button key={`${q.id}-${n}`}
    className={(sel===n?"sel ":"")+(fb&&n===q.a?"correct ":"")+(fb&&sel===n&&n!==q.a?"wrong":"")}
    onClick={()=>answer(n)}><b>{String.fromCharCode(65+n)}</b>{x}</button>)}</div>
}
