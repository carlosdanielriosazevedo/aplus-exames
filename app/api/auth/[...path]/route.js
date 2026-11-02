import {NextResponse} from "next/server";
import {getServerAuth} from "../../../lib/server/auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function unavailable(){
  // Do not write the provider exception to logs: it may contain auth secrets.
  console.error("Neon Auth handler unavailable");
  // A thrown provider error has no trusted public error code or HTTP status.
  return NextResponse.json({ok:false,error:"AUTH_HANDLER_UNAVAILABLE"},{status:503});
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
