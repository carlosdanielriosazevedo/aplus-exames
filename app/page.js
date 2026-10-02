"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import dynamic from "next/dynamic";
import {insertMathText} from "./lib/mathInput";
import {answerOptionState,conciseMathExplanation} from "./lib/feedbackCopy";
import {STUDY_MODE_COPY,practiceModeCopy} from "./lib/studyModeCopy";
import {
  TAXONOMY,PREREQUISITES,QUESTION_BANK,DIAGNOSTIC_BLUEPRINT,microcompetencyId
} from "./data/content";
import {curriculumSubtopicsForTheme,curriculumSubtopicId} from "./data/curriculumVnext";
import {BrandName,Logo,Apronso,ApronsoNudge,Back,StudentNav,StudentTop,Shell,FriendsBetaRibbon,StudySessionHeader} from "./components/chrome";
import StudyModeHub from "./components/StudyModeHub";
import {Welcome} from "./components/Welcome";
const ReviewerDashboard=dynamic(()=>import("./components/ReviewerDashboard").then(module=>module.ReviewerDashboard),{ssr:false});
const AccountCloud=dynamic(()=>import("./components/AccountCloud").then(module=>module.AccountCloud),{ssr:false});
const MathReviewMatter=dynamic(()=>import("./components/MathReviewMatter"),{ssr:false});
const BetaDashboard=dynamic(()=>import("./components/InternalDashboards").then(module=>module.BetaDashboard),{ssr:false});
const QualityPanel=dynamic(()=>import("./components/InternalDashboards").then(module=>module.QualityPanel),{ssr:false});
const PortuguesePassageMiniExamRoute=dynamic(()=>import("./components/PortuguesePassageMiniExamRoute"),{ssr:false});
const PhysicsChemistrySubject=dynamic(()=>import("./components/PhysicsChemistrySubject"),{ssr:false});
const PhysicsChemistryExam=dynamic(()=>import("./components/PhysicsChemistryExam"),{ssr:false});
const PhysicsChemistryMiniExam=dynamic(()=>import("./components/PhysicsChemistryMiniExam"),{ssr:false});
import {SUBJECT_GROUPS,SECONDARY_EXAM_SUBJECTS,AVAILABLE_SUBJECT_IDS,SUBJECT_CATALOG_YEAR,examCodesLabel,subjectStatusLabel} from "./data/subjects";
import {migrateSubjectProgress,subjectProgressFor} from "./lib/subjectProgress";
import {DEFAULT_TRAINING_QUESTIONS,MATH_MINI_EXAM_QUESTIONS,STUDY_SESSION_MIN_QUESTIONS} from "./lib/sessionPolicy";
import {activateSubjectState,finishSubjectOnboardingState,normalizeSubjectWorkspaceState,subjectGoal,subjectOnboardingStep,uniqueSubjectIds} from "./lib/subjectWorkspace";
import "./portugues-mini-exame/passage-mini-exam.css";
import {betaEvent,sessionStart,sessionFinish,betaSummary} from "./lib/beta";
import {
  migrateProductAnalytics,recordAppOpen,recordMilestone,recordProductEvent
} from "./lib/productAnalytics";
import {
  loadLocalStateStatus,saveLocalState,clearLocalState,FRIENDS_STORAGE_KEY
} from "./lib/persistence";
import {
  saveSessionDraft,loadSessionDraft,loadSessionDraftStatus,clearSessionDraft,draftScreen
} from "./lib/sessionDraft";
import {
  academicScopeThemes,diagnosticBlueprintForProfile,currentYearThemes,normalizeTaughtSubtopics
} from "./lib/curriculumScope";
import {
  claimSessionCompletion,clearCompletionRegistry,latestOpenSessionId
} from "./lib/reliability";
import {
  ROLES,normalizeIdentity,can,defaultScreenForRole,createParentInvite,
  activeParentLink,requestLinkRemoval,confirmLinkRemoval,demoIdentity
} from "./lib/identity";
import {migrateCloudSync} from "./lib/cloudReliability";
import {
  TESTER_SEGMENTS,PUBLIC_ENTRY_SEGMENTS,friendsBetaRequested,activateFriendsBeta,markFriendsBetaConsent,
  isFriendsBeta,friendsBetaReport,testerSegmentInfo,currentTesterSegment,
  isTargetStudentTester,friendsFeedbackSummary
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
import {
  responseType,isConstructedResponse,isResponseAnswered,completionFilledCount,
  expectedResponseLabel,studentResponseLabel,miniExamPointSummary,examScoreLabel,stepFeedback,gradeResponse
} from "./lib/constructedResponse";


let mathEngineModule=null;
let mathEnginePromise=null;
function loadMathEngine(){
  if(mathEngineModule)return Promise.resolve(mathEngineModule);
  if(!mathEnginePromise)mathEnginePromise=import("./lib/engine").then(module=>{
    mathEngineModule=module;
    return module;
  });
  return mathEnginePromise;
}
function mathEngineFn(name){
  return (...args)=>{
    if(!mathEngineModule)throw new Error(`Motor matemático ainda não carregado: ${name}`);
    return mathEngineModule[name](...args);
  };
}
let diagnosticRecoveryModule=null;
let diagnosticRecoveryPromise=null;
function loadDiagnosticRecovery(){
  if(diagnosticRecoveryModule)return Promise.resolve(diagnosticRecoveryModule);
  if(!diagnosticRecoveryPromise)diagnosticRecoveryPromise=loadMathEngine()
    .then(()=>import("./lib/diagnosticRecovery"))
    .then(module=>{
      diagnosticRecoveryModule=module;
      return module;
    });
  return diagnosticRecoveryPromise;
}
function diagnosticRecoveryFn(name){
  return (...args)=>{
    if(!diagnosticRecoveryModule)throw new Error(`Recovery do diagnóstico ainda não carregado: ${name}`);
    return diagnosticRecoveryModule[name](...args);
  };
}
const createDiagnosticDraft=diagnosticRecoveryFn("createDiagnosticDraft");
const recoverDiagnosticTransaction=diagnosticRecoveryFn("recoverDiagnosticTransaction");
const recoverLegacyDiagnosticSessions=diagnosticRecoveryFn("recoverLegacyDiagnosticSessions");
const transactDiagnosticAnswer=diagnosticRecoveryFn("transactDiagnosticAnswer");
const emptyScores=()=>TAXONOMY.reduce((acc,t)=>{acc[t.id]={domain:null,conf:0,evidence:[]};return acc;},{});
const theme=id=>TAXONOMY.find(t=>t.id===id);
const byYear=year=>TAXONOMY.filter(t=>t.year===year);
const getQuestions=mathEngineFn("getQuestions");
const diagnosticAnchor=mathEngineFn("diagnosticAnchor");
const certaintyLabel=mathEngineFn("certaintyLabel");
const certaintyHelp=mathEngineFn("certaintyHelp");
const applyEvidence=mathEngineFn("applyEvidence");
const measuredThemes=mathEngineFn("measuredThemes");
const prepIndex=mathEngineFn("prepIndex");
const selectMissionTheme=mathEngineFn("selectMissionTheme");
const selectMissionQuestion=mathEngineFn("selectMissionQuestion");
const selectPrereqQuestion=mathEngineFn("selectPrereqQuestion");
const shouldEndMission=mathEngineFn("shouldEndMission");
const missionStopDecision=mathEngineFn("missionStopDecision");
const trainingQuestions=mathEngineFn("trainingQuestions");
const missionPracticeQuestion=mathEngineFn("missionPracticeQuestion");
const startingDifficulty=mathEngineFn("startingDifficulty");
const missionContentExhaustedDecision=mathEngineFn("missionContentExhaustedDecision");
const canStartMissionDetour=mathEngineFn("canStartMissionDetour");
const estimateMissionSeconds=mathEngineFn("estimateMissionSeconds");
const dailyMissionPlan=mathEngineFn("dailyMissionPlan");
const missionCandidateQueue=mathEngineFn("missionCandidateQueue");
const markTrainingSignalConfirmed=mathEngineFn("markTrainingSignalConfirmed");
const selectQuestionForPlan=mathEngineFn("selectQuestionForPlan");
const buildMiniExam=mathEngineFn("buildMiniExam");
const applyMiniExam=mathEngineFn("applyMiniExam");
const hasTrainingContent=mathEngineFn("hasTrainingContent");
const hasGenerator=mathEngineFn("hasGenerator");
const eligibleQuestions=mathEngineFn("eligibleQuestions");
const eligibleCount=mathEngineFn("eligibleCount");
const rankedStudyPriorities=mathEngineFn("rankedStudyPriorities");
const focusScore=mathEngineFn("focusScore");
const focusRows=mathEngineFn("focusRows");
const competenceMap=mathEngineFn("competenceMap");
const selectCausalProbe=mathEngineFn("selectCausalProbe");
const causalVerdict=mathEngineFn("causalVerdict");
const recordLearningHypothesis=mathEngineFn("recordLearningHypothesis");
const activeLearningHypotheses=mathEngineFn("activeLearningHypotheses");
const allLearningHypotheses=mathEngineFn("allLearningHypotheses");
const refreshLearningHypotheses=mathEngineFn("refreshLearningHypotheses");
const recalibrateAllScores=mathEngineFn("recalibrateAllScores");
const migratePedagogicalIds=mathEngineFn("migratePedagogicalIds");
const scopedThemeScore=mathEngineFn("scopedThemeScore");
const questionById=mathEngineFn("questionById");

const MATH_ENGINE_SCREENS=new Set([
  "home","diag","diagRun","diagResult","mission","missionResult",
  "trainingSetup","trainingRun","progress","exams","miniExamIntro","miniExamRun",
  "miniExamReview","miniExamResult","miniExamCompletedReview","parent"
]);

function subjectDiagnosticDone(state,subjectId){
  if(subjectId==="math-a")return !!state.diagnosticDone;
  return !!subjectProgressFor(state,subjectId).diagnosticDone;
}
function hasPendingSelectedDiagnostics(state){
  const selected=uniqueSubjectIds(state.selectedSubjectIds||[]).filter(id=>AVAILABLE_SUBJECT_IDS.includes(id));
  return selected.length>1&&selected.some(id=>!subjectDiagnosticDone(state,id));
}

const DEFAULT_SUBJECT_ID="math-a";

function subjectById(id){
  return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);
}

function normalizeSubjectWorkspace(state){
  return migrateSubjectProgress(normalizeSubjectWorkspaceState(state,AVAILABLE_SUBJECT_IDS,DEFAULT_SUBJECT_ID));
}

function activeSubjectDiagnosticDone(state){
  if(["portuguese","physics-chemistry-a"].includes(state.activeSubjectId))return subjectProgressFor(state,state.activeSubjectId).diagnosticDone;
  return !!state.diagnosticDone;
}

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
  selectedSubjectIds:[],
  activeSubjectId:null,
  subjectProgress:{},
  subjectProgressModelVersion:1,
  firstUseTourCompleted:false,
  parentInvites:[],
  profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear",optionalTopics:[],taughtSubtopicIds:[]}
};

