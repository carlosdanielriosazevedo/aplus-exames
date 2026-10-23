"use client";
import {useMemo,useState} from "react";
import {PORTUGUESE_TAXONOMY,PORTUGUESE_TAXONOMY_VERSION} from "../data/portugueseTaxonomy";
import {portugueseReviewEntriesForYear} from "../data/portugueseReviewContent";
import {portugueseDeepReviewContentFor} from "../data/portugueseDeepReviewRegistry";
import DeepReviewStudy from "./DeepReviewStudy";
import ReviewMatterNavigator from "./ReviewMatterNavigator";
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
  const navigationYears=years.map(row=>({value:row.year,label:row.label,meta:row.period}));
  const navigationItems=entries.map(row=>({
    id:row.id,
    title:row.title,
    subtitle:row.subtitle||null,
    badge:DOMAIN_LABELS[row.domain],
    meta:row.keyPoints?.length?`${row.keyPoints.length} ideias essenciais`:null
  }));

  return <section id="portugueseLearn" className="progressDetails" aria-label="Rever matéria de Português">
    <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Português, organizado para compreender, interpretar e responder melhor.</h1></div>
    <p className="muted">Escolhe uma unidade e segue um percurso contínuo: começa pela visão global, avança pela leitura orientada e pelos exemplos e termina com aquilo que tens mesmo de reter e evitar.</p>
    <div className="notice"><b>Modo de estudo</b><span>Aqui não há perguntas, pontuação nem avaliação. Usa este espaço para organizar as ideias; quando quiseres testar se as consegues aplicar num texto novo, volta a “Treinar” e escolhe “Praticar”.</span></div>
    {yearRow&&(!unit?<ReviewMatterNavigator
      years={navigationYears}
      selectedYear={year}
      onYearChange={value=>{setYear(value);setUnitId(null)}}
      items={navigationItems}
      onSelect={setUnitId}
      yearAriaLabel="Escolher ano de Português"
      itemHeading={`Unidades do ${yearRow.year}`}
      itemDescription={`O percurso de ${yearRow.period} integra Educação Literária, Leitura, Escrita e Gramática numa revisão organizada por unidade.`}
      itemNoun="unidade"
    />
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
      <div className={styles.studyFlow}>
        <section className={styles.reviewLesson}>
          <header className={styles.lessonHeader}><span className={styles.lessonNumber}>01</span><div><small>EDUCAÇÃO LITERÁRIA · COMPREENDER</small><h3>{unit.title}</h3></div></header>
          <div className={styles.lessonBody}>
            <div className={styles.explanationBlock}>
              <div className={styles.blockHeading}><span>01</span><div><small>COMPREENDER</small><b>Explicação</b></div></div>
              <p>{unit.summary}</p>
            </div>
            <div className={styles.reviewToolbox}>
              <div className={styles.blockHeading}><span>02</span><div><small>PARA ORIENTAR A LEITURA</small><b>Pistas a procurar</b></div></div>
              <ul>{(unit.connections?.length?unit.connections:unit.keyPoints||[]).map(point=><li key={point}>{point}</li>)}</ul>
            </div>
            <div className={styles.reviewExample}>
              <div className={styles.blockHeading}><span>03</span><div><small>EXEMPLO ORIENTADO</small><b>Como construir uma interpretação</b></div></div>
              <ol className={styles.exampleSteps}>{(guide?.studySteps?.length?guide.studySteps:[
                "Identifica a ideia central que a pergunta exige interpretar.",
                "Seleciona uma passagem ou um recurso textual relevante.",
                "Explica como essa evidência sustenta a interpretação, sem resumir apenas o enredo."
              ]).map(step=><li key={step}>{step}</li>)}</ol>
            </div>
            <div className={styles.lessonSummaryGrid}>
              <div className={styles.reviewRemember}>
                <div className={styles.blockHeading}><span>04</span><div><small>IDEIA-CHAVE</small><b>Fica com isto</b></div></div>
                <p>{guide?.memoryTip||unit.keyPoints?.[0]||unit.summary}</p>
              </div>
              <div className={styles.reviewPitfalls}>
                <div className={styles.blockHeading}><span>05</span><div><small>ATENÇÃO</small><b>Erros a evitar</b></div></div>
                <ul>{(guide?.pitfalls?.length?guide.pitfalls:[
                  "Evita limitar a resposta a um resumo da obra.",
                  "Justifica as interpretações com evidência textual concreta."
                ]).map(point=><li key={point}>{point}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>)}
    <small className="muted">Taxonomia {PORTUGUESE_TAXONOMY_VERSION} · baseada no referencial curricular já registado na disciplina.</small>
  </section>;
}
