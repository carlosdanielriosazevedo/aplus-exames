"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import {TAXONOMY,PREREQUISITES,QUESTION_BANK,DIAGNOSTIC_BLUEPRINT} from "./data/content";
import {
  emptyScores,theme,byYear,getQuestions,diagnosticAnchor,diagnosticProbe,
  certaintyLabel,certaintyHelp,applyEvidence,measuredThemes,prepIndex,
  priorityScore,selectMissionTheme,selectMissionQuestion,selectPrereqQuestion,
  shouldEndMission,trainingQuestions,startingDifficulty,nextDiagnosticDifficulty,
  dailyMissionPlan,markTrainingSignalConfirmed,selectQuestionForPlan,
  buildMiniExam,applyMiniExam,miniExamScore20,hasTrainingContent,hasGenerator,
  eligibleQuestions,eligibleCount
} from "./lib/engine";
import {
  allFocusRows,qualitySnapshot,
  editorialQueue,editorialStats,makeReviewBatch,
  applyEditorialDecision,bumpEditorialVersion,urgentReviewItems,
  eligibilitySummary
} from "./lib/quality";
import {betaEvent,sessionStart,sessionFinish,betaSummary,exportBetaPayload} from "./lib/beta";
import {
  loadLocalState,saveLocalState,clearLocalState,backendHealth,syncStateToBackend
} from "./lib/persistence";
import {
  ROLES,normalizeIdentity,can,defaultScreenForRole,createParentInvite,
  activeParentLink,requestLinkRemoval,confirmLinkRemoval,demoIdentity
} from "./lib/identity";
import {
  cloudConfiguration,getCloudSession,cloudSignIn,cloudSignUp,cloudSignOut,
  loadStudentCloudState,saveStudentCloudState,mergeStudentCloudState
} from "./lib/cloud";

const initial={
  goal:17,
  xp:0,
  streak:0,
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
  betaParticipant:{code:"BETA-001",cohort:"Piloto Matemática A"},
  betaEvents:[],
  betaSessions:[],
  betaFeedback:[],
  betaMode:"internal",
  syncMeta:{lastAttemptAt:null,lastSuccessAt:null,lastStatus:"local_only"},
  identity:demoIdentity("student"),
  cloudMeta:{lastLoadedAt:null,lastSavedAt:null,lastRemoteUpdatedAt:null},
  parentInvites:[],
  profile:{schoolYear:"12.º",recentGrade:"",syllabus:"most",examTiming:"thisYear"}
};

export default function App(){
  const [s,setS]=useState(initial);
  const [screen,setScreen]=useState("welcome");
  const [trainingCfg,setTrainingCfg]=useState(null);
  const [examSession,setExamSession]=useState(null);

  useEffect(()=>{
    const x=loadLocalState(initial,emptyScores);
    if(x){
      setS(x);
      setScreen(x.diagnosticDone?"home":"welcome");
    }
  },[]);

  useEffect(()=>{saveLocalState(s)},[s]);
  const go=x=>setScreen(x);

  if(screen==="welcome")return <Welcome go={go}/>;
  if(screen==="onboard")return <StudentProfile s={s} setS={setS} go={go}/>;
  if(screen==="goalOnboard")return <GoalScreen s={s} setS={setS} go={go} onboarding/>;
  if(screen==="goalSettings")return <GoalScreen s={s} setS={setS} go={go}/>;
  if(screen==="diag")return <DiagIntro s={s} setS={setS} go={go}/>;
  if(screen==="diagRun")return <DiagRun s={s} setS={setS} go={go}/>;
  if(screen==="diagResult")return <DiagResult s={s} go={go}/>;
  if(screen==="mission")return <Mission s={s} setS={setS} go={go}/>;
  if(screen==="missionResult")return <MissionResult s={s} setS={setS} go={go}/>;
  if(screen==="train")return <Train s={s} setS={setS} go={go} start={cfg=>{setTrainingCfg(cfg);go("trainingRun")}}/>;
  if(screen==="trainingRun")return <TrainingRun s={s} setS={setS} go={go} cfg={trainingCfg}/>;
  if(screen==="progress")return <Progress s={s} go={go}/>;
  if(screen==="exams")return <Exams s={s} go={go} startMini={()=>{
    const questions=buildMiniExam(s,8);
    const ses=sessionStart("mini_exam",{questionCount:questions.length});
    setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("mini_exam_started",{sessionId:ses.id,questionCount:questions.length})]}));
    setExamSession({questions,answers:Array(questions.length).fill(null),current:0,startedAt:Date.now()});
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
    clearLocalState();
    setS(initial);go("welcome");
  }}/>;
}

const Logo=()=> <div className="logo">A<span>+</span> EXAMES</div>;
const Back=({go,to="home"})=> <button className="back" onClick={()=>go(to)}>← Voltar</button>;
const Shell=({children})=> <main className="light"><section className="panel">{children}</section></main>;

