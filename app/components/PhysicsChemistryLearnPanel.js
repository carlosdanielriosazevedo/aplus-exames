"use client";
import {useState} from "react";
import {PHYSICS_CHEMISTRY_A_DOMAINS} from "../data/physicsChemistryFoundation";
import {physicsChemistryPracticalActivitiesForDomain} from "../data/physicsChemistryPracticalActivities";
import {physicsChemistryDeepReviewContentFor} from "../data/physicsChemistryDeepReviewRegistry";
import DeepReviewStudy from "./DeepReviewStudy";
import styles from "./MathReviewMatter.module.css";

function PracticalReview({practical}){
  return <section className={`${styles.reviewLesson} ${styles.practicalLesson}`}>
    <header className={styles.lessonHeader}>
      <span className={styles.lessonNumber}>TP</span>
      <div><small>TRABALHO PRÁTICO</small><h3>Da experiência à conclusão científica</h3></div>
    </header>
    <div className={styles.lessonBody}>
      <div className={styles.explanationBlock}>
        <div className={styles.blockHeading}><span>01</span><div><small>ORGANIZAR</small><b>O que tens de controlar numa atividade experimental</b></div></div>
        <p>Antes de olhar para cálculos ou gráficos, identifica o objetivo, as variáveis, o procedimento, os dados recolhidos e a forma como esses dados podem sustentar uma conclusão.</p>
      </div>
      {practical.length?<div className={styles.reviewToolbox}>
        <div className={styles.blockHeading}><span>02</span><div><small>ATIVIDADES ASSOCIADAS</small><b>Aprendizagens Essenciais</b></div></div>
        <ul>{practical.map(activity=><li key={activity.id}><b>{activity.label}</b> — {activity.focus.join(" · ")}</li>)}</ul>
      </div>:<div className={styles.reviewToolbox}><p>Este domínio não tem uma atividade prática específica registada neste mapa.</p></div>}
      <div className={styles.lessonSummaryGrid}>
        <div className={styles.reviewRemember}><small>03 · IDEIA-CHAVE</small><b>Fica com isto</b><p>Uma conclusão experimental deve nascer dos dados e das incertezas observadas, não apenas do resultado que esperavas obter.</p></div>
        <div className={styles.reviewPitfalls}><small>04 · ATENÇÃO</small><b>Não te esqueças</b><ul><li>Distingue variáveis independentes, dependentes e controladas.</li><li>Apresenta unidades e tratamento de dados de forma coerente.</li><li>Discute incerteza, limitações e evidência antes da conclusão.</li></ul></div>
      </div>
    </div>
  </section>;
}

