// Funil anónimo: cada dispositivo conta cada passo UMA vez, e o servidor só soma
// contagens por dia. Não há identificador de aluno, de conta ou de dispositivo.
export const FUNNEL_SERVER_STEPS=Object.freeze([
  "app_opened",
  "subjects_selected",
  "diagnostic_started",
  "diagnostic_completed",
  "first_session_completed",
  "returned_next_day",
  "returned_week_after",
  "account_linked"
]);

// Origem do aluno (primeiro contacto), só como categoria fechada. Nunca guarda
// o endereço, a campanha nem identificadores: apenas um destes rótulos.
export const FUNNEL_SOURCES=Object.freeze(["direto","instagram","tiktok","whatsapp","youtube","facebook","google","escola","outro"]);
export const FUNNEL_SOURCE_KEY="approva-funnel-source-v1";
const SOURCE_ALIASES={ig:"instagram",insta:"instagram",tt:"tiktok",wa:"whatsapp",yt:"youtube",fb:"facebook",professor:"escola",prof:"escola",school:"escola"};
export function normalizeFunnelSource(raw){
  const v=String(raw||"").trim().toLowerCase().slice(0,40);
  if(!v)return "direto";
  const key=SOURCE_ALIASES[v]||v;
  if(FUNNEL_SOURCES.includes(key))return key;
  for(const name of ["instagram","tiktok","whatsapp","youtube","facebook","google"])if(key.includes(name))return name;
  return "outro";
}
// Lê ?utm_source= (ou ?origem=) do endereço de entrada. Sem parâmetro → null.
export function sourceFromUrl(href){
  try{
    const url=new URL(String(href||""));
    const raw=url.searchParams.get("utm_source")||url.searchParams.get("origem");
    return raw?normalizeFunnelSource(raw):null;
  }catch{return null}
}
export const FUNNEL_SENT_KEY="approva-funnel-sent-v1";

function nextDay(day){
  const d=new Date(`${day}T12:00:00`);
  if(Number.isNaN(d.getTime()))return null;
  d.setDate(d.getDate()+1);
  return d.toISOString().slice(0,10);
}

function daysBetween(a,b){
  const x=Date.parse(`${a}T12:00:00Z`),y=Date.parse(`${b}T12:00:00Z`);
  return Number.isFinite(x)&&Number.isFinite(y)?Math.round((y-x)/86400000):NaN;
}

export function funnelStepsReached(s){
  if(!s)return [];
  const progress=Object.values(s.subjectProgress||{});
  const analytics=s.productAnalytics||{};
  const reached=[];
  if(analytics.milestones?.app_opened||analytics.appOpenCount>0)reached.push("app_opened");
  if((s.selectedSubjectIds||[]).length>0)reached.push("subjects_selected");
  const diagnosticDone=Boolean(s.diagnosticDone||progress.some(row=>row?.diagnosticDone));
  if(diagnosticDone||analytics.milestones?.diagnostic_started)reached.push("diagnostic_started");
  if(diagnosticDone)reached.push("diagnostic_completed");
  if((s.missionHistory||[]).length>0||progress.some(row=>(row?.sessions||[]).some(x=>x?.kind!=="diagnostic")))reached.push("first_session_completed");
  const first=analytics.firstSeenDay,days=analytics.activeDays||[];
  if(first&&days.includes(nextDay(first)))reached.push("returned_next_day");
  // Voltou na semana seguinte: algum dia ativo entre o 7.º e o 13.º dia depois do primeiro.
  if(first&&days.some(day=>{const d=daysBetween(first,day);return d>=7&&d<=13}))reached.push("returned_week_after");
  if(s.identity?.mode==="authenticated")reached.push("account_linked");
  return reached;
}

export function pendingFunnelSteps(s,sent=[]){
  const done=new Set(sent);
  return funnelStepsReached(s).filter(step=>!done.has(step));
}
