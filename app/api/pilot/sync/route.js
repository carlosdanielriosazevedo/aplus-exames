import {NextResponse} from "next/server";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";
import {ingestPilotEnvelope,validatePilotEnvelope} from "../../../lib/server/pilot-ingest";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const MAX_BYTES=250_000;

export async function POST(request){
  let authenticated;
  try{
    authenticated=await requireSession();
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }

  const raw=await request.text();
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES){
    return NextResponse.json({ok:false,code:"PAYLOAD_TOO_LARGE"},{status:413});
  }

  let payload;
  try{payload=JSON.parse(raw)}catch{
    return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400});
  }
  const valid=validatePilotEnvelope(payload);
  if(!valid.ok)return NextResponse.json(valid,{status:400});

  try{
    const result=await ingestPilotEnvelope({authUserId:authenticated.authUserId,payload});
    const status=result.ok?200:result.code==="CONSENT_REQUIRED"?403:result.code==="APP_USER_REQUIRED"?409:503;
    return NextResponse.json(result,{status,headers:{"Cache-Control":"no-store"}});
  }catch(error){
    console.error("APProva+ pilot sync failed",error);
    return NextResponse.json({ok:false,code:"DATABASE_WRITE_FAILED"},{status:500,headers:{"Cache-Control":"no-store"}});
  }
}
