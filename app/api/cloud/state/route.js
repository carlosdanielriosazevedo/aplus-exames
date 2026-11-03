import {NextResponse} from "next/server";
import {requireSession,authErrorResponse} from "../../../lib/server/identity";
import {sameOriginRequest} from "../../../lib/server/csrf";
import {getSql,databaseConfigured} from "../../../lib/server/db";
import {readCloudRow,writeCloudRow} from "../../../lib/server/cloud-state-store";
import {validateCloudWrite,MAX_CLOUD_POST_BYTES} from "../../../lib/server/cloud-state-validation";
import {validateCloudSnapshot} from "../../../lib/cloudSnapshotValidation.js";
import {stableSnapshotJson} from "../../../lib/cloudStateMerge.js";
import {assertLocalRecoveryCopy} from "../../../lib/cloudSnapshotPreservation.js";
import {createHash} from "node:crypto";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
const readable=row=>!row||validateCloudSnapshot(row.state_json,{legacy:true,privateFields:false}).ok;
const digest=row=>createHash("sha256").update(stableSnapshotJson(row)).digest("hex");
function quarantined(row){
  return NextResponse.json({ok:false,code:"CLOUD_SNAPSHOT_RECOVERY_REQUIRED",recoveryAvailable:true,revision:row.revision},{status:409,headers});
}

async function authenticated(){
  // Newly provisioned app_users may not yet have an app_user_roles row.
  // Identity is still enforced by the verified session and SQL owner predicate.
  try{return {ok:true,value:await requireSession()};}
  catch(error){
    const failure=authErrorResponse(error);
    return {ok:false,response:NextResponse.json(failure.body,{status:failure.status,headers})};
  }
}

export async function GET(request){
  const auth=await authenticated();
  if(!auth.ok)return auth.response;
  if(!databaseConfigured())return NextResponse.json(
    {ok:false,code:"DATABASE_NOT_CONFIGURED"},{status:503,headers});
  try{
    const exporting=request?.url&&new URL(request.url).searchParams.get("recovery")==="original";
    if(exporting&&new URL(request.url).searchParams.get("account")!==auth.value.authUserId)
      return NextResponse.json({ok:false,code:"FORBIDDEN"},{status:403,headers});
    const data=await readCloudRow(getSql(),auth.value.authUserId);
    if(exporting){
      return NextResponse.json({format:"aplus-cloud-recovery-v1",accountId:auth.value.authUserId,needsRepair:!readable(data),digest:digest(data),revision:data?.revision??null,data},
        {headers:{...headers,"Content-Disposition":"attachment; filename=approva-progresso-original.json","X-Content-Type-Options":"nosniff"}});
    }
    if(!readable(data))return quarantined(data);
    return NextResponse.json({ok:true,authority:"client-reported",data},{headers});
  }catch{
    // Do not leak SQL messages, credentials, connection details, or personal data.
    return NextResponse.json({ok:false,code:"CLOUD_READ_FAILED"},{status:503,headers});
  }
}

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers});
  const auth=await authenticated();
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
  if(valid.recovery&&valid.recovery.accountId!==auth.value.authUserId)
    return NextResponse.json({ok:false,code:"FORBIDDEN"},{status:403,headers});

  try{
    // A malformed saved row cannot be replaced by a normal save or an old
    // client. Explicit recovery binds acknowledgement to the exported row.
    const current=await readCloudRow(getSql(),auth.value.authUserId);
    if(!readable(current)){
      if(!valid.recovery||valid.operation!=="update"||valid.expectedRevision!==current.revision
        ||valid.recovery.digest!==digest(current))return quarantined(current);
      try{assertLocalRecoveryCopy(current.state_json,valid.state,{wire:true});}
      catch{return NextResponse.json({ok:false,code:"CLOUD_RECOVERY_REVIEW_REQUIRED"},{status:409,headers});}
    }else if(valid.recovery){
      return NextResponse.json({ok:false,conflict:true,remote:current,authority:"client-reported"},{status:409,headers});
    }
    const result=await writeCloudRow(getSql(),auth.value.authUserId,valid);
    if(result.conflict&&!readable(result.remote))return quarantined(result.remote);
    return NextResponse.json({...result,authority:"client-reported"},
      {status:result.conflict?409:200,headers});
  }catch{
    return NextResponse.json({ok:false,code:"CLOUD_WRITE_FAILED"},{status:503,headers});
  }
}