function Welcome({go}){
  return <main className="dark center"><section className="hero">
    <Logo/><p className="eyebrow">PREPARAÇÃO INTELIGENTE PARA EXAMES NACIONAIS</p>
    <h1>A tua melhor nota<br/><em>começa aqui.</em></h1>
    <p>A A+ descobre onde estás a perder pontos e decide o que vale mais a pena estudar hoje.</p>
    <button onClick={()=>go("onboard")}>Descobrir o meu nível →</button>
    <div className="features"><span>⚡ 10–20 min/dia</span><span>🎯 Adaptativo</span><span>📈 Progresso real</span></div>
  </section></main>
}


function StudentProfile({s,setS,go}){
  const [p,setP]=useState(s.profile||initial.profile);
  function save(){
    setS({...s,profile:p});
    go("goalOnboard");
  }
  return <Shell><Logo/><p className="eyebrow">ANTES DO DIAGNÓSTICO</p>
    <h1>Ajuda a A+ a começar no sítio certo.</h1>
    <p className="muted">Estas respostas só definem o <b>ponto de partida</b> do diagnóstico. Nunca são usadas como se fossem prova do teu nível.</p>

    <h3>Em que ano estás?</h3>
    <div className="chips">{["10.º","11.º","12.º","Já terminei"].map(x=><button key={x} className={p.schoolYear===x?"sel":""} onClick={()=>setP({...p,schoolYear:x})}>{x}</button>)}</div>

    <h3>Que nota tens tido aproximadamente a Matemática?</h3>
    <div className="gradeInput"><input inputMode="numeric" min="0" max="20" placeholder="Ex.: 14" value={p.recentGrade} onChange={e=>{
      const raw=e.target.value.replace(/[^0-9]/g,"");
      const n=raw===""?"":Math.max(0,Math.min(20,Number(raw)));
      setP({...p,recentGrade:n});
    }}/><span>/20</span></div>

    <h3>Quanto do programa já deste?</h3>
    <div className="stackChoices">
      {[["little","Ainda pouco"],["most","Uma parte significativa"],["all","Praticamente todo o programa"]].map(([v,l])=><button key={v} className={p.syllabus===v?"sel":""} onClick={()=>setP({...p,syllabus:v})}>{l}</button>)}
    </div>

    <h3>Quando pretendes fazer o exame?</h3>
    <div className="stackChoices">
      {[["thisYear","Este ano letivo"],["nextYear","No próximo ano"],["unsure","Ainda não sei"]].map(([v,l])=><button key={v} className={p.examTiming===v?"sel":""} onClick={()=>setP({...p,examTiming:v})}>{l}</button>)}
    </div>

    <div className="notice"><b>Exemplo</b><span>Se tens tido 18 valores, a A+ não começa por perguntas demasiado elementares. Se a evidência contrariar essa indicação, adapta imediatamente.</span></div>
    <button className="primary" onClick={save}>Continuar</button>
  </Shell>
}

function GoalScreen({s,setS,go,onboarding=false}){
  const [goal,setGoal]=useState(s.goal);
  function save(){setS({...s,goal});go(onboarding?"diag":"home")}
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

function DiagIntro({s,setS,go}){
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
    {gated&&<div className="notice warning"><b>Diagnóstico bloqueado pelo gate editorial</b><span>Este modo só permite conteúdo revisto e ainda não existem perguntas elegíveis suficientes. Volta ao modo Interno ou valida conteúdo no painel de revisão.</span></div>}
    <button className="primary" disabled={gated} onClick={()=>{
      const ses=sessionStart("diagnostic",{goal:s?.goal||null});
      setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("diagnostic_started",{sessionId:ses.id})]}));
      go("diagRun");
    }}>Começar diagnóstico</button>
  </Shell>
}


function DiagRun({s,setS,go}){
  const initialDifficulty=startingDifficulty(s.profile,s.goal);
  const [anchorIndex,setAnchorIndex]=useState(0);
  const [difficulty,setDifficulty]=useState(initialDifficulty);
  const [current,setCurrent]=useState(()=>diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[0],initialDifficulty,s));
  const [sel,setSel]=useState(null);
  const [fb,setFb]=useState(null);
  const [anchorResults,setAnchorResults]=useState([]);
  const [probeCount,setProbeCount]=useState(0);

  const anchorsDone=anchorResults.length;
  const estimate=Math.min(94,Math.round(((anchorsDone+probeCount)/8)*100));

  function answer(n){
    if(fb)return;
    setSel(n);setFb({correct:n===current.a});
  }

  function finish(nextState){
    const sessions=[...(nextState.betaSessions||[])];
    const idx=[...sessions].map(x=>x.kind==="diagnostic"&&!x.finishedAt).lastIndexOf(true);
    if(idx>=0)sessions[idx]=sessionFinish(sessions[idx],{answers:nextState.diagnosticAnswers});
    setS({...nextState,diagnosticDone:true,betaSessions:sessions,betaEvents:[...(nextState.betaEvents||[]),betaEvent("diagnostic_finished",{answers:nextState.diagnosticAnswers})]});
    go("diagResult");
  }

  function next(){
    const correct=sel===current.a;
    let nextState={...s,scores:{...s.scores},diagnosticAnswers:s.diagnosticAnswers+1};
    nextState.scores[current.themeId]=applyEvidence(nextState.scores[current.themeId],current,correct,"diagnostic");

    if(current.role==="anchor"){
      const nextAnchorResults=[...anchorResults,{themeId:current.themeId,correct,difficulty:current.difficulty}];
      setAnchorResults(nextAnchorResults);

      if(!correct){
        const probe=diagnosticProbe(current.themeId,nextState);
        if(probe){
          setS(nextState);
          setProbeCount(x=>x+1);
          setCurrent(probe);setSel(null);setFb(null);
          setDifficulty(nextDiagnosticDifficulty(difficulty,false,false));
          return;
        }
      }

      const done=nextAnchorResults.length;
      const successRate=nextAnchorResults.filter(x=>x.correct).length/done;
      const enoughEarly=done>=5 && successRate>=.80 && probeCount===0;
      const enoughNormal=done>=DIAGNOSTIC_BLUEPRINT.length;

      if(enoughEarly || enoughNormal){finish(nextState);return}

      const nextDiff=nextDiagnosticDifficulty(difficulty,correct,false);
      const nextIdx=anchorIndex+1;
      setDifficulty(nextDiff);
      setAnchorIndex(nextIdx);
      setS(nextState);
      setCurrent(diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[nextIdx],nextDiff,nextState));
      setSel(null);setFb(null);
      return;
    }

    const done=anchorResults.length;
    if(done>=DIAGNOSTIC_BLUEPRINT.length){finish(nextState);return}
    const nextIdx=anchorIndex+1;
    setAnchorIndex(nextIdx);
    setS(nextState);
    setCurrent(diagnosticAnchor(DIAGNOSTIC_BLUEPRINT[nextIdx],difficulty,nextState));
    setSel(null);setFb(null);
  }

  return <Shell>
    <div className="topline"><Logo/><span>Diagnóstico em progresso</span></div>
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

