import {NextResponse} from "next/server";
import {getServerAuth} from "../../../lib/server/auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function unavailable(error){
  // Do not write the provider exception to logs: it may contain auth secrets.
  console.error("Neon Auth handler unavailable");
  // Preserve only the known configuration code; never reflect provider errors.
  const code=error?.code==="AUTH_SERVER_NOT_CONFIGURED"
    ?"AUTH_SERVER_NOT_CONFIGURED":"AUTH_HANDLER_UNAVAILABLE";
  return NextResponse.json({ok:false,error:code},{status:503});
}

export async function GET(request,context){
  try{
    const handlers=getServerAuth().handler();
    return handlers.GET(request,context);
  }catch(error){
    return unavailable(error);
  }
}

export async function POST(request,context){
  try{
    const handlers=getServerAuth().handler();
    return handlers.POST(request,context);
  }catch(error){
    return unavailable(error);
  }
}
