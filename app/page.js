"use client";
import {useEffect,useState} from "react";
import dynamic from "next/dynamic";
import {SECONDARY_EXAM_SUBJECTS,AVAILABLE_SUBJECT_IDS} from "./data/subjects";
import {migrateSubjectProgress} from "./lib/subjectProgress";
import {emptyScores,recalibrateAllScores,migratePedagogicalIds} from "./lib/engine";
import {loadLocalStateStatus,saveLocalState,clearLocalState,FRIENDS_STORAGE_KEY} from "./lib/persistence";
import {saveSessionDraft,loadSessionDraftStatus,clearSessionDraft,draftScreen} from "./lib/sessionDraft";
import {recoverDiagnosticTransaction,recoverLegacyDiagnosticSessions} from "./lib/diagnosticRecovery";
import {migrateProductAnalytics,recordAppOpen} from "./lib/productAnalytics";
import {migrateCloudSync} from "./lib/cloudReliability";
import {friendsBetaRequested,activateFriendsBeta,isFriendsBeta} from "./lib/friendsBeta";
import {emptyEngagement,migrateEngagement} from "./lib/engagement";
import {emptyDailyMission,migrateDailyMission} from "./lib/dailyMission";
import {emptyCompetition,migrateCompetition} from "./lib/competition";

const DEFAULT_SUBJECT_ID="math-a";
const StudentScreens=dynamic(()=>import("./components/StudentScreens"),{ssr:false});

function subjectById(id){
  return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);
}

function normalizeSubjectWorkspace(state){
  const selected=[...new Set((state.selectedSubjectIds||[]).filter(id=>AVAILABLE_SUBJECT_IDS.includes(id)))];
  if(!selected.length)selected.push(DEFAULT_SUBJECT_ID);
  const active=selected.includes(state.activeSubjectId)?state.activeSubjectId:selected[0];
  return migrateSubjectProgress({...state,selectedSubjectIds:selected,activeSubjectId:active});
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

  useEffect(()=>{
    if(typeof window==="undefined"||!("scrollRestoration" in window.history))return;
    const previous=window.history.scrollRestoration;
    window.history.scrollRestoration="manual";
    window.scrollTo({top:0,left:0,behavior:"auto"});
    return ()=>{window.history.scrollRestoration=previous};
  },[]);

  useEffect(()=>{
    const requested=typeof window!=="undefined"&&friendsBetaRequested(window.location.search);
    const storageKey=requested?FRIENDS_STORAGE_KEY:undefined;
    const loaded=loadLocalStateStatus(initial,emptyScores,storageKey);
    if(loaded.error){setScreen("storageRecoveryError");return}
    const x=loaded.state;
    const base=x
      ?migrateProductAnalytics(migrateCloudSync(migrateDailyMission(migrateCompetition(migrateEngagement(migratePedagogicalIds({...x,scores:recalibrateAllScores(x.scores)}))))))
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
      setScreen("portugueseLab");
    }else if(recoveryError){
      setScreen("diagRecoveryError");
    }else if(recoveredCompletion){
      setScreen("diagResult");
    }else if(recoveredLegacy){
      setScreen("diag");
    }else if(canRecover){
      setRecoveredSession(validDraft);
      setScreen(recovered);
    }else setScreen(recoveredState.diagnosticDone?"home":"welcome");
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

  useEffect(()=>{
    if(typeof window==="undefined")return;
    window.scrollTo({top:0,left:0,behavior:"auto"});
    const frame=window.requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"auto"}));
    return ()=>window.cancelAnimationFrame(frame);
  },[screen]);

  const go=x=>setScreen(x);

  return <StudentScreens s={s} setS={setS} screen={screen} go={go} trainingCfg={trainingCfg} setTrainingCfg={setTrainingCfg} examSession={examSession} setExamSession={setExamSession} recoveredSession={recoveredSession} setRecoveredSession={setRecoveredSession} initial={initial}/>;

