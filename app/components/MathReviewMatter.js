"use client";
import {useState} from "react";
import {TAXONOMY} from "../data/content";
import {curriculumSubtopicsForTheme} from "../data/curriculumVnext";
import {mathReviewContentFor} from "../data/mathReviewContent";
import {mathDeepReviewContentFor} from "../data/mathDeepReviewRegistry";
import {Shell,StudentNav,StudentTop} from "./chrome";
import DeepReviewStudy from "./DeepReviewStudy";
import styles from "./MathReviewMatter.module.css";

const SCHOOL_YEARS=["10.º","11.º","12.º"];

export default function MathReviewMatter({s,go}){
  const currentYear=SCHOOL_YEARS.includes(s.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const [year,setYear]=useState(currentYear);
  const [themeId,setThemeId]=useState(null);
  const themes=TAXONOMY.filter(row=>row.year===year);
  const selected=themes.find(row=>row.id===themeId)||null;
  const subtopics=selected?curriculumSubtopicsForTheme(selected.id):[];
  const study=selected?mathReviewContentFor(selected.id):null;
  const deepStudy=selected?mathDeepReviewContentFor(selected.id):null;
  const selectedEyebrow=selected?`MATEMÁTICA A · ${year}${selected.optionalTrack?" · TEMA OPCIONAL":""}`:"";

  return <Shell className="wideStudentShell reviewStudyPage">
    <StudentTop s={s} go={go}/>
    <section className="progressDetails" aria-label="Rever matéria de Matemática A">
      <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Matemática A, organizada para perceber antes de praticar.</h1></div>
      <p className="muted">Escolhe uma matéria e segue um percurso com princípio, desenvolvimento e consolidação: primeiro compreendes as ideias, depois acompanhas exemplos e, no fim, fixas o essencial e os erros a evitar.</p>
      <div className="notice"><b>Modo de estudo</b><span>Aqui não há perguntas, pontuação nem avaliação. Lê ao teu ritmo; quando quiseres confirmar que consegues aplicar a matéria sem apoio, volta a “Treinar” e escolhe “Praticar”.</span></div>
      <div className="chips yearSelector" aria-label="Escolher ano de Matemática A">{SCHOOL_YEARS.map(row=><button type="button" key={row} className={year===row?"sel":""} aria-pressed={year===row} onClick={()=>{setYear(row);setThemeId(null)}}>{row}</button>)}</div>
      {!selected?<div className="themeGrid">{themes.map(row=><button type="button" key={row.id} onClick={()=>setThemeId(row.id)}><b>{row.short}</b><small>{row.optionalTrack?"TEMA OPCIONAL · ":""}{row.name}</small></button>)}</div>
      :deepStudy?<article className={`portugueseProgressCard ${styles.deepReviewArticle}`}>
        <button type="button" className="back" onClick={()=>setThemeId(null)}>← Todas as matérias do {year}</button>
        <p className="eyebrow">{selectedEyebrow}</p><h2>{selected.name}</h2>
        <DeepReviewStudy
          study={deepStudy}
          kind="math"
          finishText="Nesta fase já não deves ver as fórmulas como uma lista para decorar. Deves saber que ideia está em jogo, que relação faz sentido e como interpretar o resultado."
          finishItems={[
            "Explicar os conceitos centrais por palavras tuas.",
            "Escolher uma relação apenas depois de confirmares as condições de aplicação.",
            "Acompanhar uma resolução justificando cada passo.",
            "Detetar erros de sinal, condição, unidade ou interpretação antes de terminares."
          ]}
        />
      </article>
      :<article className="portugueseProgressCard">
        <button type="button" className="back" onClick={()=>setThemeId(null)}>← Todas as matérias do {year}</button>
        <p className="eyebrow">{selectedEyebrow}</p><h2>{selected.name}</h2>
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
