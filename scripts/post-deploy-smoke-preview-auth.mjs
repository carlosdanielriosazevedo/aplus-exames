import assert from "node:assert/strict";
import {randomBytes} from "node:crypto";
import {writeFileSync} from "node:fs";
import {performance} from "node:perf_hooks";

const baseUrl=String(process.env.SMOKE_BASE_URL||"").replace(/\/$/,"");
const shareToken=process.env.SMOKE_SHARE_TOKEN||null;
const stateFile=process.env.SMOKE_STATE_FILE||"/tmp/aprova-pilot-smoke-session.json";
if(!baseUrl)throw new Error("SMOKE_BASE_URL is required");
const baseOrigin=new URL(baseUrl).origin;

const email=`pilot-smoke-${Date.now()}-${randomBytes(4).toString("hex")}@example.com`;
const password=`S!${randomBytes(24).toString("base64url")}`;
const cookies=new Map();

const rememberCookies=response=>{
  const values=response.headers.getSetCookie?.()||[];
  const fallback=values.length?[]:[response.headers.get("set-cookie")].filter(Boolean);
  for(const raw of [...values,...fallback]){
    for(const part of String(raw).split(/,(?=[^;,]+=)/u)){
      const pair=part.split(";",1)[0];
      const eq=pair.indexOf("=");
      if(eq>0)cookies.set(pair.slice(0,eq).trim(),pair.slice(eq+1).trim());
    }
  }
};
const cookieHeader=()=>[...cookies].map(([key,value])=>`${key}=${value}`).join("; ");
async function request(path,options={}){
  const headers=new Headers(options.headers||{});
  const cookie=cookieHeader();
  if(cookie)headers.set("cookie",cookie);
  const method=String(options.method||"GET").toUpperCase();
  if(!["GET","HEAD","OPTIONS"].includes(method)){
    headers.set("origin",baseOrigin);
    headers.set("sec-fetch-site","same-origin");
  }
  const response=await fetch(`${baseUrl}${path}`,{...options,headers,redirect:"manual"});
  rememberCookies(response);
  return response;
}
async function body(response){
  const text=await response.text();
  try{return JSON.parse(text)}catch{return {raw:text.slice(0,500)}}
}
async function protectionHandshake(){
  if(!shareToken)return;
  const response=await request(`/?_vercel_share=${encodeURIComponent(shareToken)}`);
  assert.ok(response.status>=200&&response.status<400,`Preview protection handshake failed: ${response.status}`);
}

await protectionHandshake();
const healthResponse=await request("/api/health",{cache:"no-store"});
const health=await body(healthResponse);
assert.equal(healthResponse.status,200,"health must return 200");
assert.equal(health.backendReachable,true,"preview must reach Neon");
assert.ok(Number(health.schemaVersion)>=8,`expected schema v8+, got ${health.schemaVersion}`);
assert.equal(health.region,"fra1",`expected runtime region fra1, got ${health.region}`);

const signupResponse=await request("/api/auth/sign-up/email",{
  method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify({name:"Pilot Smoke",email,password})
});
const signup=await body(signupResponse);
assert.ok(signupResponse.ok,`signup failed ${signupResponse.status}: ${JSON.stringify(signup)}`);

cookies.clear();
await protectionHandshake();
const loginStart=performance.now();
const loginResponse=await request("/api/auth/sign-in/email",{
  method:"POST",headers:{"content-type":"application/json"},
  body:JSON.stringify({email,password})
});
const loginMs=performance.now()-loginStart;
const login=await body(loginResponse);
assert.ok(loginResponse.ok,`login failed ${loginResponse.status}: ${JSON.stringify(login)}`);

const sessionResponse=await request("/api/auth/session",{cache:"no-store"});
const session=await body(sessionResponse);
assert.equal(sessionResponse.status,200,`session failed: ${JSON.stringify(session)}`);
assert.ok(session?.user?.id,"auth user id missing");
assert.ok(session?.appUserId,"app user id missing");

writeFileSync(stateFile,JSON.stringify({
  baseUrl,
  cookies:Object.fromEntries(cookies),
  authUserId:session.user.id,
  appUserId:session.appUserId,
  schemaVersion:health.schemaVersion,
  schemaMigration:health.schemaMigration
}),{mode:0o600});

console.log(JSON.stringify({
  ok:true,phase:"auth",loginMs:Number(loginMs.toFixed(1)),
  authUserId:session.user.id,appUserId:session.appUserId,
  schemaVersion:health.schemaVersion,schemaMigration:health.schemaMigration,region:health.region,
  stateFile
}));
