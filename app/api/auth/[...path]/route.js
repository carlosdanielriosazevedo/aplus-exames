import {NextResponse} from "next/server";
import {getServerAuth} from "../../../lib/server/auth";
import {NEON_AUTH_SESSION_DATA_COOKIE_NAME,NEON_AUTH_SESSION_COOKIE_NAME}
  from "@neondatabase/neon-js/auth/server";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const privacyHeaders={"Cache-Control":"private, no-store","Pragma":"no-cache","Vary":"Cookie"};

function clearSessionCookies(headers,{token=false}={}){
  const names=[NEON_AUTH_SESSION_DATA_COOKIE_NAME,...(token?[NEON_AUTH_SESSION_COOKIE_NAME]:[])];
  for(const name of names)headers.append("Set-Cookie",`${name}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`);
}

function publicFailure(status,{logout=false}={}){
  const codes={400:"AUTH_REQUEST_REJECTED",401:"UNAUTHORIZED",403:"FORBIDDEN",
    404:"AUTH_ENDPOINT_NOT_FOUND",405:"AUTH_METHOD_NOT_ALLOWED",409:"AUTH_CONFLICT",
    422:"AUTH_REQUEST_REJECTED",429:"AUTH_RATE_LIMITED"};
  const publicStatus=Object.hasOwn(codes,status)?status:503;
  const code=codes[status]||"AUTH_PROVIDER_UNAVAILABLE";
  const headers=new Headers(privacyHeaders);
  if(publicStatus===401||logout)clearSessionCookies(headers,{token:true});
  return NextResponse.json({ok:false,error:code,code,message:"Não foi possível concluir o pedido de autenticação."},{status:publicStatus,headers});
}

async function finish(response,path){
  // Upstream HTTP errors can contain arbitrary provider messages/codes and
  // credential headers even when no exception was thrown.
  if(response.status>=400)return publicFailure(response.status,{logout:path==="sign-out"});
  // Consume the auth response inside the protected async boundary. A rejected
  // upstream body stream must not escape later through Next's response writer.
  const body=response.body===null?null:await response.arrayBuffer();
  const headers=new Headers(response.headers);
  for(const [key,value] of Object.entries(privacyHeaders))headers.set(key,value);
  if(path==="sign-out")clearSessionCookies(headers,{token:true});
  else if(["revoke-session","revoke-sessions","revoke-all-sessions"].includes(path))clearSessionCookies(headers);
  return new Response(body,{status:response.status,statusText:response.statusText,headers});
}

function unavailable(error,{logout=false}={}){
  // Do not write the provider exception to logs: it may contain auth secrets.
  console.error("Neon Auth handler unavailable");
  // Preserve only the known configuration code; never reflect provider errors.
  const code=error?.code==="AUTH_SERVER_NOT_CONFIGURED"
    ?"AUTH_SERVER_NOT_CONFIGURED":"AUTH_HANDLER_UNAVAILABLE";
  const headers=new Headers(privacyHeaders);
  if(logout)clearSessionCookies(headers,{token:true});
  return NextResponse.json({ok:false,error:code},{status:503,headers});
}

async function handle(method,request,context){
  let path;
  try{
    const params=await context.params;
    path=params.path.join("/");
    if(method==="GET"&&path==="get-session"){
      // Also bypass the SDK cache in its proxy. This prevents stale UI session
      // responses and avoids its cache parser's unconfigurable console fallback.
      const url=new URL(request.url);url.searchParams.set("disableCookieCache","true");
      request=new Request(url,request);
    }
    const handlers=getServerAuth().handler();
    return await finish(await handlers[method](request,{...context,params:Promise.resolve(params)}),path);
  }catch(error){
    return unavailable(error,{logout:path==="sign-out"});
  }
}

export async function GET(request,context){
  return handle("GET",request,context);
}

export async function POST(request,context){
  return handle("POST",request,context);
}
