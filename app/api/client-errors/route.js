import {createHash} from "node:crypto";
import {NextResponse} from "next/server";
import {sameOriginRequest} from "../../lib/server/csrf";

export const runtime="nodejs";
export const dynamic="force-dynamic";

const MAX_BYTES=12_000;
const WINDOW_MS=60_000;
const LIMIT=20;
const buckets=new Map();
const ALLOWED_KINDS=new Set(["runtime","window_error","unhandled_rejection","react_boundary","global_boundary"]);

function trim(value,max){return String(value??"").replace(/[\r\n\t]+/g," ").trim().slice(0,max)}
function clientKey(request){
  const source=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  return createHash("sha256").update(source).digest("hex").slice(0,16);
}
function rateAllowed(key){
  const now=Date.now(),current=buckets.get(key);
  if(!current||now-current.startedAt>=WINDOW_MS){buckets.set(key,{startedAt:now,count:1});return true}
  current.count++;
  if(buckets.size>500){for(const [id,row] of buckets){if(now-row.startedAt>WINDOW_MS)buckets.delete(id)}}
  return current.count<=LIMIT;
}
function normalize(payload){
  const stack=Array.isArray(payload?.stack)?payload.stack.slice(0,12).map(line=>trim(line,320)):[];
  const kind=trim(payload?.kind,32);
  return {
    kind:ALLOWED_KINDS.has(kind)?kind:"runtime",
    name:trim(payload?.name||"Error",80),
    screen:trim(payload?.screen||"unknown",80),
    path:trim(payload?.path||"/",160),
    source:trim(payload?.source||"",160),
    line:Number.isFinite(Number(payload?.line))?Number(payload.line):null,
    column:Number.isFinite(Number(payload?.column))?Number(payload.column):null,
    stack
  };
}

export async function POST(request){
  const csrf=sameOriginRequest(request);
  if(!csrf.ok)return NextResponse.json({ok:false,code:csrf.code},{status:403,headers:{"Cache-Control":"no-store"}});
  if(!rateAllowed(clientKey(request)))return NextResponse.json({ok:false,code:"RATE_LIMITED"},{status:429,headers:{"Cache-Control":"no-store"}});
  const raw=await request.text();
  if(Buffer.byteLength(raw,"utf8")>MAX_BYTES)return NextResponse.json({ok:false,code:"PAYLOAD_TOO_LARGE"},{status:413,headers:{"Cache-Control":"no-store"}});
  let payload;
  try{payload=JSON.parse(raw)}catch{return NextResponse.json({ok:false,code:"INVALID_JSON"},{status:400,headers:{"Cache-Control":"no-store"}})}
  const event=normalize(payload);
  console.error("APProva+ client runtime error",{
    ...event,
    userAgent:trim(request.headers.get("user-agent")||"",240),
    commit:trim(process.env.VERCEL_GIT_COMMIT_SHA||"local",64),
    environment:trim(process.env.VERCEL_ENV||process.env.NODE_ENV||"unknown",32)
  });
  return NextResponse.json({ok:true},{status:202,headers:{"Cache-Control":"no-store"}});
}
