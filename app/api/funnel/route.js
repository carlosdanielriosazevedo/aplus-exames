import {NextResponse} from "next/server";
import {sameOriginRequest} from "../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../lib/server/db";
import {validateFunnelStep,funnelRateAllowed,incrementFunnel} from "../../lib/server/funnel";

// Contagem anónima de passos do percurso (sem conta, sem identificadores).
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
// Contagem "fire-and-forget": quando não é possível registar (origem, base de
// dados indisponível), responde 202 com recorded:false em vez de um erro, para
// não encher a consola dos alunos; a app volta a tentar mais tarde.
const notRecorded=code=>json({ok:false,recorded:false,code},202);

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return notRecorded(csrf.code);
  if(!databaseConfigured())return notRecorded("DATABASE_NOT_CONFIGURED");
  let raw;
  try{raw=await request.text()}catch{return json({ok:false,code:"INVALID_BODY"},400)}
  if(raw.length>200)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);
  let parsed;
  try{parsed=JSON.parse(raw)}catch{return json({ok:false,code:"INVALID_JSON"},400)}
  const valid=validateFunnelStep(parsed);
  if(!valid.ok)return json({ok:false,code:valid.code},400);
  const ip=(request.headers.get("x-forwarded-for")||"").split(",")[0].trim();
  if(!funnelRateAllowed(ip))return json({ok:false,code:"RATE_LIMITED"},429);
  try{await incrementFunnel(getSql(),valid.step);return json({ok:true,recorded:true},201)}
  catch{return notRecorded("FUNNEL_WRITE_FAILED")}
}
