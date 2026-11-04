import {beforeAll,afterAll,beforeEach,afterEach,describe,it,expect,vi} from "vitest";
import {format} from "node:util";
import {realNeonAuthFixture} from "../helpers/neonAuthSdkFixture.mjs";

const origin="https://isolated.example.invalid",baseUrl="https://auth.example.invalid";
const secret="f6-synthetic-cookie-signing-material-only";
const markers=["F6_PRIVATE_COOKIE","F6_PRIVATE_TOKEN","F6_PRIVATE_PASSWORD","F6_PRIVATE_DETAILS"];
let bundle,app,fixture,spies,upstream;
beforeAll(async()=>{bundle=await realNeonAuthFixture();});
afterAll(()=>bundle.close());
beforeEach(()=>{
  vi.useFakeTimers({toFake:["Date"]});vi.setSystemTime(new Date("2026-11-03T12:00:00Z"));
  vi.stubEnv("NEON_AUTH_BASE_URL",baseUrl);vi.stubEnv("NEON_AUTH_COOKIE_SECRET",secret);
  vi.stubEnv("DATABASE_URL","");
  fixture={headers:new Headers(),cookieWrites:[],sqlCalls:[],requests:[],active:true,privateValues:new Set([...markers,secret])};
  vi.stubGlobal("__f6Fixture",fixture);
  spies=["error","warn","info","debug","log"].map(level=>vi.spyOn(console,level).mockImplementation(()=>{}));
  upstream=async(url,options)=>{
    if(new URL(url).pathname==="/get-session")return Response.json(fixture.active&&new Headers(options.headers).get("cookie")?.includes(".session_token=")?sessionData():{session:null,user:null});
    return Response.json({ok:true});
  };
  vi.stubGlobal("fetch",vi.fn(async(url,options={})=>{
    const parsed=new URL(String(url));
    if(parsed.origin!==baseUrl)throw Error("Unexpected external fixture request");
    fixture.requests.push({url:parsed,options});return upstream(parsed,options);
  }));
  app=bundle.load();
});
afterEach(()=>{vi.restoreAllMocks();vi.unstubAllGlobals();vi.unstubAllEnvs();vi.useRealTimers();});
function sessionData(seconds=3600){
  const now=new Date().toISOString();
  return {user:{id:"synthetic-A",createdAt:now,updatedAt:now},session:{id:"synthetic-session-A",userId:"synthetic-A",expiresAt:new Date(Date.now()+seconds*1000).toISOString(),createdAt:now,updatedAt:now}};
}
function hasMarker(value){return [...fixture.privateValues].some(x=>value.includes(x));}
function loggedMarker(){return spies.some(spy=>spy.mock.calls.some(args=>hasMarker(format(...args))));}
async function call(method,path,{body,headers={},request}={}){
  const req=request||new Request(origin+"/api/auth/"+path,{method,headers:{origin,"content-type":"application/json",...headers},...(method==="POST"?{body:JSON.stringify(body||{})}:{})});
  return app.route[method](req,{params:Promise.resolve({path:path.split("/")})});
}
async function cache(data=sessionData(),{ttl=300,signingSecret=secret}={}){
  const value=await new app.SignJWT(data).setProtectedHeader({alg:"HS256"}).setIssuedAt().setExpirationTime(Math.floor(Date.now()/1000)+ttl).sign(new TextEncoder().encode(signingSecret));
  fixture.privateValues.add(value);return value;
}
async function cookies(data=sessionData(),options){
  const signed=await cache(data,options);
  const header=`${app.tokenName}=${markers[0]}; ${app.cacheName}=${signed}`;
  fixture.headers=new Headers({cookie:header,origin});return header;
}
async function assertNoPrivateResponse(response){
  expect(hasMarker((await response.clone().text())+JSON.stringify([...response.headers]))).toBe(false);
  expect(response.headers.get("cache-control")).toContain("no-store");expect(loggedMarker()).toBe(false);
}

