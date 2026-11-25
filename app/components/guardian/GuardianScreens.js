"use client";
// Área do encarregado de educação — ecrãs (protótipo com dados de exemplo; a
// versão real usa os mesmos componentes com dados do servidor).
// Decisões do product owner (2026-11-22/23): o aluno convida; o encarregado vê
// esforço, diagnóstico e evolução do índice (nunca respostas, notas, comparações
// ou rankings); email semanal; a ligação só termina com o acordo dos dois.
import {Logo,Apronso} from "../chrome";
import IndexTrendChart from "./IndexTrendChart";
import {formatMinutes,maskEmail} from "../../lib/guardianDashboard";
import styles from "./guardian.module.css";

const SEES=["Dias e tempo de estudo","Missões feitas e sequência de dias","Diagnóstico feito ou por fazer","Evolução do índice de preparação e tendência"];
const NEVER=["As respostas a cada pergunta","Notas","Comparações com outros alunos","Rankings"];

function SeesList({who="O teu encarregado"}){
  return <div className={styles.seesGrid}>
    <div><b>{who} vê</b><ul>{SEES.map(item=><li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul></div>
    <div><b>Nunca vê</b><ul className={styles.never}>{NEVER.map(item=><li key={item}><span aria-hidden="true">✕</span>{item}</li>)}</ul></div>
  </div>;
}

// ---------- Aluno: Conta → Encarregado de educação ----------
export function StudentGuardianLink({state,guardian={name:"Maria",email:"maria.silva@gmail.com",since:"12/11"},onState=()=>{}}){
  return <section className={styles.screen}>
    <p className={styles.eyebrow}>ENCARREGADO DE EDUCAÇÃO</p>
    {state==="none"&&<>
      <h1>Convida o teu encarregado de educação.</h1>
      <p className={styles.lead}>Assim pode acompanhar o teu esforço e a tua evolução, sem ver as tuas respostas.</p>
      <SeesList/>
      <label className={styles.field}>Email do encarregado<input type="email" placeholder="nome@email.pt" defaultValue=""/></label>
      <button className={styles.primary} onClick={()=>onState("pending")}>Enviar convite</button>
      <p className={styles.note}>O convite é válido durante 7 dias. Depois de ligados, a ligação só termina com o acordo dos dois.</p>
    </>}
    {state==="pending"&&<>
      <h1>Convite enviado.</h1>
      <div className={styles.statusCard}><b>À espera de {maskEmail(guardian.email)}</b><span>O convite é válido durante 7 dias. Quando o teu encarregado criar a conta, ficam ligados.</span></div>
      <button className={styles.primary} onClick={()=>{}}>Reenviar convite</button>
      <button className={styles.link} onClick={()=>onState("none")}>Cancelar convite</button>
    </>}
    {state==="linked"&&<>
      <h1>{guardian.name} acompanha o teu estudo.</h1>
      <div className={styles.statusCard}><b>Ligados desde {guardian.since}</b><span>Recebe um resumo por email todas as segundas-feiras.</span></div>
      <SeesList who={guardian.name}/>
      <button className={styles.secondary} onClick={()=>onState("removal_student")}>Pedir para terminar a ligação</button>
      <p className={styles.note}>A ligação só termina se {guardian.name} também concordar.</p>
    </>}
    {state==="removal_student"&&<>
      <h1>Pediste para terminar a ligação.</h1>
      <div className={styles.statusCard}><b>À espera de {guardian.name}</b><span>A ligação continua ativa até {guardian.name} confirmar.</span></div>
      <button className={styles.secondary} onClick={()=>onState("linked")}>Cancelar pedido</button>
    </>}
    {state==="removal_guardian"&&<>
      <h1>{guardian.name} pediu para terminar a ligação.</h1>
      <div className={styles.statusCard}><b>Precisa da tua confirmação</b><span>Se confirmares, {guardian.name} deixa de ver o teu progresso e de receber o resumo semanal.</span></div>
      <button className={styles.primary} onClick={()=>onState("none")}>Confirmar e terminar a ligação</button>
      <button className={styles.link} onClick={()=>onState("linked")}>Manter a ligação</button>
    </>}
  </section>;
}

// ---------- Encarregado: abrir o convite (link do email) ----------
export function GuardianInviteAccept({studentName="Rui"}){
  return <section className={styles.screen}>
    <Logo/>
    <div className={styles.inviteHero}>
      <Apronso pose="progress" alt=""/>
      <div><p className={styles.eyebrow}>CONVITE</p><h1>{studentName} quer que acompanhe o estudo na APProva+.</h1></div>
    </div>
    <SeesList who="Vai ver"/>
    <p className={styles.note}>A ligação só termina com o acordo dos dois. Pode deixar de receber o resumo semanal quando quiser.</p>
    <label className={styles.check}><input type="checkbox"/><span>Tenho 18 anos ou mais e aceito os <a href="/termos">termos</a> e a <a href="/privacidade">política de privacidade</a>.</span></label>
    <button className={styles.google} type="button"><span aria-hidden="true">G</span>Continuar com Google</button>
    <button className={styles.primary} type="button">Criar conta com email</button>
    <button className={styles.link} type="button">Já tem conta? Entrar</button>
  </section>;
}

// ---------- Encarregado: painel ----------
function WeekCard({model}){
  const {week}=model;
  const delta=week.deltaActiveDays;
  return <section className={styles.card}>
    <p className={styles.eyebrow}>ESTA SEMANA</p>
    <h2>{week.activeDays} {week.activeDays===1?"dia":"dias"} de estudo</h2>
    <p className={styles.muted}>{delta>0?`Mais ${delta} ${delta===1?"dia":"dias"} do que na semana anterior.`:delta<0?`Menos ${-delta} ${delta===-1?"dia":"dias"} do que na semana anterior.`:"O mesmo que na semana anterior."}</p>
    <ol className={styles.dayDots} aria-label="Últimos 7 dias">{week.days.map(day=><li key={day.key} className={`${day.active?styles.dayOn:""} ${day.today?styles.dayToday:""}`} aria-label={`${day.weekday}: ${day.active?`estudou ${day.minutes} min`:"sem estudo"}`}>{day.weekday}</li>)}</ol>
    <div className={styles.stats}>
      <div><b>{formatMinutes(week.minutes)}</b><span>tempo aproximado</span></div>
      <div><b>{week.missions}</b><span>{week.missions===1?"missão feita":"missões feitas"}</span></div>
      <div><b>🔥 {week.streak}</b><span>{week.streak===1?"dia seguido":"dias seguidos"}</span></div>
    </div>
  </section>;
}

function SubjectCard({subject}){
  return <section className={styles.card}>
    <div className={styles.subjectHead}>
      <h3>{subject.name}</h3>
      {subject.diagnosticDone&&<span className={`${styles.trend} ${styles[`trend_${subject.trend.key}`]}`}><span aria-hidden="true">{subject.trend.symbol}</span>{subject.trend.words}</span>}
    </div>
    {subject.diagnosticDone
      ?<>
        <p className={styles.muted}>Índice de preparação: <b className={styles.indexValue}>{subject.index}</b> <span className={styles.small}>/ 100</span> · Diagnóstico feito a {subject.diagnosticAt}</p>
        <IndexTrendChart series={subject.series} title={`Índice de preparação em ${subject.name}`}/>
      </>
      :<p className={styles.muted}>Diagnóstico por fazer. O índice aparece depois do diagnóstico (cerca de 10 minutos).</p>}
  </section>;
}

export function GuardianDashboard({models,activeId,onSelect=()=>{}}){
  const model=models.find(row=>row.id===activeId)||models[0];
  return <section className={styles.screen}>
    <div className={styles.dashTop}><Logo/><span className={styles.role}>Encarregado de educação</span></div>
    {models.length>1&&<div className={styles.childTabs} role="tablist" aria-label="Educandos">{models.map(row=><button key={row.id} role="tab" aria-selected={row.id===model.id} className={row.id===model.id?styles.childOn:""} onClick={()=>onSelect(row.id)}>{row.firstName}</button>)}</div>}
    <h1 className={styles.childName}>{model.firstName} <span>· {model.schoolYear}</span></h1>
    <WeekCard model={model}/>
    <p className={styles.sectionTitle}>Disciplinas</p>
    {model.subjects.map(subject=><SubjectCard key={subject.id} subject={subject}/>)}
    <p className={styles.caveat}>O índice (0–100) resume o trabalho feito na app em cada disciplina. Não é uma previsão da nota do exame.</p>
    <section className={`${styles.card} ${styles.tips}`}>
      <p className={styles.eyebrow}>COMO PODE AJUDAR</p>
      {model.tips.map(tip=><p key={tip}>{tip}</p>)}
    </section>
    <div className={styles.footerLinks}>
      <span>Ligação com {model.firstName} desde {model.linkedSince} · resumo por email às segundas-feiras</span>
      <button className={styles.link} type="button">Deixar de receber o resumo semanal</button>
      <button className={styles.link} type="button">Pedir para terminar a ligação ({model.firstName} tem de confirmar)</button>
    </div>
  </section>;
}

// ---------- Email semanal ----------
export function WeeklyEmailPreview({subject,preheader,html}){
  return <section className={styles.screen}>
    <div className={styles.inbox}>
      <span className={styles.inboxFrom}>APProva+ · segunda-feira, 08:05</span>
      <b>{subject}</b>
      <span className={styles.muted}>{preheader}</span>
    </div>
    <iframe title="Resumo semanal por email" className={styles.emailFrame} srcDoc={html} sandbox=""/>
  </section>;
}
