import {NextResponse} from "next/server";
import {ingestBetaEnvelope,validateSyncEnvelope} from "../../../lib/server/beta-ingest";
import {databaseConfigured} from "../../../lib/server/db";

export const runtime="nodejs";
const MAX_BYTES=1_500_000;

export async function POST(request){
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

  try{
    const result=await ingestBetaEnvelope(payload,raw);
    return NextResponse.json(result,{status:result.ok?200:400});
  }catch(error){
    console.error("A+ beta sync failed",error);
    return NextResponse.json({
      ok:false,
      code:"DATABASE_WRITE_FAILED",
      message:"A sincronização falhou. Os dados permanecem guardados localmente."
    },{status:500});
  }
}
