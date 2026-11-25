// Área do encarregado de educação — modelo de dados (decisões do product owner,
// 2026-11-22/23). Funções puras: o protótipo usa dados de exemplo; a versão real
// recebe os mesmos campos do servidor.
//
// O encarregado vê: dias e tempo de estudo, missões feitas, sequência de dias,
// diagnóstico feito ou não, a evolução do índice de preparação e a tendência em
// palavras. Nunca vê: respostas individuais, notas, comparações com outros alunos
// ou rankings. A ligação só termina com o acordo dos dois.

const WEEKDAYS=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const DAY_MS=24*60*60*1000;

export function dayKey(at){
  const d=new Date(at);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function dayRow(days,at){
  const row=days?.[dayKey(at)];
  const missions=Number(row?.activities?.mission)||0;
  const sessions=Object.values(row?.activities||{}).reduce((sum,value)=>sum+(Number(value)||0),0);
  return {active:sessions>0,minutes:Math.max(0,Math.round(Number(row?.minutes)||0)),missions};
}

// Semana = últimos 7 dias (hoje incluído), mais os 7 anteriores para comparar.
export function guardianWeek(days={},{now=Date.now()}={}){
  const base=new Date(now);base.setHours(12,0,0,0);
  const week=[];
  for(let offset=6;offset>=0;offset--){
    const at=base.getTime()-offset*DAY_MS;
    week.push({key:dayKey(at),weekday:WEEKDAYS[new Date(at).getDay()],today:offset===0,...dayRow(days,at)});
  }
  let previousActiveDays=0;
  for(let offset=13;offset>=7;offset--)if(dayRow(days,base.getTime()-offset*DAY_MS).active)previousActiveDays++;
  // Sequência: dias seguidos com estudo, a terminar hoje (ou ontem, se hoje ainda não estudou).
  let streak=0;
  let cursor=dayRow(days,base.getTime()).active?0:1;
  while(dayRow(days,base.getTime()-cursor*DAY_MS).active){streak++;cursor++}
  const activeDays=week.filter(day=>day.active).length;
  return {
    days:week,activeDays,previousActiveDays,deltaActiveDays:activeDays-previousActiveDays,
    minutes:week.reduce((sum,day)=>sum+day.minutes,0),
    missions:week.reduce((sum,day)=>sum+day.missions,0),
    streak
  };
}

export function formatMinutes(total){
  const minutes=Math.max(0,Math.round(Number(total)||0));
  if(minutes<60)return `${minutes} min`;
  const hours=Math.floor(minutes/60),rest=minutes%60;
  return rest?`${hours} h ${rest} min`:`${hours} h`;
}

// Tendência do índice em palavras, a partir da série semanal (mais antiga → mais recente).
export function indexTrend(series=[]){
  const values=series.map(point=>point?.value).filter(value=>Number.isFinite(value));
  if(values.length<2)return {key:"new",words:"ainda sem tendência",symbol:"·",delta:null};
  const last=values[values.length-1];
  const reference=values[Math.max(0,values.length-3)];
  const delta=last-reference;
  if(delta>=3)return {key:"up",words:"a subir",symbol:"↑",delta};
  if(delta<=-3)return {key:"attention",words:"precisa de atenção",symbol:"!",delta};
  return {key:"steady",words:"estável",symbol:"→",delta};
}

export function guardianSubject(subject){
  const series=(subject?.series||[]).filter(point=>Number.isFinite(point?.value));
  return {
    id:subject.id,name:subject.name,
    diagnosticDone:!!subject.diagnosticDone,diagnosticAt:subject.diagnosticAt||null,
    index:series.length?series[series.length-1].value:null,
    series,trend:indexTrend(series)
  };
}

// No máximo duas sugestões concretas, das mais úteis para as menos.
export function guardianTips(child,week,subjects){
  const tips=[];
  const name=child?.firstName||"O seu educando";
  const missing=subjects.find(subject=>!subject.diagnosticDone);
  if(missing)tips.push(`Ainda falta o diagnóstico de ${missing.name}: são cerca de 10 minutos e ajudam a app a escolher o que estudar primeiro.`);
  const attention=subjects.find(subject=>subject.trend.key==="attention");
  if(attention)tips.push(`${attention.name} precisa de atenção. A Missão diária já dá prioridade a esses temas; vale a pena perguntar o que está a ser mais difícil.`);
  if(week.activeDays<3)tips.push(`Esta semana foram ${week.activeDays} ${week.activeDays===1?"dia":"dias"} de estudo. Combinar uma hora fixa ajuda — 10 minutos por dia já contam.`);
  if(week.streak>=5)tips.push(`${week.streak} dias seguidos de estudo: vale a pena reconhecer o esforço.`);
  if(!tips.length)tips.push(`Boa semana. Manter o ritmo de ${week.activeDays} dias por semana é o que mais faz subir o índice.`);
  return tips.slice(0,2);
}

export function guardianChildModel(child,{now=Date.now()}={}){
  const week=guardianWeek(child?.days||{},{now});
  const subjects=(child?.subjects||[]).map(guardianSubject);
  return {
    id:child.id,firstName:child.firstName,schoolYear:child.schoolYear||null,
    linkedSince:child.linkedSince||null,week,subjects,tips:guardianTips(child,week,subjects)
  };
}

// ---------- Email semanal ----------

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
}