function DiagResult({s,go}){
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

  <button className="primary" onClick={()=>go("home")}>Ver o meu primeiro plano</button>
  </Shell>
}


function Home({s,setS,go,reset}){
  const index=prepIndex(s);
  const measured=measuredThemes(s);
  const plan=dailyMissionPlan(s);
  const t=plan.themeId?theme(plan.themeId):null;
  const pv=plan.themeId?s.scores[plan.themeId]:null;
  const priorities=[...measured].filter(x=>eligibleQuestions(s,x.id,"mission").length)
    .sort((a,b)=>priorityScore(b,s)-priorityScore(a,s)).slice(0,5);

  const labels={
    priority:"🎯 MISSÃO DE HOJE · PRIORIDADE",
    calibration:"🧭 MISSÃO DE HOJE · CALIBRAÇÃO",
    confirmation:"✅ MISSÃO DE HOJE · CONFIRMAÇÃO",
    blocked:"🔒 MISSÃO INDISPONÍVEL"
  };

  return <main className="dark"><section className="wrap">
    <header><div><Logo/><small>MATEMÁTICA A · MOTOR v2.4</small></div><div className="headerRight"><span className="rolePill">{ROLES[normalizeIdentity(s.identity).activeRole]?.icon} {ROLES[normalizeIdentity(s.identity).activeRole]?.label}</span><span>🔥 {s.streak} dias · <b>{s.xp} XP</b></span></div></header>

    <div className="hello"><div><p>Boa noite 👋</p><h1>O que vamos conquistar hoje?</h1>
      <button className="goalLink" onClick={()=>go("goalSettings")}>🎯 Objetivo: {s.goal} valores · Alterar</button></div>
      <strong>{index??"—"}<small>/100<br/>índice parcial</small></strong>
    </div>

    <div className="coverageLine"><b>{measured.length}/{TAXONOMY.length}</b><span>áreas já têm evidência. A A+ vai completar o mapa sem te obrigar a fazer outro diagnóstico gigante.</span></div>

    <div className={"mission "+plan.type}>
      <div><small>{labels[plan.type]}</small><h2>{t?.short||"Conteúdo protegido"}</h2>
        <p>{plan.reason}</p>
        {pv&&<div className="missionMeta">
          <span>{pv.domain===null?"Ainda sem Domínio":`Domínio ${pv.domain}/100`}</span>
          <span>Certeza: {certaintyLabel(pv.conf,pv.evidence.length)}</span>
          {plan.type==="confirmation"&&<span>Vem do Treino Livre</span>}
        </div>}
      </div>
      <button disabled={plan.type==="blocked"} onClick={()=>{
        if(plan.type==="blocked")return;
        const ses=sessionStart("mission",{type:plan.type,themeId:plan.themeId});
        setS(prev=>({...prev,betaSessions:[...(prev.betaSessions||[]),ses],betaEvents:[...(prev.betaEvents||[]),betaEvent("mission_started",{sessionId:ses.id,type:plan.type,themeId:plan.themeId})]}));
        go("mission");
      }}>{plan.type==="blocked"?"Bloqueado":"Começar →"}</button>
    </div>

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

    <button className="qaLink" onClick={()=>go("account")}>☁️ Conta A+ & Cloud</button>
    <button className="qaLink" onClick={()=>go("identity")}>👤 Identidade & Permissões (demo)</button>
    <button className="qaLink" onClick={()=>go("qa")}>🧪 Painel interno de Qualidade</button>
    <button className="qaLink" onClick={()=>go("review")}>👨‍🏫 Painel interno de Revisão Pedagógica</button>
    <button className="qaLink" onClick={()=>go("beta")}>🧪 Painel interno da Beta · modo {s.betaMode||"internal"}</button>
    <button className="reset" onClick={reset}>Recomeçar protótipo</button>
  </section></main>
}


