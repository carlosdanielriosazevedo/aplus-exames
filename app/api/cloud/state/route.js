import {NextResponse} from "next/server";
import {requireCapability,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {readCloudRow,writeCloudRow} from "../../../lib/server/cloud-state-store";
import {validateCloudWrite,MAX_CLOUD_POST_BYTES} from "../../../lib/server/cloud-state-validation";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};

async function student(){
  try{return {ok:true,value:await requireCapability("progress")};}
  catch(error){
    const failure=authErrorResponse(error);
    return {ok:false,response:NextResponse.json(failure.body,{status:failure.status,headers})};
  }
}

export async function GET(){
  const auth=await student();
  if(!auth.ok)return auth.response;
  if(!databaseConfigured())return NextResponse.json(
    {ok:false,code:"DATABASE_NOT_CONFIGURED"},{status:503,headers});
  try{
    const data=await readCloudRow(getSql(),auth.value.authUserId);
    return NextResponse.json({ok:true,data},{headers});
  }catch{
    // Do not leak SQL messages, credentials, connection details, or personal data.
    return NextResponse.json({ok:false,code:"CLOUD_READ_FAILED"},{status:503,headers});
  }
}

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers});
  const auth=await student();
  if(!auth.ok)return auth.response;
  if(!databaseConfigured())return NextResponse.json(
    {ok:false,code:"DATABASE_NOT_CONFIGURED"},{status:503,headers});

  const length=Number(request.headers.get("content-length"));
  if(Number.isFinite(length)&&length>MAX_CLOUD_POST_BYTES)
    return NextResponse.json({ok:false,code:"PAYLOAD_TOO_LARGE"},{status:413,headers});
  let raw;
  try{raw=await request.text();}
  catch{return NextResponse.json({ok:false,code:"INVALID_BODY"},{status:400,headers});}
  if(Buffer.byteLength(raw,"utf8")>MAX_CLOUD_POST_BYTES)
    return NextResponse.json({ok:false,code:"PAYLOAD_TOO_LARGE"},{status:413,headers});

  let parsed;
  try{parsed=JSON.parse(raw);}
  catch{return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400,headers});}
  const valid=validateCloudWrite(parsed);
  if(!valid.ok)return NextResponse.json({ok:false,code:valid.code},{status:400,headers});

  try{
    const result=await writeCloudRow(getSql(),auth.value.authUserId,valid);
    return NextResponse.json(result,{status:result.conflict?409:200,headers});
  }catch{
    return NextResponse.json({ok:false,code:"CLOUD_WRITE_FAILED"},{status:503,headers});
  }
}
