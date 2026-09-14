import {NextResponse} from "next/server";
import {authErrorResponse,requireCapability} from "../../../lib/server/identity";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(){
  try{
    const identity=await requireCapability("review_content");
    return NextResponse.json({ok:true,allowed:true,roles:identity.roles||[]},{headers:{"Cache-Control":"no-store"}});
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json({...failure.body,allowed:false},{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }
}
