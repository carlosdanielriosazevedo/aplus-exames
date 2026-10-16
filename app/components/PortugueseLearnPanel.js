"use client";
import {useMemo,useState} from "react";
import {PORTUGUESE_TAXONOMY,PORTUGUESE_TAXONOMY_VERSION} from "../data/portugueseTaxonomy";
import {portugueseReviewEntriesForYear} from "../data/portugueseReviewContent";
import {portugueseDeepReviewContentFor} from "../data/portugueseDeepReviewRegistry";
import DeepReviewStudy from "./DeepReviewStudy";
import styles from "./MathReviewMatter.module.css";

const DOMAIN_LABELS={leitura:"Leitura","educacao-literaria":"Educação Literária",escrita:"Escrita",gramatica:"Gramática"};
const SCHOOL_YEARS=["10.º","11.º","12.º"];

export default function PortugueseLearnPanel({schoolYear="12.º"}){
  const years=useMemo(()=>PORTUGUESE_TAXONOMY.filter(row=>SCHOOL_YEARS.includes(row.year)),[]);
  const initialYear=SCHOOL_YEARS.includes(schoolYear)?schoolYear:"12.º";
  const [year,setYear]=useState(initialYear);
  const [unitId,setUnitId]=useState(null);
  const yearRow=PORTUGUESE_TAXONOMY.find(row=>row.year===year)||years.at(-1);
  const entries=useMemo(()=>portugueseReviewEntriesForYear(year),[year]);
  const unit=entries.find(row=>row.id===unitId)||null;
  const guide=unit?.guide||null;
  const deepStudy=unit?portugueseDeepReviewContentFor(unit.id):null;

  return <section id="portugueseLearn" className="progressDetails" aria-label="Rever matéria de Português">
    <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Português, organizado para compreender, interpretar e responder melhor.</h1></div>
    <p className="muted">Escolhe uma unidade e segue um percurso contínuo: começa pela visão global, avança pela leitura orientada e pelos exemplos e termina com aquilo que tens mesmo de reter e evitar.</p>
    <div className="notice"><b>Modo de estudo</b><span>Aqui não há perguntas, pontuação nem avaliação. Usa este espaço para organizar as ideias; quando quiseres testar se as consegues aplicar num texto novo, volta a “Treinar” e escolhe “Praticar”.</span></div>
    <div className="chips yearSelector" aria-label="Escolher ano de Português">{years.map(row=><button type="button" key={row.year} className={year===row.year?"sel":""} aria-pressed={year===row.year} onClick={()=>{setYear(row.year);setUnitId(null)}}>{row.label}</button>)}</div>
    {yearRow&&<>
      <div className="notice"><b>{yearRow.period}</b><span>O mapa inclui Educação Literária, Leitura, Escrita e Gramática do {yearRow.year}.</span></div>
      {!unit?<div className="themeGrid">{entries.map(row=><button type="button" key={row.id} onClick={()=>setUnitId(row.id)}><b>{row.title}</b><small>{row.subtitle||`${DOMAIN_LABELS[row.domain]} · competência`}</small></button>)}</div>
      :deepStudy?<article className={`portugueseProgressCard ${styles.deepReviewArticle}`}>
        <button type="button" className="back" onClick={()=>setUnitId(null)}>← Todas as unidades do {yearRow.year}</button>
        <p className="eyebrow">PORTUGUÊS · {yearRow.year} · {DOMAIN_LABELS[unit.domain]}</p><h2>{unit.title}</h2>
        {unit.subtitle&&<p className="muted">{unit.subtitle}</p>}
        <DeepReviewStudy
          study={deepStudy}
          kind="portuguese"
          finishTitle="Do conhecimento para uma resposta clara e fundamentada"
          finishText="No fim da revisão, o objetivo não é reproduzir uma resposta decorada. É saber formular uma ideia precisa, escolher a evidência relevante e explicar por que razão essa evidência sustenta a interpretação."
          finishItems={[
            "Responder diretamente ao verbo do enunciado.",
            "Selecionar marcas textuais ou conceitos realmente relevantes.",
            "Explicar a ligação entre evidência e interpretação.",
            "Evitar resumo, etiquetas vazias e afirmações sem prova."
          ]}
        />
      </article>
      :<article className="portugueseProgressCard">
        <button type="button" className="back" onClick={()=>setUnitId(null)}>← Todas as unidades do {yearRow.year}</button>
        <p className="eyebrow">PORTUGUÊS · {yearRow.year} · {DOMAIN_LABELS[unit.domain]}</p><h2>{unit.title}</h2>
        {unit.subtitle&&<p className="muted">{unit.subtitle}</p>}
        <div className="reviewChapter"><small>1 · VISÃO GLOBAL</small><h3>O que precisas de compreender</h3><p>{unit.summary}</p></div>
        <div className="reviewChapter"><small>2 · MAPA DE CONTEÚDOS</small><h3>Ideias fundamentais</h3><ol>{unit.keyPoints.map(point=><li key={point}>{point}</li>)}</ol></div>
        {unit.connections?.length>0&&<div className="reviewChapter formulaChapter"><small>3 · LIGAÇÕES IMPORTANTES</small><h3>Como aprofundar a leitura</h3><ul>{unit.connections.map(point=><li key={point}>{point}</li>)}</ul></div>}
        {guide?.studySteps?.length>0&&<div className="reviewChapter"><small>4 · MÉTODO</small><h3>{guide.label}</h3><ol>{guide.studySteps.map(point=><li key={point}>{point}</li>)}</ol></div>}
        {guide?.pitfalls?.length>0&&<div className="reviewChapter warningChapter"><small>5 · ARMADILHAS</small><h3>Erros frequentes e como os evitar</h3><ul>{guide.pitfalls.map(point=><li key={point}>{point}</li>)}</ul></div>}
        <div className="reviewChapter reviewStudyPlan"><small>6 · PREPARAÇÃO PARA RESPOSTA</small><h3>Do texto para uma resposta completa</h3><ol><li>Responde diretamente ao que foi perguntado, usando o conceito certo.</li><li>Seleciona uma marca textual, ação, imagem ou recurso que sustente a ideia.</li><li>Explica a ligação entre essa evidência e a tua interpretação.</li><li>Relê e elimina resumo de enredo que não contribua para a resposta.</li></ol>{guide?.memoryTip&&<p className="reviewCallout">{guide.memoryTip}</p>}</div>
      </article>}
    </>}
    <small className="muted">Taxonomia {PORTUGUESE_TAXONOMY_VERSION} · baseada no referencial curricular já registado na disciplina.</small>
  </section>;
}
