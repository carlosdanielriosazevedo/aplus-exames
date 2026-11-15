import {createNeonAuth} from "@neondatabase/neon-js/auth/next/server";

function authBaseUrl(){
  return process.env.NEON_AUTH_BASE_URL
    || process.env.NEXT_PUBLIC_NEON_AUTH_URL
    || process.env.NEON_AUTH_URL
    || "";
}

function cookieSecret(){
  return process.env.NEON_AUTH_COOKIE_SECRET||"";
}

export function serverAuthConfigured(){
  return Boolean(authBaseUrl() && cookieSecret().length>=32);
}

let singleton=null;

// All four methods are deliberate: omitted SDK methods fall back to console.
// Never forward the SDK's message, err, detail, URL or structured metadata.
const logger=Object.freeze({
  error(){console.error("Neon Auth SDK error");},
  warn(){console.warn("Neon Auth SDK warning");},
  info(){},
  debug(){}
});
export const AUTH_SESSION_CACHE_TTL_SECONDS=60;

export function getServerAuth(){
  if(!serverAuthConfigured()){
    const error=new Error("Neon Auth server-side não está configurado corretamente.");
    error.code="AUTH_SERVER_NOT_CONFIGURED";
    error.status=503;
    throw error;
  }
  if(!singleton){
    const sdk=createNeonAuth({
      baseUrl:authBaseUrl(),
      cookies:{secret:cookieSecret(),sessionDataTtl:AUTH_SESSION_CACHE_TTL_SECONDS},
      logger,
      logLevel:"warn"
    });
    // Expose only the two SDK interfaces used by the application. Callers
    // cannot accidentally authorize using the SDK's signed-cookie cache.
    // This installed version requires the literal STRING "true" here.
    singleton=Object.freeze({
      getSession:()=>sdk.getSession({query:{disableCookieCache:"true"}}),
      handler:()=>sdk.handler()
    });
  }
  return singleton;
}
