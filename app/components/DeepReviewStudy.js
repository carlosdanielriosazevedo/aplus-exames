"use client";
import styles from "./MathReviewMatter.module.css";

function compactLead(text){
  const value=String(text||"").trim();
  const firstSentence=value.match(/^.*?[.!?](?:\s|$)/u)?.[0]?.trim();
  return firstSentence||value;
}

// Formata apenas expoentes inequívocos, sem interpretar ou reescrever o conteúdo matemático.
// Notações mais complexas mantêm a representação original até existir renderer próprio.
function FormulaNotation({value}){
  const parts=String(value).split(/(\^\([^()]*\)|\^[A-Za-z0-9]+|(?<![\w^])\d+\/\d+(?![\w/])|√(?:[A-Za-zΔσ][A-Za-z0-9_]*|\d+)(?![\w(]))/gu);
  return parts.map((part,index)=>{
    if(part.startsWith("^"))return <sup key={index}>{part.slice(1).replace(/^\((.*)\)$/u,"$1")}</sup>;
    if(/^√(?:[A-Za-zΔσ][A-Za-z0-9_]*|\d+)$/u.test(part))return <span className={styles.simpleRadical} key={index} aria-hidden="true"><span>√</span><span>{part.slice(1)}</span></span>;
    if(/^\d+\/\d+$/u.test(part)){
      const [numerator,denominator]=part.split("/");
      return <span className={styles.numericFraction} key={index} aria-hidden="true"><span>{numerator}</span><span>{denominator}</span></span>;
    }
    return <span key={index}>{part}</span>;
  });
}

function SectionToolbox({section,kind}){
  if(kind==="portuguese"){
    if(!section.signals?.length)return null;
    return <div className={`${styles.reviewToolbox} ${styles.readingToolbox}`} aria-label={`Pistas de leitura de ${section.title}`}>
      <div className={styles.blockHeading}><span>02</span><div><small>PARA ORIENTAR A LEITURA</small><b>Pistas a procurar</b></div></div>
      <ul>{section.signals.map(signal=><li key={signal}>{signal}</li>)}</ul>
    </div>;
  }
  if(!section.formulas?.length)return null;
  return <div className={styles.reviewToolbox} aria-label={`Relações essenciais de ${section.title}`}>
    <div className={styles.blockHeading}><span>02</span><div><small>FERRAMENTAS</small><b>Relações essenciais</b></div></div>
    <div className={styles.formulaStack}>{section.formulas.map(formula=><code key={formula} aria-label={formula}><FormulaNotation value={formula}/></code>)}</div>
  </div>;
}

function GuidedExample({example,kind,noteFallback}){
  if(!example)return null;
  const answer=example.modelAnswer||example.result||example.answer;
  const note=example.note||noteFallback;
  return <div className={styles.reviewExample}>
    <div className={styles.blockHeading}><span>03</span><div><small>EXEMPLO ORIENTADO</small><b>{example.title||"Aplicação passo a passo"}</b></div></div>
    {example.prompt&&<p className={styles.examplePrompt}><b>Enunciado</b>{example.prompt}</p>}
    <ol className={styles.exampleSteps}>{(example.steps||[]).map(step=><li key={step}>{step}</li>)}</ol>
    {answer&&<div className={styles.exampleAnswer}><small>{kind==="portuguese"?"RESPOSTA-MODELO":"RESULTADO E INTERPRETAÇÃO"}</small><strong>{answer}</strong></div>}
    {note&&<p className={styles.exampleNote}>{note}</p>}
  </div>;
}

function ReviewSection({section,index,kind}){
  const kicker=section.kicker||`${index+1} · CONTEÚDO`;
  return <section className={styles.reviewLesson} id={section.id} key={section.id}>
    <header className={styles.lessonHeader}>
      <span className={styles.lessonNumber}>{String(index+1).padStart(2,"0")}</span>
      <div><small>{kicker}</small><h3>{section.title}</h3></div>
    </header>
    <div className={styles.lessonBody}>
      <div className={styles.explanationBlock}>
        <div className={styles.blockHeading}><span>01</span><div><small>COMPREENDER</small><b>Explicação</b></div></div>
        {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
      </div>
      <SectionToolbox section={section} kind={kind}/>
      <GuidedExample example={section.example} kind={kind} noteFallback={section.note}/>
      <div className={styles.lessonSummaryGrid}>
        {section.remember&&<div className={styles.reviewRemember}><small>04 · IDEIA-CHAVE</small><b>Fica com isto</b><p>{section.remember}</p></div>}
        {section.pitfalls?.length>0&&<div className={styles.reviewPitfalls}><small>05 · ATENÇÃO</small><b>Erros a evitar</b><ul>{section.pitfalls.map(point=><li key={point}>{point}</li>)}</ul></div>}
      </div>
    </div>
  </section>;
}

export default function DeepReviewStudy({study,kind="math",afterSections=null,finishTitle="O que deves conseguir fazer agora",finishText,finishItems}){
  const finalItems=finishItems||[
    "Explicar as ideias centrais por palavras tuas.",
    "Reconhecer que ferramenta, relação ou evidência é adequada em cada situação.",
    "Acompanhar um exemplo justificando cada passo, e não apenas o resultado.",
    "Identificar os erros típicos antes de começares a praticar."
  ];
  const verticalFlow={display:"flex",flexDirection:"column",alignItems:"stretch",width:"100%",maxWidth:"100%",minWidth:0};
  return <div className={styles.studyFlow} style={verticalFlow}>
    <section className={`${styles.reviewOverview} reviewChapter`}>
      <div className={styles.overviewHeader}>
        <small>INÍCIO · ORIENTAÇÃO</small>
        <h3>Antes de começares</h3>
        <p>{compactLead(study.lead)}</p>
        <p><b>Como estudar:</b> percebe o conceito → acompanha o exemplo → fixa a ideia-chave.</p>
      </div>
    </section>

    <nav className={styles.deepReviewMap} aria-label="Mapa desta revisão">
      <div className={styles.mapHeader}><small>MEIO · PERCURSO</small><b>Mapa do capítulo</b><p>Segue pela ordem sugerida ou abre diretamente a secção de que precisas.</p></div>
      <div className={styles.mapGrid}>{study.sections.map((section,index)=><a key={section.id} href={`#${section.id}`}><span>{String(index+1).padStart(2,"0")}</span><b>{section.title}</b></a>)}</div>
    </nav>

    <div className={styles.lessonStack}>{study.sections.map((section,index)=><ReviewSection key={section.id} section={section} index={index} kind={kind}/>)}</div>

    {afterSections}

    <section className={`${styles.reviewFinish} reviewChapter`}>
      <small>FIM · CONSOLIDAÇÃO</small>
      <h3>{finishTitle}</h3>
      {finishText&&<p>{finishText}</p>}
      <div className={styles.goalPanel}><b>Confirma o que já consegues fazer:</b><ul>{study.goals.map(goal=><li key={goal}>{goal}</li>)}</ul></div>
      <div className={styles.finishChecklist}>{finalItems.map(item=><span key={item}>✓ {item}</span>)}</div>
      <p className={styles.finishNextStep}>Quando quiseres confirmar que consegues aplicar tudo sem apoio, regressa a <b>Treinar</b> e escolhe <b>Praticar</b>.</p>
    </section>
  </div>;
}
