// Funil anónimo: cada dispositivo conta cada passo UMA vez, e o servidor só soma
// contagens por dia. Não há identificador de aluno, de conta ou de dispositivo.
export const FUNNEL_SERVER_STEPS=Object.freeze([
  "app_opened",
  "subjects_selected",
  "diagnostic_completed",
  "first_session_completed",
  "returned_next_day",
  "account_linked"
]);
export const FUNNEL_SENT_KEY="approva-funnel-sent-v1";

function nextDay(day){
  const d=new Date(`${day}T12:00:00`);
  if(Number.isNaN(d.getTime()))return null;
  d.setDate(d.getDate()+1);
  return d.toISOString().slice(0,10);
}

export function funnelStepsReached(s){
  if(!s)return [];
  const progress=Object.values(s.subjectProgress||{});
  const analytics=s.productAnalytics||{};
  const reached=[];
  if(analytics.milestones?.app_opened||analytics.appOpenCount>0)reached.push("app_opened");
  if((s.selectedSubjectIds||[]).length>0)reached.push("subjects_selected");
  if(s.diagnosticDone||progress.some(row=>row?.diagnosticDone))reached.push("diagnostic_completed");
  if((s.missionHistory||[]).length>0||progress.some(row=>(row?.sessions||[]).some(x=>x?.kind!=="diagnostic")))reached.push("first_session_completed");
  const first=analytics.firstSeenDay,days=analytics.activeDays||[];
  if(first&&days.includes(nextDay(first)))reached.push("returned_next_day");
  if(s.identity?.mode==="authenticated")reached.push("account_linked");
  return reached;
}

export function pendingFunnelSteps(s,sent=[]){
  const done=new Set(sent);
  return funnelStepsReached(s).filter(step=>!done.has(step));
}
