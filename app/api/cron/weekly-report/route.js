import {NextResponse} from "next/server";
import crypto from "node:crypto";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {loadWeeklyData,summarize,evaluateAlarms,renderReport,lisbonDay,lisbonWeekday} from "../../../lib/server/weekly-report";
import {authEmailConfigured} from "../../../lib/server/auth-email";

// Corre todos os dias (Vercel Cron). À segunda-feira envia o resumo semanal
// completo; nos outros dias só envia email se algum alarme disparar.
// Protegido por CRON_SECRET (a Vercel envia "Authorization: Bearer <segredo>").
// ?modo=resumo força o resumo completo (para testar).
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const DEFAULT_FROM="APProva+ <relatorios@approvamais.pt>";

function authorized(request,env){
  const secret=env.CRON_SECRET;
  if(!secret)return false;
  const got=Buffer.from(request.headers.get("authorization")||"");
  const want=Buffer.from(`Bearer ${secret}`);
  return got.length===want.length&&crypto.timingSafeEqual(got,want);
}

export async function GET(request,{env=process.env,fetchImpl=fetch,now=new Date()}={}){
  if(!authorized(request,env))return json({ok:false,code:"UNAUTHORIZED"},401);
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);
  const to=String(env.REPORT_EMAIL_TO||"").trim();
  if(!to||!authEmailConfigured(env))return json({ok:false,code:"REPORT_EMAIL_NOT_CONFIGURED"},503);
  const forced=new URL(request.url).searchParams.get("modo")==="resumo";
  const kind=forced||lisbonWeekday(now)==="Mon"?"weekly":"alarm";
  let summary,alarms;
  try{
    summary=summarize(await loadWeeklyData(getSql(),lisbonDay(now)));
    alarms=evaluateAlarms(summary);
  }catch{
    return json({ok:false,code:"REPORT_QUERY_FAILED"},503);
  }
  if(kind==="alarm"&&!alarms.length)return json({ok:true,sent:false,kind,alarms:0});
  const email=renderReport(summary,alarms,{kind});
  const res=await fetchImpl("https://api.resend.com/emails",{
    method:"POST",
    headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,"Content-Type":"application/json"},
    body:JSON.stringify({from:env.REPORT_EMAIL_FROM||DEFAULT_FROM,to:to.split(",").map(s=>s.trim()).filter(Boolean),...email})
  }).catch(()=>null);
  if(!res?.ok)return json({ok:false,code:"REPORT_SEND_FAILED"},502);
  return json({ok:true,sent:true,kind,alarms:alarms.length});
}
