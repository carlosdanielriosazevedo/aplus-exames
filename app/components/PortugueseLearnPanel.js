"use client";
import {useMemo,useState} from "react";
import {PORTUGUESE_TAXONOMY,PORTUGUESE_TAXONOMY_VERSION,portugueseTaxonomyForYear} from "../data/portugueseTaxonomy";
import {portugueseReviewGuide} from "../data/portugueseReviewGuides";

const DOMAIN_LABELS={leitura:"Leitura","educacao-literaria":"Educação Literária",escrita:"Escrita",gramatica:"Gramática"};

export default function PortugueseLearnPanel({schoolYear="12.º"}){
  const years=useMemo(()=>portugueseTaxonomyForYear(schoolYear),[schoolYear]);
  const initialYear=years.at(-1)?.year||"12.º";
  const [year,setYear]=useState(initialYear);
  const [unitId,setUnitId]=useState(null);
  const yearRow=PORTUGUESE_TAXONOMY.find(row=>row.year===year)||years.at(-1);
  const unit=yearRow?.units.find(row=>row.id===unitId)||null;
  const guide=unit?portugueseReviewGuide(unit):null;

  return <section id="portugueseLearn" className="progressDetails" aria-label="Rever matéria de Português">
    <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h2>Matéria de Português, organizada para estudar.</h2></div>
    <p className="muted">Aqui não há perguntas, pontuação nem avaliação. Escolhe o ano e abre uma unidade para estudar, recordar ideias e organizar a matéria.</p>
    <div className="notice"><b>Modo de estudo</b><span>Rever matéria serve apenas para ler e consolidar conteúdos. Quando quiseres testar-te, regressa ao menu e escolhe “Praticar”.</span></div>
    <div className="chips" aria-label="Escolher ano de Português">{years.map(row=><button type="button" key={row.year} className={year===row.year?"sel":""} aria-pressed={year===row.year} onClick={()=>{setYear(row.year);setUnitId(null)}}>{row.label}</button>)}</div>
    {yearRow&&<>
      <div className="notice"><b>{yearRow.period}</b><span>O mapa inclui também leitura, escrita e gramática do {yearRow.year}.</span></div>
      {!unit?<div className="themeGrid">{yearRow.units.map(row=><button type="button" key={row.id} onClick={()=>setUnitId(row.id)}><b>{row.title}</b><small>{DOMAIN_LABELS[row.domain]} · {row.kind==="obra"?"obra/conjunto de textos":"competência"}</small></button>)}</div>
      :<article className="portugueseProgressCard">
        <button type="button" className="back" onClick={()=>setUnitId(null)}>← Todas as unidades do {yearRow.year}</button>
        <p className="eyebrow">{DOMAIN_LABELS[unit.domain]}</p><h2>{unit.title}</h2>
        <p>{unit.summary}</p>
        <div className="notice"><b>O essencial</b><ul>{unit.keyPoints.map(point=><li key={point}>{point}</li>)}</ul></div>
        {guide?.focus?.length>0&&<div className="notice"><b>Focos para recordar</b><ul>{guide.focus.map(point=><li key={point}>{point}</li>)}</ul></div>}
        {guide?.studySteps?.length>0&&<div className="notice"><b>{guide.label}</b><ul>{guide.studySteps.map(point=><li key={point}>{point}</li>)}</ul></div>}
        {guide?.pitfalls?.length>0&&<div className="notice"><b>Erros frequentes</b><ul>{guide.pitfalls.map(point=><li key={point}>{point}</li>)}</ul></div>}
        {guide?.memoryTip&&<div className="notice"><b>Para fixar</b><span>{guide.memoryTip}</span></div>}
      </article>}
    </>}
    <small className="muted">Taxonomia {PORTUGUESE_TAXONOMY_VERSION} · baseada no referencial curricular já registado na disciplina.</small>
  </section>;
}
