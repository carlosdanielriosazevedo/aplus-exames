"use client";
import {useState} from "react";
import {PHYSICS_CHEMISTRY_A_DOMAINS} from "../data/physicsChemistryFoundation";

export default function PhysicsChemistryLearnPanel({schoolYear="11.º"}){
  const defaultYear=schoolYear==="10.º"?"10.º":"11.º";
  const [year,setYear]=useState(defaultYear);
  const rows=PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===year);
  return <>
    <div className="sectionIntro compact"><p className="eyebrow">REVER MATÉRIA</p><h1>Física e Química A</h1><p className="muted">Aqui não há perguntas, pontuação nem avaliação. Consulta e consolida a estrutura da matéria ao teu ritmo.</p></div>
    <div className="chips yearSelector" aria-label="Escolher ano">{["10.º","11.º"].map(value=><button type="button" key={value} className={year===value?"sel":""} aria-pressed={year===value} onClick={()=>setYear(value)}>{value}</button>)}</div>
    <div className="reviewChapterList">{rows.map(row=><details className="reviewChapter" key={row.id}>
      <summary><div><small>{row.area.toUpperCase()} · {row.year}</small><b>{row.title}</b></div><span>⌄</span></summary>
      <div className="reviewChapterBody"><p>Conteúdos nucleares deste domínio:</p><ul>{row.subtopics.map(topic=><li key={topic}>{topic}</li>)}</ul></div>
    </details>)}</div>
  </>;
}
