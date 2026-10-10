import {NextResponse} from "next/server";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";
import {deleteOwnPilotData} from "../../../lib/server/pilot-data";
import {sameOriginRequest} from "../../../lib/server/csrf";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function DELETE(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers:{"Cache-Control":"no-store"}});

  let authenticated;
  try{
    authenticated=await requireSession();
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }

  try{
    const result=await deleteOwnPilotData(authenticated.authUserId);
    return NextResponse.json(result,{status:result.ok?200:503,headers:{"Cache-Control":"no-store"}});
  }catch(error){
    console.error("APProva+ pilot data erasure failed",error);
    return NextResponse.json({ok:false,code:"DATABASE_DELETE_FAILED"},{status:500,headers:{"Cache-Control":"no-store"}});
  }
}
