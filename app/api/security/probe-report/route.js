import {NextResponse} from "next/server";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function POST(request){
  try{
    const session=await requireSession();
    const body=await request.json().catch(()=>({}));
    const report={
      actor:session.user?.email||session.authUserId,
      actorAuthUserId:session.authUserId,
      targetAuthUserId:body?.targetAuthUserId||null,
      selfVisible:Boolean(body?.selfVisible),
      targetVisible:Boolean(body?.targetVisible),
      visibleRoleCount:Number(body?.visibleRoleCount)||0,
      targetProfileVisible:Boolean(body?.targetProfileVisible),
      reviewerAllowed:Boolean(body?.reviewerAllowed),
      reviewerStatus:Number(body?.reviewerStatus)||0,
      at:new Date().toISOString()
    };
    console.log("SECURITY_AB_PROBE",JSON.stringify(report));
    return NextResponse.json({ok:true},{headers:{"Cache-Control":"no-store"}});
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }
}