export default function App(){
  const [s,setS]=useState(initial);
  const [screen,setScreen]=useState("welcome");
  const [trainingCfg,setTrainingCfg]=useState(null);
  const [examSession,setExamSession]=useState(null);
  const [recoveredSession,setRecoveredSession]=useState(null);
  const [hydrated,setHydrated]=useState(false);
  const [mathEngineReady,setMathEngineReady]=useState(()=>!!mathEngineModule);
  const [diagnosticRecoveryReady,setDiagnosticRecoveryReady]=useState(()=>!!diagnosticRecoveryModule);

  useEffect(()=>{
    if(typeof window==="undefined"||!("scrollRestoration" in window.history))return;
    const previous=window.history.scrollRestoration;
    window.history.scrollRestoration="manual";
    window.scrollTo({top:0,left:0,behavior:"auto"});
    return ()=>{window.history.scrollRestoration=previous};
  },[]);

  useEffect(()=>{
    let live=true;
    (async()=>{
    const requested=typeof window!=="undefined"&&friendsBetaRequested(window.location.search);
    const storageKey=requested?FRIENDS_STORAGE_KEY:undefined;
    const loaded=loadLocalStateStatus(initial,emptyScores,storageKey);
    if(loaded.error){setScreen("storageRecoveryError");return}
    const x=loaded.state;
    const draftPreview=x?loadSessionDraftStatus(x.betaMode||"internal").draft:null;
    const needsMathAtHydration=!!x&&(
      x.activeSubjectId==="math-a"||
      x.pedagogicalIdVersion!==1||
      ["diagnostic","training","mini_exam"].includes(draftPreview?.kind)
    );
    if(needsMathAtHydration){
      await loadMathEngine();
      if(!live)return;
      setMathEngineReady(true);
    }
    const migratedX=x&&mathEngineModule
      ?migratePedagogicalIds({...x,scores:recalibrateAllScores(x.scores)})
      :x;
    const base=migratedX
      ?migrateProductAnalytics(migrateCloudSync(migrateDailyMission(migrateCompetition(migrateEngagement(migratedX)))))
      :migrateProductAnalytics(migrateCloudSync(initial));
    const subjectReady=normalizeSubjectWorkspace(base);
    const betaState=requested?activateFriendsBeta(subjectReady):subjectReady;
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
    const legacyDiagnostic=openDiagnostic&&(!draft||(draft.kind==="diagnostic"&&![2,3].includes(draft.version)));
    if(legacyDiagnostic||draft?.kind==="diagnostic"){
      await loadDiagnosticRecovery();
      if(!live)return;
      setMathEngineReady(true);
      setDiagnosticRecoveryReady(true);
    }
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
    const preview=typeof window!=="undefined"?new URLSearchParams(window.location.search).get("preview"):null;
    if(preview==="subjects"){
      setScreen("subjectOnboard");
    }else if(preview==="portuguese"){
      recoveredState=normalizeSubjectWorkspace({...recoveredState,selectedSubjectIds:[...(recoveredState.selectedSubjectIds||[]),"portuguese"],activeSubjectId:"portuguese"});
      setS(recoveredState);
      setScreen("home");
    }else if(recoveryError){
      setScreen("diagRecoveryError");
    }else if(recoveredCompletion){
      setScreen("diagResult");
    }else if(recoveredLegacy){
      setScreen("diag");
    }else if(canRecover){
      setRecoveredSession(validDraft);
      setScreen(recovered);
    }else{
      const portuguesePaused=recoveredState.activeSubjectId==="portuguese"&&(
        !!subjectProgressFor(recoveredState,"portuguese").lastPosition||
        !!recoveredState.subjectSettings?.portuguese?.miniExamDraft
      );
      setScreen(activeSubjectDiagnosticDone(recoveredState)||portuguesePaused?"home":"welcome");
    }
    setHydrated(true);
    })();
    return ()=>{live=false};
  },[]);

  useEffect(()=>{
    if(hydrated)saveLocalState(s);
  },[s,hydrated]);

  useEffect(()=>{
    const mathActive=(s.activeSubjectId==="math-a"||(!s.activeSubjectId&&MATH_ENGINE_SCREENS.has(screen)));
    if(!hydrated||!mathActive||!MATH_ENGINE_SCREENS.has(screen)){
      if(mathEngineModule&&!mathEngineReady)setMathEngineReady(true);
      return;
    }
    const needsRecovery=["diag","diagRun","diagResult"].includes(screen);
    if(mathEngineModule&&(!needsRecovery||diagnosticRecoveryModule)){
      if(!mathEngineReady)setMathEngineReady(true);
      if(needsRecovery&&!diagnosticRecoveryReady)setDiagnosticRecoveryReady(true);
      return;
    }
    let live=true;
    const loader=needsRecovery?loadDiagnosticRecovery():loadMathEngine();
    loader.then(()=>{
      if(!live)return;
      setMathEngineReady(true);
      if(needsRecovery)setDiagnosticRecoveryReady(true);
    });
    return ()=>{live=false};
  },[hydrated,screen,s.activeSubjectId,mathEngineReady,diagnosticRecoveryReady]);

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

  useEffect(()=>{
    if(typeof window==="undefined")return;
    window.scrollTo({top:0,left:0,behavior:"auto"});
    const frame=window.requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"auto"}));
    return ()=>window.cancelAnimationFrame(frame);
  },[screen]);

  useEffect(()=>{
    if(!hydrated||typeof window==="undefined")return;
    window.history.replaceState({...window.history.state,approvaScreen:screen,approvaSubjectId:s.activeSubjectId||null},"");
    const onPopState=event=>{
      const target=event.state?.approvaScreen;
      const targetSubjectId=event.state?.approvaSubjectId;
      if(typeof targetSubjectId==="string"){
        setS(prev=>(prev.selectedSubjectIds||[]).includes(targetSubjectId)?activateSubjectState(prev,targetSubjectId):prev);
      }
      if(typeof target==="string")setScreen(target);
    };
    window.addEventListener("popstate",onPopState);
    return ()=>window.removeEventListener("popstate",onPopState);
  },[hydrated]);

  useEffect(()=>{
    if(!hydrated||typeof window==="undefined")return;
    if(window.history.state?.approvaScreen!==screen||window.history.state?.approvaSubjectId!==(s.activeSubjectId||null)){
      window.history.replaceState({...window.history.state,approvaScreen:screen,approvaSubjectId:s.activeSubjectId||null},"");
    }
  },[hydrated,screen,s.activeSubjectId]);

  const go=x=>{
    if(typeof window!=="undefined"&&hydrated&&window.history.state?.approvaScreen!==x){
      window.history.pushState({...window.history.state,approvaScreen:x,approvaSubjectId:s.activeSubjectId||null},"");
    }
    setScreen(x);
  };

  const mathSurface=(s.activeSubjectId==="math-a"||(!s.activeSubjectId&&MATH_ENGINE_SCREENS.has(screen)))&&MATH_ENGINE_SCREENS.has(screen);
  const diagnosticSurface=["diag","diagRun","diagResult"].includes(screen)&&s.activeSubjectId==="math-a";
  if(mathSurface&&(!mathEngineReady||(diagnosticSurface&&!diagnosticRecoveryReady)))return <Shell><Logo/><div className="cloudLoading">A preparar Matemática A…</div></Shell>;

  if(screen==="welcome")return <Welcome s={s} setS={setS} go={go}/>;
  if(screen==="subjectOnboard")return <SubjectSelection s={s} setS={setS} go={go}/>;
  if(screen==="subjectManager")return <SubjectManager s={s} setS={setS} go={go}/>;
  if(["home","train","progress","exams"].includes(screen)&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view={screen}/>;
  if(["home","train","progress","exams"].includes(screen)&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view={screen}/>;
  if(screen==="reviewMatter"&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view="reviewMatter"/>;
  if(screen==="reviewMatter"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view="reviewMatter"/>;
  if(screen==="physicsChemistryExam"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistryExam s={s} setS={setS} go={go}/>;
  if(screen==="physicsChemistryMini1"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistryMiniExam modelId="fqa-mini-1" s={s} setS={setS} go={go}/>;
  if(screen==="physicsChemistryMini2"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistryMiniExam modelId="fqa-mini-2" s={s} setS={setS} go={go}/>;
  if(screen==="reviewMatter")return <MathReviewMatter s={s} go={go}/>;
  if(screen==="portugueseMiniExam")return <PortuguesePassageMiniExamRoute s={s} setS={setS} go={go} onExit={()=>go("exams")}/>;
  if(screen==="onboard")return <StudentProfile s={s} setS={setS} go={go}/>;
  if(screen==="profileSettings")return <StudentProfile s={s} setS={setS} go={go} editing/>;
  if(screen==="curriculumOnboard"&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view="curriculumOnboard"/>;
  if(screen==="curriculumOnboard"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view="curriculumOnboard"/>;
  if(screen==="curriculumSettings"&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view="curriculum"/>;
  if(screen==="curriculumSettings"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view="curriculum"/>;
  if(screen==="curriculumOnboard")return <TaughtCurriculum s={s} setS={setS} go={go} onboarding/>;
  if(screen==="curriculumSettings")return <TaughtCurriculum s={s} setS={setS} go={go}/>;
  if(screen==="goalOnboard")return <GoalScreen s={s} setS={setS} go={go} onboarding/>;
  if(screen==="goalSettings")return <GoalScreen s={s} setS={setS} go={go}/>;
  if(screen==="apronsoIntro")return <ApronsoIntro setS={setS} go={go}/>;
  if(screen==="diag"&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view="diagnostic"/>;
  if(screen==="diag"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view="diagnostic"/>;
  if(screen==="diag")return <DiagIntro s={s} setS={setS} go={go}/>;
  if(screen==="diagRecoveryError")return <Shell><Logo/><div className="notice warning"><b>Não foi possível recuperar esta sessão</b><span>O estado académico não foi alterado. O progresso guardado foi conservado para uma nova tentativa.</span></div></Shell>;
  if(screen==="storageRecoveryError")return <Shell><Logo/><div className="notice warning"><b>Não foi possível ler o progresso guardado</b><span>Nenhum dado foi substituído. Reabre a app para tentar novamente.</span></div></Shell>;
  if(screen==="diagRun")return <DiagRun s={s} setS={setS} go={go} recoveredDraft={recoveredSession?.kind==="diagnostic"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="diagResult")return <DiagResult s={s} setS={setS} go={go}/>;
  if(screen==="mission")return <Mission s={s} setS={setS} go={go} recoveredDraft={recoveredSession?.kind==="mission"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="missionResult")return <MissionResult s={s} setS={setS} go={go}/>;
  if(screen==="train")return <TrainHub s={s} go={go}/>;
  if(screen==="trainingSetup"&&s.activeSubjectId==="portuguese")return <PortugueseSubject s={s} setS={setS} go={go} view="trainingSetup"/>;
  if(screen==="trainingSetup"&&s.activeSubjectId==="physics-chemistry-a")return <PhysicsChemistrySubject s={s} setS={setS} go={go} view="trainingSetup"/>;
  if(screen==="trainingSetup")return <Train s={s} setS={setS} go={go} start={cfg=>{setTrainingCfg(cfg);go("trainingRun")}}/>;
  if(screen==="trainingRun")return <TrainingRun s={s} setS={setS} go={go} cfg={trainingCfg} recoveredDraft={recoveredSession?.kind==="training"?recoveredSession:null} onRecovered={()=>setRecoveredSession(null)}/>;
  if(screen==="progress")return <Progress s={s} go={go}/>;
  if(screen==="ranking")return <Ranking s={s} setS={setS} go={go}/>;
  if(screen==="exams")return <Exams s={s} go={go} startMini={()=>{
    clearSessionDraft(s.betaMode||"internal");
    setRecoveredSession(null);
    const questions=buildMiniExam(s,MATH_MINI_EXAM_QUESTIONS);
    const ses=sessionStart("mini_exam",{questionCount:questions.length});
    setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("mini_exam_started",{sessionId:ses.id,questionCount:questions.length})]}));
    setExamSession({sessionId:ses.id,questions,answers:Array(questions.length).fill(null),markedForReview:[],current:0,startedAt:Date.now()});
    go("miniExamIntro");
  }}/>;
  if(screen==="miniExamIntro")return <MiniExamIntro session={examSession} go={go}/>;
  if(screen==="miniExamRun")return <MiniExamRun session={examSession} setSession={setExamSession} go={go}/>;
  if(screen==="miniExamReview")return <MiniExamReview session={examSession} setSession={setExamSession} s={s} setS={setS} go={go}/>;
  if(screen==="miniExamResult")return <MiniExamResult s={s} setS={setS} go={go}/>;
  if(screen==="miniExamCompletedReview")return <MiniExamCompletedReview s={s} setS={setS} go={go}/>;
  if(screen==="qa")return <QualityPanel s={s} setS={setS} go={go}/>;
  if(screen==="review")return <ReviewerDashboard s={s} setS={setS} go={go}/>;
  if(screen==="beta")return <BetaDashboard s={s} setS={setS} go={go}/>;
  if(screen==="identity")return <IdentityLab s={s} setS={setS} go={go}/>;
  if(screen==="account")return <AccountCloud s={s} setS={setS} go={go}/>;
  if(screen==="parent")return <Parent s={s} setS={setS} go={go}/>;
  if(screen==="friendsBetaInfo")return <FriendsBetaInfo s={s} go={go}/>;

  return <Home s={s} setS={setS} go={go} reset={()=>{
    clearLocalState(s.betaMode==="friends_beta"?FRIENDS_STORAGE_KEY:undefined);
    clearSessionDraft(s.betaMode||"internal");
    clearCompletionRegistry();
    setRecoveredSession(null);
    setS(isFriendsBeta(s)?activateFriendsBeta(initial):initial);go("welcome");
  }}/>;
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

function FriendsBetaInfo({s,go}){
  return <Shell><Back go={go}/><p className="eyebrow">TESTE PRIVADO</p><h1>Informação do teste</h1><FriendsBetaPanel s={s}/></Shell>;
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

function SubjectSelection({s,setS,go}){
  const [selected,setSelected]=useState([]);

  function toggleSubject(subject){
    if(!subject.available)return;
    setSelected(current=>current.includes(subject.id)
      ?current.filter(id=>id!==subject.id)
      :[...current,subject.id]);
  }

  function save(){
    if(!selected.length)return;
    const ordered=AVAILABLE_SUBJECT_IDS.filter(id=>selected.includes(id));
    setS(prev=>recordMilestone({
      ...prev,
      selectedSubjectIds:ordered,
      activeSubjectId:ordered[0],
      onboardingSharedProfileDone:false,
      onboardingSubjectIds:ordered,
      onboardingReturnSubjectId:ordered[0],
      subjectOnboardingMode:"initial"
    },"subjects_selected",{subjectIds:ordered}));
    go("onboard");
  }

  return <Shell><Logo/>
    <p className="eyebrow">O TEU PLANO DE ESTUDO</p>
    <h1>Que disciplinas queres preparar?</h1>
    <p className="muted">Escolhe os exames em que queres melhorar. Cada disciplina terá o seu diagnóstico, objetivo e plano de estudo.</p>
    <p className="subjectCatalogDate">Disciplinas dos Exames Finais Nacionais de {SUBJECT_CATALOG_YEAR}</p>

    <div className="subjectSelectionSummary">
      <div><span>{selected.length}</span><p><b>{selected.length===0?"Nenhuma disciplina selecionada":selected.length===1?"Disciplina selecionada":"Disciplinas selecionadas"}</b><small>{selected.length?"Podes adicionar outras mais tarde.":"Seleciona pelo menos uma disciplina para continuar."}</small></p></div>
    </div>
    <p className="subjectAvailabilityNote">Atualmente disponíveis: Matemática A, Português e Física e Química A.</p>

    <div className="subjectCatalog">{SUBJECT_GROUPS.map(group=>{
      const subjects=SECONDARY_EXAM_SUBJECTS.filter(subject=>subject.group===group.id);
      return <section key={group.id} className="subjectGroup" aria-labelledby={`subject-group-${group.id}`}>
        <h2 id={`subject-group-${group.id}`}>{group.label}</h2>
        <div>{subjects.map(subject=>{
          const isSelected=selected.includes(subject.id);
          return <button
            type="button"
            key={subject.id}
            className={`subjectCard ${isSelected?"selected":""} ${subject.available?"available":subject.releaseStage==="foundation"?"preparing":"coming"}`}
            disabled={!subject.available}
            aria-pressed={subject.available?isSelected:undefined}
            onClick={()=>toggleSubject(subject)}
          >
            <span className="subjectIcon" aria-hidden="true">{subject.icon}</span>
            <span className="subjectInfo">
              <b>{subject.shortName||subject.name}</b>
              <small>{subject.examYear} ano · Prova {examCodesLabel(subject)}</small>
            </span>
            <span className="subjectStatus">{subjectStatusLabel(subject,isSelected)}</span>
          </button>;
        })}</div>
      </section>;
    })}</div>

    <div className="notice"><b>Uma aplicação, várias disciplinas</b><span>Matemática A, Português e Física e Química A usam a mesma navegação. O conteúdo e os motores de correção adaptam-se à disciplina escolhida.</span></div>
    <button className="primary" disabled={!selected.length} onClick={save}>Continuar</button>
  </Shell>;
}


function SubjectManager({s,setS,go}){
  const selected=uniqueSubjectIds(s.selectedSubjectIds||[],AVAILABLE_SUBJECT_IDS);
  const active=subjectById(s.activeSubjectId);
  const subjectHomeScreen=id=>"home";

  function activate(subject){
    if(!subject.available)return;
    const isNew=!selected.includes(subject.id);
    setS(prev=>activateSubjectState(normalizeSubjectWorkspace({
      ...prev,
      selectedSubjectIds:[...(prev.selectedSubjectIds||[]),subject.id],
      activeSubjectId:subject.id,
      ...(isNew?{onboardingSubjectIds:[subject.id],onboardingReturnSubjectId:subject.id,subjectOnboardingMode:"add"}:{})
    }),subject.id));
    go(isNew?"onboard":subjectHomeScreen(subject.id));
  }

  return <Shell><Back go={go} to={subjectHomeScreen(active.id)}/><p className="eyebrow">AS TUAS DISCIPLINAS</p><h1>O que queres estudar?</h1>
    <p className="muted">A sequência e o XP são globais. Quando adicionarmos novas disciplinas, cada uma terá diagnóstico, domínio, missões e exames próprios.</p>
    <section className="subjectManagerSection"><h2>Disciplina atual</h2>
      <button type="button" className="subjectWorkspaceCard current" onClick={()=>go(subjectHomeScreen(active.id))}>
        <span className="subjectIcon" aria-hidden="true">{active.icon}</span><span><b>{active.name}</b><small>Continuar onde ficaste</small></span><strong>Ativa</strong>
      </button>
    </section>
    {selected.length>1&&<section className="subjectManagerSection"><h2>As tuas disciplinas</h2>{selected.filter(id=>id!==active.id).map(id=>{const subject=subjectById(id);return <button type="button" key={id} className="subjectWorkspaceCard" onClick={()=>activate(subject)}><span className="subjectIcon" aria-hidden="true">{subject.icon}</span><span><b>{subject.name}</b><small>Abrir plano de estudo</small></span><strong>Mudar</strong></button>})}</section>}
    <section className="subjectManagerSection"><h2>Adicionar disciplina</h2>
      {SECONDARY_EXAM_SUBJECTS.filter(subject=>!selected.includes(subject.id)).map(subject=><button type="button" key={subject.id} className={`subjectWorkspaceCard ${subject.available?"":"unavailable"}`} disabled={!subject.available} onClick={()=>activate(subject)}><span className="subjectIcon" aria-hidden="true">{subject.icon}</span><span><b>{subject.name}</b><small>{subject.examYear} ano · Prova {examCodesLabel(subject)}</small></span><strong>{subjectStatusLabel(subject)}</strong></button>)}
    </section>
    <div className="notice"><b>Uma estrutura comum para todas as disciplinas</b><span>Cada disciplina usa o mesmo workspace e mantém progresso próprio. O conteúdo e os motores de resposta são validados separadamente antes de cada disciplina sair da fase foundation.</span></div>
  </Shell>;
}

const PortugueseSubject=dynamic(()=>import("./components/PortugueseSubject"),{ssr:false});

function suggestedExamTimingForYear(year,current){
  if(year==="10.º")return "twoYears";
  if(year==="11.º")return "nextYear";
  if(year==="12.º")return "thisYear";
  if(year==="Já terminei o secundário")return "unsure";
  return current||"unsure";
}

function StudentProfile({s,setS,go,editing=false}){
  const activeSubject=subjectById(s.activeSubjectId);
  const subjectSettings=s.subjectSettings?.[activeSubject.id]||{};
  const sharedProfileDone=!editing&&s.onboardingSharedProfileDone===true;
  const onboardingStep=subjectOnboardingStep(s,activeSubject.id);
  const [p,setP]=useState(()=>({
    ...(s.profile||initial.profile),
    recentGrade:subjectSettings.profileConfigured?subjectSettings.recentGrade??"":editing?(s.profile?.recentGrade??""):"",
    examTiming:subjectSettings.profileConfigured?subjectSettings.examTiming||"unsure":editing?(s.profile?.examTiming||"unsure"):suggestedExamTimingForYear(s.profile?.schoolYear,s.profile?.examTiming),
    goal:subjectGoal(s,activeSubject.id)
  }));
  function save(){
    const saveProfile=prev=>{
      const next={
        ...prev,
        profile:p,
        goal:p.goal,
        onboardingSharedProfileDone:true,
        subjectSettings:{
          ...(prev.subjectSettings||{}),
          [activeSubject.id]:{
            ...(prev.subjectSettings?.[activeSubject.id]||{}),
            recentGrade:p.recentGrade,
            examTiming:p.examTiming,
            goal:p.goal,
            profileConfigured:true
          }
        }
      };
      return sharedProfileDone||editing?next:recordMilestone(next,"profile_completed",{
        schoolYear:p.schoolYear||null,
        subjectId:activeSubject.id,
        examTiming:p.examTiming||null
      });
    };
    if(editing){
      setS(prev=>migrateDailyMission(saveProfile(prev)));
      go("curriculumSettings");
      return;
    }
    setS(saveProfile);
    go("curriculumOnboard");
  }
  return <Shell><Logo/><p className="eyebrow">{editing?"PERCURSO ESCOLAR":`CONFIGURAÇÃO ${onboardingStep.position} DE ${onboardingStep.total} · ${activeSubject.name.toUpperCase()}`}</p>
    <h1>{editing?"Atualiza o que estás a estudar.":<>Ajuda a <BrandName/> a começar no sítio certo.</>}</h1>
    <p className="muted">{editing
      ?"O teu histórico não é apagado. Ao mudares de ano ou de tema opcional, a app ajusta apenas o conteúdo que pode influenciar o plano a partir de agora."
      :<>Estas respostas só definem o <b>ponto de partida</b> do diagnóstico. Nunca são usadas como se fossem prova do teu nível.</>}</p>

    {!editing&&<div className="subjectConfigBanner" aria-label={`A configurar ${activeSubject.name}`}><span>{activeSubject.icon||"Aa"}</span><div><small>DISCIPLINA EM CONFIGURAÇÃO</small><b>{activeSubject.name}</b><p>A nota recente, a data do exame e a matéria dada serão guardadas apenas nesta disciplina.</p></div></div>}
    {!sharedProfileDone&&<><h3>Em que ano estás?</h3>
    <div className="chips">{["10.º","11.º","12.º","Já terminei o secundário"].map(x=><button key={x} className={p.schoolYear===x?"sel":""} onClick={()=>setP({...p,schoolYear:x,examTiming:suggestedExamTimingForYear(x,p.examTiming),optionalTopics:x==="12.º"?(p.optionalTopics||[]):[],taughtSubtopicIds:x===p.schoolYear?(p.taughtSubtopicIds||[]):[]})}>{x}</button>)}</div></>}
    {sharedProfileDone&&<div className="notice"><b>Ano escolar: {p.schoolYear}</b><span>Esta informação é comum a todas as disciplinas e não precisa de ser repetida.</span></div>}

    {activeSubject.id==="math-a"&&p.schoolYear==="12.º"&&<>
      <h3>Que tema opcional está a tua turma a estudar?</h3>
      <p className="muted">Seleciona apenas o que já foi escolhido na tua turma. Podes selecionar mais do que um se for esse o caso. Se ainda não sabes, deixa vazio.</p>
      <div className="stackChoices">{[
        ["inferencia","Inferência estatística"],
        ["integrais","Primitivas e integrais"],
        ["matrizes","Matrizes"]
      ].map(([v,l])=>{
        const selected=(p.optionalTopics||[]).includes(v);
        return <button key={v} className={selected?"sel":""} onClick={()=>setP({...p,optionalTopics:selected?(p.optionalTopics||[]).filter(x=>x!==v):[...(p.optionalTopics||[]),v]})}>{l}</button>;
      })}</div>
    </>}

    <h3>{p.schoolYear==="Já terminei o secundário"?`Que nota tinhas aproximadamente a ${activeSubject.name}?`:`Que nota tens tido aproximadamente a ${activeSubject.name}?`}</h3>
    <div className="gradeInput"><input inputMode="numeric" min="0" max="20" placeholder="Ex.: 14" value={p.recentGrade} onChange={e=>{
      const raw=e.target.value.replace(/[^0-9]/g,"");
      const n=raw===""?"":Math.max(0,Math.min(20,Number(raw)));
      setP({...p,recentGrade:n});
    }}/><span>/20</span></div>

    <h3>Quando pretendes fazer o exame?</h3>
    <div className="stackChoices">
      {[["thisYear","Este ano letivo"],["nextYear","No próximo ano"],["twoYears","Daqui a 2 anos"],["unsure","Ainda não sei"]].map(([v,l])=><button key={v} className={p.examTiming===v?"sel":""} onClick={()=>setP({...p,examTiming:v})}>{l}</button>)}
    </div>

    <h3>Que nota queres alcançar a {activeSubject.name}?</h3>
    <p className="muted">Este objetivo é específico desta disciplina. Ajusta a exigência das Missões e pode ser diferente nas outras disciplinas.</p>
    <div className="goalInline">
      <div className="goalHero compact"><strong>{p.goal}</strong><span>valores</span></div>
      <div className="sliderLabels"><span>10</span><span>15</span><span>20</span></div>
      <input aria-label={`Nota objetivo de ${activeSubject.name}`} className="goalSlider" type="range" min="10" max="20" step="1" value={p.goal} onChange={e=>setP({...p,goal:Number(e.target.value)})}/>
    </div>

    <div className="notice"><b>Exemplo</b><span>Se tens tido 18 valores, a app não começa por perguntas demasiado elementares. Se a evidência contrariar essa indicação, adapta imediatamente.</span></div>
    <button className="primary" onClick={save}>{editing?"Guardar percurso":`Continuar para a matéria de ${activeSubject.name}`}</button>
  </Shell>
}

function TaughtCurriculum({s,setS,go,onboarding=false}){
  const onboardingStep=subjectOnboardingStep(s,"math-a");
  const onboardingDoneScreen=s.subjectOnboardingMode==="add"?"diag":"apronsoIntro";
  const themes=currentYearThemes(s.profile);
  const subtopicsByTheme=new Map(themes.map(t=>[t.id,curriculumSubtopicsForTheme(t.id)]));
  const valid=new Set([...subtopicsByTheme.values()].flat().map(row=>row.id));
  const [selected,setSelected]=useState(()=>normalizeTaughtSubtopics(s.profile));
  const selectedSet=new Set(selected);
  const finished=s.profile?.schoolYear==="Já terminei o secundário";

  function toggle(id){
    if(selectedSet.has(id)){
      const hasEvidence=Object.values(s.scores||{}).some(score=>(score.evidence||[]).some(e=>(e.subtopicId||curriculumSubtopicId(e.themeId,e.microcompetencyId||e.focus))===id));
      if(hasEvidence&&!window.confirm("Já existem resultados nesta submatéria. Queres retirá-la das recomendações sem apagar o histórico?"))return;
    }
    setSelected(rows=>rows.includes(id)?rows.filter(x=>x!==id):[...rows,id]);
  }
  function toggleTheme(t){
    const ids=(subtopicsByTheme.get(t.id)||[]).map(row=>row.id);
    const all=ids.every(id=>selectedSet.has(id));
    const hasEvidence=all&&Object.values(s.scores||{}).some(score=>(score.evidence||[]).some(e=>ids.includes(e.subtopicId||curriculumSubtopicId(e.themeId,e.microcompetencyId||e.focus))));
    if(hasEvidence&&!window.confirm("Já existem resultados nesta matéria. Queres retirá-la das recomendações sem apagar o histórico?"))return;
    setSelected(rows=>all?rows.filter(id=>!ids.includes(id)):[...new Set([...rows,...ids])]);
  }
  function save(){
    const clean=finished?[...valid]:selected.filter(id=>valid.has(id));
    clearSessionDraft(s.betaMode||"internal");
    setS(prev=>{
      const at=Date.now();
      const betaSessions=(prev.betaSessions||[]).map(session=>session.finishedAt||!["diagnostic","mission","mini_exam"].includes(session.kind)?session:{...session,finishedAt:at,durationSeconds:Math.max(1,Math.round((at-(session.startedAt||at))/1000)),meta:{...(session.meta||{}),recoveryStatus:"scope_changed",abandonedAt:at}});
      const configured=migrateDailyMission({...prev,betaSessions,profile:{...prev.profile,taughtSubtopicIds:clean},subjectSettings:{...(prev.subjectSettings||{}),"math-a":{...(prev.subjectSettings?.["math-a"]||{}),curriculumConfigured:true}}});
      return onboarding&&onboardingStep.nextId
        ?activateSubjectState(configured,onboardingStep.nextId)
        :onboarding?finishSubjectOnboardingState(configured,onboardingStep.firstId):configured;
    });
    go(onboarding?(onboardingStep.nextId?"onboard":onboardingDoneScreen):"progress");
  }

  if(finished){
    return <Shell><Logo/><p className="eyebrow">{onboarding?`MATÉRIA DADA · ${onboardingStep.position} DE ${onboardingStep.total} · MATEMÁTICA A`:"MATÉRIA DADA NA ESCOLA"}</p>
      <div className="completedCurriculumHero"><span>✓</span><div><small>MATÉRIA ASSUMIDA COMO DADA</small><h1>Todo o programa de Matemática A fica disponível.</h1><p>Como já terminaste o secundário, a app assume automaticamente a matéria do 10.º, 11.º e 12.º anos. Podes alterar esta informação mais tarde nas definições de matéria dada.</p></div></div>
      <button className="primary" onClick={save}>{onboarding?"Continuar":"Guardar"}</button></Shell>;
  }

  return <Shell><Logo/>
    <p className="eyebrow">{onboarding?`MATÉRIA DADA · ${onboardingStep.position} DE ${onboardingStep.total} · MATEMÁTICA A`:"MATÉRIA DADA NA ESCOLA"}</p>
    <h1>O que já deste no {s.profile?.schoolYear}?</h1>
    <p className="muted">A matéria dos anos anteriores já fica disponível. No teu ano atual, assinala apenas o que a escola já ensinou. Podes voltar aqui sempre que começares matéria nova.</p>
    <div className="scopeCounter"><b>{selected.length}</b><span>de {valid.size} submatérias assinaladas</span></div>
    <div className="curriculumPicker">{themes.map(t=>{
      const rows=subtopicsByTheme.get(t.id)||[];
      const ids=rows.map(row=>row.id);
      const count=ids.filter(id=>selectedSet.has(id)).length;
      return <details key={t.id} open={count>0}>
        <summary><div><b>{t.short}</b><small>{count}/{ids.length} selecionadas</small></div><span>⌄</span></summary>
        <button type="button" className="selectTheme" onClick={()=>toggleTheme(t)}>{count===ids.length?"Desmarcar esta matéria":"Selecionar toda esta matéria"}</button>
        <div>{rows.map(row=><label key={row.id}><input type="checkbox" checked={selectedSet.has(row.id)} onChange={()=>toggle(row.id)}/><span>{row.label}</span></label>)}</div>
      </details>;
    })}</div>
    {selected.length===0&&<div className="notice warning"><b>Ainda não assinalaste nenhuma submatéria deste ano</b><span>A app usará apenas matéria de anos anteriores. No 10.º ano, o Diagnóstico ficará indisponível até assinalares pelo menos uma submatéria.</span></div>}
    <div className="notice"><b>O teu histórico fica guardado</b><span>Se desmarcares uma submatéria, os resultados anteriores não são apagados; apenas deixam de influenciar o plano enquanto ela estiver fora do âmbito.</span></div>
    <div className="notice"><b>Conteúdo em validação</b><span>A seleção representa o que já aprendeste, mesmo que algumas submatérias ainda não tenham perguntas validadas. A app nunca usa automaticamente as 5.650 perguntas protótipo.</span></div>
    <button className="primary" onClick={save}>{onboarding?"Continuar":"Guardar matéria dada"}</button>
  </Shell>;
}

function GoalScreen({s,setS,go,onboarding=false}){
  const activeSubject=subjectById(s.activeSubjectId);
  const [goal,setGoal]=useState(()=>subjectGoal(s,activeSubject.id));
  function save(){
    setS(prev=>{
      const next={...prev,goal,subjectSettings:{...(prev.subjectSettings||{}),[activeSubject.id]:{...(prev.subjectSettings?.[activeSubject.id]||{}),goal}}};
      return onboarding
        ?recordMilestone(next,"goal_completed",{goal,subjectId:activeSubject.id})
        :next;
    });
    go(onboarding?"apronsoIntro":"home");
  }
  return <Shell><Logo/>
    <p className="eyebrow">{onboarding?"O TEU OBJETIVO":"AJUSTAR OBJETIVO"}</p>
    <h1>Que nota queres alcançar a {activeSubject.name}?</h1>
    <p className="muted">{onboarding
      ?"Isto ajusta a exigência das Missões. Não é uma previsão da tua nota."
      :"Podes alterar o objetivo quando quiseres. A app adapta as decisões seguintes sem apagar o teu histórico."}</p>
    <div className="goalHero"><strong>{goal}</strong><span>valores</span></div>
    <div className="sliderLabels"><span>10</span><span>15</span><span>20</span></div>
    <input aria-label={`Nota objetivo de ${activeSubject.name}`} className="goalSlider" type="range" min="10" max="20" step="1" value={goal} onChange={e=>setGoal(Number(e.target.value))}/>
    <div className="goalMessage"><b>{goal>=18?"Objetivo muito exigente":goal>=16?"Objetivo ambicioso":"Objetivo sólido"}</b>
      <span>A dificuldade e profundidade do plano serão ajustadas progressivamente a este objetivo.</span></div>
    <button className="primary" onClick={save}>{onboarding?"Continuar":"Guardar novo objetivo"}</button>
  </Shell>
}

const PRE_DIAGNOSTIC_TOUR_STEPS=[
  {mascot:"welcome",eyebrow:"PASSO 1 DE 4",title:"Conhece o Apronso",text:<>Sou o teu parceiro de estudo na <BrandName/>. Vou ajudar-te a perceber o que estudar e acompanhar-te até aos exames.</>},
  {mascot:"thinking",eyebrow:"PASSO 2 DE 4",title:"Primeiro, quero conhecer-te",text:"O diagnóstico não é uma nota. Serve para encontrar um bom ponto de partida em cada disciplina."},
  {mascot:"thinking",eyebrow:"PASSO 3 DE 4",title:"Missões curtas e focadas",text:"Na Home vais encontrar uma Missão diária escolhida a partir do teu percurso e da evidência que fores criando."},
  {mascot:"progress",eyebrow:"PASSO 4 DE 4",title:"Treinar, fazer exames e acompanhar a evolução",text:["Em Praticar escolhes matéria e submatéria.","Em Exames fazes Mini-exames e, quando disponível, o Exame Completo.","Em Progresso acompanhas a evolução de cada disciplina."]}
];

function ApronsoIntro({setS,go}){
  function finish(skipped=false){
    setS(prev=>recordMilestone({...prev,firstUseTourCompleted:true},"apronso_intro_completed",{skipped,steps:skipped?null:PRE_DIAGNOSTIC_TOUR_STEPS.length}));
    go("diag");
  }
  return <FirstUseTour
    steps={PRE_DIAGNOSTIC_TOUR_STEPS}
    ariaLabel="Conhece o Apronso antes do diagnóstico"
    finalLabel="Ir para o diagnóstico →"
    onComplete={()=>finish(false)}
    onSkip={()=>finish(true)}
  />;
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
  const difficulty=startingDifficulty(s.profile,s.goal);
  const hasIndicatedScope=academicScopeThemes(s.profile).length>0;
  const profileBlueprint=diagnosticBlueprintForProfile(s.profile);
  const blueprint=profileBlueprint.filter(themeId=>diagnosticAnchor(themeId,difficulty,s));
  const gated=blueprint.length===0;
  return <Shell><Logo/><p className="eyebrow">AVALIAÇÃO INICIAL · MATEMÁTICA A · PROVA 635</p>
    <div className="diagApronsoHero"><div><h1>Diagnóstico de Matemática A</h1><div className="diagPurposeHero"><small>PARA ENCONTRAR O MELHOR PONTO DE PARTIDA</small><strong>Não é uma avaliação. A app usa apenas matéria do teu percurso e aprofunda só quando precisa de perceber melhor uma dificuldade.</strong></div></div><Apronso pose="thinking" alt="Apronso a pensar"/></div>
    <div className="diagIntroGrid">
      <div><span>⏱</span><b>~10–20 min</b><small>Pode terminar mais cedo se já houver evidência suficiente.</small></div>
      <div><span>🎯</span><b>Só o necessário</b><small>As perguntas adaptam-se ao que vais respondendo.</small></div>
      <div><span>🧠</span><b>Sem nota final</b><small>O perfil continua a ser afinado nas Missões seguintes.</small></div>
    </div>
    {saveError&&<div className="notice warning"><b>Não foi possível guardar o progresso</b><span>Tenta novamente antes de começar.</span></div>}
    {gated&&<div className="notice warning"><b>{profileBlueprint.length?"Diagnóstico bloqueado pelo gate editorial":hasIndicatedScope?"As submatérias indicadas ainda não entram no diagnóstico":"Primeiro indica a matéria que já deste"}</b><span>{profileBlueprint.length
      ?"Este modo só permite conteúdo revisto e ainda não existem perguntas elegíveis suficientes. Volta ao modo Interno ou valida conteúdo no painel de revisão."
      :hasIndicatedScope
        ?"A tua seleção ficou guardada. O diagnóstico inicial atual ainda não tem perguntas adequadas para essas submatérias; não precisas de voltar a indicá-las. Podes acrescentar outra matéria já lecionada para começares."
        :"Não vamos avaliar matéria que a tua escola ainda não ensinou. Assinala pelo menos uma submatéria do teu ano para começares."}</span></div>}
    {gated&&!profileBlueprint.length&&<button className="secondary" onClick={()=>go("curriculumSettings")}>{hasIndicatedScope?"Adicionar outra matéria dada":"Indicar matéria dada"}</button>}
    <button className="primary" disabled={gated} onClick={()=>{
      const existing=loadSessionDraft(s.betaMode||"internal");
      const open=(s.betaSessions||[]).filter(x=>x.kind==="diagnostic"&&!x.finishedAt);
      if(existing?.kind==="diagnostic"){go("diagRun");return}
      if(open.length){setSaveError(true);return}
      const ses=sessionStart("diagnostic",{goal:s?.goal||null});
      const current=diagnosticAnchor(blueprint[0],difficulty,s);
      const draft=createDiagnosticDraft({session:ses,item:current,betaMode:s.betaMode||"internal",difficulty,blueprint});
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
  const blueprintLength=Math.max(1,draft.blueprint?.length||DIAGNOSTIC_BLUEPRINT.length);
  const estimate=Math.min(94,Math.round(((anchorsDone+Math.min(probeCount,1)*.5)/blueprintLength)*100));

  function answer(n){
    if(!ready||fb||draft.pendingResponse)return;
    const selected={...draft,sel:n,fb:null};
    if(!saveSessionDraft(selected)){setSaveError(true);return}
    setSaveError(false);setDraft(selected);
  }

  function submitAnswer(){
    if(!ready||sel===null||fb||draft.pendingResponse)return;
    const submitted={...draft,fb:{correct:sel===current.a}};
    if(!saveSessionDraft(submitted)){setSaveError(true);return}
    setSaveError(false);setDraft(submitted);
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
    <StudySessionHeader progress={Math.max(8,estimate)} label="Diagnóstico" onExit={()=>go("diag")}/>
    {saveError&&<div className="notice warning"><b>Estamos a conservar o teu progresso</b><span>Tenta continuar novamente. A resposta guardada não será repetida.</span></div>}
    <p className="questionContext">{theme(current.themeId).short}</p>
    <details className="focusDisclosure"><summary>ⓘ Sobre esta pergunta</summary>
      <div className="questionMeta"><span>{current.role==="probe"?"Pergunta de aprofundamento":"Pergunta-âncora"}</span><span>{current.cognitive} · nível {current.difficulty}</span><span>{anchorsDone?`${anchorsDone} áreas-âncora já observadas`:"A construir o primeiro mapa"}</span><span>Dificuldade atual: {difficulty===1?"base":difficulty===2?"intermédia":"elevada"}</span></div>
      {current.role==="probe"&&<div className="branchNote"><span>A resposta anterior deixou dúvidas. Esta pergunta mais simples ajuda a distinguir uma lacuna de base de um erro pontual.</span></div>}
    </details>
    <h2>{current.q}</h2>
    <QuestionOptions q={current} sel={sel} fb={fb} answer={answer}/>
    {fb&&<div className={"feedback answerFeedback "+(fb.correct?"good":"bad")}><b>{fb.correct?"✓ Muito bem!":"Não é essa."}</b><span>{fb.correct?conciseMathExplanation(current.sol):<>A resposta correta é:<strong>{current.o[current.a]}</strong>{current.sol&&<small>{conciseMathExplanation(current.sol)}</small>}</>}</span></div>}
    {!fb
      ?<button className="primary" disabled={sel===null} onClick={submitAnswer}>Responder</button>
      :<button className="primary" onClick={next}>Próxima pergunta →</button>}
    <button className="pauseLink" onClick={()=>go("diag")}>Guardar e continuar depois</button>
  </Shell>
}

function DiagResult({s,setS,go}){
  const measured=measuredThemes(s);
  const scopedTotal=academicScopeThemes(s.profile).length;
  const priority=selectMissionTheme(s);
  const index=prepIndex(s);
  const ranked=[...measured].sort((a,b)=>(s.scores[a.id].domain??100)-(s.scores[b.id].domain??100)).slice(0,4);

  return <Shell><div className="centered"><Logo/><Apronso pose="celebrate" className="resultApronso" alt="Apronso celebra o diagnóstico concluído"/>
    <p className="eyebrow">JÁ TEMOS INFORMAÇÃO SUFICIENTE</p>
    <h1>Podemos criar o teu primeiro plano.</h1>
    <div className="indexCircle"><strong>{index}</strong><span>/100</span></div>
    <p className="indexQualifier">Índice inicial parcial · {measured.length}/{scopedTotal} áreas do teu percurso com evidência</p>
    <p className="muted">Não é uma fotografia completa da Matemática A. A app vai preencher as áreas em falta e recalibrar as restantes durante as próximas Missões.</p>
  </div>

  {priority&&<div className="notice"><b>Primeira prioridade: {priority.short}</b>
    <span>A escolha combina Domínio, certeza da app, relevância para o exame e pré-requisitos. Não é simplesmente “o score mais baixo”.</span></div>}

  <div className="resultSkills">{ranked.map(t=>{
    const v=s.scores[t.id];
    return <div className="resultSkill" key={t.id}><div><b>{t.short}</b><small>Domínio estimado: {v.domain}/100</small></div>
      <div className="certainty"><span>Certeza da app</span><strong>{certaintyLabel(v.conf,v.evidence.length)}</strong></div></div>
  })}</div>

  <div className="notice"><b>Domínio ≠ Certeza da app</b>
    <span><b>Domínio</b> é quanto a app estima que sabes. <b>Certeza da app</b> é quão segura está dessa estimativa — não mede a tua confiança em ti próprio.</span></div>

  <FriendsBetaDisclaimer s={s}/>
  <DailyCompletionNote s={s}/>
  <CompetitionXpNote s={s}/>
  {isFriendsBeta(s)&&<BetaSessionFeedback s={s} setS={setS} kind="diagnostic"/>}
  <button className="primary" onClick={()=>{
    setS(prev=>recordMilestone(dismissDailyMissionPrompt(prev),"first_plan_viewed",{
      measuredThemes:measured.length,
      firstPriority:priority?.id||null
    }));
    go("home");
  }}>Ir para o menu inicial</button>
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
      <div className="dailyMissionContent">
      <div className="dailyMissionModalTop">
        <small>{mode==="resume"?"MISSÃO EM PAUSA":"NOVA MISSÃO DISPONÍVEL"}</small>
        <span>🔥 {daily.streak} {daily.streak===1?"dia":"dias"}</span>
      </div>
      <div className="dailyMissionHero">
        <div className="dailyMissionTitle">
          <span>{typeMeta.icon}</span>
          <div><small>A TUA MISSÃO DE HOJE · {typeMeta.label.toUpperCase()}</small>
            <h2>{mode==="resume"?"Continuamos de onde ficaste?":t?.short||"Missão de Hoje"}</h2>
            {plan.focus&&<b>{plan.focus}</b>}
          </div>
        </div>
        <Apronso pose="thinking" className="dailyMissionApronso" alt="Apronso apresenta a Missão de hoje"/>
      </div>

      <p className="dailyMissionReason">{mode==="resume"
        ?"O teu progresso ficou guardado. Não começamos outra Missão: continuas exatamente a Missão de hoje."
        :plan.reason}</p>

      <p className="dailyMissionScope"><b>Matéria desta Missão:</b> apenas submatérias já lecionadas no teu ano, incluindo automaticamente a matéria dos anos anteriores.</p>

      {plan.reasons?.length>0&&mode!=="resume"&&<div className="dailyMissionWhy">
        <small>PORQUE ESTA MISSÃO?</small>
        {plan.reasons.slice(0,2).map((r,i)=><div key={`${r.kind||"reason"}-${i}`}><span>✓</span><p><b>{r.title}</b><small>{r.detail}</small></p></div>)}
      </div>}

      <div className="dailyMissionRewards">
        <div><span>⏱</span><b>{duration}</b><small>duração estimada</small></div>
        <div><span>🏆</span><b>+50 XP</b><small>competitivo</small></div>
        <div><span>🔥</span><b>{daily.streak?`Dia ${daily.streak+1}`:"Começar"}</b><small>{daily.streak?"se mantiveres amanhã":"a tua sequência"}</small></div>
      </div>
      </div>

      <div className="dailyMissionActions">
        <button className="dailyMissionStart" onClick={onStart}>{mode==="resume"?"Continuar Missão →":"Começar Missão →"}</button>
        <button className="dailyMissionLater" onClick={onDismiss}>Agora não · ver a Home</button>
        <small className="dailyMissionFoot">Existe apenas uma Missão principal por dia. Depois podes continuar com Treino Livre ou Exames.</small>
      </div>
    </section>
  </div>;
}

const FIRST_USE_TOUR_STEPS=[
  {mascot:"thinking",eyebrow:"PASSO 1 DE 2",title:"Onde encontras o Apronso",text:"Estou contigo na Missão diária, onde a app escolhe uma sessão curta com base no que será mais útil estudar a seguir."},
  {mascot:"progress",eyebrow:"PASSO 2 DE 2",title:"Treina e acompanha a evolução",text:["Em Praticar escolhes qualquer matéria.","Em Exames encontras Mini-exames e, quando disponível, o Exame Completo.","Em Progresso vês o teu Domínio e a certeza da app."]}
];

function FirstUseTour({onComplete,onSkip,steps=FIRST_USE_TOUR_STEPS,ariaLabel="Como funciona a APProva+",finalLabel="Começar →"}){
  const [step,setStep]=useState(0);
  const item=steps[step];
  const last=step===steps.length-1;
  return <div className="dailyMissionOverlay firstUseTourOverlay" role="dialog" aria-modal="true" aria-label={ariaLabel}>
    <section className="firstUseTourModal">
      <div className="firstUseTourProgress" aria-label={`Passo ${step+1} de ${steps.length}`}>
        {steps.map((_,i)=><i key={i} className={i<=step?"active":""}/>) }
      </div>
      <Apronso pose={item.mascot} className="firstUseTourMascot" alt=""/>
      <small>{item.eyebrow}</small>
      <h2>{item.title}</h2>
      {Array.isArray(item.text)?<div className="firstUseTourText">{item.text.map(line=><p key={line}>{line}</p>)}</div>:<p>{item.text}</p>}
      <button className="firstUseTourNext" onClick={()=>last?onComplete():setStep(current=>current+1)}>{last?finalLabel:"Seguinte →"}</button>
      <button className="firstUseTourSkip" onClick={onSkip}>Saltar explicação</button>
    </section>
  </div>;
}


function Home({s,setS,go,reset}){
  const missionDone=missionCompletedToday(s);
  const completedMission=todayMissionRecord(s);
  const devView=typeof window!=="undefined" && new URLSearchParams(window.location.search).get("dev")==="1";
  const computedPlan=dailyMissionPlan(s);
  const persistedPlan=missionPlanForToday(s,null);
  const [pausedDraft,setPausedDraft]=useState(()=>typeof window!=="undefined"?loadSessionDraft(s.betaMode||"internal"):null);
  const plan=pausedDraft?.kind==="mission"&&pausedDraft.plan
    ?pausedDraft.plan
    :(persistedPlan||computedPlan);
  const t=plan.themeId?theme(plan.themeId):null;
  const ranked=rankedStudyPriorities(s,4);
  const [showMissionModal,setShowMissionModal]=useState(false);
  const [missionModalMode,setMissionModalMode]=useState("new");
  const showFirstUseTour=s.diagnosticDone&&s.firstUseTourCompleted!==true;
  const pendingSelectedDiagnostics=hasPendingSelectedDiagnostics(s);

  useEffect(()=>{
    if(typeof window==="undefined"||missionDone||showFirstUseTour||pendingSelectedDiagnostics)return;

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
  },[s.firstUseTourCompleted,pendingSelectedDiagnostics]);

  function finishFirstUseTour(skipped=false){
    setS(prev=>recordMilestone({...prev,firstUseTourCompleted:true},"first_use_tour_completed",{skipped,steps:skipped?null:FIRST_USE_TOUR_STEPS.length}));
  }

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

  const probableNext=ranked[0]?.theme;
  return <main className="learnHome">
    {showFirstUseTour
      ?<FirstUseTour onComplete={()=>finishFirstUseTour(false)} onSkip={()=>finishFirstUseTour(true)}/>
      :showMissionModal&&<DailyMissionModal s={s} plan={plan} mode={missionModalMode} onStart={()=>startDailyMission("daily_modal")} onDismiss={dismissMissionModal}/>}
    <section className="wrap studentSurface">
    <StudentTop s={s} go={go}><details className="studentMenu"><summary aria-label="Abrir menu">•••</summary><div><button onClick={()=>go("curriculumSettings")}>Matéria dada na escola</button><button onClick={()=>go("profileSettings")}>Ano e percurso escolar</button><button onClick={()=>go("goalSettings")}>Objetivo: {s.goal} valores</button><button onClick={()=>setS(prev=>({...prev,firstUseTourCompleted:false}))}>Apronso e como funciona a app</button>{isFriendsBeta(s)?<button onClick={()=>go("friendsBetaInfo")}>Informação do teste</button>:<button onClick={()=>go("account")}>Conta e progresso na cloud</button>}<button onClick={()=>go("parent")}>Área dos pais</button>{devView&&<><button onClick={()=>go("identity")}>Identidade demo</button><button onClick={()=>go("qa")}>Qualidade</button><button onClick={()=>go("review")}>Revisão pedagógica</button><button onClick={()=>go("beta")}>Beta Dashboard</button><button onClick={reset}>Recomeçar protótipo</button></>}</div></details></StudentTop>
    <FriendsBetaRibbon s={s}/><div className="learnIntro"><p>Olá 👋</p><h1>O teu próximo passo.</h1><span>{missionDone?"Missão feita. Podes continuar por tua conta.":"Uma recomendação curta, escolhida a partir do teu percurso."}</span></div>

    {pausedDraft&&<div className="pausedSession"><div><small>SESSÃO EM PAUSA</small><b>{pausedDraft.kind==="mini_exam"?"Mini-exame":pausedDraft.kind==="training"?"Treino Livre":"Missão"}</b><span>O teu progresso desta sessão ficou guardado neste dispositivo.</span></div><button onClick={()=>{
      if(pausedDraft.kind==="mini_exam")go(pausedDraft.screen||"miniExamRun");
      else if(pausedDraft.kind==="training")go("trainingRun");
      else go("mission");
    }}>Continuar →</button></div>}

    <section className="adaptivePath" aria-label="Caminho adaptativo">
      <div className="pathNode done"><span>✓</span><div><small>ÚLTIMO PASSO</small><b>{completedMission?.focus||theme(completedMission?.themeId)?.short||"Diagnóstico concluído"}</b></div></div>
      <div className="pathLine active"/>
      <div className={"pathNode current "+(missionDone?"complete":"")}><span>{missionDone?"✓":"●"}</span><article><small>{missionDone?"MISSÃO CONCLUÍDA":"MISSÃO DE HOJE"}</small><h2>{missionDone?(completedMission?.focus||theme(completedMission?.themeId)?.short||"Bom trabalho"):(plan.focus||t?.short||"Conteúdo protegido")}</h2><div className="missionCardMeta"><span>~3–5 min</span>{!missionDone&&t?.year&&<span>{t.year}</span>}</div>{missionDone?<button onClick={()=>go("train")}>Continuar a estudar</button>:<button disabled={plan.type==="blocked"} onClick={()=>startDailyMission("home_card")}>{plan.type==="blocked"?"Indisponível":pausedDraft?.kind==="mission"?"Continuar Missão":"Começar Missão"}</button>}{!missionDone&&plan.reasons?.length>0&&<details><summary>Porque esta Missão?</summary><p>{plan.reason}</p></details>}</article></div>
      <div className="pathLine"/>
      <div className="pathNode next"><span>○</span><div><small>PRÓXIMO PASSO PROVÁVEL</small><b>{probableNext?.short||"A definir após esta sessão"}</b><p>Pode mudar com nova evidência.</p></div></div>
    </section>
    <StudentNav active="home" go={go}/>
  </section></main>
}


function Mission({s,setS,go,recoveredDraft=null,onRecovered=()=>{}}){
  const completingRef=useRef(false);
  const draft=recoveredDraft || (typeof window!=="undefined" ? loadSessionDraft(s.betaMode||"internal") : null);
  const [sessionId]=useState(()=>draft?.sessionId||latestOpenSessionId(s,"mission"));
  const [plan]=useState(()=>draft?.plan||missionPlanForToday(s,dailyMissionPlan(s)));
  const targetId=plan.themeId;
  const [before]=useState(()=>draft?.before||scopedThemeScore(s,targetId));
  const [beforeFocus]=useState(()=>draft?.beforeFocus??(plan.focus?focusScore(s,targetId,plan.focus):null));
  const [current,setCurrent]=useState(()=>draft?.current||({...selectQuestionForPlan(s,plan,[],[]),sessionRole:"target"}));
  const [sel,setSel]=useState(draft?.sel??null);
  const [fb,setFb]=useState(draft?.fb??null);
  const [usedIds,setUsedIds]=useState(draft?.usedIds||[]);
  const [usedSignatures,setUsedSignatures]=useState(draft?.usedSignatures||[]);
  const [targetItems,setTargetItems]=useState(draft?.targetItems||[]);
  const [targetCount,setTargetCount]=useState(draft?.targetCount||0);
  const [totalCount,setTotalCount]=useState(draft?.totalCount||0);
  const [estimatedSeconds,setEstimatedSeconds]=useState(draft?.estimatedSeconds||0);
  const [pendingError,setPendingError]=useState(draft?.pendingError||null);
  const [detour,setDetour]=useState(draft?.detour||null);

  useEffect(()=>{
    if(draft)onRecovered();
  },[]);

  useEffect(()=>{
    if(!targetId || !current)return;
    saveSessionDraft({
      kind:"mission",betaMode:s.betaMode||"internal",sessionId,plan,before,beforeFocus,current,sel,fb,
      usedIds,usedSignatures,targetItems,targetCount,totalCount,pendingError,detour,estimatedSeconds
    });
  },[plan,current,sel,fb,usedIds,usedSignatures,targetItems,targetCount,totalCount,pendingError,detour,estimatedSeconds]);

  if(missionCompletedToday(s) && !draft){
    return <Shell><Back go={go}/><div className="centered"><div className="check">✓</div><p className="eyebrow">MISSÃO DE HOJE CONCLUÍDA</p>
      <h1>Volta amanhã para uma nova Missão.</h1><p className="muted">Hoje podes continuar com Treino Livre ou Exames. O que fizeres será tido em conta quando o motor preparar a próxima Missão.</p></div>
      <button className="primary" onClick={()=>go("train")}>Treino Livre</button><button className="secondary" onClick={()=>go("exams")}>Exames</button></Shell>;
  }

  function answer(n){if(!fb)setSel(n)}
  function submitAnswer(){if(!fb&&isResponseAnswered(current,sel))setFb(gradeResponse(current,sel))}

  function closeMission(finalState,finalDetour=detour,newTargetCount=targetCount,newTotal=totalCount+1,stopDecision=null,newEstimatedSeconds=estimatedSeconds){
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
      estimatedSeconds:newEstimatedSeconds,
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
    const correct=fb?.correct===true;
    const newUsed=[...usedIds,current.id];
    const newSigs=[...usedSignatures,current.signature||current.id];
    const newTotal=totalCount+1;
    const newEstimatedSeconds=estimatedSeconds+estimateMissionSeconds(current);
    setUsedIds(newUsed);setUsedSignatures(newSigs);setTotalCount(newTotal);
    setEstimatedSeconds(newEstimatedSeconds);

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
    }else if(!current.practiceOnly){
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
      currentFocusScore,
      estimatedSeconds:newEstimatedSeconds
    });

    if(stopDecision.stop){
      closeMission(nextState,finalDetour,newTargetCount,newTotal,stopDecision,newEstimatedSeconds);return;
    }

    const practice=missionPracticeQuestion(nextState,plan,newTotal,newUsed);
    const planned=selectQuestionForPlan(nextState,plan,newUsed,newSigs);
    const minimumFallback=newTotal<STUDY_SESSION_MIN_QUESTIONS?selectMissionQuestion(nextState,targetId,newUsed,newSigs):null;
    const nxt=practice||planned||minimumFallback;
    if(!nxt){
      closeMission(nextState,finalDetour,newTargetCount,newTotal,missionContentExhaustedDecision(),newEstimatedSeconds);return
    }
    setCurrent({...nxt,sessionRole:nxt.practiceOnly?"guided":"target"});setSel(null);setFb(null);
  }

  if(!current)return <Shell><Back go={go}/><h1>Ainda não existem perguntas suficientes para esta Missão.</h1></Shell>;

  const missionStage=totalCount===0?"A começar":totalCount<3?"A aprofundar":"Quase concluída";
  return <Shell>
    <StudySessionHeader progress={Math.min(88,22+totalCount*22)} label={missionStage} onExit={()=>go("home")}/>
    {draft&&<div className="resumeBanner"><b>↻ Sessão retomada</b><span>Continuaste exatamente no ponto onde tinhas ficado.</span></div>}
    <p className="questionContext">{theme(current.themeId).short}{current.focus&&<> · {current.focus}</>}</p>
    <details className="focusDisclosure"><summary>ⓘ Sobre esta pergunta</summary>
      <div className="questionMeta"><span>{current.cognitive} · nível {current.difficulty}</span><span>{current.sessionRole==="prereq"?"Verificação de pré-requisito":`Foco da Missão: ${plan.focus||theme(targetId).short}`}</span><span>{missionStage} · sessão curta</span>{current.generated&&<span>Variante validada · resposta calculada por regras matemáticas fechadas · seed {current.variantSeed}</span>}</div>
      {plan.type==="confirmation"&&current.sessionRole==="target"&&<div className="notice"><b>Porque estamos aqui?</b>
      <span>Treinaste {plan.focus}. O desempenho foi promissor, mas o Treino Livre não altera o Domínio. Esta Missão serve para confirmar se a evolução se mantém.</span></div>}

    {plan.type==="calibration"&&<div className="notice"><b>Missão de calibração</b>
      <span>A app ainda conhece pouco esta área. Uma pequena sequência de interações úteis ajuda a começar o mapa sem transformar a Missão num teste.</span></div>}

      {plan.type==="investigation"&&current.sessionRole==="target"&&<div className="decisionExplain"><b>Porque estamos a voltar a esta competência?</b>
      {(plan.reasons||[]).map((r,i)=><div key={`${r.kind}-${i}`}><span>{i+1}</span><p><strong>{r.title}</strong><small>{r.detail}</small></p></div>)}
      <footer>A app não assume que a hipótese anterior estava certa. Esta Missão existe precisamente para tentar confirmá-la ou enfraquecê-la.</footer>
    </div>}

      {plan.type==="priority"&&current.sessionRole==="target"&&<div className="decisionExplain"><b>Porque é esta a próxima melhor ação?</b>
      {(plan.reasons||[]).map((r,i)=><div key={`${r.kind}-${i}`}><span>{i+1}</span><p><strong>{r.title}</strong><small>{r.detail}</small></p></div>)}
      {plan.unlocks?.length>0&&<footer>Se melhorares esta base, o motor poderá avançar com mais segurança para <b>{plan.unlocks.slice(0,2).map(x=>x.label).join(" e ")}</b>.</footer>}
      </div>}
      {current.sessionRole==="prereq"&&<div className="branchNote strong"><b>↳ Verificação rápida da causa</b>
      <span>Antes de concluir que a dificuldade está em <b>{detour?.targetFocus||theme(targetId).short}</b>, a app vai testar <b>{detour?.preFocus||theme(current.themeId).short}</b>. Uma pergunta não prova a causa — apenas torna uma hipótese mais ou menos provável.</span></div>}
    </details>
    <h2>{current.q}</h2>
    {current.practiceOnly?<PracticeResponse question={current} value={sel} onChange={answer} feedback={fb} guided/>:<QuestionOptions q={current} sel={sel} fb={fb} answer={answer}/>}

    {fb&&!current.practiceOnly&&<div className={"feedback answerFeedback "+(fb.correct?"good":"bad")}><b>{fb.correct?"✓ Muito bem!":"Não é essa."}</b><span>{fb.correct?conciseMathExplanation(current.sol):<>A resposta correta é:<strong>{current.o[current.a]}</strong>{current.sol&&<small>{conciseMathExplanation(current.sol)}</small>}</>}</span></div>}
    {fb&&<ReportButton item={current} s={s} setS={setS}/>}
    {!fb?<button disabled={!isResponseAnswered(current,sel)} className="primary" onClick={submitAnswer}>Responder</button>:<button className="primary" onClick={next}>Próxima pergunta</button>}
    <button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>
  </Shell>
}


function MissionResult({s,setS,go}){
  const m=s.lastMission;
  if(!m)return <Shell><Back go={go}/><h1>Missão concluída.</h1></Shell>;
  const t=theme(m.themeId);
  const now=scopedThemeScore(s,m.themeId);
  const delta=(m.afterDomain??0)-(m.beforeDomain??0);
  const typeName=m.type==="confirmation"?"Confirmação concluída":m.type==="calibration"?"Calibração concluída":"Missão concluída";

  return <Shell><div className="centered completionMoment"><Logo/><Apronso pose="celebrate" className="resultApronso" alt="Apronso celebra a missão concluída"/>
    <p className="eyebrow">{typeName.toUpperCase()}</p><h1>Missão concluída</h1><h2>Hoje reforçaste {m.focus||t.short}.</h2>
    {m.stopCode!=="time_budget_reached"&&<p className="muted">{m.stopDetail
      ?m.stopDetail
      :m.type==="calibration"
        ?"A app já tem primeiras observações nesta área. Ainda é cedo para tratar esta estimativa como robusta."
        :`A sessão terminou após ${m.interactionCount||m.totalCount} interações úteis.`}</p>}</div>

    <details className="resultDetails"><summary>Ver detalhes do progresso</summary>
    {m.stopTitle&&m.stopDetail&&<div className="stopReason"><small>PORQUE TERMINOU AGORA?</small><b>{m.stopTitle}</b><span>{m.stopDetail}</span></div>}

    {m.focus&&<div className="competenceOutcome"><small>COMPETÊNCIA TRABALHADA</small><h2>{m.focus}</h2><div>
      <p><span>Domínio</span><b>{m.beforeFocusDomain??"—"} → {m.afterFocusDomain??"—"}/100</b></p>
      <p><span>Certeza da app</span><b>{certaintyLabel(m.beforeFocusConf,m.beforeFocusEvidence)} → {certaintyLabel(m.afterFocusConf,m.afterFocusEvidence)}</b></p>
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
      <span>O Domínio reage ao desempenho. A certeza da app cresce sobretudo com evidências independentes, tipos de raciocínio diferentes e contextos avaliativos.</span></div>
    <div className="notice"><b>O plano vai ser recalculado agora</b><span>A próxima Missão não está pré-programada. O motor volta a comparar dificuldades, certeza, pré-requisitos, relevância, recência e objetivo com esta nova evidência.</span></div></details>

    <FriendsBetaDisclaimer s={s}/>
    <DailyCompletionNote s={s}/>
    <CompetitionXpNote s={s}/>
    <BetaSessionFeedback s={s} setS={setS} kind="mission"/>
    <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
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
  const [schoolYear,setSchoolYear]=useState(s.profile?.schoolYear||"");
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
    setS(prev=>updateCompetitionProfile({
      ...prev,
      profile:{...prev.profile,schoolYear:schoolYear||prev.profile?.schoolYear||null}
    },{
      nickname,
      region:region||null,
      school:school.trim()||null,
      districtOptIn,
      schoolOptIn
    }));
  }

  return <Shell><StudentTop s={s} go={go}/>
    <ApronsoNudge pose="welcome">Eu trato das contas. Tu só precisas de estudar — o ranking mede esforço, nunca conhecimento.</ApronsoNudge>
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
        <p>O ano já faz parte do teu perfil académico. Para entrares no ranking da escola, indica o ano, a escola e ativa a participação. O nome da escola serve apenas para agrupar resultados e nunca aparece publicamente.</p></div>
      <label>Nickname<input maxLength="24" value={nickname} onChange={e=>setNickname(e.target.value)} placeholder="Ex.: Sigma17"/></label>
      <label>Distrito/Região<select value={region} onChange={e=>setRegion(e.target.value)}><option value="">Não indicar</option>{PORTUGAL_REGIONS.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
      <label>Ano para o ranking<select value={schoolYear} onChange={e=>setSchoolYear(e.target.value)}><option value="">Selecionar ano</option><option value="10.º">10.º ano</option><option value="11.º">11.º ano</option><option value="12.º">12.º ano</option><option value="Já terminei o secundário">Já terminei o secundário</option></select></label>
      <label>Escola<input value={school} onChange={e=>setSchool(e.target.value)} placeholder="Nome da escola (opcional)"/></label>
      <label className="rankConsent"><input type="checkbox" checked={districtOptIn} onChange={e=>setDistrictOptIn(e.target.checked)}/><span>Participar no ranking do meu distrito/região.</span></label>
      <label className="rankConsent"><input type="checkbox" checked={schoolOptIn} onChange={e=>setSchoolOptIn(e.target.checked)}/><span>Participar no ranking da minha escola.</span></label>
      <button className="primary" onClick={saveProfile}>Guardar perfil de ranking</button>
      <small className="privacyRankNote">Nunca entram no ranking: Domínio, Certeza, Índice de Preparação, nota objetivo, resultados de exame ou número de erros.</small>
    </section>
    <StudentNav active="ranking" go={go}/>
  </Shell>;
}

function TrainHub({s,go}){
  return <Shell className="wideStudentShell trainHub"><StudentTop s={s} go={go}/><StudyModeHub subjectId={s.activeSubjectId||"math-a"} go={go}/><StudentNav active="train" go={go}/></Shell>;
}


function Train({s,setS,go,start}){
  const preferredYear=["10.º","11.º","12.º"].includes(s.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const [year,setYear]=useState(preferredYear);
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

  return <Shell className="wideStudentShell trainingSetupPage">
    <p className="eyebrow">TREINO LIVRE</p><h1>O que queres praticar?</h1>
    <p className="muted">O Treino Livre serve para praticar. <b>Não sobe nem desce diretamente o teu Domínio.</b> Um bom desempenho pode gerar um sinal para confirmar mais tarde numa Missão ou Exame.</p>

    <h3>1. Ano</h3><div className="chips yearSelector">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>changeYear(y)}>{y}</button>)}</div>
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
        :"A app usará perguntas próximas do mesmo tema enquanto este foco é expandido."}</span></div>
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
  const draft=cfg ? (recoveredDraft || (typeof window!=="undefined" ? loadSessionDraft(s.betaMode||"internal") : null)) : null;
  const [sessionId]=useState(()=>draft?.sessionId||latestOpenSessionId(s,"training"));
  const questions=useMemo(()=>{
    if(!cfg)return [];
    const fresh=trainingQuestions(s,cfg,DEFAULT_TRAINING_QUESTIONS);
    if(!draft?.questions?.length)return fresh;
    return [...new Map([...draft.questions,...fresh].map(q=>[q.id,q])).values()].slice(0,10);
  },[cfg]);
  const [i,setI]=useState(draft?.i||0);
  const [sel,setSel]=useState(draft?.sel??null);
  const [fb,setFb]=useState(draft?.fb??null);
  const [correct,setCorrect]=useState(draft?.correct||0);
  const [earnedPoints,setEarnedPoints]=useState(draft?.earnedPoints||0);
  const [hasIncomplete,setHasIncomplete]=useState(draft?.hasIncomplete||false);
  const [done,setDone]=useState(false);
  const q=questions[i];
  const maxPoints=questions.reduce((sum,item)=>sum+(Number(item.points)||5),0);

  useEffect(()=>{if(draft)onRecovered()},[]);

  useEffect(()=>{
    if(!cfg || done || !questions.length)return;
    saveSessionDraft({kind:"training",betaMode:s.betaMode||"internal",sessionId,cfg,questions,i,sel,fb,correct,earnedPoints,hasIncomplete});
  },[cfg,questions,i,sel,fb,correct,earnedPoints,hasIncomplete,done]);

  if(!cfg)return <Shell><Back go={go} to="train"/><h1>Escolhe primeiro o que queres treinar.</h1></Shell>;
  if(questions.length<STUDY_SESSION_MIN_QUESTIONS)return <Shell><Back go={go} to="train"/><h1>Ainda não há perguntas úteis suficientes neste foco.</h1><p className="muted">O treino só começa quando consegue garantir uma sessão completa entre 7 e 10 perguntas.</p></Shell>;

  function answer(n){if(!fb)setSel(n)}
  function submitAnswer(){if(!fb&&isResponseAnswered(q,sel))setFb(gradeResponse(q,sel))}
  function next(){
    const was=fb?.correct===true;
    const newCorrect=correct+(was?1:0);
    const newEarnedPoints=earnedPoints+(Number(fb?.points)||0);
    const newHasIncomplete=hasIncomplete||fb?.reviewRequired===true;
    if(was)setCorrect(newCorrect);
    setEarnedPoints(newEarnedPoints);
    setHasIncomplete(newHasIncomplete);
    if(i===questions.length-1){
      if(completingRef.current)return;
      completingRef.current=true;

      if(!claimSessionCompletion(sessionId)){
        clearSessionDraft(s.betaMode||"internal");
        setDone(true);
        return;
      }

      const ratio=newCorrect/questions.length;
      const potential=ratio>=.75 && cfg.level!=="basic" && !questions.some(item=>item.practiceOnly);
      setS(prev=>{
        const sessions=[...(prev.betaSessions||[])];
        const openIdx=[...sessions].map(x=>x.kind==="training"&&!x.finishedAt).lastIndexOf(true);
        if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length,earnedPoints:newEarnedPoints,maxPoints,reviewRequired:newHasIncomplete});
        const base={
          ...prev,
          xp:prev.xp+newCorrect*10,
          betaSessions:sessions,
          betaEvents:[...(prev.betaEvents||[]),betaEvent("training_finished",{sessionId:sessionId||null,themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length,earnedPoints:newEarnedPoints,maxPoints,reviewRequired:newHasIncomplete})],
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
    const potential=ratio>=.75 && cfg.level!=="basic" && !questions.some(item=>item.practiceOnly);
    return <Shell><div className="centered"><Logo/><Apronso pose="celebrate" className="resultApronso" alt="Apronso celebra o treino concluído"/>
      <p className="eyebrow">TREINO CONCLUÍDO</p><h1>{correct}/{questions.length} totalmente corretas</h1>
      <p className="muted"><b>{String(earnedPoints).replace(".",",")}/{maxPoints} pontos{hasIncomplete?" confirmados":""}</b>{hasIncomplete?" · avaliação incompleta":""}</p>
      <p className="muted">{theme(cfg.themeId).short} → {cfg.focus}</p></div>
      {potential?<div className="notice"><b>Possível evolução detetada</b><span>O Treino Livre não altera o teu Domínio. A app guardou apenas um sinal e tentará confirmá-lo numa próxima Missão ou avaliação.</span></div>
      :<div className="notice"><b>Treino registado</b><span>Ganhaste XP pela prática, mas esta sessão não altera a avaliação pedagógica da app.</span></div>}
      <FriendsBetaDisclaimer s={s}/>
      <DailyCompletionNote s={s}/>
      <CompetitionXpNote s={s}/>
      <BetaSessionFeedback s={s} setS={setS} kind="training"/>
      <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
      <button className="secondary" onClick={()=>go("train")}>Treinar outra coisa</button>
    </Shell>
  }

  return <Shell><StudySessionHeader progress={((i+1)/questions.length)*100} label={`${i+1}/${questions.length}`} onExit={()=>go("home")}/>
    {draft&&<div className="resumeBanner"><b>↻ Treino retomado</b><span>As respostas anteriores desta sessão foram preservadas.</span></div>}
    <p className="questionContext">{theme(cfg.themeId).short}{q.focus&&<> · {q.focus}</>}</p>
    <details className="focusDisclosure"><summary>ⓘ Sobre esta pergunta</summary><div className="questionMeta"><span>{q.cognitive} · nível {q.difficulty}</span>{q.generated&&<span>Variante validada · gerada por regras matemáticas fechadas · seed {q.variantSeed}</span>}</div></details>
    <h2>{q.q}</h2>
    {q.practiceOnly?<PracticeResponse question={q} value={sel} onChange={answer} feedback={fb}/>:<QuestionOptions q={q} sel={sel} fb={fb} answer={answer}/>}
    {fb&&!q.practiceOnly&&<div className={"feedback answerFeedback "+(fb.correct?"good":"bad")}><b>{fb.correct?"✓ Muito bem!":"Não é essa."}</b><span>{fb.correct?conciseMathExplanation(q.sol):<>A resposta correta é:<strong>{q.o[q.a]}</strong>{q.sol&&<small>{conciseMathExplanation(q.sol)}</small>}</>}</span></div>}
    {fb&&<ReportButton item={q} s={s} setS={setS}/>}
    {!fb?<button className="primary" disabled={!isResponseAnswered(q,sel)} onClick={submitAnswer}>Responder</button>:<button className="primary" onClick={next}>Próxima pergunta</button>}
    <button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>
  </Shell>
}

function Progress({s,go}){
  const scopedThemes=academicScopeThemes(s.profile);
  const allowedYears=["10.º","11.º","12.º"].filter(y=>scopedThemes.some(t=>t.year===y));
  const preferredYear=["10.º","11.º","12.º"].includes(s.profile?.schoolYear)&&allowedYears.includes(s.profile.schoolYear)
    ?s.profile.schoolYear
    :(allowedYears.at(-1)||"10.º");
  const [year,setYear]=useState(preferredYear);
  useEffect(()=>{if(!allowedYears.includes(year))setYear(preferredYear)},[s.profile?.schoolYear]);
  const scopeIds=new Set(scopedThemes.map(t=>t.id));
  const hypotheses=allLearningHypotheses(s,8).filter(h=>scopeIds.has(h.targetThemeId));
  const activeHypotheses=hypotheses.filter(h=>h.active);
  const closedHypotheses=hypotheses.filter(h=>!h.active).slice(0,3);
  const overview=measuredThemes(s).sort((a,b)=>(scopedThemeScore(s,b.id).domain??0)-(scopedThemeScore(s,a.id).domain??0)).slice(0,5);
  const index=prepIndex(s);
  return <Shell className="wideStudentShell progressPage"><StudentTop s={s} go={go}/><div className="sectionIntro"><p className="eyebrow">PROGRESSO</p><h1>Como estás a evoluir.</h1></div>
    <div className="progressHero"><div><small>PREPARAÇÃO</small><b>{index??"—"}<em>/100</em></b><div className="bar"><i style={{width:(index??0)+"%"}}/></div><span>Índice parcial</span></div><p><small>OBJETIVO</small><b>{s.goal} valores</b><span>O índice não prevê a tua nota de exame.</span></p><Apronso pose="progress" alt="Apronso acompanha o teu progresso"/></div>
    <div className="progressOverview">{overview.map(t=>{const score=scopedThemeScore(s,t.id);return <div key={t.id}><span>{t.short}</span><div className="bar"><i style={{width:(score.domain??0)+"%"}}/></div><b>{score.domain??"—"}</b></div>})}</div>
    <div className="progressActions"><button className="secondary" onClick={()=>go("curriculumSettings")}>Atualizar matéria dada</button><button className="secondary" onClick={()=>go("profileSettings")}>Ano e percurso escolar</button></div>
    <FriendsBetaDisclaimer s={s} compact/>
    <details className="progressDetails"><summary>Ver detalhe por matéria →</summary>
    <p className="muted">Consulta Domínio, Certeza e evidência quando precisares de perceber melhor o resultado.</p>
    <div className="chips">{allowedYears.map(y=><button key={y} className={year===y?"sel":""} onClick={()=>setYear(y)}>{y}</button>)}</div>

    {hypotheses.length>0&&<div className="hypothesisPanel"><div><small>O QUE A APP ESTÁ A ACOMPANHAR</small><h3>Pontos a confirmar</h3></div>
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

      <p>Estes sinais podem mudar com novas respostas. <b>Não são conclusões definitivas.</b></p>
    </div>}

    {scopedThemes.filter(t=>t.year===year).map(t=>{
      const v=scopedThemeScore(s,t.id),has=v.domain!==null;
      return <div className={"prog "+(!has?"unmeasured":"")} key={t.id}>
        <div className="progHead"><b>{t.short}</b><small>{t.name}</small></div>
        {has?<>
          <span>Domínio estimado: {v.domain}/100</span><div className="bar"><i style={{width:v.domain+"%"}}/></div>
          <div className="certaintyRow"><span>Certeza da app</span><b>{certaintyLabel(v.conf,v.evidence.length)}</b><small>{certaintyHelp(v.conf,v.evidence.length)}</small></div>
          <div className="evidenceMeta">{new Set(v.evidence.map(e=>e.signature)).size} evidências independentes · {new Set(v.evidence.map(e=>e.cognitive)).size} tipos de raciocínio</div>
          <div className="focusMap"><b>Competências dentro deste tema</b>{focusRows(s,t.id).filter(f=>f.questionCount>0).map(f=><div key={f.focus} className={f.domain===null?"unknown":""}><span>{f.focus}</span><div className="focusMiniBar"><i style={{width:(f.domain??0)+"%"}}/></div><strong>{f.domain??"—"}</strong><small>{f.domain===null?"Sem evidência":certaintyLabel(f.conf,f.evidence.length)}</small></div>)}</div>
        </>:<div className="noEvidence"><b>Ainda sem estimativa</b><span>A app vai recolher evidência quando esta área se tornar relevante.</span></div>}
      </div>
    })}</details>
    <details className="progressHelp"><summary>ⓘ Como interpretar o teu progresso</summary>
      <div className="notice"><b>Domínio ≠ Certeza da app</b><span><b>Domínio</b> é quanto a app estima que sabes. <b>Certeza da app</b> é quão segura está dessa estimativa. Não mede a tua autoconfiança.</span></div>
      <div className="notice"><b>Variantes não contam como “provas novas” infinitas</b><span>Se responderes várias vezes ao mesmo molde com números diferentes, a app reconhece que são semanticamente semelhantes e reduz o peso dessas repetições na Certeza.</span></div>
    </details>
    <StudentNav active="progress" go={go}/>
  </Shell>
}

function Exams({s,go,startMini}){
  const pausedExamDraft=typeof window!=="undefined"?loadSessionDraft(s.betaMode||"internal"):null;
  const last=s.lastExam;
  const miniQuestions=buildMiniExam(s,MATH_MINI_EXAM_QUESTIONS);
  const miniAvailable=miniQuestions.length;
  const miniReady=miniAvailable>=MATH_MINI_EXAM_QUESTIONS;
  const miniConstructed=miniQuestions.filter(isConstructedResponse).length;
  const miniSelection=miniQuestions.length-miniConstructed;
  const miniYears=[...new Set(miniQuestions.map(q=>theme(q.themeId)?.year).filter(Boolean))];
  return <Shell className="wideStudentShell examHub"><StudentTop s={s} go={go}/><div className="sectionIntro"><p className="eyebrow">EXAMES</p><h1>Matemática A · 635</h1><p className="muted">Escolhe um Mini-exame para uma sessão curta em contexto de prova. O Exame Completo ficará disponível quando o respetivo motor estiver validado.</p></div>
    <ApronsoNudge pose="thinking" tone="dark">Aqui não dou pistas durante as perguntas. No fim, volto para te ajudar a perceber o resultado.</ApronsoNudge>
    <FriendsBetaDisclaimer s={s} compact/>
    {pausedExamDraft?.kind==="mini_exam"&&<div className="pausedSession"><div><small>MINI-EXAME EM PAUSA</small><b>Mini-exame de Matemática A</b><span>O teu progresso ficou guardado neste dispositivo.</span></div><button onClick={()=>go(draftScreen(pausedExamDraft)||"miniExamRun")}>Continuar →</button></div>}
    <button className="exam examAction" disabled={!miniReady} onClick={()=>miniReady&&startMini()}>
      <div><b>⚡ Mini-exame misto</b><span>{miniReady?`${miniSelection} seleção + ${miniConstructed} construção · ~25–30 min · ${miniYears.join(" · ")}`:`${miniAvailable}/${MATH_MINI_EXAM_QUESTIONS} questões elegíveis neste modo`}</span></div><strong>{miniReady?"Começar →":"🔒"}</strong>
    </button>
    {!miniReady&&<div className="notice warning"><b>Mini-exame protegido</b><span>O motor não encontrou perguntas elegíveis suficientes para completar este Mini-exame de 12 itens segundo o estado editorial atual. Não completa a prova com conteúdo não aprovado só para atingir o número pretendido.</span></div>}
    {last&&<div className="lastExam"><div><small>ÚLTIMO MINI-EXAME</small><b>{examScoreLabel(last)}</b></div><span>{last.earnedPoints!==undefined?`${String(last.earnedPoints).replace(".",",")}/${last.maxPoints} pontos${last.reviewRequired?" confirmados":""}`:`${last.correctCount}/${last.total} corretas`}</span></div>}
    <div className="exam locked"><b>📝 Exame Completo</b><span>Prova completa · disponível quando o motor de exame estiver validado.</span></div>
    <div className="exam locked"><b>🏛️ Exames oficiais</b><span>🔒 A aguardar esclarecimento sobre utilização dos conteúdos oficiais</span></div>
    <div className="notice"><b>O que muda num exame?</b><span>Não há feedback pergunta a pergunta. O resultado só aparece no fim e a evidência tem mais peso pedagógico do que numa Missão. O resultado desta prova não é uma previsão da tua nota no Exame Nacional.</span></div><StudentNav active="train" go={go}/>
  </Shell>
}

function MiniExamIntro({session,go}){
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Ainda não existem perguntas suficientes.</h1></Shell>;
  const years=[...new Set(session.questions.map(q=>theme(q.themeId).year))];
  const constructed=session.questions.filter(isConstructedResponse).length;
  const selection=session.questions.length-constructed;
  const maxPoints=session.questions.reduce((sum,q)=>sum+(q.points||0),0);
  return <Shell><Back go={go} to="exams"/><Logo/><p className="eyebrow">MINI-EXAME <BrandName/></p>
    <h1>Agora é prova. O feedback fica para o fim.</h1>
    <p className="muted">Este Mini-exame combina seleção e resposta construída, aproximando o treino do formato real da prova.</p>
    <div className="examIntroGrid">
      <div><span>📝</span><b>{selection} seleção + {constructed} construção</b><small>{maxPoints} pontos · ponderação 30/70</small></div>
      <div><span>⏱</span><b>~25–30 min</b><small>12 itens · podes avançar ao teu ritmo</small></div>
      <div><span>📚</span><b>{years.join(' · ')}</b><small>Cobertura transversal</small></div>
    </div>
    <div className="notice"><b>Regras do Mini-exame</b><span>Podes voltar atrás e alterar respostas antes de entregar. Nas respostas construídas, desenvolve a resolução etapa a etapa: cada uma tem cotação própria. Não mostramos a correção durante a prova.</span></div>
    <button className="primary" onClick={()=>go("miniExamRun")}>Começar Mini-exame</button>
  </Shell>
}

function MathWritingBar({inputRef,value,onChange,multiline=true}){
  function insert(text){
    const field=inputRef.current;if(!field)return;
    const next=insertMathText(value,field.selectionStart,field.selectionEnd,text);
    onChange(next.value);
    window.requestAnimationFrame(()=>{field.focus();field.setSelectionRange(next.cursor,next.cursor);});
  }
  const keys=[["/","Fração"],["²","Quadrado"],["³","Cubo"],["^","Potência"],["√(","Raiz quadrada"],["π","Pi"],["(","Abrir parênteses"],[")","Fechar parênteses"],["×","Multiplicar"],["−","Subtrair"],["=","Igual"],["≠","Diferente"],["≤","Menor ou igual"],["≥","Maior ou igual"],["∞","Infinito"],["′","Derivada"],["\n","Nova linha"]];
  return <div className="mathWritingBar" role="group" aria-label="Símbolos matemáticos">{keys.filter(([symbol])=>multiline||symbol!=="\n").map(([symbol,label])=><button type="button" key={label} aria-label={label} title={label} onMouseDown={event=>event.preventDefault()} onClick={()=>insert(symbol)}>{symbol==="\n"?"↵":symbol}</button>)}</div>;
}

function PracticeResponse({question,value,onChange,feedback,guided=false}){
  const steps=question.response.steps;
  return <div className="practiceResponse">
    <p className="muted">{guided?"Vamos construir a resolução por etapas. Este exercício guiado serve para praticar e não altera o teu domínio.":"Escreve a resolução ao teu ritmo. Podes pedir uma pista antes de responder."}</p>
    <fieldset disabled={!!feedback} className="practiceFields">
      {guided?<div className="constructedResponse">{steps.map(row=><label key={row.id} htmlFor={`practice-${question.id}-${row.id}`}>
        <b>{row.label}</b>
        <textarea id={`practice-${question.id}-${row.id}`} rows={2} maxLength={2000} value={value?.steps?.[row.id]||""} onChange={event=>onChange({steps:{...(value?.steps||{}),[row.id]:event.target.value}})} placeholder="Escreve esta etapa da resolução"/>
      </label>)}</div>:<>
        <ConstructedResponseField question={question} value={value} onChange={onChange}/>
        {!feedback&&<details className="focusDisclosure"><summary>Preciso de uma pista</summary><p>Organiza o raciocínio nestes passos:</p><ol>{steps.map(row=><li key={row.id}>{row.label.replace(/^\d+\.\s*/,"")}</li>)}</ol></details>}
      </>}
    </fieldset>
    {feedback&&<div className="notice"><b>{feedback.reviewRequired?"Avaliação incompleta":feedback.correct?"Muito bem!":feedback.points>0?"Tens etapas corretas":"Vamos rever a resolução"}</b>
      <p>{feedback.points}/{feedback.maxPoints} pontos{feedback.reviewRequired?" confirmados":""}</p>
      {feedback.errorDiagnosis&&<p><b>{feedback.errorDiagnosis.label}:</b> {feedback.errorDiagnosis.message}</p>}
      <div className="stepResults">{feedback.stepResults.map(row=><div key={row.stepId} className={row.status==="needs_review"?"unverified":row.correct?"correct":"incorrect"}><span>{row.status==="needs_review"?"?":row.correct?"✓":"×"}</span><div><b>{row.label}</b><small>{stepFeedback(row)}</small>{!row.correct&&<small>Exemplo: {row.expected}</small>}</div></div>)}</div>
      <p>{question.sol}</p>
    </div>}
  </div>;
}

function ConstructedResponseField({question,value,onChange}){
  const inputRef=useRef(null);
  const spec=question.response;
  if(spec.type==="completion")return <div className="completionResponse">
    <p className="muted">Cada espaço tem o mesmo peso. Podes mudar ou limpar as escolhas até entregares.</p>
    {spec.blanks.map(blank=><label key={blank.id} htmlFor={`${question.id}-${blank.id}`}>
      <span>{blank.label}</span>
      <select id={`${question.id}-${blank.id}`} value={Number.isInteger(value?.[blank.id])?value[blank.id]:""} onChange={event=>{
        const next={...(value&&typeof value==="object"?value:{})};
        if(event.target.value==="")delete next[blank.id];else next[blank.id]=Number(event.target.value);
        onChange(next);
      }}>
        <option value="">Escolhe uma opção</option>
        {blank.options.map((option,index)=><option key={index} value={index}>{option}</option>)}
      </select>
    </label>)}
    <small>{completionFilledCount(question,value)}/{spec.blanks.length} espaços preenchidos · {question.points} pontos</small>
  </div>;
  if(spec.type==="stepwise"){
    const legacySteps=value&&typeof value==="object"?spec.steps.map(row=>value.steps?.[row.id]).filter(Boolean).join("\n"):"";
    const answer=typeof value==="string"?value:typeof value?.working==="string"?value.working:legacySteps;
    return <div className="constructedResponse stepwiseResponse">
      <div className="constructedHeading"><b>Resolução por etapas</b><span>{question.points} pontos · pontuação parcial</span></div>
      <label htmlFor={`working-${question.id}`}><b>Escreve a tua resolução completa</b></label>
      <textarea
        ref={inputRef}
        maxLength={8000}
        id={`working-${question.id}`}
        value={answer}
        placeholder={"Apresenta os cálculos e a conclusão.\nUsa uma linha nova para cada etapa."}
        onChange={event=>onChange(event.target.value)}
        aria-describedby={`working-help-${question.id}`}
      />
      <MathWritingBar inputRef={inputRef} value={answer} onChange={onChange}/>
      <small id={`working-help-${question.id}`} className="workingHint"><b>Dica de escrita:</b> carrega em Enter sempre que avançares para uma nova etapa. Assim conseguimos analisar melhor o teu raciocínio e atribuir pontuação parcial.</small>
    </div>;
  }
  return <div className="constructedResponse">
    <label htmlFor={`response-${question.id}`}><b>{spec.label}</b><span>{question.points} pontos · resposta construída</span></label>
    <input
      ref={inputRef}
      id={`response-${question.id}`}
      inputMode={spec.type==="numeric"?"decimal":"text"}
      autoComplete="off"
      value={typeof value==="string"?value:""}
      placeholder={spec.placeholder}
      onChange={event=>onChange(event.target.value)}
      aria-describedby={`response-help-${question.id}`}
    />
    <MathWritingBar inputRef={inputRef} value={typeof value==="string"?value:""} onChange={onChange} multiline={false}/>
    <small id={`response-help-${question.id}`}>{spec.type==="fraction"?"Escreve uma fração, por exemplo 1/2. Frações equivalentes são corrigidas matematicamente.":"Podes usar vírgula ou ponto nos números decimais."}</small>
  </div>;
}

function MiniExamRun({session,setSession,go}){
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Sessão indisponível.</h1></Shell>;
  const i=session.current||0,q=session.questions[i],answer=session.answers[i];
  function setAnswer(value){
    const answers=[...session.answers];answers[i]=value;setSession({...session,answers});
  }
  function move(n){setSession({...session,current:Math.max(0,Math.min(session.questions.length-1,n))})}
  function toggleMarked(){const marked=session.markedForReview||[];setSession({...session,markedForReview:marked.includes(q.id)?marked.filter(id=>id!==q.id):[...marked,q.id]})}
  return <Shell>
    <StudySessionHeader progress={((i+1)/session.questions.length)*100} label={`${i+1}/${session.questions.length}`} onExit={()=>go("home")}/>
    <p className="questionContext">{theme(q.themeId).short}</p>
    <details className="focusDisclosure"><summary>ⓘ Sobre esta pergunta</summary><div className="questionMeta"><span>{q.cognitive} · nível {q.difficulty}</span><span>{q.points} pontos · {isConstructedResponse(q)?"resposta construída":"seleção"}</span></div></details>
    <h2>{q.q}</h2>
    {responseType(q)==="choice"
      ?<div className="opts examOpts">{q.o.map((x,n)=><button key={`${q.id}-${n}`} className={answer===n?"sel":""} onClick={()=>setAnswer(n)}><b>{String.fromCharCode(65+n)}</b>{x}</button>)}</div>
      :<ConstructedResponseField question={q} value={answer} onChange={setAnswer}/>}
    <button type="button" className={"examMarkButton "+((session.markedForReview||[]).includes(q.id)?"is-marked":"")} onClick={toggleMarked}>{(session.markedForReview||[]).includes(q.id)?"★ Marcada para rever":"☆ Marcar para rever"}</button>
    <div className="examNav">
      <button className="secondary small" disabled={i===0} onClick={()=>move(i-1)}>← Anterior</button>
      <button className="primary small" disabled={!isResponseAnswered(q,answer)} onClick={()=>i<session.questions.length-1?move(i+1):go("miniExamReview")}>Responder</button>
    </div>
    {i<session.questions.length-1&&<button className="pauseLink" onClick={()=>move(i+1)}>Saltar por agora</button>}
    <button className="reviewLink" onClick={()=>go("miniExamReview")}>Ver mapa de respostas</button>
    <button className="pauseLink" onClick={()=>go("home")}>Guardar e continuar depois</button>
  </Shell>
}

function MiniExamReview({session,setSession,s,setS,go}){
  const submittingRef=useRef(false);
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Sessão indisponível.</h1></Shell>;
  const unanswered=session.questions.filter((q,i)=>!isResponseAnswered(q,session.answers[i])).length;
  const markedForReview=session.markedForReview||[];
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
    <div className="answerMap">{session.questions.map((q,i)=>{const answered=isResponseAnswered(q,session.answers[i]),marked=markedForReview.includes(q.id);return <button key={q.id} className={(answered?"answered ":"empty ")+(marked?"marked":"")} onClick={()=>jump(i)}><b>{i+1}</b><span>{marked?"Marcada para rever":responseType(q)==="completion"?`${completionFilledCount(q,session.answers[i])}/${q.response.blanks.length} espaços preenchidos`:answered?(isConstructedResponse(q)?responseType(q)==="stepwise"?"Resolução escrita":String(session.answers[i]).trim().slice(0,14):String.fromCharCode(65+session.answers[i])):"Por responder"}</span></button>})}</div>
    {markedForReview.length>0&&<div className="notice"><b>{markedForReview.length} {markedForReview.length===1?"questão marcada para rever":"questões marcadas para rever"}</b><span>Usa o mapa para voltar a elas antes de entregar.</span></div>}
    {session.questions.some((q,i)=>responseType(q)==="completion"&&completionFilledCount(q,session.answers[i])<q.response.blanks.length)&&<p className="notice warning">Há espaços por preencher nas perguntas de completamento. Podes voltar à pergunta ou entregar com esses espaços em branco.</p>}
    {unanswered>0&&<div className="notice warning"><b>{unanswered} {unanswered===1?"questão por responder":"questões por responder"}</b><span>Podes entregar assim, mas as não-respostas contam para o resultado. Pedagogicamente recebem um peso ligeiramente menor do que uma resposta explicitamente errada.</span></div>}
    <button className="primary" onClick={submit}>Entregar Mini-exame</button>
  </Shell>
}

function MiniExamResult({s,setS,go}){
  const r=s.lastExam;
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há resultado.</h1></Shell>;
  const questions=r.questionIds.map(questionById).filter(Boolean);
  const fallbackSummary=miniExamPointSummary(questions,r.answers);
  const itemResults=r.itemResults||fallbackSummary.results;
  const earnedPoints=r.earnedPoints??fallbackSummary.earnedPoints;
  const maxPoints=r.maxPoints??fallbackSummary.maxPoints;
  const mins=Math.floor(r.elapsedSeconds/60),secs=r.elapsedSeconds%60;
  return <Shell><div className="centered completionMoment"><Logo/><Apronso pose="celebrate" className="resultApronso" alt="Apronso celebra o Mini-exame concluído"/><p className="eyebrow">MINI-EXAME CONCLUÍDO</p>
    <h1>{examScoreLabel(r)}</h1>
    {r.reviewRequired&&<p className="notice warning">Avaliação incompleta: {r.pendingPoints} pontos não puderam ser verificados automaticamente. A nota final não está disponível. Consulta os pontos confirmados e a resolução de cada pergunta; as respostas não verificadas não alteraram o teu domínio.</p>}
    <p className="muted"><b>{String(earnedPoints).replace(".",",")}/{maxPoints} pontos{r.reviewRequired?" confirmados":""}</b> · {r.correctCount}/{r.total} itens totalmente corretos · {mins}:{String(secs).padStart(2,'0')}</p>
    <small className="resultDisclaimer">Resultado deste Mini-exame <BrandName/> — não é uma previsão da nota do Exame Nacional.</small></div>
    <FriendsBetaDisclaimer s={s}/>
    <DailyCompletionNote s={s}/>
    <CompetitionXpNote s={s}/>
    <button className="primary" onClick={()=>go("miniExamCompletedReview")}>Rever o Mini-exame</button>

    <div className="examChanges"><h3>O que mudou no teu mapa?</h3>{r.changes.map(c=>{
      const t=theme(c.themeId);
      const beforeLabel=certaintyLabel(c.before.conf,c.before.evidenceCount);
      const afterLabel=certaintyLabel(c.after.conf,c.after.evidenceCount);
      return <div className="examChange" key={c.themeId}><div><b>{t.short}</b><small>Domínio {c.before.domain??'—'} → {c.after.domain}/100</small></div><div><span>Certeza da app</span><strong>{beforeLabel} → {afterLabel}</strong></div></div>
    })}</div>

    <div className="notice"><b>Porque é que esta prova pesa mais?</b><span>Num Mini-exame respondes sem ajuda nem feedback imediato e em contexto misto. Por isso esta evidência tem mais peso do que uma resposta de Missão — mas continua a ser apenas uma parte do teu histórico.</span></div>

    <BetaSessionFeedback s={s} setS={setS} kind="mini_exam"/>
    <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
    <button className="secondary" onClick={()=>go("exams")}>Área de Exames</button>
  </Shell>
}

function MiniExamCompletedReview({s,setS,go}){
  const r=s.lastExam;
  if(!r)return <Shell><Back go={go} to="exams"/><h1>Ainda não há um Mini-exame para rever.</h1></Shell>;
  const questions=r.questionIds.map(questionById).filter(Boolean);
  const fallbackSummary=miniExamPointSummary(questions,r.answers);
  const itemResults=r.itemResults||fallbackSummary.results;
  const rows=questions.map((q,i)=>({q,i,answer:r.answers[i],grade:itemResults[i]||fallbackSummary.results[i]}));
  const statusLabel=status=>status==="needs_review"?"Avaliação incompleta":status==="correct"?"Certa":status==="partial"?"Parcial":status==="unanswered"?"Não respondida":"Errada";
  return <Shell><Back go={go} to="miniExamResult"/><Logo/><p className="eyebrow">REVISÃO DO MINI-EXAME</p>
    <h1>Revê as tuas respostas.</h1>
    <p className="muted">O Mini-exame já terminou e as respostas estão bloqueadas. Aqui podes perceber o que acertaste, o que falhou e como resolver cada pergunta.</p>
    {r.reviewRequired&&<p className="notice warning">A app não conseguiu avaliar toda a resolução. Os pontos apresentados são apenas os confirmados, sem estimativa de nota final. Compara as etapas com a resolução abaixo; não há uma revisão humana pendente.</p>}
    <div className="completedExamSummary"><b>{examScoreLabel(r)}</b><span>{String(r.earnedPoints??fallbackSummary.earnedPoints).replace(".",",")}/{r.maxPoints??fallbackSummary.maxPoints} pontos{r.reviewRequired?" confirmados":""}</span></div>
    <div className="completedExamReview">{rows.map(({q,i,answer,grade})=><details key={q.id} open={grade?.status!=="correct"} className={`reviewItem ${grade?.status||"unanswered"}`}>
      <summary><span>Questão {i+1} · {theme(q.themeId).short}</span><strong>{statusLabel(grade?.status)} · {String(grade?.points||0).replace(".",",")}/{grade?.maxPoints||q.points} pontos</strong></summary>
      <div className="reviewItemBody"><h2>{q.q}</h2>
        <div className="reviewAnswer"><small>A tua resposta</small><p>{studentResponseLabel(q,answer)}</p></div>
        {responseType(q)==="completion"&&<div className="stepResults">{q.response.blanks.map(blank=><div key={blank.id} className={answer?.[blank.id]===blank.correct?"correct":"incorrect"}><div><b>{blank.label}</b><small>A tua escolha: {blank.options[answer?.[blank.id]]??"Sem resposta"}</small><small>Resposta correta: {blank.options[blank.correct]}</small></div></div>)}</div>}
        {grade?.errorDiagnosis&&<div className="notice"><b>{grade.errorDiagnosis.label}</b><span>{grade.errorDiagnosis.message}</span></div>}
        {grade?.stepResults?.length
          ?<div className="stepResults">{grade.stepResults.map(row=><div key={row.stepId} className={row.status==="needs_review"?"unverified":row.correct?"correct":"incorrect"}><span>{row.status==="needs_review"?"?":row.correct?"✓":"×"}</span><div><b>{row.label} · {row.status==="needs_review"?`${row.maxPoints} pontos não avaliados`:`${row.points}/${row.maxPoints} pontos`}</b><small>{stepFeedback(row)}</small>{!row.correct&&<small>Exemplo de resposta: {row.expected}</small>}</div></div>)}</div>
          :<div className="reviewAnswer correctAnswer"><small>Resposta correta</small><p>{expectedResponseLabel(q)}</p></div>}
        <div className="reviewResolution"><small>Resolução</small><p>{q.sol||"Ainda não existe uma resolução explicada para esta pergunta."}</p></div>
        <ReportButton item={q} s={s} setS={setS} compact/>
      </div>
    </details>)}</div>
    <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
    <button className="secondary" onClick={()=>go("exams")}>Área de Exames</button>
  </Shell>;
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
    <button className="secondary" onClick={()=>go("account")}>Conta <BrandName/> &amp; Progresso na Cloud →</button>

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
  const [entryChoice,setEntryChoice]=useState(null);
  const parentAccess=identity.activeRole==="parent";
  const weekly=engagementSummary(s);
  const activeDaysWeek=weekly.last7.filter(day=>day.active).length;
  const weeklyXp=weekly.last7.reduce((sum,day)=>sum+(day.xp||0),0);
  const selectedSubjects=uniqueSubjectIds(s.selectedSubjectIds||[],AVAILABLE_SUBJECT_IDS);
  const visibleSubjectIds=selectedSubjects.length?selectedSubjects:[DEFAULT_SUBJECT_ID];

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
    const requestedBy=parentAccess?"parent":"student";
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?requestLinkRemoval(x,requestedBy):x)}));
  }

  function confirmRemoval(){
    if(!link?.removal)return;
    const confirmedBy=parentAccess?"parent":"student";
    setS(prev=>({...prev,parentInvites:(prev.parentInvites||[]).map(x=>x.id===link.id?confirmLinkRemoval(x,confirmedBy):x)}));
  }

  function subjectSnapshot(id){
    const meta=subjectById(id);
    if(id===DEFAULT_SUBJECT_ID){
      const missionCount=(s.missionHistory||[]).length;
      const examCount=(s.examHistory||[]).length;
      return {
        id,meta,goal:subjectGoal(s,id,s.goal||14),diagnosticDone:!!s.diagnosticDone,
        sessions:missionCount+examCount,lastActivityAt:null,
        detail:index===null?"Ainda sem indicador global":`Índice de preparação: ${index}/100`
      };
    }
    const progress=subjectProgressFor(s,id);
    return {
      id,meta,goal:subjectGoal(s,id,s.goal||14),diagnosticDone:!!progress.diagnosticDone,
      sessions:(progress.sessions||[]).length,lastActivityAt:progress.lastActivityAt||null,
      detail:progress.diagnosticDone?"Diagnóstico concluído":"Diagnóstico por concluir"
    };
  }

  const subjectRows=visibleSubjectIds.map(subjectSnapshot);

  const evidenceRows=[];
  measured.forEach(t=>{
    const value=s.scores?.[t.id]?.domain;
    if(Number.isFinite(value))evidenceRows.push({subject:"Matemática A",label:t.short||t.name,value,attempts:1});
  });
  visibleSubjectIds.filter(id=>id!==DEFAULT_SUBJECT_ID).forEach(id=>{
    const progress=subjectProgressFor(s,id);
    const subject=subjectById(id)?.shortName||subjectById(id)?.name||id;
    Object.values(progress.competence||{}).forEach(row=>{
      const attempts=Number(row.attempts)||0;
      if(!attempts)return;
      const correct=Number(row.correct)||0;
      evidenceRows.push({subject,label:row.label||row.domainId||"Competência",value:Math.round(correct/attempts*100),attempts});
    });
  });
  const strongest=[...evidenceRows].sort((a,b)=>b.value-a.value||b.attempts-a.attempts)[0]||null;
  const weakest=[...evidenceRows].sort((a,b)=>a.value-b.value||b.attempts-a.attempts)[0]||null;
  function localStudyDayKey(at){
    const d=new Date(at);
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  const engagementDays=s.engagement?.days||{};
  const studyTrend=Array.from({length:4},(_,reverseIndex)=>{
    const weeksAgo=3-reverseIndex;
    let activeDays=0,xp=0;
    for(let offset=0;offset<7;offset++){
      const d=new Date();
      d.setHours(12,0,0,0);
      d.setDate(d.getDate()-(weeksAgo*7+6-offset));
      const row=engagementDays[localStudyDayKey(d.getTime())];
      if(row&&Object.values(row.activities||{}).some(value=>value>0))activeDays+=1;
      xp+=Number(row?.xp)||0;
    }
    const end=new Date();end.setHours(12,0,0,0);end.setDate(end.getDate()-weeksAgo*7);
    const start=new Date(end);start.setDate(start.getDate()-6);
    return {
      key:`week-${weeksAgo}`,activeDays,xp,
      label:weeksAgo===0?"Esta semana":`${start.toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit"})}–${end.toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit"})}`
    };
  });
  const maxTrendDays=Math.max(1,...studyTrend.map(row=>row.activeDays));

  function sessionReviewSummary(session){
    const results=Array.isArray(session?.results)?session.results:[];
    const answered=results.filter(result=>result?.status&&result.status!=="unanswered").length;
    const final=results.filter(result=>result?.final).length;
    const pending=results.filter(result=>result?.requiresReview||(!result?.final&&result?.status&&result.status!=="unanswered")).length;
    if(!results.length)return "Sessão concluída";
    if(pending)return `${answered}/${results.length} respostas registadas · ${pending} por rever`;
    if(final)return `${final}/${results.length} respostas com correção concluída`;
    return `${answered}/${results.length} respostas registadas`;
  }

  const assessmentRows=[
    ...(s.examHistory||[]).map(row=>({
      id:row.id||`math-${row.at}`,subject:"Matemática A",kind:"Mini-exame",
      at:row.at||0,
      result:Number.isFinite(row.score20)?examScoreLabel(row):"Resultado registado",
      detail:row.reviewRequired?"Há componentes que exigem confirmação da revisão.":`${row.correctCount??"—"}/${row.total??"—"} respostas corretas`
    })),
    ...visibleSubjectIds.filter(id=>id!==DEFAULT_SUBJECT_ID).flatMap(id=>{
      const subject=subjectById(id)?.shortName||subjectById(id)?.name||id;
      return (subjectProgressFor(s,id).sessions||[])
        .filter(row=>["mini_exam","full_exam","practice_exam"].includes(row.kind))
        .map(row=>({
          id:row.sessionId||`${id}-${row.completedAt}`,subject,
          kind:row.kind==="mini_exam"?"Mini-exame":"Exame Completo",
          at:row.completedAt||0,
          result:sessionReviewSummary(row),
          detail:"Mostramos o estado da correção; não inventamos uma nota quando existem respostas abertas ou provisórias."
        }));
    })
  ].sort((a,b)=>b.at-a.at).slice(0,6);

  const studentName=link?.studentName||"Aluno associado";

  return <Shell><Back go={go} to={parentAccess?"welcome":"home"}/><p className="eyebrow">ÁREA DOS PAIS</p>
    <h1>{parentAccess?"Acompanhar o estudo sem transformar progresso em vigilância.":"Partilha o progresso com quem te acompanha."}</h1>

    {!link&&parentAccess&&<>
      <p className="muted">Escolhe como queres começar. A conta do encarregado fica separada da área de estudo do aluno.</p>
      <div className="parentEntryChoices">
        <button className={entryChoice==="link"?"selected":""} onClick={()=>setEntryChoice("link")}>
          <span>🔗</span><b>Associar um aluno</b><small>Para um aluno que já utiliza a APProva+.</small>
        </button>
        <button className={entryChoice==="create"?"selected":""} onClick={()=>setEntryChoice("create")}>
          <span>＋</span><b>Criar perfil do aluno</b><small>Para começar a configuração em conjunto.</small>
        </button>
      </div>

      {entryChoice==="link"&&<div className="parentConnect parentEntryPanel">
        <b>Associar um aluno existente</b>
        <span>Por segurança, não existe pesquisa pública de alunos. A ligação começa através de um convite privado criado pelo aluno.</span>
        <span><b>Como funciona?</b> O aluno envia-te o convite; depois de o aceitares com a tua conta, apenas o progresso autorizado fica disponível aqui.</span>
      </div>}

      {entryChoice==="create"&&<div className="parentConnect parentEntryPanel">
        <b>Criar um perfil acompanhado</b>
        <span>O perfil do aluno será independente da conta do encarregado: disciplinas, diagnósticos e respostas pertencem ao aluno; o encarregado recebe apenas os indicadores de acompanhamento.</span>
        <span>Nesta beta, o fluxo de ligação por convite já está ativo. A criação de subperfis familiares fica preparada como fluxo separado para não misturar identidades nem dados académicos.</span>
      </div>}

      {!entryChoice&&<div className="parentPrivacyHint"><b>O princípio é simples</b><span>O encarregado acompanha consistência, evolução, prioridades e resultados — não abre cada resposta dada pelo aluno.</span></div>}
    </>}

    {!link&&!parentAccess&&<div className="parentConnect">
      <b>Ligar Pai/Mãe ou Encarregado de Educação</b>
      <span>Não existe pesquisa pública de utilizadores. A ligação nasce sempre de um convite privado criado pelo aluno.</span>
      <div><input type="email" placeholder="email do encarregado" value={email} onChange={e=>setEmail(e.target.value)}/><button disabled={!email.trim()} onClick={createInvite}>Criar convite</button></div>
      {(s.parentInvites||[]).filter(x=>x.status==="pending").slice(-3).reverse().map(inv=><div className="pendingInvite" key={inv.id}>
        <div><b>{inv.email}</b><small>Expira em 7 dias · uso único</small></div>
        <button onClick={()=>copyInvite(inv)}>{copied?"Copiado ✓":"Copiar link demo"}</button>
      </div>)}
      <small className="parentFoot">O convite é privado, de utilização única e com validade limitada.</small>
    </div>}

    {link&&parentAccess&&<>
      <div className="parentDashboardHero">
        <div><small>ALUNO ASSOCIADO</small><h2>{studentName}</h2><span>{subjectRows.map(row=>row.meta?.shortName||row.meta?.name).join(" · ")}</span></div>
        <div className="parentWeekBadge"><b>{activeDaysWeek}/7</b><span>dias com estudo esta semana</span></div>
      </div>

      <div className="parentWeeklyGrid">
        <div><small>ESTA SEMANA</small><b>{activeDaysWeek}</b><span>{activeDaysWeek===1?"dia ativo":"dias ativos"}</span></div>
        <div><small>RITMO ATUAL</small><b>🔥 {weekly.streak}</b><span>{weekly.streak===1?"dia em sequência":"dias em sequência"}</span></div>
        <div><small>ATIVIDADE</small><b>{weeklyXp} XP</b><span>nos últimos 7 dias</span></div>
      </div>

      <section className="parentDashboardSection parentTrendSection">
        <div className="parentSectionHead"><div><small>EVOLUÇÃO</small><h3>Regularidade de estudo nas últimas 4 semanas</h3></div><span>dias ativos por semana</span></div>
        <div className="parentTrendChart">{studyTrend.map(row=><div className="parentTrendWeek" key={row.key}>
          <div className="parentTrendBarTrack"><span style={{height:`${Math.max(8,Math.round(row.activeDays/maxTrendDays*100))}%`}}/></div>
          <b>{row.activeDays}/7</b><small>{row.label}</small><em>{row.xp} XP</em>
        </div>)}</div>
        <p className="parentTrendNote">Esta evolução mede consistência de estudo, não “qualidade” do aluno. Uma semana com menos dias pode resultar de férias, escola ou outros fatores que a app não conhece.</p>
      </section>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>PREPARAÇÃO PARA OS EXAMES</small><h3>Estado por disciplina</h3></div><span>{subjectRows.length} {subjectRows.length===1?"disciplina":"disciplinas"}</span></div>
        <div className="parentSubjectGrid">{subjectRows.map(row=><div className="parentSubjectCard" key={row.id}>
          <div className="parentSubjectTitle"><span className="subjectIcon">{row.meta?.icon}</span><div><b>{row.meta?.shortName||row.meta?.name}</b><small>Prova {examCodesLabel(row.meta)} · objetivo {row.goal} valores</small></div></div>
          <strong className={row.diagnosticDone?"done":"pending"}>{row.diagnosticDone?"Diagnóstico concluído":"Diagnóstico por concluir"}</strong>
          <div className="parentSubjectMeta"><span>{row.sessions} {row.sessions===1?"sessão registada":"sessões registadas"}</span><span>{row.detail}</span></div>
        </div>)}</div>
      </section>

      <div className="parentInsightGrid">
        <section className="parentDashboardSection">
          <div className="parentSectionHead"><div><small>LEITURA RÁPIDA</small><h3>O que está a correr bem</h3></div></div>
          {strongest?<div className="parentInsight good"><b>{strongest.subject}</b><strong>{strongest.label}</strong><span>É uma das áreas com evidência mais favorável neste momento.</span></div>:<div className="parentEmptyInsight">Ainda não existe evidência suficiente para destacar um ponto forte.</div>}
        </section>
        <section className="parentDashboardSection">
          <div className="parentSectionHead"><div><small>PRIORIDADE</small><h3>Onde vale a pena reforçar</h3></div></div>
          {weakest?<div className="parentInsight focus"><b>{weakest.subject}</b><strong>{weakest.label}</strong><span>É uma das áreas onde os resultados registados justificam mais prática.</span></div>:<div className="parentEmptyInsight">A prioridade aparecerá quando houver respostas suficientes para comparar áreas.</div>}
        </section>
      </div>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>AVALIAÇÕES</small><h3>Resultados recentes em contexto de prova</h3></div><span>até 6 registos</span></div>
        {assessmentRows.length?<div className="parentAssessmentList">{assessmentRows.map(row=><div key={row.id}>
          <div><b>{row.subject}</b><span>{row.kind}{row.at?` · ${new Date(row.at).toLocaleDateString("pt-PT")}`:""}</span></div>
          <strong>{row.result}</strong>
          <small>{row.detail}</small>
        </div>)}</div>:<div className="parentEmptyInsight">Ainda não existem Mini-exames ou Exames Completos concluídos para mostrar.</div>}
        <p className="parentTrendNote">Estes resultados servem para acompanhar evolução e hábitos de preparação. Não são uma previsão da classificação no Exame Nacional.</p>
      </section>

      <section className="parentDashboardSection">
        <div className="parentSectionHead"><div><small>PLANO</small><h3>Próximos passos do aluno</h3></div></div>
        <div className="parentPlanList">{subjectRows.map(row=><div key={row.id}><span>{row.meta?.icon}</span><div><b>{row.meta?.shortName||row.meta?.name}</b><small>{row.diagnosticDone?"Continuar o plano adaptativo e cumprir as próximas sessões.":"Concluir primeiro o diagnóstico para a app poder personalizar o estudo."}</small></div><strong>{row.diagnosticDone?"Em curso":"Pendente"}</strong></div>)}</div>
      </section>

      <div className="parentPrivacyNotice"><b>🔒 O que o encarregado vê — e o que não vê</b><span>Vê consistência, evolução, prioridades, objetivos e resultados agregados. Não vê cada resposta individual nem transforma o histórico de estudo numa lista de erros para fiscalização.</span></div>

      {!link.removal&&<button className="secondary" onClick={requestRemoval}>Pedir remoção da ligação</button>}
      {link.removal?.status==="awaiting_other_party"&&<div className="notice warning"><b>Remoção pendente de confirmação</b><span>A ligação mantém-se ativa até a outra parte confirmar.</span>{link.removal.requestedBy!=="parent"&&<button className="secondary" onClick={confirmRemoval}>Confirmar remoção</button>}</div>}
    </>}

    {link&&!parentAccess&&<>
      <div className="parent"><div><b>{link.parentName||"Pai/Mãe ligado"}</b><span>{link.parentEmail||link.email} · acesso de acompanhamento</span></div><strong>{index??"—"}<small>/100*</small></strong></div>
      <small className="parentFoot">* índice parcial enquanto o perfil académico está a ser construído</small>
      <div className="notice"><b>O que partilhas?</b><span>Consistência, evolução, prioridades, tempo de estudo e resultados agregados — não cada resposta individual.</span></div>
      {!link.removal&&<button className="secondary" onClick={requestRemoval}>Pedir remoção da ligação</button>}
      {link.removal?.status==="awaiting_other_party"&&<div className="notice warning"><b>Remoção pendente de confirmação</b><span>A ligação mantém-se ativa até a outra parte confirmar.</span>{link.removal.requestedBy!=="student"&&<button className="secondary" onClick={confirmRemoval}>Confirmar remoção</button>}</div>}
    </>}
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

  if(done)return <div className="betaThanks">✓ Feedback guardado. Obrigado por ajudares a melhorar a <BrandName/>.</div>;

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


function QuestionOptions({q,sel,fb,answer}){
  return <div className="opts">{q.o.map((x,n)=><button key={`${q.id}-${n}`}
    className={answerOptionState({index:n,selectedIndex:sel,correctIndex:q.a,submitted:!!fb})}
    disabled={!!fb}
    onClick={()=>answer(n)}><b>{String.fromCharCode(65+n)}</b>{x}</button>)}</div>
}
