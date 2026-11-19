// Resumo semanal e alarmes da beta pública (só contagens anónimas).
//
// Fontes: funnel_daily (passos por dia e origem) e content_reports (reportes de
// perguntas). Nenhuma das tabelas tem identificadores de pessoas.
//
// Limitação conhecida: as contagens são por dia do evento, não por aluno.
// As taxas são aproximações (ex.: "acabou o diagnóstico esta semana" ÷ "começou
// o diagnóstico esta semana"), boas para tendências e alarmes, não para decimais.

export const ALARM_RULES=Object.freeze({
  diagnosticCompletion:{min:0.5,minSample:30},   // < 50% acaba o diagnóstico
  nextDayReturn:{min:0.2,minSample:30},          // < 20% volta no dia seguinte
  repeatedReport:{minReports:3,windowDays:7},    // mesma pergunta reportada ≥ 3 vezes
  silentFunnel:{days:2}                          // 2 dias sem contagens depois de ter havido
});

export const STEP_LABELS=Object.freeze({
  app_opened:"Abriram a app",
  subjects_selected:"Escolheram disciplinas",
  diagnostic_started:"Começaram o diagnóstico",
  diagnostic_completed:"Acabaram o diagnóstico",
  first_session_completed:"Acabaram a primeira missão",
  account_linked:"Criaram conta",
  returned_next_day:"Voltaram no dia seguinte",
  returned_week_after:"Voltaram na semana seguinte"
});
const STEP_ORDER=Object.keys(STEP_LABELS);
const CATEGORY_LABELS={wrong:"resposta errada",unclear:"pouco clara",difficulty:"dificuldade",typo:"gralha",other:"outro"};
const SUBJECT_LABELS={"math-a":"Matemática A",portuguese:"Português","physics-chemistry-a":"FQ A",unknown:"?"};

// Dia de calendário em Lisboa (YYYY-MM-DD) e aritmética de dias.
export function lisbonDay(date=new Date()){
  return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Lisbon",year:"numeric",month:"2-digit",day:"2-digit"}).format(date);
}
export function addDays(day,n){
  const d=new Date(`${day}T12:00:00Z`);d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10);
}
export function lisbonWeekday(date=new Date()){
  return new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Lisbon",weekday:"short"}).format(date);
}

// Lê os dados da semana que termina em `today` (exclusivo): [today-7, today-1].
export async function loadWeeklyData(sql,today){
  const start=addDays(today,-7),prevStart=addDays(today,-14),lagStart=addDays(today,-14);
  const funnelRows=await sql`
    select day::text as day, step, source, count::int as count
    from public.funnel_daily
    where day >= ${lagStart}::date and day < ${today}::date
  `;
  const reportRows=await sql`
    select item_id, subject_id, category, count(*)::int as reports, max(created_at) as last_at
    from public.content_reports
    where created_at >= (${start}::date at time zone 'Europe/Lisbon')
    group by item_id, subject_id, category
  `;
  return {today,start,prevStart,funnelRows,reportRows};
}

const sumWhere=(rows,pred)=>rows.reduce((t,r)=>pred(r)?t+Number(r.count||0):t,0);
const ratio=(num,den)=>den>0?num/den:null;
export const pct=v=>v===null||v===undefined?"—":`${Math.round(v*100)}%`;