export default function PhysicsChemistryLearnPanel({schoolYear="11.º"}){
  const defaultYear=schoolYear==="10.º"?"10.º":"11.º";
  const [year,setYear]=useState(defaultYear);
  const [domainId,setDomainId]=useState(null);
  const rows=PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===year);
  const selected=rows.find(row=>row.id===domainId)||null;
  const practical=selected?physicsChemistryPracticalActivitiesForDomain(selected.id):[];
  const deepStudy=selected?physicsChemistryDeepReviewContentFor(selected.id):null;

  return <section className="progressDetails" aria-label="Rever matéria de Física e Química A">
    <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Física e Química A, organizada para compreender antes de calcular.</h1></div>
    <p className="muted">Escolhe um domínio e segue um percurso coerente: conceitos primeiro, relações e exemplos depois, trabalho experimental quando aplicável e, no fim, uma consolidação do que tens mesmo de saber fazer.</p>
    <div className="notice"><b>Modo de estudo</b><span>Sem perguntas nem pontuação. Usa este espaço para organizar conceitos e métodos; quando quiseres testar a aplicação sem apoio, volta a “Treinar” e escolhe “Praticar”.</span></div>
    <div className="chips yearSelector" aria-label="Escolher ano de Física e Química A">{["10.º","11.º"].map(value=><button type="button" key={value} className={year===value?"sel":""} aria-pressed={year===value} onClick={()=>{setYear(value);setDomainId(null)}}>{value}</button>)}</div>
    {!selected?<div className="themeGrid">{rows.map(row=><button type="button" key={row.id} onClick={()=>setDomainId(row.id)}><b>{row.shortTitle}</b><small>{row.area+" · "+row.title}</small></button>)}</div>
    :deepStudy?<article className={`portugueseProgressCard ${styles.deepReviewArticle}`}>
      <button type="button" className="back" onClick={()=>setDomainId(null)}>← Todos os domínios do {year}</button>
      <p className="eyebrow">FÍSICA E QUÍMICA A · {selected.year} · {selected.area.toUpperCase()}</p>
      <h2>{selected.title}</h2>
      <DeepReviewStudy
        study={deepStudy}
        kind="science"
        afterSections={<PracticalReview practical={practical}/>} 
        finishText="No fim da revisão, deves conseguir ligar conceito, modelo, cálculo e interpretação. Um resultado só fica completo quando faz sentido científico, tem unidades corretas e é justificado pelo modelo usado."
        finishItems={[
          "Explicar os conceitos do domínio sem depender de palavras-chave soltas.",
          "Escolher relações apenas depois de identificar grandezas e condições.",
          "Interpretar gráficos, unidades, sinais e ordens de grandeza.",
          "Justificar conclusões experimentais com base na evidência recolhida."
        ]}
      />
    </article>
    :<article className="portugueseProgressCard">
      <button type="button" className="back" onClick={()=>setDomainId(null)}>← Todos os domínios do {year}</button>
      <p className="eyebrow">FÍSICA E QUÍMICA A · {selected.year} · {selected.area.toUpperCase()}</p>
      <h2>{selected.title}</h2>
      <div className="reviewChapter"><small>1 · VISÃO GLOBAL</small><h3>O que tens de organizar primeiro</h3><p>Começa por perceber como os conceitos deste domínio se relacionam entre si. Antes de fazer contas, identifica as grandezas, as condições físicas ou químicas do problema e o modelo que está a ser usado.</p></div>
      <div className="reviewChapter"><small>2 · MAPA DA MATÉRIA</small><h3>Conteúdos nucleares</h3><div className="reviewCheckGrid">{selected.subtopics.map(topic=><span key={topic}>✓ {topic}</span>)}</div></div>
      <div className="reviewChapter formulaChapter"><small>3 · RELAÇÕES E GRANDEZAS</small><h3>Antes de aplicar uma expressão</h3><ol><li>Identifica as grandezas envolvidas e as unidades.</li><li>Confirma as condições em que a relação física ou química pode ser usada.</li><li>Substitui valores só depois de escolheres o modelo adequado.</li><li>No fim, verifica unidade, ordem de grandeza e coerência científica do resultado.</li></ol></div>
      <div className="reviewChapter"><small>4 · TRABALHO PRÁTICO</small><h3>Atividades associadas nas Aprendizagens Essenciais</h3><p><b>Trabalho prático associado nas AE:</b> planeia, mede, trata dados e justifica conclusões com base na evidência experimental.</p>{practical.length?<ul>{practical.map(activity=><li key={activity.id}><b>{activity.label}</b> — {activity.focus.join(" · ")}</li>)}</ul>:<p>Este domínio não tem uma atividade prática específica registada neste mapa.</p>}<p className="reviewCallout">No trabalho experimental, distingue sempre objetivo, variáveis, procedimento, tratamento de dados, incerteza e conclusão.</p></div>
      <div className="reviewChapter warningChapter"><small>5 · ARMADILHAS</small><h3>O que deves confirmar numa resposta</h3><ul><li>Não uses uma fórmula só por reconheceres símbolos parecidos.</li><li>Não ignores unidades, sinais ou condições experimentais.</li><li>Num gráfico ou tabela, descreve a evidência antes de concluir.</li><li>Numa justificação, liga explicitamente o princípio científico ao que acontece no caso apresentado.</li></ul></div>
      <div className="reviewChapter reviewStudyPlan"><small>6 · PLANO DE REVISÃO</small><h3>Como estudar este domínio</h3><ol><li>Percorre o mapa de conteúdos e explica cada subtema por palavras tuas.</li><li>Revê as relações entre grandezas e o significado físico ou químico de cada termo.</li><li>Escolhe uma atividade prática e identifica o que seria medido, controlado e concluído.</li><li>Regressa ao menu e usa “Praticar” para testar se consegues aplicar o que acabaste de rever.</li></ol></div>
    </article>}
  </section>;
}
