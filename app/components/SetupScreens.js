"use client";
import {useState} from "react";
import {BrandName,Logo,Shell} from "./chrome";
import {SECONDARY_EXAM_SUBJECTS} from "../data/subjects";
import {curriculumSubtopicsForTheme,curriculumSubtopicId} from "../data/curriculumVnext";
import {currentYearThemes,normalizeTaughtSubtopics} from "../lib/curriculumScope";
import {clearSessionDraft} from "../lib/sessionDraft";
import {migrateDailyMission} from "../lib/dailyMission";
import {recordMilestone} from "../lib/productAnalytics";
import {activateSubjectState,finishSubjectOnboardingState,subjectGoal,subjectOnboardingStep} from "../lib/subjectWorkspace";

const DEFAULT_SUBJECT_ID="math-a";
function subjectById(id){return SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===id)||SECONDARY_EXAM_SUBJECTS.find(subject=>subject.id===DEFAULT_SUBJECT_ID);}

function suggestedExamTimingForYear(year,current){
  if(year==="10.º")return "twoYears";
  if(year==="11.º")return "nextYear";
  if(year==="12.º")return "thisYear";
  if(year==="Já terminei o secundário")return "unsure";
  return current||"unsure";
}

export function StudentProfile({s,setS,go,editing=false,initialProfile}){
  const activeSubject=subjectById(s.activeSubjectId);
  const subjectSettings=s.subjectSettings?.[activeSubject.id]||{};
  const sharedProfileDone=!editing&&s.onboardingSharedProfileDone===true;
  const onboardingStep=subjectOnboardingStep(s,activeSubject.id);
  const [p,setP]=useState(()=>({
    ...(s.profile||initialProfile),
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

export function TaughtCurriculum({s,setS,go,onboarding=false}){
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
    <div className="notice"><b>Escolhe apenas o que já aprendeste</b><span>A app usa esta seleção para adaptar o diagnóstico, os treinos e as recomendações ao teu percurso escolar.</span></div>
    <button className="primary" onClick={save}>{onboarding?"Continuar":"Guardar matéria dada"}</button>
  </Shell>;
}

export function GoalScreen({s,setS,go,onboarding=false}){
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
