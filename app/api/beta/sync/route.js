import {NextResponse} from "next/server";
import {ingestBetaEnvelope,validateSyncEnvelope} from "../../../lib/server/beta-ingest";
import {databaseConfigured} from "../../../lib/server/db";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const MAX_BYTES=1_500_000;

export async function POST(request){
  let authenticated;
  try{
    authenticated=await requireSession();
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }

  if(!databaseConfigured()){
    return NextResponse.json({
      ok:false,
      code:"DATABASE_NOT_CONFIGURED",
      message:"A app continua local-first. Liga uma base Neon ao projeto Vercel para ativar a sincronização central."
    },{status:503});
  }

  const raw=await request.text();
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES){
    return NextResponse.json({ok:false,code:"PAYLOAD_TOO_LARGE"},{status:413});
  }

  let payload;
  try{payload=JSON.parse(raw)}catch{
    return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400});
  }

  const valid=validateSyncEnvelope(payload);
  if(!valid.ok)return NextResponse.json(valid,{status:400});

  // Nunca confiar no código de participante enviado pelo browser como fronteira de identidade.
  // A chave persistida é derivada exclusivamente da sessão validada pelo Neon Auth.
  const authenticatedPayload={
    ...payload,
    participant:{
      ...(payload.participant||{}),
      code:`auth:${authenticated.authUserId}`
    }
  };

  try{
    const result=await ingestBetaEnvelope(authenticatedPayload,raw);
    return NextResponse.json({...result,authBound:true},{status:result.ok?200:400});
  }catch(error){
    console.error("A+ beta sync failed",error);
    return NextResponse.json({
      ok:false,
      code:"DATABASE_WRITE_FAILED",
      message:"A sincronização falhou. Os dados permanecem guardados localmente."
    },{status:500});
  }
}
