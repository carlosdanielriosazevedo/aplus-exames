import {createNeonAuth} from "@neondatabase/auth/next/server";

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

export function getServerAuth(){
  if(!serverAuthConfigured()){
    const error=new Error("Neon Auth server-side não está configurado corretamente.");
    error.code="AUTH_SERVER_NOT_CONFIGURED";
    error.status=503;
    throw error;
  }
  if(!singleton){
    singleton=createNeonAuth({
      baseUrl:authBaseUrl(),
      cookies:{secret:cookieSecret()}
    });
  }
  return singleton;
}
