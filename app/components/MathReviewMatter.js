"use client";
import {useState} from "react";
import {TAXONOMY} from "../data/content";
import {curriculumSubtopicsForTheme} from "../data/curriculumVnext";
import {mathReviewContentFor} from "../data/mathReviewContent";
import {mathDeepReviewContentFor} from "../data/mathDeepReviewRegistry";
import {Shell,StudentNav,StudentTop} from "./chrome";
import styles from "./MathReviewMatter.module.css";

const SCHOOL_YEARS=["10.º","11.º","12.º"];

function WorkedExample({example}){
  if(!example)return null;
  return <div className={styles.reviewExample}>
    <b>{example.title}</b>
    <ol>{example.steps.map(step=><li key={step}>{step}</li>)}</ol>
    <strong>{example.result}</strong>
    {example.note&&<p>{example.note}</p>}
  </div>;
}

function DeepMathReview({study}){
  return <>
    <div className={`reviewChapter ${styles.deepReviewIntro}`}>
      <small>VISÃO GLOBAL</small>
      <h3>O que vais aprender nesta revisão</h3>
      <p>{study.lead}</p>
      <ul className={styles.deepReviewGoals}>{study.goals.map(goal=><li key={goal}>{goal}</li>)}</ul>
    </div>
    <nav className={styles.deepReviewMap} aria-label="Conteúdos desta revisão">
      <b>Conteúdos</b>
      <div>{study.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</div>
    </nav>
    {study.sections.map(section=><section className={styles.reviewLesson} id={section.id} key={section.id}>
      <small>{section.kicker}</small>
      <h3>{section.title}</h3>
      {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
      {section.formulas?.length>0&&<div className={styles.reviewFormulaList} aria-label={`Relações essenciais de ${section.title}`}>
        <b>Relações essenciais</b>
        {section.formulas.map(formula=><code key={formula}>{formula}</code>)}
      </div>}
      <WorkedExample example={section.example}/>
      {section.remember&&<p className={styles.reviewRemember}><b>Fica com esta ideia:</b> {section.remember}</p>}
      {section.pitfalls?.length>0&&<div className={styles.reviewPitfalls}><b>Erros a evitar</b><ul>{section.pitfalls.map(point=><li key={point}>{point}</li>)}</ul></div>}
    </section>)}
    <div className={`reviewChapter ${styles.reviewFinish}`}>
      <small>FECHO DA REVISÃO</small>
      <h3>O que deves conseguir fazer agora</h3>
      <p>Depois desta leitura, deves conseguir explicar os conceitos centrais desta matéria, escolher as relações adequadas e acompanhar uma resolução sem depender apenas de fórmulas memorizadas.</p>
      <p>Quando quiseres verificar se consegues aplicar estes conceitos sem apoio, regressa a “Treinar” e escolhe “Praticar”.</p>
    </div>
  </>;
}

export default function MathReviewMatter({s,go}){
  const currentYear=SCHOOL_YEARS.includes(s.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const [year,setYear]=useState(currentYear);
  const [themeId,setThemeId]=useState(null);
  const themes=TAXONOMY.filter(row=>row.year===year);
  const selected=themes.find(row=>row.id===themeId)||null;
  const subtopics=selected?curriculumSubtopicsForTheme(selected.id):[];
  const study=selected?mathReviewContentFor(selected.id):null;
  const deepStudy=selected?mathDeepReviewContentFor(selected.id):null;

  return <Shell className="wideStudentShell reviewStudyPage">
    <StudentTop s={s} go={go}/>
    
    <section className="progressDetails" aria-label="Rever matéria de Matemática A">
      <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Matemática A para estudar com calma.</h1></div>
      <p className="muted">Aqui não há perguntas, pontuação nem avaliação. Escolhe uma matéria para aprender ou rever a teoria, acompanhar exemplos resolvidos e consolidar os conceitos antes de praticares.</p>
      <div className="notice"><b>Modo de estudo</b><span>Lê ao teu ritmo e acompanha os exemplos. Quando quiseres testar o que aprendeste, regressa ao menu e escolhe “Praticar”.</span></div>
      <div className="chips yearSelector" aria-label="Escolher ano de Matemática A">{SCHOOL_YEARS.map(row=><button type="button" key={row} className={year===row?"sel":""} aria-pressed={year===row} onClick={()=>{setYear(row);setThemeId(null)}}>{row}</button>)}</div>
      {!selected?<div className="themeGrid">{themes.map(row=><button type="button" key={row.id} onClick={()=>setThemeId(row.id)}><b>{row.short}</b><small>{row.name}</small></button>)}</div>
      :deepStudy?<article className={`portugueseProgressCard ${styles.deepReviewArticle}`}>
        <button type="button" className="back" onClick={()=>setThemeId(null)}>← Todas as matérias do {year}</button>
        <p className="eyebrow">MATEMÁTICA A · {year}</p><h2>{selected.name}</h2>
        <DeepMathReview study={deepStudy}/>
      </article>
      :<article className="portugueseProgressCard">
        <button type="button" className="back" onClick={()=>setThemeId(null)}>← Todas as matérias do {year}</button>
        <p className="eyebrow">MATEMÁTICA A · {year}</p><h2>{selected.name}</h2>
        <div className="reviewChapter"><small>1 · VISÃO GLOBAL</small><h3>O que esta matéria explica</h3><p>{study?.summary||"Ao rever esta matéria, concentra-te primeiro nos conceitos e relações fundamentais."}</p></div>
        <div className="reviewChapter"><small>2 · IDEIAS FUNDAMENTAIS</small><h3>O que tens mesmo de compreender</h3><ol>{(study?.keyIdeas||selected.focus).map(point=><li key={point}>{point}</li>)}</ol></div>
        {study?.formulas?.length>0&&<div className="reviewChapter formulaChapter"><small>3 · FERRAMENTAS</small><h3>Relações e fórmulas a recordar</h3><ul>{study.formulas.map(point=><li key={point}>{point}</li>)}</ul><p className="reviewCallout">Não basta decorar: confirma sempre as condições em que cada relação pode ser usada.</p></div>}
        {subtopics.length>0&&<div className="reviewChapter"><small>4 · MAPA DA MATÉRIA</small><h3>Conteúdos desta unidade</h3><div className="reviewCheckGrid">{subtopics.map(row=><span key={row.id}>✓ {row.label}</span>)}</div></div>}
        {study?.pitfalls?.length>0&&<div className="reviewChapter warningChapter"><small>5 · ARMADILHAS</small><h3>Erros frequentes e como os evitar</h3><ul>{study.pitfalls.map(point=><li key={point}>{point}</li>)}</ul></div>}
        <div className="reviewChapter reviewStudyPlan"><small>6 · PLANO DE REVISÃO</small><h3>Como estudar esta matéria</h3><p>{study?.studyTip||"Lê os conceitos e tenta explicar cada ponto por palavras tuas."}</p><ol><li>Lê a visão global sem fazer contas.</li><li>Explica cada ideia por palavras tuas.</li><li>Reescreve as fórmulas e identifica quando se aplicam.</li><li>Só depois regressa ao menu e escolhe “Praticar”.</li></ol></div>
      </article>}
    </section>
    <StudentNav active="train" go={go}/>
  </Shell>;
}