function Mission({s,setS,go}){
  const [plan]=useState(()=>dailyMissionPlan(s));
  const targetId=plan.themeId;
  const [before]=useState(()=>({...s.scores[targetId]}));
  const [current,setCurrent]=useState(()=>({...selectQuestionForPlan(s,plan,[],[]),sessionRole:"target"}));
  const [sel,setSel]=useState(null);
  const [fb,setFb]=useState(null);
  const [usedIds,setUsedIds]=useState([]);
  const [usedSignatures,setUsedSignatures]=useState([]);
  const [targetItems,setTargetItems]=useState([]);
  const [targetCount,setTargetCount]=useState(0);
  const [totalCount,setTotalCount]=useState(0);
  const [pendingError,setPendingError]=useState(null);
  const [detour,setDetour]=useState(null);

  function answer(n){if(!fb){setSel(n);setFb({correct:n===current.a})}}

  function closeMission(finalState,finalDetour=detour,newTargetCount=targetCount,newTotal=totalCount+1){
    const now=finalState.scores[targetId];
    const historyItem={
      type:plan.type,themeId:targetId,at:Date.now(),
      beforeDomain:before.domain,afterDomain:now.domain,
      beforeConf:before.conf,afterConf:now.conf,totalCount:newTotal
    };
    const sessions=[...(finalState.betaSessions||[])];
    const openIdx=[...sessions].map(x=>x.kind==="mission"&&!x.finishedAt).lastIndexOf(true);
    if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{themeId:targetId,type:plan.type,totalCount:newTotal});

    const finished={...finalState,
      streak:Math.max(1,finalState.streak+1),
      betaSessions:sessions,
      betaEvents:[...(finalState.betaEvents||[]),betaEvent("mission_finished",{themeId:targetId,type:plan.type,totalCount:newTotal})],
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
    setS(finished);go("missionResult");
  }

  function next(){
    const correct=sel===current.a;
    const newUsed=[...usedIds,current.id];
    const newSigs=[...usedSignatures,current.signature];
    const newTotal=totalCount+1;
    setUsedIds(newUsed);setUsedSignatures(newSigs);setTotalCount(newTotal);

    if(current.sessionRole==="target" && !correct && !detour && PREREQUISITES[targetId] && plan.type!=="calibration"){
      const pre=selectPrereqQuestion(s,targetId,newUsed);
      if(pre){
        setS(prev=>({...prev,xp:prev.xp+25}));
        setPendingError(current);
        setDetour({preId:pre.themeId,result:null});
        setCurrent({...pre,sessionRole:"prereq"});
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

      if(pendingError){
        const strength=correct?1:.25;
        nextState.scores[targetId]=applyEvidence(nextState.scores[targetId],pendingError,false,"mission",strength);
        newTargetCount=targetCount+1;
        newTargetItems=[...targetItems,pendingError];
        setTargetCount(newTargetCount);setTargetItems(newTargetItems);
      }
      finalDetour={...detour,result:correct};
      setDetour(finalDetour);setPendingError(null);
    }else{
      nextState.scores[targetId]=applyEvidence(nextState.scores[targetId],current,correct,"mission");
      newTargetCount=targetCount+1;
      newTargetItems=[...targetItems,current];
      setTargetCount(newTargetCount);setTargetItems(newTargetItems);
    }

    setS(nextState);

    const targetScore=nextState.scores[targetId];
    const calibrationEnough=plan.type==="calibration" && newTargetCount>=1;
    const confirmationEnough=plan.type==="confirmation" && newTargetCount>=2;
    const normalEnd=shouldEndMission({
      targetCount:newTargetCount,totalCount:newTotal,beforeConf:before.conf,
      currentScore:targetScore,sessionTargetItems:newTargetItems
    });

    if(calibrationEnough || confirmationEnough || normalEnd){
      closeMission(nextState,finalDetour,newTargetCount,newTotal);return;
    }

    const nxt=selectQuestionForPlan(nextState,plan,newUsed,newSigs);
    if(!nxt){closeMission(nextState,finalDetour,newTargetCount,newTotal);return}
    setCurrent({...nxt,sessionRole:"target"});setSel(null);setFb(null);
  }

  if(!current)return <Shell><Back go={go}/><h1>Ainda não existem perguntas suficientes para esta Missão.</h1></Shell>;

  const typeName=plan.type==="confirmation"?"Confirmação":plan.type==="calibration"?"Calibração":"Prioridade";

  return <Shell>
    <div className="topline"><Logo/><span>Missão · {typeName}</span></div>
    <div className="missionStep"><div><small>FOCO PRINCIPAL</small><b>{theme(targetId).short}</b></div>
      <span>{totalCount} evidências recolhidas nesta Missão</span></div>

    {plan.type==="confirmation"&&current.sessionRole==="target"&&<div className="notice"><b>Porque estamos aqui?</b>
      <span>Treinaste {plan.focus}. O desempenho foi promissor, mas o Treino Livre não altera o Domínio. Esta Missão serve para confirmar se a evolução se mantém.</span></div>}

    {plan.type==="calibration"&&<div className="notice"><b>Missão de calibração</b>
      <span>A A+ ainda não tinha evidência nesta área. Uma questão informativa ajuda a preencher o mapa sem transformar o primeiro diagnóstico numa prova interminável.</span></div>}

    {plan.type==="priority"&&current.sessionRole==="target"&&<div className="notice"><b>Porque esta Missão?</b><span>{plan.reason}</span></div>}

    {current.sessionRole==="prereq"&&<div className="branchNote strong"><b>↳ A Missão mudou de direção por um momento.</b>
      <span>A A+ está a verificar <b>{theme(current.themeId).short}</b> antes de decidir quanto peso dar ao erro anterior em {theme(targetId).short}.</span></div>}

    {current.generated&&<div className="validatedVariant"><b>✓ Variante validada</b><span>Resposta calculada por regras matemáticas fechadas · seed {current.variantSeed}</span></div>}
    <p className="eyebrow">{current.cognitive.toUpperCase()} · NÍVEL {current.difficulty}</p>
    <h2>{current.q}</h2>
    <QuestionOptions q={current} sel={sel} fb={fb} answer={answer}/>

    {fb&&<div className={"feedback "+(fb.correct?"good":"bad")}>
      <b>{fb.correct?"✓ Correto":"A A+ detetou uma hipótese."}</b>
      <span>{fb.correct?current.sol:current.hyp}</span>
      {!fb.correct&&<small>{current.sessionRole==="target"&&PREREQUISITES[targetId]&&!detour&&plan.type!=="calibration"
        ?"A A+ pode confirmar um pré-requisito antes de atribuir a causa."
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
    <p className="muted">{m.type==="calibration"
      ?"A A+ já tem uma primeira evidência nesta área. Ainda é cedo para tratar esta estimativa como robusta."
      :`A Missão terminou após ${m.totalCount} evidências porque o motor considerou que já tinha informação suficiente para esta sessão.`}</p></div>

    <div className="missionOutcome">
      <div><span>Domínio estimado</span><b>{m.beforeDomain??"—"} → {m.afterDomain}/100</b><small>{m.beforeDomain===null?"primeira estimativa":delta>0?`+${delta}`:delta===0?"sem alteração":delta}</small></div>
      <div><span>Certeza da A+</span><b>{certaintyLabel(m.beforeConf,m.beforeDomain===null?0:1)} → {certaintyLabel(now.conf,now.evidence.length)}</b><small>A certeza depende da força e variedade da evidência.</small></div>
    </div>

    {m.type==="confirmation"&&<div className="notice"><b>Sinal do Treino Livre confirmado</b>
      <span>O resultado deixou de ser apenas prática livre e passou a contar como evidência avaliativa desta competência.</span></div>}

    {m.detour&&<div className="notice"><b>{m.detour.result===false?"Pré-requisito também revelou dificuldade":"Pré-requisito confirmado"}</b>
      <span>{m.detour.result===false
        ? `A verificação em ${theme(m.detour.preId).short} também falhou. O erro original teve peso reduzido na avaliação de ${t.short}.`
        : `A verificação em ${theme(m.detour.preId).short} correu bem. Isso reforça a hipótese de que a dificuldade estava no foco principal.`}</span></div>}

    <div className="notice"><b>Porque mudou?</b>
      <span>O Domínio reage ao desempenho. A Certeza da A+ cresce sobretudo com evidências independentes, tipos de raciocínio diferentes e contextos avaliativos.</span></div>

    <BetaSessionFeedback s={s} setS={setS} kind="mission"/>
    <button className="primary" onClick={()=>go("home")}>Voltar ao plano</button>
    <button className="secondary" onClick={()=>go("progress")}>Ver progresso detalhado</button>
  </Shell>
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

function TrainingRun({s,setS,go,cfg}){
  if(!cfg)return <Shell><Back go={go} to="train"/><h1>Escolhe primeiro o que queres treinar.</h1></Shell>;
  const questions=useMemo(()=>trainingQuestions(s,cfg,4),[]);
  const [i,setI]=useState(0);
  const [sel,setSel]=useState(null);
  const [fb,setFb]=useState(null);
  const [correct,setCorrect]=useState(0);
  const [done,setDone]=useState(false);
  const q=questions[i];

  if(!questions.length)return <Shell><Back go={go} to="train"/><h1>Ainda não há perguntas suficientes neste foco.</h1></Shell>;

  function answer(n){if(!fb){setSel(n);setFb({correct:n===q.a})}}
  function next(){
    const was=sel===q.a;
    const newCorrect=correct+(was?1:0);
    if(was)setCorrect(newCorrect);
    if(i===questions.length-1){
      const ratio=newCorrect/questions.length;
      const potential=ratio>=.75 && cfg.level!=="basic";
      setS(prev=>{
        const sessions=[...(prev.betaSessions||[])];
        const openIdx=[...sessions].map(x=>x.kind==="training"&&!x.finishedAt).lastIndexOf(true);
        if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length});
        return {...prev,
        xp:prev.xp+newCorrect*10,
        betaSessions:sessions,
        betaEvents:[...(prev.betaEvents||[]),betaEvent("training_finished",{themeId:cfg.themeId,focus:cfg.focus,correct:newCorrect,total:questions.length})],
        freeTrainingSignals:potential?[
          ...(prev.freeTrainingSignals||[]).filter(x=>!(x.themeId===cfg.themeId && x.focus===cfg.focus && !x.confirmed)),
          {themeId:cfg.themeId,focus:cfg.focus,ratio,at:Date.now(),confirmed:false}
        ]:(prev.freeTrainingSignals||[])
      }});
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
      <BetaSessionFeedback s={s} setS={setS} kind="training"/>
      <button className="primary" onClick={()=>go("home")}>Voltar à Home</button>
      <button className="secondary" onClick={()=>go("train")}>Treinar outra coisa</button>
    </Shell>
  }

  return <Shell><Back go={go} to="train"/>
    <div className="topline"><Logo/><span>Treino Livre · {i+1}/{questions.length}</span></div>
    <div className="activeArea"><span>🧠 Treino</span><b>{theme(cfg.themeId).short} · {q.focus}</b></div>
    {q.generated&&<div className="validatedVariant"><b>✓ Variante validada</b><span>Gerada por regras matemáticas fechadas · seed {q.variantSeed}</span></div>}
    <p className="eyebrow">{q.cognitive.toUpperCase()} · NÍVEL {q.difficulty}</p><h2>{q.q}</h2>
    <QuestionOptions q={q} sel={sel} fb={fb} answer={answer}/>
    {fb&&<div className={"feedback "+(fb.correct?"good":"bad")}><b>{fb.correct?"✓ Correto":"Ainda não."}</b><span>{q.sol}</span></div>}
    {fb&&<ReportButton item={q} s={s} setS={setS}/>}
    <button className="primary" disabled={!fb} onClick={next}>Continuar</button>
  </Shell>
}

function Progress({s,go}){
  const [year,setYear]=useState("12.º");
  return <Shell><Back go={go}/><p className="eyebrow">PROGRESSO</p>
    <h1>O teu mapa de conhecimento.</h1>
    <p className="muted">As áreas ainda não avaliadas ficam explicitamente sem score. A A+ não inventa precisão que ainda não tem.</p>
    <div className="chips">{["10.º","11.º","12.º"].map(y=><button key={y} className={year===y?"sel":""} onClick={()=>setYear(y)}>{y}</button>)}</div>

    {byYear(year).map(t=>{
      const v=s.scores[t.id],has=v.domain!==null;
      return <div className={"prog "+(!has?"unmeasured":"")} key={t.id}>
        <div className="progHead"><b>{t.short}</b><small>{t.name}</small></div>
        {has?<>
          <span>Domínio estimado: {v.domain}/100</span><div className="bar"><i style={{width:v.domain+"%"}}/></div>
          <div className="certaintyRow"><span>Certeza da A+</span><b>{certaintyLabel(v.conf,v.evidence.length)}</b><small>{certaintyHelp(v.conf,v.evidence.length)}</small></div>
          <div className="evidenceMeta">{new Set(v.evidence.map(e=>e.signature)).size} evidências independentes · {new Set(v.evidence.map(e=>e.cognitive)).size} tipos de raciocínio</div>
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
  </Shell>
}

function MiniExamReview({session,setSession,s,setS,go}){
  if(!session?.questions?.length)return <Shell><Back go={go} to="exams"/><h1>Sessão indisponível.</h1></Shell>;
  const unanswered=session.answers.filter(x=>x===null).length;
  function jump(i){setSession({...session,current:i});go("miniExamRun")}
  function submit(){
    const elapsed=Math.max(1,Math.round((Date.now()-session.startedAt)/1000));
    let updated=applyMiniExam(s,session.questions,session.answers,elapsed);
    const sessions=[...(updated.betaSessions||[])];
    const openIdx=[...sessions].map(x=>x.kind==="mini_exam"&&!x.finishedAt).lastIndexOf(true);
    if(openIdx>=0)sessions[openIdx]=sessionFinish(sessions[openIdx],{score20:updated.lastExam?.score20,total:session.questions.length});
    updated={...updated,betaSessions:sessions,betaEvents:[...(updated.betaEvents||[]),betaEvent("mini_exam_finished",{score20:updated.lastExam?.score20,total:session.questions.length})]};
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

  async function refreshSession(){
    if(!cfg.configured){
      setSession({loading:false,user:null,error:null});
      return;
    }
    const result=await getCloudSession();
    setSession({loading:false,user:result.user||null,error:result.error||null});
    if(result.user){
      setS(prev=>({...prev,identity:{
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
      setMessage({ok:true,text:"Sessão terminada. O progresso local continua neste dispositivo."});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  async function saveCloud(){
    setBusy(true);setMessage(null);
    try{
      const result=await saveStudentCloudState(s);
      const now=Date.now();
      setS(prev=>({...prev,cloudMeta:{...(prev.cloudMeta||{}),lastSavedAt:now,lastRemoteUpdatedAt:result?.updated_at||new Date(now).toISOString()}}));
      setMessage({ok:true,text:"Progresso guardado na cloud."});
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  async function loadCloud(){
    setBusy(true);setMessage(null);
    try{
      const row=await loadStudentCloudState();
      if(!row?.state_json){
        setMessage({ok:true,text:"Esta conta ainda não tem progresso guardado na cloud."});
      }else{
        const merged=mergeStudentCloudState(s,row.state_json);
        setS({...merged,cloudMeta:{...(merged.cloudMeta||{}),lastLoadedAt:Date.now(),lastRemoteUpdatedAt:row.updated_at}});
        setMessage({ok:true,text:"Progresso carregado da cloud para este dispositivo."});
      }
    }catch(error){setMessage({ok:false,text:String(error?.message||error)})}
    finally{setBusy(false)}
  }

  const user=session.user;
  const localIndex=prepIndex(s);

  return <Shell><Back go={go}/><p className="eyebrow">CONTA A+ · V2.5</p>
    <h1>O teu progresso, em qualquer dispositivo.</h1>
    <p className="muted">A A+ continua local-first. A conta acrescenta sincronização: se a cloud falhar, estudar não fica bloqueado.</p>

    {!cfg.configured&&<div className="cloudUnavailable">
      <b>○ Neon Auth/Data API ainda não ativados</b>
      <span>O código já está preparado, mas faltam os dois endpoints do projeto Neon. Até lá, a app continua integralmente em modo local/demo.</span>
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
      <small className="cloudPrivacy">A password é tratada pelo Neon Auth. A+ não guarda nem recebe passwords na nossa base de dados de negócio.</small>
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

      <div className="syncActions">
        <button onClick={saveCloud} disabled={busy}>↑ Guardar este dispositivo na cloud</button>
        <button onClick={loadCloud} disabled={busy}>↓ Carregar progresso da cloud</button>
      </div>

      <div className="notice"><b>Porque ainda não sincronizamos silenciosamente?</b><span>Nesta primeira implementação real preferimos tornar o comportamento explícito. Depois de testarmos conflitos entre telemóvel/PC, podemos ativar sincronização automática com segurança.</span></div>

      <button className="secondary" onClick={signout} disabled={busy}>Terminar sessão</button>
    </>}

    {message&&<div className={"cloudMessage "+(message.ok?"ok":"bad")}><b>{message.ok?"✓":"!"}</b><span>{message.text}</span></div>}

    <div className="securityBox">
      <b>🔐 Proteção dos dados</b>
      <span>A tabela de progresso usa Row-Level Security. O Data API valida o JWT da sessão e o PostgreSQL só permite ler/escrever linhas cujo <code>auth_user_id</code> corresponde ao utilizador autenticado.</span>
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
  const eligibility=eligibilitySummary(QUESTION_BANK,s.editorialOverrides||{},s.betaMode||"internal");
  const [code,setCode]=useState(s.betaParticipant?.code||"");
  const [cohort,setCohort]=useState(s.betaParticipant?.cohort||"Piloto Matemática A");
  const [infra,setInfra]=useState({loading:true,configured:false});
  const [syncing,setSyncing]=useState(false);
  const [syncMessage,setSyncMessage]=useState("");

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
  const [comment,setComment]=useState("");

  if(done)return <div className="betaThanks">✓ Feedback guardado. Obrigado por ajudares a melhorar a A+.</div>;

  function save(){
    const row={
      id:`fb-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      kind,at:Date.now(),clarity,difficultyFit,usefulness,comment
    };
    setS(prev=>({...prev,betaFeedback:[...(prev.betaFeedback||[]),row],betaEvents:[...(prev.betaEvents||[]),betaEvent("beta_feedback",{kind,clarity,difficultyFit,usefulness})]}));
    setDone(true);
  }

  return <div className="betaFeedback"><b>Ajuda-nos a calibrar a beta</b>
    <span>1 = fraco · 5 = excelente</span>
    <label>As perguntas foram claras?<input type="range" min="1" max="5" value={clarity} onChange={e=>setClarity(Number(e.target.value))}/><em>{clarity}/5</em></label>
    <label>A dificuldade pareceu adequada?<input type="range" min="1" max="5" value={difficultyFit} onChange={e=>setDifficultyFit(Number(e.target.value))}/><em>{difficultyFit}/5</em></label>
    <label>Esta sessão foi útil?<input type="range" min="1" max="5" value={usefulness} onChange={e=>setUsefulness(Number(e.target.value))}/><em>{usefulness}/5</em></label>
    <textarea placeholder="Comentário opcional" value={comment} onChange={e=>setComment(e.target.value)}/>
    <button onClick={save}>Enviar feedback</button>
  </div>
}

function ReviewerDashboard({s,setS,go}){
  const [statusFilter,setStatusFilter]=useState("prototype");
  const [themeFilter,setThemeFilter]=useState("all");
  const [selectedId,setSelectedId]=useState(null);
  const [note,setNote]=useState("");
  const [reviewer,setReviewer]=useState("Professor Revisor");

  const queue=editorialQueue(QUESTION_BANK,s.editorialOverrides||{},s.contentReports||[]);
  const stats=editorialStats(queue);
  const urgent=urgentReviewItems(queue);

  const filtered=queue.filter(row=>{
    const okStatus=statusFilter==="all" || row.status===statusFilter;
    const okTheme=themeFilter==="all" || row.item.themeId===themeFilter;
    return okStatus && okTheme;
  });

  const selected=queue.find(x=>x.item.id===selectedId) || filtered[0] || null;

  function decide(decision){
    if(!selected)return;
    const next=applyEditorialDecision(
      s.editorialOverrides||{},
      selected.item.id,
      decision,
      {reviewer,note}
    );
    setS(prev=>({...prev,editorialOverrides:next}));
    setNote("");
    const idx=filtered.findIndex(x=>x.item.id===selected.item.id);
    const nextRow=filtered[idx+1]||filtered[idx-1];
    setSelectedId(nextRow?.item.id||null);
  }

  function bump(){
    if(!selected)return;
    const next=bumpEditorialVersion(
      s.editorialOverrides||{},
      selected.item.id,
      "Conteúdo alterado no protótipo — requer nova revisão"
    );
    setS(prev=>({...prev,editorialOverrides:next}));
    setNote("");
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

  const statusLabel={
    prototype:"Protótipo",
    pending:"A rever",
    reviewed:"Revisto",
    blocked:"Bloqueado"
  };

  return <Shell><Back go={go}/><p className="eyebrow">PAINEL INTERNO · REVISÃO PEDAGÓGICA</p>
    <h1>Workflow editorial de Matemática A.</h1>
    <p className="muted">Protótipo do espaço de trabalho de um professor revisor. Nada deste painel é visível para alunos.</p>

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
        {filtered.slice(0,80).map(row=><button key={row.item.id} className={selected?.item.id===row.item.id?"active":""} onClick={()=>{setSelectedId(row.item.id);setNote("")}}>
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
            {selected.item.generated&&<div><b>Template</b><span>{selected.item.templateId} · seed {selected.item.variantSeed}</span></div>}
          </div>

          <div className="reviewChecklist">
            <label><input type="checkbox"/> Matemática correta</label>
            <label><input type="checkbox"/> Enunciado claro</label>
            <label><input type="checkbox"/> Resposta inequívoca</label>
            <label><input type="checkbox"/> Distratores plausíveis</label>
            <label><input type="checkbox"/> Resolução suficiente</label>
            <label><input type="checkbox"/> Classificação curricular correta</label>
            <label><input type="checkbox"/> Dificuldade adequada</label>
            <label><input type="checkbox"/> Hipótese de erro plausível</label>
          </div>

          {selected.reports>0&&<div className="itemReports"><b>⚠ {selected.reports} report{selected.reports!==1?"s":""} de utilizadores</b>
            <span>{(s.contentReports||[]).filter(r=>r.itemId===selected.item.id).map(r=>r.label).join(" · ")}</span></div>}

          <textarea className="reviewNote" placeholder="Nota do revisor (opcional)" value={note} onChange={e=>setNote(e.target.value)}/>

          <div className="reviewActions">
            <button className="approve" onClick={()=>decide("approve")}>✓ Aprovar</button>
            <button className="changes" onClick={()=>decide("changes")}>✎ Pedir alteração</button>
            <button className="block" onClick={()=>decide("block")}>⛔ Bloquear</button>
          </div>

          <button className="versionButton" onClick={bump}>Simular alteração ao conteúdo → criar nova versão</button>

          <div className="reviewAudit">
            <b>Histórico editorial</b>
            {((s.editorialOverrides||{})[selected.item.id]?.history||[]).length===0
              ?<span>Sem decisões registadas.</span>
              :[...((s.editorialOverrides||{})[selected.item.id]?.history||[])].reverse().map((h,i)=><div key={i}>
                <small>v{h.version} · {new Date(h.at).toLocaleString("pt-PT")}</small>
                <span>{h.reviewer}: {h.decision}{h.note?` — ${h.note}`:""}</span>
              </div>)}
          </div>
        </>}
      </section>
    </div>

    {(s.reviewBatches||[]).length>0&&<section className="reviewBatches"><h3>Lotes criados</h3>{[...s.reviewBatches].reverse().slice(0,8).map(b=><div key={b.id}>
      <div><b>{b.itemIds.length} questões</b><small>{b.reviewer} · {new Date(b.createdAt).toLocaleDateString("pt-PT")}</small></div><span>{b.status==="open"?"Aberto":"Fechado"}</span>
    </div>)}</section>}

    <div className="notice"><b>O que falta para produção?</b><span>Autenticação real de revisores, permissões, backend, atribuição de lotes, edição colaborativa, comentários, dupla validação e notificações. Nesta versão estamos a validar o workflow e a experiência.</span></div>
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
      <div><span>Avisos</span><b>{snapshot.warnings}</b><small>metadados/qualidade</small></div>
      <div><span>Reports</span><b>{snapshot.reports}</b><small>neste dispositivo</small></div>
    </div>
    <div className="notice"><b>Validação matemática ≠ revisão pedagógica</b><span>Uma “variante validada” foi calculada por regras fechadas. Isso não significa que um professor já aprovou o enunciado, a dificuldade e os distratores. Por defeito, o conteúdo continua marcado como <b>Protótipo</b>.</span></div>

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
