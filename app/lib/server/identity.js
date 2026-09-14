// APProva+ — autorização server-side.
//
// A identidade demo nunca é fronteira de segurança. Rotas privadas devem usar
// `requireSession()` e, quando necessário, `requireCapability()`.

import {getServerAuth,serverAuthConfigured} from "./auth";
import {getSql,databaseConfigured} from "./db";

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

export async function requireSession(){
  if(!serverAuthConfigured())throw securityError("Auth server not configured",503,"AUTH_SERVER_NOT_CONFIGURED");
  const auth=getServerAuth();
  let result;
  try{
    result=await auth.getSession();
  }catch(error){
    console.error("server auth session validation failed",error);
    throw securityError("Unauthorized",401,"UNAUTHORIZED");
  }
  const session=result?.data||null;
  const user=session?.user||null;
  if(!user?.id)throw securityError("Unauthorized",401,"UNAUTHORIZED");
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
  const status=Number(error?.status)||500;
  const code=error?.code||"INTERNAL_ERROR";
  return {status,body:{ok:false,error:code}};
}

export function authConfiguration(){
  const authUrl=process.env.NEON_AUTH_BASE_URL||process.env.NEXT_PUBLIC_NEON_AUTH_URL||process.env.NEON_AUTH_URL||null;
  const dataApiUrl=process.env.NEXT_PUBLIC_NEON_DATA_API_URL||null;
  const serverSessionSecret=process.env.NEON_AUTH_COOKIE_SECRET||null;
  const serverSessionEnforced=false; // só muda após verificação end-to-end independente das rotas privadas.
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
