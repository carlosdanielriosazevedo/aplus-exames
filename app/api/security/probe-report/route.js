import {NextResponse} from "next/server";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";

export const runtime="nodejs";
export const dynamic="force-dynamic";

function safeError(value){
  if(!value || typeof value!=="object")return null;
  return {
    message:value.message||null,
    code:value.code||null,
    details:value.details||null,
    hint:value.hint||null
  };
}

export async function POST(request){
  try{
    const session=await requireSession();
    const body=await request.json().catch(()=>({}));
    const report={
      actor:session.user?.email||session.authUserId,
      actorAuthUserId:session.authUserId,
      targetAuthUserId:body?.targetAuthUserId||null,
      targetAppUserId:body?.targetAppUserId||null,
      selfVisible:Boolean(body?.selfVisible),
      targetVisible:Boolean(body?.targetVisible),
      visibleRoleCount:Number(body?.visibleRoleCount)||0,
      targetProfileVisible:Boolean(body?.targetProfileVisible),
      targetProfileWriteAllowed:Boolean(body?.targetProfileWriteAllowed),
      targetProfileWriteDenied:Boolean(body?.targetProfileWriteDenied),
      reviewerAllowed:Boolean(body?.reviewerAllowed),
      reviewerStatus:Number(body?.reviewerStatus)||0,
      authSessionStatus:Number(body?.authSessionStatus)||0,
      jwtPresent:Boolean(body?.jwtPresent),
      jwtSub:body?.jwtSub?String(body.jwtSub):null,
      jwtRole:body?.jwtRole?String(body.jwtRole):null,
      selfQueryError:safeError(body?.selfQueryError),
      targetQueryError:safeError(body?.targetQueryError),
      rolesQueryError:safeError(body?.rolesQueryError),
      targetProfileQueryError:safeError(body?.targetProfileQueryError),
      targetProfileWriteError:safeError(body?.targetProfileWriteError),
      at:new Date().toISOString()
    };
    console.log("SECURITY_AB_PROBE",JSON.stringify(report));
    return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }
}
