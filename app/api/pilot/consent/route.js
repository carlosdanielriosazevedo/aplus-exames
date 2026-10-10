import {NextResponse} from "next/server";
import {authErrorResponse,requireSession} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {grantPilotSelfConsent,pilotConsentStatus,revokePilotSelfConsent} from "../../../lib/server/pilot-consent";

export const runtime="nodejs";
export const dynamic="force-dynamic";

async function authenticated(){
  try{return {ok:true,value:await requireSession()}}
  catch(error){
    const failure=authErrorResponse(error);
    return {ok:false,response:NextResponse.json(failure.body,{status:failure.status,headers:{"Cache-Control":"no-store"}})};
  }
}

export async function GET(){
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  const result=await pilotConsentStatus(auth.value.authUserId);
  return NextResponse.json(result,{status:result.ok?200:503,headers:{"Cache-Control":"no-store"}});
}

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers:{"Cache-Control":"no-store"}});
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  let body={};
  try{body=await request.json()}catch{return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400})}
  const result=await grantPilotSelfConsent(auth.value.authUserId,body);
  const status=result.ok?200:result.code==="CONFIRMATIONS_REQUIRED"?400:503;
  return NextResponse.json(result,{status,headers:{"Cache-Control":"no-store"}});
}

export async function DELETE(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers:{"Cache-Control":"no-store"}});
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  const result=await revokePilotSelfConsent(auth.value.authUserId);
  return NextResponse.json(result,{status:result.ok?200:503,headers:{"Cache-Control":"no-store"}});
}