describe("F6 — installed Neon Auth SDK; synthetic transport only",()=>{
  it("reproduces the default SDK logger leak and prevents it in application authorization",async()=>{
    upstream=async()=>{throw new Error(markers.join(" ")+" "+secret);};
    const original=app.createNeonAuth({baseUrl,cookies:{secret}});
    await expect(original.getSession({query:{disableCookieCache:"true"}})).rejects.toBeDefined();
    expect(loggedMarker()).toBe(true);
    for(const spy of spies)spy.mockClear();
    await expect(app.identity.requireSession()).rejects.toMatchObject({code:"UNAUTHORIZED",status:401});
    expect(loggedMarker()).toBe(false);expect(fixture.sqlCalls).toHaveLength(0);
  });
  it.each(["GET","POST"])("catches a genuine asynchronous %s SDK handler rejection",async method=>{
    const request={url:origin+"/api/auth/token",method,headers:new Headers({origin}),body:method==="POST"?{}:null,
      text:async()=>{throw new Error(markers[2]);}};
    if(method==="GET")request.headers={get(){throw new Error(markers[0]);}};
    const response=await call(method,"token",{request});
    expect(response.status).toBe(503);await assertNoPrivateResponse(response);
    expect((await response.json()).error).toBe("AUTH_HANDLER_UNAVAILABLE");
  });
  it.each([400,401,403,409,429,500,599])("controls HTTP %s provider errors and discards credential headers",async status=>{
    upstream=async()=>Response.json({message:markers[3],code:markers[1],password:markers[2]},
      {status,statusText:markers[0],headers:{"set-auth-token":markers[1],"set-auth-jwt":markers[1]}});
    const response=await call("GET","token");
    expect(response.status).toBe(status>=500?503:status);await assertNoPrivateResponse(response);
    expect((await response.json()).code).toMatch(/^(AUTH_|UNAUTHORIZED|FORBIDDEN)/);
  });
  it.each(["GET","POST"])("contains a late upstream body-stream failure in %s",async method=>{
    upstream=async()=>new Response(new ReadableStream({start(controller){controller.error(new Error(markers[3]));}}));
    const response=await call(method,"token");expect(response.status).toBe(503);
    await assertNoPrivateResponse(response);
  });
  it("never authorizes from a still-valid cache after provider revocation",async()=>{
    await cookies();fixture.active=false;
    const raw=app.createNeonAuth({baseUrl,cookies:{secret}});
    expect((await raw.getSession()).data.user.id).toBe("synthetic-A");expect(fixture.requests).toHaveLength(0);
    await expect(app.identity.requireSession()).rejects.toMatchObject({status:401});
    await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:401});
    expect(fixture.requests.every(x=>x.url.searchParams.get("disableCookieCache")==="true")).toBe(true);
    expect(fixture.sqlCalls).toHaveLength(0);
  });
  it.each(["admin","student"])("checks the current %s role and blocks reuse after revocation",async role=>{
    await cookies();
    fixture.sqlReply=sql=>sql.includes("insert into app_users")?[{id:"synthetic-app-A"}]:[{role}];
    if(role==="admin")expect((await app.identity.requireCapability("manage_roles")).authUserId).toBe("synthetic-A");
    else await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:403});
    const queries=fixture.sqlCalls.length;fixture.active=false;
    await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:401});
    expect(fixture.sqlCalls).toHaveLength(queries);expect(loggedMarker()).toBe(false);
  });
  it("forces cache bypass even when callers or browser query strings request caching",async()=>{
    const header=await cookies();fixture.active=false;
    expect((await app.auth.getServerAuth().getSession({query:{disableCookieCache:"false"}})).data.user).toBe(null);
    const proper=await app.route.GET(new Request(origin+"/api/auth/get-session?disableCookieCache=false",{headers:{cookie:header}}),{params:Promise.resolve({path:["get-session"]})});
    expect((await proper.json()).user).toBe(null);
    expect(fixture.requests.at(-1).url.searchParams.get("disableCookieCache")).toBe("true");
    expect(proper.status).toBe(200);expect(loggedMarker()).toBe(false);
  });
  it("rejects expired, malformed and mismatched upstream sessions before privileged SQL",async()=>{
    for(const mutate of [x=>({...x,session:{...x.session,expiresAt:new Date(Date.now()-1).toISOString()}}),
      x=>({...x,session:null}),x=>({...x,session:{...x.session,expiresAt:markers[3]}}),
      x=>({...x,session:{...x.session,userId:"other-synthetic-user"}}),x=>({...x,user:{id:123}})]){
      upstream=async()=>Response.json(mutate(sessionData()));
      await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:401});
    }
    expect(fixture.sqlCalls).toHaveLength(0);expect(loggedMarker()).toBe(false);
  });
  it("rejects a revoked session at the actual cloud and reward HTTP boundaries",async()=>{
    await cookies();fixture.active=false;
    const response=await app.cloud.POST(new Request(origin+"/api/cloud/state",{method:"POST",headers:{origin,"content-type":"application/json"},body:JSON.stringify({operation:"insert",expectedRevision:0,state:{schema:"aplus-student-state-v8",xp:1}})}));
    expect(response.status).toBe(401);expect((await app.rewards.GET()).status).toBe(401);
    expect(fixture.sqlCalls).toHaveLength(0);expect(loggedMarker()).toBe(false);
  });
  it("does not grant privileges using a signed cache without its session credential",async()=>{
    const signed=await cache();fixture.headers=new Headers({cookie:`${app.cacheName}=${signed}`});
    await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:401});
    expect(fixture.sqlCalls).toHaveLength(0);expect(loggedMarker()).toBe(false);
  });
  it("fails closed during provider outages with a controlled retryable status",async()=>{
    await cookies();upstream=async()=>Response.json({code:markers[1],message:markers[3]},{status:503,statusText:markers[0]});
    await expect(app.identity.requireCapability("manage_roles")).rejects.toMatchObject({status:503,code:"AUTH_PROVIDER_UNAVAILABLE"});
    expect(fixture.sqlCalls).toHaveLength(0);expect(loggedMarker()).toBe(false);
  });
  it("does not enter the SDK's unconfigurable cache-parser console fallback",async()=>{
    const invalid=sessionData();invalid.session.expiresAt=markers[3];const header=await cookies(invalid);
    fixture.active=false;
    await expect(app.identity.requireSession()).rejects.toMatchObject({status:401});
    const response=await call("GET","get-session",{headers:{cookie:header}});
    expect((await response.json()).user).toBe(null);expect(loggedMarker()).toBe(false);
  });
  it("expires cached signatures and rechecks the upstream provider",async()=>{
    await cookies(sessionData(),{ttl:2});fixture.active=false;vi.setSystemTime(Date.now()+3000);
    const raw=app.createNeonAuth({baseUrl,cookies:{secret}});
    expect((await raw.getSession()).data.user).toBe(null);expect(fixture.requests).toHaveLength(1);
    await expect(app.identity.requireSession()).rejects.toMatchObject({status:401});expect(loggedMarker()).toBe(false);
  });
  it("mints a renewed cache bounded by upstream expiry and the configured TTL",async()=>{
    const now=Date.now();
    upstream=async url=>url.pathname==="/sign-in/email"
      ?Response.json({ok:true},{headers:{"set-cookie":`${app.tokenName}=${markers[1]}; Path=/; HttpOnly; Secure`}})
      :Response.json(sessionData(15));
    const response=await call("POST","sign-in/email",{body:{email:"synthetic@example.invalid",password:markers[2]}});
    expect(response.status).toBe(200);
    const minted=response.headers.getSetCookie().find(x=>x.startsWith(app.cacheName+"="));
    const jwt=minted.slice(minted.indexOf("=")+1).split(";")[0];
    fixture.privateValues.add(jwt);
    expect(app.decodeJwt(jwt).exp).toBe(Math.floor(now/1000)+15);
    fixture.headers=new Headers({cookie:`${app.tokenName}=${markers[1]}; ${app.cacheName}=${jwt}`});
    const oldCount=fixture.requests.length;
    expect((await app.identity.requireSession()).authUserId).toBe("synthetic-A");
    expect(fixture.requests.length).toBe(oldCount+1);expect(loggedMarker()).toBe(false);
  });
  it("renews an expired cache and rotates session cookies through the real SDK",async()=>{
    await cookies(sessionData(),{ttl:1});vi.setSystemTime(Date.now()+2000);
    const renewed={...sessionData(3600),session:{...sessionData(3600).session,id:"synthetic-renewed-session"}};
    upstream=async(url,options)=>{
      const isFresh=url.searchParams.get("disableCookieCache")==="true";
      if(!isFresh)expect(new Headers(options.headers).get("cookie").includes(markers[1])).toBe(true);
      return Response.json(renewed,isFresh?{headers:{"set-cookie":`${app.tokenName}=${markers[1]}; Path=/; HttpOnly; Secure`}}:{});
    };
    expect((await app.identity.requireSession()).session.id).toBe("synthetic-renewed-session");
    expect(fixture.cookieWrites.some(x=>x.name===app.tokenName&&x.value===markers[1])).toBe(true);
    const cached=fixture.cookieWrites.find(x=>x.name===app.cacheName);fixture.privateValues.add(cached.value);
    expect(app.decodeJwt(cached.value).exp).toBe(Math.floor(Date.now()/1000)+app.auth.AUTH_SESSION_CACHE_TTL_SECONDS);
    expect(cached.options.httpOnly).toBe(true);expect(cached.options.secure).toBe(true);
    expect(loggedMarker()).toBe(false);
  });
  it("clears local logout credentials even when the provider cannot confirm revocation",async()=>{
    const header=await cookies();
    upstream=async(url,options)=>url.pathname==="/sign-out"
      ?Response.json({message:markers[3]},{status:503})
      :Response.json(new Headers(options.headers).get("cookie")?sessionData():{session:null,user:null});
    const response=await call("POST","sign-out",{headers:{cookie:header}});
    expect(response.status).toBe(503);await assertNoPrivateResponse(response);
    for(const name of [app.tokenName,app.cacheName])expect(response.headers.getSetCookie().some(x=>x.startsWith(name+"=;")&&x.includes("Max-Age=0"))).toBe(true);
    fixture.headers=new Headers();
    await expect(app.identity.requireSession()).rejects.toMatchObject({status:401});
    expect(fixture.sqlCalls).toHaveLength(0);
  });
  it.each(["sign-out","revoke-session","revoke-sessions","revoke-all-sessions"])("invalidates %s locally and refuses a replay of the old signed cache",async path=>{
    const header=await cookies();
    upstream=async url=>{
      if(url.pathname==="/"+path){fixture.active=false;return Response.json({ok:true});}
      return Response.json(fixture.active?sessionData():{session:null,user:null});
    };
    const response=await call("POST",path,{headers:{cookie:header}});
    expect(response.status).toBe(200);
    expect(response.headers.getSetCookie().some(x=>x.startsWith(app.cacheName+"=;")&&x.includes("Max-Age=0"))).toBe(true);
    if(path==="sign-out")expect(response.headers.getSetCookie().some(x=>x.startsWith(app.tokenName+"=;")&&x.includes("Max-Age=0"))).toBe(true);
    // Deliberately replay both original cookies as if another tab retained them.
    await expect(app.identity.requireSession()).rejects.toMatchObject({status:401});
    expect(fixture.sqlCalls).toHaveLength(0);expect(loggedMarker()).toBe(false);
  });
});
