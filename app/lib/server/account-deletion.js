// Eliminação da conta pelo próprio aluno (RGPD art. 17.º; requisito da Google Play).
//
// O Neon Auth gerido não tem o pedido `delete-user` ligado (responde 404), por isso
// a eliminação é feita aqui, numa única transação:
//   1. dados da APProva+ ligados à conta (progresso, histórico, consentimentos,
//      rankings, identidade da app e, em cascata, papéis e dados de piloto);
//   2. identidade de autenticação (neon_auth: sessões, contas, membros, utilizador).
// Ou apaga tudo, ou não apaga nada. Ficam apenas contagens diárias anónimas
// (funnel_daily) e reportes de perguntas, que não guardam identificador de conta.

const APP_TABLES_BY_AUTH_USER=Object.freeze([
  "student_cloud_state",
  "student_cloud_state_history",
  "ranking_profiles",
  "ranking_xp_events",
  "ranking_weekly_totals",
  "ranking_league_memberships",
  "account_consents"
]);
// Apagada depois das anteriores: as tabelas de papéis, perfis e piloto dependem dela
// com ON DELETE CASCADE.
const APP_USERS_TABLE="app_users";
const AUTH_TABLES=Object.freeze([
  {table:"session",column:"userId"},
  {table:"account",column:"userId"},
  {table:"member",column:"userId"},
  {table:"user",column:"id"}
]);

export const DELETION_CONFIRMATION="ELIMINAR";

// Contas criadas só com Google/Microsoft não têm palavra-passe. Para essas, a
// reautenticação é ter entrado há pouco tempo (sessão criada nos últimos minutos).
export const RECENT_LOGIN_MAX_AGE_MS=10*60*1000;

export function validateDeletionRequest(body,{requirePassword=true}={}){
  if(!body||typeof body!=="object"||Array.isArray(body))return {ok:false,code:"INVALID_BODY"};
  const password=typeof body.password==="string"?body.password:"";
  const confirmation=typeof body.confirmation==="string"?body.confirmation.trim().toUpperCase():"";
  if(confirmation!==DELETION_CONFIRMATION)return {ok:false,code:"CONFIRMATION_REQUIRED"};
  if(password.length>200)return {ok:false,code:"PASSWORD_REQUIRED"};
  if(requirePassword&&password.length<1)return {ok:false,code:"PASSWORD_REQUIRED"};
  return {ok:true,password};
}

function tableExists(sql,schema,table){
  return sql`select to_regclass(${`${schema}."${table}"`}) is not null as present`.then(rows=>!!rows[0]?.present);
}

// Como é que esta conta confirma a eliminação: "password" (tem credencial de
// email e palavra-passe) ou "recent-login" (só Google/Microsoft). Sem a tabela de
// contas do Neon Auth, mantém-se o comportamento anterior (palavra-passe).
export async function deletionMethod(sql,authUserId){
  if(!authUserId||!(await tableExists(sql,"neon_auth","account")))return {method:"password",providers:[]};
  const rows=await sql`select "providerId" as provider from neon_auth."account" where "userId"::text = ${String(authUserId)}`;
  const providers=[...new Set(rows.map(row=>String(row.provider||"")).filter(Boolean))];
  if(!providers.length||providers.includes("credential"))return {method:"password",providers};
  return {method:"recent-login",providers};
}

function timestampMs(value){
  if(value===null||value===undefined||value==="")return null;
  const ms=value instanceof Date?value.getTime():Date.parse(String(value));
  return Number.isFinite(ms)?ms:null;
}

// Momento em que a sessão atual foi criada. Usa o valor devolvido pelo Neon Auth
// e, se faltar, confirma na tabela de sessões (sempre limitado à própria conta).
export async function sessionCreatedAt(sql,{authUserId,session}={}){
  const direct=timestampMs(session?.createdAt);
  if(direct!==null)return direct;
  if(!session?.id||!authUserId||!(await tableExists(sql,"neon_auth","session")))return null;
  const rows=await sql`select "createdAt" as created_at from neon_auth."session" where id::text = ${String(session.id)} and "userId"::text = ${String(authUserId)} limit 1`;
  return timestampMs(rows[0]?.created_at);
}

