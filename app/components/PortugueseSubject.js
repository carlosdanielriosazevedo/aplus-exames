"use client";
import {useState} from "react";
import {Apronso,ApronsoNudge,Shell,StudentNav,StudentTop} from "./chrome";
import PortugueseLearnPanel from "./PortugueseLearnPanel";
import {PORTUGUESE_COMPETENCIES} from "../data/portugueseFoundation";
import {PORTUGUESE_ITEMS,portugueseItemById} from "../data/portugueseContent";
import {portugueseLiteraryWorkById,portugueseLiteraryWorksForYear} from "../data/portugueseLiteraryWorks";
import {PORTUGUESE_RUBRIC_EVIDENCE,assessPortugueseRubricObservation,buildAdaptivePortugueseMission,buildPortugueseDiagnostic,gradePortugueseResponse,portugueseCoverage,portugueseRubricGuidance,restorePortugueseRubricEvidence,revisePortugueseResponse,portugueseRevisionCompare,portugueseRevisionEvidenceCompare,rubricObservationEvidenceSnapshot} from "../lib/portugueseEngine";
import {portugueseObservationGuidance} from "../lib/portugueseObservationGuidance";
import {portugueseWordLimitFeedback} from "../lib/portugueseWordLimit";
import {advanceSubjectSession,beginSubjectSession,createSubjectSessionId,recordSubjectSession,resetSubjectProgress,subjectProgressFor} from "../lib/subjectProgress";
import {clearPortugueseMiniExamDraft} from "../lib/portugueseMiniExamDraft";
import {engagementSummary,missionCompletedToday} from "../lib/engagement";
import {STUDY_MODE_COPY,practiceModeCopy} from "../lib/studyModeCopy";
import {answerOptionState} from "../lib/feedbackCopy";
import {activateSubjectState,finishSubjectOnboardingState,subjectOnboardingStep} from "../lib/subjectWorkspace";
import {portugueseTaxonomyForYear} from "../data/portugueseTaxonomy";
const PORTUGUESE_DOMAIN_LABELS={leitura:"Leitura","educacao-literaria":"Educação Literária",escrita:"Escrita",gramatica:"Gramática"};

const SCHOOL_YEARS=["10.º","11.º","12.º"];

function yearsThrough(year){
  const index=SCHOOL_YEARS.indexOf(year);
  return index<0?SCHOOL_YEARS:SCHOOL_YEARS.slice(0,index+1);
}

function portugueseScopeRows(year){
  const general=(portugueseTaxonomyForYear(year,{includePrevious:false})[0]?.units||[])
    .filter(unit=>unit.domain!=="educacao-literaria")
    .map(unit=>({id:`domain:${unit.domain}`,label:unit.title.replace(/^.*? · /u,""),detail:PORTUGUESE_DOMAIN_LABELS[unit.domain]}));
  const literature=portugueseLiteraryWorksForYear(year)
    .map(work=>({id:`work:${work.id}`,label:work.title,detail:`${work.author} · ${work.curriculumLabel}`}));
  return [
    {id:"educacao-literaria",label:"Educação Literária",rows:literature},
    {id:"competencias",label:"Leitura, Escrita e Gramática",rows:general}
  ];
}

function initialPortugueseScope(settings,year){
  const all=portugueseScopeRows(year).flatMap(group=>group.rows.map(row=>row.id));
  if(Array.isArray(settings?.taughtUnitIds))return settings.taughtUnitIds.filter(id=>all.includes(id));
  if(Array.isArray(settings?.taughtDomains))return all.filter(id=>id.startsWith("work:")?settings.taughtDomains.includes("educacao-literaria"):settings.taughtDomains.includes(id.slice(7)));
  return [];
}

function portugueseItemInScope(item,currentYear,scopeIds){
  if(item.year!==currentYear)return true;
  if(item.literaryWorkId)return scopeIds.includes(`work:${item.literaryWorkId}`);
  if(item.domain==="educacao-literaria")return scopeIds.some(id=>id.startsWith("work:"));
  return scopeIds.includes(`domain:${item.domain}`);
}