export function weeklyEmailModel(model){
  const days=model.week.activeDays;
  const subject=`${model.firstName}: ${days} ${days===1?"dia":"dias"} de estudo esta semana`;
  const delta=model.week.deltaActiveDays;
  const comparison=delta>0?`mais ${delta} ${delta===1?"dia":"dias"} do que na semana anterior`:delta<0?`menos ${-delta} ${delta===-1?"dia":"dias"} do que na semana anterior`:"o mesmo que na semana anterior";
  return {subject,preheader:`${formatMinutes(model.week.minutes)} de estudo, ${model.week.missions} missões. ${comparison[0].toUpperCase()+comparison.slice(1)}.`,comparison};
}

export function weeklyEmailHtml(model,{baseUrl="https://approvamais.pt"}={}){
  const email=weeklyEmailModel(model);
  const dot=day=>`<td align="center" style="padding:0 2px"><div style="width:36px;height:36px;line-height:36px;border-radius:18px;font:700 11px Arial,sans-serif;${day.active?"background:#d97706;color:#ffffff":"background:#eef2f5;color:#667789"}">${escapeHtml(day.weekday)}</div></td>`;
  const subjectRow=subject=>`<tr><td style="padding:12px 0;border-top:1px solid #e3e9ed;font:15px Arial,sans-serif;color:#102b42">
      <b>${escapeHtml(subject.name)}</b><br/>
      <span style="color:#4d566b">${subject.diagnosticDone
        ?`Índice de preparação: <b style="color:#102b42">${subject.index??"—"}</b> · ${escapeHtml(subject.trend.symbol)} ${escapeHtml(subject.trend.words)}`
        :"Diagnóstico por fazer"}</span></td></tr>`;
  return `<!doctype html><html lang="pt-PT"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(email.subject)}</title></head>
<body style="margin:0;background:#f5f7f8">
<span style="display:none;max-height:0;overflow:hidden">${escapeHtml(email.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7f8"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px">
<tr><td style="padding:24px 24px 8px"><img src="${baseUrl}/brand/approva-logo-email.png" width="150" alt="APProva+" style="display:block;border:0"/></td></tr>
<tr><td style="padding:8px 24px 0;font:700 13px Arial,sans-serif;letter-spacing:.06em;color:#a85d00">RESUMO SEMANAL</td></tr>
<tr><td style="padding:6px 24px 0;font:700 24px Arial,sans-serif;color:#102b42">${escapeHtml(model.firstName)} estudou ${model.week.activeDays} ${model.week.activeDays===1?"dia":"dias"} esta semana</td></tr>
<tr><td style="padding:6px 24px 14px;font:15px Arial,sans-serif;color:#4d566b">${escapeHtml(email.comparison[0].toUpperCase()+email.comparison.slice(1))}.</td></tr>
<tr><td style="padding:0 21px 16px"><table role="presentation" cellpadding="0" cellspacing="0"><tr>${model.week.days.map(dot).join("")}</tr></table></td></tr>
<tr><td style="padding:0 24px 8px;font:15px Arial,sans-serif;color:#102b42">⏱ <b>${escapeHtml(formatMinutes(model.week.minutes))}</b> de estudo · 🎯 <b>${model.week.missions}</b> ${model.week.missions===1?"missão":"missões"} · 🔥 <b>${model.week.streak}</b> ${model.week.streak===1?"dia":"dias"} seguidos</td></tr>
<tr><td style="padding:8px 24px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${model.subjects.map(subjectRow).join("")}</table></td></tr>
<tr><td style="padding:4px 24px 0;font:12px Arial,sans-serif;color:#667789">O índice (0–100) resume o trabalho feito na app. Não é uma previsão da nota do exame.</td></tr>
${model.tips.length?`<tr><td style="padding:18px 24px 0"><div style="background:#fff4df;border-radius:14px;padding:14px 16px;font:15px Arial,sans-serif;color:#102b42"><b>Como pode ajudar</b>${model.tips.map(tip=>`<p style="margin:8px 0 0;color:#4d566b">${escapeHtml(tip)}</p>`).join("")}</div></td></tr>`:""}
<tr><td align="center" style="padding:22px 24px 26px"><a href="${baseUrl}/encarregado" style="display:inline-block;background:#102b42;color:#ffffff;text-decoration:none;font:700 16px Arial,sans-serif;padding:14px 26px;border-radius:14px">Ver mais na APProva+</a></td></tr>
</table>
<p style="max-width:560px;font:12px Arial,sans-serif;color:#667789;margin:14px auto 0">Recebe este email porque acompanha o estudo de ${escapeHtml(model.firstName)} na APProva+. Pode deixar de receber os resumos semanais na sua conta. Nunca mostramos respostas, notas ou comparações com outros alunos.</p>
</td></tr></table></body></html>`;
}

// Mascarar o email no ecrã do aluno (ex.: m•••@gmail.com).
export function maskEmail(email){
  const [user,domain]=String(email||"").split("@");
  if(!user||!domain)return "";
  return `${user[0]}•••@${domain}`;
}