export function isRecentLogin(createdAtMs,now=Date.now(),maxAgeMs=RECENT_LOGIN_MAX_AGE_MS){
  return Number.isFinite(createdAtMs)&&createdAtMs<=now+60_000&&now-createdAtMs<=maxAgeMs;
}

// Confirma a palavra-passe diretamente no Neon Auth, sem tocar nos cookies do pedido.
export async function verifyAccountPassword({baseUrl,email,password,origin,fetchImpl=fetch}){
  if(!baseUrl||!email||!password)return {ok:false,code:"PASSWORD_CHECK_UNAVAILABLE"};
  const url=new URL("sign-in/email",baseUrl.endsWith("/")?baseUrl:`${baseUrl}/`);
  let response;
  try{
    response=await fetchImpl(url.toString(),{
      method:"POST",
      headers:{"Content-Type":"application/json",Origin:origin,"x-neon-auth-proxy":"nextjs"},
      body:JSON.stringify({email,password,rememberMe:false})
    });
  }catch{
    return {ok:false,code:"PASSWORD_CHECK_UNAVAILABLE"};
  }
  if(response.ok)return {ok:true};
  if(response.status===401||response.status===400||response.status===403)return {ok:false,code:"INVALID_PASSWORD"};
  if(response.status===429)return {ok:false,code:"TOO_MANY_ATTEMPTS"};
  return {ok:false,code:"PASSWORD_CHECK_UNAVAILABLE"};
}

async function existingTables(sql){
  // to_regclass devolve null quando a tabela não existe (sem consultar o catálogo).
  const names=[...APP_TABLES_BY_AUTH_USER,APP_USERS_TABLE].map(table=>`public.${table}`)
    .concat(AUTH_TABLES.map(({table})=>`neon_auth.${table}`));
  const present=new Set();
  for(const name of names){
    const [schema,table]=name.split(".");
    const rows=await sql`select to_regclass(${`${schema}."${table}"`}) is not null as present`;
    if(rows[0]?.present)present.add(name);
  }
  return present;
}

export function deletionStatements(authUserId,present){
  const statements=[];
  for(const table of APP_TABLES_BY_AUTH_USER){
    if(present.has(`public.${table}`))statements.push({text:`delete from public."${table}" where auth_user_id = $1`,params:[authUserId]});
  }
  if(present.has(`public.${APP_USERS_TABLE}`))statements.push({text:`delete from public."${APP_USERS_TABLE}" where auth_user_id = $1`,params:[authUserId]});
  for(const {table,column} of AUTH_TABLES){
    if(present.has(`neon_auth.${table}`))statements.push({text:`delete from neon_auth."${table}" where "${column}"::text = $1`,params:[authUserId]});
  }
  return statements;
}

export async function deleteAccountData(sql,authUserId){
  if(!authUserId)throw new Error("authUserId required");
  const present=await existingTables(sql);
  // Sem a tabela de utilizadores do Neon Auth não é possível eliminar a identidade:
  // recusar antes de apagar seja o que for.
  if(!present.has("neon_auth.user"))return {ok:false,code:"AUTH_IDENTITY_TABLE_UNAVAILABLE"};
  const statements=deletionStatements(authUserId,present);
  // Nomes de tabela vêm só das listas fixas acima e de to_regclass; o identificador
  // da conta segue sempre como parâmetro.
  await sql.transaction(statements.map(({text,params})=>sql.query(text,params)));
  return {ok:true,tables:statements.length};
}

export const ACCOUNT_DELETED_COOKIE="approva_account_deleted";

export const NEON_AUTH_COOKIES=Object.freeze([
  "__Secure-neon-auth.session_token",
  "__Secure-neon-auth.local.session_data",
  "__Secure-neon-auth.session_challenge"
]);
