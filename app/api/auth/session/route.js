import {NextResponse} from "next/server";
import {authErrorResponse,ensureAppIdentity,requireSession} from "../../../lib/server/identity";

export const runtime="nodejs";
export const dynamic="force-dynamic";

export async function GET(){
  try{
    const session=await requireSession();
    const identity=await ensureAppIdentity(session);
    return NextResponse.json({
      ok:true,
      user:{id:session.authUserId,email:session.user?.email||null,name:session.user?.name||null},
      appUserId:identity.appUser?.id||null,
      roles:identity.roles
    },{headers:{"Cache-Control":"no-store"}});
  }catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}});
  }
}