export function summarize({today,start,prevStart,funnelRows,reportRows}){
  const inWeek=r=>r.day>=start&&r.day<today;
  const inPrev=r=>r.day>=prevStart&&r.day<start;
  const steps={},prevSteps={};
  for(const step of STEP_ORDER){
    steps[step]=sumWhere(funnelRows,r=>r.step===step&&inWeek(r));
    prevSteps[step]=sumWhere(funnelRows,r=>r.step===step&&inPrev(r));
  }
  // Por origem: quem abriu a app, acabou o diagnóstico e criou conta.
  const sources={};
  for(const r of funnelRows.filter(inWeek)){
    const row=sources[r.source]||(sources[r.source]={app_opened:0,diagnostic_completed:0,account_linked:0});
    if(r.step in row)row[r.step]+=Number(r.count||0);
  }
  // Regresso no dia seguinte: voltou em [start+1, today] ÷ abriu pela 1.ª vez em [start, today-1].
  // app_opened é enviado uma vez por dispositivo, no primeiro dia → serve de "novos alunos".
  const nextDayNum=sumWhere(funnelRows,r=>r.step==="returned_next_day"&&r.day>addDays(start,0)&&r.day<today);
  const nextDayDen=sumWhere(funnelRows,r=>r.step==="app_opened"&&r.day>=start&&r.day<addDays(today,-1));
  // Semana seguinte: voltou esta semana ÷ novos da semana anterior.
  const weekAfterNum=steps.returned_week_after;
  const weekAfterDen=prevSteps.app_opened;
  const rates={
    diagnosticCompletion:{value:ratio(steps.diagnostic_completed,steps.diagnostic_started),sample:steps.diagnostic_started},
    nextDayReturn:{value:ratio(nextDayNum,nextDayDen),sample:nextDayDen},
    weekAfterReturn:{value:ratio(weekAfterNum,weekAfterDen),sample:weekAfterDen},
    firstMission:{value:ratio(steps.first_session_completed,steps.diagnostic_completed),sample:steps.diagnostic_completed},
    account:{value:ratio(steps.account_linked,steps.diagnostic_completed),sample:steps.diagnostic_completed}
  };
  // Reportes agrupados por pergunta.
  const items=new Map();
  for(const r of reportRows){
    const it=items.get(r.item_id)||{itemId:r.item_id,subjectId:r.subject_id,total:0,categories:{}};
    it.total+=Number(r.reports||0);
    it.categories[r.category]=(it.categories[r.category]||0)+Number(r.reports||0);
    items.set(r.item_id,it);
  }
  const reports=[...items.values()].sort((a,b)=>b.total-a.total||a.itemId.localeCompare(b.itemId));
  // Funil silencioso: houve contagens na semana anterior mas nenhuma nos últimos N dias.
  const silentFrom=addDays(today,-ALARM_RULES.silentFunnel.days);
  const recentCount=sumWhere(funnelRows,r=>r.day>=silentFrom&&r.day<today);
  const earlierCount=sumWhere(funnelRows,r=>r.day>=prevStart&&r.day<silentFrom);
  // Passo com a maior perda (onde desistem), entre passos consecutivos do percurso.
  const path=["app_opened","diagnostic_started","diagnostic_completed","first_session_completed"];
  let biggestDrop=null;
  for(let i=1;i<path.length;i++){
    const from=steps[path[i-1]],to=steps[path[i]];
    if(from>0){const lost=from-to;if(!biggestDrop||lost>biggestDrop.lost)biggestDrop={from:path[i-1],to:path[i],lost,rate:ratio(to,from)}}
  }
  return {today,start,steps,prevSteps,sources,rates,reports,biggestDrop,silent:recentCount===0&&earlierCount>0};
}

export function evaluateAlarms(summary,rules=ALARM_RULES){
  const alarms=[];
  const {rates}=summary;
  if(rates.diagnosticCompletion.sample>=rules.diagnosticCompletion.minSample&&rates.diagnosticCompletion.value<rules.diagnosticCompletion.min)
    alarms.push({id:"diagnostic_completion",text:`Só ${pct(rates.diagnosticCompletion.value)} acabou o diagnóstico (${summary.steps.diagnostic_completed} de ${summary.steps.diagnostic_started}). Limite: 50%.`});
  if(rates.nextDayReturn.sample>=rules.nextDayReturn.minSample&&rates.nextDayReturn.value<rules.nextDayReturn.min)
    alarms.push({id:"next_day_return",text:`Só ${pct(rates.nextDayReturn.value)} voltou no dia seguinte (base: ${rates.nextDayReturn.sample} novos). Limite: 20%.`});
  for(const r of summary.reports.filter(r=>r.total>=rules.repeatedReport.minReports))
    alarms.push({id:`report:${r.itemId}`,text:`A pergunta ${r.itemId} (${SUBJECT_LABELS[r.subjectId]||r.subjectId}) foi reportada ${r.total} vezes esta semana.`});
  if(summary.silent)
    alarms.push({id:"silent_funnel",text:`Nenhuma contagem nos últimos ${rules.silentFunnel.days} dias, depois de ter havido. A recolha pode estar avariada (ou ninguém está a usar a app).`});
  return alarms;
}

