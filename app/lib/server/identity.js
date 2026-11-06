// APProva+ — autorização server-side.
//
// A identidade demo nunca é fronteira de segurança. Rotas privadas devem usar
// `requireSession()` e, quando necessário, `requireCapability()`.

import {getServerAuth,serverAuthConfigured} from "./auth";
import {getSql,databaseConfigured} from "./db";

import {headers} from "next/headers";
import {assertRequestAccount} from "./account-binding.js";

const ROLE_CAPABILITIES={
  student:new Set(["study","progress","exams","manage_parent_link"]),
  parent:new Set(["parent_dashboard"]),
  reviewer:new Set(["review_content","view_reports"]),
  admin:new Set(["study","progress","exams","manage_parent_link","parent_dashboard","review_content","view_reports","beta_admin","quality_admin","manage_roles"])
};

function securityError(message,status,code){
  const error=new Error(message);
  error.status=status;
  error.code=code;
  return error;
}

export function roleAllows(role,capability){
  return ROLE_CAPABILITIES[role]?.has(capability)||false;
}

export function assertRoleCapability(role,capability){
  if(!roleAllows(role,capability))throw securityError("Forbidden",403,"FORBIDDEN");
  return true;
}

export async function requireSession({accountBound=false}={}){
  if(!serverAuthConfigured())throw securityError("Auth server not configured",503,"AUTH_SERVER_NOT_CONFIGURED");
  let auth;
  try{auth=getServerAuth();}
  catch{
    console.error("server auth provider initialization failed");
    throw securityError("Auth provider unavailable",503,"AUTH_PROVIDER_UNAVAILABLE");
  }
  let result;
  try{
    // getServerAuth's facade always revalidates upstream, including reads of
    // private data and all privileged writes. It never authorizes from cache.
    result=await auth.getSession();
  }catch{
    // Provider errors may contain cookies, tokens or sensitive response metadata.
    console.error("server auth session validation failed");
    throw securityError("Unauthorized",401,"UNAUTHORIZED");
  }
  const session=result?.data||null;
  if(result?.error&&Number(result.error.status)>=500&&Number(result.error.status)<=599)
    throw securityError("Auth provider unavailable",503,"AUTH_PROVIDER_UNAVAILABLE");
  const user=session?.user||null;
  const details=session?.session;
  const expiry=typeof details?.expiresAt==="string"||details?.expiresAt instanceof Date
    ?new Date(details.expiresAt).getTime():NaN;
  if(result?.error||typeof user?.id!=="string"||!user.id
    ||typeof details?.id!=="string"||!details.id||details.userId!==user.id
    ||!Number.isFinite(expiry)||expiry<=Date.now())
    throw securityError("Unauthorized",401,"UNAUTHORIZED");
  assertRequestAccount(await headers(),String(user.id),{required:accountBound});
  return {
    authUserId:String(user.id),
    user,
    session:session?.session||null
  };
}

export async function ensureAppUser(authenticated){
  if(!databaseConfigured())throw securityError("Database not configured",503,"DATABASE_NOT_CONFIGURED");
  if(!authenticated?.authUserId)throw securityError("Unauthorized",401,"UNAUTHORIZED");
  const sql=getSql();
  const displayName=authenticated.user?.name?String(authenticated.user.name).slice(0,200):null;
  const emailSnapshot=authenticated.user?.email?String(authenticated.user.email).slice(0,320):null;
  const rows=await sql`
    insert into app_users (auth_user_id,display_name,email_snapshot)
    values (${authenticated.authUserId},${displayName},${emailSnapshot})
    on conflict (auth_user_id) do update set
      display_name=excluded.display_name,
      email_snapshot=excluded.email_snapshot,
      updated_at=now()
    returning id,auth_user_id,display_name,email_snapshot
  `;
  return rows[0]||null;
}

export async function loadAppIdentity(authUserId){
  if(!databaseConfigured())throw securityError("Database not configured",503,"DATABASE_NOT_CONFIGURED");
  const sql=getSql();
  const users=await sql`
    select id,auth_user_id,display_name,email_snapshot
    from app_users
    where auth_user_id=${authUserId}
    limit 1
  `;
  if(!users.length)return {appUser:null,roles:[]};
  const appUser=users[0];
  const rows=await sql`
    select role
    from app_user_roles
    where user_id=${appUser.id}
    order by role
  `;
  return {appUser,roles:rows.map(row=>row.role)};
}

export async function ensureAppIdentity(authenticated){
  const appUser=await ensureAppUser(authenticated);
  const sql=getSql();
  const rows=await sql`
    select role
    from app_user_roles
    where user_id=${appUser.id}
    order by role
  `;
  return {appUser,roles:rows.map(row=>row.role)};
}

export async function requireCapability(capability){
  const authenticated=await requireSession();
  const identity=await ensureAppIdentity(authenticated);
  const allowed=identity.roles.some(role=>roleAllows(role,capability));
  if(!allowed)throw securityError("Forbidden",403,"FORBIDDEN");
  return {...authenticated,...identity};
}

export function authErrorResponse(error){
  // Never reflect arbitrary provider, driver or application exception codes.
  const allowed={
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    AUTH_SERVER_NOT_CONFIGURED:503,
    AUTH_PROVIDER_UNAVAILABLE:503,
    DATABASE_NOT_CONFIGURED:503
  };
  const code=typeof error?.code==="string"&&Object.hasOwn(allowed,error.code)
    ?error.code:"INTERNAL_ERROR";
  return {status:allowed[code]??500,body:{ok:false,error:code}};
}

export function authConfiguration(){
  const authUrl=process.env.NEON_AUTH_BASE_URL||process.env.NEXT_PUBLIC_NEON_AUTH_URL||process.env.NEON_AUTH_URL||null;
  const dataApiUrl=process.env.NEXT_PUBLIC_NEON_DATA_API_URL||null;
  const serverSessionSecret=process.env.NEON_AUTH_COOKIE_SECRET||null;
  const serverSessionEnforced=true;
  return {
    provider:"neon-auth",
    strategy:"managed-auth-plus-app-rbac",
    authProviderConfigured:!!authUrl,
    dataApiConfigured:!!dataApiUrl,
    serverSessionConfigured:!!serverSessionSecret && serverSessionSecret.length>=32,
    serverSessionEnforced,
    rowLevelSecurityExpected:true,
    realUserReady:!!authUrl && !!dataApiUrl && serverSessionEnforced
  };
}