function PortugueseSubject({s,setS,go,view="home"}){
  const [session,setSession]=useState(null);
  const [answer,setAnswer]=useState(null);
  const [feedback,setFeedback]=useState(null);
  const [editingCriterionId,setEditingCriterionId]=useState(null);
  const [revisionEditing,setRevisionEditing]=useState(false);
  const [results,setResults]=useState([]);
  const [missionFocus,setMissionFocus]=useState(null);
  const missionEvidenceFocus=missionFocus?.targetEvidenceObservations||[];
  const currentYear=SCHOOL_YEARS.includes(s.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const portugueseSettings=s.subjectSettings?.portuguese||{};
  const taughtUnitIds=initialPortugueseScope(portugueseSettings,currentYear);
  const finishedSecondary=s.profile?.schoolYear==="Já terminei o secundário";
  const allCurrentScopeIds=portugueseScopeRows(currentYear).flatMap(group=>group.rows.map(row=>row.id));
  const [scopeDraft,setScopeDraft]=useState(()=>finishedSecondary?allCurrentScopeIds:taughtUnitIds);
  const [practiceYear,setPracticeYear]=useState(currentYear);
  const [practiceDomain,setPracticeDomain]=useState(null);
  const [practiceLiteraryWorkId,setPracticeLiteraryWorkId]=useState(null);
  const allowedYears=yearsThrough(currentYear);
  const scopedItems=PORTUGUESE_ITEMS.filter(item=>allowedYears.includes(item.year)&&portugueseItemInScope(item,currentYear,taughtUnitIds));
  // O diagnóstico e as missões respeitam o percurso e a matéria dada. O Treino
  // Livre é uma escolha explícita do aluno, por isso deixa consultar os três anos.
  const practiceItems=PORTUGUESE_ITEMS;
  const coverage=portugueseCoverage(PORTUGUESE_ITEMS);
  const scopedCoverage=portugueseCoverage(scopedItems);
  const progress=subjectProgressFor(s,"portuguese");
  const miniExamDraft=s.subjectSettings?.portuguese?.miniExamDraft||null;
  const onboardingStep=subjectOnboardingStep(s,"portuguese");
  const onboardingDoneScreen=s.subjectOnboardingMode==="add"?"diag":"goalOnboard";
  const competenceRows=Object.entries(progress.competence);
  const deterministicAttempts=competenceRows.reduce((sum,[,row])=>sum+(row.deterministicAttempts||0),0);
  const correctAnswers=competenceRows.reduce((sum,[,row])=>sum+(row.correct||0),0);
  const pendingRubrics=competenceRows.reduce((sum,[,row])=>sum+(row.pendingRubrics||0),0);
  const missionDone=missionCompletedToday(s);
  const sharedTop=<StudentTop s={s} go={go}><details className="studentMenu"><summary aria-label="Abrir menu">•••</summary><div><button onClick={()=>go("curriculumSettings")}>Matéria dada na escola</button><button onClick={()=>go("profileSettings")}>Ano e percurso escolar</button><button onClick={()=>go("parent")}>Área dos pais</button>{(progress.sessions.length>0||progress.lastPosition||miniExamDraft)&&<button onClick={resetPortuguese}>Repor progresso de Português</button>}</div></details></StudentTop>;
  const sharedNav=<StudentNav active={view==="home"?"home":view==="progress"?"progress":"train"} go={go}/>;
  function sharedShell(content){
    if(view==="home")return <main className="dark learnHome"><section className="wrap studentSurface">{sharedTop}{content}{sharedNav}</section></main>;
    return <Shell>{sharedTop}{content}{sharedNav}</Shell>;
  }

  function start(kind,items,label,domain=null){
    if((progress.lastPosition||miniExamDraft)&&!window.confirm("Começar uma nova sessão substitui a retoma atual de Português. Queres continuar?"))return;
    const sessionId=createSubjectSessionId("portuguese",kind);
    setSession({sessionId,kind,label,domain,items,current:0});
    setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);setResults([]);
    setS(prev=>beginSubjectSession(clearPortugueseMiniExamDraft(prev),{subjectId:"portuguese",sessionId,kind,label,domain,items}));
  }

  function startDiagnostic(){
    start("diagnostic",buildPortugueseDiagnostic(scopedItems),"Diagnóstico");
  }

  function startMission(domain){
    const mission=buildAdaptivePortugueseMission(scopedItems,{progress,domain});
    setMissionFocus({targetEvidenceCompetencyIds:mission.targetEvidenceCompetencyIds||[],targetEvidenceObservations:mission.targetEvidenceObservations||[],label:PORTUGUESE_DOMAIN_LABELS[domain]});
    start("mission",mission.items,`Missão · ${PORTUGUESE_DOMAIN_LABELS[domain]}`,domain);
  }

  function startRecommendedMission(){
    const mission=buildAdaptivePortugueseMission(scopedItems,{progress});
    setMissionFocus({targetEvidenceCompetencyIds:mission.targetEvidenceCompetencyIds||[],targetEvidenceObservations:mission.targetEvidenceObservations||[],label:"Missão recomendada"});
    start("mission",mission.items,"Missão recomendada");
  }

  function startPractice(domain=null,year=null,competencyId=null,literaryWorkId=null){
    const years=year?[year]:SCHOOL_YEARS;
    const mission=buildAdaptivePortugueseMission(practiceItems,{progress,domain,competencyId,literaryWorkId,years});
    const competencyLabel=PORTUGUESE_COMPETENCIES.find(row=>row.id===competencyId)?.label;
    const workLabel=portugueseLiteraryWorkById(literaryWorkId)?.title;
    const labelParts=["Praticar",workLabel,competencyLabel||(!workLabel&&domain?PORTUGUESE_DOMAIN_LABELS[domain]:null),year].filter(Boolean);
    start("training",mission.items,labelParts.join(" · "),domain);
  }

  function selectMiniExam(id){
    const sessionName=id==="full-1"?"simulado completo":"Mini-exame";
    if(progress.lastPosition&&!window.confirm(`Tens uma sessão de Português em pausa. Começar o ${sessionName} substitui essa retoma. Queres continuar?`))return;
    if(miniExamDraft&&miniExamDraft.examId!==id&&!window.confirm(`Tens outra prova em pausa. Começar este ${sessionName} substitui essa retoma. Queres continuar?`))return;
    setS(prev=>{
      const base=miniExamDraft&&miniExamDraft.examId!==id?clearPortugueseMiniExamDraft(prev):prev;
      const subjectProgress={...(base.subjectProgress||{}),portuguese:{...subjectProgressFor(base,"portuguese"),lastPosition:null}};
      return {...base,subjectProgress,subjectSettings:{...(base.subjectSettings||{}),portuguese:{...(base.subjectSettings?.portuguese||{}),selectedMiniExamId:id}}};
    });
    go("portugueseMiniExam");
  }

  function resume(){
    const saved=progress.lastPosition;
    if(!saved)return;
    const items=saved.itemIds.map(portugueseItemById).filter(Boolean);
    if(items.length!==saved.itemIds.length){
      setS(prev=>resetSubjectProgress(prev,"portuguese"));
      return;
    }
    const current=Math.min(saved.current,items.length-1);
    setSession({sessionId:saved.sessionId,kind:saved.kind,label:saved.label,domain:saved.domain,items,current});
    setResults(saved.results||[]);
    const restored=saved.currentResult?.final?saved.currentResult:restorePortugueseRubricEvidence(items[current],saved.currentResult);
    setAnswer(saved.currentAnswer??restored?.responseText??null);setFeedback(restored);setEditingCriterionId(null);setRevisionEditing(false);
  }

  function resetPortuguese(){
    if(!window.confirm("Repor apenas o progresso de Português? O progresso de Matemática A não será alterado."))return;
    setS(prev=>clearPortugueseMiniExamDraft(resetSubjectProgress(prev,"portuguese")));
    setSession(null);setResults([]);setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);setMissionFocus(null);
  }

  if(!session&&view==="diagnostic")return <Shell>
    <p className="eyebrow">AVALIAÇÃO INICIAL</p>
    <div className="diagApronsoHero"><div><h1>Diagnóstico</h1><div className="diagPurposeHero"><small>PARA ENCONTRAR O MELHOR PONTO DE PARTIDA</small><strong>Não é uma avaliação. A app usa apenas matéria do teu percurso e, em 8 perguntas, procura perceber onde faz mais sentido começares.</strong></div></div><Apronso pose="thinking" alt="Apronso a pensar"/></div>
    <div className="diagIntroGrid">
      <div><span>⏱</span><b>8 perguntas</b><small>Duas por domínio escrito nesta versão inicial.</small></div>
      <div><span>🎯</span><b>Só matéria dada</b><small>Não aparecem obras ou conteúdos que ainda não estudaste.</small></div>
      <div><span>🧠</span><b>Sem nota final</b><small>Vês feedback depois de responder e o perfil continua a evoluir.</small></div>
    </div>
    {!scopedCoverage.diagnosticReady&&<div className="notice warning"><b>Primeiro atualiza a matéria dada</b><span>O diagnóstico não usa áreas que ainda não deste no teu ano atual.</span></div>}
    <button className="primary" disabled={!scopedCoverage.diagnosticReady} onClick={startDiagnostic}>Começar diagnóstico</button>
    {!scopedCoverage.diagnosticReady&&<button className="secondary" onClick={()=>go("curriculumSettings")}>Indicar matéria dada</button>}
  </Shell>;

  if(!session&&["curriculum","curriculumOnboard"].includes(view)&&finishedSecondary)return <Shell>
    {view==="curriculum"&&<button className="back" onClick={()=>go("progress")}>← Voltar</button>}
    <p className="eyebrow">{view==="curriculumOnboard"?`MATÉRIA DADA · ${onboardingStep.position} DE ${onboardingStep.total} · PORTUGUÊS`:"MATÉRIA DADA NA ESCOLA"}</p>
    <div className="completedCurriculumHero"><span>✓</span><div><small>MATÉRIA ASSUMIDA COMO DADA</small><h1>Todo o programa de Português fica disponível.</h1><p>Como já terminaste o secundário, a app assume automaticamente as obras e os conteúdos do 10.º, 11.º e 12.º anos. Podes alterar esta informação mais tarde nas definições de matéria dada.</p></div></div>
    <button className="primary" onClick={()=>{const domains=[...new Set(allCurrentScopeIds.map(id=>id.startsWith("work:")?"educacao-literaria":id.slice(7)))];setS(prev=>{const configured={...prev,subjectSettings:{...(prev.subjectSettings||{}),portuguese:{...(prev.subjectSettings?.portuguese||{}),taughtUnitIds:allCurrentScopeIds,taughtDomains:domains,curriculumConfigured:true}}};return view==="curriculumOnboard"&&onboardingStep.nextId?activateSubjectState(configured,onboardingStep.nextId):view==="curriculumOnboard"?finishSubjectOnboardingState(configured,onboardingStep.firstId):configured});go(view==="curriculumOnboard"?(onboardingStep.nextId?"onboard":onboardingDoneScreen):"progress")}}>{view==="curriculumOnboard"?(onboardingStep.nextId?"Configurar próxima disciplina":"Continuar"):"Guardar"}</button>
  </Shell>;

  if(!session&&["curriculum","curriculumOnboard"].includes(view))return <Shell>
    {view==="curriculum"&&<button className="back" onClick={()=>go("progress")}>← Voltar</button>}
    <p className="eyebrow">{view==="curriculumOnboard"?`MATÉRIA DADA · ${onboardingStep.position} DE ${onboardingStep.total} · PORTUGUÊS`:"MATÉRIA DADA NA ESCOLA"}</p><h1>O que já deste no {currentYear}?</h1>
    <p className="muted">A matéria dos anos anteriores fica disponível. No teu ano atual, assinala as obras e os conteúdos que a escola já trabalhou. Assim, a app não te pergunta sobre uma leitura que ainda não deste.</p>
    <div className="scopeCounter"><b>{scopeDraft.length}</b><span>de {portugueseScopeRows(currentYear).flatMap(group=>group.rows).length} conteúdos assinalados</span></div>
    <div className="curriculumPicker portugueseCurriculumPicker">{portugueseScopeRows(currentYear).map(group=>{const ids=group.rows.map(row=>row.id);const count=ids.filter(id=>scopeDraft.includes(id)).length;const all=count===ids.length&&ids.length>0;return <details key={group.id} open={count>0}>
      <summary><div><b>{group.label}</b><small>{count}/{ids.length} selecionados</small></div><span>⌄</span></summary>
      <button type="button" className="selectTheme" onClick={()=>setScopeDraft(current=>all?current.filter(id=>!ids.includes(id)):[...new Set([...current,...ids])])}>{all?"Desmarcar este grupo":"Selecionar este grupo"}</button>
      <div>{group.rows.map(row=><label key={row.id}><input type="checkbox" checked={scopeDraft.includes(row.id)} onChange={()=>setScopeDraft(current=>current.includes(row.id)?current.filter(id=>id!==row.id):[...current,row.id])}/><span><b>{row.label}</b><small>{row.detail}</small></span></label>)}</div>
    </details>})}</div>
    {!scopeDraft.length&&<div className="notice warning"><b>Ainda não assinalaste matéria deste ano</b><span>A app usará apenas matéria dos anos anteriores. No 10.º ano, o diagnóstico e as missões ficam indisponíveis até assinalares pelo menos uma área.</span></div>}
    <div className="notice"><b>O histórico fica guardado</b><span>Desmarcar uma área não apaga respostas nem sessões anteriores; apenas a retira das próximas recomendações.</span></div>
    <button className="primary" onClick={()=>{setS(prev=>{const domains=[...new Set(scopeDraft.map(id=>id.startsWith("work:")?"educacao-literaria":id.slice(7)))];const configured={...prev,subjectSettings:{...(prev.subjectSettings||{}),portuguese:{...(prev.subjectSettings?.portuguese||{}),taughtUnitIds:scopeDraft,taughtDomains:domains,curriculumConfigured:true}}};return view==="curriculumOnboard"&&onboardingStep.nextId?activateSubjectState(configured,onboardingStep.nextId):view==="curriculumOnboard"?finishSubjectOnboardingState(configured,onboardingStep.firstId):configured});go(view==="curriculumOnboard"?(onboardingStep.nextId?"onboard":onboardingDoneScreen):"progress")}}>{view==="curriculumOnboard"?(onboardingStep.nextId?"Configurar próxima disciplina":"Continuar"):"Guardar matéria dada"}</button>
  </Shell>;

  if(!session&&view==="trainingSetup"){
    const practiceYearItems=practiceItems.filter(item=>item.year===practiceYear);
    const practiceYearCoverage=portugueseCoverage(practiceYearItems);
    const literaryWorks=portugueseLiteraryWorksForYear(practiceYear).map(work=>({
      ...work,
      count:practiceYearItems.filter(item=>item.literaryWorkId===work.id&&item.responseType!=="extended-writing").length
    }));
    const competencySourceItems=practiceLiteraryWorkId
      ?practiceYearItems.filter(item=>item.literaryWorkId===practiceLiteraryWorkId)
      :practiceYearItems;
    const practiceCompetencies=PORTUGUESE_COMPETENCIES
      .filter(row=>row.writtenExam&&row.domain===practiceDomain)
      .map(row=>({...row,count:competencySourceItems.filter(item=>item.competencyId===row.id&&item.responseType!=="extended-writing").length}));
    return <Shell>
      <button className="back" onClick={()=>go("train")}>← Voltar</button>
      <p className="eyebrow">TREINO LIVRE</p><h1>O que queres praticar?</h1>
      <p className="muted">Escolhe primeiro o ano e depois a área. O treino usa apenas perguntas desse ano e não sobe nem desce diretamente o teu Domínio.</p>
      <div className="chips yearSelector" aria-label="Escolher ano para praticar Português">{SCHOOL_YEARS.map(year=><button type="button" key={year} className={practiceYear===year?"sel":""} aria-pressed={practiceYear===year} onClick={()=>{setPracticeYear(year);setPracticeDomain(null);setPracticeLiteraryWorkId(null)}}>{year}</button>)}</div>
      <div className="notice"><b>Português · {practiceYear}</b><span>As perguntas seguintes ficam limitadas ao ano escolhido. Em Educação Literária, uma obra só aparece quando já existe um banco explicitamente associado a essa obra.</span></div>
      {!practiceDomain?<>
        <div className="themeGrid">{Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{const available=practiceYearCoverage.missionEligibleByDomain[domain]>=7;return <button key={domain} disabled={!available} onClick={()=>{setPracticeDomain(domain);setPracticeLiteraryWorkId(null)}}>{label}<small>{available?` · escolher competência · ${practiceYear}`:" · cobertura insuficiente neste ano"}</small></button>})}</div>
        <button className="primary" disabled={practiceYearItems.filter(item=>item.responseType!=="extended-writing").length<7} onClick={()=>startPractice(null,practiceYear)}>Praticar várias áreas · {practiceYear}</button>
      </>:practiceDomain==="educacao-literaria"&&!practiceLiteraryWorkId?<>
        <button type="button" className="back" onClick={()=>setPracticeDomain(null)}>← Todas as áreas</button>
        <div className="sectionIntro"><p className="eyebrow">Educação Literária · {practiceYear}</p><h2>Que obra queres praticar?</h2></div>
        {literaryWorks.length?<div className="themeGrid">{literaryWorks.map(work=><button key={work.id} disabled={work.count<7} onClick={()=>setPracticeLiteraryWorkId(work.id)}><b>{work.title}</b><small>{work.author} · {work.count>=7?`${work.count} perguntas próprias`:`cobertura insuficiente · ${work.count}/7`}</small></button>)}</div>:<div className="notice warning"><b>Ainda sem banco específico por obra neste ano</b><span>Podes praticar competências gerais de Educação Literária enquanto preparamos perguntas editorialmente ligadas às obras.</span></div>}
        <button className="secondary" disabled={practiceYearCoverage.missionEligibleByDomain[practiceDomain]<7} onClick={()=>startPractice(practiceDomain,practiceYear)}>Praticar competências gerais de Educação Literária</button>
      </>:<>
        <button type="button" className="back" onClick={()=>{if(practiceLiteraryWorkId)setPracticeLiteraryWorkId(null);else setPracticeDomain(null)}}>← {practiceLiteraryWorkId?"Todas as obras":"Todas as áreas"}</button>
        <div className="sectionIntro"><p className="eyebrow">{practiceLiteraryWorkId?portugueseLiteraryWorkById(practiceLiteraryWorkId)?.title:PORTUGUESE_DOMAIN_LABELS[practiceDomain]} · {practiceYear}</p><h2>Que competência queres trabalhar?</h2></div>
        <div className="themeGrid">{practiceCompetencies.map(row=><button key={row.id} disabled={row.count<7} onClick={()=>startPractice(practiceDomain,practiceYear,row.id,practiceLiteraryWorkId)}><b>{row.label}</b><small>{row.count>=7?`7 perguntas adaptadas · ${row.count} disponíveis`:`Cobertura insuficiente · ${row.count}/7`}</small></button>)}</div>
        <button className="primary" disabled={(practiceLiteraryWorkId?competencySourceItems.filter(item=>item.responseType!=="extended-writing").length:practiceYearCoverage.missionEligibleByDomain[practiceDomain])<7} onClick={()=>startPractice(practiceDomain,practiceYear,null,practiceLiteraryWorkId)}>Praticar {practiceLiteraryWorkId?portugueseLiteraryWorkById(practiceLiteraryWorkId)?.title:`toda a área · ${PORTUGUESE_DOMAIN_LABELS[practiceDomain]}`}</button>
      </>}
    </Shell>;
  }

  if(!session&&view==="train")return sharedShell(<>
    <div className="sectionIntro"><p className="eyebrow">TREINAR</p><h1>O que queres fazer?</h1></div>
    <ApronsoNudge pose="thinking">{STUDY_MODE_COPY.nudge}</ApronsoNudge>
    <div className="trainChoices">
      <button onClick={()=>go("trainingSetup")}><span>🎯</span><div><b>Praticar</b><small>{practiceModeCopy("portuguese")}</small></div><em>→</em></button>
      <button onClick={()=>go("exams")}><span>📝</span><div><b>Mini-exame</b><small>{STUDY_MODE_COPY.miniExam}</small></div><em>→</em></button>
      <button onClick={()=>go("reviewMatter")}><span>📚</span><div><b>Rever matéria</b><small>{STUDY_MODE_COPY.review}</small></div><em>→</em></button>
    </div>
  </>);

  if(!session&&view==="reviewMatter")return sharedShell(<>
    <button className="back" onClick={()=>go("train")}>← Voltar</button>
    <PortugueseLearnPanel schoolYear={currentYear}/>
  </>);

  if(!session&&view==="progress"){
    const overview=Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{
      const rows=competenceRows.filter(([,row])=>row.domain===domain||row.domainId===domain);
      const attempts=rows.reduce((sum,[,row])=>sum+(row.deterministicAttempts||0),0);
      const correct=rows.reduce((sum,[,row])=>sum+(row.correct||0),0);
      return {domain,label,attempts,correct,percent:attempts?Math.round(correct/attempts*100):null};
    });
    const overall=deterministicAttempts?Math.round(correctAnswers/deterministicAttempts*100):null;
    return sharedShell(<>
      <p className="eyebrow">PROGRESSO</p><h1>Como estás a evoluir.</h1>
      <div className="progressHero"><div><small>PREPARAÇÃO</small><b>{overall??"—"}<em>{overall!==null?"%":""}</em></b><div className="bar"><i style={{width:(overall??0)+"%"}}/></div><span>Índice de Português baseado na evidência disponível nesta disciplina.</span></div><p>O teu objetivo: <b>{s.goal} valores</b><span>O progresso de Português é separado do de Matemática A.</span></p><Apronso pose="progress" alt="Apronso acompanha o teu progresso"/></div>
      <div className="progressOverview">{overview.map(row=><div key={row.domain}><span>{row.label}</span><div className="bar"><i style={{width:(row.percent??0)+"%"}}/></div><b>{row.percent??"—"}</b></div>)}</div>
      <button className="secondary" onClick={()=>go("curriculumSettings")}>Atualizar matéria dada na escola</button>
      <button className="secondary" onClick={()=>go("profileSettings")}>Atualizar ano e percurso escolar</button>
      <details className="progressDetails"><summary>Ver mapa completo →</summary><p className="muted">Explora domínios, competências, evidência e o estado das respostas abertas.</p>
      {overview.map(row=><div className={"prog "+(row.percent===null?"unmeasured":"")} key={row.domain}><div className="progHead"><b>{row.label}</b><small>Domínio de Português</small></div>{row.percent===null?<div className="noEvidence"><b>Ainda sem estimativa</b><span>A app vai recolher evidência quando praticares esta área.</span></div>:<><span>Domínio estimado: {row.percent}/100</span><div className="bar"><i style={{width:row.percent+"%"}}/></div><div className="certaintyRow"><span>Evidência da app</span><b>{row.attempts} respostas objetivas</b><small>As respostas abertas são acompanhadas por critérios observáveis e não recebem uma classificação automática final.</small></div><div className="focusMap"><b>Competências dentro deste domínio</b>{competenceRows.filter(([,r])=>r.domain===row.domain||r.domainId===row.domain).map(([id,r])=><div key={id}><span>{r.label||id}</span><div className="focusMiniBar"><i style={{width:(r.deterministicAttempts?Math.round((r.correct||0)/r.deterministicAttempts*100):0)+"%"}}/></div><strong>{r.deterministicAttempts?Math.round((r.correct||0)/r.deterministicAttempts*100):"—"}</strong><small>{r.deterministicAttempts?(r.correct||0)+"/"+r.deterministicAttempts+" corretas":"Sem evidência"}</small></div>)}</div></>}</div>)}</details>
      <details className="progressHelp"><summary>ⓘ Como interpretar o teu progresso</summary><div className="notice"><b>Domínio ≠ certeza da app</b><span>O Domínio resume a evidência disponível. A app mantém separadas as respostas objetivas e a evidência das grelhas de respostas abertas.</span></div><div className="notice"><b>Respostas abertas</b><span>A autoavaliação serve para orientar o treino e guardar evidência por critério; não é convertida automaticamente numa nota final.</span></div></details>
    </>);
  }

  if(!session&&view==="exams")return sharedShell(<>
    <p className="eyebrow">MINI-EXAME</p><h1>Avaliação em contexto de prova.</h1>
    <div className="notice"><b>Mini-exames</b><span>Sem pistas durante as perguntas. No fim, revês escolhas e respostas abertas por critérios observáveis.</span></div>
    <button className="exam examAction" onClick={()=>selectMiniExam("mini-1")}><div><b>⚡ Mini-exame 1 · Espaço e memória</b><span>2 textos · 6 questões · seleção + resposta restrita · revisão no fim</span></div><strong>Começar →</strong></button>
    <button className="exam examAction" onClick={()=>selectMiniExam("mini-2")}><div><b>⚡ Mini-exame 2 · Escolha e despedida</b><span>2 textos novos · 6 questões · seleção + resposta restrita · revisão no fim</span></div><strong>Começar →</strong></button>
    <div className="lastExam"><div><small>MINI-EXAMES REALIZADOS</small><b>{progress.sessions.filter(row=>row.kind==="mini_exam").length||"Ainda nenhum"}</b></div><span>{progress.sessions.filter(row=>row.kind==="mini_exam").length?"O histórico identifica cada mini-exame e continua separado do de Matemática A.":"Escolhe um dos dois mini-exames para criar histórico."}</span></div>
    {currentYear==="12.º"?<button className="exam examAction" onClick={()=>selectMiniExam("full-1")}><div><b>📝 Simulado completo · Modelo 1</b><span>Simulado original · 150 min · 17 questões · 200 pontos · quatro domínios</span></div><strong>Começar →</strong></button>:<div className="exam locked"><b>📝 Simulado completo</b><span>Disponível no percurso do 12.º ano, para preparação do exame nacional.</span></div>}
    <div className="exam locked"><b>🏛️ Exames oficiais</b><span>🔒 Aguardam validação de conteúdos oficiais.</span></div>
    <div className="notice"><b>O que muda num Mini-exame?</b><span>Não há feedback pergunta a pergunta. O resultado aparece no fim e as respostas abertas são revistas por critérios observáveis.</span></div>
  </>);
  if(!session)return sharedShell(<>
    <div className="learnIntro"><p>Boa noite 👋</p><h1>O teu próximo passo.</h1></div>
    <ApronsoNudge pose={missionDone?"celebrate":"thinking"}>{missionDone?"Boa! A Missão de hoje está feita. Podes praticar outra área ou rever o teu progresso.":progress.diagnosticDone?"Já analisei o teu percurso em Português. Esta é a ação que mais vale a pena fazer agora.":"Primeiro quero perceber o teu ponto de partida em Português. Não é uma nota."}</ApronsoNudge>
    {progress.lastPosition&&<div className="pausedSession"><div><small>SESSÃO EM PAUSA</small><b>{progress.lastPosition.label}</b><span>Pergunta {progress.lastPosition.current+1} de {progress.lastPosition.itemIds.length}</span></div><button onClick={resume}>Continuar →</button></div>}
    {!progress.lastPosition&&miniExamDraft&&<div className="pausedSession"><div><small>{miniExamDraft.examId==="full-1"?"SIMULADO EM PAUSA":"MINI-EXAME EM PAUSA"}</small><b>{miniExamDraft.examId==="full-1"?"Simulado completo de Português":miniExamDraft.examId==="mini-2"?"Mini-exame de Português 2":"Mini-exame de Português 1"}</b><span>{miniExamDraft.review?"Revisão em curso":`Pergunta ${miniExamDraft.index+1} de ${miniExamDraft.itemIds?.length||6}`}</span></div><button onClick={()=>{setS(prev=>({...prev,subjectSettings:{...(prev.subjectSettings||{}),portuguese:{...(prev.subjectSettings?.portuguese||{}),selectedMiniExamId:miniExamDraft.examId}}}));go("portugueseMiniExam")}}>Continuar →</button></div>}
    <section className="adaptivePath" aria-label="Caminho adaptativo de Português">
      <div className={`pathNode ${progress.diagnosticDone?"done":"current"}`}><span>{progress.diagnosticDone?"✓":"●"}</span><div><small>DIAGNÓSTICO</small><b>{progress.diagnosticDone?"Ponto de partida concluído":"Conhecer o teu nível atual"}</b></div></div>
      <div className="pathLine active"/>
      <div className={`pathNode current ${missionDone?"complete":""}`}><span>{missionDone?"✓":"●"}</span><article><small>{progress.diagnosticDone?(missionDone?"MISSÃO CONCLUÍDA":"MISSÃO DE HOJE"):"PRÓXIMO PASSO"}</small><h2>{progress.diagnosticDone?"Português adaptado ao teu percurso":"Diagnóstico de Português"}</h2><p>{progress.diagnosticDone?"7 perguntas escolhidas pela app, normalmente em 3–5 minutos.":"8 perguntas, duas por domínio, com feedback apenas depois de responderes."}</p><em>{progress.diagnosticDone?"~3–5 min":"ponto de partida"}</em><button disabled={!!progress.lastPosition||(!progress.diagnosticDone&&!scopedCoverage.diagnosticReady)||(!missionDone&&progress.diagnosticDone&&scopedItems.length<7)} onClick={missionDone?()=>go("train"):progress.diagnosticDone?startRecommendedMission:startDiagnostic}>{missionDone?"Continuar a estudar":progress.diagnosticDone?"Começar Missão":"Começar diagnóstico"}</button></article></div>
      <div className="pathLine"/>
      <div className="pathNode next"><span>○</span><div><small>DEPOIS</small><b>Praticar, rever matéria ou fazer Mini-exame</b><p>A recomendação seguinte muda com a nova evidência.</p></div></div>
    </section>
    {!scopedCoverage.diagnosticReady&&<div className="notice warning"><b>Atualiza a matéria dada</b><span>Não há matéria assinalada suficiente para um diagnóstico equilibrado no teu ano atual.</span><button onClick={()=>go("curriculumSettings")}>Indicar matéria dada</button></div>}
    
  </>);

  if(session.finished){
    const finalResults=results;
    const daily=engagementSummary(s);
    const deterministic=finalResults.filter(result=>result.final&&result.status!=="unanswered");
    const correct=deterministic.filter(result=>result.correct).length;
    const awaiting=finalResults.filter(result=>!result.final&&result.status!=="unanswered").length;
    if(session.kind==="diagnostic"){
      const rows=Object.entries(PORTUGUESE_DOMAIN_LABELS).map(([domain,label])=>{const domainRows=session.items.map((item,index)=>({item,result:finalResults[index]})).filter(row=>row.item.domain===domain&&row.result?.status!=="unanswered");const d=domainRows.filter(row=>row.result?.final);const c=d.filter(row=>row.result.correct).length;return {domain,label,total:domainRows.length,correct:c,pending:domainRows.filter(row=>!row.result.final).length,percent:d.length?Math.round(c/d.length*100):null};});
      const priority=[...rows].sort((a,b)=>(a.percent===null?-1:a.percent)-(b.percent===null?-1:b.percent))[0];
      return <Shell><p className="eyebrow">DIAGNÓSTICO CONCLUÍDO · PORTUGUÊS</p><h1>Já temos um ponto de partida.</h1><p className="portugueseMethodNote">Isto não é uma nota. É uma primeira leitura do teu desempenho para escolher o próximo treino.</p>
        <div className="portugueseSubjectStats"><div><b>{correct}/{deterministic.length}</b><span>respostas objetivas corretas</span></div><div><b>{awaiting}</b><span>respostas por grelha</span></div><div><b>{session.items.length}</b><span>itens diagnosticados</span></div></div>
        <div className="notice"><b>Como ler este resultado</b><span>As respostas objetivas dão uma indicação inicial. As respostas abertas permanecem separadas e dependem da grelha de autoavaliação; não são transformadas automaticamente numa nota.</span></div>
        <section className="portugueseProgressCard diagnosticDomainSummary"><h2>Primeira leitura por domínio</h2><div className="portugueseMissionGrid">{rows.map(row=><article className="portugueseSubjectAction" key={row.domain}><div><b>{row.label}</b><strong>{row.percent===null?"—":`${row.percent}%`}</strong></div><span>{row.percent===null?"Ainda sem respostas objetivas suficientes":`${row.correct} certas em ${row.total} respostas objetivas`}</span>{row.pending>0&&<small>{row.pending} resposta(s) aberta(s) aguardam autoavaliação</small>}</article>)}</div></section>
        {priority&&<div className="notice"><b>Próximo foco: {priority.label}</b><span>Vamos começar por aqui e ajustar a missão àquilo que já respondeste, evitando repetir conteúdo sem necessidade.</span></div>}
        <button className="primary" onClick={()=>{setSession(null);setResults([]);setAnswer(null);setFeedback(null);setTimeout(()=>startRecommendedMission(),0)}}>Começar a missão recomendada</button>
        <button className="secondary" onClick={()=>{setSession(null);setResults([]);setAnswer(null);setFeedback(null);go("home")}}>Voltar ao plano de estudo</button>
      </Shell>;
    }
    return <Shell><p className="eyebrow">{session.label}</p><h1>Sessão concluída</h1><div className="portugueseResultHero"><b>{correct}/{deterministic.length}</b><span>respostas determinísticas corretas</span></div>{missionEvidenceFocus.length>0&&<div className="notice"><b>Esta missão foi ajustada ao teu histórico</b><span>Incluiu critérios que assinalaste anteriormente como “em parte”, “não identificados” ou “por confirmar”. Isto orienta o treino, mas não é uma nota.</span><ul>{missionEvidenceFocus.slice(0,3).map(row=><li key={row.competencyId+row.observationId}>{row.label}</li>)}</ul></div>}
      <div className="portugueseSubjectStats"><div><b>{session.items.length}</b><span>itens</span></div><div><b>{awaiting}</b><span>respostas por grelha</span></div><div><b>{results.filter(result=>result.status==="unanswered").length}</b><span>não respondidas</span></div></div>
      <div className={`dailyCompletionNote ${daily.dailyGoalComplete?"done":"partial"}`}><b>{daily.dailyGoalComplete?"Objetivo de hoje concluído":"Sessão registada"}</b><span>{daily.dailyGoalComplete?"A tua sequência está protegida por hoje.":`Faltam ${daily.xpRemaining} XP para completares o objetivo diário.`}</span></div>
      {awaiting>0&&<div className="notice warning"><b>Resultado académico incompleto</b><span>As respostas abertas ficaram pendentes de aplicação da grelha. Não foram convertidas automaticamente numa nota.</span></div>}
      <button className="primary" onClick={()=>{setSession(null);go("home")}}>Voltar ao plano de estudo</button>
    </Shell>;
  }

  const item=session.items[session.current];
  const isChoice=item.responseType==="multiple-choice";
  const isShort=item.responseType==="short-answer";
  const answered=isChoice?Number.isInteger(answer):String(answer??"").trim().length>0;
  const rubricGuidance=feedback&&!feedback.final&&feedback.rubricCompleted?portugueseRubricGuidance(feedback):null;
  const wordLimitFeedback=!isChoice&&!isShort?portugueseWordLimitFeedback(item,answer):null;

  function submit(){
    if(!answered||feedback)return;
    const nextFeedback=gradePortugueseResponse(item,answer);
    setFeedback(nextFeedback);
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback,currentAnswer:answer}));
  }

  function recordRubricEvidence(criterionId,observationId,evidence){
    const nextFeedback=assessPortugueseRubricObservation(feedback,criterionId,observationId,evidence);
    setFeedback(nextFeedback);setEditingCriterionId(null);
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback,currentAnswer:nextFeedback.responseText}));
  }

  function startRevision(){
    if(!feedback||feedback.final)return;
    setAnswer(feedback.responseText||"");
    setRevisionEditing(true);
    setEditingCriterionId(null);
  }

  function saveRevision(){
    if(!revisionEditing||!feedback||feedback.final)return;
    if(!String(answer??"").trim())return;
    const nextFeedback=revisePortugueseResponse(item,feedback,answer);
    setFeedback(nextFeedback);
    setRevisionEditing(false);
    setEditingCriterionId(null);
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current,results,currentResult:nextFeedback,currentAnswer:nextFeedback.responseText}));
  }

  function next(){
    if(feedback&&!feedback.final&&!feedback.rubricCompleted)return;
    const nextResults=[...results,feedback];
    if(session.current===session.items.length-1){
      setS(prev=>recordSubjectSession(prev,{subjectId:"portuguese",sessionId:session.sessionId,kind:session.kind,label:session.label,domain:session.domain,items:session.items,results:nextResults}));
      setResults(nextResults);setSession(current=>({...current,finished:true}));return;
    }
    setS(prev=>advanceSubjectSession(prev,"portuguese",{current:session.current+1,results:nextResults,currentAnswer:null}));
    setResults(nextResults);setSession(current=>({...current,current:current.current+1}));setAnswer(null);setFeedback(null);setEditingCriterionId(null);setRevisionEditing(false);
  }

  return <Shell><button className="back" onClick={()=>setSession(null)}>← Sair da sessão</button><div className="portugueseRunTop"><div><small>{session.label}</small><b>{PORTUGUESE_DOMAIN_LABELS[item.domain]} · {item.year}</b></div><span>{session.current+1}/{session.items.length}</span></div>
    <div className="bar portugueseRunBar"><i style={{width:`${((session.current+1)/session.items.length)*100}%`}}/></div>
    {session.kind==="mission"&&missionEvidenceFocus.length>0&&session.current===0&&<section className="notice" aria-label="Foco desta missão"><b>Foco desta missão</b><span>Vamos dar atenção extra a pontos que assinalaste como precisando de revisão em respostas anteriores.</span><ul>{missionEvidenceFocus.slice(0,3).map(row=><li key={row.competencyId+row.observationId}>{row.label} <small>· {row.status==="partial"?"em parte":row.status==="not-observed"?"não identificado":"por confirmar"}</small></li>)}</ul></section>}
    <article className="portugueseQuestion"><div className="portugueseStimulus">{item.stimulus}</div><h2>{item.prompt}</h2>
      {isChoice?<div className="portugueseOptions">{item.options.map((option,index)=><button type="button" disabled={!!feedback} key={option} className={answerOptionState({index,selectedIndex:answer,correctIndex:item.answerIndex,submitted:!!feedback?.final})} onClick={()=>setAnswer(index)}><span>{String.fromCharCode(65+index)}</span>{option}</button>)}</div>
      :isShort?<input className="portugueseShortAnswer" disabled={!!feedback} value={answer??""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve uma resposta curta"/>
      :feedback&&answer===null?<div className="rubricRecoveryNote"><b>Resposta já submetida</b><span>A resposta foi recuperada juntamente com a evidência assinalada na grelha.</span></div>:<><textarea className="portugueseOpenAnswer" disabled={!!feedback&&!revisionEditing} value={answer??""} onChange={event=>setAnswer(event.target.value)} placeholder="Escreve a tua resposta…" rows={9}/><div className={`portugueseWordCount ${wordLimitFeedback.status}`}><b>{wordLimitFeedback.label}</b><span>{wordLimitFeedback.count} palavras · pedido: {wordLimitFeedback.min}–{wordLimitFeedback.max}</span>{wordLimitFeedback.caution&&<small>{wordLimitFeedback.caution}</small>}</div></>}
    </article>
    {feedback&&<div className={`portugueseFeedback ${feedback.final?(feedback.correct?"correct":"incorrect"):"provisional"}`}><b>{feedback.final?(feedback.correct?"Resposta correta":"Resposta incorreta"):feedback.rubricCompleted?"Autoavaliação guardada — sem classificação automática":"Agora revê a tua resposta"}</b>
      {feedback.final&&<><span className="portugueseCorrectAnswer"><b>Resposta certa: {isChoice?`${String.fromCharCode(65+item.answerIndex)} — ${item.options[item.answerIndex]}`:isShort?(item.acceptedAnswers?.[0]||""):item.referenceAnswer||""}</b></span><span className="portugueseAnswerExplanation">{item.explanation}</span></>}
      {!feedback.final&&(!feedback.rubricCompleted||editingCriterionId)&&(()=>{const observations=feedback.criteria.flatMap(criterion=>criterion.observations.map(observation=>({criterion,observation})));const selected=observations.find(row=>row.observation.id===editingCriterionId)||observations.find(row=>row.observation.status==="pending");if(!selected)return null;const {criterion,observation}=selected;const index=observations.indexOf(selected);return <div className="guidedRubric"><div className="guidedRubricProgress"><span>Verificação {index+1} de {observations.length}</span><span>{criterion.label} · {criterion.points} pt na grelha</span></div><p>{observation.label}</p><span className="guidedRubricPrompt">Na tua resposta, que evidência encontras desta observação?</span>{(()=>{const guidance=portugueseObservationGuidance(item,criterion,observation);return <div className="rubricEvidenceGuide"><div><b>Conta como evidência</b><span>{guidance.counts}</span></div><div><b>Não chega</b><span>{guidance.notEnough}</span></div></div>})()}<div className="guidedRubricChoices">{PORTUGUESE_RUBRIC_EVIDENCE.map(option=><button type="button" className={observation.status===option.id?"selected":""} key={option.id} onClick={()=>recordRubricEvidence(criterion.id,observation.id,option.id)}><b>{option.label}</b><small>{option.description}</small></button>)}</div></div>})()}
      {!feedback.final&&feedback.rubricCompleted&&!editingCriterionId&&<><span>A tua leitura ficou registada por observação. Isto não é uma classificação nem altera o teu nível.</span><ul className="rubricEvidenceSummary">{feedback.criteria.map(criterion=>{const option=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===criterion.status);return <li key={criterion.id}><span>{criterion.label}</span><b>{option?.label||"Pendente"}</b><ul className="rubricObservationSummary">{criterion.observations.map(observation=>{const observationOption=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===observation.status);return <li key={observation.id}><span>{observation.label}</span><b>{observationOption?.label||"Pendente"}</b><button type="button" onClick={()=>setEditingCriterionId(observation.id)}>Alterar</button></li>})}</ul></li>})}</ul><div className="rubricGuidance"><b>Próximo passo</b><p>{rubricGuidance.nextAction}</p>{rubricGuidance.reviewObservations.length>0&&<ul className="rubricGuidanceTargets">{rubricGuidance.reviewObservations.map(observation=><li key={`${observation.criterionId}:${observation.id}`}><span><b>{observation.action.title}</b><small>{observation.label}</small><em>{observation.action.action}</em><i>{observation.action.hint}</i></span><button type="button" onClick={()=>setEditingCriterionId(observation.id)}>Rever</button></li>)}</ul>}<button type="button" className="rubricRevisionButton" onClick={startRevision}>Reescrever a resposta</button><div><span><strong>{rubricGuidance.observed.length}</strong> critérios sólidos</span><span><strong>{rubricGuidance.needsReview.length}</strong> a rever</span><span><strong>{rubricGuidance.uncertain.length}</strong> dúvidas</span></div></div>{feedback.revisionHistory?.length>0&&<details><summary>Ver histórico de revisões</summary><div className="rubricRevisionHistory">{feedback.revisionHistory.map((row,index)=>{const next=feedback.revisionHistory[index+1]?.responseText??feedback.responseText;const delta=portugueseRevisionCompare(row.responseText,next);const evidenceRows=Array.isArray(row.rubricObservationEvidence)?row.rubricObservationEvidence:[];const nextEvidence=feedback.revisionHistory[index+1]?.rubricObservationEvidence??rubricObservationEvidenceSnapshot(feedback);const evidenceEvolution=portugueseRevisionEvidenceCompare(evidenceRows,{criteria:nextEvidence.map(evidence=>({id:evidence.criterionId,observations:[{id:evidence.observationId,status:evidence.evidence,evidence:evidence.studentEvidence||[]}]}))});return <div key={row.revision}><b>{row.revision===0?"Resposta inicial":`Revisão ${row.revision}`}</b><p>{row.responseText}</p>{delta.changed&&<small>Evolução para a versão seguinte: {delta.afterWords} palavras · {delta.addedWords} palavras novas · {delta.removedWords} removidas.</small>}{evidenceRows.length>0&&<div className="rubricRevisionEvidence"><span>Evidência desta versão</span><ul>{evidenceRows.map(evidence=>{const criterion=feedback.criteria.find(row=>row.id===evidence.criterionId);const observation=criterion?.observations?.find(row=>row.id===evidence.observationId);const option=PORTUGUESE_RUBRIC_EVIDENCE.find(row=>row.id===evidence.evidence);return <li key={`${evidence.criterionId}:${evidence.observationId}`}><b>{observation?.label||evidence.observationId}</b><span>{criterion?.label||evidence.criterionId} · {option?.label||"Pendente"}</span></li>})}</ul>{evidenceEvolution.some(evidence=>evidence.direction!=="same")&&<div className="rubricRevisionTransitions"><span>Evolução por critério</span><ul>{evidenceEvolution.filter(evidence=>evidence.direction!=="same").map(evidence=><li key={`${evidence.criterionId}:${evidence.observationId}`}><b>{evidence.beforeLabel} → {evidence.afterLabel}</b><span>{feedback.criteria.find(criterion=>criterion.id===evidence.criterionId)?.observations?.find(observation=>observation.id===evidence.observationId)?.label||evidence.observationId}</span></li>)}</ul></div>}</div>}</div>})}</div></details>}{item.referenceAnswer&&<details><summary>Comparar com uma resposta de referência</summary><p>{item.referenceAnswer}</p></details>}</>}
    </div>}
    {revisionEditing&&<div className="rubricRevisionActions"><span>Revisão {((feedback?.revisionCount||0)+1)} · melhora a resposta e volta a verificar a grelha.</span><div><button type="button" className="secondary" onClick={()=>{setRevisionEditing(false);setAnswer(feedback?.responseText||"")}}>Cancelar</button><button type="button" className="primary" disabled={!String(answer??"").trim()} onClick={saveRevision}>Guardar revisão</button></div></div>}
    {!feedback?<button className="primary" disabled={!answered} onClick={submit}>Responder</button>:revisionEditing?null:<button className="primary" disabled={!feedback.final&&!feedback.rubricCompleted} onClick={next}>{!feedback.final&&!feedback.rubricCompleted?"Avalia todas as observações":session.current===session.items.length-1?"Ver resultado":"Próxima pergunta"}</button>}
  </Shell>;
}


export default PortugueseSubject;