const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const delta=(now,prev)=>prev>0?` (${now>=prev?"+":""}${Math.round((now-prev)/prev*100)}% vs semana anterior)`:"";
const fmtDay=day=>{const [y,m,d]=day.split("-");return `${d}/${m}`};

// Texto do email. `kind`: "weekly" (resumo completo) ou "alarm" (só alarmes).
export function renderReport(summary,alarms,{kind="weekly"}={}){
  const period=`${fmtDay(summary.start)} a ${fmtDay(addDays(summary.today,-1))}`;
  const L=[];
  if(alarms.length){
    L.push("⚠️ ALARMES — parar a publicidade e corrigir antes de continuar:");
    for(const a of alarms)L.push(`• ${a.text}`);
    L.push("");
  }else if(kind==="weekly"){
    L.push("✅ Nenhum alarme disparou esta semana.","");
  }
  if(kind==="weekly"){
    L.push(`PERCURSO (${period})`);
    for(const step of STEP_ORDER)L.push(`• ${STEP_LABELS[step]}: ${summary.steps[step]}${delta(summary.steps[step],summary.prevSteps[step])}`);
    L.push("");
    L.push("TAXAS (aproximadas, contagens anónimas)");
    const r=summary.rates;
    L.push(`• Acabam o diagnóstico: ${pct(r.diagnosticCompletion.value)} (alarme abaixo de 50%)`);
    L.push(`• Fazem a primeira missão depois do diagnóstico: ${pct(r.firstMission.value)}`);
    L.push(`• Criam conta depois do diagnóstico: ${pct(r.account.value)}`);
    L.push(`• Voltam no dia seguinte: ${pct(r.nextDayReturn.value)} (alarme abaixo de 20%)`);
    L.push(`• Voltam na semana seguinte: ${pct(r.weekAfterReturn.value)}`);
    if(Math.max(r.diagnosticCompletion.sample,r.nextDayReturn.sample)<30)L.push("  Nota: menos de 30 alunos — os alarmes de percentagem ainda não disparam; isto é ruído, não tendência.");
    if(summary.biggestDrop&&summary.biggestDrop.lost>0)
      L.push(`• Onde mais desistem: entre «${STEP_LABELS[summary.biggestDrop.from]}» e «${STEP_LABELS[summary.biggestDrop.to]}» (perdem-se ${summary.biggestDrop.lost}).`);
    L.push("");
    L.push("DE ONDE VÊM (abriram a app → acabaram o diagnóstico → criaram conta)");
    const srcs=Object.entries(summary.sources).sort((a,b)=>b[1].app_opened-a[1].app_opened);
    if(!srcs.length)L.push("• Sem dados.");
    for(const [src,row] of srcs)L.push(`• ${src}: ${row.app_opened} → ${row.diagnostic_completed} → ${row.account_linked}`);
    L.push("");
    L.push("PERGUNTAS REPORTADAS");
    if(!summary.reports.length)L.push("• Nenhuma.");
    for(const it of summary.reports.slice(0,25)){
      const cats=Object.entries(it.categories).map(([c,n])=>`${CATEGORY_LABELS[c]||c} ×${n}`).join(", ");
      L.push(`• ${it.itemId} (${SUBJECT_LABELS[it.subjectId]||it.subjectId}): ${it.total} — ${cats}`);
    }
    if(summary.reports.length>25)L.push(`• … e mais ${summary.reports.length-25}.`);
    if(summary.reports.length){
      L.push("","Para corrigir, cola isto numa conversa com o Claude:");
      L.push(`«Revê e corrige as perguntas reportadas: ${summary.reports.slice(0,25).map(r=>r.itemId).join(", ")}»`);
    }
  }
  const text=L.join("\n");
  const subject=alarms.length
    ?`⚠️ APProva+: ${alarms.length} alarme${alarms.length===1?"":"s"} (${period})`
    :`APProva+: resumo semanal (${period})`;
  const html=`<!doctype html><html lang="pt-PT"><body style="font-family:Arial,Helvetica,sans-serif;color:#08132e;line-height:1.5"><pre style="font-family:inherit;white-space:pre-wrap;font-size:15px">${escapeHtml(text)}</pre></body></html>`;
  return {subject,text,html};
}
