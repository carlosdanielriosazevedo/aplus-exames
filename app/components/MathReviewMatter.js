"use client";
import {useMemo,useState} from "react";
import {TAXONOMY} from "../data/content";
import {curriculumSubtopicsForTheme} from "../data/curriculumVnext";
import {mathReviewContentFor} from "../data/mathReviewContent";
import {Shell,StudentNav,StudentTop} from "./chrome";

const SCHOOL_YEARS=["10.º","11.º","12.º"];

function yearsThrough(year){
  const index=SCHOOL_YEARS.indexOf(year);
  return index<0?SCHOOL_YEARS:SCHOOL_YEARS.slice(0,index+1);
}

export default function MathReviewMatter({s,go}){
  const currentYear=SCHOOL_YEARS.includes(s.profile?.schoolYear)?s.profile.schoolYear:"12.º";
  const years=useMemo(()=>yearsThrough(currentYear),[currentYear]);
  const [year,setYear]=useState(years.at(-1)||"12.º");
  const [themeId,setThemeId]=useState(null);
  const themes=TAXONOMY.filter(row=>row.year===year);
  const selected=themes.find(row=>row.id===themeId)||null;
  const subtopics=selected?curriculumSubtopicsForTheme(selected.id):[];
  const study=selected?mathReviewContentFor(selected.id):null;

  return <Shell>
    <StudentTop s={s} go={go}/>
    <button className="back" onClick={()=>go("train")}>← Voltar</button>
    <section className="progressDetails" aria-label="Rever matéria de Matemática A">
      <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Matemática A para estudar com calma.</h1></div>
      <p className="muted">Aqui não há perguntas, pontuação nem avaliação. Escolhe uma matéria para ler um resumo, recordar conceitos, fórmulas e os erros que deves evitar.</p>
      <div className="notice"><b>Modo de estudo</b><span>Rever matéria serve apenas para ler e organizar ideias. Quando quiseres testar-te, usa “Praticar”.</span></div>
      <div className="chips" aria-label="Escolher ano de Matemática A">{years.map(row=><button type="button" key={row} className={year===row?"sel":""} aria-pressed={year===row} onClick={()=>{setYear(row);setThemeId(null)}}>{row}</button>)}</div>
      {!selected?<div className="themeGrid">{themes.map(row=><button type="button" key={row.id} onClick={()=>setThemeId(row.id)}><b>{row.short}</b><small>{row.name}</small></button>)}</div>
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
