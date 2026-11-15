import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {readCloudRow,writeCloudRow} from "../../../lib/server/cloud-state-store";
import {validateCloudWrite,MAX_CLOUD_POST_BYTES} from "../../../lib/server/cloud-state-validation";
import {validateCloudSnapshot} from "../../../lib/cloudSnapshotValidation.js";

// Única via de leitura/escrita do progresso na cloud. O browser deixa de usar a
// Neon Data API: o dono da linha é derivado da sessão verificada no servidor e
// a revisão é comparada e incrementada numa única instrução SQL (CAS).
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const json=(body,status=200)=>NextResponse.json(body,{status,headers});
const readable=row=>!row||validateCloudSnapshot(row.state_json,{legacy:true,privateFields:false}).ok;
const quarantined=row=>json({ok:false,code:"CLOUD_SNAPSHOT_RECOVERY_REQUIRED",revision:row?.revision??null},409);

async function authenticated(){
  try{return {ok:true,value:await requireSession()};}
  catch(error){
    const failure=authErrorResponse(error);
    return {ok:false,response:json(failure.body,failure.status)};
  }
}

export async function GET(){
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);
  try{
    const data=await readCloudRow(getSql(),auth.value.authUserId);
    // Um snapshot malformado nunca é entregue aos consumidores automáticos nem
    // apagado; fica intacto na base de dados para revisão.
    if(!readable(data))return quarantined(data);
    return json({ok:true,authority:"client-reported",data});
  }catch{
    return json({ok:false,code:"CLOUD_READ_FAILED"},503);
  }
}

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return json({ok:false,code:csrf.code},403);
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  if(!databaseConfigured())return json({ok:false,code:"DATABASE_NOT_CONFIGURED"},503);

  const length=Number(request.headers.get("content-length"));
  if(Number.isFinite(length)&&length>MAX_CLOUD_POST_BYTES)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);
  let raw;
  try{raw=await request.text();}
  catch{return json({ok:false,code:"INVALID_BODY"},400);}
  if(Buffer.byteLength(raw,"utf8")>MAX_CLOUD_POST_BYTES)return json({ok:false,code:"PAYLOAD_TOO_LARGE"},413);

  let parsed;
  try{parsed=JSON.parse(raw);}
  catch{return json({ok:false,code:"INVALID_JSON"},400);}
  const valid=validateCloudWrite(parsed);
  if(!valid.ok)return json({ok:false,code:valid.code},400);

  try{
    const sql=getSql();
    const current=await readCloudRow(sql,auth.value.authUserId);
    if(!readable(current))return quarantined(current);
    const result=await writeCloudRow(sql,auth.value.authUserId,valid);
    if(result.conflict&&!readable(result.remote))return quarantined(result.remote);
    return json({...result,authority:"client-reported"},result.conflict?409:200);
  }catch{
    // Sem mensagens SQL, credenciais ou dados pessoais na resposta.
    return json({ok:false,code:"CLOUD_WRITE_FAILED"},503);
  }
}
