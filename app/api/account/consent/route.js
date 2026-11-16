import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {validateConsent,insertConsent} from "../../../lib/server/account-consent";

// Prova de consentimento do registo (idade ≥ 13, termos, privacidade).
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const MAX_BYTES=1_000;

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
  const valid=validateConsent(parsed,session.user?.email);
  // Outro email neste dispositivo: o pedido fica pendente para a conta certa.
  if(!valid.ok)return json({ok:false,code:valid.code},valid.code==="CONSENT_ACCOUNT_MISMATCH"?409:400);
  try{
    await insertConsent(getSql(),session.authUserId,valid);
    return json({ok:true},201);
  }catch{
    return json({ok:false,code:"CONSENT_WRITE_FAILED"},503);
  }
}
