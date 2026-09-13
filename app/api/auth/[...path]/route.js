import {NextResponse} from "next/server";
import {getServerAuth} from "../../../lib/server/auth";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function unavailable(error){
  console.error("Neon Auth handler unavailable",error);
  return NextResponse.json({ok:false,error:error?.code||"AUTH_SERVER_NOT_CONFIGURED"},{status:Number(error?.status)||503});
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
