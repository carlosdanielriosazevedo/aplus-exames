import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../lib/server/identity";
import {sameOriginRequest} from "../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../lib/server/db";
import {validateContentReport,reportRateAllowed,insertContentReport} from "../../lib/server/content-reports";

// Reporte de um problema numa pergunta. Exige sessão (anti-abuso), mas não
// guarda nenhum dado pessoal: só pergunta, disciplina, categoria e data.
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const MAX_BYTES=2_000;

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return json({ok:false,code:csrf.code},403);
  let session;
  try{session=await requireSession()}
  catch(error){const failure=authErrorResponse(error);return json(failure.body,failure.status)}
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);
  let raw;
  try{raw=await request.text()}catch{return json({ok:false,code:"INVALID_BODY"},400)}
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);
  let parsed;
  try{parsed=JSON.parse(raw)}catch{return json({ok:false,code:"INVALID_JSON"},400)}
  const valid=validateContentReport(parsed);
  if(!valid.ok)return json({ok:false,code:valid.code},400);
  if(!reportRateAllowed(session.authUserId))return json({ok:false,code:"RATE_LIMITED"},429);
  try{
    await insertContentReport(getSql(),valid,String(process.env.VERCEL_GIT_COMMIT_SHA||"").slice(0,12)||null);
    return json({ok:true},201);
  }catch{
    return json({ok:false,code:"REPORT_WRITE_FAILED"},503);
  }
}
