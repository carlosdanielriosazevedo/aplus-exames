import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {readVerifiedRewardTotals} from "../../../lib/server/verified-rewards";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};

export async function GET(){
  let authenticated;
  try{authenticated=await requireSession();}
  catch(error){
    const failure=authErrorResponse(error);
    return NextResponse.json(failure.body,{status:failure.status,headers});
  }
  if(!databaseConfigured())return NextResponse.json(
    {ok:false,code:"DATABASE_NOT_CONFIGURED"},{status:503,headers});

  try{
    // This endpoint cannot mint receipts. XP in student_cloud_state.state_json
    // is client-reported and must NEVER be substituted for verified XP.
    const totals=await readVerifiedRewardTotals(getSql(),authenticated.authUserId);
    return NextResponse.json({
      ok:true,authority:"server-verified-receipts",...totals
    },{headers});
  }catch{
    return NextResponse.json(
      {ok:false,code:"VERIFIED_REWARDS_UNAVAILABLE"},{status:503,headers});
  }
}
