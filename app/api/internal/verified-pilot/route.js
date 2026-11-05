import {NextResponse} from "next/server";
import {requireSession,ensureAppUser,authErrorResponse}
  from "../../../lib/server/identity.js";
import {sameOriginRequest} from "../../../lib/server/csrf.js";
import {getSql} from "../../../lib/server/db.js";
import {pilotEnabled,validatePilotCommand,publicPilotSession}
  from "../../../lib/server/preview-verified-pilot.js";
import {readPreviewPilot,startPreviewPilot,recordPreviewAnswer,finishPreviewPilot}
  from "../../../lib/server/preview-verified-pilot-store.js";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};

function reply(body,status=200){
  return NextResponse.json(body,{status,headers});
}
async function session({provision=false}={}){
  try{
    const auth=await requireSession();
    // Only first START may provision identity; GET never silently writes.
    if(provision)await ensureAppUser(auth);
    return {ok:true,subject:auth.authUserId};
  }catch(error){
    const {status,body}=authErrorResponse(error);
    return {ok:false,response:reply(body,status)};
  }
}

export async function GET(){
  if(!pilotEnabled())return reply({ok:false,code:"PILOT_DISABLED"},404);
  const auth=await session();
  if(!auth.ok)return auth.response;
  try{
    const state=await readPreviewPilot(getSql(),auth.subject);
    return reply({ok:true,authority:"synthetic-preview-only",...publicPilotSession(state)});
  }catch{
    return reply({ok:false,code:"PILOT_READ_FAILED"},503);
  }
}

export async function POST(request){
  if(!pilotEnabled())return reply({ok:false,code:"PILOT_DISABLED"},404);
  const origin=sameOriginRequest(request);
  if(!origin.ok)return reply({ok:false,code:origin.code},403);
  const size=Number(request.headers.get("content-length"));
  if(Number.isFinite(size)&&size>2048)
    return reply({ok:false,code:"BODY_TOO_LARGE"},413);
  let raw,body;
  try{
    raw=await request.text();
    if(Buffer.byteLength(raw,"utf8")>2048)
      return reply({ok:false,code:"BODY_TOO_LARGE"},413);
    body=JSON.parse(raw);
  }catch{
    return reply({ok:false,code:"INVALID_JSON"},400);
  }
  const parsed=validatePilotCommand(body);
  if(!parsed.ok)return reply({ok:false,code:parsed.code},400);
  const auth=await session({provision:parsed.action==="start"});
  if(!auth.ok)return auth.response;

  try{
    const sql=getSql();
    if(parsed.action==="start")
      return reply({ok:true,authority:"synthetic-preview-only",
        ...await startPreviewPilot(sql,auth.subject)});
    if(parsed.action==="answer")
      return reply({ok:true,authority:"synthetic-preview-only",
        ...await recordPreviewAnswer(sql,auth.subject,parsed.questionId,parsed.choiceIndex)});
    const finished=await finishPreviewPilot(sql,auth.subject);
    return reply({ok:true,...finished});
  }catch(error){
    // Only exact, audited error codes are reported, never driver/DSN content.
    if(error?.message==="Pilot incomplete")
      return reply({ok:false,code:"SEVEN_ANSWERS_REQUIRED"},409);
    if(error?.message==="Pilot not started")
      return reply({ok:false,code:"PILOT_NOT_STARTED"},409);
    return reply({ok:false,code:"PILOT_UNAVAILABLE"},503);
  }
}
