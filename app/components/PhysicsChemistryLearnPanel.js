"use client";
import {useState} from "react";
import {PHYSICS_CHEMISTRY_A_DOMAINS} from "../data/physicsChemistryFoundation";
import {physicsChemistryPracticalActivitiesForDomain} from "../data/physicsChemistryPracticalActivities";

export default function PhysicsChemistryLearnPanel({schoolYear="11.º"}){
  const defaultYear=schoolYear==="10.º"?"10.º":"11.º";
  const [year,setYear]=useState(defaultYear);
  const [domainId,setDomainId]=useState(null);
  const rows=PHYSICS_CHEMISTRY_A_DOMAINS.filter(row=>row.year===year);
  const selected=rows.find(row=>row.id===domainId)||null;
  const practical=selected?physicsChemistryPracticalActivitiesForDomain(selected.id):[];

  return <section className="progressDetails" aria-label="Rever matéria de Física e Química A">
    <div className="sectionIntro"><p className="eyebrow">REVER MATÉRIA</p><h1>Física e Química A para estudar com calma.</h1></div>
    <p className="muted">Aqui não há perguntas, pontuação nem avaliação. Escolhe um domínio para rever conceitos, relações, trabalho experimental e um método de estudo antes de voltares a praticar.</p>
    <div className="notice"><b>Modo de estudo</b><span>Rever matéria serve apenas para ler e consolidar conteúdos. Quando quiseres testar-te, regressa ao menu e escolhe “Praticar”.</span></div>
    <div className="chips yearSelector" aria-label="Escolher ano de Física e Química A">{["10.º","11.º"].map(value=><button type="button" key={value} className={year===value?"sel":""} aria-pressed={year===value} onClick={()=>{setYear(value);setDomainId(null)}}>{value}</button>)}</div>
    {!selected?<div className="themeGrid">{rows.map(row=><button type="button" key={row.id} onClick={()=>setDomainId(row.id)}><b>{row.shortTitle}</b><small>{row.area+" · "+row.title}</small></button>)}</div>
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
