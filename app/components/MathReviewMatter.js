"use client";
import {useMemo,useState} from "react";
import {TAXONOMY} from "../data/content";
import {curriculumSubtopicsForTheme} from "../data/curriculumVnext";
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

  return <Shell>
    <StudentTop s={s} go={go}/>
    <button className="back" onClick={()=>go("train")}>← Voltar</button>
    <section className="progressDetails" aria-label="Rever matéria de Matemática A">
      <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Matemática A para estudar com calma.</h1></div>
      <p className="muted">Aqui não há perguntas, pontuação nem avaliação. Escolhe uma matéria para recordar os conceitos e a estrutura que deves dominar.</p>
      <div className="notice"><b>Modo de estudo</b><span>Rever matéria serve apenas para ler e organizar ideias. Quando quiseres testar-te, usa “Praticar”.</span></div>
      <div className="chips" aria-label="Escolher ano de Matemática A">{years.map(row=><button type="button" key={row} className={year===row?"sel":""} aria-pressed={year===row} onClick={()=>{setYear(row);setThemeId(null)}}>{row}</button>)}</div>
      {!selected?<div className="themeGrid">{themes.map(row=><button type="button" key={row.id} onClick={()=>setThemeId(row.id)}><b>{row.short}</b><small>{row.name}</small></button>)}</div>
      :<article className="portugueseProgressCard">
        <button type="button" className="back" onClick={()=>setThemeId(null)}>← Todas as matérias do {year}</button>
        <p className="eyebrow">MATEMÁTICA A · {year}</p><h2>{selected.name}</h2>
        <p>Ao rever esta matéria, concentra-te primeiro nos conceitos e relações fundamentais. Depois confirma se consegues reconhecer cada ideia nas diferentes representações e contextos.</p>
        <div className="notice"><b>Conceitos essenciais</b><ul>{selected.focus.map(point=><li key={point}>{point}</li>)}</ul></div>
        {subtopics.length>0&&<div className="notice"><b>Conteúdos a rever</b><ul>{subtopics.map(row=><li key={row.id}>{row.label}</li>)}</ul></div>}
        <div className="notice"><b>Como estudar esta matéria</b><span>Lê os conceitos, identifica fórmulas e relações importantes e tenta explicar cada ponto por palavras tuas. Quando quiseres responder a exercícios, regressa ao menu e escolhe “Praticar”.</span></div>
      </article>}
    </section>
    <StudentNav active="train" go={go}/>
  </Shell>;
}
